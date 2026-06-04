# REST Pagination Patterns

> Choose the right pagination strategy for your use case.

## Offset-Based Pagination

Best for: Simple UIs, page numbers, admin panels.

```bash
GET /api/users?page=2&page_size=20
```

```python
from pydantic import BaseModel, Field
from typing import List

class PaginatedResponse(BaseModel):
    items: List[dict]
    page: int
    page_size: int
    total: int
    pages: int

@app.get("/api/users")
async def list_users(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    total = await count_users()
    offset = (page - 1) * page_size
    users = await fetch_users(limit=page_size, offset=offset)

    return PaginatedResponse(
        items=users,
        page=page,
        page_size=page_size,
        total=total,
        pages=(total + page_size - 1) // page_size
    )
```

## Cursor-Based Pagination

Best for: Infinite scroll, real-time feeds, large datasets.

```bash
GET /api/users?limit=20&cursor=eyJpZCI6MTIzfQ
```

```python
import base64, json

def encode_cursor(data: dict) -> str:
    return base64.b64encode(json.dumps(data).encode()).decode()

def decode_cursor(cursor: str) -> dict:
    return json.loads(base64.b64decode(cursor).decode())

@app.get("/api/users")
async def list_users(
    limit: int = Query(20, ge=1, le=100),
    cursor: str = Query(None)
):
    if cursor:
        cursor_data = decode_cursor(cursor)
        users = await fetch_users_after(cursor_data["id"], limit + 1)
    else:
        users = await fetch_users(limit + 1)

    has_more = len(users) > limit
    items = users[:limit]
    next_cursor = encode_cursor({"id": items[-1]["id"]}) if has_more else None

    return {"items": items, "next_cursor": next_cursor, "has_more": has_more}
```

## Range-Based Pagination (Heroku Style)

Best for: Logs, time-series data, large collections.

```bash
# Request
GET /api/logs
Range: id ]01234567-89ab-cdef..; max=200

# Response
HTTP/1.1 206 Partial Content
Content-Range: id 01234567..89abcdef; max=200
Next-Range: id ]89abcdef..; max=200
```

## Comparison

| Pattern | Pros | Cons |
|---------|------|------|
| **Offset** | Simple, page numbers | Slow on large datasets, inconsistent with inserts |
| **Cursor** | Fast, consistent | No page numbers, forward-only by default |
| **Range** | HTTP-native, precise | Complex to implement |

## Default Limits

```python
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100
```

Always enforce maximum page size to prevent abuse.
