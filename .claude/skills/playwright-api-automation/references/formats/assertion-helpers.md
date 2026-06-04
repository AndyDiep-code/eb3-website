# Assertion Helpers

Assertion helper functions for API testing.

## Overview

Assertion helpers provide custom assertions for API testing. They validate response status, headers, content type, and JSON path values.

## Helper Functions

### matchSchema

Validates response matches JSON schema.

```typescript
async function matchSchema(
  response: APIResponse,
  schema: JsonSchema
): Promise<boolean>
```

Example:
```typescript
const response = await apiClient.get('/api/users/1');
const body = await response.json();
const isValid = await matchSchema(response, testData.schemas.userResponse);
expect(isValid).toBe(true);
```

### expectStatus

Assert HTTP status code.

```typescript
function expectStatus(
  response: APIResponse,
  expectedStatus: number
): void
```

Example:
```typescript
const response = await apiClient.post('/api/users', userData);
expectStatus(response, 201);
```

### expectContentType

Assert Content-Type header.

```typescript
function expectContentType(
  response: APIResponse,
  contentType: string
): void
```

Example:
```typescript
const response = await apiClient.get('/api/users');
expectContentType(response, 'application/json');
```

### expectBodyPath

Assert JSON path value in response body.

```typescript
async function expectBodyPath(
  response: APIResponse,
  path: string,
  value: any
): Promise<void>
```

Example:
```typescript
const response = await apiClient.get('/api/users/1');
await expectBodyPath(response, 'email', 'testuser@example.com');
await expectBodyPath(response, 'id', 1);
```

## Function Signatures

### matchSchema

```typescript
export interface JsonSchema {
  type?: string;
  required?: string[];
  properties?: Record<string, any>;
  items?: any;
  [key: string]: any;
}

export async function matchSchema(
  response: APIResponse,
  schema: JsonSchema
): Promise<boolean>
```

### expectStatus

```typescript
export function expectStatus(
  response: APIResponse,
  expectedStatus: number
): void
```

### expectContentType

```typescript
export function expectContentType(
  response: APIResponse,
  contentType: string
): void
```

### expectBodyPath

```typescript
export async function expectBodyPath(
  response: APIResponse,
  path: string,
  value: any
): Promise<void>
```

## Usage Examples

### Happy Path Test

```typescript
test('Should create user with valid data', async () => {
  const response = await apiClient.post('/api/users', testData.users.valid);
  
  expectStatus(response, 201);
  expectContentType(response, 'application/json');
  
  const body = await response.json();
  expect(await matchSchema(response, testData.schemas.userResponse)).toBe(true);
  
  await expectBodyPath(response, 'email', testData.users.valid.email);
  await expectBodyPath(response, 'id', expect.any(Number));
});
```

### Validation Test

```typescript
test('Should return 400 when email is missing', async () => {
  const response = await apiClient.post('/api/users', testData.users.missingEmail);
  
  expectStatus(response, 400);
  expectContentType(response, 'application/json');
  
  await expectBodyPath(response, 'message', expect.stringContaining('email'));
});
```

### Security Test

```typescript
test('Should reject XSS payload', async () => {
  const response = await apiClient.post('/api/users', testData.users.xssPayload);
  
  expect(response.status()).toBeLessThanOrEqual(400);
  expectContentType(response, 'application/json');
});
```

### Integration Test

```typescript
test('Create then retrieve user', async () => {
  // Create user
  const createResponse = await apiClient.post('/api/users', testData.users.valid);
  expectStatus(createResponse, 201);
  const createdUser = await createResponse.json();
  
  // Retrieve user
  const getResponse = await apiClient.get(`/api/users/${createdUser.id}`);
  expectStatus(getResponse, 200);
  expectContentType(getResponse, 'application/json');
  
  await expectBodyPath(getResponse, 'id', createdUser.id);
  await expectBodyPath(getResponse, 'email', testData.users.valid.email);
  expect(await matchSchema(getResponse, testData.schemas.userResponse)).toBe(true);
});
```

## Example Code

```typescript
import { APIResponse } from '@playwright/test';

export interface JsonSchema {
  type?: string;
  required?: string[];
  properties?: Record<string, any>;
  items?: any;
  [key: string]: any;
}

export async function matchSchema(
  response: APIResponse,
  schema: JsonSchema
): Promise<boolean> {
  const body = await response.json();
  // Use AJV or similar for JSON Schema validation
  const validate = ajv.compile(schema);
  return validate(body);
}

export function expectStatus(
  response: APIResponse,
  expectedStatus: number
): void {
  const actual = response.status();
  if (actual !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus} but got ${actual}: ${response.statusText()}`
    );
  }
}

export function expectContentType(
  response: APIResponse,
  contentType: string
): void {
  const actual = response.headers()['content-type'] || '';
  if (!actual.includes(contentType)) {
    throw new Error(
      `Expected Content-Type to include "${contentType}" but got "${actual}"`
    );
  }
}

export async function expectBodyPath(
  response: APIResponse,
  path: string,
  value: any
): Promise<void> {
  const body = await response.json();
  const actual = getNestedValue(body, path);
  
  if (typeof value === 'object' && value !== null && 'asymmetricMatch' in value) {
    // Handle expect.any(), expect.stringContaining(), etc.
    if (!value.asymmetricMatch(actual)) {
      throw new Error(
        `Expected ${path} to match ${value} but got ${actual}`
      );
    }
  } else if (actual !== value) {
    throw new Error(
      `Expected ${path} to equal ${value} but got ${actual}`
    );
  }
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
```

## Best Practices

1. **Use specific assertions**: Use `expectStatus`, `expectContentType`, `expectBodyPath` instead of generic `expect()`
2. **Validate schema**: Use `matchSchema` to validate entire response structure
3. **Check headers**: Use `expectContentType` to verify response format
4. **Validate paths**: Use `expectBodyPath` to check specific fields
5. **Combine assertions**: Use multiple assertions for comprehensive validation

## Related Documentation

[See: API Client Template](../formats/api-client-template.md)
[See: Test Spec Template](../formats/test-spec-template.md)
