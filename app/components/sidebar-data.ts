import type { SidebarGroup } from "./sidebar";

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: "Tổng Quan",
    links: [
      { label: "Trang Chủ", href: "/" },
      { label: "Bắt Đầu Từ Đây", href: "/start" },
      { label: "So Sánh Bang & Ngành", href: "/compare" },
      { label: "Giới Thiệu EB3VIET", href: "/about" },
    ],
  },
  {
    label: "Quy Trình EB-3",
    links: [
      { label: "Hướng Dẫn 5 Bước", href: "/guides" },
      { label: "Ngành Nghề & Hãng", href: "/jobs" },
      { label: "Chọn Agency", href: "/agency-guide" },
      { label: "Tiếng Anh & CV", href: "/english-work" },
      { label: "Checklist Hồ Sơ", href: "/documents" },
      { label: "Hướng Dẫn DS-260", href: "/ds260-guide" },
      { label: "Chuẩn Bị Trước Khi Bay", href: "/pre-departure-guide" },
      { label: "Ôn Phỏng Vấn", href: "/interview" },
      { label: "Phỏng Vấn AOS & I-693", href: "/aos-interview-guide" },
      { label: "Đổi Việc AC21", href: "/ac21-portability" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    label: "Theo Dõi & Tin Tức",
    links: [
      { label: "Visa Bulletin", href: "/visa-bulletin" },
      { label: "Cách Đọc Visa Bulletin", href: "/visa-bulletin-guide" },
      { label: "PERM Tracker", href: "/perm-tracker" },
      { label: "Theo Dõi I-485", href: "/tracker" },
      { label: "Tin Tức Chính Sách", href: "/news" },
      { label: "Timeline Ước Tính", href: "/timeline-estimator" },
      { label: "FAQ", href: "/faq" },
      { label: "Thuật Ngữ", href: "/glossary" },
    ],
  },
  {
    label: "Mới Đến Mỹ",
    links: [
      { label: "Sau Khi Đến Mỹ", href: "/after-arrival" },
      { label: "Đăng Ký SSN", href: "/ssn-guide" },
      { label: "Dịch Vụ Thiết Yếu", href: "/essentials" },
      { label: "Thuê Nhà & Quyền", href: "/housing-rights" },
      { label: "Y Tế & Bảo Hiểm", href: "/healthcare" },
      { label: "ACA & Medicaid", href: "/aca-medicaid-guide" },
      { label: "Medicaid Theo Tiểu Bang", href: "/state-medicaid-guide" },
      { label: "Trường Học", href: "/school-enrollment-guide" },
      { label: "Khẩn Cấp", href: "/emergency-guide" },
      { label: "Cảnh Báo Lừa Đảo", href: "/scam-warning" },
      { label: "Mở Tài Khoản Ngân Hàng", href: "/banking-guide" },
      { label: "Cộng Đồng & Tâm Lý", href: "/community-guide" },
    ],
  },
  {
    label: "Tài Chính",
    links: [
      { label: "Tổng Quan Tài Chính", href: "/finance" },
      { label: "Lộ Trình Tài Chính", href: "/finance-roadmap" },
      { label: "Tính Lương Net", href: "/net-pay" },
      { label: "Khai Thuế", href: "/tax-guide" },
      { label: "Thuế Năm Đầu (Dual-Status)", href: "/tax-first-year" },
      { label: "Gửi Tiền Về VN", href: "/remittance-guide" },
      { label: "Xây Dựng Credit", href: "/credit-building" },
      { label: "Chi Phí Sinh Hoạt", href: "/cost-calculator" },
      { label: "Bảng Lương Theo Ngành", href: "/salary-guide" },
      { label: "Tính Tiết Kiệm", href: "/savings-projector" },
      { label: "Quyền Lao Động", href: "/worker-rights" },
      { label: "Phát Triển Nghề Nghiệp", href: "/career-guide" },
    ],
  },
  {
    label: "Thẻ Xanh & Quốc Tịch",
    links: [
      { label: "Cuộc Sống Thẻ Xanh", href: "/green-card-life" },
      { label: "Du Lịch — I-131 AP", href: "/advance-parole" },
      { label: "Gia Hạn EAD & Thẻ Xanh", href: "/renewal-guide" },
      { label: "Bảo Lãnh Gia Đình", href: "/family-petition" },
      { label: "Con Đường Nhập Tịch", href: "/citizenship-path" },
      { label: "Văn Hóa Mỹ", href: "/van-hoa-my" },
    ],
  },
  {
    label: "Bằng Lái Xe",
    links: [
      { label: "Ôn Thi Bằng Lái (19 Bang)", href: "/dmv" },
    ],
  },
];
