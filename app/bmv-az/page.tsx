import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvAzContent } from "./bmv-az-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Arizona (AZ) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Arizona (AZ) song ngữ Việt–Anh. 30 câu thực tế, thi thử chấm điểm. Cần 24/30 (80%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-az" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Arizona (AZ) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Arizona (AZ) song ngữ Việt–Anh. 30 câu thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-az",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvAzPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvAzContent />
    </Layout>
  );
}
