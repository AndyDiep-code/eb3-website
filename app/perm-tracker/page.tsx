import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import permProcessingTimes from "../../data/perm-processing-times.json";

export const metadata: Metadata = {
  title: "Theo Dõi PERM — EB3 Vietnam",
  description:
    "Xem tình trạng xử lý PERM hiện tại của DOL (theo tháng nộp hồ sơ) và tra cứu trạng thái hồ sơ PERM của bạn trực tiếp trên trang DOL.",
  alternates: {
    canonical: "https://eb3viet.com/perm-tracker",
  },
  openGraph: {
    title: "Theo Dõi PERM — EB3 Vietnam",
    description:
      "Xem tình trạng xử lý PERM hiện tại của DOL và tra cứu trạng thái hồ sơ PERM của bạn.",
    url: "https://eb3viet.com/perm-tracker",
    siteName: "EB3 Vietnam",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theo Dõi PERM — EB3 Vietnam",
    description:
      "Xem tình trạng xử lý PERM hiện tại của DOL và tra cứu trạng thái hồ sơ PERM của bạn.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PermProcessingTimes {
  source_as_of: string | null;
  queue: {
    analyst_review: string | null;
    audit_review: string | null;
    reconsideration_review: string | null;
  };
  average_days: {
    analyst_review: { month: string | null; days: number | null } | null;
    audit_review: { month: string | null; days: number | null } | null;
  };
  updated: string;
}

const QUEUE_ROWS: Array<{ key: keyof PermProcessingTimes["queue"]; label: string }> = [
  { key: "analyst_review", label: "Analyst Review (xét hồ sơ thường)" },
  { key: "audit_review", label: "Audit Review (hồ sơ bị audit)" },
  { key: "reconsideration_review", label: "Reconsideration Review (khiếu nại)" },
];

function formatUpdatedTimestamp(isoTimestamp: string): string {
  try {
    return new Date(isoTimestamp).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return isoTimestamp;
  }
}

export default function PermTrackerPage() {
  // data/perm-processing-times.json is committed and refreshed monthly by
  // .github/workflows/fetch-perm-processing-times.yml — if the fetch ever
  // fails, the workflow leaves the file untouched, so this import always
  // has last-known-good data (fail-safe: never a blank/broken page).
  const data = permProcessingTimes as PermProcessingTimes;

  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">📊 Theo Dõi PERM</h1>

        {/* Disclaimer — must be visible without scrolling, placed immediately
            under the title, before any data. */}
        <div className="mt-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm text-text">
          <p>
            ⚠️ <b>Chỉ mang tính tham khảo, không phải tư vấn pháp lý.</b> Dữ
            liệu lấy từ DOL (flag.dol.gov), không đảm bảo chính xác 100% và
            không thay thế ý kiến của luật sư di trú có giấy phép cho trường
            hợp cụ thể của bạn.
          </p>
        </div>

        <p className="mt-4 text-text-muted">
          PERM (Program Electronic Review Management) là bước Bộ Lao Động Mỹ
          (DOL) xét đơn xin giấy phép lao động (Labor Certification) cho công
          ty bảo lãnh bạn. Hồ sơ được xét theo{" "}
          <b>tháng nộp đơn (filing date)</b>, xếp hàng theo thứ tự thời gian.
        </p>
        <p className="mt-2 text-text-muted">
          Chúng tôi không thể dự đoán chính xác hồ sơ của bạn vì dữ liệu công
          khai của DOL không đủ chi tiết (không có thông tin theo từng hồ sơ
          hoặc theo tên công ty). Bảng dưới đây chỉ là{" "}
          <b>số liệu tổng hợp</b> DOL công bố công khai.

        </p>

        <section className="mt-6 rounded-card border border-border bg-bg p-4">
          <h2 className="text-lg font-semibold text-text">
            🗓 Tình Trạng Xử Lý PERM Hiện Tại
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            DOL hiện đang xét các hồ sơ nộp vào (theo loại xét duyệt):
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Loại xét duyệt</th>
                  <th className="py-2 font-medium">Đang xét hồ sơ nộp tháng</th>
                </tr>
              </thead>
              <tbody>
                {QUEUE_ROWS.map((row) => (
                  <tr key={row.key} className="border-b border-border last:border-0">
                    <td className="py-2 pr-3 text-text">{row.label}</td>
                    <td className="py-2 font-semibold text-text">
                      {data.queue[row.key] ?? "Chưa có dữ liệu"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-4 text-sm font-semibold text-text">
            ⏱ Thời Gian Xử Lý Trung Bình (tháng gần nhất)
          </h3>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(["analyst_review", "audit_review"] as const).map((key) => {
              const entry = data.average_days[key];
              return (
                <div key={key} className="rounded-btn border border-border p-3 text-sm">
                  <div className="text-text-muted">
                    {key === "analyst_review" ? "Analyst Review" : "Audit Review"}
                  </div>
                  <div className="font-semibold text-text">
                    {entry?.days != null
                      ? `${entry.days} ngày (${entry.month})`
                      : "Chưa có dữ liệu"}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-text-muted">
            Nguồn: DOL flag.dol.gov/processingtimes
            {data.source_as_of ? ` (cập nhật phía DOL: ${data.source_as_of})` : ""}.
            Dữ liệu trang này cập nhật lần cuối: {formatUpdatedTimestamp(data.updated)}.
          </p>
        </section>

        <section className="mt-6 rounded-card border border-border bg-bg p-4">
          <h2 className="text-lg font-semibold text-text">
            🔍 Tra Cứu Trạng Thái Hồ Sơ Của Bạn
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            DOL có công cụ tra cứu trạng thái từng hồ sơ theo Case Number
            (định dạng <code>G-100-YY-XXXXX-XXXXXX</code>). Công cụ này yêu
            cầu xác minh trực tiếp trên trang DOL (reCAPTCHA), nên chúng tôi
            không thể tự động tra cứu thay bạn — bấm vào nút dưới đây để tra
            cứu trực tiếp trên trang chính thức của DOL:
          </p>
          <a
            href="https://flag.dol.gov/case-status-search"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          >
            🔍 Tra Cứu Trên DOL (flag.dol.gov) →
          </a>
          <p className="mt-3 text-xs text-text-muted">
            Lưu ý: kết quả chỉ hiện khi hồ sơ đã có quyết định (Certified,
            Denied, Withdrawn, Certified Expired) — nếu hồ sơ còn đang xử lý,
            DOL không hiện vị trí xếp hàng (queue position) cho ai ngoài công
            ty/luật sư bảo lãnh bạn.
          </p>
        </section>

        <section className="mt-6 rounded-card border border-border bg-bg p-4">
          <h2 className="text-lg font-semibold text-text">📌 Sắp Có (Chưa Triển Khai)</h2>
          <p className="mt-2 text-sm text-text-muted">
            Tính năng <b>nhắc qua email/SMS khi hồ sơ đổi trạng thái</b> chưa
            được xây dựng trong phiên bản này — tính năng này cần thu thập
            email (dữ liệu cá nhân) và quy trình đồng ý/hủy đăng ký riêng,
            đang chờ quyết định phạm vi ở một giai đoạn sau. Trang này hiện
            tại <b>không thu thập email, số điện thoại, hay bất kỳ thông tin
            cá nhân nào</b>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
