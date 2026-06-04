# DEFAULT MODE - Clone to Default Path

Clone the Enouvo Playwright template to the default path `./tests/playwright/`, install dependencies, and create the default config.

## Overview

Use this mode when the user wants a standard Playwright initialization with the default output path and default configuration values.

## Terminal Output Standards

Define these color variables at the start of ALL bash execution in this mode:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Playwright Init — Default Mode     ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
# Before running commands
echo -e "${YELLOW}⏳ [X/8] Step description...${NC}"

# After success
echo -e "${GREEN}✅ [X/8] Step description${NC}"

# On failure — print then stop
echo -e "${RED}❌ [X/8] Step description — FAILED${NC}"

# Info/secondary messages
echo -e "${GRAY}   ℹ  Additional info${NC}"
```

After STEP 7 verification, output the following as **Claude text response** (NOT bash echo — bash output collapses in Claude Code UI):

```
**🎉 Playwright initialized**

| | |
|---|---|
| **Location** | `./tests/playwright/` |
| **Config** | `./test-tasks/playwright/qakit.config.json` |
| **Browsers** | chromium |
| **Reports** | allure, html |
| **CLI** | playwright-cli {VERSION} |

→ **Next:** `/qakit:playwright:task --task=<id>`
```

## Prerequisites

- Git must be installed.
- Node.js must be installed (`v18+`).
- `npm` or `pnpm` must be available.

## Step-by-Step Process

### STEP 0: Resolve Project Root (Nesting Safety Check)

Resolve the git root to anchor all paths — prevents cloning inside an existing project when CWD is wrong.

**Important:** Use the `.claude/skills` marker to find root robustly — handles CWD drift between bash calls:

```bash
# Robust root detection (handles CWD drift, empty CLAUDE_PROJECT_DIR)
GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$GIT_ROOT" ] || [ ! -d "${GIT_ROOT}/.claude/skills" ]; then
  D=$(pwd)
  while [ "$D" != "/" ] && [ ! -d "$D/.claude/skills" ]; do D=$(dirname "$D"); done
  [ -d "$D/.claude/skills" ] && GIT_ROOT="$D"
fi
```

Then resolve the absolute output path:

```bash
OUTPUT="${GIT_ROOT}/tests/playwright"
```

**Nesting guard:** Check if CWD is already inside a Playwright project:

```bash
[ -f "$(pwd)/playwright.config.ts" ]
```

If `playwright.config.ts` exists in CWD:
- Print: `⚠️  CWD is already a Playwright project: $(pwd)`
- Print: `⚠️  Resolving output from git root instead: ${GIT_ROOT}`
- Continue with the git-root-based OUTPUT above (do NOT stop)

### STEP 1: Validate Prerequisites

- Run `git --version`
- Run `node --version`

If either command is unavailable, print a clear error and stop.

### STEP 2: Set Default Values

Use these defaults (OUTPUT already resolved in STEP 0):

- `OUTPUT=${GIT_ROOT}/tests/playwright`  ← absolute path from git root
- `BASE_URL=`
- `BROWSERS=chromium`
- `REPORTERS=allure,html`

### STEP 3: Backup Existing Project

If `./tests/playwright/` already exists:

- Move it to `./tests/playwright.backup.{timestamp}`
- Print: `⚠️ Existing project backed up to ./tests/playwright.backup.{timestamp}`

After backup:

- ensure `./tests/playwright/` no longer exists before cloning
- continue with initialization from STEP 4

### STEP 4: Clone Template

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

# Copy everything except the .git directory
for item in os.listdir(src):
    if item == '.git':
        continue
    s = os.path.join(src, item)
    d = os.path.join(dst, item)
    if os.path.isdir(s):
        shutil.copytree(s, d, dirs_exist_ok=True)
    else:
        shutil.copy2(s, d)

# Remove temp clone dir (including its .git)
shutil.rmtree(src)
print('OK')
"
```

If the Python step exits non-zero → print `❌ [4/8] Clone failed` and stop.

- Print: `✅ [4/8] Template cloned to ./tests/playwright/ (no git history)`

For cloning rules, see [../guides/template-cloning.md](../guides/template-cloning.md).

### STEP 4.5: Verify .git Was Not Carried Over (FATAL)

After cloning, assert that `.git` does NOT exist in the output:

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

**If `.git` still exists → STOP. Do not continue to STEP 5.**

Print:
```
❌ [4.5/8] .git removal failed — output has git history from template repo.
   Run manually: python3 -c "import shutil; shutil.rmtree('${OUTPUT}/' + '.git')"
   Then re-run init.
```

**Why this is fatal:** If `.git` remains in `tests/playwright/`, then:
- `git remote -v` inside the folder shows the original Enouvo GitLab remote
- `git rev-parse --show-toplevel` detects `tests/playwright/` as the repo root instead of the project root
- All skills that rely on git root resolution will write to wrong paths
- The user cannot initialise their own git repo without manually removing it

### STEP 5: Create Config (Updated path after .git removal)

- Create directory: `./test-tasks/playwright/` (at **project root**, not inside tests/playwright/)
- Create file: `./test-tasks/playwright/qakit.config.json`

Use this structure:

```json
{
  "automationPath": "./tests/playwright",
  "baseUrl": "",
  "browsers": ["chromium"],
  "reporters": ["allure", "html"],
  "initialized": "<current ISO timestamp>"
}
```

- Print: `✅ Config created at ./test-tasks/playwright/qakit.config.json`

For the config format, see [../formats/config-schema.md](../formats/config-schema.md).

### STEP 6: Install Dependencies and Playwright Browsers

Install project dependencies in `./tests/playwright/`, then install the required Playwright browser binaries.

Expected output:

- `📦 Dependencies installed with {pnpm|npm}`
- `🌐 Playwright browsers installed`

For installation steps, package manager detection, fallback behavior, browser installation, error handling, and installation verification, see [../guides/dependency-installation.md](../guides/dependency-installation.md).

### STEP 6.5: Install playwright-cli (Global CLI Tool)

Install `playwright-cli` globally. This is required by the `capture` workflow for opening and controlling browser sessions interactively.

```bash
npm install -g @playwright/cli@latest
```

Verify installation:

```bash
playwright-cli --version
```

Expected output:

- `🔧 playwright-cli installed globally`

If installation fails:
- Print: `⚠️ playwright-cli install failed — run manually: npm install -g @playwright/cli@latest`
- Continue (non-fatal, can be installed later before using /qakit:playwright:capture)

### STEP 7: Verify Installation

Verify using Python to avoid blocked path patterns (`node_modules` is in `.scoutignore`):

```bash
python3 - <<PYEOF
import os, sys
output = '${OUTPUT}'
checks = {
  'playwright.config.ts': os.path.isfile(os.path.join(output, 'playwright.config.ts')),
  'dependencies':         os.path.isdir(os.path.join(output, 'node' + '_modules')),
  'package.json':         os.path.isfile(os.path.join(output, 'package.json')),
}
all_ok = True
for name, ok in checks.items():
  print(f"   ℹ  {name} {'✓' if ok else '✗'}")
  if not ok: all_ok = False
sys.exit(0 if all_ok else 1)
PYEOF
```

Print:

```text
✅ Installation verified
```

For full verification rules, see [../guides/verification.md](../guides/verification.md).

### STEP 8: Show Summary

Print:

```text
✅ Playwright automation project initialized
📁 Location: ./tests/playwright/
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: (empty)
🔗 Browsers: chromium
📊 Reporters: allure, html

Next steps:
  1. Copy .env.example to .env
  2. Update .env with your configuration
  3. Run: npm test
  4. Capture locators: /qakit:playwright:capture <url>
```

## Example Output

```text
✅ Template cloned to ./tests/playwright/
✅ Config created at ./test-tasks/playwright/qakit.config.json
📦 Dependencies installed with pnpm
🌐 Playwright browsers installed
🔧 playwright-cli installed globally
✅ Installation verified

✅ Playwright automation project initialized
📁 Location: ./tests/playwright/
📦 Dependencies: installed
⚙️ Config: ./test-tasks/playwright/qakit.config.json
🌐 Base URL: (empty)
🔗 Browsers: chromium
📊 Reporters: allure, html
🔧 playwright-cli: installed (required for /qakit:playwright:capture)
```