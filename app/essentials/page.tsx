import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { EssentialsTabs } from "./essentials-tabs";

export const metadata: Metadata = {
  title: "Dịch Vụ Thiết Yếu Khi Mới Sang Mỹ | EB3VIET",
  description:
    "Hướng dẫn chọn SIM điện thoại, mua xe, mua sắm tiết kiệm và kết nối internet cho người Việt mới sang Mỹ theo diện EB-3.",
  alternates: {
    canonical: "https://eb3viet.com/essentials",
  },
  openGraph: {
    title: "Dịch Vụ Thiết Yếu Khi Mới Sang Mỹ | EB3VIET",
    description: "SIM, xe, mua sắm, internet — tất cả những gì cần biết trong tuần đầu tiên ở Mỹ.",
    url: "https://eb3viet.com/essentials",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dịch Vụ Thiết Yếu Khi Mới Sang Mỹ | EB3VIET",
    description: "SIM, xe, mua sắm, internet — tất cả những gì cần biết trong tuần đầu tiên ở Mỹ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EssentialsPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          📱 Dịch Vụ Thiết Yếu Khi Mới Sang Mỹ
        </h1>
        <p className="mt-2 text-text-muted">
          SIM điện thoại · Mua xe · Mua sắm thông minh · Internet &amp; kết
          nối
        </p>

        <div className="mt-6">
          <EssentialsTabs />
        </div>
      </div>
    </Layout>
  );
}
