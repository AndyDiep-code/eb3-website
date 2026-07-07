import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { IndianaBmvSignsContent } from "./indiana-bmv-signs-content";

export const metadata: Metadata = {
  title: "Ôn Lý Thuyết Biển Báo Indiana (IN) | EB3VIET",
  description:
    "Thư viện biển báo giao thông Indiana song ngữ Việt–Anh. Flashcard, bảng tra cứu và thi thử biển báo. Cần thiết cho kỳ thi lý thuyết Indiana.",
  alternates: { canonical: "https://eb3viet.com/Indiana_BMV_Signs_Visual" },
  openGraph: {
    title: "Ôn Lý Thuyết Biển Báo Indiana (IN) | EB3VIET",
    description:
      "Thư viện biển báo giao thông Indiana song ngữ Việt–Anh. Flashcard, bảng tra cứu và thi thử.",
    url: "https://eb3viet.com/Indiana_BMV_Signs_Visual",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function IndianaBmvSignsPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <IndianaBmvSignsContent />
    </Layout>
  );
}
