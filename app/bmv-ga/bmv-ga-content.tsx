"use client";

import { useState } from "react";
import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { BmvSharedVocab } from "../components/bmv-shared-vocab";
import { BmvSharedSigns } from "../components/bmv-shared-signs";
import { GA_QUESTIONS, GA_PASS_COUNT } from "./bmv-ga-data";

type Tab = "overview" | "vocab" | "rules" | "signs" | "quiz";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "overview", label: "📋 Tổng Quan" },
  { key: "vocab",    label: "📖 Từ Vựng" },
  { key: "rules",    label: "📜 Luật GA" },
  { key: "signs",    label: "🚦 Biển Báo" },
  { key: "quiz",     label: "🎯 Thi Thử" },
];

export function BmvGAContent() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="w-full">
      <a href="/dmv" className="mb-3 inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">← Tất cả tiểu bang</a>
      <h1 className="text-2xl font-bold text-text">✅ Ôn Thi Bằng Lái — Georgia (GA)</h1>
      <p className="mt-1 text-text-muted">Song ngữ Việt–Anh · Luật giao thông Georgia · Thi thử có chấm điểm</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "40", label: "Câu hỏi" },
          { n: "30/40", label: "Điểm đậu (75%)" },
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

      {tab === "overview" && (
        <div>
          <div className="mb-4 flex gap-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm leading-relaxed text-text">
            <span className="flex-shrink-0 text-lg">⭐</span>
            <div>
              <strong>Georgia hỗ trợ thi bằng tiếng Việt!</strong> Hỏi nhân viên tại DDS để chọn ngôn ngữ khi vào phòng thi. Cộng đồng Việt Atlanta/Doraville ~30,000+. Wayne Farms, Koch Foods, Claxton Poultry, Harrison Poultry.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoCard title="📝 Cấu Trúc Bài Thi" color="text-primary">
              <InfoRow label="Số câu" value="40 câu trắc nghiệm" />
              <InfoRow label="Điểm đậu" value="30/40 (75%)" />
              <InfoRow label="Lệ phí" value="$10 knowledge test + $32 license" />
              <InfoRow label="Cơ quan" value="Georgia DDS — dds.georgia.gov" />
              <InfoRow label="Thi lại" value="Ngày hôm sau nếu rớt" />
              <InfoRow label="Ngôn ngữ" value="Có tiếng Việt — yêu cầu tại DDS" />
            </InfoCard>
            <InfoCard title="🏢 Chuẩn Bị Khi Đến DDS" color="text-accent">
              <InfoRow label="Hộ chiếu" value="Passport hoặc birth certificate" />
              <InfoRow label="Thẻ xanh" value="Green Card / EAD" />
              <InfoRow label="Bằng chứng địa chỉ" value="2 tài liệu (hóa đơn điện, ngân hàng...)" />
              <InfoRow label="SSN" value="Thẻ SSN hoặc bằng chứng SSN" />
              <InfoRow label="Website" value="dds.georgia.gov → Locations" />
            </InfoCard>
            <InfoCard title="⚠️ Luật Quan Trọng — Georgia" color="text-secondary">
              <InfoRow label="Tốc độ" value="30 khu dân cư · 55 ngoài đô thị · 70 mph interstate" />
              <InfoRow label="DUI" value="BAC ≥0.08% người lớn · ≥0.02% dưới 21t" />
              <InfoRow label="Điện thoại" value="Hands-free hoàn toàn — cấm cầm kể cả đèn đỏ" />
              <InfoRow label="Move Over" value="Chuyển làn hoặc giảm ≥10 mph" />
              <InfoRow label="Trường học" value="15–25 mph khi đèn vàng nhấp nháy" />
              <InfoRow label="Xe buýt" value="Dừng 2 chiều khi đèn đỏ nhấp nháy" />
            </InfoCard>
            <InfoCard title="🚗 Sau Khi Có Learner's Permit" color="text-primary">
              <InfoRow label="Lái cùng" value="Người 21+ có bằng lái ngồi ghế phụ" />
              <InfoRow label="Giờ lái bắt buộc" value="40 giờ (6 giờ ban đêm)" />
              <InfoRow label="Permit có giá trị" value="1 năm" />
              <InfoRow label="Sau 12 tháng" value="Thi Road Test tại DDS" />
              <InfoRow label="Phí road test" value="~$32 (gộp trong phí license)" />
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
          <h3 className="mb-3 text-xs font-bold text-primary">📜 Tổng hợp luật — Georgia</h3>
          <ul className="space-y-1.5 text-xs text-text-muted">
            <li><span className="font-semibold text-text">Tốc độ:</span> 30 mph khu dân cư · 55 mph ngoài đô thị · 70 mph interstate</li>
            <li><span className="font-semibold text-text">DUI:</span> BAC ≥0.08% người lớn · ≥0.02% dưới 21t · ≥0.04% CDL</li>
            <li><span className="font-semibold text-text">Điện thoại:</span> Hands-free hoàn toàn — không cầm điện thoại khi lái (kể cả ở đèn đỏ)</li>
            <li><span className="font-semibold text-text">Move Over Law:</span> Phải chuyển làn hoặc giảm tốc ≥10 mph khi xe cứu hộ/cảnh sát dừng ven đường</li>
            <li><span className="font-semibold text-text">Xe buýt trường học:</span> Dừng cả 2 chiều khi đèn đỏ nhấp nháy, trừ đường phân cách</li>
            <li><span className="font-semibold text-text">Khu trường học:</span> 15–25 mph khi có đèn vàng nhấp nháy hoặc trẻ em</li>
            <li><span className="font-semibold text-text">Dây an toàn:</span> Bắt buộc tất cả người ngồi trong xe</li>
          </ul>
        </div>
      )}

      {tab === "signs" && <BmvSharedSigns />}

      {tab === "quiz" && (
        <BmvQuizEngine questions={GA_QUESTIONS} passCount={GA_PASS_COUNT} />
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
