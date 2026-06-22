/**
 * "Liên Kết Hữu Ích" external links grid — ported from index.html:382-408's
 * `.links-grid` block. External government/tracker links, unchanged URLs.
 */
const EXTERNAL_LINKS = [
  {
    href: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html",
    icon: "📅",
    name: "Visa Bulletin (travel.state.gov)",
    desc: "Lịch Visa Bulletin chính thức hàng tháng",
  },
  {
    href: "https://flag.dol.gov/case-status-search",
    icon: "🔍",
    name: "Check LC Status (flag.dol.gov)",
    desc: "Tra cứu tình trạng hồ sơ LC/PERM",
  },
  {
    href: "https://egov.uscis.gov/",
    icon: "📋",
    name: "USCIS Case Status Online",
    desc: "Tra cứu I-140 sau khi có receipt number",
  },
  {
    href: "https://flag.dol.gov/processingtimes",
    icon: "⏱",
    name: "DOL Processing Times",
    desc: "Thời gian xử lý LC/PERM hiện tại",
  },
  {
    href: "https://permtimeline.com/",
    icon: "📊",
    name: "PERM Timeline Tracker",
    desc: "Theo dõi tiến độ duyệt PERM hàng ngày",
  },
  {
    href: "https://ceac.state.gov/IV/Login.aspx",
    icon: "🏛",
    name: "CEAC / DS-260 (state.gov)",
    desc: "Điền và theo dõi đơn DS-260 NVC",
  },
  {
    href: "https://egov.uscis.gov/processing-times/",
    icon: "🕒",
    name: "USCIS Processing Times",
    desc: "Thời gian xử lý I-140 theo Service Center",
  },
  {
    href: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-statistics/immigrant-visa-statistics/monthly-immigrant-visa-issuances.html",
    icon: "📈",
    name: "Visa Issuance Statistics",
    desc: "Báo cáo visa EW được cấp hàng tháng",
  },
];

export function LinksGrid() {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-text">
        Liên Kết Hữu Ích
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {EXTERNAL_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-card border border-border bg-bg p-3 hover:border-primary"
          >
            <span aria-hidden="true" className="text-xl">
              {link.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-text">{link.name}</p>
              <p className="text-xs text-text-muted">{link.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
