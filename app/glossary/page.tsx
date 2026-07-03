import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { GlossaryContent } from "./glossary-content";

export const metadata: Metadata = {
  title: "Thuật Ngữ Di Trú | EB3VIET",
  description:
    "Giải thích các thuật ngữ di trú EB-3: PD, LC, I-140, NVC, CEAC, DQ, 221g, CSPA, EAD, VB và nhiều hơn nữa.",
  alternates: {
    canonical: "https://eb3viet.com/glossary",
  },
  openGraph: {
    title: "Thuật Ngữ Di Trú EB-3 | EB3VIET",
    description:
      "Giải thích các thuật ngữ di trú EB-3: PD, LC, I-140, NVC, CEAC, DQ, 221g, CSPA, EAD, VB và nhiều hơn nữa.",
    url: "https://eb3viet.com/glossary",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuật Ngữ Di Trú EB-3 | EB3VIET",
    description:
      "Giải thích các thuật ngữ di trú EB-3: PD, LC, I-140, NVC, CEAC, DQ, 221g, CSPA, EAD, VB và nhiều hơn nữa.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GlossaryPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">
          📚 Thuật Ngữ Di Trú EB-3
        </h1>
        <p className="mt-2 text-text-muted">
          Giải thích các từ viết tắt và thuật ngữ phổ biến trong hồ sơ EB-3
        </p>

        <GlossaryContent />

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          <b className="text-text">Nguồn:</b> USCIS, DOS, DOL official
          guidance. Giải thích được đơn giản hóa cho dễ hiểu — tham khảo
          nguồn chính thức để có định nghĩa pháp lý chính xác.
        </div>
      </div>
    </Layout>
  );
}
