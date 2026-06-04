# Performance & Security

> Fast, secure code protects users and provides great experiences.

---

## Performance Best Practices

### General

- Measure before optimizing (avoid premature optimization)
- Cache expensive computations
- Use lazy loading for heavy resources
- Minimize network requests
- Use appropriate data structures

### Database

- Index frequently queried columns
- Select only needed columns (avoid SELECT *)
- Use WHERE clauses to filter early
- Optimize JOIN conditions
- Use EXPLAIN to analyze query plans
- Consider pagination for large datasets
- Use connection pooling

### Frontend

- Minimize bundle size
- Lazy load routes and components
- Optimize images and assets
- Use virtualization for long lists
- Debounce/throttle expensive operations

---

## Security Best Practices

### OWASP Top 10 Awareness

- Validate and sanitize ALL user input
- Use parameterized queries (prevent SQL injection)
- Encode output (prevent XSS)
- Implement proper authentication and session management
- Use HTTPS everywhere
- Apply principle of least privilege

### Secure Coding

```typescript
// BAD - SQL Injection vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// GOOD - Parameterized query
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);

// BAD - XSS vulnerable
element.innerHTML = userInput;

// GOOD - Safe output
element.textContent = userInput;
```

### Secrets Management

- Never commit secrets to version control
- Use environment variables or secret managers
- Rotate credentials regularly
- Use different credentials per environment

### Input Validation

```typescript
// Always validate at system boundaries
function createUser(input: unknown): User {
  // Validate structure
  if (!isObject(input)) throw new ValidationError('Invalid input');

  // Validate required fields
  const { email, password, name } = input;
  if (!email || !isEmail(email)) throw new ValidationError('Invalid email');
  if (!password || password.length < 8) throw new ValidationError('Password too short');
  if (!name || name.length < 2) throw new ValidationError('Name required');

  // Sanitize before use
  return {
    email: sanitizeEmail(email),
    password: hashPassword(password),
    name: sanitizeString(name),
  };
}
```
