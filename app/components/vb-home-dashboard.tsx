"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { VisaBulletinData, VisaBulletinMonth } from "../visa-bulletin/types";
import {
  buildPriorityDateTrendData,
  computeNetDelta,
  findLatestPublishedDates,
  formatIsoDateToDisplay,
  type PriorityDateTrendPoint,
} from "../visa-bulletin/data-transforms";

type FetchState =
  | { status: "ready"; data: VisaBulletinData }
  | { status: "error"; data: VisaBulletinData };

function StatCard({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string;
  value: string;
  sub: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-alt p-3 text-center">
      <div className="text-[11px] text-text-muted">{label}</div>
      <div className={`mt-1 text-base font-bold ${valueClass ?? "text-primary"}`}>{value}</div>
      <div className="mt-0.5 text-[10px] text-text-muted">{sub}</div>
    </div>
  );
}

function RecentMonthsGrid({ months }: { months: VisaBulletinMonth[] }) {
  const recent = months.slice(-6);
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
      {recent.map((m, i, arr) => {
        const prev = arr[i - 1];
        const trend =
          m.table_a && prev?.table_a
            ? m.table_a > prev.table_a
              ? "up"
              : m.table_a < prev.table_a
                ? "down"
                : "flat"
            : "flat";
        return (
          <div
            key={m.month}
            className={`rounded-lg border p-2 text-xs ${
              trend === "up"
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
                : trend === "down"
                  ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40"
                  : "border-border bg-bg-alt"
            }`}
          >
            <div className="text-[10px] text-text-muted">{m.label}</div>
            <div className="mt-0.5 text-[11px] font-bold text-text">
              {formatIsoDateToDisplay(m.table_a)}
            </div>
            <span
              className={`mt-0.5 inline-block text-[10px] font-semibold ${
                trend === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : trend === "down"
                    ? "text-red-500 dark:text-red-400"
                    : "text-text-muted"
              }`}
            >
              {trend === "up" ? "⬆ Tăng" : trend === "down" ? "⬇ Lùi" : "— Giữ"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function CompactTrendChart({ data }: { data: PriorityDateTrendPoint[] }) {
  const allValues = data
    .flatMap((p) => [p.tableADays, p.tableBDays])
    .filter((v): v is number => v !== null);
  const minY = allValues.length > 0 ? Math.min(...allValues) - 30 : 0;
  const maxY = allValues.length > 0 ? Math.max(...allValues) + 30 : 100;

  return (
    <div style={{ height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="rgba(100,116,139,0.2)" strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#565c65", fontSize: 9 }}
            interval={2}
            angle={-35}
            textAnchor="end"
            height={38}
          />
          <YAxis hide domain={[minY, maxY]} />
          <Tooltip
            contentStyle={{ background: "#1e2d42", borderColor: "#2d3f55", fontSize: 11 }}
            labelStyle={{ color: "#93c5fd" }}
            itemStyle={{ color: "#e2e8f0" }}
            formatter={(_, name, entry: { payload?: PriorityDateTrendPoint }) => {
              const p = entry.payload;
              if (!p) return ["—", String(name)];
              const display =
                name === "Bảng A" ? p.tableADisplay : p.tableBDisplay;
              const label = name === "Bảng A" ? "Bảng A" : "Bảng B";
              return [display, label];
            }}
            labelFormatter={(l) => `VB Tháng: ${l}`}
          />
          <Line
            dataKey="tableADays"
            name="Bảng A"
            stroke="#0071bc"
            strokeWidth={2}
            dot={{ r: 2.5, fill: "#0071bc" }}
            connectNulls={true}
            isAnimationActive={false}
          />
          <Line
            dataKey="tableBDays"
            name="Bảng B"
            stroke="#38bdf8"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={{ r: 2, fill: "#38bdf8" }}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function VbHomeDashboard({ initialData }: { initialData: VisaBulletinData }) {
  const [state, setState] = useState<FetchState>({ status: "ready", data: initialData });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    fetch("/api/visa-bulletin", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<VisaBulletinData>;
      })
      .then((data) => {
        clearTimeout(timeout);
        setState({ status: "ready", data });
      })
      .catch(() => {
        clearTimeout(timeout);
        setState((prev) => ({ status: "error", data: prev.data }));
      });
    return () => {
      controller.abort();
    };
  }, []);

  const { data } = state;
  const { latestTableA, latestTableB } = findLatestPublishedDates(data.months);
  const netDeltaA = computeNetDelta(data.carry_over.table_a_prior_sep, latestTableA);
  const netDeltaB = computeNetDelta(data.carry_over.table_b_prior_sep, latestTableB);
  const trendData = buildPriorityDateTrendData(data.months, data.carry_over);

  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-blue-50 px-4 py-3 dark:bg-blue-950/40">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-700 text-xs text-white dark:bg-blue-500">
            📅
          </span>
          <span className="text-sm font-bold text-text">
            Visa Bulletin — EB-3 EW (ROW) · FY{data.fy}
          </span>
          {state.status === "error" ? (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              OFFLINE
            </span>
          ) : (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              LIVE
            </span>
          )}
        </div>
        <a
          href="/visa-bulletin"
          className="whitespace-nowrap text-xs font-semibold text-primary hover:underline"
        >
          Dashboard đầy đủ →
        </a>
      </div>

      <div className="p-4">
        {/* 4 key stats */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatCard
            label={`Bảng A — FY${data.fy}`}
            value={formatIsoDateToDisplay(latestTableA)}
            sub="Final Action Date"
          />
          <StatCard
            label={`Bảng B — FY${data.fy}`}
            value={formatIsoDateToDisplay(latestTableB)}
            sub="Dates for Filing"
            valueClass="text-sky-600 dark:text-sky-400"
          />
          <StatCard
            label={`Net Δ FY${data.fy} (Bảng A)`}
            value={netDeltaA}
            sub="từ đầu năm tài chính"
            valueClass="text-emerald-600 dark:text-emerald-400"
          />
          <StatCard
            label={`Net Δ FY${data.fy} (Bảng B)`}
            value={netDeltaB}
            sub="từ đầu năm tài chính"
            valueClass="text-emerald-600 dark:text-emerald-400"
          />
        </div>

        {/* Last 6 months */}
        <div className="mt-3">
          <p className="mb-2 text-[11px] font-semibold text-text-muted">
            6 tháng gần nhất — Bảng A (Final Action Date)
          </p>
          <RecentMonthsGrid months={data.months} />
        </div>

        {/* Compact trend chart */}
        <div className="mt-4">
          <p className="mb-2 text-[11px] font-semibold text-text-muted">
            📈 Xu hướng Priority Date — Bảng A (xanh đậm) · Bảng B (xanh nhạt)
          </p>
          <CompactTrendChart data={trendData} />
        </div>

        {/* Footer */}
        <p className="mt-3 text-[10px] text-text-muted">
          Cập nhật:{" "}
          {new Date(data.updated).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          · Nguồn: travel.state.gov
        </p>
      </div>
    </div>
  );
}
