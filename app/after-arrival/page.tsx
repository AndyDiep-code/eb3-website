import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { AfterArrivalContent } from "./after-arrival-content";

export const metadata: Metadata = {
  title: "Hướng Dẫn Sau Khi Đến Mỹ — EB3 | EB3VIET",
  description:
    "Checklist chi tiết việc cần làm sau khi đến Mỹ theo diện EB-3: Tuần 1, Tháng 1, Tháng 3. SSN, ngân hàng, bằng lái, nhà ở, bảo hiểm.",
  alternates: {
    canonical: "https://eb3viet.com/after-arrival",
  },
  openGraph: {
    title: "Hướng Dẫn Sau Khi Đến Mỹ — Checklist EB-3 | EB3VIET",
    description:
      "26 việc cần làm sau khi đến Mỹ: SSN, ngân hàng, SIM, bằng lái, bảo hiểm, xây dựng tín dụng.",
    url: "https://eb3viet.com/after-arrival",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-after-arrival.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hướng Dẫn Sau Khi Đến Mỹ — Checklist EB-3 | EB3VIET",
    description:
      "26 việc cần làm sau khi đến Mỹ: SSN, ngân hàng, SIM, bằng lái, bảo hiểm, xây dựng tín dụng.",
    images: ["https://eb3viet.com/og-after-arrival.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AfterArrivalPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          ✈️ Sau Khi Đến Mỹ — Cần Làm Gì?
        </h1>
        <p className="mt-2 text-text-muted">
          Checklist chi tiết từng tuần · Ưu tiên đúng thứ tự · Lưu tiến độ
          tự động
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-lg">💡</span>
          <div>
            <strong>Cách dùng:</strong> Click vào từng việc để đánh dấu
            hoàn thành. Tiến độ được lưu trên trình duyệt của bạn. Làm
            theo đúng thứ tự — một số việc phụ thuộc vào việc trước (ví
            dụ: cần SSN trước khi mở bank).
          </div>
        </div>

        <div className="mt-4">
          <AfterArrivalContent />
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3.5">
          <h3 className="mb-1.5 text-sm font-bold text-text">
            📚 Nguồn tham khảo chính thức
          </h3>
          <p className="text-xs leading-relaxed text-text-muted">
            <a
              href="https://www.uscis.gov/sites/default/files/document/guides/M-618.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              USCIS — Welcome to the United States
            </a>
            : hướng dẫn chính thức cho thường trú nhân mới, gồm các bước
            đăng ký SSN, mở tài khoản ngân hàng, và quyền/nghĩa vụ cơ bản.
            <br />
            <a
              href="https://www.ssa.gov/number-card"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Social Security Administration — Số SSN
            </a>
            : cách đăng ký Social Security Number, giấy tờ cần thiết, và
            tra cứu văn phòng SSA gần nhất.
          </p>
        </div>
      </div>
    </Layout>
  );
}
