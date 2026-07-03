"use client";

import { useState } from "react";
import { EssentialsTabPhone } from "./essentials-tab-phone";
import { EssentialsTabCar } from "./essentials-tab-car";
import { EssentialsTabShopping } from "./essentials-tab-shopping";
import { EssentialsTabInternet } from "./essentials-tab-internet";

type TabKey = "phone" | "car" | "shopping" | "internet";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "phone", label: "📱 Điện Thoại" },
  { key: "car", label: "🚗 Xe & Đi Lại" },
  { key: "shopping", label: "🛒 Mua Sắm" },
  { key: "internet", label: "🌐 Internet & Apps" },
];

/**
 * Client component: 4-tab switcher for essentials content. Ported from
 * essentials.html's showTab()/.section/.hero-tab-btn JS (and the `tg()`
 * mobile-sidebar toggle, now handled globally by <Layout>) — pure UI
 * state, so a simple useState swap replaces the original DOM
 * class-toggling. Tab bodies live in their own files (essentials-tab-*.tsx)
 * to keep this switcher small.
 */
export function EssentialsTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("phone");

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
                ? "border border-accent bg-accent/10 text-accent"
                : "border border-border bg-bg text-text-muted hover:border-accent/50 hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "phone" && <EssentialsTabPhone />}
      {activeTab === "car" && <EssentialsTabCar />}
      {activeTab === "shopping" && <EssentialsTabShopping />}
      {activeTab === "internet" && <EssentialsTabInternet />}
    </div>
  );
}
