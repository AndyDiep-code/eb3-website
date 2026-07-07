import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { HousingTabs } from "./housing-tabs";

export const metadata: Metadata = {
  title: "Thuê Nhà & Quyền Người Thuê | EB3VIET",
  description:
    "Hướng dẫn thuê nhà tại Mỹ cho công nhân EB-3: thuê nhà bằng ITIN, đọc hợp đồng, quyền người thuê theo từng bang, và cách xử lý khi có vấn đề với chủ nhà.",
  alternates: {
    canonical: "https://eb3viet.com/housing-rights",
  },
  openGraph: {
    title: "Thuê Nhà & Quyền Người Thuê | EB3VIET",
    description:
      "Hướng dẫn thuê nhà tại Mỹ cho công nhân EB-3: thuê nhà bằng ITIN, đọc hợp đồng, quyền người thuê theo từng bang, và cách xử lý khi có vấn đề với chủ nhà.",
    url: "https://eb3viet.com/housing-rights",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuê Nhà & Quyền Người Thuê | EB3VIET",
    description:
      "Hướng dẫn thuê nhà tại Mỹ cho công nhân EB-3: thuê nhà bằng ITIN, đọc hợp đồng, quyền người thuê theo từng bang, và cách xử lý khi có vấn đề với chủ nhà.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HousingRightsPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          🏠 Thuê Nhà &amp; Quyền Người Thuê
        </h1>
        <p className="mt-2 text-text-muted">
          Thuê nhà với ITIN · Đọc hợp đồng · Quyền theo bang · Xử lý tranh
          chấp
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-lg">✅</span>
          <div>
            <strong>Bạn có thể thuê nhà với ITIN.</strong> Không cần SSN,
            không cần lịch sử tín dụng Mỹ nếu bạn chứng minh được thu nhập.
            Fair Housing Act cấm phân biệt đối xử dựa trên quốc tịch và sắc
            tộc.
          </div>
        </div>

        <div className="mt-6">
          <HousingTabs />
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 border-t border-border pt-4 text-xs text-text-muted">
          <a href="/" className="hover:text-text">
            🏠 Trang Chủ
          </a>
          <a href="/after-arrival" className="hover:text-text">
            ✈️ Sau Khi Đến Mỹ
          </a>
        </div>
      </div>
    </Layout>
  );
}
