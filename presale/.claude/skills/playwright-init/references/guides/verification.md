# Verification

Verify that the Playwright project was initialized successfully.

## Overview

After initialization, verify that the cloned project, installed dependencies, required tools, and generated configuration files are all present and usable.

## Input

This guide expects:

- `{OUTPUT}`: the initialized Playwright project directory to verify

## Verification Checks

### Check 1: Project Directory Exists

Verify that `{OUTPUT}` exists.

If missing:
```text
❌ Project directory not found
Initialization may have failed before clone completed
```

### Check 2: Required Project Files Exist

Verify that these files exist:

- `{OUTPUT}/playwright.config.ts`
- `{OUTPUT}/package.json`
- `{OUTPUT}/tsconfig.json`

If any required file is missing:
```text
❌ Required project files are missing
Template clone may be incomplete
```

### Check 3: Dependencies Were Installed

Verify that:

- `{OUTPUT}/node_modules/` exists

If missing:
```text
❌ node_modules directory not found
Dependency installation may have failed
```

### Check 4: package.json Is Valid

Validate `package.json`:

```bash
node -e "require('{OUTPUT}/package.json')"
```

If invalid:
```text
❌ package.json is invalid
Check package.json syntax
```

### Check 5: Playwright Is Available

Run from `{OUTPUT}`:

```bash
npx playwright --version
```

If unavailable:
```text
❌ Playwright is not available
Dependency installation may be incomplete
```

### Check 6: TypeScript Is Available

Run from `{OUTPUT}`:

```bash
npx tsc --version
```

If unavailable:
```text
❌ TypeScript is not available
Dependency installation may be incomplete
```

### Check 7: Generated Config Exists

Verify that this file exists:

- `./test-tasks/playwright/qakit.config.json`

If missing:
```text
❌ qakit.config.json not found
Configuration generation may have failed
```

## Verification Process

### Step 1: Verify Project Files

Confirm that the project directory and required files exist.

### Step 2: Verify Dependency Installation

Confirm that `node_modules` exists and `package.json` is valid.

### Step 3: Verify Tool Availability

Run:

- `npx playwright --version`
- `npx tsc --version`

### Step 4: Verify Generated Config

Confirm that `./test-tasks/playwright/qakit.config.json` exists.

If all checks pass, print:

```text
✅ Installation verified
```

## Success Criteria

Initialization is successful if all of the following are true:

- ✅ project directory exists
- ✅ required project files exist
- ✅ node_modules exists
- ✅ package.json is valid
- ✅ Playwright is available
- ✅ TypeScript is available
- ✅ qakit.config.json exists

## Failure Reporting

If any verification step fails:

- stop verification
- report the failed check clearly
- explain the likely cause
- suggest re-running the relevant initialization step or the full setup if needed

## Verification Output

### Success

```text
✅ Required project files found
✅ node_modules directory exists
✅ package.json valid
✅ Playwright available
✅ TypeScript available
✅ qakit.config.json found

✅ Installation verified
```

### Failure

```text
❌ node_modules directory not found
Dependency installation may have failed
```

## Manual Verification

To manually verify the setup:

```bash
ls -la {OUTPUT}/playwright.config.ts
ls -la {OUTPUT}/package.json
ls -la {OUTPUT}/tsconfig.json
ls -la ./test-tasks/playwright/qakit.config.json

cd {OUTPUT}
npx playwright --version
npx tsc --version
```

## Related Documentation

- [../guides/template-cloning.md](../guides/template-cloning.md)
- [../guides/dependency-installation.md](../guides/dependency-installation.md)