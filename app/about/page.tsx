import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Giới Thiệu | EB3VIET",
  description:
    "EB3VIET — trang thông tin tham khảo về chương trình lao động định cư Hoa Kỳ EB-3 dành cho người Việt Nam.",
  alternates: {
    canonical: "https://eb3viet.com/about",
  },
  openGraph: {
    title: "Giới Thiệu EB3VIET | eb3viet.com",
    description:
      "EB3VIET — trang thông tin tham khảo về chương trình lao động định cư Hoa Kỳ EB-3 dành cho người Việt Nam.",
    url: "https://eb3viet.com/about",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giới Thiệu EB3VIET | eb3viet.com",
    description:
      "EB3VIET — trang thông tin tham khảo về chương trình lao động định cư Hoa Kỳ EB-3 dành cho người Việt Nam.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const CONTENT_STATS = [
  { value: "8", label: "Trang thông tin" },
  { value: "55", label: "Hãng bảo trợ" },
  { value: "27", label: "FAQ chi tiết" },
  { value: "18", label: "Tiểu bang" },
];

const WEBSITE_CONTENT_SOURCES = [
  {
    icon: "📅",
    title: "Visa Bulletin Dashboard",
    description:
      "Bảng A/B theo tháng, FY2021–FY2026, thống kê visa EW Việt Nam",
  },
  {
    icon: "📰",
    title: "Tin tức chính sách",
    description: "25+ cập nhật từ USCIS, DOS, DOL từ 2022–2026",
  },
  {
    icon: "📖",
    title: "Hướng dẫn quy trình",
    description: "5 giai đoạn từ PERM/LC đến nhận thẻ xanh",
  },
  {
    icon: "🏭",
    title: "Danh sách ngành nghề",
    description: "55 hãng bảo trợ, 18 tiểu bang, thông tin sinh sống",
  },
  {
    icon: "❓",
    title: "FAQ",
    description: "27 câu hỏi thường gặp nhất về EB-3",
  },
  {
    icon: "📚",
    title: "Thuật ngữ",
    description: "Giải thích 27 từ viết tắt di trú phổ biến",
  },
  {
    icon: "🚗",
    title: "Ôn thi BMV Indiana",
    description: "Công cụ luyện thi bằng lái song ngữ Việt–Anh",
  },
];

const DATA_SOURCES = [
  { icon: "🏛", title: "USCIS", description: "(uscis.gov) — Sở Di Trú và Nhập Tịch Hoa Kỳ" },
  {
    icon: "🌐",
    title: "DOS",
    description: "(travel.state.gov) — Bộ Ngoại Giao Hoa Kỳ, Visa Bulletin hàng tháng",
  },
  { icon: "⚖️", title: "DOL", description: "(dol.gov) — Bộ Lao Động Hoa Kỳ, FLAG system" },
  {
    icon: "📊",
    title: "DOS Visa Statistics",
    description: "Báo cáo visa được cấp hàng tháng",
  },
];

export default function AboutPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-card bg-gradient-to-br from-primary via-primary to-accent p-8 text-center text-white">
          <h1 className="text-2xl font-bold">🇺🇸 EB3VIET</h1>
          <p className="mt-2 text-sm opacity-90">
            Trang thông tin tham khảo về chương trình lao động định cư
            <br />
            Hoa Kỳ diện EB-3 dành cho người Việt Nam
          </p>
        </div>

        <section className="mt-6 rounded-card border border-border bg-bg p-5">
          <h2 className="mb-3 text-sm font-bold text-primary">Về EB3VIET</h2>
          <p className="mb-2 text-sm leading-relaxed text-text-muted">
            <b className="text-text">EB3VIET</b> (eb3viet.com) được xây dựng
            với mục tiêu cung cấp thông tin tổng hợp, dễ hiểu về chương
            trình lao động định cư Hoa Kỳ diện EB-3 Other Workers dành cho
            người Việt Nam đang tìm hiểu hoặc đang trong quá trình làm hồ
            sơ.
          </p>
          <p className="text-sm leading-relaxed text-text-muted">
            Trong bối cảnh thông tin EB-3 trên mạng rất nhiều nhưng thiếu hệ
            thống và khó kiểm chứng, EB3VIET tổng hợp từ các nguồn chính
            thức của chính phủ Mỹ để giúp bạn có cái nhìn rõ ràng, đúng đắn
            hơn.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {CONTENT_STATS.map((stat) => (
              <div key={stat.label} className="rounded-btn bg-bg-alt p-3 text-center">
                <div className="text-xl font-bold text-secondary">{stat.value}</div>
                <div className="mt-0.5 text-xs text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-card border border-border bg-bg p-5">
          <h2 className="mb-3 text-sm font-bold text-primary">Nội dung website</h2>
          <div className="flex flex-col gap-2">
            {WEBSITE_CONTENT_SOURCES.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5 text-sm text-text-muted">
                <span className="flex-shrink-0 text-base">{item.icon}</span>
                <span>
                  <b className="text-text">{item.title}</b> — {item.description}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-card border border-border bg-bg p-5">
          <h2 className="mb-3 text-sm font-bold text-primary">Nguồn dữ liệu</h2>
          <p className="mb-2 text-sm text-text-muted">
            Thông tin trên EB3VIET được tổng hợp từ:
          </p>
          <div className="flex flex-col gap-2">
            {DATA_SOURCES.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5 text-sm text-text-muted">
                <span className="flex-shrink-0 text-base">{item.icon}</span>
                <span>
                  <b className="text-text">{item.title}</b> {item.description}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-card border border-border bg-bg p-5">
          <h2 className="mb-3 text-sm font-bold text-primary">
            ⚠️ Tuyên bố miễn trách nhiệm
          </h2>
          <div className="rounded-btn border-l-3 border-text-muted bg-bg-alt p-3.5 text-xs leading-relaxed text-text-muted">
            Nội dung trên EB3VIET chỉ mang tính <b>tham khảo thông tin</b>,
            không thay thế tư vấn pháp lý di trú chuyên nghiệp. Thông tin
            có thể thay đổi theo chính sách của chính phủ Mỹ. Luôn kiểm tra
            tại nguồn chính thức (USCIS, DOS, DOL) và tham khảo luật sư di
            trú có chuyên môn trước khi ra quyết định về hồ sơ EB-3 của
            bạn.
          </div>
        </section>
      </div>
    </Layout>
  );
}
