// Tab: Các Bang Khác — compact grid linking to all 17 non-Indiana state pages.

import Link from "next/link";

interface StateLink {
  flag: string;
  name: string;
  abbr: string;
  href: string;
  q: number;
  pass: string;
  note: string;
}

const OTHER_STATES: StateLink[] = [
  { flag: "🍑", name: "Georgia",      abbr: "GA", href: "/bmv-ga", q: 40, pass: "75%", note: "Koch, Wayne, Claxton" },
  { flag: "⭐",  name: "Texas",        abbr: "TX", href: "/bmv-tx", q: 30, pass: "70%", note: "Không thuế TN" },
  { flag: "🌴", name: "Florida",      abbr: "FL", href: "/bmv-fl", q: 50, pass: "80%", note: "Không thuế TN · Resort" },
  { flag: "🧀", name: "Wisconsin",    abbr: "WI", href: "/bmv-wi", q: 50, pass: "80%", note: "WI Dells Resort" },
  { flag: "🌲", name: "N. Carolina",  abbr: "NC", href: "/bmv-nc", q: 40, pass: "75%", note: "Wayne, Case Farms" },
  { flag: "🌊", name: "S. Carolina",  abbr: "SC", href: "/bmv-sc", q: 30, pass: "80%", note: "Stefan's Law" },
  { flag: "🌶️", name: "Alabama",      abbr: "AL", href: "/bmv-al", q: 40, pass: "80%", note: "Koch Foods · Helmet tất cả" },
  { flag: "🎡", name: "Ohio",         abbr: "OH", href: "/bmv-oh", q: 40, pass: "75%", note: "OVI (không DUI)" },
  { flag: "🌨️", name: "Minnesota",    abbr: "MN", href: "/bmv-mn", q: 40, pass: "80%", note: "DVS · Hands-Free Law" },
  { flag: "🔔", name: "Pennsylvania", abbr: "PA", href: "/bmv-pa", q: 18, pass: "83%", note: "18 câu — ít nhất cả nước" },
  { flag: "🎰", name: "Nevada",       abbr: "NV", href: "/bmv-nv", q: 50, pass: "80%", note: "Không thuế TN · Reno" },
  { flag: "🎷", name: "Louisiana",    abbr: "LA", href: "/bmv-la", q: 40, pass: "80%", note: "OMV · Cộng đồng Việt" },
  { flag: "🏔️", name: "Montana",      abbr: "MT", href: "/bmv-mt", q: 33, pass: "82%", note: "80 mph interstate" },
  { flag: "🐟", name: "Mississippi",  abbr: "MS", href: "/bmv-ms", q: 30, pass: "80%", note: "Helmet bắt buộc <26t" },
  { flag: "🐔", name: "Arkansas",     abbr: "AR", href: "/bmv-ar", q: 25, pass: "80%", note: "DWI · Peco/Tyson Foods" },
  { flag: "🦬", name: "S. Dakota",    abbr: "SD", href: "/bmv-sd", q: 25, pass: "80%", note: "Không thuế TN · 80 mph" },
  { flag: "🌵", name: "Arizona",      abbr: "AZ", href: "/bmv-az", q: 30, pass: "80%", note: "Không thuế TN · ADOT MVD" },
];

export function BmvTabOtherStates() {
  return (
    <div>
      <div className="mb-3 text-base font-bold text-text border-b border-border pb-2">
        🗺️ 17 Tiểu Bang Khác — Ôn Thi Bằng Lái
      </div>

      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {OTHER_STATES.map((s) => (
          <Link
            key={s.abbr}
            href={s.href}
            className="flex items-start gap-3 rounded-card border border-border bg-bg p-3 text-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <span className="text-2xl shrink-0 leading-none mt-0.5">{s.flag}</span>
            <div className="min-w-0">
              <div className="font-semibold text-text leading-tight">
                {s.name}{" "}
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                  {s.abbr}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-text-muted">
                📝 {s.q} câu · ✅ {s.pass}
              </div>
              <div className="mt-0.5 text-[11px] text-secondary font-medium leading-tight">
                {s.note}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-card border border-primary/20 bg-primary/5 p-4 text-center">
        <div className="mb-1 text-xs text-text-muted">Xem đầy đủ với bộ lọc tìm kiếm</div>
        <Link
          href="/dmv"
          className="inline-block rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          🗺️ Xem Tất Cả 19 Tiểu Bang →
        </Link>
      </div>
    </div>
  );
}
