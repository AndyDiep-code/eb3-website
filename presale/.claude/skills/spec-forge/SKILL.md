---
name: spec-forge
description: >
  Use this skill whenever a user wants to turn raw client requirements into structured engineering
  artifacts. Trigger on: "ingest requirements", "write a spec", "break this into stories",
  "turn this into a backlog", "we got a new BRD", "client sent us a transcript", "update the
  spec", "create user stories", "product specification", "requirements document", or any request
  involving raw client documents (PDFs, transcripts, chat exports, BRDs, meeting notes) and
  structured engineering output. Also trigger when the user drops files into a spec/inbox/ folder
  and asks what to do with them, or when they want to maintain/update an existing spec with new
  information. This skill handles the full pipeline: ingest → analyze → synthesize spec →
  generate interactive HTML → produce ordered backlog.
when_to_use: |
  - User has raw client requirements to convert into engineering artifacts (BRD, transcript, meeting notes, Slack export, PDF, DOCX)
  - User asks to "write a spec", "create user stories", "build a backlog", or "ingest requirements"
  - User drops documents into spec/inbox/ and asks what to do with them
  - User wants to update an existing spec incrementally with new material
  - User needs traceability from source documents to requirements and stories
  - User wants an interactive HTML spec for stakeholder review
argument-hint: "[source material or file path] [--update to add to existing spec without rewriting] [--phase INGEST|ANALYZE|SPEC|HTML|BACKLOG to run a specific phase only]"
category: requirements
keywords:
  - requirements
  - specification
  - backlog
  - user stories
  - BRD
  - product spec
  - ingest requirements
  - feature breakdown
  - epics
  - acceptance criteria
  - traceability
  - product documentation
  - sprint planning
  - engineering artifacts
---

# spec-forge

Transforms raw client requirements — in any format — into a living product specification and
developer-ready backlog. Handles fresh ingestion and incremental updates as new material arrives.

---

## Quick Start — Common Use Cases

### Use Case 1: You just received a BRD or requirements document

```
"Here's our client's BRD [paste content or attach file]. Create a full product spec and backlog."
```

What happens:
1. Requirements are extracted and assigned stable IDs (REQ-001, REQ-002, ...)
2. `spec/PRODUCT_SPEC.md` is written — structured spec with all sections
3. `spec/PRODUCT_SPEC.html` is generated — interactive version for stakeholder review
4. `spec/BACKLOG.md` is written — epics, features, and stories ordered for developer execution
5. `spec/sources/manifest.json` tracks what was ingested

---

### Use Case 2: You have multiple sources (BRD + meeting transcript + Slack messages)

```
"We have 3 sources for this project. [paste or attach each one]. Reconcile them and create the spec."
```

What happens:
- All sources are ingested and tagged (SRC-001, SRC-002, SRC-003)
- Contradictions between sources are flagged in the Open Questions section
- A unified spec is produced that merges all inputs
- The manifest records all 3 sources with hashes

---

### Use Case 3: New requirements arrived — update the existing spec

```
"New meeting transcript: [paste content]. Update the spec and backlog — don't rewrite from scratch."
```

What happens:
- Existing REQ-IDs and STORY-IDs are preserved exactly
- New requirements get new IDs (continuing from the last used number)
- Removed items are marked `~~REQ-042~~ [REMOVED: reason]` — never deleted
- A changelog entry is appended to the spec
- The HTML is regenerated

---

### Use Case 4: PDF or DOCX file

```
"Ingest this PDF: [attach file or give path]. Create the spec."
```

What happens:
- `scripts/extract_text.py` is run to extract text from the binary file
- Extracted text is saved to `spec/sources/SRC-001.txt` for traceability
- Normal spec/backlog generation proceeds

If Python libraries are missing, install them first:
```bash
pip install pdfplumber python-docx
```

---

### Use Case 5: Ongoing project — team drops new files regularly

Set up a maintenance workflow:

1. Create a `spec/inbox/` folder in your project
2. Add to your project's `CLAUDE.md`:
   ```markdown
   ## Spec maintenance
   New requirements go in `spec/inbox/`. Run `/spec-forge` to ingest and update.
   ```
3. When new material arrives: drop files into `spec/inbox/`, then ask:
   ```
   "Update the spec with the new files in spec/inbox/"
   ```

---

## Step-by-Step: First-Time Setup

**Step 1 — Gather your raw materials**

Collect everything the client has sent: BRDs, meeting notes, email threads, Slack exports, wireframe descriptions, voice-memo transcripts. Any format works.

**Step 2 — Run spec-forge**

Paste or attach your materials and say:
```
"Ingest these requirements and create a full product spec and backlog."
```

**Step 3 — Review the outputs**

- Open `spec/PRODUCT_SPEC.html` in a browser — share with stakeholders for review
- Open `spec/BACKLOG.md` — review story ordering and complexity estimates with your team
- Check the Open Questions section — these need client answers before development starts

**Step 4 — Resolve open questions**

Send the Open Questions list to the client. When answers come back:
```
"Here are the client's answers to the open questions: [paste answers]. Update the spec."
```

**Step 5 — Start development**

Hand `spec/BACKLOG.md` to your developers. Stories are ordered top-to-bottom — STORY-001 has no dependencies and is the starting point.

**Step 6 — Maintain as requirements evolve**

Every time new material arrives (meeting recap, change request, clarification email):
```
"New requirements: [paste]. Update the spec and backlog incrementally."
```

---

## Output File Reference

| File | Who reads it | Purpose |
|------|-------------|---------|
| `spec/PRODUCT_SPEC.md` | Developers, agentic coding tools | Living spec — version-controlled, machine-readable |
| `spec/PRODUCT_SPEC.html` | Stakeholders, PMs, clients | Interactive spec — collapsible sections, search, status badges |
| `spec/BACKLOG.md` | Developers, tech leads | Ordered stories — execute top-to-bottom |
| `spec/sources/manifest.json` | Automated tooling | Tracks ingested sources and hashes for incremental updates |
| `spec/sources/SRC-*.txt` | Audit / traceability | Extracted source text — hover a requirement to see its origin |

---

## When to use which phase

- **First time / fresh project**: run all phases (INGEST → ANALYZE → SPEC → HTML → BACKLOG)
- **New material arrived**: run INGEST + ANALYZE, then update SPEC and BACKLOG incrementally
- **Spec review only**: skip INGEST, re-read existing `spec/sources/manifest.json` and regenerate
- **Backlog only**: read existing `spec/PRODUCT_SPEC.md` and run BACKLOG phase

---

## Phase 1 — INGEST

Accept any combination of source formats:
- `.pdf` — run `python scripts/extract_text.py <file>` to extract text
- `.docx` — run `python scripts/extract_text.py <file>` to extract text
- `.md`, `.txt`, `.html` — read directly
- Pasted text (chat exports, email threads, Slack) — treat as inline source

For each source:
1. Extract full text content
2. Assign a source ID: `SRC-001`, `SRC-002`, etc. (increment from existing manifest)
3. Record: `{ "id": "SRC-001", "filename": "...", "type": "brd|transcript|chat|notes", "date_ingested": "YYYY-MM-DD", "hash": "<md5>" }`

Write/update `spec/sources/manifest.json`. On re-run, compute hash of each file — skip sources
whose hash already exists in the manifest (only process new/changed files).

Create `spec/sources/` directory if it doesn't exist. Store extracted text as
`spec/sources/SRC-001.txt` etc. for traceability.

---

## Phase 2 — ANALYZE

Read all source texts (new ones only on incremental runs). Extract and organize:

**Business context**
- Goals and success metrics (what does the client want to achieve?)
- Stakeholders (who are the decision-makers, sponsors, affected parties?)
- User personas (who will use the product? roles, pain points, goals)

**Requirements**
- Functional requirements — group by domain/feature area
- Non-functional requirements — performance, security, scalability, compliance, accessibility
- Integrations — external systems, APIs, data sources

**Constraints and scope**
- Technical constraints (existing systems, platforms, languages)
- Business constraints (budget, timeline, regulatory)
- Explicit out-of-scope items
- Assumptions made by the client or in the documents

**Open questions**
- Contradictions between sources (flag with source IDs: "SRC-001 says X but SRC-003 says Y")
- Ambiguities that need client clarification
- Missing information needed to build

Keep a working notes structure in memory during this phase — you'll use it to write the spec.

---

## Phase 3 — SYNTHESIZE: Product Spec

Read `references/spec-template.md` for the full template and section guidance.

Write `spec/PRODUCT_SPEC.md` following the template exactly.

**Requirement IDs**: Every functional and non-functional requirement gets a stable ID: `REQ-001`,
`REQ-002`, etc. Never reuse or renumber existing IDs. New requirements on incremental runs get
the next available number.

**Source traceability**: After each requirement, annotate its origin:
`[Source: SRC-001, SRC-003]`

**Incremental updates**: 
- Read existing `spec/PRODUCT_SPEC.md` first
- Identify which sections need updating based on new source material
- Preserve all existing REQ-IDs exactly
- Add new requirements with new IDs
- Mark deprecated/removed requirements as `~~REQ-042~~ [REMOVED: reason]` — never delete
- Append a new entry to the Changelog section

---

## Phase 4 — SYNTHESIZE: Interactive HTML

Read `references/html-shell.html`. This is a self-contained shell with a `<!-- CONTENT_PLACEHOLDER -->` comment.

Convert the spec markdown to HTML (use standard markdown-to-HTML conventions — headers, lists,
tables, code blocks). Inject the converted HTML in place of `<!-- CONTENT_PLACEHOLDER -->`.

Write the result to `spec/PRODUCT_SPEC.html`.

The shell already includes: collapsible sections, requirement search, status badges, source
traceability tooltips, and print view. You only need to inject the content — do not modify the
shell's CSS or JS.

---

## Phase 5 — BACKLOG

Read `references/backlog-template.md` for the full template and ordering heuristic.

Write `spec/BACKLOG.md` following the template.

**Structure**: Epic → Feature → User Story → Acceptance Criteria

**Story IDs**: `STORY-001`, `STORY-002`, etc. Stable across updates — never renumber.

**Each story must include**:
- ID, title, persona
- User story sentence: "As a [persona], I want [goal] so that [benefit]"
- Acceptance criteria (Given/When/Then or bullet list — pick the clearer format)
- Complexity: S (<1 day), M (1–3 days), L (3–5 days), XL (>5 days)
- Dependencies: list STORY-IDs that must be done first (empty list if none)
- Implementation order: sequential number across all stories

**Ordering heuristic** (apply in this sequence):
1. Infrastructure & data models (auth, DB schema, core APIs)
2. Core domain logic (business rules, calculations, state machines)
3. Internal APIs and service layer
4. UI components and screens
5. Integrations with external systems
6. Polish, notifications, reporting, admin tools

Stories within the same layer are ordered by dependency — a story with no dependencies comes
before stories that depend on it.

**Incremental updates**:
- Read existing `spec/BACKLOG.md` first
- Add new stories with new IDs at the appropriate position in the ordering
- Mark removed stories as `[REMOVED]` with a reason — never delete
- Do not renumber existing stories

---

## Phase 6 — MAINTENANCE

After completing a full run, tell the user:

```
Spec and backlog are ready:
  spec/PRODUCT_SPEC.md   — [N] requirements across [M] domains
  spec/PRODUCT_SPEC.html — interactive version for stakeholder review
  spec/BACKLOG.md        — [P] stories across [Q] epics, ordered for execution

To update when new material arrives:
  1. Drop files into spec/inbox/
  2. Run: /spec-forge (or ask Claude to "update the spec with new files in spec/inbox/")

Open questions that need client clarification:
  [list them here]
```

Optionally suggest adding to the project's `CLAUDE.md`:
```markdown
## Spec maintenance
New requirements go in `spec/inbox/`. Run `/spec-forge` to ingest and update the spec and backlog.
```

---

## Output files summary

| File | Purpose |
|------|---------|
| `spec/PRODUCT_SPEC.md` | Living spec — version-controlled, readable by agentic tools |
| `spec/PRODUCT_SPEC.html` | Interactive spec — for human/stakeholder review |
| `spec/BACKLOG.md` | Ordered epic/story breakdown — for developer execution |
| `spec/sources/manifest.json` | Ingestion manifest — tracks processed sources |
| `spec/sources/SRC-*.txt` | Extracted source text — for traceability |

---

## Error handling

- **Binary file, no Python**: read what you can, note the limitation, ask user to paste text
- **Contradicting requirements**: include both in the spec, flag in Open Questions, do not silently pick one
- **Vague requirement**: include it as-is, add to Open Questions with a clarifying question
- **Missing personas**: infer from context, mark as `[Inferred]`, add to Open Questions
