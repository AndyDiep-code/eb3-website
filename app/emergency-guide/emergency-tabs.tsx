"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";
import { EmergencyTabPolice } from "./emergency-tab-police";
import { EmergencyTabHospital } from "./emergency-tab-hospital";
import { EmergencyTab911 } from "./emergency-tab-911";
import { EmergencyTabCard } from "./emergency-tab-card";

type TabKey = "police" | "hospital" | "911" | "card";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "police", label: "🚔 Cảnh Sát / Traffic Stop" },
  { key: "hospital", label: "🏥 Bệnh Viện / ER" },
  { key: "911", label: "📞 Gọi 911" },
  { key: "card", label: "🪪 Thẻ Khẩn Cấp" },
];

/**
 * Client component: 4-tab switcher for emergency-guide content. Ported
 * from emergency-guide.html's showTab()/.tab-pane JS — pure UI state, no
 * calculators or persisted data, so a simple useState swap replaces the
 * original DOM class-toggling. Tab bodies live in their own files
 * (emergency-tab-*.tsx) to keep this switcher small.
 */
export function EmergencyTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("police");

  return (
    <div>
      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "police" && <EmergencyTabPolice />}
      {activeTab === "hospital" && <EmergencyTabHospital />}
      {activeTab === "911" && <EmergencyTab911 />}
      {activeTab === "card" && <EmergencyTabCard />}
    </div>
  );
}
