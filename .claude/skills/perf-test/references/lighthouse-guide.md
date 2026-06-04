# Lighthouse Guide

Lighthouse CLI: headless audit for Core Web Vitals and performance score.

## Install & Run

```bash
npm install -g lighthouse

# Basic audit — JSON output
lighthouse https://example.com --output=json --output-path=./lh-report.json --chrome-flags="--headless"

# Mobile simulation (default)
lighthouse https://example.com --output=json --output-path=./lh-report.json --chrome-flags="--headless" --form-factor=mobile

# Desktop
lighthouse https://example.com --output=json --output-path=./lh-report.json --chrome-flags="--headless" --preset=desktop

# Quiet mode (suppress progress)
lighthouse https://example.com --output=json --quiet --output-path=./lh-report.json --chrome-flags="--headless"
```

## Key Metrics to Extract from JSON

```js
const report = JSON.parse(fs.readFileSync('./lh-report.json'));
const audits = report.audits;
const categories = report.categories;

const metrics = {
  score:       Math.round(categories.performance.score * 100),  // 0–100
  lcp:         audits['largest-contentful-paint'].numericValue,  // ms ← shown in UI
  cls:         audits['cumulative-layout-shift'].numericValue,   // unitless ← shown in UI
  tbt:         audits['total-blocking-time'].numericValue,       // ms ← shown in UI (replaces FID)
  ttfb:        audits['server-response-time'].numericValue,      // ms
  fcp:         audits['first-contentful-paint'].numericValue,    // ms ← shown in UI
  speedIndex:  audits['speed-index'].numericValue,               // ms ← shown in UI
  // NOTE: tti (interactive) is extractable but NOT displayed in Lighthouse v10+ UI
  // tti:      audits['interactive'].numericValue,
  // NOTE: fid (max-potential-fid) is DEPRECATED since Lighthouse v10 — use tbt instead
};
```

## Default Thresholds (Google CWV Good/Needs Improvement/Poor)

| Metric | Good | Needs Improvement | Poor | Shown in v13 UI? |
|--------|------|-------------------|------|-----------------|
| LCP | <2500ms | 2500–4000ms | >4000ms | ✅ |
| INP | <200ms | 200–500ms | >500ms | ⚠️ field data only |
| CLS | <0.1 | 0.1–0.25 | >0.25 | ✅ |
| TBT | <200ms | 200–600ms | >600ms | ✅ (proxy for INP) |
| TTFB | <600ms | 600–1800ms | >1800ms | ❌ (diagnostics only) |
| Score | >90 | 50–90 | <50 | ✅ |
| ~~FID~~ | ~~<100ms~~ | — | — | ❌ **Deprecated v10** |

**⚠️ `--preset` matters:**
- `--preset=desktop` → no throttling → LCP ~1s (ideal conditions)
- default (mobile) → 4× CPU slowdown → LCP 2–4× higher (realistic mobile)

**Stable results:** Use `--runs=3` and take median to reduce noise.

## Config File (optional)

```js
// lighthouse-config.js
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
    screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1 }
  }
};
```

```bash
lighthouse https://example.com --config-path=./lighthouse-config.js --output=json --output-path=./lh-report.json
```

## Authenticated Pages — Cookie Injection via playwright-cli

Lighthouse cannot fill login forms. Solution: use `playwright-cli` to run the flow first, save browser state, then inject cookies into Lighthouse.

**Install:** `npm install -g @playwright/cli` (or check `playwright-cli --version`)

### Step 1: Run flow with playwright-cli, save state

```bash
SESSION="perf-session"

# Open browser
playwright-cli -s=$SESSION open https://app.example.com/login

# Login
playwright-cli -s=$SESSION fill 'input[name="username"]' user@example.com
playwright-cli -s=$SESSION fill 'input[type="password"]' pass123
playwright-cli -s=$SESSION click 'button[type="submit"]'

# Pre-setup actions (e.g. add to cart before auditing /cart)
playwright-cli -s=$SESSION click '[data-test="add-to-cart"]'
playwright-cli -s=$SESSION goto https://app.example.com/cart

# Save full browser state (cookies + localStorage)
playwright-cli -s=$SESSION state-save /tmp/perf-state.json
playwright-cli -s=$SESSION close
```

### Step 2: Extract cookies from state, inject into Lighthouse

```bash
# Extract Cookie header string from saved state
COOKIE=$(node -e "
  const s = JSON.parse(require('fs').readFileSync('/tmp/perf-state.json','utf8'));
  const c = (s.cookies||[]).map(c=>c.name+'='+c.value).join('; ');
  process.stdout.write(c);
")

# Run Lighthouse with cookies
lighthouse https://app.example.com/dashboard \
  --extra-headers="{\"Cookie\":\"$COOKIE\"}" \
  --output=json --output-path=./lh-dashboard.json \
  --chrome-flags="--headless" --preset=desktop --quiet
```

### Full Multi-page Flow (login → setup → audit all pages)

```bash
SESSION="perf-session"
BASE="https://app.example.com"
PAGES=("/dashboard" "/cart" "/checkout" "/profile")

# Step 1: Run flow to get authenticated state with cart/data pre-populated
playwright-cli -s=$SESSION open $BASE/login
playwright-cli -s=$SESSION fill '[name="email"]' user@test.com
playwright-cli -s=$SESSION fill '[type="password"]' pass123
playwright-cli -s=$SESSION click '[type="submit"]'
playwright-cli -s=$SESSION click '[data-test="add-to-cart"]'   # pre-populate state
playwright-cli -s=$SESSION state-save /tmp/perf-state.json
playwright-cli -s=$SESSION close

# Step 2: Extract cookies
COOKIE=$(node -e "
  const s = JSON.parse(require('fs').readFileSync('/tmp/perf-state.json','utf8'));
  process.stdout.write((s.cookies||[]).map(c=>c.name+'='+c.value).join('; '));
")

# Step 3: Audit each page in parallel
for PAGE in "${PAGES[@]}"; do
  SLUG=$(echo "$PAGE" | tr '/' '-' | sed 's/^-//')
  lighthouse "${BASE}${PAGE}" \
    --extra-headers="{\"Cookie\":\"${COOKIE}\"}" \
    --output=json --output-path="./lh-${SLUG}.json" \
    --chrome-flags="--headless" --preset=desktop --quiet &
done
wait
echo "All pages audited ✅"
```

### Useful playwright-cli commands

```bash
playwright-cli -s=$SESSION cookie-list          # list all cookies
playwright-cli -s=$SESSION cookie-get session   # get specific cookie
playwright-cli -s=$SESSION snapshot             # capture current page state
playwright-cli -s=$SESSION eval "document.title" # run JS on page
```

Parse all results and aggregate:

```js
const pages = ['dashboard', 'orders', 'profile'];
const results = pages.map(slug => {
  const report = JSON.parse(fs.readFileSync(`./lh-${slug}.json`));
  return {
    page: `/${slug}`,
    score: Math.round(report.categories.performance.score * 100),
    lcp:   report.audits['largest-contentful-paint'].numericValue,
    cls:   report.audits['cumulative-layout-shift'].numericValue,
    ttfb:  report.audits['server-response-time'].numericValue,
  };
});

// Find worst page
const worst = results.sort((a, b) => a.score - b.score)[0];
```

## Error Handling

- `CHROME_NOT_FOUND`: install Chrome or pass `CHROME_PATH=/usr/bin/chromium-browser`
- `PROTOCOL_TIMEOUT`: add `--max-wait-for-load=45000`
- `FAILED_DOCUMENT_REQUEST`: check URL accessible, or cookies expired — re-run Playwright login
- Login selector not found: try `input[name="username"]`, `input[id="email"]`, or inspect the form
