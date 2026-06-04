# GraphQL AI Test Case Generation — Step-by-Step

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; NC='\033[0m'
```

Header:
```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  QAKit — GraphQL Test Case Gen       ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

---

## STEP 1: Parse Arguments

Extract:
- `GQL_URL` from `--url=` (REQUIRED — stop if missing)
- `TASK_ID` from `--task=` (REQUIRED — stop if missing)
- `LOGIN_QUERY` from `--login-query=` (optional)
- `TOKEN_PATH` from `--token-path=` (optional, default: `data.login.token`)

Derive paths:
- `GQL_DIR="test-tasks/playwright/${TASK_ID}/test-cases/gql"`
- `INTROSPECTION_FILE="${GQL_DIR}/introspection.json"`
- `TEST_CASES_FILE="${GQL_DIR}/test-cases.md"`
- `GQL_SPEC_FILE="${GQL_DIR}/gql-spec.json"`

Log: `ℹ  Task: ${TASK_ID} | URL: ${GQL_URL}`

---

## STEP 2: Verify + Fetch Full Introspection

```bash
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${GQL_URL}" \
  -H "Content-Type: application/json" \
  -d '{"query":"{__typename}"}')
[ "$STATUS" != "200" ] && echo "❌ GraphQL endpoint not reachable" >&2 && exit 1

mkdir -p "${GQL_DIR}"

curl -s -X POST "${GQL_URL}" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { queryType { name fields { name description args { name type { kind name ofType { name kind } } defaultValue } type { kind name ofType { name kind } } } } mutationType { name fields { name description args { name type { kind name ofType { name kind } } defaultValue } type { kind name ofType { name kind } } } } types { name kind description fields { name args { name type { kind name } } type { kind name ofType { name kind } } } } } }"}' \
  -o "${INTROSPECTION_FILE}"

python3 -c "
import json
s = json.load(open('${INTROSPECTION_FILE}'))
schema = s['data']['__schema']
types = [t for t in schema['types'] if not t['name'].startswith('__')]
qt = schema.get('queryType', {}).get('name')
mt = (schema.get('mutationType') or {}).get('name')
q = next((t for t in types if t['name'] == qt), None)
m = next((t for t in types if t['name'] == mt), None)
print(f'Queries: {len(q[\"fields\"]) if q else 0}, Mutations: {len(m[\"fields\"]) if m else 0}, Types: {len(types)}')
"
```

Log: `ℹ  Schema: {Q} queries, {M} mutations, {T} types`

---

## STEP 3: Parse Operations

Read `${INTROSPECTION_FILE}` and extract **ALL** Queries and Mutations:
- Operation name + description
- Arguments (name, type, required = type.kind == NON_NULL)
- Return type
- Detect auth patterns (operations containing "me", "profile", "admin" in name or description)
- Detect token-returning mutations (return type has fields named token/access_token/jwt)

**⚠️ CRITICAL — Count validation (prevents silent truncation):**

```python
import json
data = json.load(open(INTROSPECTION_FILE))
schema = data['data']['__schema']
types = {t['name']: t for t in schema['types']}
qt = schema.get('queryType', {}).get('name')
mt = (schema.get('mutationType') or {}).get('name')
q_fields = types[qt]['fields'] if qt and qt in types else []
m_fields = types[mt]['fields'] if mt and mt in types else []
TOTAL_OPS = len(q_fields) + len(m_fields)
print(f'Schema has {len(q_fields)} queries + {len(m_fields)} mutations = {TOTAL_OPS} total')
print(f'Queries: {[f["name"] for f in q_fields]}')
print(f'Mutations: {[f["name"] for f in m_fields]}')
```

Log every operation name. The `operations` array in gql-spec.json MUST contain
exactly `TOTAL_OPS` entries — one per operation. Never skip or truncate.

---

## STEP 4: Detect Meta for gql-spec.json

Analyze introspection to auto-detect all meta values needed by Skill 3.

**Standard detections:**
- `loginMutation`: mutation whose return type has a field named `token`, `access_token`, or `jwt`
- `tokenPath`: `data.{loginMutationName}.{tokenFieldName}` e.g. `data.login.token`
- `tokenResponseKey`: the actual token field name (`token`, `access_token`, `jwt`)
- `meQuery`: query returning User type with name containing "me" or "currentUser"
- `userRoleField`: field on User type named `role`, `userRole`, `type`
- `adminRoleValue`: check enum values or default to `"admin"`

**Generic ID resolution (CRITICAL — Skill 3 depends on this):**
- `userListQuery`: Look for a Query field returning `[User!]!` or `[User]` array.
  Build the query body as: `{queryFieldName} { id {userRoleField} }`
  Example: Query has `users: [User!]!` → set `"users { id role }"`
  If no user list query exists → set to `""` (resolveEntityIds() will be skipped)

- `idType`: Infer from introspection or sample data:
  - ID scalar is always `String` in GraphQL spec, but actual values vary
  - Run a test query and check ID format: UUID patterns = `"uuid"`, numerics = `"integer"`, otherwise = `"auto"`

**Credentials (supports N roles, not just 2):**
- Always include `admin` + `user`
- Add additional credential entries for any other roles present in the API
- Format: `{ "roleName": { "query": "mutation { login(...) { token } }" } }`

---

## STEP 5: Verify Auth (if --login-query provided)

```bash
RESPONSE=$(curl -s -X POST "${GQL_URL}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"${LOGIN_QUERY}\"}")

AUTH_TOKEN=$(echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin).get('data', {})
    for key in data:
        v = data[key]
        if isinstance(v, dict):
            t = v.get('token') or v.get('access_token') or v.get('jwt')
            if t: print(t); sys.exit(0)
    print('')
except: print('')
")
[ -n "${AUTH_TOKEN}" ] && echo "ℹ  Auth verified — login works" || echo "⚠  Auth not verified — note in output"
```

---

## STEP 6: AI Generate Test Cases

Read prompt: `Read(".claude/skills/playwright-gql-from-schema/references/prompts/gql-test-cases.md")`

For each operation generate:

### 6a. Happy Path
- Valid args → data field exists, errors absent
- Check return type shape (required fields present)

### 6b. Auth/RBAC
- No token → errors array with Unauthorized/Unauthenticated message
- Wrong role → errors array with Forbidden message (if role-specific)
- Valid token → data returned correctly

### 6c. Input Validation
- Missing required args → GraphQL validation error (before resolver runs)
- Wrong arg type → GraphQL validation error
- Null required arg → validation error

### 6d. Business Logic (inferred from operation names + types)
- Multi-step: login → use token → call protected operation
- State changes: create → verify → delete
- Cross-entity: operations that reference other types

**Format each test case as:**
```
### TC-GQL-{N}: {query|mutation} {operationName} — {scenario}
Auth: {Bearer ADMIN_TOKEN | Bearer USER_TOKEN | none}
Query:
  {full query string with variable declarations}
Variables: {JSON or "none"}
Expected:
  data.{field} exists
  errors: absent
  OR errors[0].message contains "Unauthorized"
```

Log per operation: `ℹ  {operationName}: N test cases ({H} happy, {N} negative, {A} auth)`

---

## STEP 7: Write Outputs

### 7a. test-cases.md
Write `${TEST_CASES_FILE}`:
```
# GraphQL Test Cases: {TASK_ID}
## Queries
### TC-GQL-001: ...
## Mutations
### TC-GQL-020: ...
```

### 7b. gql-spec.json
Write `${GQL_SPEC_FILE}` — read format from:
`Read(".claude/skills/playwright-gql-from-schema/references/gql-spec-format.md")`

**Before writing, self-check:**
- `operations` array length == `TOTAL_OPS` from STEP 3 (no missing operations)
- Variable names are descriptive (`$email`, `$password`, `$amount`) not short aliases (`$e`, `$p`, `$a`)
- `credentials`: no duplicate queries — each role should have distinct credentials
- `validVariables` never contains placeholder strings like `"DYNAMIC_UUID"` — use actual seeded values
  where known, or document that `resolveEntityIds()` will fill them at runtime

---

## STEP 8: Print Summary

```
╔══════════════════════════════════════╗
║  GraphQL Test Cases Generated        ║
╚══════════════════════════════════════╝

  Task:           {TASK_ID}
  Endpoint:       {GQL_URL}
  Operations:     {Q} queries + {M} mutations
  Test cases:     {TOTAL}
    Happy path:   {N}
    Negative:     {N}
    Auth/RBAC:    {N}

  Output:
    test-cases.md  → {TEST_CASES_FILE}
    gql-spec.json  → {GQL_SPEC_FILE}

→ Next: /playwright-gql-supertest --task={TASK_ID} --run
→ Or:   /playwright-gql-schemathesis --url={GQL_URL} --task={TASK_ID} (if not run yet)
```
