"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { BmvSharedVocab } from "../components/bmv-shared-vocab";
import { BmvSharedSigns } from "../components/bmv-shared-signs";
import { SD_QUESTIONS, SD_PASS_COUNT } from "./bmv-sd-data";

type Tab = "overview" | "vocab" | "rules" | "signs" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "overview", label: "📋 Tổng Quan" },
  { key: "vocab",    label: "📖 Từ Vựng" },
  { key: "rules",    label: "📜 Luật SD" },
  { key: "signs",    label: "🚦 Biển Báo" },
  { key: "quiz",     label: "🎯 Thi Thử" },
];

export function BmvSDContent() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="w-full">
      <a href="/dmv" className="mb-3 inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">← Tất cả tiểu bang</a>
      <h1 className="text-2xl font-bold text-text">🦬 Ôn Thi Bằng Lái — South Dakota (SD)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông South Dakota · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "25", label: "Câu hỏi" },
          { n: "20/25", label: "Điểm đậu (80%)" },
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

      {tab === "overview" && (
        <div>
          <div className="mb-4 flex gap-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm leading-relaxed text-text">
            <span className="flex-shrink-0 text-lg">💰</span>
            <div>
              <strong>South Dakota KHÔNG CÓ thuế thu nhập tiểu bang!</strong> Interstate cho phép <strong>80 mph</strong> — một trong những giới hạn cao nhất nước Mỹ. Mùa đông có blizzard. Dakota Provision (thịt), Baldwin Filters. Chi phí sinh hoạt thấp.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoCard title="📝 Cấu Trúc Bài Thi" color="text-primary">
              <InfoRow label="Số câu" value="25 câu trắc nghiệm" />
              <InfoRow label="Điểm đậu" value="20/25 (80%)" />
              <InfoRow label="Lệ phí" value="$20" />
              <InfoRow label="Cơ quan" value="SD DPS — dps.sd.gov" />
              <InfoRow label="Thi lại" value="Hôm sau nếu rớt" />
              <InfoRow label="Ngôn ngữ" value="Hỏi nhân viên DPS để chọn ngôn ngữ" />
            </InfoCard>
            <InfoCard title="🏢 Chuẩn Bị Khi Đến DPS" color="text-accent">
              <InfoRow label="Hộ chiếu" value="Passport hoặc birth certificate" />
              <InfoRow label="Thẻ xanh" value="Green Card / EAD" />
              <InfoRow label="Bằng chứng địa chỉ" value="2 tài liệu (hóa đơn, ngân hàng SD)" />
              <InfoRow label="SSN" value="Thẻ SSN hoặc bằng chứng SSN" />
              <InfoRow label="Website" value="dps.sd.gov → Driver Licensing" />
            </InfoCard>
            <InfoCard title="⚠️ Luật Quan Trọng — South Dakota" color="text-secondary">
              <InfoRow label="Thuế thu nhập" value="KHÔNG CÓ thuế thu nhập tiểu bang SD" />
              <InfoRow label="Tốc độ" value="25 khu dân cư · 65 highway · 80 mph một số interstate" />
              <InfoRow label="DUI" value="BAC ≥0.08% người lớn · ≥0.02% dưới 21t" />
              <InfoRow label="Điện thoại" value="Cấm texting khi lái cho tất cả tài xế" />
              <InfoRow label="Move Over" value="Chuyển làn hoặc giảm tốc khi qua xe dừng ven" />
              <InfoRow label="Trường học" value="15 mph khi đèn nhấp nháy" />
            </InfoCard>
            <InfoCard title="🚗 Sau Khi Có Learner&apos;s Permit" color="text-primary">
              <InfoRow label="Lái cùng" value="Người 21+ có bằng lái ngồi ghế phụ" />
              <InfoRow label="Chu kỳ bằng" value="5 năm, hết hạn ngày sinh nhật" />
              <InfoRow label="Hạn chuyển bằng" value="Nên đổi trong 30-90 ngày sau khi định cư" />
              <InfoRow label="REAL ID" value="Nên đổi sang bằng có ★ để đi máy bay" />
              <InfoRow label="Blizzard" value="Kiểm tra dự báo thời tiết trước khi lái xa" />
              <InfoRow label="Website" value="dps.sd.gov" />
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
          <h3 className="mb-3 text-xs font-bold text-primary">📜 Tổng hợp luật — South Dakota</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
            <li><span className="font-semibold text-text">Thuế thu nhập:</span> KHÔNG CÓ thuế thu nhập tiểu bang — lợi thế tài chính lớn</li>
            <li><span className="font-semibold text-text">Tốc độ:</span> 25 mph khu dân cư · 65 mph highway · Một số interstate 80 mph</li>
            <li><span className="font-semibold text-text">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
            <li><span className="font-semibold text-text">Mũ bảo hiểm xe máy:</span> Không bắt buộc với người từ 18t trở lên</li>
            <li><span className="font-semibold text-text">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường</li>
            <li><span className="font-semibold text-text">Điện thoại:</span> Cấm nhắn tin khi lái cho tất cả tài xế</li>
            <li><span className="font-semibold text-text">Khu trường học:</span> 15 mph khi đèn nhấp nháy</li>
          </ul>
        </div>
      )}

      {tab === "signs" && <BmvSharedSigns />}

      {tab === "quiz" && (
        <BmvQuizEngine questions={SD_QUESTIONS} passCount={SD_PASS_COUNT} />
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
