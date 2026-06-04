# Test Data Generation

Test data strategy for API testing.

## Overview

Test data generation creates multiple variations of data for each endpoint to cover different test scenarios: valid data for happy path tests, invalid data for validation tests, edge cases, and security payloads.

## Test Data Types

### 1. Valid Data (Happy Path)

Valid data that should succeed with expected response.

Example:
```json
{
  "email": "testuser@example.com",
  "password": "SecurePass123!",
  "name": "Test User"
}
```

**Used for:**
- Happy path tests (TC-API-XXX)
- Baseline functionality verification
- Integration tests

### 2. Invalid Data (Validation Tests)

Invalid data that should fail with 400 error.

Examples:
```json
{
  "missingEmail": {
    "password": "SecurePass123!",
    "name": "Test User"
  },
  "invalidEmail": {
    "email": "not-an-email",
    "password": "SecurePass123!",
    "name": "Test User"
  },
  "shortPassword": {
    "email": "testuser@example.com",
    "password": "short",
    "name": "Test User"
  }
}
```

**Used for:**
- Validation tests (TC-API-VAL-XXX)
- Required field validation
- Data type validation
- Format validation

### 3. Edge Case Data

Boundary values and edge cases.

Examples:
```json
{
  "emptyString": {
    "email": "",
    "password": "SecurePass123!",
    "name": ""
  },
  "maxLength": {
    "email": "testuser@example.com",
    "password": "SecurePass123!",
    "name": "A".repeat(1000)
  },
  "specialCharacters": {
    "email": "test+user@example.com",
    "password": "P@$$w0rd!#%&",
    "name": "Test User™"
  }
}
```

**Used for:**
- Edge case testing
- Boundary value testing
- Special character handling

### 4. Security Payloads

Malicious data for security testing.

Examples:
```json
{
  "xssPayload": {
    "email": "<script>alert('xss')</script>@test.com",
    "password": "SecurePass123!",
    "name": "<img src=x onerror=alert('xss')>"
  },
  "sqlInjectionPayload": {
    "email": "'; DROP TABLE users; --@test.com",
    "password": "SecurePass123!",
    "name": "' OR '1'='1"
  },
  "commandInjectionPayload": {
    "email": "testuser@example.com",
    "password": "SecurePass123!",
    "name": "; rm -rf /"
  }
}
```

**Used for:**
- Security tests (TC-API-SEC-XXX)
- XSS prevention verification
- SQL injection prevention
- Command injection prevention

## Test Data Factory Pattern

Organize test data by endpoint and type:

```typescript
export const testData = {
  users: {
    valid: {
      email: "testuser@example.com",
      password: "SecurePass123!",
      name: "Test User"
    },
    missingEmail: {
      password: "SecurePass123!",
      name: "Test User"
    },
    invalidEmail: {
      email: "not-an-email",
      password: "SecurePass123!",
      name: "Test User"
    },
    xssPayload: {
      email: "<script>alert('xss')</script>@test.com",
      password: "SecurePass123!",
      name: "<img src=x onerror=alert('xss')>"
    },
    sqlInjectionPayload: {
      email: "'; DROP TABLE users; --@test.com",
      password: "SecurePass123!",
      name: "' OR '1'='1"
    }
  },
  products: {
    valid: {
      name: "Test Product",
      price: 99.99,
      description: "A test product"
    },
    missingName: {
      price: 99.99,
      description: "A test product"
    },
    invalidPrice: {
      name: "Test Product",
      price: -10,
      description: "A test product"
    }
  }
};
```

## How to Generate Test Data Per Endpoint

For each endpoint in network capture:

1. **Extract Schema**: Get requestSchema from network capture
2. **Generate Valid Data**: Create valid object matching schema
3. **Generate Invalid Data**: For each required field, create object missing that field
4. **Generate Invalid Types**: For each field, create object with wrong type
5. **Generate Edge Cases**: Empty strings, max length, special characters
6. **Generate Security Payloads**: XSS, SQL injection, command injection

## How to Organize Test Data Fixtures

Structure:
```
tests/fixtures/
├── {endpoint-name}-request-data.json
├── {endpoint-name}-response-schema.json
└── test-data.ts
```

Example:
```
tests/fixtures/
├── create-user-request-data.json
├── create-user-response-schema.json
├── list-users-request-data.json
├── list-users-response-schema.json
├── update-user-request-data.json
├── update-user-response-schema.json
└── test-data.ts
```

## Example Test Data File

```typescript
export const testData = {
  users: {
    valid: {
      email: "testuser@example.com",
      password: "SecurePass123!",
      name: "Test User"
    },
    missingEmail: {
      password: "SecurePass123!",
      name: "Test User"
    },
    invalidEmail: {
      email: "not-an-email",
      password: "SecurePass123!",
      name: "Test User"
    },
    shortPassword: {
      email: "testuser@example.com",
      password: "short",
      name: "Test User"
    },
    xssPayload: {
      email: "<script>alert('xss')</script>@test.com",
      password: "SecurePass123!",
      name: "<img src=x onerror=alert('xss')>"
    },
    sqlInjectionPayload: {
      email: "'; DROP TABLE users; --@test.com",
      password: "SecurePass123!",
      name: "' OR '1'='1"
    }
  },
  schemas: {
    userResponse: {
      type: "object",
      required: ["id", "email", "name", "createdAt"],
      properties: {
        id: { type: "number" },
        email: { type: "string", format: "email" },
        name: { type: "string" },
        createdAt: { type: "string", format: "date-time" }
      }
    }
  }
};
```

## Related Documentation

[See: Test Data Schema](../formats/test-data-schema.md)
[See: Test Spec Template](../formats/test-spec-template.md)
