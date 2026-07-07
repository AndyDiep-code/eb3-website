"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { NC_QUESTIONS, NC_PASS_COUNT } from "./bmv-nc-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật NC" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvNCContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">🌲 Ôn Thi Bằng Lái — North Carolina (NC)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông North Carolina · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "40", label: "Câu hỏi" },
          { n: "30/40", label: "Điểm đậu (30/40)" },
          { n: "$18", label: "Lệ phí" },
          { n: "NC DMV (NCDOT)", label: "Cơ quan" },
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
            ℹ️ North Carolina — Wayne Farms (Dobson), Case Farms, Defender Service, RGA Enterprise. 4 mùa đẹp, kinh tế phát triển nhanh. · Vùng núi phía tây có thể có băng giá mùa đông; vùng ven biển có mùa bão (hurricane) từ tháng 6-11.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi North Carolina</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Số câu:</span> 40 câu trắc nghiệm</li>
              <li><span className="text-text font-semibold">Điểm đậu:</span> 30/40 (75%)</li>
              <li><span className="text-text font-semibold">Lệ phí:</span> $18</li>
              <li><span className="text-text font-semibold">Cơ quan:</span> NC DMV (NCDOT) — ncdot.gov/dmv</li>
              <li><span className="text-text font-semibold">Giấy tờ:</span> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng — North Carolina</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">DWI (DUI):</span> NC gọi là DWI. BAC ≥0.08% người lớn · ≥0.04% CDL · Bất kỳ BAC nào cho dưới 21t</li>
              <li><span className="text-text font-semibold">Tốc độ:</span> 35 mph khu đô thị · 55 mph highway nông thôn · 70 mph interstate</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm dùng điện thoại với tài xế dưới 18t · Cấm texting mọi tài xế · Người 18+ được dùng hands-free</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Bắt buộc cho tất cả người lái và hành khách</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 25 mph khi có đèn nhấp nháy hoặc trẻ em</li>
              <li><span className="text-text font-semibold">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại North Carolina</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Chu kỳ đổi bằng:</span> 5-8 năm tùy độ tuổi khi cấp bằng</li>
              <li><span className="text-text font-semibold">Hạn chuyển bằng:</span> 60 ngày sau khi định cư tại North Carolina — bắt buộc đổi bằng NC</li>
              <li><span className="text-text font-semibold">REAL ID:</span> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa Mỹ</li>
              <li><span className="text-text font-semibold">Website chính thức:</span> ncdot.gov/dmv</li>
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
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — North Carolina</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">DWI (DUI):</span> NC gọi là DWI. BAC ≥0.08% người lớn · ≥0.04% CDL · Bất kỳ BAC nào cho dưới 21t</li>
              <li><span className="text-text font-semibold">Tốc độ:</span> 35 mph khu đô thị · 55 mph highway nông thôn · 70 mph interstate</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm dùng điện thoại với tài xế dưới 18t · Cấm texting mọi tài xế · Người 18+ được dùng hands-free</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Bắt buộc cho tất cả người lái và hành khách</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 25 mph khi có đèn nhấp nháy hoặc trẻ em</li>
              <li><span className="text-text font-semibold">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy</li>
          </ul>
        </div>
      )}

      {tab === "quiz" && (
        <BmvQuizEngine questions={NC_QUESTIONS} passCount={NC_PASS_COUNT} />
      )}
    </div>
  );
}
