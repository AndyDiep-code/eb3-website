/**
 * Visa Bulletin snapshot card — ported from index.html:266-313's `.vb-snap`
 * block. Phase 4: wired to the same live data source (KV with static-JSON
 * fallback) as the full /visa-bulletin dashboard, via getVisaBulletinData()
 * and the data-transforms.ts helpers it already uses.
 */
import { getVisaBulletinData } from "../visa-bulletin/get-visa-bulletin-data";
import {
  computeNetDelta,
  findLatestPublishedDates,
  formatIsoDateToDisplay,
} from "../visa-bulletin/data-transforms";
import type { VisaBulletinMonth } from "../visa-bulletin/types";

type Trend = "up" | "flat" | "down";

const TREND_LABEL: Record<Trend, string> = {
  up: "⬆ Tăng",
  flat: "— Giữ nguyên",
  down: "⬇ Lùi",
};

const TREND_CLASS: Record<Trend, string> = {
  up: "text-accent",
  flat: "text-text-muted",
  down: "text-secondary",
};

/** ISO "YYYY-MM-DD" dates sort lexicographically same as chronologically; "Current" always outranks a specific date. */
function compareTableDate(current: string, previous: string): Trend {
  if (current === previous) return "flat";
  if (current === "Current") return "up";
  if (previous === "Current") return "down";
  return current > previous ? "up" : "down";
}

/** "2026-07" -> "Tháng 7" */
function toMonthLabel(month: string): string {
  const [, monthPart] = month.split("-");
  return `Tháng ${Number(monthPart)}`;
}

/** "2026-07" -> "7/2026" */
function toShortMonthYear(month: string): string {
  const [year, monthPart] = month.split("-");
  return `${Number(monthPart)}/${year}`;
}

export async function VbSnapCard() {
  const data = await getVisaBulletinData();

  const publishedTableA = data.months.filter(
    (month): month is VisaBulletinMonth & { table_a: string } => month.table_a !== null,
  );
  const recentAscending = publishedTableA.slice(-6);
  const recentMonths = recentAscending
    .map((month, index) => {
      const previousTableA =
        index === 0 ? data.carry_over.table_a_prior_sep : recentAscending[index - 1].table_a;
      return {
        fy: data.fy,
        label: toMonthLabel(month.month),
        display: formatIsoDateToDisplay(month.table_a),
        trend: compareTableDate(month.table_a, previousTableA),
      };
    })
    .reverse();

  const latestTableBMonth = [...data.months].reverse().find((month) => month.table_b !== null);
  const { latestTableA, latestTableB } = findLatestPublishedDates(data.months);
  const netDeltaTableA = computeNetDelta(data.carry_over.table_a_prior_sep, latestTableA);
  const netDeltaTableB = computeNetDelta(data.carry_over.table_b_prior_sep, latestTableB);

  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-text">
          📅 Visa Bulletin — EB-3 Other Workers (ROW) · FY{data.fy} (mới nhất)
        </p>
        <a
          href="/visa-bulletin"
          className="whitespace-nowrap text-sm font-medium text-primary hover:underline"
        >
          Xem đầy đủ (Bảng A + B) →
        </a>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {recentMonths.map((month) => (
          <div
            key={month.label}
            className="rounded-btn border border-border p-2 text-xs"
          >
            <div className="text-text-muted">
              FY{month.fy} · {month.label}
            </div>
            <div className="font-semibold text-text">{month.display}</div>
            <div className="text-text-muted">Final Action Date (Bảng A)</div>
            <span className={TREND_CLASS[month.trend]}>{TREND_LABEL[month.trend]}</span>
          </div>
        ))}
      </div>
      {latestTableBMonth && (
        <p className="mt-3 text-xs text-text-muted">
          💡 Bảng B (Dates for Filing): tháng {toShortMonthYear(latestTableBMonth.month)} ={" "}
          <span className="font-semibold text-secondary">
            {formatIsoDateToDisplay(latestTableBMonth.table_b)}
          </span>
          . Net change FY{data.fy}: {netDeltaTableA} (Bảng A) / {netDeltaTableB} (Bảng B).
        </p>
      )}
    </div>
  );
}
