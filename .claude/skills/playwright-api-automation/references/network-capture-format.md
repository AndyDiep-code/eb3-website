# Network Capture Format

Enhanced network capture data with 4 key enhancements for API test generation.

## Overview

Network capture data should include:
1. **Endpoint Inventory** - Grouped by resource
2. **Schema Detection** - Request/response models
3. **Call Sequences** - Integration flows
4. **Performance Timing** - Baseline assertions

## File Location

```
./test-tasks/playwright/{task-id}/locators/{PageName}/network-calls.json
```

## Structure

### 1. Endpoint Inventory

```json
{
  "endpoints": [
    {
      "method": "POST",
      "path": "/api/users",
      "count": 5,
      "avgDuration": 125,
      "minDuration": 80,
      "maxDuration": 200,
      "resource": "users"
    },
    {
      "method": "GET",
      "path": "/api/users/{id}",
      "count": 10,
      "avgDuration": 50,
      "minDuration": 30,
      "maxDuration": 100,
      "resource": "users"
    }
  ]
}
```

**Fields:**
- `method` - HTTP method (GET, POST, PUT, PATCH, DELETE)
- `path` - API endpoint path
- `count` - Number of times endpoint was called
- `avgDuration` - Average response time (ms)
- `minDuration` - Minimum response time (ms)
- `maxDuration` - Maximum response time (ms)
- `resource` - Resource type (users, posts, etc.)

### 2. Schema Detection

```json
{
  "schemas": {
    "/api/users": {
      "requestSchema": {
        "type": "object",
        "required": ["email", "password"],
        "properties": {
          "email": { "type": "string", "format": "email" },
          "password": { "type": "string", "minLength": 8 },
          "name": { "type": "string" }
        }
      },
      "responseSchema": {
        "type": "object",
        "required": ["id", "email", "createdAt"],
        "properties": {
          "id": { "type": "number" },
          "email": { "type": "string" },
          "name": { "type": "string" },
          "createdAt": { "type": "string", "format": "date-time" }
        }
      },
      "statusCodes": {
        "201": "User created successfully",
        "400": "Invalid request data",
        "409": "User already exists"
      }
    }
  }
}
```

**Fields:**
- `requestSchema` - JSON Schema for request body
- `responseSchema` - JSON Schema for response body
- `statusCodes` - Expected status codes and meanings

### 3. Call Sequences

```json
{
  "sequences": [
    {
      "name": "UserCreationFlow",
      "description": "Create user then retrieve it",
      "calls": [
        {
          "method": "POST",
          "path": "/api/users",
          "extractPath": "$.id",
          "description": "Create new user"
        },
        {
          "method": "GET",
          "path": "/api/users/{id}",
          "description": "Retrieve created user"
        }
      ]
    }
  ]
}
```

**Fields:**
- `name` - Sequence name (e.g., UserCreationFlow)
- `description` - What the sequence does
- `calls` - Array of API calls in order
  - `method` - HTTP method
  - `path` - Endpoint path (can use {variable} placeholders)
  - `extractPath` - JSON path to extract from response (e.g., $.id)
  - `description` - What this call does

### 4. Performance Timing

```json
{
  "performance": {
    "/api/users": {
      "p50": 100,
      "p95": 250,
      "p99": 500,
      "min": 50,
      "max": 1000,
      "avg": 125
    },
    "/api/users/{id}": {
      "p50": 50,
      "p95": 100,
      "p99": 200,
      "min": 30,
      "max": 500,
      "avg": 50
    }
  }
}
```

**Fields:**
- `p50` - 50th percentile response time (ms)
- `p95` - 95th percentile response time (ms)
- `p99` - 99th percentile response time (ms)
- `min` - Minimum response time (ms)
- `max` - Maximum response time (ms)
- `avg` - Average response time (ms)

## Complete Example

```json
{
  "endpoints": [
    {
      "method": "POST",
      "path": "/api/users",
      "count": 5,
      "avgDuration": 125,
      "minDuration": 80,
      "maxDuration": 200,
      "resource": "users"
    },
    {
      "method": "GET",
      "path": "/api/users/{id}",
      "count": 10,
      "avgDuration": 50,
      "minDuration": 30,
      "maxDuration": 100,
      "resource": "users"
    }
  ],
  "schemas": {
    "/api/users": {
      "requestSchema": {
        "type": "object",
        "required": ["email", "password"],
        "properties": {
          "email": { "type": "string", "format": "email" },
          "password": { "type": "string", "minLength": 8 },
          "name": { "type": "string" }
        }
      },
      "responseSchema": {
        "type": "object",
        "required": ["id", "email", "createdAt"],
        "properties": {
          "id": { "type": "number" },
          "email": { "type": "string" },
          "name": { "type": "string" },
          "createdAt": { "type": "string", "format": "date-time" }
        }
      },
      "statusCodes": {
        "201": "User created successfully",
        "400": "Invalid request data",
        "409": "User already exists"
      }
    }
  },
  "sequences": [
    {
      "name": "UserCreationFlow",
      "description": "Create user then retrieve it",
      "calls": [
        {
          "method": "POST",
          "path": "/api/users",
          "extractPath": "$.id",
          "description": "Create new user"
        },
        {
          "method": "GET",
          "path": "/api/users/{id}",
          "description": "Retrieve created user"
        }
      ]
    }
  ],
  "performance": {
    "/api/users": {
      "p50": 100,
      "p95": 250,
      "p99": 500,
      "min": 50,
      "max": 1000,
      "avg": 125
    },
    "/api/users/{id}": {
      "p50": 50,
      "p95": 100,
      "p99": 200,
      "min": 30,
      "max": 500,
      "avg": 50
    }
  },
  "metadata": {
    "capturedAt": "2026-04-02T10:30:00Z",
    "duration": 300,
    "baseUrl": "http://localhost:3000",
    "environment": "dev"
  }
}
```

## Metadata (Optional)

```json
{
  "metadata": {
    "capturedAt": "2026-04-02T10:30:00Z",
    "duration": 300,
    "baseUrl": "http://localhost:3000",
    "environment": "dev"
  }
}
```

**Fields:**
- `capturedAt` - ISO 8601 timestamp of capture
- `duration` - Duration of capture in seconds
- `baseUrl` - Base URL of API
- `environment` - Environment (dev, staging, prod)

## Best Practices

1. **Capture Real Traffic** - Use actual user interactions to capture realistic data
2. **Include All Endpoints** - Capture all API endpoints used in the flow
3. **Capture Multiple Calls** - Multiple calls to same endpoint for accurate performance data
4. **Include Error Cases** - Capture error responses (400, 401, 403, 404, 500)
5. **Extract Response Data** - Use `extractPath` to link related API calls
6. **Accurate Schemas** - Ensure schemas match actual request/response structure
7. **Performance Baselines** - Capture performance data for realistic assertions

## Validation

Network capture data should:
- ✅ Have all 4 enhancements (endpoints, schemas, sequences, performance)
- ✅ Include at least one endpoint
- ✅ Have valid JSON Schema for request/response
- ✅ Include performance data for all endpoints
- ✅ Have valid HTTP methods
- ✅ Have valid JSON paths in extractPath
