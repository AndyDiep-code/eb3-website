# Supertest Generation & Execution — Step-by-Step

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; NC='\033[0m'
```

Header:
```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  QAKit — API Supertest Generation    ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

---

## STEP 1: Parse Arguments

Extract:
- `TASK_ID` from `--task=` (REQUIRED)
- `FRAMEWORK` from `--framework=` (optional, default: auto-detect)
- `RUN_TESTS` from `--run` flag (boolean, default: false)
- `MODULE_FILTER` from `--module=` (optional, default: all)
- `SOURCE_PATH` from `--source=` (optional)

Derive paths:
- `API_SPEC="test-tasks/playwright/${TASK_ID}/test-cases/api/api-spec.json"`
- `TEST_CASES="test-tasks/playwright/${TASK_ID}/test-cases/api/test-cases.md"`
- `TESTS_OUTPUT_DIR` — detect where to put tests (see STEP 3)

Log: `ℹ  Task: ${TASK_ID} | Framework: ${FRAMEWORK} | Run: ${RUN_TESTS}`

---

## STEP 2: Validate Prerequisites

```bash
# Check api-spec.json exists
[ -f "${API_SPEC}" ] || STOP: "api-spec.json not found. Run playwright-api-from-openapi first."

# Check test-cases.md exists (for richer context)
[ -f "${TEST_CASES}" ] && echo "ℹ  test-cases.md found — using for business logic context"
```

Read api-spec.json:
- Extract `baseUrl`, `credentials`, `seedData`, `operations[]`
- Log operation count

---

## STEP 3: Detect Framework + Target Directory

**Auto-detect framework:**
```bash
# Check package.json in SOURCE_PATH or current dir
PACKAGE_JSON=$(find . -maxdepth 3 -name "package.json" ! -path "*/node_modules/*" | head -1)
```

Detect NestJS: `grep -q "@nestjs/core" ${PACKAGE_JSON}` → FRAMEWORK=nestjs
Detect Express: `grep -q "\"express\"" ${PACKAGE_JSON}` → FRAMEWORK=express
Otherwise: FRAMEWORK=http (plain axios/fetch)

**Target directory:**
```bash
# Place tests inside the API source project
SOURCE_ROOT=$(dirname "${PACKAGE_JSON}")
TESTS_OUTPUT_DIR="${SOURCE_ROOT}/test"
mkdir -p "${TESTS_OUTPUT_DIR}"
```

Log: `ℹ  Framework: ${FRAMEWORK} | Tests dir: ${TESTS_OUTPUT_DIR}`

Read framework-specific setup:
- NestJS: `Read(".claude/skills/playwright-api-supertest/references/frameworks/nestjs.md")`
- Express/HTTP: `Read(".claude/skills/playwright-api-supertest/references/frameworks/express.md")`

---

## STEP 4: Install Dependencies

```bash
cd "${SOURCE_ROOT}"

# Check Node.js version — vitest 4.x requires Node 22+, vitest 2.x works on Node 18+
NODE_MAJOR=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
if [ "${NODE_MAJOR}" -ge 22 ]; then
  VITEST_VERSION="latest"
else
  VITEST_VERSION="^2.1.0"   # Node 18-21 compatible
  echo "ℹ  Node ${NODE_MAJOR} detected — installing vitest@${VITEST_VERSION} (Node 22+ needed for vitest 4.x)"
fi

# Install vitest + supertest if not present
grep -q '"vitest"' package.json || npm install --save-dev vitest@${VITEST_VERSION} supertest @types/supertest 2>&1 | tail -3

# For NestJS: also need testing module
grep -q "@nestjs/testing" package.json || npm install --save-dev @nestjs/testing 2>&1 | tail -3
```

Add `test:api` script to `package.json` if missing:
```bash
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!pkg.scripts['test:api']) {
  pkg.scripts['test:api'] = 'vitest run test/api --reporter=verbose';
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
}
"
```

Write `vitest.config.ts` only if it does NOT already exist (avoid overwriting NestJS decorator settings):
```bash
if [ ! -f "vitest.config.ts" ]; then
  cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    include: ['test/api/**/*.spec.ts'],
    globals: true,
    testTimeout: 15000,
    hookTimeout: 30000,
    pool: 'forks',
    sequence: { sequential: true },
    reporters: ['verbose'],
  },
});
EOF
  echo "ℹ  vitest.config.ts created"
else
  echo "ℹ  vitest.config.ts already exists — not overwriting"
  # Ensure test/api is included in existing config — user may need to check manually
fi
```

Log: `ℹ  Dependencies verified (vitest, supertest)`

---

## STEP 5: Generate test/api/api-test-config.ts

Write shared config — read `references/templates/api-test-config.ts.template`.

This file exports:
- `BASE_URL` — server base URL
- `API_CONFIG.credentials` — admin + user login details
- `resolveTestIds(adminToken)` — **dynamic ID resolution** (queries live DB, no hardcoded IDs)
- `clearTestIdCache()` — reset cache between runs

Replace placeholders from `api-spec.json`:
- `{{BASE_URL}}` → `api-spec.json.baseUrl`
- `{{ADMIN_EMAIL}}` / `{{ADMIN_PASSWORD}}` → `api-spec.json.credentials.admin`
- `{{USER_EMAIL}}` / `{{USER_PASSWORD}}` → `api-spec.json.credentials.user`
- `{{TOKEN_RESPONSE_KEY}}` → `api-spec.json.meta.tokenResponseKey`
- `{{USER_LIST_PATH}}` → `api-spec.json.meta.userListPath`
- `{{USER_ROLE_FIELD}}` → `api-spec.json.meta.userRoleField`
- `{{ADMIN_ROLE_VALUE}}` → `api-spec.json.meta.adminRoleValue`
- `{{RESOURCE_CREATE_PATH}}` → `api-spec.json.meta.resourceCreatePath`
- `{{RESOURCE_CREATE_BODY}}` → find operation where `method == "POST"` and `path == resourceCreatePath`, use its `validExample` as a JSON object literal.
  Example: if `validExample = { "name": "Test", "price": 9.99, "stock": 100, "category": "electronics" }`
  → write `{ name: 'Test', price: 9.99, stock: 100, category: 'electronics' }` (TypeScript object literal, not JSON string)

**Key principle:** NEVER hardcode DB IDs (user.id, resource.id, booking.id) — they shift when DB is reseeded. Use `resolveTestIds()` in `beforeAll()` instead.

---

## STEP 6: Generate test/api/auth-helper.ts

Write auth helper — read `references/templates/auth-helper.ts.template`.

This file provides:
- `loginAdmin()` → returns admin Bearer token (cached)
- `loginUser()` → returns user Bearer token (cached)
- `authHeader(token)` → returns `{ Authorization: "Bearer ${token}" }`

---

## STEP 7: Generate Test Spec Files (AI-generated)

Read `test-cases.md` and `api-spec.json`.
Read spec template: `Read(".claude/skills/playwright-api-supertest/references/templates/spec-template.ts.template")`

**For each module (or filtered module), generate one spec file:**

```
test/api/
  auth.spec.ts
  resources.spec.ts
  bookings.spec.ts
  users.spec.ts
```

**For each spec file:**
1. Import config + auth helper
2. Use `beforeAll` to get tokens
3. Group tests by `describe('Module > Endpoint')`
4. For each test case from test-cases.md:
   - Map TC type to test pattern
   - Use correct token placeholder (ADMIN_TOKEN/USER_TOKEN/none)
   - Use seed data ids from config
   - Add clear `it('description')` matching TC title

Log per spec: `ℹ  [module] Generated N tests in test/api/{module}.spec.ts`

**⚠️ MANDATORY: Add afterAll cleanup to EVERY describe block that creates resources/bookings.**

Each spec that uses `resolveTestIds()` must clean up the `safeResourceId` after tests:

```typescript
// Pattern to add in every describe block that uses resolveTestIds()
afterAll(async () => {
  try {
    const adminToken = await getAdminToken();
    const ids = await resolveTestIds(adminToken);
    // Clean up the temp resource created by resolveTestIds()
    // Only run once per suite — clearTestIdCache() prevents duplicate cleanup
    await request(BASE_URL)
      .delete(`/resources/${ids.safeResourceId}`)
      .set(authHeader(adminToken));
    clearTestIdCache(); // reset for next run
  } catch {
    // silently ignore — resource may already be deleted by a test
  }
});
```

**Why this matters:** `resolveTestIds()` creates a fresh resource on each call. Without cleanup, each test run adds a `Temp-XXXXX` resource to the DB permanently.

---

## STEP 8: TypeScript Compile Check

```bash
cd "${SOURCE_ROOT}"
npx tsc --noEmit --project tsconfig.json 2>&1 | head -30
```

- 0 errors → proceed
- Errors → AI fixes common issues:
  - Missing type imports → add them
  - `any` usage → add explicit types
  - Supertest response typing → use `Response` type
  - Re-run compile check after fix

---

## STEP 9: Run Tests (if --run flag set)

```bash
cd "${SOURCE_ROOT}"

# Ensure server is running first
curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/api-json" | grep -q "200" || \
  STOP: "Server not running at ${BASE_URL}. Start it first: npm run start:dev"

# Run tests
npm run test:api 2>&1 | tee /tmp/supertest-raw.txt
```

Parse output:
- Total tests, passed, failed
- Extract failing test names + error messages
- Extract stack traces for failures

---

## STEP 10: AI Analyze Failures + Write Report

**If --run was set:**

Read `/tmp/supertest-raw.txt`.

For each failure, AI explains:
1. Test name that failed
2. Expected vs actual (status code / response body)
3. Root cause (auth issue? seed data? wrong id?)
4. Suggested fix (1-2 sentences)

Write report: `test-tasks/playwright/${TASK_ID}/reports/supertest-report.md`

**Print final summary:**
```
╔══════════════════════════════════════╗
║  Supertest Results                   ║
╚══════════════════════════════════════╝

  Task:       {TASK_ID}
  Framework:  {FRAMEWORK}
  Specs:      {N} files
  Tests:      {TOTAL} ({PASSED} passed, {FAILED} failed)

  Files:
    test/api/auth.spec.ts        ({N} tests)
    test/api/resources.spec.ts   ({N} tests)
    test/api/bookings.spec.ts    ({N} tests)
    test/api/users.spec.ts       ({N} tests)

  Report: test-tasks/playwright/{TASK_ID}/reports/supertest-report.md

→ Next: Fix failures, then re-run: /playwright-api-supertest --task={TASK_ID} --run
```

**If --run was NOT set:**
```
✅ Test files generated. Review them, then run:
   /playwright-api-supertest --task={TASK_ID} --run
   or: cd {SOURCE_ROOT} && npm run test:api
```
