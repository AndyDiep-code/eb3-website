"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";

type Tab = "basics" | "start" | "roadmap" | "protect";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "basics", label: "📊 Credit Score Là Gì" },
  { key: "start", label: "🚀 Bắt Đầu Từ Đâu" },
  { key: "roadmap", label: "🗺️ Lộ Trình 0 → 700+" },
  { key: "protect", label: "🛡️ Quản Lý & Bảo Vệ" },
];

const TH = "px-3 py-2 text-left text-xs font-bold text-primary bg-bg-alt border-b border-border";
const TD = "px-3 py-2 text-xs text-text-muted border-b border-border last:border-0 align-top";

export function CreditBuildingContent() {
  const [tab, setTab] = useState<Tab>("basics");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">📈 Xây Dựng Tín Dụng Từ Đầu</h1>
      <p className="mt-1 text-text-muted">Credit score là gì · Secured card & credit-builder loan · Lộ trình 0 → 700+</p>

      <div className="mt-3 rounded-card border border-yellow-700/40 bg-yellow-950/20 p-3 text-xs text-yellow-300 leading-relaxed">
        💳 <strong>Sự thật bất ngờ:</strong> Lịch sử tín dụng tốt ở Việt Nam <strong>không mang sang Mỹ được</strong> — bạn bắt đầu từ con số 0 (no credit history), không phải điểm thấp. Tin tốt: với chiến lược đúng, bạn có thể đạt <strong className="text-yellow-200">700+ trong 12–18 tháng</strong>.
      </div>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* ─── BASICS ─── */}
      {tab === "basics" && (
        <div>
          <div className="rounded-card border border-border bg-bg p-4 mb-4">
            <h3 className="text-xs font-bold text-text mb-2">FICO Score: Con Số 3 Chữ Số Quyết Định Nhiều Thứ</h3>
            <p className="text-xs text-text-muted leading-relaxed">Credit score (phổ biến nhất là <strong className="text-primary">FICO Score</strong>, thang điểm 300–850) là con số tóm tắt mức độ tin cậy tài chính của bạn. Ba cục tín dụng lớn nhất: <strong className="text-text">Equifax, Experian, TransUnion</strong>.</p>
          </div>
          <div className="flex rounded-lg overflow-hidden mb-4 border border-border">
            {[
              { range: "300–579", label: "Poor (Kém)", cls: "bg-red-900/50 text-red-300" },
              { range: "580–669", label: "Fair (Tạm)", cls: "bg-yellow-900/40 text-yellow-300" },
              { range: "670–739", label: "Good (Tốt)", cls: "bg-blue-900/40 text-blue-300" },
              { range: "740–799", label: "Very Good", cls: "bg-green-900/40 text-green-300" },
              { range: "800–850", label: "Excellent", cls: "bg-green-800/50 text-green-200" },
            ].map((s) => (
              <div key={s.range} className={`flex-1 py-2 px-1 text-center text-[10px] ${s.cls}`}>
                <span className="block font-bold">{s.range}</span>
                <span className="block opacity-80">{s.label}</span>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Credit Score Ảnh Hưởng Đến Những Gì?</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Việc Cần Làm</th><th className={TH}>Điểm Thấp (&lt;620)</th><th className={TH}>Điểm Tốt (700+)</th></tr></thead>
              <tbody>
                {[
                  ["Thuê nhà/căn hộ", "Bị từ chối hoặc cần đặt cọc gấp đôi + co-signer", "Duyệt nhanh, đặt cọc tiêu chuẩn"],
                  ["Vay mua xe", "Lãi suất 15–20%/năm, hoặc bị từ chối", "Lãi suất 4–7%/năm"],
                  ["Vay mua nhà (mortgage)", "Khó được duyệt, lãi suất rất cao", "Lãi suất tốt, tiết kiệm hàng chục nghìn đô qua 30 năm"],
                  ["Mở thẻ tín dụng mới", "Chỉ được thẻ secured, hạn mức thấp", "Thẻ rewards, hạn mức cao, ưu đãi 0% APR"],
                  ["Hợp đồng điện thoại/internet", "Cần đặt cọc $200–500", "Không cần đặt cọc"],
                  ["Bảo hiểm xe/nhà", "Phí bảo hiểm cao hơn (nhiều bang dùng credit score)", "Phí bảo hiểm thấp hơn"],
                ].map(([item, low, high]) => (
                  <tr key={item as string}>
                    <td className={`${TD} font-semibold text-text`}>{item as string}</td>
                    <td className={`${TD} text-red-400`}>{low as string}</td>
                    <td className={`${TD} text-green-400`}>{high as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">5 Yếu Tố Cấu Thành Điểm FICO</h3>
          <div className="rounded-card border border-border bg-bg p-3 space-y-2">
            {[
              ["Lịch sử trả nợ (Payment History)", 35],
              ["Tỷ lệ sử dụng tín dụng (Utilization)", 30],
              ["Độ dài lịch sử tín dụng (Credit Age)", 15],
              ["Loại tín dụng đa dạng (Credit Mix)", 10],
              ["Tài khoản mới mở gần đây (New Credit)", 10],
            ].map(([name, pct]) => (
              <div key={name as string} className="flex items-center gap-2">
                <span className="text-xs text-text-muted w-52 shrink-0">{name as string}</span>
                <div className="flex-1 bg-bg-alt rounded h-2 overflow-hidden">
                  <div className="h-full bg-primary rounded" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-bold text-primary w-8 text-right">{pct}%</span>
              </div>
            ))}
            <p className="text-xs text-text-muted pt-1"><strong className="text-primary">Quan trọng nhất:</strong> "Lịch sử trả nợ" chiếm 35% — chỉ cần trễ hạn 30 ngày một lần cũng có thể làm điểm giảm 60–100 điểm và lưu trên hồ sơ 7 năm.</p>
          </div>
        </div>
      )}

      {/* ─── START ─── */}
      {tab === "start" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-3">🚀 3 Cách Phổ Biến Để Bắt Đầu Xây Tín Dụng</h3>
          {[
            {
              badge: "KHUYÊN DÙNG SỐ 1", badgeCls: "bg-green-900/50 text-green-300", borderCls: "border-green-700/40",
              title: "1. Secured Credit Card (Thẻ Tín Dụng Có Đặt Cọc)",
              body: "Bạn đặt cọc một khoản tiền ($200–500) làm credit limit. Dùng thẻ như thẻ tín dụng bình thường, trả đúng hạn. Sau 6–12 tháng dùng tốt, ngân hàng thường tự động nâng cấp lên thẻ unsecured và hoàn lại tiền cọc.",
              extra: ["Ngân hàng phổ biến: Discover it Secured, Capital One Platinum Secured, Chime Credit Builder, Self", "Tiền cọc tham khảo: $200–500 (hoàn lại khi đóng tài khoản hoặc nâng cấp)"],
            },
            {
              badge: "KHUYÊN DÙNG SỐ 2", badgeCls: "bg-blue-900/50 text-blue-300", borderCls: "border-border",
              title: "2. Credit-Builder Loan (Khoản Vay Xây Tín Dụng)",
              body: "Bạn \"vay\" một khoản tiền nhỏ ($300–1,000), nhưng tiền đó được giữ trong tài khoản ngân hàng — bạn trả góp hàng tháng, và chỉ nhận lại tiền sau khi trả hết. Lịch sử trả góp đều đặn được báo cáo lên cục tín dụng.",
              extra: ["Nơi cung cấp phổ biến: Self (self.inc), nhiều credit union địa phương, Chime", "Phù hợp với: Người chưa đủ điều kiện mở secured card, hoặc muốn đa dạng loại tín dụng"],
            },
            {
              badge: "CÁCH NHANH NẾU CÓ NGƯỜI THÂN", badgeCls: "bg-yellow-900/50 text-yellow-300", borderCls: "border-border",
              title: "3. Authorized User (Người Dùng Được Ủy Quyền)",
              body: "Nếu vợ/chồng, người thân đã có thẻ tín dụng với lịch sử tốt, họ có thể thêm bạn làm \"authorized user\". Lịch sử của thẻ đó sẽ xuất hiện trên hồ sơ tín dụng của bạn — kể cả khi bạn không dùng thẻ.",
              extra: ["Lưu ý: Chọn người có thói quen tài chính tốt — nếu họ trả trễ hoặc nợ nhiều, điều đó cũng ảnh hưởng xấu đến điểm của bạn"],
            },
          ].map((c) => (
            <div key={c.title} className={`rounded-card border ${c.borderCls} bg-bg p-4 mb-3`}>
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${c.badgeCls}`}>{c.badge}</span>
              <h3 className="text-xs font-bold text-text mb-2">{c.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed mb-2">{c.body}</p>
              {c.extra.map((e) => <p key={e} className="text-xs text-primary leading-relaxed">• {e}</p>)}
            </div>
          ))}
          <div className="rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
            🪪 <strong className="text-text">Về ITIN/SSN:</strong> Hầu hết ngân hàng lớn yêu cầu SSN để mở thẻ tín dụng. Tuy nhiên một số credit union địa phương chấp nhận ITIN. Nếu đã có SSN (đa số người EB-3 sẽ có sau khi xin việc hợp pháp), hãy ưu tiên dùng SSN để có nhiều lựa chọn hơn.
          </div>
        </div>
      )}

      {/* ─── ROADMAP ─── */}
      {tab === "roadmap" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-3">🗺️ Lộ Trình Thực Tế: Từ 0 Điểm Đến 700+</h3>
          <ol className="space-y-2 mb-4">
            {[
              ["Tháng 1–2", "Mở secured card hoặc credit-builder loan", "Bắt đầu với 1 sản phẩm. Đặt cọc $200–300 cho secured card là đủ để khởi động."],
              ["Tháng 1–12", "Dùng thẻ đều đặn nhưng có kiểm soát", "Chi tiêu nhỏ (đổ xăng, mua tạp hóa $30–50/tháng), giữ tỷ lệ sử dụng dưới 30% hạn mức (lý tưởng dưới 10%)."],
              ["Hàng tháng", "Trả TOÀN BỘ số dư đúng hạn (on-time, in full)", "Đặt auto-pay để không bao giờ quên. Đây là yếu tố quan trọng nhất (35% điểm số)."],
              ["Tháng 6–12", "Điểm bắt đầu xuất hiện và tăng dần", "Sau 6 tháng hoạt động, FICO score được tính lần đầu. Điểm khởi điểm thường 580–650."],
              ["Tháng 9–15", "Mở thêm 1 sản phẩm tín dụng thứ hai", "Vd: thêm 1 thẻ unsecured hoặc credit-builder loan để có credit mix."],
              ["Tháng 12–18", "Yêu cầu nâng hạn mức & nâng cấp thẻ", "Liên hệ ngân hàng xin tăng credit limit và chuyển từ secured sang unsecured card."],
              ["Tháng 15–24", "Đạt mốc 700+ nếu duy trì kỷ luật", "Với lịch sử trả đúng hạn 100%, sử dụng thấp, và 2+ loại tín dụng, điểm 700–740 hoàn toàn khả thi."],
            ].map(([period, title, body], i) => (
              <li key={i} className="flex gap-3 rounded-card border border-border bg-bg p-3">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <span className="text-[10px] font-bold text-primary">{period}</span>
                  <strong className="text-xs text-text block">{title}</strong>
                  <span className="text-xs text-text-muted">{body}</span>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="text-xs font-bold text-primary mb-2">Sai Lầm Phổ Biến Khiến Lộ Trình Bị Trễ</h3>
          <div className="space-y-2">
            {[
              ["Chỉ trả minimum payment", "Vẫn tính là on-time nhưng để lại số dư = trả lãi cao + tỷ lệ sử dụng cao → điểm khó tăng."],
              ["Mở quá nhiều thẻ cùng lúc", "Mỗi lần xin thẻ mới tạo hard inquiry làm giảm điểm tạm thời 5–10 điểm."],
              ["Đóng thẻ cũ khi không dùng", "Làm giảm độ dài lịch sử tín dụng và tăng tỷ lệ sử dụng tổng thể."],
              ["Quên ngày đến hạn", "Một lần trễ hạn 30+ ngày có thể làm mất 60–100 điểm và ở lại hồ sơ 7 năm — luôn bật auto-pay."],
            ].map(([title, body]) => (
              <div key={title as string} className="flex gap-2 text-xs text-text-muted rounded-card border border-red-800/30 bg-red-950/10 p-3">
                <span className="shrink-0 text-red-400">❌</span>
                <span><strong className="text-text">{title as string}:</strong> {body as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── PROTECT ─── */}
      {tab === "protect" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-3">🛡️ Quản Lý Và Bảo Vệ Tín Dụng Lâu Dài</h3>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h4 className="text-xs font-semibold text-text mb-2">Theo Dõi Điểm Tín Dụng Miễn Phí</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              <strong className="text-primary">AnnualCreditReport.com</strong> — Trang chính thức, cho phép xem báo cáo tín dụng đầy đủ <strong className="text-text">miễn phí</strong> từ cả 3 cục (Equifax, Experian, TransUnion). Hiện tại có thể xem hàng tuần miễn phí.
              <br /><strong className="text-primary">Credit Karma, Chase Credit Journey, Discover Credit Scorecard</strong> — Ứng dụng miễn phí, cập nhật điểm hàng tuần.
            </p>
          </div>
          <div className="rounded-card border border-green-700/40 bg-green-950/20 p-4 mb-3">
            <h4 className="text-xs font-semibold text-text mb-2">Quy Tắc Vàng Để Duy Trì Điểm Cao</h4>
            <ul className="space-y-1.5 text-xs text-text-muted">
              {[
                "Luôn trả đúng hạn, trả đủ 100% — bật autopay từ tài khoản ngân hàng",
                "Giữ tỷ lệ sử dụng dưới 30%, lý tưởng dưới 10% (hạn mức $1,000 → chỉ nên nợ dưới $100–300)",
                "Kiểm tra báo cáo tín dụng định kỳ — phát hiện lỗi sai hoặc dấu hiệu gian lận sớm",
                "Giữ thẻ cũ mở — lịch sử dài giúp tăng điểm theo thời gian",
                "Đa dạng loại tín dụng — kết hợp revolving credit (thẻ) và installment loan (vay trả góp)",
              ].map((i) => <li key={i} className="flex gap-1.5"><span className="text-green-400">✅</span>{i}</li>)}
            </ul>
          </div>
          <h4 className="text-xs font-bold text-primary mb-2">Cảnh Giác Lừa Đảo Nhắm Vào Người Mới Đến Mỹ</h4>
          <div className="space-y-2 mb-3">
            {[
              ["Credit repair tính phí trước", "Công ty hứa xóa nợ xấu ngay với phí trả trước thường là lừa đảo — luật cấm thu phí trước khi cung cấp dịch vụ."],
              ["Cuộc gọi/email giả danh ngân hàng", "Ngân hàng thật không bao giờ gọi điện hỏi mật khẩu, SSN, hay mã OTP."],
              ["Đảm bảo tăng điểm 100 điểm trong 1 tuần", "Không có cách hợp pháp nào tăng điểm nhanh như vậy — đây là dấu hiệu lừa đảo."],
              ["Bị đánh cắp danh tính (identity theft)", "Nếu thấy tài khoản lạ trên báo cáo, đặt ngay fraud alert hoặc credit freeze tại cả 3 cục tín dụng và báo cáo tại IdentityTheft.gov."],
            ].map(([title, body]) => (
              <div key={title as string} className="flex gap-2 text-xs text-text-muted rounded-card border border-yellow-700/30 bg-yellow-950/10 p-3">
                <span className="shrink-0 text-yellow-400">⚠️</span>
                <span><strong className="text-text">{title as string}:</strong> {body as string}</span>
              </div>
            ))}
          </div>
          <div className="rounded-card border border-border bg-bg p-3">
            <h4 className="text-xs font-semibold text-text mb-2">📚 Nguồn tham khảo chính thức</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              <a href="https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/" target="_blank" rel="noopener" className="text-primary underline">Consumer Financial Protection Bureau (CFPB)</a> — hướng dẫn chính thức về báo cáo tín dụng và quyền của người tiêu dùng.
              <br /><a href="https://www.annualcreditreport.com/" target="_blank" rel="noopener" className="text-primary underline">AnnualCreditReport.com</a> — trang chính thức để xem báo cáo tín dụng miễn phí.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
