# Test Case Template (Enouvo Standard)

## Combined Format — Table Columns

```
| TC ID | Title | Type | Priority | Tags | Preconditions | Steps | Expected Result | FR Ref |
```

| Column | Description |
|--------|-------------|
| **TC ID** | `{MODULE}-{FEATURE}-{NNN}` — encodes WHERE (module + feature) for traceability |
| **Title** | Action-oriented: "Verify X when Y" or "Ensure X behaves as Z" |
| **Type** | `HP` Happy Path · `NEG` Negative · `EDGE` Edge Case · `VAL` Validation |
| **Priority** | `Critical` · `High` · `Normal` · `Low` (Testmo-compatible — use `Normal` not `Medium`) |
| **Tags** | See Tags section below |
| **Preconditions** | State required before execution — NOT steps |
| **Steps** | Numbered, action-verb-led instructions |
| **Expected Result** | Exact system behaviour — element + location + value |
| **FR Ref** | FR-x.x or BR-x |

---

## TC ID Format

```
MODULE-FEATURE-NNN
│       │       └─ 3-digit sequence per module+feature combo
│       └────────── Feature abbreviation (e.g. LOGIN, PROFILE, CART)
└────────────────── Module abbreviation (e.g. AUTH, CHECKOUT, SETTINGS)
```

Examples: `AUTH-LOGIN-001` · `CHECKOUT-PAY-002` · `SETTINGS-NOTIF-003`

---

## Type Values

| Type | When to use |
|------|-------------|
| `HP` | Happy Path — valid input, normal flow, expected success |
| `NEG` | Negative — invalid input, rejected action, error response |
| `EDGE` | Edge Case — boundary values, empty states, special characters |
| `VAL` | Validation — required field checks, format rules, BR enforcement |

---

## Tags

| Tag | Purpose | When to apply |
|-----|---------|---------------|
| `smoke` | Quick sanity — run before every deploy | Core happy paths, critical navigation |
| `sanity` | Post-deploy basic check | Key user flows after hotfix |
| `regression` | Full suite — run every sprint | All functional cases |
| `e2e` | Cross-module journeys | Feature Journey section only |
| `critical` | BR violation · business-breaking | All Business Rule enforcement cases |
| `functional` | Core feature behaviour | Happy path feature verification |
| `negative` | Error / rejection flows | Type=NEG cases |
| `edge-case` | Boundary / unusual inputs | Type=EDGE cases |
| `validation` | Input rules, required fields | Type=VAL cases |
| `security` | Token, auth, access control | Token expiry, one-use, RBAC |
| `rbac` | Role-based access | Role restriction tests |
| `audit` | Logging, trail, compliance | Activity log, append-only checks |
| `performance` | Load time, response thresholds | SLA/performance requirement cases |
| `accessibility` | a11y, screen reader, keyboard nav | Accessibility requirement cases |
| `mobile` | Mobile viewport, touch | Mobile responsiveness cases |
| `visual` | Visual state tests (Storybook) | Storybook-generated component tests |

> Multiple tags: comma-separated — e.g. `smoke,regression` or `critical,security`

---

## Coverage Pattern per Feature

For each feature generate:
1. **HP** — valid inputs, expected success (tag: `smoke,regression`)
2. **NEG** — invalid inputs, access denied, error states (tag: `regression`)
3. **EDGE** — empty states, boundary values, special characters (tag: `regression`)
4. **VAL** — BR enforcement, required fields, format rules (tag: `critical,regression`)

---

## Good vs Bad Practices

### TC Title

| ❌ Bad | ✅ Good | Why |
|--------|---------|-----|
| "Login test" | "Verify user can log in with valid email and password" | Specific — states what is verified |
| "Check button" | "Verify the Save button is disabled when required fields are empty" | Names the element and condition |
| "Error message" | "Verify error message appears when email format is invalid" | States trigger and expected outcome |
| "Dashboard works" | "Verify dashboard loads with correct user name and summary stats" | One purpose, specific expectation |

**Rule:** Title = "Verify [what]" + "[when/with what condition]"

---

### Preconditions

Preconditions = state of the system **before** the test starts. NOT steps.

| ❌ Bad — steps hidden in preconditions | ✅ Good — system state only |
|--------------------------------------|----------------------------|
| "User logs in and navigates to settings" | "User is logged in as Admin role" |
| "Create a draft survey and open it" | "Draft survey exists in the system" |
| "Add 3 items to cart" | "Cart contains 3 items" |
| "Click the upload button" | "Upload feature is accessible for current user role" |

**Rule:** Preconditions describe **what exists** — they never contain Click/Type/Navigate actions.

---

### Steps

Every step must be independently executable by a tester who has never seen the feature.

| ❌ Bad | ✅ Good | Why |
|--------|---------|-----|
| "Open the form" | "Navigate to /settings/profile and click 'Edit Profile'" | Where + how |
| "Enter the data" | "Type 'Jane Doe' in the Full Name field" | What data + where |
| "Click save" | "Click the 'Save Changes' button at the bottom of the form" | Which button + where |
| "Check the result" | "Verify the success banner reads 'Profile updated successfully'" | What to check + exact value |
| "Observe" | "Verify the error message 'Email is required' appears below the Email field" | Never use 'Observe' alone |

**Rule:** Each step = 1 action verb + 1 specific target + 1 specific value (when applicable)

**Step structure:**
```
1. [Navigate to / Open] [specific URL or screen]
2. [Perform action] [on specific element] [with specific value if applicable]
3. [Verify / Check] [specific element] [shows / reads / contains] [exact expected value]
```

---

### Expected Result

| ❌ Bad | ✅ Good | Why |
|--------|---------|-----|
| "It works" | "User is redirected to /dashboard and username 'Jane' appears in the top-right header" | Location + value |
| "Error shows" | "Error message 'Invalid email format' appears below the Email input field in red text" | Element + location + text |
| "Data is saved" | "Profile page reloads with updated name 'Jane Doe'; last-modified timestamp updated" | What changed + where |
| "Button disabled" | "The Submit button is greyed out and non-clickable" | Visual state + interaction state |

**Rule:** Expected Result = [element] + [location] + [exact value/state]

---

### One Test, One Purpose

| ❌ Bad — multiple validations in one TC |
|-----------------------------------------|
| "Verify login page loads, user can log in, and dashboard shows username" |

| ✅ Good — split into 3 separate TCs |
|-------------------------------------|
| TC-001: "Verify login page renders with email, password fields and Login button" |
| TC-002: "Verify user is redirected to dashboard after successful login" |
| TC-003: "Verify dashboard shows logged-in user's first name in header" |

**Why:** Single-purpose TCs give precise defect locations. When TC-002 fails, you know exactly what broke.

---

## Feature Journey Format (E2E)

For cross-module business journeys, add a dedicated section at the end:

```markdown
## E2E Feature Journeys

| TC ID | Journey | Modules | Type | Priority | Tags | Key Steps | Expected Outcome |
|-------|---------|---------|------|----------|------|-----------|-----------------|
| E2E-001 | User registration to first action | Auth → Onboarding → Dashboard | HP | High | smoke,e2e,critical | Register → verify email → complete profile → land on dashboard | User completes onboarding; dashboard loads with personalised greeting |
```

E2E TC ID format: `E2E-{NNN}` — no module prefix since they span multiple modules.

---

## File Structure

```
# Test Cases — {Project}
**Total Cases:** N (HP: x · NEG: y · EDGE: z · VAL: w · E2E: v)

---
## Module 1: {Name}
| TC ID | Title | Type | Priority | Tags | Preconditions | Steps | Expected Result | FR Ref |
...

## Module N: {Name}
...

---
## E2E Feature Journeys
| TC ID | Journey | Modules | Type | Priority | Tags | Key Steps | Expected Outcome |
...

---
## Coverage Summary
### Business Rules
| Business Rule | Test Case(s) |
### By Tag
| Tag | Count | Cases |
### By Priority
| Priority | Count |
```
