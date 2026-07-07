"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";
import { Ac21TabBasics } from "./ac21-tab-basics";
import { Ac21TabSimilar } from "./ac21-tab-similar";
import { Ac21TabProcess } from "./ac21-tab-process";
import { Ac21TabProblems } from "./ac21-tab-problems";

type TabKey = "basics" | "similar" | "process" | "problems";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "basics", label: "📋 AC21 Là Gì" },
  { key: "similar", label: "🔍 Việc \"Tương Tự\"" },
  { key: "process", label: "📝 Quy Trình Đổi Việc" },
  { key: "problems", label: "⚠️ Khi Employer Có Vấn Đề" },
];

/**
 * Client component: 4-tab switcher for AC21 portability content.
 * Ported from ac21-portability.html's showTab()/.tab-pane JS — pure UI
 * state, no calculators or persisted data, so a simple useState swap
 * replaces the original DOM class-toggling. Tab bodies live in their own
 * files (ac21-tab-*.tsx) to keep this switcher small.
 */
export function Ac21Tabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("basics");

  return (
    <div>
      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "basics" && <Ac21TabBasics />}
      {activeTab === "similar" && <Ac21TabSimilar />}
      {activeTab === "process" && <Ac21TabProcess />}
      {activeTab === "problems" && <Ac21TabProblems />}
    </div>
  );
}
