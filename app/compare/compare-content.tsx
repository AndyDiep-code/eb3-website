"use client";

import { useMemo, useState } from "react";
import {
  COMPARE_DEFAULT_STATE_1,
  COMPARE_DEFAULT_STATE_2,
  COMPARE_SCORE_WEIGHTS,
  COMPARE_STATES,
  SCORE_KEYS,
} from "./compare-data";
import { ScoreCards } from "./compare-score-cards";
import { ComparisonTable, CriteriaBreakdownTable } from "./compare-tables";

const STATE_KEYS = Object.keys(COMPARE_STATES);

function StateSelect({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-w-[150px] flex-1 rounded-btn border border-border bg-bg px-3 py-2 text-sm font-semibold text-text outline-none focus:border-primary"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {STATE_KEYS.map((key) => (
        <option key={key} value={key}>
          {COMPARE_STATES[key].flag} {COMPARE_STATES[key].name}
        </option>
      ))}
    </select>
  );
}

function SelectorsRow({
  state1,
  state2,
  state3,
  onState1Change,
  onState2Change,
  onState3Change,
}: {
  state1: string;
  state2: string;
  state3: string;
  onState1Change: (value: string) => void;
  onState2Change: (value: string) => void;
  onState3Change: (value: string) => void;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2.5">
      <span className="text-xs font-bold uppercase text-text-muted">Chọn bang:</span>
      <StateSelect id="s1" value={state1} onChange={onState1Change} />
      <StateSelect id="s2" value={state2} onChange={onState2Change} />
      <StateSelect
        id="s3"
        value={state3}
        onChange={onState3Change}
        placeholder="— Bang thứ 3 (tùy chọn) —"
      />
    </div>
  );
}

/**
 * Client component porting compare.html's buildOptions()/compare() inline
 * JS (legacy lines 240-334) to React controlled selects + derived state.
 * Score totals/winner logic preserved exactly: weighted sum of 6 score
 * categories (tax/cost/wage/viet/climate/eb3), highest total wins.
 */
export function CompareContent() {
  const [state1, setState1] = useState(COMPARE_DEFAULT_STATE_1);
  const [state2, setState2] = useState(COMPARE_DEFAULT_STATE_2);
  const [state3, setState3] = useState("");

  const selectedStates = useMemo(() => {
    const keys = [state1, state2, state3].filter(Boolean);
    if (keys.length < 2) return [];
    return keys.map((key) => ({ key, ...COMPARE_STATES[key] }));
  }, [state1, state2, state3]);

  const totals = useMemo(
    () =>
      selectedStates.map((state) => {
        let total = 0;
        for (const scoreKey of SCORE_KEYS) {
          total += (state.scores[scoreKey] || 0) * COMPARE_SCORE_WEIGHTS[scoreKey] / 100;
        }
        return Math.round(total);
      }),
    [selectedStates],
  );

  const maxScore = totals.length > 0 ? Math.max(...totals) : 0;

  return (
    <>
      <SelectorsRow
        state1={state1}
        state2={state2}
        state3={state3}
        onState1Change={setState1}
        onState2Change={setState2}
        onState3Change={setState3}
      />

      {selectedStates.length > 0 && (
        <>
          <ScoreCards states={selectedStates} totals={totals} maxScore={maxScore} />
          <ComparisonTable states={selectedStates} />
          <CriteriaBreakdownTable states={selectedStates} />
        </>
      )}
    </>
  );
}
