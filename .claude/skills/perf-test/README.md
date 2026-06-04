# Perf Test Skill

Hybrid performance testing — UI Lighthouse/Core Web Vitals audits and API load testing (k6, Artillery, autocannon). Supports authenticated workflows, multi-step flows, and SLA threshold validation.

## Overview

Two testing modes:
- **UI mode** — Lighthouse audits via Playwright, per-page Core Web Vitals with SLA pass/fail
- **API mode** — Load testing with k6/Artillery/autocannon, authenticated multi-step workflows

Auto-discovers UI flows from playwright-cli snapshots (`--auto` flag) and integrates with QAKit `api-calls.json` for API test generation.

## Quick Start

```bash
# Both UI + API (auto-discover)
/perf-test --url=https://staging.app.com --task=TASK-123

# UI only (Lighthouse)
/perf-test --mode=ui --url=https://staging.app.com/dashboard

# API load test (manual config)
/perf-test --mode=api --config=./k6/load-test.js

# Auto-discover from QAKit api-calls.json
/perf-test --mode=api --auto --task=TASK-123

# With authentication
/perf-test --mode=ui --url=https://app.com --auth=./tests/auth.setup.ts

# Custom SLA thresholds
/perf-test --mode=api --sla=p95:500,error-rate:0.01
```

## Arguments

| Arg | Values | Default |
|-----|--------|---------|
| `--mode` | `ui` \| `api` \| `both` | `both` |
| `--tool` | `k6` \| `artillery` \| `autocannon` \| `auto` | `auto` |
| `--url` | URL string | required for ui |
| `--task` | QAKit task ID | — |
| `--auth` | auth setup file path | — |
| `--auto` | auto-discover from snapshots/api-calls | false |
| `--sla` | threshold string `metric:value,...` | defaults |
| `--vus` | virtual users | 10 |
| `--duration` | test duration (e.g. `30s`, `5m`) | `30s` |
| `--config` | custom k6/artillery config file | — |

## SLA Defaults

| Metric | Default Threshold |
|--------|------------------|
| LCP | ≤ 2500ms |
| FID / INP | ≤ 100ms |
| CLS | ≤ 0.1 |
| p95 response time | ≤ 500ms |
| p99 response time | ≤ 1000ms |
| Error rate | ≤ 1% |

## Output

Results saved to `tests/playwright/reports/perf/`:
- `ui-report.json` — Lighthouse scores per page
- `api-report.json` — load test metrics and percentiles
- `summary.md` — human-readable pass/fail report with SLA evaluation

## QAKit Integration

When `--task` is provided and `api-calls.json` exists in the task directory, perf-test auto-generates load test scripts from captured network calls.

## Prerequisites

- Node.js ≥ 18
- Playwright installed (`npx playwright install`)
- k6 or Artillery installed globally (for API mode)
- App running and accessible at `--url`

## References

See `SKILL.md` for complete implementation details including:
- Auto-discovery workflow
- Authentication flow
- Multi-step API test generation
- SLA evaluation logic
