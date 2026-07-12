"use client";

// Priority Date Predictor — ports visa-bulletin.html's inline predictPD()
// script (lines 788-911) to a typed React client component. Takes the
// live latest Bảng A / Bảng B dates as props (computed once by the parent
// from fetched API data) instead of the original's hardcoded
// CURRENT_FAD_A/B constants, so estimates always reflect the real latest
// published dates rather than going stale between deploys.

import { useState } from "react";
import { PACE_SCENARIOS } from "./pace-scenarios";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

function formatDisplayDate(epochMs: number): string {
  const date = new Date(epochMs);
  return `${String(date.getUTCDate()).padStart(2, "0")}-${MONTH_NAMES[date.getUTCMonth()]}-${date.getUTCFullYear()}`;
}

function daysBetween(fromMs: number, toMs: number): number {
  return Math.round((toMs - fromMs) / 86_400_000);
}

function addMonthsUtc(epochMs: number, monthsToAdd: number): number {
  const date = new Date(epochMs);
  date.setUTCMonth(date.getUTCMonth() + Math.floor(monthsToAdd));
  return date.getTime();
}

function estimateLabel(monthsFromNow: number, todayMs: number): string {
  if (monthsFromNow >= 120) return "Sau 10+ năm";
  const target = addMonthsUtc(todayMs, monthsFromNow);
  const date = new Date(target);
  return `${MONTH_NAMES[date.getUTCMonth()]}-${date.getUTCFullYear()}`;
}

/**
 * @param latestTableAIso Latest published Bảng A date, ISO ("2022-03-01") or
 *   null/"Current" if currently unrestricted — both render the same as
 *   "already current" in the UI below.
 */
export function PriorityDatePredictor({
  latestTableAIso,
  latestTableBIso,
}: {
  latestTableAIso: string | null;
  latestTableBIso: string | null;
}) {
  const [priorityDateInput, setPriorityDateInput] = useState("");

  const currentFadAMs = parseIsoToUtcMs(latestTableAIso);
  const currentFadBMs = parseIsoToUtcMs(latestTableBIso);

  let result: React.ReactNode = null;
  if (priorityDateInput && currentFadAMs !== null) {
    const [year, month, day] = priorityDateInput.split("-").map(Number);
    const userPdMs = Date.UTC(year, month - 1, day);
    if (!Number.isNaN(userPdMs)) {
      result = renderPredictionResult(userPdMs, currentFadAMs, currentFadBMs);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[180px] flex-1">
          <label htmlFor="pd-input" className="mb-1.5 block text-xs font-semibold text-text-muted">
            📋 Priority Date của bạn (ngày ghi trên I-140 hoặc LC)
          </label>
          <input
            id="pd-input"
            type="date"
            value={priorityDateInput}
            onChange={(event) => setPriorityDateInput(event.target.value)}
            min="2018-01-01"
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm font-semibold text-text outline-none"
          />
        </div>
      </div>

      {result}

      <div className="mt-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-xs text-text">
        ⚠️ <b>Lưu ý quan trọng:</b> Dự báo dựa trên tốc độ lịch sử và KHÔNG
        phải dự đoán chính thức. Priority Date có thể retrogress bất cứ lúc
        nào (đã xảy ra nhiều lần, xem phần Lịch Sử Visa Bulletin). Tốc độ
        thực tế phụ thuộc vào số lượng đơn nộp, visa số được DOS phân bổ, và
        chính sách từng năm tài chính.
      </div>
    </div>
  );

  function renderPredictionResult(userPdMs: number, fadAMs: number, fadBMs: number | null) {
    const gapADays = daysBetween(fadAMs, userPdMs);
    const gapBDays = fadBMs !== null ? daysBetween(fadBMs, userPdMs) : -1;

    if (gapADays <= 0) {
      return (
        <div className="mt-4 rounded-card border-2 border-accent bg-accent/10 p-4 text-center">
          <div className="text-2xl">🎉</div>
          <div className="mt-1 text-base font-bold text-accent">
            Priority Date của bạn đã CURRENT!
          </div>
          <div className="mt-1.5 text-xs text-text-muted">
            PD <b>{formatDisplayDate(userPdMs)}</b> đã vượt Bảng A (Final
            Action Date {formatDisplayDate(fadAMs)}). Bạn đang trong hàng
            chờ được gọi phỏng vấn — kiểm tra email/thư NVC.
            {gapBDays <= 0 ? " Bảng B cũng Current." : ""}
          </div>
        </div>
      );
    }

    const today = Date.now();
    return (
      <div className="mt-4">
        <div className="rounded-card border border-border bg-bg-alt p-3 text-xs leading-relaxed text-text">
          🟡 <b>Bảng A (Final Action)</b> — FAD hiện ở{" "}
          <b>{formatDisplayDate(fadAMs)}</b>, cần tiến thêm{" "}
          <b className="text-primary">{(gapADays / 30.44).toFixed(1)} tháng VB</b> (~{Math.round(gapADays)} ngày).
          {gapBDays > 0 ? (
            <>
              <br />
              🟢 <b>Bảng B (Dates for Filing)</b> — cần tiến thêm{" "}
              <b className="text-secondary">{(gapBDays / 30.44).toFixed(1)} tháng VB</b> để đạt PD.
            </>
          ) : gapBDays <= 0 && fadBMs !== null ? (
            <>
              <br />✅ <b>Bảng B đã Current</b> — nếu làm AOS, có thể nộp I-485 ngay.
            </>
          ) : null}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {PACE_SCENARIOS.map((scenario) => {
            const monthsToWaitA = Math.ceil(gapADays / scenario.rateDaysPerMonth);
            const estimateA = estimateLabel(monthsToWaitA, today);
            const monthsLabel =
              monthsToWaitA >= 120 ? "10+ năm" : monthsToWaitA >= 12 ? `${(monthsToWaitA / 12).toFixed(1)} năm` : `${monthsToWaitA} tháng`;
            return (
              <div key={scenario.id} className="rounded-card border border-border p-3 text-center">
                <div className="text-base">{scenario.emoji}</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-text-muted">
                  {scenario.labelVi}
                </div>
                <div className="mt-0.5 text-[10px] text-text-muted">{scenario.rateDaysPerMonth} ngày/tháng</div>
                <div className="mt-2 text-xl font-bold text-text">{monthsLabel}</div>
                <div className="mt-1 text-xs font-semibold text-primary">Phỏng vấn: {estimateA}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function parseIsoToUtcMs(isoOrCurrent: string | null): number | null {
  if (isoOrCurrent === null || isoOrCurrent === "Current") return null;
  const [year, month, day] = isoOrCurrent.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}
