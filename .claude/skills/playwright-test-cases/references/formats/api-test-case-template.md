# API Test Case Template

Mandatory template for all `test-cases/api/test-cases.md` files.

---

## File Header (once per file)

```markdown
# API Test Cases: {ModuleName}

| Field | Value |
|-------|-------|
| Generated | {YYYY-MM-DD} |
| Source | network-calls.json |
| Module | {module_name} |
| Endpoints | {count} |
| Total Cases | {count} |
```

---

## Per Test Case

```markdown
## API-{ENDPOINT}-001: {HTTP_METHOD} {EndpointPath}

| Field | Value |
|-------|-------|
| Priority | High / Medium / Low |
| Type | Positive / Negative / Edge / Validation / Security / Performance |
| Category | {see categories below} |
| Module | {module_name} |
| Tags | {see tags below} |

### Request Details

| Field | Value |
|-------|-------|
| Method | {HTTP_METHOD} |
| URL | {endpoint_path} |
| Headers | Content-Type: application/json, Authorization: Bearer {token} |
| Body | { "field1": "value1" } |
| Query Params | page=1, limit=20 |

### Expected Response

| Field | Value |
|-------|-------|
| Status | 200 |
| Headers | Content-Type: application/json |
| Body | { "success": true, "data": {...} } |
| Duration | <500ms |

### Response Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| success | boolean | Yes | Operation status |
| data | object | Yes | Response payload |
| data.id | string | Yes | Resource identifier |
| error | string | No | Error message if failed |

### Test Steps

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Prepare request body with valid data | Request prepared |
| 2 | Send {HTTP_METHOD} to {endpoint_path} | Request accepted |
| 3 | Verify response status is 200 | Status code matches |
| 4 | Verify response schema | Schema validation passes |
| 5 | Verify response time < 500ms | Performance requirement met |

### Curl Command

```bash
curl -X {HTTP_METHOD} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{ "field1": "value1" }' \
  https://api.example.com{endpoint_path}
```
```

---

## Reference: Test Case Types

| Type | % of cases | When |
|------|-----------|------|
| Positive (Happy Path) | 70% | Valid request, expected success, correct status, schema validation |
| Validation | 15% | Missing fields, wrong types, invalid formats → 400 error |
| Security | 10% | XSS/SQL injection rejection, auth checks → 400/401/403 |
| Performance | 5% | Response time assertions based on captured baseline |
| Integration | bonus | Multi-step flows, data dependencies, state persistence |

## Reference: Priority Levels

| Priority | When |
|----------|------|
| High | Critical endpoints — must pass before release |
| Medium | Important endpoints — should pass |
| Low | Nice to have — can defer |

## Reference: Categories

Authentication · Authorization · CRUD Operations · Validation · Error Handling · Performance · Security · Integration

## Reference: Tags

| Tag | When |
|-----|------|
| `smoke` | Quick sanity check — run first |
| `regression` | Full test suite |
| `critical` | Business critical — highest risk |
| `security` | Security-focused test |
| `performance` | Performance assertion |
