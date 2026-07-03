"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { STATES, type StateTag } from "./dmv-data";

type FilterKey = "all" | StateTag;

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "Tất cả" },
  { key: "eb3", label: "🏭 Nhiều hãng EB3" },
  { key: "notax", label: "💰 Không thuế TN" },
  { key: "viet", label: "🇻🇳 Cộng đồng Việt lớn" },
];

const BADGE_STYLES: Record<string, string> = {
  eb3: "bg-accent/10 text-accent",
  resort: "bg-primary/10 text-primary",
  food: "bg-secondary/10 text-secondary",
};

/**
 * DMV state picker — search input + filter chips + card grid.
 * Ported from dmv.html's STATES array and filter/search JS.
 */
export function DmvContent() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return STATES.filter((s) => {
      const matchFilter =
        activeFilter === "all" || s.tags.includes(activeFilter as StateTag);
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.abbr.toLowerCase().includes(q) ||
        s.employers.toLowerCase().includes(q) ||
        s.note.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [query, activeFilter]);

  return (
    <div>
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="🔍 Tìm tiểu bang..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-card border border-border bg-bg px-4 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-text-muted font-semibold">Lọc:</span>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveFilter(f.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              activeFilter === f.key
                ? "bg-primary text-white border-primary"
                : "border-border bg-bg text-text-muted hover:border-primary/50 hover:text-text"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="mb-3 text-xs text-text-muted">
        Hiển thị <strong className="text-text">{filtered.length}</strong> /{" "}
        {STATES.length} tiểu bang
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {filtered.map((s) => {
          const topEmployers = s.employers.split(" · ").slice(0, 3).join(" · ");
          const hasMore = s.employers.split(" · ").length > 3;

          return (
            <Link
              key={s.abbr}
              href={s.href}
              className="relative block rounded-card border border-border bg-bg p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm"
            >
              <span
                className={`absolute top-3 right-3 rounded-lg px-2 py-0.5 text-[10px] font-bold ${BADGE_STYLES[s.badge] ?? BADGE_STYLES.eb3}`}
              >
                {s.badgeLabel}
              </span>

              <div className="text-3xl mb-2">{s.flag}</div>
              <div className="text-base font-bold text-text mb-0.5">
                {s.name}
              </div>
              <span className="inline-block rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-white mb-2">
                {s.abbr}
              </span>

              <div className="flex gap-3 flex-wrap mb-2">
                <span className="text-xs text-text-muted">
                  📝 <strong className="text-secondary">{s.q}</strong> câu
                </span>
                <span className="text-xs text-text-muted">
                  ✅ Đậu{" "}
                  <strong className="text-secondary">{s.pass}</strong>
                </span>
                <span className="text-xs text-text-muted">
                  💵 <strong className="text-secondary">{s.fee}</strong>
                </span>
              </div>

              <div className="text-xs text-accent leading-relaxed mb-1">
                🏭 {topEmployers}
                {hasMore ? "..." : ""}
              </div>
              <div className="text-xs text-text-muted mt-1">{s.note}</div>
            </Link>
          );
        })}
      </div>

      {/* Tip */}
      <div className="rounded-card border border-border bg-bg p-3 text-xs text-text-muted leading-relaxed">
        <strong className="text-text">💡 Mẹo:</strong> Nhiều DMV/BMV hỗ trợ
        thi bằng tiếng Việt. Hỏi nhân viên khi đến nơi hoặc kiểm tra website
        của tiểu bang. Mang đủ giấy tờ: Passport + thẻ xanh/EAD + bằng chứng
        địa chỉ tại bang.
      </div>
    </div>
  );
}
