---
description: Main presale workflow orchestrator - complete pipeline from codebase analysis to client-ready documentation
argument-hint: [workflow-type] | [client-name]
allowed-tools: Read, Write, Bash, Glob, Grep, Task, Skill, AskUserQuestion, WebSearch, WebFetch
---

<!--
Usage: /presale [workflow-type] [client-name]
Example: /presale solution "PURESHROOMS"
Example: /presale case-study "FinTech Project"
Example: /presale full "HealthCare Corp"
Example: /presale
-->

Ultrathink

# Presale Workflow Orchestrator

Complete presale pipeline for generating client-ready documentation from codebase analysis.

## Available Workflows

| Workflow | Description | Commands Used |
|----------|-------------|---------------|
| `analyze` | Analyze codebase, extract domain model | `/presale:analyze` |
| `solution` | Generate solution blueprint | `/presale:analyze` → `/presale:generate-solution` |
| `case-study` | Create marketing case study | `/presale:generate-case-study` |
| `proposal` | Generate quick proposal | `/presale:analyze` → `/presale:generate-proposal` |
| `full` | Complete presale package | All commands sequentially |

## Document Conversion

| Command | Description | Output |
|---------|-------------|--------|
| `/presale:md-to-pdf` | Convert markdown to branded PDF | `.pdf` with Enouvo header/footer/watermark |
| `/presale:md-to-docx` | Convert markdown to branded DOCX | `.docx` with Enouvo header/footer/watermark |

## Skills Applied
- **chief-architect-presale** - Core presale expertise
- **research** - Technology and market research
- **plan** - Implementation planning
- **sequential-thinking** - Structured analysis
- **repomix** - Codebase summarization
- **enouvo-docs-generator** - Document conversion (PDF/DOCX)

## Agents Used
- **solution-architect** - Primary presale agent
- **researcher** - Technology research
- **docs-manager** - Documentation formatting

## Skills Used
- **scout** - Codebase exploration

---

## Phase 1: Workflow Selection

```
Question: What presale workflow do you need?
Header: Workflow
Options:
  - Analyze codebase only (extract architecture & domain model)
  - Solution blueprint (architecture + recommendation document)
  - Case study (marketing-ready success story)
  - Quick proposal (5-10 page development proposal)
  - Full presale package (analysis + blueprint + proposal)
```

### Workflow Decision Tree

```
User Request
    │
    ├─→ "analyze" → /presale:analyze
    │
    ├─→ "solution" → /presale:analyze → /presale:generate-solution
    │
    ├─→ "case-study" → /presale:generate-case-study
    │
    ├─→ "proposal" → /presale:analyze → /presale:generate-proposal
    │
    └─→ "full" → /presale:analyze
                     → /presale:generate-solution
                     → /presale:generate-proposal
                     → /presale:generate-case-study (if completed project)
```

---

## Phase 2: Client Context

### Gather Client Information

```
Question: Who is the client?
Header: Client
Options:
  - I'll provide client name and details
  - Use existing project (specify path)
  - New prospect (interview mode)
```

### Industry Classification

```
Question: What industry is the client in?
Header: Industry
Options:
  - E-Commerce / Retail
  - FinTech / Financial Services
  - HealthTech / Healthcare
  - SaaS / Enterprise Software
  - Marketplace / Platform
  - Other (I'll specify)
```

### Project Type

```
Question: What type of engagement?
Header: Engagement
Options:
  - Platform migration (move from A to B)
  - Greenfield development (new system)
  - System modernization (upgrade/refactor)
  - Integration project (connect systems)
  - Consulting/Assessment only
```

---

## Phase 3: Skills Activation

**Load primary skill:**

```
Skill("chief-architect-presale")
```

**Load supporting skills based on industry:**

```
# E-Commerce
Read: .claude/skills/chief-architect-presale/references/ecommerce-solution-design.md

# FinTech (if exists)
Read: .claude/skills/chief-architect-presale/references/fintech-solution-design.md

# HealthTech (if exists)
Read: .claude/skills/chief-architect-presale/references/healthtech-solution-design.md
```

---

## Phase 4: Execute Workflow

### Workflow: Analyze Only

```bash
# Execute analyze command
/presale:analyze [source-path] "[focus-areas]"
```

**Output:** `./docs/presale/analysis/[date]/analysis-report.md`

---

### Workflow: Solution Blueprint

**Step 1:** Analyze codebase
```bash
/presale:analyze [source-path]
```

**Step 2:** Generate solution
```bash
/presale:generate-solution "[client-name]" "[industry]"
```

**Output:**
- `./docs/presale/[client]/analysis-report.md`
- `./docs/presale/[client]/solution-blueprint.md`

---

### Workflow: Case Study

```bash
/presale:generate-case-study "[project-name]" "[client-name]"
```

**Output:** `./docs/presale/case-studies/case-study-[slug].md`

---

### Workflow: Quick Proposal

**Step 1:** Analyze codebase (if source available)
```bash
/presale:analyze [source-path]
```

**Step 2:** Generate proposal
```bash
/presale:generate-proposal "[client-name]" "[project-scope]"
```

**Output:**
- `./docs/presale/[client]/analysis-report.md` (optional)
- `./docs/presale/[client]/proposal.md`

---

### Workflow: Full Presale Package

**Sequential execution:**

```
════════════════════════════════════════════════════════════════════
                    🚀 FULL PRESALE WORKFLOW
════════════════════════════════════════════════════════════════════

STEP 1/4: CODEBASE ANALYSIS
  → /presale:analyze
  Status: [Pending | In Progress | Complete]
  Output: ./docs/presale/[client]/analysis-report.md

STEP 2/4: SOLUTION BLUEPRINT
  → /presale:generate-solution
  Status: [Pending | In Progress | Complete]
  Output: ./docs/presale/[client]/solution-blueprint.md

STEP 3/4: DEVELOPMENT PROPOSAL
  → /presale:generate-proposal
  Status: [Pending | In Progress | Complete]
  Output: ./docs/presale/[client]/proposal.md

STEP 4/4: CASE STUDY (if completed project)
  → /presale:generate-case-study
  Status: [Pending | Skipped | Complete]
  Output: ./docs/presale/case-studies/[slug].md

════════════════════════════════════════════════════════════════════
```

---

## Phase 5: Quality Review

### Document Review Checklist

```
════════════════════════════════════════════════════════════════════
                    ✅ QUALITY CHECKLIST
════════════════════════════════════════════════════════════════════

CONTENT QUALITY:
  □ Executive summary is compelling
  □ All metrics are quantified
  □ Architecture diagrams included
  □ Technology rationale documented
  □ Risks identified with mitigations
  □ Timeline is realistic
  □ Costs are justified

AUDIENCE ALIGNMENT:
  □ Language appropriate for reader
  □ Technical depth matches audience
  □ Business value clearly articulated
  □ Call-to-action is clear

COMPLETENESS:
  □ All sections populated
  □ No placeholder text remaining
  □ Contact information included
  □ Next steps defined

════════════════════════════════════════════════════════════════════
```

---

## Phase 6: Summary & Next Steps

```
════════════════════════════════════════════════════════════════════
            ✅ PRESALE WORKFLOW COMPLETE
════════════════════════════════════════════════════════════════════

CLIENT: [client-name]
INDUSTRY: [industry]
WORKFLOW: [workflow-type]

DOCUMENTS GENERATED:
  📄 ./docs/presale/[client]/analysis-report.md
  📄 ./docs/presale/[client]/solution-blueprint.md
  📄 ./docs/presale/[client]/proposal.md
  📄 ./docs/presale/case-studies/[slug].md

SKILLS USED:
  ✓ chief-architect-presale
  ✓ research
  ✓ plan
  ✓ sequential-thinking

AGENTS USED:
  ✓ solution-architect
  ✓ researcher
  ✓ scout

NEXT STEPS:
  1. Review all generated documents
  2. Customize for specific client needs
  3. Add visual assets (screenshots, diagrams)
  4. Get internal review/approval
  5. Schedule client presentation

INDIVIDUAL COMMANDS:
  → /presale:analyze [path]
  → /presale:generate-solution [client]
  → /presale:generate-proposal [client]
  → /presale:generate-case-study [project]

════════════════════════════════════════════════════════════════════
```

---

## Quick Reference

### Command Cheat Sheet

| Command | Purpose | Output |
|---------|---------|--------|
| `/presale` | Main orchestrator (this) | Multiple docs |
| `/presale:analyze [path]` | Codebase analysis | analysis-report.md |
| `/presale:generate-solution [client]` | Solution blueprint | solution-blueprint.md |
| `/presale:generate-proposal [client]` | Quick proposal | proposal.md |
| `/presale:generate-case-study [project]` | Marketing case study | case-study.md |
| `/presale:md-to-pdf [path]` | Convert markdown to PDF | [filename].pdf |
| `/presale:md-to-docx [path]` | Convert markdown to DOCX | [filename].docx |

### Skills Reference

| Skill | Purpose | Location |
|-------|---------|----------|
| chief-architect-presale | Core presale expertise | .claude/skills/chief-architect-presale/ |
| research | Technology research | .claude/skills/research/ |
| plan | Implementation planning | .claude/skills/plan/ |
| enouvo-docs-generator | PDF/DOCX conversion | .claude/skills/enouvo-docs-generator/ |

### Agent Reference

| Agent | Purpose |
|-------|---------|
| solution-architect | Primary presale documentation |
| researcher | Technology and market research |
| scout | Codebase exploration |
| docs-manager | Documentation management |

---

## Important Notes

- **IMPORTANT:** Always start with codebase analysis for accurate recommendations
- **IMPORTANT:** Quantify all metrics and benefits
- **IMPORTANT:** Tailor content for target audience
- **IMPORTANT:** Review all documents before client delivery
- **IMPORTANT:** Use sequential-thinking for complex analysis
- **IMPORTANT:** Reference existing case studies when available
