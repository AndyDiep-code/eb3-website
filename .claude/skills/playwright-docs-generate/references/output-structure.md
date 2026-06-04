# Output Structure — Format Contract

Single source of truth for all output formats. Referenced by:
- `execution-guide.md` Step 5 (generation)
- `quality-gates.md` Gates 1, 2, 5, 6 (validation)

---

## 1. YAML Frontmatter (all 3 docs)

Every generated doc MUST start with:

```yaml
---
title: {PAGE_NAME} {Doc Type}          # e.g. "LoginPage Business Context"
pageUrl: {URL from metadata.json}      # must start with http
complexity: simple | medium | complex  # derived from elementCount
generatedAt: {ISO 8601}                # e.g. 2026-05-07T10:00:00Z
---
```

`business-context.md` additionally requires:

```yaml
input-hash: {md5 hash}                 # computed from element names in locators.md
```

Complexity rules (from `metadata.json` `elementCount`):

| elementCount | complexity |
|-------------|-----------|
| < 50 | `simple` |
| 50–200 | `medium` |
| > 200 | `complex` |

---

## 2. Required Sections per Doc Type

### business-context.md

| Section | Min Content |
|---------|------------|
| Overview / Purpose | ≥ 1 sentence describing the page's business purpose |
| Business Goals / Rules | ≥ 2 items (simple), ≥ 3 (medium), ≥ 5 (complex) |
| Key Workflows / User Roles | ≥ 1 (simple), ≥ 2 (medium), ≥ 3 (complex) |

### user-flows.md

| Section | Min Content |
|---------|------------|
| At least 1 `## Flow N: ...` section | Each flow has a numbered steps list |
| Steps must reference element names from `locators.md` | Exact case-sensitive match |
| Happy Path summary | Brief end-to-end sequence |

Min flows by complexity: `simple` ≥ 1, `medium` ≥ 2, `complex` ≥ 4

### data-model.md

| Section | Min Content |
|---------|------------|
| At least 1 table with field rows | Columns: Field, Locator, Type, Required, Notes |
| All form fields from locators captured | No omissions |

Complex pages: include boundary values and validation rules.

---

## 3. Locator KB File Structure

```
./tests/playwright/docs/locators/{PAGE_NAME}/
├── locators.md                     ← copied verbatim from task input
├── aria-snapshot.yaml              ← base snapshot (required)
├── aria-snapshot-state-*.yaml      ← ALL state snapshots (wildcard copy)
├── metadata.json                   ← source + added fields (see below)
└── screenshot-*.png                ← ALL timestamped screenshots
```

`metadata.json` additions (merged into source):

```json
{
  "inputHash": "{md5}",
  "kbUpdatedAt": "{ISO 8601}",
  "captured": true
}
```

> `network-calls.json` and `network-checkpoint.json` are task-level — do NOT copy.

---

## 4. Pages KB File Structure

```
./tests/playwright/docs/pages/{PAGE_NAME}/
├── business-context.md   ← with input-hash in frontmatter
├── user-flows.md
└── data-model.md
```

---

## 5. QA Working Docs Structure

```
./test-tasks/playwright/{TASK_ID}/docs/{PAGE_NAME}/
├── business-context.md
├── user-flows.md
└── data-model.md
```

Always overwritten on each run. No hash check.
