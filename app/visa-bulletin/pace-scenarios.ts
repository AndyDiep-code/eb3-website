// Shared VB-advance-pace assumptions — single source of truth so every
// tool that projects "months until my Priority Date is current" (the
// /visa-bulletin predictor and the /tracker estimate) shows the same
// scenario range instead of silently disagreeing on what "average" means.
export interface PaceScenario {
  id: "slow" | "mod" | "fast";
  labelVi: string;
  rateDaysPerMonth: number;
  emoji: string;
}

export const PACE_SCENARIOS: PaceScenario[] = [
  { id: "slow", labelVi: "Kịch Bản Chậm", rateDaysPerMonth: 8, emoji: "🐢" },
  { id: "mod", labelVi: "Kịch Bản Trung Bình", rateDaysPerMonth: 18, emoji: "⚖️" },
  { id: "fast", labelVi: "Kịch Bản Lạc Quan", rateDaysPerMonth: 30, emoji: "🚀" },
];
