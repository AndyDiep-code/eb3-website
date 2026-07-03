import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { ScamWarningContent } from "./scam-warning-content";

export const metadata: Metadata = {
  title: "Cảnh Báo Lừa Đảo — Bảo Vệ Bản Thân | EB3VIET",
  description:
    "Nhận biết các kiểu lừa đảo phổ biến nhằm vào công nhân EB-3: phí agency/luật sư giả, lừa chuyển tiền, việc làm giả, notario fraud. Cách kiểm tra và báo cáo lừa đảo.",
  alternates: {
    canonical: "https://eb3viet.com/scam-warning",
  },
  openGraph: {
    title: "Cảnh Báo Lừa Đảo — Bảo Vệ Bản Thân | EB3VIET",
    description:
      "Nhận biết các kiểu lừa đảo phổ biến nhằm vào công nhân EB-3: phí agency/luật sư giả, lừa chuyển tiền, việc làm giả, notario fraud. Cách kiểm tra và báo cáo lừa đảo.",
    url: "https://eb3viet.com/scam-warning",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cảnh Báo Lừa Đảo — Bảo Vệ Bản Thân | EB3VIET",
    description:
      "Nhận biết các kiểu lừa đảo phổ biến nhằm vào công nhân EB-3: phí agency/luật sư giả, lừa chuyển tiền, việc làm giả, notario fraud. Cách kiểm tra và báo cáo lừa đảo.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ScamWarningPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">
          🚩 Cảnh Báo Lừa Đảo — Bảo Vệ Bản Thân
        </h1>
        <p className="mt-2 text-text-muted">
          Nhận diện các kiểu lừa đảo phổ biến · Cách kiểm tra trước khi tin ·
          Nơi báo cáo
        </p>

        <div className="mt-4">
          <ScamWarningContent />
        </div>
      </div>
    </Layout>
  );
}
