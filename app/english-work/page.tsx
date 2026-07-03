import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { EnglishWorkContent } from "./english-work-content";

export const metadata: Metadata = {
  title: "Tiếng Anh Công Việc EB-3 | EB3VIET",
  description:
    "Học tiếng Anh theo ngành nghề EB-3: nhà máy, chế biến thực phẩm, khách sạn, nhà hàng, chăm sóc người già, kho bãi. 150+ câu song ngữ với phát âm.",
  alternates: {
    canonical: "https://eb3viet.com/english-work",
  },
  openGraph: {
    title: "Tiếng Anh Công Việc EB-3 | EB3VIET",
    description:
      "Học tiếng Anh theo ngành nghề EB-3: nhà máy, chế biến thực phẩm, khách sạn, nhà hàng, chăm sóc người già, kho bãi. 150+ câu song ngữ với phát âm.",
    url: "https://eb3viet.com/english-work",
    siteName: "EB3VIET",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tiếng Anh Công Việc EB-3 | EB3VIET",
    description:
      "Học tiếng Anh theo ngành nghề EB-3: nhà máy, chế biến thực phẩm, khách sạn, nhà hàng, chăm sóc người già, kho bãi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnglishWorkPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">
          💬 Tiếng Anh Công Việc — Theo Ngành EB-3
        </h1>
        <p className="mt-2 text-text-muted">
          280+ câu giao tiếp thực tế · 10 chủ đề · Bấm 🔊 để nghe phát âm
        </p>

        <div className="mt-3 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm text-text">
          <p>
            🔗 <b>Hướng dẫn liên quan:</b>{" "}
            <a href="/interview" className="text-primary hover:underline">
              Ôn Phỏng Vấn LSQ
            </a>{" "}
            · <b>Tiếng Anh Công Việc</b> ·{" "}
            <a href="/case-studies" className="text-primary hover:underline">
              Xử Lý Sự Cố (RFE/221g)
            </a>
          </p>
        </div>

        <div className="mt-3 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm leading-relaxed text-accent">
          <b>💡 Cách sử dụng:</b> Chọn ngành nghề của bạn → học các câu trong
          từng tình huống → bấm 🔊 để nghe phát âm → luyện nói to mỗi ngày.
          Tiếng Anh cơ bản là đủ để bắt đầu làm việc.
        </div>

        <EnglishWorkContent />
      </div>
    </Layout>
  );
}
