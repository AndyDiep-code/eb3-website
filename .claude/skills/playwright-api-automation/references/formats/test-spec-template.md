# Test Spec Template

Test spec file structure and organization.

## Overview

Test spec files organize tests by endpoint and test type. Each spec file covers one endpoint with multiple test cases for different scenarios.

## Test Spec Structure

### Imports

```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-playwright';
import { ApiClient } from '../../utils/api-client';
import { testData } from '../../fixtures/test-data';
```

### Test Suite

```typescript
test.describe('POST /api/users - Create User', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    allure.epic('@API');
    allure.feature('@Users');
  });

  // Test cases here
});
```

## Test Case Patterns

### Happy Path Test

```typescript
test('TC-API-001: Should create user with valid data', async () => {
  allure.story('@UserManagement');
  allure.severity('critical');
  allure.tags('smoke', 'regression');

  // Arrange
  const userData = testData.users.valid;

  // Act
  const response = await apiClient.post('/api/users', userData);

  // Assert
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toMatchObject({
    id: expect.any(Number),
    email: userData.email,
    name: userData.name,
    createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/)
  });
});
```

### Validation Test

```typescript
test('TC-API-VAL-001: Should return 400 when email is missing', async () => {
  allure.story('@InputValidation');
  allure.severity('high');
  allure.tags('regression');

  // Arrange
  const invalidData = testData.users.missingEmail;

  // Act
  const response = await apiClient.post('/api/users', invalidData);

  // Assert
  expect(response.status()).toBe(400);
  const error = await response.json();
  expect(error.message).toContain('email is required');
});
```

### Security Test

```typescript
test('TC-API-SEC-001: Should reject XSS payload in name field', async () => {
  allure.story('@SecurityValidation');
  allure.severity('critical');
  allure.tags('security');

  // Arrange
  const maliciousData = testData.users.xssPayload;

  // Act
  const response = await apiClient.post('/api/users', maliciousData);

  // Assert
  expect(response.status()).toBeLessThanOrEqual(400);
  const error = await response.json();
  expect(error.message).toMatch(/validation|sanitization|not allowed/i);
});
```

### Performance Test

```typescript
test('TC-API-PERF-001: POST /api/users should respond in <500ms', async () => {
  allure.story('@PerformanceBaseline');
  allure.severity('medium');

  // Arrange
  const userData = testData.users.valid;

  // Act
  const startTime = Date.now();
  const response = await apiClient.post('/api/users', userData);
  const duration = Date.now() - startTime;

  // Assert
  expect(duration).toBeLessThan(500);
  expect(response.status()).toBe(201);
});
```

### Integration Test

```typescript
test('TC-API-INT-001: Create then list users flow', async () => {
  allure.story('@UserFlow');
  allure.severity('high');
  allure.tags('integration');

  // Step 1: Create a user
  const createResponse = await apiClient.post('/api/users', testData.users.valid);
  expect(createResponse.status()).toBe(201);
  const createdUser = await createResponse.json();

  // Step 2: List all users
  const listResponse = await apiClient.get('/api/users');
  expect(listResponse.status()).toBe(200);
  const users = await listResponse.json();
  expect(users).toBeInstanceOf(Array);
  expect(users.some(u => u.id === createdUser.id)).toBe(true);
});
```

## Allure Metadata

### Epic

```typescript
allure.epic('@API');
```

Groups tests by major feature area.

### Feature

```typescript
allure.feature('@Users');
```

Groups tests by feature within epic.

### Story

```typescript
allure.story('@UserManagement');
```

Groups tests by user story.

### Severity

```typescript
allure.severity('critical');
```

Severity levels:
- `critical` - Must pass
- `high` - Important
- `medium` - Normal
- `low` - Nice to have

### Tags

```typescript
allure.tags('smoke', 'regression');
```

Common tags:
- `smoke` - Quick smoke tests
- `regression` - Full regression suite
- `security` - Security tests
- `performance` - Performance tests
- `integration` - Integration tests

## AAA Pattern

All tests follow Arrange-Act-Assert pattern:

### Arrange
Set up test data and preconditions.

```typescript
const userData = testData.users.valid;
```

### Act
Execute the action being tested.

```typescript
const response = await apiClient.post('/api/users', userData);
```

### Assert
Verify the results.

```typescript
expect(response.status()).toBe(201);
const body = await response.json();
expect(body.email).toBe(userData.email);
```

## Complete Example

```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-playwright';
import { ApiClient } from '../../utils/api-client';
import { testData } from '../../fixtures/test-data';

test.describe('POST /api/users - Create User', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    allure.epic('@API');
    allure.feature('@Users');
  });

  test('TC-API-001: Should create user with valid data', async () => {
    allure.story('@UserManagement');
    allure.severity('critical');
    allure.tags('smoke', 'regression');

    const userData = testData.users.valid;
    const response = await apiClient.post('/api/users', userData);

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      id: expect.any(Number),
      email: userData.email,
      name: userData.name
    });
  });

  test('TC-API-VAL-001: Should return 400 when email is missing', async () => {
    allure.story('@InputValidation');
    allure.severity('high');

    const invalidData = testData.users.missingEmail;
    const response = await apiClient.post('/api/users', invalidData);

    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.message).toContain('email is required');
  });

  test('TC-API-SEC-001: Should reject XSS payload', async () => {
    allure.story('@SecurityValidation');
    allure.severity('critical');
    allure.tags('security');

    const maliciousData = testData.users.xssPayload;
    const response = await apiClient.post('/api/users', maliciousData);

    expect(response.status()).toBeLessThanOrEqual(400);
  });

  test('TC-API-PERF-001: Should respond in <500ms', async () => {
    allure.story('@PerformanceBaseline');
    allure.severity('medium');

    const userData = testData.users.valid;
    const startTime = Date.now();
    const response = await apiClient.post('/api/users', userData);
    const duration = Date.now() - startTime;

    expect(duration).toBeLessThan(500);
    expect(response.status()).toBe(201);
  });
});

test.describe('GET /api/users - List Users', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    allure.epic('@API');
    allure.feature('@Users');
  });

  test('TC-API-002: Should list all users', async () => {
    allure.story('@UserManagement');
    allure.severity('high');

    const response = await apiClient.get('/api/users');

    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users).toBeInstanceOf(Array);
  });

  test('TC-API-INT-001: Create then list users', async () => {
    allure.story('@UserFlow');
    allure.severity('high');
    allure.tags('integration');

    const createResponse = await apiClient.post('/api/users', testData.users.valid);
    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();

    const listResponse = await apiClient.get('/api/users');
    expect(listResponse.status()).toBe(200);
    const users = await listResponse.json();
    expect(users.some(u => u.id === createdUser.id)).toBe(true);
  });
});
```

## Related Documentation

[See: API Client Template](../formats/api-client-template.md)
[See: Test Data Schema](../formats/test-data-schema.md)
[See: Assertion Helpers](../formats/assertion-helpers.md)
