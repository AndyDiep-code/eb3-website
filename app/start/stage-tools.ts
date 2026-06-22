/**
 * Extended STAGE_TOOLS map — ported from index.html:430-455's 4-stage
 * object, extended to 6 keys per phase-02's requirements (adds "new" and
 * "green-card" stages). Each stage routes to 4 existing pages; hrefs use
 * the same mixed-URL-state extensionless convention as sidebar-data.ts.
 */

export interface StageTool {
  href: string;
  icon: string;
  title: string;
}

export interface Stage {
  key: string;
  label: string;
  tools: StageTool[];
}

export const STAGES: Stage[] = [
  {
    key: "new",
    label: "Tôi chưa biết gì về EB-3",
    tools: [
      { href: "/guides", icon: "📖", title: "Hướng Dẫn EB-3" },
      { href: "/glossary", icon: "📚", title: "Thuật Ngữ" },
      { href: "/faq", icon: "❓", title: "FAQ" },
      { href: "/agency-guide", icon: "🏢", title: "Chọn Agency" },
    ],
  },
  {
    key: "no-perm",
    label: "Tôi chưa nộp hồ sơ / đang tìm agency",
    tools: [
      { href: "/guides", icon: "📖", title: "Hướng Dẫn EB-3" },
      { href: "/glossary", icon: "📚", title: "Thuật Ngữ" },
      { href: "/agency-guide", icon: "🏢", title: "Chọn Agency" },
      { href: "/faq", icon: "❓", title: "FAQ" },
    ],
  },
  {
    key: "i140",
    label: "Đã có I-140, đang chờ Visa Bulletin",
    tools: [
      { href: "/visa-bulletin", icon: "📅", title: "Visa Bulletin" },
      { href: "/tracker", icon: "📊", title: "Theo Dõi Hồ Sơ" },
      { href: "/news", icon: "📰", title: "Tin Tức Chính Sách" },
      { href: "/case-studies", icon: "⚠️", title: "Xử Lý Sự Cố" },
    ],
  },
  {
    key: "interview",
    label: "Đang chuẩn bị phỏng vấn",
    tools: [
      { href: "/interview", icon: "🎤", title: "Ôn Phỏng Vấn" },
      { href: "/english-work", icon: "💬", title: "Tiếng Anh CV" },
      { href: "/cost-calculator", icon: "🧮", title: "Chi Phí Sinh Hoạt" },
      { href: "/case-studies", icon: "⚠️", title: "Xử Lý Sự Cố" },
      { href: "/aos-interview-guide", icon: "📋", title: "Phỏng Vấn AOS & I-693" },
    ],
  },
  {
    key: "arrived",
    label: "Tôi mới sang Mỹ",
    tools: [
      { href: "/after-arrival", icon: "✈️", title: "Sau Khi Đến Mỹ" },
      { href: "/essentials", icon: "📱", title: "Dịch Vụ Thiết Yếu" },
      { href: "/net-pay", icon: "💰", title: "Tính Lương Net" },
      { href: "/healthcare", icon: "🏥", title: "Y Tế & Bảo Hiểm" },
      { href: "/dmv", icon: "🚗", title: "Ôn Thi Bằng Lái" },
    ],
  },
  {
    key: "green-card",
    label: "Tôi đã có thẻ xanh",
    tools: [
      { href: "/green-card-life", icon: "🟢", title: "Quyền Thẻ Xanh" },
      { href: "/citizenship-path", icon: "🎓", title: "Con Đường Quốc Tịch" },
      { href: "/family-petition", icon: "👨‍👩‍👧", title: "Bảo Lãnh Gia Đình" },
      { href: "/ac21-portability", icon: "🔄", title: "Đổi Việc AC21" },
    ],
  },
];

/** localStorage key — same name as the original plan's STAGE_TOOLS pattern. */
export const JOURNEY_STAGE_STORAGE_KEY = "eb3_journey_stage";
