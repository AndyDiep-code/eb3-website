// Server component — renders the historical FY2021–FY2025 Table A / Table B
// data (static, finalized, ported from visa-bulletin.html's hardcoded
// markup; see historical-fy-data.ts) plus the EW-Vietnam issuance table.
// No client fetch needed since this data never changes.

import { formatIsoDateToDisplay } from "./data-transforms";
import { HISTORICAL_FY_TABLES, HISTORICAL_ISSUANCE_ROWS } from "./historical-fy-data";

function dateCellClassName(current: string | null, previous: string | null): string {
  if (current === null) return "text-text-muted/50";
  if (current === "Current") return "font-bold text-accent";
  if (previous === null || previous === "Current") return "text-text";
  return "text-text";
}

function FiscalYearTable({ table }: { table: (typeof HISTORICAL_FY_TABLES)[number] }) {
  return (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-xs">
        <thead>
          <tr className="bg-bg-alt text-text-muted">
            <th className="px-2 py-1.5 text-left font-semibold">{table.fiscalYear}</th>
            {table.monthLabels.map((label) => (
              <th key={label} className="px-1.5 py-1.5 text-center font-semibold">
                {label}
              </th>
            ))}
            <th className="px-1.5 py-1.5 text-center font-semibold">Latest</th>
            <th className="px-1.5 py-1.5 text-center font-semibold">Net Δ</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="px-2 py-1.5 font-semibold text-text">Bảng A</td>
            {table.tableA.map((value, index) => (
              <td
                key={table.monthLabels[index]}
                className={`px-1.5 py-1.5 text-center ${dateCellClassName(value, table.tableA[index - 1] ?? null)}`}
              >
                {formatIsoDateToDisplay(value)}
              </td>
            ))}
            <td className="px-1.5 py-1.5 text-center font-bold text-secondary">{table.latestA}</td>
            <td className="px-1.5 py-1.5 text-center text-text-muted">{table.netDeltaA}</td>
          </tr>
          <tr>
            <td className="px-2 py-1.5 font-semibold text-text">Bảng B</td>
            {table.tableB.map((value, index) => (
              <td
                key={table.monthLabels[index]}
                className={`px-1.5 py-1.5 text-center ${dateCellClassName(value, table.tableB[index - 1] ?? null)}`}
              >
                {formatIsoDateToDisplay(value)}
              </td>
            ))}
            <td className="px-1.5 py-1.5 text-center font-bold text-secondary">{table.latestB}</td>
            <td className="px-1.5 py-1.5 text-center text-text-muted">{table.netDeltaB}</td>
          </tr>
        </tbody>
      </table>
      {table.note ? <p className="mt-1 text-xs text-text-muted">{table.note}</p> : null}
    </div>
  );
}

function IssuanceTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-xs">
        <thead>
          <tr className="bg-bg-alt text-text-muted">
            <th className="px-2 py-1.5 text-left font-semibold">FY</th>
            {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((month) => (
              <th key={month} className="px-1.5 py-1.5 text-center font-semibold">
                {month}
              </th>
            ))}
            <th className="px-1.5 py-1.5 text-center font-semibold">Subtotal VN</th>
            <th className="px-1.5 py-1.5 text-center font-semibold">EW-Global</th>
          </tr>
        </thead>
        <tbody>
          {HISTORICAL_ISSUANCE_ROWS.map((row) => (
            <tr key={row.fiscalYear} className="border-b border-border last:border-0">
              <td className="px-2 py-1.5 font-semibold text-text">{row.fiscalYear}</td>
              {row.monthlyIssuances.map((count, index) => (
                <td key={index} className="px-1.5 py-1.5 text-center text-text">
                  {count}
                </td>
              ))}
              <td className="px-1.5 py-1.5 text-center font-bold text-secondary">{row.subtotalVietnam}</td>
              <td className="px-1.5 py-1.5 text-center font-semibold text-primary">
                {row.globalTotal.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HistoricalFyTables() {
  return (
    <section className="mt-6 rounded-card border border-border bg-bg p-4">
      <h2 className="text-base font-semibold text-text">
        📅 Lịch Sử Visa Bulletin — FY2021–FY2025
      </h2>
      <p className="mt-1 text-xs text-text-muted">
        Dữ liệu các năm tài chính đã kết thúc, không thay đổi. FY{new Date().getFullYear()}
        {" "}hiện tại xem ở phần biểu đồ phía trên.
      </p>
      <div className="mt-3">
        {HISTORICAL_FY_TABLES.map((table) => (
          <FiscalYearTable key={table.fiscalYear} table={table} />
        ))}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-text">
        🇻🇳 Visa EW Cấp Cho Việt Nam — Hàng Tháng (FY2021–FY2025)
      </h3>
      <div className="mt-2">
        <IssuanceTable />
      </div>
    </section>
  );
}
