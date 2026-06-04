# HTML Component Catalog

Reference for assembling Enouvo-branded HTML documents from Markdown. Use only the components defined here — never invent new CSS classes. Copy each component verbatim and replace `{{...}}` placeholders.

## Rules

- All UI labels (TOC title, "Recommended", "Skip to content") must match the source document's language. Set `lang="xx"` on `<html>` using ISO 639-1 codes (`en`, `vi`, `zh`, `ja`, `ko`, `es`, `fr`, `de`, `ru`, `ar`, `th`).
- Body content (paragraphs, headings) stays in the source language. Never translate it.
- Use only SVG icons from the embedded sprite. Never use emojis.
- One component per chunk. Do not nest callouts inside callouts.
- All headings (`h2`, `h3`) MUST have an `id` attribute to enable the TOC and anchor links.

## 1. Title block (replace placeholders)

```
{{LANG}}            → en | vi | zh | ja | ko | es | fr | de | ru | ar | th
{{REC_LABEL}}       → "★ Recommended" / "★ 推荐" / "★ Đề xuất" ...
{{TITLE}}           → from H1
{{SUBTITLE}}        → first paragraph after H1 (1-2 sentences)
{{DOC_TYPE}}        → PLAN | SPEC | RFC | SYSTEM DESIGN | RUNBOOK | POSTMORTEM | NOTES
{{SOURCE_FILE}}     → original markdown filename
{{DATE}}            → today's date (YYYY-MM-DD)
{{READ_TIME}}       → "X min read" (≈ wordCount / 200)
{{TOC_TITLE}}       → "On this page" / "Mục lục" / "目次" ...
{{SKIP_LINK_LABEL}} → "Skip to content" / "Bỏ qua đến nội dung" ...
{{PRINT_TOOLTIP}}   → "Print" / "In" / "印刷" ...
{{THEME_TOOLTIP}}   → "Toggle theme" / "Đổi chủ đề" ...
{{CLOSE_LABEL}}     → "Close" / "Đóng" ...
{{FOOTER_NOTE}}     → "Generated YYYY-MM-DD" / "Tạo ngày YYYY-MM-DD"
{{ENOUVO_LOGO_HEADER_URI}}   → data:image/webp;base64,...
{{ENOUVO_LOGO_WATERMARK_URI}} → data:image/png;base64,...
```

## 2. TOC entries

Insert between `<nav class="toc-nav" id="toc-nav">...</nav>`:

```html
<a href="#section-id" class="lvl-2">Section title</a>
<a href="#subsection-id" class="lvl-3">Subsection title</a>
```

## 3. Timeline / steps

Use for numbered procedures, sequential plans, or onboarding steps.

```html
<div class="timeline">
  <div class="step done">
    <div class="step-num">1</div>
    <div class="step-body">
      <h3>Step title</h3>
      <p>Short description of what happens in this step.</p>
      <div class="step-tags">
        <span class="tag">tag-1</span>
        <span class="tag">tag-2</span>
      </div>
    </div>
  </div>
  <div class="step">
    <div class="step-num">2</div>
    <div class="step-body">
      <h3>Next step</h3>
      <p>Description.</p>
    </div>
  </div>
</div>
```

Drop `.done` for incomplete steps. Drop `.step-tags` if no tags.

## 4. Callouts (6 semantic variants)

```html
<aside class="callout callout-info">
  <svg class="icon callout-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-info"/></svg>
  <div class="callout-body">
    <p class="callout-title">Title</p>
    <p>Body text.</p>
  </div>
</aside>
```

| Class | Icon | Use for |
|-------|------|---------|
| `callout-info` | `#i-info` | Neutral context |
| `callout-warn` | `#i-warn` | Caution / risk |
| `callout-danger` | `#i-danger` | Critical / breaking |
| `callout-success` | `#i-success` | Positive confirmation |
| `callout-decision` | `#i-decision` | Architectural decision |
| `callout-tip` | `#i-tip` | Hint / recommendation |

## 5. Key-point highlight

Use ONCE per major section for the single most important insight.

```html
<div class="highlight">
  <span class="highlight-label">Key insight</span>
  The most important takeaway in 1-2 sentences.
</div>
```

## 6. Mermaid diagrams

Use for flows with 3+ steps, sequences, state machines, ER models.

```html
<div class="diagram">
  <pre class="mermaid">
flowchart LR
  A[Start] --> B{Decision}
  B -->|Yes| C[Action]
  B -->|No| D[End]
  </pre>
  <p class="diagram-caption">Optional caption explaining the diagram.</p>
</div>
```

Supported types: `flowchart`, `sequenceDiagram`, `stateDiagram-v2`, `erDiagram`, `gantt`, `classDiagram`.

## 7. Pros / Cons

Use for binary trade-off discussions.

```html
<div class="proscons">
  <div class="proscons-col pros">
    <h4>Pros</h4>
    <ul>
      <li>Benefit one</li>
      <li>Benefit two</li>
    </ul>
  </div>
  <div class="proscons-col cons">
    <h4>Cons</h4>
    <ul>
      <li>Drawback one</li>
      <li>Drawback two</li>
    </ul>
  </div>
</div>
```

## 8. Comparison cards

Use when comparing 2+ options (libraries, approaches, vendors).

```html
<div class="compare">
  <div class="compare-card">
    <h4>Option A</h4>
    <p>Short description and key tradeoff.</p>
  </div>
  <div class="compare-card recommended">
    <h4>Option B</h4>
    <p>Description. The `.recommended` class adds the localized badge.</p>
  </div>
  <div class="compare-card">
    <h4>Option C</h4>
    <p>Description.</p>
  </div>
</div>
```

## 9. Collapsible section

Use for optional deep-dive content (long code, appendices, alternatives considered).

```html
<details class="collapsible">
  <summary>Show details</summary>
  <div class="collapsible-body">
    <p>Hidden content here.</p>
  </div>
</details>
```

## 10. Code blocks

Render fenced code blocks as standard `<pre><code>`. Copy button is injected automatically.

```html
<pre><code class="language-bash">npm install
npm run build</code></pre>
```

## 11. Tables

Wrap wide tables in a scrolling container.

```html
<table>
  <thead><tr><th>Column</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>row 1</td><td>data</td></tr>
  </tbody>
</table>
```

## 12. Selection heuristics

| Source pattern | Component |
|----------------|-----------|
| Numbered ordered list with verbs | timeline |
| `> Note:` / `> Warning:` blockquote | callout-info / callout-warn |
| "Pros:" then "Cons:" headers | proscons |
| "Option A vs Option B" sections | compare |
| "Decision:" or "We chose..." | callout-decision |
| Long appendix / "Details:" | collapsible |
| Flow with arrows or "then" steps | mermaid flowchart |
| The single most important sentence | highlight |
| Tip / suggestion / "Pro tip:" | callout-tip |

## 13. Anti-patterns (never do)

- ❌ Emojis in titles, callouts, or buttons — use the SVG sprite
- ❌ Inline `style="..."` attributes — all styling in the template
- ❌ More than one `.highlight` per section — it loses emphasis
- ❌ Nested callouts
- ❌ Plain `<ol>` for procedural steps — use `.timeline`
- ❌ Mermaid blocks without `class="mermaid"`
- ❌ Headings without `id` — breaks TOC
- ❌ External `<script>` or `<link>` beyond mermaid CDN and Google Fonts

## 14. Icon sprite IDs

All available `href="#..."` values:

`#i-info` `#i-warn` `#i-danger` `#i-success` `#i-decision` `#i-tip` `#i-lock` `#i-printer` `#i-moon` `#i-sun` `#i-menu` `#i-x` `#i-file` `#i-calendar` `#i-clock` `#i-copy` `#i-check` `#i-link`
