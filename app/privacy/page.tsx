import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật | EB3VIET",
  description:
    "Chính sách bảo mật của EB3VIET — thông tin về cookie, quảng cáo và bảo vệ dữ liệu người dùng.",
  alternates: {
    canonical: "https://eb3viet.com/privacy",
  },
  openGraph: {
    title: "Chính Sách Bảo Mật | EB3VIET",
    description:
      "Chính sách bảo mật của EB3VIET — thông tin về cookie, quảng cáo và bảo vệ dữ liệu người dùng.",
    url: "https://eb3viet.com/privacy",
    siteName: "EB3VIET",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chính Sách Bảo Mật | EB3VIET",
    description:
      "Chính sách bảo mật của EB3VIET — thông tin về cookie, quảng cáo và bảo vệ dữ liệu người dùng.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">🔒 Chính Sách Bảo Mật</h1>
        <p className="mt-2 text-text-muted">Privacy Policy — EB3VIET (eb3viet.com)</p>

        <p className="mt-4 text-center text-xs text-text-muted">
          Cập nhật lần cuối: Tháng 6 năm 2026
        </p>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">1. Giới thiệu</h2>
          <p className="mt-3 text-sm text-text-muted">
            EB3VIET (<b className="text-text">eb3viet.com</b>) là website cung
            cấp thông tin tham khảo về chương trình lao động định cư Hoa Kỳ
            diện EB-3. Chúng tôi cam kết bảo vệ quyền riêng tư của người dùng.
            Trang này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ
            thông tin khi bạn sử dụng website.
          </p>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">
            2. Thông tin chúng tôi thu thập
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            Website này là trang thông tin tĩnh (static website). Chúng tôi{" "}
            <b className="text-text">không</b> thu thập thông tin cá nhân
            trực tiếp. Tuy nhiên, một số công cụ bên thứ ba có thể thu thập
            dữ liệu ẩn danh:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-text-muted">
            <li>
              <b className="text-text">Cloudflare Analytics:</b> Số lượt
              truy cập, quốc gia, loại thiết bị — ẩn danh hoàn toàn
            </li>
            <li>
              <b className="text-text">Google AdSense (nếu có):</b> Cookie
              để hiển thị quảng cáo phù hợp — xem chính sách của Google
            </li>
            <li>
              <b className="text-text">Cookies trình duyệt:</b> Lưu trữ cài
              đặt giao diện cục bộ trên máy của bạn
            </li>
          </ul>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">3. Sử dụng Cookie</h2>
          <p className="mt-3 text-sm text-text-muted">Website sử dụng cookie để:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-text-muted">
            <li>Lưu trạng thái bộ lọc, tab đang mở trong phiên truy cập</li>
            <li>Hiển thị quảng cáo phù hợp thông qua Google AdSense</li>
            <li>Phân tích lưu lượng truy cập ẩn danh qua Cloudflare</li>
          </ul>
          <p className="mt-2 text-sm text-text-muted">
            Bạn có thể tắt cookie trong cài đặt trình duyệt. Điều này có thể
            ảnh hưởng đến trải nghiệm sử dụng.
          </p>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">
            4. Quảng cáo (Google AdSense)
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            Website có thể hiển thị quảng cáo thông qua Google AdSense.
            Google sử dụng cookie để hiển thị quảng cáo dựa trên lịch sử
            duyệt web của bạn. Bạn có thể:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-text-muted">
            <li>
              Tắt quảng cáo cá nhân hóa tại:{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                google.com/settings/ads
              </a>
            </li>
            <li>
              Tìm hiểu thêm về chính sách quảng cáo của Google tại:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                policies.google.com
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">5. Bên thứ ba</h2>
          <p className="mt-3 text-sm text-text-muted">
            Website có thể chứa liên kết đến các trang chính thức của chính
            phủ Mỹ (USCIS, DOS, DOL) và các nguồn tham khảo bên ngoài. Chúng
            tôi không chịu trách nhiệm về chính sách bảo mật của các trang
            đó.
          </p>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">6. Bảo mật dữ liệu</h2>
          <p className="mt-3 text-sm text-text-muted">
            Website được phục vụ qua Cloudflare với HTTPS, đảm bảo mã hóa
            toàn bộ dữ liệu truyền tải. Chúng tôi không lưu trữ thông tin cá
            nhân trên máy chủ.
          </p>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">
            7. Tuyên bố miễn trách nhiệm
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            Nội dung trên EB3VIET chỉ mang tính tham khảo, không thay thế tư
            vấn pháp lý di trú chuyên nghiệp. Luôn kiểm tra thông tin từ
            nguồn chính thức (USCIS, DOS, DOL) và tham khảo luật sư di trú
            trước khi ra quyết định.
          </p>
        </section>

        <section className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="text-base font-semibold text-primary">8. Liên hệ</h2>
          <p className="mt-3 text-sm text-text-muted">
            Nếu có câu hỏi về chính sách bảo mật, vui lòng liên hệ qua
            website hoặc các kênh mạng xã hội của EB3VIET.
          </p>
        </section>
      </div>
    </Layout>
  );
}
