import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Cộng Đồng Việt & Sức Khỏe Tâm Lý — Thích Nghi Cuộc Sống Mỹ | EB3VIET",
  description:
    "Tìm cộng đồng người Việt ở các tiểu bang EB-3, vượt qua culture shock, duy trì kết nối với gia đình ở VN, và nguồn hỗ trợ sức khỏe tâm lý miễn phí hoặc giá thấp tại Mỹ.",
  alternates: { canonical: "https://eb3viet.com/community-guide" },
  openGraph: {
    title: "Cộng Đồng Việt & Sức Khỏe Tâm Lý | EB3VIET",
    description:
      "Cộng đồng VN theo thành phố, culture shock, homesickness, nguồn hỗ trợ tâm lý miễn phí cho người mới định cư.",
    url: "https://eb3viet.com/community-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function CommunityGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">🤝 Cộng Đồng Việt & Sức Khỏe Tâm Lý</h1>
        <p className="mt-2 text-text-muted">
          Tìm cộng đồng · Vượt qua culture shock · Kết nối gia đình · Hỗ trợ tâm lý
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm text-text">
          <span className="shrink-0">💙</span>
          <div>
            Chuyển đến một đất nước mới là một trong những thách thức tâm lý lớn nhất. Nhớ nhà, cô đơn, áp lực công việc, xa gia đình — tất cả đều bình thường. Bạn không phải đối mặt một mình.
          </div>
        </div>

        {/* Vietnamese communities by city */}
        <h2 className="mt-5 text-lg font-semibold text-text">1. Cộng Đồng Người Việt Theo Thành Phố</h2>
        <div className="mt-2 overflow-x-auto rounded-card border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
                <th className="px-3 py-2">Thành Phố / Khu Vực</th>
                <th className="px-3 py-2">Cộng Đồng VN</th>
                <th className="px-3 py-2">Nơi Tụ Họp</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Houston (TX)", "100,000+ — lớn nhất nước Mỹ", "Alief / Bellaire (Little Saigon), Midtown, Eden Center"],
                ["Atlanta / Doraville (GA)", "~30,000", "Doraville & Chamblee — Hwy 78 corridor, chợ Việt, nhà thờ"],
                ["Dallas (TX)", "~40,000", "Garland, Richardson, Irving — các khu Việt riêng"],
                ["New Orleans (LA)", "~25,000 (lâu đời từ 1975)", "Village de L'Est, Mary Queen of Vietnam Church"],
                ["Minneapolis (MN)", "~20,000", "Hmong Village (khu chung), nhà thờ Việt ở St. Paul"],
                ["Columbus (OH)", "~15,000", "Khu Frebis Ave, Việt Market, nhà thờ Việt"],
                ["Charlotte (NC)", "~8,000", "Rút rát rải rác, chợ Việt trên South Blvd"],
                ["Indianapolis (IN)", "~8,000", "Khu South Meridian, chùa Việt, hội đồng hương"],
                ["Raleigh / Durham (NC)", "~10,000", "Khu Cary, Research Triangle Park area"],
                ["Sioux Falls (SD)", "Nhỏ (~500–1,000)", "Cộng đồng nhỏ nhưng thân thiết, chùa Phật giáo"],
              ].map(([city, community, location], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                  <td className="px-3 py-2 font-medium text-text">{city}</td>
                  <td className="px-3 py-2 text-text-muted">{community}</td>
                  <td className="px-3 py-2 text-text-muted">{location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-1.5 text-xs text-text-muted">
          Tìm nhóm Facebook "Người Việt tại [tên bang/thành phố]" hoặc "EB3 Mỹ" để kết nối trực tiếp với cộng đồng địa phương.
        </p>

        {/* Culture shock */}
        <h2 className="mt-5 text-lg font-semibold text-text">2. Các Giai Đoạn Culture Shock</h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { phase: "1. Tuần Trăng Mật", period: "Tháng 1–3", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/30", desc: "Mọi thứ đều thú vị và mới lạ. Tự tin, háo hức, tràn đầy năng lượng." },
            { phase: "2. Thất Vọng", period: "Tháng 3–9", color: "text-red-600 dark:text-red-400", bg: "bg-red-500/5 border-red-500/30", desc: "Nhớ nhà, bực bội vì rào cản ngôn ngữ, mệt mỏi với sự khác biệt văn hóa." },
            { phase: "3. Thích Nghi", period: "Tháng 9–18", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/5 border-amber-500/30", desc: "Bắt đầu hiểu hệ thống, quen dần môi trường, tìm được nhịp sống riêng." },
            { phase: "4. Hội Nhập", period: "Năm 2+", color: "text-primary", bg: "bg-primary/5 border-primary/30", desc: "Cảm thấy thoải mái ở cả hai văn hóa. Giúp đỡ người mới đến sau." },
          ].map(({ phase, period, color, bg, desc }) => (
            <div key={phase} className={`rounded-card border p-3 ${bg}`}>
              <div className={`text-xs font-bold ${color}`}>{phase}</div>
              <div className="mt-0.5 text-xs text-text-muted font-medium">{period}</div>
              <div className="mt-1.5 text-xs text-text-muted">{desc}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-text-muted">
          Giai đoạn 2 (Thất Vọng) là khó khăn nhất. Bạn không yếu — đây là phản ứng bình thường của não bộ khi phải thích nghi với quá nhiều thay đổi cùng một lúc.
        </p>

        {/* Staying connected */}
        <h2 className="mt-5 text-lg font-semibold text-text">3. Duy Trì Kết Nối Với Gia Đình Ở VN</h2>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div className="rounded-card border border-border bg-bg p-4">
            <div className="text-sm font-bold text-text mb-2">📱 Giữ Liên Lạc Thường Xuyên</div>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• Video call qua Zalo (phổ biến nhất ở VN) hoặc FaceTime/WhatsApp</li>
              <li>• Đặt lịch cố định — ví dụ: Chủ Nhật 8pm VN time (sáng Chủ Nhật Mỹ)</li>
              <li>• Chia sẻ ảnh và video cuộc sống thường ngày — gia đình muốn biết bạn ổn</li>
              <li>• Kể cả khi mệt và bận — một tin nhắn ngắn "con ổn" đủ để cha mẹ an tâm</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4">
            <div className="text-sm font-bold text-text mb-2">💸 Gửi Tiền Về — Nhưng Có Kế Hoạch</div>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• Tốt khi có thể — nhưng đừng hi sinh quỹ khẩn cấp của bạn</li>
              <li>• Đặt ngân sách cố định mỗi tháng (ví dụ: $200–400) thay vì gửi bất thường</li>
              <li>• Dùng Wise hoặc Remitly để tiết kiệm phí (xem <a href="/remittance-guide" className="text-primary underline underline-offset-2">Gửi Tiền Về VN</a>)</li>
              <li>• Xây dựng tài chính của bạn trước — bạn không thể cho nếu bạn không ổn</li>
            </ul>
          </div>
        </div>

        {/* Mental health resources */}
        <h2 className="mt-5 text-lg font-semibold text-text">4. Nguồn Hỗ Trợ Sức Khỏe Tâm Lý</h2>
        <div className="mt-2 space-y-3">
          <div className="rounded-card border border-border bg-bg p-4">
            <div className="text-sm font-bold text-text mb-2">🆓 Miễn Phí / Chi Phí Thấp</div>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <strong className="text-text">988 Suicide & Crisis Lifeline</strong> — Gọi hoặc text 988 (24/7, có hỗ trợ tiếng Việt qua thông dịch viên)
              </li>
              <li>
                <strong className="text-text">Crisis Text Line</strong> — Text HOME to 741741 (tiếng Anh; miễn phí)
              </li>
              <li>
                <strong className="text-text">Community Mental Health Centers</strong> — Sliding scale fee (trả theo thu nhập). Tìm tại{" "}
                <a href="https://findtreatment.gov" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">findtreatment.gov</a>
              </li>
              <li>
                <strong className="text-text">Federally Qualified Health Centers (FQHC)</strong> — Khám tâm lý với giá thấp dựa theo thu nhập. Tìm tại{" "}
                <a href="https://findahealthcenter.hrsa.gov" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">findahealthcenter.hrsa.gov</a>
              </li>
              <li>
                <strong className="text-text">Open Path Collective</strong> — Trị liệu $30–80/buổi cho người thu nhập thấp.{" "}
                <a href="https://openpathcollective.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">openpathcollective.org</a>
              </li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-bg p-4">
            <div className="text-sm font-bold text-text mb-2">🏥 Qua Bảo Hiểm Sức Khỏe</div>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• Employer health insurance thường cover mental health sessions (therapy, psychiatry)</li>
              <li>• Gọi số trên thẻ bảo hiểm và hỏi: "I need a referral for mental health services"</li>
              <li>• Nhiều hãng lớn có EAP (Employee Assistance Program) — cung cấp 3–6 buổi tư vấn miễn phí</li>
              <li>• Hỏi HR: "Does our company have an EAP?" — nhiều người không biết quyền lợi này</li>
            </ul>
          </div>
        </div>

        {/* Practical tips */}
        <h2 className="mt-5 text-lg font-semibold text-text">5. Mẹo Nhỏ Giúp Thích Nghi Nhanh Hơn</h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            { icon: "🕌", tip: "Tìm chùa Việt hoặc nhà thờ Công giáo Việt gần nhà — không chỉ tôn giáo mà còn là cộng đồng hỗ trợ nhau" },
            { icon: "🛒", tip: "Chợ châu Á (H-Mart, 99 Ranch, chợ Việt) không chỉ để mua đồ — nhiều người gặp nhau ở đây" },
            { icon: "⚽", tip: "Tham gia đội bóng đá, cầu lông, cờ tướng — thể thao là cầu nối văn hóa nhanh nhất" },
            { icon: "📱", tip: "Facebook Groups 'Người Việt tại [bang]' — đặt câu hỏi, hỏi đường, xin lời khuyên" },
            { icon: "🎉", tip: "Tết Nguyên Đán ở các thành phố lớn thường có lễ hội cộng đồng — sự kiện tuyệt vời để gặp gỡ" },
            { icon: "📚", tip: "Thư viện công cộng miễn phí — tiếng Anh, internet, sách, và nhiều chương trình cộng đồng" },
          ].map(({ icon, tip }) => (
            <div key={icon} className="flex gap-2 rounded-card border border-border bg-bg p-3 text-sm text-text-muted">
              <span className="shrink-0 text-lg">{icon}</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/after-arrival" className="text-primary hover:underline">✅ Checklist Sau Khi Đến</a>
          <a href="/van-hoa-my" className="text-primary hover:underline">🇺🇸 Văn Hóa Mỹ</a>
          <a href="/essentials" className="text-primary hover:underline">🛒 Dịch Vụ Thiết Yếu</a>
          <a href="/scam-warning" className="text-primary hover:underline">🚩 Cảnh Báo Lừa Đảo</a>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-3 text-xs text-text-muted">
          <b className="text-text">Lưu ý:</b> Thông tin sức khỏe tâm lý mang tính giáo dục. Nếu bạn đang trong khủng hoảng, gọi 988 ngay. Dữ liệu cộng đồng từ U.S. Census 2020 và các báo cáo cộng đồng người Mỹ gốc Việt. Cập nhật 7/2026.
        </div>
      </div>
    </Layout>
  );
}
