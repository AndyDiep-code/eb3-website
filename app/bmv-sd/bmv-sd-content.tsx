"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { SD_QUESTIONS, SD_PASS_COUNT } from "./bmv-sd-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật SD" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvSDContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">🏔️ Ôn Thi Bằng Lái — South Dakota (SD)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông South Dakota · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "25", label: "Câu hỏi" },
          { n: "20/25", label: "Điểm đậu (20/25)" },
          { n: "$20", label: "Lệ phí" },
          { n: "SD DPS", label: "Cơ quan" },
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
            ℹ️ South Dakota — Dakota Provision (thịt), Baldwin Filters. KHÔNG CÓ THUẾ THU NHẬP tiểu bang! Chi phí sinh hoạt thấp. Mùa đông cực khắc nghiệt. Một số interstate lên 80 mph! · Bão tuyết (blizzard) và đường trơn băng — kiểm tra dự báo thời tiết trước khi lái đường dài.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi South Dakota</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Số câu:</span> 25 câu trắc nghiệm</li>
              <li><span className="text-text font-semibold">Điểm đậu:</span> 20/25 (80%)</li>
              <li><span className="text-text font-semibold">Lệ phí:</span> $20</li>
              <li><span className="text-text font-semibold">Cơ quan:</span> SD DPS — dps.sd.gov</li>
              <li><span className="text-text font-semibold">Giấy tờ:</span> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng — South Dakota</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 25 mph khu dân cư · 65 mph highway · Một số interstate 80 mph</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Không bắt buộc với người từ 18t trở lên</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm nhắn tin khi lái cho tất cả tài xế</li>
              <li><span className="text-text font-semibold">Thuế thu nhập:</span> KHÔNG CÓ thuế thu nhập tiểu bang — lợi thế tài chính lớn</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 15 mph khi đèn nhấp nháy</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại South Dakota</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Chu kỳ đổi bằng:</span> 5 năm, hết hạn vào ngày sinh nhật</li>
              <li><span className="text-text font-semibold">Hạn chuyển bằng:</span> Nên đổi trong vòng 30-90 ngày sau khi định cư</li>
              <li><span className="text-text font-semibold">REAL ID:</span> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa Mỹ</li>
              <li><span className="text-text font-semibold">Website chính thức:</span> dps.sd.gov</li>
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
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — South Dakota</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 25 mph khu dân cư · 65 mph highway · Một số interstate 80 mph</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Mũ bảo hiểm xe máy:</span> Không bắt buộc với người từ 18t trở lên</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Cấm nhắn tin khi lái cho tất cả tài xế</li>
              <li><span className="text-text font-semibold">Thuế thu nhập:</span> KHÔNG CÓ thuế thu nhập tiểu bang — lợi thế tài chính lớn</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 15 mph khi đèn nhấp nháy</li>
          </ul>
        </div>
      )}

      {tab === "quiz" && (
        <BmvQuizEngine questions={SD_QUESTIONS} passCount={SD_PASS_COUNT} />
      )}
    </div>
  );
}
