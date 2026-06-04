# Network Capture Details

Complete network capture implementation with initialization, collection, and analysis.

## Overview

Network capture runs in parallel (non-blocking) during all modes:
- Initializes once at start
- Accumulates calls in background
- Collects at end
- Generates 4 analysis enhancements

## Initialization

Network capture is initialized via browser page context using `playwright-cli run-code`.

**⚠️ Context Storage:** Network listener stores in `page._qakitNetworkCapture` (Node.js page context), not `window.__qakitNetworkCapture_v1` (browser window). The `run-code` command executes in Node.js context with access to the page object, not the browser window.

### Initialization Code

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => {
  /* Guard: only install once per session to avoid duplicate listeners */
  if (page._qakitNetworkCapture) return 'already_initialized';

  page._qakitNetworkCapture = { calls: [], sequence: 0, startTime: Date.now() };

  /* ── FILTER UTILITIES (compiled once, reused per event) ──────── */
  const MAX_BODY_BYTES = 100 * 1024;  // 100KB limit per body
  const STATIC_ASSET_PATTERN = /\.(png|jpg|jpeg|gif|webp|svg|ico|css|woff|woff2|ttf|otf|eot|map)(\?[^#]*)?$/i;
  const MINIFIED_BUNDLE_PATTERN = /\.(min\.(js|css)|chunk\.js|bundle\.js|vendors(\.[a-z0-9]+)?\.js)(\?[^#]*)?$/i;
  const EXCLUDED_PATH_PATTERN = /\/(favicon\.ico|health|healthz|ready|ping|status\/health)(\/|\?|$)/i;

  function sanitizeHeaders(headers) {
    const SENSITIVE_HEADERS = /^(authorization|cookie|set-cookie|x-api-key|x-auth-token|x-access-token|x-secret-key|api-key|x-csrf-token)$/i;
    const sanitized = {};
    for (const [key, value] of Object.entries(headers || {})) {
      sanitized[key] = SENSITIVE_HEADERS.test(key) ? '[REDACTED]' : value;
    }
    return sanitized;
  }

  function capBodySize(body) {
    if (!body) return body;
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
    if (bodyStr.length > MAX_BODY_BYTES) {
      return bodyStr.substring(0, MAX_BODY_BYTES) + '\n...[TRUNCATED - body exceeded 100KB limit]';
    }
    return body;
  }

  function shouldCaptureNetworkCall(url, status) {
    if (status == null || status < 200) return false;
    if (status >= 600) return false;
    if (STATIC_ASSET_PATTERN.test(url)) return false;
    if (MINIFIED_BUNDLE_PATTERN.test(url)) return false;
    if (EXCLUDED_PATH_PATTERN.test(url)) return false;
    return true;
  }

  /* Attach response listener - fires for every HTTP response the page receives */
  page.on('response', async (response) => {
    const request = response.request();
    const startTime = request.timing().startTime;
    const timing = response.timing?.();
    const finishTime = timing?.responseEnd > 0 ? timing.responseEnd : (Date.now() - window.performance.timeOrigin);
    const durationMs = Math.round(finishTime - startTime);
    const captureStart = new Date(window.performance.timeOrigin + startTime).toISOString();
    const url = request.url();
    const method = request.method().toUpperCase();
    const status = response.status();

    /* ── FILTER: gate via shouldCaptureNetworkCall() ────────────── */
    if (!shouldCaptureNetworkCall(url, status)) return;

    /* ── CAPTURE ────────────────────────────────────────────────── */
    let requestBody = null;
    let responseBody = null;
    let captureError = null;

    try {
      /* Request body: only for methods that carry a body */
      if (['POST','PUT','PATCH','DELETE'].includes(method)) {
        const rawReqBody = request.postData();
        if (rawReqBody) {
          try { requestBody = JSON.parse(rawReqBody); }
          catch { requestBody = rawReqBody; }
        }
      }

      /* Response body: best-effort; large binary responses are skipped */
      const contentType = (response.headers()['content-type'] || '');
      if (contentType.includes('application/json') || contentType.includes('text/')) {
        try {
          const rawText = await response.text();
          try { responseBody = JSON.parse(rawText); }
          catch { responseBody = rawText; }
        } catch {}
      }
    } catch (err) {
      captureError = err.message;
    }

    const record = {
      sequence: ++page._qakitNetworkCapture.sequence,
      method: method,
      url: url,
      status: status,
      statusText: response.statusText(),
      requestHeaders: sanitizeHeaders(request.headers()),
      requestBody: capBodySize(requestBody),
      responseHeaders: sanitizeHeaders(response.headers()),
      responseBody: capBodySize(responseBody),
      duration: durationMs,
      timestamp: captureStart,
      error: captureError
    };

    page._qakitNetworkCapture.calls.push(record);
  });

  return 'initialized';
}"
```

### Expected Output
- "initialized" - First time initialization
- "already_initialized" - Listener already installed

### Error Handling
- If command fails: log warning, continue (non-fatal)
- Network capture is optional - locator capture must not be blocked

## Collection

Network data is collected via browser page context at end of capture.

### Collection Code

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => {
  const capture = page._qakitNetworkCapture;
  if (!capture) return JSON.stringify({ calls: [], sequence: 0, startTime: Date.now() });
  return JSON.stringify({ calls: capture.calls, sequence: capture.sequence, startTime: capture.startTime });
}"
```

### Parsing Output
```
Parse JSON output → { calls: NETWORK_CALLS, startTime: CAPTURE_START_TIME, pageUrl: PAGE_URL }
If run-code fails or returns empty: NETWORK_CALLS = [], CAPTURE_START_TIME = Date.now(), PAGE_URL = {URL} (non-fatal)
```

## Analysis

Network data is analyzed to generate 4 enhancements.

[See: Network Enhancements](../network-enhancements.md)

### Enhancement #1: API Endpoint Inventory
Groups endpoints by method + normalized URL pattern with call counts and average durations.

### Enhancement #2: Request/Response Schema Detection
Parses JSON bodies to extract field names and types.

### Enhancement #3: Call Sequence & Dependencies
Tracks call order and identifies dependencies between network calls.

### Enhancement #4: Timing Breakdown
Extracts or estimates timing breakdown (DNS, TLS, TTFB, Download).

## Automatic Filtering

Network capture automatically excludes:
- Static assets (.png, .jpg, .gif, .css, .woff, .ttf, etc.)
- Minified bundles and source maps
- Favicon and health check endpoints
- 1xx informational responses
- Invalid status codes (null, 0, >= 600)

Includes:
- All API calls (2xx, 3xx, 4xx, 5xx)
- JSON and text responses
- Request/response bodies (capped at 100KB)

## Sensitive Data Handling

### Redacted Headers
The following headers are automatically redacted as `[REDACTED]`:
- Authorization
- Cookie
- Set-Cookie
- X-API-Key
- X-Auth-Token
- X-Access-Token
- X-Secret-Key
- API-Key
- X-CSRF-Token

### Body Truncation
Request and response bodies are independently capped at 100KB:
- If body exceeds 100KB: truncated and appended with `\n...[TRUNCATED - body exceeded 100KB limit]`
- Prevents excessive disk usage and memory overhead
- Both bodies capped independently

## Mode-Specific Behavior

### SIMPLE MODE
- Network capture spans STEP 5 initialization → STEP 9 collection
- `network-calls.json` written once for the page
- Path: `{OUTPUT_PATH}/{PageName}/network-calls.json`

### INTERACTIVE MODE
- Network capture spans STEP 5 initialization → STEP 7 collection
- Captures entire session (all pages)
- `network-calls.json` written once, aggregating ALL pages' network activity
- Path: `{OUTPUT_PATH}/network-calls.json` (at root level)

### SESSION MODE
- Network capture spans STEP 4 initialization → STEP 7 collection
- `network-calls.json` written once for the captured page
- Capture state reset for next --session run
- Path: `{OUTPUT_PATH}/{PageName}/network-calls.json`

## Edge Cases & Recovery

All modes handle these scenarios identically:

1. **Network errors** (ECONNRESET, timeout): response event may not fire; these calls silently omitted
2. **Non-JSON bodies**: stored as raw string, not parsed object
3. **Binary responses** (images, PDF): content-type guard skips body capture
4. **Duplicate listener**: `window.__qakitNetworkCapture_v1` guard prevents double-registration
5. **run-code failure**: warning logged, NETWORK_CALLS = [] (empty), execution continues (non-fatal)
6. **Empty call list**: network-calls.json still created with empty array + zero metrics (non-fatal)

## Performance Considerations

- Request and response bodies are independently capped at 100KB
- When a body exceeds 100KB, it is truncated and appended with marker
- Sensitive headers are redacted regardless of request/response size
- Network capture runs asynchronously - does NOT block locator capture
- All regex patterns compiled once - reused per event (efficient)

## Output Format

[See: Network Capture Format](../network-capture-format.md)

## Best Practices

1. **Review network data** - Understand API usage patterns
2. **Use for API test generation** - Generate tests from captured data
3. **Monitor sensitive data** - Verify headers are redacted
4. **Check body truncation** - Ensure important data not truncated
5. **Analyze sequences** - Understand multi-step workflows
