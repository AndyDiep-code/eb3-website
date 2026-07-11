import permData from "@/data/perm-processing-times.json";

interface PermProcessingTimes {
  source_as_of: string | null;
  queue: {
    analyst_review: string | null;
    audit_review: string | null;
    reconsideration_review: string | null;
  };
  average_days: {
    analyst_review: { month: string | null; days: number | null } | null;
    audit_review: { month: string | null; days: number | null } | null;
  };
  updated: string;
}

function DaysBar({ days, max }: { days: number; max: number }) {
  const pct = Math.round((days / max) * 100);
  const colorClass =
    days > 400
      ? "bg-red-500"
      : days > 300
        ? "bg-amber-500"
        : "bg-emerald-500";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function formatUpdated(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function PermHomeWidget() {
  const data = permData as PermProcessingTimes;
  const analystDays = data.average_days?.analyst_review?.days ?? null;
  const auditDays = data.average_days?.audit_review?.days ?? null;
  const maxDays = Math.max(analystDays ?? 0, auditDays ?? 0, 1);

  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-orange-50 px-4 py-3 dark:bg-orange-950/30">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange-600 text-xs text-white">
            📊
          </span>
          <span className="text-sm font-bold text-text">PERM Processing Times — DOL</span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            LIVE
          </span>
        </div>
        <a
          href="/perm-tracker"
          className="whitespace-nowrap text-xs font-semibold text-primary hover:underline"
        >
          Chi tiết →
        </a>
      </div>

      <div className="p-4">
        {/* Queue months being processed */}
        <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            { label: "Analyst Review", value: data.queue.analyst_review, note: "hồ sơ thường" },
            { label: "Audit Review", value: data.queue.audit_review, note: "hồ sơ bị audit" },
            { label: "Reconsideration", value: data.queue.reconsideration_review, note: "khiếu nại" },
          ].map(({ label, value, note }) => (
            <div key={label} className="rounded-lg border border-border bg-bg-alt p-3 text-center">
              <div className="text-[11px] text-text-muted">{label}</div>
              <div className="mt-1 text-sm font-bold text-text">{value ?? "—"}</div>
              <div className="mt-0.5 text-[10px] text-text-muted">{note}</div>
            </div>
          ))}
        </div>

        {/* Average processing days */}
        {(analystDays !== null || auditDays !== null) && (
          <div className="space-y-2.5">
            <p className="text-[11px] font-semibold text-text-muted">
              Thời gian xử lý trung bình
            </p>
            {(
              [
                { label: "Analyst Review", days: analystDays },
                { label: "Audit Review", days: auditDays },
              ] as { label: string; days: number | null }[]
            )
              .filter((r) => r.days !== null)
              .map(({ label, days }) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-[11px] text-text-muted">
                    <span>{label}</span>
                    <span className="font-semibold text-text">
                      {days} ngày (~{Math.round(days! / 30)} tháng)
                    </span>
                  </div>
                  <DaysBar days={days!} max={maxDays} />
                </div>
              ))}
          </div>
        )}

        <p className="mt-3 text-[10px] text-text-muted">
          Tính đến: {data.source_as_of ?? "—"} · Cập nhật:{" "}
          {formatUpdated(data.updated)} · Nguồn: flag.dol.gov
        </p>
      </div>
    </div>
  );
}
