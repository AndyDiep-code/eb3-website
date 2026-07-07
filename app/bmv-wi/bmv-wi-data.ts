import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const WI_PASS_COUNT = 16;

export const WI_QUESTIONS: QuizQuestion[] = [
  {
    en: "What is the speed limit in a Wisconsin residential area?",
    vi: "Giới hạn tốc độ khu dân cư Wisconsin là bao nhiêu?",
    opts: [
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
    ],
    ans: 1,
    exp: {
      en: "The default speed limit in Wisconsin residential areas is 25 mph unless posted otherwise.",
      vi: "Tốc độ mặc định khu dân cư Wisconsin là 25 mph trừ khi có biển báo khác.",
    },
  },
  {
    en: "Wisconsin refers to drunk driving as:",
    vi: "Wisconsin gọi lái xe say rượu là gì?",
    opts: [
      { en: "DUI", vi: "DUI" },
      { en: "DWI", vi: "DWI" },
      { en: "OWI — Operating While Intoxicated", vi: "OWI — Operating While Intoxicated" },
      { en: "BWI", vi: "BWI" },
    ],
    ans: 2,
    exp: {
      en: "Wisconsin uses the term OWI (Operating While Intoxicated), not DUI. BAC of 0.08% or higher is illegal for adults.",
      vi: "Wisconsin dùng thuật ngữ OWI (Operating While Intoxicated). BAC ≥0.08% là phạm pháp với người lớn.",
    },
  },
  {
    en: "In Wisconsin, the school zone speed limit when children are present is:",
    vi: "Giới hạn tốc độ khu trường học Wisconsin khi có trẻ em?",
    opts: [
      { en: "10 mph", vi: "10 mph" },
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
    ],
    ans: 1,
    exp: {
      en: "Wisconsin school zones have a speed limit of 15 mph when the flashing yellow lights are active or children are present.",
      vi: "Khu trường học Wisconsin: 15 mph khi đèn vàng nhấp nháy hoặc có trẻ em.",
    },
  },
  {
    en: "What is the default speed limit on Wisconsin interstate highways?",
    vi: "Giới hạn tốc độ mặc định trên cao tốc Wisconsin?",
    opts: [
      { en: "55 mph", vi: "55 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
    ],
    ans: 2,
    exp: {
      en: "Wisconsin interstate highways have a default speed limit of 70 mph for passenger vehicles.",
      vi: "Cao tốc Wisconsin có giới hạn mặc định 70 mph cho xe hơi thông thường.",
    },
  },
  {
    en: "Is wearing a motorcycle helmet required for adult riders in Wisconsin?",
    vi: "Có bắt buộc đội mũ bảo hiểm xe máy cho người lớn ở Wisconsin không?",
    opts: [
      { en: "Yes, for all riders", vi: "Có, cho tất cả" },
      { en: "No, not required for riders 18 and older", vi: "Không, không bắt buộc cho người từ 18t trở lên" },
      { en: "Only required on highways", vi: "Chỉ bắt buộc trên cao tốc" },
      { en: "Only for passengers", vi: "Chỉ cho hành khách" },
    ],
    ans: 1,
    exp: {
      en: "Wisconsin does NOT require motorcycle helmets for riders 18 and older, but it is strongly recommended.",
      vi: "Wisconsin KHÔNG bắt buộc mũ bảo hiểm cho người từ 18 tuổi trở lên, nhưng rất nên đội.",
    },
  },
  {
    en: "What does OWI stand for in Wisconsin?",
    vi: "OWI ở Wisconsin có nghĩa là gì?",
    opts: [
      { en: "Ordinary Weekend Infraction", vi: "Ordinary Weekend Infraction" },
      { en: "Operating While Intoxicated", vi: "Operating While Intoxicated" },
      { en: "Overweight Vehicle Incident", vi: "Overweight Vehicle Incident" },
      { en: "Outdoor Work Injury", vi: "Outdoor Work Injury" },
    ],
    ans: 1,
    exp: {
      en: "OWI stands for Operating While Intoxicated — Wisconsin's term for drunk or impaired driving.",
      vi: "OWI = Operating While Intoxicated — thuật ngữ Wisconsin cho lái xe say rượu/ma túy.",
    },
  },
  {
    en: "When approaching a school bus with flashing red lights in Wisconsin, you must:",
    vi: "Khi tiếp cận xe buýt trường học đèn đỏ nhấp nháy ở Wisconsin bạn phải:",
    opts: [
      { en: "Slow to 20 mph", vi: "Giảm còn 20 mph" },
      { en: "Stop and wait until the bus resumes or lights stop", vi: "Dừng và chờ đến khi xe buýt đi hoặc đèn tắt" },
      { en: "Honk and pass", vi: "Bấm còi và vượt" },
      { en: "Stop only from behind", vi: "Chỉ dừng nếu ở phía sau" },
    ],
    ans: 1,
    exp: {
      en: "You must stop in both directions when a school bus has flashing red lights, unless separated by a median.",
      vi: "Phải dừng cả 2 chiều khi xe buýt đèn đỏ nhấp nháy, trừ khi có dải phân cách.",
    },
  },
  {
    en: "What is Wisconsin's Move Over Law?",
    vi: "Luật Move Over Wisconsin yêu cầu gì?",
    opts: [
      { en: "Move to the left lane whenever you want", vi: "Chuyển sang làn trái bất cứ khi nào" },
      {
        en: "Move over or slow down 20 mph when passing emergency or service vehicles stopped on the shoulder",
        vi: "Chuyển làn hoặc giảm 20 mph khi qua xe cứu thương/dịch vụ dừng ven đường",
      },
      { en: "Stop completely", vi: "Dừng hoàn toàn" },
      { en: "Only applies to police", vi: "Chỉ áp dụng cho cảnh sát" },
    ],
    ans: 1,
    exp: {
      en: "Wisconsin's Move Over Law requires moving over one lane OR slowing down 20 mph below the posted limit when passing stopped emergency, tow, or utility vehicles.",
      vi: "Luật Move Over WI: chuyển làn HOẶC giảm 20 mph khi qua xe cứu thương/kéo dừng ven đường.",
    },
  },
  {
    en: "What is the BAC limit for drivers under 21 in Wisconsin?",
    vi: "Giới hạn BAC cho tài xế dưới 21 tuổi ở Wisconsin?",
    opts: [
      { en: "0.08%", vi: "0.08%" },
      { en: "0.04%", vi: "0.04%" },
      { en: "0.02%", vi: "0.02%" },
      { en: "Any detectable amount (0.00%)", vi: "Bất kỳ lượng nào phát hiện được (0.00%)" },
    ],
    ans: 3,
    exp: {
      en: "Wisconsin uses a zero-tolerance policy for drivers under 21 — any detectable BAC results in OWI charges.",
      vi: "Wisconsin zero-tolerance dưới 21 tuổi — bất kỳ BAC nào phát hiện được đều bị OWI.",
    },
  },
  {
    en: "In Wisconsin, when must headlights be used?",
    vi: "Khi nào phải bật đèn pha ở Wisconsin?",
    opts: [
      { en: "Only at night", vi: "Chỉ ban đêm" },
      {
        en: "From 30 minutes after sunset to 30 minutes before sunrise, and when rain/fog reduces visibility",
        vi: "Từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương giảm tầm nhìn",
      },
      { en: "Only in fog", vi: "Chỉ trong sương mù" },
      { en: "On highways only", vi: "Chỉ trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "Headlights required 30 min after sunset to 30 min before sunrise, and when weather reduces visibility.",
      vi: "Đèn pha bắt buộc từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi thời tiết xấu.",
    },
  },
  {
    en: "Seat belts in Wisconsin are required for:",
    vi: "Dây an toàn ở Wisconsin bắt buộc cho ai?",
    opts: [
      { en: "Only the driver", vi: "Chỉ tài xế" },
      { en: "Driver and front passengers", vi: "Tài xế và hành khách ghế trước" },
      { en: "All vehicle occupants", vi: "Tất cả người trong xe" },
      { en: "Only children", vi: "Chỉ trẻ em" },
    ],
    ans: 2,
    exp: {
      en: "Wisconsin law requires all vehicle occupants to wear seat belts regardless of where they sit.",
      vi: "Luật Wisconsin: tất cả người trong xe phải thắt dây an toàn bất kể ngồi đâu.",
    },
  },
  {
    en: "What does a flashing red light mean in Wisconsin?",
    vi: "Đèn đỏ nhấp nháy có nghĩa là gì ở Wisconsin?",
    opts: [
      { en: "Yield", vi: "Nhường đường" },
      { en: "Stop completely, yield, then proceed when safe", vi: "Dừng hoàn toàn, nhường, rồi đi khi an toàn" },
      { en: "Speed up", vi: "Tăng tốc" },
      { en: "No pedestrians allowed", vi: "Cấm người đi bộ" },
    ],
    ans: 1,
    exp: {
      en: "A flashing red light in Wisconsin means treat it like a STOP sign — come to a complete stop, yield, then go when safe.",
      vi: "Đèn đỏ nhấp nháy WI = biển STOP: dừng hoàn toàn, nhường, rồi đi khi an toàn.",
    },
  },
  {
    en: "At a 4-way stop in Wisconsin, if two vehicles arrive at the same time:",
    vi: "Ngã tư STOP 4 chiều WI, 2 xe đến cùng lúc:",
    opts: [
      { en: "Largest vehicle goes first", vi: "Xe lớn nhất đi trước" },
      { en: "Vehicle on the right has right-of-way", vi: "Xe ở bên phải có quyền ưu tiên" },
      { en: "Vehicle going straight goes first", vi: "Xe đi thẳng đi trước" },
      { en: "Honk to establish right-of-way", vi: "Bấm còi để xác lập quyền ưu tiên" },
    ],
    ans: 1,
    exp: {
      en: "When two vehicles arrive at a 4-way stop simultaneously, yield to the vehicle on your right.",
      vi: "Khi 2 xe đến cùng lúc: nhường xe ở bên phải bạn.",
    },
  },
  {
    en: "What is the minimum following distance recommended in Wisconsin?",
    vi: "Khoảng cách theo sau tối thiểu được khuyến nghị ở Wisconsin?",
    opts: [
      { en: "1 second", vi: "1 giây" },
      { en: "2 seconds", vi: "2 giây" },
      { en: "3 seconds", vi: "3 giây" },
      { en: "4 seconds", vi: "4 giây" },
    ],
    ans: 2,
    exp: {
      en: "Wisconsin recommends a minimum 3-second following distance under normal conditions.",
      vi: "Wisconsin khuyến nghị tối thiểu 3 giây trong điều kiện bình thường.",
    },
  },
  {
    en: "In Wisconsin, you may turn right on red:",
    vi: "Ở Wisconsin, được rẽ phải khi đèn đỏ:",
    opts: [
      { en: "Never", vi: "Không bao giờ" },
      {
        en: "After stopping completely and yielding, unless a sign prohibits it",
        vi: "Sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm",
      },
      { en: "Without stopping if clear", vi: "Không cần dừng nếu đường trống" },
      { en: "Only with a green arrow", vi: "Chỉ khi có mũi tên xanh" },
    ],
    ans: 1,
    exp: {
      en: "Right on red is allowed after a complete stop and yielding, unless a NO TURN ON RED sign is posted.",
      vi: "Rẽ phải khi đèn đỏ: được phép sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm.",
    },
  },
  {
    en: "What should you do when an emergency vehicle approaches with lights and siren?",
    vi: "Phải làm gì khi xe cứu thương/cảnh sát tiến lại với đèn còi?",
    opts: [
      { en: "Speed up to clear the road", vi: "Tăng tốc để thoát đường" },
      { en: "Pull to the right and stop", vi: "Kéo vào lề phải và dừng" },
      { en: "Continue driving", vi: "Tiếp tục lái xe" },
      { en: "Move to the left", vi: "Chuyển sang trái" },
    ],
    ans: 1,
    exp: {
      en: "Pull to the right edge of the road and stop. Wait until the emergency vehicle has passed.",
      vi: "Kéo vào lề phải và dừng. Chờ xe cứu thương qua hết.",
    },
  },
  {
    en: "What is the penalty for a first OWI offense in Wisconsin?",
    vi: "Hình phạt OWI lần đầu ở Wisconsin?",
    opts: [
      { en: "Warning only", vi: "Chỉ cảnh cáo" },
      {
        en: "Fine of $150-$300, license revocation 6-9 months, possible ignition interlock",
        vi: "Phạt $150-$300, thu bằng 6-9 tháng, có thể cần thiết bị khoá máy",
      },
      { en: "Small fine only", vi: "Chỉ phạt tiền nhỏ" },
      { en: "Automatic 1-year jail", vi: "Tự động tù 1 năm" },
    ],
    ans: 1,
    exp: {
      en: "First OWI in Wisconsin: fine $150-$300 plus surcharges, license revoked 6-9 months, possible ignition interlock device required.",
      vi: "OWI lần đầu WI: phạt $150-$300 cộng phụ phí, thu bằng 6-9 tháng, có thể cần thiết bị khoá máy.",
    },
  },
  {
    en: "In Wisconsin, when is it legal to pass on the right?",
    vi: "Khi nào được vượt bên phải ở Wisconsin?",
    opts: [
      { en: "Never", vi: "Không bao giờ" },
      {
        en: "On multi-lane roads or when the vehicle ahead is turning left",
        vi: "Trên đường nhiều làn hoặc khi xe trước rẽ trái",
      },
      { en: "Whenever it feels safe", vi: "Bất cứ khi nào cảm thấy an toàn" },
      { en: "Only at night", vi: "Chỉ ban đêm" },
    ],
    ans: 1,
    exp: {
      en: "Passing on the right is legal on roads with two or more lanes in the same direction, or when the vehicle ahead is turning left.",
      vi: "Vượt bên phải hợp pháp trên đường nhiều làn hoặc khi xe trước rẽ trái.",
    },
  },
  {
    en: "What does a yellow diamond-shaped sign indicate?",
    vi: "Biển hình thoi vàng chỉ điều gì?",
    opts: [
      { en: "A mandatory regulation", vi: "Quy định bắt buộc" },
      { en: "A warning about road hazards or conditions ahead", vi: "Cảnh báo về nguy hiểm hoặc điều kiện đường phía trước" },
      { en: "Information about services", vi: "Thông tin về dịch vụ" },
      { en: "A construction zone always", vi: "Luôn là khu xây dựng" },
    ],
    ans: 1,
    exp: {
      en: "Yellow diamond signs are warning signs — they alert you to potential hazards or changing road conditions ahead.",
      vi: "Biển hình thoi vàng là biển cảnh báo — thông báo nguy hiểm hoặc điều kiện đường thay đổi phía trước.",
    },
  },
  {
    en: "In Wisconsin, vehicle insurance is:",
    vi: "Bảo hiểm xe ở Wisconsin:",
    opts: [
      { en: "Optional", vi: "Không bắt buộc" },
      { en: "Required for all registered vehicles", vi: "Bắt buộc cho mọi xe đăng ký" },
      { en: "Only required for commercial vehicles", vi: "Chỉ bắt buộc cho xe thương mại" },
      { en: "Required only on highways", vi: "Chỉ bắt buộc trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "Wisconsin requires liability insurance for all registered vehicles: $25,000/$50,000/$10,000 minimum.",
      vi: "Wisconsin bắt buộc bảo hiểm trách nhiệm cho mọi xe đăng ký: tối thiểu $25K/$50K/$10K.",
    },
  },
];
