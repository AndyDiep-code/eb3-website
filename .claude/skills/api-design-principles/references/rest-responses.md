# REST Response Design

> Consistent response formats and status codes.

## Status Codes

| Code | Use Case |
|------|----------|
| `200 OK` | GET, POST, DELETE, PATCH sync; PUT updated existing |
| `201 Created` | POST/PUT created new (include `Location` header) |
| `202 Accepted` | Async processing |
| `206 Partial Content` | Range request |
| `304 Not Modified` | ETag cache hit |
| `401 Unauthorized` | Not authenticated |
| `403 Forbidden` | Authenticated, no permission |
| `404 Not Found` | Resource not found |
| `422 Unprocessable Entity` | Valid syntax, invalid parameters |
| `429 Too Many Requests` | Rate limited |

## Return Full Resources

```bash
# DELETE returns full resource (200)
DELETE /apps/1f9b/domains/0fd4
→ HTTP/1.1 200 OK
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "hostname": "subdomain.example.com",
  "created_at": "2012-01-01T12:00:00Z",
  "updated_at": "2012-01-01T12:00:00Z"
}

# Async operations return empty (202)
DELETE /apps/1f9b/dynos/05bd
→ HTTP/1.1 202 Accepted
{}
```

## Resource UUIDs

```json
// REQUIRED: Lowercase 8-4-4-4-12 format
{"id": "01234567-89ab-cdef-0123-456789abcdef"}

// NEVER: Auto-incrementing IDs
{"id": 123}  // Bad - not globally unique
```

## Standard Timestamps (UTC ISO8601)

```json
{
  "created_at": "2012-01-01T12:00:00Z",
  "updated_at": "2012-01-01T13:00:00Z"
}
```

## Nest Foreign Key Relations

```json
// GOOD: Nested object (extensible)
{
  "name": "service-production",
  "owner": {
    "id": "5d8201b0...",
    "name": "Alice",
    "email": "alice@example.com"
  }
}

// BAD: Flat ID (not extensible)
{
  "name": "service-production",
  "owner_id": "5d8201b0..."
}
```

## Structured Errors (Heroku Style)

```json
{
  "id": "rate_limit",
  "message": "Account reached its API rate limit.",
  "url": "https://docs.service.com/rate-limits"
}
```

### Standard Error IDs

| ID | Status | Description |
|----|--------|-------------|
| `rate_limit` | 429 | Rate limit exceeded |
| `not_found` | 404 | Resource not found |
| `validation_error` | 422 | Invalid parameters |
| `unauthorized` | 401 | Authentication required |
| `forbidden` | 403 | Permission denied |
| `conflict` | 409 | State conflict |

## Minified JSON

```json
// GOOD: Minified (saves bandwidth)
{"beta":false,"email":"alice@heroku.com","id":"01234567-89ab-cdef"}

// Optional: ?pretty=true for debugging
```
