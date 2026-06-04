# Test Data Schema

Test data fixture schema and organization.

## Overview

Test data is organized by endpoint and test type. Each endpoint has request data and response schema fixtures.

## Test Data Structure

### Valid Data

Valid data that should succeed.

```json
{
  "email": "testuser@example.com",
  "password": "SecurePass123!",
  "name": "Test User"
}
```

### Invalid Data

Invalid data that should fail validation.

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

### Edge Case Data

Boundary values and edge cases.

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
  }
}
```

### Security Payloads

Malicious data for security testing.

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
  }
}
```

## Request Data Schema

File: `{endpoint-name}-request-data.json`

```json
{
  "valid": {
    "email": "testuser@example.com",
    "password": "SecurePass123!",
    "name": "Test User"
  },
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
  },
  "xssPayload": {
    "email": "<script>alert('xss')</script>@test.com",
    "password": "SecurePass123!",
    "name": "<img src=x onerror=alert('xss')>"
  },
  "sqlInjectionPayload": {
    "email": "'; DROP TABLE users; --@test.com",
    "password": "SecurePass123!",
    "name": "' OR '1'='1"
  }
}
```

## Response Schema

File: `{endpoint-name}-response-schema.json`

```json
{
  "type": "object",
  "required": ["id", "email", "name", "createdAt"],
  "properties": {
    "id": {
      "type": "number",
      "description": "User ID"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "User email"
    },
    "name": {
      "type": "string",
      "description": "User name"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Creation timestamp"
    }
  }
}
```

## Test Data File

File: `test-data.ts`

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
    },
    productResponse: {
      type: "object",
      required: ["id", "name", "price"],
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        price: { type: "number", minimum: 0 },
        description: { type: "string" }
      }
    }
  }
};
```

## Example Schemas

### User Request Schema

```json
{
  "type": "object",
  "required": ["email", "password", "name"],
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 8
    },
    "name": {
      "type": "string"
    }
  }
}
```

### User Response Schema

```json
{
  "type": "object",
  "required": ["id", "email", "name", "createdAt"],
  "properties": {
    "id": { "type": "number" },
    "email": { "type": "string", "format": "email" },
    "name": { "type": "string" },
    "createdAt": { "type": "string", "format": "date-time" }
  }
}
```

### Product Request Schema

```json
{
  "type": "object",
  "required": ["name", "price"],
  "properties": {
    "name": { "type": "string" },
    "price": { "type": "number", "minimum": 0 },
    "description": { "type": "string" }
  }
}
```

### Product Response Schema

```json
{
  "type": "object",
  "required": ["id", "name", "price"],
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "price": { "type": "number", "minimum": 0 },
    "description": { "type": "string" },
    "createdAt": { "type": "string", "format": "date-time" }
  }
}
```

## Test Data Organization Per Endpoint

Directory structure:

```
tests/fixtures/
├── create-user-request-data.json
├── create-user-response-schema.json
├── list-users-request-data.json
├── list-users-response-schema.json
├── get-user-request-data.json
├── get-user-response-schema.json
├── update-user-request-data.json
├── update-user-response-schema.json
├── delete-user-request-data.json
├── delete-user-response-schema.json
├── create-product-request-data.json
├── create-product-response-schema.json
└── test-data.ts
```

## Usage in Tests

```typescript
import { testData } from '../../fixtures/test-data';

test('Should create user with valid data', async () => {
  const userData = testData.users.valid;
  const response = await apiClient.post('/api/users', userData);
  
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toMatchSchema(testData.schemas.userResponse);
});

test('Should return 400 when email is missing', async () => {
  const invalidData = testData.users.missingEmail;
  const response = await apiClient.post('/api/users', invalidData);
  
  expect(response.status()).toBe(400);
});

test('Should reject XSS payload', async () => {
  const maliciousData = testData.users.xssPayload;
  const response = await apiClient.post('/api/users', maliciousData);
  
  expect(response.status()).toBeLessThanOrEqual(400);
});
```

## Related Documentation

[See: Test Data Generation](../guides/test-data-generation.md)
[See: Test Spec Template](../formats/test-spec-template.md)
