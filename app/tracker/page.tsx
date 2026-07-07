import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { TrackerContent } from "./tracker-content";

export const metadata: Metadata = {
  title: "Theo Dõi Hồ Sơ EB-3 Cá Nhân | EB3VIET",
  description:
    "Công cụ theo dõi hồ sơ EB-3 cá nhân: nhập Priority Date, bước hiện tại và xem ước tính lịch phỏng vấn, checklist việc cần làm.",
  alternates: {
    canonical: "https://eb3viet.com/tracker",
  },
  openGraph: {
    title: "Theo Dõi Hồ Sơ EB-3 Cá Nhân | EB3VIET",
    description:
      "Công cụ theo dõi hồ sơ EB-3 cá nhân: nhập Priority Date, bước hiện tại và xem ước tính lịch phỏng vấn, checklist việc cần làm.",
    url: "https://eb3viet.com/tracker",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theo Dõi Hồ Sơ EB-3 Cá Nhân | EB3VIET",
    description:
      "Công cụ theo dõi hồ sơ EB-3 cá nhân: nhập Priority Date, bước hiện tại và xem ước tính lịch phỏng vấn, checklist việc cần làm.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TrackerPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          📊 Theo Dõi Hồ Sơ EB-3 Cá Nhân
        </h1>
        <p className="mt-2 text-text-muted">
          Nhập thông tin hồ sơ · Xem timeline · Ước tính lịch phỏng vấn ·
          Checklist việc cần làm
        </p>

        <div className="mt-4">
          <TrackerContent />
        </div>
      </div>
    </Layout>
  );
}
