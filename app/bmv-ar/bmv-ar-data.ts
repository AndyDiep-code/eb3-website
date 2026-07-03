import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const AR_PASS_COUNT = 20;
export const AR_HERO_GRADIENT =
  "linear-gradient(135deg,#1a0800 0%, #7c2d12 55%, #065f46 100%)";

export const AR_QUESTIONS: QuizQuestion[] = [
  {
    en: "What is the default speed limit in a Arkansas residential area?",
    vi: "Tốc độ mặc định khu dân cư Arkansas?",
    opts: [
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
      { en: "40 mph", vi: "40 mph" },
    ],
    ans: 1,
    exp: {
      en: "Arkansas residential areas default to 30 mph unless posted otherwise.",
      vi: "Khu dân cư Arkansas mặc định 30 mph trừ khi có biển báo khác.",
    },
  },
  {
    en: "What is the DWI BAC limit for adult drivers in Arkansas?",
    vi: "Giới hạn BAC DWI cho tài xế người lớn ở Arkansas?",
    opts: [
      { en: "0.06%", vi: "0.06%" },
      { en: "0.08%", vi: "0.08%" },
      { en: "0.10%", vi: "0.10%" },
      { en: "0.04%", vi: "0.04%" },
    ],
    ans: 1,
    exp: {
      en: "Arkansas DWI limit for adults is 0.08% BAC.",
      vi: "Arkansas: BAC 0.08% là DWI cho người lớn.",
    },
  },
  {
    en: "What is the BAC limit for drivers under 21 in Arkansas?",
    vi: "Giới hạn BAC cho tài xế dưới 21 tuổi ở Arkansas?",
    opts: [
      { en: "0.08%", vi: "0.08%" },
      { en: "0.04%", vi: "0.04%" },
      { en: "0.02%", vi: "0.02%" },
      { en: "0.00%", vi: "0.00%" },
    ],
    ans: 2,
    exp: {
      en: "Arkansas has a 0.02% BAC rule for drivers under 21.",
      vi: "Arkansas: BAC 0.02% là bất hợp pháp với dưới 21t.",
    },
  },
  {
    en: "What is the school zone speed limit in Arkansas when children are present?",
    vi: "Tốc độ khu trường học Arkansas khi có trẻ em?",
    opts: [
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
    ],
    ans: 1,
    exp: {
      en: "Arkansas school zones: 20 mph when lights flash or children are present.",
      vi: "Khu trường học Arkansas: 20 mph khi đèn nhấp nháy hoặc có trẻ em.",
    },
  },
  {
    en: "In Arkansas, motorcycle helmets are:",
    vi: "Mũ bảo hiểm xe máy ở Arkansas:",
    opts: [
      { en: "Required for all riders regardless of age", vi: "Required for all riders regardless of age" },
      { en: "Not required for adults 18 or older", vi: "Not required for adults 18 or older" },
      {
        en: "Required for riders under 21 and those with less than 1 year experience",
        vi: "Required for riders under 21 and those with less than 1 year experience",
      },
      { en: "Not required on any road", vi: "Not required on any road" },
    ],
    ans: 2,
    exp: {
      en: "Arkansas helmet rule: Required for riders under 21 and those with less than 1 year experience.",
      vi: "Arkansas: Required for riders under 21 and those with less than 1 year experience.",
    },
  },
  {
    en: "What is the default speed limit on Arkansas interstates?",
    vi: "Tốc độ mặc định trên interstate Arkansas?",
    opts: [
      { en: "60 mph", vi: "60 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
    ],
    ans: 3,
    exp: {
      en: "Arkansas interstates: 75 mph default for passenger vehicles.",
      vi: "Interstate Arkansas: 75 mph mặc định cho xe hơi thông thường.",
    },
  },
  {
    en: "In Arkansas, seat belts are required for:",
    vi: "Dây an toàn ở Arkansas bắt buộc cho:",
    opts: [
      { en: "Only the driver", vi: "Only the driver" },
      { en: "Driver and front passengers", vi: "Driver and front passengers" },
      { en: "All vehicle occupants", vi: "All vehicle occupants" },
      { en: "Only under 18", vi: "Only under 18" },
    ],
    ans: 2,
    exp: {
      en: "Arkansas requires all vehicle occupants to wear seat belts.",
      vi: "Arkansas requires all vehicle occupants to wear seat belts.",
    },
  },
  {
    en: "What does a flashing red traffic light mean in Arkansas?",
    vi: "Đèn đỏ nhấp nháy ở Arkansas có nghĩa gì?",
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
    en: "Can you turn right on red in Arkansas?",
    vi: "Được rẽ phải khi đèn đỏ ở Arkansas không?",
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
    en: "Texting and handheld phone use while driving is banned for all drivers in Arkansas:",
    vi: "Luật điện thoại ở Arkansas:",
    opts: [
      { en: "Fully legal for all drivers", vi: "Fully legal for all drivers" },
      { en: "Illegal for all drivers to text while driving", vi: "Illegal for all drivers to text while driving" },
      { en: "Only illegal for under 18", vi: "Only illegal for under 18" },
      { en: "Only illegal on highways", vi: "Only illegal on highways" },
    ],
    ans: 1,
    exp: {
      en: "Arkansas bans texting while driving for all drivers.",
      vi: "Arkansas cấm nhắn tin khi lái cho tất cả tài xế.",
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
    en: "At a 4-way stop in Arkansas, if two vehicles arrive simultaneously:",
    vi: "Ngã tư STOP 4 chiều Arkansas, 2 xe đến cùng lúc:",
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
    en: "When must headlights be turned on in Arkansas?",
    vi: "Khi nào phải bật đèn pha ở Arkansas?",
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
      en: "Arkansas requires headlights from 30 minutes after sunset to 30 minutes before sunrise, and when rain or fog reduces visibility.",
      vi: "Arkansas: bật đèn pha từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương giảm tầm nhìn.",
    },
  },
  {
    en: "What is the minimum following distance recommended in Arkansas?",
    vi: "Khoảng cách theo sau tối thiểu khuyến nghị ở Arkansas?",
    opts: [
      { en: "1 second", vi: "1 second" },
      { en: "2 seconds", vi: "2 seconds" },
      { en: "3 seconds", vi: "3 seconds" },
      { en: "4 seconds", vi: "4 seconds" },
    ],
    ans: 2,
    exp: {
      en: "Arkansas recommends a minimum 3-second following distance under normal conditions.",
      vi: "Arkansas khuyến nghị tối thiểu 3 giây trong điều kiện bình thường.",
    },
  },
  {
    en: "Arkansas Move Over Law requires:",
    vi: "Luật Move Over Arkansas yêu cầu:",
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
    en: "$25,000/$50,000/$25,000 is the minimum liability insurance required in Arkansas.",
    vi: "$25,000/$50,000/$25,000 là bảo hiểm trách nhiệm tối thiểu ở Arkansas.",
    opts: [
      { en: "This is the minimum required", vi: "This is the minimum required" },
      { en: "This is optional", vi: "This is optional" },
      { en: "Commercial vehicles only", vi: "Commercial vehicles only" },
      { en: "Not required in this state", vi: "Not required in this state" },
    ],
    ans: 0,
    exp: {
      en: "Arkansas requires minimum liability insurance of $25,000/$50,000/$25,000.",
      vi: "Arkansas yêu cầu bảo hiểm trách nhiệm tối thiểu: $25,000/$50,000/$25,000.",
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
    en: "How far before a turn must you signal in Arkansas?",
    vi: "Phải bật xi-nhan trước khi rẽ bao xa ở Arkansas?",
    opts: [
      { en: "50 feet", vi: "50 feet" },
      { en: "100 feet", vi: "100 feet" },
      { en: "200 feet", vi: "200 feet" },
      { en: "At the intersection", vi: "At the intersection" },
    ],
    ans: 1,
    exp: {
      en: "Arkansas requires signaling at least 100 feet before turning or changing lanes.",
      vi: "Arkansas yêu cầu bật xi-nhan ít nhất 100 feet (khoảng 30m) trước khi rẽ hoặc đổi làn.",
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
    en: "Arkansas uses the term DWI instead of DUI. What does DWI stand for?",
    vi: "Arkansas dùng DWI thay vì DUI. DWI là viết tắt của?",
    opts: [
      { en: "Drinking While Impaired", vi: "Drinking While Impaired" },
      { en: "Driving While Intoxicated", vi: "Driving While Intoxicated" },
      { en: "Dangerous Wheel Infraction", vi: "Dangerous Wheel Infraction" },
      { en: "Driving Without Insurance", vi: "Driving Without Insurance" },
    ],
    ans: 1,
    exp: {
      en: "Arkansas uses DWI (Driving While Intoxicated). BAC 0.08%+ for adults is illegal.",
      vi: "Arkansas dùng DWI (Driving While Intoxicated). BAC ≥0.08% với người lớn là phạm pháp.",
    },
  },
  {
    en: "Some Arkansas interstates have speed limits up to:",
    vi: "Một số interstate Arkansas có giới hạn tốc độ lên đến:",
    opts: [
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
      { en: "80 mph", vi: "80 mph" },
    ],
    ans: 2,
    exp: {
      en: "Some Arkansas interstates allow 75 mph for passenger vehicles.",
      vi: "Một số interstate Arkansas cho phép 75 mph với xe hơi thông thường.",
    },
  },
  {
    en: "In AR, motorcycle helmets are required for:",
    vi: "Mũ xe máy AR bắt buộc cho:",
    opts: [
      { en: "All riders", vi: "All riders" },
      { en: "Riders under 21 and those with less than 1 year license", vi: "Riders under 21 and those with less than 1 year license" },
      { en: "Only on highways", vi: "Only on highways" },
      { en: "No one", vi: "No one" },
    ],
    ans: 1,
    exp: {
      en: "AR requires helmets for riders under 21 and those with less than 1 year of licensing.",
      vi: "AR bắt buộc mũ cho dưới 21t và người có bằng xe máy dưới 1 năm.",
    },
  },
  {
    en: "Right on red in Arkansas?",
    vi: "Rẽ phải khi đèn đỏ ở Arkansas?",
    opts: [
      { en: "Never", vi: "Never" },
      { en: "Yes, after stopping and yielding unless prohibited", vi: "Yes, after stopping and yielding unless prohibited" },
      { en: "Only green arrow", vi: "Only green arrow" },
      { en: "Always", vi: "Always" },
    ],
    ans: 1,
    exp: {
      en: "Right on red is permitted after a complete stop and yielding.",
      vi: "Được rẽ phải sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm.",
    },
  },
  {
    en: "School bus red lights in AR:",
    vi: "Đèn đỏ xe buýt trường học ở AR:",
    opts: [
      { en: "Slow to 20", vi: "Slow to 20" },
      { en: "Stop both directions unless median", vi: "Stop both directions unless median" },
      { en: "Only stop if behind", vi: "Only stop if behind" },
      { en: "Honk and pass", vi: "Honk and pass" },
    ],
    ans: 1,
    exp: {
      en: "Stop in both directions when a school bus has red lights flashing.",
      vi: "Dừng cả 2 chiều khi xe buýt đèn đỏ nhấp nháy.",
    },
  },
];
