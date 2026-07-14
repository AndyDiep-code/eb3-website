import { SIDEBAR_GROUPS } from "./sidebar-data";

// Short display labels for pages that have tabbed sub-sections
const PAGE_TABS: Record<string, readonly string[]> = {
  "/healthcare": ["Bảo Hiểm", "Medicaid", "Bác Sĩ", "Thuốc", "Nha Khoa"],
  "/essentials": ["Điện Thoại", "Xe & Đi Lại", "Mua Sắm", "Internet"],
  "/housing-rights": ["Thuê Nhà ITIN", "Hợp Đồng", "Quyền Theo Bang", "Khi Có Vấn Đề"],
  "/aca-medicaid-guide": ["ACA Marketplace", "Medicaid/CHIP", "Public Charge", "CHIP Trẻ Em"],
  "/school-enrollment-guide": ["Giấy Tờ", "Tuổi & Lớp", "Hỗ Trợ ESL", "Hồ Sơ VN"],
  "/emergency-guide": ["Cảnh Sát", "Bệnh Viện", "Gọi 911", "Thẻ Khẩn Cấp"],
  "/aos-interview-guide": ["I-485 vs Lãnh Sự", "Khám I-693", "Phỏng Vấn USCIS", "EAD/AP Timeline"],
  "/ac21-portability": ["AC21 Là Gì", "Việc Tương Tự", "Quy Trình Đổi", "Khi Có Rủi Ro"],
  "/green-card-life": ["Quyền & Tự Do", "Phúc Lợi LB", "Du Lịch", "Nghĩa Vụ"],
  "/family-petition": ["Đi Cùng", "Bảo Lãnh I-130", "Quy Trình & Phí", "Tình Huống ĐB"],
  "/citizenship-path": ["Điều Kiện", "Quy Trình N-400", "Civics Test", "Quốc Tịch Kép"],
  "/van-hoa-my": ["Giao Tiếp", "Công Việc", "Học Đường", "Cuộc Sống"],
  "/finance": ["Ngân Hàng", "Xây Credit", "Gửi Tiền VN", "Ngân Sách", "401k"],
  "/news": ["Chính Sách EB-3", "Pháp Luật", "USCIS & DOL"],
  "/dmv": ["19 Tiểu Bang", "Lọc EB3", "Lọc Thuế TN", "Thi Thử"],
  "/bmv": ["Tổng Quan", "Từ Vựng", "Luật Giao Thông", "Biển Báo", "Thi Thử"],
};

const MAX_CHIPS = 3;

const GROUP_META: Record<string, { icon: string; headerBg: string; iconBg: string; linkHover: string }> = {
  "Tổng Quan": {
    icon: "🏠",
    headerBg: "bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-800",
    iconBg: "bg-[#1a4480]",
    linkHover: "hover:text-[#1a4480] dark:hover:text-blue-300",
  },
  "Quy Trình EB-3": {
    icon: "📋",
    headerBg: "bg-sky-50 dark:bg-sky-950/40 border-sky-100 dark:border-sky-800",
    iconBg: "bg-sky-600",
    linkHover: "hover:text-sky-600 dark:hover:text-sky-400",
  },
  "Theo Dõi & Tin Tức": {
    icon: "📡",
    headerBg: "bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-800",
    iconBg: "bg-blue-600",
    linkHover: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  "Mới Đến Mỹ": {
    icon: "🇺🇸",
    headerBg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-800",
    iconBg: "bg-emerald-600",
    linkHover: "hover:text-emerald-600 dark:hover:text-emerald-400",
  },
  "Tài Chính": {
    icon: "💰",
    headerBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-800",
    iconBg: "bg-amber-500",
    linkHover: "hover:text-amber-600 dark:hover:text-amber-400",
  },
  "Thẻ Xanh & Quốc Tịch": {
    icon: "🟢",
    headerBg: "bg-teal-50 dark:bg-teal-950/40 border-teal-100 dark:border-teal-800",
    iconBg: "bg-teal-600",
    linkHover: "hover:text-teal-600 dark:hover:text-teal-400",
  },
  "Bằng Lái Xe": {
    icon: "🚗",
    headerBg: "bg-orange-50 dark:bg-orange-950/40 border-orange-100 dark:border-orange-800",
    iconBg: "bg-orange-500",
    linkHover: "hover:text-orange-600 dark:hover:text-orange-400",
  },
};

const FALLBACK = {
  icon: "📄",
  headerBg: "bg-bg-alt border-border",
  iconBg: "bg-gray-500",
  linkHover: "hover:text-primary",
};

export function SiteDirectory() {
  const total = SIDEBAR_GROUPS.reduce((n, g) => n + g.links.length, 0);

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-base font-bold text-text">📚 Toàn Bộ Nội Dung</h2>
        <span className="text-xs text-text-muted">{total} trang · 7 nhóm</span>
      </div>

      {/* 2-column group grid at all screen sizes ≥ sm */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SIDEBAR_GROUPS.map((group) => {
          const meta = GROUP_META[group.label] ?? FALLBACK;
          return (
            <div
              key={group.label}
              className="overflow-hidden rounded-card border border-border bg-bg shadow-sm"
            >
              {/* Group header */}
              <div className={`flex items-center gap-2.5 border-b px-4 py-2.5 ${meta.headerBg}`}>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs text-white ${meta.iconBg}`}
                >
                  {meta.icon}
                </span>
                <span className="text-sm font-bold text-text">{group.label}</span>
                <span className="ml-auto text-xs text-text-muted">{group.links.length}</span>
              </div>

              {/* Link list with optional sub-tab chips */}
              <ul className="flex flex-col gap-1.5 px-4 py-3">
                {group.links.map((link) => {
                  const tabs = PAGE_TABS[link.href];
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={`flex items-center gap-1 text-sm text-text-muted transition-colors ${meta.linkHover} group`}
                      >
                        <span className="shrink-0 text-[10px] text-border group-hover:text-current">›</span>
                        <span className="truncate">{link.label}</span>
                      </a>
                      {tabs && (
                        <div className="mt-1 ml-3 flex flex-wrap gap-1">
                          {tabs.slice(0, MAX_CHIPS).map((chip) => (
                            <a
                              key={chip}
                              href={link.href}
                              className={`rounded border border-border bg-bg-alt px-1.5 py-0.5 text-[10px] text-text-muted transition-colors ${meta.linkHover} hover:border-current`}
                            >
                              {chip}
                            </a>
                          ))}
                          {tabs.length > MAX_CHIPS && (
                            <a
                              href={link.href}
                              className="rounded border border-border bg-bg-alt px-1.5 py-0.5 text-[10px] text-text-muted hover:text-primary"
                            >
                              +{tabs.length - MAX_CHIPS} nữa
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
