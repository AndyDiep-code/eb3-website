# AI Test Case Generation — Step-by-Step

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; NC='\033[0m'
```

Header:
```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  QAKit — AI Test Case Generation     ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

---

## STEP 1: Parse Arguments

Extract:
- `BASE_URL` from `--url=` (REQUIRED — stop if missing)
- `TASK_ID` from `--task=` (REQUIRED — stop if missing)
- `SOURCE_PATH` from `--source=` (optional)
- `LOGIN_URL` from `--login-url=` (optional)
- `LOGIN_BODY` from `--login-body=` (optional)
- `PAGE_FILTER` from `--page=` (optional, default: all)
- `SPEC_PATH` from `--spec-path=` (optional, default: auto-detect)

Derive paths:
- `SPEC_FILE="test-tasks/playwright/${TASK_ID}/test-cases/api/openapi-spec.json"`
- `TEST_CASES_FILE="test-tasks/playwright/${TASK_ID}/test-cases/api/test-cases.md"`
- `API_SPEC_FILE="test-tasks/playwright/${TASK_ID}/test-cases/api/api-spec.json"`
- `OUTPUT_DIR="test-tasks/playwright/${TASK_ID}/test-cases/api"`

Log: `ℹ  Task: ${TASK_ID} | URL: ${BASE_URL} | Source: ${SOURCE_PATH:-none}`

---

## STEP 2: Verify Server + Fetch OpenAPI Spec

If `--spec-path` provided → `OPENAPI_URL="${BASE_URL}${SPEC_PATH}"`

Otherwise auto-detect (try in order):
```bash
for path in /api-json /openapi.json /api-docs /swagger.json /v3/api-docs; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${path}")
  [ "$STATUS" = "200" ] && OPENAPI_URL="${BASE_URL}${path}" && break
done
if [ -z "$OPENAPI_URL" ]; then
  echo "❌ ERROR: No OpenAPI spec found. Try --spec-path=/your/path" >&2; exit 1
fi
```

| Framework | Default spec path |
|-----------|------------------|
| NestJS (Swagger) | `/api-json` |
| FastAPI | `/openapi.json` |
| Spring Boot | `/v3/api-docs` |
| Express-openapi | `/api-docs` |

Fetch and save spec:
```bash
mkdir -p "${OUTPUT_DIR}"
curl -s "${BASE_URL}/api-json" > "${SPEC_FILE}"
```

Verify spec has `paths` key:
```bash
python3 -c "import json,sys; s=json.load(open('${SPEC_FILE}')); print(len(s.get('paths',{})), 'paths')"
```

Log: `ℹ  OpenAPI spec: ${N} paths, ${M} operations fetched from ${BASE_URL}/api-json`

---

## STEP 3: Parse OpenAPI Spec

Read `${SPEC_FILE}` and extract:

**For each path+method (operation):**
- HTTP method + path
- Auth requirement (check `security` field, or if `@ApiBearerAuth` pattern)
- Request body schema (properties, required fields, types, formats)
- Path/query parameters (name, type, required)
- Response schemas per status code
- Tags (maps to module/controller name)

**Build operation inventory:**
```
OPERATIONS = [
  {
    method: "POST",
    path: "/auth/login",
    auth: false,
    requestBody: { email: string, password: string },
    responses: { 200: {...} },
    tag: "auth"
  },
  ...
]
```

Filter by `--page` if provided (match tag or path prefix).

**⚠️ CRITICAL — Count validation (prevents silent truncation):**

```python
import json
spec = json.load(open(SPEC_FILE))
paths = spec.get('paths', {})
HTTP_METHODS = {'get', 'post', 'put', 'patch', 'delete', 'options', 'head'}
all_ops = [
    (method.upper(), path)
    for path, methods in paths.items()
    for method in methods
    if method.lower() in HTTP_METHODS
]
TOTAL_OPS = len(all_ops)
print(f'OpenAPI spec has {TOTAL_OPS} operations:')
for method, path in sorted(all_ops, key=lambda x: x[1]):
    print(f'  {method:6} {path}')
```

Log every operation path+method. The `operations` array in api-spec.json MUST contain
exactly `TOTAL_OPS` entries (or filtered count if `--page` is set). Never skip or truncate.

Log: `ℹ  Operations: ${N} total${PAGE_FILTER:+, filtered to: ${PAGE_FILTER}}`

---

## STEP 4: Read Source Code Context (if --source provided)

If `SOURCE_PATH` provided, read for business context:

**Auto-detect language:**
```bash
# Detect language from file presence
if ls ${SOURCE_PATH}/**/*.py 2>/dev/null | head -1 | grep -q '.'; then LANG="python"
elif ls ${SOURCE_PATH}/**/*.java 2>/dev/null | head -1 | grep -q '.'; then LANG="java"
elif ls ${SOURCE_PATH}/**/*.ts 2>/dev/null | head -1 | grep -q '.'; then LANG="typescript"
else LANG="unknown"; fi
echo "ℹ  Detected language: ${LANG}"
```

**Find and read per language:**
```bash
if [ "$LANG" = "typescript" ]; then
  # TypeScript / NestJS / Express
  find "${SOURCE_PATH}" -name "*.controller.ts" | head -20
  find "${SOURCE_PATH}" -name "*.service.ts" | head -20
  find "${SOURCE_PATH}" -name "*.dto.ts" | head -20
  find "${SOURCE_PATH}" -name "*.entity.ts" | head -20
elif [ "$LANG" = "python" ]; then
  # Python / FastAPI / Django / Flask
  find "${SOURCE_PATH}" -name "routes.py" -o -name "views.py" -o -name "*router*.py" | head -20
  find "${SOURCE_PATH}" -name "schemas.py" -o -name "serializers.py" | head -20
  find "${SOURCE_PATH}" -name "models.py" | head -20
  find "${SOURCE_PATH}" -name "services.py" -o -name "*service*.py" | head -20
elif [ "$LANG" = "java" ]; then
  # Java / Spring Boot
  find "${SOURCE_PATH}" -name "*Controller.java" | head -20
  find "${SOURCE_PATH}" -name "*Service.java" | head -20
  find "${SOURCE_PATH}" -name "*Entity.java" -o -name "*Repository.java" | head -20
fi
```

Read key files (max 5 per category). Extract:
- Guard/decorator patterns → which endpoints require which roles
- Service validation logic → business rules not visible in spec
- DTO/schema constraints → @Min, @Max, @IsEmail, @MinLength, enum values
- Entity/model relationships → FK constraints, cascade rules

Log: `ℹ  Source context: ${N} files read (${LANG}: controllers, services, DTOs/schemas, entities/models)`

---

## STEP 5: Verify Auth Works (if --login-url provided)

```bash
RESPONSE=$(curl -s -X POST "${BASE_URL}${LOGIN_URL}" \
  -H "Content-Type: application/json" \
  -d "${LOGIN_BODY}")
TOKEN=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('access_token',''))" 2>/dev/null)
```

- Token obtained → log: `ℹ  Auth verified — login flow works`
- Token empty → log: `⚠  Auth verification failed — generated test cases will note login step`

Do NOT fail here — just note in output.

---

## STEP 6: AI Generate Test Cases

**Read prompt templates:**
- `Read(".claude/skills/playwright-api-from-openapi/references/prompts/contract-cases.md")`
- `Read(".claude/skills/playwright-api-from-openapi/references/prompts/business-cases.md")`

**For each operation, generate:**

### 6a. Contract Test Cases
Using the operation's schema, generate cases that verify:
- Happy path: valid request → expected 2xx response with correct shape
- Missing required fields → 400
- Wrong field types/formats → 400
- Invalid enum values → 400

### 6b. Auth/RBAC Test Cases
Based on auth requirements:
- No token → 401
- Wrong role token → 403 (if role-specific)
- Valid token correct role → 200/201/204

### 6c. Business Logic Test Cases
Based on source code context (if available) or inferred from spec:
- Multi-step flows (login → use token → create resource → verify)
- State transitions (pending → confirmed → cancelled)
- Cross-entity rules (delete resource with bookings → conflict)
- Boundary validations (startTime must be before endTime)

### 6d. Edge Cases
- Non-existent IDs → 404
- Duplicate unique fields → 409
- Boundary values (ID = 0, very large number, float ID)

**Write each module's cases:**
Log per module: `ℹ  [module] N test cases generated (P happy, N negative, E edge)`

---

## STEP 7: Write Outputs

### 7a. test-cases.md
Write to `${TEST_CASES_FILE}` following `references/test-case-format.md`.

Structure:
```
# API Test Cases: {TASK_ID}
## Auth Module
### TC-API-001: POST /auth/login — Happy Path
...
## Resources Module
...
## Bookings Module
...
```

### 7b. api-spec.json
Write normalized spec to `${API_SPEC_FILE}` — machine-readable summary for Phase 3.

Detect `meta` values from the spec at generation time:
- `authLoginPath`: POST endpoint with email+password body → that's the auth login path
- `tokenResponseKey`: field name in login 200 response schema (`access_token`, `token`, `jwt`)
- `userListPath`: GET endpoint returning array of users
- `userRoleField`: field on user schema holding the role (`role`, `user_role`, etc.)
- `adminRoleValue`: enum value identifying admin (`admin`, `ADMIN`, `superuser`)
- `resourceCreatePath`: POST endpoint creating a simple entity (for test setup/teardown)
- `resourceDeletePath`: DELETE endpoint for the same entity

```json
{
  "task": "${TASK_ID}",
  "baseUrl": "${BASE_URL}",
  "generatedFrom": "openapi-spec",
  "specUrl": "${OPENAPI_URL}",
  "meta": {
    "framework": "nestjs|express|fastapi|spring|auto-detected",
    "authLoginPath": "/auth/login",
    "tokenResponseKey": "access_token",
    "userListPath": "/users",
    "userRoleField": "role",
    "adminRoleValue": "admin",
    "resourceCreatePath": "/resources",
    "resourceDeletePath": "/resources/{id}"
  },
  "operations": [
    {
      "id": "POST /auth/login",
      "method": "POST",
      "path": "/auth/login",
      "auth": false,
      "roles": [],
      "requestBody": { "email": "string|email", "password": "string|min:6" },
      "responses": { "200": { "access_token": "string", "user": {} } },
      "validExample": { "email": "admin@example.com", "password": "Admin123!" },
      "invalidExamples": [
        { "case": "wrong-password", "body": {"email": "admin@example.com", "password": "wrong"}, "expectedStatus": 401 }
      ]
    }
  ]
}
```

**Before writing, self-check:**
- `operations` array length == `TOTAL_OPS` from STEP 3 (no missing endpoints)
- Every path+method from the OpenAPI spec appears in the array — including `GET /{id}`, `PUT /{id}`, `DELETE /{id}` variants
- `validExample` uses real seeded values, not invented placeholder strings
- `meta.userListPath` points to an actual GET endpoint returning an array

---

## STEP 8: Print Summary

```
╔══════════════════════════════════════╗
║  API Test Cases Generated            ║
╚══════════════════════════════════════╝

  Task:           {TASK_ID}
  Server:         {BASE_URL}
  Operations:     {N}
  Test cases:     {TOTAL}
    Happy path:   {N}
    Negative:     {N}
    Auth/RBAC:    {N}
    Edge cases:   {N}

  Output:
    test-cases.md  → {TEST_CASES_FILE}
    api-spec.json  → {API_SPEC_FILE}

→ Next: /playwright-api-supertest --task={TASK_ID} --framework=nestjs
→ Or:   /playwright-api-schemathesis --url={BASE_URL} --task={TASK_ID} (if not run yet)
```
