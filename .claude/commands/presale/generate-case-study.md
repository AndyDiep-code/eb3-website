---
description: Generate marketing-ready case study from completed project for website publication
argument-hint: [project-name] | [client-name] | [industry]
allowed-tools: Read, Write, Bash, Glob, Grep, Task, Skill, AskUserQuestion, WebSearch, TaskCreate, TaskUpdate, TaskList
---

<!--
Usage: /presale:generate-case-study [project-name] [client-name]
Example: /presale:generate-case-study "E-Commerce Migration" "PURESHROOMS"
Example: /presale:generate-case-study "Fintech Platform" "Lending Corp"
-->

Ultrathink

# Case Study Generation

Generate marketing-ready case studies from completed projects for company website and sales collateral.

## Skills Applied

- **chief-architect-presale** - Case study structure and content
- **research** - SEO optimization and competitor analysis

## Agents Used

- **solution-architect** - Technical content extraction
- **docs-manager** - Document formatting and SEO

---

## Phase 1: Project Information

### Gather Project Details

If $ARGUMENTS provided, parse:

- `$1`: Project name
- `$2`: Client name (or "Confidential" if NDA)
- `$3`: Industry

```
Question: What project should I create a case study for?
Header: Project
Options:
  - I'll provide project details
  - Use existing project folder (I'll specify path)
  - Start from scratch (interview mode)
```

### Collect Key Metrics

```
Question: What results can we quantify?
Header: Metrics
Options:
  - I have specific metrics (%, $, time)
  - Need to gather from project docs
  - Estimate based on similar projects
```

---

## Phase 2: Load Skills & Templates

**Activate Skills:**

```
Skill("chief-architect-presale")
```

**Load Template:**

```bash
# Read case study template
cat .claude/skills/chief-architect-presale/templates/case-study-template.md
```

---

## Phase 3: Information Extraction

### Project Analysis

If project path provided, extract:

```
════════════════════════════════════════════════════════════════════
                    📊 PROJECT DATA EXTRACTION
════════════════════════════════════════════════════════════════════

CLIENT OVERVIEW:
  Name: [client name or "Confidential Client"]
  Industry: [industry]
  Size: [employees, revenue range]
  Market: [geographic focus]

PROJECT DETAILS:
  Duration: [X months]
  Team Size: [X people]
  Budget: $[range]

TECHNOLOGY STACK:
  - [Tech 1]: [purpose]
  - [Tech 2]: [purpose]
  - [Tech 3]: [purpose]

CHALLENGE:
  - Primary pain point: [description]
  - Business impact: [quantified]
  - Technical constraints: [list]

SOLUTION:
  - Approach: [summary]
  - Key innovations: [list]
  - Integration points: [list]

════════════════════════════════════════════════════════════════════
```

### Results Gathering

```
════════════════════════════════════════════════════════════════════
                    📈 RESULTS & METRICS
════════════════════════════════════════════════════════════════════

PERFORMANCE IMPROVEMENTS:
  | Metric          | Before    | After     | Improvement |
  |-----------------|-----------|-----------|-------------|
  | [Metric 1]      | [value]   | [value]   | [%]         |
  | [Metric 2]      | [value]   | [value]   | [%]         |
  | [Metric 3]      | [value]   | [value]   | [%]         |

BUSINESS IMPACT:
  | Metric          | Before    | After     | Improvement |
  |-----------------|-----------|-----------|-------------|
  | [Metric 1]      | [value]   | [value]   | [%]         |
  | [Metric 2]      | [value]   | [value]   | [%]         |

ROI:
  - Total Investment: $[amount]
  - Annual Benefit: $[amount]
  - Payback Period: [X months]
  - 3-Year ROI: [X%]

════════════════════════════════════════════════════════════════════
```

---

## Phase 4: Testimonial Collection

### Client Quote

```
Question: Do you have a client testimonial?
Header: Quote
Options:
  - Yes, I'll provide the quote
  - Need to request from client
  - Use placeholder (add later)
  - Skip testimonial section
```

If provided, format:

```markdown
> "[Quote from client executive - 2-4 sentences about project outcome,
>
> > partnership experience, and business impact. Make it authentic and specific.]"
>
> **— [Name, Title]**
> **[Company Name]**
```

---

## Phase 5: Generate Case Study (Parallel Execution)

**IMPORTANT: Execution Model**

- Break case study into 3 parallel sections for speed
- All agents run in background with `run_in_background=true`
- Progress tracked via TaskCreate/TaskUpdate
- Total generation time: ~2-4 minutes (vs 5-8 min monolithic)

### Setup Progress Tracking

```
TaskCreate(subject="Generate case study introduction", description="Executive summary, client overview, and challenge sections", activeForm="Writing introduction")
TaskCreate(subject="Generate case study solution", description="Solution approach, implementation, and timeline", activeForm="Writing solution")
TaskCreate(subject="Generate case study results", description="Results, testimonial, and key takeaways", activeForm="Writing results")
TaskCreate(subject="Generate SEO and formats", description="SEO optimization and alternative formats (LinkedIn, PDF)", activeForm="Optimizing SEO")
```

### Parallel Section Generation (3 Agents)

**Agent A: Introduction Sections (background)**

```
TaskUpdate(taskId="1", status="in_progress")

Task(subagent_type="general-purpose", run_in_background=true, prompt="
---
context:
  task-id: CASE-STUDY-[YYMMDD]-INTRO
  task-type: [presale, case-study, marketing]
---

Generate introduction sections for case study:

PROJECT: [project-name]
CLIENT: [client-name]
INDUSTRY: [industry]

Load template: Read .claude/skills/chief-architect-presale/templates/case-study-template.md

## Sections to Generate:

### 1. Executive Summary
- 2-3 sentences with key results
- Key Results bullet list (3-4 metrics with improvements)

### 2. Client Overview
- Business model, scale, market position
- Industry context
- Why they needed this project

### 3. The Challenge
- Pain points (business and technical)
- Business impact of problems
- Technical constraints
- Urgency/timing factors

Output: Save to ./docs/presale/case-studies/[slug]-part1-intro.md

SKILL USAGE: Use chief-architect-presale for structure.
", description="Generate introduction")
```

**Agent B: Solution Sections (background)**

```
TaskUpdate(taskId="2", status="in_progress")

Task(subagent_type="general-purpose", run_in_background=true, prompt="
---
context:
  task-id: CASE-STUDY-[YYMMDD]-SOLUTION
  task-type: [presale, case-study, technical]
---

Generate solution sections for case study:

PROJECT: [project-name]
CLIENT: [client-name]
TECHNOLOGY STACK: [technologies]

Load template: Read .claude/skills/chief-architect-presale/templates/case-study-template.md

## Sections to Generate:

### 4. The Solution
- Approach and architecture
- Technology choices (with rationale)
- Key features developed
- Integration points

### 5. Implementation
- Timeline and milestones
- Team composition
- Development methodology
- Challenges overcome

### 6. Technology Highlights
- Tools and services used
- Technical innovations
- Integrations implemented

Output: Save to ./docs/presale/case-studies/[slug]-part2-solution.md

SKILL USAGE: Use chief-architect-presale for technical depth.
", description="Generate solution")
```

**Agent C: Results Sections (background)**

```
TaskUpdate(taskId="3", status="in_progress")

Task(subagent_type="general-purpose", run_in_background=true, prompt="
---
context:
  task-id: CASE-STUDY-[YYMMDD]-RESULTS
  task-type: [presale, case-study, metrics]
---

Generate results sections for case study:

PROJECT: [project-name]
CLIENT: [client-name]
METRICS: [metrics data]

Load template: Read .claude/skills/chief-architect-presale/templates/case-study-template.md

## Sections to Generate:

### 7. Results
- Quantifiable outcomes (with before/after)
- Performance improvements table
- Business impact metrics
- ROI calculation (if available)

### 8. Client Testimonial
- Format provided quote
- Include name, title, company
- Make visually distinct (quote block)

### 9. Key Takeaways
- Technical insights (2-3 points)
- Process improvements learned
- Best practices identified
- Reusable patterns

Output: Save to ./docs/presale/case-studies/[slug]-part3-results.md

SKILL USAGE: Use chief-architect-presale for results framing.
", description="Generate results")
```

**Wait for all 3 agents to complete:**

```
TaskOutput(task_id=[A-task-id], block=true)
TaskOutput(task_id=[B-task-id], block=true)
TaskOutput(task_id=[C-task-id], block=true)

TaskUpdate(taskId="1", status="completed")
TaskUpdate(taskId="2", status="completed")
TaskUpdate(taskId="3", status="completed")
```

---

### Consolidation & SEO (1 Agent)

```
TaskUpdate(taskId="4", status="in_progress")

Task(subagent_type="general-purpose", prompt="
---
context:
  task-id: CASE-STUDY-[YYMMDD]-FINAL
  task-type: [presale, seo, formatting]
---

Consolidate case study and optimize for SEO:

PROJECT: [project-name]
CLIENT: [client-name]
INDUSTRY: [industry]

## Tasks:

1. Read and merge parts:
   - ./docs/presale/case-studies/[slug]-part1-intro.md
   - ./docs/presale/case-studies/[slug]-part2-solution.md
   - ./docs/presale/case-studies/[slug]-part3-results.md

2. Add document header:
   - Title: [Project Title]: [Brief Description]
   - Industry, Client, Duration, Team Size, Technologies

3. SEO Optimization:
   - Title tag (50-60 chars with primary keyword)
   - Meta description (150-160 chars)
   - Keywords (primary, secondary, long-tail)
   - URL structure: /case-studies/[client-slug]-[project-slug]
   - Internal links suggestions

4. Add contact section and CTA

5. Format for publication:
   - Consistent headings
   - Professional formatting
   - Proper markdown structure

Output: ./docs/presale/case-studies/case-study-[slug]-[YYMMDD].md

SKILL USAGE: Use research skill for SEO optimization.
", description="Consolidate and optimize")

TaskUpdate(taskId="4", status="completed")
```

---

## Phase 6: SEO Optimization

### SEO Checklist

```
════════════════════════════════════════════════════════════════════
                    🔍 SEO OPTIMIZATION
════════════════════════════════════════════════════════════════════

TITLE:
  Primary keyword: [keyword]
  Title: "[Client] Case Study: [Result] | [Your Company]"
  Length: [X chars] (optimal: 50-60)

META DESCRIPTION:
  "[Summary with keywords, 150-160 chars]"
  Length: [X chars]

KEYWORDS:
  Primary: [keyword]
  Secondary: [keyword1, keyword2, keyword3]
  Long-tail: [phrase1, phrase2]

URL STRUCTURE:
  /case-studies/[client-slug]-[project-slug]

INTERNAL LINKS:
  - Link to: /services/[relevant-service]
  - Link to: /case-studies/[similar-project]
  - Link to: /contact

CALL TO ACTION:
  - Primary CTA: [Schedule consultation]
  - Secondary CTA: [Download PDF]

════════════════════════════════════════════════════════════════════
```

---

## Phase 7: Output & Formats (Parallel Generation)

### Output Location

```bash
# Create output directory
mkdir -p ./docs/presale/case-studies

# Generate filename
TIMESTAMP=$(date +%y%m%d)
CLIENT_SLUG="[client-slug]"
FILENAME="case-study-${CLIENT_SLUG}-${TIMESTAMP}.md"
```

### Multiple Formats (Parallel)

```
Question: What formats do you need?
Header: Formats
Options:
  - Markdown only (website)
  - Markdown + PDF outline
  - Markdown + LinkedIn post
  - All formats
multiSelect: true
```

**If multiple formats selected, generate in parallel:**

```
TaskCreate(subject="Generate LinkedIn post", description="LinkedIn-optimized case study summary", activeForm="Creating LinkedIn post")
TaskCreate(subject="Generate PDF outline", description="PDF-formatted case study outline", activeForm="Creating PDF outline")
```

**Agent LinkedIn: LinkedIn Post Version (background, if selected)**

```
TaskUpdate(taskId="5", status="in_progress")

Task(subagent_type="general-purpose", run_in_background=true, prompt="
Generate LinkedIn post version of case study:

PROJECT: [project-name]
CLIENT: [client-name]
KEY METRICS: [metrics]

Read: ./docs/presale/case-studies/case-study-[slug]-[YYMMDD].md

Format:

# LinkedIn Post: [Project] Case Study

🎯 **Challenge:**
[1-2 sentences about the problem - make it relatable]

💡 **Solution:**
[1-2 sentences about approach - highlight innovation]

📊 **Results:**
• [Metric 1 with specific number]
• [Metric 2 with specific number]
• [Metric 3 with specific number]

[Optional client quote snippet]

Read the full case study: [link]

#[Industry] #[Technology] #[Technology2] #DigitalTransformation #CaseStudy

---

**Guidelines:**
- Keep under 300 words
- Use emojis strategically (3-4 max)
- Include 5-7 relevant hashtags
- Add engagement question at end (optional)
- Professional but conversational tone

Output: ./docs/presale/case-studies/case-study-[slug]-linkedin.md
", description="Generate LinkedIn post")

TaskUpdate(taskId="5", status="completed")
```

**Agent PDF: PDF Outline Version (background, if selected)**

```
TaskUpdate(taskId="6", status="in_progress")

Task(subagent_type="general-purpose", run_in_background=true, prompt="
Generate PDF-ready outline for case study:

PROJECT: [project-name]
CLIENT: [client-name]

Read: ./docs/presale/case-studies/case-study-[slug]-[YYMMDD].md

Create structured outline with:
- Cover page elements (title, client logo placeholder, date)
- Table of contents with page number placeholders
- Section breaks with visual hierarchy
- Callout boxes for key metrics
- Testimonial box (highlighted)
- Charts/diagrams placeholders with descriptions
- Contact page with CTAs

Add PDF formatting notes:
- Font suggestions (headings, body)
- Color palette (brand colors)
- Image placement recommendations
- Page layout suggestions

Output: ./docs/presale/case-studies/case-study-[slug]-pdf-outline.md
", description="Generate PDF outline")

TaskUpdate(taskId="6", status="completed")
```

**Wait for format generation (if applicable):**

```
# Only if LinkedIn selected
if [LinkedIn selected]; then
  TaskOutput(task_id=[LinkedIn-task-id], block=true)
fi

# Only if PDF selected
if [PDF selected]; then
  TaskOutput(task_id=[PDF-task-id], block=true)
fi
```

---

### Alternative: Quick Template Generation

For rapid case study creation, use template-based approach:

```bash
# Use pre-built template
cp .claude/skills/chief-architect-presale/templates/case-study-quick-template.md \
   ./docs/presale/case-studies/case-study-[slug]-[YYMMDD].md

# Fill in placeholders with sed or single lightweight agent
# Duration: ~1-2 minutes
```

---

## Phase 8: Summary

```
════════════════════════════════════════════════════════════════
         ✅ CASE STUDY GENERATED (PARALLEL EXECUTION)
════════════════════════════════════════════════════════════════

PROJECT: [project-name]
CLIENT: [client-name]
INDUSTRY: [industry]

EXECUTION MODEL:
  🔄 Parallel sections: 3 agents (intro, solution, results)
  ⚡ Background execution: All agents run simultaneously
  📊 Total generation: ~2-4 minutes (vs 5-8 min monolithic)

PERFORMANCE:
  ⏱️  Section generation: ~2-3 minutes (3 parallel agents)
  ⏱️  Consolidation + SEO: ~1 minute (1 agent)
  ⏱️  Format generation: ~1 minute (parallel if multiple)
  ⏱️  Total: ~3-5 minutes
  ✅ 50% faster than single-agent approach

OUTPUTS:
  📄 ./docs/presale/case-studies/case-study-[slug]-[date].md (main)
  📄 ./docs/presale/case-studies/case-study-[slug]-linkedin.md (if selected)
  📄 ./docs/presale/case-studies/case-study-[slug]-pdf-outline.md (if selected)
  📁 ./docs/presale/case-studies/[slug]-part*.md (section files for reference)

KEY METRICS HIGHLIGHTED:
  ✓ [Metric 1]: [value]
  ✓ [Metric 2]: [value]
  ✓ [Metric 3]: [value]

SEO STATUS:
  ✓ Title optimized (50-60 chars)
  ✓ Meta description included (150-160 chars)
  ✓ Keywords identified (primary, secondary, long-tail)
  ✓ URL structure defined
  ✓ Internal links suggested

FORMATS GENERATED:
  ✓ Markdown (website)
  [✓] LinkedIn post (if selected)
  [✓] PDF outline (if selected)

PROGRESS TRACKING:
  → View tasks: TaskList
  → 4-6 tasks created (depending on formats)
  → Background agents monitored via TaskOutput

NEXT STEPS:
  1. Review case study for accuracy
  2. Get client approval for publication
  3. Add visual assets (screenshots, diagrams, charts)
  4. Publish to website
  5. Share LinkedIn version on company page
  6. Generate PDF with designer (use outline)

PUBLICATION CHECKLIST:
  □ Client approval obtained
  □ Legal review (if needed)
  □ Visual assets added (screenshots, diagrams)
  □ Published to website
  □ Shared on LinkedIn
  □ Added to sales collateral
  □ PDF version created (if needed)
  □ Internal team notified

════════════════════════════════════════════════════════════════
```
---

## Important Notes

- **IMPORTANT:** Always quantify results with specific metrics
- **IMPORTANT:** Get client approval before publication
- **IMPORTANT:** Use "Confidential Client" if under NDA
- **IMPORTANT:** Include before/after comparisons
- **IMPORTANT:** Optimize for target keywords
- **IMPORTANT:** Include compelling testimonial
- **IMPORTANT:** Add visual assets (diagrams, screenshots) before publishing
