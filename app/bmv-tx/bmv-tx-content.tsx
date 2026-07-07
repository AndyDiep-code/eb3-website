"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { TX_QUESTIONS, TX_PASS_COUNT } from "./bmv-tx-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật TX" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvTXContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">⭐ Ôn Thi Bằng Lái — Texas (TX)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông Texas · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "30", label: "Câu hỏi" },
          { n: "21/30", label: "Điểm đậu (21/30)" },
          { n: "$16+$33", label: "Lệ phí" },
          { n: "Texas DPS", label: "Cơ quan" },
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
            ℹ️ Texas — SnD Manufacturing, Sentech Services (Dallas), Labor Guys. KHÔNG CÓ THUẾ THU NHẬP tiểu bang! Cộng đồng Việt Houston (100,000+) và Dallas (40,000+). · Bang rất rộng; mùa hè nắng nóng cực độ, đôi khi có băng giá bất ngờ mùa đông.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi Texas</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Số câu:</span> 30 câu trắc nghiệm</li>
              <li><span className="text-text font-semibold">Điểm đậu:</span> 21/30 (70%)</li>
              <li><span className="text-text font-semibold">Lệ phí:</span> $16+$33</li>
              <li><span className="text-text font-semibold">Cơ quan:</span> Texas DPS — dps.texas.gov</li>
              <li><span className="text-text font-semibold">Giấy tờ:</span> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng — Texas</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 30 mph khu đô thị · 75 mph interstate · Một số đoạn I-10 lên 85 mph</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Bắt buộc cho dưới 21t · Người 21+ được miễn nếu có bảo hiểm $10K+</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc cho xe cứu hộ/cảnh sát</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm texting while driving từ 2017</li>
              <li><span className="text-text font-semibold">Dây an toàn:</span> Bắt buộc tất cả người trong xe — phạt $200+</li>
              <li><span className="text-text font-semibold">Thuế thu nhập:</span> KHÔNG CÓ thuế thu nhập tiểu bang</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại Texas</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Chu kỳ đổi bằng:</span> 8 năm, KHÔNG có thời gian gia hạn sau khi hết hạn</li>
              <li><span className="text-text font-semibold">Hạn chuyển bằng:</span> 90 ngày sau khi định cư tại Texas — bắt buộc đổi bằng TX</li>
              <li><span className="text-text font-semibold">REAL ID:</span> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa Mỹ</li>
              <li><span className="text-text font-semibold">Website chính thức:</span> dps.texas.gov</li>
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
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — Texas</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 30 mph khu đô thị · 75 mph interstate · Một số đoạn I-10 lên 85 mph</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Bắt buộc cho dưới 21t · Người 21+ được miễn nếu có bảo hiểm $10K+</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc cho xe cứu hộ/cảnh sát</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm texting while driving từ 2017</li>
              <li><span className="text-text font-semibold">Dây an toàn:</span> Bắt buộc tất cả người trong xe — phạt $200+</li>
              <li><span className="text-text font-semibold">Thuế thu nhập:</span> KHÔNG CÓ thuế thu nhập tiểu bang</li>
          </ul>
        </div>
      )}

      {tab === "quiz" && (
        <BmvQuizEngine questions={TX_QUESTIONS} passCount={TX_PASS_COUNT} />
      )}
    </div>
  );
}
