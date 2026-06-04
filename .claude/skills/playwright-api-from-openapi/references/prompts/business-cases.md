# AI Prompt: Business Logic & Flow Test Cases

Use when generating multi-step, stateful, RBAC, and business rule test cases.

---

## Prompt Template

```
You are a senior QA engineer generating business logic test cases for a REST API.

## API Context
Base URL: {BASE_URL}
Auth: {AUTH_DESCRIPTION}

## Operations available:
{OPERATIONS_SUMMARY}

## Business rules discovered from source code:
{BUSINESS_RULES}

## Task
Generate test cases covering:
1. Multi-step user flows (login → action → verify state)
2. Role-based access control (which role can do what)
3. Business validation rules (not just schema — real business logic)
4. Cross-entity constraints (FK rules, cascade behavior)
5. State transition flows (status changes)

## Rules
- Each flow test MUST show the full sequence of HTTP calls
- Use real example values (not placeholders like "string")
- Note pre-conditions explicitly (e.g., "requires existing booking")
- Cross-user tests: explicitly note which token (admin vs user) is used
- Only generate flows that make business sense — don't invent fiction
```

---

## Flow Test Format

```markdown
### TC-FLOW-{NUM}: {Flow Name}

**Pre-condition:** {what must exist before this test}
**Actor:** {Admin | User | Anonymous}

**Steps:**
1. POST /auth/login → `{"email": "...", "password": "..."}` → get `access_token`
2. POST /resources → (admin token) `{"name": "Room A", "type": "room"}` → get `id`
3. POST /bookings → (user token) `{"resourceId": {id}, "startTime": "...", "endTime": "..."}` → get booking `id`, status = "pending"
4. PUT /bookings/{id} → (admin token) `{"status": "confirmed"}` → status = "confirmed"
5. GET /bookings/{id} → (user token) → verify status = "confirmed"

**Expected outcome:** Booking confirmed by admin, visible to booking owner
```

---

## Standard RBAC Test Format

```markdown
### TC-RBAC-{NUM}: {Endpoint} — {Role} access

| Scenario | Token | Expected |
|----------|-------|----------|
| No token | none | 401 |
| User token on admin-only | user | 403 |
| Admin token | admin | 200/201/204 |
| User token on own resource | user | 200 |
| User token on other's resource | user | 403 |
```

---

## Common Business Flow Patterns

### Auth Flow
```
1. POST /auth/register (new user)
2. POST /auth/login → token
3. Use token for subsequent requests
4. Verify token expiry handled gracefully
```

### CRUD + Ownership Pattern
```
1. Admin creates resource
2. User creates booking for that resource
3. User can read own booking, cannot read others'
4. Admin can read all bookings
5. User can update own booking
6. Admin can update any booking
7. User cannot delete another's booking (403)
```

### State Transition Pattern (Booking)
```
pending → confirmed → cancelled
         ↓
         cancelled

Test: confirm flow, cancel flow, invalid transition
```

### FK Constraint Pattern
```
1. Create resource
2. Create booking for resource
3. Try to DELETE resource → expect conflict/error (not 500!)
4. Delete booking first, then delete resource → success
```

---

## What NOT to generate
- Tests that require database inspection (check DB directly)
- Tests that depend on specific timing/race conditions
- Tests that require external services (email, SMS, payment)
- Tests with fake/impossible business scenarios
