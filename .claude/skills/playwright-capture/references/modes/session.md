# SESSION MODE - Capture from Existing Browser

> ⛔ **NETWORK CAPTURE IS DISABLED** — Skip STEP 6 (Initialize Network Capture) and STEP 11 (Collect Network Data) entirely. Do NOT write `network-calls.json`. See SKILL.md Global Policies.

Capture a single page from an existing browser session without opening a new browser.

**🔗 INTEGRATES WITH: `playwright-cli` Skill** ← For actual browser operations

## ⛔ CRITICAL ENFORCEMENT PROTOCOL

**This mode follows a strict gate-based execution pattern. ALL steps MUST follow this protocol.**

### Execution Gates

**Output Gate:** Before executing step actions:

- Output the step plan to user
- Show what will happen, expected results, and how verification works
- Wait for visibility confirmation (user reads the plan)

**Confirmation Gate:** After Output Gate:

- STOP execution
- Ask user: `✓ Ready to proceed with this step?`
- ONLY continue after explicit user confirmation
- If user says "No" or hesitates: ask why and provide alternative

**Execution Gate:** After Confirmation Gate:

- Execute the step as planned
- Provide real-time feedback (emoji + status messages)
- Capture all outputs and errors
- Report completion status

### Mandatory Pre-Execution Checklist

Before starting ANY step:

```ini
☐ I understand what this step does
☐ I have output the plan to the user
☐ I am WAITING for the user to confirm (✓ Proceed)
☐ I have NOT executed until confirmation received
☐ I am ready to execute only after user says yes
```

```ini

```

**VIOLATION = STOP IMMEDIATELY.** If you execute without user confirmation, backtrack and ask for retroactive approval.

---

## MANDATORY SPEC SUMMARY

**Before executing the first step, verify this spec:**

- ✅ Task ID exists or will be created
- ✅ Page name provided or will be requested
- ✅ At least one browser session is currently running
- ✅ Output directory path is clear and writable
- ✅ All 16 steps will follow gate-based execution
- ✅ Non-fatal errors will log warnings but continue
- ✅ Fatal errors will stop immediately

---

## 🔗 Skill Dependencies

**REQUIRED SKILL:** `playwright-cli`

- Used for: Browser session management, artifact capture, network recording
- Activation: Automatic when steps execute

---

## Overview

Use this mode when the user already has a browser session running and wants to capture the current page state, including locators, screenshot, ARIA snapshot, metadata, and network activity.

## Terminal Output Standards

Define these color variables at the start of ALL bash execution in this mode:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Playwright Locators — Session Mode  ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
# Before running commands
echo -e "${YELLOW}⏳ [X/16] Step description...${NC}"

# After success
echo -e "${GREEN}✅ [X/16] Step description${NC}"

# On failure — print then stop
echo -e "${RED}❌ [X/16] Step description — FAILED${NC}"

# Info/secondary messages
echo -e "${GRAY}   ℹ  Additional info${NC}"
```

At STEP 16, output the following as **Claude text response**:

```
**🎉 Session capture complete**

| | |
|---|---|
| **Task** | {TASK_ID} |
| **Page** | {PAGE_NAME} |
| **Session** | {SESSION_NAME} (still running) |
| **Output** | `./test-tasks/playwright/{TASK_ID}/locators/{PAGE_NAME}/` |
| **Network** | `network-calls.json` ✓ |

→ **Next:** `/qakit:playwright:test-cases --task={TASK_ID}`
```

## Prerequisites

- At least one Playwright browser session must already be running.
- This mode does not open a new browser.
- If no browser session is running, stop and instruct the user to start one first.

## Step-by-Step Process

### STEP 1: Resolve Required Input

**STEP 1 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (get task ID and page name)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute input collection ONLY after confirmation received
☐ Verify both TASK_ID and PAGE_NAME are provided
```

**EXECUTION PLAN FOR STEP 1:**
Output this to user before proceeding:

```yaml
STEP 1: Resolve Required Input
Goal: Get task ID and page name for this capture
What will happen:
  - If task ID not provided via --task: ask for it
  - If page name not provided via --name: ask for it
  - Store both for use in all remaining steps
Expected: TASK_ID and PAGE_NAME both set
How I'll verify: Both values stored and non-empty
Next step: After this, I'll normalize paths and check task
```

**Actions:**

Resolve these required values: `⚙️ Collecting capture configuration...`

#### Task ID Resolution

- Extract `--task={task-id}` if provided: `✅ Task ID from argument`
- If missing, ask the user: `❓ Please provide the Task ID (for example: test-payment):`
- Store the response as `TASK_ID`: `💾 Task ID stored`
- If the user does not provide a task ID, stop with: `❌ Task ID is required. Cannot proceed.`

#### Page Name Resolution

- Extract `--name={page-name}` if provided: `✅ Page name from argument`
- If provided, use it as `PAGE_NAME`: `💾 Page name from argument`
- Otherwise, ask the user: `❓ What name should be used for this page? (for example: LoginPage, DashboardPage):`
- Store the response as `PAGE_NAME`: `💾 Page name stored`
- If the user does not provide a page name, stop with: `❌ Page name is required. Cannot proceed.`

**Output completion:**

```yaml
✅ Input collection complete
   - Task ID: {TASK_ID}
   - Page name: {PAGE_NAME}
```

### STEP 2: Normalize Names and Paths

**STEP 2 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (normalize page name, build paths)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute path building ONLY after confirmation received
☐ Verify all paths constructed and validated
```

**EXECUTION PLAN FOR STEP 2:**
Output this to user before proceeding:

```yaml
STEP 2: Normalize Names and Paths
Goal: Build directory paths for capture output
What will happen:
  - Convert page name to filesystem-safe folder name
  - Build task root, locators, and output paths
  - Prepare path structure for all output files
Expected: All paths set and ready for use
How I'll verify: Paths validated and documented
Next step: After this, I'll check if task exists
```

**Actions:**

Normalize and build paths: `🔧 Constructing output paths...`

- Normalize `PAGE_NAME` into a filesystem-safe folder name: `✏️ Normalizing page name...`
- Preserve the original display value for summaries if needed: `💾 Storing original name...`

Set paths: `📂 Building directory structure...`

- `TASK_ROOT=./test-tasks/playwright/{TASK_ID}`: `✅ Task root: {TASK_ROOT}`
- `LOCATORS_ROOT={TASK_ROOT}/locators`: `✅ Locators root: {LOCATORS_ROOT}`
- `OUTPUT_PATH={LOCATORS_ROOT}/{PAGE_NAME}`: `✅ Output path: {OUTPUT_PATH}`

**Output completion:**

```sh
✅ Paths normalized and set
   - Task root: {TASK_ROOT}
   - Output path: {OUTPUT_PATH}
```

### STEP 3: Validate or Create Task

**STEP 3 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (check/create task directory)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute validation/creation ONLY after confirmation received
☐ Verify task directory and output path exist
```

**EXECUTION PLAN FOR STEP 3:**
Output this to user before proceeding:

```yaml
STEP 3: Validate or Create Task
Goal: Ensure task directory exists and is ready
What will happen:
  - Check if task directory exists
  - If not: ask user to create it
  - Create locators and output subdirectories
Expected: All directories ready for capture files
How I'll verify: Directories exist and are writable
Next step: After this, I'll detect active browser sessions
```

**Actions:**

Check task directory: `🔍 Checking task directory...`

- Check whether `{TASK_ROOT}` exists: `📂 Looking for {TASK_ROOT}...`

Branch:

- If task exists: continue with `✅ Task directory found`
- If task does NOT exist:
   - **STOP. Do NOT create the folder.**
   - Print:
     ```
     ❌ Task '{TASK_ID}' not found at ./test-tasks/playwright/{TASK_ID}/
     
     Run /qakit:playwright:task {TASK_ID} first.
     
     Available tasks:
     $(ls ./test-tasks/playwright/ | grep -v qakit.config.json)
     ```
   - Ask user for the correct task-id before continuing.
   - **Reason:** Tasks must be created via `/qakit:playwright:task` to get the full structure. Auto-creating here skips README.md, feature.md, test-cases/, execution/, reports/.

Ensure these directories exist: `✏️ Creating output directories...`

- `{LOCATORS_ROOT}`: `✅ Locators directory ready`
- `{OUTPUT_PATH}`: `✅ Output directory ready`

If directory creation fails, stop with: `❌ Failed to create directories. Check disk space and permissions.`

**Output completion:**

```yaml
✅ Task directory validated
   - Task root: {TASK_ROOT}
   - Output path: {OUTPUT_PATH}
```

### STEP 4: Detect Active Browser Sessions

**STEP 4 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (find active browser sessions)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute detection ONLY after confirmation received
☐ Verify at least one active session found
```

**EXECUTION PLAN FOR STEP 4:**
Output this to user before proceeding:

```yaml
STEP 4: Detect Active Browser Sessions
Goal: Find currently running browser sessions
What will happen:
  - List all active Playwright browser sessions
  - If none found: stop and ask user to start browser
  - If one found: use it automatically
  - If multiple found: ask user to choose
Expected: Exactly one session selected (SESSION_NAME)
How I'll verify: SESSION_NAME stored and exists
Next step: After this, I'll verify session is still running
```

**Actions:**

Detect active sessions: `🔍 Searching for active browser sessions...`

- Run: `playwright-cli list`: `📡 Querying Playwright daemon...`
- Parse the output for active sessions: `🔎 Parsing session list...`

**Branch handling:**

**Case 1: No active sessions found**

- Print: `❌ No active browser sessions found.`
- Print: `📋 Start a browser first, then run session mode again.`
- For session help, see [../browser-session-guide.md](../browser-session-guide.md)
- STOP execution

**Case 2: Exactly one active session found**

- Use that session automatically: `✅ Single session detected`
- Store it as `SESSION_NAME`: `💾 Session: {SESSION_NAME}`
- Print: `✅ Using session: {SESSION_NAME}`

**Case 3: Multiple active sessions found**

- Ask the user: `❓ Which browser session should be used for capture?`
- Present the available session names as options: `📋 Available sessions:`
- Store the selected session as `SESSION_NAME`: `✅ Selected: {SESSION_NAME}`
- If the user does not select a session, stop with: `❌ No session selected. Cannot proceed.`

For session handling details, see [../browser-session-guide.md](../browser-session-guide.md).

**Output completion:**

```yaml
✅ Browser session detected
   - Session: {SESSION_NAME}
   - Status: Ready for capture
```

### STEP 5: Verify Selected Session

**STEP 5 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (verify session is running)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute verification ONLY after confirmation received
☐ Verify SESSION_NAME is in running state
```

**EXECUTION PLAN FOR STEP 5:**
Output this to user before proceeding:

```yaml
STEP 5: Verify Selected Session
Goal: Confirm session is still running and ready
What will happen:
  - Re-check that selected session exists
  - Confirm it's in 'running' state
  - Stop if session closed or offline
Expected: Session confirmed as running
How I'll verify: Session status = running
Next step: After this, I'll initialize network capture
```

**Actions:**

Verify session state: `🔍 Verifying session state...`

- Run: `playwright-cli list`: `📡 Checking session status...`
- Confirm that `SESSION_NAME` still exists and is in the `running` state: `🔎 Parsing session status...`

**Status checks:**

- Session exists: `✅ Session {SESSION_NAME} found`
- Session running: `✅ Status: running`

If the selected session is no longer running:

- Fail with: `❌ The selected browser session is no longer running. Cannot proceed with locator capture.`
- STOP execution

**Output completion:**

```yaml
✅ Session verified running
   - Session: {SESSION_NAME}
   - Status: Active and ready for capture
```

### ~~STEP 6: Initialize Network Capture~~ — ⛔ DISABLED — SKIP THIS ENTIRE STEP

**STEP 6 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (start network monitoring)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute initialization ONLY after confirmation received
☐ Verify network listener started (non-fatal if fails)
```

**EXECUTION PLAN FOR STEP 6:**
Output this to user before proceeding:

```yaml
STEP 6: Initialize Network Capture
Goal: Start capturing network requests and responses
What will happen:
  - Activate network monitoring for selected session
  - Begin recording all HTTP requests/responses
  - Note: Failures here are non-critical
Expected: Network listener active
How I'll verify: Network capture initialized
Next step: After this, I'll capture page artifacts (screenshot, ARIA)
```

**Actions:**

Initialize network capture: `📡 Starting network capture...`

- Start the network listener for `{SESSION_NAME}`: `🎯 Initializing listener...`
- Treat `initialized` and `already_initialized` as success: `✅ Network monitoring active`
- If initialization fails, log a warning and continue: `⚠️ Network capture unavailable (non-critical)`

For network capture details, see [../network-capture.md](../network-capture.md).

**Output completion:**

```sh
✅ Network capture initialized (or already running)
```

### STEP 7: Capture Page Artifacts

**STEP 7 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (capture screenshots and ARIA)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute capture ONLY after confirmation received
☐ Verify both files written successfully
```

**EXECUTION PLAN FOR STEP 7:**
Output this to user before proceeding:

```yaml
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

Capture page artifacts: `📸 Capturing page state...`

Required artifacts: `🎯 Saving artifacts to {OUTPUT_PATH}/`

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
⚠️ Never pass file path as positional arg — treated as CSS selector, will fail.

**ARIA Snapshot:**
```bash
playwright-cli -s={SESSION} snapshot > "{OUTPUT_PATH}/aria-snapshot.yaml"
```

If writing either file fails, stop with: `❌ Failed to write artifact files. Check disk space and permissions.`

For ARIA snapshot structure, see [../aria-snapshot-format.md](../aria-snapshot-format.md).

**Output completion:**

```sh
✅ Page artifacts captured:
   - Screenshot: {OUTPUT_PATH}/screenshot-{timestamp}.png
   - ARIA snapshot: {OUTPUT_PATH}/aria-snapshot.yaml
```

### STEP 8: Capture Page Metadata

**STEP 8 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (save page information)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute capture ONLY after confirmation received
☐ Verify metadata.json written successfully
```

**EXECUTION PLAN FOR STEP 8:**
Output this to user before proceeding:

```yaml
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

Capture page metadata: `📝 Extracting page information...`

Extract and store: `🔍 Reading page context...`

- `PAGE_TITLE` - from browser document title: `✅ Title extracted`
- `PAGE_URL` - current URL from browser: `✅ URL extracted`

Write metadata to: `{OUTPUT_PATH}/metadata.json`: `📝 Writing metadata...`

The metadata file must include at least:

- page name: `{PAGE_NAME}`
- page title: `{PAGE_TITLE}`
- page URL: `{PAGE_URL}`
- task ID: `{TASK_ID}`
- session name: `{SESSION_NAME}`
- capture timestamp: ISO 8601 format: `⏰ Timestamp recorded`

If metadata capture or write fails, stop with: `❌ Failed to capture page metadata. Check browser state.`

**Output completion:**

```yaml
✅ Page metadata captured:
   - Title: {PAGE_TITLE}
   - URL: {PAGE_URL}
   - File: {OUTPUT_PATH}/metadata.json
```

### STEP 9: Analyze ARIA Snapshot

**STEP 9 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (parse ARIA snapshot and extract elements)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute parsing ONLY after confirmation received
☐ Verify elements extracted with [ref=eXX] markers
```

**EXECUTION PLAN FOR STEP 9:**
Output this to user before proceeding:

```yaml
STEP 9: Analyze ARIA Snapshot
Goal: Parse ARIA tree and extract interactive elements
What will happen:
  - Read aria-snapshot.yaml file from {OUTPUT_PATH}
  - Parse ARIA structure to find interactive elements
  - Extract elements with [ref=eXX] markers
  - Capture role, accessible name, and identifying info
Expected: Elements parsed and references extracted
How I'll verify: Count of extracted elements > 0
Next step: After this, I'll generate Playwright locators
```

**Actions:**

Parse ARIA snapshot file: `🔍 Analyzing ARIA accessibility tree...`

- Read from: `{OUTPUT_PATH}/aria-snapshot.yaml`: `📖 Loading ARIA snapshot...`
- Parse YAML structure: `🔎 Parsing ARIA structure...`
- Extract interactive elements: `🎯 Extracting interactive elements...`

For each element found:

- Capture element role: `✅ Role captured`
- Capture accessible name: `✅ Name captured`
- Extract reference token `[ref=eXX]`: `✅ Reference extracted`
- Store identifying information: `💾 Information stored`

If parsing the ARIA snapshot fails:

- Report the error: `❌ Failed to parse ARIA snapshot`
- STOP execution immediately: `🛑 Cannot continue without ARIA data`

If no interactive elements are found:

- Log a warning: `⚠️ No interactive elements found in ARIA snapshot`
- Continue with empty element list

For ARIA snapshot format details, see [../aria-snapshot-format.md](../aria-snapshot-format.md).

**Output completion:**

```yaml
✅ ARIA snapshot analyzed
   - Elements found: {COUNT}
   - References extracted: {REF_COUNT}
```

### STEP 10: Generate Locators

**STEP 10 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (convert ARIA elements to Playwright locators)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute generation ONLY after confirmation received
☐ Verify locators.md written successfully
```

**EXECUTION PLAN FOR STEP 10:**
Output this to user before proceeding:

```md
STEP 10: Generate Locators
Goal: Convert ARIA elements into Playwright-compatible locators
What will happen:
  - Generate meaningful locator names from roles and text
  - Create XPath selectors for each element
  - Preserve original [ref=eXX] references
  - Group elements by type where useful
  - Write all to locators.md
Expected: locators.md created with all elements
How I'll verify: File exists with expected locator entries
Next step: After this, I'll collect network data
```

**Actions:**

Generate Playwright locators: `🎯 Creating locator definitions...`

For each extracted element:

- Generate meaningful name: `✅ Name generated`
   - Use role and accessible text as basis
   - Format: `{role}_{text}` or similar

- Generate XPath selector: `🔗 XPath created`
   - Create accurate XPath to match ARIA element
   - Test readability and uniqueness

- Preserve reference token: `💾 Reference preserved`
   - Keep original `[ref=eXX]` marker

- Capture element metadata: `📝 Metadata recorded`
   - Role, state, properties, etc.

Write output to: `{OUTPUT_PATH}/locators.md`: `📝 Writing locators...`

Organize locators in output:

- Group by element type (buttons, inputs, links, etc.): `✅ Grouped by type`
- Include reference to ARIA snapshot: `✅ Cross-reference included`
- Add usage examples: `✅ Examples provided`

If writing `locators.md` fails:

- Report the error: `❌ Failed to write locators.md`
- STOP execution: `🛑 Cannot continue without locator output`

For locator naming and output format, see [../locators-output-format.md](../locators-output-format.md).

**Output completion:**

```yaml
✅ Locators generated and saved
   - Total locators: {COUNT}
   - File: {OUTPUT_PATH}/locators.md
```

### ~~STEP 11: Collect Network Data~~ — ⛔ DISABLED — SKIP THIS ENTIRE STEP

**STEP 11 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (retrieve captured network requests/responses)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute retrieval ONLY after confirmation received
☐ Verify network data retrieved (non-fatal if fails)
```

**EXECUTION PLAN FOR STEP 11:**
Output this to user before proceeding:

```yaml
STEP 11: Collect Network Data
Goal: Retrieve all captured network requests/responses
What will happen:
  - Query network capture for {SESSION_NAME}
  - Parse captured requests and responses
  - Extract endpoints, schemas, call sequences
  - Note: Failure here is non-critical
Expected: Network data retrieved or empty (non-blocking)
How I'll verify: Network data parsed or skipped gracefully
Next step: After this, I'll write network output if data exists
```

**Actions:**

Retrieve network capture data: `📡 Collecting network data...`

For the selected session: `{SESSION_NAME}`: `🎯 Querying session network data...`

- Read captured network calls: `📖 Loading network capture...`
- Parse the result into structured data: `🔎 Parsing network data...`

Extract required information:

- `NETWORK_CALLS` - list of request/response pairs: `✅ Network calls extracted`
- `CAPTURE_START_TIME` - timestamp when capture began: `⏰ Start time extracted`
- `PAGE_URL` - the page being captured: `✅ Page URL extracted`

Additional network data to extract:

- Endpoint inventory: `📊 Endpoints cataloged`
- Request/response schemas: `🔗 Schemas detected`
- Call sequences and dependencies: `📋 Sequences identified`
- Timing information: `⏱️ Timing data collected`

If network capture retrieval fails:

- Log a warning: `⚠️ Network retrieval failed (non-critical)`
- Continue with empty network data: `ℹ️ Proceeding without network data`
- This does not block further steps

If no network data was captured:

- Log an info message: `ℹ️ No network data captured`
- Continue with next step

For network capture details, see [../network-capture.md](../network-capture.md).

**Output completion:**

```yaml
✅ Network data collected
   - Requests captured: {COUNT} (or 0 if unavailable)
   - Ready for output or skipping
```

### STEP 12: Write Network Output

**STEP 12 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (save network data if available)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute write ONLY after confirmation received
☐ Verify network-calls.json written (non-fatal if skipped)
```

**EXECUTION PLAN FOR STEP 12:**
Output this to user before proceeding:

```yaml
STEP 12: Write Network Output
Goal: Save captured network requests/responses
What will happen:
  - If network data exists: write network-calls.json
  - Include summary metrics (request counts, avg duration)
  - Extract endpoint inventory and call sequences
  - Note: Failure here is non-critical
Expected: network-calls.json created (or skipped if no data)
How I'll verify: File exists with expected metrics
Next step: After this, I'll reset session capture state
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
      - URLs with request counts
      - Methods and response codes

   - request and response schema summaries: `✅ Schema detection included`
      - Common request headers/fields
      - Common response structures

   - call sequences: `✅ Call sequences included`
      - Order of requests
      - Dependencies between calls

   - timing breakdown: `✅ Timing breakdown included`
      - DNS time, TLS handshake, TTFB, download

If `NETWORK_CALLS` is empty or unavailable:

- Skip network output: `ℹ️ No network data to write (skipping)`
- Continue with other steps

If writing `network-calls.json` fails:

- Log a warning: `⚠️ Network output failed (non-critical, continuing)`
- Continue with remaining steps

For network output format, see [../network-capture-format.md](../network-capture-format.md).

**Output completion:**

```yaml
✅ Network data processed
   - Status: Data written or no data to write
   - File: {OUTPUT_PATH}/network-calls.json (if created)
```

### STEP 13: Reset Session Capture State

**STEP 13 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (reset network capture for next run)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute reset ONLY after confirmation received
☐ Verify capture state reset (non-fatal if fails)
```

**EXECUTION PLAN FOR STEP 13:**
Output this to user before proceeding:

```yaml
STEP 13: Reset Session Capture State
Goal: Clear capture state for next session-mode run
What will happen:
  - Reset network capture state for {SESSION_NAME}
  - Prepare session for additional captures
  - Note: Failure here is non-critical
Expected: Capture state reset or already clean
How I'll verify: Reset command succeeds or is no-op
Next step: After this, I'll update task documentation
```

**Actions:**

Reset session capture state: `🔄 Clearing capture state...`

For the selected session: `{SESSION_NAME}`: `🎯 Resetting session state...`

- Reset network capture counters: `✅ Network state reset`
- Clear captured request buffer: `✅ Request buffer cleared`
- Reset timing information: `⏰ Timing state reset`

Acceptable outcomes:

- State successfully reset: `✅ State reset complete`
- Already in clean state: `ℹ️ State already clean`
- Both treated as success: `🎉 Ready for next capture`

If reset fails:

- Log a warning: `⚠️ Capture state reset failed (non-critical)`
- Continue with next step: `ℹ️ Proceeding anyway`
- This does not block further steps

Note for user:

- The browser session remains open: `💻 Session still active`
- User can run session mode again for another page: `🔄 Ready for next capture`

**Output completion:**

```sh
✅ Session capture state reset
   - Session: {SESSION_NAME}
   - Ready for next capture
```

### STEP 14: Update Task Documentation

**STEP 14 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (update README files with new page info)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute update ONLY after confirmation received
☐ Verify README files updated (non-fatal if fails)
```

**EXECUTION PLAN FOR STEP 14:**
Output this to user before proceeding:

```yaml
STEP 14: Update Task Documentation
Goal: Record newly captured page in task documentation
What will happen:
  - Update locators/README.md with page info
  - Update task README with new page
  - Include locator file path and status
  - Note: Failure here is non-critical
Expected: Both README files updated
How I'll verify: Files exist with new page references
Next step: After this, I'll keep browser session open
```

**Actions:**

Update task documentation: `📚 Updating documentation...`

Update file: `./test-tasks/playwright/{TASK_ID}/locators/README.md`: `✏️ Updating locators index...`

- Add entry for `{PAGE_NAME}`: `✅ Page entry added`
- Include locator file path: `📁 Path recorded`
   - `./test-tasks/playwright/{TASK_ID}/locators/{PAGE_NAME}/locators.md`

- Add metadata: `📝 Metadata added`
   - Capture date/time: `⏰ Timestamp recorded`
   - Session ID: `🔗 Session ID added`
   - Element count: `🎯 Element count recorded`
   - Network data status: `📡 Network status noted`

Update file: `./test-tasks/playwright/{TASK_ID}/README.md`: `✏️ Updating task README...`

- Add newly captured page to status table: `✅ Page added to table`
- Mark as "✅ Captured (session mode)": `✅ Status updated`
- Include output location: `📁 Location referenced`

If documentation update fails:

- Log a warning: `⚠️ Documentation update failed (non-critical)`
- Continue with next step: `ℹ️ Proceeding anyway`
- This does not block further steps

If files don't exist:

- Create basic structure if needed: `🆕 Creating file structure...`
- Continue with update: `✅ Structure created`

**Output completion:**

```rb
✅ Task documentation updated
   - Locators README: Updated
   - Task README: Updated
   - New page: {PAGE_NAME}
```

### STEP 15: Keep Browser Session Running

**STEP 15 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (leave browser session open)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute continuation ONLY after confirmation received
☐ Verify session remains open (non-fatal if unexpected close)
```

**EXECUTION PLAN FOR STEP 15:**
Output this to user before proceeding:

```yaml
STEP 15: Keep Browser Session Running
Goal: Leave browser open for next capture
What will happen:
  - Keep {SESSION_NAME} open and active
  - Do NOT close browser
  - Session ready for additional captures
Expected: Session remains running
How I'll verify: Session still exists and is active
Next step: After this, I'll show final summary
```

**Actions:**

Preserve browser session: `💻 Preserving session...`

Verify session is still running: `🔍 Checking session status...`

- Query session state for `{SESSION_NAME}`: `🎯 Querying state...`
- Confirm status is `running`: `✅ Session is running`

DO NOT close the browser:

- Keep browser process alive: `💻 Session active`
- Maintain all open tabs: `📄 Tabs preserved`
- Preserve browsing history: `📜 History intact`
- Keep cookies and local storage: `💾 State preserved`

Inform user of session availability: `📢 Informing user...`

Print message to user:

```yaml
💻 Browser session remains open: {SESSION_NAME}

The current browser session is still active and ready for:
  • Additional session-mode captures
  • Manual navigation and testing
  • Further interaction with the page

To capture another page:
  1. Navigate in the browser to a new page
  2. Run session mode again with a new page name
  3. All session data is preserved between captures

The session will remain open until:
  • You manually close the browser window
  • You run another mode that closes the session
```

If session unexpectedly closed:

- Log a warning: `⚠️ Session closed unexpectedly`
- Continue with summary: `ℹ️ Session was closed, capturing state`
- This does not fail the capture (already completed)

**Output completion:**

```yaml
✅ Session preservation complete
   - Session: {SESSION_NAME}
   - Status: Running and available
   - Ready for: Additional captures
```

### STEP 16: Show Summary

**STEP 16 EXECUTION CHECKLIST:**

```ini
☐ Understand what this step does (display final summary)
☐ Output the plan to user
☐ STOP and wait for user confirmation (✓ Proceed)
☐ Execute summary display ONLY after confirmation received
☐ Verify all information displayed correctly
```

**EXECUTION PLAN FOR STEP 16:**
Output this to user before proceeding:

```yaml
STEP 16: Show Summary
Goal: Display complete capture results
What will happen:
  - Show success confirmation
  - Display file locations and counts
  - Confirm network data capture
  - Confirm session remains open
Expected: Comprehensive summary shown
How I'll verify: All fields displayed with correct values
Next step: Capture complete! (No more steps)
```

**Actions:**

Display final summary: `📊 Generating summary...`

Print success header: `✅ Capture completed successfully`

```ini
✅ Captured locators from session: {SESSION_NAME}
📄 Saved to: {OUTPUT_PATH}
```

Print detailed results: `📈 Detailed results...`

Include all important metrics:

- Total elements captured: `🎯 {ELEMENT_COUNT} elements`
- Locators generated: `📝 {LOCATOR_COUNT} locators`
- Screenshot saved: `📸 {OUTPUT_PATH}/screenshot-{timestamp}.png`
- ARIA snapshot saved: `🌳 {OUTPUT_PATH}/aria-snapshot.yaml`
- Metadata saved: `📋 {OUTPUT_PATH}/metadata.json`
- Locators saved: `📁 {OUTPUT_PATH}/locators.md`

Print network data status: `📡 Network data status...`

- Network calls captured: `📡 {NETWORK_COUNT} requests`
- Network output saved: `💾 {OUTPUT_PATH}/network-calls.json` (if captured)
- Summary metrics included: `✅ Request counts, timing, endpoints`

If network was not captured:

- Status note: `ℹ️ Network capture: Not available`

Print session status: `💻 Session status...`

- Browser session: `✅ Active and running`
- Session ID: `🔗 {SESSION_NAME}`
- Ready for next capture: `🔄 Yes, run session mode again for another page`

Print next steps: `➡️ Next steps...`

```ini
Ready for next capture?
  • Navigate to another page in the browser
  • Run: /playwright-capture --task={TASK_ID} --name={NEW_PAGE_NAME}
  • Or manually close the browser when done

All captured files are saved to:
  {OUTPUT_PATH}/

Continue using this session for more pages!
```

Print completion emoji: `🎉 Capture session complete!`

**Output completion:**

```rb
✅ Summary displayed
   - All metrics shown
   - Files confirmed saved
   - Session status confirmed active
```

## Error Handling

### Fatal Errors

Stop execution for any of the following:

- missing task ID after prompting
- missing page name after prompting
- task creation declined
- no active browser sessions found
- selected session no longer running
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
- capture state reset failure
- task README update failure

For error handling guidance, see [../error-handling.md](../error-handling.md).

## Important Notes

- The browser stays open after capture.
- This mode is intended for capturing the current page state from an existing browser session.
- The user may continue navigating and run session mode again for additional pages.
- The capture state should be reset after each run so the next session-mode capture starts fresh.

## Example Output

```text
✅ Captured locators from session: session-1
📄 Saved to: ./test-tasks/playwright/test-dashboard/locators/DashboardPage/
📡 Network calls captured: 8 requests
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