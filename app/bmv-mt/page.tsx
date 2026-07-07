import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvMTContent } from "./bmv-mt-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Montana (MT) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Montana (MT) song ngữ Việt–Anh. 33 câu thực tế, thi thử chấm điểm. Cần 27/33 (82%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-mt" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Montana (MT) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Montana (MT) song ngữ Việt–Anh. 33 câu thực tế, thi thử chấm điểm. Cần 27/33 (82%) để đậu.",
    url: "https://eb3viet.com/bmv-mt",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvMTPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvMTContent />
    </Layout>
  );
}
