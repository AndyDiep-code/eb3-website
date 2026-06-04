# Network Capture Integration

How network capture data is used in API test generation.

## Overview

Network capture data provides the foundation for API test generation. The skill extracts 4 key enhancements from captured network interactions to generate comprehensive test automation.

## 4 Network Analysis Enhancements

### 1. Endpoint Inventory

Grouped by resource with metadata about each endpoint.

```json
{
  "endpoints": [
    {
      "method": "POST",
      "path": "/api/users",
      "count": 5,
      "avgDuration": 125,
      "minDuration": 80,
      "maxDuration": 200
    },
    {
      "method": "GET",
      "path": "/api/users",
      "count": 8,
      "avgDuration": 95,
      "minDuration": 50,
      "maxDuration": 150
    },
    {
      "method": "GET",
      "path": "/api/users/{id}",
      "count": 12,
      "avgDuration": 110,
      "minDuration": 60,
      "maxDuration": 180
    }
  ]
}
```

**Used for:**
- Identifying all endpoints to test
- Filtering by endpoint pattern
- Performance baseline assertions

### 2. Schema Detection

Request and response models extracted from captured data.

```json
{
  "POST /api/users": {
    "requestSchema": {
      "type": "object",
      "required": ["email", "password", "name"],
      "properties": {
        "email": { "type": "string", "format": "email" },
        "password": { "type": "string", "minLength": 8 },
        "name": { "type": "string" }
      }
    },
    "responseSchema": {
      "type": "object",
      "required": ["id", "email", "name", "createdAt"],
      "properties": {
        "id": { "type": "number" },
        "email": { "type": "string" },
        "name": { "type": "string" },
        "createdAt": { "type": "string", "format": "date-time" }
      }
    }
  }
}
```

**Used for:**
- Generating valid test data
- Generating invalid test data (missing required, wrong type)
- Response validation in tests
- JSON Schema assertions

### 3. Call Sequences

Integration flows showing related API calls in order.

```json
{
  "sequences": [
    {
      "name": "UserCreationFlow",
      "calls": [
        {
          "method": "POST",
          "path": "/api/users",
          "extractPath": "$.id"
        },
        {
          "method": "GET",
          "path": "/api/users/{id}"
        }
      ]
    },
    {
      "name": "UserUpdateFlow",
      "calls": [
        {
          "method": "GET",
          "path": "/api/users/{id}"
        },
        {
          "method": "PUT",
          "path": "/api/users/{id}"
        },
        {
          "method": "GET",
          "path": "/api/users/{id}"
        }
      ]
    }
  ]
}
```

**Used for:**
- Generating integration tests
- Multi-step test flows
- Data extraction between calls

### 4. Performance Timing

Baseline response times for performance assertions.

```json
{
  "performanceBaselines": {
    "/api/users": {
      "POST": { "p95": 250, "p99": 500 },
      "GET": { "p95": 150, "p99": 300 }
    },
    "/api/users/{id}": {
      "GET": { "p95": 200, "p99": 400 },
      "PUT": { "p95": 300, "p99": 600 }
    }
  }
}
```

**Used for:**
- Performance test assertions
- Response time thresholds
- Performance regression detection

## Network Capture File Structure

Expected location: `./test-tasks/playwright/{task-id}/locators/*/network-calls.json`

```json
{
  "endpoints": [...],
  "schemas": {...},
  "sequences": [...],
  "performanceBaselines": {...}
}
```

## How to Validate Network Capture

Check that network capture has all 4 enhancements:

1. **Endpoints**: At least 1 endpoint with method, path, count, avgDuration
2. **Schemas**: At least 1 endpoint with requestSchema and responseSchema
3. **Sequences**: At least 1 sequence with calls array
4. **Performance**: At least 1 endpoint with p95 and p99 timing

## How to Enhance Network Capture

If network capture is missing enhancements:

1. Run locators capture command with network capture enabled
2. Ensure browser session captures all API calls
3. Verify network calls are properly analyzed
4. Check that schemas are extracted from request/response bodies
5. Verify call sequences are detected from call order

## Example Network Capture

```json
{
  "endpoints": [
    {
      "method": "POST",
      "path": "/api/users",
      "count": 5,
      "avgDuration": 125,
      "minDuration": 80,
      "maxDuration": 200
    },
    {
      "method": "GET",
      "path": "/api/users",
      "count": 8,
      "avgDuration": 95,
      "minDuration": 50,
      "maxDuration": 150
    }
  ],
  "schemas": {
    "POST /api/users": {
      "requestSchema": {
        "type": "object",
        "required": ["email", "password"],
        "properties": {
          "email": { "type": "string" },
          "password": { "type": "string" }
        }
      },
      "responseSchema": {
        "type": "object",
        "required": ["id", "email"],
        "properties": {
          "id": { "type": "number" },
          "email": { "type": "string" }
        }
      }
    }
  },
  "sequences": [
    {
      "name": "UserCreationFlow",
      "calls": [
        { "method": "POST", "path": "/api/users", "extractPath": "$.id" },
        { "method": "GET", "path": "/api/users/{id}" }
      ]
    }
  ],
  "performanceBaselines": {
    "/api/users": {
      "POST": { "p95": 250, "p99": 500 },
      "GET": { "p95": 150, "p99": 300 }
    }
  }
}
```

## Related Documentation

[See: API Client Template](../formats/api-client-template.md)
[See: Test Data Schema](../formats/test-data-schema.md)
