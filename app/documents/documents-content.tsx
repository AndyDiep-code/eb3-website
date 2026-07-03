"use client";

import { useEffect, useState } from "react";
import { DOC_STAGES } from "./documents-data";

/**
 * Client component porting js/document-checklist-render.js's docRender()/
 * docToggle()/docResetAll() DOM logic to React state + localStorage. Reads
 * the exact same storage key ("doc_checklist_v1") so any progress a
 * returning user saved under the old static page is preserved.
 * js/document-checklist-render.js itself is left untouched per the
 * migration plan (read as reference only).
 */
const STORAGE_KEY = "doc_checklist_v1";

const PHASE_HEADER_CLASSES: Record<string, string> = {
  w1: "border-accent bg-gradient-to-br from-accent/10 to-accent/20",
  m1: "border-primary bg-gradient-to-br from-primary/10 to-primary/20",
  m3: "border-secondary bg-gradient-to-br from-secondary/10 to-secondary/20",
  mlong: "border-border bg-bg-alt",
};

const PHASE_SUB_CLASSES: Record<string, string> = {
  w1: "text-accent",
  m1: "text-primary",
  m3: "text-secondary",
  mlong: "text-text-muted",
};

const PHASE_COUNT_CLASSES: Record<string, string> = {
  w1: "bg-accent/20 text-accent",
  m1: "bg-primary/20 text-primary",
  m3: "bg-secondary/20 text-secondary",
  mlong: "bg-border text-text-muted",
};

function readSavedState(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function DocumentsContent() {
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

  const totalCount = DOC_STAGES.reduce((sum, stage) => sum + stage.items.length, 0);
  const doneCount = DOC_STAGES.reduce(
    (sum, stage) => sum + stage.items.filter((item) => checked[item.id]).length,
    0,
  );
  const progressPct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <>
      <div className="rounded-card border border-border bg-bg p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm font-bold text-text">
              📊 Tiến Độ Chuẩn Bị Hồ Sơ
            </div>
            <div className="text-xs text-text-muted">
              {doneCount} / {totalCount} giấy tờ đã chuẩn bị ({progressPct}%)
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
          {DOC_STAGES.map((stage) => {
            const stageDone = stage.items.filter((item) => checked[item.id]).length;
            return (
              <span
                key={stage.id}
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PHASE_COUNT_CLASSES[stage.cls]}`}
              >
                {stage.icon} {stage.title.split(" ")[0]}: {stageDone}/{stage.items.length}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {DOC_STAGES.map((stage) => {
          const stageDone = stage.items.filter((item) => checked[item.id]).length;
          return (
            <div key={stage.id}>
              <div
                className={`flex items-center gap-2.5 rounded-t-card border p-3 ${PHASE_HEADER_CLASSES[stage.cls]}`}
              >
                <span className="text-2xl">{stage.icon}</span>
                <div className="flex-1">
                  <div className="text-base font-extrabold text-text">{stage.title}</div>
                  <div className={`text-xs ${PHASE_SUB_CLASSES[stage.cls]}`}>{stage.sub}</div>
                </div>
                <span
                  className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${PHASE_COUNT_CLASSES[stage.cls]}`}
                >
                  {stageDone}/{stage.items.length}
                </span>
              </div>
              <div className="overflow-hidden rounded-b-card border border-t-0 border-border">
                {stage.items.map((item) => {
                  const isDone = !!checked[item.id];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleItem(item.id)}
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
                          {item.name}
                        </div>
                        {(item.validity || item.format || item.prep.length > 0) && (
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {item.validity && (
                              <span className="rounded-md bg-secondary/20 px-1.5 py-0.5 text-[10px] font-semibold text-secondary">
                                ⏳ {item.validity}
                              </span>
                            )}
                            {item.format && (
                              <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                                📐 {item.format}
                              </span>
                            )}
                            {item.prep.map((prepText) => (
                              <span
                                key={prepText}
                                className="rounded-md bg-secondary/10 px-1.5 py-0.5 text-[10px] font-semibold text-secondary/80"
                              >
                                🛠 {prepText}
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
        })}
      </div>
    </>
  );
}
