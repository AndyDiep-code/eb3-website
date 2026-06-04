# UI Test Case Template

Mandatory template for all `test-cases.md` files. Use this to generate and validate test case structure.

---

## File Header (once per file)

```markdown
# Test Cases: {PageName}

| Field | Value |
|-------|-------|
| Generated | {YYYY-MM-DD} |
| Page | {PageName} |
| URL | {page_url} |
| Module | {module_name} |
| Total Cases | {count} |
| Scope | {one-line scope description} |
```

---

## Per Test Case

```markdown
## TC-{TYPE}-{NUM}: {Test Case Title}

| Field | Value |
|-------|-------|
| Priority | High / Medium / Low |
| Type | Positive / Negative / Edge / Validation |
| Category | {see categories below} |
| Module | {module_name} |
| Tags | {see tags below} |

### Test Steps

| Step | Action | Element | Expected Result |
|------|--------|---------|-----------------|
| 1 | Navigate to | {URL} | Page loads successfully |
| 2 | Verify visible | {ElementName} [ref=eX] | Element displayed |
| 3 | Fill | {ElementName} [ref=eX] | Value accepted |
| 4 | Click | {ElementName} [ref=eX] | Action performed |
| 5 | Verify result | {ElementName} [ref=eX] | Expected outcome |

### Elements

| Name | Ref | Selector |
|------|-----|----------|
| {ElementName} | eX | `{playwright_selector}` |

### Expected Results

- Result 1
- Result 2
```

---

## File Footer (once per file)

```markdown
## Test Summary

| Category | Test Cases | Priority | Tags |
|----------|-----------|----------|------|
| {category} | TC-HP-001, ... | High | smoke, regression |

| Priority | Count |
|----------|-------|
| High | X |
| Medium | Y |
| Low | Z |
| **Total** | **N** |
```

---

## Reference: TC ID Prefixes

| Prefix | Type | When |
|--------|------|------|
| `TC-HP-{NUM}` | Happy Path / Positive | Valid inputs, normal flow |
| `TC-NEG-{NUM}` | Negative | Invalid inputs, error states |
| `TC-EDGE-{NUM}` | Edge Case | Boundary values, extremes |
| `TC-VAL-{NUM}` | Validation | Required fields, format rules |
| `TC-F-{NUM}` | Feature flow | Cross-page flows (`features/` folder) |
| `TC-API-{NUM}` | API | API-only test cases (`api/` folder) |

## Reference: Priority Levels

| Priority | When |
|----------|------|
| High | Critical business flow — must pass before release |
| Medium | Important feature — should pass |
| Low | Nice to have — can defer |

## Reference: Categories

Authentication · Authorization · Form Submission · Navigation · Validation · Error Handling · Performance · Search · Filter · Pagination

## Reference: Tags

| Tag | When |
|-----|------|
| `smoke` | Quick sanity check — run first |
| `regression` | Full test suite |
| `critical` | Business critical — highest risk |
| `e2e` | End-to-end multi-page flow |
| `sanity` | Basic functionality check |
