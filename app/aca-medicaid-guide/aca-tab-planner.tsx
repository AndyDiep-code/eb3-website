"use client";

import { useState } from "react";
import { STATE_OPTIONS } from "../cost-calculator/cost-calculator-data";

const FPL_BASE = [0, 15060, 20440, 25820, 31200, 36580];
const MEDICAID_EXPANSION = new Set(["IN", "AR", "LA", "OH", "PA", "MN", "SD", "NV", "MT", "AZ", "NC"]);

function getFpl(size: number): number {
  if (size <= 5) return FPL_BASE[size];
  return FPL_BASE[5] + (size - 5) * 5380;
}

interface PlanResult {
  path: "medicaid" | "marketplace" | "gap";
  tier: "Silver" | "Bronze" | null;
  headline: string;
  detail: string;
  tips: string[];
  badgeClass: string;
}

function recommend(pct: number, stateCode: string): PlanResult {
  const expansion = MEDICAID_EXPANSION.has(stateCode);

  if (pct < 138 && expansion) {
    return {
      path: "medicaid", tier: null,
      headline: "✅ Có thể đủ điều kiện Medicaid",
      detail: `Thu nhập ${pct}% FPL. Bang này có Medicaid mở rộng — hãy đăng ký qua Medicaid office tiểu bang ngay. Chi phí rất thấp hoặc miễn phí.`,
      tips: [
        "LPR mới có thẻ xanh cần đủ 5 năm để đủ Medicaid liên bang — một số bang có chương trình riêng sớm hơn",
        "Có thể đăng ký Medicaid bất kỳ lúc nào, không cần chờ Open Enrollment",
        "Nếu không đủ Medicaid do thời hạn 5 năm, hãy check ACA Marketplace với PTC",
      ],
      badgeClass: "border-accent/40 bg-accent/10",
    };
  }

  if (pct < 100 && !expansion) {
    return {
      path: "gap", tier: null,
      headline: "⚠️ Medicaid Gap — Bang chưa mở rộng",
      detail: `Thu nhập ${pct}% FPL. Bang này không mở rộng Medicaid, nên bạn dưới ngưỡng subsidy ACA (100% FPL) nhưng cũng không đủ Medicaid.`,
      tips: [
        "Kiểm tra CHIP nếu có con dưới 19 tuổi — áp dụng khác Medicaid người lớn",
        "Liên hệ Federally Qualified Health Center (FQHC) — khám theo sliding scale fee",
        "Khi thu nhập tăng lên trên 100% FPL, bạn có thể mua ACA có trợ cấp",
      ],
      badgeClass: "border-secondary/40 bg-secondary/10",
    };
  }

  if (pct >= 100 && pct <= 250) {
    return {
      path: "marketplace", tier: "Silver",
      headline: "💎 Silver Plan — Lựa chọn tốt nhất ở mức thu nhập này",
      detail: `Thu nhập ${pct}% FPL. Bạn đủ điều kiện Premium Tax Credit VÀ Cost-Sharing Reductions (CSR) — CSR chỉ áp dụng cho Silver Plan, giúp giảm deductible và copay rõ rệt.`,
      tips: [
        "LUÔN chọn Silver ở mức 100-250% FPL — CSR không áp dụng cho Bronze/Gold",
        "Deductible Silver có thể giảm xuống $250-1,500 thay vì $5,000+ trên Bronze",
        "Premium sau trợ cấp thường chỉ $20-100/tháng ở mức thu nhập này",
      ],
      badgeClass: "border-primary/30 bg-primary/5",
    };
  }

  if (pct > 250 && pct <= 400) {
    return {
      path: "marketplace", tier: "Bronze",
      headline: "💛 Bronze hoặc Silver với Premium Tax Credit",
      detail: `Thu nhập ${pct}% FPL. Đủ điều kiện PTC nhưng CSR ít hơn. Bronze có premium thấp hơn, Silver có deductible thấp hơn — tùy nhu cầu.`,
      tips: [
        "Bronze: tốt nếu bạn khỏe mạnh, ít đi khám — phí tháng thấp nhất",
        "Silver: nếu thường xuyên đi khám hoặc có bệnh mãn tính",
        "Gold: chỉ nên nếu dự kiến chi phí y tế cao (mang thai, điều trị dài hạn)",
      ],
      badgeClass: "border-primary/30 bg-primary/5",
    };
  }

  return {
    path: "marketplace", tier: "Bronze",
    headline: "🔵 ACA Marketplace — Vẫn Có Thể Có Trợ Cấp",
    detail: `Thu nhập ${pct}% FPL. ARP gia hạn PTC ngay cả trên 400% FPL tùy năm. Kiểm tra healthcare.gov để xem mức trợ cấp thực tế của bạn — đừng tự loại mình.`,
    tips: [
      "Luôn check healthcare.gov thay vì tự tính — kết quả thực tế thường tốt hơn",
      "Short-term health plans KHÔNG thay thế ACA — tránh xa",
      "Bronze là lựa chọn phổ biến nhất ở mức thu nhập này",
    ],
    badgeClass: "border-border bg-bg",
  };
}

export function AcaTabPlanner() {
  const [stateCode, setStateCode] = useState("GA");
  const [householdSize, setHouseholdSize] = useState(1);
  const [income, setIncome] = useState("");

  const incomeNum = parseFloat(income) || 0;
  const fpl = getFpl(householdSize);
  const pct = income && incomeNum > 0 ? Math.round((incomeNum / fpl) * 100) : null;
  const result = pct !== null ? recommend(pct, stateCode) : null;

  return (
    <div>
      <p className="mb-3 text-sm text-text-muted">
        Nhập thu nhập hộ gia đình ước tính → xem nên chọn Medicaid, Bronze, Silver, hay Gold.
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-text-muted">Tiểu bang</label>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text outline-none"
          >
            {STATE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-text-muted">Số người trong hộ</label>
          <select
            value={householdSize}
            onChange={(e) => setHouseholdSize(parseInt(e.target.value, 10))}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n} người</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-text-muted">Thu nhập cả năm (USD)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Ví dụ: 35000"
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text outline-none"
          />
        </div>
      </div>

      {result && pct !== null ? (
        <div className="mt-4 space-y-3">
          <div className={`rounded-card border p-4 ${result.badgeClass}`}>
            <div className="text-base font-bold text-text">{result.headline}</div>
            <p className="mt-1.5 text-sm text-text-muted">{result.detail}</p>
          </div>

          {result.tier && (
            <div className="rounded-card border border-border bg-bg p-3">
              <div className="mb-2 text-xs font-bold text-text">📋 So sánh các mức bảo hiểm</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(["Bronze", "Silver", "Gold"] as const).map((t) => {
                  const best = result.tier === t;
                  const descs: Record<string, string> = {
                    Bronze: "Premium thấp nhất, deductible cao",
                    Silver: "Cân bằng — CSR chỉ áp dụng ở đây",
                    Gold: "Premium cao, deductible thấp",
                  };
                  return (
                    <div key={t} className={`rounded-card border p-2 text-center ${best ? "border-primary bg-primary/10" : "border-border bg-bg-alt"}`}>
                      <div className={`font-bold ${best ? "text-primary" : "text-text"}`}>{t}</div>
                      {best && <div className="text-[10px] font-semibold text-primary">← Khuyến nghị</div>}
                      <div className="mt-0.5 text-[10px] text-text-muted">{descs[t]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="rounded-card border border-border bg-bg p-3">
            <div className="mb-1.5 text-xs font-bold text-text">💡 Lưu ý quan trọng</div>
            <ul className="space-y-1 text-xs text-text-muted">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex gap-1.5"><span className="shrink-0">•</span><span>{tip}</span></li>
              ))}
            </ul>
          </div>

          <div className="text-[11px] text-text-muted">
            FPL {householdSize} người 2024: ${fpl.toLocaleString()} →{" "}
            Thu nhập của bạn = <b className="text-text">{pct}% FPL</b> ·{" "}
            <a href="https://www.healthcare.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Đăng ký tại healthcare.gov
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-card border border-border bg-bg-alt p-4 text-center text-sm text-text-muted">
          Nhập thu nhập ước tính để xem khuyến nghị bảo hiểm
        </div>
      )}
    </div>
  );
}
