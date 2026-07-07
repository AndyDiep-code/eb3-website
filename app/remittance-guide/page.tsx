import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { RemittanceGuideContent } from "./remittance-guide-content";

export const metadata: Metadata = {
  title: "Gửi Tiền Về Việt Nam — Hướng Dẫn EB-3 | EB3VIET",
  description:
    "So sánh Wise, Remitly, Western Union, cách gửi tiền an toàn, quy định thuế quà tặng, và cách tránh lừa đảo — hướng dẫn tiếng Việt cho người lao động EB-3.",
  alternates: { canonical: "https://eb3viet.com/remittance-guide" },
  openGraph: {
    title: "Gửi Tiền Về Việt Nam — Hướng Dẫn EB-3 | EB3VIET",
    description: "So sánh Wise · Remitly · Western Union · Quy định thuế · Tránh lừa đảo — tiếng Việt.",
    url: "https://eb3viet.com/remittance-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RemittanceGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <RemittanceGuideContent />
    </Layout>
  );
}
