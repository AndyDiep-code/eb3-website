"use client";

import { useMemo, useState } from "react";
import { FAMILY_OPTIONS, STATE_OPTIONS, STATES } from "./cost-calculator-data";

/**
 * Client component porting cost-calculator.html's inline calc() function
 * (legacy lines 239-303) to React controlled inputs + derived state.
 * Formula preserved exactly:
 *   gross = wage * 40h/week * 4.3 weeks/month
 *   net   = gross * (1 - stateTaxRate) * 0.85   (rough combined state+fed ~15% deduction on top of state tax)
 *   rentMid = round(avg(rentRange for family size))
 *   total = rentMid + foodMid + car + insurance + utilities + 80 (misc)
 *   surplus = net - total
 *   pct = min(round(total / net * 100), 120), bar fill capped visually at 100%
 */
function formatUsd(value: number): string {
  return value.toLocaleString("en-US");
}

export function CostCalculatorContent() {
  const [stateId, setStateId] = useState("GA");
  const [familySize, setFamilySize] = useState("1");
  const [wageInput, setWageInput] = useState("16");

  const state = STATES[stateId];
  const family = parseInt(familySize, 10);
  const wage = parseFloat(wageInput) || 16;

  const result = useMemo(() => {
    const gross = wage * 40 * 4.3;
    const taxRate = state.tax / 100;
    const net = gross * (1 - taxRate) * 0.85;

    const rentKey =
      family <= 1 ? "rent1" : family === 2 ? "rent2" : family === 3 ? "rent3" : "rent4";
    const rentRange = state[rentKey];
    const rentMid = Math.round((rentRange[0] + rentRange[1]) / 2);
    const foodMid =
      family <= 1 ? state.food1 : family === 2 ? state.food2 : family === 3 ? state.food3 : state.food4;
    const total = rentMid + foodMid + state.car + state.ins + state.util + 80;

    const surplus = net - total;
    const pct = Math.min(Math.round((total / net) * 100), 120);

    return { gross, net, rentRange, rentMid, foodMid, total, surplus, pct };
  }, [state, family, wage]);

  const surplusColorClass = result.surplus >= 0 ? "text-accent" : "text-red-500";
  const barColorClass = result.pct < 80 ? "bg-accent" : result.pct < 100 ? "bg-secondary" : "bg-red-500";

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <div className="min-w-[150px] flex-1">
          <label
            htmlFor="state-sel"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-text-muted"
          >
            Chọn tiểu bang
          </label>
          <select
            id="state-sel"
            value={stateId}
            onChange={(event) => setStateId(event.target.value)}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary"
          >
            {STATE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[150px] flex-1">
          <label
            htmlFor="family-sel"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-text-muted"
          >
            Số người trong gia đình
          </label>
          <select
            id="family-sel"
            value={familySize}
            onChange={(event) => setFamilySize(event.target.value)}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary"
          >
            {FAMILY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[150px] flex-1">
          <label
            htmlFor="wage"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-text-muted"
          >
            Lương theo giờ ($)
          </label>
          <input
            id="wage"
            type="number"
            value={wageInput}
            min={10}
            max={35}
            onChange={(event) => setWageInput(event.target.value)}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div className="rounded-card border border-border bg-bg p-3.5">
          <div className="text-[11px] font-semibold text-text-muted">
            🏠 Thuê nhà (1BR khu vực NM)
          </div>
          <div className="text-lg font-extrabold text-secondary">
            ${formatUsd(result.rentRange[0])}–${formatUsd(result.rentRange[1])}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">
            Trung bình: ~${formatUsd(result.rentMid)}/tháng
          </div>
        </div>
        <div className="rounded-card border border-border bg-bg p-3.5">
          <div className="text-[11px] font-semibold text-text-muted">
            🛒 Ăn uống ({family} người)
          </div>
          <div className="text-lg font-extrabold text-secondary">
            ~${formatUsd(result.foodMid)}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">
            Bao gồm chợ + ăn ngoài vừa phải
          </div>
        </div>
        <div className="rounded-card border border-border bg-bg p-3.5">
          <div className="text-[11px] font-semibold text-text-muted">
            🚗 Xe hơi (trả góp + xăng)
          </div>
          <div className="text-lg font-extrabold text-secondary">
            ~${formatUsd(state.car)}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">
            Xe cũ $8-12K, xăng ~$180/tháng
          </div>
        </div>
        <div className="rounded-card border border-border bg-bg p-3.5">
          <div className="text-[11px] font-semibold text-text-muted">
            🏥 Bảo hiểm xe + y tế cơ bản
          </div>
          <div className="text-lg font-extrabold text-secondary">
            ~${formatUsd(state.ins)}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Ước tính tối thiểu</div>
        </div>
        <div className="rounded-card border border-border bg-bg p-3.5">
          <div className="text-[11px] font-semibold text-text-muted">
            💡 Điện, nước, internet
          </div>
          <div className="text-lg font-extrabold text-secondary">
            ~${formatUsd(state.util)}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Tùy mùa và căn hộ</div>
        </div>
        <div className="rounded-card border border-border bg-bg p-3.5">
          <div className="text-[11px] font-semibold text-text-muted">
            📦 Chi phí khác (vật dụng, điện thoại)
          </div>
          <div className="text-lg font-extrabold text-secondary">~$80</div>
          <div className="mt-0.5 text-[11px] text-text-muted">
            Tháng đầu cao hơn (mua đồ)
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-card border-2 border-primary bg-primary/10 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2.5">
          <div>
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-text-muted">
              Tổng chi phí ước tính / tháng
            </div>
            <div className="text-3xl font-extrabold text-secondary">
              ~${formatUsd(result.total)}
            </div>
            <div className="mt-1 text-[11.5px] text-text-muted">
              Cho {family} người · {state.name}
            </div>
          </div>
          <div className="text-right">
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-text-muted">
              Lương tháng (net ước tính)
            </div>
            <div className="text-3xl font-extrabold text-primary">
              ~${formatUsd(Math.round(result.net))}
            </div>
            <div className="mt-1 text-[11.5px] text-text-muted">
              ${wage}/giờ · Sau thuế ước tính
            </div>
          </div>
          <div className="w-full text-center">
            <div className="mb-1 text-[11px] font-bold uppercase text-text-muted">
              Còn dư / tháng
            </div>
            <div className={`text-2xl font-extrabold ${surplusColorClass}`}>
              {result.surplus >= 0 ? "+" : ""}${formatUsd(Math.round(result.surplus))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-card border border-border bg-bg p-3.5">
        <div className="mb-2 text-xs text-text-muted">
          Chi phí chiếm <b className="text-text">{result.pct}%</b> thu nhập ước
          tính
        </div>
        <div className="h-5.5 overflow-hidden rounded-md bg-bg-alt">
          <div
            className={`flex h-full items-center px-2 transition-all ${barColorClass}`}
            style={{ width: `${Math.min(result.pct, 100)}%` }}
          >
            <span className="whitespace-nowrap text-[11px] font-bold text-white">
              {result.pct}%
            </span>
          </div>
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-text-muted">
          <span>0%</span>
          <span className="text-accent">Lý tưởng: &lt;80%</span>
          <span>100%+ = thiếu tiền</span>
        </div>
      </div>

      <div className="mt-4 rounded-card border border-border bg-bg p-3.5">
        <div className="mb-2.5 text-sm font-bold text-text">
          {state.flag} {state.name} — Thông Tin Tổng Quan
        </div>
        <div className="flex gap-2 border-b border-border py-1.5 text-xs">
          <span className="w-[100px] flex-shrink-0 font-semibold text-primary">
            💰 Thuế TN
          </span>
          <span className="text-text-muted">
            {state.tax === 0 ? (
              <b className="text-accent">KHÔNG có</b>
            ) : (
              `${state.tax}%`
            )}
          </span>
        </div>
        <div className="flex gap-2 border-b border-border py-1.5 text-xs">
          <span className="w-[100px] flex-shrink-0 font-semibold text-primary">
            🏭 Lương EB3
          </span>
          <span className="text-text-muted">~${state.wage}/giờ điển hình</span>
        </div>
        <div className="flex gap-2 border-b border-border py-1.5 text-xs">
          <span className="w-[100px] flex-shrink-0 font-semibold text-primary">
            🇻🇳 Cộng đồng VN
          </span>
          <span className="text-text-muted">{state.viet}</span>
        </div>
        <div className="flex gap-2 py-1.5 text-xs">
          <span className="w-[100px] flex-shrink-0 font-semibold text-primary">
            📌 Ghi chú
          </span>
          <span className="text-text-muted">{state.notes}</span>
        </div>
      </div>

      <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-[11.5px] leading-relaxed text-text-muted">
        ⚠️ <b className="text-text">Số liệu ước tính tham khảo (2024-2025).</b>{" "}
        Chi phí thực tế phụ thuộc vào địa điểm cụ thể trong bang, lối sống và
        nhiều yếu tố cá nhân. Tham khảo cộng đồng người Việt tại địa phương để
        có số liệu chính xác hơn.
      </div>
    </>
  );
}
