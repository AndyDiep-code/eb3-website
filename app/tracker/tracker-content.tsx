"use client";

import { useEffect, useState } from "react";
import { TrackerCaseStatus } from "./tracker-case-status";
import { TrackerInputForm } from "./tracker-input-form";
import { TrackerResults, type TrackerFormValues } from "./tracker-results";
import { TrackerScratchCalculator } from "./tracker-scratch-calculator";

/**
 * localStorage keys — preserved EXACTLY as in tracker.html's inline script
 * (legacy lines 380-385, 454, 526, 531-532) so users with existing saved
 * data continue to see it after this migration. DO NOT rename.
 *   eb3_pd, eb3_step, eb3_family, eb3_state, eb3_type, eb3_open
 *   cl_${step}_${itemIndex}  (checklist item checked state, step 0-7, item 0-7)
 */
const STORAGE_KEYS = {
  pd: "eb3_pd",
  step: "eb3_step",
  family: "eb3_family",
  state: "eb3_state",
  type: "eb3_type",
  open: "eb3_open",
} as const;

function checklistStorageKey(step: number, itemIndex: number): string {
  return `cl_${step}_${itemIndex}`;
}

/**
 * Main client component for the personal EB-3 tracker. Ported from
 * tracker.html's input form + calculate()/clearData()/window.load handler
 * (legacy lines 220-286, 370-549). All localStorage reads/writes happen
 * here (in useEffect/event handlers, never during render) and are passed
 * down to TrackerResults / TrackerScratchCalculator as derived props.
 */
export function TrackerContent() {
  const [pdInput, setPdInput] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [step, setStep] = useState(0);
  const [family, setFamily] = useState(0);
  const [stateValue, setStateValue] = useState("");
  const [type, setType] = useState("traditional");
  const [showResults, setShowResults] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load saved data on mount — ported from window.addEventListener('load', ...)
  // (legacy lines 538-549). Guarded inside useEffect since localStorage is
  // unavailable during SSR.
  useEffect(() => {
    const savedPd = localStorage.getItem(STORAGE_KEYS.pd);
    if (!savedPd) return;

    const savedStep = parseInt(localStorage.getItem(STORAGE_KEYS.step) ?? "0", 10);
    const savedFamily = parseInt(localStorage.getItem(STORAGE_KEYS.family) ?? "0", 10);
    const savedState = localStorage.getItem(STORAGE_KEYS.state) ?? "";
    const savedType = localStorage.getItem(STORAGE_KEYS.type) ?? "traditional";
    const savedOpen = localStorage.getItem(STORAGE_KEYS.open) ?? "";

    setPdInput(savedPd);
    setStep(savedStep);
    setFamily(savedFamily);
    setStateValue(savedState);
    setType(savedType);
    setOpenDate(savedOpen);

    // Restore checklist checkbox state for the saved step (legacy reads
    // `cl_${step}_${i}` lazily inside calculate()'s render; here we
    // preload every step/item slot so TrackerResults can look it up
    // synchronously without its own localStorage access).
    const restoredChecks: Record<string, boolean> = {};
    for (let stepIndex = 0; stepIndex < 8; stepIndex++) {
      for (let itemIndex = 0; itemIndex < 10; itemIndex++) {
        const key = checklistStorageKey(stepIndex, itemIndex);
        if (localStorage.getItem(key) === "1") {
          restoredChecks[key] = true;
        }
      }
    }
    setCheckedItems(restoredChecks);
    setShowResults(true);
  }, []);

  function handleCalculate() {
    if (!pdInput) {
      alert("Vui lòng nhập Priority Date của bạn!");
      return;
    }

    // Save to localStorage — ported verbatim from legacy lines 380-385.
    localStorage.setItem(STORAGE_KEYS.pd, pdInput);
    localStorage.setItem(STORAGE_KEYS.step, String(step));
    localStorage.setItem(STORAGE_KEYS.family, String(family));
    localStorage.setItem(STORAGE_KEYS.state, stateValue);
    localStorage.setItem(STORAGE_KEYS.type, type);
    localStorage.setItem(STORAGE_KEYS.open, openDate);

    setShowResults(true);
  }

  function handleToggleChecklistItem(stepValue: number, itemIndex: number, checked: boolean) {
    const key = checklistStorageKey(stepValue, itemIndex);
    localStorage.setItem(key, checked ? "1" : "0");
    setCheckedItems((current) => ({ ...current, [key]: checked }));
  }

  function handleClearData() {
    if (!confirm("Xóa toàn bộ dữ liệu hồ sơ đã lưu?")) return;

    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    for (let stepIndex = 0; stepIndex < 8; stepIndex++) {
      for (let itemIndex = 0; itemIndex < 10; itemIndex++) {
        localStorage.removeItem(checklistStorageKey(stepIndex, itemIndex));
      }
    }

    setShowResults(false);
    setPdInput("");
    setOpenDate("");
    setStep(0);
    setFamily(0);
    setStateValue("");
    setType("traditional");
    setCheckedItems({});
  }

  const formValues: TrackerFormValues = { pd: pdInput, step, family };

  return (
    <div>
      <div className="mb-4 flex gap-2.5 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm leading-relaxed text-text">
        <span className="text-lg">🔒</span>
        <div>
          Thông tin bạn nhập <b>chỉ lưu trên trình duyệt của bạn</b>{" "}
          (localStorage). Không gửi lên server. Xóa cache trình duyệt sẽ xóa
          dữ liệu.
        </div>
      </div>

      <div className="mb-4">
        <TrackerScratchCalculator />
      </div>

      <div className="mb-4">
        <TrackerCaseStatus />
      </div>

      <TrackerInputForm
        pdInput={pdInput}
        onPdInputChange={setPdInput}
        openDate={openDate}
        onOpenDateChange={setOpenDate}
        step={step}
        onStepChange={setStep}
        family={family}
        onFamilyChange={setFamily}
        stateValue={stateValue}
        onStateChange={setStateValue}
        type={type}
        onTypeChange={setType}
        onCalculate={handleCalculate}
        onClearData={handleClearData}
      />

      {showResults && (
        <TrackerResults
          values={formValues}
          checkedItems={checkedItems}
          onToggleChecklistItem={handleToggleChecklistItem}
        />
      )}

      <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
        ⚠️ <b className="text-text">Lưu ý:</b> Ước tính thời gian chỉ mang tính
        tham khảo dựa trên tốc độ Visa Bulletin hiện tại. Thực tế có thể thay
        đổi đáng kể do retrogression, quota, và nhiều yếu tố khác. Luôn theo
        dõi Visa Bulletin hàng tháng.
      </div>
    </div>
  );
}
