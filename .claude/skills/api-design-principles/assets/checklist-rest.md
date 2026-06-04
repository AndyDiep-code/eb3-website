# REST API Checklist (Heroku Style)

> Pre-implementation review checklist.

## Foundations (REQUIRED)

- [ ] TLS required for all endpoints (no HTTP allowed)
- [ ] HTTP requests rejected with 403 (no redirects)
- [ ] Version required in Accept header (`application/vnd.api+json; version=3`)
- [ ] No default version fallback
- [ ] Request-Id UUID in all responses
- [ ] ETag header in all responses
- [ ] RateLimit-Remaining header in all responses
- [ ] Range headers for large responses (206 Partial Content)

## Resource Design

- [ ] Resources are nouns, not verbs
- [ ] Plural names for collections (`/users`, not `/user`)
- [ ] Lowercase paths with dashes (`/app-setups`)
- [ ] Lowercase attributes with underscores (`created_at`)
- [ ] Actions under `/resources/{id}/actions/{action}`
- [ ] Both ID and name dereferencing supported
- [ ] Minimal path nesting (max 2 levels)

## HTTP Methods

- [ ] GET for retrieval (safe, idempotent)
- [ ] POST for creation
- [ ] PUT for full replacement (idempotent)
- [ ] PATCH for partial updates
- [ ] DELETE for removal (idempotent)

## Status Codes

- [ ] 200 OK for successful GET/PATCH/PUT/POST/DELETE (sync)
- [ ] 201 Created for POST/PUT that created new resource
- [ ] 201 includes Location header
- [ ] 202 Accepted for async operations
- [ ] 206 Partial Content for Range requests
- [ ] 304 Not Modified for ETag cache hits
- [ ] 401 Unauthorized for missing auth
- [ ] 403 Forbidden for insufficient permissions
- [ ] 404 Not Found for missing resources
- [ ] 422 Unprocessable Entity for validation errors
- [ ] 429 Too Many Requests for rate limiting

## Response Format

- [ ] Full resource returned on 200/201
- [ ] UUID for all resource IDs (8-4-4-4-12 format)
- [ ] No auto-incrementing IDs
- [ ] `created_at` and `updated_at` timestamps
- [ ] UTC times in ISO8601 format (`2012-01-01T12:00:00Z`)
- [ ] Foreign keys as nested objects (not flat IDs)
- [ ] Minified JSON responses
- [ ] Optional `?pretty=true` support

## Error Handling

- [ ] Structured error format: `{id, message, url}`
- [ ] Machine-readable error `id` (e.g., `rate_limit`, `not_found`)
- [ ] Human-readable `message`
- [ ] Optional `url` to documentation

## Pagination

- [ ] All collection endpoints paginated
- [ ] Default page size defined (e.g., 20)
- [ ] Maximum page size enforced (e.g., 100)

## Security

- [ ] Input validation on all fields
- [ ] SQL injection prevention
- [ ] HTTPS enforced (no HTTP)
- [ ] Sensitive data not in URLs

## Required Headers

| Header | Direction | Purpose |
|--------|-----------|---------|
| `Accept` | Request | Version specification |
| `Content-Type` | Request | `application/json` |
| `Request-Id` | Response | UUID for tracing |
| `ETag` | Response | Cache validation |
| `RateLimit-Remaining` | Response | Rate limit status |
| `Location` | Response | Created resource URL (201) |
