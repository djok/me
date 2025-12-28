#!/usr/bin/env python3
"""
GitHub Metrics Collector
Събира статистики за commits от всички репозиторита на потребителя
"""

import os
import json
from datetime import datetime, timedelta
from github import Github
from pathlib import Path
from collections import defaultdict

# Конфигурация от environment variables
GH_TOKEN = os.environ.get('GH_TOKEN')
GH_USERNAME = os.environ.get('GH_USERNAME')
REPOS_TO_TRACK = os.environ.get('REPOS_TO_TRACK', '')  # comma-separated list или празно за всички

def get_repos_to_track(g, user):
    """Връща списък с репозиторита за проследяване"""
    repos = []
    seen = set()

    # Ако са зададени конкретни репота
    if REPOS_TO_TRACK:
        for repo_name in REPOS_TO_TRACK.split(','):
            repo_name = repo_name.strip()
            if repo_name and '/' in repo_name:
                try:
                    repos.append(g.get_repo(repo_name))
                    seen.add(repo_name)
                except Exception as e:
                    print(f"Warning: Could not access {repo_name}: {e}")
        return repos

    # Взимаме всички репота на authenticated user (включително private и forks)
    try:
        # g.get_user() без аргумент връща authenticated user с пълен достъп
        auth_user = g.get_user()
        # affiliation='owner,collaborator,organization_member' взима всички репота
        for repo in auth_user.get_repos(affiliation='owner,collaborator,organization_member'):
            if repo.full_name not in seen:
                repos.append(repo)
                seen.add(repo.full_name)
                print(f"    Found: {repo.full_name} (fork={repo.fork})")
    except Exception as e:
        print(f"Warning: Could not fetch user repos: {e}")
    
    try:
        # Репота на организации
        for org in user.get_orgs():
            for repo in org.get_repos():
                if repo.full_name not in seen:
                    repos.append(repo)
                    seen.add(repo.full_name)
    except Exception as e:
        print(f"Warning: Could not fetch org repos: {e}")
    
    return repos

def get_commit_stats(repo, author, since, until):
    """Събира статистики за commits в репо за определен период"""
    stats = {
        'commits': 0,
        'additions': 0,
        'deletions': 0,
        'files_changed': 0
    }
    
    try:
        commits = repo.get_commits(author=author, since=since, until=until)
        for commit in commits:
            stats['commits'] += 1
            if commit.stats:
                stats['additions'] += commit.stats.additions
                stats['deletions'] += commit.stats.deletions
            if commit.files:
                stats['files_changed'] += len(commit.files)
    except Exception as e:
        # Празни репота или други проблеми
        pass
    
    return stats

def get_daily_stats(repo, author, days=30):
    """Събира дневни статистики за последните N дни"""
    daily = []
    now = datetime.now()
    
    for i in range(days, -1, -1):
        day_start = (now - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        
        stats = get_commit_stats(repo, author, day_start, day_end)
        daily.append({
            'date': day_start.strftime('%Y-%m-%d'),
            **stats
        })
    
    return daily

def get_language_stats(repo):
    """Взима статистики за езиците в репото"""
    try:
        return repo.get_languages()
    except:
        return {}

def collect_all_metrics():
    """Главна функция за събиране на всички метрики"""
    g = Github(GH_TOKEN)
    user = g.get_user(GH_USERNAME)
    
    now = datetime.now()
    
    # Периоди за анализ
    # "today" всъщност е днес + вчера (последните 2 дни), защото скриптът се изпълнява в 23:00 UTC
    periods = {
        'today': ((now - timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0), now),
        'week': (now - timedelta(days=7), now),
        'month': (now - timedelta(days=30), now),
        'quarter': (now - timedelta(days=90), now),
        'year': (now - timedelta(days=365), now),
    }
    
    results = {
        'meta': {
            'updated_at': now.isoformat(),
            'username': GH_USERNAME,
            'generated_by': 'GitHub Metrics Dashboard'
        },
        'summary': {period: {'commits': 0, 'additions': 0, 'deletions': 0, 'files_changed': 0} for period in periods},
        'repos': {},
        'daily': defaultdict(lambda: {'commits': 0, 'additions': 0, 'deletions': 0}),
        'languages': defaultdict(int),
        'top_repos': []
    }
    
    repos = get_repos_to_track(g, user)
    print(f"Tracking {len(repos)} repositories...")
    
    for repo in repos:
        print(f"  Processing: {repo.full_name}")
        
        repo_data = {
            'name': repo.name,
            'full_name': repo.full_name,
            'url': repo.html_url,
            'description': repo.description,
            'stars': repo.stargazers_count,
            'forks': repo.forks_count,
            'periods': {}
        }
        
        has_activity = False
        
        # Събиране на статистики по периоди
        for period_name, (since, until) in periods.items():
            stats = get_commit_stats(repo, GH_USERNAME, since, until)
            repo_data['periods'][period_name] = stats
            
            # Добавяне към общите суми
            for key in ['commits', 'additions', 'deletions', 'files_changed']:
                results['summary'][period_name][key] += stats[key]
            
            if stats['commits'] > 0:
                has_activity = True
        
        # Дневни статистики за графики (само за активни репота)
        if has_activity:
            daily = get_daily_stats(repo, GH_USERNAME, days=90)
            for day in daily:
                date = day['date']
                results['daily'][date]['commits'] += day['commits']
                results['daily'][date]['additions'] += day['additions']
                results['daily'][date]['deletions'] += day['deletions']
        
        # Езици
        languages = get_language_stats(repo)
        for lang, bytes_count in languages.items():
            results['languages'][lang] += bytes_count
        
        # Запазваме само активни репота
        if has_activity:
            results['repos'][repo.full_name] = repo_data
    
    # Конвертиране на defaultdict към dict
    results['daily'] = dict(results['daily'])
    results['languages'] = dict(results['languages'])
    
    # Топ репота по additions тази година (показва повече продуктивност)
    results['top_repos'] = sorted(
        [
            {
                'name': data['full_name'],
                'url': data['url'],
                'commits': data['periods']['year']['commits'],
                'additions': data['periods']['year']['additions'],
                'deletions': data['periods']['year']['deletions']
            }
            for name, data in results['repos'].items()
            if data['periods']['year']['commits'] > 0
        ],
        key=lambda x: x['additions'],
        reverse=True
    )[:10]
    
    return results

def main():
    print("=" * 50)
    print("GitHub Metrics Collector")
    print("=" * 50)
    
    if not GH_TOKEN or not GH_USERNAME:
        print("Error: GH_TOKEN and GH_USERNAME must be set!")
        exit(1)
    
    print(f"Collecting metrics for: {GH_USERNAME}")
    
    metrics = collect_all_metrics()
    
    # Запазване на JSON
    Path('data').mkdir(exist_ok=True)
    
    # Текущи метрики
    with open('data/metrics.json', 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2, ensure_ascii=False)
    
    # Исторически запис
    history_file = f"data/metrics-{datetime.now().strftime('%Y-%m-%d')}.json"
    with open(history_file, 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2, ensure_ascii=False)
    
    print(f"\nSummary (this month):")
    print(f"  Commits: {metrics['summary']['month']['commits']}")
    print(f"  Additions: +{metrics['summary']['month']['additions']}")
    print(f"  Deletions: -{metrics['summary']['month']['deletions']}")
    print(f"\nMetrics saved to data/metrics.json")

if __name__ == '__main__':
    main()
