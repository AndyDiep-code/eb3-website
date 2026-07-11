// ─── Visa Bulletin data transforms ──────────────────────────────────────────
// Shapes a VisaBulletinData payload (from the API route) into the arrays
// Recharts components need, plus the net-Δ/date-formatting helpers used by
// the table view. Ports the algorithms in js/visa-bulletin-data.js
// (daysFromEpoch, computeNetDelta, fmtISOToDisplay) — same math, typed.

import type { VisaBulletinCarryOver, VisaBulletinMonth } from "./types";

const EPOCH_UTC_MS = Date.UTC(2018, 0, 1);
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** "2021-07-15" -> "15-Jul-2021"; "Current" -> "Current"; null -> "—" */
export function formatIsoDateToDisplay(isoDate: string | null): string {
  if (isoDate === null) return "—";
  if (isoDate === "Current") return "Current";
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day}-${MONTH_NAMES[month - 1]}-${year}`;
}

/** ISO date -> integer days since 2018-01-01 epoch; null -> null
 *  "Current" maps to today so the chart line stays visible at the top. */
function daysFromEpoch(isoDate: string | null): number | null {
  if (isoDate === null) return null;
  if (isoDate === "Current") return Math.round((Date.now() - EPOCH_UTC_MS) / 86_400_000);
  const [year, month, day] = isoDate.split("-").map(Number);
  return Math.round((Date.UTC(year, month - 1, day) - EPOCH_UTC_MS) / 86_400_000);
}

/**
 * Net Δ between two ISO dates as "+Xm Yd". Returns "N/A" if either side is
 * "Current" or null (no meaningful day-count delta in those cases) — ported
 * verbatim from js/visa-bulletin-data.js's computeNetDelta.
 */
export function computeNetDelta(
  firstIsoDate: string | null,
  latestIsoDate: string | null,
): string {
  if (!firstIsoDate || !latestIsoDate || firstIsoDate === "Current" || latestIsoDate === "Current") {
    return "N/A";
  }
  const [firstYear, firstMonth, firstDay] = firstIsoDate.split("-").map(Number);
  const [lastYear, lastMonth, lastDay] = latestIsoDate.split("-").map(Number);

  let months = (lastYear - firstYear) * 12 + (lastMonth - firstMonth);
  let days = lastDay - firstDay;
  if (days < 0) {
    months -= 1;
    const prevMonth = lastMonth - 1 || 12;
    const prevYear = lastMonth > 1 ? lastYear : lastYear - 1;
    days += new Date(Date.UTC(prevYear, prevMonth, 0)).getUTCDate();
  }
  return `+${months}m ${days}d`;
}

/** Last non-null Table A / Table B entry, walking from the most recent month. */
export function findLatestPublishedDates(months: VisaBulletinMonth[]): {
  latestTableA: string | null;
  latestTableB: string | null;
} {
  let latestTableA: string | null = null;
  let latestTableB: string | null = null;
  for (const entry of months) {
    if (entry.table_a !== null) latestTableA = entry.table_a;
    if (entry.table_b !== null) latestTableB = entry.table_b;
  }
  return { latestTableA, latestTableB };
}

export interface PriorityDateTrendPoint {
  label: string;
  tableADays: number | null;
  tableBDays: number | null;
  tableADisplay: string;
  tableBDisplay: string;
}

/**
 * Shapes months (+ the carry-over baseline) into the priority-date trend
 * chart's data array: one point per month with both tables' "days since
 * epoch" values (for plotting) and display strings (for tooltips).
 */
export function buildPriorityDateTrendData(
  months: VisaBulletinMonth[],
  carryOver: VisaBulletinCarryOver,
): PriorityDateTrendPoint[] {
  return months.map((entry) => ({
    label: entry.label,
    tableADays: daysFromEpoch(entry.table_a),
    tableBDays: daysFromEpoch(entry.table_b),
    tableADisplay:
      entry.table_a === null ? formatIsoDateToDisplay(carryOver.table_a_prior_sep) : formatIsoDateToDisplay(entry.table_a),
    tableBDisplay:
      entry.table_b === null ? formatIsoDateToDisplay(carryOver.table_b_prior_sep) : formatIsoDateToDisplay(entry.table_b),
  }));
}

export interface MonthlyDeltaPoint {
  label: string;
  deltaDays: number | null;
}

/**
 * Shapes months into the monthly-delta bar chart's data array: day
 * difference of Table A vs the prior month (prior month's value, or the
 * FY carry-over baseline for the first tracked month). null = unpublished.
 */
export function buildMonthlyDeltaData(
  months: VisaBulletinMonth[],
  carryOver: VisaBulletinCarryOver,
): MonthlyDeltaPoint[] {
  let previousTableADays = daysFromEpoch(carryOver.table_a_prior_sep);
  return months.map((entry) => {
    const currentTableADays = daysFromEpoch(entry.table_a);
    const deltaDays =
      currentTableADays === null || previousTableADays === null
        ? null
        : currentTableADays - previousTableADays;
    if (currentTableADays !== null) previousTableADays = currentTableADays;
    return { label: entry.label, deltaDays };
  });
}

export interface FiscalYearIssuancePoint {
  fiscalYear: string;
  totalIssuances: number;
}

/**
 * FY-over-FY total EW Vietnam issuances (sums each FY's tracked months'
 * non-null ew_vietnam values). Proposed 3rd chart — see page.tsx comment
 * for the "confirm with site owner" flag per Requirement #5.
 */
export function buildFiscalYearIssuanceTotals(
  fiscalYear: number,
  months: VisaBulletinMonth[],
): FiscalYearIssuancePoint[] {
  const total = months.reduce((sum, entry) => sum + (entry.ew_vietnam ?? 0), 0);
  return [{ fiscalYear: `FY${fiscalYear}`, totalIssuances: total }];
}

export interface MovementRateSummary {
  avgDaysPerMonth: number;    // average days of Table A PD advance per calendar month
  monthsAnalyzed: number;     // how many consecutive month pairs were used
  trend: "improving" | "stable" | "declining";
}

export function buildMovementRate(months: VisaBulletinMonth[]): MovementRateSummary {
  // Filter to months where table_a is a non-null, non-"Current" ISO date
  const published = months.filter(
    (m): m is VisaBulletinMonth & { table_a: string } =>
      m.table_a !== null && m.table_a !== "Current",
  );
  if (published.length < 2) {
    return { avgDaysPerMonth: 0, monthsAnalyzed: 0, trend: "stable" };
  }
  // Compute day-deltas between consecutive published months
  const deltas: number[] = [];
  for (let i = 1; i < published.length; i++) {
    const prev = daysFromEpoch(published[i - 1].table_a)!;
    const curr = daysFromEpoch(published[i].table_a)!;
    deltas.push(curr - prev);
  }
  const avg = deltas.reduce((a, b) => a + b, 0) / deltas.length;
  // Trend: compare first-half avg vs second-half avg
  const mid = Math.floor(deltas.length / 2);
  const firstHalf = deltas.slice(0, mid);
  const secondHalf = deltas.slice(mid);
  const firstAvg = firstHalf.length ? firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length : avg;
  const secondAvg = secondHalf.length ? secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length : avg;
  const trend: MovementRateSummary["trend"] =
    secondAvg > firstAvg + 5 ? "improving" : secondAvg < firstAvg - 5 ? "declining" : "stable";
  return { avgDaysPerMonth: avg, monthsAnalyzed: deltas.length, trend };
}
