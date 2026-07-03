"use client";

import { useState } from "react";
import { AcaTabMarketplace } from "./aca-tab-marketplace";
import { AcaTabMedicaid } from "./aca-tab-medicaid";
import { AcaTabPublicCharge } from "./aca-tab-public-charge";
import { AcaTabChip } from "./aca-tab-chip";

type TabKey = "marketplace" | "medicaid" | "publiccharge" | "chip";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "marketplace", label: "📋 ACA Marketplace" },
  { key: "medicaid", label: "🏛️ Medicaid/CHIP" },
  { key: "publiccharge", label: "⚖️ Public Charge" },
  { key: "chip", label: "👶 CHIP Cho Con" },
];

/**
 * Client component: 4-tab switcher for ACA & Medicaid guide content.
 * Ported from aca-medicaid-guide.html's showTab()/.tab-pane JS — pure UI
 * state, no calculators or persisted data, so a simple useState swap
 * replaces the original DOM class-toggling. Tab bodies live in their own
 * files (aca-tab-*.tsx) to keep this switcher small.
 */
export function AcaMedicaidTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("marketplace");

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

      {activeTab === "marketplace" && <AcaTabMarketplace />}
      {activeTab === "medicaid" && <AcaTabMedicaid />}
      {activeTab === "publiccharge" && <AcaTabPublicCharge />}
      {activeTab === "chip" && <AcaTabChip />}
    </div>
  );
}
