"use client";

import { useEffect, useState } from "react";
import {
  ARRIVAL_PHASES,
  PHASE_HEADER_CLASSES,
  PHASE_PILL_CLASSES,
  PHASE_SUB_CLASSES,
  TAG_CLASSES,
  TAG_LABELS,
  type ArrivalPhase,
} from "./after-arrival-data";

/**
 * Client component porting after-arrival.html's inline render()/toggle()/
 * resetAll()/save() DOM logic to React state + localStorage. Reads the
 * exact same storage key ("arrival_checks") so any progress a returning
 * user saved under the old static page is preserved.
 */
const STORAGE_KEY = "arrival_checks";

function readSavedState(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function AfterArrivalContent() {
  // Initialize empty on the server, hydrate from localStorage after mount —
  // avoids SSR/client markup mismatch since localStorage doesn't exist server-side.
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setChecked(readSavedState());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked, isHydrated]);

  function toggleItem(id: string) {
    setChecked((current) => ({ ...current, [id]: !current[id] }));
  }

  function resetAll() {
    if (!window.confirm("Xóa toàn bộ tiến độ đã lưu?")) return;
    setChecked({});
  }

  const totalCount = ARRIVAL_PHASES.reduce(
    (sum, phase) => sum + phase.items.length,
    0,
  );
  const doneCount = ARRIVAL_PHASES.reduce(
    (sum, phase) =>
      sum + phase.items.filter((item) => checked[item.id]).length,
    0,
  );
  const progressPct = totalCount
    ? Math.round((doneCount / totalCount) * 100)
    : 0;

  return (
    <>
      <div className="rounded-card border border-border bg-bg p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm font-bold text-text">
              📊 Tiến Độ Tổng Thể
            </div>
            <div className="text-xs text-text-muted">
              {doneCount} / {totalCount} việc hoàn thành ({progressPct}%)
            </div>
          </div>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-btn bg-border px-4 py-2 text-xs text-text-muted transition-colors hover:bg-text-muted/30 hover:text-text"
          >
            🔄 Reset tất cả
          </button>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-bg-alt">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent/70 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          {ARRIVAL_PHASES.map((phase) => {
            const phaseDone = phase.items.filter(
              (item) => checked[item.id],
            ).length;
            return (
              <span
                key={phase.id}
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PHASE_PILL_CLASSES[phase.id]}`}
              >
                {phase.icon} {phase.title.split(" ")[0]}: {phaseDone}/
                {phase.items.length}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {ARRIVAL_PHASES.map((phase) => (
          <ArrivalPhaseSection
            key={phase.id}
            phase={phase}
            checked={checked}
            onToggle={toggleItem}
          />
        ))}
      </div>
    </>
  );
}

function ArrivalPhaseSection({
  phase,
  checked,
  onToggle,
}: {
  phase: ArrivalPhase;
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const phaseDone = phase.items.filter((item) => checked[item.id]).length;

  return (
    <div>
      <div
        className={`flex items-center gap-2.5 rounded-t-card border p-3 ${PHASE_HEADER_CLASSES[phase.id]}`}
      >
        <span className="text-2xl">{phase.icon}</span>
        <div className="flex-1">
          <div className="text-base font-extrabold text-text">
            {phase.title}
          </div>
          <div className={`text-xs ${PHASE_SUB_CLASSES[phase.id]}`}>
            {phase.sub}
          </div>
        </div>
        <span
          className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${PHASE_PILL_CLASSES[phase.id]}`}
        >
          {phaseDone}/{phase.items.length}
        </span>
      </div>
      <div className="overflow-hidden rounded-b-card border border-t-0 border-border">
        {phase.items.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              aria-pressed={isDone}
              className={`flex w-full items-start gap-3 border-b border-border bg-bg p-3.5 text-left transition-colors last:border-b-0 hover:bg-bg-alt ${
                isDone ? "opacity-60" : ""
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 text-xs ${
                  isDone
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-bg-alt"
                }`}
              >
                {isDone ? "✓" : ""}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className={`text-sm font-semibold leading-snug ${
                    isDone ? "text-text-muted line-through" : "text-text"
                  }`}
                >
                  {item.task}
                </div>
                <div
                  className="mt-1 text-xs leading-relaxed text-text-muted [&_a]:text-primary [&_a:hover]:underline [&_b]:text-text"
                  // eslint-disable-next-line react/no-danger -- detailHtml is static,
                  // author-controlled content ported verbatim from after-arrival.html,
                  // not user input.
                  dangerouslySetInnerHTML={{ __html: item.detailHtml }}
                />
                {item.tags.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${TAG_CLASSES[tag]}`}
                      >
                        {TAG_LABELS[tag]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
