# Data Model Generation Guide

Generate `data-model.md` from captured form fields and network calls. This doc provides field definitions and validation rules for test data generation.

## Input Files to Read

1. `locators.md` — form inputs, selects, checkboxes, textareas
2. `network-calls.json` — request/response bodies, field names (if available)
3. `metadata.json` — page complexity

## Output File

`./test-tasks/playwright/{TASK_ID}/docs/{PAGE_NAME}/data-model.md`

## Output Format

```markdown
---
title: {PAGE_NAME} Data Model
pageUrl: {URL}
complexity: {simple|medium|complex}
generatedAt: {ISO timestamp}
---

# {PAGE_NAME} — Data Model

## Form Fields

| Field Name | Element Type | Required | Validation Rules | Test Values |
|-----------|-------------|----------|-----------------|-------------|
| {name inferred from label/placeholder} | input/select/textarea | yes/no/unknown | {rules inferred from element} | valid: `{val}`, invalid: `{val}` |

## API Contracts

### {HTTP Method} {endpoint path}

**Purpose**: {inferred from endpoint name and context}

**Request Body**:
```json
{
  "{field}": "{type} — {description}"
}
```

**Response Shape**:
```json
{
  "{field}": "{type} — {description}"
}
```

**Status Codes**:
- `200` — success
- `400` — validation error
- `401` — unauthorized (if auth-protected)

## Validation Rules

| Field | Rule | Error Message |
|-------|------|--------------|
| {field} | required | "{field} is required" |
| {field} | {format rule} | "{expected format message}" |

## Test Data Sets

### Valid Data
```json
{
  "{field}": "{valid example value}"
}
```

### Invalid Data — Required Fields Missing
```json
{
  "{required field}": ""
}
```

### Boundary Values
- Min length: `{shortest valid input}`
- Max length: `{longest valid input}`
- Special chars: `{if applicable}`
```

## Field Type Inference Rules

| Element Type | Inferred Field Type | Default Validation |
|-------------|--------------------|--------------------|
| `input[type=email]` | email | required + email format |
| `input[type=password]` | password | required + min 8 chars |
| `input[type=number]` | number | numeric only |
| `input[type=date]` | date | valid date format |
| `input[type=text]` | string | required if label has `*` |
| `select` | enum | one of visible options |
| `textarea` | string (long) | optional unless `*` |
| `checkbox` | boolean | — |
| `input[type=file]` | file | allowed types from accept attr |

## Network-Driven Field Discovery

If `network-calls.json` exists with request bodies:
- Extract field names from POST/PUT/PATCH request bodies
- Map to form elements by name similarity
- Add API-observed types to the Field table
- Add endpoint path to API Contracts section

## Depth by Complexity

| Complexity | Fields | API Contracts | Test Data Sets |
|------------|--------|--------------|---------------|
| simple     | all fields | 0-1 | valid + invalid |
| medium     | all fields | 1-3 | valid + invalid + boundary |
| complex    | all fields | 3+ | valid + invalid + boundary + edge |

## Quality Check

Before saving, verify:
- [ ] Every form input from locators.md is in the Fields table
- [ ] Test values are realistic (not "test123" for email — use "user@example.com")
- [ ] At least one valid and one invalid test data set
- [ ] API Contracts populated if network-calls.json has POST/PUT/PATCH calls
