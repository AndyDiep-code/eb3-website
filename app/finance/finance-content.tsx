"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";

type Tab = "bank" | "credit" | "remit" | "budget" | "benefits";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "bank", label: "🏦 Ngân Hàng" },
  { key: "credit", label: "💳 Xây Credit" },
  { key: "remit", label: "💸 Gửi Tiền VN" },
  { key: "budget", label: "📊 Ngân Sách" },
  { key: "benefits", label: "🎁 401k & Benefits" },
];

interface RemitRow { name: string; fee: number; rate: number; time: string; note: string; }
type RemitAmt = 200 | 500 | 1000 | 2000;

const REMIT_DATA: Record<RemitAmt, RemitRow[]> = {
  200: [
    { name: "Wise", fee: 3.4, rate: 25780, time: "1–2 ngày", note: "Tỷ giá thực" },
    { name: "Remitly", fee: 0, rate: 25700, time: "Vài phút", note: "Phí ẩn trong tỷ giá" },
    { name: "WorldRemit", fee: 3.99, rate: 25720, time: "1–2 ngày", note: "Tốt cho mức nhỏ" },
    { name: "Western Union", fee: 0, rate: 25500, time: "Vài phút", note: "Tỷ giá kém nhất" },
    { name: "Vietcombank Digital", fee: 0, rate: 25600, time: "1 ngày", note: "Cần tài khoản VCB" },
  ],
  500: [
    { name: "Wise", fee: 5.0, rate: 25780, time: "1–2 ngày", note: "Tỷ giá thực" },
    { name: "Remitly", fee: 0, rate: 25700, time: "Vài phút", note: "Phí ẩn trong tỷ giá" },
    { name: "WorldRemit", fee: 3.99, rate: 25720, time: "1–2 ngày", note: "" },
    { name: "Western Union", fee: 0, rate: 25500, time: "Vài phút", note: "Tỷ giá kém nhất" },
    { name: "Vietcombank Digital", fee: 0, rate: 25620, time: "1 ngày", note: "Cần tài khoản VCB" },
  ],
  1000: [
    { name: "Wise", fee: 8.5, rate: 25780, time: "1–2 ngày", note: "Tỷ giá thực" },
    { name: "Remitly", fee: 0, rate: 25710, time: "Vài phút", note: "" },
    { name: "WorldRemit", fee: 3.99, rate: 25720, time: "1–2 ngày", note: "" },
    { name: "Western Union", fee: 0, rate: 25480, time: "Vài phút", note: "Tỷ giá kém nhất" },
    { name: "Vietcombank Digital", fee: 0, rate: 25640, time: "1 ngày", note: "Cần tài khoản VCB" },
  ],
  2000: [
    { name: "Wise", fee: 14.0, rate: 25780, time: "1–2 ngày", note: "Tỷ giá thực" },
    { name: "Remitly", fee: 0, rate: 25710, time: "Vài phút", note: "" },
    { name: "WorldRemit", fee: 3.99, rate: 25720, time: "1–2 ngày", note: "" },
    { name: "Western Union", fee: 0, rate: 25460, time: "Vài phút", note: "Tỷ giá kém nhất" },
    { name: "Vietcombank Digital", fee: 0, rate: 25650, time: "1 ngày", note: "Cần tài khoản VCB" },
  ],
};

interface BudgetCat { icon: string; cat: string; pct: number; note: string; }
const BASE_BUDGET: BudgetCat[] = [
  { icon: "🏠", cat: "Nhà ở", pct: 0.27, note: "Share phòng → tiết kiệm hơn" },
  { icon: "🍚", cat: "Ăn uống", pct: 0.13, note: "Nấu ăn tại nhà → $250–300/tháng" },
  { icon: "🚗", cat: "Xe & xăng & BH xe", pct: 0.14, note: "Xe cũ trả tiền mặt → thấp hơn" },
  { icon: "💸", cat: "Gửi về VN", pct: 0.17, note: "Điều chỉnh theo nhu cầu gia đình" },
  { icon: "💰", cat: "Tiết kiệm khẩn cấp", pct: 0.10, note: "Mục tiêu: 3 tháng lương" },
  { icon: "🛒", cat: "Đồ dùng & sinh hoạt", pct: 0.09, note: "Walmart + Dollar Tree + thrift store" },
  { icon: "📱", cat: "Điện thoại & internet", pct: 0.04, note: "Mint $15 + internet $50 = $65/tháng" },
  { icon: "🎯", cat: "Tiết kiệm dài hạn", pct: 0.06, note: "Mua xe tốt hơn, goals dài hạn" },
];

function computeBudget(salary: number, deps: number): BudgetCat[] {
  const cats = BASE_BUDGET.map((c) => ({ ...c }));
  if (deps > 0) {
    const ri = cats.findIndex((c) => c.cat === "Gửi về VN");
    cats[ri].pct = Math.min(0.3, 0.12 + deps * 0.05);
    const excess = cats[ri].pct - 0.17;
    if (excess > 0) {
      const li = cats.findIndex((c) => c.cat === "Tiết kiệm dài hạn");
      const ei = cats.findIndex((c) => c.cat === "Tiết kiệm khẩn cấp");
      cats[li].pct = Math.max(0.02, 0.06 - excess / 2);
      cats[ei].pct = Math.max(0.05, 0.10 - excess / 2);
    }
  }
  return cats;
}

const TH = "px-3 py-2 text-left text-xs font-bold text-primary bg-bg-alt border-b border-border";
const TD = "px-3 py-2 text-xs text-text-muted border-b border-border last:border-0 align-top";

export function FinanceContent() {
  const [tab, setTab] = useState<Tab>("bank");
  const [remitAmt, setRemitAmt] = useState<RemitAmt>(200);
  const [salary, setSalary] = useState("");
  const [deps, setDeps] = useState("0");

  const remitRows = [...REMIT_DATA[remitAmt]]
    .map((r) => ({ ...r, received: Math.round((remitAmt - r.fee) * r.rate) }))
    .sort((a, b) => b.received - a.received);
  const bestRemit = remitRows[0];

  const salaryNum = parseFloat(salary) || 0;
  const depsNum = parseInt(deps) || 0;
  const budgetCats = salaryNum >= 500 ? computeBudget(salaryNum, depsNum) : null;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">🏦 Tài Chính Thiết Yếu tại Mỹ</h1>
      <p className="mt-1 text-text-muted">Ngân hàng · Credit score · Gửi tiền về VN · Ngân sách · Quyền lợi 401k</p>

      <div className="mt-3 rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
        🗺️ <strong className="text-text">Thứ tự đọc:</strong> Trang này → <a href="/net-pay" className="text-primary underline">Tính Lương Net</a> → <a href="/cost-calculator" className="text-primary underline">Chi Phí Sinh Hoạt</a> → <a href="/tax-guide" className="text-primary underline">Khai Thuế</a> → <a href="/credit-building" className="text-primary underline">Xây Dựng Tín Dụng</a> → <a href="/remittance-guide" className="text-primary underline">Gửi Tiền Về VN</a>
        <br />Xem theo mốc thời gian: <a href="/finance-roadmap" className="text-primary underline">Lộ Trình Tài Chính</a> (30 ngày / 6 tháng / năm đầu).
      </div>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* ─── BANK ─── */}
      {tab === "bank" && (
        <div>
          <div className="mb-3 rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
            💡 <strong className="text-text">Tại sao cần ngân hàng ngay?</strong> Employer trả lương qua <strong className="text-text">direct deposit</strong>. Không có tài khoản phải nhận check → tốn $5–15/check. Một năm mất thêm $150–400 không cần thiết.
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">🏪 So Sánh Các Loại Ngân Hàng</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Loại</th><th className={TH}>Ví dụ</th><th className={TH}>Phí tháng</th><th className={TH}>Phù hợp</th></tr></thead>
              <tbody>
                <tr><td className={TD}><strong className="text-text">Big Bank</strong></td><td className={TD}>Chase, Wells Fargo, BofA</td><td className={TD}><span className="text-yellow-400">$0 nếu có direct deposit hoặc $500+ số dư</span></td><td className={TD}>Mạng ATM rộng, chi nhánh nhiều</td></tr>
                <tr><td className={TD}><strong className="text-text">Online Bank</strong></td><td className={TD}>Chime, SoFi, Varo, Current</td><td className={TD}><span className="text-green-400">$0 hoàn toàn</span></td><td className={TD}>Không cần SSN (chấp nhận ITIN), không phí</td></tr>
                <tr><td className={TD}><strong className="text-text">Credit Union</strong></td><td className={TD}>Local CU, Navy Federal</td><td className={TD}><span className="text-green-400">$0–5 rất thấp</span></td><td className={TD}>Lãi suất vay thấp nhất, phí thấp</td></tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">⭐ Khuyến Nghị Theo Tình Huống</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              { title: "🟢 Mới sang, chưa có SSN", items: ["Chime hoặc SoFi — chấp nhận ITIN thay SSN", "Mở online 5 phút, không cần đến chi nhánh", "Thẻ debit Visa giao nhà trong 5–7 ngày", "Không minimum balance, không phí monthly", "Sau khi có SSN: cân nhắc thêm Chase/WF"] },
              { title: "🟢 Đã có SSN, muốn xây credit", items: ["Chase Total Checking — miễn phí khi có direct deposit", "Chase có thể approve secured card sau 3–6 tháng", "Wells Fargo — tương tự, chi nhánh nhiều", "Có credit union địa phương? Ưu tiên credit union", "Mở savings cùng lúc — tạo thói quen tiết kiệm"] },
            ].map((c) => (
              <div key={c.title} className="rounded-card border border-border bg-bg p-3">
                <div className="text-xs font-bold text-primary mb-2">{c.title}</div>
                <ul className="space-y-1">{c.items.map((i) => <li key={i} className="text-xs text-text-muted">• {i}</li>)}</ul>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">📋 Giấy Tờ Cần Mang Khi Mở Tài Khoản</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Giấy tờ</th><th className={TH}>Mục đích</th><th className={TH}>Nếu không có</th></tr></thead>
              <tbody>
                {[
                  ["Passport (hộ chiếu)", "Xác minh danh tính chính", "Bắt buộc — không thay thế được"],
                  ["Green Card / I-551", "Xác minh tư cách cư trú", "Có thể dùng I-94 + visa stamp ở một số bank"],
                  ["SSN hoặc ITIN", "Báo cáo thuế, xác minh danh tính", "Online bank (Chime, SoFi) chấp nhận không có SSN"],
                  ["Bằng chứng địa chỉ", "Xác minh nơi cư trú", "Hóa đơn điện, thư từ employer, hợp đồng thuê nhà"],
                  ["Tiền gửi ban đầu", "Kích hoạt tài khoản", "Big bank: $25–50. Online bank: $0"],
                ].map(([g, m, n]) => <tr key={g}><td className={TD}><strong className="text-text">{g}</strong></td><td className={TD}>{m}</td><td className={TD}>{n}</td></tr>)}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">🔧 Setup Tài Khoản Sau Khi Mở</h3>
          <ol className="space-y-2 mb-3">
            {[
              ["Cung cấp thông tin direct deposit cho HR/Payroll", "Cần routing number và account number. Lương vào tài khoản ngay ngày trả lương."],
              ["Tải mobile app ngân hàng", "Kiểm tra số dư, deposit check bằng camera điện thoại, chuyển tiền."],
              ["Bật thông báo (alerts)", "Phát hiện giao dịch lạ ngay lập tức cho mọi giao dịch."],
              ["Mở Savings account cùng lúc", "Ngay cả khi chỉ để $10/tuần. Tạo thói quen tiết kiệm từ ngày đầu."],
              ["Link với Zelle/Venmo", "Sau khi có số điện thoại Mỹ — chuyển tiền nhanh miễn phí giữa người Mỹ."],
            ].map(([title, body], i) => (
              <li key={i} className="flex gap-3 text-xs text-text-muted">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span><strong className="text-text block">{title}</strong>{body}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ─── CREDIT ─── */}
      {tab === "credit" && (
        <div>
          <div className="mb-3 rounded-card border border-yellow-700/40 bg-yellow-950/20 p-3 text-xs text-yellow-300 leading-relaxed">
            ⭐ <strong>Credit score quan trọng với cuộc sống Mỹ:</strong> Thuê nhà, mua xe (lãi suất), mua nhà (mortgage rate), bảo hiểm xe, thậm chí một số employer check credit. Score tốt = tiết kiệm hàng chục ngàn dollar trong vòng đời.
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">📊 Thang Điểm Credit Score (FICO 300–850)</h3>
          <div className="flex rounded-lg overflow-hidden mb-1 border border-border">
            {[
              { range: "300–579", label: "Kém", cls: "bg-red-900/50 text-red-300" },
              { range: "580–669", label: "Yếu", cls: "bg-orange-900/40 text-orange-300" },
              { range: "670–739", label: "Khá", cls: "bg-yellow-900/40 text-yellow-300" },
              { range: "740–799", label: "Tốt", cls: "bg-green-900/40 text-green-300" },
              { range: "800–850", label: "Xuất sắc", cls: "bg-green-800/50 text-green-200" },
            ].map((s) => (
              <div key={s.range} className={`flex-1 py-2 px-1 text-center text-[10px] ${s.cls}`}>
                <span className="block font-bold">{s.range}</span>
                <span className="block opacity-80">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-4 mt-2">
            {[["~580", "Năm đầu", "text-red-400"], ["~670", "Sau 12 tháng", "text-yellow-400"], ["~720+", "Sau 24–36 tháng", "text-green-400"]].map(([v, l, c]) => (
              <div key={l} className="flex-1 rounded-card border border-border bg-bg p-2 text-center">
                <div className={`text-base font-bold ${c}`}>{v}</div>
                <div className="text-[10px] text-text-muted">{l}</div>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">⚖️ 5 Yếu Tố Tính Credit Score</h3>
          <div className="rounded-card border border-border bg-bg p-3 mb-4 space-y-2">
            {[
              ["Lịch sử trả nợ (Payment History)", 35, "bg-primary"],
              ["Tỷ lệ dùng credit (Utilization)", 30, "bg-sky-500"],
              ["Lịch sử dài (Credit Age)", 15, "bg-green-500"],
              ["Đa dạng tín dụng (Credit Mix)", 10, "bg-yellow-500"],
              ["Tín dụng mới (New Credit)", 10, "bg-red-500"],
            ].map(([name, pct, barCls]) => (
              <div key={name as string} className="flex items-center gap-2">
                <span className="text-xs text-text-muted w-44 shrink-0">{name as string}</span>
                <div className="flex-1 bg-bg-alt rounded h-2 overflow-hidden">
                  <div className={`h-full rounded ${barCls as string}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-bold text-yellow-400 w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">🚀 Lộ Trình Xây Credit Từ 0</h3>
          <div className="space-y-2 mb-4">
            {[
              ["Tháng 1–2", "~0", "Mở ngân hàng + apply Secured Credit Card", "Secured card yêu cầu đặt cọc $200–500 làm credit limit. Recommend: Discover it® Secured (hoàn tiền 2% + tự upgrade sau 7 tháng), hoặc Capital One Platinum Secured."],
              ["Tháng 3–6", "~580", "Dùng card đúng cách — giữ utilization dưới 30%", "Mỗi tháng dùng tối đa 30% limit. Trả toàn bộ số dư trước due date — không trả lãi, credit tăng nhanh nhất."],
              ["Tháng 6–9", "~620", "Thêm Credit Builder Loan tại Credit Union", "Vay $500–1,000, trả $50–100/tháng. Tiền gửi vào savings, mở khóa khi trả xong. Vừa tiết kiệm vừa build credit."],
              ["Tháng 12", "~650–680", "Score đủ để apply regular card", "Apply thêm 1 unsecured card. Đừng apply quá nhiều cùng lúc — mỗi lần apply gây hard inquiry giảm 5–10 điểm."],
              ["Tháng 24+", "~720+", "Score tốt — mở nhiều cánh cửa", "Đủ điều kiện thuê nhà, vay xe lãi suất thấp, apply card cashback tốt (Chase Freedom, Citi Double Cash)."],
            ].map(([period, score, title, body]) => (
              <div key={period as string} className="flex gap-3 rounded-card border border-border bg-bg p-3">
                <div className="shrink-0 text-center">
                  <div className="text-[10px] font-bold text-primary">{period as string}</div>
                  <div className="text-base font-bold text-yellow-400">{score as string}</div>
                </div>
                <div><strong className="text-xs text-text block">{title as string}</strong><span className="text-xs text-text-muted">{body as string}</span></div>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">❌ Sai Lầm Phá Credit</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Sai lầm</th><th className={TH}>Tác động</th><th className={TH}>Cách tránh</th></tr></thead>
              <tbody>
                {[
                  ["Trễ hạn thanh toán", "text-red-400", "Giảm 50–100 điểm, ghi chú 7 năm", "Setup autopay tối thiểu minimum payment"],
                  ["Utilization >30%", "text-red-400", "Giảm 20–50 điểm", "Dùng tối đa 30% credit limit mỗi tháng"],
                  ["Đóng thẻ cũ", "text-red-400", "Giảm credit age, tăng utilization", "Giữ thẻ cũ mở dù không dùng nhiều"],
                  ["Apply quá nhiều card", "text-red-400", "Mỗi hard inquiry giảm 5–10 điểm", "Đợi ít nhất 6 tháng giữa mỗi lần apply"],
                  ["Chỉ trả minimum payment", "text-red-400", "Tích lãi 20–29% APR", "Trả toàn bộ balance mỗi tháng"],
                ].map(([sai, cls, tac, tranh]) => (
                  <tr key={sai as string}><td className={TD}><strong className="text-text">{sai as string}</strong></td><td className={`${TD} ${cls as string} font-semibold`}>{tac as string}</td><td className={TD}>{tranh as string}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 rounded-card border border-green-700/40 bg-green-950/20 p-3 text-xs text-green-300 leading-relaxed">
            📱 <strong>Theo dõi credit score miễn phí:</strong> Credit Karma (TransUnion & Equifax, cập nhật tuần) và Experian app (cập nhật tháng). Cả hai đều miễn phí, không ảnh hưởng score khi xem.
          </div>
        </div>
      )}

      {/* ─── REMIT ─── */}
      {tab === "remit" && (
        <div>
          <div className="mb-3 rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
            💡 Khác biệt giữa dịch vụ tốt và tệ có thể là <strong className="text-text">$30–80 cho mỗi lần gửi $1,000</strong>. Nếu gửi $500/tháng, chọn đúng dịch vụ tiết kiệm <strong className="text-text">$200–400/năm</strong>.
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">📊 Chọn Mức Gửi Để Xem So Sánh</h3>
          <div className="flex gap-2 mb-3 flex-wrap">
            {([200, 500, 1000, 2000] as RemitAmt[]).map((amt) => (
              <button key={amt} type="button" onClick={() => setRemitAmt(amt)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors ${remitAmt === amt ? "bg-primary border-primary text-white" : "border-border text-text-muted hover:text-text"}`}>
                ${amt.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="mb-3 rounded-card border border-green-700/40 bg-green-950/20 p-2.5 text-xs text-green-300">
            🏆 <strong>{bestRemit.name}</strong> tốt nhất cho ${remitAmt.toLocaleString()}: nhận <strong>{bestRemit.received.toLocaleString()} VND</strong>
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Dịch vụ</th><th className={TH}>Phí gửi</th><th className={TH}>Tỷ giá (VND/$)</th><th className={TH}>Nhận được (VND)</th><th className={TH}>Thời gian</th></tr></thead>
              <tbody>
                {remitRows.map((r, i) => (
                  <tr key={r.name} className={i === 0 ? "bg-green-950/20" : ""}>
                    <td className={TD}><strong className="text-text">{i === 0 ? "🏆 " : ""}{r.name}</strong></td>
                    <td className={TD}>{r.fee === 0 ? <span className="text-green-400">Miễn phí</span> : `$${r.fee.toFixed(2)}`}</td>
                    <td className={TD}>{r.rate.toLocaleString()}</td>
                    <td className={`${TD} ${i === 0 ? "text-green-400 font-bold" : "text-yellow-400 font-semibold"}`}>{r.received.toLocaleString()}</td>
                    <td className={TD}>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">🔧 Cách Dùng Wise (Khuyến Nghị)</h3>
          <ol className="space-y-2 mb-3">
            {[
              ["Tạo tài khoản tại wise.com", "Cần email, SSN hoặc ITIN, ảnh ID (passport hoặc driver's license)."],
              ["Xác minh danh tính", "Upload ảnh ID + selfie. Thường xong trong vài phút đến vài giờ."],
              ["Link ngân hàng Mỹ", "Liên kết tài khoản checking hoặc thẻ debit để nạp tiền."],
              ["Nhập thông tin người nhận VN", "Tên đầy đủ theo CMND, số tài khoản ngân hàng VN, số SWIFT."],
              ["Gửi tiền", "Tiền thường đến VN trong 1–2 ngày làm việc. Wise gửi email thông báo khi tiền đến."],
            ].map(([title, body], i) => (
              <li key={i} className="flex gap-3 text-xs text-text-muted">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span><strong className="text-text block">{title}</strong>{body}</span>
              </li>
            ))}
          </ol>
          <div className="rounded-card border border-yellow-700/40 bg-yellow-950/20 p-3 text-xs text-yellow-300 leading-relaxed">
            ⚠️ Gửi trên <strong>$10,000</strong> trong năm: có thể phải khai báo thuế. Chia nhỏ nhiều lần để tránh báo cáo là <strong>KHÔNG được phép</strong> (structuring — tội hình sự).
          </div>
        </div>
      )}

      {/* ─── BUDGET ─── */}
      {tab === "budget" && (
        <div>
          <div className="mb-3 rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
            🧮 Nhập lương <strong className="text-text">net (take-home pay)</strong> sau thuế và các khoản khấu trừ. Dùng <a href="/net-pay" className="text-primary underline">Tính Lương Net</a> để tính chính xác trước.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-4">
            <div className="flex gap-3 flex-wrap">
              <div className="flex flex-col gap-1 min-w-[140px]">
                <label className="text-xs text-text-muted">💵 Lương net mỗi tháng ($)</label>
                <input type="number" value={salary} placeholder="3500" min={1000} max={20000}
                  onChange={(e) => setSalary(e.target.value)}
                  className="rounded-btn border border-border bg-bg-alt px-2 py-1.5 text-sm text-text focus:border-primary focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1 min-w-[120px]">
                <label className="text-xs text-text-muted">👥 Số người phụ thuộc (gửi về VN)</label>
                <input type="number" value={deps} min={0} max={10}
                  onChange={(e) => setDeps(e.target.value)}
                  className="rounded-btn border border-border bg-bg-alt px-2 py-1.5 text-sm text-text focus:border-primary focus:outline-none" />
              </div>
            </div>
            {budgetCats ? (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {budgetCats.map((c) => (
                    <div key={c.cat} className="rounded-card border border-border bg-bg-alt p-2 text-center">
                      <div className="text-xl mb-1">{c.icon}</div>
                      <div className="text-[10px] text-text-muted font-semibold">{c.cat}</div>
                      <div className="text-[10px] text-text-muted">{Math.round(c.pct * 100)}% lương</div>
                      <div className="text-sm font-bold text-primary">${Math.round(salaryNum * c.pct).toLocaleString()}</div>
                      <div className="text-[10px] text-text-muted leading-tight mt-1">{c.note}</div>
                    </div>
                  ))}
                </div>
                {(() => {
                  const total = budgetCats.reduce((s, c) => s + Math.round(salaryNum * c.pct), 0);
                  const diff = salaryNum - total;
                  return (
                    <div className="mt-3 text-xs text-text-muted border-t border-border pt-2">
                      Lương net: <strong className="text-text">${salaryNum.toLocaleString()}</strong> · Đã phân bổ: <strong className="text-primary">${total.toLocaleString()}</strong> · {diff >= 0 ? <span className="text-green-400">Còn lại: ${diff}</span> : <span className="text-red-400">Thiếu ${Math.abs(diff)}</span>}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="mt-4 text-center text-xs text-text-muted py-4">← Nhập lương net để xem phân bổ ngân sách gợi ý</div>
            )}
          </div>
          <div className="rounded-card border border-yellow-700/40 bg-yellow-950/20 p-3 text-xs text-yellow-300 leading-relaxed">
            ⚠️ <strong>Emergency Fund</strong> — quỹ dự phòng tối thiểu <strong>3 tháng lương</strong>. Không phải tiết kiệm thông thường — đây là "bảo hiểm" cho: xe hỏng, tai nạn, mất việc tạm thời, bệnh đột xuất. Gửi vào <strong>High-Yield Savings Account</strong> (SoFi, Marcus, Ally Bank) — lãi suất 4–5%/năm. Mục tiêu: đạt $5,000–10,000 trong 18–24 tháng đầu.
          </div>
        </div>
      )}

      {/* ─── BENEFITS ─── */}
      {tab === "benefits" && (
        <div>
          <div className="mb-3 rounded-card border border-yellow-700/40 bg-yellow-950/20 p-3 text-xs text-yellow-300 leading-relaxed">
            💰 <strong>Employer Match 401k = Tiền Miễn Phí.</strong> Nếu employer match 3% và bạn không đóng 401k, bạn đang <strong>từ chối tiền thưởng</strong> tương đương 3% lương mỗi năm. Với lương $40K/năm = $1,200 bỏ phí mỗi năm.
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">📋 Đọc Pay Stub — Từng Dòng</h3>
          <div className="rounded-card border border-border bg-bg overflow-hidden mb-3">
            <div className="bg-bg-alt px-4 py-2 text-xs font-bold text-primary">EARNINGS STATEMENT — Pay Period: 06/01–06/14/2026</div>
            {[
              { label: "Regular Hours (80h × $19.50)", amt: "+$1,560.00", cls: "text-green-400" },
              { label: "Overtime (6h × $29.25)", amt: "+$175.50", cls: "text-green-400" },
              { label: "Federal Income Tax (12%)", amt: "−$209.46", cls: "text-red-400" },
              { label: "State Income Tax (3.23% — Indiana)", amt: "−$55.92", cls: "text-red-400" },
              { label: "Social Security (6.2%)", amt: "−$107.71", cls: "text-red-400" },
              { label: "Medicare (1.45%)", amt: "−$25.22", cls: "text-red-400" },
              { label: "Health Insurance (employee share)", amt: "−$85.00", cls: "text-red-400" },
              { label: "401(k) Contribution (3%)", amt: "−$52.07", cls: "text-text-muted" },
              { label: "NET PAY (Thực lĩnh)", amt: "$1,200.12", cls: "text-green-400 text-sm font-bold" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-4 py-1.5 border-b border-border last:border-0 text-xs">
                <span className="text-text-muted">{row.label}</span>
                <span className={row.cls}>{row.amt}</span>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">🏦 401(k) — Tài Khoản Hưu Trí</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Câu hỏi</th><th className={TH}>Trả lời</th></tr></thead>
              <tbody>
                {[
                  ["401k là gì?", "Tài khoản tiết kiệm hưu trí, tiền đóng vào giảm thuế thu nhập ngay. Rút ra khi đủ 59½ tuổi (rút sớm bị phạt 10% + đóng thuế)."],
                  ["Employer match là gì?", "Employer đóng thêm vào 401k (thường match 50–100% phần bạn đóng, tối đa 3–6% lương). Đây là tiền bonus — không dùng là bỏ phí."],
                  ["Đóng bao nhiêu?", "Tối thiểu: đủ để nhận full employer match. Nếu employer match đến 3%, bạn đóng ít nhất 3%. Giới hạn 2026: $23,500/năm."],
                  ["Đầu tư vào đâu?", "Chọn Target-Date Fund tương ứng năm dự kiến nghỉ hưu (vd: '2050 Fund'). Tự động điều chỉnh rủi ro — không cần biết đầu tư."],
                  ["Nếu đổi việc?", "401k là của bạn, không mất. Có thể rollover sang IRA hoặc 401k của employer mới. Không nên rút ra sớm — mất 10% phạt + đóng thuế đầy đủ."],
                ].map(([q, a]) => <tr key={q as string}><td className={`${TD} font-semibold text-text`}>{q as string}</td><td className={TD}>{a as string}</td></tr>)}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">🏥 HSA & FSA — Tiết Kiệm Chi Phí Y Tế</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              { title: "HSA — Health Savings Account", items: ["Chỉ có nếu gói bảo hiểm là High-Deductible Health Plan (HDHP)", "Đóng tiền trước thuế → dùng cho chi phí y tế", "Giới hạn 2026: $4,300 (1 người) / $8,550 (gia đình)", "Tiền không dùng hết KHÔNG mất — cuộn sang năm sau", "Sau 65 tuổi dùng cho bất kỳ mục đích nào (như 401k)"] },
              { title: "FSA — Flexible Spending Account", items: ["Có với hầu hết gói bảo hiểm, không chỉ HDHP", "Đóng tiền trước thuế → dùng cho chi phí y tế, thuốc, kính", "Giới hạn 2026: $3,300", "Tiền không dùng hết CÓ THỂ MẤT cuối năm (use it or lose it)", "Ưu tiên dùng cho chi phí y tế chắc chắn trong năm"] },
            ].map((c) => (
              <div key={c.title} className="rounded-card border border-border bg-bg p-3">
                <div className="text-xs font-bold text-primary mb-2">{c.title}</div>
                <ul className="space-y-1">{c.items.map((i) => <li key={i} className="text-xs text-text-muted">• {i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
