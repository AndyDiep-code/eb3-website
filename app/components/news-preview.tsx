/**
 * News preview list — ported from index.html:355-380's `.news-preview`
 * block. Static placeholder items matching the current site's content;
 * full news content lives at /news (news.html, unmigrated until Phase 6).
 */
const NEWS_ITEMS = [
  {
    tag: "EB-3",
    title:
      "EB-3/EW Annual Limit Reached — FY2025: quota đã cạn trước 30/09/2025",
    date: "09/2025 · Department of State",
  },
  {
    tag: "USCIS",
    title:
      "Strengthened Screening & Vetting — tăng cường kiểm tra an ninh hồ sơ employment-based",
    date: "30/03/2026 · USCIS",
  },
  {
    tag: "USCIS",
    title: "CSPA Changed Back to Final Action Dates — áp dụng từ 15/08/2025",
    date: "08/08/2025 · USCIS & DOS",
  },
  {
    tag: "USCIS",
    title: "H.R. 1 Fee Updates — cập nhật phí I-131, I-485 theo Big Beautiful Bill",
    date: "18/07/2025 · USCIS",
  },
  {
    tag: "EB-3",
    title: "EB-3 Retrogression — DOS lùi Final Action Date tháng 07 & 09/2024",
    date: "07/2024 & 09/2024 · Department of State",
  },
];

const TAG_STYLES: Record<string, string> = {
  "EB-3": "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  USCIS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
};

export function NewsPreview() {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg shadow-sm">
      {/* Header strip */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-gray-50 px-4 py-3 dark:bg-gray-800/60">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-800 text-xs text-white">
            📰
          </span>
          <span className="text-sm font-bold text-text">Tin Tức Mới Nhất</span>
        </div>
        <a href="/news" className="text-xs font-semibold text-primary hover:underline">
          Xem tất cả →
        </a>
      </div>

      <ul className="divide-y divide-border">
        {NEWS_ITEMS.map((item) => (
          <li key={item.title} className="flex items-start gap-3 px-4 py-3">
            <span
              className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${TAG_STYLES[item.tag] ?? "bg-bg-alt text-text-muted"}`}
            >
              {item.tag}
            </span>
            <div>
              <p className="text-sm leading-snug text-text">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-text-muted">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
