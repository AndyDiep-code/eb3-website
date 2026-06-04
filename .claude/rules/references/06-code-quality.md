# Code Quality

> Quality code is readable, maintainable, and consistently formatted.

---

## Code Documentation

### Self-Documenting Code First

- Use clear, descriptive names
- Break complex logic into well-named functions
- Keep functions small and focused
- If code needs comments to explain, consider refactoring

### When to Comment

- Explain **why**, not what (the code shows what)
- Document complex algorithms and business logic
- Explain workarounds with issue references
- Document public APIs and interfaces
- Note performance considerations

```typescript
// BAD - Obvious comment
// Increment counter by 1
counter++;

// BAD - Outdated comment
// Check if user is admin (WRONG - now checks manager too)
if (user.role === 'admin' || user.role === 'manager') {}

// GOOD - Explains why
// Using binary search because dataset exceeds 10k items
// and linear search caused 2s+ response times (see #1234)
const result = binarySearch(sortedItems, target);

// GOOD - Documents public API
/**
 * Calculates shipping cost based on weight and destination.
 * @param weightKg - Package weight in kilograms
 * @param destinationCode - ISO country code
 * @returns Shipping cost in USD
 * @throws InvalidDestinationError if country not supported
 */
function calculateShipping(weightKg: number, destinationCode: string): number {}
```

---

## Code Formatting - Pretty Code is Happy Code

### Principles

- Consistent formatting makes code more readable and professional
- Formatting should be automatic, not manual
- **Key tip:** Set up automatic formatting in your IDE to handle this on save

### Best Practices

- Use consistent indentation (spaces vs tabs - pick one)
- Use consistent line length (80-120 characters)
- Add blank lines to separate logical sections
- Group related imports together
- Use a code formatter (Prettier, Black, gofmt)

### Setup Recommendations

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### Linting Tools by Language

| Language | Formatter | Linter |
|----------|-----------|--------|
| JavaScript/TypeScript | Prettier | ESLint |
| Python | Black | Pylint, Ruff |
| Go | gofmt | golint |
| Rust | rustfmt | Clippy |
| Java | google-java-format | Checkstyle |

---

## Code Review Standards

### As a Reviewer

- Review for correctness, security, and maintainability
- Be constructive and specific
- Ask questions rather than make demands
- Approve when good enough, not perfect

### As an Author

- Keep PRs small and focused
- Write clear PR descriptions
- Self-review before requesting review
- Respond to feedback professionally
- Don't take criticism personally
