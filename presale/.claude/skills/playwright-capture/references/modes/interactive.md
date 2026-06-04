# INTERACTIVE MODE - Multi-Page User-Guided Capture

> ⛔ **NETWORK CAPTURE IS DISABLED** — Skip all network-related steps and network initialization commands. Do NOT write `network-calls.json`. See SKILL.md Global Policies.

Capture multiple pages using a user-guided workflow where the user controls navigation and the system captures locators and snapshots.

**🔗 INTEGRATES WITH: `playwright-cli` Skill** ← For actual browser operations

## Overview

Use this mode when the user wants to capture multiple pages in a flow. The user performs all interactions (clicks, form inputs, navigation), and the system observes and captures page artifacts after each step.

**Browser Automation Approach:**

- Browser is opened via: `playwright-cli open --headed {URL}`
- Network capture uses: browser session auto-monitoring
- Page snapshots via: `playwright-cli snapshot`
- Screenshots via: `playwright-cli screenshot`

---

## Terminal Output Standards

Define these color variables at the start of ALL bash execution in this mode:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║ Playwright Locators — Interactive    ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
# Before running commands
echo -e "${YELLOW}⏳ [STEP X] Step description...${NC}"

# After success
echo -e "${GREEN}✅ [STEP X] Step description${NC}"

# On failure — print then stop
echo -e "${RED}❌ [STEP X] Step description — FAILED${NC}"

# Info/secondary messages (e.g. per-page progress in the loop)
echo -e "${GRAY}   ℹ  Additional info${NC}"
```

Note: Interactive mode uses a dynamic loop (STEP 6) — use `[STEP 6 — PageName]` format for per-page progress inside the loop.

At STEP 11, output the following as **Claude text response**:

```md
**🎉 Interactive capture complete**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Pages captured** | {PAGE_COUNT} |
| **Network** | `network-calls.json` (aggregated from all pages) |
| **Output** | `./test-tasks/playwright/{TASK_ID}/locators/` |

→ **Next:** `/qakit:playwright:test-cases --task={TASK_ID}`
```

---

## ⛔ CRITICAL ENFORCEMENT PROTOCOL

**THIS APPLIES TO ALL STEPS - NO EXCEPTIONS**

### Gate Definition

| Gate | Action | Violation |
|------|--------|-----------|
| **Output Gate** | Agent outputs plan/understanding for current step BEFORE any execution | STOP immediately, ask user for clarification |
| **Confirmation Gate** | Agent waits for explicit user response `✓ Proceed` before executing | STOP, cannot skip, must block |
| **Execution Gate** | Agent executes ONLY after both gates passed | Re-read gates, output plan again, wait confirmation |

### Mandatory Checklist (Apply to Every Step)

```ini
STEP X EXECUTION CHECKLIST:
☐ Understand what this step does
☐ Output the plan to user (what will happen, expected outcome, verification method)
☐ STOP and wait for user confirmation (✓ Proceed)
☐ FORBIDDEN: Do not execute, read ahead, or guess
☐ Execute ONLY after confirmation received
☐ Verify step completed successfully
```

### Critical Rules

1. **"Proceeding" means ONLY:**

   - User types `✓ Proceed` (or similar confirmation)
   - NOT: reading the next section, thinking about next step, or partial execution

2. **Violations trigger STOP:**

   - If agent proceeds without confirmation → **STOP**
   - Ask user: "I jumped ahead. Ready for me to execute STEP X properly?"
   - Restart from Output Gate

3. **No shortcuts:**

   - ❌ "This step is obvious, just do it"
   - ❌ "User probably meant Proceed"
   - ❌ "I'll output the plan while executing"
   - ✅ Output → Wait → Execute (always, every time)

4. **When a step is unclear — STOP, do NOT improvise:**

   - ❌ "I'll try something similar"
   - ❌ "I'll use a different command that might work"
   - ❌ "I'll skip this step and continue"
   - ✅ STOP immediately and ask the user: "STEP X is unclear to me. Can you clarify what I should do?"
   - **NEVER substitute an undocumented approach** when the spec step is ambiguous

---

## ⛔ NO ASSUMPTIONS ENFORCEMENT (Critical for Locators Generation)

**THIS APPLIES TO ALL ARTIFACT GENERATION - NO EXCEPTIONS**

### Core Rule

When generating any artifact (locators.md, network-calls.json, etc.), **read the source data first, then output only what is there.** No assumptions, no inferred data, no pattern-matching.

### Locators Generation — Artifact-First Protocol

**BEFORE generating locators.md:**

1. **READ** `aria-snapshot.yaml` (the captured source of truth)
2. **EXTRACT** each element from the snapshot structure
3. **GENERATE** one locator entry per element found
4. **STOP** — do NOT add anything beyond what the snapshot contains

**FORBIDDEN:**

- ❌ Assuming typical form fields exist (email, password, submit button, etc.)
- ❌ Inferring page structure from past experience or common patterns
- ❌ Adding elements not listed in aria-snapshot.yaml
- ❌ Fabricating locators for "standard" login page elements

**REQUIRED:**

- ✅ Read aria-snapshot.yaml first
- ✅ Count elements in snapshot
- ✅ Generate exactly that many locator entries
- ✅ Match each entry to a reference ID (e10, e11, etc.) from snapshot
- ✅ Include source file citation in comments or metadata

### Verification Checklist

After generating locators.md:

```sh
LOCATORS GENERATION CHECKLIST:
☐ I read aria-snapshot.yaml completely before generating anything
☐ I counted the total elements in the snapshot (images, buttons, headings, etc.)
☐ I generated one locator entry for each snapshot element
☐ Every entry has a reference ID matching the snapshot (e8, e9, e10, e11, etc.)
☐ I did NOT add any elements beyond what the snapshot shows
☐ I verified: element count in snapshot == element count in locators.md
```

### Example: OAuth-Only Login Page

**Snapshot shows:**

- 2 images (e8, e9)
- 1 heading (e10)
- 1 button (e11)
   Total: 4 elements

**Correct locators.md:**

- Heading entry
- Button entry
- Image entry (e8)
- Image entry (e9)
   Total: 4 entries ✅

**Incorrect (FORBIDDEN):**

- Email input (not in snapshot) ❌
- Password input (not in snapshot) ❌
- Forgot password link (not in snapshot) ❌
- Sign in button (not in snapshot) ❌
   Total: 8 entries (4 real + 4 fabricated) ❌

### Why This Matters

**Past Error:** Generated 5 fabricated locators for OAuth-only login page that has only 4 elements. Source of truth (aria-snapshot.yaml) was ignored. User caught error visually.

**Root Cause:** Assumed typical login form structure without reading captured data.

**Prevention:** Always read snapshot first. Only generate from what you read. Never assume.

---

## TAB SWITCHING (Multi-Tab Navigation)

When a new tab opens (OAuth redirect, link with `target=_blank`), use __option (5) in the capture loop__ to switch Playwright context to the new tab.

See: [Section 6.10: Switch to Another Tab](#610-switch-to-another-tab) for the complete sub-flow.

For technical details on detecting tabs, switching context, and cross-origin behavior, see: [Tab Switching Guide](../tab-switching-guide.md)

---

## ⛔ ALLOWED COMMANDS (Whitelist)

**ONLY these commands are permitted during capture. ANY other command requires explicit user approval.**

| Command | Allowed Usage |
|---------|--------------|
| `playwright-cli open --headed {URL}` | STEP 3: Open browser |
| `playwright-cli list` | STEP 4: Discover active sessions |
| `playwright-cli snapshot` | STEP 6: Capture ARIA snapshot |
| `playwright-cli screenshot` | STEP 6: Capture page screenshot |
| `playwright-cli -s={SESSION} run-code "..."` | STEP 5: Network capture init; STEP 7: Collect data |
| `playwright-cli -s={SESSION} fill '...' '...'` | STEP 6 form interaction only |
| `playwright-cli -s={SESSION} click '...'` | STEP 6 form interaction only |

**⛔ FORBIDDEN without user approval:**

- `playwright-cli cdp` — NOT in scope, provides no capture value
- `playwright-cli codegen` — NOT in scope for this mode
- Any external tool not listed above (curl, wget, browser extensions, etc.)
- Any port-opening or monitoring commands not in the spec

**If a command is not on this whitelist:** STOP and ask the user before executing.

---

## MANDATORY SPEC SUMMARY

**Before proceeding with ANY execution, the Agent MUST:**

1. **Output complete understanding:**

   - Task ID: `{value}`
   - Starting URL: `{value}`
   - Mode: Interactive (multi-page user-guided)
   - Expected browser behavior: Open in headed mode on localhost
   - User role: Controls all navigation; system only captures
   - Capture flow: Ask what to do (loop) → If capture: ask name → capture → validate → back to loop

2. **Verify each requirement:**

   - [ ] Task ID resolved
   - [ ] URL resolved
   - [ ] Browser can be opened in headed mode
   - [ ] Network capture initialized
   - [ ] Output paths prepared

3. **Wait for user confirmation:**

   - Print: `Ready to begin interactive capture? (Type: ✓ Proceed when ready)`
   - Do NOT proceed until user responds with explicit confirmation
   - If no confirmation → stop

---

## Key Principle

The system must NOT interact with the webpage.

- The user controls all navigation and interactions
- The system only observes and captures
- The system prompts the user when capture is needed

---

## 🔗 Skill Dependencies

**REQUIRED SKILL:** `playwright-cli`

- Used for: Opening, controlling, and capturing from browser
- Install: `npm install -g @playwright/cli@latest`
- Reference: [playwright-cli Skill](/.claude/skills/playwright-cli/SKILL.md)

Browser operations in this mode use `playwright-cli` commands:

- `playwright-cli open --headed {URL}` → Open browser in headed mode
   - **Auto-loads `.playwright/cli.config.json`** from working directory
   - Config applies `--force-renderer-accessibility` flag automatically
   - No explicit path needed — Playwright CLI discovers it

- `playwright-cli list` → Discover active browser sessions
- `playwright-cli snapshot -s={SESSION_NAME}` → Capture ARIA snapshot + element refs
- `playwright-cli screenshot -s={SESSION_NAME}` → Capture page screenshot

## Step-by-Step Process

### STEP 1: Resolve Required Input

**STEP 1 EXECUTION CHECKLIST:**

```sh
☐ Understand: Collect required inputs (TASK_ID and URL) from command arguments or user
☐ Output plan (below)
☐ STOP and wait for user confirmation if inputs missing
☐ Execute input resolution
☐ Verify both TASK_ID and URL are captured
```

#### STEP 1 EXECUTION PLAN (output this to user):

```html
STEP 1: Resolve Required Input

Purpose: Capture task ID and starting URL
Required: TASK_ID (e.g., test-checkout), URL (e.g., https://example.com)
Method:
  - Extract from arguments: --task={task-id}
  - If missing, ask user interactively
  - Validate both are provided before proceeding
Next: Initialize paths with captured TASK_ID
```

**Input resolution:**

- Check for `--task={task-id}` in arguments
   - If present: Store as `TASK_ID`
   - If missing: Ask user `Please provide a unique Task ID (e.g., test-checkout):`

- Check for URL in arguments or context
   - If present: Store as `URL`
   - If missing: Ask user `Please provide the starting URL (e.g., https://example.com):`

- If either `TASK_ID` or `URL` is not provided → STOP and report to user

#### Execution (ONLY after both inputs confirmed)

- Store resolved `TASK_ID`
- Store resolved `URL`

__⚠️ TASK_ID VALIDATION (REQUIRED):__

Before proceeding, validate that the task already exists:

```bash
GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
TASK_ROOT="${GIT_ROOT}/test-tasks/playwright/${TASK_ID}"
[ -d "${TASK_ROOT}" ] && echo "exists" || echo "not_found"
```

- If `exists` → proceed normally (TASK_ROOT is confirmed — STEP 2 will only create the `locators/` subfolder inside it)

- If `not_found` → __STOP. Do NOT create new folder.__ Print error:

```sh
❌ Task '{TASK_ID}' not found at ./test-tasks/playwright/{TASK_ID}/

Available tasks:
$(ls ./test-tasks/playwright/ 2>/dev/null | grep -v qakit.config.json)

Did you mean one of these? Please re-run with the correct --task-id.
```

Then ask user to provide the correct task ID via AskUserQuestion before continuing.

- Status: "Inputs resolved: TASK_ID={TASK_ID}, URL={URL}"

---

### STEP 2: Initialize Paths

**STEP 2 EXECUTION CHECKLIST:**

```ini
☐ Understand: Create task directory structure based on TASK_ID
☐ Output plan (below)
☐ STOP and wait for user confirmation
☐ Execute directory creation
☐ Verify directories exist and are writable
```

#### STEP 2 EXECUTION PLAN (output this to user):

```md
STEP 2: Initialize Paths

Purpose: Create locators/ subfolder inside existing task directory
Paths:
  TASK_ROOT: ./test-tasks/playwright/{TASK_ID}  (already validated in STEP 1 — do NOT create)
  LOCATORS_ROOT: ./test-tasks/playwright/{TASK_ID}/locators
Action: Create locators/ subfolder if it doesn't exist (TASK_ROOT must already exist)
Verification: Both paths exist and are writable
Next: Open browser in STEP 3
```

**Wait for confirmation:**

- Print: `About to create task directories at ./test-tasks/playwright/{TASK_ID}/. Ready? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → STOP

#### Execution (ONLY after confirmation received)

- Set: `TASK_ROOT=./test-tasks/playwright/{TASK_ID}`
- Set: `LOCATORS_ROOT={TASK_ROOT}/locators`
- Verify: `{TASK_ROOT}` exists (already validated in STEP 1 — do NOT create it here)
- Create directory: `{LOCATORS_ROOT}` (if not exists)
- Verify: Both directories exist and are writable
- Status: "Paths initialized: TASK_ROOT={TASK_ROOT}, LOCATORS_ROOT={LOCATORS_ROOT}"
- If creation fails → STOP and report error to user

---

### STEP 3: Open Browser

**STEP 3 EXECUTION CHECKLIST:**

```ini
☐ Understand: Opening browser at {URL} in headed mode for user interaction
☐ Output plan (below)
☐ STOP and wait for user: "About to open browser at {URL}. Ready? (Type: ✓ Proceed)"
☐ Do NOT proceed until user responds ✓
☐ Execute command
☐ Verify browser running
```

#### STEP 3 EXECUTION PLAN (output this to user):

```html
STEP 3: Open Browser at {URL}

Command:  playwright-cli open --headed {URL}
Expected: Browser window opens on your machine in headed mode
Your role: See and interact with browser
My role: Observe and capture when you ask
Verification: Browser running, page loaded, ready for interaction

⚠️  NOTE: Uses playwright-cli skill (browser automation CLI)
    Requires: npm install -g @playwright/cli@latest
```

**Wait for confirmation:**

- Print: `About to open browser at {URL}. Ready? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → STOP
- Any other input → ask for clarification

#### Execution (ONLY after confirmation received)

- Verify playwright-cli installed: `which playwright-cli`
- Run: `playwright-cli open --headed {URL}`
- Wait 3 seconds for browser to initialize
- Verify: Browser window visible on user's screen
- Status: "Browser ready for your interaction"
- If failed: Check if `npm install -g @playwright/cli@latest` completed

---

### STEP 4: Verify Browser Session

**STEP 4 EXECUTION CHECKLIST:**

```ini
☐ Understand: Verify browser session is discoverable by CLI
☐ Output plan (below)
☐ STOP and wait for user: "Ready to verify browser session? (Type: ✓ Proceed)"
☐ Do NOT proceed until confirmed
☐ Execute verification command
☐ Verify session found
```

#### STEP 4 EXECUTION PLAN (output this to user):

```html
STEP 4: Verify Browser Session

Command:  playwright-cli list
Expected: At least one browser session detected
Outcome:  Store session reference for next steps
Next:     Proceed to STEP 5 (initialize network capture)

Uses: playwright-cli skill (discovery/listing active sessions)
```

**Wait for confirmation:**

- Print: `Ready to verify browser session is running? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → STOP

#### Execution (ONLY after confirmation received)

- Run: `playwright-cli list`
- Parse output to find active session(s)
- Store session reference for later use
- Success: "Session(s) detected: {list}"
- Failure: STOP and report to user
- If no session found: Ask user to confirm browser is open on their screen

---

### STEP 4.5: Detect and Handle Flutter Web

**STEP 4.5 EXECUTION CHECKLIST:**

```ini
☐ Understand: Auto-detect if app is Flutter Web (CanvasKit renderer)
☐ Output plan (below)
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute detection ONLY after confirmation
☐ If Flutter detected: auto-enable accessibility, wait for semantic overlay
☐ Verify: ARIA elements available after enabling
```

**STEP 4.5 EXECUTION PLAN (output this to user):**

```md
STEP 4.5: Detect and Handle Flutter Web
Goal: Check if app is Flutter Web; enable accessibility if so
What will happen:
  - Check DOM for Flutter Web markers (flt-glass-pane, flt-semantics-host, window._flutter)
  - If Flutter detected: trigger "Enable accessibility" button via JavaScript keyboard event
  - Wait 2s for semantic overlay to render
  - Verify ARIA elements are now available
Expected: Full ARIA element tree available for capture
How I'll verify: ARIA snapshot returns more than 5 semantic elements after enabling
Skip condition: If NOT Flutter, this step is a no-op — proceed immediately
Note: Button is Flutter semantic placeholder at (-1, -1) — requires JS event dispatch, not Playwright click()
```

**Wait for confirmation:**

- Print: `Ready to check for Flutter Web? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → STOP

**Actions (ONLY after confirmation):**

Run detection:

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => {
  const isFlutter = await page.evaluate(() => {
    return !!(document.querySelector('flt-glass-pane') ||
              document.querySelector('flt-semantics-host') ||
              window._flutter);
  });
  return isFlutter ? 'flutter' : 'standard';
}"
```

**If result = `standard`:**

- Print: `✅ Standard web app — no Flutter accessibility setup needed`
- Proceed to STEP 5

**If result = `flutter`:**

- Print: `⚠️ Flutter Web detected (CanvasKit renderer)`
- Print: `🔧 Enabling accessibility mode...`
- Trigger "Enable accessibility" button via JavaScript keyboard event (button is Flutter semantic placeholder, not clickable):

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => {
  const result = await page.evaluate(() => {
    // Button is Flutter semantic placeholder with aria-label, positioned at (-1, -1)
    const button = document.querySelector('[aria-label=\"Enable accessibility\"]');
    if (!button) return 'button_not_found';
    
    // Trigger via keyboard events (Playwright click() fails on off-canvas elements)
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    button.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
    return 'triggered';
  });
  
  if (result === 'triggered') {
    await page.waitForTimeout(2000);
    // Verify semantics are available after enabling
    const semanticsCount = await page.evaluate(() => {
      return document.querySelectorAll('[role]').length;
    });
    return semanticsCount > 0 ? 'enabled' : 'enabled_but_no_semantics';
  }
  return result;
}"
```

**Why JavaScript event dispatch:** Flutter Web renders UI on canvas, not HTML. The "Enable accessibility" button is a semantic placeholder (no visible element) positioned off-viewport at (-1, -1). Traditional Playwright click() methods fail because they require scrolling element into view. JavaScript keyboard event dispatch directly triggers the accessibility system without viewport constraints.

- If result = `enabled` or `enabled_but_no_semantics`:

- Print: `✅ Accessibility enabled — semantic overlay rendered`

- **Wait for Flutter semantic tree to stabilize** (required for Flutter Web):

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => {
  // Wait up to 5s for accessibility tree to fully populate
  for (let i = 0; i < 50; i++) {
    const count = await page.evaluate(() => document.querySelectorAll('[role]').length);
    if (count > 5) return 'stable'; // Heuristic: 5+ semantic elements = stable
    await page.waitForTimeout(100);
  }
  return 'timeout_but_continuing';
}"
```

- Proceed to STEP 5

- If result = `button_not_found`:
   - Print: `⚠️ "Enable accessibility" button not found — may already be active`
   - Continue to STEP 5 (non-fatal)

- If command fails entirely:
   - Log warning: `Flutter accessibility setup failed, continuing`
   - Continue to STEP 5 (non-fatal)

### ~~STEP 5: Initialize Network Capture~~ — ⛔ DISABLED — SKIP THIS ENTIRE STEP

**STEP 5 EXECUTION CHECKLIST:**

```ini
☐ Understand: Enable network request/response capture for active browser session
☐ Output plan (below)
☐ STOP and wait for user confirmation
☐ Execute network capture initialization
☐ Verify capture is active (or already was active)
```

#### STEP 5 EXECUTION PLAN (output this to user):

```rb
STEP 5: Initialize Network Capture

Purpose: Capture all network requests/responses during page navigation
Target: Active browser session {SESSION_NAME}
Expected: Network capture initialized or already active
Outcome: All subsequent HTTP calls will be recorded
Next: Begin interactive capture loop
```

**Wait for confirmation:**

- Print: `Ready to start network capture for session {SESSION_NAME}? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → STOP

#### Execution (ONLY after confirmation received)

**Command to initialize network capture:**

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => {
  /* Guard: only install once per session to avoid duplicate listeners */
  if (page._qakitNetworkCapture) return 'already_initialized';

  page._qakitNetworkCapture = { calls: [], sequence: 0, startTime: Date.now() };

  /* ── FILTER UTILITIES (compiled once, reused per event) ──────── */
  const MAX_BODY_BYTES = 100 * 1024;  // 100KB limit per body
  const STATIC_ASSET_PATTERN = /\.(png|jpg|jpeg|gif|webp|svg|ico|css|woff|woff2|ttf|otf|eot|map)(\?[^#]*)?$/i;
  const MINIFIED_BUNDLE_PATTERN = /\.(min\.(js|css)|chunk\.js|bundle\.js|vendors(\.[a-z0-9]+)?\.js)(\?[^#]*)?$/i;
  const EXCLUDED_PATH_PATTERN = /\/(favicon\.ico|health|healthz|ready|ping|status\/health)(\/|\?|$)/i;

  function sanitizeHeaders(headers) {
    const SENSITIVE_HEADERS = /^(authorization|cookie|set-cookie|x-api-key|x-auth-token|x-access-token|x-secret-key|api-key|x-csrf-token)$/i;
    const sanitized = {};
    for (const [key, value] of Object.entries(headers || {})) {
      sanitized[key] = SENSITIVE_HEADERS.test(key) ? '[REDACTED]' : value;
    }
    return sanitized;
  }

  function capBodySize(body) {
    if (!body) return body;
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
    if (bodyStr.length > MAX_BODY_BYTES) {
      return bodyStr.substring(0, MAX_BODY_BYTES) + '\n...[TRUNCATED - body exceeded 100KB limit]';
    }
    return body;
  }

  function shouldCaptureNetworkCall(url, status) {
    if (status == null || status < 200) return false;
    if (status >= 600) return false;
    if (STATIC_ASSET_PATTERN.test(url)) return false;
    if (MINIFIED_BUNDLE_PATTERN.test(url)) return false;
    if (EXCLUDED_PATH_PATTERN.test(url)) return false;
    return true;
  }

  /* Attach response listener - fires for every HTTP response the page receives */
  page.on('response', async (response) => {
    const request = response.request();
    const startTime = request.timing().startTime;
    const timing = response.timing?.();
    const finishTime = timing?.responseEnd > 0 ? timing.responseEnd : (Date.now() - page._qakitNetworkCapture.startTime);
    const durationMs = Math.round(finishTime - startTime);
    const captureStart = new Date(page._qakitNetworkCapture.startTime + startTime).toISOString();
    const url = request.url();
    const method = request.method().toUpperCase();
    const status = response.status();

    if (!shouldCaptureNetworkCall(url, status)) return;

    let requestBody = null;
    let responseBody = null;
    let captureError = null;

    try {
      if (['POST','PUT','PATCH','DELETE'].includes(method)) {
        const rawReqBody = request.postData();
        if (rawReqBody) {
          try { requestBody = JSON.parse(rawReqBody); }
          catch { requestBody = rawReqBody; }
        }
      }

      const contentType = (response.headers()['content-type'] || '');
      if (contentType.includes('application/json') || contentType.includes('text/')) {
        try {
          const rawText = await response.text();
          try { responseBody = JSON.parse(rawText); }
          catch { responseBody = rawText; }
        } catch {}
      }
    } catch (err) {
      captureError = err.message;
    }

    const record = {
      sequence: ++page._qakitNetworkCapture.sequence,
      method,
      url,
      status,
      statusText: response.statusText(),
      requestHeaders: sanitizeHeaders(request.headers()),
      requestBody: capBodySize(requestBody),
      responseHeaders: sanitizeHeaders(response.headers()),
      responseBody: capBodySize(responseBody),
      duration: durationMs,
      timestamp: captureStart,
      error: captureError
    };

    page._qakitNetworkCapture.calls.push(record);
  });

  return 'initialized';
}"
```

**Execution steps:**

1. Run command above
2. Accept both `initialized` and `already_initialized` as success
3. Log: "Network capture active"
4. ✅ **Network listener now runs in BACKGROUND during STEP 6** - accumulates all HTTP calls
5. If initialization fails:
   - Log warning: "Network capture initialization failed, continuing anyway"
   - Continue to next step (non-fatal error)

__Important:__ The network capture listener stays active throughout STEP 6 (interactive capture loop). While you capture pages, network calls are being recorded in `page._qakitNetworkCapture` (Node.js page context). At STEP 7, you'll collect and process this accumulated data.

---

## STEP 6: Interactive Capture Loop

**STEP 6 EXECUTION CHECKLIST (Loop):**

```ini
☐ Understand: Repeatedly ask user the SAME question at the start of every iteration
☐ Loop entry question (repeated identically every iteration):
     "What would you like to do?
      (1) Capture current page
      (2) Update existing page locators
      (3) Save authentication state
      (4) Finish capture
      (5) Switch to another tab"
☐ If (1): ask page name → capture artifacts → validate → back to loop entry
☐ If (2): ask which existing page → take snapshot → append ## State: section → back to loop entry
☐ If (3): execute STEP 6.9 (save auth state) → back to loop entry
☐ If (4): exit loop → proceed to STEP 7
☐ If (5): execute STEP 6.10 (switch tab) → back to loop entry
☐ The loop entry question is ALWAYS the same — never change its wording
```

#### STEP 6 EXECUTION PLAN (output this to user):

```ini
STEP 6: Interactive Capture Loop

⚡ **PARALLEL MODE ACTIVE:** Network capture is running in background
   → Every HTTP call during page navigation is being recorded
   → You focus on capturing UI locators; network data accumulates automatically

Purpose: Capture UI locators from multiple pages as user navigates
Uses: playwright-cli commands for capturing

Loop entry question (IDENTICAL every iteration):
  ┌─────────────────────────────────────────────────────┐
  │  What would you like to do?                         │
  │  (1) Capture current page                           │
  │  (2) Update existing page locators                  │
  │  (3) Save authentication state                      │
  │  (4) Finish capture                                 │
  │  (5) Switch to another tab                          │
  └─────────────────────────────────────────────────────┘

If (1) — Capture current page:
  1. Ask: "What is the name of this page? (e.g., LoginPage)"
  2. Execute capture commands (in the active browser session):
     - playwright-cli -s={SESSION_NAME} screenshot → {PAGE_NAME}/screenshot-{timestamp}.png
     - playwright-cli -s={SESSION_NAME} snapshot   → {PAGE_NAME}/aria-snapshot.yaml
     - Extract metadata & locators
  3. Generate locators.md with element refs
  4. VALIDATE all 4 files exist
     - If missing: Ask user to retry, skip, or stop
     - If complete: → return to loop entry question

If (2) — Update existing page locators:
  → Execute STEP 6.8 → return to loop entry question

If (3) — Save authentication state:
  → Execute STEP 6.9 → return to loop entry question

If (4) — Finish capture:
  → Exit loop → proceed to STEP 7

If (5) — Switch to another tab:
  → Execute STEP 6.10 → return to loop entry question

Output structure per page:
  {LOCATORS_ROOT}/{PAGE_NAME}/
    ├── screenshot-{timestamp}.png        (via playwright-cli screenshot)
    ├── aria-snapshot.yaml    (via playwright-cli snapshot)
    ├── metadata.json         (page title, url, timestamp)
    └── locators.md           (element refs + selectors)

⚠️  Key: All commands execute IN the active browser session
    established in STEP 3 via playwright-cli
```

---

### Loop Iteration Sequence

> ⚠️ **ENFORCEMENT: Section 6.0 MUST be executed via `AskUserQuestion` tool — never plain text, never skipped.**

**Each iteration always starts at 6.0 — the same question every time:**

```ini
6.0 → Loop entry: Ask "What would you like to do? (1/2/3/4/5)"
       ├─ (1) Capture page           → 6.1 → 6.2 → 6.3-6.6 → 6.7 → back to 6.0
       ├─ (2) Update existing page   → 6.8 → back to 6.0
       ├─ (3) Save auth              → 6.9 → back to 6.0
       ├─ (4) Finish                 → exit loop → STEP 7
       └─ (5) Switch tab             → 6.10 → back to 6.0
```

---

#### 6.0: Loop Entry — Ask What To Do

> ⛔ **MANDATORY — NON-NEGOTIABLE — APPLIES AFTER EVERY ACTION:**
> After EVERY completed option (1) capture, (2) update, OR (3) auth save, you MUST immediately return here and use the **`AskUserQuestion` tool** with ALL 4 options below.
>
> - ❌ NEVER output a plain text table instead of AskUserQuestion
> - ❌ NEVER present fewer than 4 options
> - ❌ NEVER skip this step or assume what the user wants next
> - ❌ NEVER auto-proceed to another action without asking
> - ✅ ALWAYS block and wait for user response via AskUserQuestion tool
>
> **This is the most critical rule in Interactive Mode. Violating it = protocol failure.**

**This question is IDENTICAL every iteration. Do not rephrase it.**

```sh
What would you like to do?

  (1) Capture current page
  (2) Update existing page locators
  (3) Save authentication state
  (4) Finish capture
  (5) Switch to another tab

Enter choice (1, 2, 3, 4, or 5):
```

- If **(1)** → proceed to 6.1
- If **(2)** → proceed to 6.8 (update existing page), then return to 6.0
- If **(3)** → proceed to 6.9 (save auth state), then return to 6.0
- If **(4)** → exit loop, proceed to STEP 7
- If **(5)** → proceed to 6.10 (switch tab), then return to 6.0
- If no response / invalid → re-ask (same question)

---

#### 6.1: Resolve Page Name

*(Only reached after user chose option 1 at 6.0)*

**Action:**

- Ask user: `What is the name of this page? (e.g., LoginPage):`
- Store response as `PAGE_NAME`
- If no response provided → return to 6.0

**Normalization:**

- Create filesystem-safe version of `PAGE_NAME`
- Set: `PAGE_OUTPUT_PATH={LOCATORS_ROOT}/{PAGE_NAME}`
- Ensure directory exists: `{PAGE_OUTPUT_PATH}`

---

#### 6.2-6.5: Capture and Process Page Data

*(Renamed from 6.3-6.6 — now follows 6.1 page name resolution)*

**Wait for confirmation:**

- Print: `Ready to capture locators for "{PAGE_NAME}"? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute capture
- No response → STOP loop, proceed to STEP 7

**Capture (ONLY after confirmation received):**

**6.3: Capture Page Artifacts**

**Screenshot** — playwright-cli can only save files within its allowed roots (`tests/playwright/`).
Use this two-step approach every time.
**Naming rule:** Always use timestamp — never plain `screenshot.png`.

```bash
# Step A: save to allowed temp path
playwright-cli -s={SESSION} screenshot --filename="{PW_DIR}/screenshot-temp.png" --full-page

# Step B: copy to target with timestamp
TIMESTAMP=$(date -u +%Y%m%d-%H%M%S)
cp "{PW_DIR}/screenshot-temp.png" "{PAGE_OUTPUT_PATH}/screenshot-${TIMESTAMP}.png"
rm -f "{PW_DIR}/screenshot-temp.png"
```

Where `PW_DIR` = the playwright project root (e.g. `./tests/playwright`).

⚠️ **Common mistakes to avoid:**

- ❌ `playwright-cli screenshot /path/to/file.png` — positional arg is treated as CSS selector, NOT a path
- ❌ Saving directly to `test-tasks/` — outside allowed roots, will fail with "File access denied"
- ✅ Always use `--filename` flag + temp path + copy

**ARIA Snapshot:**

```bash
playwright-cli -s={SESSION} snapshot > "{PAGE_OUTPUT_PATH}/aria-snapshot.yaml"
```

- If any write fails → STOP and report error

**6.4: Capture Metadata**

- Extract: `PAGE_TITLE`, `PAGE_URL`
- Write: `{PAGE_OUTPUT_PATH}/metadata.json`
- If fails → STOP and report error

**6.5: Analyze ARIA Snapshot**

- Parse `aria-snapshot.yaml`
- For each element: extract role, accessible name, and properties (`/placeholder`, `/label`, `/value`, etc.)
- If parsing fails → STOP and report error

**6.6: Generate Locators**

⛔ **CRITICAL LOCATOR RULES — read before generating:**

- **NEVER use `[ref=eXX]` as a locator** — refs are internal playwright-cli IDs, NOT DOM attributes
- `page.locator('[ref=e11]')` will ALWAYS timeout in Playwright tests
- Follow Playwright priority order for **Primary Locator** (from https://playwright.dev/docs/locators):

| Priority | Method | Use when |
|----------|--------|----------|
| 1 | `getByRole(role, { name })` | Element has ARIA role + accessible name |
| 2 | `getByLabel('text')` | Form field with `/label` property |
| 3 | `getByPlaceholder('text')` | Input with `/placeholder` property |
| 4 | `getByText('text')` | Non-interactive text elements |
| 5 | `locator('#id')` | Stable HTML ID (not dynamically generated) |
| 6 | `locator('[attr=value]')` | Unique stable attribute |

- **Fallback Locator — ALWAYS XPath, ALWAYS required, NEVER use `—`**

Generate XPath from ARIA snapshot data:

| ARIA Role | XPath Template |
|-----------|----------------|
| `button` (with name) | `locator('xpath=//button[normalize-space()="{name}"]')` |
| `button` (icon-only, no name) | `locator('xpath=(//*[@role="button"])[{nth}]')` |
| `textbox` (with aria-label) | `locator('xpath=//input[@aria-label="{name}"]')` |
| `textbox` (with placeholder) | `locator('xpath=//input[@placeholder="{placeholder}"]')` |
| `combobox` | `locator('xpath=//input[@aria-label="{name}"]')` |
| `link` | `locator('xpath=//a[normalize-space()="{name}"]')` |
| `heading` | `locator('xpath=//*[@role="heading"][normalize-space()="{name}"]')` |
| `img` | `locator('xpath=//img[@alt="{name}"]')` |
| `checkbox` | `locator('xpath=//input[@type="checkbox"][@aria-label="{name}"]')` |
| `option` | `locator('xpath=//*[@role="option"][normalize-space()="{name}"]')` |
| `columnheader` | `locator('xpath=//th[normalize-space()="{name}"]')` |
| `listbox` | `locator('xpath=//*[@role="listbox"]')` |
| `generic` / `paragraph` | `locator('xpath=//*[normalize-space()="{text}"]')` |
| Any (positional fallback) | `locator('xpath=(//{tag})[{nth}]')` |

XPath rules: always `normalize-space()` for text • prefer `@aria-label` for form fields • double-quote attribute values • never use ref IDs (`eXX`)

For each extracted element:

- Generate meaningful camelCase name (e.g. `loginButton`, `emailInput`)
- Determine **Primary Locator** using priority order above
- Determine **Fallback Locator** — always XPath from rules above
- Record Role (from ARIA snapshot)
- Write description of what the element does

Table format for locators.md:

```ini
| Name | Role | Primary Locator | Fallback Locator | Description |
```

- Write: `{PAGE_OUTPUT_PATH}/locators.md`
- If write fails → STOP and report error

---

#### 6.6.5: Review Locators — User Approval Checkpoint ⚠️ **QUALITY GATE**

**Purpose:** Let user review generated locators BEFORE saving, catching incorrect selectors early.

> ⛔ **MANDATORY — NON-NEGOTIABLE:**
> This checkpoint MUST be presented via the **`AskUserQuestion` tool** — never as plain text.
>
> - ❌ NEVER output the locator table and auto-proceed to 6.7
> - ❌ NEVER skip this step even if locators look correct
> - ✅ ALWAYS block and wait for user response via AskUserQuestion tool
> - ✅ Present all 3 options: Approve / Edit / Skip

**Action:** Use `AskUserQuestion` tool to display a summary of generated locators and wait for user response:

```groovy
📋 Generated locators for "{PAGE_NAME}":

  | Name                     | Role    | Primary Locator                                        |
  |--------------------------|---------|--------------------------------------------------------|
  | loginWithMicrosoftButton | button  | getByRole('button', { name: 'Login with Microsoft' }) |
  | welcomeTextContainer     | generic | getByText('Welcome to Enoverse!')                     |
  | logoImagePrimary         | img     | locator('img').first()                                |

Are these locators correct?
  (1) ✅ Approve — save locators.md and continue
  (2) ✏️  Edit — I'll describe corrections and regenerate
  (3) ⏭️  Skip — save as-is and continue (review later)
```

**If (1) Approve:** Save locators.md → proceed to 6.7
**If (2) Edit:** User describes what's wrong → regenerate locators → show summary again
**If (3) Skip:** Save locators.md as-is → proceed to 6.7 (note: may contain incorrect selectors)

> ⚠️ **Why this matters:** Incorrect locators (especially `[ref=eXX]`) will cause TimeoutError in Playwright tests.
> Catching them here saves debugging time later.

---

#### 6.7: Validate Capture Completeness ⚠️ **NEW CHECKPOINT**

**Purpose:** Verify all expected files were generated successfully before proceeding

**Validation Check:**

- Check if file exists: `{PAGE_OUTPUT_PATH}/screenshot-{timestamp}.png`
- Check if file exists: `{PAGE_OUTPUT_PATH}/aria-snapshot.yaml`
- Check if file exists: `{PAGE_OUTPUT_PATH}/metadata.json`
- Check if file exists: `{PAGE_OUTPUT_PATH}/locators.md`

**If ALL files exist:**

- ✅ Print: `Capture complete for "{PAGE_NAME}" - all 4 files generated successfully`

**⚡ CHECKPOINT SAVE — Run this after EVERY successful page capture (before returning to 6.0):**

This protects against session loss (browser crash, OAuth redirect closing tabs, timeout).

```bash
# 1. Collect current network data from session
NETWORK=$(playwright-cli -s={SESSION_NAME} run-code "async page => {
  const data = page._qakitNetworkCapture;
  if (!data || data.calls.length === 0) return JSON.stringify({ callCount: 0, calls: [] });
  return JSON.stringify({ callCount: data.calls.length, calls: data.calls });
}" 2>/dev/null | grep -o '{.*}' | head -c 500000)

# 2. Write checkpoint file (overwrites previous checkpoint — always latest state)
echo "$NETWORK" > {LOCATORS_ROOT}/network-checkpoint.json

# 3. Log progress
CALL_COUNT=$(echo "$NETWORK" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('callCount',0))" 2>/dev/null || echo 0)
echo -e "${GRAY}   ℹ  Network checkpoint saved: ${CALL_COUNT} calls so far${NC}"
```

**When session ends normally (STEP 7):** Use `network-checkpoint.json` as the source — it has the latest data.
**When session ends unexpectedly:** `network-checkpoint.json` has data up to the last captured page — not complete, but not zero.

- Return to **6.0** (loop entry question)

**If ANY files missing:**

- ❌ Print: `⚠️ INCOMPLETE CAPTURE for "{PAGE_NAME}"`
- List missing files with full paths
- Offer user options:

```md
Detected missing files:
  - aria-snapshot.yaml (MISSING)
  - metadata.json (MISSING)

Options:
  1. Retry capture for this page (start from 6.2)
  2. Skip missing files and continue (proceed to next page)
  3. Stop and investigate (exit capture loop)

What would you like to do? (Enter 1, 2, or 3)
```

**Based on user choice:**

- **Option 1 (Retry):** Return to 6.1 (re-ask page name and restart artifact capture)
- **Option 2 (Skip):** Return to **6.0** (loop entry question, note incomplete capture in report)
- **Option 3 (Stop):** Exit loop immediately, proceed to STEP 7

---

#### 6.8: Update Existing Page Locators

**PURPOSE:**
Append new UI state to an existing page's `locators.md` as a `## State: [name]` section. Use this when the same page reveals additional elements through user interaction (progressive disclosure, dialogs with steps, toggled panels) — instead of creating a new page folder.

**EXECUTION CHECKLIST:**

```ini
☐ Understand: Append new state to EXISTING page's locators.md (no new folder)
☐ Ask user which existing page to update (show list)
☐ Ask user for the state name
☐ Take snapshot to capture new elements
☐ Diff snapshot against existing locators to extract only NEW elements
☐ Append ## State: section to locators.md
☐ Verify file updated
```

**Step 6.8.1: Select Existing Page**

Scan both sources and build a combined page list:

```bash
# Source A: pages already captured in this task's workspace
TASK_PAGES=$(ls -d {LOCATORS_ROOT}/*/ 2>/dev/null | xargs -I{} basename {} | sort)

# Source B: pages committed to repo as POMs (exclude base.page.ts)
REPO_PAGES=$(find tests/playwright/pages -name "*.page.ts" ! -name "base.page.ts" 2>/dev/null \
  | xargs -I{} grep -oP 'export class \K\w+(?=\s+extends\s+BasePage)' {} 2>/dev/null \
  | sort)

# Deduplicate: repo pages already seeded into task workspace are shown only under [task]
```

Display combined list to user:

```sh
Which existing page do you want to update?

[task] LoginPage           ← already captured/seeded in this task
[task] DashboardPage
[repo] CheckoutPage        ← exists in repo POM but not yet in this task workspace
[repo] ProfilePage

Enter page name (or number):
```

- If user selects `[task]` page:
  - `TARGET_PATH={LOCATORS_ROOT}/{TARGET_PAGE}` (folder already exists → proceed directly to 6.8.2)

- If user selects `[repo]` page:
  - Page not yet in task workspace → **seed stub first**:
    ```bash
    POM_FILE="tests/playwright/pages/{kebab-name}.page.ts"
    mkdir -p "{LOCATORS_ROOT}/{TARGET_PAGE}"

    # Extract getter names from POM
    GETTERS=$(grep -E "^\s+get [a-zA-Z]+" "$POM_FILE" | grep -oP "get \K\w+")

    # For each getter, read 2 lines after to get locator expression
    # Write locators.md stub with [seeded from repo POM] rows
    # Write metadata.json with { source: "repo-pom", captured: false }
    ```
  - Log: `ℹ  Seeded stub from repo POM: {TARGET_PAGE} ({N} locators)`
  - Set: `TARGET_PATH={LOCATORS_ROOT}/{TARGET_PAGE}`
  - Proceed to 6.8.2 with seeded stub as baseline

- Store as `TARGET_PAGE`
- If page not found in either source → print error, return to 6.0

**Step 6.8.2: Name the New State**

- Ask user:

```html
What is the name of this new state?
(Examples: "With dropdown open", "After form filled", "Error state")

Enter state name:
```

- Store as `STATE_NAME`

- If no response → return to 6.0

**Wait for confirmation:**

- Print: `Ready to capture new state "{STATE_NAME}" for {TARGET_PAGE}? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → return to 6.0

**Step 6.8.3: Capture Snapshot and Screenshot**

Compute a filesystem-safe slug from the state name:
```bash
STATE_SLUG=$(echo "{STATE_NAME}" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
# e.g. "With login button clicked" → "with-login-button-clicked"
TIMESTAMP=$(date -u +%Y%m%d-%H%M%S)
SNAPSHOT_FILE="{TARGET_PATH}/aria-snapshot-state-${STATE_SLUG}.yaml"
SCREENSHOT_FILE="{TARGET_PATH}/screenshot-state-${STATE_SLUG}-${TIMESTAMP}.png"
```

**Snapshot** — save to named file (NOT temp):
```bash
playwright-cli -s={SESSION_NAME} snapshot > "${SNAPSHOT_FILE}"
```

**Screenshot** — two-step via allowed temp path:
```bash
playwright-cli -s={SESSION} screenshot --filename="{PW_DIR}/screenshot-temp.png" --full-page
cp "{PW_DIR}/screenshot-temp.png" "${SCREENSHOT_FILE}"
rm -f "{PW_DIR}/screenshot-temp.png"
```

- Parse `${SNAPSHOT_FILE}` to extract elements
- Extract elements with `[ref=eXX]` or `[ref=fXX]`
- Load existing `{TARGET_PATH}/locators.md`
- Identify NEW refs not already documented in any existing `## State:` section

**Step 6.8.4: Append State Section**

- Append to `{TARGET_PATH}/locators.md`:

```markdown
---

## State: {STATE_NAME}

{Brief description of how to reach this state — e.g., "Click 'Thêm nội dung' to reveal content block"}


| Element | Ref | Selector | Type |
|---------|-----|----------|------|
| {name}  | {ref} | {selector} | {type} |
```

- Include ONLY elements that are NEW (not in prior states)
- Add a brief description explaining how to reach this state
- **If no new elements found** → do NOT write anything. Execute this flow instead:

  1. Print the diff result clearly:

     ```
     ℹ  No new elements detected for "{TARGET_PAGE}" — "{STATE_NAME}" state.

        All elements in the current snapshot already exist in locators.md:
          - {element1} (already documented)
          - {element2} (already documented)
          ...

        Possible reasons:
          - Page hasn't changed visually from the previous state
          - Target state hasn't been fully triggered yet (try interacting more before capturing)
          - Elements are dynamic and not in ARIA tree at capture time
     ```

  2. Use `AskUserQuestion`:

     ```
     header: "No New Elements"
     question: "No new elements found for \"{STATE_NAME}\". What do you want to do?"
     options:
       - label: "Back to capture loop"
         description: "No changes made. Return to main menu to try again or move on."
       - label: "Force write description-only state"
         description: "Append ## State: section with just a note — no element table. Useful to document that this state was checked."
     ```

  3. If user chooses **"Back to capture loop"**:
     - Do NOT write anything to `locators.md`
     - Return to **6.0** (loop entry question)

  4. If user chooses **"Force write description-only state"**:
     - Append to `{TARGET_PATH}/locators.md`:

       ```markdown
       ---

       ## State: {STATE_NAME}

       {STATE_NAME} — no new elements detected. All visible elements are already documented in the base state or prior states.
       ```

     - Proceed to **Step 6.8.5** (verify + return to 6.0)

**Step 6.8.5: Verify**

Confirm all 3 state artifacts exist:

```bash
[ -f "${SNAPSHOT_FILE}" ]  && echo "✅ aria-snapshot-state-${STATE_SLUG}.yaml"  || echo "❌ snapshot MISSING"
[ -f "${SCREENSHOT_FILE}" ] && echo "✅ screenshot-state-${STATE_SLUG}-*.png"   || echo "❌ screenshot MISSING"
[ -f "{TARGET_PATH}/locators.md" ] && echo "✅ locators.md updated"              || echo "❌ locators.md MISSING"
```

- If any file missing → report error, offer retry (return to 6.8.3) or skip
- If all present → Print: `✅ State "{STATE_NAME}" captured for {TARGET_PAGE} (snapshot + screenshot + locators.md)`
- Return to **6.0** (loop entry question)

**IMPORTANT NOTES:**

- No new folder is created — all states live in the SAME page folder
- **REQUIRED per state:** `aria-snapshot-state-{slug}.yaml` + `screenshot-state-{slug}-{timestamp}.png` (both saved in same page folder)
- Only NEW elements are added to `locators.md` — elements already in earlier states are NOT repeated
- Use `---` horizontal rule as separator between states for readability
- State files naming: slug = state name lowercased, spaces/special chars → hyphens

---

#### 6.9: Save Authentication State

**PURPOSE:**
Save browser session state (cookies, localStorage, sessionStorage) to a file for later reuse. Useful for multi-role testing where you've logged in with a specific user role and want to reuse that authentication in test automation.

**EXECUTION CHECKLIST:**

```ini
☐ Understand: Save current browser context state to file
☐ Ask user for auth state filename
☐ Validate filename format
☐ Execute: page.context().storageState({ path })
☐ Verify file created successfully
```

**Ask user for filename:**

```sh
Save authentication state to file

What filename should be used?
(Examples: admin-auth.json, user-auth.json, guest-auth.json)

Enter filename (or press Ctrl+C to cancel):
```

**Validate filename:**

- Must end with `.json`
- Must not contain spaces or special characters (alphanumeric, hyphens, underscores only)
- Should describe the role/user type (e.g., admin-auth.json, regular-user-auth.json)
- If invalid:
   - Print error: `❌ Invalid filename. Use alphanumeric, hyphens, underscores. Must end with .json`
   - Return to ask again

**Execute save (ONLY after valid filename):**

- Save path: `.auth/{FILENAME}`
- Execute: `await page.context().storageState({ path: '.auth/{FILENAME}' })`
- Print progress: `💾 Saving authentication state...`
- If successful:
   - Print: `✅ Saved: .auth/{FILENAME}`
   - Print: `📌 Auth state saved to .auth/{FILENAME} — reusable in future test runs`
   - Return to **6.0** (loop entry question)

- If fails:
   - Log error: `⚠️ Failed to save auth state: {error}`
   - Print: `Continuing without saving...`
   - Return to **6.0** (loop entry question)

**IMPORTANT NOTES:**

- Auth state includes all cookies, localStorage, sessionStorage from current session
- Each auth state file should represent ONE user role/type
- Multiple auth files can be created during a single capture session
- Auth files are stored in `.auth/` directory at project root
- Auth files in `.auth/` are used automatically by `playwright.config.ts` via `storageState`

---

#### 6.10: Switch to Another Tab

__PURPOSE:__
Switch Playwright page context to a different browser tab. Use when a new tab has opened (e.g. OAuth redirect, link with `target=_blank`) and you want to capture or interact with it.

**EXECUTION CHECKLIST:**

```sh
☐ List all open tabs from current session
☐ Ask user which tab to switch to
☐ Execute bringToFront() + page context switch
☐ Confirm switch successful
☐ Return to 6.0 (user can now capture the new tab with option 1)
```

**Step 6.10.1: List Open Tabs**

Run snapshot to discover open tabs:

```bash
playwright-cli -s={SESSION_NAME} snapshot
```

Parse the "### Open tabs" section from output:

```md
- 0: (current) [Page Title](https://current-url.com)
- 1: [Other Page](https://other-url.com)
```

Display to user:

```yaml
Open tabs:
  0: (current) https://current-url.com
  1: https://other-url.com

Which tab do you want to switch to? (Enter tab number):
```

If only 1 tab found → print: `Only one tab open. No switch needed.` → return to 6.0

**Step 6.10.2: Switch Context**

After user selects tab index (e.g. `1`):

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => {
  const pages = page.context().pages();
  const targetIndex = {TAB_INDEX};
  if (targetIndex >= pages.length) return 'invalid_index';
  await pages[targetIndex].bringToFront();
  return 'switched to: ' + pages[targetIndex].url().substring(0, 80);
}"
```

- If result starts with `switched to:` → print: `✅ Switched to tab {TAB_INDEX}: {URL}`
- If result = `invalid_index` → print error, re-ask
- If command fails → print error, return to 6.0

**Step 6.10.3: Return to Loop**

Print: `Tab switched. You can now use option (1) to capture this page.`
→ Return to **6.0** (loop entry question via AskUserQuestion)

**IMPORTANT NOTES:**

- After switching, `playwright-cli snapshot` and `playwright-cli screenshot` capture the new tab
- Use option (1) after switching to capture the new tab's locators
- To switch back to original tab, use option (5) again and select tab 0
- No capture happens automatically — switching only changes context

---

## ~~STEP 7: Collect Network Data~~ — ⛔ DISABLED — SKIP THIS ENTIRE STEP

**STEP 7 EXECUTION CHECKLIST:**

```ini
☐ Understand: Retrieve all captured network requests/responses from browser session
☐ Output plan (below)
☐ STOP and wait for user confirmation
☐ Execute network data retrieval
☐ Verify network calls captured (or log warning if empty)
```

#### STEP 7 EXECUTION PLAN (output this to user):

```yaml
STEP 7: Collect Network Data

Purpose: Extract all network requests/responses captured during session
Source: Browser session {SESSION_NAME}
Extract: All HTTP calls made while capturing pages
Store: NETWORK_CALLS and CAPTURE_START_TIME
Next: Write network data to file in STEP 8
```

**Wait for confirmation:**

- Print: `Ready to collect network data from session? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → STOP

#### Execution (ONLY after confirmation received)

**Collection strategy (use whichever is available):**

```bash
# Strategy 1: Live session still active — collect from browser memory
NETWORK=$(playwright-cli -s={SESSION_NAME} run-code "async page => {
  const data = page._qakitNetworkCapture;
  if (!data || data.calls.length === 0) return JSON.stringify({ callCount: 0, calls: [] });
  return JSON.stringify({ callCount: data.calls.length, calls: data.calls });
}" 2>/dev/null | grep -o '{.*}' | head -c 500000)
CALL_COUNT=$(echo "$NETWORK" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('callCount',0))" 2>/dev/null || echo 0)

# Strategy 2: Session ended — fall back to last checkpoint
if [ "$CALL_COUNT" = "0" ] && [ -f "{LOCATORS_ROOT}/network-checkpoint.json" ]; then
  echo "   ℹ  Session ended — using network-checkpoint.json"
  NETWORK=$(cat "{LOCATORS_ROOT}/network-checkpoint.json")
  CALL_COUNT=$(echo "$NETWORK" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('callCount',0))" 2>/dev/null || echo 0)
fi

echo "   ℹ  Total network calls to process: $CALL_COUNT"
```

- Extract: `NETWORK_CALLS` from `$NETWORK`
- If both strategies fail → create empty `network-calls.json` with note, continue to STEP 8

---

## ~~STEP 8: Write Network Output~~ — ⛔ DISABLED — SKIP THIS ENTIRE STEP

**STEP 8 EXECUTION CHECKLIST:**

```ini
☐ Understand: Process and write collected network calls to file
☐ Output plan (below)
☐ STOP and wait for user confirmation
☐ Execute network data processing and file write
☐ Verify file created successfully
```

#### STEP 8 EXECUTION PLAN (output this to user):

```md
STEP 8: Write Network Output

Purpose: Save network calls with analysis to structured file
Output: {LOCATORS_ROOT}/network-calls.json
Includes:
  - Summary metrics (total calls, endpoints, timing stats)
  - Endpoint inventory (API routes, methods, response statuses)
  - Request/response schemas (field types, structures)
  - Call sequences (multi-step workflows, dependencies)
  - Timing breakdown (DNS, TLS, TTFB, download phases)
Next: Update task documentation in STEP 9
```

**Wait for confirmation:**

- Print: `Ready to write network data to file? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → STOP

#### Execution (ONLY after confirmation received)

- Write: `{LOCATORS_ROOT}/network-calls.json`
- Include in output:
   - Summary metrics (call count, timing statistics)
   - Endpoint inventory (unique routes, HTTP methods, response codes)
   - Request/response schemas (detected field types)
   - Call sequences (API call dependencies and workflows)
   - Timing breakdown (DNS lookup, TLS handshake, TTFB, download times)

- If write fails:
   - Log warning: "Could not write network calls file, continuing"
   - Continue to STEP 9 (non-fatal error)

---

## STEP 9: Update Task Documentation

**STEP 9 EXECUTION CHECKLIST:**

```ini
☐ Understand: Generate/update README files documenting captured content
☐ Output plan (below)
☐ STOP and wait for user confirmation
☐ Execute documentation generation
☐ Verify README files created
```

#### STEP 9 EXECUTION PLAN (output this to user):

```yaml
STEP 9: Update Task Documentation

Purpose: Create documentation index for captured locators
Files to create/update:
  - {TASK_ROOT}/locators/README.md (index of all captured pages)
  - {TASK_ROOT}/README.md (task overview with status)
Contents:
  - List of captured pages and element counts
  - Links to each page's locators and artifacts
  - Network capture summary
  - Timestamps and metadata
Next: Decide browser state in STEP 10
```

**Wait for confirmation:**

- Print: `Ready to update task documentation? (Type: ✓ Proceed when ready)`
- ✓ Proceed → execute
- No response → STOP

#### Execution (ONLY after confirmation received)

- Generate/update: `{TASK_ROOT}/locators/README.md`
   - Include: index of all captured pages
   - Include: element counts per page
   - Include: links to locator files

- Generate/update: `{TASK_ROOT}/README.md`
   - Include: task overview
   - Include: pages captured
   - Include: timestamp

- If generation fails:
   - Log warning: "Could not update documentation, continuing"
   - Continue to STEP 10 (non-fatal error)

---

## STEP 10: Decide Browser State

**STEP 10 EXECUTION CHECKLIST:**

```ini
☐ Understand: Ask user whether to keep browser running or close it
☐ Output plan (below)
☐ STOP and wait for user response
☐ Execute user's choice (keep or close)
☐ Verify browser state matches user choice
```

#### STEP 10 EXECUTION PLAN (output this to user):

```yaml
STEP 10: Decide Browser State

Purpose: Let user choose whether to continue using browser or close it
Question: Keep browser open for further capture?
Options:
  - Yes → Browser remains open, session stays active
  - No → Close browser and cleanup session
Benefits of keeping open:
  - Can continue capturing more pages
  - Can do manual testing in same browser
  - Session data remains available
Next: Show summary in STEP 11
```

**Ask user:**

- Print: `Keep browser open for further capture? (Type: Yes or No)`
- If "Yes" or "✓ Yes" → proceed to STEP 11 with browser running
- If "No" or "✗ No" → close browser (see below)
- No response → default to keeping browser open (safer — user can close manually)

#### Execution (ONLY after user responds)

**If user chooses "Yes" (keep browser):**

- Leave browser session active
- Leave network capture running
- Status: "Browser kept open for further work"
- Proceed to STEP 11

**If user chooses "No" (close browser):**

- Close browser session
- End network capture
- Cleanup temporary files
- If close fails:
   - Log warning: "Could not close browser gracefully"
   - Continue to STEP 11 anyway (non-fatal error)

- Proceed to STEP 11

---

## STEP 11: Show Summary

**STEP 11 EXECUTION CHECKLIST:**

```ini
☐ Understand: Display summary of everything captured
☐ Output plan (below)
☐ Compile statistics from captured data
☐ Print comprehensive summary with stats
☐ Include next steps for user
```

#### STEP 11 EXECUTION PLAN (output this to user):

```ini
STEP 11: Show Summary

Purpose: Display complete summary of capture session results
Includes:
  ✅ Pages captured (with page names)
  ✅ Total elements/locators extracted
  ✅ Network requests captured (with counts)
  ✅ Files saved (location: {LOCATORS_ROOT})
  ✅ Browser status (open/closed)
  ✅ Next steps (how to use captured data)
```

#### Execution (ONLY at completion)

**Print summary with statistics:**

```ini
✅ CAPTURE SESSION COMPLETE

📊 Summary:
  - Pages captured: {N}
  - Total elements: {M}
  - Network calls: {K}
  - Browser status: {open|closed}

📄 Saved to:
  {LOCATORS_ROOT}

📁 Structure:
  {LOCATORS_ROOT}/
  ├── README.md (index)
  ├── {PageName1}/
  │   ├── locators.md
  │   ├── screenshot-{timestamp}.png
  │   ├── aria-snapshot.yaml
  │   └── metadata.json
  ├── {PageName2}/
  │   └── ...
  └── network-calls.json

📡 Network Analysis:
  - Total requests: {count}
  - Unique endpoints: {count}
  - Error responses: {count}

🚀 Next Steps:
  1. Review locators in {LOCATORS_ROOT}/README.md
  2. Use locators for test automation
  3. Analyze network calls in network-calls.json
  4. Generate test cases from captured data
```

**Include additional context:**

- List all page names captured
- Total element/locator count
- Network data summary (endpoint counts, errors)
- File locations and sizes
- Recommendations for next steps

---

## Error Handling

### Fatal Errors

Stop if:

- missing task ID
- missing URL
- missing page name
- browser not running
- directory creation fails
- snapshot fails
- metadata write fails
- ARIA parsing fails
- locator write fails

### Non-Fatal Errors

Log warning:

- network init fails
- network retrieval fails
- network write fails
- README update fails
- browser close fails

---

## Output Structure

```text
./test-tasks/playwright/{TASK_ID}/locators/
├── README.md
├── Page1/
│   ├── locators.md
│   ├── aria-snapshot.yaml
│   ├── screenshot-{timestamp}.png
│   └── metadata.json
├── Page2/
│   └── ...
└── network-calls.json
```

---

## Important Notes

- User controls all navigation
- System only observes and captures
- Network capture is aggregated across the entire session
- Browser may remain open for continued work

---

## Best Practices

1. Capture meaningful page states (not intermediate noise)
2. Use consistent naming (LoginPage, CheckoutPage)
3. Capture full user flows
4. Review network output for API testing
5. Keep browser open for iterative capture