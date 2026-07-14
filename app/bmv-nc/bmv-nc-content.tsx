"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { BmvSharedVocab } from "../components/bmv-shared-vocab";
import { BmvSharedSigns } from "../components/bmv-shared-signs";
import { NC_QUESTIONS, NC_PASS_COUNT } from "./bmv-nc-data";

type Tab = "overview" | "vocab" | "rules" | "signs" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "overview", label: "📋 Tổng Quan" },
  { key: "vocab",    label: "📖 Từ Vựng" },
  { key: "rules",    label: "📜 Luật NC" },
  { key: "signs",    label: "🚦 Biển Báo" },
  { key: "quiz",     label: "🎯 Thi Thử" },
];

export function BmvNCContent() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="w-full">
      <a href="/dmv" className="mb-3 inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">← Tất cả tiểu bang</a>
      <h1 className="text-2xl font-bold text-text">🌲 Ôn Thi Bằng Lái — North Carolina (NC)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông North Carolina · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "40", label: "Câu hỏi" },
          { n: "30/40", label: "Điểm đậu (75%)" },
          { n: "$18", label: "Lệ phí" },
          { n: "NC DMV", label: "Cơ quan" },
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

      {tab === "overview" && (
        <div>
          <div className="mb-4 flex gap-3 rounded-card border border-primary/20 bg-primary/5 p-3 text-sm leading-relaxed text-text">
            <span className="flex-shrink-0 text-lg">🌲</span>
            <div>
              North Carolina dùng thuật ngữ <strong>DWI (Driving While Impaired)</strong> thay vì DUI. Nhiều hãng gia cầm: Wayne Farms (Dobson), Case Farms, Defender Service. 4 mùa đẹp, kinh tế NC phát triển nhanh những năm gần đây.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoCard title="📝 Cấu Trúc Bài Thi" color="text-primary">
              <InfoRow label="Số câu" value="40 câu trắc nghiệm" />
              <InfoRow label="Điểm đậu" value="30/40 (75%)" />
              <InfoRow label="Lệ phí" value="$18" />
              <InfoRow label="Cơ quan" value="NC DMV (NCDOT) — ncdot.gov/dmv" />
              <InfoRow label="Thi lại" value="Hôm sau nếu rớt, tối đa 3 lần" />
              <InfoRow label="Ngôn ngữ" value="Hỏi nhân viên DMV để chọn ngôn ngữ" />
            </InfoCard>
            <InfoCard title="🏢 Chuẩn Bị Khi Đến DMV" color="text-accent">
              <InfoRow label="Hộ chiếu" value="Passport hoặc birth certificate" />
              <InfoRow label="Thẻ xanh" value="Green Card / EAD" />
              <InfoRow label="Bằng chứng địa chỉ" value="2 tài liệu (hóa đơn, ngân hàng NC)" />
              <InfoRow label="SSN" value="Thẻ SSN hoặc bằng chứng SSN" />
              <InfoRow label="Website" value="ncdot.gov/dmv → Driver License" />
            </InfoCard>
            <InfoCard title="⚠️ Luật Quan Trọng — NC" color="text-secondary">
              <InfoRow label="DWI (không phải DUI)" value="BAC ≥0.08% người lớn · Zero tolerance dưới 21t" />
              <InfoRow label="Tốc độ" value="35 mph khu đô thị mặc định · 70 mph interstate" />
              <InfoRow label="Điện thoại" value="Dưới 18t: cấm tuyệt đối · Tất cả: cấm texting" />
              <InfoRow label="Move Over" value="Chuyển làn hoặc giảm tốc đáng kể" />
              <InfoRow label="Mũ xe máy" value="Bắt buộc tất cả rider và hành khách" />
              <InfoRow label="Trường học" value="25 mph khi đèn nhấp nháy hoặc có trẻ em" />
            </InfoCard>
            <InfoCard title="🚗 Sau Khi Có Learner's Permit" color="text-primary">
              <InfoRow label="Lái cùng" value="Người 21+ có bằng lái ngồi ghế phụ" />
              <InfoRow label="Giờ lái bắt buộc" value="60 giờ (10 giờ ban đêm)" />
              <InfoRow label="Permit có giá trị" value="18 tháng" />
              <InfoRow label="Sau 12 tháng" value="Thi Road Test tại DMV" />
              <InfoRow label="Bảo hiểm" value="NC yêu cầu $30K/$60K/$25K tối thiểu" />
              <InfoRow label="REAL ID" value="Nên đổi sang bằng có ★ để đi máy bay" />
            </InfoCard>
          </div>
          <button
            type="button"
            onClick={() => setTab("quiz")}
            className="mt-4 rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            🎯 Bắt đầu thi thử →
          </button>
        </div>
      )}

      {tab === "vocab" && <BmvSharedVocab />}

      {tab === "rules" && (
        <div className="rounded-card border border-border bg-bg p-4">
          <h3 className="mb-3 text-xs font-bold text-primary">📜 Tổng hợp luật — North Carolina</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
            <li><span className="font-semibold text-text">DWI:</span> NC gọi là DWI (Driving While Impaired). BAC ≥0.08% người lớn · Zero tolerance dưới 21t</li>
            <li><span className="font-semibold text-text">Tốc độ:</span> 35 mph khu đô thị mặc định · 55 mph ngoài đô thị · 70 mph interstate</li>
            <li><span className="font-semibold text-text">Mũ bảo hiểm xe máy:</span> Bắt buộc TẤT CẢ rider và hành khách, bất kể tuổi</li>
            <li><span className="font-semibold text-text">Điện thoại:</span> Dưới 18t: cấm hoàn toàn · Tất cả tài xế: cấm texting/đọc tin nhắn</li>
            <li><span className="font-semibold text-text">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe cứu hộ/cảnh sát/tiện ích dừng ven đường</li>
            <li><span className="font-semibold text-text">Khu trường học:</span> 25 mph khi đèn nhấp nháy hoặc có trẻ em</li>
            <li><span className="font-semibold text-text">Bảo hiểm tối thiểu:</span> $30,000/người · $60,000/tai nạn · $25,000 hư hại tài sản</li>
          </ul>
        </div>
      )}

      {tab === "signs" && <BmvSharedSigns />}

      {tab === "quiz" && (
        <BmvQuizEngine questions={NC_QUESTIONS} passCount={NC_PASS_COUNT} />
      )}
    </div>
  );
}

function InfoCard({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <div className={`mb-3 text-sm font-bold ${color}`}>{title}</div>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex gap-2 border-b border-border py-1.5 text-xs text-text-muted last:border-b-0">
      <span className="flex-shrink-0 text-primary">›</span>
      <span><strong className="text-text">{label}:</strong>{" "}<em className="not-italic font-medium text-secondary">{value}</em></span>
    </li>
  );
}
