"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";
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
      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "phone" && <EssentialsTabPhone />}
      {activeTab === "car" && <EssentialsTabCar />}
      {activeTab === "shopping" && <EssentialsTabShopping />}
      {activeTab === "internet" && <EssentialsTabInternet />}
    </div>
  );
}
