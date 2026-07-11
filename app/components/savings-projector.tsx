"use client";

import { useEffect, useState } from "react";
import { SavingsChart } from "./savings-chart";

interface Goal {
  id: string;
  name: string;
  amount: number;
}

const DEFAULT_GOALS: Goal[] = [
  { id: "emergency", name: "Quỹ Khẩn Cấp", amount: 5000 },
  { id: "tickets", name: "Vé Máy Bay Gia Đình (4 người)", amount: 8000 },
  { id: "car", name: "Trả Trước Mua Xe", amount: 3000 },
  { id: "sponsor", name: "Chi Phí Bảo Lãnh Gia Đình", amount: 7500 },
];

function projectGoal(
  goal: Goal,
  currentSavings: number,
  monthlySave: number,
): { months: number; date: Date | null } {
  if (currentSavings >= goal.amount) return { months: 0, date: new Date() };
  if (monthlySave <= 0) return { months: -1, date: null };
  const months = Math.ceil((goal.amount - currentSavings) / monthlySave);
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return { months, date };
}

function fmtGoalDate(date: Date | null, months: number): string {
  if (months === 0) return "Đã đạt!";
  if (months < 0 || !date) return "—";
  if (months > 120) return `~${Math.round(months / 12)} năm`;
  return date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });
}

export function SavingsProjector() {
  const [currentSavings, setCurrentSavings] = useState(0);
  const [monthlySave, setMonthlySave] = useState(400);
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const c = localStorage.getItem("eb3_sp_current");
      const m = localStorage.getItem("eb3_sp_monthly_save");
      const g = localStorage.getItem("eb3_sp_goals");
      if (c) setCurrentSavings(Number(c));
      if (m) setMonthlySave(Number(m));
      if (g) setGoals(JSON.parse(g) as Goal[]);
    } catch {
      /* ignore */
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("eb3_sp_current", String(currentSavings));
      localStorage.setItem("eb3_sp_monthly_save", String(monthlySave));
      localStorage.setItem("eb3_sp_goals", JSON.stringify(goals));
    } catch {
      /* ignore */
    }
  }, [currentSavings, monthlySave, goals]);

  function addGoal() {
    setGoals((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "Mục Tiêu Mới", amount: 1000 },
    ]);
  }

  function removeGoal(id: string) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  function updateGoal(id: string, field: "name" | "amount", value: string) {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, [field]: field === "amount" ? Number(value) || 0 : value }
          : g,
      ),
    );
  }

  const inputClass =
    "rounded-btn border border-border bg-bg-alt px-2 py-1.5 text-sm text-text focus:border-primary focus:outline-none";

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
      {/* Header */}
      <h1 className="text-xl font-bold text-text">💰 Tính Tiết Kiệm Theo Mục Tiêu</h1>

      {/* Inputs card */}
      <div className="rounded-card border border-border bg-bg p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-text-muted">
              Tiết kiệm hiện tại ($)
            </label>
            <input
              type="number"
              min={0}
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
              className={`w-full ${inputClass}`}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-text-muted">
              Tiết kiệm thêm mỗi tháng ($)
            </label>
            <input
              type="number"
              min={0}
              value={monthlySave}
              onChange={(e) => setMonthlySave(Number(e.target.value) || 0)}
              className={`w-full ${inputClass}`}
            />
            <p className="mt-1 text-[10px] text-text-muted">
              Chưa biết lương net?{" "}
              <a href="/net-pay" className="text-primary underline">
                Tính ở /net-pay →
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* No monthly savings warning */}
      {monthlySave <= 0 && (
        <div className="rounded-card border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          Nhập số tiền tiết kiệm hàng tháng để tính
        </div>
      )}

      {/* Goals card */}
      <div className="rounded-card border border-border bg-bg p-4">
        <div className="mb-3 text-sm font-bold text-text">Mục Tiêu Tài Chính</div>
        <div className="space-y-2">
          {goals.map((goal) => {
            const { months, date } = projectGoal(goal, currentSavings, monthlySave);
            const badgeClass =
              months === 0
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                : months < 0
                  ? "bg-bg-alt text-text-muted"
                  : "bg-primary/10 text-primary";
            return (
              <div
                key={goal.id}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-bg-alt p-2"
              >
                <input
                  type="text"
                  value={goal.name}
                  onChange={(e) => updateGoal(goal.id, "name", e.target.value)}
                  className={`min-w-0 flex-1 ${inputClass}`}
                />
                <input
                  type="number"
                  min={0}
                  value={goal.amount}
                  onChange={(e) => updateGoal(goal.id, "amount", e.target.value)}
                  className={`w-28 ${inputClass}`}
                />
                <span className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold ${badgeClass}`}>
                  {fmtGoalDate(date, months)}
                </span>
                <button
                  onClick={() => removeGoal(goal.id)}
                  className="shrink-0 rounded px-1.5 py-0.5 text-sm text-text-muted hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  aria-label="Xóa mục tiêu"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={addGoal}
          className="mt-3 rounded-btn border border-dashed border-primary px-3 py-1.5 text-sm text-primary hover:bg-primary/5"
        >
          Thêm mục tiêu +
        </button>
      </div>

      {/* Chart */}
      {monthlySave > 0 && (
        <div className="rounded-card border border-border bg-bg p-4">
          <div className="mb-2 text-xs font-bold text-primary">📈 Dự Kiến Tích Lũy</div>
          <SavingsChart
            currentSavings={currentSavings}
            monthlySave={monthlySave}
            goals={goals}
          />
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[11px] text-text-muted">
        Ước tính dựa trên tiết kiệm đều hàng tháng, không tính lãi suất.
      </p>
    </div>
  );
}
