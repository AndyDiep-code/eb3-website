import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { FaqContent } from "./faq-content";
import { FAQS } from "./faq-data";

export const metadata: Metadata = {
  title: "FAQ EB-3 | EB3VIET",
  description:
    "27 câu hỏi thường gặp nhất về EB-3: chi phí, rủi ro, chọn agency, timeline, chuyển diện. Trả lời chi tiết song ngữ.",
  alternates: {
    canonical: "https://eb3viet.com/faq",
  },
  openGraph: {
    title: "FAQ — Câu Hỏi Thường Gặp Về EB-3 | EB3VIET",
    description:
      "27 câu hỏi thường gặp nhất về EB-3: chi phí, rủi ro, chọn agency, timeline, chuyển diện. Trả lời chi tiết song ngữ.",
    url: "https://eb3viet.com/faq",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Câu Hỏi Thường Gặp Về EB-3 | EB3VIET",
    description:
      "27 câu hỏi thường gặp nhất về EB-3: chi phí, rủi ro, chọn agency, timeline, chuyển diện. Trả lời chi tiết song ngữ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// FAQPage structured data ported from faq.html's <script type="application/ld+json">.
// Strips HTML tags from answers since JSON-LD "text" fields must be plain text.
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a.replace(/<[^>]+>/g, ""),
    },
  })),
};

export default function FaqPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <script
        type="application/ld+json"
        // Source: FAQ_JSON_LD built from hand-authored faq-data.ts, no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          ❓ Câu Hỏi Thường Gặp — EB-3 Other Workers
        </h1>
        <p className="mt-2 text-text-muted">
          {FAQS.length} câu hỏi phổ biến nhất — song ngữ Việt
        </p>

        <FaqContent />

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          <b className="text-text">Lưu ý:</b> Các câu trả lời mang tính tham
          khảo, tổng hợp từ tài liệu EB-3 và các nguồn cộng đồng. Không thay
          thế tư vấn pháp lý di trú chuyên nghiệp.
        </div>
      </div>
    </Layout>
  );
}
