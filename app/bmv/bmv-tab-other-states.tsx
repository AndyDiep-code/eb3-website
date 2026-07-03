// Tab 6: Các Bang Khác — Links to other state DMV pages.

import Link from "next/link";

interface StateLink {
  flag: string;
  name: string;
  abbr: string;
  href: string;
  desc: string;
  highlight: string;
  highlightColor: string;
}

const OTHER_STATES: StateLink[] = [
  {
    flag: "🍑",
    name: "Georgia",
    abbr: "GA",
    href: "/bmv-ga",
    desc: "40 câu · Điểm đậu 75% · Có tiếng Việt",
    highlight: "Nhiều hãng EB3 nhất → Koch, Wayne, Claxton",
    highlightColor: "text-accent",
  },
  {
    flag: "⭐",
    name: "Texas",
    abbr: "TX",
    href: "/bmv-tx",
    desc: "30 câu · Điểm đậu 70% · Có tiếng Việt",
    highlight: "Không thuế thu nhập · Cộng đồng Việt lớn",
    highlightColor: "text-secondary",
  },
  {
    flag: "🌴",
    name: "Florida",
    abbr: "FL",
    href: "/bmv-fl",
    desc: "50 câu · Điểm đậu 80%",
    highlight: "Không thuế TN · Resort · Logistics",
    highlightColor: "text-secondary",
  },
  {
    flag: "🧀",
    name: "Wisconsin",
    abbr: "WI",
    href: "/bmv-wi",
    desc: "50 câu · Điểm đậu 80%",
    highlight: "Resort Wisconsin Dells · Nhà máy",
    highlightColor: "text-primary",
  },
  {
    flag: "🌲",
    name: "N. Carolina",
    abbr: "NC",
    href: "/bmv-nc",
    desc: "40 câu · Điểm đậu 75%",
    highlight: "Nhiều hãng gia cầm → Wayne Farms, Case Farms",
    highlightColor: "text-accent",
  },
  {
    flag: "🌶️",
    name: "Alabama",
    abbr: "AL",
    href: "/bmv-al",
    desc: "40 câu · Điểm đậu 80%",
    highlight: "Koch Foods · Chi phí thấp nhất",
    highlightColor: "text-accent",
  },
];

export function BmvTabOtherStates() {
  return (
    <div>
      <div className="mb-3 text-base font-bold text-text border-b border-border pb-2">
        🗺️ Ôn Thi Bằng Lái — Các Tiểu Bang Khác
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {OTHER_STATES.map((s) => (
          <Link
            key={s.abbr}
            href={s.href}
            className="block rounded-card border border-border bg-bg p-5 text-sm transition-colors hover:border-primary/50"
          >
            <div className="text-3xl mb-2">{s.flag}</div>
            <div className="font-bold text-text mb-1">
              {s.name} ({s.abbr})
            </div>
            <div className="text-xs text-text-muted mb-2">{s.desc}</div>
            <div className={`text-xs font-semibold ${s.highlightColor}`}>
              {s.highlight}
            </div>
          </Link>
        ))}
      </div>

      <div className="mb-4 rounded-card border border-border bg-bg-alt p-3 text-xs text-text-muted">
        💡 Sắp có thêm: South Carolina (SC) · Ohio (OH) · Minnesota (MN) ·
        Pennsylvania (PA) · Louisiana (LA) và nhiều bang khác.
      </div>

      {/* Link back to DMV picker */}
      <div className="rounded-card border border-primary/20 bg-primary/5 p-4 text-center">
        <div className="text-sm font-semibold text-text mb-2">
          Xem tất cả 18 tiểu bang
        </div>
        <Link
          href="/dmv"
          className="inline-block rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          🚗 Xem Tất Cả Tiểu Bang →
        </Link>
      </div>
    </div>
  );
}
