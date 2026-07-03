"use client";

import { useMemo, useState } from "react";
import {
  INTERVIEW_QUESTIONS,
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  CATEGORY_BADGE_CLASSES,
  type InterviewCategory,
} from "./interview-data";

/**
 * Client component porting interview.html's inline category-filter/expand
 * script (legacy lines 287-328: filterCat(), renderQ(), toggleQ()).
 * Kept separate from page.tsx so the route's Metadata export (server-only)
 * stays in a server component.
 */
export function InterviewContent() {
  const [activeCategory, setActiveCategory] = useState<InterviewCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.map((qa, index) => ({ qa, index })).filter(
      ({ qa }) => activeCategory === "all" || qa.cat === activeCategory,
    );
  }, [activeCategory]);

  function handleCategoryChange(category: InterviewCategory | "all") {
    setActiveCategory(category);
    setOpenIndex(null);
  }

  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {CATEGORY_FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => handleCategoryChange(filter.key)}
            aria-pressed={activeCategory === filter.key}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === filter.key
                ? "border-secondary bg-secondary text-white"
                : "border-border bg-bg text-text-muted hover:border-secondary hover:text-text"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-text-muted">
        Hiển thị <b className="text-text">{filteredQuestions.length}</b> câu
        hỏi. Click vào mỗi câu để xem câu trả lời mẫu.
      </p>

      <div className="mt-2 flex flex-col gap-2.5">
        {filteredQuestions.map(({ qa, index }) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-card border border-border bg-bg"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left hover:bg-bg-alt"
              >
                <div>
                  <div className="text-sm font-semibold text-text">{qa.q}</div>
                  <div className="mt-0.5 text-xs italic text-text-muted">
                    {qa.vi}
                  </div>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1">
                  <span
                    className={`rounded-lg px-1.5 py-0.5 text-[9px] font-bold ${CATEGORY_BADGE_CLASSES[qa.cat]}`}
                  >
                    {CATEGORY_LABELS[qa.cat]}
                  </span>
                  <span
                    className={`text-xs text-text-muted transition-transform ${
                      isOpen ? "rotate-180 text-secondary" : ""
                    }`}
                  >
                    ▾
                  </span>
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-border px-4 py-3.5">
                  <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-secondary">
                    Câu trả lời mẫu
                  </div>
                  <div className="text-sm font-semibold leading-relaxed text-accent">
                    {qa.ans}
                  </div>
                  <div className="mt-1.5 text-xs italic leading-relaxed text-text-muted">
                    {qa.viAns}
                  </div>
                  {qa.warn && (
                    <div className="mt-2 rounded-lg border border-secondary/40 bg-secondary/10 px-2.5 py-2 text-xs leading-relaxed text-secondary">
                      <b>⚠️ Cẩn thận:</b> {qa.warn}
                    </div>
                  )}
                  {qa.tip && (
                    <div className="mt-2 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-2 text-xs leading-relaxed text-primary">
                      <b>💡 Mẹo:</b> {qa.tip}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
