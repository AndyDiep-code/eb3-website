"use client";

import { useState } from "react";

type PetitionerStatus = "pr" | "citizen";
type RelationshipType = "spouse" | "child_u21" | "child_o21" | "child_married" | "parent" | "sibling";

interface ToolResult {
  category: string;
  immediate: boolean;
  wait: string;
  cost: string;
  steps: string[];
  note: string;
}

type ResultMap = Record<PetitionerStatus, Partial<Record<RelationshipType, ToolResult | null>>>;

const RESULTS: ResultMap = {
  pr: {
    spouse: {
      category: "F2A — Family Second Preference A",
      immediate: false, wait: "~2-3 năm",
      cost: "$675 (I-130) + $445 visa ĐSQ hoặc $1,440 I-485 tại Mỹ",
      steps: ["Nộp I-130 + I-864 (~6-9 tháng duyệt)", "Chờ F2A priority date theo Visa Bulletin", "DS-260 (lãnh sự) hoặc I-485 (đang ở Mỹ), phỏng vấn, nhận GC"],
      note: "Nhập tịch sau 5 năm rút ngắn xuống ~1 năm (Immediate Relative IR-1).",
    },
    child_u21: {
      category: "F2A — Family Second Preference A",
      immediate: false, wait: "~2-3 năm",
      cost: "$675 (I-130) + $445 visa ĐSQ hoặc $1,440 I-485",
      steps: ["Nộp I-130", "Chờ F2A priority date", "Phỏng vấn ĐSQ VN hoặc I-485 tại Mỹ"],
      note: "Chú ý CSPA nếu con gần 21 tuổi — tuổi CSPA có thể giúp con vẫn đủ điều kiện.",
    },
    parent: null,
    sibling: null,
    child_o21: null,
    child_married: null,
  },
  citizen: {
    spouse: {
      category: "IR-1 — Immediate Relative",
      immediate: true, wait: "~9-12 tháng (không giới hạn visa/năm)",
      cost: "$675 (I-130) + $445 visa ĐSQ hoặc $1,440 I-485",
      steps: ["Nộp I-130 + I-864", "USCIS duyệt (~6-8 tháng)", "DS-260 hoặc I-485, phỏng vấn, nhận GC"],
      note: "Đây là con đường nhanh nhất. Không cần chờ Visa Bulletin.",
    },
    child_u21: {
      category: "IR-2 — Immediate Relative",
      immediate: true, wait: "~9-12 tháng",
      cost: "$675 (I-130) + $445 visa ĐSQ hoặc $1,440 I-485",
      steps: ["Nộp I-130", "USCIS duyệt", "DS-260 hoặc I-485, phỏng vấn, nhận GC"],
      note: "Con phải độc thân và dưới 21 tuổi. CSPA có thể bảo vệ nếu con gần 21.",
    },
    parent: {
      category: "IR-5 — Immediate Relative (Cha/Mẹ)",
      immediate: true, wait: "~9-12 tháng",
      cost: "$675/đơn (cha và mẹ là 2 đơn riêng) + $445 visa hoặc $1,440 I-485",
      steps: ["Nộp I-130 riêng cho từng người (cha và mẹ)", "USCIS duyệt", "DS-260 hoặc I-485, phỏng vấn, nhận GC"],
      note: "CHỈ công dân Mỹ mới bảo lãnh được cha/mẹ. PR không có quyền này.",
    },
    child_o21: {
      category: "F1 — First Preference (Con độc thân trên 21)",
      immediate: false, wait: "~7-10 năm (Việt Nam có backlog)",
      cost: "$675 (I-130) + $445 visa hoặc $1,440 I-485",
      steps: ["Nộp I-130 — lấy Priority Date", "Chờ F1 visa bulletin (VN backlog dài)", "DS-260 hoặc I-485 khi đến lượt"],
      note: "Con phải độc thân. Nếu kết hôn trong lúc chờ → chuyển sang diện F3 (~12 năm).",
    },
    child_married: {
      category: "F3 — Third Preference (Con đã kết hôn)",
      immediate: false, wait: "~10-14 năm",
      cost: "$675 (I-130) + $445 visa hoặc $1,440 I-485",
      steps: ["Nộp I-130 — lấy Priority Date", "Chờ F3 priority date (rất dài)", "DS-260 hoặc I-485 khi đến lượt"],
      note: "Spouse và con của người được bảo lãnh cũng được đi theo (derivative beneficiary).",
    },
    sibling: {
      category: "F4 — Fourth Preference (Anh/chị/em)",
      immediate: false, wait: "~20-25 năm (VN backlog rất dài)",
      cost: "$675 (I-130) + $445 visa hoặc $1,440 I-485",
      steps: ["Nộp I-130 — lấy Priority Date ngay bây giờ", "Chờ F4 rất lâu (VN priority date hiện tại ~2001)", "DS-260 hoặc I-485 khi đến lượt"],
      note: "CHỈ công dân Mỹ mới bảo lãnh anh/chị/em. Nộp I-130 sớm nhất có thể để lấy PD.",
    },
  },
};

const PR_UNAVAILABLE: RelationshipType[] = ["parent", "sibling", "child_o21", "child_married"];
const UNAVAILABLE_LABELS: Record<string, string> = {
  parent: "cha/mẹ", sibling: "anh/chị/em ruột",
  child_o21: "con độc thân trên 21", child_married: "con đã kết hôn",
};

export function FamilyPetitionTool() {
  const [petitioner, setPetitioner] = useState<PetitionerStatus>("pr");
  const [rel, setRel] = useState<RelationshipType>("spouse");

  const isUnavailable = petitioner === "pr" && PR_UNAVAILABLE.includes(rel);
  const result = isUnavailable ? null : RESULTS[petitioner]?.[rel];

  return (
    <div>
      <p className="mb-4 text-sm text-text-muted">
        Chọn tư cách hiện tại và quan hệ để xem diện bảo lãnh, thời gian chờ, chi phí, và các bước chính.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-muted">Tư cách của bạn</label>
          <div className="flex gap-2">
            {([["pr", "💚 Thẻ Xanh (PR)"], ["citizen", "🦅 Công Dân Mỹ"]] as [PetitionerStatus, string][]).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setPetitioner(val)}
                className={`flex-1 rounded-btn border px-3 py-2 text-sm font-semibold transition-colors ${
                  petitioner === val ? "border-primary bg-primary text-white" : "border-border bg-bg text-text-muted hover:text-text"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-muted">Quan hệ với người muốn bảo lãnh</label>
          <select
            value={rel}
            onChange={(e) => setRel(e.target.value as RelationshipType)}
            className="w-full rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text outline-none"
          >
            <option value="spouse">Vợ / Chồng</option>
            <option value="child_u21">Con độc thân dưới 21 tuổi</option>
            <option value="child_o21">Con độc thân trên 21 tuổi</option>
            <option value="child_married">Con đã kết hôn</option>
            <option value="parent">Cha / Mẹ</option>
            <option value="sibling">Anh / Chị / Em ruột</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        {isUnavailable ? (
          <div className="rounded-card border border-secondary/40 bg-secondary/10 p-4 text-sm text-text">
            <div className="font-bold">❌ PR không bảo lãnh được {UNAVAILABLE_LABELS[rel]}</div>
            <p className="mt-1.5 text-xs text-text-muted">
              Quyền bảo lãnh {UNAVAILABLE_LABELS[rel]} CHỈ dành cho công dân Mỹ (U.S. Citizen).
              Bạn có thể nhập tịch sau 5 năm có thẻ xanh để mở khóa diện Immediate Relative cho cha/mẹ
              và diện F4 cho anh/chị/em.
            </p>
          </div>
        ) : result ? (
          <div className="space-y-3">
            <div className={`rounded-card border p-4 ${result.immediate ? "border-accent/40 bg-accent/10" : "border-primary/30 bg-primary/5"}`}>
              <div className="text-sm font-bold text-text">
                {result.immediate ? "✅ Immediate Relative — Không cần chờ Visa Bulletin" : "📋 Preference Category — Cần chờ Visa Bulletin"}
              </div>
              <div className="mt-1 text-xs text-text-muted">{result.category}</div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm">
                <div><span className="text-text-muted">Thời gian: </span>
                  <span className={`font-bold ${result.immediate ? "text-accent" : "text-secondary"}`}>{result.wait}</span>
                </div>
              </div>
            </div>

            <div className="rounded-card border border-border bg-bg p-3 text-sm">
              <div className="mb-1 text-xs font-bold text-text">💰 Chi Phí Ước Tính</div>
              <div className="text-text-muted">{result.cost}</div>
              <div className="mt-1 text-[11px] text-text-muted">+ khám sức khỏe $200-500/người + dịch thuật VN $50-150/giấy</div>
            </div>

            <div className="rounded-card border border-border bg-bg p-3">
              <div className="mb-1.5 text-xs font-bold text-text">📋 Các Bước Chính</div>
              <ol className="space-y-1.5 text-sm text-text-muted">
                {result.steps.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 font-bold text-primary">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-card border border-border bg-bg-alt p-3 text-xs text-text-muted">
              💡 {result.note}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
