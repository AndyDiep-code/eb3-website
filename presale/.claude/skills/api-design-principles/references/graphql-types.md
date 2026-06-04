# GraphQL Type Design

> Types, interfaces, unions, and custom scalars.

## Type Definitions

```graphql
type User {
  id: ID!              # Always required
  email: String!       # Required
  phone: String        # Optional (nullable)
  posts: [Post!]!      # Non-null array of non-null posts
  tags: [String!]      # Nullable array of non-null strings
}
```

## Interfaces for Polymorphism

```graphql
interface Node {
  id: ID!
  createdAt: DateTime!
}

type User implements Node { id: ID!; createdAt: DateTime!; email: String! }
type Post implements Node { id: ID!; createdAt: DateTime!; title: String! }

type Query { node(id: ID!): Node }
```

## Unions for Heterogeneous Results

```graphql
union SearchResult = User | Post | Comment

type Query { search(query: String!): [SearchResult!]! }

# Usage
{ search(query: "graphql") {
    ... on User { name email }
    ... on Post { title }
  }
}
```

## Input Types

```graphql
input CreateUserInput {
  email: String!
  name: String!
  password: String!
}

input UpdateUserInput {
  id: ID!
  email: String
  name: String
}
```

## Custom Scalars

```graphql
scalar DateTime
scalar Email
scalar URL
scalar JSON
scalar Money

type User { email: Email!; website: URL; createdAt: DateTime!; metadata: JSON }
```

## Enums

```graphql
enum OrderStatus { PENDING; CONFIRMED; SHIPPED; DELIVERED; CANCELLED }
enum OrderDirection { ASC; DESC }
```

## Directives

```graphql
# Deprecation
type User {
  name: String! @deprecated(reason: "Use firstName/lastName")
  firstName: String!
}

# Custom auth directive
directive @auth(requires: Role = USER) on FIELD_DEFINITION
type Mutation { deleteUser(id: ID!): Boolean! @auth(requires: ADMIN) }
```

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Types | PascalCase | `User`, `OrderStatus` |
| Fields | camelCase | `firstName`, `createdAt` |
| Enums | SCREAMING_SNAKE | `PENDING`, `SHIPPED` |
| Inputs | PascalCase + Input | `CreateUserInput` |
