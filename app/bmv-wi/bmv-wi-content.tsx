"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { WI_QUESTIONS, WI_PASS_COUNT } from "./bmv-wi-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật WI" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvWIContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">🧀 Ôn Thi Bằng Lái — Wisconsin (WI)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông Wisconsin · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "50", label: "Câu hỏi" },
          { n: "40/50", label: "Điểm đậu (40/50)" },
          { n: "$35", label: "Lệ phí" },
          { n: "Wisconsin DMV", label: "Cơ quan" },
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
            ℹ️ Wisconsin — Wilderness Hotel, Chula Vista Resort, Stoughton Trailer, Abbyland Foods. Mùa đông cực lạnh, cần chuẩn bị kỹ! · Nên dùng lốp mùa đông, chú ý nai (deer) băng qua đường đặc biệt lúc chiều tối mùa thu.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi Wisconsin</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Số câu:</span> 50 câu trắc nghiệm</li>
              <li><span className="text-text font-semibold">Điểm đậu:</span> 40/50 (80%)</li>
              <li><span className="text-text font-semibold">Lệ phí:</span> $35</li>
              <li><span className="text-text font-semibold">Cơ quan:</span> Wisconsin DMV — wisconsindmv.gov</li>
              <li><span className="text-text font-semibold">Giấy tờ:</span> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng — Wisconsin</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">OWI (DUI):</span> Wisconsin gọi là OWI thay vì DUI. BAC ≥0.08% người lớn · ≥0.00% dưới 21t (zero tolerance)</li>
              <li><span className="text-text font-semibold">Tốc độ:</span> 25 mph khu dân cư · 55 mph highway nông thôn · 65 mph state highway · 70 mph interstate</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Không bắt buộc với người 18t trở lên, nhưng strongly recommended</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc 20 mph khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Tất cả tài xế: cấm cầm điện thoại khi lái · Tài xế mới (probationary): cấm tuyệt đối</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 15 mph khi có đèn nhấp nháy hoặc trẻ em</li>
              <li><span className="text-text font-semibold">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy trừ khi có dải phân cách</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại Wisconsin</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Chu kỳ đổi bằng:</span> 8 năm, KHÔNG có thời gian gia hạn sau khi hết hạn</li>
              <li><span className="text-text font-semibold">Hạn chuyển bằng:</span> 60 ngày sau khi định cư tại Wisconsin — bắt buộc đổi bằng WI</li>
              <li><span className="text-text font-semibold">REAL ID:</span> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa Mỹ</li>
              <li><span className="text-text font-semibold">Website chính thức:</span> wisconsindmv.gov</li>
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
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — Wisconsin</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">OWI (DUI):</span> Wisconsin gọi là OWI thay vì DUI. BAC ≥0.08% người lớn · ≥0.00% dưới 21t (zero tolerance)</li>
              <li><span className="text-text font-semibold">Tốc độ:</span> 25 mph khu dân cư · 55 mph highway nông thôn · 65 mph state highway · 70 mph interstate</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Không bắt buộc với người 18t trở lên, nhưng strongly recommended</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc 20 mph khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Tất cả tài xế: cấm cầm điện thoại khi lái · Tài xế mới (probationary): cấm tuyệt đối</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 15 mph khi có đèn nhấp nháy hoặc trẻ em</li>
              <li><span className="text-text font-semibold">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy trừ khi có dải phân cách</li>
          </ul>
        </div>
      )}

      {tab === "quiz" && (
        <BmvQuizEngine questions={WI_QUESTIONS} passCount={WI_PASS_COUNT} />
      )}
    </div>
  );
}
