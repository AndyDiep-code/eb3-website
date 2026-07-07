import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { AcaMedicaidTabs } from "./aca-medicaid-tabs";

export const metadata: Metadata = {
  title: "ACA & Medicaid Cho Người Mới Có Thẻ Xanh | EB3VIET",
  description:
    "Hướng dẫn ACA Marketplace cho LPR mới (đủ điều kiện ngay, không chờ 5 năm), tóm tắt Medicaid/CHIP 5-year bar, và sự thật về 'public charge' khi dùng phúc lợi.",
  alternates: {
    canonical: "https://eb3viet.com/aca-medicaid-guide",
  },
  openGraph: {
    title: "ACA & Medicaid Cho Người Mới Có Thẻ Xanh | EB3VIET",
    description:
      "LPR mới đủ điều kiện mua bảo hiểm ACA Marketplace ngay, không cần chờ 5 năm như Medicaid. Tìm hiểu trợ cấp premium, public charge, và CHIP cho con.",
    url: "https://eb3viet.com/aca-medicaid-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACA & Medicaid Cho Người Mới Có Thẻ Xanh | EB3VIET",
    description:
      "LPR mới đủ điều kiện mua bảo hiểm ACA Marketplace ngay, không cần chờ 5 năm như Medicaid. Tìm hiểu trợ cấp premium, public charge, và CHIP cho con.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AcaMedicaidGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          🏥 ACA &amp; Medicaid Cho Người Mới Có Thẻ Xanh
        </h1>
        <p className="mt-2 text-text-muted">
          Bảo hiểm Marketplace đủ điều kiện ngay · Medicaid/CHIP 5 năm chờ
          · Sự thật về Public Charge
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-lg">✅</span>
          <div>
            <strong>
              Có thẻ xanh = đủ điều kiện mua bảo hiểm ACA Marketplace
              (Obamacare) NGAY LẬP TỨC
            </strong>{" "}
            — khác với Medicaid, ACA Marketplace KHÔNG có quy tắc chờ 5
            năm. Đây là lựa chọn bảo hiểm tốt nhất cho gia đình mới sang
            Mỹ trước khi có bảo hiểm từ chủ lao động.
          </div>
        </div>

        <div className="mt-6">
          <AcaMedicaidTabs />
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          <b className="text-text">Lưu ý:</b> Thông tin trên mang tính
          tham khảo tổng quát theo quy định hiện hành (cập nhật 6/2026).
          Quy định public charge, mức trợ cấp ACA, và giới hạn thu nhập có
          thể thay đổi theo từng năm và từng tiểu bang. Luôn xác nhận với
          luật sư di trú, healthcare.gov, hoặc uscis.gov tại thời điểm áp
          dụng. Nguồn: HealthCare.gov, KFF, NILC, Protecting Immigrant
          Families.
        </div>
      </div>
    </Layout>
  );
}
