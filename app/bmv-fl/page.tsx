import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvFLContent } from "./bmv-fl-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Florida (FL) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Florida (FL) song ngữ Việt–Anh. 50 câu thực tế, thi thử chấm điểm. Cần 40/50 (80%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-fl" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Florida (FL) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Florida (FL) song ngữ Việt–Anh. 50 câu thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-fl",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvFlPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvFLContent />
    </Layout>
  );
}
