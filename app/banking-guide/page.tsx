import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Mở Tài Khoản Ngân Hàng Khi Mới Đến Mỹ | EB3VIET",
  description:
    "Ngân hàng nào nhận người mới định cư chưa có credit history. Mở account với ITIN, hộ chiếu, hoặc chỉ cần SSN. Chime, Chase, Credit Union, và secured card để bắt đầu xây credit.",
  alternates: { canonical: "https://eb3viet.com/banking-guide" },
  openGraph: {
    title: "Mở Tài Khoản Ngân Hàng Khi Mới Đến Mỹ | EB3VIET",
    description:
      "Ngân hàng nào nhận ITIN, không check ChexSystems. Chime, Chase, Wells Fargo, Credit Union — so sánh cho người mới định cư.",
    url: "https://eb3viet.com/banking-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BankingGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">🏦 Mở Tài Khoản Ngân Hàng Khi Mới Đến Mỹ</h1>
        <p className="mt-2 text-text-muted">
          Không có credit history · Mới có SSN · Hoặc chỉ có ITIN · Bước đầu tiên để ổn định tài chính
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-blue-500/40 bg-blue-500/10 p-3 text-sm leading-relaxed text-text">
          <span className="shrink-0 text-lg">ℹ️</span>
          <div>
            Nhiều ngân hàng lớn từ chối người mới định cư vì <strong>không có US credit history</strong> hoặc bị flag trong hệ thống <strong>ChexSystems</strong>. Nhưng có nhiều lựa chọn khác — trang này giúp bạn biết bắt đầu từ đâu.
          </div>
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-3 text-base font-bold text-text">1. So Sánh Nhanh — Ngân Hàng Phù Hợp Người Mới</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-text-muted">
              <thead>
                <tr className="border-b border-border text-xs font-bold text-text">
                  <th className="pb-2 pr-4 text-left">Ngân hàng</th>
                  <th className="pb-2 pr-4 text-left">Cần SSN?</th>
                  <th className="pb-2 pr-4 text-left">Check ChexSystems?</th>
                  <th className="pb-2 text-left">Ghi chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { bank: "Chime", ssn: "Có (hoặc ITIN)", chex: "Không", note: "Ứng dụng online, không phí, không minimum balance. Tốt nhất để bắt đầu." },
                  { bank: "Chase", ssn: "Có hoặc ITIN", chex: "Có (soft)", note: "Có chi nhánh khắp nơi. Mở tại branch dễ hơn online nếu mới có SSN." },
                  { bank: "Wells Fargo", ssn: "Có", chex: "Có", note: "Clear Access Banking — tài khoản đặc biệt không check ChexSystems." },
                  { bank: "Bank of America", ssn: "Có hoặc ITIN", chex: "Soft check", note: "SafeBalance account — không thấu chi, phù hợp người mới." },
                  { bank: "Credit Union", ssn: "Thường có", chex: "Ít nghiêm ngặt hơn", note: "Linh hoạt nhất. Tìm CU trong vùng — nhiều CU nhận người mới." },
                  { bank: "Wise", ssn: "Không cần", chex: "Không", note: "Tài khoản đa tệ, gửi tiền về VN tốt. Không phải ngân hàng Mỹ — không xây credit." },
                ].map((row) => (
                  <tr key={row.bank}>
                    <td className="py-2 pr-4 font-semibold text-text">{row.bank}</td>
                    <td className="py-2 pr-4">{row.ssn}</td>
                    <td className="py-2 pr-4">{row.chex}</td>
                    <td className="py-2 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">2. Giấy Tờ Cần Mang Khi Mở Account</h2>
          <div className="space-y-2 text-sm text-text-muted">
            <div className="flex gap-2">
              <span className="w-5 shrink-0 font-bold text-primary">✓</span>
              <span><span className="font-medium text-text">SSN hoặc ITIN</span> — SSN là tốt nhất. Một số ngân hàng nhận ITIN (Individual Taxpayer Identification Number).</span>
            </div>
            <div className="flex gap-2">
              <span className="w-5 shrink-0 font-bold text-primary">✓</span>
              <span><span className="font-medium text-text">Hộ chiếu (Passport)</span> — ảnh + trang visa nhập cảnh</span>
            </div>
            <div className="flex gap-2">
              <span className="w-5 shrink-0 font-bold text-primary">✓</span>
              <span><span className="font-medium text-text">Bằng chứng địa chỉ</span> — hóa đơn điện/nước, hợp đồng thuê nhà, thư từ employer. Một số chấp nhận ID có địa chỉ.</span>
            </div>
            <div className="flex gap-2">
              <span className="w-5 shrink-0 font-bold text-primary">✓</span>
              <span><span className="font-medium text-text">Green Card / EAD</span> (nếu có) — tăng thêm độ tin cậy khi mở</span>
            </div>
            <div className="flex gap-2">
              <span className="w-5 shrink-0 font-bold text-primary">✓</span>
              <span><span className="font-medium text-text">Tiền gửi ban đầu</span> — thường $25–$100 tùy ngân hàng. Chime không yêu cầu minimum.</span>
            </div>
          </div>
          <div className="mt-2 rounded border border-border bg-bg-alt px-3 py-2 text-xs text-text-muted">
            💡 Chưa có SSN? Nộp đơn SSN trước (xem <a href="/ssn-guide" className="text-primary hover:underline">hướng dẫn SSN</a>). Nếu phải đợi, dùng Chime hoặc Wise tạm thời — chấp nhận ITIN hoặc hộ chiếu.
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-card border border-border bg-bg p-4">
            <h2 className="mb-2 text-base font-bold text-text">3. ChexSystems Là Gì?</h2>
            <ul className="space-y-1.5 text-sm text-text-muted">
              <li>ChexSystems là hệ thống ghi lịch sử tài khoản ngân hàng ở Mỹ (giống credit report nhưng cho banking).</li>
              <li>Người mới đến Mỹ thường không có record trong ChexSystems — tốt hoặc xấu tùy ngân hàng.</li>
              <li>Một số ngân hàng từ chối nếu "no record" — dùng Chime hoặc Wells Fargo Clear Access thay thế.</li>
              <li>Sau 1–2 năm có account, bạn có thể chuyển sang ngân hàng lớn hơn.</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4">
            <h2 className="mb-2 text-base font-bold text-text">4. Bắt Đầu Xây Credit Ngay</h2>
            <ul className="space-y-1.5 text-sm text-text-muted">
              <li><span className="font-medium text-text">Secured Credit Card:</span> Đặt cọc $200–$500 → nhận thẻ tín dụng với limit bằng số đặt cọc. Dùng và trả đúng hạn mỗi tháng → xây credit score.</li>
              <li><span className="font-medium text-text">Discover it® Secured:</span> Tốt nhất cho người mới — không phí hàng năm, cash back.</li>
              <li><span className="font-medium text-text">Capital One Secured:</span> Dễ được duyệt, limit bắt đầu từ $200.</li>
              <li>Sau 12–18 tháng, secured card thường upgrade lên unsecured tự động.</li>
            </ul>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">5. Lộ Trình Banking Cho Người Mới</h2>
          <ol className="space-y-2 text-sm text-text-muted">
            <li className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
              <span><strong className="text-text">Tuần 1–2:</strong> Mở Chime (online, dễ nhất) hoặc đến branch Chase/BOA với hộ chiếu + SSN</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span>
              <span><strong className="text-text">Tháng 1–2:</strong> Nhận lương vào tài khoản. Set up direct deposit từ employer.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">3</span>
              <span><strong className="text-text">Tháng 2–3:</strong> Xin Secured Credit Card (Discover hoặc Capital One). Đặt cọc $200–$300.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">4</span>
              <span><strong className="text-text">Hàng tháng:</strong> Dùng secured card cho chi tiêu nhỏ (xăng, groceries). Trả <em>toàn bộ</em> số dư trước due date.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">5</span>
              <span><strong className="text-text">Tháng 12–18:</strong> Credit score đạt 650–700+. Có thể xin thẻ thường, vay xe, hoặc thuê nhà dễ hơn.</span>
            </li>
          </ol>
        </div>

        <div className="mt-3 rounded-card border border-amber-500/30 bg-amber-500/5 p-4">
          <h2 className="mb-2 text-base font-bold text-text">6. Cảnh Báo — Tránh Những Điều Này</h2>
          <ul className="space-y-1.5 text-sm text-text-muted">
            <li className="text-red-700 dark:text-red-400">❌ Không giữ tiền mặt ở nhà — mất không lấy lại được, không có FDIC bảo hiểm</li>
            <li className="text-red-700 dark:text-red-400">❌ Không dùng check cashing store (phí 1–3% mỗi lần — mất hàng trăm đô/năm)</li>
            <li className="text-red-700 dark:text-red-400">❌ Không overdraft — phí $25–35/lần, nhanh chóng đội thêm</li>
            <li className="text-red-700 dark:text-red-400">❌ Không bỏ lỡ payment credit card — một lần trễ phá credit score ngay</li>
            <li>✅ Bật thông báo SMS/email cho mọi giao dịch để phát hiện gian lận sớm</li>
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/credit-building" className="text-primary hover:underline">💳 Xây Dựng Credit Đầy Đủ</a>
          <a href="/remittance-guide" className="text-primary hover:underline">💸 Gửi Tiền Về VN</a>
          <a href="/ssn-guide" className="text-primary hover:underline">🪪 Đăng Ký SSN</a>
          <a href="/finance-roadmap" className="text-primary hover:underline">🗺️ Lộ Trình Tài Chính</a>
        </div>
      </div>
    </Layout>
  );
}
