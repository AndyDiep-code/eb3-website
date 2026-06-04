# Template Cloning

How the Enouvo Playwright template is cloned from GitLab.

## Overview

The Playwright automation project is initialized by cloning the official Enouvo template from GitLab. This ensures a consistent, up-to-date project structure with all necessary configurations.

## Input

This guide expects:

- `{OUTPUT}`: the target directory where the template will be cloned

The calling mode must ensure:
- `{OUTPUT}` is valid
- `{OUTPUT}` does not already exist (or has been handled via backup/cleanup)

## Template Source

**Repository**: `https://gitlab.enouvo.com/enouvo/team-qa/ai-playwright-codebase`

**Branch**: main (default)

**Contents**:
- Playwright configuration
- Page Object Model examples
- Test fixtures and utilities
- AI agent configurations
- Documentation

## Cloning Process

### Step 1: Validate Git

Check git is installed:

```bash
git --version
```

If not installed:
- Print: `❌ git is required but not installed`
- Suggest: `Install git from https://git-scm.com/`
- Stop execution

### Step 2: Clone Repository (Temp → Move strategy)

**Do NOT clone directly into `{OUTPUT}`.** Clone into a temp dir first, then move content excluding `.git`.

This guarantees the output directory has no git history, no remote config, and `git remote -v` inside it returns nothing.

```bash
TEMP="${OUTPUT}__clone_tmp"

# 1. Clone to temp
git clone --depth=1 https://gitlab.enouvo.com/enouvo/team-qa/ai-playwright-codebase "${TEMP}"

# 2. Move content (excluding .git) to OUTPUT
python3 -c "
import shutil, os, sys
src = '${TEMP}'
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
# Remove temp dir (includes .git)
shutil.rmtree(src)
print('OK')
"
```

If clone or Python step fails:
- Print: `❌ Failed to clone template from GitLab`
- Suggest: `Check internet connection and GitLab access`
- Stop execution

### Step 3: Verify .git Was Not Carried Over (FATAL)

```bash
python3 -c "
import os, sys
git_dir = '${OUTPUT}/' + '.git'
if os.path.exists(git_dir):
    print('FAIL: .git still in output')
    sys.exit(1)
print('OK')
"
```

If this check fails → **stop execution**. Print:

```text
❌ .git directory present in {OUTPUT}
   The template repo's git history was not removed.
   Fix: python3 -c "import shutil; shutil.rmtree('{OUTPUT}/' + '.git')"
   Then re-run init.
```

**Why this is fatal:** `.git` in the output causes `git remote -v` to show the Enouvo GitLab remote, and `git rev-parse --show-toplevel` to return the wrong root, breaking all QAKit path resolution.

### Step 4: Verify Clone Content

Verify required files exist:

- `{OUTPUT}/playwright.config.ts`
- `{OUTPUT}/package.json`
- `{OUTPUT}/tsconfig.json`

If any file is missing:
- Print: `❌ Template clone incomplete`
- Stop execution

After successful verification, print:

```text
✅ Template cloned to {OUTPUT} (no git history)
✅ .git verified absent
✅ Template files verified
```

## Error Handling

### Git Not Installed

```text
❌ git is required but not installed
Install git from https://git-scm.com/
```

### Clone Failed

```text
❌ Failed to clone template from GitLab
Check internet connection and GitLab access
```

### Invalid Output Path

```text
❌ Invalid output path: {OUTPUT}
Use a valid directory path (e.g., ./tests/playwright)
```

### Permission Denied

```text
❌ Permission denied: {OUTPUT}
Check directory permissions
```

## Related Documentation

- [../guides/dependency-installation.md](../guides/dependency-installation.md)
- [../guides/verification.md](../guides/verification.md)