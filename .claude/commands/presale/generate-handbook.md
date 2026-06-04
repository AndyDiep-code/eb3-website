---
description: Generate comprehensive project handbook for client engagement - combines solution architecture, delivery plan, and governance
argument-hint: "[client-name]" "[project-scope]"
allowed-tools: Read, Write, Bash, Glob, Grep, Task, Skill, AskUserQuestion, WebSearch, WebFetch, TaskCreate, TaskUpdate, TaskList
---

<!--
Usage: /presale:generate-handbook "[client-name]" "[project-scope]"
Example: /presale:generate-handbook "Acme Corp" "E-commerce Platform Migration"
Example: /presale:generate-handbook "HealthCare Inc" "Patient Portal Development"
-->

Ultrathink

# Generate Project Handbook

Generate a comprehensive project handbook for client engagement. This document combines elements from solution blueprints with detailed project governance, delivery planning, and operational handover documentation.

## When to Use

Use project handbooks when:

- Client requires comprehensive project documentation
- RFP response needs complete project plan
- New engagement requires formal project charter
- Client wants "everything in one document"
- Enterprise clients need governance documentation

## Handbook vs Other Documents

| Document               | Purpose                 | Pages  | When to Use            |
| ---------------------- | ----------------------- | ------ | ---------------------- |
| **Solution Blueprint** | Technical architecture  | 50-200 | Technical evaluation   |
| **Case Study**         | Marketing success story | 3-10   | Post-project marketing |
| **Quick Proposal**     | Development proposal    | 5-10   | Initial pitch          |
| **Project Handbook**   | Complete project guide  | 30-100 | Full engagement        |

---

## Phase 1: Context Gathering

### Client Information

```
Question: What is the client's industry?
Header: Industry
Options:
  - E-Commerce / Retail
  - FinTech / Financial Services
  - HealthTech / Healthcare
  - SaaS / Enterprise Software
  - Other (I'll specify)
```

### Project Type

```
Question: What type of project is this?
Header: Project
Options:
  - Greenfield (new system from scratch)
  - Platform migration (move from A to B)
  - System modernization (upgrade existing)
  - Integration project (connect systems)
```

### Handbook Sections

```
Question: Which sections should be emphasized?
Header: Focus
Options:
  - Full handbook (all sections)
  - Technical-heavy (architecture focus)
  - Governance-heavy (process focus)
  - Executive-friendly (business focus)
```

---

## Phase 2: Skill Activation

**Load presale skill:**

```
Skill("chief-architect-presale")
```

**Load template:**

```
Read: .claude/skills/chief-architect-presale/templates/project-handbook-template.md
```

**Load industry-specific references (if available):**

```
# E-Commerce
Read: .claude/skills/chief-architect-presale/references/ecommerce-solution-design.md

# FinTech (if exists)
Read: .claude/skills/chief-architect-presale/references/fintech-solution-design.md

# HealthTech (if exists)
Read: .claude/skills/chief-architect-presale/references/healthtech-solution-design.md
```

---

## Phase 3: Source Analysis (Optional)

If source code is available for analysis:

```
/presale:analyze [source-path]
```

This provides:

- Current architecture understanding
- Technology stack identification
- Integration points
- Data model insights

---

## Phase 4: Handbook Generation (Parallel Architecture)

### Setup Progress Tracking

Create task structure for progress visibility:

```
TaskCreate(subject="Generate Executive & Project sections", description="Wave 1A: Executive Overview + Project Definition sections for handbook", activeForm="Generating executive sections")
TaskCreate(subject="Generate Solution Architecture", description="Wave 1B: Solution Architecture with diagrams and technology stack", activeForm="Generating architecture")
TaskCreate(subject="Generate Requirements sections", description="Wave 1C: Functional + Non-Functional Requirements specifications", activeForm="Generating requirements")
TaskCreate(subject="Generate Delivery Plan", description="Wave 2A: Delivery plan with phases, timeline, milestones", activeForm="Generating delivery plan")
TaskCreate(subject="Generate Team & Governance", description="Wave 2B: Team structure, RACI, communication, escalation", activeForm="Generating governance")
TaskCreate(subject="Generate Risk & Quality", description="Wave 2C: Risk register, QA strategy, change control", activeForm="Generating risk management")
TaskCreate(subject="Generate Operations section", description="Wave 3A: Deployment, monitoring, support, runbooks", activeForm="Generating operations")
TaskCreate(subject="Generate Company Credentials", description="Wave 3B: Company info, credentials, team profiles, appendices", activeForm="Generating credentials")
TaskCreate(subject="Consolidate handbook sections", description="Wave 4: Merge all sections, fix cross-references, ensure consistency", activeForm="Consolidating handbook")
```

### Required Context

Gather/confirm before generation:

**Client Details:**
- Client name: [Required]
- Client industry: [Required]
- Client size, current systems, target users

**Project Details:**
- Project name/scope: [Required]
- Project type, objectives, success metrics, timeline

**Technical Context:**
- Technology stack, integrations, compliance, performance, scalability

### Wave 1: Core Foundation (3 Agents in Parallel)

**Update task status before launching:**
```
TaskUpdate(taskId="1", status="in_progress")
TaskUpdate(taskId="2", status="in_progress")
TaskUpdate(taskId="3", status="in_progress")
```

**Agent A: Executive & Project Sections**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-EXEC
  platform: fullstack
  task-type: [presale, documentation]
---

Generate Executive Overview and Project Definition sections for:

CLIENT: [client-name]
PROJECT: [project-scope]
INDUSTRY: [industry]

Load template: Read .claude/skills/chief-architect-presale/templates/project-handbook-template.md

## Section 1: Executive Overview
- Compelling 2-3 paragraph executive summary
- Timeline visual (mermaid Gantt chart)
- Key stakeholders table (placeholder roles)

## Section 2: Project Definition
- Client background (industry, size, current state)
- 3-5 objectives with quantified success metrics
- Scope (in/out table)
- Assumptions and dependencies list
- Constraints and risks

Output: Save to ./docs/presale/[client-slug]/sections/01-executive-project.md
", description="Generate executive sections")
```

**Agent B: Solution Architecture**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-ARCH
  platform: fullstack
  task-type: [presale, architecture]
  technologies: [Based on context]
---

Generate Solution Architecture section for:

CLIENT: [client-name]
PROJECT: [project-scope]

Load template: Read .claude/skills/chief-architect-presale/templates/project-handbook-template.md

## Section 3: Solution Architecture
- System context diagram (mermaid C4)
- Container architecture diagram (mermaid C4)
- Technology stack table with selection rationale
- Data architecture overview (ER diagram if applicable)
- Integration architecture (system integration diagram)
- Security architecture overview

Output: Save to ./docs/presale/[client-slug]/sections/02-architecture.md
", description="Generate architecture")
```

**Agent C: Requirements Sections**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-REQS
  platform: fullstack
  task-type: [presale, requirements]
---

Generate Functional and Non-Functional Requirements sections for:

CLIENT: [client-name]
PROJECT: [project-scope]

Load template: Read .claude/skills/chief-architect-presale/templates/project-handbook-template.md

## Section 4: Functional Specifications
- Feature overview table (feature, priority, complexity)
- User roles and permissions matrix
- 2-3 detailed feature specifications with acceptance criteria
- User workflow diagrams (mermaid flowchart)

## Section 5: Non-Functional Requirements
- Performance targets (response times, throughput)
- Scalability requirements (user growth, data volume)
- Availability and DR (uptime SLA, RTO/RPO)
- Security requirements (OWASP, compliance)
- Accessibility (WCAG 2.1 AA compliance)

Output: Save to ./docs/presale/[client-slug]/sections/03-requirements.md
", description="Generate requirements")
```

**After Wave 1 completes:**
```
TaskUpdate(taskId="1", status="completed")
TaskUpdate(taskId="2", status="completed")
TaskUpdate(taskId="3", status="completed")
```

---

### Wave 2: Delivery & Governance (3 Agents in Parallel)

**Update task status:**
```
TaskUpdate(taskId="4", status="in_progress")
TaskUpdate(taskId="5", status="in_progress")
TaskUpdate(taskId="6", status="in_progress")
```

**Agent D: Delivery Plan**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-DELIVERY
  platform: fullstack
  task-type: [presale, project-management]
---

Generate Delivery Plan section for:

CLIENT: [client-name]
PROJECT: [project-scope]

Context: Read architecture from ./docs/presale/[client-slug]/sections/02-architecture.md

Load template: Read .claude/skills/chief-architect-presale/templates/project-handbook-template.md

## Section 6: Delivery Plan
- Agile methodology approach (Scrum/Kanban/hybrid)
- Phase breakdown with deliverables table
- Timeline with Gantt chart (mermaid Gantt)
- Milestones and checkpoints
- Sprint structure and cadence

Output: Save to ./docs/presale/[client-slug]/sections/04-delivery.md

", description="Generate delivery plan")
```

**Agent E: Team & Governance**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-GOVERNANCE
  platform: fullstack
  task-type: [presale, governance]
---

Generate Team & Governance section for:

CLIENT: [client-name]
PROJECT: [project-scope]

Load template: Read .claude/skills/chief-architect-presale/templates/project-handbook-template.md

## Section 7: Team & Governance
- Team structure diagram (mermaid org chart)
- RACI matrix (roles vs activities)
- Communication plan (meetings, tools, frequency)
- Decision-making process
- Escalation procedure (flowchart)
- Status reporting structure

Output: Save to ./docs/presale/[client-slug]/sections/05-governance.md

", description="Generate governance")
```

**Agent F: Risk & Quality**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-QUALITY
  platform: fullstack
  task-type: [presale, quality-management]
---

Generate Risk & Quality Management section for:

CLIENT: [client-name]
PROJECT: [project-scope]

Context: Read requirements from ./docs/presale/[client-slug]/sections/03-requirements.md

Load template: Read .claude/skills/chief-architect-presale/templates/project-handbook-template.md

## Section 8: Risk & Quality Management
- Risk register (5-7 risks with impact/probability/mitigation)
- QA strategy with testing pyramid diagram (mermaid)
- Definition of Done checklist
- Change control process (flowchart)
- Quality metrics and KPIs

Output: Save to ./docs/presale/[client-slug]/sections/06-risk-quality.md

", description="Generate risk management")
```

**After Wave 2 completes:**
```
TaskUpdate(taskId="4", status="completed")
TaskUpdate(taskId="5", status="completed")
TaskUpdate(taskId="6", status="completed")
```

---

### Wave 3: Operations & Credentials (2 Agents in Parallel)

**Update task status:**
```
TaskUpdate(taskId="7", status="in_progress")
TaskUpdate(taskId="8", status="in_progress")
```

**Agent G: Operations & Support**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-OPS
  platform: fullstack
  task-type: [presale, operations]
---

Generate Operations & Support section for:

CLIENT: [client-name]
PROJECT: [project-scope]

Context: 
- Read architecture from ./docs/presale/[client-slug]/sections/02-architecture.md
- Read delivery plan from ./docs/presale/[client-slug]/sections/04-delivery.md

Load template: Read .claude/skills/chief-architect-presale/templates/project-handbook-template.md

## Section 9: Operations & Support
- Deployment strategy (CI/CD pipeline diagram)
- Environments overview (dev, staging, production)
- Monitoring approach (metrics, logs, alerts)
- Support model (L1/L2/L3, SLAs)
- Incident response procedure
- Runbook outline

Output: Save to ./docs/presale/[client-slug]/sections/07-operations.md

", description="Generate operations")
```

**Agent H: Company Credentials & Appendices**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-CREDS
  platform: fullstack
  task-type: [presale, credentials]
---

Generate Company Credentials and Appendices for:

CLIENT: [client-name]
PROJECT: [project-scope]

Load template: Read .claude/skills/chief-architect-presale/templates/project-handbook-template.md

## Section 10: Company Credentials
- About company (mission, values, history) - PLACEHOLDER
- Relevant experience (similar projects) - PLACEHOLDER
- Team profiles (key personnel) - PLACEHOLDER
- Certifications and partnerships

## Appendices
- Glossary (technical terms alphabetically)
- References (standards, frameworks, tools)
- Assumptions log
- Document revision history

Output: Save to ./docs/presale/[client-slug]/sections/08-credentials-appendices.md

SKILL USAGE: None required.
", description="Generate credentials")
```

**After Wave 3 completes:**
```
TaskUpdate(taskId="7", status="completed")
TaskUpdate(taskId="8", status="completed")
```

---

### Wave 4: Consolidation (1 Agent Sequential)

**Update task status:**
```
TaskUpdate(taskId="9", status="in_progress")
```

**Agent I: Consolidate Handbook**
```
Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: HANDBOOK-[YYMMDD]-FINAL
  platform: fullstack
  task-type: [presale, documentation]
---

Consolidate Project Handbook for:

CLIENT: [client-name]
PROJECT: [project-scope]

## Tasks:
1. Read all section files from ./docs/presale/[client-slug]/sections/
2. Merge into single handbook document
3. Add table of contents with page references
4. Fix cross-references between sections
5. Ensure consistent formatting and terminology
6. Verify all diagrams render correctly
7. Add document header/footer
8. Final quality check

## Consolidation Steps:
- Read ./docs/presale/[client-slug]/sections/01-executive-project.md
- Read ./docs/presale/[client-slug]/sections/02-architecture.md
- Read ./docs/presale/[client-slug]/sections/03-requirements.md
- Read ./docs/presale/[client-slug]/sections/04-delivery.md
- Read ./docs/presale/[client-slug]/sections/05-governance.md
- Read ./docs/presale/[client-slug]/sections/06-risk-quality.md
- Read ./docs/presale/[client-slug]/sections/07-operations.md
- Read ./docs/presale/[client-slug]/sections/08-credentials-appendices.md

## Quality Checks:
- All client name references consistent
- All metrics quantified
- All diagrams present and valid mermaid syntax
- No placeholder text (except company credentials)
- Professional C-level tone throughout
- Consistent date formats
- All section cross-references valid

Output: 
- Final handbook: ./docs/presale/[client-slug]/project-handbook-[YYMMDD].md
- Keep section files for reference

SKILL USAGE: None required (consolidation only).
", description="Consolidate handbook")
```

**After Wave 4 completes:**
```
TaskUpdate(taskId="9", status="completed")
```

---

## Phase 5: Output

### File Naming

```
./docs/presale/[client-slug]/project-handbook-[YYMMDD].md
```

### Example Output Path

```
./docs/presale/acme-corp/project-handbook-260105.md
```

### Directory Structure

```
docs/presale/
└── [client-slug]/
    ├── analysis-report.md (from /presale:analyze)
    ├── solution-blueprint.md (from /presale:generate-solution)
    ├── project-handbook-[YYMMDD].md (from this command)
    └── proposal.md (from /presale:generate-proposal)
```

---

## Phase 6: Quality Checklist & Failure Recovery

### Verify Section Completion

```bash
# Check all section files exist
ls -la ./docs/presale/[client-slug]/sections/
```

Expected files:
- `01-executive-project.md`
- `02-architecture.md`
- `03-requirements.md`
- `04-delivery.md`
- `05-governance.md`
- `06-risk-quality.md`
- `07-operations.md`
- `08-credentials-appendices.md`

### Failure Recovery

If any agent fails, regenerate only that section:

```
# Check task list
TaskList

# If Task 2 (Architecture) failed:
TaskUpdate(taskId="2", status="in_progress")

# Rerun Agent B only
Task(subagent_type="general-purpose", prompt="[Agent B prompt from Wave 1]", description="Regenerate architecture")

# After completion
TaskUpdate(taskId="2", status="completed")

# Continue to next wave or Wave 4 consolidation
```

### Quality Checklist

Before delivery, verify:

```
════════════════════════════════════════════════════════════════
                 ✅ HANDBOOK QUALITY CHECKLIST
════════════════════════════════════════════════════════════════

SECTION FILES COMPLETED:
  □ 01-executive-project.md exists and contains both sections
  □ 02-architecture.md has all diagrams (mermaid syntax valid)
  □ 03-requirements.md has functional + non-functional
  □ 04-delivery.md has timeline Gantt chart
  □ 05-governance.md has RACI matrix and org chart
  □ 06-risk-quality.md has risk register (5-7 risks)
  □ 07-operations.md has CI/CD pipeline diagram
  □ 08-credentials-appendices.md has glossary

CONSOLIDATED HANDBOOK:
  □ Final file exists: project-handbook-[YYMMDD].md
  □ Table of contents with all 10 sections
  □ All cross-references working (e.g., "See Section 3")
  □ Consistent client name throughout
  □ All metrics quantified (no "fast", "scalable" without numbers)
  □ All diagrams render (test with mermaid live editor)

EXECUTIVE SECTIONS:
  □ Executive summary compelling (2-3 paragraphs max)
  □ Timeline visual clear and accurate
  □ Key stakeholders identified

TECHNICAL SECTIONS:
  □ Architecture diagrams clear (C4, ER, integration)
  □ Technology stack justified (why chosen)
  □ Integration points documented
  □ Security approach defined (OWASP, compliance)

DELIVERY SECTIONS:
  □ Phases clearly defined with deliverables
  □ Milestones realistic and achievable
  □ Team structure documented with org chart
  □ RACI matrix complete (no empty cells)

QUALITY:
  □ No placeholder text remaining (except company credentials)
  □ Professional language (C-level audience)
  □ Consistent formatting (headers, tables, lists)
  □ Contact information included
  □ Document metadata (version, date, authors)

DIAGRAMS:
  □ All mermaid diagrams have valid syntax
  □ Diagrams are appropriately sized
  □ Labels are readable
  □ Colors are professional (avoid bright colors)

════════════════════════════════════════════════════════════════
```

---

## Phase 7: Summary

```
════════════════════════════════════════════════════════════════
            ✅ PROJECT HANDBOOK GENERATED (PARALLEL)
════════════════════════════════════════════════════════════════

CLIENT: [client-name]
PROJECT: [project-scope]
INDUSTRY: [industry]

ARCHITECTURE:
  📊 Wave 1: Executive + Architecture + Requirements (3 agents)
  📊 Wave 2: Delivery + Governance + Quality (3 agents)
  📊 Wave 3: Operations + Credentials (2 agents)
  📊 Wave 4: Consolidation (1 agent)
  ⏱️  Total: ~8-12 minutes (local) | ~12-18 minutes (proxy)

OUTPUT FILES:
  📄 ./docs/presale/[client-slug]/project-handbook-[YYMMDD].md (final)
  📁 ./docs/presale/[client-slug]/sections/ (8 section files)

SECTIONS GENERATED:
  ✓ Section 1: Executive Overview
  ✓ Section 2: Project Definition
  ✓ Section 3: Solution Architecture
  ✓ Section 4: Functional Specifications
  ✓ Section 5: Non-Functional Requirements
  ✓ Section 6: Delivery Plan
  ✓ Section 7: Team & Governance
  ✓ Section 8: Risk & Quality Management
  ✓ Section 9: Operations & Support
  ✓ Section 10: Company Credentials
  ✓ Appendices (Glossary, References)

TEMPLATE USED:
  → chief-architect-presale/templates/project-handbook-template.md

DIAGRAMS GENERATED:
  → Timeline (Gantt)
  → System context (C4)
  → Container architecture (C4)
  → User workflows (Flowchart)
  → Team structure (Org chart)
  → Testing pyramid
  → CI/CD pipeline
  → Decision/escalation flows

PROGRESS TRACKING:
  → View tasks: TaskList
  → 9 tasks created for visibility
  → Individual section recovery if needed

PERFORMANCE:
  ✅ Proxy server compatible (no timeouts)
  ✅ 2x faster than monolithic approach
  ✅ Failure recovery per section
  ✅ Progress visibility throughout

NEXT STEPS:
  1. Review consolidated handbook for accuracy
  2. Customize company credentials section (marked PLACEHOLDER)
  3. Add specific wireframes/mockups if available
  4. Review with internal stakeholders
  5. Format for client presentation (PDF export)
  6. Update section files if client feedback received

RELATED COMMANDS:
  → /presale:analyze [path] - Analyze source code first
  → /presale:generate-solution [client] - Solution blueprint only
  → /presale:generate-proposal [client] - Quick proposal (5-10 pages)

════════════════════════════════════════════════════════════════
```

---

## Tips for Best Results

1. **Start with analysis**: If source code exists, run `/presale:analyze` first
2. **Gather requirements**: The more context provided, the better the output
3. **Monitor progress**: Use `TaskList` to see real-time progress during generation
4. **Section-level review**: Review section files in `./docs/presale/[client-slug]/sections/` before final consolidation
5. **Iterate per section**: If one section needs refinement, regenerate only that section
6. **Quantify**: Replace all qualitative statements with quantified metrics
7. **Visualize**: Diagrams auto-generated as mermaid, verify they render correctly
8. **Customize credentials**: Company credentials section marked as PLACEHOLDER - update before delivery
9. **Failure recovery**: If any wave fails, check TaskList and regenerate failed sections only
10. **Parallel efficiency**: Handbook generated in 4 waves (3→3→2→1 agents) for optimal speed

## Architecture Notes

### Why Parallel Architecture?

**Previous design (monolithic):**
- ❌ Single agent generates 1400 LOC
- ❌ Timeout on proxy servers (60+ minutes)
- ❌ No progress visibility
- ❌ No failure recovery
- ⚠️ Slow on local (10-15 minutes)

**New design (parallel waves):**
- ✅ 9 agents generate 150-200 LOC each
- ✅ Proxy compatible (12-18 minutes)
- ✅ Real-time progress via TaskList
- ✅ Section-level failure recovery
- ✅ 2x faster on local (8-12 minutes)

### Wave Dependencies

```
Wave 1 (parallel):
  A: Executive + Project ─┐
  B: Architecture ────────┼─→ Wave 2
  C: Requirements ────────┘

Wave 2 (parallel):
  D: Delivery (depends on B)
  E: Governance (independent)
  F: Risk/Quality (depends on C)
              │
              ↓
Wave 3 (parallel):
  G: Operations (depends on B, D)
  H: Credentials (independent)
              │
              ↓
Wave 4 (sequential):
  I: Consolidate all sections
```

### Token Efficiency

- **Section templates**: Loaded once per agent (not inline in prompts)
- **Context passing**: Only necessary sections read between waves
- **Diagram caching**: mermaid diagrams generated on-demand
- **Compact prompts**: Reference templates instead of 250+ line instructions

## Industry-Specific Considerations

| Industry   | Key Sections             | Compliance Focus   |
| ---------- | ------------------------ | ------------------ |
| E-Commerce | Payment, cart, inventory | PCI DSS            |
| FinTech    | Security, audit, data    | SOC 2, regulations |
| HealthTech | Privacy, access control  | HIPAA              |
| SaaS       | Multi-tenancy, billing   | SOC 2, GDPR        |
