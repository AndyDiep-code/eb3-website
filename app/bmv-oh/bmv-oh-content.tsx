"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { OH_QUESTIONS, OH_PASS_COUNT } from "./bmv-oh-data";

type Tab = "info" | "rules" | "quiz";

const TABS = [
  { key: "info" as Tab, label: "📋 Thông Tin" },
  { key: "rules" as Tab, label: "📜 Luật OH" },
  { key: "quiz" as Tab, label: "🎯 Thi Thử" },
];

export function BmvOhContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="mx-auto max-w-3xl">
      {/* Hero */}
      <div className="rounded-card mb-4 p-5 text-center" style={{ background: "linear-gradient(135deg,#0c2340 0%,#0369a1 55%,#c2410c 100%)" }}>
        <h1 className="text-xl font-bold text-white">🎡 Ôn Thi Bằng Lái — Ohio (OH)</h1>
        <p className="mt-1 text-sm text-blue-200">Song ngữ Việt-Anh · Luật giao thông Ohio · Thi thử có chấm điểm</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {[{ n: "40", l: "Câu hỏi" }, { n: "75%", l: "Điểm đậu (30/40)" }, { n: "$23", l: "Lệ phí" }, { n: "Ohio BMV", l: "Cơ quan" }].map((s) => (
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

      {tab === "info" && (
        <div>
          <div className="mb-3 rounded-card border border-blue-800 bg-blue-950/40 p-3 text-xs text-blue-200 flex gap-2">
            <span className="text-base flex-shrink-0">ℹ️</span>
            <span>Ohio — Case Farms Processing (nhiều nhà máy chế biến gà), Labor Guys. Columbus có cộng đồng Việt đang phát triển. Chi phí sinh hoạt vừa phải. 4 mùa, OVI (không DUI). Tuyết dày do hiệu ứng hồ (lake-effect snow) gần Hồ Erie vào mùa đông — lái xe chậm và giữ khoảng cách xa hơn khi có tuyết.</span>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-2">📋 Thông tin kỳ thi</h3>
            <ul className="space-y-1">
              {[["Số câu:", "40 câu trắc nghiệm"], ["Điểm đậu:", "30/40 (75%)"], ["Lệ phí:", "$23"], ["Cơ quan:", "Ohio BMV — oplates.com"], ["Giấy tờ:", "Passport + thẻ xanh/EAD + bằng chứng địa chỉ"]].map(([k, v]) => (
                <li key={k} className="flex gap-2 text-xs text-text-muted border-b border-border pb-1 last:border-0 last:pb-0">
                  <span className="text-primary">›</span><span><strong className="text-text">{k}</strong> {v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-2">⚡ Quy tắc quan trọng</h3>
            <ul className="space-y-1">
              {[["Tốc độ:", "25 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate"], ["OVI (Operating Vehicle Impaired):", "Ohio dùng OVI thay vì DUI. BAC ≥0.08% người lớn · ≥0.02% dưới 21t"], ["Mũ bảo hiểm xe máy:", "Không bắt buộc với người từ 18t trở lên"], ["Move Over Law:", "Phải chuyển làn hoặc giảm tốc khi qua xe dừng ven đường"], ["Điện thoại:", "Cấm nhắn tin (texting) khi lái. Dưới 18t: cấm tất cả"], ["Khu trường học:", "20 mph khi có đèn nhấp nháy hoặc trẻ em"], ["Dây an toàn:", "Bắt buộc tất cả người trong xe"]].map(([k, v]) => (
                <li key={k} className="flex gap-2 text-xs text-text-muted border-b border-border pb-1 last:border-0 last:pb-0">
                  <span className="text-primary">›</span><span><strong className="text-text">{k}</strong> {v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-2">🪪 Đổi Bằng Lái &amp; REAL ID</h3>
            <ul className="space-y-1">
              {[["Chu kỳ đổi bằng:", "4 năm"], ["Hạn chuyển bằng:", "Nên đổi trong vòng 30-90 ngày sau khi định cư"], ["REAL ID:", "Nên đổi sang bằng lái có sao ★ để dùng cho chuyến bay nội địa"], ["Website:", "oplates.com"]].map(([k, v]) => (
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

      {tab === "rules" && (
        <div className="rounded-card border border-border bg-bg p-4">
          <h3 className="text-xs font-bold text-primary mb-2">📜 Tổng hợp luật — Ohio</h3>
          <ul className="space-y-1">
            {[["Tốc độ:", "25 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate"], ["OVI:", "Ohio dùng OVI thay vì DUI. BAC ≥0.08% người lớn · ≥0.02% dưới 21t"], ["Mũ bảo hiểm xe máy:", "Không bắt buộc với người từ 18t trở lên"], ["Move Over Law:", "Phải chuyển làn hoặc giảm tốc khi qua xe dừng ven đường"], ["Điện thoại:", "Cấm nhắn tin (texting) khi lái. Dưới 18t: cấm tất cả"], ["Khu trường học:", "20 mph khi có đèn nhấp nháy hoặc trẻ em"], ["Dây an toàn:", "Bắt buộc tất cả người trong xe"]].map(([k, v]) => (
              <li key={k} className="flex gap-2 text-xs text-text-muted border-b border-border pb-1 last:border-0 last:pb-0">
                <span className="text-primary">›</span><span><strong className="text-text">{k}</strong> {v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "quiz" && (
        <BmvQuizEngine questions={OH_QUESTIONS} passCount={OH_PASS_COUNT} />
      )}
    </div>
  );
}
