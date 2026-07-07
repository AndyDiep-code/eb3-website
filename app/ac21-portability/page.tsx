import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { Ac21Tabs } from "./ac21-tabs";

export const metadata: Metadata = {
  title: "Đổi Việc Theo Luật AC21 | EB3VIET",
  description:
    "Luật AC21 cho phép đổi việc sau khi I-485 chờ 180 ngày. Hướng dẫn chi tiết: điều kiện, việc 'tương tự', quy trình nộp Supplement J, và quyền khi employer có vấn đề.",
  alternates: {
    canonical: "https://eb3viet.com/ac21-portability",
  },
  openGraph: {
    title: "Đổi Việc Theo Luật AC21 | EB3VIET",
    description:
      "Luật AC21 cho phép đổi việc sau khi I-485 chờ 180 ngày. Hướng dẫn chi tiết: điều kiện, việc 'tương tự', quy trình nộp Supplement J, và quyền khi employer có vấn đề.",
    url: "https://eb3viet.com/ac21-portability",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đổi Việc Theo Luật AC21 | EB3VIET",
    description:
      "Luật AC21 cho phép đổi việc sau khi I-485 chờ 180 ngày. Hướng dẫn chi tiết: điều kiện, việc 'tương tự', quy trình nộp Supplement J, và quyền khi employer có vấn đề.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Ac21PortabilityPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          🔄 Đổi Việc Theo Luật AC21
        </h1>
        <p className="mt-2 text-text-muted">
          Sau 180 ngày I-485 chờ · Quyền đổi việc của bạn · Supplement J
          step-by-step
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-lg">💡</span>
          <div>
            <strong>Bạn không bị trói buộc mãi mãi.</strong> Luật AC21
            (2000) cho phép bạn đổi sang việc làm tương tự sau khi I-485 đã
            chờ đủ 180 ngày. Rất nhiều công nhân EB-3 không biết quyền này
            và ở lại với employer không tốt vì sợ mất hồ sơ.
          </div>
        </div>

        <div className="mt-6">
          <Ac21Tabs />
        </div>
      </div>
    </Layout>
  );
}
