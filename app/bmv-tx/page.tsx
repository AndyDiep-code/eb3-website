import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvTXContent } from "./bmv-tx-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Texas (TX) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Texas (TX) song ngữ Việt–Anh. 30 câu thực tế, thi thử chấm điểm. Cần 21/30 (70%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-tx" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Texas (TX) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Texas (TX) song ngữ Việt–Anh. 30 câu thực tế, thi thử chấm điểm. Cần 21/30 (70%) để đậu.",
    url: "https://eb3viet.com/bmv-tx",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvTXPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvTXContent />
    </Layout>
  );
}
