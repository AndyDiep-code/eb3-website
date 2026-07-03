import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { DmvContent } from "./dmv-content";

export const metadata: Metadata = {
  title: "Ôn Thi Bằng Lái Xe Mỹ — 18 Tiểu Bang | EB3VIET",
  description:
    "Ôn thi bằng lái xe cho 18 tiểu bang Mỹ có nhiều hãng EB-3. Song ngữ Việt–Anh, câu hỏi thực tế, thi thử có chấm điểm.",
  alternates: {
    canonical: "https://eb3viet.com/dmv",
  },
  openGraph: {
    title: "Ôn Thi Bằng Lái Xe Mỹ — 18 Tiểu Bang | EB3VIET",
    description:
      "Từ vựng, quy tắc, biển báo và bài thi thử lái xe cho 18 tiểu bang dành cho người Việt mới đến Mỹ.",
    url: "https://eb3viet.com/dmv",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ôn Thi Bằng Lái Xe Mỹ — 18 Tiểu Bang | EB3VIET",
    description:
      "Từ vựng, quy tắc, biển báo và bài thi thử lái xe cho 18 tiểu bang dành cho người Việt mới đến Mỹ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DmvPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-text">
          🚗 Ôn Thi Bằng Lái Xe — Chọn Tiểu Bang
        </h1>
        <p className="mt-2 text-text-muted">
          Chọn tiểu bang bạn sẽ sinh sống · Song ngữ Việt–Anh · Câu hỏi thực
          tế · Thi thử có chấm điểm
        </p>

        <div className="mt-6">
          <DmvContent />
        </div>
      </div>
    </Layout>
  );
}
