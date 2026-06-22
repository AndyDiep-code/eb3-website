import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { StageSelector } from "./stage-selector";

export const metadata: Metadata = {
  title: "Bắt Đầu Từ Đâu? — EB3 Vietnam",
  description:
    "Chọn giai đoạn EB-3 của bạn để xem ngay các công cụ và hướng dẫn phù hợp nhất, không cần đọc hết toàn bộ trang web.",
  alternates: {
    canonical: "https://eb3viet.com/start",
  },
  openGraph: {
    title: "Bắt Đầu Từ Đâu? — EB3 Vietnam",
    description:
      "Chọn giai đoạn EB-3 của bạn để xem ngay các công cụ và hướng dẫn phù hợp nhất.",
    url: "https://eb3viet.com/start",
    siteName: "EB3 Vietnam",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bắt Đầu Từ Đâu? — EB3 Vietnam",
    description:
      "Chọn giai đoạn EB-3 của bạn để xem ngay các công cụ và hướng dẫn phù hợp nhất.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StartPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">
          🧭 Bắt Đầu Từ Đâu?
        </h1>
        <p className="mt-3 text-text-muted">
          EB-3 là một diện định cư Mỹ dành cho lao động phổ thông, do công ty
          Mỹ bảo lãnh thông qua Bộ Lao Động. Quy trình gồm nhiều bước (xin
          giấy phép lao động, nộp hồ sơ di trú, chờ lịch visa, phỏng vấn) và
          thường kéo dài nhiều năm.
        </p>
        <p className="mt-2 text-text-muted">
          Bạn đang ở giai đoạn nào? Chọn một ô dưới đây để xem ngay 4 công cụ
          phù hợp nhất với bạn, không cần đọc hết toàn bộ trang web.
        </p>

        <div className="mt-6">
          <StageSelector />
        </div>
      </div>
    </Layout>
  );
}
