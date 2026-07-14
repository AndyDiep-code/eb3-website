import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Chuẩn Bị Trước Khi Bay Sang Mỹ — Visa Packet, CBP, Nhập Cảnh | EB3VIET",
  description:
    "Sau khi có visa EB-3: gói visa packet, giấy tờ cần mang trên người, thủ tục xuất cảnh Việt Nam, quy trình nhập cảnh CBP tại Mỹ, và những điều cần biết ở sân bay.",
  alternates: { canonical: "https://eb3viet.com/pre-departure-guide" },
  openGraph: {
    title: "Chuẩn Bị Trước Khi Bay Sang Mỹ | EB3VIET",
    description:
      "Visa packet, xuất cảnh VN, CBP nhập cảnh Mỹ — hướng dẫn đầy đủ trước chuyến bay EB-3.",
    url: "https://eb3viet.com/pre-departure-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function PreDepartureGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">✈️ Chuẩn Bị Trước Khi Bay Sang Mỹ</h1>
        <p className="mt-2 text-text-muted">
          Sau khi phỏng vấn đậu · Gói visa packet · Xuất cảnh VN · Nhập cảnh CBP tại Mỹ
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-text">
          <span className="shrink-0 text-lg">🎉</span>
          <div>
            Chúc mừng! Bạn đã phỏng vấn đậu và nhận visa. Trang này hướng dẫn bạn từng bước từ khi nhận visa cho đến khi đặt chân tới Mỹ an toàn.
          </div>
        </div>

        {/* Step 1: Visa packet */}
        <h2 className="mt-5 text-lg font-semibold text-text">1. Gói Visa Packet — KHÔNG Mở Ra</h2>
        <div className="mt-2 rounded-card border border-red-500/30 bg-red-500/5 p-4 text-sm text-text-muted leading-relaxed">
          <p>Sau phỏng vấn, lãnh sự quán trả lại hộ chiếu kèm <strong className="text-text">một phong bì dán kín</strong> — đây là immigrant visa packet.</p>
          <ul className="mt-2 space-y-1">
            <li className="text-red-700 dark:text-red-400 font-semibold">❌ KHÔNG mở phong bì này — chỉ CBP tại Mỹ mới được mở</li>
            <li>• Bên trong có I-693 (medical exam), DS-260, ảnh, và các hồ sơ liên quan</li>
            <li>• Nếu phong bì bị rách hoặc mở — báo ngay với CBP khi đến Mỹ, giải thích rõ</li>
            <li>• Mang trên người (không để vào hành lý ký gửi)</li>
          </ul>
        </div>

        {/* Step 2: Before leaving VN */}
        <h2 className="mt-5 text-lg font-semibold text-text">2. Trước Khi Rời Việt Nam</h2>
        <div className="mt-2 space-y-3">
          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text mb-2">📋 Thủ Tục Xuất Cảnh</h3>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• Không cần xin phép xuất cảnh đặc biệt — hộ chiếu + visa là đủ</li>
              <li>• Nếu có nợ thuế, đất đai hoặc nghĩa vụ quân sự chưa hoàn thành — giải quyết trước</li>
              <li>• Nếu đang có con dưới 18 tuổi đi cùng — cần giấy đồng ý từ cha/mẹ không đi cùng (có công chứng)</li>
              <li>• Đăng ký thông báo với Đại Sứ Quán VN tại Mỹ (<strong>mofa.gov.vn</strong>) để nhận hỗ trợ nếu cần</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text mb-2">🎒 Giấy Tờ Mang Theo — Hành Lý Xách Tay</h3>
            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {[
                ["✅ BẮT BUỘC", [
                  "Hộ chiếu + visa immigrant (còn hạn)",
                  "Phong bì visa packet (không mở)",
                  "I-797 Approval Notice (I-140) nếu có",
                  "Giấy khai sinh (bản gốc hoặc công chứng)",
                ]],
                ["📎 NÊN MANG", [
                  "Ảnh thẻ 2×2 inch dự phòng (4–6 tấm)",
                  "Thông tin liên hệ employer / sponsor",
                  "Địa chỉ nơi cư trú đầu tiên ở Mỹ",
                  "Đủ tiền mặt USD (~$500–1000 cho tuần đầu)",
                ]],
              ].map(([label, items]) => (
                <div key={label as string}>
                  <div className={`text-xs font-bold mb-1 ${(label as string).startsWith("✅") ? "text-emerald-600 dark:text-emerald-400" : "text-primary"}`}>{label}</div>
                  <ul className="space-y-0.5 text-text-muted">
                    {(items as string[]).map((item, i) => <li key={i} className="text-xs">• {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: At the airport */}
        <h2 className="mt-5 text-lg font-semibold text-text">3. Tại Sân Bay Mỹ — Qua CBP</h2>
        <div className="mt-2 space-y-2">
          {[
            {
              step: "A",
              title: "Khai Báo (CBP Form 6059B hoặc Electronic)",
              desc: "Trên máy bay bạn sẽ được phát customs declaration form. Điền đầy đủ, đặc biệt khai báo tiền mặt trên $10,000 (không bị tịch thu, chỉ phải khai).",
            },
            {
              step: "B",
              title: "Hàng Primary Inspection",
              desc: "Đưa hộ chiếu + visa packet cho officer. Họ sẽ hỏi: Bạn đến làm gì? Làm ở đâu? Sẽ ở đâu? Trả lời thật, ngắn gọn, tự tin.",
            },
            {
              step: "C",
              title: "Mở Visa Packet",
              desc: "CBP officer mở phong bì, xem hồ sơ, kiểm tra medical exam. Đây là bình thường — không lo lắng. Nếu thiếu gì, họ sẽ hỏi thêm.",
            },
            {
              step: "D",
              title: "Biometrics & I-94",
              desc: "Chụp ảnh + lấy dấu vân tay. I-94 được cấp tự động (điện tử) — vào i94.cbp.dhs.gov sau 1-3 ngày để in ra. Đây là bằng chứng nhập cảnh hợp pháp.",
            },
            {
              step: "E",
              title: "Nhận Green Card (Sau ~4–6 Tuần)",
              desc: "Thẻ xanh (I-551) sẽ gửi qua bưu điện đến địa chỉ bạn đăng ký. Nếu sau 6 tuần chưa nhận, gọi USCIS 1-800-375-5283.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-3 rounded-card border border-border bg-bg p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{step}</span>
              <div>
                <div className="text-sm font-semibold text-text">{title}</div>
                <div className="mt-0.5 text-sm text-text-muted">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Common questions */}
        <h2 className="mt-5 text-lg font-semibold text-text">4. Câu Hỏi CBP Thường Gặp</h2>
        <div className="mt-2 space-y-2">
          {[
            ["Mục đích đến Mỹ?", "Tôi đến Mỹ để làm việc theo diện EB-3 / lao động nhập cư."],
            ["Làm việc ở đâu?", "Tôi sẽ làm tại [tên hãng], địa chỉ [địa chỉ hãng]."],
            ["Bạn sẽ ở đâu?", "Tôi sẽ ở [địa chỉ tạm trú / nhà trọ do hãng sắp xếp]."],
            ["Bạn có bao nhiêu tiền?", "Tôi có [số tiền] USD tiền mặt và [thẻ/tài khoản nếu có]."],
            ["Ai đón bạn?", "Đại diện từ [tên hãng] / tôi tự đặt xe."],
          ].map(([q, a], i) => (
            <div key={i} className="rounded-card border border-border bg-bg p-3 text-sm">
              <div className="font-semibold text-primary">❓ {q}</div>
              <div className="mt-1 text-text-muted">💬 {a}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-xs text-text-muted">
          <b className="text-text">Lưu ý:</b> Thủ tục xuất nhập cảnh có thể thay đổi. Luôn kiểm tra với agency/employer của bạn trước ngày bay. Nếu có vấn đề tại cửa khẩu, yêu cầu gặp Supervisor hoặc nhờ thông dịch viên.
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/after-arrival" className="text-primary hover:underline">✅ Sau Khi Đến Mỹ — Checklist</a>
          <a href="/ssn-guide" className="text-primary hover:underline">🪪 Đăng Ký SSN</a>
          <a href="/banking-guide" className="text-primary hover:underline">🏦 Mở Tài Khoản Ngân Hàng</a>
          <a href="/interview" className="text-primary hover:underline">🎤 Ôn Phỏng Vấn Lãnh Sự</a>
        </div>
      </div>
    </Layout>
  );
}
