// ─── Historical FY tables (FY2021–FY2025) ───────────────────────────────────
// Static reference data — these fiscal years are closed/finalized and never
// change, ported verbatim from visa-bulletin.html's hardcoded <table> markup
// (FY2026 onward comes from the live API/KV data instead, see page.tsx).
// Cell values use the same date-string convention as VisaBulletinMonth
// ("Current" | ISO date), rendered through the same formatIsoDateToDisplay
// + cell-color helpers as the live FY2026 table for visual consistency.

export interface HistoricalFiscalYearTable {
  fiscalYear: string; // "FY2021"
  monthLabels: string[]; // 12 entries, "Oct-20" .. "Sep-21"
  tableA: (string | null)[]; // 12 entries, ISO date | "Current"
  tableB: (string | null)[];
  latestA: string;
  netDeltaA: string;
  latestB: string;
  netDeltaB: string;
  note?: string;
}

export const HISTORICAL_FY_TABLES: HistoricalFiscalYearTable[] = [
  {
    fiscalYear: "FY2025",
    monthLabels: ["Oct-24","Nov-24","Dec-24","Jan-25","Feb-25","Mar-25","Apr-25","May-25","Jun-25","Jul-25","Aug-25","Sep-25"],
    tableA: ["2020-12-01","2020-12-01","2020-12-01","2020-12-08","2020-12-08","2021-02-01","2021-05-22","2021-05-22","2021-06-22","2021-07-08","2021-07-08","2021-07-08"],
    tableB: ["2021-05-22","2021-05-22","2021-05-22","2021-05-22","2021-05-22","2021-06-22","2021-06-22","2021-07-22","2021-07-22","2021-07-22","2021-07-22","2021-07-22"],
    latestA: "8-Jul-2021",
    netDeltaA: "+7m 7d",
    latestB: "22-Jul-2021",
    netDeltaB: "+6m 14d",
  },
  {
    fiscalYear: "FY2024",
    monthLabels: ["Oct-23","Nov-23","Dec-23","Jan-24","Feb-24","Mar-24","Apr-24","May-24","Jun-24","Jul-24","Aug-24","Sep-24"],
    tableA: ["2020-08-01","2020-08-01","2020-08-01","2020-09-01","2020-09-01","2020-09-08","2020-10-08","2020-10-08","2020-10-08","2021-01-01","2021-01-01","2020-12-01"],
    tableB: ["2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2020-12-15","2021-01-08","2021-01-08","2021-01-08"],
    latestA: "1-Dec-2020",
    netDeltaA: "+7m 0d",
    latestB: "8-Jan-2021",
    netDeltaB: "+7m 7d",
    note: "⚠️ Tháng 9/2024 (Sep-24) bị retrogress từ 1-Jan-2021 về 1-Dec-2020 do quota cạn trước cuối năm tài chính.",
  },
  {
    fiscalYear: "FY2023",
    monthLabels: ["Oct-22","Nov-22","Dec-22","Jan-23","Feb-23","Mar-23","Apr-23","May-23","Jun-23","Jul-23","Aug-23","Sep-23"],
    tableA: ["2020-06-01","2020-06-01","2020-06-01","2020-06-01","2020-01-01","2020-01-01","2020-01-01","2020-01-01","2020-01-01","2020-01-01","2020-05-01","2020-05-01"],
    tableB: ["2022-09-08","2022-09-08","2022-09-08","2022-09-08","2020-02-01","2020-02-01","2020-02-01","2020-02-01","2020-02-01","2020-02-01","2020-06-01","2020-06-01"],
    latestA: "1-May-2020",
    netDeltaA: "+11m 23d",
    latestB: "1-Jun-2020",
    netDeltaB: "N/A",
    note: "⚠️ Feb-23 bị retrogress mạnh: Bảng A từ 1-Jun-2020 về 1-Jan-2020, Bảng B từ 8-Sep-2022 về 1-Feb-2020 (giảm ~31 tháng!). Aug-23 phục hồi cả hai bảng.",
  },
  {
    fiscalYear: "FY2022",
    monthLabels: ["Oct-21","Nov-21","Dec-21","Jan-22","Feb-22","Mar-22","Apr-22","May-22","Jun-22","Jul-22","Aug-22","Sep-22"],
    tableA: ["Current","Current","Current","Current","Current","2019-05-08","2019-05-08","2019-05-08","2019-05-08","2019-05-08","2019-05-08","2019-05-08"],
    tableB: ["Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","Current"],
    latestA: "8-May-2019",
    netDeltaA: "N/A",
    latestB: "Current",
    netDeltaB: "N/A",
    note: "⚠️ Mar-22 retrogress mạnh từ Current về 8-May-2019 — một trong những retrogression lớn nhất lịch sử EB-3 EW.",
  },
  {
    fiscalYear: "FY2021",
    monthLabels: ["Oct-20","Nov-20","Dec-20","Jan-21","Feb-21","Mar-21","Apr-21","May-21","Jun-21","Jul-21","Aug-21","Sep-21"],
    tableA: ["Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","Current"],
    tableB: ["Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","Current","Current"],
    latestA: "Current",
    netDeltaA: "N/A",
    latestB: "Current",
    netDeltaB: "N/A",
  },
];

export interface HistoricalIssuanceRow {
  fiscalYear: string;
  monthlyIssuances: number[]; // 12 entries, Oct..Sep
  subtotalVietnam: number;
  globalTotal: number;
}

// EW Vietnam issuances per month, ported from visa-bulletin.html's
// .iss-wrap table (FY2021–FY2025, finalized DOS figures).
export const HISTORICAL_ISSUANCE_ROWS: HistoricalIssuanceRow[] = [
  { fiscalYear: "FY2021", monthlyIssuances: [0, 0, 0, 0, 0, 3, 5, 27, 16, 8, 0, 4], subtotalVietnam: 63, globalTotal: 1148 },
  { fiscalYear: "FY2022", monthlyIssuances: [14, 30, 52, 66, 55, 84, 57, 56, 51, 28, 29, 26], subtotalVietnam: 548, globalTotal: 9764 },
  { fiscalYear: "FY2023", monthlyIssuances: [26, 19, 93, 26, 34, 48, 53, 55, 44, 481, 288, 644], subtotalVietnam: 1811, globalTotal: 9969 },
  { fiscalYear: "FY2024", monthlyIssuances: [388, 274, 116, 133, 38, 85, 51, 47, 15, 18, 10, 0], subtotalVietnam: 1175, globalTotal: 9826 },
  { fiscalYear: "FY2025", monthlyIssuances: [242, 62, 71, 42, 45, 40, 41, 34, 18, 2, 64, 18], subtotalVietnam: 679, globalTotal: 10000 },
];
