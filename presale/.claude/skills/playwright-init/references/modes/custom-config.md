# CUSTOM CONFIG MODE - Clone with Custom Configuration

Clone the Enouvo Playwright template to a custom output path, apply custom configuration values, install dependencies, and create the config.

## Overview

Use this mode when the user wants to initialize a Playwright project with one or more custom settings such as output path, base URL, browsers, or reporters.

## Terminal Output Standards

Define these color variables at the start of ALL bash execution in this mode:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Playwright Init — Custom Config    ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
# Before running commands
echo -e "${YELLOW}⏳ [X/10] Step description...${NC}"

# After success
echo -e "${GREEN}✅ [X/10] Step description${NC}"

# On failure — print then stop
echo -e "${RED}❌ [X/10] Step description — FAILED${NC}"

# Info/secondary messages
echo -e "${GRAY}   ℹ  Additional info${NC}"
```

After STEP 9 verification, output the following as **Claude text response**:

```
**🎉 Playwright initialized**

| | |
|---|---|
| **Location** | `{OUTPUT}/` |
| **Config** | `./test-tasks/playwright/qakit.config.json` |
| **Browsers** | {BROWSERS} |
| **Reports** | {REPORTERS} |
| **BaseURL** | {BASE_URL or (empty)} |

→ **Next:** `/qakit:playwright:task --task=<id>`
```

## Prerequisites

- Git must be installed.
- Node.js must be installed (`v18+`).
- `npm` or `pnpm` must be available.
- A custom output path must be provided.
- Optional custom values may also be provided for base URL, browsers, and reporters.

## Step-by-Step Process

### STEP 1: Validate Prerequisites

- Run `git --version`.
- Run `node --version`.
- Confirm that a custom output path was provided.
- If any required prerequisite is missing, print a clear error and stop.

### STEP 2: Parse and Set Values

Use the provided values and apply defaults for anything not provided.

- `OUTPUT=<provided custom path>`
- `BASE_URL=<provided base URL or empty>`
- `BROWSERS=<provided browser list or chromium>`
- `REPORTERS=<provided reporter list or allure,html>`

### STEP 3: Validate Custom Values

Validate all provided values before continuing.

#### Output Path
- Ensure the path is not empty.
- Ensure the path is not only whitespace.
- Ensure the path does not contain invalid or unsafe characters for the target environment.
- If the path is invalid, print a clear error and stop.

Print: `📁 Output path: {OUTPUT}`

#### Base URL
- If a base URL is provided, ensure it is in a valid URL format.
- If invalid, print a clear error and stop.

#### Browsers
- If a browser list is provided, validate each value.
- Allowed values: `chromium`, `firefox`, `webkit`
- If any browser value is invalid, print a clear error and stop.

#### Reporters
- If a reporter list is provided, validate each value.
- Allowed values: `allure`, `html`, `list`
- If any reporter value is invalid, print a clear error and stop.

### STEP 4: Backup Existing Project

If `{OUTPUT}` already exists:

- Move it to `{OUTPUT}.backup.{timestamp}`
- Print: `⚠️ Existing project backed up to {OUTPUT}.backup.{timestamp}`

After backup:
- Ensure `{OUTPUT}` no longer exists before cloning
- Continue with initialization from STEP 5

### STEP 5: Clone Template

Clone into a **temp directory first**, then move content without `.git` to the output path.
This avoids leaving any git history or remote config in the output directory.

```bash
TEMP_CLONE="${OUTPUT}__clone_tmp"

git clone --depth=1 https://gitlab.enouvo.com/enouvo/team-qa/ai-playwright-codebase "${TEMP_CLONE}"

python3 -c "
import shutil, os, sys
src = '${TEMP_CLONE}'
dst = '${OUTPUT}'
os.makedirs(dst, exist_ok=True)
for item in os.listdir(src):
    if item == '.git':
        continue
    s = os.path.join(src, item)
    d = os.path.join(dst, item)
    if os.path.isdir(s):
        shutil.copytree(s, d, dirs_exist_ok=True)
    else:
        shutil.copy2(s, d)
shutil.rmtree(src)
print('OK')
"
```

If the Python step exits non-zero → print `❌ [5/10] Clone failed` and stop.

**Verify (FATAL):** After cloning, assert `.git` does NOT exist in `{OUTPUT}`. If it does → stop and instruct user to remove manually.

- Print: `✅ [5/10] Template cloned to {OUTPUT} (no git history)`

For cloning rules, see [../guides/template-cloning.md](../guides/template-cloning.md).

### STEP 6: Create Config

- Create directory: `./test-tasks/playwright/`
- Create file: `./test-tasks/playwright/qakit.config.json`

Use this structure:

```json
{
  "automationPath": "{OUTPUT}",
  "baseUrl": "{BASE_URL}",
  "browsers": [{BROWSERS_ARRAY}],
  "reporters": [{REPORTERS_ARRAY}],
  "initialized": "<current ISO timestamp>"
}
```

- Print: `✅ Config created at ./test-tasks/playwright/qakit.config.json`

For the config format, see [../formats/config-schema.md](../formats/config-schema.md).

### STEP 7: Apply Custom Configuration

Apply the provided custom values to the Playwright project configuration.

- Update `playwright.config.ts` with the provided `baseUrl` if present.
- Update browser-related configuration based on the validated browser list.
- Update reporter configuration based on the validated reporter list.
- Keep default values for any custom setting not explicitly provided.
- Print: `✅ Playwright configuration updated`

### STEP 8: Install Dependencies

- Change directory to `{OUTPUT}`
- Check whether `pnpm` is available with `command -v pnpm`
- If `pnpm` is available, run `pnpm install`
- Otherwise, run `npm install`
- Print: `📦 Dependencies installed with {pnpm|npm}`

### STEP 8.1: Install Playwright Browsers

- Run: `npx playwright install`
- This installs required browser binaries for Playwright
- Print: `🌐 Playwright browsers installed`

For installation rules, see [../guides/dependency-installation.md](../guides/dependency-installation.md).

### STEP 9: Verify Installation

Verify all of the following:

- `playwright.config.ts` exists
- `node_modules/` exists
- `package.json` is valid by running `node -e "require('./package.json')"`
- `qakit.config.json` contains the expected custom values
- the applied Playwright configuration reflects the selected base URL, browsers, and reporters

Print: `✅ Installation verified`

For verification rules, see [../guides/verification.md](../guides/verification.md).

### STEP 10: Show Summary

Print:

```text
✅ Playwright automation project initialized
📁 Location: {OUTPUT}
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: {BASE_URL_OR_EMPTY}
🔗 Browsers: {BROWSERS}
📊 Reporters: {REPORTERS}

Next steps:
  1. Copy .env.example to .env
  2. Update .env with your configuration
  3. Run: npm test
```

## Example Output

### Example 1: Custom Base URL

Input:
```text
output=./tests/e2e
baseUrl=https://example.com
```

Output:
```text
📁 Output path: ./tests/e2e
✅ Template cloned to ./tests/e2e
✅ Config created at ./test-tasks/playwright/qakit.config.json
✅ Playwright configuration updated
📦 Dependencies installed with pnpm
🌐 Playwright browsers installed
✅ Installation verified

✅ Playwright automation project initialized
📁 Location: ./tests/e2e
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: https://example.com
🔗 Browsers: chromium
📊 Reporters: allure, html
```

### Example 2: Multiple Browsers

Input:
```text
output=./tests/e2e
browsers=chromium,firefox,webkit
```

Output:
```text
📁 Output path: ./tests/e2e
✅ Template cloned to ./tests/e2e
✅ Config created at ./test-tasks/playwright/qakit.config.json
✅ Playwright configuration updated
📦 Dependencies installed with pnpm
🌐 Playwright browsers installed
✅ Installation verified

✅ Playwright automation project initialized
📁 Location: ./tests/e2e
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: (empty)
🔗 Browsers: chromium, firefox, webkit
📊 Reporters: allure, html
```

### Example 3: Custom Reporters

Input:
```text
output=./tests/e2e
reporters=html,list
```

Output:
```text
📁 Output path: ./tests/e2e
✅ Template cloned to ./tests/e2e
✅ Config created at ./test-tasks/playwright/qakit.config.json
✅ Playwright configuration updated
📦 Dependencies installed with pnpm
🌐 Playwright browsers installed
✅ Installation verified

✅ Playwright automation project initialized
📁 Location: ./tests/e2e
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: (empty)
🔗 Browsers: chromium
📊 Reporters: html, list
```

### Example 4: Full Custom Configuration

Input:
```text
output=./tests/e2e
baseUrl=https://staging.example.com
browsers=chromium,firefox
reporters=allure,html
```

Output:
```text
📁 Output path: ./tests/e2e
✅ Template cloned to ./tests/e2e
✅ Config created at ./test-tasks/playwright/qakit.config.json
✅ Playwright configuration updated
📦 Dependencies installed with pnpm
🌐 Playwright browsers installed
✅ Installation verified

✅ Playwright automation project initialized
📁 Location: ./tests/e2e
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: https://staging.example.com
🔗 Browsers: chromium, firefox
📊 Reporters: allure, html
```