import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { InterviewContent } from "./interview-content";

export const metadata: Metadata = {
  title: "Ôn Phỏng Vấn Lãnh Sự Quán EB-3 | EB3VIET",
  description:
    "Luyện tập 50 câu hỏi phỏng vấn lãnh sự quán EB-3 thường gặp nhất. Song ngữ Việt-Anh, đánh giá câu trả lời, hướng dẫn cách trả lời đúng.",
  alternates: {
    canonical: "https://eb3viet.com/interview",
  },
  openGraph: {
    title: "Ôn Phỏng Vấn Lãnh Sự Quán EB-3 | EB3VIET",
    description:
      "Luyện tập 50 câu hỏi phỏng vấn lãnh sự quán EB-3 thường gặp nhất. Song ngữ Việt-Anh, đánh giá câu trả lời, hướng dẫn cách trả lời đúng.",
    url: "https://eb3viet.com/interview",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ôn Phỏng Vấn Lãnh Sự Quán EB-3 | EB3VIET",
    description:
      "Luyện tập 50 câu hỏi phỏng vấn lãnh sự quán EB-3 thường gặp nhất. Song ngữ Việt-Anh, đánh giá câu trả lời, hướng dẫn cách trả lời đúng.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function InterviewPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">
          🎤 Ôn Phỏng Vấn Lãnh Sự Quán EB-3
        </h1>
        <p className="mt-2 text-text-muted">
          50 câu hỏi thường gặp nhất · Song ngữ Việt–Anh · Câu trả lời mẫu +
          mẹo quan trọng
        </p>

        <div className="mt-3 flex gap-2 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-base">🔗</span>
          <div>
            <b>Hướng dẫn liên quan:</b> <b>Ôn Phỏng Vấn LSQ</b> ·{" "}
            <a href="/english-work" className="text-primary">
              Tiếng Anh Công Việc
            </a>{" "}
            ·{" "}
            <a href="/case-studies" className="text-primary">
              Xử Lý Sự Cố (RFE/221g)
            </a>
          </div>
        </div>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-secondary">
            ⭐ Nguyên tắc vàng khi phỏng vấn EB-3
          </h2>
          <ul className="mt-3 flex flex-col divide-y divide-border text-sm">
            <li className="flex gap-2 py-1.5 leading-relaxed first:pt-0 last:pb-0 text-text-muted">
              <span className="flex-shrink-0 text-secondary">›</span>
              <span>
                <b className="text-text">Thuộc lòng 3 thứ:</b> Tên đầy đủ
                công ty Mỹ, địa chỉ chính xác, công việc sẽ làm gì
              </span>
            </li>
            <li className="flex gap-2 py-1.5 leading-relaxed first:pt-0 last:pb-0 text-text-muted">
              <span className="flex-shrink-0 text-secondary">›</span>
              <span>
                <b className="text-text">Không nói dối:</b> Lãnh sự quán có
                hồ sơ của bạn — thông tin mâu thuẫn = nguy hiểm
              </span>
            </li>
            <li className="flex gap-2 py-1.5 leading-relaxed first:pt-0 last:pb-0 text-text-muted">
              <span className="flex-shrink-0 text-secondary">›</span>
              <span>
                <b className="text-text">Ngắn gọn, rõ ràng:</b> Không cần
                giải thích dài — trả lời đúng câu hỏi là đủ
              </span>
            </li>
            <li className="flex gap-2 py-1.5 leading-relaxed first:pt-0 last:pb-0 text-text-muted">
              <span className="flex-shrink-0 text-secondary">›</span>
              <span>
                <b className="text-text">Không biết thì nói:</b> &quot;I&apos;m
                not sure, I can provide the document&quot; tốt hơn đoán sai
              </span>
            </li>
            <li className="flex gap-2 py-1.5 leading-relaxed first:pt-0 last:pb-0 text-text-muted">
              <span className="flex-shrink-0 text-secondary">›</span>
              <span>
                <b className="text-text">Ôn tiếng Anh cơ bản:</b> Biết 10-20
                câu giao tiếp phỏng vấn là đủ, phiên dịch viên có thể hỗ trợ
              </span>
            </li>
            <li className="flex gap-2 py-1.5 leading-relaxed first:pt-0 last:pb-0 text-text-muted">
              <span className="flex-shrink-0 text-secondary">›</span>
              <span>
                <b className="text-text">Mang đầy đủ giấy tờ gốc + bản sao:</b>{" "}
                Hợp đồng, kết quả khám sức khỏe, hộ chiếu, LLTP
              </span>
            </li>
          </ul>
        </section>

        <div className="mt-4">
          <InterviewContent />
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          ⚠️ <b className="text-text">Lưu ý:</b> Câu trả lời mẫu chỉ mang
          tính tham khảo. Thực tế phỏng vấn phụ thuộc vào hồ sơ cụ thể và câu
          hỏi của nhân viên lãnh sự quán. Luôn tham khảo agency và luật sư
          của bạn trước khi phỏng vấn.
        </div>
      </div>
    </Layout>
  );
}
