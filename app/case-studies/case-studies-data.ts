/**
 * Case study dataset ported from case-studies.html's 6 hand-coded
 * `.case-card` blocks (legacy lines 196-493). Kept as a standalone data
 * module so case-studies-content.tsx stays under the 200-line guideline.
 */
export type CaseBadgeLevel = "critical" | "serious" | "moderate" | "info";

export const BADGE_STYLES: Record<CaseBadgeLevel, string> = {
  critical: "bg-primary/15 text-primary",
  serious: "bg-secondary/15 text-secondary",
  moderate: "bg-accent/15 text-accent",
  info: "bg-bg-alt text-text-muted",
};

export interface CaseListItem {
  tone: "bad" | "good" | "warn" | "neutral";
  html: string;
}

export interface CaseTableRow {
  cells: string[];
}

export interface CaseTable {
  headers: string[];
  rows: CaseTableRow[];
}

export interface CaseStep {
  html: string;
}

export interface CaseAlert {
  tone: "red" | "yellow" | "green" | "blue";
  icon: string;
  html: string;
}

export interface CaseSection {
  label: string;
  list?: CaseListItem[];
  table?: CaseTable;
  steps?: CaseStep[];
  alert?: CaseAlert;
}

export interface CaseStudy {
  id: string;
  icon: string;
  title: string;
  sub: string;
  badge: string;
  badgeLevel: CaseBadgeLevel;
  sections: CaseSection[];
  trailingAlert?: CaseAlert;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "c1",
    icon: "📄",
    title: "LC / PERM Bị Audit hoặc Denied",
    sub: "Labor Certification bị DOL kiểm tra hoặc từ chối · Priority Date cũ có thể mất hiệu lực",
    badge: "⚠️ Nghiêm trọng",
    badgeLevel: "serious",
    sections: [
      {
        label: "Nguyên nhân phổ biến bị Audit",
        list: [
          { tone: "bad", html: "Quảng cáo tuyển dụng (recruitment ads) không đúng quy cách — sai phương tiện, sai thời gian" },
          { tone: "bad", html: "Mức lương dưới Prevailing Wage (FWD) mà DOL đã xác định" },
          { tone: "bad", html: 'Job description không rõ ràng hoặc yêu cầu quá cụ thể (có vẻ như "đặt hàng" cho 1 người)' },
          { tone: "bad", html: "Employer có lịch sử vi phạm lao động hoặc LC audit trước đó" },
          { tone: "bad", html: "Hồ sơ thiếu chứng từ tuyển dụng (recruitment documentation)" },
        ],
      },
      {
        label: "Kết quả có thể xảy ra",
        table: {
          headers: ["Kết quả", "Ảnh hưởng đến PD", "Thời gian thêm"],
          rows: [
            { cells: ["Audit (cần bổ sung)", "PD được giữ", "+6 đến +12 tháng"] },
            { cells: ["Denied (từ chối)", "❌ PD mất — mở hồ sơ mới", "Bắt đầu lại từ đầu"] },
            { cells: ["Withdrawn (rút)", "❌ PD mất", "Bắt đầu lại từ đầu"] },
          ],
        },
      },
      {
        label: "Cách xử lý khi bị Audit",
        steps: [
          { html: "Nhận thông báo Audit từ DOL — <b>đọc kỹ yêu cầu bổ sung</b>" },
          { html: "Phối hợp với luật sư chuẩn bị <b>Audit Response</b> — thường bao gồm: recruitment records, posting proof, employer financial documents" },
          { html: "Nộp Audit Response trong thời hạn DOL cho phép (thường 30-60 ngày)" },
          { html: "Chờ DOL ra quyết định — nếu được duyệt, <b>PD được giữ nguyên</b> và tiếp tục làm I-140" },
        ],
      },
      {
        label: "Khi bị Denied — Cách phục hồi",
        list: [
          { tone: "warn", html: "<b>Yêu cầu agency mở LC mới ngay</b> — PD mới sẽ từ ngày nộp LC mới" },
          { tone: "warn", html: "Hỏi luật sư về khả năng <b>Request for Reconsideration</b> (nếu có cơ sở)" },
          { tone: "warn", html: "Kiểm tra lại job description và recruitment process với agency trước khi mở lại" },
          { tone: "good", html: "PD cũ mất nhưng quá trình sẽ nhanh hơn vì đã có kinh nghiệm" },
        ],
      },
    ],
    trailingAlert: {
      tone: "red",
      icon: "🚨",
      html: "<b>Lưu ý quan trọng:</b> LC có hiệu lực 180 ngày sau khi certified. Phải nộp I-140 trong 180 ngày này — quá hạn, LC mất hiệu lực và phải mở lại từ đầu.",
    },
  },
  {
    id: "c2",
    icon: "📋",
    title: "I-140 Nhận RFE (Request for Evidence)",
    sub: "USCIS yêu cầu bổ sung bằng chứng · Phải trả lời trong thời hạn cho phép",
    badge: "🟡 Cần xử lý ngay",
    badgeLevel: "moderate",
    sections: [
      {
        label: "Nguyên nhân USCIS gửi RFE cho I-140",
        list: [
          { tone: "bad", html: "<b>Employer không đủ khả năng tài chính (Ability to Pay):</b> Tax returns, financial statements yếu" },
          { tone: "bad", html: "<b>Job description không khớp</b> với mô tả trong LC hoặc CV đương đơn không phù hợp" },
          { tone: "bad", html: "<b>Thông tin mâu thuẫn</b> giữa I-140 và LC hoặc các giấy tờ khác" },
          { tone: "bad", html: "<b>Thiếu chứng cứ về mối quan hệ lao động thật sự</b> giữa employer và employee" },
          { tone: "bad", html: "Employer mới thành lập, lịch sử tài chính ngắn" },
        ],
      },
      {
        label: "Cách xử lý RFE",
        steps: [
          { html: "Nhận RFE — <b>đọc kỹ từng yêu cầu</b>. USCIS thường cho 87 ngày để trả lời" },
          { html: "Luật sư chuẩn bị RFE Response — thường tốn <b>~$1,000 phí luật sư</b> bổ sung" },
          { html: "Thu thập bằng chứng: tax returns 2-3 năm gần nhất, bank statements, payroll records của employer" },
          { html: "Nộp đúng hạn — USCIS không cho phép gia hạn trừ trường hợp đặc biệt" },
          { html: "Chờ quyết định — USCIS có thể: Approve, Send NOID (Notice of Intent to Deny), hoặc Deny" },
        ],
      },
      {
        label: "Kết quả sau RFE Response",
        table: {
          headers: ["Kết quả", "Nghĩa là", "Bước tiếp theo"],
          rows: [
            { cells: ["Approved ✅", "I-140 được duyệt, hồ sơ tiếp tục", "Chuyển sang NVC"] },
            { cells: ["NOID ⚠️", "USCIS dự định từ chối, cần respond tiếp", "Luật sư respond NOID (thêm ~$2,500)"] },
            { cells: ["Denied ❌", "I-140 bị từ chối", "Kháng cáo (Appeal) hoặc mở I-140 mới"] },
          ],
        },
      },
    ],
    trailingAlert: {
      tone: "yellow",
      icon: "⚠️",
      html: "<b>Priority Date khi I-140 Denied:</b> Nếu mở I-140 mới với cùng employer và cùng job title, PD từ LC gốc có thể được giữ lại (portability). Tham khảo luật sư về điều này.",
    },
  },
  {
    id: "c3",
    icon: "🎤",
    title: "Phỏng Vấn Nhận 221(g) — Từ Chối Tạm Thời",
    sub: "Lãnh sự quán yêu cầu bổ sung giấy tờ · Không phải từ chối vĩnh viễn · Cơ hội vẫn còn",
    badge: "🟡 Giải quyết được",
    badgeLevel: "moderate",
    sections: [
      {
        label: "221(g) là gì?",
        alert: {
          tone: "blue",
          icon: "ℹ️",
          html: "221(g) là từ chối <b>tạm thời</b> — lãnh sự quán cần thêm thông tin hoặc giấy tờ trước khi cấp visa. <b>Đây không phải từ chối vĩnh viễn.</b> Khi nộp đủ tài liệu yêu cầu, hồ sơ sẽ được xem xét lại.",
        },
      },
      {
        label: "Các loại 221(g) phổ biến",
        table: {
          headers: ["Loại", "Nghĩa là", "Cần làm"],
          rows: [
            { cells: ["Missing documents", "Thiếu giấy tờ cụ thể", "Nộp đúng giấy tờ yêu cầu"] },
            { cells: ["Additional processing", "Cần kiểm tra thêm an ninh", "Chờ — không làm gì được"] },
            { cells: ["Employer verification", "LSQ cần xác minh employer", "Agency/luật sư phối hợp xác nhận"] },
            { cells: ["Medical issues", "Kết quả khám có vấn đề", "Bổ sung điều trị + giấy tờ y tế"] },
          ],
        },
      },
      {
        label: "Cách xử lý 221(g)",
        steps: [
          { html: "Đọc kỹ giấy 221(g) — <b>xác định chính xác tài liệu nào bị yêu cầu</b>" },
          { html: "Liên hệ agency và luật sư ngay — họ sẽ hướng dẫn tài liệu cần thu thập" },
          { html: "Thu thập giấy tờ theo yêu cầu — đảm bảo dịch thuật và công chứng đúng quy định" },
          { html: "Nộp tài liệu theo hướng dẫn trong giấy 221(g) — có thể qua email, bưu điện hoặc trực tiếp" },
          { html: "Chờ LSQ xem xét — thường mất <b>vài tuần đến vài tháng</b>" },
        ],
      },
      {
        label: "Thời gian chờ 221(g)",
        list: [
          { tone: "warn", html: "Missing documents: thường giải quyết trong <b>2-8 tuần</b> sau khi nộp đủ" },
          { tone: "warn", html: "Administrative processing: có thể mất <b>2-12 tháng</b>, không dự đoán được" },
          { tone: "good", html: "Trong thời gian 221(g), visa cũ (nếu có) vẫn có giá trị để về VN" },
          { tone: "warn", html: "Không được nhập cảnh Mỹ trong thời gian pending 221(g)" },
        ],
      },
    ],
    trailingAlert: {
      tone: "yellow",
      icon: "⚠️",
      html: '<b>Cẩn thận với dịch vụ "giải quyết 221g":</b> Một số dịch vụ hứa giải quyết 221(g) nhanh — đây thường là lừa đảo. Chỉ làm việc với luật sư di trú có chứng chỉ.',
    },
  },
  {
    id: "c4",
    icon: "❌",
    title: "Phỏng Vấn Bị Từ Chối Vĩnh Viễn",
    sub: "Lãnh sự quán từ chối cấp visa · Có thể kháng cáo hoặc mở hồ sơ mới tùy trường hợp",
    badge: "🔴 Nghiêm trọng",
    badgeLevel: "critical",
    sections: [
      {
        label: "Nguyên nhân hay bị từ chối vĩnh viễn",
        list: [
          { tone: "bad", html: "<b>Không biết thông tin cơ bản:</b> Tên công ty, địa chỉ, công việc sẽ làm — cho thấy hồ sơ không thật" },
          { tone: "bad", html: "<b>Thông tin mâu thuẫn</b> giữa trả lời phỏng vấn và giấy tờ đã nộp" },
          { tone: "bad", html: "<b>Tiền án tiền sự</b> chưa khai báo hoặc vi phạm nghiêm trọng" },
          { tone: "bad", html: "<b>Từng vi phạm visa</b> hoặc cư trú bất hợp pháp ở Mỹ trước đây" },
          { tone: "bad", html: "<b>Employer không còn hoạt động</b> hoặc rút hồ sơ tại thời điểm phỏng vấn" },
          { tone: "bad", html: "<b>Kết quả khám sức khỏe</b> có bệnh trong danh sách cấm nhập cảnh" },
          { tone: "bad", html: "Bằng chứng về ý định lao động thật sự không đủ thuyết phục" },
        ],
      },
      {
        label: "Cơ sở pháp lý từ chối — INA Sections",
        table: {
          headers: ["Căn cứ", "Mô tả", "Có thể waiver?"],
          rows: [
            { cells: ["INA 212(a)(2)", "Tiền án hình sự", "Có thể (tùy loại tội)"] },
            { cells: ["INA 212(a)(3)", "An ninh quốc gia", "Hiếm"] },
            { cells: ["INA 212(a)(4)", "Public charge (gánh nặng xã hội)", "Có thể với bảo lãnh"] },
            { cells: ["INA 212(a)(6)", "Nhập cảnh trái phép trước đây", "Tùy thời gian vi phạm"] },
            { cells: ["INA 212(a)(9)", "Đã bị trục xuất hoặc từ chối trước", "Khó"] },
            { cells: ["INA 212(a)(1)", "Vấn đề sức khỏe", "Tùy bệnh"] },
          ],
        },
      },
      {
        label: "Các bước sau khi bị từ chối vĩnh viễn",
        steps: [
          { html: "Xác định <b>căn cứ từ chối cụ thể</b> — yêu cầu LSQ cung cấp lý do bằng văn bản" },
          { html: "Tham khảo <b>luật sư di trú Mỹ</b> (không phải chỉ agency) — cần đánh giá pháp lý chuyên sâu" },
          { html: "Xem xét <b>Motion to Reconsider</b> hoặc kháng cáo lên AAO (Administrative Appeals Office)" },
          { html: "Nếu căn cứ từ chối có thể waiver — nộp I-601 (Application for Waiver)" },
          { html: "Nếu không thể waiver — chấp nhận quyết định và không nộp lại để tránh aggravate tình trạng" },
        ],
      },
    ],
    trailingAlert: {
      tone: "red",
      icon: "🚨",
      html: "<b>QUAN TRỌNG:</b> Nếu bị từ chối do gian dối hoặc misrepresentation (INA 212(a)(6)(C)) — đây là từ chối vĩnh viễn rất khó giải quyết. Đây là lý do PHẢI nói thật trong phỏng vấn.",
    },
  },
  {
    id: "c5",
    icon: "🏢",
    title: "Agency Gian Dối / Biến Mất / Không Giao Case Number",
    sub: "Đã đóng tiền nhưng không có kết quả · Agency không liên lạc · Hồ sơ bị ngâm",
    badge: "🔴 Nguy hiểm",
    badgeLevel: "critical",
    sections: [
      {
        label: "Dấu hiệu agency có vấn đề",
        list: [
          { tone: "bad", html: "Đóng tiền >3 tháng mà chưa có Case Number" },
          { tone: "bad", html: "Không cung cấp được thông tin công ty bảo trợ (tên, địa chỉ, EIN)" },
          { tone: "bad", html: "Không có hợp đồng, không có biên lai" },
          { tone: "bad", html: "Chỉ liên lạc qua Zalo/Messenger, không email chính thức" },
          { tone: "bad", html: "Không xác nhận luật sư nào đứng I-140" },
          { tone: "bad", html: "Có nhiều post bóc phốt, khiếu nại từ cộng đồng" },
        ],
      },
      {
        label: "Các bước xử lý",
        steps: [
          { html: "<b>Thu thập toàn bộ bằng chứng:</b> hợp đồng, biên lai, tin nhắn, email — lưu lại tất cả" },
          { html: "Gửi <b>yêu cầu bằng văn bản</b> (email) cho agency: đề nghị cung cấp case number, thông tin sponsor, và tiến độ hồ sơ" },
          { html: "Nếu có Case Number: tự tra cứu tại <b>flag.dol.gov/case-status-search</b> để xác minh trạng thái" },
          { html: "Nếu agency từ chối hoặc không phản hồi: <b>khiếu nại qua hợp đồng</b> — liên hệ luật sư ở VN" },
          { html: "Báo cáo agency lên cơ quan chức năng VN (Sở LĐTBXH địa phương) nếu có dấu hiệu lừa đảo" },
          { html: "Cân nhắc <b>mở hồ sơ mới</b> với agency khác — chấp nhận mất tiền như học phí để tránh mất thêm" },
        ],
      },
      {
        label: "Khả năng đòi lại tiền",
        list: [
          { tone: "good", html: "Nếu có hợp đồng với điều khoản hoàn tiền rõ ràng — cơ sở đòi lại tốt" },
          { tone: "warn", html: "Không có hợp đồng / hợp đồng mơ hồ — khó đòi nhưng vẫn có thể qua pháp lý" },
          { tone: "bad", html: "Đóng tiền mặt không biên lai — rất khó đòi lại" },
          { tone: "warn", html: "Một số agency có thể hoàn tiền khi bị áp lực cộng đồng và bằng chứng rõ ràng" },
        ],
      },
    ],
    trailingAlert: {
      tone: "yellow",
      icon: "💡",
      html: "<b>Phòng ngừa:</b> Trước khi đóng tiền, yêu cầu xem Case Number của KH cũ đã có (LC certified). Đóng tiền từng đợt theo tiến trình, không đóng gộp. Luôn có hợp đồng song ngữ với điều khoản hoàn tiền.",
    },
  },
  {
    id: "c6",
    icon: "🏭",
    title: "Hãng Bảo Trợ Phá Sản / Đóng Cửa",
    sub: "Employer ngừng hoạt động sau khi I-140 đã được approved · Portability có thể cứu hồ sơ",
    badge: "⚠️ Nghiêm trọng",
    badgeLevel: "serious",
    sections: [
      {
        label: "Ảnh hưởng khác nhau tùy giai đoạn hồ sơ",
        table: {
          headers: ["Giai đoạn", "Hãng đóng cửa", "Hành động"],
          rows: [
            { cells: ["Đang chờ LC", "LC mất hiệu lực, PD mất", "Mở hồ sơ mới với hãng khác"] },
            { cells: ["LC certified, chờ I-140", "LC còn hiệu lực 180 ngày từ certified date", "Nhanh nộp I-140 với hãng mới cùng ngành"] },
            { cells: ["I-140 Approved ✅", "PD được giữ — Portability áp dụng", "Nộp I-140 mới với hãng khác cùng mã SOC"] },
            { cells: ["Đang NVC / DS-260", "Hồ sơ có thể bị hủy nếu không có employer mới", "Tìm employer mới và xin thay thế"] },
          ],
        },
      },
      {
        label: "Portability (INA 204(j)) — Chìa khóa quan trọng",
        alert: {
          tone: "green",
          icon: "✅",
          html: "<b>Nếu I-140 đã được approved ≥180 ngày:</b> Bạn có thể chuyển hồ sơ sang employer mới có cùng hoặc tương tự mã ngành nghề (SOC code), mà <b>Priority Date được giữ nguyên</b>. Đây gọi là AC21 Portability.",
        },
        list: [
          { tone: "good", html: "Portability cho phép giữ PD gốc khi đổi employer" },
          { tone: "warn", html: "Employer mới phải có job tương tự (same or similar occupation — same SOC code)" },
          { tone: "warn", html: "Portability cho cả AOS (I-485 pending ≥180 ngày) và consular processing" },
          { tone: "bad", html: "Nếu I-140 approved <180 ngày khi hãng đóng — khó hơn, cần tư vấn luật sư" },
        ],
      },
      {
        label: "Cách xử lý",
        steps: [
          { html: "Xác nhận I-140 đã approved và đã quá 180 ngày" },
          { html: "Nhờ agency tìm <b>employer mới cùng ngành</b> (cùng SOC code với job description LC gốc)" },
          { html: "Employer mới nộp <b>I-140 mới</b> — tham chiếu PD từ I-140 cũ đã approved" },
          { html: "USCIS có thể yêu cầu <b>AC21 Letter</b> — luật sư chuẩn bị giải thích portability" },
        ],
      },
    ],
  },
];
