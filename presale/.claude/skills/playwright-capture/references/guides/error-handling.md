# Error Handling Guide

Comprehensive error handling across all modes.

## Input Validation Errors

### Missing Task ID

**Error:** User doesn't provide `--task` argument

**Handling:**
- Use AskUserQuestion to request Task ID
- Question: "Please provide the Task ID (e.g., test-login) to capture locators for:"
- Store response as {task-id}
- Continue execution

**Example:**
```
User runs: /qakit:playwright:capture https://example.com

AI asks: "Please provide the Task ID (e.g., test-login) to capture locators for:"
User: "test-login"

Continue with task-id = "test-login"
```

### Missing URL (SIMPLE/INTERACTIVE MODE)

**Error:** User doesn't provide URL and not in --session mode

**Handling:**
- Use AskUserQuestion to request URL
- Question: "Please provide the URL to capture locators from:"
- Store response as {URL}
- Continue execution

**Example:**
```
User runs: /qakit:playwright:capture --task=test-login

AI asks: "Please provide the URL to capture locators from:"
User: "https://example.com/login"

Continue with URL = "https://example.com/login"
```

## Task Validation Errors

### Task Not Found

**Error:** Task directory doesn't exist

**Handling:**
- Use AskUserQuestion: "Task {task-id} not found. Create it?"
- Options: "Yes", "No"
- If Yes: Create folder structure
- If No: STOP execution

**Example:**
```
Task directory: ./test-tasks/playwright/test-login/ (doesn't exist)

AI asks: "Task test-login not found. Create it?"
User: "Yes"

Create folder structure and continue
```

## Browser Errors

### No Active Sessions (SESSION MODE)

**Error:** No browser sessions running in --session mode

**Handling:**
- PRINT ERROR: "No active browser sessions found."
- PRINT: "Open a browser first with: playwright-cli open https://your-url"
- STOP execution

**Example:**
```
User runs: /qakit:playwright:capture --session --task=test-payment

AI checks: playwright-cli list
Result: No active sessions

AI prints:
  ❌ No active browser sessions found.
  Open a browser first with: playwright-cli open https://your-url

Execution stops
```

### Browser Failed to Open

**Error:** Browser opening failed or not running after STEP 4

**Handling:**
- BASH: `playwright-cli list`
- Parse output to verify at least one session with status "running"
- If NO running browser session found:
  - FAIL with error: "Browser failed to open. Cannot proceed with locator capture."
  - STOP execution

**Example:**
```
STEP 4: Open browser
BASH: playwright-cli open https://example.com --headed &
BASH: playwright-cli resize 1920 1080
WAIT 5-10 seconds

STEP 4.1: Verify browser running
BASH: playwright-cli list
Result: No running sessions

AI prints:
  ❌ Browser failed to open. Cannot proceed with locator capture.

Execution stops
```

## Network Capture Errors

### Network Capture Initialization Fails

**Error:** `playwright-cli run-code` fails during network capture initialization

**Handling:**
- Log warning: "Network capture unavailable - {error}"
- Continue execution (non-fatal)
- Locator capture proceeds without network data

**Example:**
```
STEP 5: Initialize network capture
BASH: playwright-cli -s=session-1 run-code "async page => { ... }"
Result: Command failed

AI logs: "Network capture unavailable - timeout"

Continue to STEP 5.1 (capture page)
Result: locators.md generated, but network-calls.json will be empty
```

### Network Capture Collection Fails

**Error:** `playwright-cli run-code` fails during network data collection

**Handling:**
- Log warning: "Network collection failed - {error}"
- Continue execution (non-fatal)
- Set NETWORK_CALLS = [], CAPTURE_START_TIME = Date.now(), PAGE_URL = {URL}
- Write empty network-calls.json

**Example:**
```
STEP 9: Collect network data
BASH: playwright-cli -s=session-1 run-code "async page => { ... }"
Result: Command failed

AI logs: "Network collection failed - page context lost"

Continue with empty network data
Result: network-calls.json created with empty calls array
```

## File Write Errors

### Locators File Write Fails

**Error:** Cannot write `locators.md`

**Handling:**
- Log error: "Failed to write locators.md: {error}"
- Continue execution (non-fatal)
- Attempt to write other files

**Example:**
```
STEP 9: Write locators.md
Result: Permission denied

AI logs: "Failed to write locators.md: Permission denied"

Continue to write other files (aria-snapshot.yaml, screenshot-{timestamp}.png, etc.)
```

### Network Calls File Write Fails

**Error:** Cannot write `network-calls.json`

**Handling:**
- Log error: "Failed to write network-calls.json: {error}"
- Continue execution (non-fatal)
- Other files already written

**Example:**
```
STEP 9: Write network-calls.json
Result: Disk full

AI logs: "Failed to write network-calls.json: No space left on device"

Execution continues
Result: locators.md, aria-snapshot.yaml, screenshot-{timestamp}.png written successfully
```

## Recovery Strategies

### Retry on Transient Failures

For transient errors (timeouts, temporary network issues):
1. Log warning
2. Retry once
3. If still fails: continue (non-fatal) or fail (critical)

### Graceful Degradation

For non-critical failures:
- Network capture fails → continue without network data
- File write fails → continue with other files
- Schema detection fails → continue with basic network data

### User Guidance

For user-fixable errors:
- Provide clear error message
- Suggest fix
- Example: "No active browser sessions found. Open a browser first with: playwright-cli open https://your-url"

## Error Messages

### Critical Errors (Stop Execution)

```
❌ Browser failed to open. Cannot proceed with locator capture.
❌ No active browser sessions found.
❌ Task {task-id} not found and user chose not to create it.
```

### Warnings (Continue Execution)

```
⚠️ Network capture unavailable - {error}
⚠️ Network collection failed - {error}
⚠️ Failed to write network-calls.json: {error}
```

### Info Messages

```
ℹ️ Using session: {session-name}
ℹ️ Browser kept alive. Use: /qakit:playwright:capture --session --task={task-id}
```

## Testing Error Scenarios

### Test Missing Task ID
```bash
/qakit:playwright:capture https://example.com
# Should ask for task-id
```

### Test Missing URL
```bash
/qakit:playwright:capture --task=test-login
# Should ask for URL
```

### Test No Active Sessions
```bash
/qakit:playwright:capture --session --task=test-payment
# Should fail with "No active browser sessions found"
```

### Test Browser Failure
```bash
# Close all browsers before running
/qakit:playwright:capture https://example.com --task=test-login
# Should fail with "Browser failed to open"
```

## Best Practices

1. **Fail fast on critical errors** - Stop execution immediately
2. **Continue on non-critical errors** - Graceful degradation
3. **Provide clear error messages** - Help users understand what went wrong
4. **Suggest fixes** - Guide users to resolution
5. **Log warnings** - Track non-fatal issues
6. **Test error scenarios** - Ensure error handling works
