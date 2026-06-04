# GraphQL Supertest Generation & Execution — Step-by-Step

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; NC='\033[0m'
```

Header:
```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  QAKit — GraphQL Supertest Gen       ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

---

## STEP 1: Parse Arguments

Extract:
- `TASK_ID` from `--task=` (REQUIRED)
- `RUN_TESTS` from `--run` flag (boolean, default: false)
- `GQL_URL_OVERRIDE` from `--url=` (optional override)

Derive paths:
- `GQL_SPEC="test-tasks/playwright/${TASK_ID}/test-cases/gql/gql-spec.json"`
- `TEST_CASES="test-tasks/playwright/${TASK_ID}/test-cases/gql/test-cases.md"`
- `TEST_DIR="test-tasks/playwright/${TASK_ID}/test-runner"`

Log: `ℹ  Task: ${TASK_ID} | Run: ${RUN_TESTS}`

---

## STEP 2: Validate Prerequisites

```bash
[ -f "${GQL_SPEC}" ] || { echo "❌ gql-spec.json not found. Run playwright-gql-from-schema first." >&2; exit 1; }
[ -f "${TEST_CASES}" ] && echo "ℹ  test-cases.md found — using for richer test generation"
```

Read `${GQL_SPEC}`:
- Extract `endpoint` (use GQL_URL_OVERRIDE if provided)
- Extract `meta`, `credentials`, `operations[]`
- Log: `ℹ  Spec: {Q} queries + {M} mutations`

---

## STEP 3: Setup Test Runner Directory

```bash
mkdir -p "${TEST_DIR}/test/gql"
cd "${TEST_DIR}"
```

Check Node.js version for vitest compatibility:
```bash
NODE_MAJOR=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
[ "${NODE_MAJOR}" -ge 22 ] && VITEST_VER="latest" || VITEST_VER="^2.1.0"
echo "ℹ  Node ${NODE_MAJOR} → vitest@${VITEST_VER}"
```

---

## STEP 4: Install Dependencies

```bash
cd "${TEST_DIR}"

# Init package.json if missing
[ -f "package.json" ] || npm init -y 2>/dev/null

# Install graphql-request + vitest
npm install --save-dev vitest@${VITEST_VER} graphql-request graphql 2>&1 | tail -5

# Add scripts to package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['test:gql'] = 'vitest run test/gql --reporter=verbose';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"
```

Write `vitest.config.ts` if not present:
```typescript
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    include: ['test/gql/**/*.spec.ts'],
    globals: true,
    testTimeout: 15000,
    hookTimeout: 30000,
    pool: 'forks',
    sequence: { sequential: true },
    reporters: ['verbose'],
  },
});
```

---

## STEP 5: Generate test/gql/gql-test-config.ts

Read template: `Read(".claude/skills/playwright-gql-supertest/references/templates/gql-test-config.ts.template")`

Fill placeholders from gql-spec.json:
- `{{GRAPHQL_ENDPOINT}}` → spec.endpoint (or --url override)
- `{{LOGIN_MUTATION}}` → spec.meta.loginMutation
- `{{TOKEN_PATH}}` → spec.meta.tokenPath
- `{{ME_QUERY}}` → spec.meta.meQuery
- `{{USER_ROLE_FIELD}}` → spec.meta.userRoleField
- `{{ADMIN_ROLE_VALUE}}` → spec.meta.adminRoleValue
- `{{USER_LIST_QUERY}}` → spec.meta.userListQuery (used by resolveEntityIds())
  If spec.meta.userListQuery is missing → use `""` (resolveEntityIds will warn)
- `{{ADMIN_LOGIN_QUERY}}` → spec.credentials.admin.query
- `{{USER_LOGIN_QUERY}}` → spec.credentials.user.query

**Handle multiple credentials (beyond admin+user):**
For each extra key in spec.credentials beyond `admin` + `user`, add a comment:
```typescript
// Additional roles detected — use getTokenForRole('alice') to get their tokens
// alice: { query: `...` }
// bob:   { query: `...` }
```
And add them to `GQL_CONFIG.credentials` so `getTokenForRole()` can access them.

Write to `${TEST_DIR}/test/gql/gql-test-config.ts`.

---

## STEP 6: Generate test/gql/gql-auth-helper.ts

Read template: `Read(".claude/skills/playwright-gql-supertest/references/templates/gql-auth-helper.ts.template")`

Write to `${TEST_DIR}/test/gql/gql-auth-helper.ts`.

This provides:
- `getAdminToken()` — cached admin token via login mutation
- `getUserToken()` — cached user token via login mutation
- `getTokenForRole(role)` — **generic** — gets token for ANY role in credentials map
  Use this for projects with more than 2 roles (alice, bob, moderator, etc.)
- `resolveEntityIds(adminToken)` — **generic** — queries user list to get actual IDs
  Works with UUID and integer-based projects (returns string IDs either way)
- `getUserToken()` — cached user token via login mutation
- `assertNoErrors(response)` — throws if errors present
- `assertHasError(response, messageContains?)` — throws if no errors

---

## STEP 7: Generate Test Spec Files (AI-generated)

Read `test-cases.md` and `gql-spec.json`.
Read template: `Read(".claude/skills/playwright-gql-supertest/references/templates/gql-spec-template.ts.template")`

Generate one spec file per operation group (queries / mutations, or by feature domain):

```
test/gql/
  queries.spec.ts      (all query operations)
  mutations.spec.ts    (all mutation operations)
```

Or group by domain if operation names suggest it:
```
test/gql/
  auth.spec.ts         (login, register, logout mutations)
  payments.spec.ts     (payment queries and mutations)
  users.spec.ts        (user queries)
```

For each test case from test-cases.md, map to vitest `it()`:
- Happy path → `assertNoErrors(response)` + data assertions
- Auth failure → `assertHasError(response, 'Unauthorized')`
- Validation error → `assertHasError(response)` (GraphQL returns errors before resolver)
- Not found → `assertHasError(response, 'not found')`

**⚠️ Coverage check — every operation in gql-spec.json must have at least one test:**
Before writing files, verify every operation name from `gql-spec.json.operations` appears in at least one `it()` block across all spec files. Log missing ones as warnings.

Log per spec: `ℹ  Generated {N} tests in test/gql/{name}.spec.ts`
Log total: `ℹ  Coverage: {COVERED}/{TOTAL_OPS} operations from gql-spec.json`

---

## STEP 8: TypeScript Compile Check

```bash
cd "${TEST_DIR}"
npx tsc --noEmit 2>&1 | head -20 || echo "ℹ  ts errors above — check imports"
```

Fix common issues:
- Missing type imports → add them
- `any` on response → cast to `Record<string, unknown>`
- graphql-request types → use `GraphQLClient.request<T>()` with explicit generics

---

## STEP 9: Run Tests (if --run flag set)

```bash
cd "${TEST_DIR}"

# Verify endpoint reachable
GQL_URL=$(node -e "const s=require('${GQL_SPEC}'); console.log(s.endpoint)")
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${GQL_URL}" \
  -H "Content-Type: application/json" -d '{"query":"{__typename}"}')
[ "$STATUS" != "200" ] && echo "❌ Endpoint not reachable at ${GQL_URL}" >&2 && exit 1

npm run test:gql 2>&1 | tee /tmp/gql-test-raw.txt
```

Parse output — extract: total, passed, failed, failure messages.

If failures: AI explains each:
1. Test name + operation that failed
2. Expected (no errors / specific data) vs actual (errors array content)
3. Root cause (auth config? wrong query? server-side validation?)
4. Suggested fix (1-2 sentences)

Write report: `test-tasks/playwright/${TASK_ID}/reports/gql-supertest-report.md`

---

## STEP 10: Print Summary

```
╔══════════════════════════════════════╗
║  GraphQL Supertest Results           ║
╚══════════════════════════════════════╝

  Task:      {TASK_ID}
  Endpoint:  {GQL_URL}
  Specs:     {N} files
  Tests:     {PASSED} passed / {TOTAL} total

  Files:
    test/gql/auth.spec.ts       ({N} tests)
    test/gql/payments.spec.ts   ({N} tests)

→ Fix failures, then re-run: /playwright-gql-supertest --task={TASK_ID} --run
```

If --run NOT set:
```
Test files generated. Review then run:
  /playwright-gql-supertest --task={TASK_ID} --run
  or: cd {TEST_DIR} && npm run test:gql
```
