import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Khai Thuế Năm Đầu — Dual-Status & ITIN | EB3VIET",
  description:
    "Hướng dẫn khai thuế năm đầu tiên ở Mỹ: dual-status filer, ITIN cho vợ/chồng, TurboTax có hỗ trợ không, và cách dùng VITA miễn phí.",
  alternates: { canonical: "https://eb3viet.com/tax-first-year" },
  openGraph: {
    title: "Khai Thuế Năm Đầu — Dual-Status & ITIN | EB3VIET",
    description:
      "Năm đầu tiên ở Mỹ có thể là dual-status filer. TurboTax không hỗ trợ — phải nộp paper return. VITA giúp miễn phí.",
    url: "https://eb3viet.com/tax-first-year",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function TaxFirstYearPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">🧾 Khai Thuế Năm Đầu Ở Mỹ — Dual-Status & ITIN</h1>
        <p className="mt-2 text-text-muted">
          Dual-status filer · ITIN cho vợ/chồng · Tại sao TurboTax không đủ · VITA miễn phí
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-amber-500/40 bg-amber-500/10 p-3 text-sm leading-relaxed text-text">
          <span className="shrink-0 text-lg">⚠️</span>
          <div>
            Năm đầu tiên đến Mỹ là năm phức tạp nhất về thuế. Phần lớn người dùng TurboTax hoặc H&R Block <strong>không thể khai đúng</strong> vì các phần mềm này không hỗ trợ dual-status return. Làm sai có thể bị IRS penalty hoặc mất tax refund.
          </div>
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">1. Dual-Status Là Gì?</h2>
          <p className="mb-2 text-sm text-text-muted">
            Bạn là <strong className="text-text">dual-status alien</strong> nếu trong năm thuế bạn vừa là <em>nonresident alien</em> (trước khi đến Mỹ) và vừa là <em>resident alien</em> (sau khi có GC hoặc EAD).
          </p>
          <div className="rounded border border-border bg-bg-alt p-3 text-sm">
            <div className="mb-1 font-semibold text-text">Ví dụ:</div>
            <div className="text-text-muted">Đến Mỹ tháng 6/2024 với visa thường trú → Jan–May 2024 là nonresident, Jun–Dec 2024 là resident → <strong className="text-text">2024 là năm dual-status</strong></div>
          </div>
          <p className="mt-2 text-sm text-text-muted">
            Nếu đến Mỹ ngày 1/1 (đầu năm), bạn có thể là resident cả năm → đơn giản hơn. Hỏi tax preparer để xác nhận.
          </p>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">2. Phải Nộp Form Gì?</h2>
          <div className="space-y-3 text-sm text-text-muted">
            <div className="flex gap-3 border-b border-border pb-3">
              <div className="w-32 shrink-0 font-semibold text-text">Form 1040</div>
              <div>Khai thu nhập phần resident (từ ngày đến Mỹ → 31/12)</div>
            </div>
            <div className="flex gap-3 border-b border-border pb-3">
              <div className="w-32 shrink-0 font-semibold text-text">Form 1040-NR</div>
              <div>Khai thu nhập phần nonresident (1/1 → ngày đến Mỹ). Nếu không có thu nhập Mỹ trong giai đoạn này, không cần.</div>
            </div>
            <div className="flex gap-3">
              <div className="w-32 shrink-0 font-semibold text-text">Ghi chú</div>
              <div>Đính kèm statement giải thích dual-status. Phải nộp <strong className="text-text">bản giấy (paper return)</strong> — IRS không chấp nhận e-file cho dual-status.</div>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">3. ITIN — Khi Nào Cần?</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
            <li>
              <span className="font-medium text-text">Vợ/chồng còn ở Việt Nam (chưa có SSN):</span> Nếu muốn file "Married Filing Jointly" (thường lợi hơn về thuế), vợ/chồng cần ITIN — nộp Form W-7 cùng với tax return.
            </li>
            <li>
              <span className="font-medium text-text">Con chưa có SSN:</span> Nếu muốn claim dependent, cần ITIN hoặc SSN cho con.
            </li>
            <li>
              <span className="font-medium text-text">Không cần ITIN nếu:</span> File "Married Filing Separately" hoặc "Single" — đơn giản hơn nhưng thường đóng thuế nhiều hơn.
            </li>
          </ul>
          <div className="mt-2 rounded border border-border bg-bg-alt px-3 py-2 text-xs text-text-muted">
            💡 Nộp W-7 cùng return: gửi kèm hộ chiếu bản gốc hoặc certified copy đến IRS. Hộ chiếu sẽ được trả lại trong 60 ngày. Hoặc đến IRS Taxpayer Assistance Center (TAC) để xác nhận tại chỗ.
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-card border border-red-500/30 bg-red-500/5 p-4">
            <h2 className="mb-2 text-base font-bold text-text">4. TurboTax Có Dùng Được Không?</h2>
            <ul className="space-y-1.5 text-sm text-text-muted">
              <li className="text-red-700 dark:text-red-400">❌ <strong>TurboTax KHÔNG hỗ trợ dual-status return</strong></li>
              <li className="text-red-700 dark:text-red-400">❌ H&R Block online cũng không hỗ trợ</li>
              <li>✅ TaxAct có hỗ trợ 1040-NR (partial)</li>
              <li>✅ Sprintax — phần mềm chuyên cho nonresident/dual-status (~$50)</li>
              <li>✅ <strong className="text-text">VITA miễn phí</strong> (xem mục 5)</li>
            </ul>
          </div>
          <div className="rounded-card border border-green-500/30 bg-green-500/5 p-4">
            <h2 className="mb-2 text-base font-bold text-text">5. VITA — Hỗ Trợ Thuế Miễn Phí</h2>
            <ul className="space-y-1.5 text-sm text-text-muted">
              <li><span className="font-medium text-text">VITA (Volunteer Income Tax Assistance)</span> là chương trình IRS, miễn phí cho thu nhập dưới $67,000.</li>
              <li>Nhiều site có tình nguyện viên nói tiếng Việt</li>
              <li>Mở từ tháng 2 đến giữa tháng 4</li>
              <li>Tìm tại: <a href="https://www.irs.gov/vita" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">irs.gov/vita</a> hoặc gọi 211</li>
            </ul>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">6. Deadline & Penalty</h2>
          <div className="divide-y divide-border text-sm text-text-muted">
            <div className="flex gap-2 py-2"><span className="font-medium text-text w-40 shrink-0">Deadline thông thường</span><span>15 tháng 4 năm sau (e.g., 2025 return → April 15, 2026)</span></div>
            <div className="flex gap-2 py-2"><span className="font-medium text-text w-40 shrink-0">Extension</span><span>Nộp Form 4868 trước April 15 → gia hạn đến October 15 (gia hạn thời gian nộp, KHÔNG gia hạn thời gian trả thuế)</span></div>
            <div className="flex gap-2 py-2"><span className="font-medium text-text w-40 shrink-0">Penalty muộn</span><span>5%/tháng của số thuế còn nợ (max 25%), cộng lãi suất</span></div>
            <div className="flex gap-2 py-2"><span className="font-medium text-text w-40 shrink-0">Không có thuế nợ</span><span>Không có penalty muộn, nhưng refund có thể bị giữ 3 năm</span></div>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-blue-500/30 bg-blue-500/5 p-4">
          <h2 className="mb-2 text-base font-bold text-text">7. Checklist Khai Thuế Năm Đầu</h2>
          <div className="grid gap-1.5 text-sm text-text-muted sm:grid-cols-2">
            {[
              "Xác định ngày trở thành resident alien",
              "Thu thập W-2 từ employer",
              "Kiểm tra có cần ITIN cho vợ/chồng không",
              "Tìm VITA site gần nhất (irs.gov/vita)",
              "Chuẩn bị hộ chiếu nếu xin ITIN",
              "Nộp paper return (không e-file dual-status)",
              "Giữ bản copy tất cả return đã nộp",
              "Lưu Receipt từ IRS sau khi nộp",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded border border-border bg-bg px-2.5 py-1.5 text-xs">
                <span className="mt-0.5 text-primary shrink-0">☐</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h3 className="mb-2 text-sm font-bold text-text">🔗 Liên Kết Hữu Ích</h3>
          <ul className="space-y-1 text-sm text-text-muted">
            <li><a href="https://www.irs.gov/individuals/international-taxpayers/taxation-of-dual-status-aliens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IRS: Taxation of Dual-Status Aliens</a></li>
            <li><a href="https://www.irs.gov/vita" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">VITA — Free Tax Preparation</a></li>
            <li><a href="https://www.irs.gov/forms-pubs/about-form-w-7" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Form W-7 — ITIN Application</a></li>
            <li><a href="https://www.irs.gov/pub/irs-pdf/p519.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IRS Publication 519 — U.S. Tax Guide for Aliens (PDF)</a></li>
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/tax-guide" className="text-primary hover:underline">💵 Tổng Quan Khai Thuế</a>
          <a href="/net-pay" className="text-primary hover:underline">🧮 Tính Lương Net</a>
          <a href="/finance-roadmap" className="text-primary hover:underline">🗺️ Lộ Trình Tài Chính</a>
        </div>
      </div>
    </Layout>
  );
}
