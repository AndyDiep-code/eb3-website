"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { NV_QUESTIONS, NV_PASS_COUNT } from "./bmv-nv-data";

type Tab = "info" | "rules" | "quiz";

const TABS = [
  { key: "info" as Tab, label: "📋 Thông Tin" },
  { key: "rules" as Tab, label: "📜 Luật NV" },
  { key: "quiz" as Tab, label: "🎯 Thi Thử" },
];

export function BmvNvContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      {/* Hero */}
      <div className="rounded-card mb-4 p-5 text-center" style={{ background: "linear-gradient(135deg,#0f0828 0%,#7c3aed 55%,#c2410c 100%)" }}>
        <h1 className="text-xl font-bold text-white">🎰 Ôn Thi Bằng Lái — Nevada (NV)</h1>
        <p className="mt-1 text-sm text-blue-200">Song ngữ Việt-Anh · Luật giao thông Nevada · Thi thử chấm điểm</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {[{ n: "50", l: "Câu hỏi" }, { n: "80%", l: "Điểm đậu (40/50)" }, { n: "$25", l: "Lệ phí" }, { n: "Nevada DMV", l: "Cơ quan" }].map((s) => (
            <div key={s.n} className="rounded-lg px-3 py-1.5 text-center" style={{ background: "rgba(255,255,255,.15)" }}>
              <div className="text-base font-bold text-yellow-300">{s.n}</div>
              <div className="text-xs text-blue-200">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="/dmv" className="mb-4 inline-flex items-center gap-1 rounded-btn border border-border px-3 py-1.5 text-xs text-primary hover:opacity-80">
        ← Quay lại chọn tiểu bang
      </a>

      {/* Tab bar */}
      <div className="mb-4 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1 border-b border-border min-w-max sm:min-w-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={`whitespace-nowrap px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors ${tab === t.key ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info tab */}
      {tab === "info" && (
        <div>
          <div className="mb-3 rounded-card border border-blue-800 bg-blue-950/40 p-3 text-xs text-blue-200 flex gap-2">
            <span className="text-base flex-shrink-0">ℹ️</span>
            <span>Nevada (Reno) — Labor Guys (Reno), nhiều hãng logistics. KHÔNG CÓ THUẾ THU NHẬP tiểu bang! Reno khác Las Vegas — thành phố nhỏ hơn, yên tĩnh hơn. Mùa đông có tuyết vùng cao. Mùa hè nắng nóng cực độ ở vùng sa mạc — kiểm tra nước/lốp xe trước khi lái đường dài.</span>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-2">📋 Thông tin kỳ thi</h3>
            <ul className="space-y-1">
              {[["Số câu:", "50 câu trắc nghiệm"], ["Điểm đậu:", "40/50 (80%)"], ["Lệ phí:", "$25"], ["Cơ quan:", "Nevada DMV — dmv.nv.gov"], ["Giấy tờ:", "Passport + thẻ xanh/EAD + bằng chứng địa chỉ"]].map(([k, v]) => (
                <li key={k} className="flex gap-2 text-xs text-text-muted border-b border-border pb-1 last:border-0 last:pb-0">
                  <span className="text-primary">›</span><span><strong className="text-text">{k}</strong> {v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-2">⚡ Quy tắc quan trọng</h3>
            <ul className="space-y-1">
              {[["Tốc độ:", "25 mph khu đô thị · 70 mph highway nông thôn · 80 mph một số interstate"], ["DUI:", "BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL"], ["Mũ bảo hiểm xe máy:", "BẮT BUỘC cho TẤT CẢ người lái và hành khách (nghiêm)"], ["Hands-Free Law:", "Cấm cầm điện thoại khi lái · Phải dùng hands-free"], ["Move Over Law:", "Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường"], ["Không có thuế thu nhập tiểu bang!", ""], ["Khu trường học:", "15 mph khi đèn nhấp nháy hoặc trẻ em"]].map(([k, v]) => (
                <li key={k} className="flex gap-2 text-xs text-text-muted border-b border-border pb-1 last:border-0 last:pb-0">
                  <span className="text-primary">›</span><span><strong className="text-text">{k}</strong> {v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-2">🪪 Đổi Bằng Lái &amp; REAL ID</h3>
            <ul className="space-y-1">
              {[["Chu kỳ đổi bằng:", "8 năm"], ["Hạn chuyển bằng:", "Nên đổi trong vòng 30-90 ngày sau khi định cư"], ["REAL ID:", "Nên đổi sang bằng lái có sao ★ để dùng cho chuyến bay nội địa"], ["Website:", "dmv.nv.gov"]].map(([k, v]) => (
                <li key={k} className="flex gap-2 text-xs text-text-muted border-b border-border pb-1 last:border-0 last:pb-0">
                  <span className="text-primary">›</span><span><strong className="text-text">{k}</strong> {v}</span>
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={() => setTab("quiz")} className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            🎯 Bắt đầu thi thử →
          </button>
        </div>
      )}

      {/* Rules tab */}
      {tab === "rules" && (
        <div className="rounded-card border border-border bg-bg p-4">
          <h3 className="text-xs font-bold text-primary mb-2">📜 Tổng hợp luật — Nevada</h3>
          <ul className="space-y-1">
            {[["Tốc độ:", "25 mph khu đô thị · 70 mph highway nông thôn · 80 mph một số interstate"], ["DUI:", "BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL"], ["Mũ bảo hiểm xe máy:", "BẮT BUỘC cho TẤT CẢ người lái và hành khách (nghiêm)"], ["Hands-Free Law:", "Cấm cầm điện thoại khi lái · Phải dùng hands-free"], ["Move Over Law:", "Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường"], ["Không có thuế thu nhập tiểu bang!", ""], ["Khu trường học:", "15 mph khi đèn nhấp nháy hoặc trẻ em"]].map(([k, v]) => (
              <li key={k} className="flex gap-2 text-xs text-text-muted border-b border-border pb-1 last:border-0 last:pb-0">
                <span className="text-primary">›</span><span><strong className="text-text">{k}</strong> {v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz tab */}
      {tab === "quiz" && (
        <BmvQuizEngine questions={NV_QUESTIONS} passCount={NV_PASS_COUNT} />
      )}
    </div>
  );
}
