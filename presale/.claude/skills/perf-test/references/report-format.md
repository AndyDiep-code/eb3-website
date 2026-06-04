# Report Format

Unified output format for perf-test results across all tools and modes.

## Inline Report — Simple (no auth, no steps)

```
Performance Report — https://example.com — 2026-05-21 18:30:00
══════════════════════════════════════════════════════════════

[UI — Lighthouse | desktop]
  Score : 94/100  ✅  LCP: 1.2s ✅  CLS: 0.02 ✅  TTFB: 180ms ✅

[API — k6 | 50 VUs | 1m]
  p95: 120ms ✅  p99: 280ms ✅  errors: 0.1% ✅  RPS: 850

══════════════════════════════════════════════════════════════
Status: ✅ PASS
```

## Inline Report — Multi-step Workflow

When api-calls.json has `id` fields, show per-step breakdown:

```
Performance Report — shop.example.com — 2026-05-21 18:46:00
══════════════════════════════════════════════════════════════

[API — k6 | 20 VUs | 2m | Workflow: login→cart→checkout]

  Step                     p50     p95     p99    Status
  ─────────────────────────────────────────────────────
  POST /api/auth/login      32ms    45ms    68ms   ✅
  GET  /api/products        80ms   120ms   190ms   ✅
  POST /api/cart/items     110ms   180ms   240ms   ✅
  POST /api/orders/checkout 310ms  620ms   850ms   ❌

  Overall:
  Throughput  : 340 req/s
  Error rate  : 0.3%   ✅ (threshold: <1%)
  Total flows : 2,040 completed

  🔴 Bottleneck: POST /api/orders/checkout — p95 620ms (+24% over 500ms SLA)
  💡 Hint: checkout is 5× slower than other steps — likely DB write or payment gateway call

══════════════════════════════════════════════════════════════
Status: ❌ FAIL — 1 threshold exceeded
  - checkout p95: 620ms > 500ms
```

## Inline Report — Multi-page UI (authenticated)

```
Performance Report — app.example.com — 2026-05-21 18:46:00
══════════════════════════════════════════════════════════════

[UI — Lighthouse | Authenticated | desktop | 3 pages]

  Page          Score    LCP      CLS    TTFB   Status
  ────────────────────────────────────────────────────
  /dashboard     78/100   3.1s ❌  0.05   210ms  ❌
  /orders        91/100   1.4s ✅  0.02   180ms  ✅
  /profile       85/100   1.8s ✅  0.08   195ms  ✅

  🔴 Worst page: /dashboard — score 78 < 80, LCP 3.1s > 2.5s
  💡 Hint: /dashboard LCP slow — check large widgets, deferred JS blocking render

══════════════════════════════════════════════════════════════
Status: ❌ FAIL — /dashboard fails 2 thresholds
  - score: 78 < 80
  - lcp: 3.1s > 2.5s
```

## Threshold Failure + Bottleneck Hint Logic

When a step/page fails threshold:
1. Calculate overage %: `(actual - threshold) / threshold * 100`
2. For API steps: compare failing step's p95 against median step p95 — if >3× median, flag as bottleneck
3. Generate hint based on step name pattern:
   - `checkout`, `payment`, `order` → "likely DB write or payment gateway call"
   - `search`, `query`, `list` → "likely missing index or N+1 query"
   - `upload`, `file`, `media` → "likely large payload or storage I/O"
   - `auth`, `login`, `token` → "likely session store or JWT signing overhead"

## File Report (--report=file)

Saves to `perf-report-{YYYYMMDD-HHmmss}.md` in current directory.

```markdown
# Performance Report

- **URL**: https://example.com
- **Date**: 2026-05-21 18:30:00
- **Status**: ✅ PASS

## UI Results (Lighthouse)
...

## API Results (k6)
...

## Threshold Summary
| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP    | 1.2s  | <2.5s     | ✅     |
| p95    | 120ms | <500ms    | ✅     |
```

## Default Thresholds Reference

```json
{
  "ui": {
    "score": 80,
    "lcp":   2500,
    "tbt":   200,
    "cls":   0.1,
    "ttfb":  600
  },
  "api": {
    "p95":       500,
    "p99":       1000,
    "errorRate": 1.0,
    "rps":       null
  }
}
```
Note: `fid` removed — deprecated since Lighthouse v10. Use `tbt` (Total Blocking Time) instead.
```

## Custom Threshold Override (--threshold)

Pass as JSON string. Only specified keys are overridden; rest remain default.

```bash
# Override p95 only
/perf-test --mode=api --threshold='{"p95":200}'

# Override multiple
/perf-test --mode=both --threshold='{"p95":300,"errorRate":0.5,"lcp":2000,"score":90}'
```

## Normalized Metrics Object

Internal structure passed between tool parsers and report generator:

```ts
interface PerfMetrics {
  ui?: {
    score: number;     // 0–100
    lcp:   number;     // ms
    fid:   number;     // ms
    cls:   number;     // unitless
    ttfb:  number;     // ms
    fcp:   number;     // ms
    tbt:   number;     // ms
    tti:   number;     // ms
  };
  api?: {
    p50:       number;  // ms
    p95:       number;  // ms
    p99:       number;  // ms
    mean:      number;  // ms
    rps:       number;  // req/s
    errorRate: number;  // % (0–100)
    totalReqs: number;
    duration:  number;  // seconds
    tool:      'k6' | 'artillery' | 'autocannon';
  };
}
```
