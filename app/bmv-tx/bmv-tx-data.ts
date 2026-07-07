import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const TX_PASS_COUNT = 21;

export const TX_QUESTIONS: QuizQuestion[] = [
  {
    en: "What is the default speed limit in a Texas urban district (city)?",
    vi: "Giới hạn tốc độ mặc định trong khu đô thị Texas là bao nhiêu?",
    opts: [
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
      { en: "45 mph", vi: "45 mph" },
    ],
    ans: 1,
    exp: {
      en: "The default speed limit in urban districts in Texas is 30 mph unless otherwise posted.",
      vi: "Tốc độ mặc định khu đô thị Texas là 30 mph trừ khi có biển báo khác.",
    },
  },
  {
    en: "Texas has some interstate highways with a speed limit of:",
    vi: "Một số đoạn cao tốc Texas có giới hạn tốc độ là:",
    opts: [
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
      { en: "80-85 mph — highest in the US", vi: "80-85 mph — cao nhất nước Mỹ" },
      { en: "65 mph", vi: "65 mph" },
    ],
    ans: 2,
    exp: {
      en: "Texas has some stretches (like I-10 west of San Antonio) with posted speed limits of 80 or 85 mph — the highest in the US.",
      vi: "Texas có một số đoạn (như I-10 phía tây San Antonio) giới hạn 80-85 mph — cao nhất nước Mỹ.",
    },
  },
  {
    en: "What is the legal Blood Alcohol Concentration (BAC) limit for adult drivers in Texas?",
    vi: "Giới hạn nồng độ cồn (BAC) hợp pháp cho tài xế người lớn ở Texas?",
    opts: [
      { en: "0.04%", vi: "0.04%" },
      { en: "0.06%", vi: "0.06%" },
      { en: "0.08%", vi: "0.08%" },
      { en: "0.10%", vi: "0.10%" },
    ],
    ans: 2,
    exp: {
      en: "In Texas, it is illegal to drive with a BAC of 0.08% or higher. Commercial drivers: 0.04%, under 21: any detectable amount.",
      vi: "Ở Texas, lái xe với BAC ≥0.08% là phạm pháp. CDL: 0.04%. Dưới 21 tuổi: bất kỳ lượng nào có thể phát hiện.",
    },
  },
  {
    en: "When must you use your headlights in Texas?",
    vi: "Khi nào bạn phải bật đèn pha ở Texas?",
    opts: [
      { en: "Only at night", vi: "Chỉ ban đêm" },
      {
        en: "30 minutes after sunset until 30 minutes before sunrise, and in rain/fog",
        vi: "30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương",
      },
      { en: "Only when visibility is less than 100 feet", vi: "Chỉ khi tầm nhìn dưới 100 feet" },
      { en: "Only on highways", vi: "Chỉ trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "Texas requires headlights from 30 minutes after sunset to 30 minutes before sunrise, and whenever rain, fog, or dust reduces visibility.",
      vi: "Texas bắt buộc đèn pha từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa, sương mù hoặc bụi làm giảm tầm nhìn.",
    },
  },
  {
    en: "What must you do when approaching a school bus with flashing red lights in Texas?",
    vi: "Phải làm gì khi tiếp cận xe buýt trường học bật đèn đỏ nhấp nháy ở Texas?",
    opts: [
      { en: "Slow to 20 mph and pass carefully", vi: "Giảm còn 20 mph và vượt cẩn thận" },
      { en: "Stop and wait until lights stop flashing", vi: "Dừng lại và chờ đến khi đèn tắt" },
      { en: "Honk and proceed", vi: "Bấm còi và đi tiếp" },
      { en: "Stop only if in the same direction", vi: "Chỉ dừng nếu cùng chiều" },
    ],
    ans: 1,
    exp: {
      en: "You must stop for a school bus with flashing red lights in both directions (unless separated by a median).",
      vi: "Phải dừng cho xe buýt trường học đèn đỏ cả 2 chiều (trừ khi có dải phân cách giữa).",
    },
  },
  {
    en: "In Texas, seat belts are required for:",
    vi: "Ở Texas, dây an toàn bắt buộc cho:",
    opts: [
      { en: "Only the driver", vi: "Chỉ tài xế" },
      { en: "Driver and front-seat passengers", vi: "Tài xế và hành khách ghế trước" },
      { en: "All occupants in the vehicle", vi: "Tất cả người trong xe" },
      { en: "Only children under 8", vi: "Chỉ trẻ em dưới 8 tuổi" },
    ],
    ans: 2,
    exp: {
      en: "Texas law requires all vehicle occupants to wear seat belts. Fines start at $200.",
      vi: "Luật Texas yêu cầu tất cả người trong xe thắt dây an toàn. Phạt từ $200.",
    },
  },
  {
    en: "Texas law prohibits texting while driving:",
    vi: "Luật Texas cấm nhắn tin khi lái xe:",
    opts: [
      { en: "Only for drivers under 18", vi: "Chỉ tài xế dưới 18 tuổi" },
      { en: "For all drivers at all times", vi: "Tất cả tài xế ở mọi thời điểm" },
      { en: "Only in school zones", vi: "Chỉ trong khu trường học" },
      { en: "Only on highways", vi: "Chỉ trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "Texas's texting ban (effective 2017) applies to ALL drivers — it is illegal to read, write, or send text messages while driving.",
      vi: "Lệnh cấm nhắn tin của Texas (từ 2017) áp dụng cho TẤT CẢ tài xế — cấm đọc, viết hoặc gửi tin nhắn khi lái.",
    },
  },
  {
    en: "What is the Move Over Law in Texas?",
    vi: "Luật Move Over ở Texas là gì?",
    opts: [
      { en: "Move to the right whenever another car wants to pass", vi: "Nhường phải khi có xe muốn vượt" },
      {
        en: "Move over a lane or slow down when passing emergency, tow, or highway maintenance vehicles stopped on the roadside",
        vi: "Chuyển làn hoặc giảm tốc khi qua xe cứu thương/kéo/bảo trì đường dừng ven đường",
      },
      { en: "Always drive in the right lane", vi: "Luôn đi ở làn phải" },
      { en: "Move over only for police vehicles", vi: "Chỉ nhường cho xe cảnh sát" },
    ],
    ans: 1,
    exp: {
      en: "Texas Move Over Law: when passing emergency vehicles, tow trucks, or highway maintenance vehicles stopped on shoulder, move over or slow down significantly.",
      vi: "Luật Move Over Texas: khi qua xe cứu thương, xe kéo, hoặc xe bảo trì đường dừng ven đường, chuyển làn hoặc giảm tốc đáng kể.",
    },
  },
  {
    en: "At a 4-way stop in Texas, if two vehicles arrive at the same time, who has the right-of-way?",
    vi: "Tại ngã tư STOP 4 chiều ở Texas, nếu 2 xe đến cùng lúc, ai có quyền ưu tiên?",
    opts: [
      { en: "The larger vehicle", vi: "Xe lớn hơn" },
      { en: "The vehicle on the right", vi: "Xe bên phải" },
      { en: "The vehicle on the left", vi: "Xe bên trái" },
      { en: "The vehicle going straight", vi: "Xe đi thẳng" },
    ],
    ans: 1,
    exp: {
      en: "When two vehicles arrive simultaneously at a 4-way stop in Texas, yield to the vehicle on your right.",
      vi: "Khi 2 xe đến ngã tư STOP cùng lúc ở Texas, nhường xe ở bên phải bạn.",
    },
  },
  {
    en: "In Texas, when is it legal to pass on the right?",
    vi: "Ở Texas, khi nào được phép vượt bên phải?",
    opts: [
      { en: "Never", vi: "Không bao giờ" },
      { en: "On any road when it is safe", vi: "Trên bất kỳ đường nào khi an toàn" },
      {
        en: "On roads with multiple lanes in the same direction, or when vehicle ahead is turning left",
        vi: "Đường nhiều làn cùng chiều, hoặc xe trước rẽ trái",
      },
      { en: "Only when the speed limit exceeds 65 mph", vi: "Chỉ khi tốc độ giới hạn trên 65 mph" },
    ],
    ans: 2,
    exp: {
      en: "In Texas, passing on the right is allowed on multi-lane roads in the same direction, or when a vehicle ahead is turning left.",
      vi: "Ở Texas, vượt phải được phép trên đường nhiều làn cùng chiều, hoặc khi xe trước rẽ trái.",
    },
  },
  {
    en: "What does a yellow dashed center line mean?",
    vi: "Vạch vàng đứt đoạn ở giữa đường có nghĩa là gì?",
    opts: [
      { en: "No passing from either direction", vi: "Cả 2 chiều đều không vượt được" },
      { en: "Passing is permitted when safe", vi: "Được phép vượt khi an toàn" },
      { en: "One-way traffic only", vi: "Chỉ đi một chiều" },
      { en: "Slow down area", vi: "Khu vực giảm tốc" },
    ],
    ans: 1,
    exp: {
      en: "A yellow dashed center line means passing is permitted from either direction when the road ahead is clear and safe.",
      vi: "Vạch vàng đứt đoạn ở giữa = cả 2 chiều được phép vượt khi đường thẳng và an toàn.",
    },
  },
  {
    en: "What does the Texas 'Basic Speed Law' mean?",
    vi: "'Luật Tốc Độ Cơ Bản' ở Texas có nghĩa là gì?",
    opts: [
      { en: "Always drive at exactly the posted speed limit", vi: "Luôn lái đúng tốc độ được đăng" },
      {
        en: "Never drive faster than is safe for current conditions, regardless of the posted speed limit",
        vi: "Không bao giờ lái nhanh hơn mức an toàn cho điều kiện hiện tại, bất kể biển báo",
      },
      { en: "Always drive 10 mph below the speed limit", vi: "Luôn lái chậm hơn giới hạn 10 mph" },
      { en: "Minimum speed must be maintained on highways", vi: "Phải duy trì tốc độ tối thiểu trên cao tốc" },
    ],
    ans: 1,
    exp: {
      en: "Texas's Basic Speed Law: you must never drive faster than what is safe for conditions — even if below the posted limit. Bad weather means driving slower.",
      vi: "Luật Tốc Độ Cơ Bản Texas: không được lái nhanh hơn mức an toàn cho điều kiện hiện tại — dù dưới giới hạn. Thời tiết xấu = phải lái chậm hơn.",
    },
  },
  {
    en: "When entering a highway (freeway), you should:",
    vi: "Khi nhập cao tốc (freeway), bạn nên:",
    opts: [
      { en: "Stop and wait for a gap in traffic", vi: "Dừng lại và chờ khoảng trống trong dòng xe" },
      {
        en: "Yield to highway traffic and merge at highway speed",
        vi: "Nhường xe trên cao tốc và nhập làn với tốc độ cao tốc",
      },
      { en: "Use the shoulder to pass other merging vehicles", vi: "Dùng lề đường để vượt xe đang nhập làn khác" },
      { en: "Flash headlights to signal your entry", vi: "Nhấp đèn pha để báo hiệu đang nhập" },
    ],
    ans: 1,
    exp: {
      en: "When merging onto a freeway, yield to existing traffic and accelerate on the ramp to match highway speed before merging.",
      vi: "Khi nhập cao tốc, nhường xe đang chạy và tăng tốc trên đường dẫn để đạt tốc độ cao tốc trước khi nhập làn.",
    },
  },
  {
    en: "What must you do before making a lane change in Texas?",
    vi: "Phải làm gì trước khi đổi làn xe ở Texas?",
    opts: [
      { en: "Nothing — just move over", vi: "Không cần gì — chuyển thôi" },
      {
        en: "Signal, check mirrors and blind spots, then change lanes when safe",
        vi: "Bật xi-nhan, kiểm tra gương và điểm mù, rồi đổi làn khi an toàn",
      },
      { en: "Honk to alert other drivers", vi: "Bấm còi để cảnh báo xe khác" },
      { en: "Only check the rearview mirror", vi: "Chỉ cần kiểm tra gương chiếu hậu" },
    ],
    ans: 1,
    exp: {
      en: "Before changing lanes: signal your intention, check all mirrors, check your blind spot by looking over your shoulder, then change when clear.",
      vi: "Trước khi đổi làn: bật xi-nhan, kiểm tra gương, kiểm tra điểm mù bằng cách quay đầu, rồi đổi khi đường trống.",
    },
  },
  {
    en: "What does a red octagonal sign always mean in Texas?",
    vi: "Biển bát giác đỏ ở Texas luôn có nghĩa là gì?",
    opts: [
      { en: "Yield", vi: "Nhường đường" },
      { en: "Danger ahead", vi: "Nguy hiểm phía trước" },
      { en: "Stop", vi: "Dừng lại (STOP)" },
      { en: "Do not enter", vi: "Cấm vào" },
    ],
    ans: 2,
    exp: {
      en: "The red octagon (8-sided sign) is always a STOP sign. Come to a complete stop, check for traffic, then proceed when safe.",
      vi: "Biển bát giác đỏ (8 cạnh) luôn là biển STOP. Dừng hoàn toàn, quan sát giao thông, rồi đi khi an toàn.",
    },
  },
  {
    en: "In Texas, when should you use your hazard (emergency flasher) lights?",
    vi: "Ở Texas, khi nào nên bật đèn nguy hiểm (hazard lights)?",
    opts: [
      { en: "When driving slowly in the rain", vi: "Khi lái chậm trong mưa" },
      {
        en: "To warn other drivers of a hazard — when stopped on a road or highway with a problem",
        vi: "Để cảnh báo xe khác về nguy hiểm — khi xe dừng trên đường do sự cố",
      },
      { en: "When double-parking", vi: "Khi đỗ xe chiếm 2 làn" },
      { en: "Whenever it is raining", vi: "Bất cứ khi nào trời mưa" },
    ],
    ans: 1,
    exp: {
      en: "Hazard lights are used to warn drivers that your vehicle is a hazard — when broken down on the road or in an emergency. Not for regular driving in rain.",
      vi: "Đèn nguy hiểm dùng để cảnh báo xe bạn là mối nguy hiểm — khi xe hỏng trên đường hoặc khẩn cấp. Không dùng khi lái bình thường dù trời mưa.",
    },
  },
  {
    en: "How far in advance must you signal before turning in Texas?",
    vi: "Phải bật xi-nhan trước khi rẽ bao xa ở Texas?",
    opts: [
      { en: "50 feet", vi: "50 feet" },
      { en: "100 feet", vi: "100 feet" },
      { en: "200 feet", vi: "200 feet" },
      { en: "At the intersection", vi: "Tại giao lộ" },
    ],
    ans: 1,
    exp: {
      en: "Texas requires signaling at least 100 feet before turning or changing lanes in an urban area.",
      vi: "Texas yêu cầu bật xi-nhan ít nhất 100 feet trước khi rẽ hoặc đổi làn trong khu đô thị.",
    },
  },
  {
    en: "What is the minimum following distance recommended in Texas?",
    vi: "Khoảng cách theo sau tối thiểu được khuyến nghị ở Texas là bao nhiêu?",
    opts: [
      { en: "1 second", vi: "1 giây" },
      { en: "2 seconds", vi: "2 giây" },
      { en: "3 seconds", vi: "3 giây" },
      { en: "4 seconds", vi: "4 giây" },
    ],
    ans: 2,
    exp: {
      en: "Texas recommends a minimum following distance of 3 seconds — increase to 4-6 seconds for trucks, bad weather, or nighttime driving.",
      vi: "Texas khuyến nghị khoảng cách tối thiểu 3 giây — tăng lên 4-6 giây với xe tải, thời tiết xấu hoặc ban đêm.",
    },
  },
  {
    en: "If you have a green light but pedestrians are crossing your path, you must:",
    vi: "Nếu bạn có đèn xanh nhưng người đi bộ đang sang đường trước xe bạn, bạn phải:",
    opts: [
      { en: "Proceed — you have the right of way", vi: "Đi tiếp — bạn có quyền ưu tiên" },
      { en: "Yield to the pedestrians", vi: "Nhường người đi bộ" },
      { en: "Honk to clear the way", vi: "Bấm còi để họ tránh" },
      { en: "Speed up to get through quickly", vi: "Tăng tốc để qua nhanh" },
    ],
    ans: 1,
    exp: {
      en: "Even with a green light, you must always yield to pedestrians lawfully in a crosswalk.",
      vi: "Dù có đèn xanh, bạn LUÔN phải nhường người đi bộ đang hợp pháp đi qua vạch sang đường.",
    },
  },
  {
    en: "In Texas, what color are guide/information signs on major highways?",
    vi: "Ở Texas, biển hướng dẫn/thông tin trên đường cao tốc có màu gì?",
    opts: [
      { en: "Yellow", vi: "Vàng" },
      { en: "Orange", vi: "Cam" },
      { en: "Green with white lettering", vi: "Xanh lá với chữ trắng" },
      { en: "Blue", vi: "Xanh dương" },
    ],
    ans: 2,
    exp: {
      en: "Guide signs — showing directions, distances, and exits on highways — are green with white lettering in Texas and across the US.",
      vi: "Biển hướng dẫn (chỉ hướng, khoảng cách, lối ra) trên cao tốc màu xanh lá với chữ trắng — ở Texas và toàn Mỹ.",
    },
  },
  {
    en: "What must you do when you hear or see an emergency vehicle approaching?",
    vi: "Phải làm gì khi nghe hoặc thấy xe cứu thương/cảnh sát đang đến?",
    opts: [
      { en: "Speed up to get out of the way", vi: "Tăng tốc để thoát đường" },
      {
        en: "Pull to the right edge of the road and stop until it passes",
        vi: "Kéo sang lề phải và dừng cho đến khi xe qua",
      },
      { en: "Continue at normal speed", vi: "Tiếp tục tốc độ bình thường" },
      { en: "Move to the left lane", vi: "Chuyển sang làn trái" },
    ],
    ans: 1,
    exp: {
      en: "When an emergency vehicle approaches with sirens/lights, pull to the right and stop. Stay stopped until it has passed.",
      vi: "Khi xe cứu thương/cảnh sát đến với còi/đèn, kéo sang phải và dừng. Đứng yên cho đến khi xe qua hết.",
    },
  },
  {
    en: "Texas requires motor vehicle owners to carry minimum liability insurance. What is it?",
    vi: "Texas yêu cầu bảo hiểm trách nhiệm tối thiểu là bao nhiêu?",
    opts: [
      { en: "$15,000/$30,000/$5,000", vi: "$15,000/$30,000/$5,000" },
      { en: "$30,000/$60,000/$25,000", vi: "$30,000/$60,000/$25,000" },
      { en: "$25,000/$50,000/$25,000", vi: "$25,000/$50,000/$25,000" },
      { en: "No minimum required", vi: "Không có yêu cầu tối thiểu" },
    ],
    ans: 1,
    exp: {
      en: "Texas requires minimum liability: $30,000 per injured person / $60,000 per accident / $25,000 property damage (30/60/25).",
      vi: "Texas yêu cầu bảo hiểm tối thiểu: $30K/người bị thương / $60K/tai nạn / $25K hư hại tài sản (30/60/25).",
    },
  },
  {
    en: "When driving in Texas, what should you do if a tire blows out?",
    vi: "Khi lái xe ở Texas mà lốp bị nổ, phải làm gì?",
    opts: [
      { en: "Brake hard immediately", vi: "Phanh gấp ngay lập tức" },
      {
        en: "Hold the steering wheel firmly, ease off the gas, and gradually slow down",
        vi: "Giữ chắc vô lăng, nhả ga, và giảm tốc từ từ",
      },
      { en: "Turn sharply to the opposite direction", vi: "Rẽ mạnh sang hướng ngược lại" },
      { en: "Accelerate to maintain control", vi: "Tăng ga để giữ kiểm soát" },
    ],
    ans: 1,
    exp: {
      en: "In a blowout: grip the wheel firmly, ease off the accelerator (don't brake hard), and steer straight. Let the car slow naturally, then brake gently.",
      vi: "Khi nổ lốp: giữ chắc vô lăng, nhả ga (không phanh gấp), lái thẳng. Để xe chậm tự nhiên, rồi phanh nhẹ nhàng.",
    },
  },
  {
    en: "What does a triangular red-bordered YIELD sign require?",
    vi: "Biển hình tam giác viền đỏ (biển YIELD) yêu cầu gì?",
    opts: [
      { en: "Come to a complete stop", vi: "Dừng hoàn toàn" },
      {
        en: "Slow down and give the right-of-way to traffic on the intersecting road",
        vi: "Giảm tốc và nhường đường cho xe trên đường giao nhau",
      },
      { en: "Speed up to merge", vi: "Tăng tốc để nhập" },
      { en: "Stop only if traffic is present", vi: "Chỉ dừng nếu có xe" },
    ],
    ans: 1,
    exp: {
      en: "A YIELD sign means slow down, look for cross-traffic, and stop if necessary. Give right-of-way to traffic on the road you are entering.",
      vi: "Biển YIELD: giảm tốc, quan sát xe đối chiều, dừng nếu cần. Nhường đường cho xe trên đường bạn đang nhập vào.",
    },
  },
  {
    en: "In Texas, when can you legally drive on the shoulder of a road?",
    vi: "Ở Texas, khi nào được phép lái xe trên lề đường?",
    opts: [
      { en: "Whenever traffic is slow", vi: "Bất cứ khi nào giao thông chậm" },
      {
        en: "Never — except to stop in an emergency",
        vi: "Không bao giờ — trừ khi dừng khẩn cấp",
      },
      { en: "When passing trucks", vi: "Khi vượt xe tải" },
      { en: "At any time on rural roads", vi: "Bất cứ lúc nào trên đường nông thôn" },
    ],
    ans: 1,
    exp: {
      en: "Driving on the road shoulder is generally illegal in Texas. It is only allowed in emergencies when you must pull over and stop.",
      vi: "Lái xe trên lề đường là bất hợp pháp ở Texas. Chỉ được phép trong trường hợp khẩn cấp khi bạn phải dừng lại.",
    },
  },
  {
    en: "What is the speed limit in a Texas school zone when children are present?",
    vi: "Giới hạn tốc độ trong khu trường học Texas khi có trẻ em là bao nhiêu?",
    opts: [
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
    ],
    ans: 1,
    exp: {
      en: "In Texas school zones, the speed limit is 20 mph when the flashing yellow lights are active or when children are present.",
      vi: "Trong khu trường học Texas, giới hạn tốc độ là 20 mph khi đèn vàng nhấp nháy hoặc khi có trẻ em.",
    },
  },
  {
    en: "In Texas, it is illegal to park within how many feet of a fire hydrant?",
    vi: "Ở Texas, cấm đỗ xe trong phạm vi bao nhiêu feet từ họng cứu hỏa?",
    opts: [
      { en: "5 feet", vi: "5 feet" },
      { en: "10 feet", vi: "10 feet" },
      { en: "15 feet", vi: "15 feet" },
      { en: "25 feet", vi: "25 feet" },
    ],
    ans: 2,
    exp: {
      en: "In Texas, you must not park within 15 feet of a fire hydrant. This keeps the hydrant accessible for fire trucks.",
      vi: "Ở Texas, cấm đỗ xe trong vòng 15 feet từ họng cứu hỏa để xe cứu hỏa tiếp cận được.",
    },
  },
  {
    en: "What should you do when the road is wet or icy in Texas?",
    vi: "Phải làm gì khi đường ướt hoặc đóng băng ở Texas?",
    opts: [
      { en: "Drive at the normal speed limit", vi: "Lái ở tốc độ giới hạn bình thường" },
      {
        en: "Increase following distance and reduce speed below the speed limit",
        vi: "Tăng khoảng cách và giảm tốc độ xuống dưới giới hạn",
      },
      { en: "Use cruise control to maintain constant speed", vi: "Dùng cruise control để giữ tốc độ ổn định" },
      { en: "Use high beam headlights", vi: "Bật đèn pha xa" },
    ],
    ans: 1,
    exp: {
      en: "Texas's Basic Speed Law requires slowing below the posted limit in poor conditions. Increase following distance to at least 4-5 seconds on wet/icy roads.",
      vi: "Luật Tốc Độ Cơ Bản Texas yêu cầu giảm tốc khi điều kiện xấu. Tăng khoảng cách tối thiểu 4-5 giây trên đường ướt/đóng băng.",
    },
  },
  {
    en: "What does a white rectangular sign typically indicate in Texas?",
    vi: "Biển hình chữ nhật màu trắng ở Texas thường chỉ điều gì?",
    opts: [
      { en: "Warning", vi: "Cảnh báo" },
      { en: "Regulatory (speed limits, turns, parking rules)", vi: "Quy định (giới hạn tốc độ, rẽ, đỗ xe)" },
      { en: "Information or guidance", vi: "Thông tin hoặc hướng dẫn" },
      { en: "Construction zone", vi: "Khu vực xây dựng" },
    ],
    ans: 1,
    exp: {
      en: "White rectangular signs are regulatory signs — they state rules you must follow, like speed limits, no turns, or parking restrictions.",
      vi: "Biển chữ nhật trắng là biển quy định — quy tắc bạn phải tuân theo như giới hạn tốc độ, cấm rẽ, hoặc hạn chế đỗ xe.",
    },
  },
  {
    en: "In Texas, what is the rule about driving in the left lane on a multi-lane highway?",
    vi: "Ở Texas, quy tắc về lái xe ở làn trái trên đường nhiều làn là gì?",
    opts: [
      { en: "You can drive in any lane", vi: "Bạn có thể lái ở bất kỳ làn nào" },
      {
        en: "The left lane is for passing only — move right after passing",
        vi: "Làn trái chỉ để vượt xe — phải chuyển phải sau khi vượt",
      },
      { en: "Slower vehicles must use the left lane", vi: "Xe chạy chậm phải dùng làn trái" },
      { en: "Only trucks may use the right lane", vi: "Chỉ xe tải mới được dùng làn phải" },
    ],
    ans: 1,
    exp: {
      en: "In Texas, the left lane on multi-lane highways is for passing only. After passing, return to the right lane. 'Keep right except to pass.'",
      vi: "Ở Texas, làn trái trên đường nhiều làn chỉ để vượt xe. Sau khi vượt, phải chuyển về làn phải. 'Đi phải trừ khi vượt.'",
    },
  },
];
