// Score-card grid, ported from compare()'s "score-section" #1 block
// (legacy compare.html lines 263-279) — shows weighted total score per
// selected state with a winner highlight.

import { COMPARE_SCORE_LABELS, type CompareStateData, SCORE_KEYS } from "./compare-data";

export function ScoreCards({
  states,
  totals,
  maxScore,
}: {
  states: Array<CompareStateData & { key: string }>;
  totals: number[];
  maxScore: number;
}) {
  return (
    <div className="mb-5">
      <div className="mb-3 text-sm font-bold text-text">
        🏆 Điểm Tổng Hợp — Phù hợp nhất cho EB-3 người Việt
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {states.map((state, index) => {
          const isWinner = totals[index] === maxScore;
          const breakdown = SCORE_KEYS.map(
            (key) => `${COMPARE_SCORE_LABELS[key].split(" ")[0]} ${state.scores[key] || 0}/100`,
          ).join(" · ");

          return (
            <div
              key={state.key}
              className={`rounded-card border-2 p-4 text-center ${
                isWinner ? "border-primary bg-primary/10" : "border-border bg-bg"
              }`}
            >
              <div className="mb-1.5 text-3xl">{state.flag}</div>
              <div className="text-sm font-extrabold text-text">
                {state.name}
                {isWinner ? " 🏆" : ""}
              </div>
              <div className={`my-1.5 text-3xl font-extrabold ${isWinner ? "text-primary" : "text-secondary"}`}>
                {totals[index]}
              </div>
              <div className="text-[10px] text-text-muted">/ 100 điểm</div>
              <div className="mt-1.5 text-[11px] leading-relaxed text-text-muted">{breakdown}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
