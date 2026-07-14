import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Cách Đọc Visa Bulletin EB-3 — Priority Date & Retrogression | EB3VIET",
  description:
    "Hướng dẫn đọc Visa Bulletin: Priority Date là gì, Bảng A vs Bảng B, cutoff date, Current status, retrogression — và cách theo dõi tiến độ EB-3 Vietnam hàng tháng.",
  alternates: { canonical: "https://eb3viet.com/visa-bulletin-guide" },
  openGraph: {
    title: "Cách Đọc Visa Bulletin EB-3 — Priority Date & Retrogression | EB3VIET",
    description:
      "Priority Date, Table A vs B, cutoff date, Current, retrogression — giải thích đơn giản cho người Việt chờ EB-3.",
    url: "https://eb3viet.com/visa-bulletin-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function VisaBulletinGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">📅 Cách Đọc Visa Bulletin EB-3</h1>
        <p className="mt-2 text-text-muted">
          Priority Date · Bảng A vs Bảng B · Retrogression · Cách theo dõi hàng tháng
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm text-text">
          <span className="shrink-0">📌</span>
          <div>
            Visa Bulletin là tài liệu Bộ Ngoại Giao Mỹ (DOS) phát hành <strong>mỗi tháng</strong>, cho biết số thị thực EB-3 còn lại và ai được phép tiến hành thủ tục trong tháng đó.{" "}
            <a href="/visa-bulletin" className="text-primary underline underline-offset-2">Xem dashboard trực tiếp →</a>
          </div>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-text">1. Priority Date (Ngày Ưu Tiên) Là Gì?</h2>
        <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm text-text-muted leading-relaxed">
          <p>Priority Date là <strong className="text-text">ngày DOL (Bộ Lao Động) nhận hồ sơ PERM / LC của bạn</strong>. Đây là điểm khởi đầu quan trọng nhất trong hành trình EB-3.</p>
          <ul className="mt-2 space-y-1">
            <li>• Ghi trên I-140 Approval Notice của bạn (góc trên)</li>
            <li>• Không thay đổi kể cả khi chuyển agency hay employer (trong phạm vi AC21)</li>
            <li>• Không phải ngày bắt đầu làm việc — là ngày nộp PERM</li>
          </ul>
          <div className="mt-3 rounded border border-border bg-bg-alt px-3 py-2 text-xs">
            <strong className="text-text">Ví dụ:</strong> Priority Date của bạn là <strong>01/06/2022</strong>. Visa Bulletin tháng 7/2026 có cutoff date là <strong>01/08/2022</strong>. Vì 01/06/2022 &lt; 01/08/2022, bạn đủ điều kiện tiến hành tháng đó.
          </div>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-text">2. Bảng A vs Bảng B</h2>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div className="rounded-card border border-border bg-bg p-4">
            <div className="text-sm font-bold text-primary mb-2">Bảng A — Final Action Dates</div>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• <strong className="text-text">Ngày USCIS cấp thẻ xanh</strong></li>
              <li>• Bạn cần PD ≤ cutoff Bảng A để được cấp I-485 (Adjustment) hoặc nhận visa lãnh sự</li>
              <li>• USCIS thông báo mỗi tháng họ dùng Bảng A hay B</li>
              <li>• Thường chậm hơn Bảng B 2–6 tháng</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4">
            <div className="text-sm font-bold text-secondary mb-2">Bảng B — Dates for Filing</div>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• <strong className="text-text">Ngày được NỘP I-485</strong> (chưa được cấp thẻ)</li>
              <li>• Cho phép nộp hồ sơ sớm để chờ thẻ</li>
              <li>• Không phải tháng nào cũng mở — USCIS quyết định</li>
              <li>• Nếu USCIS dùng Bảng B, bạn có thể nộp I-485 + xin EAD/AP sớm</li>
            </ul>
          </div>
        </div>
        <p className="mt-2 text-xs text-text-muted">
          <strong className="text-text">Với người EB-3 từ Việt Nam:</strong> Đại đa số là consular processing (phỏng vấn tại lãnh sự quán Hồ Chí Minh) — chỉ cần theo Bảng A.
        </p>

        <h2 className="mt-5 text-lg font-semibold text-text">3. Đọc Bảng Visa Bulletin</h2>
        <div className="mt-2 overflow-x-auto rounded-card border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
                <th className="px-3 py-2">Ký Hiệu</th>
                <th className="px-3 py-2">Ý Nghĩa</th>
                <th className="px-3 py-2">Bạn Cần Làm Gì?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["C (Current)", "Tất cả Priority Date đều đủ điều kiện tháng này", "Tiến hành ngay — không cần chờ"],
                ["01JUN22 (ngày cụ thể)", "Chỉ PD trước ngày này mới đủ điều kiện", "So sánh PD của bạn với ngày này"],
                ["U (Unavailable)", "Không cấp visa trong danh mục này tháng này", "Chờ — không làm gì được"],
              ].map(([sym, meaning, action], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                  <td className="px-3 py-2 font-mono font-bold text-accent">{sym}</td>
                  <td className="px-3 py-2 text-text">{meaning}</td>
                  <td className="px-3 py-2 text-text-muted">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg-alt p-3 text-sm">
          <strong className="text-text">Vietnam EB-3 (EW — Other Workers):</strong>
          <ul className="mt-1 space-y-1 text-text-muted">
            <li>• Tháng 4/2026: Đạt trạng thái <strong className="text-accent">C (Current)</strong> lần đầu tiên trong nhiều năm</li>
            <li>• Tháng 6/2026: Tiếp tục C nhưng có rủi ro retrogression do Philippines tăng mạnh</li>
            <li>• Theo dõi tháng by tháng tại <a href="/visa-bulletin" className="text-primary underline underline-offset-2">EB3VIET Dashboard</a></li>
          </ul>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-text">4. Retrogression Là Gì?</h2>
        <div className="mt-2 rounded-card border border-red-500/30 bg-red-500/5 p-4 text-sm text-text-muted leading-relaxed">
          <p><strong className="text-red-600 dark:text-red-400">Retrogression</strong> xảy ra khi cutoff date của tháng sau <em>lùi lại</em> so với tháng trước. Nghĩa là visa bulletin bị "thụt lùi".</p>
          <div className="mt-2 space-y-1">
            <div><strong className="text-text">Nguyên nhân:</strong> Số visa EB-3 có giới hạn hàng năm (~40,000 toàn cầu). Khi nhiều quốc gia tăng tốc nộp (như Philippines, Mexico), nguồn cung giảm, buộc DOS lùi cutoff date.</div>
            <div><strong className="text-text">Ảnh hưởng:</strong> Người đang chờ bỗng nhiên "mất current status" — không thể tiến hành cho đến khi date advance lại.</div>
            <div><strong className="text-text">Rủi ro 2026:</strong> Philippines EB-3 tăng mạnh có thể gây retrogression cho EW (Other Workers) danh mục toàn cầu, ảnh hưởng Vietnam.</div>
          </div>
          <div className="mt-2 rounded border border-red-500/30 bg-red-500/5 px-3 py-2 text-xs">
            <strong className="text-text">Nếu bị retrogression:</strong> Không panic — date sẽ advance lại. Dùng thời gian chuẩn bị hồ sơ, học tiếng Anh, hoàn thiện tài chính. Subscribe EB3VIET để nhận thông báo khi date advance.
          </div>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-text">5. Kiểm Tra Mỗi Tháng — Checklist</h2>
        <ol className="mt-2 space-y-2 text-sm text-text-muted">
          {[
            ["Vào ngày ~8 mỗi tháng", "DOS phát hành Visa Bulletin mới cho tháng sau"],
            ["Tìm bảng \"Employment-Based\"", "Xem hàng \"EW\" (Other Workers) — đây là EB-3 Unskilled"],
            ["Cột \"All Chargeability Areas Except Those Listed\"", "Vietnam EW dùng cột này (không phải cột riêng)"],
            ["So sánh PD của bạn", "Nếu PD ≤ cutoff → bạn current tháng đó"],
            ["USCIS dùng Bảng A hay B?", "Kiểm tra announcement trên uscis.gov đầu mỗi tháng"],
          ].map(([time, action], i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{i + 1}</span>
              <span><strong className="text-text">{time}:</strong> {action}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <a href="/visa-bulletin" className="text-primary hover:underline">📊 Dashboard Visa Bulletin</a>
          <a href="/tracker" className="text-primary hover:underline">📋 Theo Dõi Hồ Sơ</a>
          <a href="/timeline-estimator" className="text-primary hover:underline">⏱️ Ước Tính Timeline</a>
          <a href="/guides" className="text-primary hover:underline">📖 Quy Trình EB-3</a>
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs text-text-muted">
          <b className="text-text">Nguồn:</b> U.S. Department of State Visa Bulletin (travel.state.gov) · USCIS Visa Availability (uscis.gov/visas) · Cập nhật tháng 7/2026. Số liệu và cutoff thay đổi hàng tháng — luôn kiểm tra Visa Bulletin chính thức mới nhất.
        </div>
      </div>
    </Layout>
  );
}
