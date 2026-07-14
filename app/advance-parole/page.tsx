import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "I-131 Advance Parole — Du Lịch Khi Chờ I-485 | EB3VIET",
  description:
    "Hướng dẫn xin I-131 Advance Parole: khi nào cần, cách nộp, rủi ro khi về Việt Nam trong khi đang chờ duyệt I-485 thẻ xanh.",
  alternates: { canonical: "https://eb3viet.com/advance-parole" },
  openGraph: {
    title: "I-131 Advance Parole — Du Lịch Khi Chờ I-485 | EB3VIET",
    description:
      "Xin I-131 trước khi về Việt Nam. Nếu ra đi mà không có Advance Parole khi đang pending I-485, hồ sơ thẻ xanh sẽ bị hủy tự động.",
    url: "https://eb3viet.com/advance-parole",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function AdvanceParolePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">✈️ I-131 Advance Parole — Du Lịch Khi Đang Chờ I-485</h1>
        <p className="mt-2 text-text-muted">
          Dành cho người đang pending I-485 · Bắt buộc trước khi xuất cảnh · Không có = mất hồ sơ thẻ xanh
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-red-500/40 bg-red-500/10 p-3 text-sm leading-relaxed text-text">
          <span className="shrink-0 text-lg">🚨</span>
          <div>
            <strong>NGUY HIỂM:</strong> Nếu bạn đang chờ duyệt I-485 và ra khỏi nước Mỹ mà <strong>không có Advance Parole hoặc visa H/L/V còn hiệu lực</strong>, USCIS sẽ coi đây là <strong>từ bỏ hồ sơ</strong> (abandonment) — I-485 bị đóng ngay lập tức và không hoàn phí.
          </div>
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">1. Advance Parole Là Gì?</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
            <li><span className="font-medium text-text">Advance Parole (AP)</span> là giấy phép cho phép bạn ra ngoài nước Mỹ và quay lại <em>trong khi đang pending I-485</em>.</li>
            <li>Khi có AP và EAD kết hợp (Combo Card), bạn có thể xuất nhập cảnh không cần visa riêng.</li>
            <li><span className="font-medium text-text">Ai cần:</span> Người đang chờ I-485 qua AOS (Adjustment of Status) — tức là người đổi từ EAD/parolee sang thẻ xanh trong nước Mỹ.</li>
            <li><span className="font-medium text-text">Ai KHÔNG cần:</span> Người có visa H-1B, L-1, hoặc visa immigrant hợp lệ khác — nhưng phải xác nhận với luật sư trước khi đi.</li>
          </ul>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">2. Điều Kiện Xin I-131</h2>
          <div className="divide-y divide-border text-sm text-text-muted">
            <div className="flex gap-2 py-2">
              <span className="w-5 shrink-0 font-bold text-primary">✓</span>
              <span>Đang có I-485 pending (đã nộp và chưa được duyệt)</span>
            </div>
            <div className="flex gap-2 py-2">
              <span className="w-5 shrink-0 font-bold text-primary">✓</span>
              <span>Chưa có AP hoặc AP cũ đã hết hạn</span>
            </div>
            <div className="flex gap-2 py-2">
              <span className="w-5 shrink-0 font-bold text-primary">✓</span>
              <span>Trả phí $630 (tính đến 2025 — kiểm tra uscis.gov trước khi nộp)</span>
            </div>
            <div className="flex gap-2 py-2 text-amber-700 dark:text-amber-400">
              <span className="w-5 shrink-0 font-bold">⚠️</span>
              <span>Nếu đang bị RFE (Request for Evidence) hoặc interview scheduled, cân nhắc kỹ trước khi xuất cảnh</span>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">3. Giấy Tờ & Cách Nộp</h2>
          <div className="space-y-3 text-sm text-text-muted">
            <div>
              <span className="font-medium text-text">Giấy tờ cần chuẩn bị:</span>
              <ul className="mt-1 space-y-1 pl-4">
                <li>Form I-131 (tải tại <a href="https://www.uscis.gov/i-131" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">uscis.gov/i-131</a>)</li>
                <li>Bản sao I-485 Receipt Notice (Form I-797)</li>
                <li>Bản sao EAD hoặc I-766 (nếu đã có)</li>
                <li>2 ảnh thẻ passport (2x2 inch, nền trắng)</li>
                <li>Bản sao hộ chiếu (trang có ảnh)</li>
                <li>Séc hoặc money order $630 ghi "U.S. Department of Homeland Security"</li>
              </ul>
            </div>
            <div>
              <span className="font-medium text-text">Nộp online (khuyến nghị):</span>{" "}
              Tạo account myUSCIS → nộp I-131 online — nhanh hơn, có thể theo dõi status.
            </div>
            <div>
              <span className="font-medium text-text">Nộp giấy:</span>{" "}
              Gửi đến USCIS Lockbox theo địa chỉ trên hướng dẫn I-131 (thay đổi theo tiểu bang — kiểm tra uscis.gov).
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-card border border-border bg-bg p-4">
            <h2 className="mb-2 text-base font-bold text-text">4. Thời Gian Xử Lý</h2>
            <ul className="space-y-1.5 text-sm leading-relaxed text-text-muted">
              <li><span className="font-medium text-text">Online:</span> 5–9 tháng (2025)</li>
              <li><span className="font-medium text-text">Paper:</span> Tương đương hoặc lâu hơn</li>
              <li><span className="font-medium text-text">Expedite:</span> Có thể request nếu có lý do khẩn cấp (gia đình bệnh, tang lễ...)</li>
              <li className="text-amber-700 dark:text-amber-400">⚠️ <strong>Nộp CÀNG SỚM CÀNG TỐT</strong> — đừng đợi đến khi cần đi mới nộp</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4">
            <h2 className="mb-2 text-base font-bold text-text">5. Khi Quay Về Mỹ</h2>
            <ul className="space-y-1.5 text-sm leading-relaxed text-text-muted">
              <li>Mang theo: AP document (I-512L) + hộ chiếu + giấy tờ I-485 pending</li>
              <li>Tại sân bay: vào hàng "Non-immigrant / Parolee"</li>
              <li>CBP officer sẽ đóng dấu và kiểm tra — trả lời trung thực</li>
              <li className="font-medium text-text">Không bị phỏng vấn AOS tự động khi vào — I-485 vẫn tiếp tục</li>
            </ul>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-amber-500/40 bg-amber-500/10 p-4">
          <h2 className="mb-2 text-base font-bold text-text">6. Rủi Ro Cần Biết</h2>
          <ul className="space-y-1.5 text-sm leading-relaxed text-text-muted">
            <li><span className="font-medium text-text">Ở lại nước ngoài quá lâu:</span> CBP có thể thấy bạn "không duy trì domicile ở Mỹ" — cân nhắc không ở quá 6 tháng</li>
            <li><span className="font-medium text-text">I-485 bị denied trong lúc đi:</span> AP vô hiệu — không thể quay về dưới status đó. Cần visa mới.</li>
            <li><span className="font-medium text-text">Prior unlawful presence:</span> Nếu có unlawful presence trước đây, xuất cảnh có thể kích hoạt 3/10 year bar — hỏi luật sư trước</li>
            <li className="font-medium text-red-700 dark:text-red-400">⛔ Tuyệt đối không xuất cảnh trước khi AP được approve (pending AP không đủ)</li>
          </ul>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h3 className="mb-2 text-sm font-bold text-text">🔗 Liên Kết Chính Thức</h3>
          <ul className="space-y-1 text-sm text-text-muted">
            <li><a href="https://www.uscis.gov/i-131" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Form I-131 + Instructions</a> — uscis.gov</li>
            <li><a href="https://egov.uscis.gov/processing-times/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">USCIS Processing Times</a> — kiểm tra thời gian xử lý hiện tại</li>
            <li><a href="https://my.uscis.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">myUSCIS Account</a> — nộp online và theo dõi case</li>
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/tracker" className="text-primary hover:underline">📋 Theo Dõi I-485</a>
          <a href="/ac21-portability" className="text-primary hover:underline">🔄 Đổi Việc AC21</a>
          <a href="/green-card-life" className="text-primary hover:underline">💚 Cuộc Sống Thẻ Xanh</a>
        </div>
      </div>
    </Layout>
  );
}
