// Static reference data for the agency-guide page, ported verbatim from
// agency-guide.html's hardcoded checklist/question-grid content (legacy
// lines 182-227) and the self-assessment quiz criteria (legacy line 257).

export const GOOD_AGENCY_CHECKLIST: string[] = [
  "Giấy phép kinh doanh hợp lệ tại Việt Nam (kiểm tra Sở KHĐT)",
  "Cung cấp tên đầy đủ, địa chỉ, EIN của sponsor Mỹ trước khi ký hợp đồng",
  "Luật sư di trú Mỹ (Attorney) đứng tên nộp I-140 và PERM — hỏi tên luật sư",
  "Hợp đồng song ngữ rõ ràng với điều khoản hoàn tiền (refund policy)",
  "Thanh toán từng đợt theo tiến trình: ký hợp đồng → có case number → LC certified → I-140...",
  "Liên lạc bằng email chính thức, không chỉ Zalo/Messenger",
  "Cung cấp mô tả công việc (Job Description) và mức lương trước khi ký",
  "Có KH thực tế đã đi thành công — xác minh được bằng Case Number",
  "Phí dịch vụ đã bao gồm thuế VAT (từ 2024 được chú ý bởi sở thuế)",
];

export const RED_FLAG_CHECKLIST: string[] = [
  "Hứa đậu 100% hoặc cam kết tỷ lệ thành công tuyệt đối — không agency nào làm được",
  "Hứa làm xong trong 2.5-3 năm truyền thống — không thực tế với VB hiện tại",
  "Thu gần hết tiền ngay từ đầu trước khi có case number",
  "Không cung cấp thông tin sponsor (tên công ty, địa chỉ, loại công việc, mức lương)",
  "Không có hợp đồng hoặc hợp đồng mơ hồ — không có điều khoản hoàn tiền",
  "Chỉ liên lạc qua điện thoại/Zalo — không có email công ty chính thức",
  "Đặt cọc nhỏ, hứa trả phần lớn khi sang Mỹ — chiêu lừa đảo phổ biến",
  "Có post bóc phốt từ cộng đồng — tìm kiếm tên agency + \"lừa đảo\" trên FB/Google",
  "Nói có \"quan hệ\" để làm nhanh — không ai can thiệp được vào DOL/USCIS/DOS",
];

export interface InterviewQuestion {
  text: string;
  why: string;
}

export const QUESTIONS_TO_ASK: InterviewQuestion[] = [
  {
    text: "1. Tên đầy đủ và địa chỉ của công ty bảo trợ (sponsor) Mỹ là gì?",
    why: "→ Phải cung cấp trước khi ký. Nếu từ chối = red flag",
  },
  {
    text: "2. Luật sư di trú (Attorney) nào sẽ đứng tên nộp I-140? Tên và số chứng chỉ?",
    why: "→ Có thể kiểm tra tại USCIS Attorney Search",
  },
  {
    text: "3. Tiến độ thanh toán phí chia như thế nào? Bao nhiêu đợt?",
    why: "→ Tốt nhất là 3-4 đợt theo từng giai đoạn hồ sơ",
  },
  {
    text: "4. Chính sách hoàn tiền nếu hồ sơ thất bại ở từng giai đoạn?",
    why: "→ Phải có trong hợp đồng, không chỉ lời nói miệng",
  },
  {
    text: "5. Bao lâu sau khi ký sẽ có case number? Cam kết bằng văn bản?",
    why: "→ Phải hỏi ngày sponsor có đợt nộp hồ sơ tiếp theo",
  },
  {
    text: "6. Công việc cụ thể là gì? Mô tả công việc (Job Description)?",
    why: "→ Phải biết trước — đây là thông tin bắt buộc trong I-140",
  },
  {
    text: "7. Mức lương (wage/hour) cụ thể là bao nhiêu?",
    why: "→ Phải biết trước phỏng vấn visa — sai thông tin = rớt",
  },
  {
    text: "8. Agency có thể cho xem Case Number của khách hàng cũ đã thành công không?",
    why: "→ Có thể kiểm tra tại flag.dol.gov để xác nhận LC thật",
  },
  {
    text: "9. Phí dịch vụ đã bao gồm phí chính phủ (I-140, DS-260, khám IOM) chưa?",
    why: "→ Nếu chưa, tính thêm ~$3,000-4,000 cho đương đơn",
  },
  {
    text: "10. Hỗ trợ chuyển diện F1 có nằm trong phí dịch vụ không?",
    why: "→ Nếu muốn chuyển diện, đây là câu hỏi quan trọng",
  },
  {
    text: "11. Agency có phải là đơn vị trực tiếp xử lý hồ sơ hay qua trung gian (F2, F3)?",
    why: "→ Qua trung gian = phí tăng, thông tin có thể bị sai lệch",
  },
  {
    text: "12. Khi hồ sơ có vấn đề, ai là người liên lạc trực tiếp? Có email không?",
    why: "→ Email là phương tiện liên lạc chính thức và có bằng chứng",
  },
  {
    text: "13. Trong trường hợp sponsor phá sản, agency sẽ xử lý thế nào?",
    why: "→ Agency tốt sẽ có plan B với sponsor dự phòng",
  },
  {
    text: "14. Phí dịch vụ đã bao gồm VAT chưa? Có hóa đơn hợp lệ không?",
    why: "→ Từ 2024 cơ quan thuế Việt Nam chú ý đến dịch vụ di trú",
  },
  {
    text: "15. Thời điểm hiện tại, agency đang có bao nhiêu KH đã có case number nhưng chưa phỏng vấn?",
    why: "→ Cho biết năng lực xử lý thực tế và chất lượng sponsor",
  },
];

/** Self-assessment quiz criteria (legacy `criteria` array, line 257). */
export const SCORE_CRITERIA: string[] = [
  "Có giấy phép kinh doanh hợp lệ",
  "Cung cấp thông tin sponsor trước khi ký",
  "Luật sư di trú Mỹ đứng tên I-140",
  "Hợp đồng song ngữ rõ ràng + điều khoản hoàn tiền",
  "Thanh toán từng đợt theo tiến trình",
  "Có email chính thức (không chỉ Zalo)",
  "Có KH thực tế có thể xác minh được",
  "Không hứa đậu 100% hay làm siêu nhanh",
];
