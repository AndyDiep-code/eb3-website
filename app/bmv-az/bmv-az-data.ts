import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const AZ_PASS_COUNT = 24;
export const AZ_HERO_GRADIENT =
  "linear-gradient(135deg,#1a0800 0%, #92400e 55%, #0f2a47 100%)";

export const AZ_QUESTIONS: QuizQuestion[] = [
  {
    en: "What is the default speed limit in a Arizona residential area?",
    vi: "Tốc độ mặc định khu dân cư Arizona?",
    opts: [
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
    ],
    ans: 1,
    exp: {
      en: "Arizona residential areas default to 25 mph unless posted otherwise.",
      vi: "Khu dân cư Arizona mặc định 25 mph trừ khi có biển báo khác.",
    },
  },
  {
    en: "What is the DUI BAC limit for adult drivers in Arizona?",
    vi: "Giới hạn BAC DUI cho tài xế người lớn ở Arizona?",
    opts: [
      { en: "0.06%", vi: "0.06%" },
      { en: "0.08%", vi: "0.08%" },
      { en: "0.10%", vi: "0.10%" },
      { en: "0.04%", vi: "0.04%" },
    ],
    ans: 1,
    exp: {
      en: "Arizona DUI limit for adults is 0.08% BAC.",
      vi: "Arizona: BAC 0.08% là DUI cho người lớn.",
    },
  },
  {
    en: "What is the BAC limit for drivers under 21 in Arizona?",
    vi: "Giới hạn BAC cho tài xế dưới 21 tuổi ở Arizona?",
    opts: [
      { en: "0.08%", vi: "0.08%" },
      { en: "0.04%", vi: "0.04%" },
      { en: "0.02%", vi: "0.02%" },
      { en: "0.00%", vi: "0.00%" },
    ],
    ans: 3,
    exp: {
      en: "Arizona has a zero-tolerance rule for drivers under 21.",
      vi: "Arizona: BAC bất kỳ lượng nào phát hiện được là bất hợp pháp với dưới 21t.",
    },
  },
  {
    en: "What is the school zone speed limit in Arizona when children are present?",
    vi: "Tốc độ khu trường học Arizona khi có trẻ em?",
    opts: [
      { en: "10 mph", vi: "10 mph" },
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
    ],
    ans: 1,
    exp: {
      en: "Arizona school zones: 15 mph when lights flash or children are present.",
      vi: "Khu trường học Arizona: 15 mph khi đèn nhấp nháy hoặc có trẻ em.",
    },
  },
  {
    en: "In Arizona, motorcycle helmets are:",
    vi: "Mũ bảo hiểm xe máy ở Arizona:",
    opts: [
      { en: "Required for all riders regardless of age", vi: "Required for all riders regardless of age" },
      { en: "Not required for adults 18 or older", vi: "Not required for adults 18 or older" },
      {
        en: "Not required for riders 18 and older — required for under 18",
        vi: "Not required for riders 18 and older — required for under 18",
      },
      { en: "Not required on any road", vi: "Not required on any road" },
    ],
    ans: 2,
    exp: {
      en: "Arizona helmet rule: Not required for riders 18 and older — required for under 18.",
      vi: "Arizona: Not required for riders 18 and older — required for under 18.",
    },
  },
  {
    en: "What is the default speed limit on Arizona interstates?",
    vi: "Tốc độ mặc định trên interstate Arizona?",
    opts: [
      { en: "60 mph", vi: "60 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
    ],
    ans: 3,
    exp: {
      en: "Arizona interstates: 75 mph default for passenger vehicles.",
      vi: "Interstate Arizona: 75 mph mặc định cho xe hơi thông thường.",
    },
  },
  {
    en: "In Arizona, seat belts are required for:",
    vi: "Dây an toàn ở Arizona bắt buộc cho:",
    opts: [
      { en: "Only the driver", vi: "Only the driver" },
      { en: "Driver and front passengers", vi: "Driver and front passengers" },
      { en: "All vehicle occupants", vi: "All vehicle occupants" },
      { en: "Only under 18", vi: "Only under 18" },
    ],
    ans: 2,
    exp: {
      en: "Arizona requires all vehicle occupants to wear seat belts.",
      vi: "Arizona requires all vehicle occupants to wear seat belts.",
    },
  },
  {
    en: "What does a flashing red traffic light mean in Arizona?",
    vi: "Đèn đỏ nhấp nháy ở Arizona có nghĩa gì?",
    opts: [
      { en: "Yield to cross traffic", vi: "Yield to cross traffic" },
      { en: "Treat as a STOP sign — stop, yield, proceed when safe", vi: "Treat as a STOP sign — stop, yield, proceed when safe" },
      { en: "Proceed with caution", vi: "Proceed with caution" },
      { en: "Emergency vehicle approaching", vi: "Emergency vehicle approaching" },
    ],
    ans: 1,
    exp: {
      en: "A flashing red light means treat it exactly like a STOP sign.",
      vi: "Đèn đỏ nhấp nháy = biển STOP: dừng hoàn toàn, nhường, đi khi an toàn.",
    },
  },
  {
    en: "Can you turn right on red in Arizona?",
    vi: "Được rẽ phải khi đèn đỏ ở Arizona không?",
    opts: [
      { en: "Never", vi: "Never" },
      { en: "Yes, after a complete stop and yielding, unless a sign prohibits", vi: "Yes, after a complete stop and yielding, unless a sign prohibits" },
      { en: "Only with a green arrow", vi: "Only with a green arrow" },
      { en: "Anytime no cars are coming", vi: "Anytime no cars are coming" },
    ],
    ans: 1,
    exp: {
      en: "Right on red is permitted after a complete stop and yielding, unless a NO TURN ON RED sign is posted.",
      vi: "Được rẽ phải sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm.",
    },
  },
  {
    en: "Holding a phone while driving is banned (Hands-Free Law 2021) in Arizona:",
    vi: "Luật điện thoại ở Arizona:",
    opts: [
      { en: "Fully legal for all drivers", vi: "Fully legal for all drivers" },
      { en: "Illegal for all drivers to text while driving", vi: "Illegal for all drivers to text while driving" },
      { en: "Only illegal for under 18", vi: "Only illegal for under 18" },
      { en: "Only illegal on highways", vi: "Only illegal on highways" },
    ],
    ans: 1,
    exp: {
      en: "Arizona bans texting while driving for all drivers.",
      vi: "Arizona cấm nhắn tin khi lái cho tất cả tài xế.",
    },
  },
  {
    en: "What must you do when an emergency vehicle approaches with lights and siren?",
    vi: "Phải làm gì khi xe cứu thương tiến lại với đèn và còi?",
    opts: [
      { en: "Speed up to clear the road", vi: "Speed up to clear the road" },
      { en: "Pull to the right and stop until it passes", vi: "Pull to the right and stop until it passes" },
      { en: "Move to the center lane", vi: "Move to the center lane" },
      { en: "Continue at normal speed", vi: "Continue at normal speed" },
    ],
    ans: 1,
    exp: {
      en: "Pull to the right side of the road and stop until all emergency vehicles have passed.",
      vi: "Kéo vào lề phải và dừng cho đến khi tất cả xe cứu thương qua hết.",
    },
  },
  {
    en: "At a 4-way stop in Arizona, if two vehicles arrive simultaneously:",
    vi: "Ngã tư STOP 4 chiều Arizona, 2 xe đến cùng lúc:",
    opts: [
      { en: "The larger vehicle goes first", vi: "The larger vehicle goes first" },
      { en: "The vehicle on the right has the right-of-way", vi: "The vehicle on the right has the right-of-way" },
      { en: "The vehicle going straight goes first", vi: "The vehicle going straight goes first" },
      { en: "Whoever honks first", vi: "Whoever honks first" },
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
      { en: "Passing is allowed from your side", vi: "Passing is allowed from your side" },
      { en: "No passing from your side", vi: "No passing from your side" },
      { en: "Construction zone ahead", vi: "Construction zone ahead" },
      { en: "Speed limit change", vi: "Speed limit change" },
    ],
    ans: 1,
    exp: {
      en: "A solid yellow line on YOUR side means you cannot pass. You may only pass where there is a dashed yellow line on your side.",
      vi: "Vạch vàng liền ở phía BẠN = bạn không được vượt xe.",
    },
  },
  {
    en: "When must headlights be turned on in Arizona?",
    vi: "Khi nào phải bật đèn pha ở Arizona?",
    opts: [
      { en: "Only at night", vi: "Only at night" },
      {
        en: "30 minutes after sunset to 30 minutes before sunrise, and when visibility is reduced",
        vi: "30 minutes after sunset to 30 minutes before sunrise, and when visibility is reduced",
      },
      { en: "Only in heavy rain", vi: "Only in heavy rain" },
      { en: "Only on highways", vi: "Only on highways" },
    ],
    ans: 1,
    exp: {
      en: "Arizona requires headlights from 30 minutes after sunset to 30 minutes before sunrise, and when rain or fog reduces visibility.",
      vi: "Arizona: bật đèn pha từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương giảm tầm nhìn.",
    },
  },
  {
    en: "What is the minimum following distance recommended in Arizona?",
    vi: "Khoảng cách theo sau tối thiểu khuyến nghị ở Arizona?",
    opts: [
      { en: "1 second", vi: "1 second" },
      { en: "2 seconds", vi: "2 seconds" },
      { en: "3 seconds", vi: "3 seconds" },
      { en: "4 seconds", vi: "4 seconds" },
    ],
    ans: 2,
    exp: {
      en: "Arizona recommends a minimum 3-second following distance under normal conditions.",
      vi: "Arizona khuyến nghị tối thiểu 3 giây trong điều kiện bình thường.",
    },
  },
  {
    en: "Arizona Move Over Law requires:",
    vi: "Luật Move Over Arizona yêu cầu:",
    opts: [
      { en: "Stop completely for all service vehicles", vi: "Stop completely for all service vehicles" },
      {
        en: "Move over a lane or slow significantly when passing stopped emergency/service vehicles on shoulder",
        vi: "Move over a lane or slow significantly when passing stopped emergency/service vehicles on shoulder",
      },
      { en: "Flash your headlights", vi: "Flash your headlights" },
      { en: "Only applies to police vehicles", vi: "Only applies to police vehicles" },
    ],
    ans: 1,
    exp: {
      en: "Move over one lane OR slow down significantly when passing stopped emergency, tow, or utility vehicles on the road shoulder.",
      vi: "Chuyển làn HOẶC giảm tốc đáng kể khi qua xe cứu thương/kéo/tiện ích dừng ven đường.",
    },
  },
  {
    en: "$25,000/$50,000/$15,000 is the minimum liability insurance required in Arizona.",
    vi: "$25,000/$50,000/$15,000 là bảo hiểm trách nhiệm tối thiểu ở Arizona.",
    opts: [
      { en: "This is the minimum required", vi: "This is the minimum required" },
      { en: "This is optional", vi: "This is optional" },
      { en: "Commercial vehicles only", vi: "Commercial vehicles only" },
      { en: "Not required in this state", vi: "Not required in this state" },
    ],
    ans: 0,
    exp: {
      en: "Arizona requires minimum liability insurance of $25,000/$50,000/$15,000.",
      vi: "Arizona yêu cầu bảo hiểm trách nhiệm tối thiểu: $25,000/$50,000/$15,000.",
    },
  },
  {
    en: "What does a pentagon (5-sided) sign indicate?",
    vi: "Biển hình ngũ giác (5 cạnh) chỉ điều gì?",
    opts: [
      { en: "Railroad crossing", vi: "Railroad crossing" },
      { en: "School zone or school crossing warning", vi: "School zone or school crossing warning" },
      { en: "Construction zone", vi: "Construction zone" },
      { en: "Highway entrance", vi: "Highway entrance" },
    ],
    ans: 1,
    exp: {
      en: "The pentagon shape is exclusively used for school zone and school crossing warning signs.",
      vi: "Biển hình ngũ giác chỉ dùng cho biển cảnh báo khu trường học và lối sang đường trường học.",
    },
  },
  {
    en: "How far before a turn must you signal in Arizona?",
    vi: "Phải bật xi-nhan trước khi rẽ bao xa ở Arizona?",
    opts: [
      { en: "50 feet", vi: "50 feet" },
      { en: "100 feet", vi: "100 feet" },
      { en: "200 feet", vi: "200 feet" },
      { en: "At the intersection", vi: "At the intersection" },
    ],
    ans: 1,
    exp: {
      en: "Arizona requires signaling at least 100 feet before turning or changing lanes.",
      vi: "Arizona yêu cầu bật xi-nhan ít nhất 100 feet (khoảng 30m) trước khi rẽ hoặc đổi làn.",
    },
  },
  {
    en: "What does a green traffic light mean?",
    vi: "Đèn xanh có nghĩa gì?",
    opts: [
      { en: "Go without yielding to anyone", vi: "Go without yielding to anyone" },
      {
        en: "Go, but yield to pedestrians in crosswalks and vehicles already in the intersection",
        vi: "Go, but yield to pedestrians in crosswalks and vehicles already in the intersection",
      },
      { en: "Speed up to clear the intersection quickly", vi: "Speed up to clear the intersection quickly" },
      { en: "Stop for 3 seconds then go", vi: "Stop for 3 seconds then go" },
    ],
    ans: 1,
    exp: {
      en: "Green means go — but you must yield to pedestrians in crosswalks and vehicles already lawfully in the intersection.",
      vi: "Xanh = đi — nhưng nhường người đi bộ đang hợp pháp sang đường và xe đã trong giao lộ.",
    },
  },
  {
    en: "Arizona's Hands-Free Law (2021) prohibits:",
    vi: "Luật Hands-Free Arizona (2021) cấm:",
    opts: [
      { en: "Talking on phone entirely", vi: "Talking on phone entirely" },
      {
        en: "Holding or using a phone while driving — hands-free device required",
        vi: "Holding or using a phone while driving — hands-free device required",
      },
      { en: "Only texting", vi: "Only texting" },
      { en: "Only for commercial vehicles", vi: "Only for commercial vehicles" },
    ],
    ans: 1,
    exp: {
      en: "Arizona's Hands-Free Law prohibits holding or physically using a phone while driving. A hands-free device is required.",
      vi: "Luật Hands-Free Arizona cấm cầm hoặc dùng tay điện thoại khi lái. Phải dùng thiết bị hands-free.",
    },
  },
  {
    en: "Arizona has ZERO tolerance for drivers under 21. This means:",
    vi: "Arizona áp dụng zero-tolerance với dưới 21t. Điều này có nghĩa:",
    opts: [
      { en: "BAC must be below 0.08%", vi: "BAC must be below 0.08%" },
      { en: "BAC must be below 0.02%", vi: "BAC must be below 0.02%" },
      { en: "ANY detectable amount of alcohol is illegal", vi: "ANY detectable amount of alcohol is illegal" },
      { en: "Only applies on highways", vi: "Only applies on highways" },
    ],
    ans: 2,
    exp: {
      en: "Arizona zero tolerance: ANY detectable BAC for drivers under 21 results in DUI charges.",
      vi: "Arizona zero-tolerance: BẤT KỲ BAC nào phát hiện được với dưới 21t đều là DUI.",
    },
  },
  {
    en: "Are motorcycle helmets required in Arizona?",
    vi: "Có bắt buộc mũ xe máy ở Arizona không?",
    opts: [
      { en: "Yes, for all riders", vi: "Yes, for all riders" },
      { en: "Required for under 18 only, not for 18 and older", vi: "Required for under 18 only, not for 18 and older" },
      { en: "Only on interstates", vi: "Only on interstates" },
      { en: "No, never required", vi: "No, never required" },
    ],
    ans: 1,
    exp: {
      en: "Arizona requires helmets for riders under 18. Riders 18 and older are not legally required to wear a helmet.",
      vi: "Arizona bắt buộc mũ cho dưới 18 tuổi. Từ 18t trở lên không bắt buộc về mặt pháp lý.",
    },
  },
  {
    en: "AZ interstate default speed limit?",
    vi: "Tốc độ mặc định interstate Arizona?",
    opts: [
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
      { en: "80 mph", vi: "80 mph" },
    ],
    ans: 2,
    exp: {
      en: "Arizona interstates default to 75 mph for passenger vehicles.",
      vi: "Interstate Arizona mặc định 75 mph với xe hơi thông thường.",
    },
  },
  {
    en: "Right on red in Arizona?",
    vi: "Rẽ phải khi đèn đỏ ở Arizona?",
    opts: [
      { en: "Never", vi: "Never" },
      { en: "Yes, after stopping and yielding unless a sign prohibits", vi: "Yes, after stopping and yielding unless a sign prohibits" },
      { en: "Only green arrow", vi: "Only green arrow" },
      { en: "Always", vi: "Always" },
    ],
    ans: 1,
    exp: {
      en: "Right on red is permitted after a complete stop and yielding, unless a sign prohibits it.",
      vi: "Được rẽ phải sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm.",
    },
  },
  {
    en: "School bus red lights in AZ:",
    vi: "Xe buýt trường học đèn đỏ nhấp nháy ở AZ:",
    opts: [
      { en: "Slow to 15 mph", vi: "Slow to 15 mph" },
      { en: "Stop both directions unless median separates", vi: "Stop both directions unless median separates" },
      { en: "Only stop if behind", vi: "Only stop if behind" },
      { en: "Honk and pass", vi: "Honk and pass" },
    ],
    ans: 1,
    exp: {
      en: "Stop in both directions when school bus red lights flash, unless a median separates.",
      vi: "Dừng cả 2 chiều khi xe buýt đèn đỏ nhấp nháy, trừ khi có dải phân cách.",
    },
  },
  {
    en: "Arizona minimum liability insurance:",
    vi: "Bảo hiểm tối thiểu Arizona:",
    opts: [
      { en: "$10,000/$20,000/$10,000", vi: "$10,000/$20,000/$10,000" },
      { en: "$15,000/$30,000/$10,000", vi: "$15,000/$30,000/$10,000" },
      { en: "$25,000/$50,000/$15,000", vi: "$25,000/$50,000/$15,000" },
      { en: "No requirement", vi: "No requirement" },
    ],
    ans: 2,
    exp: {
      en: "Arizona minimum: $25,000 per person / $50,000 per accident / $15,000 property damage.",
      vi: "Arizona tối thiểu: $25K/người · $50K/tai nạn · $15K hư hại tài sản.",
    },
  },
];
