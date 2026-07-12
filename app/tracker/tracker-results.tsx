"use client";

import { CHECKLISTS, STEPS, type ChecklistUrgency } from "./tracker-data";
import { PACE_SCENARIOS } from "../visa-bulletin/pace-scenarios";
import { EstimateAlert, Timeline } from "./tracker-timeline";

export interface TrackerFormValues {
  pd: string;
  step: number;
  family: number;
}

interface TrackerResultsProps {
  values: TrackerFormValues;
  checkedItems: Record<string, boolean>;
  onToggleChecklistItem: (step: number, itemIndex: number, checked: boolean) => void;
  /** Latest published Bảng A date (ISO) or "Current", from live Visa Bulletin data. */
  currentVbAIso: string;
  /** Display label for that same month, e.g. "Jul-2026". */
  currentVbLabel: string;
}

const BADGE_CLASS: Record<ChecklistUrgency, string> = {
  hot: "bg-red-900/40 text-red-300",
  med: "bg-amber-900/40 text-amber-300",
  ok: "bg-emerald-900/40 text-emerald-300",
};

const BADGE_LABEL: Record<ChecklistUrgency, string> = {
  hot: "🔴 Cần ngay",
  med: "🟡 Quan trọng",
  ok: "🟢 Nên làm",
};

/**
 * Results section ported from tracker.html's calculate() DOM-rendering
 * logic (legacy lines 370-464): stats grid, estimate alert, timeline,
 * quick links, checklist. Pure render — all calculation/persistence
 * happens in the parent (TrackerContent), this component only displays
 * derived values and forwards checklist toggle events upward.
 */
export function TrackerResults({
  values,
  checkedItems,
  onToggleChecklistItem,
  currentVbAIso,
  currentVbLabel,
}: TrackerResultsProps) {
  const { pd: pdInput, step, family } = values;
  const pd = new Date(pdInput);
  const today = new Date();

  // "Current" means Bảng A has no cutoff date — every PD is already current.
  // daysUntilCurrent: positive = PD is ahead of FAD = still waiting; <=0 = already current
  const daysUntilCurrent =
    currentVbAIso === "Current"
      ? -1
      : Math.floor((pd.getTime() - new Date(currentVbAIso).getTime()) / 86400000);
  const isCurrent = daysUntilCurrent <= 0;

  // Gap in calendar months between PD and current FAD
  const gapTotalMonths = Math.round(daysUntilCurrent / 30.44);
  const gapYears = Math.floor(gapTotalMonths / 12);
  const gapRemMonths = gapTotalMonths % 12;
  const gapLabel =
    gapYears > 0
      ? gapRemMonths > 0
        ? `${gapYears} năm ${gapRemMonths} tháng`
        : `${gapYears} năm`
      : `${gapTotalMonths} tháng`;

  const scenarios = isCurrent
    ? []
    : PACE_SCENARIOS.map((scenario) => ({
        ...scenario,
        monthsToWait: Math.ceil(daysUntilCurrent / scenario.rateDaysPerMonth),
      }));

  const pdFormatted = pd.toLocaleDateString("vi-VN", {
    month: "long",
    year: "numeric",
  });

  const pdStatus = isCurrent ? "✅ Đã qua VB" : `cách ${gapLabel}`;
  const govCost =
    1315 + 345 * (family + 1) + 235 * (family + 1) + 85 * (family + 1) + 240 + 220 * family;

  const checklistItems = CHECKLISTS[step] ?? [];

  return (
    <div className="mt-4 space-y-4">
      {/* STATS */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <StatCard value={pdFormatted} label="Priority Date của bạn" />
        <StatCard
          value={pdStatus}
          label="Khoảng cách đến VB hiện tại"
          valueClassName={isCurrent ? "text-accent" : "text-secondary"}
        />
        <StatCard value={`${family + 1} người`} label="Đương đơn + người đi kèm" />
        <StatCard
          value={`~$${govCost.toLocaleString()}`}
          label="Ước tính phí chính phủ"
        />
      </div>

      <EstimateAlert
        isCurrent={isCurrent}
        scenarios={scenarios}
        gapLabel={gapLabel}
        currentVbLabel={currentVbLabel}
        today={today}
      />

      {/* TIMELINE */}
      <div className="rounded-card border border-border bg-bg p-4">
        <h2 className="text-sm font-bold text-text">📅 Timeline Hồ Sơ</h2>
        <Timeline currentStep={step} />
      </div>

      {/* QUICK LINKS */}
      <div className="rounded-card border border-border bg-bg p-4">
        <h2 className="text-sm font-bold text-text">🔗 Tra Cứu Nhanh</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <QuickLink href="https://flag.dol.gov/case-status-search" label="🔍 Check LC Status (DOL)" />
          <QuickLink href="https://egov.uscis.gov/" label="📋 Check I-140 (USCIS)" />
          <QuickLink href="https://ceac.state.gov/IV/Login.aspx" label="🏛 CEAC / DS-260 (NVC)" />
          <QuickLink href="https://flag.dol.gov/processingtimes" label="⏱ DOL Processing Times" />
          <QuickLink href="https://egov.uscis.gov/processing-times/" label="🕒 USCIS Processing Times" />
          <QuickLink href="/visa-bulletin" label="📅 Visa Bulletin hiện tại" />
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="overflow-hidden rounded-card border border-border bg-bg">
        <div className="border-b border-border bg-bg-alt px-4 py-3 text-sm font-bold text-text">
          ✅ Việc Cần Làm — Bước {step + 1}: {STEPS[step]?.label}
        </div>
        <div>
          {checklistItems.map((item, index) => {
            const checked = checkedItems[`cl_${step}_${index}`] === true;
            return (
              <label
                key={index}
                className="flex cursor-pointer items-start gap-2.5 border-b border-border px-4 py-2.5 last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) =>
                    onToggleChecklistItem(step, index, event.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary"
                />
                <span
                  className={`flex-1 text-sm leading-relaxed ${
                    checked ? "text-text-muted/50 line-through" : "text-text-muted"
                  }`}
                >
                  {item.t}
                </span>
                <span
                  className={`mt-0.5 flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${BADGE_CLASS[item.u]}`}
                >
                  {BADGE_LABEL[item.u]}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  valueClassName = "text-secondary",
}: {
  value: string;
  label: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-card border border-border bg-bg p-3 text-center">
      <div className={`text-lg font-extrabold ${valueClassName}`}>{value}</div>
      <div className="mt-0.5 text-[10px] text-text-muted">{label}</div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-btn border border-border px-3 py-1.5 text-xs text-primary hover:border-primary"
    >
      {label}
    </a>
  );
}
