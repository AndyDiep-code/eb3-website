import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { CitizenshipPathContent } from "./citizenship-path-content";

export const metadata: Metadata = {
  title: "Con Đường Quốc Tịch Mỹ | EB3VIET",
  description:
    "Hướng dẫn nhập tịch Mỹ cho người Việt: điều kiện 5 năm, quy trình N-400, civics test, phỏng vấn, và quốc tịch kép Việt Nam - Hoa Kỳ.",
  alternates: {
    canonical: "https://eb3viet.com/citizenship-path",
  },
  openGraph: {
    title: "Con Đường Quốc Tịch Mỹ | EB3VIET",
    description:
      "Hướng dẫn nhập tịch Mỹ cho người Việt: điều kiện 5 năm, quy trình N-400, civics test, phỏng vấn, và quốc tịch kép Việt Nam - Hoa Kỳ.",
    url: "https://eb3viet.com/citizenship-path",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Con Đường Quốc Tịch Mỹ | EB3VIET",
    description:
      "Hướng dẫn nhập tịch Mỹ cho người Việt: điều kiện 5 năm, quy trình N-400, civics test, phỏng vấn, và quốc tịch kép Việt Nam - Hoa Kỳ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CitizenshipPathPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">
          🎓 Con Đường Quốc Tịch Mỹ
        </h1>
        <p className="mt-2 text-text-muted">
          5 năm chờ đợi · Quy trình N-400 · Civics test · Quốc tịch kép Việt
          - Mỹ
        </p>

        <CitizenshipPathContent />
      </div>
    </Layout>
  );
}
