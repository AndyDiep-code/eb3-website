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
    <div className="rounded-card border border-border bg-bg p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-text">
          📅 Visa Bulletin — EB-3 Other Workers (ROW) · FY2026 (mới nhất)
        </p>
        <a
          href="/visa-bulletin"
          className="whitespace-nowrap text-sm font-medium text-primary hover:underline"
        >
          Xem đầy đủ (Bảng A + B) →
        </a>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SNAPSHOT_MONTHS.map((month) => (
          <div
            key={month.fy}
            className="rounded-btn border border-border p-2 text-xs"
          >
            <div className="text-text-muted">{month.fy}</div>
            <div className="font-semibold text-text">{month.date}</div>
            <div className="text-text-muted">Final Action Date (Bảng A)</div>
            <span
              className={
                month.trend === "up" ? "text-accent" : "text-text-muted"
              }
            >
              {TREND_LABEL[month.trend]}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-text-muted">
        💡 Bảng B (Dates for Filing): tháng 6/2026 ={" "}
        <span className="font-semibold text-secondary">1-Aug-2022</span>. Net
        change FY2026: +6m24d (Bảng A) / +12m10d (Bảng B).
      </p>
    </div>
  );
}
