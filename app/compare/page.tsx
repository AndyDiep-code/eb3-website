import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { CompareContent } from "./compare-content";

export const metadata: Metadata = {
  title: "So Sánh Tiểu Bang EB-3 | EB3VIET",
  description:
    "So sánh chi tiết 2-3 tiểu bang Mỹ dành cho người EB-3: thuế thu nhập, chi phí sinh hoạt, lương điển hình, cộng đồng Việt, hãng bảo trợ.",
  alternates: {
    canonical: "https://eb3viet.com/compare",
  },
  openGraph: {
    title: "So Sánh Tiểu Bang EB-3 Việt Nam | EB3VIET",
    description:
      "So sánh thuế, chi phí sống, lương, cộng đồng Việt, hãng bảo lãnh giữa các bang — có điểm tổng hợp.",
    url: "https://eb3viet.com/compare",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-compare.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "So Sánh Tiểu Bang EB-3 Việt Nam | EB3VIET",
    description:
      "So sánh thuế, chi phí sống, lương, cộng đồng Việt, hãng bảo lãnh giữa các bang — có điểm tổng hợp.",
    images: ["https://eb3viet.com/og-compare.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ComparePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">⚖️ So Sánh Tiểu Bang EB-3</h1>
        <p className="mt-2 text-text-muted">
          Chọn 2–3 bang để so sánh chi tiết · Thuế · Chi phí · Lương · Cộng đồng · Khí hậu
        </p>

        <div className="mt-3 mb-5 rounded-card border border-primary/40 bg-primary/10 p-3 text-[12.5px] leading-relaxed text-text">
          <b className="text-primary">💡 Cách dùng:</b> Chọn 2 hoặc 3 bang muốn so
          sánh rồi bấm &quot;So Sánh&quot;. Điểm tổng được tính từ 6 tiêu chí —
          cao nhất là lựa chọn tốt nhất cho EB-3 người Việt.
        </div>

        <CompareContent />
      </div>
    </Layout>
  );
}
