"use client";

import { useState } from "react";
import { HealthcareTabInsurance } from "./healthcare-tab-insurance";
import { HealthcareTabMedicaid } from "./healthcare-tab-medicaid";
import { HealthcareTabDoctor } from "./healthcare-tab-doctor";
import { HealthcareTabMedicine } from "./healthcare-tab-medicine";
import { HealthcareTabDental } from "./healthcare-tab-dental";

type TabKey = "insurance" | "medicaid" | "doctor" | "medicine" | "dental";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "insurance", label: "📋 Bảo Hiểm" },
  { key: "medicaid", label: "🏛️ Medicaid" },
  { key: "doctor", label: "👨‍⚕️ Tìm Bác Sĩ" },
  { key: "medicine", label: "💊 Thuốc" },
  { key: "dental", label: "🦷 Nha Khoa & Mắt" },
];

/**
 * Client component: 5-tab switcher for healthcare content. Ported from
 * healthcare.html's showTab()/.section JS — pure UI state, no calculators
 * or persisted data, so a simple useState swap replaces the original DOM
 * class-toggling. Tab bodies live in their own files (healthcare-tab-*.tsx)
 * to keep this switcher small.
 */
export function HealthcareTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("insurance");

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

      {activeTab === "insurance" && <HealthcareTabInsurance />}
      {activeTab === "medicaid" && <HealthcareTabMedicaid />}
      {activeTab === "doctor" && <HealthcareTabDoctor />}
      {activeTab === "medicine" && <HealthcareTabMedicine />}
      {activeTab === "dental" && <HealthcareTabDental />}
    </div>
  );
}
