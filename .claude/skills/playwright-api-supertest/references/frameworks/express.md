# Express / Plain HTTP Framework Setup for Supertest

Use this mode when:
- Express/Fastify/Hono detected in package.json, OR
- `--framework=express` or `--framework=http` specified, OR
- No NestJS found (`@nestjs/core` absent)

## Test Mode: HTTP (default for Express)

Hit the running server via its base URL. No framework-specific module loading needed.

```typescript
// test/api/api-test-config.ts pattern (same as NestJS HTTP mode)
import request from 'supertest';
export const req = () => request(BASE_URL);
```

This works because supertest accepts a URL string and makes real HTTP calls.

## vitest.config.ts for Express

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/api/**/*.spec.ts'],
    globals: true,
    testTimeout: 10000,   // Express starts faster than NestJS
    hookTimeout: 15000,
    pool: 'forks',
    sequence: { sequential: true },
    reporters: ['verbose'],
  },
});
```

## Test Setup Pattern (plain HTTP)

```typescript
// test/api/api-test-config.ts
export const BASE_URL = 'http://localhost:3000'; // or process.env.API_URL

// No AppModule import — just use the URL
```

## Auth Helper Pattern (same as NestJS HTTP mode)

```typescript
// test/api/auth-helper.ts
import request from 'supertest';
import { BASE_URL } from './api-test-config';

let token: string | null = null;

export async function getToken(): Promise<string> {
  if (!token) {
    const res = await request(BASE_URL)
      .post('/auth/login')
      .send({ email: 'user@example.com', password: 'Password123!' });
    token = res.body.access_token || res.body.token || res.body.jwt;
  }
  return token!;
}
```

## package.json scripts

```json
{
  "scripts": {
    "test:api": "vitest run test/api --reporter=verbose"
  }
}
```

## Framework-Specific Notes

| Framework | Notes |
|-----------|-------|
| Express | Standard — `app.listen()` must be called before tests |
| Fastify | Use `fastify.ready()` before requests, `fastify.close()` after |
| Hono | Works with Node adapter — same HTTP mode |
| Django REST | No JS setup — use `axios` instead of supertest, or switch to pytest |
| FastAPI | No JS setup — use `axios`, or switch to pytest + httpx |

## Common Issues

| Issue | Fix |
|-------|-----|
| `ECONNREFUSED` | Server not started — run `npm start` before tests |
| 404 on all routes | Wrong BASE_URL or port — check server output |
| Auth fails | Token key name differs — check `access_token` vs `token` vs `jwt` |
| CORS errors | Add `Access-Control-Allow-Origin: *` in Express middleware for tests |
