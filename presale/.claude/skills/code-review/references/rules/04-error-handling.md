# Error Handling & Logging

> Proper error handling makes applications robust; good logging makes them debuggable.

---

## Error Handling Principles

- Always "fail safe" - never "fail open"
- Use try-catch for operations that can fail
- Implement global exception handlers for unexpected errors
- Separate business exceptions from technical exceptions
- **Key tip:** Create custom error classes for different types of errors - makes error handling more specific
- Use optional chaining and null coalescing: `obj?.value ?? defaultValue`
- Place safety nets strategically - don't wrap entire code in try-catch blocks

### Best Practices

```typescript
// BAD - Silent failure
try {
  await saveUser(user);
} catch (e) {
  // nothing
}

// BAD - Exposing internal details
catch (error) {
  res.status(500).json({ error: error.stack });
}

// GOOD - Proper error handling
try {
  await saveUser(user);
} catch (error) {
  logger.error('Failed to save user', { userId: user.id, error });
  throw new ApplicationError('Unable to save user. Please try again.');
}
```

### Security Considerations

- Never expose stack traces or system info to users
- Don't reveal whether username or password is incorrect (prevents enumeration)
- Log errors on trusted systems
- Sanitize error messages before displaying

---

## Logging

### Log Levels

| Level | Use Case |
|-------|----------|
| DEBUG | Detailed debugging information (dev only) |
| INFO | Significant business events (user login, order placed) |
| WARN | Abnormal situations that may indicate problems |
| ERROR | Unrecoverable errors affecting specific operations |
| FATAL | Critical errors affecting entire application |

### Best Practices

- Use structured logging (JSON format) for parseability
- Include context: user IDs, request IDs, timestamps
- Log the "what" and "why", not just "error occurred"
- Never log sensitive data: passwords, tokens, PII, credit cards
- Set up alerts for ERROR/FATAL levels

```typescript
// BAD
console.log('Error');
console.log(error);

// GOOD
logger.error('Payment processing failed', {
  orderId: order.id,
  userId: user.id,
  paymentMethod: order.paymentMethod,
  errorCode: error.code,
  timestamp: new Date().toISOString()
});
```
