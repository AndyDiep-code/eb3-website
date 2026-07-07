import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { NewsContent } from "./news-content";
import legalNewsData from "../../data/news-legal.json";
import govNewsData from "../../data/news-uscis.json";

export const metadata: Metadata = {
  title: "Tin Tức Di Trú EB-3 | EB3VIET",
  description:
    "25+ cập nhật chính sách từ USCIS, DOS, DOL ảnh hưởng đến hồ sơ EB-3 (2022–2026). Lọc theo tag, tìm kiếm nhanh.",
  alternates: {
    canonical: "https://eb3viet.com/news",
  },
  openGraph: {
    title: "Tin Tức Chính Sách EB-3 Mới Nhất | EB3VIET",
    description:
      "Cập nhật USCIS, DOS, DOL liên quan đến EB-3 Other Workers dành cho người Việt.",
    url: "https://eb3viet.com/news",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin Tức Chính Sách EB-3 Mới Nhất | EB3VIET",
    description:
      "Cập nhật USCIS, DOS, DOL liên quan đến EB-3 Other Workers dành cho người Việt.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewsPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">📰 Tin Tức & Cập Nhật</h1>
        <p className="mt-2 text-text-muted">
          Chính sách EB-3 · Pháp luật & Cộng đồng · USCIS & DOL
        </p>

        <NewsContent legalData={legalNewsData} govData={govNewsData} />
      </div>
    </Layout>
  );
}
