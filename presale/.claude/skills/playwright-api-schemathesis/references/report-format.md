# Schemathesis Report Format

Output file: `test-tasks/playwright/{task-id}/reports/schemathesis-report.md`

---

## Template

```markdown
---
task: {task-id}
generated: {YYYY-MM-DD}
tool: schemathesis
server: {BASE_URL}
spec: {BASE_URL}/api-json
auth: {yes|no}
---

# Schemathesis Contract Testing Report

## Summary

| Metric | Value |
|--------|-------|
| Endpoints tested | {N} |
| Test cases generated | {N} |
| Passed | {N} |
| Failures | {N} |
| Errors (5xx) | {N} |
| Slow responses (>2s) | {N} |
| Duration | {Xs} |

**Overall:** ✅ PASS / ❌ FAIL

---

## Endpoint Coverage

| Method | Path | Cases | Status |
|--------|------|-------|--------|
| GET | /auth/register | N | ✅ |
| POST | /auth/login | N | ✅ |
| GET | /resources | N | ✅ |
| ... | ... | ... | ... |

---

## Failures (if any)

### ❌ {METHOD} {PATH}

**Failure type:** {not_a_server_error | response_schema | status_code_conformance}

**Triggered by input:**
```json
{request body or query params that caused failure}
```

**Server response:**
- Status: {code}
- Body: `{response excerpt}`

**OpenAPI spec says:**
- Expected status: {expected codes}
- Expected schema: `{schema excerpt}`

**Root cause:** {AI analysis — 1-2 sentences}

**Suggested fix:** {AI suggestion — 1-2 sentences}

---

## Slow Endpoints (if any)

| Method | Path | Response Time | Threshold |
|--------|------|---------------|-----------|
| GET | /bookings | 2340ms | 2000ms |

---

## AI Analysis

{AI summary paragraph — overall health of the API contract, patterns in failures,
key risks, and recommended next steps}

---

## Next Steps

→ Fix any failures above before proceeding
→ Run business logic tests: `/qakit:playwright:api-supertest --task={task-id}`
→ Or generate test cases: `/qakit:playwright:api-from-openapi --url={BASE_URL} --task={task-id}`
```

---

## Status Rules

| Condition | Overall Status |
|-----------|---------------|
| 0 failures, 0 errors | ✅ PASS |
| Any failure or error | ❌ FAIL |
| Only slow endpoints | ⚠️ PASS WITH WARNINGS |

## Endpoint Status Rules

| Schemathesis result | Status |
|---------------------|--------|
| All cases passed | ✅ |
| Any case failed | ❌ |
| Skipped (no schema) | ⚠️ |

## Failure Types (Schemathesis checks)

| Check | Meaning |
|-------|---------|
| `not_a_server_error` | Server returned 5xx — crash or unhandled exception |
| `status_code_conformance` | Status code not in OpenAPI spec's declared responses |
| `response_schema_conformance` | Response body doesn't match declared schema |
| `response_headers_conformance` | Missing or wrong Content-Type header |
| `max_response_time` | Response exceeded `--max-response-time` threshold |
