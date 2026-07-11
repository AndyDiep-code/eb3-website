"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface NetPayResult {
  gross: number;
  netMonthly: number;
  fedMonthly: number;
  ssMonthly: number;
  medicareMonthly: number;
  stateTaxMonthly: number;
}

export function NetPayPieChart({ result }: { result: NetPayResult }) {
  const total = result.gross;

  const slices = [
    { name: "Lương Net", value: result.netMonthly, color: "#0071bc" },
    { name: "Thuế Liên Bang", value: result.fedMonthly, color: "#f87171" },
    { name: "Social Security", value: result.ssMonthly, color: "#a78bfa" },
    { name: "Medicare", value: result.medicareMonthly, color: "#34d399" },
    { name: "Thuế Tiểu Bang", value: result.stateTaxMonthly, color: "#fb923c" },
  ].filter((s) => s.value > 0);

  function tooltipFormatter(value: unknown, name: unknown): [string, string] {
    const num = typeof value === "number" ? value : 0;
    const label = name != null ? String(name) : "";
    const pct = total > 0 ? ((num / total) * 100).toFixed(1) : "0";
    return [`$${Math.round(num).toLocaleString()}/tháng (${pct}%)`, label];
  }

  return (
    <div className="mt-4 rounded-card border border-border bg-bg p-4">
      <div className="mb-2 text-xs font-bold text-primary">🥧 Phân Bổ Lương — Mỗi Tháng</div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={slices}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            isAnimationActive={false}
          >
            {slices.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip formatter={tooltipFormatter} />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
