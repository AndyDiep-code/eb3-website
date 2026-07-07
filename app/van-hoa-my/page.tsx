import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { VanHoaTabs } from "./van-hoa-tabs";

export const metadata: Metadata = {
  title: "Văn Hóa Mỹ — Cẩm Nang Định Cư",
  description:
    "Cẩm nang văn hóa Mỹ cho người Việt mới định cư: giao tiếp, công việc, học đường, lễ nghi, cuộc sống, tài chính và checklist chuẩn bị từng giai đoạn.",
  alternates: {
    canonical: "https://eb3viet.com/van-hoa-my",
  },
  openGraph: {
    title: "Văn Hóa Mỹ — Cẩm Nang Định Cư",
    description:
      "Cẩm nang văn hóa Mỹ cho người Việt mới định cư: giao tiếp, công việc, học đường, lễ nghi, cuộc sống, tài chính và checklist chuẩn bị từng giai đoạn.",
    url: "https://eb3viet.com/van-hoa-my",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Văn Hóa Mỹ — Cẩm Nang Định Cư",
    description:
      "Cẩm nang văn hóa Mỹ cho người Việt mới định cư: giao tiếp, công việc, học đường, lễ nghi, cuộc sống, tài chính và checklist chuẩn bị từng giai đoạn.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VanHoaMyPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <div className="rounded-card bg-gradient-to-br from-primary to-accent p-7 text-white">
          <h1 className="text-xl font-bold">🇺🇸 Văn Hóa Mỹ — Cẩm Nang Định Cư</h1>
          <p className="mt-1 text-sm opacity-90">
            Chuẩn bị từ bây giờ để không bỡ ngỡ khi đặt chân xuống sân bay Mỹ
          </p>
        </div>

        <div className="mt-6">
          <VanHoaTabs />
        </div>
      </div>
    </Layout>
  );
}
