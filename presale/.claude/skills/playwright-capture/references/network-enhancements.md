# Network Analysis Enhancements

The locators capture skill automatically generates 4 advanced network analysis features in the network-calls.json output.

## Enhancement #1: API Endpoint Inventory

Extracts unique endpoints (method + URL pattern) with aggregated metrics.

### Purpose
Identify which APIs are called most frequently and their average response times.

### Output Structure
```json
{
  "summary": {
    "endpoints": {
      "GET /api/users": { "count": 5, "avgDuration": 245 },
      "POST /api/users": { "count": 1, "avgDuration": 520 },
      "GET /api/users/{id}": { "count": 3, "avgDuration": 180 },
      "GET /api/posts": { "count": 2, "avgDuration": 310 }
    }
  }
}
```

### Features
- Normalizes URLs by replacing numeric IDs with `{id}` placeholder
  - `/api/users/1` → `/api/users/{id}`
  - `/api/users/2` → `/api/users/{id}`
  - `/api/posts/123` → `/api/posts/{id}`
- Removes query parameters and hash fragments
- Tracks call count and average duration per endpoint
- Helps identify performance bottlenecks and API usage patterns

### Use Cases
- Understand API usage patterns
- Identify frequently called endpoints
- Find performance bottlenecks
- Plan API test coverage

---

## Enhancement #2: Request/Response Schema Detection

Parses JSON request/response bodies to extract field names and types.

### Purpose
Understand data structure and contracts without manually parsing entire bodies.

### Output Structure
```json
{
  "networkCalls": [
    {
      "sequence": 1,
      "method": "POST",
      "url": "https://api.example.com/users",
      "schema": {
        "requestSchema": {
          "name": "string",
          "email": "string",
          "age": "number",
          "address": "object"
        },
        "responseSchema": {
          "id": "number",
          "name": "string",
          "email": "string",
          "createdAt": "string"
        }
      }
    }
  ]
}
```

### Features
- Automatically detects field types: `string`, `number`, `boolean`, `object`, `array`, `null`
- Extracts schema from both request and response bodies
- Handles non-JSON responses gracefully (returns null)
- Useful for API contract verification and documentation generation

### Type Detection
```
"name": "string"        → typeof value === 'string'
"age": "number"         → typeof value === 'number'
"active": "boolean"     → typeof value === 'boolean'
"address": "object"     → typeof value === 'object' && !Array.isArray(value)
"tags": "array"         → Array.isArray(value)
"deleted": "null"       → value === null
```

### Use Cases
- Generate API documentation
- Validate API contracts
- Create test data generators
- Understand request/response structure

---

## Enhancement #3: Call Sequence & Dependencies

Tracks call order and identifies dependencies between network calls.

### Purpose
Understand call flow and identify which calls depend on data from previous responses.

### Output Structure
```json
{
  "sequences": [
    {
      "flow": "Flow_1_api_example_com",
      "calls": [
        {
          "order": 1,
          "method": "POST",
          "url": "https://api.example.com/login",
          "status": 200,
          "responseExtracted": ["token", "userId"]
        },
        {
          "order": 2,
          "method": "GET",
          "url": "https://api.example.com/users/{id}",
          "status": 200,
          "dependsOnFields": ["id"]
        },
        {
          "order": 3,
          "method": "GET",
          "url": "https://api.example.com/posts",
          "status": 200
        }
      ]
    }
  ]
}
```

### Features
- Groups calls by domain into separate flow sequences
- Auto-numbers calls in sequence order
- Detects extracted fields from responses:
  - `id` - User/resource ID
  - `token` - Authentication token
  - `userId` - User identifier
  - `sessionId` - Session identifier
- Marks calls that depend on previously extracted fields
- Helps trace complex workflows and identify critical paths

### Dependency Detection
- Checks if URL contains `/{id}` or numeric path segments
- Checks if request body references previously extracted fields
- Marks dependencies for integration test generation

### Use Cases
- Understand API workflow sequences
- Identify critical paths
- Generate integration tests
- Trace data flow through APIs

---

## Enhancement #4: Timing Breakdown

Extracts or estimates timing breakdown for each network call (DNS, TLS, TTFB, Download).

### Purpose
Identify which phase of the request takes the most time (useful for performance optimization).

### Output Structure
```json
{
  "networkCalls": [
    {
      "sequence": 1,
      "method": "GET",
      "url": "https://api.example.com/users",
      "duration": 500,
      "timing": {
        "dns": 25,
        "tls": 100,
        "ttfb": 250,
        "download": 125,
        "total": 500
      }
    }
  ]
}
```

### Timing Phases

| Phase | Description | Typical % |
|-------|-------------|-----------|
| `dns` | DNS lookup time | 5% |
| `tls` | TLS handshake time | 20% |
| `ttfb` | Time To First Byte (server processing) | 50% |
| `download` | Response body download time | 25% |
| `total` | Total request time | 100% |

### Features
- Shows detailed timing breakdown for each network call
- Falls back to proportional estimation when exact timings unavailable
- Useful for identifying slow server responses vs slow network
- Helps optimize performance bottlenecks

### Estimation Logic
When exact timings unavailable, uses proportional breakdown:
```
dns = total * 0.05
tls = total * 0.20
ttfb = total * 0.50
download = total * 0.25
```

### Use Cases
- Identify performance bottlenecks
- Optimize server response times
- Diagnose network issues
- Set performance baselines

---

## Combined Example

```json
{
  "capturedAt": "2026-04-02T10:30:00.000Z",
  "pageUrl": "https://example.com/dashboard",
  "networkCalls": [
    {
      "sequence": 1,
      "method": "POST",
      "url": "https://api.example.com/login",
      "status": 200,
      "statusText": "OK",
      "requestHeaders": { "content-type": "application/json" },
      "requestBody": { "email": "user@example.com", "password": "[REDACTED]" },
      "responseHeaders": { "content-type": "application/json" },
      "responseBody": { "token": "abc123", "userId": 42 },
      "duration": 520,
      "timestamp": "2026-04-02T10:30:00.000Z",
      "error": null,
      "schema": {
        "requestSchema": { "email": "string", "password": "string" },
        "responseSchema": { "token": "string", "userId": "number" }
      },
      "timing": { "dns": 26, "tls": 104, "ttfb": 260, "download": 130, "total": 520 }
    },
    {
      "sequence": 2,
      "method": "GET",
      "url": "https://api.example.com/users/42",
      "status": 200,
      "statusText": "OK",
      "requestHeaders": { "authorization": "[REDACTED]" },
      "requestBody": null,
      "responseHeaders": { "content-type": "application/json" },
      "responseBody": { "id": 42, "name": "John Doe", "email": "user@example.com" },
      "duration": 180,
      "timestamp": "2026-04-02T10:30:01.000Z",
      "error": null,
      "schema": {
        "requestSchema": null,
        "responseSchema": { "id": "number", "name": "string", "email": "string" }
      },
      "timing": { "dns": 9, "tls": 36, "ttfb": 90, "download": 45, "total": 180 }
    }
  ],
  "summary": {
    "totalRequests": 2,
    "successfulRequests": 2,
    "failedRequests": 0,
    "averageDuration": 350,
    "endpoints": {
      "POST /api/login": { "count": 1, "avgDuration": 520 },
      "GET /api/users/{id}": { "count": 1, "avgDuration": 180 }
    }
  },
  "sequences": [
    {
      "flow": "Flow_1_api_example_com",
      "calls": [
        {
          "order": 1,
          "method": "POST",
          "url": "https://api.example.com/login",
          "status": 200,
          "responseExtracted": ["token", "userId"]
        },
        {
          "order": 2,
          "method": "GET",
          "url": "https://api.example.com/users/{id}",
          "status": 200,
          "dependsOnFields": ["id"]
        }
      ]
    }
  ]
}
```

---

## Using Enhancements for Test Generation

These enhancements enable automatic API test generation:

### From Enhancement #1 (Endpoint Inventory)
- Identify all API endpoints to test
- Prioritize high-frequency endpoints
- Set performance baselines

### From Enhancement #2 (Schema Detection)
- Generate test data based on field types
- Validate request/response contracts
- Create schema validation tests

### From Enhancement #3 (Call Sequences)
- Generate integration tests
- Test multi-step workflows
- Validate data flow between calls

### From Enhancement #4 (Timing Breakdown)
- Set performance assertions
- Identify optimization opportunities
- Monitor performance regressions

---

## Best Practices

1. **Use endpoint inventory** to understand API usage
2. **Validate schemas** to catch contract changes
3. **Test sequences** to ensure workflows work end-to-end
4. **Monitor timing** to catch performance regressions
5. **Combine enhancements** for comprehensive API testing
