// Static section: USCIS I-140 backlog + NVC waiting list for Vietnam (EW3)
// Data sources:
//   - USCIS RADP report (I-140 Vietnam FY2014–FY2026 Q1)
//   - DOS Annual Report of the Visa Office FY2024 (Table V & VI)
//   - DOS NVC Waiting List — EW/Other Workers (travel.state.gov)

const I140_EW3_ROWS = [
  { fy: "FY2022", approved: 521,   note: "" },
  { fy: "FY2023", approved: 1_636, note: "↑3x so với FY2022" },
  { fy: "FY2024", approved: 3_277, note: "↑2x so với FY2023" },
  { fy: "FY2025", approved: 5_339, note: "🔺 Kỷ lục mọi thời đại" },
  { fy: "FY2026 Q1", approved: 248, note: "3 tháng đầu (Oct–Dec 2025)" },
];

const TOTAL_I140_EW3 = 13_799; // cumulative FY2014–FY2026 Q1

// FY2026 Q1: approvals by country of birth (EB3 EW3 only)
// Source: USCIS RADP FY26 Q1 App-COB sheet
const FY2026Q1_EW3_COUNTRIES = [
  { country: "Vietnam",     count: 3_468, pct: 33.0, highlight: true },
  { country: "Mexico",      count: 1_633, pct: 15.5, highlight: false },
  { country: "Bangladesh",  count:   668, pct:  6.4, highlight: false },
  { country: "Philippines", count: 1_160, pct: 11.0, highlight: false },
  { country: "All Others",  count: 3_579, pct: 34.1, highlight: false },
  { country: "Grand Total", count: 10_508, pct: 100,  highlight: false },
];

// DOS NVC EW/Other Worker waiting list (most recent public disclosure)
const NVC_WAITING = [
  { country: "Mexico",     count: 8_173, pct: 18.4, rank: 1, highlight: false },
  { country: "Philippines",count: 5_892, pct: 13.3, rank: 2, highlight: false },
  { country: "Vietnam",    count: 4_911, pct: 11.0, rank: 3, highlight: true },
  { country: "China",      count: 4_467, pct: 10.0, rank: 4, highlight: false },
  { country: "Bangladesh", count: 3_064, pct:  6.9, rank: 5, highlight: false },
  { country: "All Others", count: 17_963, pct: 40.4, rank: 0, highlight: false },
];
const NVC_TOTAL = 44_470;

export function BacklogStats() {
  return (
    <section className="mt-6 rounded-card border border-border bg-bg p-4">
      <h2 className="text-base font-semibold text-text">
        📊 Hồ Sơ Tồn Đọng — Số Liệu USCIS & DOS (2022–2026)
      </h2>
      <p className="mt-1 text-xs text-text-muted">
        Nguồn: USCIS RADP (I-140 Vietnam) · DOS Annual Report FY2024 · DOS NVC Waiting List (EW/Other Workers)
      </p>

      {/* ── I-140 EW3 approvals by fiscal year ── */}
      <h3 className="mt-4 text-sm font-semibold text-text">
        🇻🇳 I-140 EW3 Được Duyệt Cho Việt Nam — Theo Năm Tài Chính
      </h3>
      <p className="mt-1 text-xs text-text-muted">
        Tổng cộng FY2014–FY2026 Q1: <b className="text-secondary">{TOTAL_I140_EW3.toLocaleString()}</b> đơn được duyệt
      </p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-bg-alt text-text-muted">
              <th className="px-2 py-1.5 text-left font-semibold">Năm</th>
              <th className="px-2 py-1.5 text-center font-semibold">Được duyệt (EW3)</th>
              <th className="px-2 py-1.5 text-left font-semibold">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {I140_EW3_ROWS.map((row) => (
              <tr key={row.fy} className="border-b border-border last:border-0">
                <td className="px-2 py-1.5 font-semibold text-text">{row.fy}</td>
                <td className="px-2 py-1.5 text-center font-bold text-secondary">
                  {row.approved.toLocaleString()}
                </td>
                <td className="px-2 py-1.5 text-text-muted">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 rounded border border-secondary/30 bg-secondary/10 px-3 py-2 text-xs text-text">
        ⚠️ <b>Lưu ý quan trọng:</b> I-140 được duyệt ≠ visa được cấp. Mỗi năm chỉ có
        ~10,000 visa EW toàn cầu. Số đơn được duyệt tích lũy vượt xa quota —
        đây là nguyên nhân tạo ra backlog và priority date.
      </p>

      {/* ── FY2026 Q1 global breakdown ── */}
      <h3 className="mt-5 text-sm font-semibold text-text">
        🌐 FY2026 Q1 — EW3 Được Duyệt Theo Quốc Gia (Oct–Dec 2025)
      </h3>
      <p className="mt-1 text-xs text-text-muted">
        Nguồn: USCIS RADP FY2026 Q1 · Tổng toàn cầu: <b className="text-primary">10,508</b> đơn
      </p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-bg-alt text-text-muted">
              <th className="px-2 py-1.5 text-left font-semibold">Quốc gia</th>
              <th className="px-2 py-1.5 text-center font-semibold">Số đơn EW3</th>
              <th className="px-2 py-1.5 text-center font-semibold">% toàn cầu</th>
            </tr>
          </thead>
          <tbody>
            {FY2026Q1_EW3_COUNTRIES.map((row) => (
              <tr
                key={row.country}
                className={`border-b border-border last:border-0 ${row.highlight ? "bg-primary/10" : ""}`}
              >
                <td className={`px-2 py-1.5 font-semibold ${row.highlight ? "text-primary" : "text-text"}`}>
                  {row.highlight ? "🇻🇳 " : ""}{row.country}
                </td>
                <td className={`px-2 py-1.5 text-center font-bold ${row.highlight ? "text-primary" : "text-text"}`}>
                  {row.count.toLocaleString()}
                </td>
                <td className={`px-2 py-1.5 text-center ${row.highlight ? "font-bold text-primary" : "text-text-muted"}`}>
                  {row.pct}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 rounded border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-text">
        🇻🇳 Việt Nam chiếm <b className="text-primary">33%</b> tổng số EW3 được duyệt
        toàn cầu trong Q1 FY2026 (3,468 / 10,508). Đây là tỉ lệ cao bất thường phản
        ánh khối lượng hồ sơ đang được xử lý sau nhiều năm tích lũy.
      </p>

      {/* ── NVC waiting list ── */}
      <h3 className="mt-5 text-sm font-semibold text-text">
        ⏳ Danh Sách Chờ NVC — EW / Other Workers (Toàn Cầu)
      </h3>
      <p className="mt-1 text-xs text-text-muted">
        Nguồn: DOS travel.state.gov · Tổng danh sách chờ: <b className="text-secondary">{NVC_TOTAL.toLocaleString()}</b> hồ sơ
      </p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-bg-alt text-text-muted">
              <th className="px-2 py-1.5 text-center font-semibold">#</th>
              <th className="px-2 py-1.5 text-left font-semibold">Quốc gia</th>
              <th className="px-2 py-1.5 text-center font-semibold">Số hồ sơ chờ</th>
              <th className="px-2 py-1.5 text-center font-semibold">% tổng</th>
            </tr>
          </thead>
          <tbody>
            {NVC_WAITING.map((row) => (
              <tr
                key={row.country}
                className={`border-b border-border last:border-0 ${row.highlight ? "bg-accent/10" : ""}`}
              >
                <td className={`px-2 py-1.5 text-center font-semibold ${row.highlight ? "text-accent" : "text-text-muted"}`}>
                  {row.rank > 0 ? `#${row.rank}` : "—"}
                </td>
                <td className={`px-2 py-1.5 font-semibold ${row.highlight ? "text-accent" : "text-text"}`}>
                  {row.highlight ? "🇻🇳 " : ""}{row.country}
                </td>
                <td className={`px-2 py-1.5 text-center font-bold ${row.highlight ? "text-accent" : "text-text"}`}>
                  {row.count.toLocaleString()}
                </td>
                <td className={`px-2 py-1.5 text-center ${row.highlight ? "font-bold text-accent" : "text-text-muted"}`}>
                  {row.pct}%
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-border">
              <td colSpan={2} className="px-2 py-1.5 font-bold text-text">Tổng cộng</td>
              <td className="px-2 py-1.5 text-center font-bold text-secondary">{NVC_TOTAL.toLocaleString()}</td>
              <td className="px-2 py-1.5 text-center font-bold text-secondary">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 rounded border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-text">
        🇻🇳 Việt Nam xếp <b className="text-accent">#3</b> toàn cầu với 4,911 hồ sơ đang
        chờ tại NVC (11% tổng danh sách EW). Đứng sau Mexico (18.4%) và Philippines (13.3%).
      </p>

      {/* ── FY2024 visa issuances ── */}
      <h3 className="mt-5 text-sm font-semibold text-text">
        ✈️ Visa EB-3 Cấp Thực Tế Cho Việt Nam — FY2024
      </h3>
      <p className="mt-1 text-xs text-text-muted">
        Nguồn: DOS Annual Report FY2024 (Table V &amp; VI)
      </p>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "EW3 visa cấp (overseas)", value: "1,170", sub: "Table VI — consular" },
          { label: "EB-3 skilled/professional", value: "82", sub: "Table VI — consular" },
          { label: "EW3 visa + AOS", value: "1,383", sub: "Table V — incl. AOS" },
          { label: "Tổng EB-3 (visa + AOS)", value: "1,698", sub: "Table V — all EB-3" },
        ].map((item) => (
          <div key={item.label} className="rounded-card border border-border bg-bg-alt p-3">
            <div className="text-xl font-bold text-secondary">{item.value}</div>
            <div className="mt-1 text-xs font-medium text-text">{item.label}</div>
            <div className="mt-0.5 text-[11px] text-text-muted">{item.sub}</div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-text-muted">
        Với 4,911 hồ sơ chờ NVC và chỉ ~1,200–1,700 visa/năm được cấp, ước tính thời gian
        chờ từ NVC → phỏng vấn cho người Việt Nam là <b className="text-text">3–4 năm</b> nếu
        không có retrogression thêm.
      </p>
    </section>
  );
}
