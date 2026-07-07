import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { GreenCardLifeContent } from "./green-card-life-content";

export const metadata: Metadata = {
  title: "Thẻ Xanh Cho Bạn Quyền Gì | EB3VIET",
  description:
    "Hướng dẫn đầy đủ về quyền lợi thẻ xanh: tự do đổi việc, mua nhà, phúc lợi liên bang, quy tắc du lịch, và nghĩa vụ của người cầm thẻ xanh tại Mỹ.",
  alternates: {
    canonical: "https://eb3viet.com/green-card-life",
  },
  openGraph: {
    title: "Thẻ Xanh Cho Bạn Quyền Gì | EB3VIET",
    description:
      "Hướng dẫn đầy đủ về quyền lợi thẻ xanh: tự do đổi việc, mua nhà, phúc lợi liên bang, quy tắc du lịch, và nghĩa vụ của người cầm thẻ xanh tại Mỹ.",
    url: "https://eb3viet.com/green-card-life",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thẻ Xanh Cho Bạn Quyền Gì | EB3VIET",
    description:
      "Hướng dẫn đầy đủ về quyền lợi thẻ xanh: tự do đổi việc, mua nhà, phúc lợi liên bang, quy tắc du lịch, và nghĩa vụ của người cầm thẻ xanh tại Mỹ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GreenCardLifePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          🟢 Thẻ Xanh Cho Bạn Quyền Gì
        </h1>
        <p className="mt-2 text-text-muted">
          Tự do đổi việc · Phúc lợi liên bang · Quy tắc du lịch · Nghĩa vụ
          cần biết
        </p>

        <GreenCardLifeContent />

        <section className="mt-6 rounded-card border border-border bg-bg p-4">
          <h3 className="text-sm font-bold text-text">
            📚 Nguồn tham khảo chính thức
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            <a
              href="https://www.uscis.gov/sites/default/files/document/guides/M-618.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Hướng dẫn quyền &amp; nghĩa vụ của thường trú nhân (USCIS
              M-618)
            </a>{" "}
            — tài liệu chính thức giải thích quyền lợi và trách nhiệm khi có
            thẻ xanh.
            <br />
            <a
              href="https://www.uscis.gov/green-card"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              USCIS — Thông tin tổng quan về thẻ xanh (Green Card)
            </a>{" "}
            — trang chính thức về điều kiện, gia hạn, và các vấn đề liên
            quan.
          </p>
        </section>
      </div>
    </Layout>
  );
}
