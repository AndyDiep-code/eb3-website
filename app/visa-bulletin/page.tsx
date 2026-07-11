import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { VisaBulletinDashboard } from "./visa-bulletin-dashboard";
import { HistoricalFyTables } from "./historical-fy-tables";
import { BacklogStats } from "./backlog-stats";
import { VbEmailSubscribe } from "../components/vb-email-subscribe";

export const metadata: Metadata = {
  title: "Visa Bulletin EB-3 EW (ROW) | EB3VIET",
  description:
    "Theo dõi Visa Bulletin Bảng A và Bảng B cho EB-3 Other Workers (ROW). Dữ liệu FY2021–nay, thống kê visa EW Việt Nam hàng tháng.",
  alternates: {
    canonical: "https://eb3viet.com/visa-bulletin",
  },
  openGraph: {
    title: "Visa Bulletin EB-3 Việt Nam — Cập Nhật Hàng Tháng | EB3VIET",
    description:
      "Theo dõi Priority Date Table A/B, biểu đồ tiến độ FY2021-nay, so sánh tốc độ cắt ngày.",
    url: "https://eb3viet.com/visa-bulletin",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-visa-bulletin.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Bulletin EB-3 Việt Nam — Cập Nhật Hàng Tháng | EB3VIET",
    description:
      "Theo dõi Priority Date Table A/B, biểu đồ tiến độ FY2021-nay, so sánh tốc độ cắt ngày.",
    images: ["https://eb3viet.com/og-visa-bulletin.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisaBulletinPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          📅 Visa Bulletin — EB-3 Other Workers (ROW)
        </h1>
        <p className="mt-2 text-text-muted">
          Bảng A · Bảng B · Thống kê EW Việt Nam · FY2021–nay
        </p>

        <div className="mt-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm text-text">
          <p>
            ⚠️ <b>Cách đọc:</b> Current = không giới hạn ngày Priority Date ·
            Màu xanh trên biểu đồ = tăng (tốt) · Màu đỏ = retrogress (xấu) ·
            "—" = chưa có dữ liệu DOS công bố.
          </p>
        </div>

        <div className="mt-6">
          <VisaBulletinDashboard />
        </div>

        <HistoricalFyTables />

        <BacklogStats />

        <section className="mt-6 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-text">
            ⚠️ Retrogression Là Gì? Có Lùi Lại Nữa Không?
          </h2>
          <div className="mt-3 space-y-3 text-sm text-text-muted">
            <p>
              <b className="text-text">Retrogression</b> là khi ngày cutoff
              (Final Action Date của Bảng A, hoặc Dates for Filing của Bảng
              B) trong Visa Bulletin tháng sau{" "}
              <b className="text-secondary">lùi lại</b> so với tháng trước —
              hoặc lùi từ trạng thái &quot;Current&quot; về một ngày cụ thể.
            </p>
            <p>
              Bộ Ngoại Giao Mỹ (DOS) phải kiểm soát tổng số visa cấp ra mỗi
              năm tài chính (FY, tính từ Oct → Sep) sao cho không vượt hạn
              ngạch theo category và quốc gia. Nếu một giai đoạn có quá
              nhiều hồ sơ đủ điều kiện cùng lúc, DOS sẽ lùi ngày cutoff ở các
              tháng sau để tránh dùng hết hạn ngạch trước khi năm tài chính
              kết thúc.
            </p>
            <p>
              Lịch sử cho thấy retrogression đã từng xảy ra nhiều lần — xem
              phần &quot;Lịch Sử Visa Bulletin&quot; ở trên (FY2022, FY2023,
              FY2024 đều có ghi chú retrogress cụ thể).
            </p>
            <p>
              <b className="text-text">Bạn nên làm gì:</b> theo dõi biểu đồ
              di chuyển Priority Date ở trên mỗi tháng, đừng hoảng loạn vì
              một tháng bị lùi — hãy nhìn xu hướng nhiều tháng. Nếu hồ sơ
              của bạn đã ở bước I-485/NVC khi PD đủ điều kiện và bulletin
              sau đó retrogress, hãy hỏi agency hoặc luật sư của bạn về
              &quot;Priority Date retention&quot;.
            </p>
          </div>
        </section>

        <div className="mt-6">
          <VbEmailSubscribe />
        </div>

        <section className="mt-6 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-text">Kiểm Tra Trực Tiếp</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-btn border border-border px-3 py-1.5 text-xs text-primary hover:border-primary"
            >
              📅 Visa Bulletin DOS
            </a>
            <a
              href="https://travel.state.gov/content/travel/en/legal/visa-law0/visa-statistics/immigrant-visa-statistics/monthly-immigrant-visa-issuances.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-btn border border-border px-3 py-1.5 text-xs text-primary hover:border-primary"
            >
              📊 Visa Issuance Statistics
            </a>
            <a
              href="https://flag.dol.gov/processingtimes"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-btn border border-border px-3 py-1.5 text-xs text-primary hover:border-primary"
            >
              ⏱ DOL Processing Times
            </a>
            <a
              href="https://permtimeline.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-btn border border-border px-3 py-1.5 text-xs text-primary hover:border-primary"
            >
              📈 PERM Timeline
            </a>
            <a
              href="https://egov.uscis.gov/processing-times/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-btn border border-border px-3 py-1.5 text-xs text-primary hover:border-primary"
            >
              🕒 USCIS Processing Times
            </a>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Nguồn: travel.state.gov — Visa Bulletin monthly issues + DOS
            Monthly IV Issuance Reports. Dữ liệu Bảng A/B và visa EW Việt
            Nam (năm tài chính hiện tại) cập nhật tự động hàng ngày từ
            travel.state.gov. Dữ liệu các năm trước cố định. Luôn kiểm tra
            tại nguồn chính thức trước khi ra quyết định.
          </p>
        </section>
      </div>
    </Layout>
  );
}
