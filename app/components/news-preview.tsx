import newsUscis from "@/data/news-uscis.json";
import newsLegal from "@/data/news-legal.json";

interface NewsItem {
  id: string;
  title: string;
  link: string;
  desc: string;
  date: string;
  source: string;
  category: string;
}

const SOURCE_STYLES: Record<string, string> = {
  USCIS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  DOL: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  "justice.gov": "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
};

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" });
}

export function NewsPreview() {
  // Merge USCIS/DOL + legal feeds, sort newest-first, take top 5
  const all = [
    ...(newsUscis.items as NewsItem[]),
    ...(newsLegal.items as NewsItem[]),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

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
        {all.map((item) => (
          <li key={item.id} className="flex items-start gap-3 px-4 py-3">
            <span
              className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${SOURCE_STYLES[item.source] ?? "bg-bg-alt text-text-muted"}`}
            >
              {item.source}
            </span>
            <div className="min-w-0">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-snug text-text hover:text-primary hover:underline"
              >
                {item.title}
              </a>
              <p className="mt-0.5 text-[11px] text-text-muted">{formatDate(item.date)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
