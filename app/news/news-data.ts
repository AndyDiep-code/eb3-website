/**
 * Manual policy-news dataset ported verbatim from news.html's inline `NEWS`
 * array (news.html lines 350-533). This is curated by hand (not auto-fetched)
 * — unlike data/news-legal.json and data/news-uscis.json, which are refreshed
 * by GitHub Actions and consumed as read-only data imports in news-content.tsx.
 */
export interface NewsItem {
  title: string;
  date: string;
  source: string;
  tags: string[];
  desc: string;
  impact: string;
}

export const NEWS_TAGS = [
  "all",
  "EB-3",
  "USCIS",
  "DOS",
  "Phí",
  "CSPA",
  "Premium",
  "NVC",
  "DOL",
  "VB",
] as const;

export const NEWS: NewsItem[] = [
  {
    title: "Phân Tích: Quota EW3 Có Tăng Trong Bối Cảnh Thiếu Lao Động Kỷ Lục?",
    date: "07/2026",
    source: "U.S. Chamber of Commerce / DHS / ICE",
    tags: ["EB-3", "DOL"],
    desc: "Nghịch lý 2025-2026: trục xuất càng nhiều → thiếu lao động càng nặng → nhu cầu EW3 hợp pháp càng tăng. ICE bắt giữ trung bình 1,264 người/ngày (tăng 300%); FY2026 đã trục xuất 234,236 người (tăng 74%). Ước tính mất 1.5 triệu lao động xây dựng, 225K nông nghiệp, 1 triệu khách sạn. Chính quyền Trump tự thừa nhận tháng 10/2025 rằng trục xuất đang gây thiếu lao động và có khả năng thiếu lương thực.",
    impact:
      "Quota EW3 khó tăng ngắn hạn: chính quyền Trump theo đuổi đồng thời 2 mục tiêu mâu thuẫn (trục xuất bất hợp pháp + hạn chế hợp pháp). Kịch bản lạc quan: Dignity Act of 2025 nếu được thông qua có thể tăng hạn ngạch EW3 và rút ngắn thời gian chờ — nhưng vẫn là ẩn số lớn.",
  },
  {
    title: "Trục Xuất & Thiếu Lao Động Kỷ Lục — Số Liệu Thực Tế 2025-2026",
    date: "06/2026",
    source: "ICE / DHS / BLS",
    tags: ["EB-3", "DOL"],
    desc: "Tính đến 01/2026, ICE đang giam giữ 73,000 người — mức cao kỷ lục mọi thời đại, tăng 84% so với 2025. Trong số bị bắt ngoài đường phố, 2/3 không có tiền án. Visa nhập cư bị đình chỉ với 75 quốc gia (chặn ~50% nhập cư hợp pháp). Sinh viên quốc tế giảm 17% mùa thu 2025. Tiếp xúc biên giới giảm 79% còn 35,000/tháng 1/2026. Nông nghiệp mất 155,000 lao động (3–7/2025); ngành xây dựng tại 10 bang lao động bất hợp pháp cao giảm 0.1% trong khi các bang khác tăng 1.9%.",
    impact:
      "Lao động nước ngoài chiếm 70% lực lượng nông trại toàn quốc; dự đoán lao động Mỹ bản địa lấp đầy vị trí trống đã KHÔNG xảy ra. EB-3 tiếp tục là kênh hợp pháp duy nhất; áp lực thiếu hụt có thể thúc đẩy employer tăng tốc nộp hồ sơ sponsor.",
  },
  {
    title: "EB-3 / EW Annual Limit Reached — FY2025",
    date: "09/2025",
    source: "Department of State",
    tags: ["EB-3", "DOS", "VB"],
    desc: "DOS tiếp tục thông báo quota EB-3/EW FY2025 đã cạn trước cuối fiscal year (30/09/2025); tình trạng tương tự FY2024.",
    impact: "Case current nhưng vẫn có thể không được issue visa nếu quota hết.",
  },
  {
    title: "Adjustment of Status — Reclassified as Discretionary",
    date: "2026",
    source: "USCIS",
    tags: ["USCIS", "EB-3"],
    desc: 'USCIS memo mới xem việc Adjustment of Status (I-485) là discretionary benefit "extraordinary", thúc đẩy nhiều applicant phải về nước làm Consular Processing thay vì xin thẻ xanh trong Mỹ.',
    impact:
      "Ảnh hưởng lớn EB-3 trong Mỹ; tăng số case NVC/DS-260/interview ở embassy ngoài Mỹ, tăng rủi ro delay, retrogression, 221(g).",
  },
  {
    title: "June 2026 Visa Bulletin — Cảnh báo Retrogression",
    date: "06/2026",
    source: "Department of State",
    tags: ["DOS", "VB", "EB-3"],
    desc: "DOS cảnh báo khả năng retrogression/unavailable với một số EB categories do demand tăng mạnh.",
    impact:
      "Người EB-3 cần theo dõi Visa Bulletin sát hơn; current hôm nay chưa chắc current tháng sau.",
  },
  {
    title: "Signature Rule on Immigration Benefit Requests",
    date: "11/05/2026 (HLực: 10/07/2026)",
    source: "DHS / Federal Register",
    tags: ["USCIS", "EB-3"],
    desc: "Nếu USCIS nhận hồ sơ rồi sau đó phát hiện chữ ký không hợp lệ, USCIS có thể reject hoặc deny toàn bộ hồ sơ.",
    impact:
      "Ảnh hưởng mọi benefit request nộp USCIS, gồm I-140/I-485/I-907; cần kiểm tra chữ ký cực kỹ.",
  },
  {
    title: "NVC Case Creation Timeframe — Delay Alert",
    date: "18/05/2026",
    source: "Department of State / NVC",
    tags: ["DOS", "NVC"],
    desc: "NVC đang xử lý và tạo case cho hồ sơ nhận từ USCIS ngày 05/05/2026; hồ sơ USCIS approved sau ngày này có thể chưa được tạo case và có thể có delay.",
    impact:
      "Sau I-140 approval, thường chờ USCIS chuyển hồ sơ sang NVC rồi NVC tạo case/welcome letter.",
  },
  {
    title: "Premium Processing Fee Increase — FY2026",
    date: "09/01/2026",
    source: "USCIS / DHS",
    tags: ["USCIS", "Phí", "Premium"],
    desc: "DHS/USCIS tăng phí premium processing (I-907) theo lạm phát giai đoạn 06/2023–06/2025; đây là lần điều chỉnh định kỳ thứ hai.",
    impact: "Tăng chi phí xử lý nhanh I-140; kiểm tra mức phí mới trước khi nộp I-907.",
  },
  {
    title: "Strengthened Screening and Vetting",
    date: "30/03/2026",
    source: "USCIS",
    tags: ["USCIS", "EB-3"],
    desc: "USCIS ban hành quy định tăng cường kiểm tra an ninh và vetting đối với người nộp đơn; áp dụng với các hồ sơ employment-based (I-140, I-485).",
    impact:
      "Có thể làm hồ sơ bị xét kỹ hơn hoặc chậm hơn, nhất là khi có yếu tố background/security.",
  },
  {
    title: "IV Scheduling Status Tool — DOS ra mắt công cụ mới",
    date: "2025",
    source: "Department of State",
    tags: ["DOS", "NVC"],
    desc: "DOS triển khai/cập nhật công cụ xem embassy nào đang schedule immigrant visa đến mốc nào.",
    impact: "Hữu ích cho EB-3 đã DQ theo dõi interview scheduling.",
  },
  {
    title: "CSPA Changed Back to Final Action Dates",
    date: "08/08/2025 (HLực: 15/08/2025)",
    source: "USCIS & DOS",
    tags: ["USCIS", "CSPA"],
    desc: "USCIS và DOS dùng Final Action Dates để xác định visa available cho CSPA — đảo ngược policy 2023.",
    impact: "Có thể bất lợi hơn cho con phụ thuộc gần 21 tuổi so với policy dùng Dates for Filing (2023).",
  },
  {
    title: "H.R. 1 Fee Updates — Big Beautiful Bill",
    date: "18/07/2025",
    source: "USCIS",
    tags: ["USCIS", "Phí"],
    desc: "USCIS cập nhật một số mức phí immigration theo luật H.R. 1; áp dụng cho nhiều loại đơn gồm I-131, I-485 và các loại phí khác.",
    impact: "Cần kiểm tra fee mới nếu nộp form liên quan sau mốc hiệu lực.",
  },
  {
    title: "EB-3 / EW Annual Limit Reached — FY2024",
    date: "16/09/2024",
    source: "Department of State",
    tags: ["EB-3", "DOS", "VB"],
    desc: "DOS thông báo toàn bộ quota EB-3/EW FY2024 đã dùng hết trước cuối fiscal year.",
    impact: "Không thể cấp thêm EB-3/EW visa đến đầu FY2025; nhiều case DQ phải chờ.",
  },
  {
    title: "Ability to Pay Policy Guidance — EB-3 Employer",
    date: "09/2024",
    source: "USCIS",
    tags: ["USCIS", "EB-3"],
    desc: "USCIS làm rõ cách xét employer's ability to pay cho EB-1/EB-2/EB-3; yêu cầu bằng chứng tài chính của nhà tuyển dụng rõ ràng hơn.",
    impact: "Ảnh hưởng trực tiếp EB-3 employer-sponsored; có thể tăng RFE/denial nếu employer financial evidence yếu.",
  },
  {
    title: "EB-3 Retrogression — ROW/Mexico/Philippines",
    date: "07/2024 & 09/2024",
    source: "Department of State",
    tags: ["EB-3", "DOS", "VB"],
    desc: "DOS lùi ngày Final Action Date của EB-3 (ROW/Mexico/Philippines) do dư cầu visa quá cao; final action date bị retrogress về phía trước.",
    impact: "Dù I-140 approved, NVC/interview/visa issuance có thể phải chờ lâu hơn dự kiến.",
  },
  {
    title: "Employment-Based Fee / Asylum Program Fee Reminder",
    date: "29/04/2024 & 23/09/2024",
    source: "USCIS",
    tags: ["USCIS", "Phí", "EB-3"],
    desc: "USCIS nhắc petitioner nộp đúng phí I-140, gồm Asylum Program Fee ($600) nếu áp dụng (employer có ≥25 nhân viên).",
    impact: "Rất quan trọng cho I-140 nộp mới sau 01/04/2024; sai phí có thể bị reject.",
  },
  {
    title: "USCIS Fee Final Rule — Tăng phí từ 01/04/2024",
    date: "30/01/2024 (HLực: 01/04/2024)",
    source: "USCIS / DHS",
    tags: ["USCIS", "Phí"],
    desc: "Điều chỉnh nhiều loại phí USCIS lần đầu từ 2016; I-140 tăng từ $700 lên $1,315 (gói thường), I-907 Premium từ $2,500 lên $2,805.",
    impact: "I-140 và nhiều form liên quan tăng phí; sai phí dễ bị reject. Kiểm tra uscis.gov/fees trước khi nộp.",
  },
  {
    title: "Concurrent EB Filing Location Change",
    date: "10/2023",
    source: "USCIS",
    tags: ["USCIS", "EB-3"],
    desc: "USCIS đổi nơi nộp concurrent filing package I-140/I-485/I-765/I-131/I-824; chuyển về lockbox mới.",
    impact: "Sai lockbox có thể bị reject/chậm xử lý toàn bộ package.",
  },
  {
    title: "I-907 with I-140 Filing Location Change",
    date: "13/11/2023 & 15/12/2023",
    source: "USCIS",
    tags: ["USCIS", "Phí", "Premium"],
    desc: "Chuyển địa chỉ nộp I-907 (premium processing) kèm I-140 sang lockbox mới theo 2 giai đoạn.",
    impact: "Sai địa chỉ có thể bị reject hoặc xử lý chậm; kiểm tra địa chỉ mới nhất trên uscis.gov.",
  },
  {
    title: "EB-1A Extraordinary Ability — Policy Manual Update",
    date: "11/2023",
    source: "USCIS",
    tags: ["USCIS"],
    desc: "USCIS cập nhật policy manual về tiêu chí chứng minh EB-1A (Extraordinary Ability); làm rõ cách đánh giá bằng chứng và các yếu tố điều kiện (criteria).",
    impact: "Ảnh hưởng người nộp I-140 EB-1A; ít ảnh hưởng trực tiếp EB-3 EW.",
  },
  {
    title: "Premium Processing Fee — Inflation Increase",
    date: "27/12/2023 (HLực: 26/02/2024)",
    source: "USCIS / DHS",
    tags: ["USCIS", "Phí", "Premium"],
    desc: "USCIS/DHS tăng phí Form I-907 (premium processing) định kỳ theo chỉ số lạm phát (CPI).",
    impact: "Tăng chi phí nếu dùng premium cho I-140; phí I-907 điều chỉnh từ $2,500 → $2,805.",
  },
  {
    title: 'CSPA "Sought to Acquire" — Clarification',
    date: "24/08/2023",
    source: "USCIS",
    tags: ["USCIS", "CSPA"],
    desc: 'Làm rõ yêu cầu phải "seek to acquire" trong vòng 1 năm khi visa available để được bảo vệ tuổi CSPA.',
    impact: 'Quan trọng nếu có con đi kèm gần 21 tuổi; DS-260/fee/document action có thể xác định "sought to acquire".',
  },
  {
    title: "CSPA Age Calculation — Dates for Filing Allowed",
    date: "14/02/2023",
    source: "USCIS",
    tags: ["USCIS", "CSPA"],
    desc: "USCIS cho phép dùng Dates for Filing (Bảng B) để tính tuổi CSPA trong một số trường hợp AOS.",
    impact: "Có thể có lợi cho con phụ thuộc gần 21 tuổi; chủ yếu áp dụng cho AOS (trong Mỹ).",
  },
  {
    title: "New PERM ETA-9089 / FLAG System Transition",
    date: "10/2022",
    source: "Department of Labor / FLAG",
    tags: ["DOL", "EB-3"],
    desc: "DOL chuyển từ legacy PERM Online sang hệ thống FLAG và mẫu ETA-9089 mới; nhiều thay đổi workflow và form.",
    impact: "Ảnh hưởng trực tiếp EB-3 PERM filing; nhiều case bị delay/audit do thay đổi form và quy trình.",
  },
  {
    title: "Final Phase Premium Processing — EB-1/EB-2",
    date: "12/2023",
    source: "USCIS",
    tags: ["USCIS", "Premium"],
    desc: "Hoàn tất mở rộng premium processing cho EB-1/EB-2 I-140; áp dụng với tất cả EB-1/EB-2 NIW.",
    impact: "EB-1/EB-2 NIW có thêm lựa chọn xử lý nhanh; không áp dụng trực tiếp cho EB-3 EW.",
  },
  {
    title: "Premium Processing for EB-1/EB-2 I-140 — Giai đoạn 1",
    date: "24/05/2022",
    source: "USCIS",
    tags: ["USCIS", "Premium"],
    desc: "Mở premium processing cho một số I-140 EB-1/EB-2 đang pending.",
    impact: "Rút ngắn giai đoạn I-140 cho EB-1/EB-2; tiền đề cho việc mở rộng sau này.",
  },
  {
    title: "Backlog Reduction + Premium Processing Expansion Plan",
    date: "29/03/2022",
    source: "USCIS",
    tags: ["USCIS"],
    desc: "USCIS công bố kế hoạch giảm backlog hồ sơ tồn đọng và mở rộng premium processing cho I-140 EB-1/EB-2.",
    impact: "Có lợi cho tốc độ xử lý I-140, nhưng không làm priority date nhanh hơn.",
  },
  {
    title: "EB-2 NIW Guidance Update",
    date: "15/01/2025",
    source: "USCIS",
    tags: ["USCIS"],
    desc: 'USCIS cập nhật hướng dẫn (policy manual) về cách xét EB-2 NIW; làm rõ tiêu chí "advanced degree" và "national interest" theo Matter of Dhanasar.',
    impact: "Ảnh hưởng trực tiếp hồ sơ I-140 NIW; ít ảnh hưởng EB-3 EW.",
  },
];

/** Parses news.html's mixed date formats ("DD/MM/YYYY", "MM/YYYY", "YYYY") to a sortable integer. */
function parseSortDate(dateStr: string): number {
  const yearMatch = dateStr.match(/(\d{4})/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : 2020;
  const monthYearMatch = dateStr.match(/(\d{1,2})\/(\d{4})/);
  const month = monthYearMatch ? parseInt(monthYearMatch[1], 10) : 12;
  const dayMonthYearMatch = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  const day = dayMonthYearMatch ? parseInt(dayMonthYearMatch[1], 10) : 28;
  return year * 10000 + month * 100 + day;
}

export const SORTED_NEWS: NewsItem[] = [...NEWS].sort(
  (a, b) => parseSortDate(b.date) - parseSortDate(a.date),
);

const TAG_CLASS_MAP: Record<string, string> = {
  "EB-3": "bg-[#3b1f8c] text-[#c4b5fd]",
  USCIS: "bg-[#1e3a8a] text-[#93c5fd]",
  DOS: "bg-[#0c4a6e] text-[#7dd3fc]",
  Phí: "bg-[#431407] text-[#fdba74]",
  CSPA: "bg-[#0a3320] text-[#4ade80]",
  Premium: "bg-[#431407] text-[#fb923c]",
  NVC: "bg-[#0f2a47] text-[#60a5fa]",
  DOL: "bg-[#1a2e05] text-[#84cc16]",
  VB: "bg-[#3f1f06] text-[#fbbf24]",
};

export function getTagClass(tag: string): string {
  return TAG_CLASS_MAP[tag] ?? "bg-[#1e3a8a] text-[#93c5fd]";
}
