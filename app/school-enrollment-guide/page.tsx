import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";
import { SchoolTabs } from "./school-tabs";

export const metadata: Metadata = {
  title: "Đăng Ký Trường Học Cho Con | EB3VIET",
  description:
    "Hướng dẫn đăng ký trường học cho con sau khi định cư Mỹ: giấy tờ cần chuẩn bị, tuổi nhập học theo lớp, hỗ trợ ESL/ELL, và cách chuyển hồ sơ học tập từ Việt Nam.",
  alternates: {
    canonical: "https://eb3viet.com/school-enrollment-guide",
  },
  openGraph: {
    title: "Đăng Ký Trường Học Cho Con | EB3VIET",
    description:
      "Giấy tờ cần chuẩn bị, độ tuổi nhập học theo lớp, hỗ trợ học tiếng Anh (ESL/ELL) miễn phí, và cách chuyển học bạ từ Việt Nam sang trường Mỹ.",
    url: "https://eb3viet.com/school-enrollment-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đăng Ký Trường Học Cho Con | EB3VIET",
    description:
      "Giấy tờ cần chuẩn bị, độ tuổi nhập học theo lớp, hỗ trợ học tiếng Anh (ESL/ELL) miễn phí, và cách chuyển học bạ từ Việt Nam sang trường Mỹ.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SchoolEnrollmentGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-text">
          🎒 Đăng Ký Trường Học Cho Con
        </h1>
        <p className="mt-2 text-text-muted">
          Giấy tờ cần chuẩn bị · Tuổi nhập học theo lớp · Hỗ trợ ESL/ELL ·
          Chuyển hồ sơ từ Việt Nam
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-lg">✅</span>
          <div>
            <strong>
              Trẻ em ở Mỹ có quyền đi học công lập miễn phí (K-12)
            </strong>{" "}
            bất kể tình trạng di trú của cha mẹ. Trường công lập KHÔNG được
            yêu cầu giấy tờ chứng minh tình trạng di trú để đăng ký nhập học
            (theo phán quyết <em>Plyler v. Doe</em>, Tòa Án Tối Cao Mỹ 1982).
          </div>
        </div>

        <div className="mt-6">
          <SchoolTabs />
        </div>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          <b className="text-text">Lưu ý:</b> Thông tin trên mang tính tham
          khảo tổng quát (cập nhật 6/2026). Quy định tuyển sinh, ngày cắt
          tuổi, danh sách vắc-xin bắt buộc, và chương trình ESL khác nhau
          theo từng tiểu bang và học khu. Luôn liên hệ trực tiếp văn phòng
          tuyển sinh (enrollment office) của trường/học khu nơi bạn sinh
          sống. Nguồn: U.S. Department of Education (ed.gov), Colorín
          Colorado, và website Sở Giáo Dục tiểu bang.
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h3 className="mb-1.5 text-sm font-bold text-text">
            📚 Nguồn tham khảo chính thức
          </h3>
          <p className="text-sm leading-relaxed text-text-muted">
            <a
              href="https://www.ed.gov/"
              target="_blank"
              rel="noopener"
              className="text-primary"
            >
              U.S. Department of Education (ed.gov)
            </a>{" "}
            — trang chính thức của Bộ Giáo Dục Hoa Kỳ.
            <br />
            <a
              href="https://www.ed.gov/sites/ed/files/about/overview/focus/supporting-undocumented-youth.pdf"
              target="_blank"
              rel="noopener"
              className="text-primary"
            >
              Hướng dẫn hỗ trợ học sinh nhập cư (Supporting Undocumented
              Youth)
            </a>{" "}
            — tài liệu hướng dẫn về quyền nhập học của trẻ em, bất kể tình
            trạng di trú (theo Plyler v. Doe).
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/family-petition" className="text-primary hover:underline">
            👨‍👩‍👧 Bảo Lãnh Gia Đình
          </a>
        </div>
      </div>
    </Layout>
  );
}
