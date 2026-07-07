import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { FinanceContent } from "./finance-content";

export const metadata: Metadata = {
  title: "Tài Chính Thiết Yếu tại Mỹ | EB3VIET",
  description:
    "Mở ngân hàng, xây dựng credit score, gửi tiền về Việt Nam, lập ngân sách và hiểu quyền lợi 401k — hướng dẫn tài chính toàn diện cho người Việt EB-3 mới sang Mỹ.",
  alternates: { canonical: "https://eb3viet.com/finance" },
  openGraph: {
    title: "Tài Chính Thiết Yếu tại Mỹ | EB3VIET",
    description:
      "Ngân hàng, credit score, gửi tiền về VN, ngân sách, 401k — nền tảng tài chính cho người Việt mới sang Mỹ.",
    url: "https://eb3viet.com/finance",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tài Chính Thiết Yếu tại Mỹ | EB3VIET",
    description:
      "Ngân hàng, credit score, gửi tiền về VN, ngân sách, 401k — nền tảng tài chính cho người Việt mới sang Mỹ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function FinancePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <div className="rounded-card bg-gradient-to-br from-primary via-primary to-secondary p-6 text-center text-white">
          <h1 className="text-2xl font-bold">🏦 Tài Chính Thiết Yếu tại Mỹ</h1>
          <p className="mt-2 text-sm opacity-90">
            Ngân hàng · Credit score · Gửi tiền về VN · Ngân sách · Quyền lợi 401k
          </p>
        </div>
        <FinanceContent />
      </div>
    </Layout>
  );
}
