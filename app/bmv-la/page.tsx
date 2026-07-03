import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvLaContent } from "./bmv-la-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Louisiana (LA) | EB3VIET",
  description: "Ôn thi bằng lái xe Louisiana (LA) song ngữ Việt-Anh. 40 câu hỏi thực tế, thi thử chấm điểm.",
  alternates: { canonical: "https://eb3viet.com/bmv-la" },
  openGraph: {
    title: "Ôn Thi Bằng Lái Louisiana (LA) | EB3VIET",
    description: "Ôn thi bằng lái xe Louisiana (LA) song ngữ Việt-Anh. 40 câu hỏi thực tế, thi thử chấm điểm.",
    url: "https://eb3viet.com/bmv-la",
  },
  robots: { index: true, follow: true },
};

export default function BmvLaPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <BmvLaContent />
    </Layout>
  );
}
