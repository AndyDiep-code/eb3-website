# Locators Format

## locators.md Template

Write to `test-tasks/playwright/{TASK_ID}/locators/{PageName}/locators.md`:

```markdown
# {PageName} Locators

| Field | Value |
|-------|-------|
| Generated | {YYYY-MM-DD} |
| URL | {current_url} |
| Title | {page_title} |
| Browser | Playwright |
| Task | {TASK_ID} |

## Form Elements

| Name | Ref | Role | Selector | Description |
|------|-----|------|----------|-------------|
| {element_name} | {ref} | {role} | `{selector}` | {what it does} |

## Buttons

| Name | Ref | Role | Selector | Description |
|------|-----|------|----------|-------------|
| {element_name} | {ref} | button | `{selector}` | {what it does} |

## Navigation

| Name | Ref | Role | Selector | Description |
|------|-----|------|----------|-------------|
| {element_name} | {ref} | link/tab | `{selector}` | {what it does} |
```

## How to Derive the `Selector` Column from ARIA

Use exact ref values from the snapshot. Derive selectors as follows:

| ARIA element | Selector |
|-------------|----------|
| `button "Browse Templates"` | `getByRole('button', { name: 'Browse Templates' })` |
| `textbox "Search surveys"` | `getByRole('textbox', { name: 'Search surveys' })` |
| `link "Dashboard"` | `getByRole('link', { name: 'Dashboard' })` |
| Multiple same-name buttons | `getByRole('button', { name: 'Preview' }).nth(0)` |
| `spinbutton [ref=e761]` (no label) | `getByRole('spinbutton').nth(0)` |
| Element with no accessible name | `[ref={ref}]` or infer from context |
| Long button text with keywords | `getByRole('button', { name: /Browse Templates/ })` |

**Rule:** Always read the actual ARIA snapshot to get current refs. Do NOT use refs from memory or previous runs.

## Grouping Rules

- `## Form Elements` — textbox, spinbutton, select, checkbox, radio, textarea
- `## Buttons` — button elements (non-destructive only — skip Delete/Submit/Logout)
- `## Navigation` — link, tab, menuitem
- **Omit** nav sidebar items (already in queue) to avoid duplication
- **Omit** empty sections (don't add `## Navigation` if there are no nav links)
