/**
 * "Liên Kết Hữu Ích" external links grid — ported from index.html:382-408's
 * `.links-grid` block. External government/tracker links, unchanged URLs.
 */
const EXTERNAL_LINKS = [
  {
    href: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html",
    icon: "📅",
    name: "Visa Bulletin",
    source: "travel.state.gov",
    desc: "Lịch Visa Bulletin chính thức hàng tháng",
    color: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  },
  {
    href: "https://flag.dol.gov/case-status-search",
    icon: "🔍",
    name: "Check LC Status",
    source: "flag.dol.gov",
    desc: "Tra cứu tình trạng hồ sơ LC/PERM",
    color: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
  },
  {
    href: "https://egov.uscis.gov/",
    icon: "📋",
    name: "USCIS Case Status",
    source: "egov.uscis.gov",
    desc: "Tra cứu I-140 sau khi có receipt number",
    color: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  },
  {
    href: "https://flag.dol.gov/processingtimes",
    icon: "⏱",
    name: "DOL Processing Times",
    source: "flag.dol.gov",
    desc: "Thời gian xử lý LC/PERM hiện tại",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
  },
  {
    href: "https://permtimeline.com/",
    icon: "📊",
    name: "PERM Timeline Tracker",
    source: "permtimeline.com",
    desc: "Theo dõi tiến độ duyệt PERM hàng ngày",
    color: "bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-950/50 dark:text-sky-400 dark:border-sky-800",
  },
  {
    href: "https://ceac.state.gov/IV/Login.aspx",
    icon: "🏛️",
    name: "CEAC / DS-260",
    source: "ceac.state.gov",
    desc: "Điền và theo dõi đơn DS-260 NVC",
    color: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  },
  {
    href: "https://egov.uscis.gov/processing-times/",
    icon: "🕒",
    name: "USCIS Processing Times",
    source: "egov.uscis.gov",
    desc: "Thời gian xử lý I-140 theo Service Center",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
  },
  {
    href: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-statistics/immigrant-visa-statistics/monthly-immigrant-visa-issuances.html",
    icon: "📈",
    name: "Visa Issuance Statistics",
    source: "travel.state.gov",
    desc: "Báo cáo visa EW được cấp hàng tháng",
    color: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
  },
];

export function LinksGrid() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-text">🔗 Liên Kết Hữu Ích</h2>
        <span className="text-xs text-text-muted">Nguồn chính phủ Mỹ</span>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {EXTERNAL_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-card border border-border bg-bg p-3.5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
          >
            <span
              aria-hidden="true"
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border text-base ${link.color}`}
            >
              {link.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text group-hover:text-primary">
                {link.name}
              </p>
              <p className="text-[11px] text-text-muted">{link.source}</p>
              <p className="mt-0.5 text-xs text-text-muted">{link.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
