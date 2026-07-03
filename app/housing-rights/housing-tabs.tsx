"use client";

import { useState } from "react";
import { HousingTabItin } from "./housing-tab-itin";
import { HousingTabLease } from "./housing-tab-lease";
import { HousingTabRights } from "./housing-tab-rights";
import { HousingTabIssues } from "./housing-tab-issues";

type TabKey = "itin" | "lease" | "rights" | "issues";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "itin", label: "📋 Thuê Nhà Với ITIN" },
  { key: "lease", label: "📄 Đọc Hợp Đồng" },
  { key: "rights", label: "⚖️ Quyền Theo Bang" },
  { key: "issues", label: "🔧 Khi Có Vấn Đề" },
];

/**
 * Client component: 4-tab switcher for housing-rights content. Ported
 * from housing-rights.html's showTab()/.tab-pane JS — pure UI state, no
 * calculators or persisted data, so a simple useState swap replaces the
 * original DOM class-toggling. Tab bodies live in their own files
 * (housing-tab-*.tsx) to keep this switcher small.
 */
export function HousingTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("itin");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            aria-pressed={activeTab === tab.key}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === tab.key
                ? "border border-primary bg-primary/10 text-primary"
                : "border border-border bg-bg text-text-muted hover:border-primary/50 hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "itin" && <HousingTabItin />}
      {activeTab === "lease" && <HousingTabLease />}
      {activeTab === "rights" && <HousingTabRights />}
      {activeTab === "issues" && <HousingTabIssues />}
    </div>
  );
}
