import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const SD_PASS_COUNT = 20;

export const SD_QUESTIONS: QuizQuestion[] = [
  {
    en: "What is the default speed limit in a South Dakota residential area?",
    vi: "Tốc độ mặc định khu dân cư South Dakota?",
    opts: [
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
    ],
    ans: 1,
    exp: {
      en: "South Dakota residential areas default to 25 mph unless posted otherwise.",
      vi: "Khu dân cư South Dakota mặc định 25 mph trừ khi có biển báo khác.",
    },
  },
  {
    en: "What is the DUI BAC limit for adult drivers in South Dakota?",
    vi: "Giới hạn BAC DUI cho tài xế người lớn ở South Dakota?",
    opts: [
      { en: "0.06%", vi: "0.06%" },
      { en: "0.08%", vi: "0.08%" },
      { en: "0.10%", vi: "0.10%" },
      { en: "0.04%", vi: "0.04%" },
    ],
    ans: 1,
    exp: {
      en: "South Dakota DUI limit for adults is 0.08% BAC.",
      vi: "South Dakota: BAC 0.08% là DUI cho người lớn.",
    },
  },
  {
    en: "What is the BAC limit for drivers under 21 in South Dakota?",
    vi: "Giới hạn BAC cho tài xế dưới 21 tuổi ở South Dakota?",
    opts: [
      { en: "0.08%", vi: "0.08%" },
      { en: "0.04%", vi: "0.04%" },
      { en: "0.02%", vi: "0.02%" },
      { en: "0.00%", vi: "0.00%" },
    ],
    ans: 2,
    exp: {
      en: "South Dakota has a 0.02% BAC rule for drivers under 21.",
      vi: "South Dakota: BAC 0.02% là bất hợp pháp với dưới 21t.",
    },
  },
  {
    en: "What is the school zone speed limit in South Dakota when children are present?",
    vi: "Tốc độ khu trường học South Dakota khi có trẻ em?",
    opts: [
      { en: "10 mph", vi: "10 mph" },
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
    ],
    ans: 1,
    exp: {
      en: "South Dakota school zones: 15 mph when lights flash or children are present.",
      vi: "Khu trường học South Dakota: 15 mph khi đèn nhấp nháy hoặc có trẻ em.",
    },
  },
  {
    en: "What is the default speed limit on South Dakota interstates?",
    vi: "Tốc độ mặc định trên interstate South Dakota?",
    opts: [
      { en: "60 mph", vi: "60 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "80 mph", vi: "80 mph" },
    ],
    ans: 3,
    exp: {
      en: "South Dakota interstates default to 80 mph for passenger vehicles — among the highest in the US.",
      vi: "Interstate South Dakota: 80 mph mặc định cho xe hơi thông thường — cao nhất nước Mỹ.",
    },
  },
  {
    en: "Are motorcycle helmets required in South Dakota?",
    vi: "Có bắt buộc mũ xe máy ở South Dakota không?",
    opts: [
      { en: "Yes, for all riders", vi: "Có, cho tất cả" },
      { en: "No, not required for adults 18 and older", vi: "Không, không bắt buộc cho người từ 18t trở lên" },
      { en: "Only on interstates", vi: "Chỉ trên interstate" },
      { en: "Only at night", vi: "Chỉ ban đêm" },
    ],
    ans: 1,
    exp: {
      en: "South Dakota does NOT require helmets for riders 18 and older.",
      vi: "South Dakota KHÔNG bắt buộc mũ bảo hiểm cho người từ 18t trở lên.",
    },
  },
  {
    en: "In South Dakota, seat belts are required for:",
    vi: "Dây an toàn ở South Dakota bắt buộc cho:",
    opts: [
      { en: "Only the driver", vi: "Chỉ tài xế" },
      { en: "Driver and front passengers", vi: "Tài xế và hành khách ghế trước" },
      { en: "All vehicle occupants", vi: "Tất cả người trong xe" },
      { en: "Only under 18", vi: "Chỉ dưới 18 tuổi" },
    ],
    ans: 2,
    exp: {
      en: "South Dakota requires all vehicle occupants to wear seat belts.",
      vi: "South Dakota yêu cầu tất cả người trong xe thắt dây an toàn.",
    },
  },
  {
    en: "What does a flashing red traffic light mean in South Dakota?",
    vi: "Đèn đỏ nhấp nháy ở South Dakota có nghĩa gì?",
    opts: [
      { en: "Yield to cross traffic", vi: "Nhường xe ngang" },
      { en: "Treat as a STOP sign — stop, yield, proceed when safe", vi: "Xử lý như biển STOP: dừng, nhường, đi khi an toàn" },
      { en: "Proceed with caution", vi: "Đi thận trọng" },
      { en: "Emergency vehicle approaching", vi: "Xe cứu thương đang đến" },
    ],
    ans: 1,
    exp: {
      en: "A flashing red light means treat it exactly like a STOP sign.",
      vi: "Đèn đỏ nhấp nháy = biển STOP: dừng hoàn toàn, nhường, đi khi an toàn.",
    },
  },
  {
    en: "Can you turn right on red in South Dakota?",
    vi: "Được rẽ phải khi đèn đỏ ở South Dakota không?",
    opts: [
      { en: "Never", vi: "Không bao giờ" },
      {
        en: "Yes, after a complete stop and yielding, unless a sign prohibits",
        vi: "Có, sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm",
      },
      { en: "Only with a green arrow", vi: "Chỉ khi có mũi tên xanh" },
      { en: "Anytime no cars are coming", vi: "Bất cứ khi nào không có xe" },
    ],
    ans: 1,
    exp: {
      en: "Right on red is permitted after a complete stop and yielding, unless a NO TURN ON RED sign is posted.",
      vi: "Được rẽ phải sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm.",
    },
  },
  {
    en: "Texting while driving in South Dakota is:",
    vi: "Nhắn tin khi lái xe ở South Dakota:",
    opts: [
      { en: "Fully legal for all drivers", vi: "Hoàn toàn hợp pháp" },
      { en: "Illegal for all drivers", vi: "Bất hợp pháp với tất cả tài xế" },
      { en: "Only illegal for under 18", vi: "Chỉ bất hợp pháp dưới 18 tuổi" },
      { en: "Only illegal on highways", vi: "Chỉ bất hợp pháp trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "South Dakota bans texting while driving for all drivers.",
      vi: "South Dakota cấm nhắn tin khi lái cho tất cả tài xế.",
    },
  },
  {
    en: "What must you do when an emergency vehicle approaches with lights and siren?",
    vi: "Phải làm gì khi xe cứu thương tiến lại với đèn và còi?",
    opts: [
      { en: "Speed up to clear the road", vi: "Tăng tốc để thoát đường" },
      { en: "Pull to the right and stop until it passes", vi: "Kéo vào lề phải và dừng cho đến khi xe qua" },
      { en: "Move to the center lane", vi: "Chuyển sang làn giữa" },
      { en: "Continue at normal speed", vi: "Tiếp tục tốc độ bình thường" },
    ],
    ans: 1,
    exp: {
      en: "Pull to the right side of the road and stop until all emergency vehicles have passed.",
      vi: "Kéo vào lề phải và dừng cho đến khi tất cả xe cứu thương qua hết.",
    },
  },
  {
    en: "At a 4-way stop in South Dakota, if two vehicles arrive simultaneously:",
    vi: "Ngã tư STOP 4 chiều South Dakota, 2 xe đến cùng lúc:",
    opts: [
      { en: "The larger vehicle goes first", vi: "Xe lớn hơn đi trước" },
      { en: "The vehicle on the right has the right-of-way", vi: "Xe ở bên phải có quyền ưu tiên" },
      { en: "The vehicle going straight goes first", vi: "Xe đi thẳng đi trước" },
      { en: "Whoever honks first", vi: "Ai bấm còi trước" },
    ],
    ans: 1,
    exp: {
      en: "When two vehicles arrive simultaneously at a 4-way stop, yield to the vehicle on your right.",
      vi: "2 xe đến ngã tư cùng lúc: nhường xe ở bên phải bạn.",
    },
  },
  {
    en: "What does a solid yellow center line on YOUR side of the road mean?",
    vi: "Vạch vàng liền ở phía bạn có nghĩa gì?",
    opts: [
      { en: "Passing is allowed from your side", vi: "Được vượt từ phía bạn" },
      { en: "No passing from your side", vi: "Không được vượt từ phía bạn" },
      { en: "Construction zone ahead", vi: "Khu xây dựng phía trước" },
      { en: "Speed limit change", vi: "Thay đổi tốc độ" },
    ],
    ans: 1,
    exp: {
      en: "A solid yellow line on YOUR side means you cannot pass. You may only pass where there is a dashed yellow line on your side.",
      vi: "Vạch vàng liền ở phía BẠN = bạn không được vượt xe.",
    },
  },
  {
    en: "When must headlights be turned on in South Dakota?",
    vi: "Khi nào phải bật đèn pha ở South Dakota?",
    opts: [
      { en: "Only at night", vi: "Chỉ ban đêm" },
      {
        en: "30 minutes after sunset to 30 minutes before sunrise, and when visibility is reduced",
        vi: "30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi tầm nhìn giảm",
      },
      { en: "Only in heavy rain", vi: "Chỉ khi mưa lớn" },
      { en: "Only on highways", vi: "Chỉ trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "South Dakota requires headlights from 30 minutes after sunset to 30 minutes before sunrise, and when rain or fog reduces visibility.",
      vi: "South Dakota: bật đèn pha từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương giảm tầm nhìn.",
    },
  },
  {
    en: "What is the minimum following distance recommended in South Dakota?",
    vi: "Khoảng cách theo sau tối thiểu khuyến nghị ở South Dakota?",
    opts: [
      { en: "1 second", vi: "1 giây" },
      { en: "2 seconds", vi: "2 giây" },
      { en: "3 seconds", vi: "3 giây" },
      { en: "4 seconds", vi: "4 giây" },
    ],
    ans: 2,
    exp: {
      en: "South Dakota recommends a minimum 3-second following distance under normal conditions.",
      vi: "South Dakota khuyến nghị tối thiểu 3 giây trong điều kiện bình thường.",
    },
  },
  {
    en: "South Dakota Move Over Law requires:",
    vi: "Luật Move Over South Dakota yêu cầu:",
    opts: [
      { en: "Stop completely for all service vehicles", vi: "Dừng hoàn toàn cho mọi xe dịch vụ" },
      {
        en: "Move over a lane or slow significantly when passing stopped emergency/service vehicles on shoulder",
        vi: "Chuyển làn hoặc giảm tốc đáng kể khi qua xe cứu thương/dịch vụ dừng ven đường",
      },
      { en: "Flash your headlights", vi: "Nhấp đèn pha" },
      { en: "Only applies to police vehicles", vi: "Chỉ áp dụng cho xe cảnh sát" },
    ],
    ans: 1,
    exp: {
      en: "Move over one lane OR slow down significantly when passing stopped emergency, tow, or utility vehicles on the road shoulder.",
      vi: "Chuyển làn HOẶC giảm tốc đáng kể khi qua xe cứu thương/kéo/tiện ích dừng ven đường.",
    },
  },
  {
    en: "What does a pentagon (5-sided) sign indicate?",
    vi: "Biển hình ngũ giác (5 cạnh) chỉ điều gì?",
    opts: [
      { en: "Railroad crossing", vi: "Đường sắt" },
      { en: "School zone or school crossing warning", vi: "Khu trường học hoặc cảnh báo lối sang đường trường học" },
      { en: "Construction zone", vi: "Khu xây dựng" },
      { en: "Highway entrance", vi: "Lối vào cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "The pentagon shape is exclusively used for school zone and school crossing warning signs.",
      vi: "Biển hình ngũ giác chỉ dùng cho biển cảnh báo khu trường học và lối sang đường trường học.",
    },
  },
  {
    en: "How far before a turn must you signal in South Dakota?",
    vi: "Phải bật xi-nhan trước khi rẽ bao xa ở South Dakota?",
    opts: [
      { en: "50 feet", vi: "50 feet" },
      { en: "100 feet", vi: "100 feet" },
      { en: "200 feet", vi: "200 feet" },
      { en: "At the intersection", vi: "Tại giao lộ" },
    ],
    ans: 1,
    exp: {
      en: "South Dakota requires signaling at least 100 feet before turning or changing lanes.",
      vi: "South Dakota yêu cầu bật xi-nhan ít nhất 100 feet (khoảng 30m) trước khi rẽ hoặc đổi làn.",
    },
  },
  {
    en: "What does a green traffic light mean?",
    vi: "Đèn xanh có nghĩa gì?",
    opts: [
      { en: "Go without yielding to anyone", vi: "Đi mà không cần nhường ai" },
      {
        en: "Go, but yield to pedestrians in crosswalks and vehicles already in the intersection",
        vi: "Đi, nhưng nhường người đi bộ và xe đã trong giao lộ",
      },
      { en: "Speed up to clear the intersection quickly", vi: "Tăng tốc qua giao lộ nhanh" },
      { en: "Stop for 3 seconds then go", vi: "Dừng 3 giây rồi đi" },
    ],
    ans: 1,
    exp: {
      en: "Green means go — but you must yield to pedestrians in crosswalks and vehicles already lawfully in the intersection.",
      vi: "Xanh = đi — nhưng nhường người đi bộ đang hợp pháp sang đường và xe đã trong giao lộ.",
    },
  },
  {
    en: "When school bus red lights flash in South Dakota, you must:",
    vi: "Xe buýt trường học đèn đỏ nhấp nháy ở South Dakota, bạn phải:",
    opts: [
      { en: "Slow to 15 mph", vi: "Giảm còn 15 mph" },
      {
        en: "Stop in both directions unless a median separates lanes",
        vi: "Dừng cả 2 chiều trừ khi có dải phân cách",
      },
      { en: "Only stop if behind the bus", vi: "Chỉ dừng nếu ở phía sau xe buýt" },
      { en: "Honk and pass", vi: "Bấm còi và vượt" },
    ],
    ans: 1,
    exp: {
      en: "Stop in both directions when school bus red lights flash.",
      vi: "Dừng cả 2 chiều khi xe buýt đèn đỏ nhấp nháy.",
    },
  },
  {
    en: "South Dakota's minimum liability insurance requirement is:",
    vi: "Yêu cầu bảo hiểm trách nhiệm tối thiểu ở South Dakota?",
    opts: [
      { en: "$25,000/$50,000/$25,000 — minimum required", vi: "$25,000/$50,000/$25,000 — yêu cầu tối thiểu" },
      { en: "This is optional", vi: "Không bắt buộc" },
      { en: "Commercial vehicles only", vi: "Chỉ xe thương mại" },
      { en: "Not required in this state", vi: "Không yêu cầu ở bang này" },
    ],
    ans: 0,
    exp: {
      en: "South Dakota requires minimum liability insurance of $25,000/$50,000/$25,000.",
      vi: "South Dakota yêu cầu bảo hiểm trách nhiệm tối thiểu: $25,000/$50,000/$25,000.",
    },
  },
  {
    en: "Some South Dakota interstates allow speeds up to:",
    vi: "Một số interstate South Dakota cho phép tốc độ đến:",
    opts: [
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
      { en: "80 mph", vi: "80 mph" },
    ],
    ans: 3,
    exp: {
      en: "Some South Dakota interstates have posted speed limits of 80 mph — among the highest in the US.",
      vi: "Một số interstate SD có giới hạn 80 mph — trong số cao nhất nước Mỹ.",
    },
  },
  {
    en: "South Dakota has NO state income tax. This means:",
    vi: "South Dakota không có thuế thu nhập tiểu bang. Điều này có nghĩa là:",
    opts: [
      { en: "Workers keep more of their earnings", vi: "Người lao động giữ được nhiều thu nhập hơn" },
      { en: "Higher sales tax instead", vi: "Thuế mua sắm cao hơn thay thế" },
      { en: "Only federal income tax applies", vi: "Chỉ thuế liên bang áp dụng" },
      { en: "All of the above are potentially true", vi: "Tất cả đều có thể đúng" },
    ],
    ans: 3,
    exp: {
      en: "SD has no state income tax, which means more take-home pay. SD may have slightly higher sales tax to compensate.",
      vi: "SD không có thuế thu nhập tiểu bang — người lao động giữ được nhiều lương hơn.",
    },
  },
  {
    en: "In South Dakota, what does the Basic Speed Law mean?",
    vi: "Luật Tốc Độ Cơ Bản ở South Dakota có nghĩa là gì?",
    opts: [
      { en: "Always drive at exactly the posted limit", vi: "Luôn lái đúng tốc độ được đăng" },
      {
        en: "Never drive faster than is safe for current road and weather conditions",
        vi: "Không bao giờ lái nhanh hơn mức an toàn cho điều kiện đường và thời tiết hiện tại",
      },
      { en: "Speed limits only apply on highways", vi: "Giới hạn tốc độ chỉ áp dụng trên cao tốc" },
      { en: "Minimum speed must always be maintained", vi: "Tốc độ tối thiểu phải luôn duy trì" },
    ],
    ans: 1,
    exp: {
      en: "The Basic Speed Law means you must never drive faster than is safe for current conditions, even if below the posted limit.",
      vi: "Luật Tốc Độ Cơ Bản: không bao giờ lái nhanh hơn mức an toàn cho điều kiện hiện tại, dù dưới giới hạn.",
    },
  },
  {
    en: "What must you do at a railroad crossing when lights are flashing and gates are down?",
    vi: "Phải làm gì tại đường sắt khi đèn nhấp nháy và rào hạ?",
    opts: [
      { en: "Slow to 15 mph and proceed", vi: "Giảm còn 15 mph và đi tiếp" },
      {
        en: "Stop and wait until lights stop flashing and gates rise",
        vi: "Dừng và chờ đến khi đèn tắt và rào nâng lên",
      },
      { en: "Drive around the gate if no train is visible", vi: "Lái vòng rào nếu không thấy tàu" },
      { en: "Flash headlights and proceed", vi: "Nhấp đèn pha và đi tiếp" },
    ],
    ans: 1,
    exp: {
      en: "When railroad lights flash and gates come down, STOP and wait. Never go around the gates — it is extremely dangerous and illegal.",
      vi: "Khi đèn đường sắt nhấp nháy và rào hạ: DỪNG và chờ. Không lái vòng rào — cực kỳ nguy hiểm và bất hợp pháp.",
    },
  },
];
