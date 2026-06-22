// ─── Visa Bulletin data shape ───────────────────────────────────────────────
// Mirrors data/visa-bulletin.json exactly (no schema change — this phase is
// an infra/presentation swap, not a data-model change). Shared between the
// API route (server) and the page/chart components (client).

export interface VisaBulletinMonth {
  month: string; // "2025-10"
  label: string; // "Oct-25"
  table_a: string | null; // ISO date, "Current", or null (unpublished)
  table_b: string | null;
  ew_vietnam: number | null;
}

export interface VisaBulletinCarryOver {
  table_a_prior_sep: string; // ISO date or "Current"
  table_b_prior_sep: string;
  delta_base_index: number;
}

export interface VisaBulletinData {
  updated: string; // ISO timestamp
  fy: number;
  fy_start_month: string; // "2025-10"
  months: VisaBulletinMonth[];
  carry_over: VisaBulletinCarryOver;
}
