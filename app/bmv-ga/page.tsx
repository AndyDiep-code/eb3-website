import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvGAContent } from "./bmv-ga-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Georgia (GA) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Georgia (GA) song ngữ Việt–Anh. 40 câu thực tế, thi thử chấm điểm. Cần 30/40 (75%) để đậu. Georgia hỗ trợ thi tiếng Việt.",
  alternates: { canonical: "https://eb3viet.com/bmv-ga" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Georgia (GA) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Georgia (GA) song ngữ Việt–Anh. 40 câu thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-ga",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvGaPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvGAContent />
    </Layout>
  );
}
