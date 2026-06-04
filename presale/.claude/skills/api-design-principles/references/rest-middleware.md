# REST Middleware Patterns

> Request-Id, Rate Limiting, ETag, and combined middleware.

## Request-Id Middleware

```python
import uuid
from fastapi import Request

@app.middleware("http")
async def request_id_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id

    response = await call_next(request)
    response.headers["Request-Id"] = request_id

    # Log for tracing
    logger.info(f"Request {request_id}: {request.method} {request.url}")
    return response
```

## ETag Middleware

```python
import hashlib, json
from fastapi import Request, Response

def generate_etag(data: dict) -> str:
    content = json.dumps(data, sort_keys=True)
    return f'"{hashlib.md5(content.encode()).hexdigest()}"'

@app.get("/api/users/{user_id}")
async def get_user(user_id: str, request: Request, response: Response):
    user = await fetch_user(user_id)
    if not user:
        raise_not_found("User", user_id)

    etag = generate_etag(user)
    if request.headers.get("If-None-Match") == etag:
        return Response(status_code=304)

    response.headers["ETag"] = etag
    return user
```

## Rate Limiting

```python
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse

class RateLimiter:
    def __init__(self, calls: int, period: int):
        self.calls = calls
        self.period = period
        self.cache = {}

    def check(self, key: str) -> tuple[bool, int]:
        now = datetime.now()
        if key not in self.cache:
            self.cache[key] = []

        self.cache[key] = [
            ts for ts in self.cache[key]
            if now - ts < timedelta(seconds=self.period)
        ]

        remaining = self.calls - len(self.cache[key])
        if remaining <= 0:
            return False, 0

        self.cache[key].append(now)
        return True, remaining - 1

limiter = RateLimiter(calls=5000, period=3600)

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    allowed, remaining = limiter.check(request.client.host)

    if not allowed:
        return JSONResponse(
            status_code=429,
            content={"id": "rate_limit", "message": "Account reached its API rate limit."},
            headers={"Retry-After": "3600", "RateLimit-Remaining": "0"}
        )

    response = await call_next(request)
    response.headers["RateLimit-Remaining"] = str(remaining)
    return response
```

## Combined Heroku Headers Middleware

```python
@app.middleware("http")
async def heroku_headers_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id

    allowed, remaining = rate_limiter.check(request.client.host)
    if not allowed:
        return JSONResponse(
            status_code=429,
            content={"id": "rate_limit", "message": "Account reached its API rate limit."},
            headers={"Request-Id": request_id, "RateLimit-Remaining": "0", "Retry-After": "3600"}
        )

    response = await call_next(request)
    response.headers["Request-Id"] = request_id
    response.headers["RateLimit-Remaining"] = str(remaining)
    return response
```
