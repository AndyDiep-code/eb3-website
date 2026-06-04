# Artillery Guide

Artillery: YAML-driven load testing. Great for complex multi-step scenarios and flow-based user journeys.

## Install

```bash
npm install -g artillery
```

## Basic YAML Config (from api-calls.json)

```yaml
# artillery-config.yml
config:
  target: "https://api.example.com"
  phases:
    - duration: 30
      arrivalRate: 10          # 10 new users/sec
      name: "Steady load"
  defaults:
    headers:
      Content-Type: "application/json"

scenarios:
  - name: "API flow"
    flow:
      - get:
          url: "/users"
          expect:
            - statusCode: 200
      - post:
          url: "/login"
          json:
            email: "test@example.com"
            password: "password"
          capture:
            - json: "$.token"
              as: "authToken"
      - get:
          url: "/profile"
          headers:
            Authorization: "Bearer {{ authToken }}"
```

## Run

```bash
# Basic run
artillery run artillery-config.yml

# JSON report output
artillery run --output artillery-report.json artillery-config.yml

# Specific duration/rate override
artillery run --count 50 --n 30 artillery-config.yml

# Quick test (no config file)
artillery quick --count 10 --num 30 https://api.example.com/health
```

## Ramp-up Phases

```yaml
config:
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Ramp up"
      rampTo: 100
    - duration: 60
      arrivalRate: 100
      name: "Peak load"
    - duration: 30
      arrivalRate: 5
      name: "Cool down"
```

## Parse JSON Report

```js
const report = JSON.parse(fs.readFileSync('artillery-report.json'));
const agg = report.aggregate;

const metrics = {
  p50: agg.latency.p50,     // ms
  p95: agg.latency.p95,     // ms
  p99: agg.latency.p99,     // ms
  mean: agg.latency.mean,   // ms
  rps: agg.rps.mean,        // requests/sec
  errorRate: (agg.counters['vusers.failed'] || 0) / agg.counters['vusers.created'] * 100,
};
```

## Thresholds in Config

```yaml
config:
  ensure:
    p99: 1000          # fail if p99 > 1000ms
    maxErrorRate: 1    # fail if error rate > 1%
```

## Authentication & Variables

```yaml
config:
  variables:
    baseUrl: "https://api.example.com"
  payload:
    path: "./users.csv"       # load test data from CSV
    fields:
      - "email"
      - "password"

scenarios:
  - flow:
      - post:
          url: "/login"
          json:
            email: "{{ email }}"
            password: "{{ password }}"
```
