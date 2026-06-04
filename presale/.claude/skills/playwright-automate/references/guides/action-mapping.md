# Action & Assertion Mapping Guide

Map manual test actions to Playwright code.

## Overview

The action mapping process converts manual test steps into executable Playwright code:
- **Actions**: Navigate, Click, Fill, Select, Check, Hover, etc.
- **Assertions**: Visible, Hidden, Text, Value, Enabled, Checked, etc.
- **Locator Strategy**: Role-based, Label, Test ID, CSS selectors

## Action Mapping

### Complete Action Mapping Table

| Manual Action | Playwright Code | Example | Notes |
|---------------|-----------------|---------|-------|
| Navigate (entry point) | `pom.goto()` | `await loginPage.goto()` | Only for entry-point pages (`LoginWithMicrosoftPage`, `HomePage`). Check Page Classification Table in code-generation.md. |
| Navigate (via nav bar / tab) | Direct locator click | `await homePage.notificationsTabButton.click()` | For ALL non-entry pages — click the nav bar item, tab, or app card. Use thin POM rule: direct click unless multi-step. If POM has `navigateTo()`, use it. |
| Click | `locator.click()` | `await loginBtn.click()` | Single click |
| Double Click | `locator.dblclick()` | `await element.dblclick()` | Double click |
| Right Click | `locator.click({ button: 'right' })` | `await element.click({ button: 'right' })` | Context menu |
| Fill | `locator.fill(value)` | `await usernameInput.fill('user@example.com')` | Clear and fill |
| Clear | `locator.clear()` | `await usernameInput.clear()` | Clear field |
| Type | `locator.type(text)` | `await searchInput.type('query')` | Type character by character |
| Select | `locator.selectOption(value)` | `await countrySelect.selectOption('US')` | Dropdown selection |
| Check | `locator.check()` | `await agreeCheckbox.check()` | Check checkbox |
| Uncheck | `locator.uncheck()` | `await agreeCheckbox.uncheck()` | Uncheck checkbox |
| Hover | `locator.hover()` | `await menuItem.hover()` | Hover over element |
| Focus | `locator.focus()` | `await inputField.focus()` | Focus on element |
| Blur | `locator.blur()` | `await inputField.blur()` | Remove focus |
| Press Key | `locator.press(key)` | `await inputField.press('Enter')` | Press keyboard key |
| Drag & Drop | `locator.dragTo(target)` | `await source.dragTo(target)` | Drag element |
| Upload File | `locator.setInputFiles(path)` | `await fileInput.setInputFiles('file.txt')` | File upload |
| Scroll | `locator.scrollIntoViewIfNeeded()` | `await element.scrollIntoViewIfNeeded()` | Scroll to view |

### Action Examples

**Navigate — entry point page (has direct URL)**
```typescript
// ✅ CORRECT — entry point pages only
await test.step('Navigate to login page', async () => {
  await loginPage.goto();  // POM's goto() uses URL internally
});
```

**Navigate — non-entry page (reached via navigation)**
```typescript
// ✅ CORRECT — simulate user clicking nav bar or app card
await test.step('[HomePage] Click Notifications tab', async () => {
  await homePage.notificationsTabButton.click();
  await expect(page).toHaveURL(/\/notifications/);
});

// ✅ CORRECT — use navigateTo() if POM provides it
await test.step('Navigate to Attendance', async () => {
  await attendancePage.navigateTo();  // clicks nav path from HomePage
});

// ❌ WRONG — never do this for non-entry pages
await page.goto('/app/attendance');
await page.goto('/notifications');
await page.goto('/settings');
```

**Fill Form**
```typescript
await test.step('Fill login form', async () => {
  await loginPage.usernameInput.fill('user@example.com');
  await loginPage.passwordInput.fill('password123');
});
```

**Select Dropdown**
```typescript
await test.step('Select country', async () => {
  await countrySelect.selectOption('United States');
});
```

**Check Checkbox**
```typescript
await test.step('Accept terms', async () => {
  await termsCheckbox.check();
});
```

## Assertion Mapping

### Complete Assertion Mapping Table

| Manual Assertion | Playwright Code | Example | Notes |
|------------------|-----------------|---------|-------|
| Visible | `expect(locator).toBeVisible()` | `await expect(element).toBeVisible()` | Element is visible |
| Hidden | `expect(locator).toBeHidden()` | `await expect(element).toBeHidden()` | Element is hidden |
| Text Contains | `expect(locator).toContainText(text)` | `await expect(title).toContainText('Welcome')` | Text contains value |
| Text Equals | `expect(locator).toHaveText(text)` | `await expect(title).toHaveText('Welcome')` | Text equals value |
| Value | `expect(locator).toHaveValue(value)` | `await expect(input).toHaveValue('text')` | Input value |
| Enabled | `expect(locator).toBeEnabled()` | `await expect(button).toBeEnabled()` | Element enabled |
| Disabled | `expect(locator).toBeDisabled()` | `await expect(button).toBeDisabled()` | Element disabled |
| Checked | `expect(locator).toBeChecked()` | `await expect(checkbox).toBeChecked()` | Checkbox checked |
| Unchecked | `expect(locator).not.toBeChecked()` | `await expect(checkbox).not.toBeChecked()` | Checkbox unchecked |
| Attribute | `expect(locator).toHaveAttribute(name, value)` | `await expect(link).toHaveAttribute('href', '/page')` | Attribute value |
| Class | `expect(locator).toHaveClass(className)` | `await expect(element).toHaveClass('active')` | CSS class |
| Count | `expect(locator).toHaveCount(count)` | `await expect(items).toHaveCount(5)` | Element count |
| URL | `expect(page).toHaveURL(url)` | `await expect(page).toHaveURL('/dashboard')` | Page URL |
| Title | `expect(page).toHaveTitle(title)` | `await expect(page).toHaveTitle('Dashboard')` | Page title |

### Assertion Examples

**Verify Element Visible**
```typescript
await test.step('Verify dashboard loads', async () => {
  await expect(dashboardPage.welcomeTitle).toBeVisible();
});
```

**Verify Text Content**
```typescript
await test.step('Verify welcome message', async () => {
  await expect(dashboardPage.welcomeTitle).toContainText('Welcome');
});
```

**Verify Form Submission**
```typescript
await test.step('Verify success message', async () => {
  await expect(successMessage).toContainText('Login successful');
});
```

**Verify Navigation**
```typescript
await test.step('Verify redirected to dashboard', async () => {
  await expect(page).toHaveURL('/dashboard');
});
```

## Locator Strategy Priority

Use locators in this priority order:

### 1. Role-Based Locators (Recommended)
```typescript
// Most accessible and maintainable
page.getByRole('button', { name: 'Login' })
page.getByRole('textbox', { name: 'Username' })
page.getByRole('link', { name: 'Home' })
```

### 2. Label-Based Locators
```typescript
// Good for form fields
page.getByLabel('Username')
page.getByLabel('Password')
```

### 3. Test ID Locators
```typescript
// Good for elements without accessible names
page.getByTestId('login-button')
page.getByTestId('error-message')
```

### 4. CSS Selectors
```typescript
// Last resort - brittle and hard to maintain
page.locator('input[name="username"]')
page.locator('.login-button')
page.locator('#error-message')
```

### 5. XPath Selectors
```typescript
// Avoid if possible - very brittle
page.locator('//button[contains(text(), "Login")]')
```

## Locator Examples

**Role-Based (Best)**
```typescript
const loginButton = page.getByRole('button', { name: 'Login' });
const usernameInput = page.getByRole('textbox', { name: 'Username' });
const errorMessage = page.getByRole('status');
```

**Label-Based**
```typescript
const usernameInput = page.getByLabel('Username');
const passwordInput = page.getByLabel('Password');
```

**Test ID**
```typescript
const loginButton = page.getByTestId('login-button');
const errorMessage = page.getByTestId('error-message');
```

**CSS Selector**
```typescript
const loginButton = page.locator('button:has-text("Login")');
const errorMessage = page.locator('.error-message');
```

## Best Practices

1. **Use role-based locators**: Most accessible and maintainable
2. **Avoid CSS selectors**: Brittle and hard to maintain
3. **Avoid XPath**: Very brittle and slow
4. **Use test IDs**: When role-based locators aren't available
5. **Keep selectors simple**: Avoid complex CSS selectors
6. **Use meaningful names**: Element names should describe purpose
7. **Test locators**: Verify locators work before generating code
8. **Update locators**: Keep locators in sync with UI changes

See: [Code Generation Guide](code-generation.md)
