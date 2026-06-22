"use client";

// Priority-date movement chart — ports visa-bulletin-charts.js's initPdChart
// (Chart.js line chart) to Recharts. Y-axis = days since 2018-01-01 epoch
// (higher = more recent = better); tooltip shows the real display date via
// formatter, not the raw day-count.

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PriorityDateTrendPoint } from "../data-transforms";

const TABLE_A_COLOR = "#3b82f6";
const TABLE_B_COLOR = "#8b5cf6";

// Recharts' Formatter/labelFormatter types are intentionally loose
// (ValueType | undefined, ReactNode) since they cover every chart shape —
// narrowed here to this chart's actual payload shape.
function renderTooltipValue(
  _value: unknown,
  name: unknown,
  entry: { payload?: PriorityDateTrendPoint },
): [string, string] {
  const point = entry.payload;
  const seriesKey = typeof name === "string" ? name : "";
  if (!point) return ["—", seriesKey];
  const display = seriesKey === "tableADays" ? point.tableADisplay : point.tableBDisplay;
  const label = seriesKey === "tableADays" ? "Bảng A" : "Bảng B";
  return [display, label];
}

function renderTooltipLabel(label: unknown): string {
  return `VB Tháng: ${typeof label === "string" || typeof label === "number" ? label : ""}`;
}

export function PriorityDateTrendChart({ data }: { data: PriorityDateTrendPoint[] }) {
  return (
    <div style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 4 }}>
          <CartesianGrid stroke="rgba(45,63,85,0.5)" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#64748b", fontSize: 10 }}
            interval={2}
            angle={-45}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fill: "#64748b", fontSize: 10 }} domain={["dataMin - 20", "dataMax + 20"]} />
          <Tooltip
            contentStyle={{ background: "#1e2d42", borderColor: "#2d3f55" }}
            labelStyle={{ color: "#93c5fd" }}
            itemStyle={{ color: "#e2e8f0" }}
            formatter={renderTooltipValue}
            labelFormatter={renderTooltipLabel}
          />
          <Line
            dataKey="tableADays"
            name="Bảng A — Final Action Date"
            stroke={TABLE_A_COLOR}
            strokeWidth={2.5}
            dot={{ r: 3, fill: TABLE_A_COLOR }}
            connectNulls={false}
          />
          <Line
            dataKey="tableBDays"
            name="Bảng B — Dates for Filing"
            stroke={TABLE_B_COLOR}
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={{ r: 2.5, fill: TABLE_B_COLOR }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
