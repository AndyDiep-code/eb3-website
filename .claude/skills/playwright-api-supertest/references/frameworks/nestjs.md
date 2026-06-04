# NestJS Framework Setup for Supertest

Use this mode when `@nestjs/core` is detected in package.json.

## Test Mode: HTTP (default — simpler, recommended)

Hit the running NestJS server via HTTP. Server must be started before tests run.

```typescript
// test/api/api-test-config.ts pattern
import request from 'supertest';
export const req = () => request(BASE_URL);
```

**Why HTTP mode over TestingModule:**
- No AppModule import complexity
- Tests real server behavior including middleware, pipes, guards
- Same as production traffic
- SQLite seed data is already in place
- Simpler setup — works for any framework

## Test Mode: TestingModule (in-memory, no server needed)

Use only when CI/CD cannot run a server. More complex setup.

```typescript
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.init();
});

afterAll(async () => {
  await app.close();
});

const req = () => supertest(app.getHttpServer());
```

**Caveat:** Requires `AppModule` import path to be correct. Uses in-memory SQLite (seed runs fresh each test run). Tests are isolated but slower to start.

## vitest.config.ts for NestJS

```typescript
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    include: ['test/api/**/*.spec.ts'],
    globals: true,
    testTimeout: 15000,
    hookTimeout: 30000,
    setupFiles: [],
    pool: 'forks', // avoid shared state between test files
    sequence: { sequential: true }, // run specs sequentially (DB state)
  },
});
```

## tsconfig.test.json (if needed)

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*", "test/**/*"]
}
```

## Recommended: HTTP mode with shared server

For booking-be specifically: use HTTP mode. Start server once before running tests.

```bash
# Start server (terminal 1)
npm run start

# Run tests (terminal 2)
npm run test:api
```

Or in a single command:
```bash
npm run start & sleep 5 && npm run test:api
```

## package.json scripts to add

```json
{
  "scripts": {
    "test:api": "vitest run test/api --reporter=verbose",
    "test:api:watch": "vitest test/api"
  }
}
```

## Common NestJS test issues

| Issue | Fix |
|-------|-----|
| `Cannot find module 'src/...'` | Use relative paths or set `moduleNameMapper` in vitest config |
| ValidationPipe not applied | Add `app.useGlobalPipes(new ValidationPipe())` in TestingModule setup |
| SQLite locked | Run specs sequentially (`sequence: { sequential: true }`) |
| Token expired | Cache tokens in `beforeAll`, not `beforeEach` |
| Seed data IDs wrong | Don't hardcode IDs — query them or use the known seed IDs from api-spec.json |
