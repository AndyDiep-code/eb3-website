# Source Extraction — What to Read from BRD/FRD

## How to Read Source Documents

Read all `--source` files before extracting. For PDFs, use pypdf if the Read tool fails:
```python
import pypdf
reader = pypdf.PdfReader(path)
text = '\n'.join(page.extract_text() for page in reader.pages if page.extract_text())
```

Extract the following by artifact type:

---

## Product Brief

| Section to Find | Signal Words | What to Extract |
|----------------|-------------|-----------------|
| Executive Summary | "executive summary", "overview", "introduction" | Problem being solved, solution in 1–2 sentences |
| Background / Context | "background", "context", "pain points", "why now" | Current pain points, business drivers |
| Business Objectives | "objectives", "goals", "measure of success" | 3–7 measurable goals |
| Stakeholders / Users | "stakeholders", "users", "roles", "who" | Role names + what they do in the product |
| Scope — In Scope | "in scope", "module", "this release" | Key capabilities as a bullet list |
| Scope — Out of Scope | "out of scope", "not in this release", "deferred", "future" | What is explicitly excluded |
| Non-Functional | "performance", "security", "compliance", "browsers" | Key technical constraints in plain language |
| Glossary | "glossary", "terms", "definitions" | Product-specific terms to include in a key numbers table |

**Tone:** Non-technical, narrative. Write for an L&D Director or HR Business Partner, not an engineer.

---

## Lifecycle Diagram

| Section to Find | Signal Words | What to Extract |
|----------------|-------------|-----------------|
| State machine | "state", "status", "lifecycle", "transitions" | State names, transition triggers, terminal states |
| Administrator journey | "administrator journey", "admin steps", "create", "launch", "cancel" | Step sequence, decision points, page names |
| Participant/end-user journey | "participant journey", "user journey", "submit", "respond" | Entry points, decision branches (token vs no token), exit point |

**Rules:**
- Extract state names exactly as written in the source (preserve capitalisation: Draft, Active, Closed)
- Identify which states are terminal (no further transitions)
- Identify which fields remain editable in each state (commonly in a table in the BRD)
- For the admin journey: map actions to page names if the source names pages
- For the participant journey: identify the main fork (e.g. "token present?" or "existing response?")

---

## Scope Decision Register

| Section to Find | Signal Words | What to Extract |
|----------------|-------------|-----------------|
| Sign-off items | "sign-off", "SO-", "client confirmation", "pending", "proposed" | ID, what changed, why, sign-off status |
| In scope | "in scope", "this release", "module 1" | Confirmed capabilities |
| Out of scope | "out of scope", "not in this release", "excluded" | Explicit exclusions with brief reason |
| Deferred | "deferred", "phase 2", "future", "V2", "later" | Feature + target phase if mentioned |
| Scope additions | "addition", "net addition", "beyond the raw", "design review" | Features added beyond original brief |
| Open questions | "OQ-", "open question", "pending", "TBD", "to be resolved" | ID, question, impact |
| Decisions needed | "decision needed", "must be resolved", "before sign-off" | List of outstanding decisions |

**Rules:**
- Preserve decision IDs exactly (SO-1, OQ-7, etc.)
- Include "Why" column — the business reason behind each decision is the most valuable part
- Mark status honestly: ✅ Agreed | ⬜ Pending | 🔄 Deferred | ❓ Open Question

---

## Feature Briefs

| Section to Find | Signal Words | What to Extract |
|----------------|-------------|-----------------|
| Feature groupings | Section headings, "feature", "module", "capability" | List of feature/module names (aim for 3–5) |
| Purpose per feature | "purpose", "goal", "enables", first paragraph of section | 1–2 sentence purpose statement |
| User journeys | "journey", "flow", "steps", numbered sequences | Extract as max 3 rows: Flow Name → 1-line description |
| Business rules | "BR-", "business rule", "must", "cannot", "always", "never" | Max 3 most important rules per feature |
| Out of scope per feature | "out of scope", "excluded", "deferred", "not supported" | Feature-level exclusions (different from product-level scope) |

**Rules:**
- Group pages into features using the source's own groupings (not invented by AI)
- Keep flows at a summary level — 1 sentence per flow, not step-by-step
- Business rules: choose the ones that would surprise a stakeholder if they didn't know about them
- Out of scope: only include items that a stakeholder might reasonably expect to be included
