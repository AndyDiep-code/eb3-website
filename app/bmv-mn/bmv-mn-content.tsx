"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { MN_QUESTIONS, MN_PASS_COUNT } from "./bmv-mn-data";

type Tab = "info" | "rules" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "info", label: "📋 Thông Tin" },
  { key: "rules", label: "📜 Luật MN" },
  { key: "quiz", label: "🎯 Thi Thử" },
];

export function BmvMnContent() {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="w-full">
      {/* Hero */}
      <div
        className="rounded-card mb-4 px-5 py-6 text-center text-white"
        style={{ background: "linear-gradient(135deg,#021a1a 0%,#0f766e 55%,#7c3aed 100%)" }}
      >
        <h1 className="text-xl font-extrabold">🌨️ Ôn Thi Bằng Lái — Minnesota (MN)</h1>
        <p className="mt-1 text-xs text-blue-200">Song ngữ Việt-Anh · Luật giao thông Minnesota · Thi thử có chấm điểm</p>
        <div className="mt-4 flex justify-center flex-wrap gap-3">
          {[
            { n: "40", l: "Câu hỏi" },
            { n: "80%", l: "Điểm đậu (32/40)" },
            { n: "$32", l: "Lệ phí" },
            { n: "MN DVS", l: "Cơ quan" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg px-4 py-2 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
              <div className="text-lg font-bold text-yellow-400">{s.n}</div>
              <div className="text-xs text-blue-200">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Back link */}
      <a href="/dmv" className="inline-flex items-center gap-1 mb-4 text-xs text-primary hover:underline">
        ← Quay lại chọn tiểu bang
      </a>

      {/* Tabs */}
      <div className="mb-4 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1 border-b border-border min-w-max sm:min-w-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
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

      {/* Info tab */}
      {tab === "info" && (
        <div>
          <div className="mb-3 rounded-card border border-border bg-bg p-3 text-xs text-text-muted leading-relaxed flex gap-2">
            <span className="text-lg flex-shrink-0">ℹ️</span>
            <span>Minnesota — TPI Hospitality (nhiều khách sạn Minneapolis). Cộng đồng Việt Minneapolis/St.Paul ~20K. Mùa đông rất lạnh. Thuế 5.35-9.85% · Mùa đông rất khắc nghiệt — nên dùng lốp mùa đông (snow tires) và cẩn thận đường trơn băng (black ice) từ tháng 11 đến tháng 3.</span>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Thông tin kỳ thi</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Số câu:</strong> 40 câu trắc nghiệm</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Điểm đậu:</strong> 32/40 (80%)</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Lệ phí:</strong> $32</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Cơ quan:</strong> MN DVS — dps.mn.gov/dvs</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Giấy tờ:</strong> Passport + thẻ xanh/EAD + bằng chứng địa chỉ</span></li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-primary mb-3">⚡ Quy tắc quan trọng</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Tốc độ:</strong> 30 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">DWI:</strong> BAC &gt;=0.08% người lớn · bất kỳ BAC nào dưới 21t · &gt;=0.04% CDL</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Hands-Free Law:</strong> Cấm cầm điện thoại khi lái — phải dùng hands-free</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Mũ bảo hiểm xe máy:</strong> Không bắt buộc từ 18t trở lên</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Move Over Law:</strong> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Khu trường học:</strong> 20 mph khi biển báo có hiệu lực</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Dây an toàn:</strong> Bắt buộc tất cả người trong xe</span></li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-4">
            <h3 className="text-xs font-bold text-primary mb-3">🪪 Đổi Bằng Lái &amp; REAL ID Khi Định Cư Tại Minnesota</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Chu kỳ đổi bằng:</strong> 4 năm</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Hạn chuyển bằng:</strong> Không có hạn cố định — nên đổi trong vòng 30-90 ngày sau khi định cư</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">REAL ID:</strong> Nên đổi sang bằng có sao ★ để dùng cho chuyến bay nội địa và tòa nhà liên bang</span></li>
              <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Website:</strong> dps.mn.gov</span></li>
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

      {/* Rules tab */}
      {tab === "rules" && (
        <div className="rounded-card border border-border bg-bg p-4">
          <h3 className="text-xs font-bold text-primary mb-3">📜 Tổng hợp luật — Minnesota</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
            <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Tốc độ:</strong> 30 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate</span></li>
            <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">DWI:</strong> BAC &gt;=0.08% người lớn · bất kỳ BAC nào dưới 21t · &gt;=0.04% CDL</span></li>
            <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Hands-Free Law:</strong> Cấm cầm điện thoại khi lái — phải dùng hands-free</span></li>
            <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Mũ bảo hiểm xe máy:</strong> Không bắt buộc từ 18t trở lên</span></li>
            <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Move Over Law:</strong> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</span></li>
            <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Khu trường học:</strong> 20 mph khi biển báo có hiệu lực</span></li>
            <li className="flex gap-2"><span className="text-primary flex-shrink-0">›</span><span><strong className="text-text">Dây an toàn:</strong> Bắt buộc tất cả người trong xe</span></li>
          </ul>
        </div>
      )}

      {/* Quiz tab */}
      {tab === "quiz" && (
        <BmvQuizEngine questions={MN_QUESTIONS} passCount={MN_PASS_COUNT} />
      )}
    </div>
  );
}
