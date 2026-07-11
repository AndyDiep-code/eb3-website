// ─── Timeline gap display sub-components ─────────────────────────────────────
// GapCardsDisplay and RateCard extracted to keep timeline-estimator.tsx under 200 lines.

import { formatIsoDateToDisplay, type MovementRateSummary } from "../visa-bulletin/data-transforms";

function parseISO(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function computeGap(
  userPD: string,
  cutoff: string,
): { months: number; days: number; isEligible: boolean } {
  const pdMs = parseISO(userPD);
  const cutoffMs = parseISO(cutoff);
  if (pdMs <= cutoffMs) return { months: 0, days: 0, isEligible: true };
  const pd = new Date(pdMs);
  const cu = new Date(cutoffMs);
  let months =
    (pd.getUTCFullYear() - cu.getUTCFullYear()) * 12 + (pd.getUTCMonth() - cu.getUTCMonth());
  let days = pd.getUTCDate() - cu.getUTCDate();
  if (days < 0) {
    months -= 1;
    days += new Date(Date.UTC(pd.getUTCFullYear(), pd.getUTCMonth(), 0)).getUTCDate();
  }
  return { months, days, isEligible: false };
}

function TrendBadge({ trend }: { trend: "improving" | "stable" | "declining" }) {
  const cfg = {
    improving: {
      cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
      label: "Đang cải thiện ↑",
    },
    stable: {
      cls: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
      label: "Ổn định →",
    },
    declining: {
      cls: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
      label: "Đang chậm lại ↓",
    },
  }[trend];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

interface GapValue {
  months: number;
  days: number;
  isEligible: boolean;
}

function SingleGapCard({
  title,
  cutoff,
  gap,
}: {
  title: string;
  cutoff: string | null;
  gap: GapValue | null;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-alt p-3">
      <div className="text-[11px] font-semibold text-text-muted">{title}</div>
      <div className="mt-0.5 text-[10px] text-text-muted">
        Ngưỡng: {cutoff ? formatIsoDateToDisplay(cutoff) : "—"}
      </div>
      {gap ? (
        gap.isEligible ? (
          <div className="mt-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            ✓ Đủ điều kiện
          </div>
        ) : (
          <div className="mt-1 text-sm font-bold text-primary">
            Còn {gap.months} tháng {gap.days} ngày
          </div>
        )
      ) : cutoff === "Current" ? (
        <div className="mt-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
          Current ✓
        </div>
      ) : (
        <div className="mt-1 text-sm text-text-muted">—</div>
      )}
    </div>
  );
}

export function GapCardsDisplay({
  latestTableA,
  latestTableB,
  userPD,
}: {
  latestTableA: string | null;
  latestTableB: string | null;
  userPD: string;
}) {
  const gapA =
    latestTableA && latestTableA !== "Current" ? computeGap(userPD, latestTableA) : null;
  const gapB =
    latestTableB && latestTableB !== "Current" ? computeGap(userPD, latestTableB) : null;

  return (
    <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <SingleGapCard title="Bảng A — Final Action Date" cutoff={latestTableA} gap={gapA} />
      <SingleGapCard title="Bảng B — Dates for Filing" cutoff={latestTableB} gap={gapB} />
    </div>
  );
}

export function RateCard({ rate }: { rate: MovementRateSummary }) {
  return (
    <div className="mb-4 rounded-lg border border-border bg-bg-alt p-3">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-text-muted">Tốc Độ Tiến VB (Bảng A)</span>
        <TrendBadge trend={rate.trend} />
      </div>
      <div className="flex gap-4">
        <div>
          <div className="text-base font-bold text-text">
            {rate.avgDaysPerMonth > 0 ? `~${Math.round(rate.avgDaysPerMonth)} ngày/tháng` : "—"}
          </div>
          <div className="text-[10px] text-text-muted">Trung bình ngày tiến mỗi tháng</div>
        </div>
        <div>
          <div className="text-base font-bold text-text">{rate.monthsAnalyzed}</div>
          <div className="text-[10px] text-text-muted">Tháng phân tích</div>
        </div>
      </div>
    </div>
  );
}
