# Playwright Locators Capture Skill

Captures UI element locators, ARIA snapshots, and screenshots from web pages using Playwright browser. (Network capture is currently disabled.)

## Overview

This skill implements complete locator capture workflow with three modes:
- **SIMPLE MODE**: Single page capture
- **INTERACTIVE MODE**: Multi-page user-guided capture
- **SESSION MODE**: Capture from existing browser session

All modes capture locators, ARIA snapshots, and screenshots. Network capture is disabled (see SKILL.md).

## Quick Start

```bash
# Single page
/qakit:playwright:capture https://example.com/login --task=test-login

# Multi-page interactive
/qakit:playwright:capture https://example.com --task=test-checkout --interactive

# From existing browser
/qakit:playwright:capture --session --task=test-payment --name=PaymentPage
```

## What It Does

### Locator Capture
- Opens browser and navigates to URL
- Captures ARIA accessibility tree
- Generates element locators with refs
- Creates locators.md with meaningful names and selectors
- Saves ARIA snapshot and screenshot

### Network Capture
- Initializes network listener in parallel
- Captures all API calls (non-blocking)
- Filters static assets and health checks
- Redacts sensitive headers
- Generates 4 analysis enhancements

### Output Files
For each page:
- `locators.md` - Element locators with refs and selectors
- `aria-snapshot.yaml` - Raw ARIA accessibility tree
- `screenshot-{timestamp}.png` - Page screenshot
- `metadata.json` - Page metadata
- `network-calls.json` - Network requests/responses

## Modes

### SIMPLE MODE (Default)
Single page capture with automatic browser opening.

```bash
/qakit:playwright:capture https://example.com/login --task=test-login
```

**Steps:**
1. Parse input and validate task
2. Ask for page name
3. Open browser (or use existing)
4. Initialize network capture
5. Capture ARIA snapshot
6. Generate locators
7. Collect network data
8. Write output files
9. Show summary

### INTERACTIVE MODE
Multi-page user-guided capture. User controls navigation, AI captures snapshots.

```bash
/qakit:playwright:capture https://example.com --task=test-checkout --interactive
```

**Steps:**
1. Parse input and validate task
2. Open browser
3. Initialize network capture (once)
4. Loop:
   - Ask for page name
   - Capture ARIA snapshot
   - Generate locators
   - Ask: "Navigate to next page or done?"
   - If done: exit loop
5. Collect network data (aggregated)
6. Write output files
7. Show summary

**Key:** User performs all navigation. AI only observes and captures.

### SESSION MODE
Capture from existing browser session. Useful for capturing current page state.

```bash
/qakit:playwright:capture --session --task=test-payment --name=PaymentPage
```

**Steps:**
1. Parse input and validate task
2. Check for active browser sessions
3. Ask for page name
4. Initialize network capture
5. Capture ARIA snapshot
6. Generate locators
7. Collect network data
8. Reset capture state (for next --session run)
9. Show summary

**Note:** Browser stays open after capture (user may still be using it).

## Network Capture Enhancements

### Enhancement #1: API Endpoint Inventory
Groups endpoints by method + normalized URL pattern with call counts and average durations.

```json
{
  "endpoints": {
    "GET /api/users": { "count": 5, "avgDuration": 245 },
    "POST /api/users": { "count": 1, "avgDuration": 520 },
    "GET /api/users/{id}": { "count": 3, "avgDuration": 180 }
  }
}
```

### Enhancement #2: Request/Response Schema Detection
Parses JSON bodies to extract field names and types.

```json
{
  "schema": {
    "requestSchema": { "email": "string", "password": "string" },
    "responseSchema": { "id": "number", "token": "string" }
  }
}
```

### Enhancement #3: Call Sequence & Dependencies
Tracks call order and identifies dependencies between network calls.

```json
{
  "sequences": [
    {
      "flow": "Flow_1_api_example_com",
      "calls": [
        { "order": 1, "method": "POST", "url": "/login", "responseExtracted": ["token"] },
        { "order": 2, "method": "GET", "url": "/users/{id}", "dependsOnFields": ["id"] }
      ]
    }
  ]
}
```

### Enhancement #4: Timing Breakdown
Extracts or estimates timing breakdown (DNS, TLS, TTFB, Download).

```json
{
  "timing": {
    "dns": 25,
    "tls": 100,
    "ttfb": 250,
    "download": 125,
    "total": 500
  }
}
```

## Output Examples

### Locators File
```markdown
# LoginPage Locators

| Field | Value |
|-------|-------|
| Generated | 2026-04-02 |
| URL | https://example.com/login |
| Title | Login - Example |
| Browser | Playwright |

## Form Elements

| Name | Ref | Role | Selector | Description |
|------|-----|------|----------|-------------|
| EmailField | e3 | textbox | `//input[@type='email']` | Email input field |
| PasswordField | e4 | textbox | `//input[@type='password']` | Password input |
| LoginButton | e5 | button | `//button[@type='submit']` | Submit login form |
```

### Network Calls File
```json
{
  "capturedAt": "2026-04-02T10:30:00.000Z",
  "pageUrl": "https://example.com/login",
  "networkCalls": [
    {
      "sequence": 1,
      "method": "POST",
      "url": "https://api.example.com/login",
      "status": 200,
      "requestBody": { "email": "user@example.com" },
      "responseBody": { "token": "abc123", "userId": 42 },
      "duration": 520,
      "schema": {
        "requestSchema": { "email": "string" },
        "responseSchema": { "token": "string", "userId": "number" }
      },
      "timing": { "dns": 26, "tls": 104, "ttfb": 260, "download": 130, "total": 520 }
    }
  ],
  "summary": {
    "totalRequests": 1,
    "successfulRequests": 1,
    "failedRequests": 0,
    "averageDuration": 520,
    "endpoints": { "POST /api/login": { "count": 1, "avgDuration": 520 } }
  }
}
```

## Prerequisites

- Playwright CLI installed
- Browser session running (or will be opened automatically)
- Task directory structure (created if needed)

## Error Handling

- ✅ Missing task-id: Ask user
- ✅ Missing URL: Ask user
- ✅ Task not found: Ask to create
- ✅ Browser not running: Fail with helpful message
- ✅ Network capture fails: Log warning, continue (non-fatal)
- ✅ File write fails: Log error, continue (non-fatal)

## References

- **Network Capture Format**: `references/network-capture-format.md`
- **Locators Output Format**: `references/locators-output-format.md`
- **ARIA Snapshot Format**: `references/aria-snapshot-format.md`
- **Network Enhancements**: `references/network-enhancements.md`
- **Browser Session Guide**: `references/browser-session-guide.md`

## Implementation

See `SKILL.md` for complete implementation details including:
- SIMPLE MODE (STEP 1-12)
- INTERACTIVE MODE (STEP 1-10)
- SESSION MODE (STEP 1-9)
- Network capture initialization and collection
- Error handling and edge cases

## Best Practices

1. **Use SIMPLE MODE** for single page capture
2. **Use INTERACTIVE MODE** for multi-page workflows
3. **Use SESSION MODE** for capturing current page state
4. **Keep browser open** between captures (use --session)
5. **Review network data** for API test generation
6. **Use locators.md** for test automation

## Integration

Network data can be used to auto-generate API test specs:
- Use endpoint inventory to identify APIs to test
- Use schemas to generate test data
- Use sequences to create integration tests
- Use timing data to set performance baselines

## Support

For detailed documentation:
- Command: `locators-refactored.md`
- Skill: `SKILL.md`
- References: `references/` directory
