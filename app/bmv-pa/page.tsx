import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvPAContent } from "./bmv-pa-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Pennsylvania (PA) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Pennsylvania (PA) song ngữ Việt–Anh. 18 câu thực tế, thi thử chấm điểm. Cần 15/18 (83%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-pa" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Pennsylvania (PA) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Pennsylvania (PA) song ngữ Việt–Anh. 18 câu thực tế, thi thử chấm điểm. Cần 15/18 (83%) để đậu.",
    url: "https://eb3viet.com/bmv-pa",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvPAPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvPAContent />
    </Layout>
  );
}
