# Output Rules — BA Artifact Format and Save Instructions

## Product Brief

**File:** `product-brief.md`

**Sections (in order):**
1. `# {Project Name} — Product Brief` + metadata line (version, date)
2. `## What Problem Does It Solve?` — narrative, 2–4 sentences. Pain points first, then solution.
3. `## What Is It?` — 1-paragraph summary + bullet list of what it does (max 5 bullets)
4. `## Who Uses It?` — table: Role | What They Do
5. `## Key Capabilities` — max 5, each as a `### N. Name` subheading with 2–3 sentence description
6. `## What It Does NOT Do (This Release)` — table: Out of Scope | Why. Always include this section.
7. `## Key Numbers` — compact table: terms, counts, defaults from source
8. Source attribution line at bottom

**Rules:**
- Tone: non-technical, narrative. Write for L&D Director / HR Business Partner, not an engineer.
- Never use FR IDs, acceptance criteria, or technical implementation details
- "Out of scope" section is mandatory — it prevents misaligned expectations
- Keep under 120 lines

---

## Lifecycle Diagram

**File:** `lifecycle-diagram.md`

**Sections (in order):**
1. `# {Subject} Lifecycle — Visual Reference` + metadata line
2. `## State Machine` — Mermaid `stateDiagram-v2`
3. `## State Reference Table` — table: State | QR/Access Live? | Accepting Input? | Editable Fields | How to Enter | Terminal?
4. `## Rules` — 3–6 business rules about lifecycle behaviour as bullet list
5. `## {Primary Role} Journey` — Mermaid `flowchart LR`
6. `## {End-User/Participant} Journey` — Mermaid `flowchart TD`
7. Source attribution line

**Mermaid rules — CRITICAL:**
- **NO `\n` in node labels** — `\n` renders as literal text in most viewers. Use single-line text.
- Keep node labels short (≤6 words). If more context is needed, add a numbered note below the diagram.
- Use `stateDiagram-v2` for state machines — cleaner than flowchart for state/transition diagrams
- Use `flowchart LR` for admin/creator journeys (left-to-right flow)
- Use `flowchart TD` for participant/end-user journeys (top-down decision tree)
- Decision nodes: `{Diamond text}` — keep text to 3 words max
- Edge labels: short (2–4 words): `-->|No - Open QR|` not `-->|No, the user came via Open QR without a token|`
- Use `-` instead of `—` in labels (em dash can cause parse errors)
- Test: every node and edge label must be renderable as a single line

---

## Scope Decision Register

**File:** `scope-decision-register.md`

**Sections (in order):**
1. `# Scope Decision Register — {Project}` + metadata line
2. Short intro: *"Use this document to quickly answer: 'Why isn't X in scope?' or 'When is Y coming?'"*
3. `## A. Client Sign-Off Required` — decisions that need explicit client acknowledgement before shipping
4. `## B. Scope Reductions` — features in the original brief that are smaller/removed in current version
5. `## C. Scope Additions` — features added beyond the original brief (net additions to contract)
6. `## D. Open Questions` — unresolved items with impact noted
7. `## E. Decisions Needed Before Sign-Off` — numbered list of outstanding client conversations

**Table format for A and B:**

| ID | Topic | What Original Said | Current Position | Why Changed | Status |
|----|-------|-------------------|-----------------|-------------|--------|

**Status values:** ✅ Agreed | ⬜ Pending sign-off | 🔄 Deferred to Phase 2 | ❓ Open Question

**Rules:**
- Preserve decision IDs exactly as written (SO-1, OQ-7, BR-4, etc.)
- "Why Changed" column is the most valuable — never leave it blank
- Section E must be a numbered list (not a table) — it reads as an action list for stakeholders
- If no items in a section, write "No items in this category." — do not omit the section heading

---

## Feature Briefs

**File:** `feature-briefs.md`

**Structure:** One `##` section per feature. Max 5 features.

**Per-feature format:**
```
## Feature N: {Name}

**Pages:** {comma-separated page names}

### Purpose
1–2 sentences. What this feature enables. Who benefits.

### Primary User
Role name — 1 sentence on their context.

### Key Flows

| Flow | Description |
|------|-------------|
| {Flow name} | 1-line description of what the user does and what they get |
| ... | (max 3 rows) |

### Business Rules That Matter

- **{Rule name}**: 1–2 sentences. Choose rules that would surprise a stakeholder if they didn't know.
- (max 3 bullets)

### What's NOT in This Feature

- Item — brief reason (→ Out of scope / → Deferred Phase 2 / → Pending OQ-N)
- (list every item a stakeholder might reasonably expect to be included)
```

**Rules:**
- Keep each feature section to ~1 printed page (30–40 lines)
- Flows: describe the "what" and the "outcome", not the step-by-step mechanics
- Business rules: pick the 3 that would surprise a stakeholder who read only the product brief
- Out of scope: never leave this section empty — explicitly listing exclusions prevents "but I thought..." conversations
- Source attribution at the very end of the file

---

## Save Instructions

- ALWAYS write to file — never display inline only
- Create directory with `mkdir -p qa-docs/{project-kebab}/ba-docs/` before writing
- Confirm each file: `✅ Saved to: qa-docs/{project-kebab}/ba-docs/{file}.md`
- `--type=all` → create all 4 files
- `--type=product-brief` → product-brief.md only
- `--type=lifecycle-diagram` → lifecycle-diagram.md only
- `--type=scope-register` → scope-decision-register.md only
- `--type=feature-briefs` → feature-briefs.md only
