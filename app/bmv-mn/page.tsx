import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvMnContent } from "./bmv-mn-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Minnesota (MN) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Minnesota (MN) song ngữ Việt–Anh. 40 câu thực tế, thi thử chấm điểm. Cần 32/40 (80%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-mn" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Minnesota (MN) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Minnesota (MN) song ngữ Việt–Anh. 40 câu thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-mn",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvMnPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvMnContent />
    </Layout>
  );
}
