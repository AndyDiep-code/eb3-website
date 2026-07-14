import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Phát Triển Nghề Nghiệp — W-2, Đổi Việc, Lương, 401k | EB3VIET",
  description:
    "W-2 vs 1099 (và quyền lợi nếu bị phân loại sai), khi nào an toàn để đổi việc theo AC21, cách tăng lương, 401k cho người mới, và phát triển sự nghiệp từ EB-3.",
  alternates: { canonical: "https://eb3viet.com/career-guide" },
  openGraph: {
    title: "Phát Triển Nghề Nghiệp EB-3 — W-2, Đổi Việc, Lương, 401k | EB3VIET",
    description:
      "W-2 vs 1099, AC21 đổi việc an toàn, đàm phán lương, 401k cơ bản — dành cho công nhân EB-3 Việt Nam.",
    url: "https://eb3viet.com/career-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function CareerGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">💼 Phát Triển Nghề Nghiệp</h1>
        <p className="mt-2 text-text-muted">
          W-2 vs 1099 · Đổi việc theo AC21 · Tăng lương · 401k · Thăng tiến
        </p>

        {/* W-2 vs 1099 */}
        <h2 className="mt-5 text-lg font-semibold text-text">1. W-2 vs 1099 — Bạn Phải Nhận W-2</h2>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div className="rounded-card border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-2">✅ W-2 Employee (Đúng cho EB-3)</div>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• Employer khấu trừ thuế từ lương</li>
              <li>• Employer đóng 50% FICA (Social Security + Medicare)</li>
              <li>• Được bảo vệ bởi luật lao động (overtime, workers comp)</li>
              <li>• Đủ điều kiện nhận unemployment nếu bị sa thải</li>
              <li>• Tất cả lao động EB-3 <strong>phải</strong> là W-2</li>
            </ul>
          </div>
          <div className="rounded-card border border-red-500/30 bg-red-500/5 p-4">
            <div className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">❌ 1099 Contractor (SAI cho EB-3)</div>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• Không có khấu trừ thuế — phải tự khai và đóng</li>
              <li>• Phải đóng 15.3% self-employment tax (đóng cả hai phần FICA)</li>
              <li>• Ít quyền lợi lao động</li>
              <li>• Employer dùng 1099 để tránh chi phí — không hợp lệ với EB-3 sponsorship</li>
              <li>• Có thể vi phạm điều kiện visa EB-3</li>
            </ul>
          </div>
        </div>
        <div className="mt-2 rounded-card border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-text-muted">
          <strong className="text-text">Nếu bị phân loại sai thành 1099:</strong>
          <ul className="mt-1 space-y-1">
            <li>• Nộp khiếu nại với Department of Labor Wage and Hour Division (WHD): <a href="https://www.dol.gov/agencies/whd" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">dol.gov/agencies/whd</a></li>
            <li>• Gọi đường dây WHD: 1-866-4-US-WAGE (1-866-487-9243)</li>
            <li>• Cũng báo cáo với IRS Form SS-8 để xác định phân loại đúng</li>
            <li>• Không sợ bị trả thù — luật liên bang bảo vệ bạn</li>
          </ul>
        </div>

        {/* Job change / AC21 */}
        <h2 className="mt-5 text-lg font-semibold text-text">2. Khi Nào An Toàn Để Đổi Việc? (AC21)</h2>
        <div className="mt-2 space-y-2">
          <div className="rounded-card border border-border bg-bg p-4 text-sm text-text-muted">
            <strong className="text-text block mb-1">Điều kiện AC21 Portability (§ 204(j)):</strong>
            <ul className="space-y-1">
              <li className="flex gap-2"><span className="text-emerald-600">✓</span> I-485 đã nộp và ở chờ ít nhất <strong className="text-text">180 ngày</strong></li>
              <li className="flex gap-2"><span className="text-emerald-600">✓</span> Công việc mới <strong className="text-text">cùng ngành hoặc tương tự</strong> (same or similar occupational classification)</li>
              <li className="flex gap-2"><span className="text-emerald-600">✓</span> I-140 đã được approved (không phải pending)</li>
              <li className="flex gap-2"><span className="text-red-500">✗</span> Chỉ có EAD/AP nhưng chưa nộp I-485 — KHÔNG áp dụng AC21</li>
              <li className="flex gap-2"><span className="text-red-500">✗</span> I-140 bị revoke vì fraud hay misrepresentation — không port được</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg-alt p-3 text-sm text-text-muted">
            <strong className="text-text">Với EB-3 từ Việt Nam (consular processing):</strong> Hầu hết không nộp I-485 mà qua lãnh sự quán. Trong trường hợp này, đổi employer TRƯỚC khi được cấp visa rất phức tạp và có thể làm hỏng case. <strong className="text-text">Tham khảo luật sư di trú trước khi quyết định.</strong>
          </div>
        </div>

        {/* Salary negotiation */}
        <h2 className="mt-5 text-lg font-semibold text-text">3. Tăng Lương — Khi Nào & Cách Làm</h2>
        <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm text-text-muted">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="font-semibold text-text mb-1">Thời Điểm Tốt Để Hỏi</div>
              <ul className="space-y-1">
                <li>• Sau 12 tháng làm việc ổn định, không vi phạm kỷ luật</li>
                <li>• Sau khi được giao thêm trách nhiệm (line lead, trainer)</li>
                <li>• Khi bạn biết đồng nghiệp mới nhận lương cao hơn</li>
                <li>• Trước hoặc sau review thường niên của hãng</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-text mb-1">Cách Hỏi Thực Tế</div>
              <ul className="space-y-1">
                <li>• Hỏi riêng supervisor hoặc HR — không hỏi trước đông người</li>
                <li>• Dùng số cụ thể: "Tôi muốn thảo luận về mức lương $X/giờ"</li>
                <li>• Đưa ra lý do: thâm niên, năng suất, đảm nhiệm thêm vai trò</li>
                <li>• Nếu từ chối, hỏi: "Tôi cần làm gì để được xem xét trong 6 tháng nữa?"</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 rounded border border-border bg-bg-alt px-3 py-2 text-xs">
            <strong className="text-text">Lương tối thiểu prevailing wage:</strong> Employer đã cam kết mức lương tối thiểu trong hồ sơ PERM/LC. Họ không thể trả bạn thấp hơn mức đó — đây là quyền của bạn, không phải đặc ân.
          </div>
        </div>

        {/* 401k */}
        <h2 className="mt-5 text-lg font-semibold text-text">4. 401(k) — Tiết Kiệm Hưu Trí Từ Ngay Hôm Nay</h2>
        <div className="mt-2 space-y-2">
          {[
            {
              title: "401(k) là gì?",
              body: "Tài khoản tiết kiệm hưu trí tại Mỹ. Bạn trích một phần lương mỗi kỳ vào tài khoản này, đầu tư vào cổ phiếu/trái phiếu, tiền lớn dần theo thời gian. Không bị đánh thuế cho đến khi rút ra sau 59½ tuổi (Traditional 401k).",
            },
            {
              title: "Employer Match — Tiền Miễn Phí",
              body: "Nhiều hãng EB-3 (đặc biệt nhà máy lớn) đối ứng 50%–100% số tiền bạn đóng, tối đa 3–6% lương. Ví dụ: bạn đóng 4%, hãng đóng thêm 4% = lương hiệu quả tăng 4%. KHÔNG đóng 401k = bỏ tiền miễn phí.",
            },
            {
              title: "Vesting Schedule",
              body: "Tiền employer match thường có thời gian 'vesting' — ví dụ 3 năm. Nếu bạn nghỉ trước 3 năm, bạn mất một phần tiền employer đóng. Kiểm tra chính sách vesting trước khi đổi việc.",
            },
            {
              title: "Bắt Đầu Thế Nào?",
              body: "Hỏi HR về 401k plan khi onboarding hoặc sau 90 ngày. Chọn mức đóng tối thiểu để được full employer match. Chọn quỹ đầu tư: index fund (ít rủi ro, chi phí thấp) hoặc target-date fund (tự động điều chỉnh theo tuổi).",
            },
          ].map(({ title, body }) => (
            <div key={title} className="rounded-card border border-border bg-bg p-4">
              <div className="text-sm font-semibold text-text mb-1">{title}</div>
              <div className="text-sm text-text-muted">{body}</div>
            </div>
          ))}
        </div>

        {/* Career paths */}
        <h2 className="mt-5 text-lg font-semibold text-text">5. Thăng Tiến Từ Vị Trí EB-3</h2>
        <div className="mt-2 overflow-x-auto rounded-card border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
                <th className="px-3 py-2">Ngành</th>
                <th className="px-3 py-2">Vị Trí Bắt Đầu</th>
                <th className="px-3 py-2">Bước Tiếp Theo</th>
                <th className="px-3 py-2">Lương Tăng</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Chế biến gia cầm / thịt", "Line worker $15–18/h", "Line lead → Quality inspector → Supervisor", "+$2–5/h mỗi bước"],
                ["Hospitality / Resort", "Housekeeper / Kitchen $14–16/h", "Lead housekeeper → Banquet server → Shift manager", "+$2–4/h + tips"],
                ["Nhà kho / Logistics", "Picker/Packer $16–20/h", "Forklift operator → Lead → Warehouse supervisor", "+$3–6/h"],
                ["Chế biến thực phẩm", "Production worker $15–19/h", "Machine operator → Quality control → Team lead", "+$2–4/h"],
              ].map(([industry, start, next, raise], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                  <td className="px-3 py-2 font-medium text-text">{industry}</td>
                  <td className="px-3 py-2 text-text-muted">{start}</td>
                  <td className="px-3 py-2 text-text-muted">{next}</td>
                  <td className="px-3 py-2 text-accent font-semibold">{raise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/worker-rights" className="text-primary hover:underline">⚖️ Quyền Lao Động</a>
          <a href="/ac21-portability" className="text-primary hover:underline">🔄 Đổi Việc AC21</a>
          <a href="/salary-guide" className="text-primary hover:underline">📊 Bảng Lương Theo Ngành</a>
          <a href="/finance-roadmap" className="text-primary hover:underline">🗺️ Lộ Trình Tài Chính</a>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-3 text-xs text-text-muted">
          <b className="text-text">Lưu ý:</b> Thông tin AC21 mang tính tham khảo. Mọi quyết định đổi việc trong thời gian hồ sơ đang chờ nên được tư vấn bởi luật sư di trú. Quy định có thể thay đổi theo từng case cụ thể.
        </div>
      </div>
    </Layout>
  );
}
