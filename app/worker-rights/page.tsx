import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { WorkerRightsContent } from "./worker-rights-content";

export const metadata: Metadata = {
  title: "Quyền Lợi Người Lao Động EB-3 | EB3VIET",
  description:
    "Quyền lao động cơ bản tại Mỹ cho người EB-3: lương tối thiểu, overtime, OSHA, chống phân biệt đối xử, cách tố cáo vi phạm, và cảnh báo lừa đảo tuyển dụng.",
  alternates: { canonical: "https://eb3viet.com/worker-rights" },
  openGraph: {
    title: "Quyền Lợi Người Lao Động EB-3 | EB3VIET",
    description: "Lương tối thiểu · Overtime · OSHA · Cách tố cáo · Cảnh báo lừa đảo tuyển dụng EB-3.",
    url: "https://eb3viet.com/worker-rights",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function WorkerRightsPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <WorkerRightsContent />
    </Layout>
  );
}
