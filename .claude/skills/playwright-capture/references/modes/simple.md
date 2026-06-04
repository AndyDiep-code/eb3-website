# SIMPLE MODE - Single Page Capture

> ⛔ **NETWORK CAPTURE IS DISABLED** — Skip all network-related steps (STEP 6 and any network-related sub-steps). Do NOT initialize network listener, do NOT write `network-calls.json`. See SKILL.md Global Policies.

Capture a single page with automatic browser opening, ARIA snapshot generation, locator extraction, and screenshot capture.

**🔗 INTEGRATES WITH: `playwright-cli` Skill** ← For actual browser operations

## Overview

Use this mode when the user wants to capture locators from a single page and does not need multi-page navigation or an existing browser session.

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
echo -e "${CYAN}║  Playwright Locators — Simple Mode   ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
# Before running commands
echo -e "${YELLOW}⏳ [X/15] Step description...${NC}"

# After success
echo -e "${GREEN}✅ [X/15] Step description${NC}"

# On failure — print then stop
echo -e "${RED}❌ [X/15] Step description — FAILED${NC}"

# Info/secondary messages
echo -e "${GRAY}   ℹ  Additional info${NC}"
```

At STEP 15, output the following as **Claude text response**:

```
**🎉 Locators captured**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Page** | {PAGE_NAME} |
| **Elements** | {ELEMENT_COUNT} captured |
| **Output** | `./test-tasks/playwright/{TASK_ID}/locators/{PAGE_NAME}/` |
| **Network** | `network-calls.json` ✓ |

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

```
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

---

## MANDATORY SPEC SUMMARY

**Before proceeding with ANY execution, the Agent MUST:**

1. **Output complete understanding:**
   - Task ID: `{value}`
   - Target URL: `{value}`
   - Mode: Simple (single-page auto-open)
   - Expected browser behavior: Open in headed mode, navigate to URL, wait for ready
   - Page name: `{value}`
   - Capture flow: Open browser → Capture artifacts → Save locators → Ask browser close

2. **Verify each requirement:**
   - [ ] Task ID resolved
   - [ ] URL resolved
   - [ ] Page name resolved
   - [ ] Browser can be opened in headed mode
   - [ ] Network capture can be initialized
   - [ ] Output paths prepared

3. **Wait for user confirmation:**
   - Print: `Ready to begin simple capture? (Type: ✓ Proceed when ready)`
   - Do NOT proceed until user responds with explicit confirmation
   - If no confirmation → stop

---

## 🔗 Skill Dependencies

**REQUIRED SKILL:** `playwright-cli`

---

## Step-by-Step Process

### STEP 1: Resolve Required Input

**STEP 1 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (collect required inputs)
☐ Output the plan to user BEFORE any input collection
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute input resolution ONLY after confirmation received
☐ Verify all three inputs collected: TASK_ID, URL, PAGE_NAME
```

**EXECUTION PLAN FOR STEP 1:**
Output this to user before proceeding:

```
STEP 1: Resolve Required Inputs
Goal: Collect three required values (Task ID, URL, Page Name)
Expected: User provides task ID and target URL; page name optional (will ask if missing)
How I'll verify: All three values stored and non-empty
Next step: After this, I'll normalize paths and create task directory
```

**Actions:**

Resolve these required values:
- `TASK_ID`
- `URL`
- `PAGE_NAME`

#### Task ID
- Extract `--task={task-id}` if provided.
- If missing, ask the user: `📋 Please provide the Task ID (for example: test-login) to capture locators for:`
- Store the response as `TASK_ID`.
- If the user does not provide a task ID, stop with: `❌ Task ID is required. Cannot proceed.`

#### URL
- Extract the target URL if provided.
- If missing, ask the user: `📋 Please provide the URL to capture locators from:`
- Store the response as `URL`.
- If the user does not provide a URL, stop with: `❌ URL is required. Cannot proceed.`

#### Page Name
- Extract `--name={page-name}` if provided.
- If provided, use it as `PAGE_NAME`.
- Otherwise, ask the user: `📋 What name should be used for this page? (for example: LoginPage, HomePage)`
- Store the response as `PAGE_NAME`.
- If the user does not provide a page name, stop with: `❌ Page name is required. Cannot proceed.`

**Output completion:**
```
✅ Inputs resolved:
   - Task ID: {TASK_ID}
   - URL: {URL}
   - Page Name: {PAGE_NAME}
```

### STEP 2: Normalize Names and Paths

**STEP 2 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (normalize and prepare paths)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute normalization ONLY after confirmation received
☐ Verify all paths constructed: TASK_ROOT, LOCATORS_ROOT, OUTPUT_PATH
```

**EXECUTION PLAN FOR STEP 2:**
Output this to user before proceeding:

```
STEP 2: Normalize Names and Prepare Paths
Goal: Build directory structure for storing captured artifacts
What will happen:
  - Convert page name to filesystem-safe format
  - Create paths: {TASK_ROOT}/locators/{PAGE_NAME}/
Expected: All paths prepared, no files created yet
How I'll verify: Path variables set correctly
Next step: After this, I'll validate or create task directory
```

**Actions:**

Normalize the page name and build the output paths.

- Normalize `PAGE_NAME` into a filesystem-safe folder name.
- Preserve the original display value for summaries if needed.

Set:

- `TASK_ROOT=./test-tasks/playwright/{TASK_ID}`
- `LOCATORS_ROOT={TASK_ROOT}/locators`
- `OUTPUT_PATH={LOCATORS_ROOT}/{PAGE_NAME}`

**Output completion:**
```
✅ Paths prepared:
   - Task Root: {TASK_ROOT}
   - Locators Root: {LOCATORS_ROOT}
   - Output Path: {OUTPUT_PATH}
```

### STEP 3: Validate or Create Task

**STEP 3 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (validate task exists or create it)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute validation/creation ONLY after confirmation received
☐ Verify task directory exists after completion
```

**EXECUTION PLAN FOR STEP 3:**
Output this to user before proceeding:

```
STEP 3: Validate or Create Task Directory
Goal: Ensure task folder structure exists
What will happen:
  - Check if task directory exists: {TASK_ROOT}
  - If missing: Ask permission to create it
  - Create: locators/, output directory for artifacts
Expected: Task directory and subdirectories ready
How I'll verify: All directories exist and are writable
Next step: After this, I'll open the browser
```

**Actions:**

Check whether `{TASK_ROOT}` exists:

```bash
[ -d "${TASK_ROOT}" ] && echo "exists" || echo "not_found"
```

- If `exists` → continue with: `✅ Task directory found: {TASK_ROOT}`
- If `not_found` → **STOP. Do NOT create the folder.** Print:
  ```
  ❌ Task '{TASK_ID}' not found at ./test-tasks/playwright/{TASK_ID}/
  
  Run /qakit:playwright:task {TASK_ID} first to create the task.
  
  Available tasks:
  $(ls ./test-tasks/playwright/ | grep -v qakit.config.json)
  ```
  Then ask user to provide the correct `--task-id` before continuing.

**Why not auto-create:** Tasks must be created via `/qakit:playwright:task` to get the correct structure (README.md, feature.md, test-cases/, execution/, reports/). Auto-creating here causes mismatched folder structures.

Ensure these directories exist before continuing:

- `{LOCATORS_ROOT}`
- `{OUTPUT_PATH}`

If directory creation fails, stop with: `❌ Failed to create task directories. Check permissions and try again.`

**Output completion:**
```
✅ Task validated:
   - Directory: {TASK_ROOT}
   - Locators path ready: {OUTPUT_PATH}
```

### STEP 4: Prepare Browser Session

**STEP 4 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (detect and open/use browser session)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute browser operations ONLY after confirmation received
☐ Verify browser running and ready before completing step
```

**EXECUTION PLAN FOR STEP 4:**
Output this to user before proceeding:

```
STEP 4: Prepare Browser Session
Goal: Open browser and navigate to target URL
What will happen:
  - Check for existing browser sessions
  - Open new browser or ask to use existing (if found)
  - Navigate to URL: {URL}
  - Resize window to 1920x1080
  - Wait until page fully loads
Expected: Browser running, navigated to {URL}, ready for capture
How I'll verify: Browser session active and page loaded
Next step: After this, I'll verify browser is running
```

**Actions:**

Determine whether to use an existing browser session or open a new one.

- Run: `playwright-cli list`
- If no active session exists:
  - Open a new browser session for `{URL}` in headed mode: `🚀 Opening browser...`
  - Resize the browser window to `1920x1080`: `📐 Resizing window...`
  - Wait until the browser is ready: `⏳ Waiting for page to load...`
- If an active session exists:
  - Ask the user: `📋 An active browser session was detected. Would you like to use the existing session or open a new browser?`
  - Options: `Use existing session`, `Open new browser` in headed mode
  - If the user selects `Use existing session`, continue with: `✅ Using existing session`
  - If the user selects `Open new browser`:
    - Close all existing browser sessions: `🔌 Closing existing sessions...`
    - Open a new browser session for `{URL}` in headed mode: `🚀 Opening fresh browser...`
    - Resize the browser window to `1920x1080`: `📐 Resizing window...`
    - Wait until the browser is ready: `⏳ Waiting for page to load...`

For session handling details, see [../browser-session-guide.md](../browser-session-guide.md).

**Output completion:**
```
✅ Browser session ready
   - URL loaded: {URL}
   - Window size: 1920x1080
   - Session active and awaiting capture
```

### STEP 5: Verify Browser Session

**STEP 5 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (verify browser is running)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute verification ONLY after confirmation received
☐ Verify SESSION_NAME extracted and validated
```

**EXECUTION PLAN FOR STEP 5:**
Output this to user before proceeding:

```
STEP 5: Verify Browser Session Running
Goal: Confirm browser is ready for capturing
What will happen:
  - List active browser sessions
  - Confirm session in 'running' state
  - Extract session name for later use
Expected: Active session confirmed and named
How I'll verify: SESSION_NAME stored and non-empty
Next step: After this, I'll initialize network capture
```

**Actions:**

Verify that a browser session is running before continuing.

- Run: `playwright-cli list`
- Confirm that at least one browser session is in the `running` state: `🔍 Checking for active sessions...`
- Extract the active session identifier as `SESSION_NAME`: `✅ Session found: {SESSION_NAME}`

If no running session is found:
- Fail with: `❌ Browser failed to open. Cannot proceed with locator capture.`
- Stop execution

**Output completion:**
```
✅ Browser verified running
   - Session: {SESSION_NAME}
   - Status: Active and ready for capture
```

### STEP 5.5: Detect and Handle Flutter Web

**STEP 5.5 EXECUTION CHECKLIST:**
```
☐ Understand: Auto-detect if app is Flutter Web (CanvasKit renderer)
☐ Output plan (below)
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute detection ONLY after confirmation
☐ If Flutter detected: auto-enable accessibility, wait for semantic overlay
☐ Verify: ARIA elements available after enabling
```

**EXECUTION PLAN FOR STEP 5.5:**
Output this to user before proceeding:

```
STEP 5.5: Detect and Handle Flutter Web
Goal: Check if app is Flutter Web; enable accessibility if so
What will happen:
  - Check DOM for Flutter Web markers (flt-glass-pane)
  - If Flutter detected: click "Enable accessibility" button automatically
  - Wait 2s for semantic overlay to render
  - Re-run ARIA check to verify elements are now visible
Expected: Full ARIA element tree available for capture
How I'll verify: ARIA snapshot returns more than 1 element after enabling
Skip condition: If NOT Flutter, this step is a no-op — proceed immediately
```

**Actions:**

Run detection code:

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
- Proceed to STEP 6

**If result = `flutter`:**
- Print: `⚠️ Flutter Web detected (CanvasKit renderer)`
- Print: `🔧 Enabling accessibility mode...`
- Click "Enable accessibility" button:

```bash
playwright-cli -s={SESSION_NAME} run-code "async page => {
  const btn = page.getByRole('button', { name: /enable accessibility/i });
  const exists = await btn.count() > 0;
  if (exists) {
    await btn.click();
    await page.waitForTimeout(2000);
    return 'enabled';
  }
  return 'button_not_found';
}"
```

- If result = `enabled`:
  - Print: `✅ Accessibility enabled — semantic overlay rendered`
  - Wait 2 more seconds for full render
  - Proceed to STEP 6
- If result = `button_not_found`:
  - Print: `⚠️ "Enable accessibility" button not found — accessibility may already be active, or app uses a different mechanism`
  - Continue to STEP 6 (non-fatal)
- If command fails entirely:
  - Log warning: `Flutter accessibility setup failed, continuing`
  - Continue to STEP 6 (non-fatal)

**Output completion:**
```
✅ Flutter Web check complete
   - App type: {Flutter|Standard}
   - Accessibility: {enabled|not needed|already active}
```

### ~~STEP 6: Initialize Network Capture~~ — ⛔ DISABLED — SKIP THIS ENTIRE STEP

**STEP 6 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (start network monitoring)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute initialization ONLY after confirmation received
☐ Verify network listener started (non-fatal if fails)
```

**EXECUTION PLAN FOR STEP 6:**
Output this to user before proceeding:

```
STEP 6: Initialize Network Capture
Goal: Start capturing network requests and responses
What will happen:
  - Activate network monitoring for session
  - Begin recording all HTTP requests/responses
  - Note: Failures here are non-critical
Expected: Network listener active
How I'll verify: Network capture initialized
Next step: After this, I'll capture page artifacts (screenshot, ARIA)
```

**Actions:**

Initialize network capture for the active session.

- Start the network listener for `{SESSION_NAME}`: `📡 Starting network capture...`
- Treat `initialized` and `already_initialized` as success: `✅ Network monitoring active`
- If initialization fails, log a warning and continue: `⚠️ Network capture unavailable (non-critical)`

For network capture details, see [../network-capture.md](../network-capture.md).

**Output completion:**
```
✅ Network capture initialized (or already running)
```

### STEP 7: Capture Page Artifacts

**STEP 7 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (capture screenshots and ARIA)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute capture ONLY after confirmation received
☐ Verify both files written successfully
```

**EXECUTION PLAN FOR STEP 7:**
Output this to user before proceeding:

```
STEP 7: Capture Page Artifacts
Goal: Save visual and semantic page information
What will happen:
  - Take screenshot of current page
  - Extract ARIA accessibility tree
  - Save both to {OUTPUT_PATH}/
Expected: Two files created
  - screenshot-{timestamp}.png (visual reference)
  - aria-snapshot.yaml (element structure)
How I'll verify: Files exist and are readable
Next step: After this, I'll extract page metadata (title, URL)
```

**Actions:**

Capture the required page artifacts into `{OUTPUT_PATH}`.

Required artifacts:
- `screenshot-{timestamp}.png` - Visual page reference
- `aria-snapshot.yaml` - Accessibility tree with element references

Actions:

**Screenshot** — playwright-cli can only save within allowed roots (`tests/playwright/`). Use two-step.
**Naming rule:** Always use timestamp — never plain `screenshot.png`.
```bash
# Step A: save to allowed temp path
playwright-cli -s={SESSION} screenshot --filename="{PW_DIR}/screenshot-temp.png" --full-page

# Step B: copy to target with timestamp
TIMESTAMP=$(date -u +%Y%m%d-%H%M%S)
cp "{PW_DIR}/screenshot-temp.png" "{OUTPUT_PATH}/screenshot-${TIMESTAMP}.png"
rm -f "{PW_DIR}/screenshot-temp.png"
```
⚠️ Never pass file path as positional arg — it's treated as CSS selector and will fail.

**ARIA Snapshot:**
```bash
playwright-cli -s={SESSION} snapshot > "{OUTPUT_PATH}/aria-snapshot.yaml"
```

If writing either file fails, stop with: `❌ Failed to write artifact files. Check disk space and permissions.`

**Output completion:**
```
✅ Page artifacts captured:
   - Screenshot: {OUTPUT_PATH}/screenshot-{timestamp}.png
   - ARIA snapshot: {OUTPUT_PATH}/aria-snapshot.yaml
```

### STEP 8: Capture Page Metadata

**STEP 8 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (save page information)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute capture ONLY after confirmation received
☐ Verify metadata.json written successfully
```

**EXECUTION PLAN FOR STEP 8:**
Output this to user before proceeding:

```
STEP 8: Capture Page Metadata
Goal: Record page context and capture information
What will happen:
  - Extract page title from browser
  - Get current page URL
  - Record task/session/timestamp info
  - Save all to metadata.json
Expected: metadata.json with complete page info
How I'll verify: File exists with required fields
Next step: After this, I'll parse ARIA snapshot for elements
```

**Actions:**

Capture basic page metadata.

Extract and store:
- `PAGE_TITLE` - from browser document title
- `PAGE_URL` - current URL from browser

Write metadata to: `{OUTPUT_PATH}/metadata.json`: `📝 Writing metadata...`

The metadata file must include at least:
- page name: `{PAGE_NAME}`
- page title: `{PAGE_TITLE}`
- page URL: `{PAGE_URL}`
- task ID: `{TASK_ID}`
- session name: `{SESSION_NAME}`
- capture timestamp: ISO 8601 format

If metadata capture or write fails, stop with: `❌ Failed to capture page metadata. Check browser state.`

**Output completion:**
```
✅ Page metadata captured:
   - Title: {PAGE_TITLE}
   - URL: {PAGE_URL}
   - File: {OUTPUT_PATH}/metadata.json
```

### STEP 9: Analyze ARIA Snapshot

**STEP 9 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (parse element structure)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute parsing ONLY after confirmation received
☐ Verify element references extracted and validated
```

**EXECUTION PLAN FOR STEP 9:**
Output this to user before proceeding:

```
STEP 9: Analyze ARIA Snapshot
Goal: Extract interactive elements from page structure
What will happen:
  - Read aria-snapshot.yaml file
  - Parse accessibility tree
  - Find all clickable/interactive elements
  - Extract [ref=eXX] reference markers
Expected: Element list with roles and names
How I'll verify: Elements with references found and validated
Next step: After this, I'll generate locator definitions
```

**Actions:**

Parse `{OUTPUT_PATH}/aria-snapshot.yaml` and extract interactive elements: `🔍 Parsing ARIA structure...`

Actions:
- Parse the ARIA snapshot: `📄 Reading snapshot file...`
- Extract elements with `[ref=eXX]` markers: `🎯 Identifying interactive elements...`
- Preserve each reference for later Playwright interaction: `💾 Storing element references...`
- Capture role, accessible name, and other useful identifying information: `📋 Recording element metadata...`

For ARIA snapshot structure, see [../aria-snapshot-format.md](../aria-snapshot-format.md).

If ARIA parsing fails, stop with: `❌ Failed to parse ARIA snapshot. File may be corrupted.`

**Output completion:**
```
✅ ARIA snapshot analyzed
   - Elements found: {count}
   - References extracted: [eXX] markers identified
```

### STEP 10: Generate Locators

**STEP 10 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (generate locator definitions)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute generation ONLY after confirmation received
☐ Verify locators.md written successfully
```

**EXECUTION PLAN FOR STEP 10:**
Output this to user before proceeding:

```
STEP 10: Generate Locators
Goal: Create reusable element locator definitions
What will happen:
  - For each extracted element:
    - Generate meaningful name (button: "Login", link: "Home")
    - Generate XPath selector
    - Group by type (buttons, links, inputs)
  - Write all to locators.md
Expected: locators.md with all element definitions
How I'll verify: File created with proper format
Next step: After this, I'll collect network requests
```

**Actions:**

Generate meaningful locator entries from the parsed ARIA elements: `🔧 Generating locators...`

For each element with a reference:
- Generate a meaningful name based on role and visible or accessible text: `✏️ Creating descriptive names...`
- Generate an XPath selector: `🎯 Computing XPath selectors...`
- Preserve the original reference token: `💾 Mapping references...`
- Group results by element type where helpful: `📊 Organizing by type...`

Write the locator output to: `{OUTPUT_PATH}/locators.md`: `📝 Writing locators.md...`

For locator output structure and naming rules, see [../locators-output-format.md](../locators-output-format.md).

If writing `locators.md` fails, stop with: `❌ Failed to write locators.md. Check disk space.`

**Output completion:**
```
✅ Locators generated:
   - Total elements: {count}
   - File: {OUTPUT_PATH}/locators.md
```

### STEP 11: Collect Network Data

**STEP 11 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (retrieve network requests)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute collection ONLY after confirmation received
☐ Verify network data retrieved (non-fatal if unavailable)
```

**EXECUTION PLAN FOR STEP 11:**
Output this to user before proceeding:

```
STEP 11: Collect Network Data
Goal: Gather all HTTP requests/responses during page load
What will happen:
  - Retrieve all captured network calls
  - Parse into structured format
  - Extract timing, endpoints, response types
  - Note: This step is non-critical (continues if fails)
Expected: Network calls array or empty list (both ok)
How I'll verify: Data retrieved and formatted
Next step: After this, I'll write network.json if data available
```

**Actions:**

Collect the captured network activity for the session: `📡 Retrieving network data...`

Actions:
- Read the captured network calls for `{SESSION_NAME}`: `📥 Reading network capture...`
- Parse the result into structured data: `🔍 Parsing network calls...`
- Extract:
  - `NETWORK_CALLS` - array of requests/responses
  - `CAPTURE_START_TIME` - first request timestamp
  - `PAGE_URL` - source of these calls

If network capture retrieval fails:
- Log a warning: `⚠️ Network capture unavailable (continuing)`
- Continue without failing the entire capture: Network data is optional

**Output completion:**
```
✅ Network data retrieved
   - Requests found: {count}
   - Status: Ready for output
```

### STEP 12: Write Network Output

**STEP 12 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (save network data if available)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute write ONLY after confirmation received
☐ Verify network-calls.json written (non-fatal if skipped)
```

**EXECUTION PLAN FOR STEP 12:**
Output this to user before proceeding:

```
STEP 12: Write Network Output
Goal: Save captured network requests/responses
What will happen:
  - If network data exists: write network-calls.json
  - Include summary metrics (request counts, avg duration)
  - Extract endpoint inventory and call sequences
  - Note: Failure here is non-critical
Expected: network-calls.json created (or skipped if no data)
How I'll verify: File exists with expected metrics
Next step: After this, I'll update task documentation
```

**Actions:**

Write network capture data if available: `📡 Processing network data...`

If `NETWORK_CALLS` is available and non-empty:
- Write to: `{OUTPUT_PATH}/network-calls.json`: `💾 Writing network-calls.json...`
- Include:
  - summary metrics: `✅ Summary metrics included`
    - `totalRequests`: count of all requests
    - `successfulRequests`: 2xx-3xx responses
    - `failedRequests`: 4xx-5xx responses
    - `averageDuration`: mean request time
  - endpoint inventory: `✅ Endpoint inventory included`
  - request and response schema summaries: `✅ Schema detection included`
  - call sequences: `✅ Call sequences included`
  - timing breakdown: `✅ Timing breakdown included`

If `NETWORK_CALLS` is empty or unavailable:
- Skip network output: `ℹ️ No network data to write (skipping)`
- Continue with other steps

If writing `network-calls.json` fails:
- Log a warning: `⚠️ Network output failed (non-critical, continuing)`
- Continue with remaining steps

For network output format, see [../network-capture-format.md](../network-capture-format.md).

**Output completion:**
```
✅ Network data processed
   - Status: Data written or no data to write
   - File: {OUTPUT_PATH}/network-calls.json (if created)
```

### STEP 13: Update Task Documentation

**STEP 13 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (update README files)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute updates ONLY after confirmation received
☐ Verify README files updated (non-fatal if fails)
```

**EXECUTION PLAN FOR STEP 13:**
Output this to user before proceeding:

```
STEP 13: Update Task Documentation
Goal: Record capture in task README files
What will happen:
  - Update locators/README.md with new page entry
  - Update task README.md with capture status
  - Include page name and output location
  - Note: Failure here is non-critical
Expected: Both README files updated with new page info
How I'll verify: Files updated with capture metadata
Next step: After this, I'll ask about keeping browser open
```

**Actions:**

Update task-level documentation: `📝 Updating task documentation...`

Update files:
- `./test-tasks/playwright/{TASK_ID}/locators/README.md`: `✏️ Updating locators index...`
  - Add entry for `{PAGE_NAME}` with output path
  - Include capture timestamp
  - Link to locators.md file

- `./test-tasks/playwright/{TASK_ID}/README.md`: `✏️ Updating task README...`
  - Update capture progress section
  - Record `{PAGE_NAME}` as captured
  - Update timestamp

If documentation update fails:
- Log a warning: `⚠️ Documentation update failed (non-critical, continuing)`
- Continue with next step

**Output completion:**
```
✅ Task documentation updated
   - Locators index: {PAGE_NAME} added
   - Task README: Capture status recorded
```

### STEP 14: Decide Whether to Keep Browser Open

**STEP 14 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (ask user about browser)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Present browser choice to user
☐ Execute user's choice (keep or close)
☐ Verify result (non-fatal if close fails)
```

**EXECUTION PLAN FOR STEP 14:**
Output this to user before proceeding:

```
STEP 14: Decide Whether to Keep Browser Open
Goal: Ask user if browser should stay open for more captures
What will happen:
  - Present choice: keep open or close browser
  - If keep: explain can reuse in session mode
  - If close: close active browser session
Expected: Browser either running or closed per user choice
How I'll verify: Browser state matches user selection
Next step: After this, I'll show final summary
```

**Actions:**

Ask the user about browser state: `❓ Browser session decision needed`

Present choice:
```
📌 Keep the browser open for further capture?

Options:
✅ Yes - Keep open (can reuse in session mode)
❌ No - Close browser
```

Handle user response:

If user selects `Yes (keep open for session mode)`:
- Keep the browser session running: `✅ Browser kept open`
- Print message: `📌 Browser remains open. You can use session mode to capture from this active session.`
- Record: `BROWSER_KEPT_OPEN = true`

If user selects `No (close browser)`:
- Close the active browser session: `🔌 Closing browser...`
- Run: `playwright-cli close {SESSION_NAME}`
- Confirm: `✅ Browser closed`
- Record: `BROWSER_KEPT_OPEN = false`

If closing the browser fails:
- Log a warning: `⚠️ Browser close failed (non-critical, continuing)`
- Continue to summary

**Output completion:**
```
✅ Browser state finalized
   - Status: {BROWSER_KEPT_OPEN ? "Open for session mode" : "Closed"}
```

### STEP 15: Show Summary

**STEP 15 EXECUTION CHECKLIST:**
```
☐ Understand what this step does (display final summary)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Compile all capture results
☐ Display comprehensive summary
☐ Provide next steps guidance
```

**EXECUTION PLAN FOR STEP 15:**
Output this to user before proceeding:

```
STEP 15: Show Summary
Goal: Display all results and next steps
What will happen:
  - Compile capture results and statistics
  - Show output file locations
  - Display element count and network data
  - Explain next steps (test cases, automation)
Expected: User sees complete summary with paths
How I'll verify: Summary displayed to user
Next step: Done! User can proceed to test cases or session mode
```

**Actions:**

Display the final capture summary: `🎯 Generating summary report...`

Show:
```
✅ CAPTURE COMPLETE

📄 Page Captured: {PAGE_NAME}
📂 Output Location: {OUTPUT_PATH}

📊 Capture Statistics:
   - Elements found: {ELEMENT_COUNT}
   - Network requests: {NETWORK_CALL_COUNT}
   - Browser status: {BROWSER_KEPT_OPEN ? "OPEN (session mode available)" : "CLOSED"}

📋 Files Generated:
   ✅ locators.md - Element definitions
   ✅ aria-snapshot.yaml - Accessibility tree
   ✅ screenshot-{timestamp}.png - Visual reference
   ✅ metadata.json - Page information
   {NETWORK_CALL_COUNT > 0 ? "✅ network-calls.json - HTTP requests" : "ℹ️ network-calls.json - (no data)"}

🔗 Next Steps:
1. 📋 Generate test cases: /qakit:playwright:test-cases --task={TASK_ID}
2. 🚀 Generate POMs: /qakit:playwright:generate-pom --task={TASK_ID}
3. 🚀 Generate specs: /qakit:playwright:automate
{BROWSER_KEPT_OPEN ? "\n3. 🔄 Capture more pages: Switch to session mode to use the open browser" : ""}
```

Include details:
- Total element count: `🎯 {ELEMENT_COUNT} interactive elements captured`
- Browser state: `{BROWSER_KEPT_OPEN ? "✅ Browser OPEN - Ready for session mode" : "✅ Browser CLOSED"}`
- Network success: `{NETWORK_CALL_COUNT > 0 ? "✅ Network capture: " + NETWORK_CALL_COUNT + " requests" : "ℹ️ Network capture: No requests recorded"}`

**Output completion:**
```
🎉 Locator capture completed successfully!
📁 Ready to proceed to test case generation
{BROWSER_KEPT_OPEN ? "🔄 Browser session active and available for session mode" : ""}
```

## Error Handling

### Fatal Errors
Stop execution for any of the following:

- missing task ID after prompting
- missing URL after prompting
- missing page name after prompting
- task creation declined
- browser not running
- output directory creation failure
- screenshot write failure
- ARIA snapshot write failure
- metadata write failure
- ARIA parsing failure
- locator output write failure

### Non-Fatal Errors
Log a warning and continue for any of the following:

- network initialization failure
- network retrieval failure
- network output write failure
- task README update failure
- browser close failure

For error handling guidance, see [../error-handling.md](../error-handling.md).

## Example Output

```text
✅ Generated locators for LoginPage
📄 Saved to: ./test-tasks/playwright/test-login/locators/LoginPage/
📡 Network calls captured: 5 requests
```

## Output Files

```text
./test-tasks/playwright/{TASK_ID}/locators/
├── README.md
└── {PAGE_NAME}/
    ├── locators.md
    ├── aria-snapshot.yaml
    ├── screenshot-{timestamp}.png
    ├── metadata.json
    └── network-calls.json
```