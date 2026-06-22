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
  "EB-3": "bg-primary/10 text-primary",
  USCIS: "bg-accent/10 text-accent",
};

export function NewsPreview() {
  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-text">📰 Tin Tức Mới Nhất</p>
        <a
          href="/news"
          className="text-sm font-medium text-primary hover:underline"
        >
          Xem tất cả →
        </a>
      </div>
      <ul className="mt-3 flex flex-col gap-3">
        {NEWS_ITEMS.map((item) => (
          <li key={item.title} className="flex items-start gap-2">
            <span
              className={`shrink-0 rounded-btn px-2 py-0.5 text-xs font-semibold ${TAG_STYLES[item.tag]}`}
            >
              {item.tag}
            </span>
            <div>
              <p className="text-sm text-text">{item.title}</p>
              <p className="text-xs text-text-muted">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
