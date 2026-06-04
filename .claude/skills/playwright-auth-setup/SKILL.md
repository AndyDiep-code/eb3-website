---
name: playwright-auth-setup
description: Generate or update auth.setup.ts performLogin() based on a Page Object login method. Auto-detects credential env vars from .env. Use when setting up authentication for a new Playwright project or changing the login method.
user-invocable: true
when_to_use: "Invoke to generate or update Playwright auth.setup.ts based on a Page Object login."
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash(grep:*)
  - Bash(ls:*)
  - Bash(npx:*)
auto-approve: true
category: test
keywords: [playwright, auth, login, setup, credentials]
---

# Playwright Auth Setup

Generate or update `tests/auth.setup.ts` → `performLogin()` based on a Page Object login method.

## Arguments

- `--page=<PageName>` — Page Object class name (REQUIRED, e.g. `LoginWithMicrosoftPage`)
- `--method=<methodName>` — Login method on the Page Object (REQUIRED, e.g. `loginWithMicrosoft`)
- `--env-email=<VAR>` — Env var name for email/username (optional, auto-detected from .env)
- `--env-password=<VAR>` — Env var name for password/token (optional, auto-detected from .env)

---

## Terminal Output Standards

Define these color variables at the start of ALL bash execution:

```bash
CYAN='\033[1;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
RED='\033[0;31m'; GRAY='\033[0;90m'; WHITE='\033[1;37m'; NC='\033[0m'
```

Print this header block first:

```bash
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Playwright Auth Setup              ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
```

For every step, follow this pattern:

```bash
echo -e "${YELLOW}⏳ [X/9] Step description...${NC}"    # before
echo -e "${GREEN}✅ [X/9] Step description${NC}"        # after success
echo -e "${RED}❌ [X/9] Step description — FAILED${NC}"  # on failure
echo -e "${GRAY}   ℹ  Additional info${NC}"               # secondary info
```

At STEP 9, output the following as **Claude text response**:

```
**🎉 Auth setup complete**

| | |
|---|---|
| **Page** | {PAGE_NAME} |
| **Method** | `{METHOD_NAME}()` |
| **Email var** | `{EMAIL_VAR}` |
| **Password var** | `{PASS_VAR}` |
| **File** | `./tests/playwright/tests/auth.setup.ts` |

→ **Next:** `/qakit:playwright:execute --task=<id>`
```

## Step-by-Step Process

### STEP 1: Parse Arguments

Extract:
- `PAGE_NAME` from `--page=<PageName>` (REQUIRED)
- `METHOD_NAME` from `--method=<methodName>` (REQUIRED)
- `ENV_EMAIL` from `--env-email=<VAR>` (optional, auto-detected)
- `ENV_PASSWORD` from `--env-password=<VAR>` (optional, auto-detected)

If `PAGE_NAME` or `METHOD_NAME` missing → stop, tell user which argument is needed.

### STEP 2: Validate POM Exists

**Filename conversion** (apply before looking up file):
1. Strip trailing `Page` suffix from PAGE_NAME if present
2. Convert PascalCase to kebab-case
- `LoginWithMicrosoft` → `login-with-microsoft.page.ts`
- `HomePage` → `home.page.ts`
- `AttendancePage` → `attendance.page.ts`

Store converted name as `KEBAB_NAME`.

Check: `{AUTOMATION_PATH}/pages/{KEBAB_NAME}.page.ts`

- If missing → stop: `❌ Page Object not found: pages/{KEBAB_NAME}.page.ts`
- If found → continue

### STEP 3: Validate Method Exists in POM

Grep for `async {METHOD_NAME}` in the POM file.

- If not found → stop: `❌ Method '{METHOD_NAME}' not found in {KEBAB_NAME}.page.ts`
- If found → continue

### STEP 4: Detect Env Vars from .env

If `--env-email` and `--env-password` NOT provided:

1. Read `.env` file from `{AUTOMATION_PATH}/.env`
2. Find vars that match credential patterns:
   - Email/username patterns: `EMAIL`, `USERNAME`, `USER`, `LOGIN`
   - Password/token patterns: `PASSWORD`, `PASS`, `TOKEN`, `SECRET`, `KEY`
3. If exactly 1 email var and 1 password var found → use them automatically
4. If multiple candidates found → show them and ask user to pick
5. If none found → ask user to provide var names

**Detection logic:**
```
EMAIL candidates = vars matching /EMAIL|USERNAME|USER|LOGIN/i (exclude PASSWORD/PASS)
PASSWORD candidates = vars matching /PASSWORD|PASS|TOKEN|SECRET|KEY/i
```

### STEP 5: Detect Method Signature

Read the POM file and extract the method signature to determine parameters:

```
async loginWithMicrosoft(email: string, password: string, staySignedIn = true)
→ Parameters: email (string), password (string), staySignedIn (boolean, default true)
→ Env mapping: email → ENV_EMAIL, password → ENV_PASSWORD
```

Map env vars to parameters by type:
- `string` param with name matching email pattern → ENV_EMAIL
- `string` param with name matching password/token pattern → ENV_PASSWORD
- `boolean` param with default → use the default value

### STEP 6: Generate performLogin() Body

Build the updated `performLogin()` content:

```typescript
import { {PAGE_NAME} } from '../pages/{KEBAB_NAME}.page';

async function performLogin(page: import('@playwright/test').Page): Promise<void> {
  const {envEmail} = process.env.{ENV_EMAIL} ?? '';
  const {envPassword} = process.env.{ENV_PASSWORD} ?? '';

  if (!{envEmail} || !{envPassword}) {
    throw new Error(
      '[auth] {ENV_EMAIL} and {ENV_PASSWORD} must be set in .env before running tests',
    );
  }

  const {instanceName} = new {PAGE_NAME}(page);
  await {instanceName}.{METHOD_NAME}({paramsList});
}
```

### STEP 7: Update auth.setup.ts

Read `tests/auth.setup.ts`. Update two sections:

**Section 1 — imports at top of file:**
Replace or add the POM import line (use `KEBAB_NAME` for the filename, `PAGE_NAME` for the class):
```typescript
import { {PAGE_NAME} } from '../pages/{KEBAB_NAME}.page';
```

**Section 2 — performLogin() function body:**
Replace the entire body of `performLogin()` with the generated content.

- If `auth.setup.ts` doesn't exist → stop: `❌ auth.setup.ts not found. Run /qakit:playwright:init-automation first.`
- If `performLogin()` not found in file → append it before the setup block

### STEP 8: TypeScript Compile Check

Run from `{AUTOMATION_PATH}`:
```bash
npx tsc --noEmit 2>&1 | grep -E "error TS|\.ts\("
```

- If clean → ✅ continue
- If errors → fix them, re-run, repeat until clean

### STEP 9: Show Summary

```
✅ auth.setup.ts updated

📄 Page Object:  pages/{PAGE_NAME}.page.ts
🔑 Login method: {METHOD_NAME}()
🔐 Credentials:  {ENV_EMAIL}, {ENV_PASSWORD} (from .env)

Next steps:
  1. Ensure .env has {ENV_EMAIL} and {ENV_PASSWORD} set
  2. Run tests: npx playwright test --project=chromium
     └─ auth.setup.ts will login once and cache to .auth/state.json
```

---

## Automation Path Resolution

Read `./test-tasks/playwright/qakit.config.json` → `automationPath`.
Default: `./tests/playwright`

## Env Var Name Conventions (auto-detection)

| Pattern matches | Treated as |
|----------------|-----------|
| `EMAIL`, `USERNAME`, `USER_EMAIL`, `LOGIN` | credential (email/username) |
| `PASSWORD`, `PASS`, `PASSWD`, `TOKEN`, `SECRET` | credential (password/token) |
| `BASE_URL`, `API_URL`, `REPORTER` | config (ignored) |

## Error Handling

| Situation | Action |
|-----------|--------|
| `--page` or `--method` missing | Stop, show which argument is needed |
| POM file not found | Stop with clear error + path |
| Method not in POM | Stop with suggestion to check spelling |
| `.env` not found | Ask user to provide env var names manually |
| Multiple credential vars | Ask user to select |
| auth.setup.ts missing | Stop, tell user to run init-automation first |
| TypeScript errors after update | Fix and re-verify |
