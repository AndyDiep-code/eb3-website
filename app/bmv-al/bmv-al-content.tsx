"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { AL_QUESTIONS, AL_PASS_COUNT } from "./bmv-al-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật AL" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvAlContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      {/* Hero */}
      <h1 className="text-2xl font-bold text-text">🌶️ Ôn Thi Bằng Lái — Alabama (AL)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông Alabama · Thi thử có chấm điểm</p>

      {/* Stats row */}
      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "40", label: "Câu hỏi" },
          { n: "80%", label: "Điểm đậu (32/40)" },
          { n: "$36", label: "Lệ phí" },
          { n: "Alabama ALEA", label: "Cơ quan" },
        ].map((stat) => (
          <div key={stat.n} className="rounded-card border border-border bg-bg px-4 py-2 text-center">
            <div className="text-lg font-bold text-secondary">{stat.n}</div>
            <div className="text-xs text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
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

      {/* Tab: Thông Tin */}
      {tab === "info" && (
        <div>
          <div className="mb-3 rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
            ℹ️ Alabama — Koch Foods (Gadsden), Hãng Cá (Eutaw), chi phí sinh hoạt thấp nhất cả nước. Ít cộng đồng Việt nhưng nhiều cơ hội EB3. Bắt buộc mũ bảo hiểm xe máy cho tất cả. · Khí hậu nóng ẩm, mùa bão (hurricane) từ tháng 6-11 ở vùng ven biển — theo dõi dự báo thời tiết khi lái xe đường dài.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi Alabama</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Số câu:</span> 40 câu trắc nghiệm</li>
              <li><span className="text-text font-semibold">Điểm đậu:</span> 32/40 câu (80%)</li>
              <li><span className="text-text font-semibold">Lệ phí:</span> $36</li>
              <li><span className="text-text font-semibold">Cơ quan:</span> Alabama ALEA</li>
              <li><span className="text-text font-semibold">Website:</span> alea.gov</li>
              <li><span className="text-text font-semibold">Giấy tờ:</span> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng — Alabama</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 25 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> BẮT BUỘC cho TẤT CẢ người lái, bất kể tuổi — luật nghiêm nhất</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm texting khi lái cho tất cả tài xế (từ 2012)</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Chuyển làn hoặc giảm tốc đáng kể khi qua xe cứu thương dừng ven đường</li>
              <li><span className="text-text font-semibold">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 20 mph khi có đèn nhấp nháy hoặc trẻ em</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại Alabama</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Chu kỳ đổi bằng:</span> 4 năm</li>
              <li><span className="text-text font-semibold">Hạn chuyển bằng:</span> Nên đổi trong vòng 30-90 ngày sau khi định cư, liên hệ ALEA</li>
              <li><span className="text-text font-semibold">REAL ID:</span> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa Mỹ</li>
              <li><span className="text-text font-semibold">Website chính thức:</span> alea.gov</li>
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

      {/* Tab: Luật GT */}
      {tab === "rules" && (
        <div className="rounded-card border border-border bg-bg p-4">
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — Alabama</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
            <li><span className="text-text font-semibold">Tốc độ:</span> 25 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate</li>
            <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
            <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> BẮT BUỘC cho TẤT CẢ người lái, bất kể tuổi — luật nghiêm nhất</li>
            <li><span className="text-text font-semibold">Điện thoại:</span> Cấm texting khi lái cho tất cả tài xế (từ 2012)</li>
            <li><span className="text-text font-semibold">Move Over Law:</span> Chuyển làn hoặc giảm tốc đáng kể khi qua xe cứu thương dừng ven đường</li>
            <li><span className="text-text font-semibold">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy</li>
            <li><span className="text-text font-semibold">Khu trường học:</span> 20 mph khi có đèn nhấp nháy hoặc trẻ em</li>
          </ul>
        </div>
      )}

      {/* Tab: Thi Thử */}
      {tab === "quiz" && (
        <BmvQuizEngine questions={AL_QUESTIONS} passCount={AL_PASS_COUNT} />
      )}
    </div>
  );
}
