# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub Metrics Dashboard - automatically collects commit statistics from GitHub repositories and generates visual dashboards. Runs as a daily GitHub Action that:
1. Collects metrics via GitHub API using PyGithub
2. Generates an HTML dashboard (docs/index.html) and updates README.md
3. Deploys to GitHub Pages

## Running Locally

```bash
# Install dependencies
pip install PyGithub requests

# Set required environment variables
export GH_TOKEN="your-github-token"
export GH_USERNAME="your-username"
export REPOS_TO_TRACK=""  # Optional: comma-separated list like "owner/repo1,owner/repo2"

# Collect metrics (requires valid token)
python scripts/collect_metrics.py

# Generate dashboard from collected data
python scripts/generate_dashboard.py
```

## Architecture

**Data Flow**: GitHub API -> collect_metrics.py -> data/metrics.json -> generate_dashboard.py -> docs/index.html + README.md

**Key Files**:
- `scripts/collect_metrics.py`: Fetches commit stats from GitHub API, aggregates by time periods (today, week, month, quarter, year), outputs to `data/metrics.json`
- `scripts/generate_dashboard.py`: Reads metrics.json, generates GitHub-styled HTML dashboard and markdown README
- `.github/workflows/update-metrics.yml`: Daily cron job (6:00 UTC) that runs both scripts and deploys to Pages

**Configuration**:
- `GH_TOKEN` (secret): Personal Access Token with repo read permissions
- `GH_USERNAME` (variable): GitHub username to track
- `REPOS_TO_TRACK` (variable, optional): Limit to specific repos

## Generated Files

These files are auto-generated and committed by the GitHub Action:
- `data/metrics.json` - Current metrics snapshot
- `data/metrics-YYYY-MM-DD.json` - Historical daily snapshots (gitignored)
- `docs/index.html` - HTML dashboard served via GitHub Pages
- `README.md` - Markdown summary table
