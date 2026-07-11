"use client";
// Estimates months until PD becomes current + full consular interview timeline.

import { useEffect, useState } from "react";
import type { VisaBulletinData } from "../visa-bulletin/types";
import { buildMovementRate, findLatestPublishedDates } from "../visa-bulletin/data-transforms";
import { TimelineSteps } from "./timeline-steps";
import { GapCardsDisplay, RateCard } from "./timeline-gap-display";

const LS_PD_KEY = "user-priority-date";

function parseISO(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + Math.round(months));
  return d;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });
}

interface Projection {
  eligible: boolean; stalled: boolean;
  monthsToCurrentRaw?: number; projectedCurrent?: Date;
  nvcStart?: Date; nvcEnd?: Date;
  interviewStart?: Date; interviewEnd?: Date; arriveBy?: Date;
}

function projectTimeline(userPD: string, cutoffTableA: string, avgDaysPerMonth: number): Projection {
  const gapDays = (parseISO(userPD) - parseISO(cutoffTableA)) / 86_400_000;
  if (gapDays <= 0) return { eligible: true, stalled: false };
  if (avgDaysPerMonth <= 0) return { eligible: false, stalled: true };
  const monthsToCurrentRaw = gapDays / avgDaysPerMonth;
  const projectedCurrent = addMonths(new Date(), monthsToCurrentRaw);
  return {
    eligible: false, stalled: false, monthsToCurrentRaw, projectedCurrent,
    nvcStart: addMonths(projectedCurrent, 0), nvcEnd: addMonths(projectedCurrent, 4),
    interviewStart: addMonths(projectedCurrent, 4), interviewEnd: addMonths(projectedCurrent, 7),
    arriveBy: addMonths(projectedCurrent, 13),
  };
}

export function TimelineEstimator({ initialData }: { initialData: VisaBulletinData }) {
  const [userPD, setUserPD] = useState("");
  const [data, setData] = useState<VisaBulletinData>(initialData);

  // Load PD from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_PD_KEY);
      if (saved) setUserPD(saved);
    } catch {
      // ignore
    }
  }, []);

  // Refresh VB data from API with 8-second timeout; keep initialData on failure
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8_000);
    fetch("/api/visa-bulletin", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<VisaBulletinData>;
      })
      .then((fresh) => setData(fresh))
      .catch(() => {
        /* keep initialData */
      })
      .finally(() => clearTimeout(timer));
  }, []);

  function handlePDChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setUserPD(val);
    try {
      if (val) localStorage.setItem(LS_PD_KEY, val);
      else localStorage.removeItem(LS_PD_KEY);
    } catch {
      // ignore
    }
  }

  const isValidPD = /^\d{4}-\d{2}-\d{2}$/.test(userPD);
  const { latestTableA, latestTableB } = findLatestPublishedDates(data.months);
  const rate = buildMovementRate(data.months);

  let projection: Projection | null = null;
  if (isValidPD && latestTableA && latestTableA !== "Current") {
    projection = projectTimeline(userPD, latestTableA, rate.avgDaysPerMonth);
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border bg-blue-50 px-4 py-3 dark:bg-blue-950/30">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs text-white">
          🗓️
        </span>
        <span className="text-sm font-bold text-text">Timeline Ước Tính Phỏng Vấn</span>
        <span className="ml-auto text-[10px] text-text-muted">EB-3 · Vietnam · Lãnh Sự Quán</span>
      </div>

      <div className="p-4">
        {/* PD Input */}
        <div className="mb-4">
          <label htmlFor="te-pd-input" className="mb-1.5 block text-[11px] font-semibold text-text-muted">
            Priority Date của bạn (từ thư PERM/I-140)
          </label>
          <input
            id="te-pd-input"
            type="date"
            value={userPD}
            onChange={handlePDChange}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-[10px] text-text-muted">
            Ngày nộp đơn LC (PERM) lên DOL — ghi trên thư phê duyệt ETA-9089.
          </p>
        </div>

        {/* No PD entered */}
        {!isValidPD && (
          <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-text-muted">
            Nhập Priority Date của bạn để xem ước tính timeline
          </div>
        )}

        {/* Main content — always show when PD is valid */}
        {isValidPD && (
          <>
            <GapCardsDisplay latestTableA={latestTableA} latestTableB={latestTableB} userPD={userPD} />

            {/* VB is Current — no projection needed */}
            {latestTableA === "Current" && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                ✓ Visa Bulletin hiện tại: Current — Priority Date của bạn đủ điều kiện nộp ngay.
              </div>
            )}

            {/* VB has a date — show rate card + projection */}
            {latestTableA !== "Current" && (
              <>
                <RateCard rate={rate} />

                {projection?.eligible && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                    ✓ Priority Date của bạn đã đủ điều kiện! Bạn có thể bắt đầu quy trình ngay.
                  </div>
                )}

                {projection?.stalled && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                    ⚠️ Không thể ước tính — VB không tiến trong kỳ này. Theo dõi thêm tại{" "}
                    <a href="/visa-bulletin" className="underline">
                      /visa-bulletin
                    </a>
                    .
                  </div>
                )}

                {projection && !projection.eligible && !projection.stalled && projection.projectedCurrent && (
                  <>
                    <div className="mb-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <div className="text-[11px] text-text-muted">Ước tính PD đạt ngưỡng</div>
                      <div className="mt-0.5 text-lg font-bold text-primary">
                        {fmtDate(projection.projectedCurrent)}
                      </div>
                      <div className="text-[10px] text-text-muted">
                        (~{Math.round(projection.monthsToCurrentRaw!)} tháng nữa)
                      </div>
                    </div>

                    <TimelineSteps
                      projectedCurrent={projection.projectedCurrent}
                      nvcStart={projection.nvcStart!}
                      nvcEnd={projection.nvcEnd!}
                      interviewStart={projection.interviewStart!}
                      interviewEnd={projection.interviewEnd!}
                      arriveBy={projection.arriveBy!}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
