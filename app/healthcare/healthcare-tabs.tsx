"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";
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
      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "insurance" && <HealthcareTabInsurance />}
      {activeTab === "medicaid" && <HealthcareTabMedicaid />}
      {activeTab === "doctor" && <HealthcareTabDoctor />}
      {activeTab === "medicine" && <HealthcareTabMedicine />}
      {activeTab === "dental" && <HealthcareTabDental />}
    </div>
  );
}
