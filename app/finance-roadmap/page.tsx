import type { Metadata } from "next";
import Link from "next/link";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Lộ Trình Tài Chính EB-3 | EB3VIET",
  description:
    "Lộ trình tài chính cho người lao động EB-3 mới sang Mỹ: việc cần làm trong 30 ngày đầu, 6 tháng đầu, và năm đầu tiên.",
  alternates: { canonical: "https://eb3viet.com/finance-roadmap" },
  openGraph: {
    title: "Lộ Trình Tài Chính EB-3 | EB3VIET",
    description:
      "Việc cần làm theo từng mốc thời gian để ổn định tài chính sau khi sang Mỹ.",
    url: "https://eb3viet.com/finance-roadmap",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lộ Trình Tài Chính EB-3 | EB3VIET",
    description:
      "Việc cần làm theo từng mốc thời gian để ổn định tài chính sau khi sang Mỹ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const PHASES = [
  {
    icon: "🚀",
    title: "30 Ngày Đầu",
    sub: "Ổn định tài chính cơ bản — làm ngay trong tháng đầu tiên",
    accent: "border-green-700 bg-green-950/40",
    subColor: "text-green-400",
    items: [
      {
        icon: "💰",
        task: "Tính lương thực nhận (Net Pay)",
        desc: "Nhập lương theo giờ và tiểu bang để biết chính xác số tiền về tay mỗi kỳ lương, sau khi trừ thuế liên bang, Social Security, Medicare và thuế tiểu bang.",
        href: "/net-pay",
        label: "Tính Lương Net",
      },
      {
        icon: "🧮",
        task: "So sánh chi phí sinh hoạt",
        desc: "Ước tính chi phí thuê nhà, ăn uống, đi lại theo bang/thành phố nơi bạn làm việc để biết lương net có đủ sống và còn dư tiết kiệm hay không.",
        href: "/cost-calculator",
        label: "Chi Phí Sinh Hoạt",
      },
      {
        icon: "🏦",
        task: "Mở tài khoản ngân hàng không phí",
        desc: "Chọn ngân hàng phù hợp, mở tài khoản checking/savings miễn phí, đăng ký nhận lương qua direct deposit và đăng ký debit card.",
        href: "/finance",
        label: "Tài Chính",
      },
    ],
  },
  {
    icon: "📅",
    title: "6 Tháng Đầu",
    sub: "Xây nền tảng tín dụng và thuế — chuẩn bị cho năm tài chính đầu tiên",
    accent: "border-primary bg-primary/10",
    subColor: "text-primary",
    items: [
      {
        icon: "📈",
        task: "Xây dựng điểm tín dụng (Credit Score)",
        desc: "Mở thẻ tín dụng đầu tiên (secured card nếu cần), dùng đúng cách và thanh toán đúng hạn để bắt đầu xây dựng lịch sử tín dụng — cần thiết khi thuê nhà, mua xe sau này.",
        href: "/credit-building",
        label: "Xây Dựng Tín Dụng",
      },
      {
        icon: "🧾",
        task: "Tìm hiểu khai thuế lần đầu",
        desc: "Nắm trước các mốc thời gian, loại giấy tờ (W-2, 1040) và hồ sơ cần giữ lại trong năm để việc khai thuế đầu tiên vào tháng 4 năm sau không bị bất ngờ.",
        href: "/tax-guide",
        label: "Khai Thuế",
      },
      {
        icon: "💸",
        task: "Thiết lập gửi tiền về Việt Nam",
        desc: "So sánh các dịch vụ chuyển tiền về tỷ giá, phí, thời gian nhận — chọn cách gửi tiền về cho gia đình tiết kiệm và đều đặn nhất.",
        href: "/remittance-guide",
        label: "Gửi Tiền Về VN",
      },
    ],
  },
  {
    icon: "🎯",
    title: "Năm Đầu Tiên",
    sub: "Nhìn xa hơn — đặt nền cho ổn định tài chính dài hạn",
    accent: "border-amber-700 bg-amber-950/30",
    subColor: "text-amber-400",
    items: [
      {
        icon: "🐖",
        task: "Đặt mục tiêu tiết kiệm & quỹ khẩn cấp",
        desc: "Đặt mục tiêu để dành 3–6 tháng chi phí sinh hoạt trong quỹ khẩn cấp, phòng trường hợp mất việc, ốm đau hoặc chi phí phát sinh ngoài kế hoạch.",
        href: "/finance",
        label: "Tài Chính",
      },
      {
        icon: "🧮",
        task: "Đánh giá lại ngân sách sau 6–12 tháng",
        desc: "So sánh chi tiêu thực tế với ước tính ban đầu, điều chỉnh ngân sách cho phù hợp với mức lương và chi phí sinh hoạt thực tế bạn đang trải qua.",
        href: "/cost-calculator",
        label: "Chi Phí Sinh Hoạt",
      },
      {
        icon: "📊",
        task: "Lên kế hoạch hưu trí (401k)",
        desc: "Tìm hiểu chương trình 401k của công ty (đặc biệt nếu employer có match), và bắt đầu đóng góp sớm để tận dụng lãi kép trong dài hạn.",
        href: "/finance",
        label: "Tài Chính",
      },
    ],
  },
];

export default function FinanceRoadmapPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <div className="rounded-card bg-gradient-to-br from-primary via-primary to-secondary p-6 text-center text-white">
          <h1 className="text-2xl font-bold">🗺️ Lộ Trình Tài Chính</h1>
          <p className="mt-2 text-sm opacity-90">
            30 ngày đầu · 6 tháng đầu · Năm đầu tiên — việc cần làm theo từng mốc thời gian
          </p>
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-primary">
          📌 Đây là lộ trình theo <b>mốc thời gian</b>. Muốn xem checklist tổng quát các việc cần làm sau khi đến Mỹ, xem{" "}
          <Link href="/after-arrival" className="underline">Sau Khi Đến Mỹ</Link>.
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {PHASES.map((phase) => (
            <div key={phase.title} className="overflow-hidden rounded-card">
              <div className={`flex items-center gap-3 border-b border-border p-4 ${phase.accent}`}>
                <span className="text-2xl">{phase.icon}</span>
                <div>
                  <div className="font-bold text-text">{phase.title}</div>
                  <div className={`text-xs mt-0.5 ${phase.subColor}`}>{phase.sub}</div>
                </div>
              </div>
              <div className="divide-y divide-border border border-t-0 border-border bg-bg">
                {phase.items.map((item) => (
                  <div key={item.task} className="flex items-start gap-3 p-4">
                    <span className="mt-0.5 text-xl">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-text">{item.task}</div>
                      <div className="mt-1 text-xs leading-relaxed text-text-muted">{item.desc}</div>
                      <Link
                        href={item.href}
                        className="mt-2 inline-block text-xs font-bold text-primary hover:underline"
                      >
                        {item.label} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          ⚠️ <b>Lưu ý:</b> Lộ trình mang tính tham khảo tổng quát, thứ tự và thời điểm thực tế có thể thay đổi theo hoàn cảnh cá nhân, công việc và tiểu bang sinh sống.
        </div>
      </div>
    </Layout>
  );
}
