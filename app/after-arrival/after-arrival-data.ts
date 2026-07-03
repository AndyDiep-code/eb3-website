/**
 * Checklist data ported verbatim from after-arrival.html's inline `PHASES`
 * array (within the <script> block). Tag keys map 1:1 to the legacy
 * tag-urgent/tag-money/tag-docs/tag-free CSS classes.
 */
export type ChecklistTag = "urgent" | "money" | "docs" | "free";

export interface ArrivalChecklistItem {
  id: string;
  task: string;
  detailHtml: string;
  tags: ChecklistTag[];
}

export interface ArrivalPhase {
  id: "w1" | "m1" | "m3" | "long";
  icon: string;
  title: string;
  sub: string;
  items: ArrivalChecklistItem[];
}

export const ARRIVAL_PHASES: ArrivalPhase[] = [
  {
    id: "w1",
    icon: "🚨",
    title: "Tuần 1 — Việc Khẩn Cấp",
    sub: "Phải hoàn thành trong 7 ngày đầu tiên",
    items: [
      {
        id: "w1_employer",
        task: "Báo cáo ngày đến với hãng bảo trợ (Sponsor)",
        detailHtml:
          'Liên hệ <b>ngay trong ngày đầu tiên</b> hoặc sớm nhất có thể. Xác nhận ngày bắt đầu làm việc, địa chỉ nhà máy, và người liên hệ HR.',
        tags: ["urgent", "docs"],
      },
      {
        id: "w1_ssn",
        task: "Xin số An Sinh Xã Hội (SSN) tại văn phòng SSA",
        detailHtml:
          'Mang theo: <b>Passport + Thẻ xanh + I-94</b>. Tìm văn phòng SSA gần nhất tại <a href="https://www.ssa.gov/locator/" target="_blank" rel="noopener noreferrer">ssa.gov/locator</a>. Thẻ SSN gửi qua bưu điện sau 2–4 tuần. Không cần thẻ mới — số SSN là đủ để đi làm.',
        tags: ["urgent", "docs"],
      },
      {
        id: "w1_sim",
        task: "Mua SIM điện thoại Mỹ (T-Mobile / AT&T prepaid)",
        detailHtml:
          "T-Mobile prepaid: ~$30/tháng (unlimited). Cần SIM để nhận OTP ngân hàng và liên lạc công việc. Mua tại T-Mobile store hoặc Walmart. Chưa cần hợp đồng — prepaid là đủ ban đầu.",
        tags: ["urgent", "money"],
      },
      {
        id: "w1_bank",
        task: "Mở tài khoản ngân hàng (Chase / Bank of America)",
        detailHtml:
          "Mang: <b>Passport + Thẻ xanh + địa chỉ cư trú + SIM điện thoại</b>. Chase và Bank of America phổ biến, có nhánh rộng khắp. Mở <b>Checking account</b> để nhận lương. Không cần SSN card — chỉ cần số SSN (có thể biết từ SSA). Đăng ký <b>direct deposit</b> với HR ngay sau đó.",
        tags: ["urgent", "money"],
      },
      {
        id: "w1_housing",
        task: "Xác nhận chỗ ở tạm (nếu chưa có)",
        detailHtml:
          'Nếu chưa có nhà, liên hệ cộng đồng người Việt địa phương qua Facebook group "<b>Người Việt tại [tên thành phố]</b>". Nhiều người chia sẻ phòng ($400–600/người/tháng) với cộng đồng EB3 mới sang. Tránh ký hợp đồng thuê dài hạn trong tháng đầu.',
        tags: ["urgent"],
      },
      {
        id: "w1_orientation",
        task: "Tham gia buổi orientation của hãng (nếu có)",
        detailHtml:
          "Hãng bảo trợ thường có buổi định hướng (orientation) cho nhân viên mới: giới thiệu nhà máy, quy trình an toàn, điền giấy tờ HR (W-4, I-9, direct deposit form). Đem đầy đủ giấy tờ tùy thân.",
        tags: ["urgent", "docs"],
      },
    ],
  },
  {
    id: "m1",
    icon: "📋",
    title: "Tháng 1 — Ổn Định Cơ Bản",
    sub: "Hoàn thành trong 30 ngày đầu tiên",
    items: [
      {
        id: "m1_license_study",
        task: "Bắt đầu ôn thi bằng lái xe ngay",
        detailHtml:
          'Vào <a href="/dmv" target="_blank" rel="noopener noreferrer">EB3VIET — Ôn Thi Bằng Lái</a> để chọn tiểu bang và bắt đầu học. Sách lý thuyết (Driver\'s Handbook) tải miễn phí từ website DMV tiểu bang. Nhiều bang có thi bằng <b>tiếng Việt</b> — hỏi trực tiếp tại DMV.',
        tags: ["docs"],
      },
      {
        id: "m1_license_test",
        task: "Thi bằng lái xe (Knowledge Test tại DMV)",
        detailHtml:
          "Mang: <b>Passport + Thẻ xanh + bằng chứng địa chỉ (utility bill / lease)</b>. Đặt lịch trước tại website DMV. Sau khi đậu nhận Learner's Permit, sau đó thi thực hành để lấy bằng đầy đủ. Lệ phí: $18–$50 tùy bang.",
        tags: ["docs", "money"],
      },
      {
        id: "m1_car",
        task: "Mua xe cũ ($7,000–$12,000)",
        detailHtml:
          "Không cần xe quá mới — <b>Toyota Camry / Honda Accord 2013–2018</b> là lựa chọn tốt nhất. Mua từ dealer hoặc Facebook Marketplace. Luôn kiểm tra Carfax ($40) và nhờ thợ kiểm tra trước khi mua. Xe dưới $5,000 thường tốn tiền sửa nhiều hơn tiền xe.",
        tags: ["money"],
      },
      {
        id: "m1_insurance_car",
        task: "Mua bảo hiểm xe (bắt buộc theo luật)",
        detailHtml:
          "So sánh giá trên <b>Progressive, Geico, State Farm</b>. Bảo hiểm tối thiểu (liability only): $80–$150/tháng. Cần bằng lái + thông tin xe để mua. Một số công ty yêu cầu credit score — nếu chưa có thể dùng bằng VN để mua bảo hiểm.",
        tags: ["money", "urgent"],
      },
      {
        id: "m1_w4",
        task: "Điền đúng W-4 với HR để khấu trừ thuế phù hợp",
        detailHtml:
          "W-4 quyết định bao nhiêu thuế bị khấu trừ từ lương. Nếu có vợ/chồng và con cái, khai <b>Married Filing Jointly</b> để giảm khấu trừ. Khuyến nghị: để HR giúp điền. Có thể điều chỉnh lại bất cứ lúc nào.",
        tags: ["docs", "money"],
      },
      {
        id: "m1_health_ins",
        task: "Đăng ký bảo hiểm y tế trong 30 ngày đầu",
        detailHtml:
          "Hãng bảo trợ thường có gói bảo hiểm — hỏi HR ngay. Nếu lương thấp, đăng ký <b>Medicaid</b> (miễn phí hoặc rất rẻ) tại healthcare.gov. Đừng trì hoãn — bảo hiểm y tế Mỹ rất quan trọng, một ca cấp cứu không bảo hiểm có thể lên đến $10,000+.",
        tags: ["money", "urgent"],
      },
      {
        id: "m1_address",
        task: "Cập nhật địa chỉ với USPS và các tổ chức liên quan",
        detailHtml:
          'Vào <a href="https://moversguide.usps.com/" target="_blank" rel="noopener noreferrer">USPS Change of Address</a> để chuyển hướng thư. Cập nhật địa chỉ với: SSA (ssa.gov), ngân hàng, hãng bảo trợ, agency EB3. Thẻ xanh gửi về địa chỉ đã đăng ký — đảm bảo địa chỉ đúng.',
        tags: ["docs"],
      },
      {
        id: "m1_community",
        task: "Kết nối với cộng đồng người Việt địa phương",
        detailHtml:
          'Tìm group Facebook "<b>Người Việt tại [tên thành phố]</b>". Cộng đồng sẽ giúp: mua xe, tìm nhà, gợi ý bác sĩ Việt, supermarket Á châu, nhà thờ/chùa. Đừng cô đơn — người Việt ở đâu cũng có và rất sẵn lòng giúp nhau.',
        tags: ["free"],
      },
    ],
  },
  {
    id: "m3",
    icon: "📈",
    title: "Tháng 3 — Phát Triển Ổn Định",
    sub: "Hoàn thành trong 3 tháng đầu tiên",
    items: [
      {
        id: "m3_credit",
        task: "Bắt đầu xây dựng Credit Score",
        detailHtml:
          "Mở <b>Secured Credit Card</b> (đặt cọc $200–500, được card với hạn mức tương đương). Các ngân hàng như Capital One, Discover có card dành riêng cho người mới. <b>Dùng đều đặn và trả full mỗi tháng</b> — sau 6–12 tháng credit score sẽ đủ để vay xe, thuê nhà tốt hơn.",
        tags: ["money"],
      },
      {
        id: "m3_lease",
        task: "Tìm nhà thuê dài hạn (nếu đang thuê tạm)",
        detailHtml:
          "Sau khi có bằng lái + SSN + 1 tháng pay stub, dễ dàng ký lease hơn. Tìm nhà trên <b>Zillow, Apartments.com, Craigslist</b> hoặc qua cộng đồng Việt. Cần: SSN + bằng chứng thu nhập (3x tiền thuê/tháng) + cọc 1 tháng.",
        tags: ["money"],
      },
      {
        id: "m3_tax",
        task: "Hiểu về khai thuế (Tax Return) cho năm tới",
        detailHtml:
          "Deadline khai thuế: <b>15 tháng 4 hàng năm</b>. Dùng <b>TurboTax Free Edition</b> (nếu thu nhập đơn giản) hoặc nhờ cộng đồng Việt giới thiệu accountant. Nếu có con nhỏ, có thể nhận <b>Child Tax Credit $2,000/con</b>. Không bỏ qua — có thể được hoàn thuế $1,000–3,000+.",
        tags: ["money", "docs"],
      },
      {
        id: "m3_esl",
        task: "Đăng ký lớp ESL (học tiếng Anh miễn phí)",
        detailHtml:
          'Hầu hết Community College và thư viện công cộng có lớp ESL <b>miễn phí</b>. Tìm tại <a href="https://usalearns.org" target="_blank" rel="noopener noreferrer">USALearns.org</a> (online, miễn phí). Tiếng Anh là chìa khóa để thăng tiến và tự lập ở Mỹ.',
        tags: ["free"],
      },
      {
        id: "m3_chip",
        task: "Đăng ký Medicaid/CHIP cho trẻ em (nếu có con)",
        detailHtml:
          "Con cái thường đủ điều kiện nhận <b>CHIP (Children's Health Insurance)</b> miễn phí hoặc chi phí rất thấp. Đăng ký tại Healthcare.gov hoặc văn phòng Medicaid của tiểu bang. Deadline: trong 60 ngày sau khi đến Mỹ.",
        tags: ["free", "urgent"],
      },
      {
        id: "m3_school",
        task: "Đăng ký trường cho con (nếu có con 5–18 tuổi)",
        detailHtml:
          "Trường công lập K-12 <b>hoàn toàn miễn phí</b>. Liên hệ văn phòng school district địa phương. Cần mang: bằng chứng địa chỉ + giấy tờ tiêm chủng + hộ chiếu/khai sinh. Nhiều trường có chương trình ESL và hỗ trợ học sinh nhập cư.",
        tags: ["free"],
      },
      {
        id: "m3_ivytech",
        task: "Tìm hiểu Community College gần nhà",
        detailHtml:
          "Sau khi ổn định, có thể đăng ký học nghề hoặc cải thiện kỹ năng tại Community College. Chi phí $1,000–5,000/năm (thấp hơn nhiều so với đại học). Nhiều trường có chương trình buổi tối phù hợp cho người đi làm toàn thời gian.",
        tags: ["money"],
      },
    ],
  },
  {
    id: "long",
    icon: "🎯",
    title: "Lâu Dài — Hướng Đến Tương Lai",
    sub: "Sau 6 tháng và hướng đến quốc tịch",
    items: [
      {
        id: "long_1year",
        task: "Hoàn thành 1 năm làm việc cho hãng bảo trợ",
        detailHtml:
          "Đây là cam kết pháp lý trong hợp đồng EB-3. Sau 1 năm bạn <b>tự do tìm việc khác</b>. Gợi ý: tiếp tục thêm 6 tháng nữa để có thành tích tốt — giúp khi thi quốc tịch và xin việc tốt hơn.",
        tags: ["urgent"],
      },
      {
        id: "long_renew",
        task: "Gia hạn thẻ xanh (sau 10 năm)",
        detailHtml:
          "Thẻ xanh có giá trị 10 năm. Nộp I-90 để gia hạn trước khi hết hạn 6 tháng. Phí: $540. Làm online tại uscis.gov.",
        tags: ["docs", "money"],
      },
      {
        id: "long_citizen",
        task: "Thi quốc tịch Mỹ (sau 5 năm ở Mỹ)",
        detailHtml:
          "Điều kiện: cư trú Mỹ ≥5 năm (≥3 năm nếu kết hôn với công dân Mỹ), ≥30 tháng thực tế ở Mỹ trong 5 năm. Nộp N-400 (online: $725). Thi 100 câu hỏi civic + phỏng vấn tiếng Anh. Sau khi đậu: <b>con dưới 18 tuổi tự động có quốc tịch!</b>",
        tags: ["docs", "money"],
      },
      {
        id: "long_family",
        task: "Bảo lãnh thân nhân (sau khi có quốc tịch)",
        detailHtml:
          "Công dân Mỹ có thể bảo lãnh: vợ/chồng, con, cha mẹ, anh chị em. Bảo lãnh vợ/chồng và con dưới 21t: thường chỉ 1–2 năm. Bảo lãnh cha mẹ: có thể trong vòng 1 năm sau khi có quốc tịch.",
        tags: ["docs"],
      },
      {
        id: "long_house",
        task: "Mua nhà (sau 2–3 năm có credit score ổn)",
        detailHtml:
          'FHA Loan yêu cầu: credit score ≥580, đặt cọc 3.5%. Conventional loan: credit ≥620, đặt cọc 3–20%. Gặp HUD-approved housing counselor (miễn phí) tại <a href="https://www.hud.gov/find_a_housing_counselor" target="_blank" rel="noopener noreferrer">hud.gov</a>.',
        tags: ["money"],
      },
    ],
  },
];

export const TAG_LABELS: Record<ChecklistTag, string> = {
  urgent: "🔴 Ưu tiên cao",
  money: "💰 Liên quan tiền",
  docs: "📋 Giấy tờ",
  free: "🟢 Miễn phí",
};

export const TAG_CLASSES: Record<ChecklistTag, string> = {
  urgent: "bg-red-700/20 text-red-600",
  money: "bg-secondary/20 text-secondary",
  docs: "bg-primary/20 text-primary",
  free: "bg-accent/20 text-accent",
};

export const PHASE_PILL_CLASSES: Record<ArrivalPhase["id"], string> = {
  w1: "bg-accent/20 text-accent",
  m1: "bg-primary/20 text-primary",
  m3: "bg-secondary/20 text-secondary",
  long: "bg-border text-text-muted",
};

export const PHASE_HEADER_CLASSES: Record<ArrivalPhase["id"], string> = {
  w1: "border-accent bg-gradient-to-br from-accent/10 to-accent/20",
  m1: "border-primary bg-gradient-to-br from-primary/10 to-primary/20",
  m3: "border-secondary bg-gradient-to-br from-secondary/10 to-secondary/20",
  long: "border-border bg-bg-alt",
};

export const PHASE_SUB_CLASSES: Record<ArrivalPhase["id"], string> = {
  w1: "text-accent",
  m1: "text-primary",
  m3: "text-secondary",
  long: "text-text-muted",
};
