---
description: Convert markdown file to PDF with Enouvo header, footer, and watermark
argument-hint: [path-to-markdown-file]
allowed-tools: Read, Bash, AskUserQuestion, Skill
---

# Presale: Markdown to PDF

Convert a markdown file to A4 portrait PDF format with Enouvo branding.

## Usage

```
/presale:md-to-pdf path/to/file.md
```

## Input

- `$ARGUMENTS` - Path to the markdown file to convert

## Process

### Step 1: Activate the enouvo-docs-generator Skill

Activate `enouvo-docs-generator` skill.

### Step 2: Validate Input

Verify the markdown file exists at `$ARGUMENTS`.

### Step 3: Check Dependencies

Run this command to verify dependencies are installed:

```bash
python3 -c "import markdown, weasyprint, pypdf, PIL, reportlab" 2>/dev/null && echo "OK" || echo "MISSING"
```

If dependencies are missing, inform the user to install them:

```bash
pip install -r .claude/skills/enouvo-docs-generator/scripts/requirements.txt
```

### Step 4: Run Conversion

Execute the conversion script from the skill with header logo and watermark:

```bash
python3 .claude/skills/enouvo-docs-generator/scripts/md_to_pdf.py "$ARGUMENTS" \
  --header-logo .claude/skills/enouvo-docs-generator/assets/enouvo-logo-header.webp \
  --watermark .claude/skills/enouvo-docs-generator/assets/enouvo-logo-watermark.png
```

Output PDF will be created in the same directory as the input file with `.pdf` extension.

Example: `docs/report.md` -> `docs/report.pdf`

## Output

```
PDF CONVERSION COMPLETE

Input:  $ARGUMENTS
Output: [output-path].pdf
Header: Enouvo logo + Document title
Footer: Page numbers
Watermark: Enouvo logo (8% opacity)
Format: A4 Portrait
```

## Advanced Options

For custom options (title override, no footer, opacity, CSS), see the skill documentation:
- `.claude/skills/enouvo-docs-generator/references/usage.md`
