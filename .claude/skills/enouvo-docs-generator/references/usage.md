# Usage Reference

Detailed reference for PDF/DOCX scripts and HTML template options.

## HTML output (agent-driven)

The HTML conversion is performed by the agent reading `assets/html-template.html` and replacing placeholders. There is no CLI — the agent invokes itself via the `/presale:md-to-html` slash command or by activating this skill.

### Required placeholders

See `references/html-components.md` § 1 for the full list. Summary:

| Placeholder | Source |
|-------------|--------|
| `{{LANG}}` | Detected ISO 639-1 code |
| `{{TITLE}}`, `{{SUBTITLE}}` | First H1 and following paragraph |
| `{{DOC_TYPE}}` | One of PLAN, SPEC, RFC, SYSTEM DESIGN, RUNBOOK, POSTMORTEM, NOTES |
| `{{SOURCE_FILE}}` | Original markdown filename |
| `{{DATE}}`, `{{FOOTER_NOTE}}` | Current date (YYYY-MM-DD) |
| `{{READ_TIME}}` | `ceil(wordCount / 200)` minutes |
| `{{TOC_TITLE}}`, `{{SKIP_LINK_LABEL}}`, `{{PRINT_TOOLTIP}}`, `{{THEME_TOOLTIP}}`, `{{CLOSE_LABEL}}`, `{{REC_LABEL}}` | Localized UI labels (see § Localization below) |
| `{{ENOUVO_LOGO_HEADER_URI}}` | `data:image/webp;base64,<contents of assets/enouvo-logo-header.webp>` |
| `{{ENOUVO_LOGO_WATERMARK_URI}}` | `data:image/png;base64,<contents of assets/enouvo-logo-watermark.png>` |

### Localization

| Lang | TOC_TITLE | SKIP_LINK_LABEL | PRINT_TOOLTIP | THEME_TOOLTIP | CLOSE_LABEL | REC_LABEL |
|------|-----------|-----------------|---------------|---------------|-------------|-----------|
| en | On this page | Skip to content | Print | Toggle theme | Close | ★ Recommended |
| vi | Mục lục | Bỏ qua đến nội dung | In | Đổi chủ đề | Đóng | ★ Đề xuất |
| zh | 目次 | 跳到内容 | 打印 | 切换主题 | 关闭 | ★ 推荐 |
| ja | 目次 | コンテンツへスキップ | 印刷 | テーマ切替 | 閉じる | ★ おすすめ |
| ko | 목차 | 콘텐츠로 건너뛰기 | 인쇄 | 테마 전환 | 닫기 | ★ 추천 |
| es | En esta página | Saltar al contenido | Imprimir | Cambiar tema | Cerrar | ★ Recomendado |
| fr | Sur cette page | Aller au contenu | Imprimer | Changer le thème | Fermer | ★ Recommandé |
| de | Auf dieser Seite | Zum Inhalt springen | Drucken | Thema wechseln | Schließen | ★ Empfohlen |

### Output

The HTML is written to `<input>.html` next to the source markdown. Example: `docs/report.md` → `docs/report.html`.

---

## PDF / DOCX (CLI)

Detailed reference for `scripts/md_to_pdf.py` command-line arguments.

## Synopsis

```bash
python3 md_to_pdf.py INPUT [OUTPUT] [OPTIONS]
```

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| INPUT | Yes | Path to markdown file |
| OUTPUT | No | Output PDF path (default: input.pdf) |

## Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--watermark` | `-w` | None | Watermark image path (PNG/JPG/WEBP) |
| `--header-logo` | `-l` | None | Header logo image path |
| `--title` | `-t` | Auto | Document title (default: first H1) |
| `--opacity` | `-o` | 0.08 | Watermark opacity (0.0-1.0) |
| `--css` | `-c` | Built-in | Custom CSS file path |
| `--no-footer` | - | False | Disable page numbers |

## Usage Examples

### Basic conversion (no branding)
```bash
python3 md_to_pdf.py document.md
```

### Full Enouvo branding
```bash
python3 md_to_pdf.py document.md \
  --header-logo assets/enouvo-logo-header.webp \
  --watermark assets/enouvo-logo-watermark.png
```

### Custom output path
```bash
python3 md_to_pdf.py README.md docs/readme-output.pdf
```

### Override auto-detected title
```bash
python3 md_to_pdf.py document.md --title "Project Proposal 2025"
```

### Header only (no watermark)
```bash
python3 md_to_pdf.py document.md --header-logo logo.webp
```

### Watermark only (no header)
```bash
python3 md_to_pdf.py document.md --watermark watermark.png --no-footer
```

### Adjust watermark visibility
```bash
# Very subtle (5%)
python3 md_to_pdf.py document.md --watermark logo.png --opacity 0.05

# More visible (15%)
python3 md_to_pdf.py document.md --watermark logo.png --opacity 0.15
```

### Custom CSS styling
```bash
python3 md_to_pdf.py document.md --css custom-theme.css
```

## CSS Customization

Create a custom CSS file to override default styles. Key selectors:

```css
/* Page layout */
@page { size: A4; margin: 2.5cm; }

/* Body text */
body { font-family: Arial; font-size: 11pt; }

/* Headings */
h1 { color: #1a1a1a; border-bottom: 2px solid #e74c3c; }
h2 { color: #2c3e50; }

/* Code blocks */
pre { background: #f8f8f8; font-size: 8pt; }

/* Tables */
th { background: #e74c3c; color: white; }

/* Links */
a { color: #e74c3c; }
```

## Troubleshooting

### Missing dependencies
```bash
pip install markdown weasyprint pypdf Pillow reportlab
```

### WeasyPrint system dependencies
macOS:
```bash
brew install cairo pango gdk-pixbuf libffi
```

Ubuntu/Debian:
```bash
apt-get install libcairo2 libpango-1.0-0 libgdk-pixbuf2.0-0
```

### Mermaid diagrams not rendering
The script auto-installs mermaid-cli when diagrams are detected. If auto-install fails:

1. Ensure npm is available: `npm --version`
2. Manual install: `npm install -g @mermaid-js/mermaid-cli`
3. Check permissions: may need `sudo` on some systems

If npm is not available, mermaid blocks render as styled code blocks.
