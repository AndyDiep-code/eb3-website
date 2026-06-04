# TRACE MODE — Generate API Tests from Playwright Trace Files

Extract API calls captured in Playwright trace files and generate executable API test specs
that make real HTTP requests and assert actual responses.

## Why this mode

Playwright trace files (`0-trace.network`) contain every HTTP request made during a UI test run
in HAR-like format. This mode mines those calls to discover API endpoints automatically,
without requiring a separate network capture session.

Generated tests use Playwright's `request` fixture to make **real API calls** — they do not
replay captures. Responses are asserted at runtime on every test run.

## Arguments

- `--trace-dir=<path>` — Path to directory containing `trace.zip` files (e.g. `test-results/`)
- `--trace-zip=<path>` — Path to a single `trace.zip` file
- `--api-filter=<pattern>` — URL substring to filter API calls (e.g. `api.myapp.com`, `execute-api`)
  If not provided, auto-detects API calls by excluding static assets.
- `--auth-token=<token>` — Bearer token for authenticated API calls (optional)
- `--login-mutation=<query>` — GraphQL login mutation to fetch token at test runtime (optional)

**No `--task` needed** — output subfolder and filename are auto-derived from trace path + timestamp.

## STEP 1: Derive Output Paths (no --task needed)

Extract:
- `TRACE_DIR` from `--trace-dir=` (scan all `*.zip` inside)
- `TRACE_ZIP` from `--trace-zip=` (single file)
- `API_FILTER` from `--api-filter=` (default: auto-detect)
- `AUTH_TOKEN` from `--auth-token=` (optional)
- `LOGIN_MUTATION` from `--login-mutation=` (optional)

**Auto-derive SUBFOLDER from trace path:**
```bash
# From --trace-zip: use parent directory name, strip browser suffix
# e.g. test-results/ui-pages-DashboardPage-chromium/trace.zip → "DashboardPage"
SUBFOLDER=$(basename "$(dirname "$TRACE_ZIP")" | sed 's/ui-pages-//' | sed 's/-chromium.*//' | sed 's/-firefox.*//' | sed 's/-webkit.*//')

# From --trace-dir: use the directory name, or date if it's the root test-results dir
# e.g. test-results/ui-pages-DashboardPage-chromium/ → "DashboardPage"
# e.g. test-results/ → "traces-20260512"
SUBFOLDER=$(basename "$TRACE_DIR" | sed 's/ui-pages-//' | sed 's/-chromium.*//' | sed 's/-firefox.*//' | sed 's/-webkit.*//')
[ "$SUBFOLDER" = "test-results" ] && SUBFOLDER="traces-$(date +%Y%m%d)"
```

**Derive timestamp for unique output file:**
```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
```

**Output paths:**
```
SPEC_FILE="tests/playwright/tests/api/${SUBFOLDER}/trace-discovered-${TIMESTAMP}.spec.ts"
API_CALLS_FILE="tests/playwright/tests/api/${SUBFOLDER}/api-calls-${TIMESTAMP}.json"
```

Each run creates a **new timestamped file** — never overwrites previous runs:
```
tests/playwright/tests/api/DashboardPage/
├── trace-discovered-20260512-1430.spec.ts   ← run 1
├── trace-discovered-20260512-1545.spec.ts   ← run 2
└── trace-discovered-20260513-0900.spec.ts   ← run 3
```


Each run creates a **new timestamped file** — never overwrites previous runs.
Multiple runs accumulate coverage:
```
tests/playwright/tests/api/DashboardPage/
├── trace-discovered-20260512-1430.spec.ts   ← run 1: getModuleCategories, personInfo
├── trace-discovered-20260512-1545.spec.ts   ← run 2: getAssignedProjects (new flow)
└── trace-discovered-20260513-0900.spec.ts   ← run 3: after new feature added
```

---

## STEP 2: Extract Trace Network Files

```bash
# Find all trace zips
ZIPS=()
if [ -n "$TRACE_DIR" ]; then
  ZIPS=($(find "$TRACE_DIR" -name "*.zip" 2>/dev/null))
elif [ -n "$TRACE_ZIP" ]; then
  ZIPS=("$TRACE_ZIP")
fi

echo "ℹ  Found ${#ZIPS[@]} trace zip(s)"
```

For each zip, extract to `/tmp/trace-{n}/`:
```bash
for ZIP in "${ZIPS[@]}"; do
  TMPDIR="/tmp/trace-$(basename $ZIP .zip)"
  unzip -o "$ZIP" "0-trace.network" "resources/*" -d "$TMPDIR" 2>/dev/null
done
```

---

## STEP 3: Parse API Calls

For each extracted `0-trace.network`, parse using Python:

```python
import json, os, glob

STATIC_EXTENSIONS = ('.js', '.css', '.png', '.svg', '.woff', '.woff2', '.ttf',
                     '.ico', '.jpg', '.jpeg', '.gif', '.map', '.html')
NOISE_HOSTS = ('google-analytics.com', 'googletagmanager.com',
               'sentry.io', 'hotjar.com', 'mixpanel.com')

def is_api_call(url, api_filter):
    if any(url.endswith(ext) for ext in STATIC_EXTENSIONS):
        return False
    if any(h in url for h in NOISE_HOSTS):
        return False
    if api_filter:
        return api_filter in url
    # Auto-detect: XHR/Fetch to non-CDN endpoints
    return (url.startswith('https://') and
            not any(x in url for x in ['cloudfront.net', 'cdn.', '/assets/']))

api_calls = []
for network_file in glob.glob('/tmp/trace-*/0-trace.network'):
    tmpdir = os.path.dirname(network_file)
    with open(network_file) as f:
        for line in f:
            if not line.strip():
                continue
            event = json.loads(line)
            snap = event.get('snapshot', {})
            req = snap.get('request', {})
            url = req.get('url', '')

            if not is_api_call(url, API_FILTER):
                continue

            # Read request body (may be sha1 reference)
            body = None
            post_data = req.get('postData', {})
            sha1 = post_data.get('_sha1', '')
            if sha1:
                body_file = os.path.join(tmpdir, 'resources', sha1)
                if os.path.exists(body_file):
                    body = json.load(open(body_file))
            elif post_data.get('text'):
                try:
                    body = json.loads(post_data['text'])
                except:
                    body = post_data['text']

            api_calls.append({
                'url': url,
                'method': req.get('method', 'GET'),
                'headers': {h['name']: h['value'] for h in req.get('headers', [])},
                'body': body,
                'is_graphql': bool(body and 'operationName' in (body if isinstance(body, dict) else {}))
            })

# Deduplicate GraphQL by operationName, REST by method+path
seen = set()
unique_calls = []
for call in api_calls:
    if call['is_graphql'] and isinstance(call['body'], dict):
        key = ('gql', call['body'].get('operationName', ''))
    else:
        from urllib.parse import urlparse
        path = urlparse(call['url']).path
        key = (call['method'], path)
    if key not in seen:
        seen.add(key)
        unique_calls.append(call)

print(f'Found {len(unique_calls)} unique API calls')
for c in unique_calls:
    if c['is_graphql']:
        print(f'  GQL  {c["body"]["operationName"]}')
    else:
        from urllib.parse import urlparse
        print(f'  {c["method"]:6} {urlparse(c["url"]).path}')
```

---

## STEP 4: Classify Calls

For each unique call determine:

| Type | Detection | Test Strategy |
|------|-----------|---------------|
| **GraphQL** | `body.operationName` exists | POST to GQL endpoint with query + variables |
| **REST GET** | method=GET, no body | GET with path params if any |
| **REST POST/PUT** | method=POST/PUT, JSON body | POST/PUT with request body |

---

## STEP 5: Detect Auth Requirements

Check if captured requests have `Authorization` header:
- If yes → note `AUTH_REQUIRED=true` and the token format (Bearer, Basic, etc.)
- If `--auth-token` provided → use directly
- If `--login-mutation` provided → generate `beforeAll` that fetches token at test runtime
- If neither → generate tests without auth header; add TODO comment

---

## STEP 6: Generate Playwright API Spec

Create spec file: `${SPEC_FILE}` (derived in STEP 1 — e.g. `tests/playwright/tests/api/DashboardPage/trace-discovered-20260512-1430.spec.ts`)

### File structure

```typescript
import { test, expect } from '@playwright/test';

// ── Auth setup ────────────────────────────────────────────────────────────────
// Option A: static token
const AUTH_TOKEN = process.env.API_TOKEN ?? '';

// Option B: fetch token at runtime (if --login-mutation provided)
let cachedToken: string | null = null;
async function getAuthToken(request: import('@playwright/test').APIRequestContext): Promise<string> {
  if (cachedToken) return cachedToken;
  const res = await request.post(GQL_ENDPOINT, {
    data: { /* login mutation */ }
  });
  const body = await res.json();
  cachedToken = body.data?.login?.token ?? '';
  return cachedToken;
}
// ─────────────────────────────────────────────────────────────────────────────

const GQL_ENDPOINT = '{GRAPHQL_URL}';

test.describe('Trace-Discovered API Tests — {SUBFOLDER} — {TIMESTAMP}', () => {
  // Generated from Playwright trace: {TRACE_SOURCES}
```

### Per GraphQL operation test block

**Placeholder rules before writing the spec:**
- `{operationName}` → exact string from `body.operationName` (e.g. `getModuleCategories`)
- `{variables}` → `JSON.stringify(body.variables)` — write as inline JSON object literal (e.g. `{}` or `{ "id": "123" }`)
- `{query}` → full query string from `body.query`, escaped for template literal (backtick string — no escaping needed unless it contains backticks)
- `body.data.{operationName}` → use the actual operation name as the key (e.g. `body.data.getModuleCategories`)

```typescript
  test('getModuleCategories — happy path', async ({ request }) => {
    // Arrange
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (AUTH_REQUIRED) {
      headers['Authorization'] = `Bearer ${AUTH_TOKEN || await getAuthToken(request)}`;
    }

    // Act — makes real API call, not a replay
    const response = await request.post(GQL_ENDPOINT, {
      headers,
      data: {
        operationName: 'getModuleCategories',
        variables: {},
        query: `query getModuleCategories {
  getModuleCategories {
    ID
    Name
    Order
  }
}`,
      },
    });

    // Assert
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).not.toHaveProperty('errors');
    expect(body.data).toBeDefined();
    expect(body.data.getModuleCategories).toBeDefined();
  });
```

### Per REST endpoint test block

```typescript
  test('{METHOD} {path} — happy path', async ({ request }) => {
    // Arrange
    const headers: Record<string, string> = {};
    if (AUTH_REQUIRED) {
      headers['Authorization'] = `Bearer ${AUTH_TOKEN || await getAuthToken(request)}`;
    }

    // Act
    const response = await request.{method}('{url}', {
      headers,
      data: {body},   // omit for GET
    });

    // Assert
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toBeTruthy();
  });
```

---

## STEP 7: Write api-calls.json (for pipeline compatibility)

Save discovered calls in standard format:
```
${API_CALLS_FILE}
```
(e.g. `tests/playwright/tests/api/DashboardPage/api-calls-20260512-1430.json`)

Format: same as `qakit:playwright:api-normalize` output — allows downstream skills to use this data.

---

## STEP 8: TypeScript compile check

```bash
cd tests/playwright && npx tsc --noEmit 2>&1 | grep -E "error TS|\.ts\(" | head -20
```

Fix any type errors before proceeding.

---

## STEP 9: Show Summary

```
**🎉 Trace-based API tests generated**

| | |
|---|---|
| **Source** | {SUBFOLDER} |
| **Trace files** | {N} zips processed |
| **API calls found** | {TOTAL} ({GQL_COUNT} GraphQL + {REST_COUNT} REST) |
| **Tests generated** | {TEST_COUNT} |
| **Spec** | `${SPEC_FILE}` |

→ **Next:** `npx playwright test tests/playwright/tests/api/{SUBFOLDER} --project=api`
```

---

## Error Handling

| Situation | Action |
|-----------|--------|
| No trace zips found | Stop — "No trace.zip found at {path}. Run tests with `trace: 'on'` first." |
| 0 API calls after filtering | Warn — suggest adding `--api-filter=` with correct URL substring |
| Request body sha1 not in resources/ | Skip that call, log warning |
| GraphQL operation has no `query` text | Skip, log warning: "body missing `query` field" |
| Auth token not provided, auth required | Generate tests with TODO comment; tests will fail with 401 until auth is added |

---

## Usage Examples

```bash
# Minimal — task auto-derived from trace dir name, timestamp in filename
/qakit:playwright:api-automate \
  --trace-dir=tests/playwright/test-results \
  --api-filter=api.myapp.com

# With explicit subfolder name (overrides auto-derive)
/qakit:playwright:api-automate \
  --trace-dir=tests/playwright/test-results \
  --api-filter=api.myapp.com \
  --subfolder=dashboard-flows

# Single trace file + auth token
/qakit:playwright:api-automate \
  --trace-zip=tests/playwright/test-results/ui-pages-DashboardPage-chromium/trace.zip \
  --api-filter=api.myapp.com \
  --auth-token=eyJhbGci...

# GraphQL with login mutation (token fetched at test runtime)
/qakit:playwright:api-automate \
  --trace-dir=tests/playwright/test-results \
  --api-filter=graphql.myapp.com \
  --login-mutation='mutation{login(email:"admin@example.com",password:"pass"){token}}'

# No filter — capture all non-static API calls
/qakit:playwright:api-automate \
  --trace-dir=tests/playwright/test-results
```

**Output per run (never overwrites):**
```
tests/playwright/tests/api/{SUBFOLDER}/
└── trace-discovered-{YYYYMMDD-HHMMSS}.spec.ts   ← new file each run
```

**`--api-filter` examples by project type:**
- REST API: `--api-filter=api.myapp.com`
- GraphQL: `--api-filter=graphql.myapp.com`
- AWS API Gateway: `--api-filter=execute-api.ap-southeast-2.amazonaws.com`
- Local dev: `--api-filter=localhost:3000`
- No filter (capture all non-static): omit `--api-filter`
