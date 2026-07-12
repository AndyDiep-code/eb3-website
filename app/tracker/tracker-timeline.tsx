"use client";

import type { PaceScenario } from "../visa-bulletin/pace-scenarios";
import { STEP_TIMES, STEPS } from "./tracker-data";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** Mirrors priority-date-predictor.tsx's estimateLabel so both tools format an "N months from now" projection identically. */
function estimateMonthLabel(monthsFromNow: number, todayMs: number): string {
  if (monthsFromNow >= 120) return "Sau 10+ năm";
  const date = new Date(todayMs);
  date.setUTCMonth(date.getUTCMonth() + monthsFromNow);
  return `${MONTH_NAMES[date.getUTCMonth()]}-${date.getUTCFullYear()}`;
}

export interface ScenarioEstimate extends PaceScenario {
  monthsToWait: number;
}

/**
 * Estimate alert + timeline sub-sections, split out of tracker-results.tsx
 * to keep each file under ~200 lines. Ported from tracker.html's calculate()
 * DOM-rendering logic (legacy lines 421-446); the single-number estimate was
 * replaced with the same 3-scenario range /visa-bulletin's Priority Date
 * Predictor shows, so the two tools never present conflicting timelines for
 * the same Priority Date again.
 */
export function EstimateAlert({
  isCurrent,
  scenarios,
  gapLabel,
  currentVbLabel,
  today,
}: {
  isCurrent: boolean;
  scenarios: ScenarioEstimate[];
  gapLabel: string;
  currentVbLabel: string;
  today: Date;
}) {
  if (isCurrent) {
    return (
      <div className="flex gap-2.5 rounded-card border border-accent bg-accent/10 p-3 text-sm leading-relaxed text-text">
        <span className="text-lg">🎉</span>
        <div>
          <b>PD của bạn đã qua VB hiện tại ({currentVbLabel})!</b> Nếu hồ sơ
          đã ở bước NVC/DQ, bạn có thể sắp được gọi phỏng vấn. Liên hệ agency
          để xác nhận.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-secondary/40 bg-secondary/10 p-3">
      <div className="flex gap-2.5 text-sm leading-relaxed text-text">
        <span className="text-lg">📅</span>
        <div>
          <b>VB chưa đến lượt bạn.</b> PD của bạn cách VB Bảng A hiện tại (
          {currentVbLabel}) <b>{gapLabel}</b>. Ước tính bên dưới theo 3 kịch
          bản tốc độ khác nhau — thực tế có thể thay đổi đáng kể do
          retrogression, quota, và nhiều yếu tố khác.
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {scenarios.map((scenario) => {
          const monthsLabel =
            scenario.monthsToWait >= 120
              ? "10+ năm"
              : scenario.monthsToWait >= 12
                ? `${(scenario.monthsToWait / 12).toFixed(1)} năm`
                : `${scenario.monthsToWait} tháng`;
          return (
            <div key={scenario.id} className="rounded-card border border-border bg-bg p-3 text-center">
              <div className="text-base">{scenario.emoji}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-text-muted">
                {scenario.labelVi}
              </div>
              <div className="mt-0.5 text-[10px] text-text-muted">{scenario.rateDaysPerMonth} ngày/tháng</div>
              <div className="mt-2 text-xl font-bold text-text">{monthsLabel}</div>
              <div className="mt-1 text-xs font-semibold text-primary">
                Phỏng vấn: {estimateMonthLabel(scenario.monthsToWait, today.getTime())}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Timeline({ currentStep }: { currentStep: number }) {
  return (
    <div className="relative mt-3 space-y-5 border-l-2 border-border pl-7">
      {STEPS.map((stepItem, index) => {
        const status =
          index < currentStep
            ? "done"
            : index === currentStep
              ? "current"
              : "pending";
        const dotClass =
          status === "done"
            ? "bg-accent border-accent"
            : status === "current"
              ? "border-primary bg-primary shadow-[0_0_0_4px_rgba(216,67,21,0.2)]"
              : "border-border bg-bg-alt";
        const labelText =
          status === "done"
            ? "Hoàn thành ✓"
            : status === "current"
              ? "⬅ Bạn đang ở đây"
              : "Chưa đến";
        const labelClass =
          status === "done"
            ? "text-accent"
            : status === "current"
              ? "text-primary"
              : "text-text-muted/60";
        return (
          <div key={stepItem.id} className="relative">
            <div
              className={`absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full border-2 ${dotClass}`}
            />
            <div className={`text-[11px] font-bold uppercase tracking-wide ${labelClass}`}>
              {labelText}
            </div>
            <div className="text-sm font-semibold text-text">
              {stepItem.icon} {stepItem.label}
            </div>
            <div className="text-xs text-text-muted">
              Giai đoạn {index + 1}/8
            </div>
            <div className="mt-0.5 text-xs font-semibold text-secondary">
              {STEP_TIMES[index]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
