# AAA Pattern Guide

Arrange-Act-Assert pattern for test design.

## Overview

All generated tests follow the Arrange-Act-Assert (AAA) pattern:
- **Arrange**: Prepare preconditions and test data
- **Act**: Perform the main action (business-level operation)
- **Assert**: Verify the expected outcome

This pattern makes tests clear, maintainable, and easy to understand.

## Pattern Structure

### Arrange Section
Prepare everything needed for the test:
- Navigate to the page
- Set up test data
- Initialize page objects
- Create preconditions

```typescript
// Arrange
await test.step('Navigate to login page', async () => {
  await page.goto('/login');
  await expect(page).toHaveTitle(/Login/);
});

await test.step('Prepare test data', async () => {
  testData = {
    username: 'user@example.com',
    password: 'password123'
  };
});
```

### Act Section
Perform the main action (business-level operation):
- User interactions (click, fill, select)
- Business operations (login, submit form, navigate)
- Single main action or sequence of related actions

```typescript
// Act
await test.step('Fill login form', async () => {
  await loginPage.usernameInput.fill(testData.username);
  await loginPage.passwordInput.fill(testData.password);
});

await test.step('Submit login form', async () => {
  await loginPage.loginBtn.click();
});
```

### Assert Section
Verify the expected outcome:
- Check page navigation
- Verify element visibility
- Check text content
- Verify data changes

```typescript
// Assert
await test.step('Verify dashboard loads', async () => {
  await expect(page).toHaveURL('/dashboard');
  await expect(dashboardPage.welcomeTitle).toContainText('Welcome');
});

await test.step('Verify user is logged in', async () => {
  await expect(dashboardPage.userMenu).toBeVisible();
});
```

## Complete Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.page';
import { DashboardPage } from './DashboardPage.page';

test.describe('LoginPage', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('TC-001: Successful Login', async ({ page }) => {
    // ARRANGE: Prepare preconditions
    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
      await expect(page).toHaveTitle(/Login/);
    });

    const testData = {
      username: 'user@example.com',
      password: 'password123'
    };

    // ACT: Perform main action
    await test.step('Fill username', async () => {
      await loginPage.usernameInput.fill(testData.username);
    });

    await test.step('Fill password', async () => {
      await loginPage.passwordInput.fill(testData.password);
    });

    await test.step('Click login button', async () => {
      await loginPage.loginBtn.click();
    });

    // ASSERT: Verify outcome
    await test.step('Verify dashboard loads', async () => {
      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('Verify welcome message', async () => {
      await expect(dashboardPage.welcomeTitle).toContainText('Welcome');
    });

    await test.step('Verify user menu visible', async () => {
      await expect(dashboardPage.userMenu).toBeVisible();
    });

    // Attach screenshot for debugging
    await page.screenshot({ path: 'test-results/tc-001-success.png' });
  });

  test('TC-002: Login with Invalid Credentials', async ({ page }) => {
    // ARRANGE
    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
    });

    const testData = {
      username: 'invalid@example.com',
      password: 'wrongpassword'
    };

    // ACT
    await test.step('Fill login form with invalid credentials', async () => {
      await loginPage.usernameInput.fill(testData.username);
      await loginPage.passwordInput.fill(testData.password);
      await loginPage.loginBtn.click();
    });

    // ASSERT
    await test.step('Verify error message displayed', async () => {
      await expect(loginPage.errorMsg).toBeVisible();
      await expect(loginPage.errorMsg).toContainText('Invalid credentials');
    });

    await test.step('Verify still on login page', async () => {
      await expect(page).toHaveURL('/login');
    });

    await page.screenshot({ path: 'test-results/tc-002-error.png' });
  });
});
```

## AAA Rules

### Rule 1: One Main Action
Each test should have ONE main action (Act section):
- ✅ Good: Login, submit form, navigate
- ❌ Bad: Login AND submit form AND navigate (multiple actions)

### Rule 2: Clear Separation
Clearly separate Arrange, Act, and Assert:
- ✅ Good: Use comments and test.step() to separate sections
- ❌ Bad: Mix setup, action, and assertions together

### Rule 3: Descriptive Steps
Use clear, business-level descriptions:
- ✅ Good: "Fill login form", "Submit form", "Verify dashboard loads"
- ❌ Bad: "Fill input", "Click button", "Check element"

### Rule 4: One Assertion Focus
Each test should focus on one main assertion:
- ✅ Good: Test successful login (verify dashboard loads)
- ❌ Bad: Test login AND verify all dashboard features

### Rule 5: Independent Tests
Each test should be independent:
- ✅ Good: Each test sets up its own preconditions
- ❌ Bad: Tests depend on other tests running first

## Common Patterns

### Pattern 1: Happy Path Test
```typescript
test('TC-001: Successful Operation', async ({ page }) => {
  // ARRANGE: Set up valid data
  // ACT: Perform operation
  // ASSERT: Verify success
});
```

### Pattern 2: Error Handling Test
```typescript
test('TC-002: Error Handling', async ({ page }) => {
  // ARRANGE: Set up invalid data
  // ACT: Perform operation with invalid data
  // ASSERT: Verify error message
});
```

### Pattern 3: Validation Test
```typescript
test('TC-003: Input Validation', async ({ page }) => {
  // ARRANGE: Navigate to form
  // ACT: Try to submit empty form
  // ASSERT: Verify validation error
});
```

### Pattern 4: Navigation Test
```typescript
test('TC-004: Navigation', async ({ page }) => {
  // ARRANGE: Navigate to page
  // ACT: Click navigation link
  // ASSERT: Verify new page loaded
});
```

## Best Practices

1. **Use test.step()**: Break down each section into steps
2. **Descriptive names**: Use clear, business-level step names
3. **One assertion focus**: Each test should verify one main thing
4. **Independent tests**: Don't depend on other tests
5. **Setup in beforeEach**: Use beforeEach for common setup
6. **Test data**: Extract test data to constants
7. **Screenshots**: Attach screenshots for debugging
8. **Comments**: Add comments to separate AAA sections

## Anti-Patterns

### ❌ Anti-Pattern 1: Multiple Main Actions
```typescript
// BAD: Multiple main actions
test('Login and navigate', async ({ page }) => {
  await loginPage.login('user', 'pass');
  await dashboardPage.clickSettings();
  await settingsPage.updateProfile();
  await expect(settingsPage.successMsg).toBeVisible();
});
```

### ✅ Better: Separate Tests
```typescript
// GOOD: One action per test
test('TC-001: Successful Login', async ({ page }) => {
  // ARRANGE, ACT, ASSERT for login
});

test('TC-002: Navigate to Settings', async ({ page }) => {
  // ARRANGE (login first), ACT (click settings), ASSERT
});

test('TC-003: Update Profile', async ({ page }) => {
  // ARRANGE (login and navigate), ACT (update), ASSERT
});
```

### ❌ Anti-Pattern 2: Mixed Sections
```typescript
// BAD: Mixed Arrange, Act, Assert
test('Login test', async ({ page }) => {
  await page.goto('/login');
  await loginPage.usernameInput.fill('user@example.com');
  await expect(loginPage.usernameInput).toHaveValue('user@example.com');
  await loginPage.passwordInput.fill('password123');
  await expect(loginPage.passwordInput).toHaveValue('password123');
  await loginPage.loginBtn.click();
  await expect(page).toHaveURL('/dashboard');
});
```

### ✅ Better: Clear Sections
```typescript
// GOOD: Clear AAA sections
test('TC-001: Successful Login', async ({ page }) => {
  // ARRANGE
  await page.goto('/login');
  const testData = { username: 'user@example.com', password: 'password123' };

  // ACT
  await loginPage.usernameInput.fill(testData.username);
  await loginPage.passwordInput.fill(testData.password);
  await loginPage.loginBtn.click();

  // ASSERT
  await expect(page).toHaveURL('/dashboard');
});
```

## Summary

The AAA pattern makes tests:
- **Clear**: Easy to understand what's being tested
- **Maintainable**: Easy to update and debug
- **Reusable**: Easy to extract common setup
- **Reliable**: Independent and not flaky
- **Professional**: Industry-standard pattern

See: [Test Execution Guide](test-execution.md)
