"use client";

// PROPOSED 3rd chart (Requirement #5) — FY-over-FY total EW Vietnam visa
// issuances. permupdate.com's actual chart set wasn't inspectable (client-
// rendered, not visible to static fetch), so this is a reasonable original
// addition based on data already tracked (HISTORICAL_ISSUANCE_ROWS +
// live FY total), NOT a clone of an unseen design. Flag for site owner
// confirmation before treating as final — see page.tsx comment + phase
// implementation report.

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface FiscalYearIssuanceBar {
  fiscalYear: string;
  totalIssuances: number;
  isCurrentFy: boolean;
}

const PAST_FY_COLOR = "#1d4ed8";
const CURRENT_FY_COLOR = "#fbbf24";

// See priority-date-trend-chart.tsx's comment: Recharts' Formatter type is
// intentionally loose (ValueType | undefined), narrowed here to this
// chart's actual numeric totalIssuances values.
function renderTooltipValue(value: unknown): [string, string] {
  const numericValue = typeof value === "number" ? value : 0;
  return [`${numericValue.toLocaleString()} visa`, "Tổng EW Việt Nam"];
}

export function FiscalYearIssuanceChart({ data }: { data: FiscalYearIssuanceBar[] }) {
  return (
    <div style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 4 }}>
          <CartesianGrid stroke="rgba(45,63,85,0.5)" vertical={false} />
          <XAxis dataKey="fiscalYear" tick={{ fill: "#64748b", fontSize: 11 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: "#1e2d42", borderColor: "#2d3f55" }}
            labelStyle={{ color: "#93c5fd" }}
            itemStyle={{ color: "#e2e8f0" }}
            formatter={renderTooltipValue}
          />
          <Bar dataKey="totalIssuances" radius={4}>
            {data.map((entry) => (
              <Cell
                key={entry.fiscalYear}
                fill={entry.isCurrentFy ? CURRENT_FY_COLOR : PAST_FY_COLOR}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
