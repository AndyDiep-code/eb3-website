// Static reference data for emergency-guide tabs — ported from
// emergency-guide.html's .ref-table rows (#tab-hospital, #tab-911).

export interface CareOptionRow {
  situation: string;
  whereToGo: string;
  whereColor: string;
  cost: string;
  costColor: string;
}

export const CARE_OPTIONS: CareOptionRow[] = [
  {
    situation: "Đau ngực, khó thở, đột quỵ, tai nạn nặng, mất ý thức",
    whereToGo: "ER — Gọi 911 ngay",
    whereColor: "text-red-500",
    cost: "$1,000–$10,000+",
    costColor: "text-red-500",
  },
  {
    situation: "Vết thương cần khâu, gãy xương, sốt cao >103°F, nhiễm trùng",
    whereToGo: "Urgent Care",
    whereColor: "text-secondary",
    cost: "$150–$500",
    costColor: "text-secondary",
  },
  {
    situation: "Cảm lạnh, đau đầu, kiểm tra sức khỏe định kỳ, tái khám",
    whereToGo: "Bác sĩ gia đình / Clinic",
    whereColor: "text-accent",
    cost: "$50–$200",
    costColor: "text-accent",
  },
  {
    situation: "Câu hỏi y tế không khẩn cấp",
    whereToGo: "Telemedicine (gặp bác sĩ online)",
    whereColor: "text-primary",
    cost: "$0–$75",
    costColor: "text-primary",
  },
];

export interface CallNumberRow {
  situation: string;
  number: string;
}

export const CALL_911_VS_311: CallNumberRow[] = [
  { situation: "Tai nạn xe, người bị thương", number: "911" },
  { situation: "Cháy nhà, khói", number: "911" },
  { situation: "Nghi ngờ có người đột nhập vào nhà", number: "911" },
  { situation: "Ai đó bất tỉnh, không thở", number: "911" },
  { situation: "Nguy hiểm tính mạng ngay lập tức", number: "911" },
  { situation: "Báo cáo xe bị trộm (không còn xảy ra)", number: "311 hoặc đồn cảnh sát" },
  { situation: "Thắc mắc về dịch vụ thành phố", number: "311" },
  { situation: "Hàng xóm làm ồn", number: "311 hoặc non-emergency police" },
];

export interface EmergencyContactRow {
  agency: string;
  phone: string;
  usage: string;
}

export const EMERGENCY_CONTACTS: EmergencyContactRow[] = [
  { agency: "Poison Control", phone: "1-800-222-1222", usage: "Nuốt phải hóa chất, ngộ độc thuốc (24/7)" },
  { agency: "Crisis / Tự Tử", phone: "988", usage: "Sức khỏe tâm thần khủng hoảng (có tiếng Việt)" },
  { agency: "Human Trafficking", phone: "1-888-373-7888", usage: "Bị bóc lột, kiểm soát, đe dọa (24/7)" },
  { agency: "DOL Wage Theft", phone: "1-866-487-9243", usage: "Ăn cắp lương, không trả OT" },
  { agency: "OSHA", phone: "1-800-321-6742", usage: "Tai nạn lao động, điều kiện nguy hiểm" },
  { agency: "Legal Aid", phone: "lawhelp.org", usage: "Tư vấn pháp lý miễn phí theo tiểu bang" },
];
