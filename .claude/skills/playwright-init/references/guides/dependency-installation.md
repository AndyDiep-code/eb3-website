# Dependency Installation

Install project dependencies and required Playwright browser binaries for a Playwright project.

## Overview

After cloning the template, install project dependencies first, then install the required Playwright browser binaries.

Prefer `pnpm` when available. If `pnpm` is not installed, fall back to `npm`.

## Prerequisites

- Node.js must be installed (`v18+`)
- `npm` must be available
- `pnpm` is optional and preferred when available
- The Playwright project directory must already exist

## Step-by-Step Process

### STEP 1: Change Directory

Change to the project directory:

```bash
cd {OUTPUT}
```

If the target directory does not exist, stop and report the error.

### STEP 2: Detect Package Manager

Check whether `pnpm` is available:

```bash
command -v pnpm
```

Interpret the result as follows:

- if `pnpm` is available, use `pnpm`
- otherwise, use `npm`

Print:

- `📦 Installing dependencies with pnpm...`
- or `📦 Installing dependencies with npm...`

### STEP 3: Install Project Dependencies

If `pnpm` is available:

```bash
pnpm install
```

Otherwise:

```bash
npm install
```

If installation fails, stop and report the error.

After successful installation, print:

```text
📦 Dependencies installed with {pnpm|npm}
```

### STEP 4: Install Playwright Browsers

Install the required Playwright browser binaries:

```bash
npx playwright install
```

If browser installation fails, stop and report the error.

After successful installation, print:

```text
🌐 Playwright browsers installed
```

## Verification

After installation, verify all of the following.

### Check `node_modules`

Ensure the `node_modules/` directory exists.

### Check Lock File

Confirm that the expected lock file exists:

- `pnpm-lock.yaml` if `pnpm` was used
- `package-lock.json` if `npm` was used

### Check `package.json`

Validate `package.json`:

```bash
node -e "require('./package.json')"
```

### Check Playwright Availability

Confirm Playwright is installed and available:

```bash
npx playwright --version
```

If any verification step fails, stop and report the error.

After successful verification, print:

```text
✅ Dependency installation verified
```

## Error Handling

### Node.js Not Installed

```text
❌ Node.js is required but not installed
Install Node.js from https://nodejs.org/
```

### npm Not Available

```text
❌ npm is required but not available
Install Node.js from https://nodejs.org/
```

### Project Directory Missing

```text
❌ Project directory not found
Ensure the template was cloned successfully before installing dependencies
```

### Dependency Installation Failed

```text
❌ Dependency installation failed
Check package.json and lockfile state
Try again with: npm install or pnpm install
```

### Playwright Browser Installation Failed

```text
❌ Playwright browser installation failed
Try again with: npx playwright install
```

### Disk Space Error

```text
❌ Insufficient disk space
Free up disk space and try again
```

### Network Error

```text
❌ Network error during installation
Check internet connection and try again
```

## Typical Installation Time

Typical installation times:

- `pnpm`: 30-60 seconds
- `npm`: 60-120 seconds
- Playwright browser installation: depends on browser download state and network speed

## Installed Packages

Common packages include:

- `@playwright/test`
- `typescript`
- `allure-playwright`
- `eslint`
- `prettier`
- `dotenv`

## Example Output

```text
📦 Installing dependencies with pnpm...
📦 Dependencies installed with pnpm
🌐 Playwright browsers installed
✅ Dependency installation verified
```

## Related Documentation

- [../guides/template-cloning.md](../guides/template-cloning.md)
- [../guides/verification.md](../guides/verification.md)