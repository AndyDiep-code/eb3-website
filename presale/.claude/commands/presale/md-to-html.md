---
description: Convert markdown file to self-contained Enouvo-branded HTML with sidebar TOC, theme toggle, Mermaid diagrams, callouts, and copy-code buttons
argument-hint: [path-to-markdown-file]
allowed-tools: Read, Write, Bash, Skill
---

# Presale: Markdown to HTML

Convert a markdown file to a rich, self-contained HTML document with full Enouvo branding (logo, Red `#E74C3C` accent, watermark, footer). Output uses an interactive single-page layout: sidebar TOC with scrollspy, light/dark theme toggle, Mermaid diagrams, callouts, step timelines, comparison cards, and copy-to-clipboard code blocks.

## Usage

```
/presale:md-to-html path/to/file.md
```

## Input

- `$ARGUMENTS` — Path to the markdown file (relative to project root or absolute)

## Process

### Step 1 — Validate input

Verify the markdown file exists and is readable:

```bash
test -f "$ARGUMENTS" && head -1 "$ARGUMENTS" >/dev/null && echo OK || echo MISSING
```

If `MISSING`, stop and report the missing path.

### Step 2 — Activate the skill

Activate the `enouvo-docs-generator` skill. The skill instructs you to:

1. Read the markdown source (`$ARGUMENTS`)
2. Detect title, subtitle, language, doc type, headings, components needed
3. Read `.claude/skills/enouvo-docs-generator/assets/html-template.html`
4. Read `.claude/skills/enouvo-docs-generator/references/html-components.md` for component snippets
5. Base64-encode the Enouvo logos and embed as data URIs
6. Replace every `{{PLACEHOLDER}}`, inject TOC entries, assemble body content
7. Write output to `<input>.html` next to the source

### Step 3 — Output

Write the assembled HTML next to the source markdown:

```
Input:  docs/report.md
Output: docs/report.html
```

### Step 4 — Verify

Run a placeholder check to ensure all substitutions completed:

```bash
grep -o "{{[A-Z_]*}}" "${ARGUMENTS%.md}.html" || echo "All placeholders replaced"
```

## Output summary

```
HTML CONVERSION COMPLETE

Input:    $ARGUMENTS
Output:   <input>.html
Brand:    Enouvo logo + Red #E74C3C accent + "Powered by Enouvo" footer
Layout:   Sidebar TOC (scrollspy) + responsive mobile drawer
Theme:    Light / dark toggle (persisted)
Features: Mermaid, copy-code, callouts, step timeline, compare cards, watermark
Format:   Self-contained HTML (only Mermaid + Google Fonts loaded from CDN)
```

## Advanced

For component reference, placeholder list, and localization tables, see:
- `.claude/skills/enouvo-docs-generator/references/html-components.md`
- `.claude/skills/enouvo-docs-generator/references/usage.md`

For PDF or DOCX output of the same markdown, use the scripts:
- `python3 .claude/skills/enouvo-docs-generator/scripts/md_to_pdf.py <input>.md`
- `python3 .claude/skills/enouvo-docs-generator/scripts/md_to_docx.py <input>.md`
