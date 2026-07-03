"use client";

import {
  AVG_ADVANCE_DAYS,
  CURRENT_VB_MONTH,
  STEP_TIMES,
  STEPS,
} from "./tracker-data";

/**
 * Estimate alert + timeline sub-sections, split out of tracker-results.tsx
 * to keep each file under ~200 lines. Ported from tracker.html's calculate()
 * DOM-rendering logic (legacy lines 421-446).
 */
export function EstimateAlert({
  isCurrent,
  monthsToWait,
  gapLabel,
  today,
}: {
  isCurrent: boolean;
  monthsToWait: number;
  gapLabel: string;
  today: Date;
}) {
  if (isCurrent) {
    return (
      <div className="flex gap-2.5 rounded-card border border-accent bg-accent/10 p-3 text-sm leading-relaxed text-text">
        <span className="text-lg">🎉</span>
        <div>
          <b>PD của bạn đã qua VB hiện tại ({CURRENT_VB_MONTH} = 1-Mar-2022)!</b>{" "}
          Nếu hồ sơ đã ở bước NVC/DQ, bạn có thể sắp được gọi phỏng vấn. Liên
          hệ agency để xác nhận.
        </div>
      </div>
    );
  }

  if (monthsToWait <= 12) {
    const estDate = new Date(today.getTime() + monthsToWait * 30 * 86400000);
    return (
      <div className="flex gap-2.5 rounded-card border border-secondary bg-secondary/10 p-3 text-sm leading-relaxed text-text">
        <span className="text-lg">📅</span>
        <div>
          <b>VB chưa đến lượt bạn.</b> PD của bạn cách VB Bảng A hiện tại{" "}
          <b>{gapLabel}</b>. Ước tính còn khoảng <b>{monthsToWait} tháng</b> nữa
          (~{estDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
          ) VB mới đạt PD. Thực tế có thể thay đổi.
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm leading-relaxed text-text">
      <span className="text-lg">⏳</span>
      <div>
        <b>VB chưa đến lượt bạn.</b> PD của bạn cách VB Bảng A hiện tại
        (01-Mar-2022) <b>{gapLabel}</b>. Ước tính thời gian chờ thực tế: khoảng{" "}
        <b>{monthsToWait} tháng</b> nữa (dựa trên tốc độ ~{AVG_ADVANCE_DAYS} ngày
        VB/tháng). Theo dõi VB hàng tháng và chuẩn bị hồ sơ.
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
