# Core Principles

> Foundational software engineering principles that guide all development decisions.

---

## YAGNI - You Aren't Gonna Need It

- Only implement features when they are actually needed, not when you foresee they might be useful
- Avoid overengineering and premature optimization
- Focus on current iteration requirements in Agile workflows
- Delete unused code rather than commenting it out "for later"

---

## KISS - Keep It Simple, Stupid

- Prefer the simplest solution that solves the problem
- Complex solutions are harder to debug, test, and extend
- If code requires extensive comments to explain, consider refactoring
- Break complex logic into smaller, focused functions
- **Key tip:** If you can't explain your code to a junior developer, it's probably too complex
- Break complex conditionals into named variables for clarity:

```typescript
// BAD - Hard to understand
if (x && y || z && !a) { /* ... */ }

// GOOD - Self-documenting
const isValid = x && y;
const isSpecialCase = z && !a;
if (isValid || isSpecialCase) { /* ... */ }
```

---

## DRY - Don't Repeat Yourself

- Every piece of knowledge should have a single, authoritative representation
- Extract repeated logic into reusable functions, classes, or modules
- Create centralized services for common operations (authentication, validation, formatting)
- Balance DRY with readability - KISS takes precedence over DRY when they conflict
- **Key tip:** Create a `utils` or `helpers` module for commonly reused functionality
- Copy-paste is a code smell - if you're copying, you should be extracting

---

## SOLID Principles (Object-Oriented Design)

### Single Responsibility Principle (SRP)

- A class/module should have only one reason to change
- Keep each component focused on one job
- Split large classes with multiple responsibilities
- **Key tip:** If your function name needs a conjunction (and/or), it's violating this principle
- Classes with names like `Manager`, `Processor`, or `Helper` often do too much
- **Class size guideline:** If your class has more than 200 lines, it's probably doing too much

### Open/Closed Principle (OCP)

- Software should be open for extension but closed for modification
- Add new behavior without changing existing code
- Use interfaces, abstract classes, and composition

### Liskov Substitution Principle (LSP)

- Subclasses should be substitutable for their parent classes
- Derived classes must honor the contracts of their base classes
- Avoid inheritance that breaks expected behavior

### Interface Segregation Principle (ISP)

- Clients should not depend on interfaces they don't use
- Split large interfaces into smaller, specific ones
- Prefer many small interfaces over one large interface

### Dependency Inversion Principle (DIP)

- Depend on abstractions, not concrete implementations
- High-level modules should not depend on low-level modules
- Use dependency injection to promote loose coupling
