import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const AL_PASS_COUNT = 32;
export const AL_HERO_GRADIENT =
  "linear-gradient(135deg,#1a0800 0%, #92400e 55%, #0f2a47 100%)";

export const AL_QUESTIONS: QuizQuestion[] = [
  {
    en: "What is the default speed limit in an Alabama residential area?",
    vi: "Giới hạn tốc độ mặc định khu dân cư Alabama?",
    opts: [
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
    ],
    ans: 1,
    exp: {
      en: "Alabama residential areas default to 25 mph unless otherwise posted.",
      vi: "Khu dân cư Alabama mặc định 25 mph trừ khi có biển báo khác.",
    },
  },
  {
    en: "What is the BAC limit for DUI in Alabama for adult drivers?",
    vi: "Giới hạn BAC DUI cho tài xế người lớn ở Alabama?",
    opts: [
      { en: "0.06%", vi: "0.06%" },
      { en: "0.08%", vi: "0.08%" },
      { en: "0.10%", vi: "0.10%" },
      { en: "0.04%", vi: "0.04%" },
    ],
    ans: 1,
    exp: {
      en: "Alabama's DUI limit for adults is 0.08% BAC. Under 21: 0.02%. CDL drivers: 0.04%.",
      vi: "DUI Alabama người lớn: BAC 0.08%. Dưới 21 tuổi: 0.02%. CDL: 0.04%.",
    },
  },
  {
    en: "Are motorcycle helmets required in Alabama?",
    vi: "Có bắt buộc đội mũ bảo hiểm xe máy ở Alabama không?",
    opts: [
      { en: "Yes, for all riders", vi: "Có, cho tất cả người lái" },
      { en: "No, not required for adults 21+", vi: "Không, không bắt buộc với người 21+" },
      { en: "Only on highways", vi: "Chỉ trên cao tốc" },
      { en: "Only for passengers", vi: "Chỉ cho hành khách" },
    ],
    ans: 0,
    exp: {
      en: "Alabama requires motorcycle helmets for ALL riders, regardless of age — one of the stricter state laws.",
      vi: "Alabama bắt buộc mũ bảo hiểm cho TẤT CẢ người lái xe máy, bất kể tuổi — một trong những luật nghiêm nhất.",
    },
  },
  {
    en: "What is the speed limit on Alabama interstate highways?",
    vi: "Giới hạn tốc độ trên interstate Alabama?",
    opts: [
      { en: "60 mph", vi: "60 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
    ],
    ans: 2,
    exp: {
      en: "Alabama interstate highways have a default speed limit of 70 mph for passenger vehicles.",
      vi: "Interstate Alabama có giới hạn mặc định 70 mph cho xe hơi thông thường.",
    },
  },
  {
    en: "What is Alabama's school zone speed limit when children are present?",
    vi: "Giới hạn tốc độ khu trường học Alabama khi có trẻ em?",
    opts: [
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
    ],
    ans: 1,
    exp: {
      en: "Alabama school zones have a 20 mph speed limit when children are present or the lights are flashing.",
      vi: "Khu trường học Alabama: 20 mph khi có trẻ em hoặc đèn nhấp nháy.",
    },
  },
  {
    en: "Alabama's Move Over Law requires:",
    vi: "Luật Move Over Alabama yêu cầu:",
    opts: [
      { en: "Stop completely for all service vehicles", vi: "Dừng hoàn toàn cho mọi xe dịch vụ" },
      {
        en: "Move over a lane or slow significantly when passing stopped emergency or service vehicles on the shoulder",
        vi: "Chuyển làn hoặc giảm tốc đáng kể khi qua xe cứu thương/dịch vụ dừng ven đường",
      },
      { en: "Flash headlights when passing", vi: "Nhấp đèn pha khi vượt" },
      { en: "Only applies to police cars", vi: "Chỉ áp dụng cho xe cảnh sát" },
    ],
    ans: 1,
    exp: {
      en: "Alabama's law requires moving over or reducing speed significantly when passing emergency or service vehicles stopped on the shoulder.",
      vi: "Luật Alabama: chuyển làn hoặc giảm tốc đáng kể khi qua xe cứu thương/dịch vụ dừng ven đường.",
    },
  },
  {
    en: "In Alabama, seat belts are required for:",
    vi: "Dây an toàn ở Alabama bắt buộc cho:",
    opts: [
      { en: "Only the driver", vi: "Chỉ tài xế" },
      { en: "Driver and all front seat passengers", vi: "Tài xế và tất cả hành khách ghế trước" },
      { en: "All vehicle occupants", vi: "Tất cả người trong xe" },
      { en: "Only children under 15", vi: "Chỉ trẻ em dưới 15 tuổi" },
    ],
    ans: 2,
    exp: {
      en: "Alabama requires ALL vehicle occupants to wear seat belts regardless of seating position.",
      vi: "Alabama bắt buộc tất cả người trong xe thắt dây an toàn bất kể ngồi ở đâu.",
    },
  },
  {
    en: "What does a flashing red traffic light mean in Alabama?",
    vi: "Đèn đỏ nhấp nháy có nghĩa gì ở Alabama?",
    opts: [
      { en: "Yield to cross traffic", vi: "Nhường xe ngang" },
      { en: "Treat it exactly like a STOP sign", vi: "Xử lý giống hệt biển STOP" },
      { en: "Emergency vehicle approaching", vi: "Xe cứu thương đang đến" },
      { en: "Proceed with caution", vi: "Đi thận trọng" },
    ],
    ans: 1,
    exp: {
      en: "A flashing red light in Alabama means treat it like a STOP sign — complete stop, yield, then proceed when safe.",
      vi: "Đèn đỏ nhấp nháy Alabama = biển STOP: dừng hoàn toàn, nhường, rồi đi khi an toàn.",
    },
  },
  {
    en: "In Alabama, when must you stop for a school bus?",
    vi: "Khi nào phải dừng cho xe buýt trường học ở Alabama?",
    opts: [
      { en: "Only when behind it", vi: "Chỉ khi ở phía sau" },
      {
        en: "When red lights flash — both directions unless separated by a median",
        vi: "Khi đèn đỏ nhấp nháy — cả 2 chiều trừ khi có dải phân cách",
      },
      { en: "Slow to 15 mph and pass", vi: "Giảm còn 15 mph và vượt" },
      { en: "Only if children are visible", vi: "Chỉ nếu thấy trẻ em" },
    ],
    ans: 1,
    exp: {
      en: "You must stop for a school bus with flashing red lights in both directions, unless a median separates the lanes.",
      vi: "Phải dừng cho xe buýt đèn đỏ nhấp nháy cả 2 chiều, trừ khi có dải phân cách.",
    },
  },
  {
    en: "What is the minimum following distance recommended in Alabama?",
    vi: "Khoảng cách theo sau tối thiểu khuyến nghị ở Alabama?",
    opts: [
      { en: "1 second", vi: "1 giây" },
      { en: "2 seconds", vi: "2 giây" },
      { en: "3 seconds", vi: "3 giây" },
      { en: "4 seconds", vi: "4 giây" },
    ],
    ans: 2,
    exp: {
      en: "Alabama recommends maintaining a minimum 3-second following distance under normal conditions.",
      vi: "Alabama khuyến nghị tối thiểu 3 giây trong điều kiện bình thường.",
    },
  },
  {
    en: "Can you turn right on red in Alabama?",
    vi: "Có được rẽ phải khi đèn đỏ ở Alabama không?",
    opts: [
      { en: "Never", vi: "Không bao giờ" },
      {
        en: "Yes, after stopping and yielding, unless a sign prohibits it",
        vi: "Có, sau khi dừng và nhường, trừ khi có biển cấm",
      },
      { en: "Only on weekdays", vi: "Chỉ ngày trong tuần" },
      { en: "Only when no pedestrians are present", vi: "Chỉ khi không có người đi bộ" },
    ],
    ans: 1,
    exp: {
      en: "Right on red is permitted in Alabama after a complete stop and yielding to traffic and pedestrians.",
      vi: "Được rẽ phải khi đèn đỏ sau khi dừng hoàn toàn và nhường đường.",
    },
  },
  {
    en: "What does a solid yellow line on your side of the road mean?",
    vi: "Vạch vàng liền ở phía bên bạn có nghĩa là?",
    opts: [
      { en: "Passing is permitted", vi: "Được phép vượt" },
      { en: "No passing from your side", vi: "Không được vượt từ phía bạn" },
      { en: "Speed zone ahead", vi: "Khu vực tốc độ phía trước" },
      { en: "Construction zone", vi: "Khu xây dựng" },
    ],
    ans: 1,
    exp: {
      en: "A solid yellow line on YOUR side means you cannot pass. The dashed line on the other side means they can pass.",
      vi: "Vạch vàng liền ở phía BẠN = bạn không được vượt. Vạch đứt ở phía kia = họ được vượt.",
    },
  },
  {
    en: "In Alabama, what must you do when approaching an emergency vehicle with lights on?",
    vi: "Ở Alabama, phải làm gì khi tiếp cận xe cứu thương có đèn?",
    opts: [
      { en: "Speed up to clear the road", vi: "Tăng tốc để thoát đường" },
      { en: "Pull to the right and stop", vi: "Kéo vào lề phải và dừng" },
      { en: "Continue at normal speed", vi: "Tiếp tục tốc độ bình thường" },
      { en: "Move to the left", vi: "Chuyển sang trái" },
    ],
    ans: 1,
    exp: {
      en: "Pull to the right side of the road and stop until all emergency vehicles have passed.",
      vi: "Kéo vào lề phải và dừng cho đến khi tất cả xe cứu thương qua hết.",
    },
  },
  {
    en: "What does Alabama law say about texting while driving?",
    vi: "Luật Alabama về nhắn tin khi lái xe?",
    opts: [
      { en: "Texting is fully legal in Alabama", vi: "Nhắn tin hoàn toàn hợp pháp ở Alabama" },
      { en: "Texting while driving is banned for all drivers", vi: "Cấm nhắn tin khi lái xe cho tất cả tài xế" },
      { en: "Only banned for drivers under 18", vi: "Chỉ cấm với tài xế dưới 18 tuổi" },
      { en: "Only banned in school zones", vi: "Chỉ cấm trong khu trường học" },
    ],
    ans: 1,
    exp: {
      en: "Alabama bans texting while driving for ALL drivers. This ban became effective in 2012.",
      vi: "Alabama cấm nhắn tin khi lái cho TẤT CẢ tài xế. Lệnh cấm có hiệu lực từ 2012.",
    },
  },
  {
    en: "At a 4-way stop in Alabama with simultaneous arrivals, who goes first?",
    vi: "Ngã tư STOP Alabama, 2 xe đến cùng lúc, ai đi trước?",
    opts: [
      { en: "The vehicle on the left", vi: "Xe bên trái" },
      { en: "The vehicle on the right", vi: "Xe bên phải" },
      { en: "The vehicle going straight", vi: "Xe đi thẳng" },
      { en: "The larger vehicle", vi: "Xe lớn hơn" },
    ],
    ans: 1,
    exp: {
      en: "When two vehicles arrive at a 4-way stop simultaneously, yield to the vehicle on your right.",
      vi: "2 xe đến cùng lúc: nhường xe ở bên phải bạn.",
    },
  },
  {
    en: "What does a yellow diamond sign indicate in Alabama?",
    vi: "Biển hình thoi vàng ở Alabama chỉ điều gì?",
    opts: [
      { en: "A mandatory rule", vi: "Quy định bắt buộc" },
      { en: "A warning about hazards ahead", vi: "Cảnh báo về nguy hiểm phía trước" },
      { en: "Highway information", vi: "Thông tin cao tốc" },
      { en: "A work zone", vi: "Khu vực xây dựng" },
    ],
    ans: 1,
    exp: {
      en: "Yellow diamond signs are warning signs alerting you to potential hazards or changing road conditions ahead.",
      vi: "Biển hình thoi vàng là cảnh báo — thông báo nguy hiểm tiềm ẩn hoặc điều kiện đường thay đổi phía trước.",
    },
  },
  {
    en: "What is Alabama's minimum liability insurance requirement?",
    vi: "Yêu cầu bảo hiểm trách nhiệm tối thiểu ở Alabama?",
    opts: [
      { en: "$15,000/$30,000/$5,000", vi: "$15,000/$30,000/$5,000" },
      { en: "$25,000/$50,000/$25,000", vi: "$25,000/$50,000/$25,000" },
      { en: "$30,000/$60,000/$25,000", vi: "$30,000/$60,000/$25,000" },
      { en: "No minimum", vi: "Không có yêu cầu" },
    ],
    ans: 0,
    exp: {
      en: "Alabama requires minimum liability: $25,000 per person bodily injury / $50,000 per accident / $25,000 property damage.",
      vi: "Alabama yêu cầu tối thiểu: $25K/người thương tích · $50K/tai nạn · $25K hư hại tài sản.",
    },
  },
  {
    en: "When following another vehicle in Alabama, what is the recommended rule?",
    vi: "Khi đi theo xe khác ở Alabama, quy tắc khuyến nghị là?",
    opts: [
      { en: "Stay as close as possible", vi: "Sát nhất có thể" },
      { en: "3-second rule minimum", vi: "Quy tắc tối thiểu 3 giây" },
      { en: "One car length per 10 mph", vi: "Một chiều dài xe mỗi 10 mph" },
      { en: "Stay in the right lane only", vi: "Chỉ ở làn phải" },
    ],
    ans: 1,
    exp: {
      en: "Use the 3-second rule: pick a fixed point, when the car ahead passes it, your car should not reach it within 3 seconds.",
      vi: "Quy tắc 3 giây: chọn điểm cố định, khi xe trước qua đó, xe bạn không được đến trong vòng 3 giây.",
    },
  },
  {
    en: "In Alabama, when are headlights required?",
    vi: "Khi nào phải bật đèn pha ở Alabama?",
    opts: [
      { en: "Only at night", vi: "Chỉ ban đêm" },
      {
        en: "From 30 minutes after sunset to 30 minutes before sunrise, and when visibility is reduced",
        vi: "Từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi tầm nhìn giảm",
      },
      { en: "Only in rain", vi: "Chỉ khi mưa" },
      { en: "Only on rural roads", vi: "Chỉ trên đường nông thôn" },
    ],
    ans: 1,
    exp: {
      en: "Alabama requires headlights from 30 minutes after sunset to 30 minutes before sunrise, and when weather or visibility conditions require it.",
      vi: "Alabama: bật đèn từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi thời tiết hoặc tầm nhìn xấu.",
    },
  },
  {
    en: "What does the Basic Speed Law mean in Alabama?",
    vi: "Luật Tốc Độ Cơ Bản Alabama có nghĩa là gì?",
    opts: [
      { en: "Always drive at exactly the posted limit", vi: "Luôn lái đúng tốc độ được đăng" },
      {
        en: "Drive at a speed that is safe and reasonable for current conditions, even if below the posted limit",
        vi: "Lái ở tốc độ an toàn và hợp lý cho điều kiện hiện tại, dù dưới giới hạn",
      },
      { en: "Speed limits only apply on highways", vi: "Giới hạn tốc độ chỉ áp dụng trên cao tốc" },
      { en: "Minimum speed is always 35 mph", vi: "Tốc độ tối thiểu luôn là 35 mph" },
    ],
    ans: 1,
    exp: {
      en: "Alabama's basic speed law requires driving at a speed reasonable and proper for road and weather conditions, even below the posted limit.",
      vi: "Luật cơ bản Alabama: lái ở tốc độ hợp lý và phù hợp với điều kiện đường và thời tiết, dù dưới giới hạn.",
    },
  },
  {
    en: "In Alabama, what is the rule for passing another vehicle?",
    vi: "Quy tắc vượt xe ở Alabama?",
    opts: [
      { en: "Pass on either side", vi: "Vượt cả 2 bên" },
      {
        en: "Pass on the left and return to the right when safely clear",
        vi: "Vượt bên trái, rồi về bên phải khi đã qua an toàn",
      },
      { en: "Pass on the right when convenient", vi: "Vượt bên phải khi tiện" },
      { en: "No passing allowed on any two-lane road", vi: "Không được vượt trên đường 2 làn" },
    ],
    ans: 1,
    exp: {
      en: "In Alabama, pass on the left and return to the right lane after safely passing the vehicle.",
      vi: "Alabama: vượt bên trái, rồi về làn phải sau khi đã qua xe đó an toàn.",
    },
  },
  {
    en: "What happens if you are caught driving without insurance in Alabama?",
    vi: "Hậu quả khi lái xe không bảo hiểm ở Alabama?",
    opts: [
      { en: "Small warning fine", vi: "Phạt cảnh báo nhỏ" },
      {
        en: "License and registration suspension until proof of insurance is provided",
        vi: "Đình chỉ bằng lái và đăng ký cho đến khi cung cấp bằng chứng bảo hiểm",
      },
      { en: "Verbal warning only", vi: "Chỉ cảnh cáo miệng" },
      { en: "Vehicle impounded permanently", vi: "Thu xe vĩnh viễn" },
    ],
    ans: 1,
    exp: {
      en: "Driving without insurance in Alabama results in suspension of your driver's license and vehicle registration.",
      vi: "Lái xe không bảo hiểm ở Alabama: đình chỉ bằng lái và đăng ký xe.",
    },
  },
  {
    en: "How far before a turn must you signal in Alabama?",
    vi: "Phải bật xi-nhan trước khi rẽ bao xa ở Alabama?",
    opts: [
      { en: "50 feet", vi: "50 feet" },
      { en: "100 feet", vi: "100 feet" },
      { en: "200 feet", vi: "200 feet" },
      { en: "At the intersection", vi: "Tại giao lộ" },
    ],
    ans: 1,
    exp: {
      en: "Alabama requires signaling at least 100 feet before turning or changing lanes.",
      vi: "Alabama yêu cầu bật xi-nhan ít nhất 100 feet trước khi rẽ hoặc đổi làn.",
    },
  },
  {
    en: "What shape is a STOP sign in Alabama?",
    vi: "Biển STOP ở Alabama có hình dạng gì?",
    opts: [
      { en: "Triangle", vi: "Tam giác" },
      { en: "Circle", vi: "Tròn" },
      { en: "Octagon (8 sides)", vi: "Bát giác (8 cạnh)" },
      { en: "Diamond", vi: "Hình thoi" },
    ],
    ans: 2,
    exp: {
      en: "STOP signs always have an octagon (8-sided) shape and are red — the same across the entire United States.",
      vi: "Biển STOP luôn có hình bát giác (8 cạnh) và màu đỏ — giống nhau trên toàn nước Mỹ.",
    },
  },
  {
    en: "In Alabama, what does it mean when the center lane has yellow lines on both sides?",
    vi: "Khi làn giữa có vạch vàng ở cả 2 bên ở Alabama có nghĩa gì?",
    opts: [
      { en: "High-speed lane", vi: "Làn tốc độ cao" },
      {
        en: "Two-way left turn lane — for left turns only by both directions",
        vi: "Làn rẽ trái 2 chiều — chỉ dùng để rẽ trái",
      },
      { en: "Emergency stopping lane", vi: "Làn dừng khẩn cấp" },
      { en: "Merging zone", vi: "Khu vực nhập" },
    ],
    ans: 1,
    exp: {
      en: "A center lane with yellow lines on both sides is a Two-Way Left Turn Lane (TWLTL) — used ONLY for turning left, by vehicles in both directions.",
      vi: "Làn giữa vạch vàng cả 2 bên là Làn Rẽ Trái 2 Chiều (TWLTL) — chỉ dùng để rẽ trái.",
    },
  },
  {
    en: "In Alabama, how far from a fire hydrant must you park?",
    vi: "Phải đỗ xe cách họng cứu hỏa bao xa ở Alabama?",
    opts: [
      { en: "5 feet", vi: "5 feet" },
      { en: "10 feet", vi: "10 feet" },
      { en: "15 feet", vi: "15 feet" },
      { en: "25 feet", vi: "25 feet" },
    ],
    ans: 2,
    exp: {
      en: "Alabama prohibits parking within 15 feet of a fire hydrant to ensure fire trucks can access it.",
      vi: "Alabama cấm đỗ xe trong vòng 15 feet từ họng cứu hỏa để xe cứu hỏa tiếp cận được.",
    },
  },
  {
    en: "When driving in heavy rain in Alabama, you should:",
    vi: "Khi lái xe trong mưa lớn ở Alabama?",
    opts: [
      { en: "Drive at the normal speed limit", vi: "Lái ở tốc độ giới hạn bình thường" },
      {
        en: "Reduce speed and increase following distance; use low beam headlights",
        vi: "Giảm tốc và tăng khoảng cách; dùng đèn pha gần",
      },
      { en: "Use high beam headlights for better visibility", vi: "Dùng đèn pha xa để nhìn rõ hơn" },
      { en: "Stop on the highway shoulder", vi: "Dừng trên lề cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "In heavy rain: reduce speed significantly, increase following distance, and use low beam headlights (not high beams). Pull off safely if visibility is too poor.",
      vi: "Mưa lớn: giảm tốc nhiều, tăng khoảng cách, dùng đèn pha gần (không phải xa). Dừng an toàn nếu tầm nhìn quá kém.",
    },
  },
  {
    en: "What is Alabama's law about open containers of alcohol in vehicles?",
    vi: "Luật Alabama về chai/lon rượu đã mở trong xe?",
    opts: [
      { en: "Passengers may have open containers", vi: "Hành khách được có chai đã mở" },
      {
        en: "Open containers are prohibited in the passenger compartment",
        vi: "Cấm chai/lon đã mở trong khoang hành khách",
      },
      { en: "Only prohibited if the driver is drinking", vi: "Chỉ cấm nếu tài xế đang uống" },
      { en: "Allowed if kept in a bag", vi: "Được phép nếu để trong túi" },
    ],
    ans: 1,
    exp: {
      en: "Alabama prohibits open containers of alcohol in the passenger area of any motor vehicle on a public road.",
      vi: "Alabama cấm chai/lon rượu đã mở trong khoang hành khách của bất kỳ phương tiện nào trên đường công cộng.",
    },
  },
  {
    en: "What is the penalty for Alabama's first DUI offense?",
    vi: "Hình phạt DUI lần đầu ở Alabama?",
    opts: [
      { en: "Warning only", vi: "Chỉ cảnh cáo" },
      {
        en: "Fine $600-$2,100, jail 1-365 days, license suspension 90 days",
        vi: "Phạt $600-$2,100, tù 1-365 ngày, thu bằng 90 ngày",
      },
      { en: "Small fine and warning", vi: "Phạt nhỏ và cảnh cáo" },
      { en: "Automatic 5-year ban", vi: "Tự động cấm 5 năm" },
    ],
    ans: 1,
    exp: {
      en: "First DUI in Alabama: fine $600-$2,100, imprisonment 1 year maximum, license revocation 90 days, DUI school required.",
      vi: "DUI lần đầu Alabama: phạt $600-$2,100, tù tối đa 1 năm, thu bằng 90 ngày, bắt buộc học DUI.",
    },
  },
  {
    en: "What does a white rectangular sign indicate in Alabama?",
    vi: "Biển hình chữ nhật trắng ở Alabama chỉ điều gì?",
    opts: [
      { en: "Warning about hazards", vi: "Cảnh báo nguy hiểm" },
      { en: "Regulatory — rules you must follow", vi: "Quy định — quy tắc bạn phải tuân theo" },
      { en: "Information about services", vi: "Thông tin về dịch vụ" },
      { en: "Highway route marker", vi: "Dấu hiệu tuyến đường" },
    ],
    ans: 1,
    exp: {
      en: "White rectangular signs are regulatory signs — they state rules and regulations you must obey, like speed limits and no parking zones.",
      vi: "Biển chữ nhật trắng là biển quy định — quy tắc và quy định bạn phải tuân theo, như giới hạn tốc độ và khu cấm đỗ.",
    },
  },
  {
    en: "What should you do if your brakes fail while driving in Alabama?",
    vi: "Phải làm gì nếu phanh hỏng khi lái xe ở Alabama?",
    opts: [
      { en: "Turn off the engine immediately", vi: "Tắt máy ngay" },
      {
        en: "Pump the brakes, downshift, use emergency brake gently, and steer to safety",
        vi: "Bơm phanh, giảm số, dùng phanh tay nhẹ, lái đến nơi an toàn",
      },
      { en: "Steer into oncoming traffic", vi: "Lái vào xe đối chiều" },
      { en: "Open the door to slow down", vi: "Mở cửa để giảm tốc" },
    ],
    ans: 1,
    exp: {
      en: "If brakes fail: rapidly pump the brake pedal, downshift to slow down, gently apply the emergency brake, and steer toward a safe area.",
      vi: "Phanh hỏng: bơm phanh nhanh, giảm số, dùng phanh tay nhẹ nhàng, lái đến khu an toàn.",
    },
  },
  {
    en: "In Alabama, when entering a highway from an on-ramp, you should:",
    vi: "Khi nhập đường cao tốc từ đường dẫn ở Alabama?",
    opts: [
      { en: "Stop and wait for a gap", vi: "Dừng và chờ khoảng trống" },
      {
        en: "Yield to highway traffic and accelerate to highway speed before merging",
        vi: "Nhường xe trên cao tốc và tăng tốc đến tốc độ cao tốc trước khi nhập",
      },
      { en: "Merge immediately without looking", vi: "Nhập ngay mà không cần nhìn" },
      { en: "Use the emergency lane", vi: "Dùng làn khẩn cấp" },
    ],
    ans: 1,
    exp: {
      en: "When entering a highway, yield to existing traffic and use the on-ramp to accelerate to highway speed before merging.",
      vi: "Khi nhập cao tốc: nhường xe đang chạy và dùng đường dẫn để tăng tốc đến tốc độ cao tốc trước khi nhập.",
    },
  },
  {
    en: "What does a green traffic light mean in Alabama?",
    vi: "Đèn xanh có nghĩa gì ở Alabama?",
    opts: [
      { en: "Go without yielding to anyone", vi: "Đi mà không cần nhường ai" },
      {
        en: "Go, but yield to pedestrians and vehicles lawfully in the intersection",
        vi: "Đi, nhưng nhường người đi bộ và xe đã hợp pháp trong giao lộ",
      },
      { en: "Stop and wait for pedestrians to clear", vi: "Dừng và chờ người đi bộ đi hết" },
      { en: "Accelerate through quickly", vi: "Tăng tốc qua nhanh" },
    ],
    ans: 1,
    exp: {
      en: "Green means go — but you must yield to pedestrians in crosswalks and vehicles already lawfully in the intersection.",
      vi: "Xanh = đi — nhưng nhường người đi bộ và xe đã hợp pháp trong giao lộ.",
    },
  },
  {
    en: "In Alabama, before changing lanes you must:",
    vi: "Trước khi đổi làn ở Alabama phải:",
    opts: [
      { en: "Just check the rearview mirror", vi: "Chỉ kiểm tra gương chiếu hậu" },
      {
        en: "Signal, check mirrors, check blind spots, then change when safe",
        vi: "Bật xi-nhan, kiểm tra gương, kiểm tra điểm mù, rồi đổi khi an toàn",
      },
      { en: "Honk to warn other drivers", vi: "Bấm còi để cảnh báo" },
      { en: "Move suddenly to beat traffic", vi: "Di chuyển đột ngột để vượt xe" },
    ],
    ans: 1,
    exp: {
      en: "Before lane changes: signal your intention, check all mirrors, check blind spots by looking over your shoulder, then change when clear.",
      vi: "Trước khi đổi làn: bật xi-nhan, kiểm tra gương, kiểm tra điểm mù bằng cách quay đầu, rồi đổi khi đường trống.",
    },
  },
  {
    en: "What does a YIELD sign require in Alabama?",
    vi: "Biển YIELD yêu cầu gì ở Alabama?",
    opts: [
      { en: "Stop completely", vi: "Dừng hoàn toàn" },
      {
        en: "Slow down and give right-of-way to cross traffic, stopping if necessary",
        vi: "Giảm tốc và nhường đường cho xe ngang, dừng nếu cần",
      },
      { en: "Maintain speed", vi: "Giữ nguyên tốc độ" },
      { en: "Speed up to merge", vi: "Tăng tốc để nhập" },
    ],
    ans: 1,
    exp: {
      en: "YIELD means slow down, look for conflicting traffic, and stop if necessary to give the right-of-way.",
      vi: "YIELD: giảm tốc, quan sát xe đối chiều, và dừng nếu cần để nhường đường.",
    },
  },
  {
    en: "What must you do at a railroad crossing when the lights are flashing and gates are down?",
    vi: "Phải làm gì tại đường sắt khi đèn nhấp nháy và rào hạ xuống?",
    opts: [
      { en: "Slow to 15 mph and proceed", vi: "Giảm còn 15 mph và đi tiếp" },
      {
        en: "Stop and wait until lights stop flashing and gates rise",
        vi: "Dừng và chờ đến khi đèn tắt và rào nâng lên",
      },
      { en: "Drive around the gate if no train visible", vi: "Lái vòng rào nếu không thấy tàu" },
      { en: "Flash headlights and proceed", vi: "Nhấp đèn pha và đi tiếp" },
    ],
    ans: 1,
    exp: {
      en: "When railroad lights flash and gates come down, STOP and wait. Do not go around the gates — it is extremely dangerous and illegal.",
      vi: "Khi đèn đường sắt nhấp nháy và rào hạ: DỪNG và chờ. Không lái vòng rào — cực kỳ nguy hiểm và bất hợp pháp.",
    },
  },
];
