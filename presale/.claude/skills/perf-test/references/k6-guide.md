# k6 Guide

k6: JavaScript-based load testing. CI-friendly, scriptable, great for threshold-based pass/fail.

## Install

```bash
npm install -g k6
# or: brew install k6
```

## Generate Script from api-calls.json

Given `tests/playwright/docs/api-calls.json` with entries like:
```json
[{"method":"GET","url":"https://api.example.com/users","headers":{}},
 {"method":"POST","url":"https://api.example.com/login","body":{"email":"test@example.com"}}]
```

Generate k6 script:

```js
// perf-test.k6.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],   // p95 < 500ms
    http_req_failed: ['rate<0.01'],     // error rate < 1%
  },
};

export default function () {
  // GET /users
  const res1 = http.get('https://api.example.com/users');
  check(res1, { 'GET /users 200': (r) => r.status === 200 });

  // POST /login
  const res2 = http.post(
    'https://api.example.com/login',
    JSON.stringify({ email: 'test@example.com' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(res2, { 'POST /login 200': (r) => r.status === 200 });

  sleep(1);
}
```

## Run

```bash
# Basic run
k6 run perf-test.k6.js

# Override VUs and duration
k6 run --vus 50 --duration 1m perf-test.k6.js

# JSON summary output
k6 run --out json=k6-results.json perf-test.k6.js

# With custom thresholds via env
k6 run -e P95_THRESHOLD=200 perf-test.k6.js
```

## Parse JSON Output

```js
const results = JSON.parse(fs.readFileSync('k6-results.json'));
// Key metric paths:
// results.metrics.http_req_duration.values.p(95) → p95 latency (ms)
// results.metrics.http_req_duration.values.p(99) → p99 latency
// results.metrics.http_req_duration.values.avg   → average latency
// results.metrics.http_req_failed.values.rate     → error rate (0–1)
// results.metrics.http_reqs.values.rate           → requests/sec
```

## Ramp-up Pattern

```js
export const options = {
  stages: [
    { duration: '30s', target: 10 },   // ramp up
    { duration: '1m',  target: 50 },   // sustained load
    { duration: '30s', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.01'],
  },
};
```

## Authentication — Login Once, Share Token

Use `setup()` to login once per test run. All VUs share the token — avoids hammering /login endpoint.

```js
export function setup() {
  const res = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify({
    email: __ENV.EMAIL || 'test@example.com',
    password: __ENV.PASSWORD || 'pass123',
  }), { headers: { 'Content-Type': 'application/json' } });

  if (res.status !== 200) {
    throw new Error(`Login failed: ${res.status} ${res.body}`);
  }
  return { token: res.json('data.accessToken') };
}

export default function (data) {
  const authHeaders = {
    Authorization: `Bearer ${data.token}`,
    'Content-Type': 'application/json',
  };
  http.get(`${BASE_URL}/api/protected`, { headers: authHeaders });
}
```

## Multi-step Workflow with Per-step Groups

Use k6 `group()` to get per-step p95/p99 breakdown in results.

```js
import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://api.example.com';

export const options = {
  vus: 20,
  duration: '2m',
  thresholds: {
    // Overall thresholds
    'http_req_duration': ['p(95)<500'],
    'http_req_failed': ['rate<0.01'],
    // Per-step thresholds using group tags
    'http_req_duration{group:::checkout}': ['p(95)<800'],
    'http_req_duration{group:::get-products}': ['p(95)<300'],
  },
};

export function setup() {
  const res = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify({
    email: __ENV.EMAIL, password: __ENV.PASSWORD,
  }), { headers: { 'Content-Type': 'application/json' } });
  return { token: res.json('data.accessToken') };
}

export default function (data) {
  const auth = { Authorization: `Bearer ${data.token}`, 'Content-Type': 'application/json' };

  let productId;

  group('get-products', () => {
    const res = http.get(`${BASE_URL}/api/products?category=electronics`, { headers: auth });
    check(res, { 'products 200': (r) => r.status === 200 });
    productId = res.json('data[0].id');
  });

  group('add-to-cart', () => {
    const res = http.post(`${BASE_URL}/api/cart/items`,
      JSON.stringify({ productId, quantity: 1 }), { headers: auth });
    check(res, { 'add-to-cart 201': (r) => r.status === 201 });
  });

  group('checkout', () => {
    const res = http.post(`${BASE_URL}/api/orders/checkout`,
      JSON.stringify({ paymentMethod: 'card' }), { headers: auth });
    check(res, { 'checkout 201': (r) => r.status === 201 });
  });

  sleep(1);
}
```

## Parse Per-step Metrics from JSON Output

```js
const results = JSON.parse(fs.readFileSync('k6-results.json'));

// Overall metrics
const overall = {
  p95:       results.metrics['http_req_duration'].values['p(95)'],
  errorRate: results.metrics['http_req_failed'].values.rate * 100,
  rps:       results.metrics['http_reqs'].values.rate,
};

// Per-step metrics (requires group tagging)
const steps = {};
for (const [key, val] of Object.entries(results.metrics)) {
  const match = key.match(/^http_req_duration\{group:::(.+)\}$/);
  if (match) {
    steps[match[1]] = {
      p50: val.values['p(50)'],
      p95: val.values['p(95)'],
      p99: val.values['p(99)'],
    };
  }
}

// Find bottleneck: step with highest p95
const bottleneck = Object.entries(steps)
  .sort(([, a], [, b]) => b.p95 - a.p95)[0];
// bottleneck = ['checkout', { p50: 180, p95: 620, p99: 850 }]
```
