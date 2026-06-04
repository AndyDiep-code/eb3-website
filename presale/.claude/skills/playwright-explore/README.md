# Playwright Explore Skill

AI-driven autonomous web application explorer. Discovers navigation structure, captures every reachable page, generates KB documentation, and outputs test cases — no human navigation required.

## Overview

Traditional QA capture pipeline requires a human to navigate each page while AI captures. `playwright-explore` eliminates that — give it a URL and credentials, and AI does everything automatically.

Works with **any app structure**: sidebar nav, top nav, tab-based, card dashboards, or hybrid layouts. Uses ARIA snapshot analysis to discover navigation dynamically rather than relying on hardcoded patterns.

## Invocation

| Context | Command |
|---------|---------|
| Template / AI DevKit | `/playwright-explore` |
| QAKit project | `/qakit:playwright:explore` |

## Quick Start

```bash
# Explore full app (template)
/playwright-explore --url=https://staging.app.com --task=TASK-123

# With authentication
/playwright-explore --url=https://app.com --auth=admin@app.com:password123 --task=TASK-123

# Focus on one section only
/playwright-explore --url=https://app.com --auth=admin:pass --focus=Settings --task=TASK-123

# KB docs only (skip test case generation)
/playwright-explore --url=https://app.com --auth=admin:pass --output=kb-only --task=TASK-123

# Control depth (1=top nav only, 2=sub-pages, 3=deep)
/playwright-explore --url=https://app.com --auth=admin:pass --depth=3 --task=TASK-123
```

## Arguments

| Arg | Description | Default |
|-----|-------------|---------|
| `--url` | Base URL of the app | required |
| `--task` | Task ID for output organization | required |
| `--auth` | Login credentials as `user:pass` | optional |
| `--auth-file` | Path to existing storageState.json | optional |
| `--depth` | Max navigation depth (1–3) | `2` |
| `--focus` | Explore only matching section label | all |
| `--output` | `full` or `kb-only` | `full` |
| `--project` | Project name for qa-docs | auto from URL |
| `--skip-synthesis` | Skip feature/app synthesis | false |

## How It Works

```
1. Open browser → login if needed
2. Take ARIA snapshot → discover nav structure
3. BFS queue: visit each discovered page
   → Navigate (click nav item or goto URL)
   → Capture ARIA + screenshot + locators
   → Generate business docs (business-context, user-flows, data-model)
   → Discover sub-navigation → add to queue
4. Feature synthesis (auto-cluster pages into features)
5. App synthesis (app-wide overview)
6. Test case generation via qa-docs
```

## Output

```
tests/playwright/docs/
├── pages/{PageName}/        ← per-page KB docs
├── features/{Feature}/      ← feature-level KB docs
└── app/                     ← app-wide KB

qa-docs/{project}/
├── test-plan.md
└── test-cases/
    ├── all.md               ← human-readable test cases
    └── all.csv              ← Testmo import ready
```

## Safety

AI will **never** click:
- Delete, Remove, Logout, Deactivate, Submit (form), Archive, Reset
- External links, download links, anchor-only links

Only navigates via: nav items, sidebar links, menu items, tabs, breadcrumbs.

Max 50 pages per run to prevent runaway exploration.

## Compared to Manual Pipeline

| Step | Manual pipeline | playwright-explore |
|------|----------------|--------------------|
| Capture pages | Human navigates each page | AI discovers and captures automatically |
| docs-generate | Run manually per page | Done automatically per page |
| feature-synthesize | Run manually | Done automatically |
| app-synthesize | Run manually | Done automatically |
| qa-docs | Run manually | Done automatically |

## Integration with QAKit Pipeline

After `playwright-explore` completes, you can continue with:
- `/playwright-test-cases-promote` — promote test cases for automation
- `/playwright-automate` — generate Playwright spec files
- `/playwright-execute` — run specs and analyze results
- `/perf-test` — run performance tests against discovered pages

## References

See `SKILL.md` for complete implementation details:
- Phase 1: Setup and argument parsing
- Phase 2: Authentication and login detection
- Phase 3: ARIA-based navigation discovery
- Phase 4: BFS page capture loop
- Phase 5: Feature and app synthesis
- Phase 6: Test case generation
- Phase 7: Final report
