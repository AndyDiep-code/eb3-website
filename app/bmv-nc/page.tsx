import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvNCContent } from "./bmv-nc-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái North Carolina (NC) | EB3VIET",
  description:
    "Ôn thi bằng lái xe North Carolina (NC) song ngữ Việt–Anh. 40 câu thực tế, thi thử chấm điểm. Cần 30/40 (75%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-nc" },
  openGraph: {
    title: "Ôn Thi Bằng Lái North Carolina (NC) | EB3VIET",
    description:
      "Ôn thi bằng lái xe North Carolina (NC) song ngữ Việt–Anh. 40 câu thực tế, thi thử chấm điểm. Cần 30/40 (75%) để đậu.",
    url: "https://eb3viet.com/bmv-nc",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvNCPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvNCContent />
    </Layout>
  );
}
