# GraphQL API Checklist

> Pre-implementation review checklist.

## Schema Design

- [ ] Schema-first approach used
- [ ] Types properly defined with nullability
- [ ] Interfaces used for polymorphism
- [ ] Unions used for heterogeneous results
- [ ] Custom scalars defined (DateTime, Email, etc.)
- [ ] Enums for type-safe values
- [ ] Input types for all mutations

## Queries

- [ ] Query depth limiting implemented
- [ ] Query complexity analysis enabled
- [ ] Maximum limits enforced
- [ ] Field arguments documented

## Mutations

- [ ] Input/Payload pattern used
- [ ] Errors returned in payload (not thrown)
- [ ] `success` boolean included
- [ ] `clientMutationId` for optimistic updates
- [ ] Batch mutations for bulk operations

## Pagination

- [ ] Cursor-based (Relay) for infinite scroll
- [ ] Offset-based for admin panels
- [ ] `PageInfo` with `hasNextPage`, `endCursor`
- [ ] `totalCount` available

## Performance

- [ ] DataLoaders for all relationships
- [ ] N+1 queries prevented
- [ ] Query batching enabled
- [ ] Persisted queries considered
- [ ] Response caching implemented

## Error Handling

- [ ] Structured errors in payloads
- [ ] Error codes (enum)
- [ ] Field-level errors
- [ ] Union error pattern for queries

## Documentation

- [ ] All types documented
- [ ] All fields documented
- [ ] Deprecations marked with `@deprecated`
- [ ] Examples provided
- [ ] Schema introspection enabled

## Security

- [ ] Authentication checked
- [ ] Authorization per field/type
- [ ] Input validation
- [ ] Rate limiting

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Types | PascalCase | `User`, `OrderStatus` |
| Fields | camelCase | `firstName`, `createdAt` |
| Enums | SCREAMING_SNAKE | `PENDING`, `SHIPPED` |
| Inputs | PascalCase + Input | `CreateUserInput` |
| Payloads | PascalCase + Payload | `CreateUserPayload` |

## Schema Evolution

- [ ] New fields are optional (nullable)
- [ ] Deprecated fields marked, not removed
- [ ] Breaking changes avoided
- [ ] Versioning strategy documented
