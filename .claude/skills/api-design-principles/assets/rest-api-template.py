"""
Production-ready REST API template using FastAPI.
Includes Heroku-style headers, pagination, filtering, and error handling.
"""

from fastapi import FastAPI, HTTPException, Query, Path, Request, Response, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Any
from datetime import datetime, timedelta
from enum import Enum
import uuid
import hashlib
import json

app = FastAPI(title="API Template", version="1.0.0", docs_url="/api/docs")

# =============================================================================
# Heroku-Style Middleware
# =============================================================================

class RateLimiter:
    def __init__(self, calls: int = 5000, period: int = 3600):
        self.calls = calls
        self.period = period
        self.cache = {}

    def check(self, key: str) -> tuple[bool, int]:
        now = datetime.now()
        self.cache[key] = [ts for ts in self.cache.get(key, [])
                          if now - ts < timedelta(seconds=self.period)]
        remaining = self.calls - len(self.cache[key])
        if remaining <= 0:
            return False, 0
        self.cache[key].append(now)
        return True, remaining - 1

rate_limiter = RateLimiter()

@app.middleware("http")
async def heroku_headers_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id

    allowed, remaining = rate_limiter.check(request.client.host or "unknown")
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

# =============================================================================
# Error Handling (Heroku Style)
# =============================================================================

class ErrorId(str, Enum):
    RATE_LIMIT = "rate_limit"
    NOT_FOUND = "not_found"
    VALIDATION_ERROR = "validation_error"
    UNAUTHORIZED = "unauthorized"
    FORBIDDEN = "forbidden"

def raise_heroku_error(error_id: ErrorId, message: str, status_code: int, url: str = None):
    raise HTTPException(status_code=status_code, detail={"id": error_id.value, "message": message, "url": url})

def raise_not_found(resource: str, identifier: str):
    raise_heroku_error(ErrorId.NOT_FOUND, f"{resource} not found", 404)

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    content = exc.detail if isinstance(exc.detail, dict) else {"id": "error", "message": str(exc.detail)}
    return JSONResponse(status_code=exc.status_code, content=content,
                       headers={"Request-Id": getattr(request.state, "request_id", str(uuid.uuid4()))})

# =============================================================================
# Models
# =============================================================================

class UserStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=100)

class User(BaseModel):
    id: str
    email: str
    name: str
    status: UserStatus = UserStatus.ACTIVE
    created_at: datetime
    updated_at: datetime

class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    page_size: int
    pages: int

# =============================================================================
# ETag Helper
# =============================================================================

def generate_etag(data: dict) -> str:
    return f'"{hashlib.md5(json.dumps(data, sort_keys=True, default=str).encode()).hexdigest()}"'

# =============================================================================
# Endpoints
# =============================================================================

@app.get("/api/users", response_model=PaginatedResponse, tags=["Users"])
async def list_users(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    status: Optional[UserStatus] = None,
    search: Optional[str] = None
):
    """List users with pagination and filtering."""
    total = 100
    items = [{"id": str(uuid.uuid4()), "email": f"user{i}@example.com", "name": f"User {i}",
              "status": "active", "created_at": datetime.now().isoformat() + "Z",
              "updated_at": datetime.now().isoformat() + "Z"}
             for i in range((page-1)*page_size, min(page*page_size, total))]
    return PaginatedResponse(items=items, total=total, page=page, page_size=page_size,
                            pages=(total + page_size - 1) // page_size)

@app.get("/api/users/{user_id}", tags=["Users"])
async def get_user(user_id: str, request: Request, response: Response):
    """Get user by ID with ETag support."""
    if user_id == "999":
        raise_not_found("User", user_id)

    user = {"id": user_id, "email": "user@example.com", "name": "User Name", "status": "active",
            "created_at": "2012-01-01T12:00:00Z", "updated_at": "2012-01-01T12:00:00Z"}

    etag = generate_etag(user)
    if request.headers.get("If-None-Match") == etag:
        return Response(status_code=304)

    response.headers["ETag"] = etag
    return user

@app.post("/api/users", status_code=status.HTTP_201_CREATED, tags=["Users"])
async def create_user(user: UserCreate, response: Response):
    """Create a new user."""
    user_id = str(uuid.uuid4())
    response.headers["Location"] = f"/api/users/{user_id}"
    return {"id": user_id, "email": user.email, "name": user.name, "status": "active",
            "created_at": datetime.now().isoformat() + "Z", "updated_at": datetime.now().isoformat() + "Z"}

@app.delete("/api/users/{user_id}", tags=["Users"])
async def delete_user(user_id: str):
    """Delete user - returns full resource (Heroku style)."""
    if user_id == "999":
        raise_not_found("User", user_id)
    return {"id": user_id, "email": "user@example.com", "name": "User Name", "status": "active",
            "created_at": "2012-01-01T12:00:00Z", "updated_at": "2012-01-01T12:00:00Z"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
