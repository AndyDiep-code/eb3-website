---
name: enouvo-docs-generator
description: Enouvo-branded document generator for converting Markdown to professional PDF, DOCX, or self-contained HTML files with Enouvo logo, brand colors (Red #E74C3C), and rich components (sidebar TOC, Mermaid, callouts, theme toggle). Use when converting markdown files to PDF/DOCX/HTML, generating branded reports, presale documents, or any markdown conversion task.
user-invocable: true
when_to_use: "Invoke to convert Markdown to branded PDF, DOCX, or HTML with Enouvo styling."
category: docs
keywords: [document, pdf, docx, html, branding, markdown, report, presale]
---

# Enouvo Document Generator

Convert Markdown files to professional documents with Enouvo branding in three output formats:

- **HTML** — self-contained, interactive (sidebar TOC, light/dark theme, Mermaid, copy-code) — agent-driven
- **PDF** — print-ready, A4, watermarked — Python script
- **DOCX** — Word-editable, branded — Python script

## Quick Usage

**HTML output** (agent-driven, see workflow below):
```
Read assets/html-template.html, references/html-components.md
Output: <input>.html next to source
```

**PDF output:**
```bash
python3 .claude/skills/enouvo-docs-generator/scripts/md_to_pdf.py input.md \
  --header-logo .claude/skills/enouvo-docs-generator/assets/enouvo-logo-header.webp \
  --watermark .claude/skills/enouvo-docs-generator/assets/enouvo-logo-watermark.png
```

**DOCX output:**
```bash
python3 .claude/skills/enouvo-docs-generator/scripts/md_to_docx.py input.md \
  --header-logo .claude/skills/enouvo-docs-generator/assets/enouvo-logo-header.webp \
  --watermark .claude/skills/enouvo-docs-generator/assets/enouvo-logo-watermark.png
```

## HTML Workflow (agent-driven)

When converting Markdown to HTML, follow these steps:

### Step 1 — Read source

Read the markdown file at `$INPUT`. Detect:
- Title (first H1)
- Subtitle (first paragraph after H1, ≤ 2 sentences)
- Language (ISO 639-1 from prose content)
- Document type (PLAN, SPEC, RFC, SYSTEM DESIGN, RUNBOOK, POSTMORTEM, NOTES)
- All `h2`/`h3` headings — assign `id` slugs

### Step 2 — Encode logos as base64 data URIs

Run from the project root:

```bash
HEADER_B64=$(base64 -i .claude/skills/enouvo-docs-generator/assets/enouvo-logo-header.webp | tr -d '\n')
WATERMARK_B64=$(base64 -i .claude/skills/enouvo-docs-generator/assets/enouvo-logo-watermark.png | tr -d '\n')
```

Use these to build the placeholder values:
- `{{ENOUVO_LOGO_HEADER_URI}}` → `data:image/webp;base64,${HEADER_B64}`
- `{{ENOUVO_LOGO_WATERMARK_URI}}` → `data:image/png;base64,${WATERMARK_B64}`

### Step 3 — Build the HTML

Read `assets/html-template.html` and replace ALL placeholders. See `references/html-components.md` for:
- The full placeholder list
- Component HTML snippets (timeline, callouts, highlight, mermaid, pros/cons, compare, collapsible)
- Selection heuristics (which component for which markdown pattern)

Replace `<!-- TOC_ENTRIES -->` with anchor links for every `h2`/`h3` in the document.
Replace the body content between `<!-- CONTENT_START -->` and `<!-- CONTENT_END -->` with assembled components.

### Step 4 — Verify

Before finishing, confirm:
- No remaining `{{...}}` placeholders (run `grep -o "{{[A-Z_]*}}" output.html` — must be empty)
- Every TOC anchor matches an existing `id` in the body
- Every `<pre class="mermaid">` contains a valid Mermaid diagram
- `<html lang="...">` matches the source language

### Step 5 — Output

Write the assembled HTML to `<input>.html` (same directory as the source markdown).

## Features

### PDF / DOCX
- **Header**: Enouvo logo (left) + document title (right) + red separator line
- **Footer**: Page X of Y (centered) + gray separator line
- **Watermark**: Centered logo at 8% opacity on all pages
- **Auto title**: Extracts from first H1 heading
- **Text wrapping**: Handles long URLs and code blocks
- **Tables**: Styled headers with Enouvo red (#E74C3C)
- **Mermaid diagrams**: Auto-installs mmdc and renders to SVG (requires npm)
- **Format**: A4 portrait, 3.5cm top/2.5cm bottom/2cm sides margins

### HTML (self-contained, interactive)
- **Brand**: Enouvo logo in topbar, Enouvo Red `#E74C3C` accent, "Powered by Enouvo" footer
- **Sidebar TOC**: Scrollspy active state, mobile drawer with backdrop
- **Theme toggle**: Light / dark with persistence (localStorage)
- **Mermaid**: Renders inline via CDN, themed for both light and dark
- **Code blocks**: Copy-to-clipboard button on hover
- **Components**: Step timeline, 6 callout variants (info/warn/danger/success/decision/tip), key-point highlight, pros/cons, comparison cards, collapsible sections
- **Accessibility**: Skip-to-content link, focus-visible rings, prefers-reduced-motion, WCAG AA contrast
- **Print stylesheet**: Hides topbar/TOC/buttons, clean paginated content
- **Watermark**: Enouvo logo at 5% opacity, fixed-positioned, print-hidden
- **i18n**: 11 languages supported (en, vi, zh, ja, ko, es, fr, de, ru, ar, th)

## Scripts & templates

- `scripts/md_to_pdf.py` — Convert markdown to PDF
- `scripts/md_to_docx.py` — Convert markdown to DOCX
- `assets/html-template.html` — HTML skeleton for agent-driven conversion
- `references/html-components.md` — Component catalog and placeholder reference

**Basic usage:**
```bash
python3 scripts/md_to_pdf.py document.md    # PDF output
python3 scripts/md_to_docx.py document.md   # DOCX output
```

**With all branding options:**
```bash
python3 scripts/md_to_pdf.py document.md output.pdf \
  --header-logo assets/enouvo-logo-header.webp \
  --watermark assets/enouvo-logo-watermark.png

python3 scripts/md_to_docx.py document.md output.docx \
  --header-logo assets/enouvo-logo-header.webp \
  --watermark assets/enouvo-logo-watermark.png
```

## Assets

Located in `assets/` folder:
- `enouvo-logo-header.webp` - Header logo (left side)
- `enouvo-logo-watermark.png` - Watermark logo (centered, 8% opacity)

## Dependencies

Install Python packages:
```bash
pip install -r scripts/requirements.txt
# Or manually:
# pip install markdown weasyprint pypdf Pillow reportlab pygments pymdown-extensions python-docx
```

System dependencies (WeasyPrint requires):
- macOS: `brew install cairo pango gdk-pixbuf libffi`
- Ubuntu: `apt-get install libcairo2 libpango-1.0-0 libgdk-pixbuf2.0-0`

Mermaid diagrams (auto-installed when needed, requires npm):
- Script will auto-install `@mermaid-js/mermaid-cli` if not found
- Ensure `npm` is available in PATH for auto-install to work

## Options

For detailed command-line options, see `references/usage.md`:
- Custom title override
- Disable footer
- Adjust watermark opacity
- Custom CSS styling
- Header-only or content-only modes

For HTML component catalog and placeholders, see `references/html-components.md`.

## Output Format

| Property | Value |
|----------|-------|
| Page Size | A4 Portrait (210mm x 297mm) |
| Margins | Top: 3.5cm, Bottom: 2.5cm, Sides: 2cm |
| Header | Logo + Title + Red line |
| Footer | Page X of Y + Gray line |
| Watermark | 8% opacity, centered |
| Font | System default (San Francisco/Segoe UI) |
