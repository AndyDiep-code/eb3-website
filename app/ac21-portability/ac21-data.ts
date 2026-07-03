// Static reference tables for the AC21 portability page, ported verbatim
// from ac21-portability.html's hardcoded <table> rows (Tab 2 "same or
// similar" SOC examples/groups, Tab 4 "when you need a lawyer" matrix).

export const SIMILAR_JOB_EXAMPLES = [
  {
    oldJob: "Công nhân chế biến gà (poultry)",
    newJob: "Công nhân chế biến cá / hải sản",
    result: "✅ OK",
    resultColor: "text-accent",
    reason: "Cùng nhóm SOC 51-3020 (food processing)",
  },
  {
    oldJob: "Công nhân nhà máy thực phẩm",
    newJob: "Công nhân nhà máy thực phẩm khác",
    result: "✅ OK",
    resultColor: "text-accent",
    reason: "Cùng SOC 51-3000 (food manufacturing)",
  },
  {
    oldJob: "Housekeeper khách sạn",
    newJob: "Housekeeper resort / khách sạn khác",
    result: "✅ OK",
    resultColor: "text-accent",
    reason: "Cùng SOC 37-2012 (maids and housekeeping)",
  },
  {
    oldJob: "Công nhân kho bãi (warehouse)",
    newJob: "Picker/packer, order fulfillment",
    result: "✅ OK",
    resultColor: "text-accent",
    reason: "Cùng nhóm SOC 53-7065 (stock clerks)",
  },
  {
    oldJob: "Chăm sóc người cao tuổi (CNA)",
    newJob: "Home health aide, assisted living aide",
    result: "✅ OK",
    resultColor: "text-accent",
    reason: "Cùng SOC 31-1010 (nursing assistants)",
  },
  {
    oldJob: "Công nhân nhà máy thực phẩm",
    newJob: "Nhân viên bếp nhà hàng (line cook)",
    result: "⚠️ Cần xem xét",
    resultColor: "text-secondary",
    reason: "Khác nhóm SOC, nhưng kỹ năng tương tự — cần tư vấn luật sư",
  },
  {
    oldJob: "Công nhân nhà máy",
    newJob: "Nhân viên văn phòng / kế toán",
    result: "❌ KHÔNG OK",
    resultColor: "text-red-600",
    reason: "Khác nhóm SOC hoàn toàn, kỹ năng không tương đồng",
  },
  {
    oldJob: "Housekeeper",
    newJob: "Tài xế giao hàng",
    result: "❌ KHÔNG OK",
    resultColor: "text-red-600",
    reason: "Khác nhóm SOC, điều kiện làm việc khác biệt",
  },
];

export const SOC_GROUPS = [
  { code: "51-3020", group: "Food processing workers", example: "Poultry, fish, meat processing" },
  { code: "51-3000", group: "Food manufacturing (nhóm rộng)", example: "Bất kỳ sản xuất thực phẩm" },
  { code: "37-2012", group: "Maids & housekeeping cleaners", example: "Hotel, resort, cleaning" },
  { code: "53-7065", group: "Stock clerks & order fillers", example: "Warehouse, Amazon, fulfillment" },
  { code: "31-1010", group: "Nursing assistants", example: "CNA, home health aide, elder care" },
  { code: "49-9000", group: "Installation/maintenance/repair", example: "Equipment maintenance, mechanic" },
];

export const LAWYER_SITUATIONS = [
  {
    situation: "I-485 chưa đủ 180 ngày, employer đóng cửa",
    action: "Tư vấn luật sư immigration ngay",
    actionColor: "text-secondary",
  },
  {
    situation: "Employer đe dọa sau khi bạn muốn nghỉ",
    action: "Gọi DOL 1-866-487-9243 + luật sư",
    actionColor: "text-red-600",
  },
  {
    situation: "USCIS gửi RFE về AC21 portability",
    action: "Cần luật sư soạn response",
    actionColor: "text-secondary",
  },
  {
    situation: "Không chắc việc mới có \"tương tự\" không",
    action: "Hỏi Legal Aid miễn phí trước",
    actionColor: "text-primary",
  },
  {
    situation: "Employer giữ lương hoặc không trả đủ",
    action: "DOL 1-866-487-9243",
    actionColor: "text-red-600",
  },
];
