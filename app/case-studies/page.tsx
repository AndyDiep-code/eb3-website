import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { CaseStudiesContent } from "./case-studies-content";

export const metadata: Metadata = {
  title: "Xử Lý Sự Cố EB-3 — LC Denied, I-140 RFE, 221g | EB3VIET",
  description:
    "Hướng dẫn xử lý các tình huống thất bại trong hồ sơ EB-3: LC Denied, I-140 RFE, Interview 221g, từ chối vĩnh viễn. Nguyên nhân và cách phục hồi.",
  alternates: {
    canonical: "https://eb3viet.com/case-studies",
  },
  openGraph: {
    title: "Xử Lý Sự Cố EB-3 — LC Denied, I-140 RFE, 221g | EB3VIET",
    description:
      "Hướng dẫn xử lý các tình huống thất bại trong hồ sơ EB-3: LC Denied, I-140 RFE, Interview 221g, từ chối vĩnh viễn. Nguyên nhân và cách phục hồi.",
    url: "https://eb3viet.com/case-studies",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xử Lý Sự Cố EB-3 — LC Denied, I-140 RFE, 221g | EB3VIET",
    description:
      "Hướng dẫn xử lý các tình huống thất bại trong hồ sơ EB-3: LC Denied, I-140 RFE, Interview 221g, từ chối vĩnh viễn. Nguyên nhân và cách phục hồi.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CaseStudiesPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">⚠️ Xử Lý Sự Cố EB-3</h1>
        <p className="mt-2 text-text-muted">
          6 tình huống thường gặp — nguyên nhân và cách phục hồi
        </p>

        <CaseStudiesContent />
      </div>
    </Layout>
  );
}
