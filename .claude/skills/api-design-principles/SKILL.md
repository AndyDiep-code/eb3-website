---
name: api-design-principles
description: Master REST and GraphQL API design following Heroku HTTP API Design best practices. Use when designing APIs, reviewing specifications, establishing standards, implementing endpoints, adding pagination/filtering, or creating API documentation. Covers TLS, versioning, Request-Id, ETags, rate limiting, structured errors, DataLoaders, and N+1 prevention.
user-invocable: false
when_to_use: "Invoke when designing, reviewing, or implementing REST or GraphQL APIs."
category: backend
keywords: [api, rest, graphql, design, endpoints, http]
---

# API Design Principles

Design APIs following **Heroku HTTP API Design** best practices.

## When to Use

- Designing new REST or GraphQL APIs
- Reviewing API specifications
- Implementing endpoints with pagination/filtering
- Adding middleware (Request-Id, ETag, rate limiting)
- Handling errors in APIs
- Preventing N+1 queries in GraphQL

## Quick Reference

### REST Foundations (Required)

| Requirement | Implementation |
|-------------|----------------|
| TLS | HTTPS only, 403 for HTTP (no redirects) |
| Versioning | `Accept: application/vnd.api+json; version=3` |
| Request-Id | UUID in every response |
| ETag | Cache validation, 304 Not Modified |
| Rate Limit | `RateLimit-Remaining` header |

### REST Naming

| Element | Convention | Example |
|---------|------------|---------|
| Paths | lowercase-dashes | `/app-setups` |
| Attributes | lowercase_underscores | `created_at` |
| Resource IDs | UUID 8-4-4-4-12 | `01234567-89ab-cdef-...` |

### REST Errors (Heroku Style)

```json
{"id": "rate_limit", "message": "Rate limit exceeded.", "url": "..."}
```

### GraphQL Essentials

- **DataLoaders**: Always use for relationships (N+1 prevention)
- **Mutations**: Input/Payload pattern with errors in payload
- **Pagination**: Cursor-based (Relay) for infinite scroll

## References

### REST

- `references/rest-foundations.md` - TLS, versioning, Request-Id, ETags, rate limits
- `references/rest-requests.md` - Path formats, methods, naming conventions
- `references/rest-responses.md` - Status codes, UUIDs, timestamps, errors
- `references/rest-pagination.md` - Offset, cursor, range-based patterns
- `references/rest-middleware.md` - Request-Id, ETag, rate limit middleware

### GraphQL

- `references/graphql-types.md` - Types, interfaces, unions, scalars
- `references/graphql-pagination.md` - Relay cursor, offset pagination
- `references/graphql-mutations.md` - Input/payload, batch, error patterns
- `references/graphql-performance.md` - DataLoader, N+1, complexity limits

### Assets

- `assets/checklist-rest.md` - REST pre-implementation checklist
- `assets/checklist-graphql.md` - GraphQL pre-implementation checklist
- `assets/rest-api-template.py` - FastAPI template with Heroku headers
