# API Client Template

ApiClient class for making API requests.

## Overview

The ApiClient provides a clean interface for making HTTP requests in tests. It handles headers, authentication, timeouts, and error handling.

## Class Structure

### Constructor

```typescript
constructor(request: APIRequestContext, baseURL: string = 'http://localhost:3000')
```

Parameters:
- `request` - Playwright APIRequestContext
- `baseURL` - Base URL for all requests (default: http://localhost:3000)

### Methods

#### GET Request

```typescript
async get(endpoint: string, options?: RequestOptions): Promise<APIResponse>
```

Example:
```typescript
const response = await apiClient.get('/api/users');
const response = await apiClient.get('/api/users/123');
```

#### POST Request

```typescript
async post(endpoint: string, data: any, options?: RequestOptions): Promise<APIResponse>
```

Example:
```typescript
const response = await apiClient.post('/api/users', {
  email: 'test@example.com',
  password: 'SecurePass123!'
});
```

#### PUT Request

```typescript
async put(endpoint: string, data: any, options?: RequestOptions): Promise<APIResponse>
```

Example:
```typescript
const response = await apiClient.put('/api/users/123', {
  name: 'Updated Name'
});
```

#### PATCH Request

```typescript
async patch(endpoint: string, data: any, options?: RequestOptions): Promise<APIResponse>
```

Example:
```typescript
const response = await apiClient.patch('/api/users/123', {
  email: 'newemail@example.com'
});
```

#### DELETE Request

```typescript
async delete(endpoint: string, options?: RequestOptions): Promise<APIResponse>
```

Example:
```typescript
const response = await apiClient.delete('/api/users/123');
```

### Header Management

#### Set Auth Token

```typescript
setAuthToken(token: string): void
```

Example:
```typescript
apiClient.setAuthToken('eyJhbGciOiJIUzI1NiIs...');
```

#### Clear Auth Token

```typescript
clearAuthToken(): void
```

Example:
```typescript
apiClient.clearAuthToken();
```

## Request Options

```typescript
interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}
```

Example:
```typescript
const response = await apiClient.get('/api/users', {
  headers: { 'X-Custom-Header': 'value' },
  timeout: 5000,
  retries: 3
});
```

## Error Handling

### ApiError Class

```typescript
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: any,
    message: string
  )
}
```

Example:
```typescript
try {
  const response = await apiClient.post('/api/users', invalidData);
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status); // 400
    console.log(error.statusText); // Bad Request
    console.log(error.body); // { message: 'Email is required' }
  }
}
```

## Response Parsing

### JSON Response

```typescript
const response = await apiClient.get('/api/users');
const body = await response.json();
```

### Text Response

```typescript
const response = await apiClient.get('/api/export');
const text = await response.text();
```

### Blob Response

```typescript
const response = await apiClient.get('/api/download');
const blob = await response.blob();
```

## Default Headers

Default headers included in all requests:

```typescript
{
  'Content-Type': 'application/json'
}
```

Additional headers can be added:
- Authorization (via setAuthToken)
- Custom headers (via options)

## Timeout Configuration

Default timeout: 30000ms (30 seconds)

Override per request:
```typescript
const response = await apiClient.get('/api/users', {
  timeout: 5000 // 5 seconds
});
```

## Request/Response Logging

All requests and responses are logged for debugging:

```
→ POST /api/users
  Headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ...' }
  Body: { email: 'test@example.com', password: '***' }

← 201 Created
  Headers: { 'content-type': 'application/json' }
  Body: { id: 1, email: 'test@example.com', createdAt: '2024-01-01T00:00:00Z' }
```

## Usage Examples

### Happy Path Test

```typescript
test('Should create user with valid data', async ({ request }) => {
  const apiClient = new ApiClient(request);
  
  const response = await apiClient.post('/api/users', {
    email: 'testuser@example.com',
    password: 'SecurePass123!',
    name: 'Test User'
  });
  
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.id).toBeDefined();
  expect(body.email).toBe('testuser@example.com');
});
```

### Validation Test

```typescript
test('Should return 400 when email is missing', async ({ request }) => {
  const apiClient = new ApiClient(request);
  
  const response = await apiClient.post('/api/users', {
    password: 'SecurePass123!',
    name: 'Test User'
  });
  
  expect(response.status()).toBe(400);
  const error = await response.json();
  expect(error.message).toContain('email is required');
});
```

### Authentication Test

```typescript
test('Should include auth token in request', async ({ request }) => {
  const apiClient = new ApiClient(request);
  apiClient.setAuthToken('test-token-123');
  
  const response = await apiClient.get('/api/users/me');
  
  expect(response.status()).toBe(200);
});
```

### Integration Test

```typescript
test('Should create and retrieve user', async ({ request }) => {
  const apiClient = new ApiClient(request);
  
  // Create user
  const createResponse = await apiClient.post('/api/users', {
    email: 'testuser@example.com',
    password: 'SecurePass123!'
  });
  expect(createResponse.status()).toBe(201);
  const createdUser = await createResponse.json();
  
  // Retrieve user
  const getResponse = await apiClient.get(`/api/users/${createdUser.id}`);
  expect(getResponse.status()).toBe(200);
  const retrievedUser = await getResponse.json();
  expect(retrievedUser.id).toBe(createdUser.id);
});
```

## Related Documentation

[See: Test Spec Template](../formats/test-spec-template.md)
[See: Assertion Helpers](../formats/assertion-helpers.md)
