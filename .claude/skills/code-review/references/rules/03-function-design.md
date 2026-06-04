# Function Design

> Well-designed functions are small, focused, and self-documenting.

---

## Size & Complexity

- Functions should do ONE thing well (Single Responsibility)
- Keep functions under 20-30 lines when possible
- Maximum 3 parameters; use objects for more
- Avoid deep nesting (max 2-3 levels)
- Extract nested logic into well-named helper functions
- **Key tip:** If you need more than 3 levels of indentation, your function needs to be split up
- Each function should fit on your screen without scrolling

### Parameters

```typescript
// BAD - Too many parameters
function createUser(name, email, age, role, department, manager, startDate) {}

// GOOD - Use an options object
interface CreateUserOptions {
  name: string;
  email: string;
  age: number;
  role?: string;
  department?: string;
  manager?: string;
  startDate?: Date;
}
function createUser(options: CreateUserOptions) {}
```

### Return Early (Guard Clauses)

```typescript
// BAD - Deep nesting
function processOrder(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.paymentValid) {
        // process...
      }
    }
  }
}

// GOOD - Guard clauses
function processOrder(order) {
  if (!order) return;
  if (order.items.length === 0) return;
  if (!order.paymentValid) return;
  // process...
}
```

---

## Utility Functions & Reusability

### When to Create Utils

- Logic is used in 2+ places
- Function is generic and not business-specific
- Operation can be tested in isolation
- Improves readability of calling code

### Organization

```
utils/
  string-utils.ts      # formatFullName, truncate, slugify
  date-utils.ts        # formatDate, parseISO, getRelativeTime
  validation-utils.ts  # isEmail, isPhoneNumber, isURL
  array-utils.ts       # chunk, unique, groupBy
  number-utils.ts      # formatCurrency, roundToDecimal
  file-utils.ts        # getExtension, sanitizeFilename
```

### Examples

```typescript
// BAD - Duplicated logic
// file1.ts
const fullName = `${user.firstName} ${user.lastName}`.trim();
// file2.ts
const displayName = `${person.firstName} ${person.lastName}`.trim();

// GOOD - Utility function
// utils/string-utils.ts
export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}
```

---

## Strong Types - Be Explicit

### Why Strong Types Matter

- Prevents runtime type errors at compile time
- Clarifies function contracts and data structures
- Enables better IDE support (autocomplete, refactoring)
- Makes code self-documenting

### Best Practices

- Use TypeScript or type hints in Python to catch type-related bugs early
- Define interfaces for data structures
- Avoid `any` type - be specific about what you expect
- Use union types for values with multiple valid types

```typescript
// BAD - Generic and error-prone
function processUser(data: any) {
  return data.name; // No type safety
}

// GOOD - Explicit and safe
interface User {
  id: number;
  name: string;
  email: string;
}

function processUser(user: User): string {
  return user.name; // Type-safe access
}
```

---

## Clear Return Values

### Principles

- Functions should have clear, consistent return values
- Be explicit about return types
- Avoid multiple return types when possible
- Avoid returning `null` when possible - use optional types or result objects

### Best Practices

```typescript
// BAD - Unclear return type
function findUser(id: number) {
  // Could return User, null, undefined, or throw
  return users.find(u => u.id === id);
}

// GOOD - Explicit return structure
interface Result<T> {
  data: T | null;
  error: string | null;
}

function findUser(id: number): Result<User> {
  const user = users.find(u => u.id === id);
  if (!user) {
    return { data: null, error: 'User not found' };
  }
  return { data: user, error: null };
}
```
