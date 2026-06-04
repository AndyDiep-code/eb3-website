# Source Mode: Standard (PRD / BRD / FRD)

Read file path(s) or inline text. Extract the following:

## What to Extract

| Signal | Output |
|--------|--------|
| Feature/module names | Module headings in test cases |
| Functional requirements (FRs) | TC scope per module |
| User flows and acceptance criteria | HP test case steps |
| Business rules (BR-x) | 1 dedicated TC per rule + 1 NEG if boundary exists |
| Integrations (APIs, third-party, DB) | +Integration test type |
| Out-of-scope signals ("not in this sprint", "future", "deferred") | Out of Scope section |
| Non-functional requirements (perf, security, mobile, browsers) | Test approach + risk entries |

## Section Filling Rules (test-plan)

| Section | Source signal |
|---------|--------------|
| Objective | Feature title + main user goal |
| Scope | All features extracted from requirements |
| Out of Scope | "not in scope", "future", "deferred", "out of scope" keywords |
| Test Types | Login/auth → +Security; API → +Integration; new feature → +Smoke+Regression |
| Entry Criteria | Always: build deployed, env stable, smoke passed |
| Exit Criteria | Always: no Critical/Major open, ≥95% execution, sign-off |
| Risks | External API → env risk; auth flows → security risk; open questions → scope risk |
| BR coverage | Each BR gets at least 1 test case — note in Coverage Summary table |
| Timeline | Based on module count |

## TC ID Format

`{MODULE}-{FEATURE}-{NNN}` — encodes WHERE (traceability)

## Output Files

- `--type=test-plan` → `test-plan.md` (read `references/test-plan-template.md` for 17-section structure)
- `--type=test-cases` → `all.md` + `all.csv`
- `--type=test-summary` → `test-summary.md`
