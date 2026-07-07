"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";
import { AosTabComparison } from "./aos-tab-comparison";
import { AosTabMedicalExam } from "./aos-tab-medical-exam";
import { AosTabUscisInterview } from "./aos-tab-uscis-interview";
import { AosTabEadTimeline } from "./aos-tab-ead-timeline";

type TabKey = "comparison" | "medical-exam" | "uscis-interview" | "ead-timeline";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "comparison", label: "🔀 I-485 vs Lãnh Sự" },
  { key: "medical-exam", label: "🩺 Khám I-693" },
  { key: "uscis-interview", label: "🏢 Phỏng Vấn USCIS" },
  { key: "ead-timeline", label: "⏱️ EAD/AP Timeline" },
];

/**
 * Client component: 4-tab switcher for the AOS interview guide.
 * Ported from aos-interview-guide.html's showTab()/.tab-pane JS (legacy
 * line 283) — pure UI state, no calculators, so a simple useState swap
 * replaces the original DOM class-toggling. Same pattern as
 * app/ac21-portability/ac21-tabs.tsx.
 */
export function AosTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("comparison");

  return (
    <div>
      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "comparison" && <AosTabComparison />}
      {activeTab === "medical-exam" && <AosTabMedicalExam />}
      {activeTab === "uscis-interview" && <AosTabUscisInterview />}
      {activeTab === "ead-timeline" && <AosTabEadTimeline />}
    </div>
  );
}
