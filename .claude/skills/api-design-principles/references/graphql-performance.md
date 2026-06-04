# GraphQL Performance

> DataLoader, N+1 prevention, query complexity.

## The N+1 Problem

```graphql
# This query causes N+1 database calls without DataLoader
{
  users(first: 100) {
    edges {
      node {
        id
        posts { id title }  # 100 separate queries!
      }
    }
  }
}
```

## DataLoader Pattern

```python
from aiodataloader import DataLoader
from typing import List, Optional

class UserLoader(DataLoader):
    async def batch_load_fn(self, user_ids: List[str]) -> List[Optional[dict]]:
        users = await db.users.find({"id": {"$in": user_ids}})
        user_map = {user["id"]: user for user in users}
        return [user_map.get(uid) for uid in user_ids]

class PostsByUserLoader(DataLoader):
    async def batch_load_fn(self, user_ids: List[str]) -> List[List[dict]]:
        posts = await db.posts.find({"user_id": {"$in": user_ids}})
        posts_by_user = {}
        for post in posts:
            posts_by_user.setdefault(post["user_id"], []).append(post)
        return [posts_by_user.get(uid, []) for uid in user_ids]

# Context setup
def create_context():
    return {
        "loaders": {
            "user": UserLoader(),
            "posts_by_user": PostsByUserLoader()
        }
    }

# Resolver
@user_type.field("posts")
async def resolve_posts(user, info):
    return await info.context["loaders"]["posts_by_user"].load(user["id"])
```

## Query Depth Limiting

```python
from graphql import GraphQLError

MAX_DEPTH = 10

def depth_limit_validator(max_depth: int):
    def validate(context, node, ancestors):
        depth = len(ancestors)
        if depth > max_depth:
            raise GraphQLError(f"Query depth {depth} exceeds maximum {max_depth}")
    return validate
```

## Query Complexity Analysis

```python
def calculate_complexity(node, variables):
    complexity = 1
    if is_list_field(node):
        first = get_argument(node, "first", 20)
        complexity *= first
    for child in node.selection_set.selections:
        complexity += calculate_complexity(child, variables)
    return complexity

MAX_COMPLEXITY = 1000

def complexity_validator(query, variables):
    complexity = calculate_complexity(query, variables)
    if complexity > MAX_COMPLEXITY:
        raise GraphQLError(f"Query complexity {complexity} exceeds {MAX_COMPLEXITY}")
```

## Persisted Queries

```python
QUERY_CACHE = {
    "abc123": "query GetUser($id: ID!) { user(id: $id) { id name } }"
}

@app.post("/graphql")
async def graphql(request: dict):
    if "queryId" in request:
        query = QUERY_CACHE.get(request["queryId"])
        if not query:
            raise HTTPException(400, "Unknown query ID")
    else:
        query = request["query"]
    # Execute query...
```

## Best Practices

1. **Always use DataLoaders** for relationships
2. **Limit query depth** (10-15 levels max)
3. **Limit complexity** (prevent expensive queries)
4. **Use persisted queries** in production
5. **Enable query batching** for multiple queries
6. **Cache responses** where appropriate
