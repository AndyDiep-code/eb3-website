# Browser Session Guide

Guide for managing browser sessions with Playwright CLI.

## Overview

Browser sessions are managed using `playwright-cli` commands. This guide covers:
- Checking active sessions
- Opening new sessions
- Selecting sessions
- Closing sessions
- Session state management

## Checking Active Sessions

### List All Sessions

```bash
playwright-cli list
```

**Output:**
```
session-1 (running)
session-2 (running)
session-3 (stopped)
```

**Parsing:**
- Extract session names
- Check status (running, stopped)
- Count active sessions

## Opening Sessions

### Open New Browser Session

```bash
playwright-cli open {URL} --headed &
```

**Parameters:**
- `{URL}` - Starting URL (e.g., https://example.com)
- `--headed` - Show browser window (required for locator capture)
- `&` - Run in background

**Example:**
```bash
playwright-cli open https://example.com/login --headed &
```

### Resize Browser Window

```bash
playwright-cli resize 1920 1080
```

**Parameters:**
- `1920` - Width in pixels
- `1080` - Height in pixels

**Standard sizes:**
- 1920x1080 - Full HD (recommended)
- 1366x768 - HD
- 1024x768 - XGA

## Session Selection

### Single Active Session

If only one session is running:
- Use automatically
- No user interaction needed

**Example:**
```bash
playwright-cli list
# Output: session-1 (running)

# Use session-1 automatically
playwright-cli -s=session-1 snapshot
```

### Multiple Active Sessions

If multiple sessions are running:
- Ask user which to use
- Use AskUserQuestion with session list

**Example:**
```bash
playwright-cli list
# Output:
# session-1 (running)
# session-2 (running)
# session-3 (running)

# Ask user:
# "Which browser session to capture?"
# Options: "session-1", "session-2", "session-3"

# User selects: "session-2"
# Use session-2
playwright-cli -s=session-2 snapshot
```

### No Active Sessions

If no sessions are running:
- Fail with helpful message
- Suggest opening browser first

**Example:**
```bash
playwright-cli list
# Output: (empty)

# Print error:
# ❌ No active browser sessions found.
# Open a browser first with: playwright-cli open https://your-url

# Stop execution
```

## Session Operations

### Run Code in Session

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => { ... }"
```

**Parameters:**
- `-s={SESSION_NAME}` - Session to use
- `"async page => { ... }"` - JavaScript code to run

**Example:**
```bash
playwright-cli -s=session-1 run-code "async page => {
  return document.title;
}"
```

### Take Screenshot

```bash
playwright-cli -s={SESSION_NAME} screenshot --filename={PATH}
```

**Example:**
```bash
playwright-cli -s=session-1 screenshot --filename=./screenshot-temp.png  # use timestamp when copying to final location
```

### Take Snapshot

```bash
playwright-cli -s={SESSION_NAME} snapshot --filename={PATH}
```

**Example:**
```bash
playwright-cli -s=session-1 snapshot --filename=./aria-snapshot.yaml
```

### Evaluate JavaScript

```bash
playwright-cli -s={SESSION_NAME} eval "{CODE}"
```

**Example:**
```bash
playwright-cli -s=session-1 eval "document.title"
playwright-cli -s=session-1 eval "window.location.href"
```

## Closing Sessions

### Close Specific Session

```bash
playwright-cli close
```

**Note:** Closes the current/default session

### Close All Sessions

```bash
playwright-cli close-all
```

**Warning:** Closes all browser windows

### Kill All Processes

```bash
playwright-cli kill-all
```

**Warning:** Forcefully terminates all browser processes

## Session State Management

### Save Session State

```bash
playwright-cli state-save {FILENAME}
```

**Example:**
```bash
playwright-cli state-save auth.json
```

### Load Session State

```bash
playwright-cli state-load {FILENAME}
```

**Example:**
```bash
playwright-cli state-load auth.json
```

## Best Practices

1. **Use headed mode** - Always use `--headed` for locator capture
2. **Standard resolution** - Use 1920x1080 for consistent captures
3. **Check sessions first** - Always list sessions before operating
4. **Handle multiple sessions** - Ask user if multiple sessions exist
5. **Provide helpful errors** - Guide users to open browser if needed
6. **Keep browser open** - Don't close between captures in --session mode
7. **Reset state** - Reset capture state after collection

## Error Scenarios

### Browser Not Running

**Scenario:** User runs --session mode but no browser is open

**Handling:**
```bash
playwright-cli list
# Output: (empty)

# Print error:
# ❌ No active browser sessions found.
# Open a browser first with: playwright-cli open https://your-url

# Stop execution
```

### Session Becomes Inactive

**Scenario:** Session was running but becomes inactive

**Handling:**
- Check session status: `playwright-cli list`
- If status is "stopped": Fail with message
- If session missing: Fail with message
- Suggest reopening browser

### Multiple Sessions Ambiguity

**Scenario:** Multiple sessions running, user doesn't know which to use

**Handling:**
- List all sessions with status
- Ask user to select
- Provide clear options
- Use selected session

## Troubleshooting

### Session Not Responding

**Problem:** Session exists but commands fail

**Solution:**
1. Check session status: `playwright-cli list`
2. If stopped: Close and reopen
3. If running: Try simple command first (e.g., `eval "1+1"`)
4. If still fails: Kill all and restart

### Browser Window Not Visible

**Problem:** Browser opened but window not visible

**Solution:**
1. Check if `--headed` flag was used
2. Reopen with `--headed`: `playwright-cli open {URL} --headed &`
3. Check screen resolution
4. Try resizing: `playwright-cli resize 1920 1080`

### Session Timeout

**Problem:** Session becomes inactive after inactivity

**Solution:**
1. Keep browser active (user interaction)
2. Use --session mode for continuous capture
3. Don't close browser between captures
4. Reopen if session times out

## Advanced Usage

### Named Sessions

```bash
playwright-cli -s=my-session open https://example.com --headed &
playwright-cli -s=my-session snapshot
playwright-cli -s=my-session close
```

### Persistent Profile

```bash
playwright-cli open https://example.com --persistent --profile=/path/to/profile
```

### Multiple Browsers

```bash
# Chrome
playwright-cli open https://example.com --browser=chrome --headed &

# Firefox
playwright-cli open https://example.com --browser=firefox --headed &

# WebKit
playwright-cli open https://example.com --browser=webkit --headed &
```

## Summary

Browser session management is essential for:
- Locator capture (SIMPLE, INTERACTIVE, SESSION modes)
- Network capture (parallel background)
- Multi-page workflows
- Continuous testing

Key commands:
- `playwright-cli list` - Check sessions
- `playwright-cli open {URL} --headed &` - Open browser
- `playwright-cli -s={SESSION} {COMMAND}` - Run command in session
- `playwright-cli close` - Close session
