# Auth Configuration for Schemathesis

Schemathesis tests schema compliance but cannot auto-login. Use one of these strategies.

---

## Strategy A: --auth flag (token already known)

```bash
/qakit:playwright:api-schemathesis \
  --url=http://localhost:3000 \
  --task=my-project \
  --auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Passes: `--header "Authorization: Bearer <token>"` to Schemathesis.

Use when: token is already in hand (from a previous login, env var, etc.)

---

## Strategy B: --login-url + --login-body (auto-login)

```bash
/qakit:playwright:api-schemathesis \
  --url=http://localhost:3000 \
  --task=my-project \
  --login-url=/auth/login \
  --login-body='{"email":"admin@example.com","password":"Admin123!"}'
```

Skill executes at STEP 3:
```bash
RESPONSE=$(curl -s -X POST "http://localhost:3000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin123!"}')

AUTH_TOKEN=$(echo "$RESPONSE" | python3 -c \
  "import sys,json; print(json.load(sys.stdin)['access_token'])")
```

Assumes response shape: `{ "access_token": "..." }`.
If your API uses a different key (e.g., `token`, `jwt`), adjust the python3 extraction.

---

## Strategy C: No auth (public endpoints only)

```bash
/qakit:playwright:api-schemathesis \
  --url=http://localhost:3000 \
  --task=my-project
```

Schemathesis tests all endpoints. Protected endpoints return 401 → Schemathesis marks
as "server_error" only if server returns 5xx, not 401. 401s are expected and pass.

**Limitation:** Request body validation on auth-protected endpoints NOT tested deeply
(since every request gets 401 before reaching business logic).

---

## Multiple Roles (Admin + User)

Schemathesis runs as one identity per session. To test both admin and user:

Run skill twice with different tokens:
```bash
# Admin pass
/qakit:playwright:api-schemathesis --url=http://localhost:3000 --task=my-project-admin \
  --login-url=/auth/login --login-body='{"email":"admin@example.com","password":"Admin123!"}'

# User pass
/qakit:playwright:api-schemathesis --url=http://localhost:3000 --task=my-project-user \
  --login-url=/auth/login --login-body='{"email":"user@example.com","password":"User123!"}'
```

Reports saved separately by task ID.

---

## Security Note

- Auth token is NEVER written to any output file — use `[REDACTED]` in reports
- --login-body is not logged in full — only email shown in logs
- Token exists only in memory during skill execution
