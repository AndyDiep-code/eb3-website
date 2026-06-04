# GraphQL Mutations & Errors

> Input/payload patterns, batch mutations, error handling.

## Input/Payload Pattern

```graphql
input CreatePostInput {
  title: String!
  content: String!
  tags: [String!]
}

type CreatePostPayload {
  post: Post
  errors: [Error!]
  success: Boolean!
}

type Error {
  field: String
  message: String!
  code: ErrorCode!
}

type Mutation {
  createPost(input: CreatePostInput!): CreatePostPayload!
}
```

## Optimistic Response Support

```graphql
input UpdateUserInput {
  id: ID!
  name: String
  clientMutationId: String  # For client tracking
}

type UpdateUserPayload {
  user: User
  clientMutationId: String
  errors: [Error!]
}
```

## Batch Mutations

```graphql
input BatchCreateUserInput {
  users: [CreateUserInput!]!
}

type BatchCreateUserPayload {
  results: [CreateUserResult!]!
  successCount: Int!
  errorCount: Int!
}

type CreateUserResult {
  user: User
  errors: [Error!]
  index: Int!
}
```

## Union Error Pattern

```graphql
type ValidationError { field: String!; message: String! }
type NotFoundError { message: String!; resourceType: String!; resourceId: ID! }
type AuthorizationError { message: String! }

union UserResult = User | ValidationError | NotFoundError | AuthorizationError

# Usage
{ user(id: "123") {
    ... on User { id email }
    ... on NotFoundError { message }
  }
}
```

## Error Codes

```graphql
enum ErrorCode {
  VALIDATION_ERROR
  UNAUTHORIZED
  NOT_FOUND
  CONFLICT
  INTERNAL_ERROR
}
```

## Best Practices

1. Always use input types for mutations
2. Return errors in payload, not GraphQL errors
3. Include `success` boolean for easy checking
4. Use `clientMutationId` for optimistic updates
5. Batch mutations for bulk operations
