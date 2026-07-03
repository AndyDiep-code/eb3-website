// Generic comparison table, ported from essentials.html's .cmp-table —
// used across all 4 tabs (phone network coverage, car costs, shopping
// stores, internet ISPs/streaming).

export interface EssentialsTableColumn {
  header: string;
}

export interface EssentialsTableRow {
  cells: React.ReactNode[];
}

export function EssentialsTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: EssentialsTableRow[];
}) {
  return (
    <div className="mb-4 overflow-x-auto rounded-card border border-border">
      <table className="w-full min-w-[480px] border-collapse text-[12.5px]">
        <thead>
          <tr className="bg-accent/10">
            {columns.map((column) => (
              <th
                key={column}
                className="px-3 py-2.5 text-left text-[11.5px] font-bold text-accent"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-b-0">
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2.5 align-top leading-relaxed text-text">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
