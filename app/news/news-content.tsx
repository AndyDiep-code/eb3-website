"use client";

import { useMemo, useState } from "react";
import { NEWS_TAGS, SORTED_NEWS, getTagClass } from "./news-data";

type TabKey = "policy" | "legal" | "gov";

export interface ExternalNewsItem {
  title: string;
  link: string;
  desc: string;
  date: string;
  source: string;
}

export interface ExternalNewsResponse {
  updated?: string;
  items?: ExternalNewsItem[];
}

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "policy", label: "📋 Chính Sách EB-3" },
  { key: "legal", label: "⚖️ Pháp Luật & Cộng Đồng" },
  { key: "gov", label: "🏛️ USCIS & DOL" },
];

function TabButton({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-bg text-text-muted hover:border-primary hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}

function PolicyNewsTab() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");

  const visibleNews = useMemo(() => {
    const query = search.toLowerCase();
    return SORTED_NEWS.filter((item) => {
      const matchesTag = activeTag === "all" || item.tags.includes(activeTag);
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.impact.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query);
      return matchesTag && matchesSearch;
    });
  }, [search, activeTag]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Tìm kiếm tin tức..."
        className="w-full rounded-card border border-border bg-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary"
      />

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs text-text-muted">Lọc:</span>
        {NEWS_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeTag === tag
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-bg text-text-muted hover:border-primary"
            }`}
          >
            {tag === "all" ? "Tất cả" : tag === "VB" ? "Visa Bulletin" : tag}
          </button>
        ))}
      </div>

      <div className="mt-3.5 text-xs text-text-muted">
        Hiển thị <b className="text-text">{visibleNews.length}</b> / {SORTED_NEWS.length} tin
      </div>

      <div className="mt-3 grid gap-3">
        {visibleNews.map((item) => (
          <div
            key={item.title}
            className="rounded-card border border-border bg-bg p-4 transition-colors hover:border-primary/40"
          >
            <div className="flex flex-wrap items-start justify-between gap-2.5">
              <div className="flex-1 text-sm font-bold text-text">{item.title}</div>
              <div className="flex flex-shrink-0 flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${getTagClass(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2.5 text-xs text-text-muted">
              <span>📅 {item.date}</span>
              <span className="font-semibold text-primary">🏛 {item.source}</span>
            </div>
            <div className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</div>
            <div className="mt-2 rounded-btn border border-secondary/40 bg-secondary/10 p-2 text-xs text-text">
              <b>⚡ Tác động:</b> {item.impact}
            </div>
          </div>
        ))}
      </div>

      {visibleNews.length === 0 && (
        <div className="py-10 text-center text-sm text-text-muted">
          Không tìm thấy tin phù hợp.
        </div>
      )}

      <div className="mt-5 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
        <b className="text-text">Lưu ý:</b> Nội dung trên chỉ mang tính tham khảo, được tổng hợp
        từ các nguồn chính thức (USCIS, DOS, DOL). Không thay thế tư vấn pháp lý di trú chuyên
        nghiệp. Luôn kiểm tra lại tại nguồn gốc trước khi ra quyết định.
      </div>
    </div>
  );
}

/**
 * Shared renderer for the auto-fetched external news feeds (legal + gov tabs).
 * Ported from news.html's renderExtCards() (lines 629-652).
 */
function ExternalNewsList({
  items,
  searchQuery,
  sourceFilter,
}: {
  items: ExternalNewsItem[];
  searchQuery: string;
  sourceFilter: string;
}) {
  const query = searchQuery.toLowerCase();
  const filtered = items.filter((item) => {
    if (sourceFilter !== "all" && item.source !== sourceFilter) return false;
    if (query && !(item.title + item.desc).toLowerCase().includes(query)) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-text-muted">Không có tin phù hợp.</div>
    );
  }

  return (
    <div className="grid gap-2.5">
      {filtered.map((item) => {
        const badgeClass =
          item.source === "DOL"
            ? "bg-[#1a2e05] text-[#84cc16]"
            : item.source === "USCIS"
              ? "bg-[#1e3a8a] text-[#93c5fd]"
              : "bg-[#1a0a28] text-[#c4b5fd]";
        return (
          <div
            key={item.link}
            className="rounded-card border border-border bg-bg p-3.5 transition-colors hover:border-primary/40"
          >
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="text-sm font-bold leading-relaxed text-text hover:text-primary">
                {item.title}
              </div>
            </a>
            <div className="mt-1.5 flex items-center gap-2.5 text-xs text-text-muted">
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${badgeClass}`}>
                {item.source}
              </span>
              <span>📅 {item.date}</span>
            </div>
            {item.desc && (
              <div className="mt-1.5 text-xs leading-relaxed text-text-muted">{item.desc}</div>
            )}
            {item.source === "justice.gov" && (
              <div className="mt-1.5 rounded-btn border border-secondary/40 bg-secondary/10 p-1.5 text-xs text-secondary">
                📌 Học hỏi & rút kinh nghiệm — đọc kỹ để hiểu quyền lợi và nghĩa vụ pháp lý.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LegalNewsTab({ data }: { data: ExternalNewsResponse }) {
  return (
    <div>
      <div className="rounded-card border border-accent/40 bg-accent/10 p-3 text-xs leading-relaxed text-text">
        <b className="text-accent">⚖️ Mục đích:</b> Tổng hợp tin từ <b>justice.gov</b> liên quan
        đến cộng đồng người Việt và người nhập cư. Không phải tin EB-3 — đây là các vụ án, cảnh
        báo pháp lý để anh chị em <b>nắm rõ quyền lợi và tránh vi phạm pháp luật</b> khi sống,
        làm việc tại Mỹ.
      </div>
      <div className="mt-3 text-right text-xs text-text-muted">
        Cập nhật: {data.updated ? data.updated.slice(0, 10) : "N/A"} · {data.items?.length ?? 0} tin
      </div>
      <div className="mt-2">
        <ExternalNewsList items={data.items ?? []} searchQuery="" sourceFilter="all" />
      </div>
    </div>
  );
}

function GovNewsTab({ data }: { data: ExternalNewsResponse }) {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");

  return (
    <div>
      <div className="rounded-card border border-primary/40 bg-primary/10 p-3 text-xs leading-relaxed text-text">
        <b className="text-primary">🏛️ Nguồn:</b> Tin tức chính thức từ <b>USCIS</b> (cập nhật
        form, phí, quy trình) và <b>DOL</b> (xử phạt employer, quy định lương tối thiểu, visa lao
        động). Cập nhật tự động hàng ngày.
      </div>
      <div className="mt-3 text-right text-xs text-text-muted">
        Cập nhật: {data.updated ? data.updated.slice(0, 10) : "N/A"} · {data.items?.length ?? 0} tin
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Tìm trong USCIS & DOL..."
        className="mt-3 w-full rounded-card border border-border bg-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary"
      />
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(["all", "USCIS", "DOL"] as const).map((source) => (
          <button
            key={source}
            type="button"
            onClick={() => setSourceFilter(source)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              sourceFilter === source
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-bg text-text-muted hover:border-primary"
            }`}
          >
            {source === "all" ? "Tất cả" : source}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <ExternalNewsList items={data.items ?? []} searchQuery={search} sourceFilter={sourceFilter} />
      </div>
    </div>
  );
}

/**
 * Client component for news.html's 3-tab layout (policy/legal/gov). Ported
 * from news.html lines 279-707:
 * - Tab 1 "policy": hand-curated NEWS array, client-side search+tag filter
 *   (news-data.ts holds the static dataset).
 * - Tab 2 "legal": data/news-legal.json (justice.gov items). The legacy page
 *   client-fetched this via `fetch('data/news-legal.json')`, which worked
 *   because news.html and data/ were siblings on the same static file server.
 *   In Next.js there is no public HTTP path for data/ (it is a server-side
 *   data directory, refreshed by .github/workflows/fetch-news.yml via a git
 *   commit, same mechanism as data/perm-processing-times.json). The faithful
 *   port is a server-side import in page.tsx passed down as a prop here,
 *   matching the established pattern in app/perm-tracker/page.tsx — same
 *   data, same refresh cadence, just consumed at render time instead of via
 *   a client-side network request.
 * - Tab 3 "gov": data/news-uscis.json (USCIS/DOL items), same mechanism,
 *   plus an additional source filter (USCIS/DOL/all).
 */
export function NewsContent({
  legalData,
  govData,
}: {
  legalData: ExternalNewsResponse;
  govData: ExternalNewsResponse;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("policy");

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2 border-b border-border pb-3">
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.label}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "policy" && <PolicyNewsTab />}
        {activeTab === "legal" && <LegalNewsTab data={legalData} />}
        {activeTab === "gov" && <GovNewsTab data={govData} />}
      </div>
    </>
  );
}
