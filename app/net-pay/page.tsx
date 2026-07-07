"use client";

import { useState, useCallback } from "react";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import type { Metadata } from "next";

const STATES = [
  { name: "Texas (TX) — Không thuế TN", rate: 0 },
  { name: "Florida (FL) — Không thuế TN", rate: 0 },
  { name: "Nevada (NV) — Không thuế TN", rate: 0 },
  { name: "South Dakota (SD) — Không thuế TN", rate: 0 },
  { name: "Arizona (AZ) — Không thuế TN", rate: 0 },
  { name: "Georgia (GA) — 5.39%", rate: 5.39 },
  { name: "Indiana (IN) — 3.05%", rate: 3.05 },
  { name: "Wisconsin (WI) — 3.5%", rate: 3.5 },
  { name: "North Carolina (NC) — 4.5%", rate: 4.5 },
  { name: "South Carolina (SC) — 5%", rate: 5 },
  { name: "Alabama (AL) — 5%", rate: 5 },
  { name: "Pennsylvania (PA) — 3.07%", rate: 3.07 },
  { name: "Ohio (OH) — 3.75%", rate: 3.75 },
  { name: "Minnesota (MN) — 7%", rate: 7 },
  { name: "Louisiana (LA) — 4.25%", rate: 4.25 },
  { name: "Arkansas (AR) — 4.4%", rate: 4.4 },
  { name: "Mississippi (MS) — 4.7%", rate: 4.7 },
  { name: "Montana (MT) — 5.9%", rate: 5.9 },
];

const STD_DED = { single: 14600, married: 29200 };
const BRACKETS_SINGLE = [[11600, 0.1], [35550, 0.12], [53400, 0.22], [49675, 0.24], [20250, 0.32], [15900, 0.35], [Infinity, 0.37]] as [number, number][];
const BRACKETS_MARRIED = [[23200, 0.1], [71150, 0.12], [106750, 0.22], [99350, 0.24], [40500, 0.32], [31800, 0.35], [Infinity, 0.37]] as [number, number][];

function fedTax(income: number, filing: "single" | "married"): number {
  const std = STD_DED[filing];
  let taxable = Math.max(0, income - std);
  const brackets = filing === "married" ? BRACKETS_MARRIED : BRACKETS_SINGLE;
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of brackets) {
    if (taxable <= 0) break;
    const chunk = Math.min(taxable, limit - prev);
    tax += chunk * rate;
    taxable -= chunk;
    prev = limit;
  }
  return tax;
}

function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

interface CalcResult {
  netBiweekly: number;
  netMonthly: number;
  netAnnual: number;
  gross: number;
  fedMonthly: number;
  ssMonthly: number;
  medicareMonthly: number;
  stateTaxMonthly: number;
  stateRate: number;
  stateName: string;
  effectiveFedRate: number;
}

function calculate(wage: number, hours: number, stateIdx: number, filing: "single" | "married"): CalcResult {
  const state = STATES[stateIdx] ?? STATES[0];
  const weekly = wage * hours;
  const monthly = weekly * 4.333;
  const annual = weekly * 52;

  const fedAnnual = fedTax(annual, filing);
  const fedMonthly = fedAnnual / 12;
  const ssMonthly = Math.min(annual, 168600) * 0.062 / 12;
  const medicareMonthly = annual * 0.0145 / 12;
  const stateTaxMonthly = annual * (state.rate / 100) / 12;
  const totalDed = fedMonthly + ssMonthly + medicareMonthly + stateTaxMonthly;
  const netMonthly = monthly - totalDed;

  return {
    netBiweekly: netMonthly / 2.167,
    netMonthly,
    netAnnual: netMonthly * 12,
    gross: monthly,
    fedMonthly,
    ssMonthly,
    medicareMonthly,
    stateTaxMonthly,
    stateRate: state.rate,
    stateName: state.name.split(" — ")[0],
    effectiveFedRate: fedAnnual / annual * 100,
  };
}

function NetPayContent() {
  const [wage, setWage] = useState("16");
  const [hours, setHours] = useState("40");
  const [stateIdx, setStateIdx] = useState(0);
  const [filing, setFiling] = useState<"single" | "married">("single");

  const result = useCallback(() => {
    const w = parseFloat(wage) || 0;
    const h = parseFloat(hours) || 40;
    return calculate(w, h, stateIdx, filing);
  }, [wage, hours, stateIdx, filing])();

  const rows = [
    { label: "Lương gộp (Gross)", amt: result.gross, style: "font-bold text-text" },
    { label: `Thuế liên bang (${result.effectiveFedRate.toFixed(1)}% effective)`, amt: -result.fedMonthly, style: "text-red-400" },
    { label: "Social Security (6.2%)", amt: -result.ssMonthly, style: "text-red-400" },
    { label: "Medicare (1.45%)", amt: -result.medicareMonthly, style: "text-red-400" },
    result.stateRate > 0
      ? { label: `Thuế tiểu bang ${result.stateName} (${result.stateRate}%)`, amt: -result.stateTaxMonthly, style: "text-red-400" }
      : { label: `Thuế tiểu bang ${result.stateName}`, amt: 0, style: "text-green-400", note: "MIỄN PHÍ" },
    { label: "Lương thực nhận (Net)", amt: result.netMonthly, style: "font-bold text-green-400" },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">💰 Tính Lương Thực Nhận (Net Pay)</h1>
      <p className="mt-1 text-text-muted">Sau thuế liên bang · Thuế tiểu bang · Social Security · Medicare</p>

      <div className="mt-3 rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
        ℹ️ Đây là ước tính tham khảo dựa trên thuế suất 2024. Lương thực nhận có thể khác do: số người phụ thuộc (W-4), đóng góp 401k, bảo hiểm y tế từ lương, hoặc thu nhập khác.
      </div>

      <div className="mt-4 rounded-card border border-border bg-bg p-4">
        <h2 className="text-sm font-bold text-primary mb-3">⚙️ Nhập Thông Tin</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Lương theo giờ ($)</label>
            <input
              type="number"
              value={wage}
              min="7.25"
              max="100"
              step="0.25"
              onChange={(e) => setWage(e.target.value)}
              className="rounded-btn border border-border bg-bg-alt px-2 py-1.5 text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Số giờ mỗi tuần</label>
            <input
              type="number"
              value={hours}
              min="1"
              max="80"
              onChange={(e) => setHours(e.target.value)}
              className="rounded-btn border border-border bg-bg-alt px-2 py-1.5 text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-xs text-text-muted">Tiểu bang làm việc</label>
            <select
              value={stateIdx}
              onChange={(e) => setStateIdx(Number(e.target.value))}
              className="rounded-btn border border-border bg-bg-alt px-2 py-1.5 text-sm text-text focus:border-primary focus:outline-none"
            >
              {STATES.map((s, i) => (
                <option key={s.name} value={i}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-xs text-text-muted">Tình trạng hôn nhân</label>
            <select
              value={filing}
              onChange={(e) => setFiling(e.target.value as "single" | "married")}
              className="rounded-btn border border-border bg-bg-alt px-2 py-1.5 text-sm text-text focus:border-primary focus:outline-none"
            >
              <option value="single">Độc thân (Single)</option>
              <option value="married">Có gia đình (Married Filing Jointly)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-card border border-border bg-bg p-5 text-center">
        <div className="text-xs text-text-muted">💵 Lương thực nhận mỗi 2 tuần (biweekly)</div>
        <div className="mt-1 text-4xl font-bold text-green-400">{fmt(result.netBiweekly)}</div>
        <div className="mt-1 text-xs text-text-muted">
          Tháng: {fmt(result.netMonthly)} · Năm: {fmt(result.netAnnual)} | Tổng thu nhập/năm: {fmt(result.gross * 12)}
        </div>
        <div className="mt-3 flex justify-center gap-3">
          {[
            { label: "Mỗi tuần", value: result.netMonthly / 4.333 },
            { label: "Mỗi tháng", value: result.netMonthly },
            { label: "Mỗi năm", value: result.netAnnual },
          ].map((c) => (
            <div key={c.label} className="rounded-card border border-border bg-bg-alt px-3 py-2 text-center">
              <div className="text-sm font-bold text-secondary">{fmt(c.value)}</div>
              <div className="text-xs text-text-muted">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-card border border-border bg-bg p-4">
        <div className="mb-3 text-xs font-bold text-primary">📋 Chi Tiết Khấu Trừ — Mỗi Tháng</div>
        <div className="flex flex-col gap-1.5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between text-xs">
              <span className="text-text-muted">{row.label}</span>
              <span className={row.style}>
                {row.note ? row.note : row.amt === 0 ? "—" : row.amt < 0 ? `−${fmt(-row.amt)}` : fmt(row.amt)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
        <span className="font-semibold text-text">Giải thích:</span>{" "}
        <b className="text-text">Federal Tax:</b> 10–37% brackets · <b className="text-text">Social Security:</b> 6.2% (giới hạn $168,600/năm) · <b className="text-text">Medicare:</b> 1.45% · <b className="text-text">State Tax:</b> TX, FL, NV, SD, AZ = <span className="text-green-400">MIỄN</span>
        <br />
        <a href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" rel="noopener" className="text-primary underline">IRS Tax Withholding Estimator</a> — công cụ chính thức tính lại mức khấu trừ thuế.
      </div>
    </div>
  );
}

export default function NetPayPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <NetPayContent />
    </Layout>
  );
}
