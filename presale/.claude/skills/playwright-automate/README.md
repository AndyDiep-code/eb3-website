# Playwright Automate Skill

Generate Playwright automation code from manual test cases with Page Object Model.

## Overview

This skill converts verified manual test cases into executable TypeScript test specs with:
- **Page Object Model** - Organized, maintainable test code
- **AAA Pattern** - Arrange-Act-Assert structure
- **Allure Reporting** - Built-in test reporting
- **Visual Assertions** - Optional visual regression testing
- **Tag System** - Filter tests by type, priority, module, task, page

## Quick Start

```bash
# Generate test specs from promoted test cases
/qakit:playwright:automate

# Generate test specs for specific page
/qakit:playwright:automate --page=DashboardPage

# Generate with visual assertions
```

## Modes

### DEFAULT MODE
Generate test specs from promoted test cases for all pages in task.

### SPECIFIC PAGE MODE
Generate all POMs + test specs for only the specified page. Useful for incremental development.

**Key principle:** All POMs are generated (because test specs may depend on multiple page objects), but test specs are generated for only the specified page.

### VISUAL MODE
Generate test specs from promoted test cases with visual assertions for visual regression testing.

## What Gets Generated

For each page:
- `{PageName}.page.ts` - Page Object with locators and methods
- `{PageName}.spec.ts` - Test specs with test cases
- `test-data-{task-id}.ts` - Test data (isolated per task)
- `fixtures/index.ts` - Fixtures registration (updated)

## Documentation

- **SKILL.md** - Overview and quick reference
- **references/modes/** - Detailed mode documentation
- **references/guides/** - Implementation guides
- **references/formats/** - Format specifications
- **assets/** - Code templates
- **scripts/** - Generation scripts

## File Structure

```
playwright-automate/
├── SKILL.md (Overview)
├── README.md (This file)
├── assets/ (Code templates)
│   ├── page-object.template.ts
│   ├── test-spec.template.ts
│   ├── base.page.template.ts
│   ├── fixtures.template.ts
│   └── playwright.config.template.ts
├── scripts/ (Generation scripts)
│   ├── generate-page-objects.js
│   ├── generate-test-specs.js
│   ├── parse-locators.js
│   └── parse-test-cases.js
└── references/ (Detailed documentation)
    ├── modes/
    │   ├── default.md
    │   ├── specific-page.md
    │   └── visual.md
    ├── guides/
    │   ├── code-generation.md
    │   ├── parsing-rules.md
    │   ├── action-mapping.md
    │   ├── test-execution.md
    │   └── aaa-pattern.md
    └── formats/
        ├── page-object-template.md
        ├── test-spec-template.md
        └── tag-system.md
```

## Key Concepts

### Page Object Model
Encapsulates page elements and interactions in reusable classes. Each page has:
- Locator properties for elements
- Action methods (click, fill, select, etc.)
- Assertion methods (visible, hidden, text, etc.)

### AAA Pattern
All tests follow Arrange-Act-Assert structure:
- **Arrange**: Prepare preconditions
- **Act**: Perform main action (business-level)
- **Assert**: Verify expected outcome

### Tag System
Tests are tagged for filtering:
- **Type**: smoke, regression, critical
- **Priority**: high, medium, low
- **Module**: auth, checkout, search, etc.
- **Task**: test-001, test-002, etc.
- **Page**: LoginPage, HomePage, etc.

### Visual Assertions
Optional visual regression testing:
- Take screenshots during test execution
- Compare against baseline images
- Fail if appearance changes unexpectedly

## Running Generated Tests

```bash
cd tests/playwright

# Run all tests
npm test

# Run by tag
npm run test:smoke
npm run test:regression
npx playwright test --grep @module:auth
npx playwright test --grep @task:test-001
npx playwright test --grep @page:LoginPage

# Run with options
npm run test:headed
npm run test:ui
npm run test:parallel
```

## Related Commands

- **locators-refactored** - Capture element locators from UI
- **automate** - Generate automation code (this skill)
- **automate-api-refactored** - Generate API automation code
- **execute** - Run generated tests
- **report** - View test reports

## See Also

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Allure Reporting](https://docs.qameta.io/allure/)
