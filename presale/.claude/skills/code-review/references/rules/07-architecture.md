# Code Organization & Architecture

> Well-organized code is easier to navigate, understand, and maintain.

---

## File Structure Principles

- Group by feature, not by type (prefer feature-based over layer-based)
- Keep folder structure flat (avoid deep nesting)
- Separate concerns: UI, business logic, data access
- Use consistent naming across the project

### Recommended Structure

```
src/
  features/
    auth/
      components/
      hooks/
      services/
      types/
      index.ts
    users/
    orders/
  shared/
    components/
    hooks/
    utils/
    constants/
    types/
  core/
    api/
    config/
    errors/
tests/
docs/
```

### File Size Guidelines

- Keep files under 200-300 lines
- Split large files into focused modules
- One component/class per file
- Extract constants, types, and utilities

---

## Dependency Management - Less is More

### Principles

- Each dependency is a potential point of failure and maintenance burden
- Choose dependencies wisely and keep them minimal
- Regularly audit dependencies and remove unused ones
- Prefer well-maintained, widely-used packages

### Best Practices

```typescript
// BAD - Importing entire library
import * as lodash from 'lodash';
lodash.map(items, fn);

// GOOD - Import only what you need
import { map, filter } from 'lodash';
map(items, fn);

// BETTER - Use native methods when sufficient
items.map(fn);
```

### Dependency Checklist

- [ ] Is this dependency actively maintained?
- [ ] Does it have known security vulnerabilities?
- [ ] Can I achieve this with native language features?
- [ ] Is the bundle size impact acceptable?
- [ ] What happens if this dependency is abandoned?

---

## Module Boundaries

### Clean Architecture Layers

```
┌─────────────────────────────────────┐
│         Presentation Layer          │  UI, Controllers, API Routes
├─────────────────────────────────────┤
│         Application Layer           │  Use Cases, Services
├─────────────────────────────────────┤
│           Domain Layer              │  Entities, Business Rules
├─────────────────────────────────────┤
│        Infrastructure Layer         │  DB, External APIs, File System
└─────────────────────────────────────┘
```

### Rules

- Dependencies point inward (outer layers depend on inner)
- Domain layer has no external dependencies
- Use interfaces at boundaries for loose coupling
- Keep business logic out of controllers/routes
