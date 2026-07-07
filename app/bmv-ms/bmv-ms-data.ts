import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const MS_PASS_COUNT = 24;

export const MS_QUESTIONS: QuizQuestion[] = [
  {
    en: "What is the default speed limit in a Mississippi residential area?",
    vi: "Tốc độ mặc định khu dân cư Mississippi?",
    opts: [
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
    ],
    ans: 1,
    exp: {
      en: "Mississippi residential areas default to 25 mph unless posted otherwise.",
      vi: "Khu dân cư Mississippi mặc định 25 mph trừ khi có biển báo khác.",
    },
  },
  {
    en: "What is the DUI BAC limit for adult drivers in Mississippi?",
    vi: "Giới hạn BAC DUI cho tài xế người lớn ở Mississippi?",
    opts: [
      { en: "0.06%", vi: "0.06%" },
      { en: "0.08%", vi: "0.08%" },
      { en: "0.10%", vi: "0.10%" },
      { en: "0.04%", vi: "0.04%" },
    ],
    ans: 1,
    exp: {
      en: "Mississippi DUI limit for adults is 0.08% BAC.",
      vi: "Mississippi: BAC 0.08% là DUI cho người lớn.",
    },
  },
  {
    en: "What is the BAC limit for drivers under 21 in Mississippi?",
    vi: "Giới hạn BAC cho tài xế dưới 21 tuổi ở Mississippi?",
    opts: [
      { en: "0.08%", vi: "0.08%" },
      { en: "0.04%", vi: "0.04%" },
      { en: "0.02%", vi: "0.02%" },
      { en: "0.00%", vi: "0.00%" },
    ],
    ans: 2,
    exp: {
      en: "Mississippi has a 0.02% BAC rule for drivers under 21.",
      vi: "Mississippi: BAC 0.02% là bất hợp pháp với dưới 21t.",
    },
  },
  {
    en: "What is the school zone speed limit in Mississippi when children are present?",
    vi: "Tốc độ khu trường học Mississippi khi có trẻ em?",
    opts: [
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
    ],
    ans: 1,
    exp: {
      en: "Mississippi school zones: 20 mph when lights flash or children are present.",
      vi: "Khu trường học Mississippi: 20 mph khi đèn nhấp nháy hoặc có trẻ em.",
    },
  },
  {
    en: "In Mississippi, motorcycle helmets are required for riders:",
    vi: "Mũ bảo hiểm xe máy ở Mississippi bắt buộc cho:",
    opts: [
      { en: "All riders regardless of age", vi: "Tất cả người lái bất kể tuổi" },
      { en: "Not required for adults 18 or older", vi: "Không bắt buộc với người 18+" },
      { en: "Riders UNDER 26 — unique law, not required at 26+", vi: "Người DƯỚI 26 tuổi — luật độc nhất, không bắt buộc từ 26+" },
      { en: "Not required on any road", vi: "Không bắt buộc trên bất kỳ đường nào" },
    ],
    ans: 2,
    exp: {
      en: "Mississippi uniquely requires helmets for riders UNDER 26. At 26 and older, helmets are not legally required.",
      vi: "Mississippi bắt buộc mũ cho người DƯỚI 26 tuổi — luật độc nhất ở Mỹ! Từ 26 tuổi không bắt buộc.",
    },
  },
  {
    en: "What is the default speed limit on Mississippi interstates?",
    vi: "Tốc độ mặc định trên interstate Mississippi?",
    opts: [
      { en: "60 mph", vi: "60 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
    ],
    ans: 2,
    exp: {
      en: "Mississippi interstates: 70 mph default for passenger vehicles.",
      vi: "Interstate Mississippi: 70 mph mặc định cho xe hơi thông thường.",
    },
  },
  {
    en: "In Mississippi, seat belts are required for:",
    vi: "Dây an toàn ở Mississippi bắt buộc cho:",
    opts: [
      { en: "Only the driver", vi: "Chỉ tài xế" },
      { en: "Driver and front passengers", vi: "Tài xế và hành khách ghế trước" },
      { en: "All vehicle occupants", vi: "Tất cả người trong xe" },
      { en: "Only under 18", vi: "Chỉ dưới 18 tuổi" },
    ],
    ans: 2,
    exp: {
      en: "Mississippi requires all vehicle occupants to wear seat belts.",
      vi: "Mississippi bắt buộc tất cả người trong xe thắt dây an toàn.",
    },
  },
  {
    en: "What does a flashing red traffic light mean in Mississippi?",
    vi: "Đèn đỏ nhấp nháy ở Mississippi có nghĩa gì?",
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
    en: "Can you turn right on red in Mississippi?",
    vi: "Được rẽ phải khi đèn đỏ ở Mississippi không?",
    opts: [
      { en: "Never", vi: "Không bao giờ" },
      { en: "Yes, after a complete stop and yielding, unless a sign prohibits", vi: "Có, sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm" },
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
    en: "Texting while driving in Mississippi is:",
    vi: "Nhắn tin khi lái xe ở Mississippi là:",
    opts: [
      { en: "Fully legal for all drivers", vi: "Hoàn toàn hợp pháp với mọi tài xế" },
      { en: "Illegal for all drivers", vi: "Bất hợp pháp với tất cả tài xế" },
      { en: "Only illegal for under 18", vi: "Chỉ bất hợp pháp với dưới 18 tuổi" },
      { en: "Only illegal on highways", vi: "Chỉ bất hợp pháp trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "Mississippi bans texting while driving for all drivers.",
      vi: "Mississippi cấm nhắn tin khi lái cho tất cả tài xế.",
    },
  },
  {
    en: "What must you do when an emergency vehicle approaches with lights and siren?",
    vi: "Phải làm gì khi xe cứu thương tiến lại với đèn và còi?",
    opts: [
      { en: "Speed up to clear the road", vi: "Tăng tốc để thoát đường" },
      { en: "Pull to the right and stop until it passes", vi: "Kéo vào lề phải và dừng cho đến khi qua" },
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
    en: "At a 4-way stop in Mississippi, if two vehicles arrive simultaneously:",
    vi: "Ngã tư STOP 4 chiều Mississippi, 2 xe đến cùng lúc:",
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
      { en: "Speed limit change", vi: "Thay đổi giới hạn tốc độ" },
    ],
    ans: 1,
    exp: {
      en: "A solid yellow line on YOUR side means you cannot pass. You may only pass where there is a dashed yellow line on your side.",
      vi: "Vạch vàng liền ở phía BẠN = bạn không được vượt xe.",
    },
  },
  {
    en: "When must headlights be turned on in Mississippi?",
    vi: "Khi nào phải bật đèn pha ở Mississippi?",
    opts: [
      { en: "Only at night", vi: "Chỉ ban đêm" },
      { en: "30 minutes after sunset to 30 minutes before sunrise, and when visibility is reduced", vi: "30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi tầm nhìn giảm" },
      { en: "Only in heavy rain", vi: "Chỉ khi mưa lớn" },
      { en: "Only on highways", vi: "Chỉ trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "Mississippi requires headlights from 30 minutes after sunset to 30 minutes before sunrise, and when rain or fog reduces visibility.",
      vi: "Mississippi: bật đèn pha từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương giảm tầm nhìn.",
    },
  },
  {
    en: "What is the minimum following distance recommended in Mississippi?",
    vi: "Khoảng cách theo sau tối thiểu khuyến nghị ở Mississippi?",
    opts: [
      { en: "1 second", vi: "1 giây" },
      { en: "2 seconds", vi: "2 giây" },
      { en: "3 seconds", vi: "3 giây" },
      { en: "4 seconds", vi: "4 giây" },
    ],
    ans: 2,
    exp: {
      en: "Mississippi recommends a minimum 3-second following distance under normal conditions.",
      vi: "Mississippi khuyến nghị tối thiểu 3 giây trong điều kiện bình thường.",
    },
  },
  {
    en: "Mississippi Move Over Law requires:",
    vi: "Luật Move Over Mississippi yêu cầu:",
    opts: [
      { en: "Stop completely for all service vehicles", vi: "Dừng hoàn toàn cho mọi xe dịch vụ" },
      { en: "Move over a lane or slow significantly when passing stopped emergency/service vehicles on shoulder", vi: "Chuyển làn hoặc giảm tốc đáng kể khi qua xe cứu thương/dịch vụ dừng ven đường" },
      { en: "Flash your headlights", vi: "Nhấp đèn pha" },
      { en: "Only applies to police vehicles", vi: "Chỉ áp dụng với xe cảnh sát" },
    ],
    ans: 1,
    exp: {
      en: "Move over one lane OR slow down significantly when passing stopped emergency, tow, or utility vehicles on the road shoulder.",
      vi: "Chuyển làn HOẶC giảm tốc đáng kể khi qua xe cứu thương/kéo/tiện ích dừng ven đường.",
    },
  },
  {
    en: "Mississippi minimum liability insurance requires:",
    vi: "Bảo hiểm trách nhiệm tối thiểu ở Mississippi:",
    opts: [
      { en: "$25,000/$50,000/$25,000", vi: "$25,000/$50,000/$25,000" },
      { en: "$15,000/$30,000/$10,000", vi: "$15,000/$30,000/$10,000" },
      { en: "$30,000/$60,000/$25,000", vi: "$30,000/$60,000/$25,000" },
      { en: "No requirement", vi: "Không có yêu cầu" },
    ],
    ans: 0,
    exp: {
      en: "Mississippi requires minimum liability insurance of $25,000/$50,000/$25,000.",
      vi: "Mississippi yêu cầu bảo hiểm trách nhiệm tối thiểu: $25,000/$50,000/$25,000.",
    },
  },
  {
    en: "What does a pentagon (5-sided) sign indicate?",
    vi: "Biển hình ngũ giác (5 cạnh) chỉ điều gì?",
    opts: [
      { en: "Railroad crossing", vi: "Đường sắt" },
      { en: "School zone or school crossing warning", vi: "Cảnh báo khu trường học hoặc lối sang đường trường học" },
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
    en: "How far before a turn must you signal in Mississippi?",
    vi: "Phải bật xi-nhan trước khi rẽ bao xa ở Mississippi?",
    opts: [
      { en: "50 feet", vi: "50 feet" },
      { en: "100 feet", vi: "100 feet" },
      { en: "200 feet", vi: "200 feet" },
      { en: "At the intersection", vi: "Tại giao lộ" },
    ],
    ans: 1,
    exp: {
      en: "Mississippi requires signaling at least 100 feet before turning or changing lanes.",
      vi: "Mississippi yêu cầu bật xi-nhan ít nhất 100 feet (khoảng 30m) trước khi rẽ hoặc đổi làn.",
    },
  },
  {
    en: "What does a green traffic light mean?",
    vi: "Đèn xanh có nghĩa gì?",
    opts: [
      { en: "Go without yielding to anyone", vi: "Đi mà không cần nhường ai" },
      { en: "Go, but yield to pedestrians in crosswalks and vehicles already in the intersection", vi: "Đi, nhưng nhường người đi bộ và xe đã trong giao lộ" },
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
    en: "Mississippi helmet law is unique because:",
    vi: "Luật mũ bảo hiểm Mississippi đặc biệt vì:",
    opts: [
      { en: "Required for all riders", vi: "Bắt buộc cho tất cả người lái" },
      { en: "Required for riders UNDER 26, not required at 26 and older", vi: "Bắt buộc cho người DƯỚI 26, không bắt buộc từ 26 tuổi trở lên" },
      { en: "Only required on highways", vi: "Chỉ bắt buộc trên cao tốc" },
      { en: "Not required for anyone", vi: "Không bắt buộc cho ai" },
    ],
    ans: 1,
    exp: {
      en: "Mississippi uniquely requires helmets for riders UNDER 26. At 26+, helmets are not legally required — unique law in the US!",
      vi: "Mississippi bắt buộc mũ cho người DƯỚI 26 tuổi. Từ 26 tuổi trở lên không bắt buộc — luật độc nhất ở Mỹ!",
    },
  },
  {
    en: "What is Mississippi's default interstate highway speed limit?",
    vi: "Giới hạn tốc độ mặc định trên interstate Mississippi?",
    opts: [
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
      { en: "80 mph", vi: "80 mph" },
    ],
    ans: 1,
    exp: {
      en: "Mississippi interstates have a 70 mph default speed limit.",
      vi: "Interstate Mississippi có giới hạn mặc định 70 mph.",
    },
  },
  {
    en: "In MS, when approaching a school bus with red flashing lights:",
    vi: "Ở MS, khi tiếp cận xe buýt trường học đèn đỏ nhấp nháy:",
    opts: [
      { en: "Slow to 20 mph", vi: "Giảm còn 20 mph" },
      { en: "Stop in both directions unless a median separates", vi: "Dừng cả 2 chiều trừ khi có dải phân cách" },
      { en: "Only stop if behind it", vi: "Chỉ dừng nếu đi phía sau" },
      { en: "Honk and pass", vi: "Bấm còi và vượt" },
    ],
    ans: 1,
    exp: {
      en: "Stop in both directions when a school bus has red lights flashing, unless a median separates.",
      vi: "Dừng cả 2 chiều khi xe buýt đèn đỏ nhấp nháy, trừ khi có dải phân cách.",
    },
  },
  {
    en: "At a 4-way stop in MS with simultaneous arrival, who goes first?",
    vi: "Ngã tư STOP Mississippi, 2 xe đến cùng lúc, ai đi trước?",
    opts: [
      { en: "Larger vehicle first", vi: "Xe lớn hơn trước" },
      { en: "Vehicle on the right", vi: "Xe ở bên phải" },
      { en: "Vehicle going straight", vi: "Xe đi thẳng" },
      { en: "Whoever honks", vi: "Ai bấm còi trước" },
    ],
    ans: 1,
    exp: {
      en: "Yield to the vehicle on your right when arriving simultaneously.",
      vi: "Nhường xe ở bên phải bạn khi đến cùng lúc.",
    },
  },
  {
    en: "What color are warning signs in Mississippi?",
    vi: "Biển cảnh báo ở Mississippi có màu gì?",
    opts: [
      { en: "Red and white", vi: "Đỏ và trắng" },
      { en: "Blue and white", vi: "Xanh và trắng" },
      { en: "Yellow with black symbols", vi: "Vàng với ký hiệu đen" },
      { en: "Green and white", vi: "Xanh lá và trắng" },
    ],
    ans: 2,
    exp: {
      en: "Warning signs are yellow diamond-shaped with black symbols/text.",
      vi: "Biển cảnh báo màu vàng hình thoi với ký hiệu/chữ đen.",
    },
  },
  {
    en: "What is the recommended following distance in Mississippi?",
    vi: "Khoảng cách theo sau khuyến nghị ở Mississippi?",
    opts: [
      { en: "1 second", vi: "1 giây" },
      { en: "2 seconds", vi: "2 giây" },
      { en: "3 seconds", vi: "3 giây" },
      { en: "5 seconds", vi: "5 giây" },
    ],
    ans: 2,
    exp: {
      en: "MS recommends minimum 3-second following distance.",
      vi: "MS khuyến nghị tối thiểu 3 giây.",
    },
  },
  {
    en: "What does a flashing yellow light mean in Mississippi?",
    vi: "Đèn vàng nhấp nháy ở Mississippi có nghĩa gì?",
    opts: [
      { en: "Stop completely", vi: "Dừng hoàn toàn" },
      { en: "Proceed with caution", vi: "Đi qua thận trọng" },
      { en: "Same as STOP sign", vi: "Giống biển STOP" },
      { en: "Emergency ahead", vi: "Khẩn cấp phía trước" },
    ],
    ans: 1,
    exp: {
      en: "Flashing yellow means slow down and proceed with caution.",
      vi: "Đèn vàng nhấp nháy: giảm tốc và đi qua thận trọng.",
    },
  },
  {
    en: "In Mississippi, headlights are required from:",
    vi: "Ở Mississippi, phải bật đèn pha từ:",
    opts: [
      { en: "Only at night", vi: "Chỉ ban đêm" },
      { en: "30 min after sunset to 30 min before sunrise, and in rain/fog", vi: "30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương" },
      { en: "Only in rain", vi: "Chỉ khi mưa" },
      { en: "Highways only", vi: "Chỉ trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "MS headlights from 30 min after sunset to 30 min before sunrise, and when weather reduces visibility.",
      vi: "MS: đèn pha từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi thời tiết giảm tầm nhìn.",
    },
  },
  {
    en: "What is the rural highway speed limit in Mississippi?",
    vi: "Giới hạn tốc độ trên highway nông thôn Mississippi?",
    opts: [
      { en: "55 mph", vi: "55 mph" },
      { en: "60 mph", vi: "60 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
    ],
    ans: 2,
    exp: {
      en: "Mississippi rural highways have a default speed limit of 65 mph.",
      vi: "Highway nông thôn Mississippi có giới hạn mặc định 65 mph.",
    },
  },
];
