"use client";

import { useMemo, useState } from "react";
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from "./faq-data";

/**
 * Client component porting faq.html's inline search/category-filter/accordion
 * script (legacy lines 514-561: render(), toggle(), setCat(), filterFaq()).
 * Kept separate from page.tsx so the route's Metadata export (server-only)
 * stays in a server component.
 */
export function FaqContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategory | "all">(
    "all",
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FAQS.map((faq, index) => ({ faq, index })).filter(
      ({ faq }) => {
        const matchesCategory =
          activeCategory === "all" || faq.cat === activeCategory;
        const matchesQuery =
          !query ||
          faq.q.toLowerCase().includes(query) ||
          faq.a.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
      },
    );
  }, [searchQuery, activeCategory]);

  function handleCategoryChange(category: FaqCategory | "all") {
    setActiveCategory(category);
    setOpenIndex(null);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setOpenIndex(null);
  }

  return (
    <>
      <div className="mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="🔍 Tìm câu hỏi..."
          className="w-full rounded-btn border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {FAQ_CATEGORIES.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => handleCategoryChange(category.key)}
            aria-pressed={activeCategory === category.key}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === category.key
                ? "border-primary bg-primary text-white"
                : "border-border bg-bg text-text-muted hover:border-primary hover:text-text"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-text-muted">
        Hiển thị <b className="text-text">{filteredFaqs.length}</b> /{" "}
        {FAQS.length} câu hỏi
      </p>

      <div className="mt-2">
        {filteredFaqs.map(({ faq, index }) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="mb-2 overflow-hidden rounded-card border border-border bg-bg"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className={`flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-bg-alt ${
                  isOpen ? "text-primary" : "text-text"
                }`}
              >
                <span>{faq.q}</span>
                <span
                  className={`mt-0.5 flex-shrink-0 text-xs text-text-muted transition-transform ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div
                  className="border-t border-border px-4 pb-3.5 pt-3 text-sm leading-relaxed text-text-muted [&_b]:text-text [&_em]:font-normal [&_em]:text-secondary"
                  // Source: hand-authored faq-data.ts (no user input), simple
                  // <b>/<em>/<br> markup ported from legacy FAQS array.
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              )}
            </div>
          );
        })}
        {filteredFaqs.length === 0 && (
          <p className="py-10 text-center text-sm text-text-muted">
            Không tìm thấy câu hỏi phù hợp.
          </p>
        )}
      </div>
    </>
  );
}
