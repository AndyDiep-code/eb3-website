import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Đăng Ký Số An Sinh Xã Hội (SSN) | EB3VIET",
  description:
    "Hướng dẫn đăng ký SSN sau khi có EAD hoặc nhập cảnh bằng visa thường trú: giấy tờ cần mang, vấn đề tên tiếng Việt, thủ tục tại văn phòng SSA.",
  alternates: { canonical: "https://eb3viet.com/ssn-guide" },
  openGraph: {
    title: "Đăng Ký Số An Sinh Xã Hội (SSN) | EB3VIET",
    description: "Giấy tờ cần mang, vấn đề tên tiếng Việt, thủ tục tại SSA, và thời gian chờ thẻ SSN.",
    url: "https://eb3viet.com/ssn-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đăng Ký Số An Sinh Xã Hội (SSN) | EB3VIET",
    description: "Giấy tờ cần mang, vấn đề tên tiếng Việt, thủ tục tại SSA, và thời gian chờ thẻ SSN.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function SsnGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">🪪 Đăng Ký Số Thẻ An Sinh Xã Hội (SSN)</h1>
        <p className="mt-2 text-text-muted">
          Sau khi có EAD · Sau khi nhập cảnh với visa thường trú · Lưu ý tên tiếng Việt
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-blue-500/40 bg-blue-500/10 p-3 text-sm leading-relaxed text-text">
          <span className="shrink-0 text-lg">ℹ️</span>
          <div>
            <strong>SSN KHÔNG tự động gửi sau khi có EAD</strong> — phải tự đến văn phòng SSA đăng ký. Ngoại lệ: nếu đã chọn nhận SSN trên DS-260, SSA có thể gửi thẻ trong 3 tuần sau khi nhập cảnh — nhưng nhiều người vẫn không nhận được tự động.
          </div>
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">1. Khi Nào Đến Đăng Ký?</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
            <li><span className="font-medium text-text">Nhập cảnh bằng visa thường trú:</span> Đăng ký ngay tại SSA sau khi có I-94. Nếu đã chọn SSN trên DS-260, thẻ gửi trong 3 tuần — sau 4 tuần chưa nhận thì đến SSA office.</li>
            <li><span className="font-medium text-text">Điều chỉnh tình trạng (AOS):</span> Phải chờ nhận EAD card (I-766) trước. SSA sẽ từ chối nếu chưa có work authorization.</li>
            <li className="text-amber-700 dark:text-amber-400">⚠️ Không đăng ký SSN trong khi đang chờ EAD — SSA sẽ từ chối.</li>
          </ul>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">2. Giấy Tờ Cần Mang</h2>
          <div className="divide-y divide-border text-sm text-text-muted">
            <div className="flex gap-2 py-2"><span className="w-5 shrink-0 font-bold text-text">1</span><span><span className="font-medium text-text">Danh tính:</span> Hộ chiếu HOẶC Thẻ thường trú (I-551) HOẶC EAD (I-766)</span></div>
            <div className="flex gap-2 py-2"><span className="w-5 shrink-0 font-bold text-text">2</span><span><span className="font-medium text-text">Tuổi:</span> Hộ chiếu HOẶC Giấy khai sinh (bản dịch công chứng nếu tiếng Việt)</span></div>
            <div className="flex gap-2 py-2"><span className="w-5 shrink-0 font-bold text-text">3</span><span><span className="font-medium text-text">Tình trạng di trú:</span> EAD (I-766) HOẶC I-94 HOẶC Thẻ thường trú (I-551)</span></div>
          </div>
          <p className="mt-2 rounded border border-border bg-bg-alt px-3 py-2 text-xs">
            💡 Hộ chiếu + EAD thường đủ để chứng minh cả 3 yếu tố. Mang bản gốc (original) — không chấp nhận photocopy.
          </p>
        </div>

        <div className="mt-3 rounded-card border border-amber-500/40 bg-amber-500/10 p-4">
          <h2 className="mb-2 text-base font-bold text-text">3. Vấn Đề Tên Tiếng Việt ⚠️</h2>
          <ul className="space-y-1.5 text-sm leading-relaxed text-text-muted">
            <li>SSA dùng tên CHÍNH XÁC như trên EAD/green card của bạn.</li>
            <li>Vấn đề thường gặp: hộ chiếu Việt Nam ghi "NGUYEN VAN AN" (họ trước), nhưng USCIS lưu là "AN VAN NGUYEN" (họ sau) — SSN sẽ ra theo tên USCIS.</li>
            <li className="font-medium text-text">Kiểm tra tên trên EAD TRƯỚC khi đến SSA. Tên SSN phải khớp với EAD để dùng cho I-9 và W-2.</li>
            <li>Nếu tên sai trên EAD: liên hệ USCIS trước, không phải SSA.</li>
          </ul>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">4. Thủ Tục Tại Văn Phòng SSA</h2>
          <ol className="space-y-1.5 text-sm leading-relaxed text-text-muted">
            <li className="flex gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span><span>Tìm văn phòng SSA: <a href="https://secure.ssa.gov/ICON/main.jsp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">secure.ssa.gov/ICON/main.jsp</a></span></li>
            <li className="flex gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span><span>Mang đầy đủ giấy tờ gốc (xem mục 2)</span></li>
            <li className="flex gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">3</span><span>Điền Form SS-5 — tải trước tại <a href="https://www.ssa.gov/forms/ss-5.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ssa.gov/forms/ss-5.pdf</a></span></li>
            <li className="flex gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">4</span><span>Nộp hồ sơ — miễn phí. Nhân viên giữ giấy tờ để xác minh và TRẢ LẠI ngay.</span></li>
            <li className="flex gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">5</span><span>Nhận biên lai (receipt) — bằng chứng đã đăng ký</span></li>
          </ol>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-card border border-border bg-bg p-4">
            <h2 className="mb-2 text-base font-bold text-text">5. Thời Gian Chờ</h2>
            <ul className="space-y-1.5 text-sm leading-relaxed text-text-muted">
              <li>Thẻ vật lý gửi bưu điện: <strong className="text-text">2–4 tuần</strong></li>
              <li>Employer cần số SSN — không nhất thiết cần thẻ vật lý để làm I-9</li>
              <li>Gọi <a href="tel:18007721213" className="text-primary">1-800-772-1213</a> sau 2 tuần để hỏi số SSN nếu chưa nhận thẻ</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4">
            <h2 className="mb-2 text-base font-bold text-text">6. Nếu Bị Từ Chối / Trì Hoãn</h2>
            <ul className="space-y-1.5 text-sm leading-relaxed text-text-muted">
              <li>SSA yêu cầu thêm giấy tờ — trả lời ngay</li>
              <li>Bị từ chối vì "system not updated": quay lại sau 10 ngày làm việc</li>
              <li>Sau 4 tuần chưa nhận thẻ: gọi <a href="tel:18007721213" className="text-primary">1-800-772-1213</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">7. Cần SSN Để Làm Gì?</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {["Làm việc hợp pháp (I-9)", "Khai thuế liên bang & tiểu bang", "Mở tài khoản ngân hàng", "Xây dựng tín dụng (credit)", "Nộp đơn SNAP, WIC, CHIP", "Đăng ký Medicare/Medicaid"].map((item) => (
              <div key={item} className="rounded border border-border bg-bg-alt px-2.5 py-1.5 text-xs text-text-muted">{item}</div>
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h3 className="mb-2 text-sm font-bold text-text">🔗 Liên Kết Hữu Ích</h3>
          <ul className="space-y-1 text-sm text-text-muted">
            <li><a href="https://secure.ssa.gov/ICON/main.jsp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SSA Office Locator</a> — tìm văn phòng SSA gần nhất</li>
            <li><a href="https://www.ssa.gov/forms/ss-5.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Form SS-5</a> — đơn đăng ký thẻ SSN</li>
            <li><a href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">My Social Security</a> — tài khoản SSA online</li>
            <li>SSA phone: <a href="tel:18007721213" className="text-primary">1-800-772-1213</a> · TTY: <a href="tel:18003250778" className="text-primary">1-800-325-0778</a></li>
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/after-arrival" className="text-primary hover:underline">✈️ Sau Khi Đến Mỹ</a>
          <a href="/essentials" className="text-primary hover:underline">🏪 Dịch Vụ Thiết Yếu</a>
        </div>
      </div>
    </Layout>
  );
}
