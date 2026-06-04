# Business Context Generation Guide

Generate `business-context.md` from captured page data. This doc provides AI context for test case generation.

## Input Files to Read

1. `locators.md` — element names, roles, counts
2. `aria-snapshot.yaml` — page structure and sections
3. `metadata.json` — page title, URL, elementCounts

## Complexity Detection

`metadata.json` does NOT have a `complexity` field. Calculate it from `elementCounts`:

```
total = sum of all values in elementCounts (links + buttons + comboboxes + inputs + headings + ...)
```

| Total elements | Complexity |
|---------------|------------|
| < 10          | simple     |
| 10–30         | medium     |
| > 30          | complex    |

Use this calculated complexity in frontmatter and to determine doc depth.

## Output File

`./test-tasks/playwright/{TASK_ID}/docs/{PAGE_NAME}/business-context.md`

## Output Format

```markdown
---
title: {PAGE_NAME} Business Context
pageUrl: {URL}
complexity: {simple|medium|complex}
generatedAt: {ISO timestamp}
---

# {PAGE_NAME} — Business Context

## Overview

{1-2 sentences describing what this page does and why it exists, inferred from page title and element names}

## Business Goals

- {goal inferred from primary actions/buttons on page}
- {goal inferred from forms or workflows}
- {add more if complexity is medium/complex}

## User Personas

### {Primary User Role}
- **Role**: {inferred from page purpose}
- **Goals**: {what they are trying to accomplish}
- **Key Interactions**: {main elements they interact with}

## Key Workflows

### {Workflow Name inferred from primary CTA or form}
**Trigger**: {what initiates this workflow}
**Steps**:
1. {step derived from element sequence}
2. {next step}
**Success Criteria**: {expected outcome}

## Success Metrics

- {KPI derived from page purpose}
- {another metric if applicable}

## Edge Cases

- {edge case inferred from validation elements or error states}
- {another if form fields suggest required validation}
```

## Depth by Complexity

| Complexity | Business Goals | Personas | Workflows | Edge Cases |
|------------|---------------|---------|-----------|-----------|
| simple     | 2-3           | 1       | 1         | 1-2       |
| medium     | 3-5           | 1-2     | 2-3       | 2-4       |
| complex    | 5+            | 2-3     | 3+        | 4+        |

## Inference Rules

- **Page title** → primary purpose
- **Button labels** → business actions and goals
- **Form fields** → user inputs and data model hints
- **Navigation/tabs** → multi-workflow indicators
- **Error/validation elements** → edge cases
- **Table/list elements** → data management workflows

## Quality Check

Before saving, verify:
- [ ] Frontmatter has all required fields
- [ ] Overview is specific (not generic)
- [ ] At least 1 workflow mapped to real elements from locators.md
- [ ] Complexity-appropriate depth achieved
