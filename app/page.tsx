import type { Metadata } from "next";
import { Layout } from "./components/page-layout";
import { SIDEBAR_GROUPS } from "./components/sidebar-data";
import { Hero } from "./components/hero";
import { VbHomeDashboard } from "./components/vb-home-dashboard";
import { NewsPreview } from "./components/news-preview";
import { LinksGrid } from "./components/links-grid";
import { SiteDirectory } from "./components/site-directory";

export const metadata: Metadata = {
  title: "EB3 Vietnam Information Hub",
  description:
    "Tổng hợp thông tin Visa Bulletin, quy trình EB-3, tin tức chính sách dành cho người Việt Nam theo diện lao động EB-3 Other Workers.",
  alternates: {
    canonical: "https://eb3viet.com/",
  },
  openGraph: {
    title: "EB3 Vietnam Information Hub",
    description:
      "Tổng hợp thông tin Visa Bulletin, quy trình EB-3, tin tức chính sách dành cho người Việt Nam theo diện lao động EB-3 Other Workers.",
    url: "https://eb3viet.com/",
    siteName: "EB3 Vietnam",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EB3 Vietnam Information Hub",
    description:
      "Tổng hợp thông tin Visa Bulletin, quy trình EB-3, tin tức chính sách dành cho người Việt Nam theo diện lao động EB-3 Other Workers.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="flex w-full flex-col gap-6">
        <Hero />

        {/* Live Visa Bulletin dashboard — first thing users see */}
        <VbHomeDashboard />

        {/* Full site directory — every page visible at a glance */}
        <SiteDirectory />

        {/* News + external tools */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <NewsPreview />
          <LinksGrid />
        </div>
      </div>
    </Layout>
  );
}
