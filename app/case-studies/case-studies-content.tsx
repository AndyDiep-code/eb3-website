"use client";

import { useState } from "react";
import {
  CASE_STUDIES,
  BADGE_STYLES,
  type CaseAlert,
  type CaseSection,
} from "./case-studies-data";

const ALERT_TONE_CLASSES: Record<CaseAlert["tone"], string> = {
  red: "border-primary/40 bg-primary/10 text-text",
  yellow: "border-secondary/40 bg-secondary/10 text-text",
  green: "border-accent/40 bg-accent/10 text-text",
  blue: "border-primary/30 bg-primary/5 text-text",
};

const LIST_TONE_CLASSES: Record<"bad" | "good" | "warn" | "neutral", string> = {
  bad: "text-primary",
  good: "text-accent",
  warn: "text-secondary",
  neutral: "text-text-muted",
};

function AlertBox({ alert }: { alert: CaseAlert }) {
  return (
    <div
      className={`mt-3 flex gap-2.5 rounded-card border p-3 text-sm leading-relaxed ${ALERT_TONE_CLASSES[alert.tone]}`}
    >
      <div className="flex-shrink-0 text-lg">{alert.icon}</div>
      {/* Source: hand-authored case-studies-data.ts (no user input), simple <b> markup ported from legacy CASE_STUDIES array. */}
      <div dangerouslySetInnerHTML={{ __html: alert.html }} />
    </div>
  );
}

function CaseSectionBlock({ section }: { section: CaseSection }) {
  return (
    <div className="mt-4">
      <div className="border-b border-border pb-2 text-sm font-bold text-text">
        {section.label}
      </div>

      {section.list && (
        <ul className="mt-2 flex flex-col divide-y divide-border rounded-card border border-border bg-bg p-4 text-sm">
          {section.list.map((item, index) => (
            <li
              key={index}
              className={`flex gap-2 py-1.5 leading-relaxed first:pt-0 last:pb-0 text-text-muted [&_b]:text-text`}
            >
              <span className={`flex-shrink-0 ${LIST_TONE_CLASSES[item.tone]}`}>›</span>
              <span dangerouslySetInnerHTML={{ __html: item.html }} />
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-text-muted">
                {section.table.headers.map((header) => (
                  <th key={header} className="py-2 pr-3 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-text">
              {section.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border last:border-0">
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-2 pr-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.steps && (
        <ol className="mt-2 flex flex-col gap-2 text-sm text-text-muted">
          {section.steps.map((step, index) => (
            <li key={index} className="flex gap-2.5 [&_b]:text-text">
              <span className="flex-shrink-0 font-bold text-primary">{index + 1}.</span>
              <span dangerouslySetInnerHTML={{ __html: step.html }} />
            </li>
          ))}
        </ol>
      )}

      {section.alert && <AlertBox alert={section.alert} />}
    </div>
  );
}

/**
 * Client component porting case-studies.html's inline toggleCase() accordion
 * script (legacy: each .case-card independently toggleable, c1 open by
 * default). Kept separate from page.tsx so the route's Metadata export
 * (server-only) stays in a server component.
 */
export function CaseStudiesContent() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(["c1"]));

  function toggleCase(id: string) {
    setOpenIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      {CASE_STUDIES.map((caseStudy) => {
        const isOpen = openIds.has(caseStudy.id);
        return (
          <div
            key={caseStudy.id}
            className="overflow-hidden rounded-card border border-border bg-bg"
          >
            <button
              type="button"
              onClick={() => toggleCase(caseStudy.id)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left hover:bg-bg-alt"
            >
              <div className="flex gap-3">
                <span className="text-xl">{caseStudy.icon}</span>
                <div>
                  <div className="text-sm font-bold text-text">{caseStudy.title}</div>
                  <div className="mt-0.5 text-xs text-text-muted">{caseStudy.sub}</div>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${BADGE_STYLES[caseStudy.badgeLevel]}`}
                  >
                    {caseStudy.badge}
                  </span>
                </div>
              </div>
              <span
                className={`mt-1 flex-shrink-0 text-xs text-text-muted transition-transform ${
                  isOpen ? "rotate-180 text-primary" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-border px-4 pb-4">
                {caseStudy.sections.map((section, index) => (
                  <CaseSectionBlock key={index} section={section} />
                ))}
                {caseStudy.trailingAlert && <AlertBox alert={caseStudy.trailingAlert} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
