# Tab Switching Guide (Multi-Tab Navigation)

Technical reference for switching Playwright page context between browser tabs during capture.

## When to Use

When a new tab opens (OAuth redirect, link with `target=_blank`), Playwright context stays on the original tab. Use option (5) in the capture loop to switch context to the new tab before capturing.

## Detecting Open Tabs

Run `playwright-cli snapshot` and check the "Open tabs" section at the top of the output:

```
### Open tabs
- 0: (current) [Enoverse](https://staging.enoverse.app/...)    ← still tab 0
- 1: [Sign in to your account](https://login.microsoftonline.com/...)
```

If tab 1 is NOT marked `(current)`, context is still on tab 0 — use option (5) to switch.

## Switching Context

```bash
playwright-cli -s={SESSION} run-code "async page => {
  const pages = page.context().pages();
  await pages[TARGET_INDEX].bringToFront();
  return 'switched to: ' + pages[TARGET_INDEX].url().substring(0, 80);
}"
```

## Switching Back to Tab 0

```bash
playwright-cli -s={SESSION} run-code "async page => {
  const pages = page.context().pages();
  await pages[0].bringToFront();
  return 'back to: ' + pages[0].url().substring(0, 80);
}"
```

## Note on Cross-Origin Tabs

`playwright-cli snapshot` (which uses `accessibility.snapshot()`) works on any tab — including different domains — after switching Playwright page context correctly via `bringToFront()`.

What IS blocked cross-origin: `page.evaluate()` and DOM JS execution. These are not used for locator capture.

If `playwright-cli snapshot` returns empty on a cross-origin tab, the cause is almost always **context not switched** — verify with `playwright-cli list` that the session is pointing to the correct tab.
