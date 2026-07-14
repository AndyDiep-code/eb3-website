"use client";

import { useState } from "react";
import { STATES, STATE_OPTIONS } from "../cost-calculator/cost-calculator-data";

interface IndustryData {
  emoji: string;
  label: string;
  roles: string[];
  hourlyMin: number;
  hourlyMax: number;
  companies: string;
  states: string;
  demand: "Rất cao" | "Cao" | "Trung bình";
  notes: string;
}

const INDUSTRIES: IndustryData[] = [
  {
    emoji: "🐔", label: "Chế Biến Gia Cầm",
    roles: ["Poultry Trimmer", "Deboner", "Line Worker"],
    hourlyMin: 15, hourlyMax: 20,
    companies: "Tyson, Perdue, Wayne Farms, Koch Foods, Mountaire",
    states: "GA, AL, AR, MS, SC, NC",
    demand: "Rất cao",
    notes: "Nhiều ca đêm, overtime nhiều. Tyson và Perdue có ESL training tại chỗ.",
  },
  {
    emoji: "🥩", label: "Chế Biến Thịt (Beef/Pork)",
    roles: ["Meat Packer", "Trimmer", "Sanitation Worker"],
    hourlyMin: 17, hourlyMax: 23,
    companies: "JBS USA, Cargill, Smithfield, Tyson Fresh Meats",
    states: "TX, MN, PA, IA, NE",
    demand: "Cao",
    notes: "Lương cao hơn gia cầm. Môi trường lạnh (~35°F). Một số hãng có housing hỗ trợ.",
  },
  {
    emoji: "🏭", label: "Sản Xuất Thực Phẩm",
    roles: ["Production Operator", "Packaging", "QC Inspector"],
    hourlyMin: 15, hourlyMax: 21,
    companies: "ConAgra, Pilgrim's Pride, McCain Foods, Ralcorp",
    states: "GA, IN, OH, WI, TX, NC",
    demand: "Cao",
    notes: "Giờ làm ổn định hơn chế biến thịt. Benefit tốt sau 90 ngày probation.",
  },
  {
    emoji: "⚙️", label: "Sản Xuất Công Nghiệp",
    roles: ["Machine Operator", "Assembly Worker", "Press Operator"],
    hourlyMin: 17, hourlyMax: 26,
    companies: "BMW (SC), Honda (IN), Toyota (TX, IN), Subaru (IN)",
    states: "IN, SC, OH, TX, GA, AL",
    demand: "Cao",
    notes: "Lương cao nhất danh sách. Cần kỹ năng kỹ thuật cơ bản. Nhiều overtime.",
  },
  {
    emoji: "🏨", label: "Khách Sạn & Khu Nghỉ",
    roles: ["Housekeeper", "Laundry", "Banquet Server", "Steward"],
    hourlyMin: 14, hourlyMax: 18,
    companies: "TPI Hospitality (WI), Marcus Hotels, Kalahari, Marriott, Hilton",
    states: "WI, MN, SD, NV, FL, OH",
    demand: "Cao",
    notes: "TPI Hospitality có chương trình EB-3 lớn nhất ngành. Mùa hè bận rộn hơn.",
  },
  {
    emoji: "💊", label: "Chăm Sóc Sức Khỏe (CNA/HHA)",
    roles: ["Home Health Aide", "Certified Nursing Aide", "Personal Care Attendant"],
    hourlyMin: 14, hourlyMax: 20,
    companies: "BrightSpring, Amedisys, LHC Group, Genesis Healthcare",
    states: "OH, PA, MN, WI, FL, TX",
    demand: "Rất cao",
    notes: "Nhu cầu cao do dân số già. Một số bang yêu cầu chứng chỉ CNA (4-8 tuần).",
  },
  {
    emoji: "📦", label: "Kho Bãi & Logistics",
    roles: ["Forklift Operator", "Picker/Packer", "Shipping/Receiving"],
    hourlyMin: 16, hourlyMax: 22,
    companies: "Amazon FC, Walmart DC, FedEx, UPS, XPO Logistics",
    states: "GA, TX, OH, PA, IN, NV",
    demand: "Cao",
    notes: "Forklift cert tăng lương $2-3/hr. Peak Q4 overtime cao. Amazon có benefit ngay.",
  },
  {
    emoji: "🐟", label: "Chế Biến Thủy Sản",
    roles: ["Fish Processor", "Line Worker", "Quality Grader"],
    hourlyMin: 13, hourlyMax: 17,
    companies: "Delta Pride Catfish, Consolidated Catfish, Simmons Farm",
    states: "MS, AR, AL",
    demand: "Trung bình",
    notes: "Tập trung ở Mississippi Delta. Chi phí sinh hoạt khu vực rất thấp bù lại lương.",
  },
];

const DEMAND_COLOR: Record<string, string> = {
  "Rất cao": "bg-accent/15 text-accent",
  "Cao": "bg-primary/15 text-primary",
  "Trung bình": "bg-bg-alt text-text-muted",
};

export function SalaryGuideContent() {
  const [stateId, setStateId] = useState("GA");
  const state = STATES[stateId];
  const stateWage = state.wage;
  const stateMonthlyGross = Math.round(stateWage * 40 * 4.3);

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            So sánh với lương EB-3 tại bang
          </label>
          <select
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary"
          >
            {STATE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="rounded-card border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm">
          <span className="text-text-muted">Lương EB-3 điển hình ở </span>
          <span className="font-bold text-primary">{state.name}</span>
          <span className="text-text-muted"> ≈ </span>
          <span className="font-bold text-text">${stateWage}/giờ</span>
          <span className="text-text-muted"> ≈ ${stateMonthlyGross.toLocaleString()}/tháng gross</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {INDUSTRIES.map((ind) => {
          const midHourly = (ind.hourlyMin + ind.hourlyMax) / 2;
          const indMonthly = Math.round(midHourly * 40 * 4.3);
          const vsState = midHourly > stateWage;
          return (
            <div key={ind.label} className="rounded-card border border-border bg-bg p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{ind.emoji}</span>
                  <span className="text-sm font-bold text-text">{ind.label}</span>
                </div>
                <span className={`rounded-btn px-2 py-0.5 text-[10px] font-bold ${DEMAND_COLOR[ind.demand]}`}>
                  {ind.demand}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-xl font-extrabold text-secondary">${ind.hourlyMin}–${ind.hourlyMax}</span>
                <span className="text-xs text-text-muted">/giờ</span>
                <span className="text-xs text-text-muted">≈ ${indMonthly.toLocaleString()}/tháng</span>
                <span className={`text-[10px] font-semibold ${vsState ? "text-accent" : "text-text-muted"}`}>
                  {vsState ? "▲ cao hơn điển hình" : "≈ tương đương"}
                </span>
              </div>
              <div className="mt-2 space-y-0.5 text-[11px] text-text-muted">
                <div><span className="font-medium text-text">Vai trò: </span>{ind.roles.join(" · ")}</div>
                <div><span className="font-medium text-text">Hãng: </span>{ind.companies}</div>
                <div><span className="font-medium text-text">Bang: </span>{ind.states}</div>
              </div>
              <div className="mt-2 rounded-btn bg-bg-alt px-2 py-1.5 text-[11px] text-text-muted">
                💡 {ind.notes}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-[11.5px] leading-relaxed text-text-muted">
        ⚠️ <b className="text-text">Số liệu ước tính dựa trên BLS Occupational Employment Statistics 2024.</b>{" "}
        Lương thực tế phụ thuộc vào bang, hãng, kinh nghiệm, và loại hình công việc. Tham khảo{" "}
        <a href="https://www.bls.gov/oes/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          bls.gov/oes
        </a>{" "}
        để tra cứu số liệu chính thức. Xem thêm{" "}
        <a href="/cost-calculator" className="text-primary hover:underline">Chi Phí Sinh Hoạt</a>{" "}
        để so sánh thu nhập và chi phí theo bang.
      </div>
    </>
  );
}
