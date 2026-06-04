# Output Specification — docs-from-X Skills

This spec defines the exact output format that ALL `docs-from-*` skills MUST produce.
The output must be compatible with `docs-generate` output so downstream pipeline works unchanged.

## Output Path

```
test-tasks/playwright/{task-id}/docs/
├── pages/
│   └── {PageName}/
│       ├── business-context.md   ← REQUIRED
│       ├── user-flows.md         ← REQUIRED
│       └── data-model.md         ← REQUIRED (can be empty if no data fields)
└── features/
    └── {feature-name}/           ← OPTIONAL, only if multi-page flows exist
        ├── overview.md
        ├── user-journeys.md
        ├── data-model.md
        └── page-map.md
```

## business-context.md format

```markdown
---
page: {PageName}
source: {brd|diagram|code|locators}
generated: {YYYY-MM-DD}
---

# {PageName} — Business Context

## Purpose
{1-2 sentences: what this page does and why it exists}

## Users
{who uses this page}

## Business Rules
- {rule 1}
- {rule 2}

## Entry Points
{how users reach this page}

## Key Outcomes
{what happens when user completes flows on this page}
```

## user-flows.md format

```markdown
---
page: {PageName}
source: {brd|diagram|code|locators}
generated: {YYYY-MM-DD}
---

# {PageName} — User Flows

## Flow 1: {Flow Name}

**Trigger:** {what starts this flow}
**Actor:** {who does it}

| Step | Page | Action | Next |
|------|------|--------|------|
| 1 | {PageName} | {action} | {result} |

**Expected outcome:** {what happens at the end}
```

## data-model.md format

```markdown
---
page: {PageName}
source: {brd|diagram|code|locators}
generated: {YYYY-MM-DD}
---

# {PageName} — Data Model

## Form Fields / Inputs

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| {name} | {string/number/date} | {yes/no} | {rules} | {notes} |

## Business Enums / States

| Name | Values |
|------|--------|
| {name} | {val1, val2, ...} |
```

## PageName Naming Convention

Use PascalCase matching the page folder name in `locators/`:
- `LoginWithMicrosoft` → `LoginWithMicrosoft`
- `AttendancePage` → `AttendancePage`
- `CreateNewRequestRemote` → `CreateNewRequestRemote`

If source doc doesn't name pages, infer from URL path or main heading.
