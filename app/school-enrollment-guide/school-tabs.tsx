"use client";

import { useState } from "react";
import { SchoolTabDocs } from "./school-tab-docs";
import { SchoolTabAge } from "./school-tab-age";
import { SchoolTabEsl } from "./school-tab-esl";
import { SchoolTabRecords } from "./school-tab-records";

type TabKey = "docs" | "age" | "esl" | "records";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "docs", label: "📄 Giấy Tờ Cần Chuẩn Bị" },
  { key: "age", label: "🎂 Tuổi & Lớp Học" },
  { key: "esl", label: "🗣️ Hỗ Trợ ESL/ELL" },
  { key: "records", label: "📜 Hồ Sơ Từ Việt Nam" },
];

/**
 * Client component: 4-tab switcher for school-enrollment-guide content.
 * Ported from school-enrollment-guide.html's showTab()/.tab-pane JS
 * (and the toggleSidebar() mobile toggle, now handled globally by
 * <Layout>) — pure UI state, so a simple useState swap replaces the
 * original DOM class-toggling. Tab bodies live in their own files
 * (school-tab-*.tsx) to keep this switcher small.
 */
export function SchoolTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("docs");

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

      {activeTab === "docs" && <SchoolTabDocs />}
      {activeTab === "age" && <SchoolTabAge />}
      {activeTab === "esl" && <SchoolTabEsl />}
      {activeTab === "records" && <SchoolTabRecords />}
    </div>
  );
}
