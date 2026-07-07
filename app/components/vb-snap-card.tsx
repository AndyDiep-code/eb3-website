/**
 * Visa Bulletin snapshot card — ported from index.html:266-313's
 * `.vb-snap` block. Static placeholder data matching the current site's
 * snapshot values; Phase 4 owns wiring this to live data/visa-bulletin.json
 * (explicitly out of scope here per phase-02's file-ownership boundary).
 */
const SNAPSHOT_MONTHS = [
  { fy: "FY2026 · Tháng 7", date: "1-Mar-2022", trend: "up" as const },
  { fy: "FY2026 · Tháng 6", date: "1-Feb-2022", trend: "flat" as const },
  { fy: "FY2026 · Tháng 5", date: "1-Feb-2022", trend: "flat" as const },
  { fy: "FY2026 · Tháng 3", date: "1-Nov-2021", trend: "up" as const },
  { fy: "FY2026 · Tháng 2", date: "1-Sep-2021", trend: "flat" as const },
  { fy: "FY2026 · Tháng 1", date: "1-Sep-2021", trend: "up" as const },
];

const TREND_LABEL: Record<"up" | "flat", string> = {
  up: "⬆ Tăng",
  flat: "— Giữ nguyên",
};

export function VbSnapCard() {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg shadow-sm">
      {/* Header strip */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-blue-50 px-4 py-3 dark:bg-blue-950/50">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-700 text-xs text-white dark:bg-blue-500">
            📅
          </span>
          <span className="text-sm font-bold text-text">
            Visa Bulletin — EB-3 EW (ROW) · FY2026
          </span>
        </div>
        <a
          href="/visa-bulletin"
          className="whitespace-nowrap text-xs font-semibold text-primary hover:underline"
        >
          Xem đầy đủ →
        </a>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SNAPSHOT_MONTHS.map((month) => (
            <div
              key={month.fy}
              className={`rounded-lg border p-3 text-xs ${
                month.trend === "up"
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
                  : "border-border bg-bg-alt"
              }`}
            >
              <div className="text-text-muted">{month.fy}</div>
              <div className="mt-1 text-sm font-bold text-text">{month.date}</div>
              <div className="mt-0.5 text-text-muted">Bảng A</div>
              <span
                className={`mt-1 inline-block font-semibold ${
                  month.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-text-muted"
                }`}
              >
                {TREND_LABEL[month.trend]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          <span className="shrink-0">💡</span>
          <span>
            Bảng B (Dates for Filing) tháng 6/2026 ={" "}
            <strong>1-Aug-2022</strong>. Net change FY2026:{" "}
            <strong>+6m24d</strong> (Bảng A) / <strong>+12m10d</strong> (Bảng B).
          </span>
        </div>
      </div>
    </div>
  );
}
