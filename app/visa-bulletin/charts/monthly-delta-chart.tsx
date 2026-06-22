"use client";

// Monthly advance-rate chart — ports visa-bulletin-charts.js's initDeltaChart
// (Chart.js bar chart) to Recharts. Green bar = PD advanced, red = retrogress,
// gray = no change. Per-bar coloring via <Cell> (Bar's documented child for
// per-item style overrides, see Recharts 3.x API docs).

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlyDeltaPoint } from "../data-transforms";

function deltaColor(deltaDays: number | null): string {
  if (deltaDays === null) return "transparent";
  if (deltaDays > 0) return "#22c55e";
  if (deltaDays < 0) return "#ef4444";
  return "#374151";
}

// See priority-date-trend-chart.tsx's comment: Recharts' Formatter type is
// intentionally loose (ValueType | undefined), narrowed here to this
// chart's actual numeric-or-null deltaDays values.
function renderTooltipValue(value: unknown): [string, string] {
  const numericValue = typeof value === "number" ? value : null;
  if (numericValue === null) return ["Tháng Current", ""];
  if (numericValue > 0) return [`+${numericValue} ngày ⬆ (~${Math.round((numericValue / 30) * 10) / 10} tháng)`, ""];
  if (numericValue < 0) return [`${numericValue} ngày ⬇ RETROGRESS`, ""];
  return ["Không đổi", ""];
}

function renderTooltipLabel(label: unknown): string {
  return `VB Tháng: ${typeof label === "string" || typeof label === "number" ? label : ""}`;
}

export function MonthlyDeltaChart({ data }: { data: MonthlyDeltaPoint[] }) {
  return (
    <div style={{ height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 4 }}>
          <CartesianGrid stroke="rgba(45,63,85,0.5)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#64748b", fontSize: 9 }}
            interval={3}
            angle={-45}
            textAnchor="end"
            height={50}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 10 }}
            tickFormatter={(value: number) => (value > 0 ? `+${value}d` : `${value}d`)}
          />
          <Tooltip
            contentStyle={{ background: "#1e2d42", borderColor: "#2d3f55" }}
            labelStyle={{ color: "#93c5fd" }}
            itemStyle={{ color: "#e2e8f0" }}
            formatter={renderTooltipValue}
            labelFormatter={renderTooltipLabel}
          />
          <Bar dataKey="deltaDays" radius={2}>
            {data.map((point) => (
              <Cell key={point.label} fill={deltaColor(point.deltaDays)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
