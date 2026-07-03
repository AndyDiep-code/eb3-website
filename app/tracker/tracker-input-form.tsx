"use client";

import { FAMILY_OPTIONS, STATE_OPTIONS, STEP_OPTIONS } from "./tracker-data";

export interface TrackerInputFormProps {
  pdInput: string;
  onPdInputChange: (value: string) => void;
  openDate: string;
  onOpenDateChange: (value: string) => void;
  step: number;
  onStepChange: (value: number) => void;
  family: number;
  onFamilyChange: (value: number) => void;
  stateValue: string;
  onStateChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  onCalculate: () => void;
  onClearData: () => void;
}

/**
 * "Thông Tin Hồ Sơ Của Bạn" input form, split out of tracker-content.tsx
 * to keep each file under ~200 lines. Ported from tracker.html's form
 * markup (legacy lines 220-286) — same fields, same select option values.
 */
export function TrackerInputForm({
  pdInput,
  onPdInputChange,
  openDate,
  onOpenDateChange,
  step,
  onStepChange,
  family,
  onFamilyChange,
  stateValue,
  onStateChange,
  type,
  onTypeChange,
  onCalculate,
  onClearData,
}: TrackerInputFormProps) {
  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <h2 className="text-sm font-bold text-text">📝 Thông Tin Hồ Sơ Của Bạn</h2>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Priority Date (PD) của bạn">
          <input
            type="date"
            value={pdInput}
            onChange={(event) => onPdInputChange(event.target.value)}
            className="w-full rounded-btn border border-border bg-bg-alt px-3 py-2 text-sm text-text outline-none focus:border-primary"
          />
        </Field>
        <Field label="Ngày mở hồ sơ với agency">
          <input
            type="date"
            value={openDate}
            onChange={(event) => onOpenDateChange(event.target.value)}
            className="w-full rounded-btn border border-border bg-bg-alt px-3 py-2 text-sm text-text outline-none focus:border-primary"
          />
        </Field>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Bước hiện tại của hồ sơ">
          <select
            value={step}
            onChange={(event) => onStepChange(Number(event.target.value))}
            className="w-full rounded-btn border border-border bg-bg-alt px-3 py-2 text-sm text-text outline-none focus:border-primary"
          >
            {STEP_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Số người đi cùng (vợ/chồng + con)">
          <select
            value={family}
            onChange={(event) => onFamilyChange(Number(event.target.value))}
            className="w-full rounded-btn border border-border bg-bg-alt px-3 py-2 text-sm text-text outline-none focus:border-primary"
          >
            {FAMILY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Tiểu bang làm việc">
          <select
            value={stateValue}
            onChange={(event) => onStateChange(event.target.value)}
            className="w-full rounded-btn border border-border bg-bg-alt px-3 py-2 text-sm text-text outline-none focus:border-primary"
          >
            {STATE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Diện">
          <select
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            className="w-full rounded-btn border border-border bg-bg-alt px-3 py-2 text-sm text-text outline-none focus:border-primary"
          >
            <option value="traditional">Truyền thống (từ Việt Nam)</option>
            <option value="aos">Chuyển diện (đang ở Mỹ)</option>
          </select>
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={onCalculate}
          className="rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          📊 Xem Timeline &amp; Ước Tính
        </button>
        <button
          type="button"
          onClick={onClearData}
          className="rounded-btn border border-border px-5 py-2 text-sm font-semibold text-text-muted hover:text-text"
        >
          🗑️ Xóa dữ liệu
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
