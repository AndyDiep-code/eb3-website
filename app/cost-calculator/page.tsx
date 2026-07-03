import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { CostCalculatorContent } from "./cost-calculator-content";

export const metadata: Metadata = {
  title: "Chi Phí Sinh Hoạt Mỹ Theo Tiểu Bang | EB3VIET",
  description:
    "Tính toán chi phí sinh hoạt ở Mỹ theo tiểu bang dành cho người EB-3: thuê nhà, ăn uống, xe cộ, bảo hiểm. So sánh với mức lương EB-3 điển hình.",
  alternates: {
    canonical: "https://eb3viet.com/cost-calculator",
  },
  openGraph: {
    title: "Chi Phí Sinh Hoạt Mỹ Theo Tiểu Bang | EB3VIET",
    description:
      "Tính toán chi phí sinh hoạt ở Mỹ theo tiểu bang dành cho người EB-3: thuê nhà, ăn uống, xe cộ, bảo hiểm. So sánh với mức lương EB-3 điển hình.",
    url: "https://eb3viet.com/cost-calculator",
    siteName: "EB3VIET",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Chi Phí Sinh Hoạt Mỹ Theo Tiểu Bang | EB3VIET",
    description:
      "Tính toán chi phí sinh hoạt ở Mỹ theo tiểu bang dành cho người EB-3: thuê nhà, ăn uống, xe cộ, bảo hiểm.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CostCalculatorPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">
          🧮 Chi Phí Sinh Hoạt Theo Tiểu Bang
        </h1>
        <p className="mt-2 text-text-muted">
          Ước tính chi phí hàng tháng · So sánh với lương EB-3 · 18 tiểu bang
        </p>

        <CostCalculatorContent />

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/jobs" className="text-primary hover:underline">
            🏭 Ngành Nghề
          </a>
        </div>
      </div>
    </Layout>
  );
}
