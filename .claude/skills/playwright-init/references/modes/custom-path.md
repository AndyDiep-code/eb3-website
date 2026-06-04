# CUSTOM PATH MODE - Clone to Custom Path

Clone the Enouvo Playwright template to a custom output path, install dependencies, and create the default config.

## Overview

Use this mode when the user wants to initialize a Playwright project in a custom output directory while keeping the default configuration values.

## Terminal Output Standards

Define these color variables at the start of ALL bash execution in this mode:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Playwright Init — Custom Path      ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
# Before running commands
echo -e "${YELLOW}⏳ [X/9] Step description...${NC}"

# After success
echo -e "${GREEN}✅ [X/9] Step description${NC}"

# On failure — print then stop
echo -e "${RED}❌ [X/9] Step description — FAILED${NC}"

# Info/secondary messages
echo -e "${GRAY}   ℹ  Additional info${NC}"
```

After STEP 8 verification, output the following as **Claude text response**:

```
**🎉 Playwright initialized**

| | |
|---|---|
| **Location** | `{OUTPUT}/` |
| **Config** | `./test-tasks/playwright/qakit.config.json` |
| **Browsers** | chromium |
| **Reports** | allure, html |

→ **Next:** `/qakit:playwright:task --task=<id>`
```

## Prerequisites

- Git must be installed.
- Node.js must be installed (`v18+`).
- `npm` or `pnpm` must be available.
- A custom output path must be provided.

## Step-by-Step Process

### STEP 0: Resolve Project Root (Nesting Safety Check)

Resolve the git root to anchor relative paths correctly.

```bash
GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
```

If the provided OUTPUT is a relative path, resolve it from git root:

```bash
# e.g. ./tests/e2e → ${GIT_ROOT}/tests/e2e
OUTPUT=$(realpath --relative-base="${GIT_ROOT}" "${PROVIDED_OUTPUT}" 2>/dev/null \
  || echo "${GIT_ROOT}/${PROVIDED_OUTPUT#./}")
```

**Nesting guard:** Check if resolved OUTPUT would be nested inside an existing Playwright project:

```bash
PARENT="${OUTPUT}"
while [ "${PARENT}" != "/" ]; do
  PARENT=$(dirname "${PARENT}")
  [ -f "${PARENT}/playwright.config.ts" ] && NESTED=true && break
done
```

If `NESTED=true`:
- Print: `❌ Cannot initialize: output path "${OUTPUT}" is nested inside an existing Playwright project at "${PARENT}"`
- Print: `   Run this command from the project root, or choose a path outside the existing project.`
- Stop execution

### STEP 1: Validate Prerequisites

- Run `git --version`.
- Run `node --version`.
- Confirm that a custom output path was provided.
- If any required prerequisite is missing, print a clear error and stop.

### STEP 2: Set Values

Use the provided output path and these defaults:

- `OUTPUT=<provided custom path>`
- `BASE_URL=`
- `BROWSERS=chromium`
- `REPORTERS=allure,html`

### STEP 3: Validate Output Path

Validate the provided output path before continuing.

- Ensure the path is not empty.
- Ensure the path is not only whitespace.
- Ensure the path does not contain invalid or unsafe characters for the target environment.
- If the path is invalid, print a clear error and stop.

Print: `📁 Output path: {OUTPUT}`

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

# Clone into temp dir
git clone --depth=1 https://gitlab.enouvo.com/enouvo/team-qa/ai-playwright-codebase "${TEMP_CLONE}"

# Move content (excluding .git) to OUTPUT using Python
python3 -c "
import shutil, os, sys

src  = '${TEMP_CLONE}'
dst  = '${OUTPUT}'
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

If the Python step exits non-zero → print `❌ [5/9] Clone failed` and stop.

- Print: `✅ [5/9] Template cloned to {OUTPUT} (no git history)`

### STEP 5.5: Verify .git Was Not Carried Over (FATAL)

```bash
python3 -c "
import os, sys
git_dir = '${OUTPUT}/' + '.git'
if os.path.exists(git_dir):
    print('FAIL: .git still present in output — init aborted')
    sys.exit(1)
else:
    print('OK: no .git in output')
"
```

**If `.git` still exists → STOP.** Print error and instruct user to remove manually then re-run.

For cloning rules, see [../guides/template-cloning.md](../guides/template-cloning.md).

### STEP 6: Create Config

- Create directory: `./test-tasks/playwright/`
- Create file: `./test-tasks/playwright/qakit.config.json`

Use this structure:

```json
{
  "automationPath": "{OUTPUT}",
  "baseUrl": "",
  "browsers": ["chromium"],
  "reporters": ["allure", "html"],
  "initialized": "<current ISO timestamp>"
}
```

- Print: `✅ Config created at ./test-tasks/playwright/qakit.config.json`

For the config format, see [../formats/config-schema.md](../formats/config-schema.md).

### STEP 7: Install Dependencies

- Change directory to `{OUTPUT}`
- Check whether `pnpm` is available with `command -v pnpm`
- If `pnpm` is available, run `pnpm install`
- Otherwise, run `npm install`
- Print: `📦 Dependencies installed with {pnpm|npm}`

### STEP 7.1: Install Playwright Browsers

- Run: `npx playwright install`
- This installs required browser binaries for Playwright
- Print: `🌐 Playwright browsers installed`

For installation rules, see [../guides/dependency-installation.md](../guides/dependency-installation.md).

### STEP 8: Verify Installation

Verify all of the following:

- `playwright.config.ts` exists
- `node_modules/` exists
- `package.json` is valid by running `node -e "require('./package.json')"`

Print: `✅ Installation verified`

For verification rules, see [../guides/verification.md](../guides/verification.md).

### STEP 9: Show Summary

Print:

```text
✅ Playwright automation project initialized
📁 Location: {OUTPUT}
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: (empty)
🔗 Browsers: chromium
📊 Reporters: allure, html

Next steps:
  1. Copy .env.example to .env
  2. Update .env with your configuration
  3. Run: npm test
```

## Example Output

### Example 1: Custom Path

Input:
```text
output=./e2e
```

Output:
```text
📁 Output path: ./e2e
✅ Template cloned to ./e2e
✅ Config created at ./test-tasks/playwright/qakit.config.json
📦 Dependencies installed with pnpm
🌐 Playwright browsers installed
✅ Installation verified

✅ Playwright automation project initialized
📁 Location: ./e2e
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: (empty)
🔗 Browsers: chromium
📊 Reporters: allure, html
```

### Example 2: Nested Path

Input:
```text
output=./tests/automation/playwright
```

Output:
```text
📁 Output path: ./tests/automation/playwright
✅ Template cloned to ./tests/automation/playwright
✅ Config created at ./test-tasks/playwright/qakit.config.json
📦 Dependencies installed with npm
🌐 Playwright browsers installed
✅ Installation verified

✅ Playwright automation project initialized
📁 Location: ./tests/automation/playwright
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: (empty)
🔗 Browsers: chromium
📊 Reporters: allure, html
```