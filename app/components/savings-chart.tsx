"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface Goal {
  id: string;
  name: string;
  amount: number;
}

interface SavingsChartProps {
  currentSavings: number;
  monthlySave: number;
  goals: Goal[];
}

function formatYAxis(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}

function tooltipFormatter(value: unknown): [string, string] {
  const num = typeof value === "number" ? value : 0;
  return [`$${num.toLocaleString()}`, "Tiết kiệm"];
}

export function SavingsChart({ currentSavings, monthlySave, goals }: SavingsChartProps) {
  const maxGoalAmount = Math.max(...goals.map((g) => g.amount), currentSavings + 1);
  const monthsToLast =
    monthlySave > 0 ? Math.ceil((maxGoalAmount - currentSavings) / monthlySave) : 60;
  const totalMonths = Math.min(Math.max(monthsToLast + 6, 24), 84);

  const chartData = Array.from({ length: totalMonths + 1 }, (_, i) => ({
    month: i,
    savings: Math.round(currentSavings + i * monthlySave),
  }));

  return (
    <div style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,63,85,0.4)" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#64748b", fontSize: 10 }}
            tickFormatter={(v: number) => (v % 6 === 0 ? `Tháng ${v}` : "")}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 10 }}
            tickFormatter={formatYAxis}
            width={48}
          />
          <Tooltip
            contentStyle={{ background: "#1e2d42", borderColor: "#2d3f55" }}
            labelStyle={{ color: "#93c5fd" }}
            itemStyle={{ color: "#e2e8f0" }}
            labelFormatter={(v: unknown) => `Tháng ${v}`}
            formatter={tooltipFormatter}
          />
          {goals.map((g) => (
            <ReferenceLine
              key={g.id}
              y={g.amount}
              stroke="#f59e0b"
              strokeDasharray="4 3"
              label={{
                value: g.name,
                position: "insideTopRight",
                fontSize: 10,
                fill: "#f59e0b",
              }}
            />
          ))}
          <Area
            type="monotone"
            dataKey="savings"
            stroke="#0071bc"
            fill="#0071bc"
            fillOpacity={0.15}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
