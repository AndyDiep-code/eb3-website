# GraphQL Pagination Patterns

> Cursor-based (Relay) and offset-based pagination.

## Relay Cursor Pagination (Recommended)

```graphql
type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type UserEdge { node: User!; cursor: String! }

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  users(first: Int, after: String, last: Int, before: String): UserConnection!
}
```

### Implementation

```python
import base64

def encode_cursor(id: str) -> str:
    return base64.b64encode(f"cursor:{id}".encode()).decode()

def decode_cursor(cursor: str) -> str:
    return base64.b64decode(cursor).decode().split(":")[1]

async def resolve_users(first=20, after=None):
    after_id = decode_cursor(after) if after else None
    query = {"id": {"$gt": after_id}} if after_id else {}
    users = await db.users.find(query).limit(first + 1)
    has_next = len(users) > first
    items = users[:first]

    return {
        "edges": [{"node": u, "cursor": encode_cursor(u["id"])} for u in items],
        "pageInfo": {"hasNextPage": has_next,
                    "endCursor": encode_cursor(items[-1]["id"]) if items else None},
        "totalCount": await db.users.count()
    }
```

## Offset Pagination (Simpler)

```graphql
type UserList {
  items: [User!]!
  total: Int!
  page: Int!
  pageSize: Int!
}

type Query {
  users(page: Int = 1, pageSize: Int = 20): UserList!
}
```

## Comparison

| Pattern | Best For | Trade-offs |
|---------|----------|------------|
| **Cursor** | Infinite scroll, real-time | No page numbers |
| **Offset** | Admin panels, page numbers | Slow on large datasets |

## Field Arguments

```graphql
type Query {
  posts(
    first: Int = 20
    after: String
    status: PostStatus
    orderBy: PostOrderBy = CREATED_AT
    orderDirection: OrderDirection = DESC
  ): PostConnection!
}
```
