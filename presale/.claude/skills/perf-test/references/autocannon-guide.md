# autocannon Guide

autocannon: Node.js native HTTP/1.1 benchmarking. Fast, minimal setup, no external binary required.

## Install

```bash
npm install -g autocannon
# or as dev dependency: npm install --save-dev autocannon
```

## CLI Usage

```bash
# Basic — 10 connections, 30 seconds
autocannon -c 10 -d 30 https://api.example.com/users

# Custom connections and duration
autocannon -c 50 -d 60 https://api.example.com/users

# POST request with body
autocannon -c 10 -d 30 \
  -m POST \
  -H "Content-Type: application/json" \
  -b '{"email":"test@example.com"}' \
  https://api.example.com/login

# JSON output
autocannon -c 10 -d 30 --json https://api.example.com/users > autocannon-results.json

# With rate limiting (requests/sec)
autocannon -c 10 -d 30 -r 100 https://api.example.com/users
```

## Programmatic API (Node.js script)

```js
// perf-autocannon.js
const autocannon = require('autocannon');

async function runTest(url, opts = {}) {
  const result = await autocannon({
    url,
    connections: opts.vus || 10,
    duration: opts.duration || 30,  // seconds
    headers: opts.headers || {},
    method: opts.method || 'GET',
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  return result;
}

module.exports = { runTest };
```

## Parse Results

```js
const result = JSON.parse(fs.readFileSync('autocannon-results.json'));

const metrics = {
  p50:       result.latency.p50,        // ms
  p95:       result.latency.p97_5,      // ms (autocannon uses p97_5 ≈ p95)
  p99:       result.latency.p99,        // ms
  mean:      result.latency.mean,       // ms
  rps:       result.requests.mean,      // requests/sec
  throughput: result.throughput.mean,   // bytes/sec
  errors:    result.errors,             // count
  timeouts:  result.timeouts,           // count
  duration:  result.duration,           // seconds
  totalReqs: result.requests.total,
};

// Calculate error rate %
const errorRate = (metrics.errors + metrics.timeouts) / metrics.totalReqs * 100;
```

## Multi-endpoint Testing (from api-calls.json)

```js
// Run tests against multiple endpoints sequentially
const endpoints = require('./tests/playwright/docs/api-calls.json');

async function runAllTests(baseUrl, vus, duration) {
  const results = [];
  for (const ep of endpoints) {
    const url = ep.url.startsWith('http') ? ep.url : `${baseUrl}${ep.url}`;
    const result = await autocannon({
      url,
      connections: vus,
      duration,
      method: ep.method || 'GET',
      headers: ep.headers || {},
      body: ep.body ? JSON.stringify(ep.body) : undefined,
    });
    results.push({ endpoint: `${ep.method} ${ep.url}`, ...result });
  }
  return results;
}
```

## Authentication

```js
// Bearer token
autocannon({
  url: 'https://api.example.com/protected',
  headers: { Authorization: `Bearer ${token}` },
  connections: 10,
  duration: 30,
});
```

## Key Differences from k6/Artillery

| Feature | autocannon | k6 | Artillery |
|---------|-----------|-----|-----------|
| Config | Code/CLI | JS script | YAML |
| Install | npm | binary | npm |
| CI output | JSON | JSON/CSV | JSON |
| Scenarios | Simple | Complex | Complex |
| Speed | Fastest | Fast | Moderate |
