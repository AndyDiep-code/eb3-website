"use client";

import { useEffect, useState } from "react";
import { JOURNEY_STAGE_STORAGE_KEY, STAGES, type Stage } from "../start/stage-tools";

export function JourneyNextSteps() {
  const [stage, setStage] = useState<Stage | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const key = localStorage.getItem(JOURNEY_STAGE_STORAGE_KEY);
      if (key) {
        const found = STAGES.find((s) => s.key === key) ?? null;
        setStage(found);
      }
    } catch {
      // localStorage unavailable — fail silently
    }
    setReady(true);
  }, []);

  // Avoid hydration mismatch — render nothing until client-side read is done
  if (!ready) return null;

  if (!stage) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-card border border-dashed border-border bg-bg px-4 py-3">
        <div className="text-sm text-text-muted">
          🧭 <span className="font-medium text-text">Bạn đang ở giai đoạn nào?</span> — Chọn để
          xem hướng dẫn và công cụ phù hợp nhất.
        </div>
        <a
          href="/start"
          className="shrink-0 rounded-btn bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
        >
          Chọn ngay →
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-teal-50 px-4 py-3 dark:bg-teal-950/30">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal-700 text-xs text-white">
            🧭
          </span>
          <div className="min-w-0">
            <span className="text-sm font-bold text-text">Dành Riêng Cho Bạn</span>
            <span className="ml-2 text-[11px] text-text-muted">{stage.label}</span>
          </div>
        </div>
        <a href="/start" className="shrink-0 text-xs text-text-muted hover:text-primary">
          Đổi giai đoạn →
        </a>
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
        {stage.tools.slice(0, 4).map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="group flex flex-col items-center gap-1.5 px-3 py-4 text-center transition-colors hover:bg-teal-50 dark:hover:bg-teal-950/20"
          >
            <span className="text-xl leading-none">{tool.icon}</span>
            <span className="text-xs font-semibold text-text group-hover:text-teal-700 dark:group-hover:text-teal-300">
              {tool.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
