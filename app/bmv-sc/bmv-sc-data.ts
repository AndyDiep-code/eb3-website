import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const SC_PASS_COUNT = 24;

export const SC_QUESTIONS: QuizQuestion[] = [
  {
    en: "What is the default speed limit in a South Carolina city or town?",
    vi: "Giới hạn tốc độ mặc định trong thành phố South Carolina?",
    opts: [
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
      { en: "45 mph", vi: "45 mph" },
    ],
    ans: 1,
    exp: {
      en: "South Carolina urban areas default to 30 mph unless otherwise posted.",
      vi: "Khu đô thị South Carolina mặc định 30 mph trừ khi có biển báo khác.",
    },
  },
  {
    en: "South Carolina's Stefan's Law (Move Over Law) requires:",
    vi: "Luật Stefan (Move Over Law) ở SC yêu cầu:",
    opts: [
      { en: "Stop completely for all emergency vehicles", vi: "Dừng hoàn toàn cho mọi xe cứu thương" },
      {
        en: "Move over a lane or slow to 25 mph below the posted limit when passing stopped emergency, law enforcement, or service vehicles",
        vi: "Chuyển làn hoặc giảm còn 25 mph dưới giới hạn khi qua xe cứu thương/cảnh sát/dịch vụ dừng ven đường",
      },
      { en: "Flash headlights when passing", vi: "Nhấp đèn pha khi vượt qua" },
      { en: "Only applies to police vehicles", vi: "Chỉ áp dụng cho xe cảnh sát" },
    ],
    ans: 1,
    exp: {
      en: "Stefan's Law: move over one lane or slow to 25 mph below the posted limit when passing stopped emergency, law enforcement, or service vehicles.",
      vi: "Luật Stefan SC: chuyển làn hoặc giảm còn 25 mph dưới giới hạn khi qua xe cứu thương/cảnh sát/dịch vụ dừng ven đường.",
    },
  },
  {
    en: "What is the DUI BAC limit for adult drivers in South Carolina?",
    vi: "Giới hạn BAC DUI cho tài xế người lớn ở SC?",
    opts: [
      { en: "0.06%", vi: "0.06%" },
      { en: "0.08%", vi: "0.08%" },
      { en: "0.10%", vi: "0.10%" },
      { en: "0.04%", vi: "0.04%" },
    ],
    ans: 1,
    exp: {
      en: "South Carolina's DUI limit for adult drivers is 0.08% BAC. Commercial drivers: 0.04%. Under 21: 0.02%.",
      vi: "Giới hạn DUI SC người lớn: BAC 0.08%. CDL: 0.04%. Dưới 21 tuổi: 0.02%.",
    },
  },
  {
    en: "Are motorcycle helmets required in South Carolina?",
    vi: "Có bắt buộc đội mũ bảo hiểm xe máy ở SC không?",
    opts: [
      { en: "Yes, for all riders", vi: "Có, cho tất cả" },
      { en: "No, never required", vi: "Không, không bao giờ bắt buộc" },
      { en: "Required for riders under 21", vi: "Bắt buộc cho người dưới 21 tuổi" },
      { en: "Only for passengers", vi: "Chỉ cho hành khách" },
    ],
    ans: 2,
    exp: {
      en: "South Carolina requires motorcycle helmets for all riders UNDER 21. Riders 21 and older are not required.",
      vi: "SC bắt buộc mũ bảo hiểm cho người dưới 21 tuổi. Từ 21 tuổi trở lên không bắt buộc.",
    },
  },
  {
    en: "What is the speed limit on South Carolina interstates?",
    vi: "Giới hạn tốc độ trên interstate South Carolina?",
    opts: [
      { en: "60 mph", vi: "60 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
    ],
    ans: 2,
    exp: {
      en: "South Carolina interstates have a default speed limit of 70 mph for passenger vehicles.",
      vi: "Interstate SC có giới hạn mặc định 70 mph cho xe hơi thông thường.",
    },
  },
  {
    en: "When must you stop for a school bus in South Carolina?",
    vi: "Khi nào phải dừng cho xe buýt trường học ở SC?",
    opts: [
      { en: "Only when behind it", vi: "Chỉ khi ở phía sau" },
      {
        en: "When red lights flash — both directions unless a median separates",
        vi: "Khi đèn đỏ nhấp nháy — cả 2 chiều trừ khi có dải phân cách",
      },
      { en: "Slow to 20 mph and proceed", vi: "Giảm còn 20 mph và đi tiếp" },
      { en: "Only in school zones", vi: "Chỉ trong khu trường học" },
    ],
    ans: 1,
    exp: {
      en: "You must stop for a school bus with flashing red lights in both directions, unless a median or physical barrier separates traffic.",
      vi: "Phải dừng cho xe buýt đèn đỏ nhấp nháy cả 2 chiều, trừ khi có dải phân cách.",
    },
  },
  {
    en: "In SC, seat belts are required for:",
    vi: "Dây an toàn ở SC bắt buộc cho:",
    opts: [
      { en: "Only the driver", vi: "Chỉ tài xế" },
      { en: "Driver and front-seat passengers only", vi: "Tài xế và hành khách ghế trước" },
      { en: "All vehicle occupants", vi: "Tất cả người trong xe" },
      { en: "Only children under 18", vi: "Chỉ trẻ em dưới 18 tuổi" },
    ],
    ans: 2,
    exp: {
      en: "South Carolina requires all vehicle occupants to wear seat belts regardless of seating position.",
      vi: "SC bắt buộc tất cả người trong xe thắt dây an toàn bất kể ngồi ở đâu.",
    },
  },
  {
    en: "What does a yellow flashing traffic light mean in SC?",
    vi: "Đèn vàng nhấp nháy có nghĩa gì ở SC?",
    opts: [
      { en: "Stop completely", vi: "Dừng hoàn toàn" },
      { en: "Proceed with caution", vi: "Đi qua thận trọng" },
      { en: "Same as a stop sign", vi: "Giống biển STOP" },
      { en: "Right turn only", vi: "Chỉ rẽ phải" },
    ],
    ans: 1,
    exp: {
      en: "A flashing yellow light means slow down and proceed with caution.",
      vi: "Đèn vàng nhấp nháy: giảm tốc và đi qua thận trọng.",
    },
  },
  {
    en: "The minimum following distance recommended in SC is:",
    vi: "Khoảng cách theo sau tối thiểu khuyến nghị ở SC?",
    opts: [
      { en: "1 second", vi: "1 giây" },
      { en: "2 seconds", vi: "2 giây" },
      { en: "3 seconds", vi: "3 giây" },
      { en: "5 seconds", vi: "5 giây" },
    ],
    ans: 2,
    exp: {
      en: "South Carolina recommends a minimum 3-second following distance in normal driving conditions.",
      vi: "SC khuyến nghị tối thiểu 3 giây trong điều kiện lái bình thường.",
    },
  },
  {
    en: "When an emergency vehicle approaches with lights and siren in SC, you must:",
    vi: "Khi xe cứu thương tiến lại ở SC bạn phải:",
    opts: [
      { en: "Speed up", vi: "Tăng tốc" },
      { en: "Pull to the right and stop", vi: "Kéo vào lề phải và dừng" },
      { en: "Move to the left lane", vi: "Chuyển sang làn trái" },
      { en: "Continue at normal speed", vi: "Tiếp tục tốc độ bình thường" },
    ],
    ans: 1,
    exp: {
      en: "Pull to the right edge of the road and stop to allow emergency vehicles to pass.",
      vi: "Kéo vào lề phải và dừng để xe cứu thương qua.",
    },
  },
  {
    en: "In SC, what does a double solid yellow center line mean?",
    vi: "Hai vạch vàng liền ở giữa đường SC có nghĩa là?",
    opts: [
      { en: "Passing allowed from both sides", vi: "Cả 2 chiều được vượt" },
      { en: "No passing from either direction", vi: "Không chiều nào được vượt" },
      { en: "Speed limit change", vi: "Thay đổi tốc độ" },
      { en: "One-way street", vi: "Đường một chiều" },
    ],
    ans: 1,
    exp: {
      en: "Double solid yellow lines mean no passing is allowed from either direction.",
      vi: "Hai vạch vàng liền = cả 2 chiều không được vượt.",
    },
  },
  {
    en: "SC's minimum liability insurance requirement is:",
    vi: "Yêu cầu bảo hiểm trách nhiệm tối thiểu ở SC?",
    opts: [
      { en: "$10,000/$20,000/$10,000", vi: "$10,000/$20,000/$10,000" },
      { en: "$25,000/$50,000/$25,000", vi: "$25,000/$50,000/$25,000" },
      { en: "$15,000/$30,000/$10,000", vi: "$15,000/$30,000/$10,000" },
      { en: "No minimum required", vi: "Không có yêu cầu" },
    ],
    ans: 1,
    exp: {
      en: "South Carolina requires minimum liability: $25,000 per person / $50,000 per accident / $25,000 property damage.",
      vi: "SC yêu cầu tối thiểu: $25K/người · $50K/tai nạn · $25K hư hại tài sản.",
    },
  },
  {
    en: "Can you turn right on red in South Carolina?",
    vi: "Có được rẽ phải khi đèn đỏ ở SC không?",
    opts: [
      { en: "Never", vi: "Không bao giờ" },
      {
        en: "Yes, after a complete stop and yielding, unless a sign prohibits it",
        vi: "Có, sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm",
      },
      { en: "Only at intersections without traffic signals", vi: "Chỉ ở giao lộ không có đèn" },
      { en: "Only on highways", vi: "Chỉ trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "Right on red is permitted in SC after a complete stop and yielding to traffic and pedestrians, unless a sign prohibits it.",
      vi: "Được rẽ phải khi đèn đỏ sau khi dừng hoàn toàn và nhường, trừ khi có biển cấm.",
    },
  },
  {
    en: "What does a red octagon (STOP sign) require?",
    vi: "Biển bát giác đỏ (STOP) yêu cầu gì?",
    opts: [
      { en: "Slow down", vi: "Giảm tốc" },
      {
        en: "Come to a complete stop, then yield and proceed when safe",
        vi: "Dừng hoàn toàn, nhường, rồi đi khi an toàn",
      },
      { en: "Stop only if traffic is present", vi: "Chỉ dừng nếu có xe" },
      { en: "Flash lights and proceed", vi: "Nhấp đèn và đi" },
    ],
    ans: 1,
    exp: {
      en: "STOP sign: come to a complete stop before the stop line, yield to all traffic and pedestrians, then proceed when safe.",
      vi: "Biển STOP: dừng hoàn toàn trước vạch dừng, nhường tất cả xe và người đi bộ, rồi đi khi an toàn.",
    },
  },
  {
    en: "In SC, how far before a turn must you signal?",
    vi: "Phải bật xi-nhan trước khi rẽ bao xa ở SC?",
    opts: [
      { en: "50 feet", vi: "50 feet" },
      { en: "100 feet", vi: "100 feet" },
      { en: "200 feet", vi: "200 feet" },
      { en: "At the intersection", vi: "Tại giao lộ" },
    ],
    ans: 1,
    exp: {
      en: "SC requires activating turn signals at least 100 feet before making a turn or lane change.",
      vi: "SC yêu cầu bật xi-nhan ít nhất 100 feet trước khi rẽ hoặc đổi làn.",
    },
  },
  {
    en: "What is the SC school zone speed limit when children are present?",
    vi: "Giới hạn tốc độ khu trường học SC khi có trẻ em?",
    opts: [
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
    ],
    ans: 1,
    exp: {
      en: "South Carolina school zones have a 20 mph speed limit when children are present or the warning lights are flashing.",
      vi: "Khu trường học SC: 20 mph khi có trẻ em hoặc đèn cảnh báo nhấp nháy.",
    },
  },
  {
    en: "Which lane should you use for passing other vehicles?",
    vi: "Nên dùng làn nào để vượt xe khác?",
    opts: [
      { en: "Right lane", vi: "Làn phải" },
      {
        en: "Left lane, then return to the right when safely past",
        vi: "Làn trái, rồi về làn phải khi đã vượt an toàn",
      },
      { en: "Either lane", vi: "Bất kỳ làn nào" },
      { en: "Shoulder of the road", vi: "Lề đường" },
    ],
    ans: 1,
    exp: {
      en: "Pass on the left and return to the right lane after safely clearing the passed vehicle.",
      vi: "Vượt bên trái, rồi về làn phải sau khi đã qua xe đó một cách an toàn.",
    },
  },
  {
    en: "What does a green traffic light mean?",
    vi: "Đèn xanh có nghĩa là gì?",
    opts: [
      { en: "Go without stopping or yielding", vi: "Đi mà không cần dừng hay nhường" },
      {
        en: "Go, but yield to pedestrians in crosswalks and vehicles already in the intersection",
        vi: "Đi, nhưng nhường người đi bộ và xe đã trong giao lộ",
      },
      { en: "Speed up to clear the intersection", vi: "Tăng tốc qua giao lộ" },
      { en: "Stop if anyone is near", vi: "Dừng nếu có người gần đó" },
    ],
    ans: 1,
    exp: {
      en: "Green means go — but you must yield to pedestrians in crosswalks and any vehicles already lawfully in the intersection.",
      vi: "Xanh = được đi — nhưng nhường người đi bộ và xe đã hợp pháp trong giao lộ.",
    },
  },
  {
    en: "When must headlights be turned on in South Carolina?",
    vi: "Khi nào phải bật đèn pha ở SC?",
    opts: [
      { en: "Only at night", vi: "Chỉ ban đêm" },
      {
        en: "From 30 minutes after sunset to 30 minutes before sunrise, and during rain or limited visibility",
        vi: "Từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa hoặc tầm nhìn hạn chế",
      },
      { en: "Only in fog", vi: "Chỉ trong sương mù" },
      { en: "Whenever on a highway", vi: "Khi nào trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "SC headlights are required from 30 minutes after sunset to 30 minutes before sunrise, and when rain, smoke, or fog reduces visibility.",
      vi: "SC: bật đèn từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/khói/sương làm giảm tầm nhìn.",
    },
  },
  {
    en: "At a 4-way stop in SC, if two vehicles arrive simultaneously, who has right-of-way?",
    vi: "Ngã tư STOP 4 chiều SC, 2 xe đến cùng lúc, ai đi trước?",
    opts: [
      { en: "The larger vehicle", vi: "Xe lớn hơn" },
      { en: "The vehicle on the right", vi: "Xe ở bên phải" },
      { en: "The vehicle going straight", vi: "Xe đi thẳng" },
      { en: "Whoever honks first", vi: "Ai bấm còi trước" },
    ],
    ans: 1,
    exp: {
      en: "When two vehicles reach a 4-way stop simultaneously, yield to the vehicle on your right.",
      vi: "Khi 2 xe đến cùng lúc: nhường xe ở bên phải bạn.",
    },
  },
  {
    en: "Is it legal to have an open container of alcohol in the vehicle in SC?",
    vi: "Ở SC, có hợp pháp khi có chai/lon rượu đã mở trong xe không?",
    opts: [
      { en: "Yes, if the driver is not drinking", vi: "Có, nếu tài xế không uống" },
      {
        en: "No, open containers are prohibited in the passenger area",
        vi: "Không, cấm chai/lon đã mở trong khoang hành khách",
      },
      { en: "Yes, passengers may have open containers", vi: "Có, hành khách được có chai đã mở" },
      { en: "Only prohibited if the driver has been drinking", vi: "Chỉ cấm nếu tài xế đã uống" },
    ],
    ans: 1,
    exp: {
      en: "South Carolina prohibits open containers of alcohol in the passenger area of any motor vehicle.",
      vi: "SC cấm chai/lon rượu bia đã mở trong khoang hành khách của bất kỳ phương tiện nào.",
    },
  },
  {
    en: "What should you do if your vehicle starts to skid in SC?",
    vi: "Phải làm gì nếu xe bị trượt ở SC?",
    opts: [
      { en: "Brake hard immediately", vi: "Phanh gấp ngay" },
      {
        en: "Steer into the skid and ease off the accelerator",
        vi: "Lái theo hướng xe trượt và nhả ga",
      },
      { en: "Accelerate to regain traction", vi: "Tăng ga để lấy lại lực kéo" },
      { en: "Turn the wheel opposite to the skid", vi: "Quay vô lăng ngược chiều" },
    ],
    ans: 1,
    exp: {
      en: "In a skid, steer in the direction the rear is sliding (into the skid), ease off the gas, and avoid hard braking.",
      vi: "Khi xe trượt: lái theo hướng đuôi xe đang trượt, nhả ga và tránh phanh gấp.",
    },
  },
  {
    en: "What color are information/guide signs on SC highways?",
    vi: "Biển hướng dẫn/thông tin trên đường cao tốc SC có màu gì?",
    opts: [
      { en: "Yellow", vi: "Vàng" },
      { en: "Orange", vi: "Cam" },
      { en: "Green with white letters", vi: "Xanh lá với chữ trắng" },
      { en: "Blue", vi: "Xanh dương" },
    ],
    ans: 2,
    exp: {
      en: "Guide signs on highways are green with white letters — showing directions, distances, and exits.",
      vi: "Biển hướng dẫn trên cao tốc màu xanh lá với chữ trắng — chỉ hướng, khoảng cách và lối ra.",
    },
  },
  {
    en: "What does a flashing red light mean in SC?",
    vi: "Đèn đỏ nhấp nháy có nghĩa là gì ở SC?",
    opts: [
      { en: "Yield to cross traffic", vi: "Nhường xe ngang" },
      { en: "Treat it like a STOP sign", vi: "Xử lý như biển STOP" },
      { en: "Emergency vehicle ahead", vi: "Xe cứu thương phía trước" },
      { en: "Proceed with caution", vi: "Đi thận trọng" },
    ],
    ans: 1,
    exp: {
      en: "A flashing red light means treat it exactly like a STOP sign — come to a complete stop, yield, then proceed when safe.",
      vi: "Đèn đỏ nhấp nháy = biển STOP: dừng hoàn toàn, nhường, rồi đi khi an toàn.",
    },
  },
  {
    en: "When is it dangerous to use cruise control in SC?",
    vi: "Khi nào nguy hiểm khi dùng cruise control ở SC?",
    opts: [
      { en: "Only on rural roads", vi: "Chỉ trên đường nông thôn" },
      {
        en: "In rain, fog, heavy traffic, or on winding roads",
        vi: "Khi mưa, sương mù, đông xe, hoặc đường cong",
      },
      { en: "It is always safe to use", vi: "Luôn an toàn khi dùng" },
      { en: "Only at night", vi: "Chỉ ban đêm" },
    ],
    ans: 1,
    exp: {
      en: "Avoid cruise control in rain, fog, heavy traffic, on curves, or any time you may need to adjust speed quickly.",
      vi: "Tránh cruise control khi mưa, sương mù, đông xe, đường cong, hoặc khi cần điều chỉnh tốc độ nhanh.",
    },
  },
  {
    en: "What is the penalty for a first DUI offense in South Carolina?",
    vi: "Hình phạt DUI lần đầu ở SC?",
    opts: [
      { en: "Warning only", vi: "Chỉ cảnh cáo" },
      {
        en: "Fine of $400-$1,000, possible jail up to 30 days, 6-month license suspension",
        vi: "Phạt $400-$1,000, tù đến 30 ngày, thu bằng 6 tháng",
      },
      { en: "Automatic 5-year license ban", vi: "Tự động cấm bằng 5 năm" },
      { en: "Small fine only", vi: "Chỉ phạt tiền nhỏ" },
    ],
    ans: 1,
    exp: {
      en: "First DUI in SC: fine $400-$1,000, up to 30 days jail (or 48 hours minimum), 6-month license suspension, and DUI school.",
      vi: "DUI lần đầu SC: phạt $400-$1,000, tù đến 30 ngày (tối thiểu 48 giờ), thu bằng 6 tháng, học DUI.",
    },
  },
  {
    en: "In SC, how far from a railroad crossing must you stop when a train is approaching?",
    vi: "Phải dừng cách đường sắt bao xa khi tàu đến ở SC?",
    opts: [
      { en: "5 feet", vi: "5 feet" },
      { en: "10 feet", vi: "10 feet" },
      { en: "15 feet", vi: "15 feet" },
      { en: "20 feet", vi: "20 feet" },
    ],
    ans: 2,
    exp: {
      en: "South Carolina requires stopping at least 15 feet from the nearest rail when a train is approaching or crossing gates are down.",
      vi: "SC yêu cầu dừng ít nhất 15 feet cách đường ray gần nhất khi tàu đến hoặc rào chắn hạ.",
    },
  },
  {
    en: "When parallel parking on a city street in SC, how far from the curb should your vehicle be?",
    vi: "Khi đỗ song song trên đường phố SC, xe cách lề bao xa?",
    opts: [
      { en: "6 inches", vi: "6 inches" },
      { en: "12 inches", vi: "12 inches" },
      { en: "18 inches", vi: "18 inches" },
      { en: "24 inches", vi: "24 inches" },
    ],
    ans: 1,
    exp: {
      en: "When parallel parking in South Carolina, your vehicle must be within 12 inches of the curb.",
      vi: "Khi đỗ song song ở SC, xe phải trong vòng 12 inches (30cm) cách lề đường.",
    },
  },
  {
    en: "In SC, passing on the right is permitted when:",
    vi: "Ở SC, không được vượt bên phải trừ khi:",
    opts: [
      { en: "Never — always pass on the left", vi: "Không bao giờ — luôn vượt bên trái" },
      {
        en: "On roads with two or more lanes in the same direction, or when the vehicle ahead is turning left",
        vi: "Đường nhiều làn cùng chiều, hoặc xe trước rẽ trái",
      },
      { en: "Whenever the road appears clear", vi: "Khi nào đường trông trống" },
      { en: "On rural roads only", vi: "Chỉ trên đường nông thôn" },
    ],
    ans: 1,
    exp: {
      en: "Passing on the right is only permitted on roads with multiple lanes in the same direction, or when the vehicle ahead is turning left.",
      vi: "Vượt bên phải chỉ được phép trên đường nhiều làn cùng chiều hoặc khi xe trước rẽ trái.",
    },
  },
  {
    en: "What does a yellow diamond-shaped sign indicate?",
    vi: "Biển hình thoi vàng chỉ điều gì?",
    opts: [
      { en: "A regulation you must obey", vi: "Quy định bạn phải tuân theo" },
      {
        en: "A warning about road conditions or hazards ahead",
        vi: "Cảnh báo về điều kiện đường hoặc nguy hiểm phía trước",
      },
      { en: "Information about nearby services", vi: "Thông tin về dịch vụ gần đó" },
      { en: "A construction zone", vi: "Khu xây dựng" },
    ],
    ans: 1,
    exp: {
      en: "Yellow diamond signs are warning signs — they alert you to potential hazards, changing road conditions, or unusual situations ahead.",
      vi: "Biển hình thoi vàng là cảnh báo — thông báo nguy hiểm tiềm ẩn, điều kiện đường thay đổi hoặc tình huống bất thường phía trước.",
    },
  },
];
