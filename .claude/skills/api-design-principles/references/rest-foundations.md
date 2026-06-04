# REST Foundations (Heroku Style)

> Non-negotiable requirements for production APIs.

## 1. Require TLS (HTTPS Only)

```bash
# REQUIRED: HTTPS everywhere
https://api.example.com/users

# REJECT: HTTP with 403 Forbidden
# NEVER redirect HTTP → HTTPS (exposes data on first call)
```

## 2. Require Version in Accept Header

```bash
# REQUIRED: Explicit version
Accept: application/vnd.heroku+json; version=3

# NEVER: Default versions (very hard to change later)
```

```python
from fastapi import Header, HTTPException
import re

def parse_version(accept: str = Header(...)) -> int:
    match = re.search(r'version=(\d+)', accept)
    if not match:
        raise HTTPException(400, {"id": "missing_version", "message": "API version required"})
    return int(match.group(1))
```

## 3. Provide Request-Id in Every Response

```bash
HTTP/1.1 200 OK
Request-Id: 01234567-89ab-cdef-0123-456789abcdef
```

```python
import uuid
from fastapi import Request

@app.middleware("http")
async def request_id_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["Request-Id"] = request_id
    return response
```

## 4. Support ETags for Caching

```bash
# Response
HTTP/1.1 200 OK
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# Client conditional request
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
→ 304 Not Modified (if unchanged)
```

```python
import hashlib, json

def generate_etag(data: dict) -> str:
    content = json.dumps(data, sort_keys=True)
    return f'"{hashlib.md5(content.encode()).hexdigest()}"'
```

## 5. Rate Limit Headers

```bash
HTTP/1.1 200 OK
RateLimit-Remaining: 4999

# When limited
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
```

## 6. Range Headers for Large Responses

```bash
# Request
Range: id ]01234567-89ab-cdef..; max=200

# Response
HTTP/1.1 206 Partial Content
Content-Range: id 01234567..89abcdef; max=200
Next-Range: id ]89abcdef..; max=200
```

## Required Headers Summary

| Header | Direction | Purpose |
|--------|-----------|---------|
| `Accept` | Request | Version specification |
| `Content-Type` | Request | `application/json` |
| `Request-Id` | Response | UUID for tracing |
| `ETag` | Response | Cache validation |
| `RateLimit-Remaining` | Response | Rate limit status |
| `Location` | Response | Created resource URL (201) |
