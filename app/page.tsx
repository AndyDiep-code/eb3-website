import type { Metadata } from "next";
import { Layout } from "./components/page-layout";
import { SIDEBAR_GROUPS } from "./components/sidebar-data";
import { Hero } from "./components/hero";
import { VbSnapCard } from "./components/vb-snap-card";
import { NewsPreview } from "./components/news-preview";
import { LinksGrid } from "./components/links-grid";

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
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Hero />

        <a
          href="/start"
          className="rounded-card border border-primary bg-primary/5 p-4 text-center text-base font-semibold text-primary hover:bg-primary/10"
        >
          Mới bắt đầu? Bắt đầu từ đây →
        </a>

        <VbSnapCard />
        <NewsPreview />
        <LinksGrid />
      </div>
    </Layout>
  );
}
