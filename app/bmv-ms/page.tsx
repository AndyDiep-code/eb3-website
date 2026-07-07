import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvMsContent } from "./bmv-ms-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Mississippi (MS) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Mississippi (MS) song ngữ Việt–Anh. 30 câu thực tế, thi thử chấm điểm. Cần 24/30 (80%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-ms" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Mississippi (MS) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Mississippi (MS) song ngữ Việt–Anh. 30 câu thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-ms",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvMsPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvMsContent />
    </Layout>
  );
}
