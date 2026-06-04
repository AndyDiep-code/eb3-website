# Parsing Rules Guide

Parse markdown files to extract test data for code generation.

## Overview

The parsing process extracts structured data from markdown files:
- **locators.md**: Extract element names, roles, selectors
- **test-cases.md**: Extract test case titles, steps, expected results

## Parsing locators.md

### File Structure

```markdown
## PageName

| Name | Ref | Role | Selector | Description |
|------|-----|------|----------|-------------|
| Element Name | ref | role | selector | description |
```

### Parsing Steps

1. **Find all markdown tables** in the file
2. **Extract columns**: Name, Ref, Role, Selector, Description
3. **Convert Name to camelCase**: "Username Input" → "usernameInput"
4. **Use Role to determine methods**: "textbox" → fill(), clear(), getValue()
5. **Validate selectors**: Ensure selector is valid CSS/XPath

### Extraction Rules

| Column | Rule | Example |
|--------|------|---------|
| Name | Convert to camelCase | "Username Input" → "usernameInput" |
| Ref | Keep as-is | "username" |
| Role | Use for method generation | "textbox" |
| Selector | Keep as-is | "input[name='username']" |
| Description | Keep as-is | "Username field" |

### Example Parsing

**Input:**
```markdown
## LoginPage

| Name | Ref | Role | Selector | Description |
|------|-----|------|----------|-------------|
| Username Input | username | textbox | input[name="username"] | Username field |
| Password Input | password | textbox | input[name="password"] | Password field |
| Login Button | loginBtn | button | button:has-text("Login") | Login submit button |
```

**Output (Structured Data):**
```javascript
{
  pageName: 'LoginPage',
  elements: [
    {
      name: 'usernameInput',
      ref: 'username',
      role: 'textbox',
      selector: 'input[name="username"]',
      description: 'Username field'
    },
    {
      name: 'passwordInput',
      ref: 'password',
      role: 'textbox',
      selector: 'input[name="password"]',
      description: 'Password field'
    },
    {
      name: 'loginBtn',
      ref: 'loginBtn',
      role: 'button',
      selector: 'button:has-text("Login")',
      description: 'Login submit button'
    }
  ]
}
```

## Parsing test-cases.md

### File Structure

```markdown
## TC-XXX: Test Case Title

| Field | Value |
|-------|-------|
| Priority | High |
| Type | smoke |
| Module | auth |

### Test Steps

| Step | Action | Element | Value | Expected Result |
|------|--------|---------|-------|-----------------|
| 1 | Navigate | - | /login | Login page loads |
| 2 | Fill | Username Input | user@example.com | Field filled |
```

### Parsing Steps

1. **Find test case headers**: `## TC-XXX: Title`
2. **Extract metadata** from Field/Value table:
   - Priority (High, Medium, Low)
   - Type (smoke, regression, critical)
   - Module (auth, checkout, search, etc.)
3. **Find Test Steps section**
4. **Parse step table**: Step, Action, Element, Value, Expected Result
5. **Extract element references**: Map to locators.md elements
6. **Map priority to severity**: High → critical, Medium → normal, Low → minor

### Extraction Rules

| Field | Rule | Example |
|-------|------|---------|
| Priority | Map to severity | High → critical |
| Type | Keep as-is | smoke, regression, critical |
| Module | Keep as-is | auth, checkout, search |
| Action | Map to Playwright action | Click → click() |
| Element | Reference to locators.md | "Username Input" |
| Value | Test data value | "user@example.com" |
| Expected Result | Map to assertion | "Field filled" → isVisible() |

### Example Parsing

**Input:**
```markdown
## TC-001: Successful Login

| Field | Value |
|-------|-------|
| Priority | High |
| Type | smoke |
| Module | auth |

### Test Steps

| Step | Action | Element | Value | Expected Result |
|------|--------|---------|-------|-----------------|
| 1 | Navigate | - | /login | Login page loads |
| 2 | Fill | Username Input | user@example.com | Field filled |
| 3 | Fill | Password Input | password123 | Field filled |
| 4 | Click | Login Button | - | Dashboard page loads |
| 5 | Assert | Dashboard Title | - | "Welcome" visible |
```

**Output (Structured Data):**
```javascript
{
  testCaseId: 'TC-001',
  title: 'Successful Login',
  priority: 'high',
  type: 'smoke',
  module: 'auth',
  steps: [
    {
      step: 1,
      action: 'navigate',
      element: null,
      value: '/login',
      expectedResult: 'Login page loads'
    },
    {
      step: 2,
      action: 'fill',
      element: 'usernameInput',
      value: 'user@example.com',
      expectedResult: 'Field filled'
    },
    {
      step: 3,
      action: 'fill',
      element: 'passwordInput',
      value: 'password123',
      expectedResult: 'Field filled'
    },
    {
      step: 4,
      action: 'click',
      element: 'loginBtn',
      value: null,
      expectedResult: 'Dashboard page loads'
    },
    {
      step: 5,
      action: 'assert',
      element: 'dashboardTitle',
      value: null,
      expectedResult: '"Welcome" visible'
    }
  ]
}
```

## Priority to Severity Mapping

| Priority | Severity | Tag |
|----------|----------|-----|
| High | critical | @critical |
| Medium | normal | @regression |
| Low | minor | @smoke |

## Auto-Generated Tags

Tags are automatically generated from metadata:

```
@{type} - From Type field (smoke, regression, critical)
@{module} - From Module field (auth, checkout, search)
@{priority} - From Priority field (critical, normal, minor)
@{task} - From Task ID (test-001, test-002)
@{page} - From Page name (LoginPage, DashboardPage)
```

## Validation Rules

### For locators.md
- ✅ Name must not be empty
- ✅ Selector must be valid CSS or XPath
- ✅ Role must be from predefined list
- ✅ Each page must have unique element names

### For test-cases.md
- ✅ Test Case ID must be unique (TC-XXX format)
- ✅ Title must not be empty
- ✅ Priority must be High, Medium, or Low
- ✅ Type must be smoke, regression, or critical
- ✅ Module must not be empty
- ✅ Element references must exist in locators.md
- ✅ Actions must be from predefined list

## Error Handling

### Missing Elements
If a test step references an element not in locators.md:
- ❌ Error: "Element 'usernameInput' not found in LoginPage"
- ✅ Solution: Add element to locators.md

### Invalid Selectors
If a selector is invalid:
- ❌ Error: "Invalid selector: 'invalid[selector'"
- ✅ Solution: Fix selector in locators.md

### Missing Metadata
If test case metadata is incomplete:
- ❌ Error: "Missing Priority field in TC-001"
- ✅ Solution: Add missing field to metadata table

See: [Code Generation Guide](code-generation.md)
