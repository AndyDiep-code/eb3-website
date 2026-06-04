# Config Schema

qakit.config.json schema and examples.

## Overview

The qakit.config.json file stores Playwright project configuration for automation tasks. It's created during initialization and used by automation commands.

## Schema

```json
{
  "automationPath": "string (required)",
  "baseUrl": "string (optional)",
  "browsers": ["string (required)"],
  "reporters": ["string (required)"],
  "initialized": "string (ISO 8601 timestamp)"
}
```

## Field Descriptions

### automationPath
**Type**: string (required)
**Description**: Path to Playwright project directory
**Example**: `./tests/playwright`
**Used by**: automate, automate-api commands to locate project

### baseUrl
**Type**: string (optional)
**Description**: Base URL for tests
**Example**: `https://example.com`
**Default**: empty string
**Used by**: playwright.config.ts for test URLs

### browsers
**Type**: array of strings (required)
**Description**: Browsers to test
**Valid values**: `chromium`, `firefox`, `webkit`
**Example**: `["chromium", "firefox"]`
**Default**: `["chromium"]`
**Used by**: playwright.config.ts for browser configuration

### reporters
**Type**: array of strings (required)
**Description**: Test reporters
**Valid values**: `allure`, `html`, `list`
**Example**: `["allure", "html"]`
**Default**: `["allure", "html"]`
**Used by**: playwright.config.ts for reporting

### initialized
**Type**: string (ISO 8601 timestamp)
**Description**: Project initialization timestamp
**Example**: `2026-04-02T12:00:00Z`
**Format**: `YYYY-MM-DDTHH:MM:SSZ`
**Used by**: Tracking project creation time

## Example Configurations

### Minimal Configuration
```json
{
  "automationPath": "./tests/playwright",
  "baseUrl": "",
  "browsers": ["chromium"],
  "reporters": ["allure", "html"],
  "initialized": "2026-04-02T12:00:00Z"
}
```

### Production Configuration
```json
{
  "automationPath": "./tests/playwright",
  "baseUrl": "https://example.com",
  "browsers": ["chromium", "firefox", "webkit"],
  "reporters": ["allure", "html"],
  "initialized": "2026-04-02T12:00:00Z"
}
```

### Staging Configuration
```json
{
  "automationPath": "./tests/e2e",
  "baseUrl": "https://staging.example.com",
  "browsers": ["chromium", "firefox"],
  "reporters": ["html", "list"],
  "initialized": "2026-04-02T12:00:00Z"
}
```

### Development Configuration
```json
{
  "automationPath": "./tests/playwright",
  "baseUrl": "http://localhost:3000",
  "browsers": ["chromium"],
  "reporters": ["list"],
  "initialized": "2026-04-02T12:00:00Z"
}
```

## File Location

**Path**: `./test-tasks/playwright/qakit.config.json`

**Created by**: init-automation command

**Used by**: automate, automate-api, and other automation commands

## Validation Rules

### automationPath
- Must be a valid directory path
- Must contain playwright.config.ts
- Must contain package.json
- Must contain node_modules

### baseUrl
- Must be valid URL (if provided)
- Can be empty string
- Used in playwright.config.ts

### browsers
- Must contain at least one browser
- Valid values: chromium, firefox, webkit
- No duplicates

### reporters
- Must contain at least one reporter
- Valid values: allure, html, list
- No duplicates

### initialized
- Must be ISO 8601 format
- Must be valid timestamp

## Usage in Commands

### automate Command
```bash
# Reads automationPath from config
OUTPUT=$(jq -r '.automationPath' ./test-tasks/playwright/qakit.config.json)
```

### automate-api Command
```bash
# Reads automationPath from config
OUTPUT=$(jq -r '.automationPath' ./test-tasks/playwright/qakit.config.json)
```

### playwright.config.ts
```typescript
// Uses baseUrl, browsers, reporters from config
const config: PlaywrightTestConfig = {
  use: {
    baseURL: process.env.BASE_URL || config.baseUrl,
  },
  projects: config.browsers.map(browser => ({
    name: browser,
    use: { ...devices[browser] },
  })),
  reporter: config.reporters.map(reporter => [reporter, {}]),
};
```

## Related Documentation

[See: Project Structure](../formats/project-structure.md)
