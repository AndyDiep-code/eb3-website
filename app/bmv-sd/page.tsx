import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvSDContent } from "./bmv-sd-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái South Dakota (SD) | EB3VIET",
  description:
    "Ôn thi bằng lái xe South Dakota (SD) song ngữ Việt–Anh. 25 câu thực tế, thi thử chấm điểm. Cần 20/25 (80%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-sd" },
  openGraph: {
    title: "Ôn Thi Bằng Lái South Dakota (SD) | EB3VIET",
    description:
      "Ôn thi bằng lái xe South Dakota (SD) song ngữ Việt–Anh. 25 câu thực tế, thi thử chấm điểm. Cần 20/25 (80%) để đậu.",
    url: "https://eb3viet.com/bmv-sd",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvSDPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvSDContent />
    </Layout>
  );
}
