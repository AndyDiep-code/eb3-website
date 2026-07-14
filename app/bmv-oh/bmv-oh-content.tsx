"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { BmvSharedVocab } from "../components/bmv-shared-vocab";
import { BmvSharedSigns } from "../components/bmv-shared-signs";
import { OH_QUESTIONS, OH_PASS_COUNT } from "./bmv-oh-data";

type Tab = "overview" | "vocab" | "rules" | "signs" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "overview", label: "📋 Tổng Quan" },
  { key: "vocab",    label: "📖 Từ Vựng" },
  { key: "rules",    label: "📜 Luật OH" },
  { key: "signs",    label: "🚦 Biển Báo" },
  { key: "quiz",     label: "🎯 Thi Thử" },
];

export function BmvOhContent() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="w-full">
      <a href="/dmv" className="mb-3 inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">← Tất cả tiểu bang</a>
      <h1 className="text-2xl font-bold text-text">🎡 Ôn Thi Bằng Lái — Ohio (OH)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông Ohio · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "40", label: "Câu hỏi" },
          { n: "30/40", label: "Điểm đậu (75%)" },
          { n: "$23", label: "Lệ phí" },
          { n: "Ohio BMV", label: "Cơ quan" },
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
            <span className="flex-shrink-0 text-lg">⚠️</span>
            <div>
              Ohio dùng thuật ngữ <strong>OVI (Operating Vehicle Impaired)</strong> thay vì DUI — từ này hay xuất hiện trong bài thi. Cơ quan cấp bằng là <strong>Ohio BMV (Bureau of Motor Vehicles)</strong>. Case Farms Processing, Columbus cộng đồng Việt đang phát triển. Tuyết lake-effect gần Hồ Erie mùa đông.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoCard title="📝 Cấu Trúc Bài Thi" color="text-primary">
              <InfoRow label="Số câu" value="40 câu trắc nghiệm" />
              <InfoRow label="Điểm đậu" value="30/40 (75%)" />
              <InfoRow label="Lệ phí" value="$23" />
              <InfoRow label="Cơ quan" value="Ohio BMV — oplates.com" />
              <InfoRow label="Thi lại" value="Hôm sau nếu rớt" />
              <InfoRow label="Ngôn ngữ" value="Hỏi nhân viên BMV để chọn ngôn ngữ" />
            </InfoCard>
            <InfoCard title="🏢 Chuẩn Bị Khi Đến BMV" color="text-accent">
              <InfoRow label="Hộ chiếu" value="Passport hoặc birth certificate" />
              <InfoRow label="Thẻ xanh" value="Green Card / EAD" />
              <InfoRow label="Bằng chứng địa chỉ" value="2 tài liệu (hóa đơn, ngân hàng OH)" />
              <InfoRow label="SSN" value="Thẻ SSN hoặc bằng chứng SSN" />
              <InfoRow label="Website" value="oplates.com → Driver License" />
            </InfoCard>
            <InfoCard title="⚠️ Luật Quan Trọng — Ohio" color="text-secondary">
              <InfoRow label="OVI (không phải DUI)" value="BAC ≥0.08% người lớn · ≥0.02% dưới 21t" />
              <InfoRow label="Tốc độ" value="25 khu dân cư · 55 ngoài đô thị · 70 mph interstate" />
              <InfoRow label="Điện thoại" value="Cấm texting khi lái · Dưới 18t: cấm tất cả" />
              <InfoRow label="Move Over" value="Chuyển làn hoặc giảm tốc (mở rộng 2023)" />
              <InfoRow label="Mũ xe máy" value="Không bắt buộc từ 18t trở lên" />
              <InfoRow label="Trường học" value="20 mph khi đèn nhấp nháy hoặc trẻ em" />
            </InfoCard>
            <InfoCard title="🚗 Sau Khi Có Learner&apos;s Permit" color="text-primary">
              <InfoRow label="Lái cùng" value="Người 21+ có bằng lái ngồi ghế phụ" />
              <InfoRow label="Chu kỳ bằng" value="4 năm, hết hạn ngày sinh nhật" />
              <InfoRow label="Hạn chuyển bằng" value="Nên đổi trong 30-90 ngày sau khi định cư" />
              <InfoRow label="REAL ID" value="Nên đổi sang bằng có ★ để đi máy bay" />
              <InfoRow label="Mùa đông" value="Lake-effect snow gần Hồ Erie — lái chậm" />
              <InfoRow label="Website" value="oplates.com" />
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
          <h3 className="mb-3 text-xs font-bold text-primary">📜 Tổng hợp luật — Ohio</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
            <li><span className="font-semibold text-text">OVI (không phải DUI):</span> Ohio dùng OVI thay vì DUI. BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
            <li><span className="font-semibold text-text">Tốc độ:</span> 25 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate</li>
            <li><span className="font-semibold text-text">Mũ bảo hiểm xe máy:</span> Không bắt buộc với người từ 18t trở lên</li>
            <li><span className="font-semibold text-text">Move Over Law:</span> Chuyển làn hoặc giảm tốc khi qua xe dừng ven đường (mở rộng 2023)</li>
            <li><span className="font-semibold text-text">Điện thoại:</span> Cấm nhắn tin khi lái · Dưới 18t: cấm tất cả thiết bị</li>
            <li><span className="font-semibold text-text">Khu trường học:</span> 20 mph khi có đèn nhấp nháy hoặc trẻ em</li>
            <li><span className="font-semibold text-text">Dây an toàn:</span> Bắt buộc tất cả người trong xe</li>
          </ul>
        </div>
      )}

      {tab === "signs" && <BmvSharedSigns />}

      {tab === "quiz" && (
        <BmvQuizEngine questions={OH_QUESTIONS} passCount={OH_PASS_COUNT} />
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
