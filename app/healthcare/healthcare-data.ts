// Static reference data for healthcare tabs — ported from healthcare.html's
// .cmp-table rows across #insurance, #medicaid, #doctor, #medicine, #dental.

export interface ComparisonRow {
  label: string;
  values: Array<{ text: string; colorClass: string }>;
}

export const HMO_VS_PPO: ComparisonRow[] = [
  {
    label: "Phí hàng tháng (premium)",
    values: [
      { text: "Thấp hơn ($50–120/tháng)", colorClass: "text-accent" },
      { text: "Cao hơn ($120–300/tháng)", colorClass: "text-red-500" },
    ],
  },
  {
    label: "Deductible",
    values: [
      { text: "Thấp ($500–1,500)", colorClass: "text-accent" },
      { text: "Cao hơn ($1,000–3,000)", colorClass: "text-red-500" },
    ],
  },
  {
    label: "Chọn bác sĩ",
    values: [
      { text: "Chỉ trong mạng lưới HMO", colorClass: "" },
      { text: "Cả in-network & out-of-network", colorClass: "text-accent" },
    ],
  },
  {
    label: "Cần giấy referral?",
    values: [
      { text: "Có — phải qua PCP trước", colorClass: "text-red-500" },
      { text: "Không — gặp specialist trực tiếp", colorClass: "text-accent" },
    ],
  },
  {
    label: "Phù hợp với",
    values: [
      { text: "Người ít đi khám, muốn tiết kiệm", colorClass: "" },
      { text: "Người hay đi khám, cần linh hoạt", colorClass: "" },
    ],
  },
  {
    label: "Khuyến nghị cho người mới",
    values: [
      { text: "✅ HMO nếu khỏe mạnh", colorClass: "text-accent" },
      { text: "PPO nếu có bệnh mãn tính cần specialist", colorClass: "" },
    ],
  },
];

export interface MedicaidLimitRow {
  program: string;
  target: string;
  fplLimit: string;
  fplLimitColor: string;
  dollarLimit: string;
  dollarLimitColor: string;
}

export const MEDICAID_LIMITS: MedicaidLimitRow[] = [
  {
    program: "Medicaid (người lớn)",
    target: "Người lớn không có con",
    fplLimit: "138% FPL",
    fplLimitColor: "text-secondary",
    dollarLimit: "~$20,120/năm (1 người)",
    dollarLimitColor: "text-secondary",
  },
  {
    program: "Medicaid (cha mẹ có con)",
    target: "Cha mẹ thu nhập thấp",
    fplLimit: "Khác nhau theo bang",
    fplLimitColor: "text-secondary",
    dollarLimit: "Tùy tiểu bang",
    dollarLimitColor: "",
  },
  {
    program: "CHIP",
    target: "Trẻ em 0–18 tuổi",
    fplLimit: "200–300% FPL",
    fplLimitColor: "text-accent",
    dollarLimit: "~$30–45K/năm (gia đình 3 người)",
    dollarLimitColor: "text-accent",
  },
  {
    program: "Marketplace Subsidies",
    target: "Mọi người",
    fplLimit: "100–400%+ FPL",
    fplLimitColor: "text-accent",
    dollarLimit: "Giảm giá bảo hiểm, không giới hạn cứng",
    dollarLimitColor: "text-accent",
  },
];

export interface CareVenueRow {
  name: string;
  subtitle: string;
  cost: string;
  costColor: string;
  wait: string;
  when: string;
}

export const CARE_VENUES: CareVenueRow[] = [
  {
    name: "🚑 Emergency Room (ER)",
    subtitle: "Phòng cấp cứu bệnh viện",
    cost: "$1,500–$3,000+ (chỉ phí vào cửa)",
    costColor: "text-red-500",
    wait: "1–8 giờ",
    when: "Nguy hiểm tính mạng: đau ngực, khó thở, mất ý thức, chấn thương nặng, đột quỵ",
  },
  {
    name: "🏥 Urgent Care",
    subtitle: "Phòng khám cấp bách",
    cost: "$100–200 copay",
    costColor: "text-secondary",
    wait: "15–60 phút",
    when: "Cần khám ngay nhưng không nguy hiểm: gãy nhẹ, vết thương cần khâu, sốt cao, nhiễm trùng cấp, UTI",
  },
  {
    name: "👨‍⚕️ PCP (Bác sĩ gia đình)",
    subtitle: "Đặt lịch trước",
    cost: "$20–40 copay",
    costColor: "text-accent",
    wait: "Đặt lịch 1–7 ngày",
    when: "Khám định kỳ, bệnh mãn tính, cảm cúm không nặng, đơn thuốc, referral chuyên khoa",
  },
  {
    name: "💻 Telehealth",
    subtitle: "Khám online qua video",
    cost: "$0–75/lần",
    costColor: "text-accent",
    wait: "Ngay hoặc trong ngày",
    when: "Cảm cúm nhẹ, dị ứng, đơn thuốc cũ cần gia hạn, tư vấn sức khỏe, mental health",
  },
];

export interface PharmacyRow {
  name: string;
  cheapest: string;
  cheapestColor: string;
  fourDollarList: string;
  fourDollarColor: string;
  note: string;
}

export const PHARMACY_COMPARISON: PharmacyRow[] = [
  {
    name: "Walmart Pharmacy",
    cheapest: "Rẻ nhất (nhiều thuốc $4/tháng)",
    cheapestColor: "text-accent",
    fourDollarList: "✅ Có danh sách $4",
    fourDollarColor: "text-accent",
    note: "Không cần thành viên. GoodRx thêm giảm thêm.",
  },
  {
    name: "Costco Pharmacy",
    cheapest: "Rẻ nhì (không cần thẻ thành viên để mua thuốc)",
    cheapestColor: "text-accent",
    fourDollarList: "✅ Rất cạnh tranh",
    fourDollarColor: "text-accent",
    note: "Ít biết nhưng giá rất tốt với GoodRx.",
  },
  {
    name: "Kroger / Fry's",
    cheapest: "Tốt",
    cheapestColor: "text-secondary",
    fourDollarList: "✅ Có",
    fourDollarColor: "text-secondary",
    note: "Nhiều tiểu bang miền Nam, Midwest.",
  },
  {
    name: "CVS / Rite Aid",
    cheapest: "Đắt hơn",
    cheapestColor: "text-red-500",
    fourDollarList: "⚠️ Hạn chế",
    fourDollarColor: "text-secondary",
    note: "Tiện lợi 24/7 nhưng giá cao hơn. Dùng GoodRx.",
  },
  {
    name: "Walgreens",
    cheapest: "Đắt nhất",
    cheapestColor: "text-red-500",
    fourDollarList: "❌ Ít",
    fourDollarColor: "text-red-500",
    note: "Tiện lợi nhưng giá cao. Luôn dùng GoodRx.",
  },
];

export interface DentalOptionRow {
  option: string;
  cost: string;
  costColor: string;
  quality: string;
  fitFor: string;
}

export const DENTAL_OPTIONS: DentalOptionRow[] = [
  {
    option: "Dental School Clinics",
    cost: "30–70% rẻ hơn nha khoa thường",
    costColor: "text-accent",
    quality: "Tốt (dưới sự giám sát giáo sư)",
    fitFor: "Mọi người — kiên nhẫn chờ lâu hơn",
  },
  {
    option: "FQHC (Community Health Center)",
    cost: "Sliding scale theo thu nhập",
    costColor: "text-accent",
    quality: "Cơ bản nhưng đủ dùng",
    fitFor: "Thu nhập thấp, không có bảo hiểm",
  },
  {
    option: "Dental Savings Plan",
    cost: "$100–200/năm phí thành viên",
    costColor: "text-secondary",
    quality: "Giảm 15–50% tại nha khoa tham gia",
    fitFor: "Không có bảo hiểm, hay đi nha khoa",
  },
  {
    option: "Standalone Dental Insurance",
    cost: "$15–50/tháng",
    costColor: "text-secondary",
    quality: "Đầy đủ nhất",
    fitFor: "Nếu employer không cung cấp, cần nhiều dịch vụ",
  },
  {
    option: "Nha khoa tư giá trung bình",
    cost: "$100–200/lần khám",
    costColor: "text-red-500",
    quality: "Tốt nhất",
    fitFor: "Có tiền hoặc đã có bảo hiểm nha khoa",
  },
];

export interface YearCalendarRow {
  month: string;
  task: string;
  note: string;
}

export const YEAR_CALENDAR: YearCalendarRow[] = [
  { month: "Tháng 1", task: "Bảo hiểm mới hiệu lực — đặt lịch khám PCP đầu năm", note: "Deductible reset về $0. Tận dụng khám preventive miễn phí." },
  { month: "Tháng 1–6", task: "Khám nha khoa lần 1 trong năm (cleaning)", note: "Nhiều bảo hiểm cover 2 lần cleaning/năm miễn phí." },
  { month: "Tháng 6", task: "Khám mắt hàng năm", note: "Vision insurance thường cover 1 lần/năm." },
  { month: "Tháng 7–12", task: "Khám nha khoa lần 2 trong năm", note: "Dùng hết benefit trước khi reset năm mới." },
  { month: "Tháng 10–11", task: "Open Enrollment — review và thay đổi bảo hiểm nếu cần", note: "So sánh các gói mới cho năm tới." },
  { month: "Tháng 11", task: "Tiêm cúm (flu shot)", note: "Miễn phí 100% với mọi bảo hiểm tại CVS/Walgreens/nhà thuốc." },
];
