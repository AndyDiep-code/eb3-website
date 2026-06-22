import type { SidebarGroup } from "./sidebar";

/**
 * Sidebar IA — 7 groups, 38 links total, ported from index.html's old
 * 6-group structure (index.html:144-232) per phase-02's relabel table.
 * Hrefs are unchanged (same 38 targets), only group labels/order/grouping
 * changed. Mixed-URL-state: all hrefs extensionless (e.g. "/visa-bulletin"),
 * relying on the same Cloudflare static-assets `auto-trailing-slash`
 * html_handling that serves `visa-bulletin.html` at that clean path today
 * (verified locally via `opennextjs-cloudflare preview` + curl, see phase-02
 * implementation report — required adding a `public/` mirror of the 57
 * non-index .html files so OpenNext's build bundles them; js/visa-bulletin-
 * data.js and data/visa-bulletin.json deliberately excluded, Phase 4
 * territory).
 */
export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: "Hành Trình EB-3 Của Bạn",
    links: [
      { label: "Visa Bulletin", href: "/visa-bulletin" },
      { label: "Theo Dõi PERM", href: "/perm-tracker" },
      { label: "Tin Tức Chính Sách", href: "/news" },
      { label: "Hướng Dẫn EB-3", href: "/guides" },
      { label: "Ngành Nghề & Hãng", href: "/jobs" },
      { label: "FAQ", href: "/faq" },
      { label: "Thuật Ngữ", href: "/glossary" },
      { label: "Xử Lý Sự Cố", href: "/case-studies" },
    ],
  },
  {
    label: "Chuẩn Bị Hồ Sơ & Phỏng Vấn",
    links: [
      { label: "Chọn Agency", href: "/agency-guide" },
      { label: "Theo Dõi Hồ Sơ", href: "/tracker" },
      { label: "Ôn Phỏng Vấn", href: "/interview" },
      { label: "Tiếng Anh CV", href: "/english-work" },
      { label: "Phỏng Vấn AOS & I-693", href: "/aos-interview-guide" },
      { label: "Checklist Hồ Sơ", href: "/documents" },
      { label: "Chi Phí Sinh Hoạt", href: "/cost-calculator" },
    ],
  },
  {
    label: "Mới Đến Mỹ",
    links: [
      { label: "Sau Khi Đến Mỹ", href: "/after-arrival" },
      { label: "Dịch Vụ Thiết Yếu", href: "/essentials" },
      { label: "Ôn Thi Bằng Lái", href: "/dmv" },
      { label: "So Sánh Bang", href: "/compare" },
      { label: "Cảnh Báo Lừa Đảo", href: "/scam-warning" },
      { label: "Khẩn Cấp", href: "/emergency-guide" },
      { label: "Thuê Nhà", href: "/housing-rights" },
      { label: "Đăng Ký Trường Học", href: "/school-enrollment-guide" },
      { label: "Y Tế & Bảo Hiểm", href: "/healthcare" },
      { label: "ACA & Medicaid", href: "/aca-medicaid-guide" },
    ],
  },
  {
    label: "Tiền & Quyền Lợi",
    links: [
      { label: "Tài Chính", href: "/finance" },
      { label: "Tính Lương Net", href: "/net-pay" },
      { label: "Khai Thuế", href: "/tax-guide" },
      { label: "Xây Dựng Tín Dụng", href: "/credit-building" },
      { label: "Gửi Tiền Về VN", href: "/remittance-guide" },
      { label: "Quyền Lao Động", href: "/worker-rights" },
      { label: "Lộ Trình Tài Chính", href: "/finance-roadmap" },
    ],
  },
  {
    label: "Sau Khi Có Thẻ Xanh",
    links: [
      { label: "Quyền Thẻ Xanh", href: "/green-card-life" },
      { label: "Con Đường Quốc Tịch", href: "/citizenship-path" },
      { label: "Bảo Lãnh Gia Đình", href: "/family-petition" },
      { label: "Đổi Việc AC21", href: "/ac21-portability" },
    ],
  },
  {
    label: "Khác",
    links: [
      { label: "Văn Hóa Mỹ", href: "/Van_Hoa_My_Danh_Cho_Huy" },
      { label: "Giới Thiệu", href: "/about" },
      { label: "Chính Sách Bảo Mật", href: "/privacy" },
    ],
  },
];
