// Main comparison table + per-criteria breakdown table, ported from
// compare()'s "cmp-wrap" table blocks (legacy compare.html lines 282-329).

import { COMPARE_SCORE_LABELS, type CompareStateData, SCORE_KEYS } from "./compare-data";

/** Score-tier text color, ported from legacy .best/.worst/.good classes. */
function scoreTierClassName(value: number): string {
  if (value >= 80) return "font-bold text-accent";
  if (value <= 40) return "font-bold text-red-500";
  return "font-bold text-secondary";
}

/** Tax-rate tier color, ported from compare()'s rows[0].fn logic. */
function taxTierClassName(tax: number): string {
  if (tax <= 3.5) return "font-bold text-accent";
  if (tax >= 6) return "font-bold text-red-500";
  return "font-bold text-secondary";
}

/** Rent-1BR tier color, ported from compare()'s rows[1].fn (string-match on cheapest/priciest ranges). */
function rent1TierClassName(rent1: string): string {
  if (rent1.includes("600") || rent1.includes("650")) return "font-bold text-accent";
  if (rent1.includes("1,1") || rent1.includes("1,0")) return "font-bold text-red-500";
  return "";
}

/** Block-bar visualization, ported from compare()'s `'█'.repeat(...)+'░'.repeat(...)`. */
function scoreBar(value: number): string {
  const filled = Math.round(value / 10);
  return "█".repeat(filled) + "░".repeat(10 - filled);
}

export function ComparisonTable({ states }: { states: Array<CompareStateData & { key: string }> }) {
  const rows: Array<{ label: string; render: (state: CompareStateData) => React.ReactNode }> = [
    {
      label: "Thuế thu nhập TN",
      render: (state) =>
        state.tax === 0 ? (
          <span className="inline-block rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
            KHÔNG CÓ ✓
          </span>
        ) : (
          <span className={taxTierClassName(state.tax)}>{state.tax}%</span>
        ),
    },
    {
      label: "Thuê nhà 1BR (1 người)",
      render: (state) => <span className={rent1TierClassName(state.rent1)}>{state.rent1}/tháng</span>,
    },
    { label: "Thuê nhà 1BR (gia đình)", render: (state) => `${state.rent2}/tháng` },
    { label: "Ăn uống (1 người/tháng)", render: (state) => `~$${state.food1}` },
    { label: "Ăn uống (gia đình 3/tháng)", render: (state) => `~$${state.food2}` },
    { label: "Lương EB3 điển hình", render: (state) => `~$${state.wage}/giờ` },
    {
      label: "Lương gross/tháng ($15/h)",
      render: () => `~$${Math.round(15 * 40 * 4.333).toLocaleString()}`,
    },
    {
      label: "Cộng đồng Việt",
      render: (state) => (
        <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
          {state.viet}
        </span>
      ),
    },
    {
      label: "Hãng EB3 nổi bật",
      render: (state) => <span className="text-[11.5px] text-text-muted">{state.eb3}</span>,
    },
    {
      label: "Khí hậu",
      render: (state) => <span className="text-[11.5px] text-text-muted">{state.climate}</span>,
    },
  ];

  return (
    <div className="mb-5 overflow-x-auto rounded-card border border-border">
      <table className="w-full min-w-[500px] border-collapse text-sm">
        <thead>
          <tr className="bg-bg-alt">
            <th className="px-3.5 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide text-text-muted">
              Tiêu chí
            </th>
            {states.map((state) => (
              <th key={state.key} className="px-3.5 py-2.5 text-left text-sm font-extrabold text-text">
                {state.flag} {state.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-b-0">
              <td className="whitespace-nowrap bg-bg-alt px-3.5 py-2.5 text-xs font-bold text-text-muted">
                {row.label}
              </td>
              {states.map((state) => (
                <td key={state.key} className="px-3.5 py-2.5 align-top leading-relaxed text-text">
                  {row.render(state)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CriteriaBreakdownTable({ states }: { states: Array<CompareStateData & { key: string }> }) {
  return (
    <div>
      <div className="mb-3 text-sm font-bold text-text">📊 So Sánh Theo Từng Tiêu Chí</div>
      <div className="overflow-x-auto rounded-card border border-border">
        <table className="w-full min-w-[500px] border-collapse text-sm">
          <thead>
            <tr className="bg-bg-alt">
              <th className="px-3.5 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide text-text-muted">
                Tiêu chí (thang 100)
              </th>
              {states.map((state) => (
                <th key={state.key} className="px-3.5 py-2.5 text-left text-sm font-extrabold text-text">
                  {state.flag} {state.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCORE_KEYS.map((scoreKey) => (
              <tr key={scoreKey} className="border-b border-border last:border-b-0">
                <td className="whitespace-nowrap bg-bg-alt px-3.5 py-2.5 text-xs font-bold text-text-muted">
                  {COMPARE_SCORE_LABELS[scoreKey]}
                </td>
                {states.map((state) => {
                  const value = state.scores[scoreKey] || 0;
                  return (
                    <td key={state.key} className="px-3.5 py-2.5">
                      <span className={scoreTierClassName(value)}>{value}</span>
                      <span className="ml-1.5 text-[10px] tracking-tighter text-text-muted/40">
                        {scoreBar(value)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
