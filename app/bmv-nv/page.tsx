import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvNvContent } from "./bmv-nv-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Nevada (NV) | EB3VIET",
  description: "Ôn thi bằng lái xe Nevada (NV) song ngữ Việt-Anh. 50 câu hỏi thực tế, thi thử chấm điểm.",
  alternates: { canonical: "https://eb3viet.com/bmv-nv" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Nevada (NV) | EB3VIET",
    description: "Ôn thi bằng lái xe Nevada (NV) song ngữ Việt-Anh. 50 câu hỏi thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-nv",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ôn Thi Bằng Lái Nevada (NV) | EB3VIET",
    description: "Ôn thi bằng lái xe Nevada (NV) song ngữ Việt-Anh. 50 câu hỏi thực tế, thi thử chấm điểm.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function BmvNvPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvNvContent />
    </Layout>
  );
}
