# Source Mode: QAKit KB

Reads structured KB docs from `qakit:playwright:feature-synthesize` and/or `qakit:playwright:app-synthesize`. Steps and data models are accurate — from a live running app, not inferred from design specs.

## Path Resolution (priority order)

1. `qakit:tests/playwright/docs/features/{name}` → single feature KB
2. `qakit:tests/playwright/docs/features` → all feature KBs (iterate each folder)
3. `qakit:tests/playwright/docs` → auto-discover: check `features/` first, fall back to `pages/` only
4. No KB docs found → ERROR: "QAKit KB not found. Run `qakit:playwright:feature-synthesize` first."

## Freshness Check (before extracting)

Read `generated:` date from `overview.md` frontmatter of each feature.
If date > 30 days ago → warn: `⚠️ QAKit KB may be stale (generated: {date}). Consider re-running docs-generate + feature-synthesize.`
Continue generation regardless — just warn.

## Extraction Mapping

| KB file | Read section | → TC output |
|---------|-------------|-------------|
| `features/{name}/overview.md` | `## Purpose` | Module heading, objective |
| `features/{name}/overview.md` | `## Users` | Preconditions (role context) |
| `features/{name}/overview.md` | `## Business Rules` | 1 HP TC per rule; add 1 NEG variant if rule has a boundary |
| `features/{name}/overview.md` | `## Entry Points` | Navigation steps in TC preconditions |
| `features/{name}/user-journeys.md` | each `## Journey:` block | 1 HP TC. Steps from `Step \| Page \| Action \| Next Page` table rows. |
| `features/{name}/data-model.md` | Required=Yes field | 1 VAL TC: submit form with field blank, verify error |
| `features/{name}/data-model.md` | format constraint (email, phone, URL) | 1 NEG TC: enter invalid format, verify error |
| `features/{name}/data-model.md` | length/range constraint | 1 NEG TC: exceed max value, verify rejection |
| `features/{name}/page-map.md` | `## Navigation Graph` | Cross-page navigation links for E2E journeys |
| `app/navigation-flow.md` | cross-feature arrows | E2E journey TCs spanning multiple features |

## Journey → TC Steps Translation

Each row in `user-journeys.md`: `Step N | PageName | Action description | NextPage`
→ TC step: `"[Action description] on [PageName]. Verify the app navigates to [NextPage]."`
- Trigger row → Preconditions
- Expected outcome row → Expected Result

## TC ID Format

| Source | ID Pattern |
|--------|-----------|
| HP from journeys | `{FEATURE_ABBREV}-{JOURNEY_ABBREV}-{NNN}` |
| VAL/NEG from data-model | `{FEATURE_ABBREV}-{FIELD_ABBREV}-{NNN}` |
| Business rules | `{FEATURE_ABBREV}-{BR_ABBREV}-{NNN}` |
| E2E from navigation-flow | `E2E-{FLOW_ABBREV}-{NNN}` |

## FR Ref Column

Populate with the journey name (from `## Journey: {name}`) or business rule ID (from `## Business Rules`) so TCs are traceable back to the KB.

## Output Files

`qakit.md` + `qakit.csv` — includes E2E journeys + BR Coverage Summary at end.
