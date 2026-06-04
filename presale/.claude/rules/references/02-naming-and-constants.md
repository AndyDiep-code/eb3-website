# Naming Conventions & Constants

> Clear, consistent naming makes code self-documenting and maintainable.

---

## General Naming Rules

- Use meaningful, descriptive names that convey purpose
- Avoid abbreviations and single-letter variables (except loop counters in small scopes)
- Names should be pronounceable for easier code reviews
- Be consistent throughout the codebase
- **Key tip:** Use searchable names! Try finding all usages of `k` vs `user_age` in a large codebase
- **Self-test:** Read your code aloud - if it sounds natural, you're on the right track

### Variable Naming

```
BAD:  x, tmp, data, val, usr, btn, idx, arr, cb, e, d, t, n
GOOD: totalScore, temporaryFile, userData, calculatedValue, currentUser,
      submitButton, targetIndex, activeUsers, onCompleteCallback,
      authenticationError, currentDate, startTimestamp, itemCount
```

### Function/Method Naming

- Use verbs for actions: `calculateTotal()`, `fetchUserData()`, `validateInput()`
- Use `is/has/can/should` prefixes for booleans: `isActive()`, `hasPermission()`, `canEdit()`
- Avoid functions with "and" in the name - split into multiple functions
- Be consistent: don't mix `fetch`, `get`, and `retrieve` for similar operations

### Class Naming

- Use nouns and noun phrases: `Customer`, `OrderProcessor`, `PaymentGateway`
- Use PascalCase/UpperCamelCase for class names
- Avoid generic names like `Manager`, `Handler`, `Data` without context

### Language-Specific Conventions

| Element | Python/Ruby | JavaScript/TypeScript | Java/C# | Go |
|---------|-------------|----------------------|---------|-----|
| Variables | snake_case | camelCase | camelCase | camelCase |
| Functions | snake_case | camelCase | camelCase | PascalCase (exported) |
| Classes | PascalCase | PascalCase | PascalCase | PascalCase |
| Constants | UPPER_SNAKE | UPPER_SNAKE | UPPER_SNAKE | PascalCase |
| Files | snake_case | kebab-case or camelCase | PascalCase | snake_case |

---

## Constants & Magic Values

### Rules

- Extract ALL hardcoded values into named constants
- Use SCREAMING_SNAKE_CASE: `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT_MS`
- Create dedicated constants files: `constants.ts`, `constants.py`, `Constants.java`
- Group related constants in objects/enums
- Document the purpose of non-obvious constants
- Never use magic numbers or strings in code

### Examples

```typescript
// BAD - Magic numbers and strings
if (user.age >= 18) { /* ... */ }
if (status === 'active') { /* ... */ }
setTimeout(callback, 3600000);
if (items.length > 100) { /* ... */ }

// GOOD - Named constants
export const MINIMUM_ADULT_AGE = 18;
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;
export const ONE_HOUR_MS = 60 * 60 * 1000;
export const MAX_ITEMS_PER_PAGE = 100;

if (user.age >= MINIMUM_ADULT_AGE) { /* ... */ }
if (status === USER_STATUS.ACTIVE) { /* ... */ }
setTimeout(callback, ONE_HOUR_MS);
if (items.length > MAX_ITEMS_PER_PAGE) { /* ... */ }
```

---

## Consistent Patterns - Be Predictable

### Why Consistency Matters

- Makes code easier to understand and maintain
- Reduces cognitive load when switching between files
- Enables effective code reviews
- **Key tip:** Create a style guide for your project and enforce it with linting tools

### Areas to Standardize

- Naming conventions (don't mix `get`, `fetch`, and `retrieve`)
- File organization and structure
- Error handling approach
- API response formats
- State management patterns

```typescript
// BAD - Inconsistent naming
function getUsers() { /* ... */ }
function fetchProducts() { /* ... */ }
function retrieveOrders() { /* ... */ }

// GOOD - Consistent naming
function getUsers() { /* ... */ }
function getProducts() { /* ... */ }
function getOrders() { /* ... */ }
```
