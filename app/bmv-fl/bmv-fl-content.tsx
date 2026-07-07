"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { FL_QUESTIONS, FL_PASS_COUNT } from "./bmv-fl-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật FL" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvFLContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">🌴 Ôn Thi Bằng Lái — Florida (FL)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông Florida · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "50", label: "Câu hỏi" },
          { n: "40/50", label: "Điểm đậu (40/50)" },
          { n: "$48", label: "Lệ phí" },
          { n: "DHSMV", label: "Cơ quan" },
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
            ℹ️ Florida — không có thuế thu nhập tiểu bang! Cộng đồng Việt tại Orlando, Jacksonville, Miami, Tampa rất phát triển. Nhiều hãng EB3: Rassy Logistics, Ocean Air, Nature's Way Farm. · Mùa bão (hurricane) từ tháng 6-11 và mưa nhiệt đới bất ngờ vào buổi chiều mùa hè.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi Florida</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Số câu:</span> 50 câu trắc nghiệm</li>
              <li><span className="text-text font-semibold">Điểm đậu:</span> 40/50 (80%)</li>
              <li><span className="text-text font-semibold">Lệ phí:</span> $48</li>
              <li><span className="text-text font-semibold">Cơ quan:</span> DHSMV — flhsmv.gov</li>
              <li><span className="text-text font-semibold">Giấy tờ:</span> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng — Florida</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 30 mph khu dân cư · 70 mph interstate nông thôn · 65 mph interstate đô thị</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Bắt buộc dưới 21 tuổi · Người 21+ có thể không đội nếu có bảo hiểm ≥$10,000</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm cầm tay khi lái (kể cả dừng đèn đỏ) · Tuyệt đối cấm trong school/work zone</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 20 mph khi có đèn nhấp nháy</li>
              <li><span className="text-text font-semibold">Dây an toàn:</span> Bắt buộc tất cả người trong xe</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại Florida</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Chu kỳ đổi bằng:</span> 8 năm</li>
              <li><span className="text-text font-semibold">Hạn chuyển bằng:</span> 30 ngày sau khi định cư tại Florida — bắt buộc đổi bằng FL</li>
              <li><span className="text-text font-semibold">REAL ID:</span> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa Mỹ</li>
              <li><span className="text-text font-semibold">Website chính thức:</span> flhsmv.gov</li>
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
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — Florida</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 30 mph khu dân cư · 70 mph interstate nông thôn · 65 mph interstate đô thị</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Bắt buộc dưới 21 tuổi · Người 21+ có thể không đội nếu có bảo hiểm ≥$10,000</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm cầm tay khi lái (kể cả dừng đèn đỏ) · Tuyệt đối cấm trong school/work zone</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 20 mph khi có đèn nhấp nháy</li>
              <li><span className="text-text font-semibold">Dây an toàn:</span> Bắt buộc tất cả người trong xe</li>
          </ul>
        </div>
      )}

      {tab === "quiz" && (
        <BmvQuizEngine questions={FL_QUESTIONS} passCount={FL_PASS_COUNT} />
      )}
    </div>
  );
}
