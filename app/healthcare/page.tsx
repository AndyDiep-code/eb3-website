import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { HealthcareTabs } from "./healthcare-tabs";

export const metadata: Metadata = {
  title: "Y Tế & Bảo Hiểm Sức Khỏe tại Mỹ | EB3VIET",
  description:
    "Hướng dẫn toàn diện về bảo hiểm sức khỏe, Medicaid, tìm bác sĩ tiếng Việt, GoodRx và nha khoa cho người Việt EB-3 mới sang Mỹ.",
  alternates: {
    canonical: "https://eb3viet.com/healthcare",
  },
  openGraph: {
    title: "Y Tế & Bảo Hiểm Sức Khỏe tại Mỹ | EB3VIET",
    description:
      "Đọc hiểu bảo hiểm employer, Medicaid, tìm bác sĩ tiếng Việt, GoodRx, nha khoa — không bị bất ngờ với hóa đơn y tế Mỹ.",
    url: "https://eb3viet.com/healthcare",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Y Tế & Bảo Hiểm Sức Khỏe tại Mỹ | EB3VIET",
    description:
      "Đọc hiểu bảo hiểm employer, Medicaid, tìm bác sĩ tiếng Việt, GoodRx, nha khoa — không bị bất ngờ với hóa đơn y tế Mỹ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HealthcarePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          🏥 Y Tế &amp; Bảo Hiểm Sức Khỏe tại Mỹ
        </h1>
        <p className="mt-2 text-text-muted">
          Đọc hiểu bảo hiểm · Medicaid · Tìm bác sĩ tiếng Việt · Thuốc rẻ ·
          Nha khoa
        </p>

        <div className="mt-6">
          <HealthcareTabs />
        </div>
      </div>
    </Layout>
  );
}
