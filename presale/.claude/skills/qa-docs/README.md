# QA Docs Skill

Generate QA documentation from any requirements source — test plans, test cases, and test summary reports following Enouvo's official QA standards.

## Overview

Three source modes supported:
- **Standard mode** — BRD, FRD, PRD, user stories, inline descriptions
- **Storybook mode** — Storybook stories directory as design spec
- **QAKit mode** — QAKit KB docs from `feature-synthesize` / `app-synthesize` output

## Quick Start

```bash
# Test plan from BRD
/qa-docs --source=./docs/BRD.md --project="Auth Module" --sprint="Sprint 12"

# Test cases from multiple files
/qa-docs --source=brd.md --source=frd.md --project="Checkout" --type=test-cases

# Module-specific test cases (incremental)
/qa-docs brd.md frd.md --type=test-cases --module=AUTH
/qa-docs brd.md frd.md --type=test-cases --module=DASHBOARD

# All 3 documents at once
/qa-docs --source=./docs/PRD.md --project="Payment" --type=all --prepared-by="Jordan Lee"

# From Storybook stories
/qa-docs --source=storybook:./src/stories --project="MyApp" --type=test-cases

# From QAKit KB (single feature)
/qa-docs --source=qakit:tests/playwright/docs/features/checkout --project="Checkout" --type=test-cases

# From QAKit KB (full app)
/qa-docs --source=qakit:tests/playwright/docs --project="MyApp" --type=all
```

## Output

Files are saved to `qa-docs/{project-kebab}/`:

| Type flag | Output |
|-----------|--------|
| `--type=test-plan` | `test-plan.md` |
| `--type=test-cases` | `test-cases/all.md` + `all.csv` |
| `--type=test-cases --module=AUTH` | `test-cases/auth.md` + `auth.csv` |
| `--type=test-summary` | `test-summary.md` |
| `--type=all` | all 3 above |

CSV files are Testmo-compatible (multi-row per TC, one row per step).

## Arguments

| Arg | Values | Default |
|-----|--------|---------|
| `--source` | file path(s), inline text, `storybook:<dir>`, `qakit:<path>` | required |
| `--project` | project name | required |
| `--type` | `test-plan` \| `test-cases` \| `test-summary` \| `all` | `test-plan` |
| `--module` | module abbreviation (e.g. `AUTH`, `DASH`) | all modules |
| `--sprint` | sprint or release name | auto-detect |
| `--env` | test environment URL | staging |
| `--prepared-by` | QA owner name | QA Team |
| `--output` | custom output path | auto |

## Test Case Format

Each test case includes:

| Column | Description |
|--------|-------------|
| TC ID | `{MODULE}-{FEATURE}-{NNN}` |
| Title | Action-oriented title |
| Description | `Page A → Page B. Business outcome.` (≤150 chars) |
| Type | `HP` / `NEG` / `EDGE` / `VAL` |
| Priority | `Critical` / `High` / `Normal` / `Low` |
| Tags | `smoke`, `regression`, `e2e`, `negative`, `validation`, etc. |
| Preconditions | Setup state required |
| Steps | Numbered, executable steps (`<br>` separated in MD tables) |
| Expected Result | Specific element/value/location |
| FR Ref | Traceability to requirement |

## QAKit Integration

Prerequisite: run `qakit:playwright:feature-synthesize` first to generate KB docs.

QAKit mode reads structured KB files:
- `features/{name}/overview.md` → module heading, business rules
- `features/{name}/user-journeys.md` → HP test cases from journey steps
- `features/{name}/data-model.md` → VAL/NEG test cases from field constraints
- `app/navigation-flow.md` → E2E cross-feature journeys

## References

- `references/test-plan-template.md` — 17-section Enouvo test plan template
- `references/test-case-template.md` — test case format and ID conventions
- `references/test-summary-template.md` — summary report template
- `references/generation-guide.md` — per-section filling instructions
