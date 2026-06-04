# GraphQL Schemathesis Report Format

Output file: `test-tasks/playwright/{task-id}/reports/schemathesis-gql-report.md`

## Template

```
---
task: {task-id}
generated: {YYYY-MM-DD}
tool: schemathesis
endpoint: {GQL_URL}
auth: {yes|no}
---

# Schemathesis GraphQL Contract Testing Report

## Summary

| Metric | Value |
|--------|-------|
| Operations tested | {N} queries + {M} mutations |
| Test cases generated | {N} |
| Passed | {N} |
| Failures | {N} |
| Errors (resolver crashes) | {N} |
| Slow responses (>3s) | {N} |
| Duration | {Xs} |

Overall: PASS / FAIL

Note: GraphQL always returns HTTP 200. Failures include HTTP 200 + errors array responses.
Introspection is enabled — disable in production environments.

## Operation Coverage

| Type | Operation | Cases | Status |
|------|-----------|-------|--------|
| query | me | N | OK |
| mutation | login | N | OK |

## Failures (if any)

### FAIL: {query|mutation} {operationName}

Failure type: {not_a_server_error | response_schema_conformance | graphql_errors}

Triggered by: {variables JSON}

Response: HTTP 200, body: {"errors": [{"message": "..."}]}

Root cause: {AI analysis}

Suggested fix: {1-2 sentences}

## Security Notes

- Introspection is enabled — disable in production
- Subscriptions (if found) are not tested by schemathesis

## AI Analysis

{Overall health, patterns, risks, next steps}

## Next Steps

Next: /playwright-gql-from-schema --url={GQL_URL} --task={task-id}
```

## Status Rules

| Condition | Status |
|-----------|--------|
| 0 failures, 0 errors | PASS |
| Any failure or error | FAIL |
| Only slow operations | PASS WITH WARNINGS |

## GraphQL Failure Types

| Check | Meaning |
|-------|---------|
| not_a_server_error | Resolver threw unhandled exception |
| response_schema_conformance | Response body shape doesn't match schema |
| graphql_errors | HTTP 200 + errors array present |
| max_response_time | Response exceeded --max-response-time threshold |
