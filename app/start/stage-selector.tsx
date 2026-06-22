"use client";

import { useState } from "react";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { JOURNEY_STAGE_STORAGE_KEY, STAGES } from "./stage-tools";

/**
 * Client component: 6-card branching question + routed-result render.
 * Selecting a card swaps in 4 tool links via React state (no navigation),
 * persists the choice to localStorage, and offers an expand to the full
 * sidebar catalog ("Xem toàn bộ danh mục").
 */
export function StageSelector() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showFullCatalog, setShowFullCatalog] = useState(false);

  function handleSelect(key: string) {
    setSelectedKey(key);
    try {
      window.localStorage.setItem(JOURNEY_STAGE_STORAGE_KEY, key);
    } catch {
      // localStorage unavailable (private browsing, quota) — selection still
      // works for this session, just won't persist across reloads.
    }
  }

  const selectedStage = STAGES.find((stage) => stage.key === selectedKey);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {STAGES.map((stage) => (
          <button
            key={stage.key}
            type="button"
            onClick={() => handleSelect(stage.key)}
            aria-pressed={selectedKey === stage.key}
            className={`rounded-card border p-4 text-left text-sm font-medium transition-colors ${
              selectedKey === stage.key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-bg text-text hover:border-primary hover:bg-bg-alt"
            }`}
          >
            {stage.label}
          </button>
        ))}
      </div>

      {selectedStage && (
        <div className="rounded-card border border-border bg-bg p-4">
          <p className="mb-3 text-sm font-semibold text-text">
            Gợi ý cho bạn:
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selectedStage.tools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-2 rounded-btn border border-border px-3 py-2 text-sm text-text hover:bg-bg-alt"
              >
                <span aria-hidden="true">{tool.icon}</span>
                <span>{tool.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => setShowFullCatalog((current) => !current)}
          className="text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          {showFullCatalog ? "Ẩn danh mục đầy đủ" : "Xem toàn bộ danh mục →"}
        </button>
      </div>

      {showFullCatalog && (
        <div className="rounded-card border border-border bg-bg p-4">
          {SIDEBAR_GROUPS.map((group) => (
            <div key={group.label} className="mb-4 last:mb-0">
              <p className="mb-2 text-sm font-semibold text-text">
                {group.label}
              </p>
              <ul className="flex flex-col gap-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block rounded-btn px-2 py-1 text-sm text-text-muted hover:bg-bg-alt hover:text-text"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
