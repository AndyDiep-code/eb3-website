// Renders the current fiscal year's monthly EW-Vietnam issuance row — ports
// visa-bulletin.html's FY2026 placeholder row in the .iss-wrap table
// (data-month/data-table="iss" cells, all "—" while ew_vietnam was null).
// Pure presentational, takes already-fetched live months data as a prop —
// no fetch of its own (parent VisaBulletinDashboard owns the fetch).

import type { VisaBulletinMonth } from "./types";

export function CurrentFyIssuanceRow({
  fiscalYear,
  months,
}: {
  fiscalYear: number;
  months: VisaBulletinMonth[];
}) {
  const subtotal = months.reduce((sum, entry) => sum + (entry.ew_vietnam ?? 0), 0);
  const hasAnyData = months.some((entry) => entry.ew_vietnam !== null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-xs">
        <thead>
          <tr className="bg-bg-alt text-text-muted">
            <th className="px-2 py-1.5 text-left font-semibold">FY{fiscalYear}</th>
            {months.map((entry) => (
              <th key={entry.month} className="px-1.5 py-1.5 text-center font-semibold">
                {entry.label}
              </th>
            ))}
            <th className="px-1.5 py-1.5 text-center font-semibold">Subtotal VN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-1.5 font-semibold text-text">EW Việt Nam</td>
            {months.map((entry) => (
              <td key={entry.month} className="px-1.5 py-1.5 text-center text-text">
                {entry.ew_vietnam ?? "—"}
              </td>
            ))}
            <td className="px-1.5 py-1.5 text-center font-bold text-secondary">
              {hasAnyData ? subtotal : "—"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
