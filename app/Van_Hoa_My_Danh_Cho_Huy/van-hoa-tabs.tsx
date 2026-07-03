"use client";

import { useState } from "react";
import { VanHoaTabGiaoTiep } from "./van-hoa-tab-giaotiep";
import { VanHoaTabCongViec } from "./van-hoa-tab-congviec";
import { VanHoaTabHocDuong } from "./van-hoa-tab-hocduong";
import { VanHoaTabLeNghi } from "./van-hoa-tab-lenhgi";
import { VanHoaTabCuocSong } from "./van-hoa-tab-cuocsong";
import { VanHoaTabTaiChinh } from "./van-hoa-tab-taichinh";
import { VanHoaTabChecklist } from "./van-hoa-tab-checklist";

type TabKey =
  | "giaotiep"
  | "congviec"
  | "hocduong"
  | "lenhgi"
  | "cuocsong"
  | "taichinh"
  | "checklist";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "giaotiep", label: "💬 Giao tiếp" },
  { key: "congviec", label: "🏭 Công việc" },
  { key: "hocduong", label: "📚 Học đường" },
  { key: "lenhgi", label: "🎭 Lễ nghi" },
  { key: "cuocsong", label: "🏠 Cuộc sống" },
  { key: "taichinh", label: "💰 Tài chính" },
  { key: "checklist", label: "✅ Checklist" },
];

/**
 * Client component: 7-tab switcher for the "Văn Hóa Mỹ" guide.
 * Ported from Van_Hoa_My_Danh_Cho_Huy.html's show()/.section JS — pure UI
 * state, no calculators, so a simple useState swap replaces the original
 * DOM class-toggling. Each tab's content lives in its own file
 * (van-hoa-tab-*.tsx) to keep this switcher small.
 */
export function VanHoaTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("giaotiep");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 border-b border-border pb-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            aria-pressed={activeTab === tab.key}
            className={`rounded-t-btn px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-white"
                : "bg-bg-alt text-text-muted hover:bg-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "giaotiep" && <VanHoaTabGiaoTiep />}
      {activeTab === "congviec" && <VanHoaTabCongViec />}
      {activeTab === "hocduong" && <VanHoaTabHocDuong />}
      {activeTab === "lenhgi" && <VanHoaTabLeNghi />}
      {activeTab === "cuocsong" && <VanHoaTabCuocSong />}
      {activeTab === "taichinh" && <VanHoaTabTaiChinh />}
      {activeTab === "checklist" && <VanHoaTabChecklist />}
    </div>
  );
}
