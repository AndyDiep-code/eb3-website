// Small presentational stat-card components shared by VisaBulletinDashboard.
// Split out to keep visa-bulletin-dashboard.tsx under the 200-line
// modularization guideline.

export function SummaryStat({
  label,
  value,
  valueClassName = "text-text",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-btn border border-border p-3 text-center">
      <div className="text-[11px] font-semibold text-text-muted">{label}</div>
      <div className={`mt-1 text-lg font-bold ${valueClassName}`}>{value}</div>
    </div>
  );
}

export function PaceStat({
  label,
  value,
  sublabel,
  valueClassName,
}: {
  label: string;
  value: string;
  sublabel: string;
  valueClassName: string;
}) {
  return (
    <div className="rounded-btn border border-border bg-bg-alt p-2.5 text-center">
      <div className="text-[10px] font-semibold text-text-muted">{label}</div>
      <div className={`mt-1 text-sm font-bold ${valueClassName}`}>{value}</div>
      <div className="mt-0.5 text-[10px] text-text-muted">{sublabel}</div>
    </div>
  );
}
