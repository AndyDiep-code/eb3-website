"use client";

import { useEffect, useState } from "react";
import type { VisaBulletinData } from "../visa-bulletin/types";
import { findLatestPublishedDates, formatIsoDateToDisplay } from "../visa-bulletin/data-transforms";

const LS_PD_KEY = "user-priority-date";

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; tableA: string | null; tableB: string | null; label: string };

function parseISO(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Gap from cutoff to user PD. Positive months = user PD is ahead of cutoff (needs to wait). */
function computeGap(userPD: string, cutoff: string): { months: number; days: number; isEligible: boolean } {
  const pdMs = parseISO(userPD);
  const cutoffMs = parseISO(cutoff);
  if (pdMs <= cutoffMs) return { months: 0, days: 0, isEligible: true };

  const pd = new Date(pdMs);
  const cu = new Date(cutoffMs);
  let months =
    (pd.getUTCFullYear() - cu.getUTCFullYear()) * 12 +
    (pd.getUTCMonth() - cu.getUTCMonth());
  let days = pd.getUTCDate() - cu.getUTCDate();
  if (days < 0) {
    months -= 1;
    days += new Date(Date.UTC(pd.getUTCFullYear(), pd.getUTCMonth(), 0)).getUTCDate();
  }
  return { months, days, isEligible: false };
}

function GapCard({
  tableName,
  cutoff,
  userPD,
}: {
  tableName: string;
  cutoff: string | null;
  userPD: string;
}) {
  if (!cutoff) {
    return (
      <div className="rounded-lg border border-border bg-bg-alt p-3">
        <div className="text-[11px] font-semibold text-text-muted">{tableName}</div>
        <div className="mt-0.5 text-sm font-bold text-text-muted">Chưa có dữ liệu</div>
      </div>
    );
  }

  if (cutoff === "Current") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
        <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">{tableName}</div>
        <div className="mt-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">Current ✓</div>
        <div className="mt-0.5 text-[10px] text-text-muted">Không giới hạn ngày Priority Date</div>
      </div>
    );
  }

  const { months, days, isEligible } = computeGap(userPD, cutoff);

  if (isEligible) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
        <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">{tableName}</div>
        <div className="mt-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">✓ Đủ điều kiện</div>
        <div className="mt-0.5 text-[10px] text-text-muted">Ngưỡng: {formatIsoDateToDisplay(cutoff)}</div>
      </div>
    );
  }

  const urgencyClass =
    months < 3
      ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40"
      : months < 12
        ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/40"
        : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40";
  const textClass =
    months < 3
      ? "text-amber-700 dark:text-amber-300"
      : months < 12
        ? "text-orange-700 dark:text-orange-300"
        : "text-red-600 dark:text-red-400";

  return (
    <div className={`rounded-lg border p-3 ${urgencyClass}`}>
      <div className={`text-[11px] font-semibold ${textClass}`}>{tableName}</div>
      <div className={`mt-0.5 text-sm font-bold ${textClass}`}>
        Còn cách {months} tháng {days} ngày
      </div>
      <div className="mt-0.5 text-[10px] text-text-muted">Ngưỡng: {formatIsoDateToDisplay(cutoff)}</div>
    </div>
  );
}

export function PdCalculator() {
  const [userPD, setUserPD] = useState("");
  const [fetchState, setFetchState] = useState<FetchState>({ status: "idle" });

  // Load saved PD from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_PD_KEY);
      if (saved) setUserPD(saved);
    } catch {
      // ignore
    }
  }, []);

  // Fetch current VB cutoffs once
  useEffect(() => {
    setFetchState({ status: "loading" });
    fetch("/api/visa-bulletin")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<VisaBulletinData>;
      })
      .then((data) => {
        const { latestTableA, latestTableB } = findLatestPublishedDates(data.months);
        const label = [...data.months].reverse().find((m) => m.table_a !== null || m.table_b !== null)?.label ?? "";
        setFetchState({ status: "ready", tableA: latestTableA, tableB: latestTableB, label });
      })
      .catch(() => setFetchState({ status: "error" }));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
  const cutoffLabel = fetchState.status === "ready" ? fetchState.label : "";

  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border bg-violet-50 px-4 py-3 dark:bg-violet-950/30">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-700 text-xs text-white">
          🧮
        </span>
        <span className="text-sm font-bold text-text">Tính Khoảng Cách Priority Date</span>
        {cutoffLabel && (
          <span className="ml-auto text-[10px] text-text-muted">Ngưỡng: {cutoffLabel}</span>
        )}
      </div>

      <div className="p-4">
        {/* Input */}
        <div className="mb-4">
          <label htmlFor="pd-input" className="mb-1.5 block text-[11px] font-semibold text-text-muted">
            Priority Date của bạn (từ thư PERM/I-140)
          </label>
          <input
            id="pd-input"
            type="date"
            value={userPD}
            onChange={handleChange}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-[10px] text-text-muted">
            Ngày nộp đơn LC (PERM) lên DOL — ghi trên thư phê duyệt ETA-9089.
          </p>
        </div>

        {/* Results */}
        {fetchState.status === "loading" && (
          <div className="text-sm text-text-muted">Đang tải dữ liệu VB...</div>
        )}
        {fetchState.status === "error" && (
          <div className="text-sm text-text-muted">⚠️ Không tải được dữ liệu. Thử lại sau.</div>
        )}
        {fetchState.status === "ready" && !isValidPD && (
          <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-text-muted">
            Nhập Priority Date của bạn để xem kết quả
          </div>
        )}
        {fetchState.status === "ready" && isValidPD && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <GapCard
              tableName="Bảng A — Final Action Date"
              cutoff={fetchState.tableA}
              userPD={userPD}
            />
            <GapCard
              tableName="Bảng B — Dates for Filing"
              cutoff={fetchState.tableB}
              userPD={userPD}
            />
          </div>
        )}

        <p className="mt-3 text-[10px] text-text-muted">
          Bảng A = ngày được gọi phỏng vấn / nộp I-485 · Bảng B = ngày nộp I-485 trước (nếu USCIS cho phép) ·{" "}
          <a href="/visa-bulletin" className="text-primary hover:underline">
            Xem VB đầy đủ →
          </a>
        </p>
      </div>
    </div>
  );
}
