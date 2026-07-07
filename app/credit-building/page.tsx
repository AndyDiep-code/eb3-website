import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { CreditBuildingContent } from "./credit-building-content";

export const metadata: Metadata = {
  title: "Xây Dựng Tín Dụng Tại Mỹ — Hướng Dẫn EB-3 | EB3VIET",
  description:
    "Xây dựng tín dụng tại Mỹ từ con số 0: secured card, credit-builder loan, điểm FICO, lộ trình 24 tháng — hướng dẫn tiếng Việt cho người lao động EB-3.",
  alternates: { canonical: "https://eb3viet.com/credit-building" },
  openGraph: {
    title: "Xây Dựng Tín Dụng Tại Mỹ — Hướng Dẫn EB-3 | EB3VIET",
    description: "Secured card, credit-builder loan, lộ trình 24 tháng xây dựng tín dụng — hướng dẫn tiếng Việt.",
    url: "https://eb3viet.com/credit-building",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function CreditBuildingPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <CreditBuildingContent />
    </Layout>
  );
}
