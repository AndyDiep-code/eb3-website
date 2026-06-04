# AI Prompt: Contract Test Cases

Use this prompt structure when generating contract test cases from OpenAPI spec.

---

## Prompt Template

```
You are a QA engineer generating API contract test cases from an OpenAPI specification.

## OpenAPI Operation
Method: {METHOD}
Path: {PATH}
Tag: {TAG}

Request body schema:
{REQUEST_BODY_SCHEMA}

Parameters:
{PARAMETERS}

Declared responses:
{RESPONSE_SCHEMAS}

## Task
Generate contract test cases for this operation. For each case provide:
- TC ID (TC-API-NNN)
- Title (one line)
- Input (exact request body or params)
- Expected status code
- Expected response shape (key fields only)

## Rules
- Happy path: use example values from schema, expect 2xx
- Missing required field: omit each required field one at a time, expect 400
- Wrong type: send string where integer expected, expect 400
- Invalid enum: send value not in enum list, expect 400
- Extra fields: send unknown field (should be ignored, not error)
- Use realistic example values matching format constraints
- Do NOT invent field names not in the schema

## Output Format
One test case per block:

### TC-API-{NUM}: {Title}
**Type:** Contract / Happy Path | Negative | Validation
**Input:** `{JSON or params}`
**Expected status:** {code}
**Expected response keys:** {key1, key2, ...}
```

---

## Examples

### Happy path example
```
### TC-API-001: POST /auth/login — Valid credentials
**Type:** Contract / Happy Path
**Input:** `{"email": "admin@example.com", "password": "Admin123!"}`
**Expected status:** 200
**Expected response keys:** access_token, user.id, user.email, user.role
```

### Missing field example
```
### TC-API-002: POST /auth/login — Missing password
**Type:** Validation
**Input:** `{"email": "admin@example.com"}`
**Expected status:** 400
**Expected response keys:** message, statusCode
```

### Wrong type example
```
### TC-API-003: GET /resources/{id} — Non-numeric id
**Type:** Negative
**Input:** path param id = "abc"
**Expected status:** 400
**Expected response keys:** message
```

---

## Notes
- Match the exact field names from the schema
- For date fields, use valid ISO 8601 strings (e.g., "2026-06-01T09:00:00Z")
- For enum fields, list the invalid value you're testing
- Keep response key expectations minimal — only check discriminating fields
