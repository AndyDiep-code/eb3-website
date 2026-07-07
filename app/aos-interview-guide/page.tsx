import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { AosTabs } from "./aos-tabs";

export const metadata: Metadata = {
  title: "Phỏng Vấn AOS & Khám Sức Khỏe I-693 | EB3VIET",
  description:
    "Hướng dẫn cho người thân (vợ/chồng, con) điều chỉnh tình trạng I-485 tại Mỹ: khám sức khỏe I-693 với civil surgeon, phỏng vấn USCIS địa phương, và timeline EAD/Advance Parole.",
  alternates: {
    canonical: "https://eb3viet.com/aos-interview-guide",
  },
  openGraph: {
    title: "Phỏng Vấn AOS & Khám Sức Khỏe I-693 | EB3VIET",
    description:
      "I-485 vs phỏng vấn lãnh sự, khám sức khỏe I-693 với civil surgeon ($200-500), phỏng vấn tại USCIS địa phương, và timeline EAD/Advance Parole.",
    url: "https://eb3viet.com/aos-interview-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phỏng Vấn AOS & Khám Sức Khỏe I-693 | EB3VIET",
    description:
      "I-485 vs phỏng vấn lãnh sự, khám sức khỏe I-693 với civil surgeon ($200-500), phỏng vấn tại USCIS địa phương, và timeline EAD/Advance Parole.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AosInterviewGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          📋 Phỏng Vấn AOS &amp; Khám Sức Khỏe I-693
        </h1>
        <p className="mt-2 text-text-muted">
          I-485 vs Phỏng Vấn Lãnh Sự · Khám I-693 · Phỏng Vấn USCIS ·
          Timeline EAD/Advance Parole
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-lg">👤</span>
          <div>
            <strong>Hướng dẫn này dành cho ai?</strong> Trang này dành cho{" "}
            <strong className="text-secondary">
              người thân (vợ/chồng, con) của người lao động EB-3 chính, đang
              ở Mỹ và nộp đơn I-485 điều chỉnh tình trạng (Adjustment of
              Status)
            </strong>
            . Nếu bạn là{" "}
            <strong>
              người lao động EB-3 chính đang phỏng vấn tại Lãnh Sự
              Quán/Đại Sứ Quán Mỹ ở Việt Nam (consular processing)
            </strong>
            , hãy xem{" "}
            <a href="/interview" className="text-primary">
              <strong>Ôn Phỏng Vấn</strong>
            </a>{" "}
            — quy trình và câu hỏi khác hoàn toàn với nội dung trang này.
          </div>
        </div>

        <div className="mt-6">
          <AosTabs />
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          <b className="text-text">Lưu ý:</b> Thông tin trên mang tính tham
          khảo tổng quát (cập nhật 6/2026). Quy trình I-485, phí, thời gian
          xử lý EAD/Advance Parole, và yêu cầu phỏng vấn thay đổi theo từng
          trường hợp và từng giai đoạn chính sách. Luôn xác nhận với luật sư
          di trú hoặc uscis.gov tại thời điểm áp dụng. Nguồn: USCIS.gov.
        </div>
      </div>
    </Layout>
  );
}
