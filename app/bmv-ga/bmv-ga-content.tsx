"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { GA_QUESTIONS, GA_PASS_COUNT } from "./bmv-ga-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật GA" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvGAContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">✅ Ôn Thi Bằng Lái — Georgia (GA)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông Georgia · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "40", label: "Câu hỏi" },
          { n: "30/40", label: "Điểm đậu (30/40)" },
          { n: "$10+$32", label: "Lệ phí" },
          { n: "Georgia DDS", label: "Cơ quan" },
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
            ℹ️ Georgia — Wayne Farms, Koch Foods, Case Farms, Claxton Poultry. Georgia hỗ trợ thi bằng tiếng Việt! Cộng đồng Việt Atlanta/Doraville khoảng 30,000+. · Đôi khi có băng giá bất ngờ (ice storm) làm tê liệt giao thông khu vực Atlanta.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi Georgia</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Số câu:</span> 40 câu trắc nghiệm</li>
              <li><span className="text-text font-semibold">Điểm đậu:</span> 30/40 (75%)</li>
              <li><span className="text-text font-semibold">Lệ phí:</span> $10+$32</li>
              <li><span className="text-text font-semibold">Cơ quan:</span> Georgia DDS — dds.georgia.gov</li>
              <li><span className="text-text font-semibold">Giấy tờ:</span> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng — Georgia</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 30 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Hands-free hoàn toàn — không cầm điện thoại khi lái (kể cả ở đèn đỏ)</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc ≥10 mph khi xe cứu hộ/cảnh sát dừng ven đường</li>
              <li><span className="text-text font-semibold">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy, trừ đường phân cách</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 15-25 mph khi có đèn vàng nhấp nháy hoặc trẻ em</li>
              <li><span className="text-text font-semibold">Dây an toàn:</span> Bắt buộc tất cả người ngồi trong xe</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại Georgia</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Chu kỳ đổi bằng:</span> 8 năm, với 2 năm gia hạn sau khi hết hạn</li>
              <li><span className="text-text font-semibold">Hạn chuyển bằng:</span> Nên đổi trong vòng 30-90 ngày sau khi định cư</li>
              <li><span className="text-text font-semibold">REAL ID:</span> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa Mỹ</li>
              <li><span className="text-text font-semibold">Website chính thức:</span> dds.georgia.gov</li>
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
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — Georgia</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
              <li><span className="text-text font-semibold">Tốc độ:</span> 30 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate</li>
              <li><span className="text-text font-semibold">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
              <li><span className="text-text font-semibold">Điện thoại:</span> Hands-free hoàn toàn — không cầm điện thoại khi lái (kể cả ở đèn đỏ)</li>
              <li><span className="text-text font-semibold">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc ≥10 mph khi xe cứu hộ/cảnh sát dừng ven đường</li>
              <li><span className="text-text font-semibold">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy, trừ đường phân cách</li>
              <li><span className="text-text font-semibold">Khu trường học:</span> 15-25 mph khi có đèn vàng nhấp nháy hoặc trẻ em</li>
              <li><span className="text-text font-semibold">Dây an toàn:</span> Bắt buộc tất cả người ngồi trong xe</li>
          </ul>
        </div>
      )}

      {tab === "quiz" && (
        <BmvQuizEngine questions={GA_QUESTIONS} passCount={GA_PASS_COUNT} />
      )}
    </div>
  );
}
