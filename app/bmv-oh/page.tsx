import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvOhContent } from "./bmv-oh-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Ohio (OH) | EB3VIET",
  description: "Ôn thi bằng lái xe Ohio (OH) song ngữ Việt-Anh. 40 câu hỏi thực tế, thi thử chấm điểm.",
  alternates: { canonical: "https://eb3viet.com/bmv-oh" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Ohio (OH) | EB3VIET",
    description: "Ôn thi bằng lái xe Ohio (OH) song ngữ Việt-Anh. 40 câu hỏi thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-oh",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ôn Thi Bằng Lái Ohio (OH) | EB3VIET",
    description: "Ôn thi bằng lái xe Ohio (OH) song ngữ Việt-Anh. 40 câu hỏi thực tế, thi thử chấm điểm.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function BmvOhPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvOhContent />
    </Layout>
  );
}
