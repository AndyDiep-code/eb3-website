# GraphQL Schemathesis Run — Step-by-Step

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; NC='\033[0m'
```

Header:
```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  QAKit — GraphQL Contract Testing    ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

Step pattern `[X/8]`:
```bash
echo -e "${YELLOW}⏳ [X/8] Description...${NC}"   # before
echo -e "${GREEN}✅ [X/8] Description${NC}"        # success
echo -e "${RED}❌ [X/8] Description — FAILED${NC}" # failure
```

---

## STEP 1: Parse Arguments

Extract from user input:
- `GQL_URL` from `--url=` (REQUIRED — stop if missing)
- `TASK_ID` from `--task=` (REQUIRED — stop if missing)
- `LOGIN_QUERY` from `--login-query=` (optional)
- `AUTH_TOKEN` from `--token=` (optional, alternative to --login-query)
- `TOKEN_PATH` from `--token-path=` (optional, default: `data.login.token`)

Derive:
- `OUTPUT_DIR="test-tasks/playwright/${TASK_ID}/reports"`
- `REPORT_FILE="${OUTPUT_DIR}/schemathesis-gql-report.md"`
- `XML_FILE="${OUTPUT_DIR}/schemathesis-gql-results.xml"`
- `VCR_FILE="${OUTPUT_DIR}/schemathesis-gql-cassette.yaml"`

Log: `ℹ  Task: ${TASK_ID} | URL: ${GQL_URL} | Auth: ${AUTH_TOKEN:+yes}${AUTH_TOKEN:-none}`

---

## STEP 2: Verify GraphQL Endpoint

```bash
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${GQL_URL}" \
  -H "Content-Type: application/json" \
  -d '{"query":"{__typename}"}')

if [ "$STATUS" != "200" ]; then
  echo "❌ ERROR: GraphQL endpoint not reachable at ${GQL_URL} (got HTTP ${STATUS})" >&2
  exit 1
fi
```

---

## STEP 3: Fetch + Patch Introspection → Convert to SDL

GraphQL 2021 spec added `DIRECTIVE_DEFINITION` as a valid directive location.
Some servers (graphql-yoga, modern Apollo) expose this — which crashes schemathesis's
bundled `graphql-core` Python library. The fix: fetch introspection, patch out the
problematic location, convert to SDL, pass SDL file to schemathesis.

```bash
# 3a: Fetch FULL introspection (needed for SDL conversion)
curl -s -X POST "${GQL_URL}" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { queryType { name } mutationType { name } subscriptionType { name } types { kind name description fields(includeDeprecated: true) { name description args { name description type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } defaultValue } type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } isDeprecated deprecationReason } inputFields { name description type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } defaultValue } interfaces { kind name ofType { kind name ofType { kind name ofType { kind name } } } } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { kind name ofType { kind name ofType { kind name } } } } directives { name description locations args { name description type { kind name ofType { kind name ofType { kind name ofType { kind name } } } } defaultValue } } } }"}' \
  -o /tmp/gql-introspection-raw.json

# 3b: Patch — remove DIRECTIVE_DEFINITION from @deprecated locations
# (graphql-core Python doesn't yet support this GraphQL 2021 location)
python3 -c "
import json, sys
data = json.load(open('/tmp/gql-introspection-raw.json'))
schema = data['data']['__schema']
patched = 0
for d in schema.get('directives', []):
    if 'DIRECTIVE_DEFINITION' in d.get('locations', []):
        d['locations'] = [l for l in d['locations'] if l != 'DIRECTIVE_DEFINITION']
        patched += 1
json.dump(data, open('/tmp/gql-introspection-patched.json', 'w'))
types = [t for t in schema['types'] if not t['name'].startswith('__')]
q = next((t for t in types if t['name'] == schema.get('queryType',{}).get('name')), None)
m = next((t for t in types if t['name'] == (schema.get('mutationType') or {}).get('name')), None)
print(f'Types: {len(types)}, Queries: {len(q[\"fields\"]) if q else 0}, Mutations: {len(m[\"fields\"]) if m else 0}, Patched: {patched}')
"

# 3c: Convert patched introspection JSON → SDL file (schemathesis reads SDL from file)
SDL_FILE="/tmp/gql-schema-patched.graphql"
uvx --with graphql-core python3 -c "
import json
from graphql import build_client_schema, print_schema
data = json.load(open('/tmp/gql-introspection-patched.json'))
schema = build_client_schema(data['data'])
sdl = print_schema(schema)
open('${SDL_FILE}', 'w').write(sdl)
print(f'SDL written: {len(sdl)} chars')
" || { echo "❌ ERROR: graphql-core not available. Run: pip install graphql-core" >&2; exit 1; }
```

Store: `SCHEMA_FILE="${SDL_FILE}"` — used in STEP 6.

Log: `ℹ  Schema: {N} types, {Q} queries, {M} mutations (DIRECTIVE_DEFINITION patch applied)`

---

## STEP 4: Resolve Auth Token

If `--token` provided → use directly as `AUTH_TOKEN`.

If `--login-query` provided → execute mutation:
```bash
RESPONSE=$(curl -s -X POST "${GQL_URL}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"${LOGIN_QUERY}\"}")

# Extract token using configured path (default: data.login.token)
# Also tries data.auth.token, data.signin.token, data.*.token
AUTH_TOKEN=$(echo "$RESPONSE" | python3 -c "
import sys, json
try:
    raw = json.load(sys.stdin)
    data = raw.get('data', {})
    # Try configured path first
    token_path = '${TOKEN_PATH}'.replace('data.', '').split('.')
    val = data
    for key in token_path:
        val = val.get(key, {}) if isinstance(val, dict) else {}
    if val and isinstance(val, str):
        print(val); sys.exit(0)
    # Fallback: search all top-level keys for token/access_token/jwt
    for key in data:
        v = data[key]
        if isinstance(v, dict):
            t = v.get('token') or v.get('access_token') or v.get('jwt')
            if t: print(t); sys.exit(0)
    print('')
except: print('')
")

if [ -z "${AUTH_TOKEN}" ]; then
  echo "⚠  Login response: ${RESPONSE}" >&2
  echo "⚠  Auth failed — only public operations will be tested"
fi
```

Log: `ℹ  Auth: ${AUTH_TOKEN:+token obtained}${AUTH_TOKEN:-none — only public operations tested}`

---

## STEP 5: Check + Install Schemathesis

Try in order — use whichever works first:

```bash
if uvx schemathesis --version 2>/dev/null; then
  SCHEMATHESIS_CMD="uvx schemathesis"
elif python3 -m schemathesis --version 2>/dev/null; then
  SCHEMATHESIS_CMD="python3 -m schemathesis"
elif pip3 install schemathesis --quiet && python3 -m schemathesis --version 2>/dev/null; then
  SCHEMATHESIS_CMD="python3 -m schemathesis"
else
  echo "❌ ERROR: Cannot install schemathesis. Run: uvx schemathesis --version to test." >&2
  exit 1
fi
```

---

## STEP 6: Run Schemathesis

```bash
mkdir -p "${OUTPUT_DIR}"

# Use patched SDL file (from STEP 3) + --url pointing to actual server
# This bypasses graphql-core incompatibility with GraphQL 2021 servers (graphql-yoga etc.)
# SCHEMA_FILE was set in STEP 3 (default: /tmp/gql-schema-patched.graphql)
SCHEMATHESIS_ARGS=(
  "run" "${SCHEMA_FILE}"     # SDL file, not URL directly
  "--url" "${GQL_URL}"       # actual server URL for requests
  "--checks" "all"
  "--max-response-time" "3000"
  "--report" "junit"         # enable JUnit XML format
  "--report-junit-path" "${XML_FILE}"  # write to task-specific path
  "--report" "vcr"           # enable VCR cassette (record all requests for replay/debug)
  "--report-vcr-path" "${VCR_FILE}"
  "--workers" "1"
)

# workers=1: GraphQL mutations are stateful — parallel workers cause DB conflicts
[ -n "${AUTH_TOKEN}" ] && SCHEMATHESIS_ARGS+=(--header "Authorization: Bearer ${AUTH_TOKEN}")

${SCHEMATHESIS_CMD} "${SCHEMATHESIS_ARGS[@]}" 2>&1 | tee /tmp/schemathesis-gql-raw.txt
```

Note: HTTP 200 + `errors` field = failure, not just 5xx responses.

**GraphQL 2021 Compatibility:** STEP 3 patches the `DIRECTIVE_DEFINITION` location from
the `@deprecated` directive before converting to SDL. This makes the skill work with
all modern GraphQL servers (graphql-yoga, Apollo Server 4, Pothos, etc.) that follow
the GraphQL 2021 spec. No additional flags needed — the patch is applied automatically.

---

## STEP 7: Parse Results + AI Analyze

From `/tmp/schemathesis-gql-raw.txt` and `${XML_FILE}`, extract:
- Total operations tested
- Total cases generated
- Failures (include cases where HTTP 200 + errors array)
- Errors (resolver crashes, unexpected 5xx)

**GraphQL-specific failure patterns to detect:**
- `not_a_server_error` — resolver threw unhandled exception
- `response_schema_conformance` — response shape doesn't match schema
- HTTP 200 + `"errors"` in body — GraphQL error response

If `FAILURES > 0` OR `ERRORS > 0`:
AI explains for each failure:
1. What query/mutation + variables triggered it
2. What response was returned (including errors array content)
3. What schema says should happen
4. Likely root cause (unhandled resolver error, missing null check, auth bypass)
5. Suggested fix (1-2 sentences)

If no failures: `ℹ  All operations conform to GraphQL schema. N cases passed.`

---

## STEP 8: Write Report

Read `references/report-format.md` for format.
Write `${REPORT_FILE}`.

**GraphQL additions to report:**
- Security note: introspection is enabled (disable in production)
- List any subscriptions found (not tested by schemathesis)
- HTTP 200 + errors pattern explanation

Print summary:
```
╔══════════════════════════════════════╗
║   Schemathesis GraphQL Report        ║
╚══════════════════════════════════════╝

  Task:         {TASK_ID}
  Endpoint:     {GQL_URL}
  Operations:   {N} queries + {M} mutations
  Cases run:    {N}
  Passed:       {N}
  Failures:     {N}
  Slow (>3s):   {N}

  Report: {REPORT_FILE}

→ Next: /playwright-gql-from-schema --url={GQL_URL} --task={TASK_ID}
```
