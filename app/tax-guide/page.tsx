import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { TaxGuideContent } from "./tax-guide-content";

export const metadata: Metadata = {
  title: "Khai Thuế Lần Đầu — Hướng Dẫn EB-3 | EB3VIET",
  description:
    "Hướng dẫn khai thuế lần đầu cho người lao động EB-3 tại Mỹ. W-2, cách khai miễn phí, mốc thời gian, khấu trừ và hoàn thuế — từng bước tiếng Việt.",
  alternates: { canonical: "https://eb3viet.com/tax-guide" },
  openGraph: {
    title: "Khai Thuế Lần Đầu — Hướng Dẫn EB-3 | EB3VIET",
    description: "W-2, cách khai thuế miễn phí, mốc thời gian, khấu trừ — hướng dẫn tiếng Việt từng bước.",
    url: "https://eb3viet.com/tax-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function TaxGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <TaxGuideContent />
    </Layout>
  );
}
