import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { BmvTabs } from "./bmv-tabs";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Indiana BMV | EB3VIET",
  description:
    "Công cụ ôn thi bằng lái xe Indiana BMV song ngữ Việt–Anh. 50 câu hỏi thực tế, biển báo hình ảnh, văn hóa Mỹ.",
  alternates: {
    canonical: "https://eb3viet.com/bmv",
  },
  openGraph: {
    title: "Ôn Thi Bằng Lái Indiana BMV | EB3VIET",
    description:
      "Công cụ ôn thi bằng lái xe Indiana BMV song ngữ Việt–Anh. 50 câu hỏi thực tế, biển báo hình ảnh, văn hóa Mỹ.",
    url: "https://eb3viet.com/bmv",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ôn Thi Bằng Lái Indiana BMV | EB3VIET",
    description:
      "Công cụ ôn thi bằng lái xe Indiana BMV song ngữ Việt–Anh. 50 câu hỏi thực tế, biển báo hình ảnh, văn hóa Mỹ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BmvPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <h1 className="text-2xl font-bold text-text">
          🚗 Indiana BMV — Ôn Thi Bằng Lái Xe
        </h1>
        <p className="mt-1 text-text-muted">
          Song ngữ Việt–Anh · Cập nhật 2026 · Tài liệu ôn thi lái xe Indiana
        </p>

        {/* Stats row */}
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { n: "50", label: "Câu hỏi thật" },
            { n: "80%", label: "Điểm đậu (40/50)" },
            { n: "Tiếng Việt", label: "Có thể thi bằng tiếng Việt!" },
            { n: "$9", label: "Lệ phí thi" },
          ].map((stat) => (
            <div
              key={stat.n}
              className="rounded-card border border-border bg-bg px-4 py-2 text-center"
            >
              <div className="text-lg font-bold text-secondary">{stat.n}</div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <BmvTabs />
        </div>
      </div>
    </Layout>
  );
}
