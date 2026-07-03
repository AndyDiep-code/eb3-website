import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvArContent } from "./bmv-ar-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Arkansas (AR) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Arkansas (AR) song ngữ Việt-Anh. 25 câu hỏi thực tế, thi thử chấm điểm. Cần 20/25 (80%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-ar" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Arkansas (AR) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Arkansas (AR) song ngữ Việt-Anh. 25 câu hỏi thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-ar",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvArPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvArContent />
    </Layout>
  );
}
