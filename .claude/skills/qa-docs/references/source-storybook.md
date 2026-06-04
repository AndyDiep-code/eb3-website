# Source Mode: Storybook

Storybook is a **design specification tool**, NOT a test target. Read stories to understand WHAT features and states exist, then write TCs describing how a real user interacts with the running web app to reach those states. No Storybook URL, story path, or Storybook reference appears anywhere in the generated TCs.

## Story Categories — What to Generate

| Category | Action |
|----------|--------|
| `Pages/*` | Generate TCs. Steps describe real user navigation via UI clicks to reach that page. No URL inference. |
| `Product Components/*` | Generate TCs only for components with identifiable placement in a real feature (e.g. Stepper in a multi-step form). |
| `Foundations/*` | **SKIP** — design tokens are not user-testable |
| `Primitives/*` | **SKIP** — Button/Input etc. verified implicitly in feature TCs |
| `Introduction/*` | **SKIP** — documentation only |
| `Proposals/*` / `Layouts/*` | **SKIP** unless the proposal maps to a shipped feature |

## Extraction Rules

| Story field | → TC output |
|-------------|-------------|
| `meta.title` | Feature/module name |
| Named export / `name:` | UI state to test (`ModalOpen`, `Step1Active`, `PendingState`) |
| `args: {...}` | Preconditions (state app must be in before the step) |
| `Default/Basic` name pattern | Type: `HP`, Priority: `High`, Tags: `visual,regression,smoke` |
| `Error/Invalid/Failed` name pattern | Type: `NEG`, Priority: `Normal`, Tags: `visual,regression` |
| `Empty/Edge/Disabled/Loading` name pattern | Type: `EDGE`, Priority: `Normal`, Tags: `visual,regression` |

## Steps Format

Write as a real user journey. NO Storybook URLs, NO story paths, NO "open Storybook":

```
1. Log in to the application.
2. Click [feature name] in the navigation.
3. [Real user actions: click, select, fill, submit].
4. Verify [UI state matching the story's design spec].
```

## Description Format (≤150 chars)

`[Page/Component] → [state]. Confirms [design spec] is implemented in the running app.`

Example: `ResourceCard → amber state. Confirms pending-change visual renders when delta is non-zero.`

## TC ID Format

`{FEATURE_ABBREV}-{STATE_ABBREV}-{NNN}` — 2 segments only (e.g. `AVAIL-SLOT-001`, not `AVAIL-BOOK-OPEN-001`)

## Output Files

`storybook.md` + `storybook.csv`

No E2E section, no BR Coverage section. DO include tag counts + execution strategy at the end.

**Tag counts and file header total MUST be exact** — count every TC row and tally each tag individually. Never estimate.

**CSV for large outputs (>50 TCs)**: generate MD first, then derive CSV by parsing MD tables.
