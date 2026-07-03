import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { EmergencyTabs } from "./emergency-tabs";

export const metadata: Metadata = {
  title: "Hướng Dẫn Khẩn Cấp: Cảnh Sát, Bệnh Viện, 911 | EB3VIET",
  description:
    "Hướng dẫn thực tế cho công nhân EB-3: cách xử lý khi bị cảnh sát dừng xe, cách vào bệnh viện cấp cứu, và cách gọi 911 bằng tiếng Anh.",
  alternates: {
    canonical: "https://eb3viet.com/emergency-guide",
  },
  openGraph: {
    title: "Hướng Dẫn Khẩn Cấp: Cảnh Sát, Bệnh Viện, 911 | EB3VIET",
    description:
      "Hướng dẫn thực tế cho công nhân EB-3: cách xử lý khi bị cảnh sát dừng xe, cách vào bệnh viện cấp cứu, và cách gọi 911 bằng tiếng Anh.",
    url: "https://eb3viet.com/emergency-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hướng Dẫn Khẩn Cấp: Cảnh Sát, Bệnh Viện, 911 | EB3VIET",
    description:
      "Hướng dẫn thực tế cho công nhân EB-3: cách xử lý khi bị cảnh sát dừng xe, cách vào bệnh viện cấp cứu, và cách gọi 911 bằng tiếng Anh.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EmergencyGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">🆘 Hướng Dẫn Khẩn Cấp</h1>
        <p className="mt-2 text-text-muted">
          Cảnh sát · Bệnh viện · Gọi 911 · Script tiếng Anh sẵn sàng dùng
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-orange-600/40 bg-orange-600/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-lg">⚠️</span>
          <div>
            Trang này cung cấp thông tin thực tế, không thay thế tư vấn pháp
            lý. Trong tình huống nguy hiểm đến tính mạng, luôn gọi{" "}
            <strong>911</strong> trước.
          </div>
        </div>

        <div className="mt-6">
          <EmergencyTabs />
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 border-t border-border pt-4 text-xs text-text-muted">
          <a href="/" className="hover:text-text">
            🏠 Trang Chủ
          </a>
          <a href="/worker-rights" className="hover:text-text">
            🛡️ Quyền Lao Động
          </a>
        </div>
      </div>
    </Layout>
  );
}
