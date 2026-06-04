---
description: Display help and usage guide for presale commands
argument-hint: [command-name]
allowed-tools: Read
---

<!--
Usage: /presale:help [command-name]
Example: /presale:help
Example: /presale:help analyze
Example: /presale:help generate-solution
-->

# Presale Commands Help

Complete workflow for generating presale documentation using the chief-architect-presale skill.

## Overview

The presale command suite helps you create professional presale documentation for enterprise clients by analyzing codebases and generating solution blueprints, case studies, and proposals.

---

## Available Commands

### Main Orchestrator

| Command | Description |
|---------|-------------|
| `/presale` | Main workflow orchestrator - guides you through complete presale process |

### Individual Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/presale:analyze` | Analyze codebase for domain model and architecture | `/presale:analyze ./src` |
| `/presale:generate-solution` | Generate solution blueprint | `/presale:generate-solution "ClientName" "e-commerce"` |
| `/presale:generate-proposal` | Generate quick development proposal | `/presale:generate-proposal "ClientName" "migration"` |
| `/presale:generate-case-study` | Generate marketing case study | `/presale:generate-case-study "ProjectName" "ClientName"` |

### Document Conversion Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/presale:md-to-pdf` | Convert markdown to branded PDF | `/presale:md-to-pdf ./docs/proposal.md` |
| `/presale:md-to-docx` | Convert markdown to branded DOCX | `/presale:md-to-docx ./docs/proposal.md` |

---

## Workflow Types

### 1. Codebase Analysis Only
```
/presale:analyze [source-path]
```
- Extracts architecture patterns
- Identifies domain model
- Assesses technical debt
- Output: `./docs/presale/analysis/[date]/analysis-report.md`

### 2. Solution Blueprint
```
/presale:generate-solution "[client]" "[industry]"
```
- Complete architecture documentation
- Technology recommendations with rationale
- Implementation plan
- Cost estimation
- Output: `./docs/presale/[client]/solution-blueprint.md`

### 3. Quick Proposal
```
/presale:generate-proposal "[client]" "[scope]"
```
- 5-10 page development proposal
- Executive summary for C-level
- Timeline and team composition
- Budget breakdown
- Output: `./docs/presale/[client]/proposal.md`

### 4. Case Study
```
/presale:generate-case-study "[project]" "[client]"
```
- Marketing-ready success story
- Quantifiable results
- SEO optimized
- Output: `./docs/presale/case-studies/case-study-[slug].md`

### 5. Document Conversion
```
/presale:md-to-pdf [markdown-file]
/presale:md-to-docx [markdown-file]
```
- Convert presale documents to client-ready formats
- Enouvo branded header with logo
- Page numbers in footer
- Watermark (8% opacity)
- Syntax-highlighted code blocks
- Mermaid diagram support
- Output: Same directory as input file

### 6. Full Presale Package
```
/presale full "[client]"
```
- Complete pipeline: analyze → solution → proposal
- All documents in one workflow
- Output: Multiple files in `./docs/presale/[client]/`

---

## Skills Used

| Skill | Purpose |
|-------|---------|
| `chief-architect-presale` | Core presale expertise, templates, industry references |
| `research` | Technology and market research |
| `plan` | Implementation planning and timeline |
| `sequential-thinking` | Structured complex analysis |
| `repomix` | Codebase summarization |
| `enouvo-docs-generator` | PDF/DOCX document conversion with branding |

---

## Agents Used

| Agent | Purpose |
|-------|---------|
| `solution-architect` | Primary presale documentation generation |
| `researcher` | Technology research and best practices |
| `docs-manager` | Documentation formatting and organization |

## Skills Used

| Skill | Purpose |
|-------|---------|
| `/scout "prompt"` | Codebase exploration and pattern discovery |

---

## Output Structure

```
./docs/presale/
├── [client-name]/
│   ├── analysis-report.md
│   ├── solution-blueprint.md
│   └── proposal.md
├── analysis/
│   └── [date]/
│       └── analysis-report.md
└── case-studies/
    └── case-study-[slug].md
```

---

## Industry References

Available in `.claude/skills/chief-architect-presale/references/`:

| Industry | File | Status |
|----------|------|--------|
| E-Commerce | `ecommerce-solution-design.md` | ✅ Available |
| FinTech | `fintech-solution-design.md` | 📝 Template |
| HealthTech | `healthtech-solution-design.md` | 📝 Template |
| SaaS | `saas-solution-design.md` | 📝 Template |
| Marketplace | `marketplace-solution-design.md` | 📝 Template |

---

## Templates

Available in `.claude/skills/chief-architect-presale/templates/`:

| Template | Description | Status |
|----------|-------------|--------|
| Solution Blueprint | End-to-end architecture doc | ✅ Available |
| Case Study | Marketing success story | ✅ Available |
| C-Level Presentation | Executive presentation outline | 📝 Template |
| Quick Proposal | 5-10 page proposal | 📝 Template |
| Technical Specification | Detailed tech docs | 📝 Template |
| Cost Estimation | Budget breakdown | 📝 Template |

---

## Best Practices

1. **Start with Analysis**: Always analyze codebase first for accurate recommendations
2. **Quantify Everything**: Use specific metrics, percentages, dollar amounts
3. **Know Your Audience**: Tailor content for CTO vs CEO vs Procurement
4. **Reference Case Studies**: Include similar successful projects
5. **Risk Transparency**: Identify risks upfront with mitigation strategies
6. **Review Before Delivery**: Quality check all documents

---

## Quick Start

```bash
# Step 1: Analyze existing codebase
/presale:analyze ./path/to/source

# Step 2: Generate solution blueprint
/presale:generate-solution "ClientName" "industry"

# Step 3: Create proposal
/presale:generate-proposal "ClientName" "project-scope"

# Step 4: Convert to client-ready format
/presale:md-to-pdf ./docs/presale/ClientName/proposal.md
/presale:md-to-docx ./docs/presale/ClientName/solution-blueprint.md

# Or run complete workflow
/presale full "ClientName"
```

---

## Need Help?

- View skill documentation: `.claude/skills/chief-architect-presale/README.md`
- View templates: `.claude/skills/chief-architect-presale/templates/`
- View industry references: `.claude/skills/chief-architect-presale/references/`
