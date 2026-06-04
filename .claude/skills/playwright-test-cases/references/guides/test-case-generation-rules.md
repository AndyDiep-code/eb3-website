# Test Case Generation Rules

Rules for generating positive, negative, edge, and validation test cases.

## Navigation Rule — User Behavior First

**CRITICAL:** Test case steps MUST describe real user navigation behavior. Never write "Navigate to URL" for non-entry-point pages.

### Entry Points (URL navigation is OK)

Pages users can reach by typing a URL directly:
- `LoginWithMicrosoft` → `/login`
- `HomePage` → `/`

### Navigation-Only Pages (must use click actions)

Pages reached through the app's navigation UI:

| Page | How to write the step |
|------|--------------------|
| `NotificationPage` | `[HomePage] Click "Notifications Tab 2 of 3"` |
| `SettingsPage` | `[HomePage] Click "Settings Tab 3 of 3"` |
| `AttendancePage` | `[HomePage] Click "Attendance" app card` |
| `ApprovalRequestsPage` | `[AttendancePage] Click "Approval requests" tab` |
| `RelevantRequestPage` | `[AttendancePage] Click "Relevant requests" tab` |
| `CreateNewRequestRemote` | `[AttendancePage] Click banner button to open form` |

### Step Format

```markdown
# ❌ WRONG — do not write URL navigation for non-entry pages
| 1 | Navigate to | https://staging.enoverse.app/notifications | Page loads |

# ✅ CORRECT — write user click action
| 1 | Click | notificationsTabButton [ref=e14] | Navigate to /notifications |
| 2 | Verify visible | notificationsHeading [ref=e18] | "Notifications" heading shown |
```

---

## Overview

Test case generation follows systematic rules to ensure comprehensive coverage of all scenarios: happy path, error handling, boundary conditions, and business rule validation.

## Positive Test Cases (Happy Path)

Generate positive test cases for normal user flows with valid inputs.

### Rules

1. **Valid Inputs**: Use valid, realistic data
2. **Expected Success**: Test should pass with expected results
3. **Normal Flow**: Follow typical user journey
4. **Success Criteria**: Clear expected outcomes

### Examples

**UI**: "User successfully logs in with valid credentials"
- Valid email format
- Valid password
- Expected: Login succeeds, redirect to dashboard

**API**: "Create user with valid data"
- Valid email, name, password
- Expected: 201 status, user created

### Coverage

Aim for 70% of test cases to be positive cases.

## Negative Test Cases

Generate negative test cases for error handling and invalid inputs.

### Rules

1. **Invalid Inputs**: Use invalid, malformed data
2. **Expected Failure**: Test should fail gracefully
3. **Error Handling**: Verify error messages
4. **User Feedback**: Ensure user understands error

### Examples

**UI**: "Login fails with invalid email format"
- Invalid email (e.g., "not-an-email")
- Expected: Error message displayed

**API**: "Create user fails with missing email"
- Missing required field
- Expected: 400 status, error message

### Coverage

Aim for 15% of test cases to be negative cases.

## Edge Cases

Generate edge cases for boundary conditions and extreme inputs.

### Rules

1. **Boundary Values**: Test limits and boundaries
2. **Special Characters**: Test special characters and unicode
3. **Extreme Inputs**: Test very long or very short inputs
4. **Concurrent Actions**: Test simultaneous operations

### Examples

**UI**: "Login with very long email address"
- Email with 500+ characters
- Expected: Field accepts or rejects gracefully

**API**: "Create user with maximum length name"
- Name with 1000 characters
- Expected: Accepted or rejected with clear error

### Coverage

Aim for 10% of test cases to be edge cases.

## Validation Test Cases

Generate validation test cases for business rules and data validation.

### Rules

1. **Required Fields**: Test missing required fields
2. **Data Types**: Test wrong data types
3. **Format Validation**: Test invalid formats
4. **Business Rules**: Test business logic

### Examples

**UI**: "Email field is required"
- Leave email empty
- Expected: Error message "Email is required"

**API**: "Password must be at least 8 characters"
- Password with 5 characters
- Expected: 400 status, error message

### Coverage

Aim for 5% of test cases to be validation cases.

## Security Test Cases

Generate security test cases for XSS, SQL injection, and authorization.

### Rules

1. **XSS Prevention**: Test XSS payload rejection
2. **SQL Injection**: Test SQL injection prevention
3. **Authorization**: Test access control
4. **Authentication**: Test auth requirements

### Examples

**UI**: "XSS payload in name field is rejected"
- Name: `<script>alert('xss')</script>`
- Expected: Payload sanitized or rejected

**API**: "SQL injection in search is prevented"
- Search: `' OR '1'='1`
- Expected: 400 status, error message

### Coverage

Include security cases for all user inputs.

## Performance Test Cases

Generate performance test cases for response time and throughput.

### Rules

1. **Baseline**: Use captured average response time
2. **Threshold**: Set reasonable threshold (e.g., avg + 20%)
3. **Consistency**: Test multiple times
4. **Load**: Test under normal load

### Examples

**API**: "GET /api/users responds in < 250ms"
- Captured average: 200ms
- Threshold: 250ms (200 + 25%)
- Expected: Response time < 250ms

### Coverage

Include performance cases for critical endpoints.

## Test Case ID Conventions

Two conventions exist. Use the one that matches the output type.

### Per-page test cases (output: `test-cases/{PageName}/test-cases.md`)

Use a **page abbreviation prefix** — readable and scoped to the page:

| Format | Example | When |
|--------|---------|------|
| `TC-{PAGE_ABBR}-{NUM}` | `TC-AP-001` | Per-page files |

Common page abbreviations:
- `AP` → AttendancePage
- `CNR` → CreateNewRequestRemote
- `ARP` → ApprovalRequestsPage
- `SP` → SettingsPage
- `NP` → NotificationPage
- `HP` → HomePage
- `LWM` → LoginWithMicrosoft

### Feature-level test cases (output: `test-cases/features/{name}/test-cases.md`)

Use a **type prefix** — reflects the test category:

| Prefix | Category | Example |
|--------|----------|---------|
| `TC-F` | Cross-page integration flow | `TC-F-001` |
| `TC-HP` | Happy path | `TC-HP-001` |
| `TC-NEG` | Negative / error | `TC-NEG-001` |
| `TC-EDGE` | Edge case / boundary | `TC-EDGE-001` |
| `TC-VAL` | Validation | `TC-VAL-001` |
| `TC-SEC` | Security | `TC-SEC-001` |
| `TC-PERF` | Performance | `TC-PERF-001` |

### TypeScript subsystem (`test-case-generator.ts`)

Uses type-prefix IDs internally (`TC-HP-001`, `TC-NEG-001`). These are programmatic — manually authored docs use the page-prefix convention above.

## Test Case Organization

### By Page (UI)
```
LoginPage/
├── TC-HP-001: Successful login
├── TC-HP-002: Remember me functionality
├── TC-NEG-001: Invalid email
├── TC-NEG-002: Invalid password
├── TC-EDGE-001: Very long email
├── TC-VAL-001: Email required
└── TC-SEC-001: XSS prevention
```

### By Endpoint (API)
```
POST /api/users/
├── TC-HP-001: Create user with valid data
├── TC-NEG-001: Missing email field
├── TC-NEG-002: Invalid email format
├── TC-EDGE-001: Very long name
├── TC-VAL-001: Password too short
├── TC-SEC-001: XSS in name field
└── TC-PERF-001: Response time < 500ms
```

## Coverage Goals

| Type | Percentage | Count |
|------|-----------|-------|
| Positive (HP) | 70% | 7 of 10 |
| Negative (NEG) | 15% | 2 of 10 |
| Edge (EDGE) | 10% | 1 of 10 |
| Validation (VAL) | 5% | 0-1 of 10 |
| Security (SEC) | As needed | 1+ |
| Performance (PERF) | As needed | 1+ |

## Related Documentation

[See: UI Test Case Template](../formats/ui-test-case-template.md)
[See: API Test Case Template](../formats/api-test-case-template.md)
