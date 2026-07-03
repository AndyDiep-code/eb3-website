import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvAlContent } from "./bmv-al-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Alabama (AL) | EB3VIET",
  description:
    "Ôn thi bằng lái xe Alabama (AL) song ngữ Việt–Anh. 40 câu thực tế, thi thử chấm điểm. Cần 32/40 (80%) để đậu.",
  alternates: { canonical: "https://eb3viet.com/bmv-al" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Alabama (AL) | EB3VIET",
    description:
      "Ôn thi bằng lái xe Alabama (AL) song ngữ Việt–Anh. 40 câu thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-al",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BmvAlPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvAlContent />
    </Layout>
  );
}
