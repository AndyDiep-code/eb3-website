"use client";

import { useEffect, useRef, useState } from "react";
import { SEARCH_INDEX, type SearchEntry } from "./search-data";

// Simple client-side search — no external library needed for ~40 entries.
// Matches title (weight 3), description (weight 1), group (weight 2).
function search(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return SEARCH_INDEX.filter((entry) => {
    const haystack = `${entry.title} ${entry.group} ${entry.description}`.toLowerCase();
    // Support multi-word queries: every word must match somewhere
    return q.split(/\s+/).every((word) => haystack.includes(word));
  }).slice(0, 8);
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function GlobalSearch({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const hits = search(query);
    setResults(hits);
    setSelected(0);
  }, [query]);

  // Modal-local keyboard handling: ESC to close, arrow keys + enter to navigate
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && results[selected]) {
        window.location.href = results[selected].href;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, results, selected]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm nội dung"
        className="fixed left-1/2 top-[12%] z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-bg shadow-2xl"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span className="text-text-muted">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm... (ví dụ: medicaid, PERM, bằng lái)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-text placeholder-text-muted outline-none"
          />
          <kbd className="hidden rounded bg-bg-alt px-1.5 py-0.5 text-[10px] text-text-muted sm:block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[360px] overflow-y-auto py-1">
            {results.map((entry, i) => (
              <li key={entry.href}>
                <a
                  href={entry.href}
                  className={`flex flex-col gap-0.5 px-4 py-2.5 transition-colors ${
                    i === selected ? "bg-primary/10" : "hover:bg-bg-alt"
                  }`}
                  onMouseEnter={() => setSelected(i)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                      {entry.group}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-text">{entry.title}</div>
                  <div className="text-[11px] text-text-muted line-clamp-1">{entry.description}</div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-text-muted">
            Không tìm thấy kết quả cho &ldquo;{query}&rdquo;
          </div>
        )}

        {/* Hint when empty */}
        {!query && (
          <div className="px-4 py-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              Gợi ý
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Visa Bulletin", "PERM", "I-485", "Medicaid", "Bằng lái", "Khai thuế", "Credit"].map(
                (hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => setQuery(hint)}
                    className="rounded-full border border-border bg-bg-alt px-2.5 py-1 text-xs text-text-muted hover:border-primary hover:text-primary"
                  >
                    {hint}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
          <span className="text-[10px] text-text-muted">
            ↑↓ di chuyển · Enter chọn · Esc đóng
          </span>
          <span className="text-[10px] text-text-muted">{SEARCH_INDEX.length} trang</span>
        </div>
      </div>
    </>
  );
}
