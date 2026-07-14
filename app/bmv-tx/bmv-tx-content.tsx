"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { BmvSharedVocab } from "../components/bmv-shared-vocab";
import { BmvSharedSigns } from "../components/bmv-shared-signs";
import { TX_QUESTIONS, TX_PASS_COUNT } from "./bmv-tx-data";

type Tab = "overview" | "vocab" | "rules" | "signs" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "overview", label: "📋 Tổng Quan" },
  { key: "vocab",    label: "📖 Từ Vựng" },
  { key: "rules",    label: "📜 Luật TX" },
  { key: "signs",    label: "🚦 Biển Báo" },
  { key: "quiz",     label: "🎯 Thi Thử" },
];

export function BmvTXContent() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="w-full">
      <a href="/dmv" className="mb-3 inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">← Tất cả tiểu bang</a>
      <h1 className="text-2xl font-bold text-text">⭐ Ôn Thi Bằng Lái — Texas (TX)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông Texas · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "30", label: "Câu hỏi" },
          { n: "21/30", label: "Điểm đậu (70%)" },
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

      {tab === "overview" && (
        <div>
          <div className="mb-4 flex gap-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm leading-relaxed text-text">
            <span className="flex-shrink-0 text-lg">💰</span>
            <div>
              <strong>Texas không có thuế thu nhập tiểu bang!</strong> Cộng đồng Việt Houston 100,000+, Dallas 40,000+. Cơ quan cấp bằng là DPS (Department of Public Safety), không phải DMV. SnD Manufacturing, Sentech Services, Labor Guys.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoCard title="📝 Cấu Trúc Bài Thi" color="text-primary">
              <InfoRow label="Số câu" value="30 câu trắc nghiệm" />
              <InfoRow label="Điểm đậu" value="21/30 (70%) — điểm đậu thấp nhất" />
              <InfoRow label="Lệ phí" value="$16 knowledge + $33 license" />
              <InfoRow label="Cơ quan" value="Texas DPS — dps.texas.gov" />
              <InfoRow label="Thi lại" value="Ngày hôm sau nếu rớt" />
              <InfoRow label="Ngôn ngữ" value="Có tiếng Việt tại nhiều DPS offices" />
            </InfoCard>
            <InfoCard title="🏢 Chuẩn Bị Khi Đến DPS" color="text-accent">
              <InfoRow label="Hộ chiếu" value="Passport hoặc birth certificate" />
              <InfoRow label="Thẻ xanh" value="Green Card / EAD" />
              <InfoRow label="Bằng chứng địa chỉ" value="2 tài liệu (hóa đơn, ngân hàng TX)" />
              <InfoRow label="SSN" value="Thẻ SSN hoặc bằng chứng SSN" />
              <InfoRow label="Website" value="dps.texas.gov → Driver License" />
            </InfoCard>
            <InfoCard title="⚠️ Luật Quan Trọng — Texas" color="text-secondary">
              <InfoRow label="Tốc độ" value="30 đô thị · 75 mph interstate · I-10 có đoạn 85 mph" />
              <InfoRow label="DUI" value="BAC ≥0.08% người lớn · ≥0.02% dưới 21t" />
              <InfoRow label="Điện thoại" value="Cấm texting khi lái từ 2017 — toàn bang" />
              <InfoRow label="Mũ xe máy" value="Bắt buộc dưới 21t · 21+ miễn nếu có bảo hiểm $10K+" />
              <InfoRow label="Move Over" value="Chuyển làn hoặc giảm tốc cho xe dừng ven" />
              <InfoRow label="Dây an toàn" value="Bắt buộc tất cả — phạt $200+" />
            </InfoCard>
            <InfoCard title="🚗 Sau Khi Có Learner's Permit" color="text-primary">
              <InfoRow label="Lái cùng" value="Người 21+ có bằng lái ngồi ghế phụ" />
              <InfoRow label="Giờ lái bắt buộc" value="30 giờ (10 giờ ban đêm) nếu dưới 18t" />
              <InfoRow label="Permit có giá trị" value="2 năm" />
              <InfoRow label="Sau 6 tháng" value="Thi Road Test tại DPS" />
              <InfoRow label="Thuế thu nhập" value="KHÔNG CÓ thuế thu nhập tiểu bang TX" />
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
          <h3 className="mb-3 text-xs font-bold text-primary">📜 Tổng hợp luật — Texas</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
            <li><span className="font-semibold text-text">Tốc độ:</span> 30 mph khu đô thị · 75 mph interstate · Một số đoạn I-10 lên 85 mph</li>
            <li><span className="font-semibold text-text">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
            <li><span className="font-semibold text-text">Mũ bảo hiểm xe máy:</span> Bắt buộc cho dưới 21t · Người 21+ được miễn nếu có bảo hiểm $10K+</li>
            <li><span className="font-semibold text-text">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc cho xe cứu hộ/cảnh sát</li>
            <li><span className="font-semibold text-text">Điện thoại:</span> Cấm texting while driving từ 2017</li>
            <li><span className="font-semibold text-text">Dây an toàn:</span> Bắt buộc tất cả người trong xe — phạt $200+</li>
            <li><span className="font-semibold text-text">Thuế thu nhập:</span> KHÔNG CÓ thuế thu nhập tiểu bang</li>
          </ul>
        </div>
      )}

      {tab === "signs" && <BmvSharedSigns />}

      {tab === "quiz" && (
        <BmvQuizEngine questions={TX_QUESTIONS} passCount={TX_PASS_COUNT} />
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
