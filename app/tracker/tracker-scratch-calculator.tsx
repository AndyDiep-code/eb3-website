"use client";

import { useState } from "react";
import {
  I140_MONTHS,
  NVC_INTERVIEW_MONTHS,
  PERM_MONTHS,
  addMonths,
  vbWaitMonths,
} from "./tracker-data";
import { PACE_SCENARIOS } from "../visa-bulletin/pace-scenarios";

// Uses the "moderate" pace scenario (same one /visa-bulletin's Priority
// Date Predictor labels "Kịch Bản Trung Bình") as the single representative
// rate for this compound estimate — previously this silently reused the
// "optimistic" rate while calling it an average.
const MODERATE_PACE_DAYS_PER_MONTH = PACE_SCENARIOS.find((scenario) => scenario.id === "mod")!.rateDaysPerMonth;

/**
 * "Chưa Bắt Đầu?" calculator — ported from tracker.html's
 * calculateFromScratch() (legacy lines 473-517). No localStorage usage,
 * purely a derived-from-input estimate, so this component only needs
 * local React state, no persistence/round-trip concerns.
 */
export function TrackerScratchCalculator({ currentVbAIso }: { currentVbAIso: string }) {
  const [startInput, setStartInput] = useState("");
  const [result, setResult] = useState<{
    summary: string;
    breakdown: { value: string; label: string }[];
  } | null>(null);

  function calculateFromScratch() {
    if (!startInput) {
      alert("Vui lòng chọn ngày dự kiến mở hồ sơ!");
      return;
    }

    const startDate = new Date(startInput);

    // PERM stage: open case -> LC Certified (effective PD date)
    const pdEarly = addMonths(startDate, PERM_MONTHS[0]);
    const pdLate = addMonths(startDate, PERM_MONTHS[1]);

    const vbWaitEarly = vbWaitMonths(pdEarly, currentVbAIso, MODERATE_PACE_DAYS_PER_MONTH);
    const vbWaitLate = vbWaitMonths(pdLate, currentVbAIso, MODERATE_PACE_DAYS_PER_MONTH);

    // Total months = PERM + I-140 (runs mostly parallel to/after VB wait,
    // added as buffer) + VB wait + NVC/interview
    const totalEarly =
      PERM_MONTHS[0] + I140_MONTHS[0] + vbWaitEarly + NVC_INTERVIEW_MONTHS[0];
    const totalLate =
      PERM_MONTHS[1] + I140_MONTHS[1] + vbWaitLate + NVC_INTERVIEW_MONTHS[1];

    const endEarly = addMonths(startDate, totalEarly);
    const endLate = addMonths(startDate, totalLate);

    const yearsEarly = (totalEarly / 12).toFixed(1);
    const yearsLate = (totalLate / 12).toFixed(1);

    const fmt = (d: Date) =>
      d.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });

    setResult({
      summary: `Nếu mở hồ sơ vào ${fmt(startDate)}, dự kiến tổng thời gian đến khi có thẻ xanh khoảng ${yearsEarly}–${yearsLate} năm, tức khoảng ${fmt(endEarly)} đến ${fmt(endLate)}.`,
      breakdown: [
        {
          value: `${PERM_MONTHS[0]}–${PERM_MONTHS[1]} tháng`,
          label: "📄 PERM (DOL) đến LC Certified",
        },
        {
          value: `${I140_MONTHS[0]}–${I140_MONTHS[1]} tháng`,
          label: "✅ I-140 (USCIS) xử lý thường",
        },
        {
          value: `${vbWaitEarly}–${vbWaitLate} tháng`,
          label: "⏳ Chờ Visa Bulletin (Bảng A)",
        },
        {
          value: `${NVC_INTERVIEW_MONTHS[0]}–${NVC_INTERVIEW_MONTHS[1]} tháng`,
          label: "📋 NVC + lịch phỏng vấn",
        },
      ],
    });
  }

  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <h2 className="text-sm font-bold text-text">
        🧮 Chưa Bắt Đầu? Tính Tổng Thời Gian Dự Kiến Đến Thẻ Xanh
      </h2>
      <div className="mt-3">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-muted">
          Dự kiến mở hồ sơ với agency (PERM)
        </label>
        <input
          type="date"
          value={startInput}
          onChange={(event) => setStartInput(event.target.value)}
          className="w-full rounded-btn border border-border bg-bg-alt px-3 py-2 text-sm text-text outline-none focus:border-primary"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={calculateFromScratch}
          className="rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          🧮 Tính Tổng Thời Gian
        </button>
      </div>

      {result && (
        <div className="mt-3.5">
          <div className="rounded-card border border-primary/40 bg-primary/10 p-3 text-sm leading-relaxed text-text">
            🗺️ {result.summary}
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {result.breakdown.map((item) => (
              <div
                key={item.label}
                className="rounded-card border border-border bg-bg-alt p-3 text-center"
              >
                <div className="text-base font-extrabold text-secondary">
                  {item.value}
                </div>
                <div className="mt-1 text-[10px] text-text-muted">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3.5 rounded-card border border-border bg-bg-alt p-3 text-xs leading-relaxed text-text-muted">
        ⚠️ Đây là ước tính dựa trên thời gian xử lý PERM/I-140 hiện tại và tốc
        độ Visa Bulletin hiện tại — thực tế có thể thay đổi.
      </div>
    </div>
  );
}
