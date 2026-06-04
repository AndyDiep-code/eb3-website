# Schemathesis Run — Step-by-Step

## Terminal Output Standards

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; NC='\033[0m'
```

Header:
```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  QAKit — API Contract Testing        ║${NC}"
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
- `BASE_URL` from `--url=` (REQUIRED — stop if missing)
- `TASK_ID` from `--task=` (REQUIRED — stop if missing)
- `AUTH_TOKEN` from `--auth=` (optional)
- `LOGIN_URL` from `--login-url=` (optional)
- `LOGIN_BODY` from `--login-body=` (optional, JSON string)
- `SPEC_PATH` from `--spec-path=` (optional, default: auto-detect)

Derive:
- `OPENAPI_URL` — resolve via auto-detection in STEP 2
- `OUTPUT_DIR="test-tasks/playwright/${TASK_ID}/reports"`
- `REPORT_FILE="${OUTPUT_DIR}/schemathesis-report.md"`
- `XML_FILE="${OUTPUT_DIR}/schemathesis-results.xml"`
- `VCR_FILE="${OUTPUT_DIR}/schemathesis-cassette.yaml"`

Log: `ℹ  Task: ${TASK_ID} | URL: ${BASE_URL} | Auth: ${AUTH_TOKEN:+yes}${AUTH_TOKEN:-none}`

---

## STEP 2: Verify Server + Resolve OpenAPI Spec URL

If `--spec-path` provided → `OPENAPI_URL="${BASE_URL}${SPEC_PATH}"`

Otherwise auto-detect (try in order):
```bash
SPEC_CANDIDATES=("/api-json" "/openapi.json" "/api-docs" "/swagger.json" "/v3/api-docs")
OPENAPI_URL=""
for path in "${SPEC_CANDIDATES[@]}"; do
  STATUS=$(curl -s -o /tmp/spec.json -w "%{http_code}" "${BASE_URL}${path}")
  if [ "$STATUS" = "200" ]; then
    OPENAPI_URL="${BASE_URL}${path}"
    echo "ℹ  OpenAPI spec found at: ${path}"
    break
  fi
done
if [ -z "$OPENAPI_URL" ]; then
  echo "❌ ERROR: Could not find OpenAPI spec. Try --spec-path=/your/path" >&2; exit 1
fi
```

Verify spec saved to `/tmp/spec.json` is valid OpenAPI (has `paths` key):
```bash
python3 -c "
import json, sys
try:
    s = json.load(open('/tmp/spec.json'))
    assert 'paths' in s, 'No paths key — not a valid OpenAPI spec'
    count = sum(len(v) for v in s['paths'].values())
    print(f'{len(s[\"paths\"])} paths, {count} operations')
except Exception as e:
    print(f'❌ ERROR: {e}', file=sys.stderr); sys.exit(1)
"

Log: `ℹ  OpenAPI spec: ${endpoint_count} endpoints found at ${OPENAPI_URL}`

---

## STEP 3: Resolve Auth Token

If `--auth` provided → use directly as `AUTH_TOKEN`.

If `--login-url` + `--login-body` provided → auto-login:
```bash
RESPONSE=$(curl -s -X POST "${BASE_URL}${LOGIN_URL}" \
  -H "Content-Type: application/json" \
  -d "${LOGIN_BODY}")

# Try common token key names: access_token (NestJS/default), token (Django REST), jwt
AUTH_TOKEN=$(echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    token = data.get('access_token') or data.get('token') or data.get('jwt') or \
            (data.get('data') or {}).get('token', '')
    print(token)
except Exception as e:
    print('', end='')
" 2>/dev/null)
```
- If token empty → log the raw response for debugging, then exit:
  ```bash
  echo "Login response: ${RESPONSE}" >&2
  echo "❌ ERROR: Auto-login failed. Check --login-url and --login-body. Raw response logged above." >&2; exit 1
  ```

If neither provided → run without auth (only public endpoints tested fully).

Log: `ℹ  Auth: ${AUTH_TOKEN:+token obtained}${AUTH_TOKEN:-none — only public endpoints}`

---

## STEP 4: Check + Install Schemathesis

Try in order — use whichever works first:

```bash
# Option A: uvx (uv-managed environments — macOS/modern Python)
uvx schemathesis --version 2>/dev/null && SCHEMATHESIS_CMD="uvx schemathesis"

# Option B: python3 -m (traditional)
python3 -m schemathesis --version 2>/dev/null && SCHEMATHESIS_CMD="python3 -m schemathesis"

# Option C: install via pip3 then use python3 -m
pip3 install schemathesis --quiet && SCHEMATHESIS_CMD="python3 -m schemathesis"
```

If all fail:
```bash
echo "❌ ERROR: Cannot install schemathesis. Run: uvx schemathesis --version to test, or install uv at https://docs.astral.sh/uv/" >&2; exit 1
```

**Note:** `uvx schemathesis` runs schemathesis in an ephemeral uv environment — no global install needed. Preferred on macOS with uv.

---

## STEP 5: Run Schemathesis

```bash
mkdir -p "${OUTPUT_DIR}"

# Use bash array to avoid quoting issues with embedded spaces in auth header
SCHEMATHESIS_ARGS=(
  "run" "${OPENAPI_URL}"
  "--url" "${BASE_URL}"
  "--checks" "all"
  "--max-response-time" "2000"
  "--report" "junit"          # enable JUnit XML format (schemathesis 4.x)
  "--report-junit-path" "${XML_FILE}"
  "--report" "vcr"            # record all HTTP request+response for replay/debug
  "--report-vcr-path" "${VCR_FILE}"
  "--workers" "2"
)

# Add auth header only if token is present (array approach avoids bash quoting bugs)
[ -n "${AUTH_TOKEN}" ] && SCHEMATHESIS_ARGS+=(--header "Authorization: Bearer ${AUTH_TOKEN}")

${SCHEMATHESIS_CMD} "${SCHEMATHESIS_ARGS[@]}" 2>&1 | tee /tmp/schemathesis-raw.txt
```

Key flags:
- `--checks all` → schema, not_a_server_error, response_headers, response_schema
- `--max-response-time 2000` → flag responses > 2s
- `--workers 2` → parallel (keep low to avoid overwhelming local server)

Log per endpoint: `ℹ  {METHOD} {PATH} — {passed}/{total} cases`

---

## STEP 6: Parse Results

From `/tmp/schemathesis-raw.txt` and `${XML_FILE}`, extract:
- Total endpoints tested
- Total cases generated
- Failures count + details
- Errors (server crashes, 5xx responses)
- Slow endpoints (> 2000ms)

Build summary object:
```
TOTAL_ENDPOINTS=N
TOTAL_CASES=N
FAILURES=N (list: METHOD PATH — reason)
ERRORS=N
SLOW_ENDPOINTS=N
```

---

## STEP 7: AI Analyze Failures

If `FAILURES > 0` OR `ERRORS > 0`:

Read raw output from `/tmp/schemathesis-raw.txt`.
AI task: For each failure/error, explain:
1. What input triggered it
2. What response was returned
3. What the spec says should happen
4. Likely root cause (missing validation, unhandled edge case, wrong status code)
5. Suggested fix (1-2 sentences)

If no failures → AI confirms: "All endpoints conform to OpenAPI spec. N cases passed."

---

## STEP 8: Write Report

Write `${REPORT_FILE}` following `references/report-format.md`.

Update `test-tasks/playwright/${TASK_ID}/README.md` if exists:
- Mark "Contract Testing (Schemathesis)" as ✅ Done

Print summary:
```
╔══════════════════════════════════════╗
║   Schemathesis Report                ║
╚══════════════════════════════════════╝

  Task:         {TASK_ID}
  Server:       {BASE_URL}
  Endpoints:    {N}
  Cases run:    {N}
  Passed:       {N}
  Failures:     {N}
  Slow (>2s):   {N}

  Report: {REPORT_FILE}

→ Next: /qakit:playwright:api-from-openapi --url={BASE_URL} --task={TASK_ID}
```
