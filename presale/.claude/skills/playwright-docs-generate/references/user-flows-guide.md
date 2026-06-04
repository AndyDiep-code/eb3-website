# User Flows Generation Guide

Generate `user-flows.md` from captured page elements. This doc maps UI interactions into step-by-step user flows for test case generation.

## Input Files to Read

1. `locators.md` — element names, types, refs
2. `aria-snapshot.yaml` — element hierarchy and groupings
3. `metadata.json` — URL, title, elementCounts

## Complexity Detection

Calculate from `elementCounts` (same as business-context-guide):
- total < 10 → `simple`, 10–30 → `medium`, > 30 → `complex`

## Output File

`./test-tasks/playwright/{TASK_ID}/docs/{PAGE_NAME}/user-flows.md`

## Output Format

```markdown
---
title: {PAGE_NAME} User Flows
pageUrl: {URL}
complexity: {simple|medium|complex}
generatedAt: {ISO timestamp}
locatorCoverage: {percentage of locators referenced in flows}
---

# {PAGE_NAME} — User Flows

## Flow 1: {Primary Action Name}

**Trigger**: {what causes this flow to start}
**Actor**: {who performs this flow}
**Preconditions**: {what must be true before this flow}

### Steps

| Step | Action | Element | Expected Result |
|------|--------|---------|----------------|
| 1 | Navigate to page | — | Page loads, {key elements} visible |
| 2 | {action verb} {element name} | `{locator ref}` | {observable result} |
| 3 | {next action} | `{locator ref}` | {result} |

**Postconditions**: {what is true after flow completes}
**API Calls Triggered**: {list endpoints from network-calls.json if available}

---

## Flow 2: {Secondary Action Name}

{same structure as Flow 1}
```

## Depth by Complexity

| Complexity | Min Flows | Steps per Flow | API Call Mapping |
|------------|-----------|---------------|-----------------|
| simple     | 1-2       | 3-5           | optional        |
| medium     | 2-4       | 4-8           | yes if available|
| complex    | 4+        | 5-12          | yes             |

## Flow Discovery Rules

Identify flows from these element patterns:

| Pattern | Flow Type |
|---------|-----------|
| Submit/Save/Create buttons | Create/Submit flow |
| Edit/Update buttons + form fields | Edit flow |
| Delete/Remove buttons | Delete flow |
| Search/Filter inputs | Search flow |
| Login/Logout buttons | Auth flow |
| Navigation tabs/links | Navigation flow |
| Upload elements | Upload flow |
| Modal triggers | Modal interaction flow |

## Locator Coverage Target

- Reference at least **90%** of interactive elements in flows
- Non-interactive elements (labels, headings) can be referenced as "visible"
- Every button, input, select, and link must appear in at least one flow

## Network Call Mapping

If `network-calls.json` exists:
- Identify which API calls are triggered by which UI actions
- Add `**API Calls Triggered**` section to each relevant flow
- Format: `POST /api/endpoint — {purpose}`

## Quality Check

Before saving, verify:
- [ ] Frontmatter includes `locatorCoverage` field
- [ ] Each flow has trigger, steps, postconditions
- [ ] Steps reference actual element names from locators.md
- [ ] Coverage meets complexity target
- [ ] No flows reference elements that don't exist in locators.md
