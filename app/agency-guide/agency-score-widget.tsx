"use client";

import { useMemo, useState } from "react";
import { SCORE_CRITERIA } from "./agency-guide-data";

const MAX_SCORE_PER_ITEM = 5;
const DEFAULT_SCORE = 3;
const GOOD_THRESHOLD_PCT = 80;
const WARNING_THRESHOLD_PCT = 60;

interface Verdict {
  label: string;
  colorClass: string;
}

function getVerdict(percent: number): Verdict {
  if (percent >= GOOD_THRESHOLD_PCT) {
    return { label: "✅ Agency đáng tin cậy — có thể xem xét", colorClass: "text-accent" };
  }
  if (percent >= WARNING_THRESHOLD_PCT) {
    return { label: "⚠️ Cần xem xét kỹ hơn — hỏi thêm câu hỏi", colorClass: "text-secondary" };
  }
  return { label: "❌ Nhiều điểm yếu — cần thận trọng", colorClass: "text-red-600" };
}

/**
 * Client component porting agency-guide.html's inline self-assessment
 * quiz script (legacy lines 257-286: updateScore()/renderResult()).
 * Each criterion is a 1-5 slider; total score renders a percentage and
 * verdict, matching the original's three-tier thresholds (80%/60%).
 */
export function AgencyScoreWidget() {
  const [scores, setScores] = useState<number[]>(
    () => SCORE_CRITERIA.map(() => DEFAULT_SCORE),
  );

  const { totalScore, maxScore, percent, verdict } = useMemo(() => {
    const total = scores.reduce((sum, value) => sum + value, 0);
    const max = SCORE_CRITERIA.length * MAX_SCORE_PER_ITEM;
    const pct = Math.round((total / max) * 100);
    return { totalScore: total, maxScore: max, percent: pct, verdict: getVerdict(pct) };
  }, [scores]);

  function handleScoreChange(index: number, value: number) {
    setScores((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
  }

  return (
    <div>
      <div className="grid gap-2">
        {SCORE_CRITERIA.map((criterion, index) => (
          <div key={criterion} className="flex items-center gap-2.5 text-xs">
            <label className="flex-1 text-text-muted">{criterion}</label>
            <input
              type="range"
              min={1}
              max={MAX_SCORE_PER_ITEM}
              value={scores[index]}
              onChange={(event) => handleScoreChange(index, Number(event.target.value))}
              className="flex-[2] accent-primary"
            />
            <span className="w-5 text-center font-bold text-secondary">
              {scores[index]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <div className={`text-2xl font-extrabold ${verdict.colorClass}`}>{percent}%</div>
        <div className={`mt-1 text-sm font-semibold ${verdict.colorClass}`}>
          {verdict.label}
        </div>
        <div className="mt-1 text-xs text-text-muted">
          Tổng: {totalScore}/{maxScore} điểm
        </div>
      </div>
    </div>
  );
}
