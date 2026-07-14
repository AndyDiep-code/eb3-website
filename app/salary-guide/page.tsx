import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { SalaryGuideContent } from "./salary-guide-content";

export const metadata: Metadata = {
  title: "Bảng Lương Theo Ngành — EB-3 Việt Nam | EB3VIET",
  description:
    "Tra cứu mức lương điển hình theo ngành nghề phổ biến EB-3: chế biến gia cầm, sản xuất, khách sạn, chăm sóc sức khỏe, kho bãi. Dữ liệu BLS 2024.",
};

export default function SalaryGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          💼 Bảng Lương Theo Ngành — EB-3 Việt Nam
        </h1>
        <p className="mt-2 text-text-muted">
          Mức lương điển hình theo từng ngành · Vai trò phổ biến · So sánh lương EB-3 theo bang
        </p>
        <SalaryGuideContent />
      </div>
    </Layout>
  );
}
