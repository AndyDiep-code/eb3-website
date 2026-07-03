import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { GuidesContent } from "./guides-content";

export const metadata: Metadata = {
  title: "Hướng Dẫn Quy Trình EB-3 | EB3VIET",
  description:
    "5 giai đoạn quy trình EB-3: PERM/LC → I-140 → NVC → DS-260 → Phỏng vấn. Hướng dẫn chi tiết song ngữ Việt–Anh.",
  alternates: {
    canonical: "https://eb3viet.com/guides",
  },
  openGraph: {
    title: "Hướng Dẫn Quy Trình EB-3 | EB3VIET",
    description:
      "5 giai đoạn quy trình EB-3: PERM/LC → I-140 → NVC → DS-260 → Phỏng vấn. Hướng dẫn chi tiết song ngữ Việt–Anh.",
    url: "https://eb3viet.com/guides",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hướng Dẫn Quy Trình EB-3 | EB3VIET",
    description:
      "5 giai đoạn quy trình EB-3: PERM/LC → I-140 → NVC → DS-260 → Phỏng vấn. Hướng dẫn chi tiết song ngữ Việt–Anh.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GuidesPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">📖 Hướng Dẫn Quy Trình EB-3</h1>
        <p className="mt-2 text-text-muted">5 giai đoạn từ tuyển dụng đến nhận thẻ xanh</p>

        <GuidesContent />
      </div>
    </Layout>
  );
}
