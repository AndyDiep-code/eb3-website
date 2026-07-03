"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { AR_QUESTIONS, AR_PASS_COUNT } from "./bmv-ar-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật AR" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvArContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-text">🐔 Ôn Thi Bằng Lái — Arkansas (AR)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt-Anh · Luật giao thông Arkansas · Thi thử chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "25", label: "Câu hỏi" },
          { n: "80%", label: "Điểm đậu (20/25)" },
          { n: "$22", label: "Lệ phí" },
          { n: "Arkansas DFA", label: "Cơ quan" },
        ].map((stat) => (
          <div key={stat.n} className="rounded-card border border-border bg-bg px-4 py-2 text-center">
            <div className="text-lg font-bold text-secondary">{stat.n}</div>
            <div className="text-xs text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-4 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1 border-b border-border min-w-max sm:min-w-0 sm:flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={`whitespace-nowrap px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                tab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "info" && (
        <div>
          <div className="mb-3 rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
            ℹ️ Arkansas — Peco Foods (gia cầm), Koch Foods AR, Tyson Foods. Chi phí sinh hoạt rất thấp. Thiên nhiên đẹp. Ít cộng đồng Việt. Interstate có thể lên đến 75 mph. · Mùa xuân có nguy cơ bão lốc xoáy (tornado); miền bắc bang có thể có băng giá (ice) vào mùa đông.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Số câu:</span> 25 câu trắc nghiệm</li>
              <li><span className="text-text font-semibold">Điểm đậu:</span> 20/25 (80%)</li>
              <li><span className="text-text font-semibold">Lệ phí:</span> $22</li>
              <li><span className="text-text font-semibold">Cơ quan:</span> Arkansas DFA — mvs.ar.gov</li>
              <li><span className="text-text font-semibold">Giấy tờ:</span> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 30 mph khu dân cư · 65 mph highway · 75 mph một số interstate</li>
              <li><span className="text-text font-semibold">DWI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Bắt buộc cho dưới 21t và người có bằng xe máy dưới 1 năm</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm nhắn tin và handheld khi lái cho tất cả</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 20 mph khi đèn nhấp nháy</li>
              <li><span className="text-text font-semibold">Dây an toàn:</span> Bắt buộc tất cả người trong xe</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại Arkansas</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Chu kỳ đổi bằng:</span> 4 hoặc 8 năm (tùy lựa chọn)</li>
              <li><span className="text-text font-semibold">Hạn chuyển bằng:</span> Nên đổi trong vòng 30-90 ngày sau khi định cư, liên hệ Arkansas DFA</li>
              <li><span className="text-text font-semibold">REAL ID:</span> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa Mỹ</li>
              <li><span className="text-text font-semibold">Website chính thức:</span> mvs.ar.gov</li>
            </ul>
          </div>
          <button
            type="button"
            onClick={() => setTab("quiz")}
            className="rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            🎯 Bắt đầu thi thử →
          </button>
        </div>
      )}

      {tab === "rules" && (
        <div className="rounded-card border border-border bg-bg p-4">
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — Arkansas</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
            <li><span className="text-text font-semibold">Tốc độ:</span> 30 mph khu dân cư · 65 mph highway · 75 mph một số interstate</li>
            <li><span className="text-text font-semibold">DWI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
            <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Bắt buộc cho dưới 21t và người có bằng xe máy dưới 1 năm</li>
            <li><span className="text-text font-semibold">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
            <li><span className="text-text font-semibold">Điện thoại:</span> Cấm nhắn tin và handheld khi lái cho tất cả</li>
            <li><span className="text-text font-semibold">Khu trường học:</span> 20 mph khi đèn nhấp nháy</li>
            <li><span className="text-text font-semibold">Dây an toàn:</span> Bắt buộc tất cả người trong xe</li>
          </ul>
        </div>
      )}

      {tab === "quiz" && (
        <BmvQuizEngine questions={AR_QUESTIONS} passCount={AR_PASS_COUNT} />
      )}
    </div>
  );
}
