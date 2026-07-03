"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GLOSSARY_TERMS } from "./glossary-data";

/**
 * Client component porting glossary.html's inline search/alpha-filter script
 * (legacy lines 232-273: buildAlphaTabs(), render(), filterTerms()).
 * Kept separate from page.tsx so the route's Metadata export (server-only)
 * stays in a server component.
 */
export function GlossaryContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAlpha, setActiveAlpha] = useState("all");

  const alphas = useMemo(() => {
    const letters = new Set(GLOSSARY_TERMS.map((term) => term.abbr[0]));
    return ["all", ...Array.from(letters).sort()];
  }, []);

  const filteredTerms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((term) => {
      const matchesAlpha =
        activeAlpha === "all" || term.abbr.startsWith(activeAlpha);
      const matchesQuery =
        !query ||
        term.abbr.toLowerCase().includes(query) ||
        term.full.toLowerCase().includes(query) ||
        term.vi.toLowerCase().includes(query) ||
        term.def.toLowerCase().includes(query);
      return matchesAlpha && matchesQuery;
    });
  }, [searchQuery, activeAlpha]);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setActiveAlpha("all");
  }

  return (
    <>
      <div className="mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="🔍 Tìm thuật ngữ..."
          className="w-full rounded-btn border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {alphas.map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() => setActiveAlpha(letter)}
            aria-pressed={activeAlpha === letter}
            className={`rounded-btn border px-2.5 py-1 text-xs font-semibold transition-colors ${
              activeAlpha === letter
                ? "border-primary bg-primary text-white"
                : "border-border bg-bg text-text-muted hover:border-primary hover:text-text"
            }`}
          >
            {letter === "all" ? "Tất cả" : letter}
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-text-muted">
        Hiển thị <b className="text-text">{filteredTerms.length}</b> /{" "}
        {GLOSSARY_TERMS.length} thuật ngữ
      </p>

      <div className="mt-2">
        {filteredTerms.map((term) => (
          <div
            key={term.abbr}
            className="mb-2 rounded-card border border-border bg-bg p-4"
          >
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="text-base font-extrabold text-primary">
                {term.abbr}
              </span>
              <span className="text-xs italic text-text-muted">
                {term.full}
              </span>
              <span className="text-xs font-semibold text-secondary">
                {term.vi}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
              {term.def}
              {term.abbr === "VB" && (
                <>
                  {" "}
                  <Link href="/visa-bulletin" className="text-primary hover:underline">
                    Xem tại trang Visa Bulletin
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        ))}
        {filteredTerms.length === 0 && (
          <p className="py-10 text-center text-sm text-text-muted">
            Không tìm thấy thuật ngữ phù hợp.
          </p>
        )}
      </div>
    </>
  );
}
