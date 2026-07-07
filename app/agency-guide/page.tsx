import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { AgencyScoreWidget } from "./agency-score-widget";
import {
  GOOD_AGENCY_CHECKLIST,
  RED_FLAG_CHECKLIST,
  QUESTIONS_TO_ASK,
} from "./agency-guide-data";

export const metadata: Metadata = {
  title: "Hướng Dẫn Chọn Agency EB-3 | EB3VIET",
  description:
    "Hướng dẫn đánh giá và chọn agency EB-3 uy tín. Tiêu chí kỹ thuật, dấu hiệu cảnh báo, câu hỏi cần hỏi trước khi ký hợp đồng.",
  alternates: {
    canonical: "https://eb3viet.com/agency-guide",
  },
  openGraph: {
    title: "Hướng Dẫn Chọn Agency EB-3 | EB3VIET",
    description:
      "Hướng dẫn đánh giá và chọn agency EB-3 uy tín. Tiêu chí kỹ thuật, dấu hiệu cảnh báo, câu hỏi cần hỏi trước khi ký hợp đồng.",
    url: "https://eb3viet.com/agency-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hướng Dẫn Chọn Agency EB-3 | EB3VIET",
    description:
      "Hướng dẫn đánh giá và chọn agency EB-3 uy tín. Tiêu chí kỹ thuật, dấu hiệu cảnh báo, câu hỏi cần hỏi trước khi ký hợp đồng.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AgencyGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          🏢 Hướng Dẫn Chọn Agency EB-3
        </h1>
        <p className="mt-2 text-text-muted">
          Tiêu chí đánh giá · Dấu hiệu cảnh báo · 15 câu hỏi cần hỏi trước khi
          ký
        </p>

        <div className="mt-3 flex gap-2 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-base">🚩</span>
          <div>
            Agency yêu cầu phí &quot;đảm bảo việc làm&quot; cao bất thường
            hoặc trả trước toàn bộ? Xem{" "}
            <a href="/scam-warning" className="text-primary">
              Cảnh Báo Lừa Đảo
            </a>{" "}
            để nhận biết dấu hiệu agency lừa đảo.
          </div>
        </div>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">
            ℹ️ Agency EB-3 là gì? Vai trò của họ?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Agency là công ty trung gian kết nối đương đơn Việt Nam với{" "}
            <b className="text-text">nhà tuyển dụng Mỹ (Sponsor)</b>. Họ hỗ
            trợ làm giấy tờ, hướng dẫn quy trình và phối hợp với luật sư di
            trú. <b className="text-text">Không có agency nào tự mình cấp visa</b>{" "}
            — tất cả do chính phủ Mỹ quyết định.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Agency làm gì?</th>
                  <th className="py-2 pr-3 font-medium">
                    Agency KHÔNG làm được?
                  </th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3">Kết nối với sponsor Mỹ</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Đảm bảo 100% được cấp visa
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3">Hỗ trợ hồ sơ, giấy tờ</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Can thiệp vào quyết định của USCIS/DOL/DOS
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3">Phối hợp với luật sư di trú</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Làm nhanh hơn thời gian Visa Bulletin
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3">
                    Hướng dẫn từng bước quy trình
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Bảo đảm phỏng vấn đậu 100%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-accent">
            ✅ Tiêu Chí Agency Tốt — Nhìn Thấy Được
          </h2>
          <ul className="mt-3 flex flex-col divide-y divide-border text-sm">
            {GOOD_AGENCY_CHECKLIST.map((item, index) => (
              <li
                key={index}
                className="flex gap-2.5 py-2 leading-relaxed first:pt-0 last:pb-0 text-text-muted [&_b]:text-text"
              >
                <span className="flex-shrink-0">✅</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">
            🚨 Dấu Hiệu Cảnh Báo — Nên Tránh
          </h2>
          <ul className="mt-3 flex flex-col divide-y divide-border text-sm">
            {RED_FLAG_CHECKLIST.map((item, index) => (
              <li
                key={index}
                className="flex gap-2.5 py-2 leading-relaxed first:pt-0 last:pb-0 text-text-muted [&_b]:text-text"
              >
                <span className="flex-shrink-0">❌</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-secondary">
            ❓ 15 Câu Hỏi Cần Hỏi Trước Khi Ký
          </h2>
          <div className="mt-3 grid gap-2">
            {QUESTIONS_TO_ASK.map((question) => (
              <div
                key={question.text}
                className="rounded-card border border-border bg-bg-alt p-3"
              >
                <div className="text-sm font-semibold text-text">
                  {question.text}
                </div>
                <div className="mt-0.5 text-xs text-text-muted">
                  {question.why}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">
            📊 Bảng Tự Đánh Giá Agency (Thang điểm 1-5)
          </h2>
          <div className="mt-3">
            <AgencyScoreWidget />
          </div>
        </section>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          ⚠️ Trang này cung cấp tiêu chí đánh giá chung. Không liệt kê hay
          đánh giá cụ thể bất kỳ agency nào. Người dùng chịu trách nhiệm tự
          xác minh thông tin và ra quyết định. Tham khảo cộng đồng EB-3 Việt
          Nam và luật sư di trú trước khi ký hợp đồng.
        </div>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h3 className="text-sm font-semibold text-text">
            📚 Nguồn tham khảo chính thức
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            <a
              href="https://flag.dol.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              DOL FLAG System
            </a>
            : tra cứu hồ sơ PERM/Labor Certification do agency hoặc employer
            nộp — kiểm tra xem hồ sơ của bạn có thật và đang được xử lý đúng
            quy trình.
            <br />
            <a
              href="https://www.uscis.gov/avoid-scams"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              USCIS — Avoid Scams
            </a>
            : hướng dẫn nhận diện lừa đảo di trú phổ biến và cách báo cáo
            agency/luật sư vi phạm.
          </p>
        </section>
      </div>
    </Layout>
  );
}
