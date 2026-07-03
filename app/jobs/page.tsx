import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { JobsContent } from "./jobs-content";
import { JOBS } from "./jobs-data";

export const metadata: Metadata = {
  title: "Ngành Nghề & Hãng Bảo Trợ | EB3VIET",
  description:
    "Danh sách 55 hãng bảo trợ EB-3 tại 18 tiểu bang Mỹ. Mô tả công việc, thông tin khí hậu, chi phí sinh hoạt, cộng đồng Việt.",
  alternates: {
    canonical: "https://eb3viet.com/jobs",
  },
  openGraph: {
    title: "Ngành Nghề & Hãng Bảo Trợ EB-3 | EB3VIET",
    description:
      "Danh sách 55 hãng bảo trợ EB-3 tại 18 tiểu bang Mỹ. Mô tả công việc, thông tin khí hậu, chi phí sinh hoạt, cộng đồng Việt.",
    url: "https://eb3viet.com/jobs",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-jobs.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ngành Nghề & Hãng Bảo Trợ EB-3 | EB3VIET",
    description:
      "Danh sách 55 hãng bảo trợ EB-3 tại 18 tiểu bang Mỹ. Mô tả công việc, thông tin khí hậu, chi phí sinh hoạt, cộng đồng Việt.",
    images: ["https://eb3viet.com/og-jobs.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JobsPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-text">
          🏭 Ngành Nghề &amp; Hãng Bảo Trợ EB-3
        </h1>
        <p className="mt-2 text-text-muted">
          Danh sách công việc · mô tả công việc · thông tin tiểu bang sinh sống —{" "}
          {JOBS.length} hãng bảo trợ
        </p>

        <div className="mt-3 flex gap-2 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-base">🚩</span>
          <div>
            Cẩn thận với &quot;việc làm&quot; yêu cầu đóng phí trước hoặc hứa
            hẹn quá tốt để là sự thật. Xem{" "}
            <a href="/scam-warning" className="text-primary underline">
              Cảnh Báo Lừa Đảo
            </a>{" "}
            để biết các dấu hiệu việc làm giả.
          </div>
        </div>

        <JobsContent />

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          <b className="text-text">Lưu ý:</b> Thông tin chi phí sinh hoạt là
          ước tính tham khảo (2024-2025). Chi phí thực tế có thể thay đổi tùy
          khu vực cụ thể, số người trong gia đình và lối sống. Luôn hỏi thêm
          từ cộng đồng người Việt tại địa phương trước khi lên kế hoạch.
        </div>
      </div>
    </Layout>
  );
}
