---
name: qakit:ba-docs
description: Generate Business Analysis documentation from BRD, FRD, or PRD — product brief, lifecycle diagrams, scope decision register, and feature briefs for stakeholder communication. Use when a project needs stakeholder-facing BA artifacts that explain what the product does, why scope decisions were made, and how the product lifecycle works.
user-invocable: true
when_to_use: "Invoke to generate BA-facing documentation (product brief, lifecycle diagrams, scope register, feature briefs) from BRD/FRD source documents."
category: test
keywords: [ba, business-analysis, product-brief, scope, feature-briefs, stakeholders, lifecycle]
---

# BA Documentation Generator

Generate stakeholder-facing business analysis documentation from requirements sources. Produces product briefs, lifecycle diagrams, scope registers, and feature briefs.

## Scope
Handles: product brief, lifecycle diagram, scope decision register, feature briefs from BRD/FRD/PRD.
Does NOT handle: test cases, test plans, automation code, QA metrics, user stories.

## Arguments

| Arg | Values | Default |
|-----|--------|---------|
| `--source` | file path(s) or inline text | — (required) |
| `--project` | project name | — (required) |
| `--type` | `product-brief` \| `lifecycle-diagram` \| `scope-register` \| `feature-briefs` \| `all` | `all` |
| `--prepared-by` | author name | BA Team |
| `--output` | output file path | auto (see Output Structure) |

## Quick Start

```bash
# All 4 artifacts from a single BRD
/qakit:ba-docs --source=./docs/BRD.md --project="Auth Module"

# Single artifact from a single file
/qakit:ba-docs --source=brd.pdf --project="Checkout" --type=product-brief

# Lifecycle diagram only
/qakit:ba-docs --source=brd.md --project="Payment" --type=lifecycle-diagram

# Multiple source files (space-separated after --source)
/qakit:ba-docs --source=brd.pdf --source=frd.pdf --source=scope-gap.pdf --project="Survey" --type=all

# Shorthand — bare paths without --source flag
/qakit:ba-docs brd.pdf frd.pdf --project="Survey" --type=all
```

## ⛔ Read This First

**Before generating anything, follow these steps in order.**

### Step 1 — Read the source extraction reference

Always read: `Read(".claude/skills/ba-docs/references/source-extraction.md")`

This file defines which BRD/FRD sections to read for each artifact type and what to extract from them.

### Step 2 — Read the output rules reference

Always read: `Read(".claude/skills/ba-docs/references/output-rules.md")`

This file defines the format, sections, and content rules for each BA artifact.

### Step 3 — Read source documents

Read the `--source` file(s). For PDFs use pypdf if the Read tool cannot render them:
```python
import pypdf
reader = pypdf.PdfReader(path)
for page in reader.pages: print(page.extract_text())
```

### Step 4 — Generate and save

Follow both reference files exactly. Write output to file — never display inline only.

---

## Output Structure

```
qa-docs/{project-kebab}/ba-docs/
├── product-brief.md
├── lifecycle-diagram.md
├── scope-decision-register.md
└── feature-briefs.md
```

- Use `--output` path if explicitly provided (overrides default)
- Create directories with `mkdir -p` before writing
- Confirm: `✅ Saved to: qa-docs/{project-kebab}/ba-docs/{file}.md`
- `--type=all` → create all 4 files

## Security

- Never fabricate scope decisions, business rules, or stakeholder names not in the source
- Never invent open questions or pending sign-offs
- Refuse to generate fake client sign-offs or approvals

## References

Read in Steps 1–2 above:
- `references/source-extraction.md` — what to extract from BRD/FRD for each artifact
- `references/output-rules.md` — format rules, sections, tone, and diagram constraints
