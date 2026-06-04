# Page Object Template

Exact format for Page Object generation.

## Overview

Page Objects encapsulate element locators and action methods for a specific page. This template shows the exact structure for generated Page Objects.

## Complete Template

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object for {PageName}
 *
 * Extends BasePage — inherits goto(), waitForPageLoad(), enableFlutterAccessibility(), etc.
 * Generated from locators.md
 *
 * Flutter Web note: if this page is a Flutter Web (CanvasKit) app, override goto() and
 * call enableFlutterAccessibility() after waitForLoadState('networkidle').
 */
export class {PageName} extends BasePage {

  // ============================================
  // LOCATORS
  // ============================================

  readonly {elementName1}: Locator;
  readonly {elementName2}: Locator;
  readonly {elementName3}: Locator;

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(page: Page) {
    super(page);
    this.{elementName1} = page.locator('{selector1}');
    this.{elementName2} = page.locator('{selector2}');
    this.{elementName3} = page.locator('{selector3}');
  }

  // ============================================
  // ACTION METHODS
  // ============================================

  // {ElementName1} - textbox
  async fill{ElementName1}(value: string): Promise<void> {
    await this.{elementName1}.fill(value);
  }

  async clear{ElementName1}(): Promise<void> {
    await this.{elementName1}.clear();
  }

  async get{ElementName1}Value(): Promise<string | null> {
    return await this.{elementName1}.inputValue();
  }

  // {ElementName2} - button
  async click{ElementName2}(): Promise<void> {
    await this.{elementName2}.click();
  }

  async is{ElementName2}Enabled(): Promise<boolean> {
    return await this.{elementName2}.isEnabled();
  }

  // {ElementName3} - checkbox
  async check{ElementName3}(): Promise<void> {
    await this.{elementName3}.check();
  }

  async uncheck{ElementName3}(): Promise<void> {
    await this.{elementName3}.uncheck();
  }

  async is{ElementName3}Checked(): Promise<boolean> {
    return await this.{elementName3}.isChecked();
  }

  // ============================================
  // ASSERTION METHODS
  // ============================================

  async is{ElementName1}Visible(): Promise<boolean> {
    return await this.{elementName1}.isVisible();
  }

  async is{ElementName2}Visible(): Promise<boolean> {
    return await this.{elementName2}.isVisible();
  }

  async get{ElementName3}Text(): Promise<string> {
    return await this.{elementName3}.textContent() || '';
  }
}
```

## Naming Conventions

### Class Name
- **Format**: PascalCase
- **Example**: `LoginPage`, `DashboardPage`, `CheckoutPage`
- **Rule**: Match the page name exactly

### File Name
- **Format**: `{PageName}.page.ts`
- **Example**: `LoginPage.page.ts`, `DashboardPage.page.ts`
- **Rule**: Use `.page.ts` suffix

### Locator Properties
- **Format**: camelCase
- **Example**: `usernameInput`, `loginBtn`, `errorMsg`
- **Rule**: Convert element name to camelCase

### Action Methods
- **Format**: camelCase with verb prefix
- **Example**: `fillUsername()`, `clickLogin()`, `checkAgree()`
- **Rule**: Use action verb + element name

### Assertion Methods
- **Format**: camelCase with `is` or `get` prefix
- **Example**: `isVisible()`, `getText()`, `isEnabled()`
- **Rule**: Use `is` for boolean, `get` for value

## Role to Method Mapping

### Textbox Role
```typescript
// Locator
readonly usernameInput: Locator;

// Action Methods
async fillUsername(value: string): Promise<void> {
  await this.usernameInput.fill(value);
}

async clearUsername(): Promise<void> {
  await this.usernameInput.clear();
}

async getUsernameValue(): Promise<string | null> {
  return await this.usernameInput.inputValue();
}

// Assertion Methods
async isUsernameVisible(): Promise<boolean> {
  return await this.usernameInput.isVisible();
}
```

### Button Role
```typescript
// Locator
readonly loginBtn: Locator;

// Action Methods
async clickLogin(): Promise<void> {
  await this.loginBtn.click();
}

async isLoginEnabled(): Promise<boolean> {
  return await this.loginBtn.isEnabled();
}

// Assertion Methods
async isLoginVisible(): Promise<boolean> {
  return await this.loginBtn.isVisible();
}
```

### Checkbox Role
```typescript
// Locator
readonly agreeCheckbox: Locator;

// Action Methods
async checkAgree(): Promise<void> {
  await this.agreeCheckbox.check();
}

async uncheckAgree(): Promise<void> {
  await this.agreeCheckbox.uncheck();
}

async isAgreeChecked(): Promise<boolean> {
  return await this.agreeCheckbox.isChecked();
}

// Assertion Methods
async isAgreeVisible(): Promise<boolean> {
  return await this.agreeCheckbox.isVisible();
}
```

### Combobox Role
```typescript
// Locator
readonly countrySelect: Locator;

// Action Methods
async selectCountry(value: string): Promise<void> {
  await this.countrySelect.selectOption(value);
}

async getSelectedCountry(): Promise<string | null> {
  return await this.countrySelect.inputValue();
}

// Assertion Methods
async isCountryVisible(): Promise<boolean> {
  return await this.countrySelect.isVisible();
}
```

### Status Role
```typescript
// Locator
readonly errorMsg: Locator;

// Action Methods (none for status)

// Assertion Methods
async getErrorMessage(): Promise<string> {
  return await this.errorMsg.textContent() || '';
}

async isErrorVisible(): Promise<boolean> {
  return await this.errorMsg.isVisible();
}
```

## Complete Example

```typescript
import { Page, Locator } from '@playwright/test';

/**
 * Page Object for LoginPage
 *
 * Extends BasePage — inherits enableFlutterAccessibility() for Flutter Web support.
 * Generated from locators.md
 */
export class LoginPage extends BasePage {

  // ============================================
  // LOCATORS
  // ============================================

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly rememberMeCheckbox: Locator;

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator('button:has-text("Login")');
    this.errorMsg = page.locator('.error-message');
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
  }

  // ============================================
  // ACTION METHODS
  // ============================================

  // Username Input - textbox
  async fillUsername(value: string): Promise<void> {
    await this.usernameInput.fill(value);
  }

  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  async getUsernameValue(): Promise<string | null> {
    return await this.usernameInput.inputValue();
  }

  // Password Input - textbox
  async fillPassword(value: string): Promise<void> {
    await this.passwordInput.fill(value);
  }

  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  async getPasswordValue(): Promise<string | null> {
    return await this.passwordInput.inputValue();
  }

  // Login Button - button
  async clickLogin(): Promise<void> {
    await this.loginBtn.click();
  }

  async isLoginEnabled(): Promise<boolean> {
    return await this.loginBtn.isEnabled();
  }

  // Remember Me Checkbox - checkbox
  async checkRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }

  async uncheckRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.uncheck();
  }

  async isRememberMeChecked(): Promise<boolean> {
    return await this.rememberMeCheckbox.isChecked();
  }

  // ============================================
  // ASSERTION METHODS
  // ============================================

  async isUsernameVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }

  async isPasswordVisible(): Promise<boolean> {
    return await this.passwordInput.isVisible();
  }

  async isLoginVisible(): Promise<boolean> {
    return await this.loginBtn.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMsg.textContent() || '';
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMsg.isVisible();
  }
}
```

## Best Practices

1. **One page per file**: Each page gets its own Page Object
2. **Clear locator names**: Use descriptive names that match element purpose
3. **Action methods**: Create methods for common actions
4. **Assertion methods**: Create methods for common assertions
5. **Type safety**: Use TypeScript types for parameters and returns
6. **Comments**: Add comments for each section
7. **Consistent naming**: Use consistent naming conventions
8. **No test logic**: Page Objects should not contain test logic

See: [Code Generation Guide](../guides/code-generation.md)
