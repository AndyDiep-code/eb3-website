"use client";

// Client component: 6-tab switcher for Indiana BMV content.
// Tab bodies live in their own files to keep this under 200 lines.

import { useState } from "react";
import { BmvTabOverview } from "./bmv-tab-overview";
import { BmvTabVocab } from "./bmv-tab-vocab";
import { BmvTabRules } from "./bmv-tab-rules";
import { BmvTabSigns } from "./bmv-tab-signs";
import { BmvTabQuiz } from "./bmv-tab-quiz";
import { BmvTabOtherStates } from "./bmv-tab-other-states";

type TabKey = "overview" | "vocab" | "rules" | "signs" | "quiz" | "other";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "📋 Tổng Quan" },
  { key: "vocab", label: "📖 Từ Vựng" },
  { key: "rules", label: "📜 Luật GT" },
  { key: "signs", label: "🚦 Biển Báo" },
  { key: "quiz", label: "🎯 Thi Thử" },
  { key: "other", label: "🗺️ Các Bang Khác" },
];

export function BmvTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div>
      {/* Tab bar — scrollable on mobile */}
      <div className="mb-4 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1 border-b border-border min-w-max sm:min-w-0 sm:flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              className={`whitespace-nowrap px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "overview" && <BmvTabOverview />}
      {activeTab === "vocab" && <BmvTabVocab />}
      {activeTab === "rules" && <BmvTabRules />}
      {activeTab === "signs" && <BmvTabSigns />}
      {activeTab === "quiz" && <BmvTabQuiz />}
      {activeTab === "other" && <BmvTabOtherStates />}
    </div>
  );
}
