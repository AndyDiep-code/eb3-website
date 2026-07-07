// Static search index — all pages with their titles, descriptions, and tab sub-topics.
// Used by the GlobalSearch component for client-side fuzzy search.

export interface SearchEntry {
  href: string;
  title: string;
  group: string;
  description: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Tổng Quan
  { href: "/", title: "Trang Chủ", group: "Tổng Quan", description: "Tổng quan về EB3VIET, Visa Bulletin mới nhất, tin tức" },
  { href: "/start", title: "Bắt Đầu Từ Đây", group: "Tổng Quan", description: "Hướng dẫn bắt đầu quy trình EB-3, điểm xuất phát cho người mới" },
  { href: "/compare", title: "So Sánh Bang & Ngành", group: "Tổng Quan", description: "So sánh tiểu bang và ngành nghề theo lương, chi phí, cơ hội" },
  { href: "/about", title: "Giới Thiệu EB3VIET", group: "Tổng Quan", description: "Về website, mục đích, tác giả" },

  // Quy Trình EB-3
  { href: "/guides", title: "Hướng Dẫn 5 Bước", group: "Quy Trình EB-3", description: "5 bước quy trình EB-3: PERM, I-140, I-485, EAD, nhập cảnh" },
  { href: "/jobs", title: "Ngành Nghề & Hãng", group: "Quy Trình EB-3", description: "Danh sách ngành nghề EB-3 Other Workers, tìm hãng bảo lãnh" },
  { href: "/agency-guide", title: "Chọn Agency", group: "Quy Trình EB-3", description: "Hướng dẫn chọn agency uy tín, tránh lừa đảo" },
  { href: "/english-work", title: "Tiếng Anh & CV", group: "Quy Trình EB-3", description: "Chuẩn bị tiếng Anh, viết CV xin việc Mỹ" },
  { href: "/documents", title: "Checklist Hồ Sơ", group: "Quy Trình EB-3", description: "Danh sách giấy tờ cần chuẩn bị cho hồ sơ EB-3" },
  { href: "/interview", title: "Ôn Phỏng Vấn", group: "Quy Trình EB-3", description: "Ôn luyện phỏng vấn xin việc bằng tiếng Anh" },
  { href: "/aos-interview-guide", title: "Phỏng Vấn AOS & I-693", group: "Quy Trình EB-3", description: "I-485 vs Lãnh Sự, khám I-693, phỏng vấn USCIS, EAD/AP Timeline" },
  { href: "/ac21-portability", title: "Đổi Việc AC21", group: "Quy Trình EB-3", description: "AC21 portability, đổi việc sau I-485, việc tương tự, quy trình đổi" },
  { href: "/case-studies", title: "Case Studies", group: "Quy Trình EB-3", description: "Câu chuyện thực tế, kinh nghiệm của người đã đi qua quy trình EB-3" },

  // Theo Dõi & Tin Tức
  { href: "/visa-bulletin", title: "Visa Bulletin", group: "Theo Dõi & Tin Tức", description: "Visa Bulletin hàng tháng, priority date Vietnam EB-3, Table A và B" },
  { href: "/perm-tracker", title: "PERM Tracker", group: "Theo Dõi & Tin Tức", description: "Theo dõi thời gian xử lý PERM, DOL processing times" },
  { href: "/tracker", title: "Theo Dõi I-485", group: "Theo Dõi & Tin Tức", description: "Theo dõi trạng thái hồ sơ I-485, thẻ xanh" },
  { href: "/news", title: "Tin Tức Chính Sách", group: "Theo Dõi & Tin Tức", description: "Tin tức EB-3, chính sách USCIS, DOL, pháp luật di trú" },
  { href: "/faq", title: "FAQ", group: "Theo Dõi & Tin Tức", description: "Câu hỏi thường gặp về EB-3, visa, thẻ xanh" },
  { href: "/glossary", title: "Thuật Ngữ", group: "Theo Dõi & Tin Tức", description: "Giải thích thuật ngữ di trú: PERM, I-140, I-485, EAD, AP, GC" },

  // Mới Đến Mỹ
  { href: "/after-arrival", title: "Sau Khi Đến Mỹ", group: "Mới Đến Mỹ", description: "Việc cần làm ngay khi đến Mỹ: SSN, ngân hàng, điện thoại, nhà ở" },
  { href: "/essentials", title: "Dịch Vụ Thiết Yếu", group: "Mới Đến Mỹ", description: "Điện thoại, xe và đi lại, mua sắm, internet tại Mỹ" },
  { href: "/housing-rights", title: "Thuê Nhà & Quyền", group: "Mới Đến Mỹ", description: "Thuê nhà với ITIN, hợp đồng thuê, quyền lợi người thuê theo bang" },
  { href: "/healthcare", title: "Y Tế & Bảo Hiểm", group: "Mới Đến Mỹ", description: "Bảo hiểm y tế, Medicaid, tìm bác sĩ, mua thuốc, nha khoa" },
  { href: "/aca-medicaid-guide", title: "ACA & Medicaid", group: "Mới Đến Mỹ", description: "ACA Marketplace, Medicaid/CHIP, Public Charge, CHIP cho trẻ em" },
  { href: "/school-enrollment-guide", title: "Trường Học", group: "Mới Đến Mỹ", description: "Đăng ký trường cho con: giấy tờ, tuổi & lớp, hỗ trợ ESL, hồ sơ từ VN" },
  { href: "/emergency-guide", title: "Khẩn Cấp", group: "Mới Đến Mỹ", description: "Gặp cảnh sát, vào bệnh viện, gọi 911, thẻ khẩn cấp tiếng Anh" },
  { href: "/scam-warning", title: "Cảnh Báo Lừa Đảo", group: "Mới Đến Mỹ", description: "Nhận biết và tránh các chiêu lừa đảo nhắm vào người Việt" },

  // Tài Chính
  { href: "/finance", title: "Tổng Quan Tài Chính", group: "Tài Chính", description: "Ngân hàng, xây credit, gửi tiền về VN, ngân sách, 401k tại Mỹ" },
  { href: "/finance-roadmap", title: "Lộ Trình Tài Chính", group: "Tài Chính", description: "Kế hoạch tài chính từng bước cho người mới đến Mỹ" },
  { href: "/net-pay", title: "Tính Lương Net", group: "Tài Chính", description: "Tính lương thực nhận sau thuế, Medicare, Social Security" },
  { href: "/tax-guide", title: "Khai Thuế", group: "Tài Chính", description: "Hướng dẫn khai thuế cho người Việt mới đến Mỹ, Form W-2, 1040" },
  { href: "/remittance-guide", title: "Gửi Tiền Về VN", group: "Tài Chính", description: "So sánh dịch vụ chuyển tiền về Việt Nam: Wise, Remitly, Western Union" },
  { href: "/credit-building", title: "Xây Dựng Credit", group: "Tài Chính", description: "Xây dựng credit score từ đầu, thẻ tín dụng đầu tiên tại Mỹ" },
  { href: "/cost-calculator", title: "Chi Phí Sinh Hoạt", group: "Tài Chính", description: "Ước tính chi phí sinh hoạt theo tiểu bang, thành phố" },
  { href: "/worker-rights", title: "Quyền Lao Động", group: "Tài Chính", description: "Quyền lợi người lao động, lương tối thiểu, overtime, FMLA" },

  // Thẻ Xanh & Quốc Tịch
  { href: "/green-card-life", title: "Cuộc Sống Thẻ Xanh", group: "Thẻ Xanh & Quốc Tịch", description: "Quyền & tự do, phúc lợi liên bang, quy tắc du lịch, nghĩa vụ thẻ xanh" },
  { href: "/family-petition", title: "Bảo Lãnh Gia Đình", group: "Thẻ Xanh & Quốc Tịch", description: "Bảo lãnh vợ/chồng/con đi cùng (derivative), bảo lãnh sau I-130" },
  { href: "/citizenship-path", title: "Con Đường Nhập Tịch", group: "Thẻ Xanh & Quốc Tịch", description: "Điều kiện, quy trình N-400, Civics Test, quốc tịch kép" },
  { href: "/van-hoa-my", title: "Văn Hóa Mỹ", group: "Thẻ Xanh & Quốc Tịch", description: "Giao tiếp, công việc, học đường, cuộc sống, tài chính theo văn hóa Mỹ" },

  // Bằng Lái Xe
  { href: "/dmv", title: "Ôn Thi Bằng Lái", group: "Bằng Lái Xe", description: "Ôn thi bằng lái xe, thi thử, luật giao thông, biển báo" },
  { href: "/bmv", title: "BMV Theo Tiểu Bang", group: "Bằng Lái Xe", description: "Thủ tục lấy bằng lái theo từng tiểu bang, tài liệu cần thiết" },
];
