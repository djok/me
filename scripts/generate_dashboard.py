#!/usr/bin/env python3
"""
Dashboard Generator - GitHub Style
Генерира HTML dashboard в автентичен GitHub стил
"""

import json
from pathlib import Path
from datetime import datetime, timedelta

def load_metrics():
    with open('data/metrics.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def format_number(n):
    if n >= 1000000:
        return f"{n/1000000:.1f}M"
    if n >= 1000:
        return f"{n/1000:.1f}K"
    return str(n)

def generate_html_dashboard(metrics):
    summary = metrics['summary']
    daily = metrics['daily']
    top_repos = metrics['top_repos']
    languages = metrics['languages']
    updated_at = metrics['meta']['updated_at'][:16].replace('T', ' ')
    username = metrics['meta']['username']
    
    dates = sorted(daily.keys())[-90:]
    commits_data = [daily.get(d, {}).get('commits', 0) for d in dates]
    additions_data = [daily.get(d, {}).get('additions', 0) for d in dates]
    deletions_data = [daily.get(d, {}).get('deletions', 0) for d in dates]
    
    total_bytes = sum(languages.values()) if languages else 1
    sorted_langs = sorted(languages.items(), key=lambda x: x[1], reverse=True)[:6]
    lang_data = [{'name': l[0], 'bytes': l[1], 'percent': round(l[1]/total_bytes*100, 1)} for l in sorted_langs]
    
    lang_colors = {
        'Python': '#3572A5', 'JavaScript': '#f1e05a', 'TypeScript': '#3178c6',
        'HTML': '#e34c26', 'CSS': '#563d7c', 'Shell': '#89e051',
        'Go': '#00ADD8', 'Rust': '#dea584', 'Java': '#b07219',
        'C++': '#f34b7d', 'C': '#555555', 'Ruby': '#701516',
        'PHP': '#4F5D95', 'Swift': '#F05138', 'Kotlin': '#A97BFF',
        'Dockerfile': '#384d54', 'YAML': '#cb171e', 'Vue': '#41b883'
    }
    
    html = f'''<!DOCTYPE html>
<html lang="bg" data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{username} · Code Metrics</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {{
            --color-canvas-default: #ffffff;
            --color-canvas-subtle: #f6f8fa;
            --color-border-default: #d0d7de;
            --color-border-muted: #d8dee4;
            --color-fg-default: #1F2328;
            --color-fg-muted: #656d76;
            --color-fg-subtle: #6e7781;
            --color-accent-fg: #0969da;
            --color-success-fg: #1a7f37;
            --color-success-emphasis: #1f883d;
            --color-danger-fg: #d1242f;
            --color-neutral-muted: rgba(175,184,193,0.2);
        }}
        
        @media (prefers-color-scheme: dark) {{
            :root {{
                --color-canvas-default: #0d1117;
                --color-canvas-subtle: #161b22;
                --color-border-default: #30363d;
                --color-border-muted: #21262d;
                --color-fg-default: #e6edf3;
                --color-fg-muted: #8d96a0;
                --color-fg-subtle: #6e7681;
                --color-accent-fg: #58a6ff;
                --color-success-fg: #3fb950;
                --color-success-emphasis: #238636;
                --color-danger-fg: #f85149;
                --color-neutral-muted: rgba(110,118,129,0.4);
            }}
        }}
        
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            background: var(--color-canvas-default);
            color: var(--color-fg-default);
        }}
        
        .container {{ max-width: 1280px; margin: 0 auto; padding: 24px 32px; }}
        
        .header {{
            display: flex;
            align-items: center;
            gap: 16px;
            padding-bottom: 16px;
            margin-bottom: 16px;
            border-bottom: 1px solid var(--color-border-muted);
        }}
        
        .avatar {{
            width: 48px; height: 48px;
            border-radius: 50%;
            background: var(--color-canvas-subtle);
            border: 1px solid var(--color-border-default);
            display: flex; align-items: center; justify-content: center;
            font-size: 24px;
        }}
        
        .header-info h1 {{ font-size: 20px; font-weight: 600; }}
        .header-info .subtitle {{ font-size: 14px; color: var(--color-fg-muted); }}
        .header-info .updated {{ font-size: 12px; color: var(--color-fg-subtle); margin-top: 2px; }}
        
        .nav-tabs {{
            display: flex; gap: 8px;
            margin-bottom: 24px;
            border-bottom: 1px solid var(--color-border-muted);
        }}
        
        .nav-tab {{
            padding: 8px 16px;
            font-size: 14px; font-weight: 500;
            color: var(--color-fg-muted);
            background: none; border: none;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            margin-bottom: -1px;
        }}
        
        .nav-tab:hover {{ color: var(--color-fg-default); }}
        .nav-tab.active {{ color: var(--color-fg-default); border-bottom-color: #fd8c73; }}
        
        .stats-row {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }}
        
        .stat-box {{
            background: var(--color-canvas-subtle);
            border: 1px solid var(--color-border-default);
            border-radius: 6px;
            padding: 16px;
        }}
        
        .stat-box .label {{
            font-size: 12px; font-weight: 500;
            color: var(--color-fg-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }}
        
        .stat-box .value {{ font-size: 32px; font-weight: 600; line-height: 1.2; }}
        .stat-box .value.additions {{ color: var(--color-success-fg); }}
        .stat-box .value.deletions {{ color: var(--color-danger-fg); }}
        .stat-box .value.commits {{ color: var(--color-accent-fg); }}
        .stat-box .change {{ font-size: 12px; color: var(--color-fg-muted); margin-top: 4px; }}
        
        .card {{
            background: var(--color-canvas-subtle);
            border: 1px solid var(--color-border-default);
            border-radius: 6px;
            margin-bottom: 16px;
        }}
        
        .card-header {{
            padding: 16px;
            border-bottom: 1px solid var(--color-border-muted);
            display: flex; align-items: center; justify-content: space-between;
        }}
        
        .card-header h2 {{
            font-size: 14px; font-weight: 600;
            display: flex; align-items: center; gap: 8px;
        }}
        
        .card-body {{ padding: 16px; }}
        .chart-container {{ position: relative; height: 220px; }}
        
        .two-columns {{
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 16px;
        }}
        
        @media (max-width: 900px) {{
            .two-columns {{ grid-template-columns: 1fr; }}
        }}
        
        table {{ width: 100%; border-collapse: collapse; }}
        th, td {{
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid var(--color-border-muted);
            font-size: 14px;
        }}
        th {{ font-weight: 600; background: var(--color-canvas-subtle); }}
        tr:last-child td {{ border-bottom: none; }}
        tr:hover td {{ background: var(--color-canvas-default); }}
        
        .repo-name a {{
            color: var(--color-accent-fg);
            text-decoration: none;
            font-weight: 600;
        }}
        .repo-name a:hover {{ text-decoration: underline; }}
        
        .text-success {{ color: var(--color-success-fg); }}
        .text-danger {{ color: var(--color-danger-fg); }}
        
        .languages-bar {{
            height: 8px;
            border-radius: 6px;
            overflow: hidden;
            display: flex;
            margin-bottom: 12px;
        }}
        .lang-segment {{ height: 100%; }}
        
        .languages-list {{ display: flex; flex-wrap: wrap; gap: 16px; }}
        .lang-item {{ display: flex; align-items: center; gap: 6px; font-size: 12px; }}
        .lang-dot {{ width: 10px; height: 10px; border-radius: 50%; }}
        .lang-name {{ font-weight: 500; }}
        .lang-percent {{ color: var(--color-fg-muted); }}
        
        .footer {{
            text-align: center;
            padding: 32px 16px;
            font-size: 12px;
            color: var(--color-fg-muted);
            border-top: 1px solid var(--color-border-muted);
            margin-top: 32px;
        }}
        .footer a {{ color: var(--color-accent-fg); text-decoration: none; }}
        .footer a:hover {{ text-decoration: underline; }}
        
        .icon {{ width: 16px; height: 16px; fill: var(--color-fg-muted); }}
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="avatar">📊</div>
            <div class="header-info">
                <h1>{username}</h1>
                <div class="subtitle">Code Metrics Dashboard</div>
                <div class="updated">Last updated: {updated_at} UTC</div>
            </div>
        </header>
        
        <nav class="nav-tabs">
            <button class="nav-tab active" data-period="month">
                <svg class="icon" viewBox="0 0 16 16"><path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2H14a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h1.25V.75A.75.75 0 014.75 0zM2.5 5v7.5h11V5h-11z"></path></svg>
                Month
            </button>
            <button class="nav-tab" data-period="week">Week</button>
            <button class="nav-tab" data-period="today">Today</button>
            <button class="nav-tab" data-period="quarter">Quarter</button>
            <button class="nav-tab" data-period="year">Year</button>
        </nav>
        
        <div class="stats-row">
            <div class="stat-box">
                <div class="label">Commits</div>
                <div class="value commits" id="stat-commits">{summary['month']['commits']}</div>
                <div class="change">code changes</div>
            </div>
            <div class="stat-box">
                <div class="label">Additions</div>
                <div class="value additions" id="stat-additions">+{format_number(summary['month']['additions'])}</div>
                <div class="change">lines added</div>
            </div>
            <div class="stat-box">
                <div class="label">Deletions</div>
                <div class="value deletions" id="stat-deletions">-{format_number(summary['month']['deletions'])}</div>
                <div class="change">lines removed</div>
            </div>
            <div class="stat-box">
                <div class="label">Net Change</div>
                <div class="value" id="stat-net" style="color: var(--color-fg-default)">{format_number(summary['month']['additions'] - summary['month']['deletions'])}</div>
                <div class="change">net lines</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2>
                    <svg class="icon" viewBox="0 0 16 16"><path d="M1.5 1.75a.75.75 0 00-1.5 0v12.5c0 .414.336.75.75.75h14.5a.75.75 0 000-1.5H1.5V1.75zm14.28 2.53a.75.75 0 00-1.06-1.06L10 7.94 7.53 5.47a.75.75 0 00-1.06 0L3.22 8.72a.75.75 0 001.06 1.06L7 7.06l2.47 2.47a.75.75 0 001.06 0l5.25-5.25z"></path></svg>
                    Commits Activity
                </h2>
            </div>
            <div class="card-body">
                <div class="chart-container">
                    <canvas id="commitsChart"></canvas>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h2>
                    <svg class="icon" viewBox="0 0 16 16"><path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0z"></path></svg>
                    Lines of Code
                </h2>
            </div>
            <div class="card-body">
                <div class="chart-container" style="height: 250px;">
                    <canvas id="linesChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="two-columns">
            <div class="card">
                <div class="card-header">
                    <h2>
                        <svg class="icon" viewBox="0 0 16 16"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"></path></svg>
                        Top Repositories
                    </h2>
                </div>
                <div class="card-body" style="padding: 0;">
                    <table>
                        <thead>
                            <tr>
                                <th>Repository</th>
                                <th>Commits</th>
                                <th>++</th>
                                <th>--</th>
                            </tr>
                        </thead>
                        <tbody>
'''
    
    for repo in top_repos[:8]:
        repo_short = repo['name'].split('/')[-1]
        html += f'''                            <tr>
                                <td class="repo-name"><a href="{repo['url']}" target="_blank">{repo_short}</a></td>
                                <td>{repo['commits']}</td>
                                <td class="text-success">+{format_number(repo['additions'])}</td>
                                <td class="text-danger">-{format_number(repo['deletions'])}</td>
                            </tr>
'''
    
    html += '''                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h2>
                        <svg class="icon" viewBox="0 0 16 16"><path d="M8 4a4 4 0 100 8 4 4 0 000-8z"></path></svg>
                        Languages
                    </h2>
                </div>
                <div class="card-body">
                    <div class="languages-bar">
'''
    
    for lang in lang_data:
        color = lang_colors.get(lang['name'], '#8b949e')
        html += f'                        <div class="lang-segment" style="width: {lang["percent"]}%; background: {color};"></div>\n'
    
    html += '''                    </div>
                    <div class="languages-list">
'''
    
    for lang in lang_data:
        color = lang_colors.get(lang['name'], '#8b949e')
        html += f'''                        <div class="lang-item">
                            <span class="lang-dot" style="background: {color};"></span>
                            <span class="lang-name">{lang['name']}</span>
                            <span class="lang-percent">{lang['percent']}%</span>
                        </div>
'''
    
    html += f'''                    </div>
                </div>
            </div>
        </div>
        
        <footer class="footer">
            Powered by <a href="https://github.com">GitHub API</a> · Auto-updated daily
        </footer>
    </div>
    
    <script>
        const allDates = {json.dumps(dates)};
        const allCommits = {json.dumps(commits_data)};
        const allAdditions = {json.dumps(additions_data)};
        const allDeletions = {json.dumps(deletions_data)};
        const periodData = {json.dumps(summary)};

        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const gridColor = isDark ? '#30363d' : '#d0d7de';
        const textColor = isDark ? '#8d96a0' : '#656d76';
        const barColor = isDark ? '#238636' : '#1f883d';
        const addColor = isDark ? '#3fb950' : '#1a7f37';
        const delColor = isDark ? '#f85149' : '#d1242f';

        // Period days mapping
        const periodDays = {{ today: 1, week: 7, month: 30, quarter: 90, year: 365 }};
        let currentPeriod = 'month';

        function getDataForPeriod(period) {{
            const days = Math.min(periodDays[period], allDates.length);
            const start = allDates.length - days;
            return {{
                dates: allDates.slice(start),
                commits: allCommits.slice(start),
                additions: allAdditions.slice(start),
                deletions: allDeletions.slice(start)
            }};
        }}

        function fmt(n) {{
            if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
            if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
            return n;
        }}

        // Commits Bar Chart
        const commitsCtx = document.getElementById('commitsChart');
        let commitsChart = new Chart(commitsCtx, {{
            type: 'bar',
            data: {{
                labels: [],
                datasets: [{{
                    label: 'Commits',
                    data: [],
                    backgroundColor: barColor,
                    borderRadius: 3,
                    barPercentage: 0.7
                }}]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {{
                    legend: {{ display: false }},
                    tooltip: {{
                        backgroundColor: isDark ? '#161b22' : '#fff',
                        titleColor: isDark ? '#e6edf3' : '#1F2328',
                        bodyColor: textColor,
                        borderColor: gridColor,
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false
                    }}
                }},
                scales: {{
                    x: {{
                        grid: {{ display: false }},
                        ticks: {{ color: textColor, maxRotation: 0, autoSkip: true, maxTicksLimit: 12 }},
                        border: {{ color: gridColor }}
                    }},
                    y: {{
                        beginAtZero: true,
                        grid: {{ color: gridColor }},
                        ticks: {{ color: textColor, stepSize: 1 }},
                        border: {{ display: false }}
                    }}
                }}
            }}
        }});

        // Lines of Code Chart (dual Y axis)
        const linesCtx = document.getElementById('linesChart');
        let linesChart = new Chart(linesCtx, {{
            type: 'line',
            data: {{
                labels: [],
                datasets: [
                    {{
                        label: 'Additions',
                        data: [],
                        borderColor: addColor,
                        backgroundColor: addColor + '20',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        yAxisID: 'y'
                    }},
                    {{
                        label: 'Deletions',
                        data: [],
                        borderColor: delColor,
                        backgroundColor: delColor + '20',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        yAxisID: 'y1'
                    }}
                ]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {{ mode: 'index', intersect: false }},
                plugins: {{
                    legend: {{
                        display: true,
                        position: 'top',
                        labels: {{ color: textColor, boxWidth: 12, padding: 16 }}
                    }},
                    tooltip: {{
                        backgroundColor: isDark ? '#161b22' : '#fff',
                        titleColor: isDark ? '#e6edf3' : '#1F2328',
                        bodyColor: textColor,
                        borderColor: gridColor,
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {{
                            label: (ctx) => ctx.dataset.label + ': ' + fmt(ctx.raw)
                        }}
                    }}
                }},
                scales: {{
                    x: {{
                        grid: {{ display: false }},
                        ticks: {{ color: textColor, maxRotation: 0, autoSkip: true, maxTicksLimit: 12 }},
                        border: {{ color: gridColor }}
                    }},
                    y: {{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        grid: {{ color: gridColor }},
                        ticks: {{
                            color: addColor,
                            callback: (v) => fmt(v)
                        }},
                        title: {{
                            display: true,
                            text: 'Additions',
                            color: addColor
                        }},
                        border: {{ display: false }}
                    }},
                    y1: {{
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        grid: {{ drawOnChartArea: false }},
                        ticks: {{
                            color: delColor,
                            callback: (v) => fmt(v)
                        }},
                        title: {{
                            display: true,
                            text: 'Deletions',
                            color: delColor
                        }},
                        border: {{ display: false }}
                    }}
                }}
            }}
        }});

        function updateCharts(period) {{
            const data = getDataForPeriod(period);
            const labels = data.dates.map(d => d.slice(5));

            // Update commits chart
            commitsChart.data.labels = labels;
            commitsChart.data.datasets[0].data = data.commits;
            commitsChart.update();

            // Update lines chart
            linesChart.data.labels = labels;
            linesChart.data.datasets[0].data = data.additions;
            linesChart.data.datasets[1].data = data.deletions;
            linesChart.update();
        }}

        // Initialize with month data
        updateCharts('month');

        document.querySelectorAll('.nav-tab').forEach(tab => {{
            tab.onclick = () => {{
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const period = tab.dataset.period;
                currentPeriod = period;

                // Update stats
                const d = periodData[period];
                document.getElementById('stat-commits').textContent = d.commits;
                document.getElementById('stat-additions').textContent = '+' + fmt(d.additions);
                document.getElementById('stat-deletions').textContent = '-' + fmt(d.deletions);
                document.getElementById('stat-net').textContent = fmt(d.additions - d.deletions);

                // Update charts
                updateCharts(period);
            }};
        }});
    </script>
</body>
</html>
'''
    return html

def generate_readme(metrics):
    summary = metrics['summary']
    top_repos = metrics['top_repos']
    updated_at = metrics['meta']['updated_at'][:16].replace('T', ' ')
    username = metrics['meta']['username']
    
    readme = f'''# 📊 Code Metrics Dashboard

> **@{username}** · Updated: {updated_at} UTC

| Period | Commits | Additions | Deletions | Net |
|--------|---------|-----------|-----------|-----|
| Today | {summary['today']['commits']} | +{format_number(summary['today']['additions'])} | -{format_number(summary['today']['deletions'])} | {format_number(summary['today']['additions'] - summary['today']['deletions'])} |
| Week | {summary['week']['commits']} | +{format_number(summary['week']['additions'])} | -{format_number(summary['week']['deletions'])} | {format_number(summary['week']['additions'] - summary['week']['deletions'])} |
| Month | {summary['month']['commits']} | +{format_number(summary['month']['additions'])} | -{format_number(summary['month']['deletions'])} | {format_number(summary['month']['additions'] - summary['month']['deletions'])} |
| Year | {summary['year']['commits']} | +{format_number(summary['year']['additions'])} | -{format_number(summary['year']['deletions'])} | {format_number(summary['year']['additions'] - summary['year']['deletions'])} |

## Top Repositories

| Repository | Commits | ++ | -- |
|------------|---------|----|----|
'''
    
    for repo in top_repos[:10]:
        name = repo['name'].split('/')[-1]
        readme += f"| [{name}]({repo['url']}) | {repo['commits']} | +{format_number(repo['additions'])} | -{format_number(repo['deletions'])} |\n"
    
    readme += '\n---\n🔗 [View Dashboard](../../) · 🤖 Auto-updated daily\n'
    return readme

def main():
    print("Generating GitHub-style dashboard...")
    metrics = load_metrics()
    
    Path('docs').mkdir(exist_ok=True)
    with open('docs/index.html', 'w', encoding='utf-8') as f:
        f.write(generate_html_dashboard(metrics))
    print("  ✓ docs/index.html")
    
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(generate_readme(metrics))
    print("  ✓ README.md")
    
    print("Done!")

if __name__ == '__main__':
    main()
