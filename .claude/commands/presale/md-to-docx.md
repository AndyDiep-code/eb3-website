---
description: Convert markdown file to DOCX with Enouvo header, footer, and watermark
argument-hint: [path-to-markdown-file]
allowed-tools: Read, Bash, AskUserQuestion, Skill
---

# Presale: Markdown to DOCX

Convert a markdown file to Word document (DOCX) format with Enouvo branding.

## Usage

```
/presale:md-to-docx path/to/file.md
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
python3 -c "import markdown, docx, PIL, pygments" 2>/dev/null && echo "OK" || echo "MISSING"
```

If dependencies are missing, inform the user to install them:

```bash
pip install -r .claude/skills/enouvo-docs-generator/scripts/requirements.txt
```

### Step 4: Run Conversion

Execute the conversion script from the skill with header logo and watermark:

```bash
python3 .claude/skills/enouvo-docs-generator/scripts/md_to_docx.py "$ARGUMENTS" \
  --header-logo .claude/skills/enouvo-docs-generator/assets/enouvo-logo-header.webp \
  --watermark .claude/skills/enouvo-docs-generator/assets/enouvo-logo-watermark.png
```

Output DOCX will be created in the same directory as the input file with `.docx` extension.

Example: `docs/report.md` -> `docs/report.docx`

## Output

```
DOCX CONVERSION COMPLETE

Input:  $ARGUMENTS
Output: [output-path].docx
Header: Enouvo logo + Document title
Footer: Page numbers
Watermark: Enouvo logo (8% opacity)
Format: Letter size (Word default)
```

## Advanced Options

For custom options (title override, no footer, opacity), see the skill documentation:
- `.claude/skills/enouvo-docs-generator/SKILL.md`
