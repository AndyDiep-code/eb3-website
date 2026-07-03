// BMV Indiana quiz questions — ported from bmv.html.
// 30 questions: 20 rules + 10 signs.

import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const BMV_QUESTIONS: QuizQuestion[] = [
  // ── RULES (20) ────────────────────────────────────────────────────────────
  {
    en: "What is the maximum speed limit on a rural interstate highway in Indiana?",
    vi: "Tốc độ tối đa trên đường cao tốc nông thôn ở Indiana là bao nhiêu?",
    opts: [
      { en: "55 mph", vi: "55 mph" },
      { en: "65 mph", vi: "65 mph" },
      { en: "70 mph", vi: "70 mph" },
      { en: "75 mph", vi: "75 mph" },
    ],
    ans: 2,
    exp: {
      en: "Rural interstates in Indiana have a maximum speed limit of 70 mph, unless otherwise posted.",
      vi: "Đường cao tốc nông thôn Indiana có tốc độ tối đa 70 mph, trừ khi có biển báo khác.",
    },
  },
  {
    en: "What should you do when you see a flashing RED traffic light?",
    vi: "Bạn phải làm gì khi gặp đèn giao thông ĐỎ nhấp nháy?",
    opts: [
      { en: "Slow down and proceed with caution", vi: "Giảm tốc và đi cẩn thận" },
      { en: "Stop completely, then proceed when safe", vi: "Dừng hoàn toàn, rồi đi khi an toàn" },
      { en: "Speed up to clear the intersection", vi: "Tăng tốc để qua ngã tư nhanh" },
      { en: "Treat it as a yellow light", vi: "Coi như đèn vàng" },
    ],
    ans: 1,
    exp: {
      en: "A flashing red light must be treated exactly like a stop sign: come to a complete stop, yield to cross traffic, then proceed when safe.",
      vi: "Đèn đỏ nhấp nháy phải được xử lý giống hệt biển STOP: dừng hoàn toàn, nhường xe, rồi mới đi khi an toàn.",
    },
  },
  {
    en: "What should you do when you see a flashing YELLOW traffic light?",
    vi: "Bạn phải làm gì khi gặp đèn giao thông VÀNG nhấp nháy?",
    opts: [
      { en: "Stop and wait for green", vi: "Dừng lại và chờ đèn xanh" },
      { en: "Speed up to clear the intersection", vi: "Tăng tốc để qua nhanh" },
      { en: "Slow down and proceed with caution", vi: "Giảm tốc và đi qua cẩn thận" },
      { en: "Treat it as a red light", vi: "Coi như đèn đỏ" },
    ],
    ans: 2,
    exp: {
      en: "A flashing yellow light means slow down and proceed with caution. You do NOT need to stop.",
      vi: "Đèn vàng nhấp nháy có nghĩa là giảm tốc và đi qua cẩn thận. Không cần dừng lại.",
    },
  },
  {
    en: "At a four-way stop, two cars arrive at the same time. Who goes first?",
    vi: "Tại ngã tư 4 chiều, 2 xe đến cùng lúc. Xe nào đi trước?",
    opts: [
      { en: "The car going straight", vi: "Xe đi thẳng" },
      { en: "The car on the left", vi: "Xe bên trái" },
      { en: "The car on the right", vi: "Xe bên phải" },
      { en: "Whichever car is bigger", vi: "Xe nào to hơn" },
    ],
    ans: 2,
    exp: {
      en: "When two vehicles arrive at a 4-way stop at the same time, yield to the vehicle on your right.",
      vi: "Khi 2 xe đến ngã tư 4 chiều cùng lúc, nhường quyền ưu tiên cho xe ở bên phải bạn.",
    },
  },
  {
    en: "What is the minimum following distance you should maintain behind the vehicle ahead in normal conditions?",
    vi: "Khoảng cách theo sau tối thiểu trong điều kiện bình thường là bao nhiêu?",
    opts: [
      { en: "1-second rule", vi: "Quy tắc 1 giây" },
      { en: "2-second rule", vi: "Quy tắc 2 giây" },
      { en: "3-second rule", vi: "Quy tắc 3 giây" },
      { en: "5-second rule", vi: "Quy tắc 5 giây" },
    ],
    ans: 2,
    exp: {
      en: "Maintain at least a 3-second following distance in normal conditions. Increase to 4+ seconds in bad weather or construction zones.",
      vi: "Giữ khoảng cách ít nhất 3 giây trong điều kiện bình thường. Tăng lên 4+ giây trong thời tiết xấu hoặc khu công trường.",
    },
  },
  {
    en: "What is the legal Blood Alcohol Concentration (BAC) limit for drivers aged 21 and older in Indiana?",
    vi: "Giới hạn nồng độ cồn (BAC) hợp pháp cho người lái xe từ 21 tuổi trở lên ở Indiana là bao nhiêu?",
    opts: [
      { en: "0.04%", vi: "0.04%" },
      { en: "0.06%", vi: "0.06%" },
      { en: "0.08%", vi: "0.08%" },
      { en: "0.10%", vi: "0.10%" },
    ],
    ans: 2,
    exp: {
      en: "In Indiana, the legal BAC limit is 0.08% for drivers 21 and older. For drivers under 21, the limit is 0.02%.",
      vi: "Ở Indiana, giới hạn BAC hợp pháp là 0.08% cho người từ 21 tuổi trở lên. Với người dưới 21 tuổi, giới hạn là 0.02%.",
    },
  },
  {
    en: "Under Indiana's Move Over Law, what must you do when approaching a stopped emergency vehicle with lights flashing?",
    vi: "Theo luật Move Over của Indiana, bạn phải làm gì khi tiếp cận xe khẩn cấp đang dừng với đèn bật?",
    opts: [
      { en: "Honk to alert the officers", vi: "Bấm còi cảnh báo" },
      { en: "Move to the far lane OR significantly reduce speed", vi: "Chuyển làn xa hơn HOẶC giảm tốc đáng kể" },
      { en: "Maintain your current speed", vi: "Giữ nguyên tốc độ" },
      { en: "Stop behind the emergency vehicle", vi: "Dừng phía sau xe khẩn cấp" },
    ],
    ans: 1,
    exp: {
      en: "Indiana's Move Over Law requires drivers to move over one lane away from stopped emergency vehicles, or if unable to change lanes, significantly slow down.",
      vi: "Luật Move Over Indiana yêu cầu chuyển sang làn xa hơn, hoặc nếu không đổi làn được thì giảm tốc đáng kể khi gặp xe khẩn cấp đang dừng.",
    },
  },
  {
    en: "A double solid yellow center line means:",
    vi: "Hai vạch vàng liền song song ở giữa đường có nghĩa là:",
    opts: [
      { en: "You may pass if the way is clear", vi: "Được vượt nếu đường trống" },
      { en: "You may pass only in good weather", vi: "Chỉ được vượt khi thời tiết tốt" },
      { en: "Neither direction of traffic may pass", vi: "Cả 2 chiều đều không được vượt" },
      { en: "Only slow vehicles may pass", vi: "Chỉ xe chậm mới được vượt" },
    ],
    ans: 2,
    exp: {
      en: "A double solid yellow center line means NEITHER direction of traffic may cross it to pass another vehicle.",
      vi: "Hai vạch vàng liền song song có nghĩa là KHÔNG chiều nào được phép vượt qua để vượt xe khác.",
    },
  },
  {
    en: "A solid white line between lanes on a highway means:",
    vi: "Vạch trắng liền giữa các làn đường có nghĩa là:",
    opts: [
      { en: "Lane changes are encouraged here", vi: "Khuyến khích đổi làn ở đây" },
      { en: "Lane changes are prohibited or discouraged", vi: "Cấm hoặc không khuyến khích đổi làn" },
      { en: "Passing is allowed", vi: "Được phép vượt" },
      { en: "This is a bike lane", vi: "Đây là làn xe đạp" },
    ],
    ans: 1,
    exp: {
      en: "A solid white line indicates that lane changes are discouraged or prohibited. Broken white lines indicate lane changes are allowed.",
      vi: "Vạch trắng liền cho thấy không được khuyến khích hoặc cấm đổi làn. Vạch trắng đứt đoạn cho phép đổi làn.",
    },
  },
  {
    en: "When must you stop for a school bus?",
    vi: "Bạn phải dừng lại khi nào vì xe buýt trường học?",
    opts: [
      { en: "Only when children are actually getting on or off", vi: "Chỉ khi có học sinh đang lên/xuống xe" },
      { en: "When its red lights are flashing and stop arm is extended", vi: "Khi đèn đỏ nhấp nháy và cánh tay dừng mở ra" },
      { en: "Only on residential streets", vi: "Chỉ trên đường khu dân cư" },
      { en: "Only if you are behind the bus", vi: "Chỉ nếu bạn đi phía sau xe buýt" },
    ],
    ans: 1,
    exp: {
      en: "You must stop when a school bus has flashing red lights and an extended stop arm. This applies to traffic in both directions, unless on a divided highway.",
      vi: "Phải dừng khi xe buýt trường học bật đèn đỏ nhấp nháy và mở cánh tay dừng. Áp dụng cho cả 2 chiều, trừ đường có dải phân cách.",
    },
  },
  {
    en: "If you refuse to take a breathalyzer test when requested by a police officer in Indiana, what happens?",
    vi: "Nếu bạn từ chối thổi nồng độ cồn khi cảnh sát yêu cầu ở Indiana, điều gì xảy ra?",
    opts: [
      { en: "Nothing — it's your right", vi: "Không có gì — đó là quyền của bạn" },
      { en: "You receive a warning", vi: "Bạn nhận được cảnh cáo" },
      { en: "Your license is automatically suspended", vi: "Bằng lái của bạn bị thu hồi tự động" },
      { en: "You must pay a small fine", vi: "Bạn phải trả tiền phạt nhỏ" },
    ],
    ans: 2,
    exp: {
      en: "Indiana's Implied Consent Law means that by driving on Indiana roads, you automatically agree to a breathalyzer test. Refusal results in automatic license suspension.",
      vi: "Luật Đồng Ý Ngầm của Indiana có nghĩa là khi lái xe trên đường Indiana, bạn tự động đồng ý thổi nồng độ cồn. Từ chối = tự động mất bằng lái.",
    },
  },
  {
    en: "In a construction zone with workers present, fines for traffic violations are:",
    vi: "Trong khu công trường có công nhân, tiền phạt vi phạm giao thông là:",
    opts: [
      { en: "The same as normal zones", vi: "Giống khu vực bình thường" },
      { en: "Reduced to encourage driving through quickly", vi: "Giảm để khuyến khích qua nhanh" },
      { en: "Doubled", vi: "Tăng gấp đôi" },
      { en: "Tripled", vi: "Tăng gấp ba" },
    ],
    ans: 2,
    exp: {
      en: "In Indiana, fines are automatically doubled in active construction zones when workers are present. This is heavily tested on the exam.",
      vi: "Ở Indiana, tiền phạt tự động tăng gấp đôi trong khu công trường đang thi công có công nhân. Đây là câu hay thi nhất.",
    },
  },
  {
    en: "What is the speed limit in a school zone when children are present?",
    vi: "Tốc độ tối đa trong khu vực trường học khi có trẻ em là bao nhiêu?",
    opts: [
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
    ],
    ans: 1,
    exp: {
      en: "The speed limit in Indiana school zones is 20 mph when children are present, usually indicated by a flashing yellow light.",
      vi: "Tốc độ tối đa trong khu vực trường học ở Indiana là 20 mph khi có trẻ em, thường được báo hiệu bằng đèn vàng nhấp nháy.",
    },
  },
  {
    en: "When changing lanes, what should you do LAST before moving over?",
    vi: "Khi đổi làn, điều CUỐI CÙNG bạn nên làm trước khi sang làn là gì?",
    opts: [
      { en: "Check your mirrors", vi: "Kiểm tra gương" },
      { en: "Signal your intention", vi: "Bật xi nhan" },
      { en: "Check your blind spot", vi: "Kiểm tra điểm mù" },
      { en: "Slow down", vi: "Giảm tốc" },
    ],
    ans: 2,
    exp: {
      en: "The correct order is: Check mirrors → Signal → Check blind spot → Move over. Checking the blind spot is the last step before actually changing lanes.",
      vi: "Thứ tự đúng: Kiểm tra gương → Bật xi nhan → Kiểm tra điểm mù → Sang làn. Kiểm tra điểm mù là bước cuối cùng trước khi sang làn.",
    },
  },
  {
    en: "If your vehicle starts to skid on a slippery road, you should:",
    vi: "Nếu xe của bạn bắt đầu trượt trên đường trơn, bạn nên:",
    opts: [
      { en: "Slam on the brakes immediately", vi: "Đạp phanh mạnh ngay lập tức" },
      { en: "Steer in the opposite direction of the skid", vi: "Lái ngược chiều trượt" },
      { en: "Ease off the accelerator and steer in the direction of the skid", vi: "Nhả ga từ từ và lái theo chiều trượt" },
      { en: "Speed up to regain control", vi: "Tăng tốc để lấy lại kiểm soát" },
    ],
    ans: 2,
    exp: {
      en: "When skidding, ease off the gas and steer gently in the direction the rear of the car is sliding. Avoid sudden braking or sharp steering.",
      vi: "Khi xe trượt, nhả ga từ từ và lái nhẹ nhàng theo chiều đuôi xe đang trượt. Tránh phanh đột ngột hoặc đánh lái mạnh.",
    },
  },
  {
    en: "When parking uphill with a curb, your front wheels should be turned:",
    vi: "Khi đỗ xe đầu dốc lên có vỉa hè, bánh trước nên quay về phía:",
    opts: [
      { en: "Toward the curb", vi: "Về phía vỉa hè" },
      { en: "Away from the curb", vi: "Ra xa vỉa hè" },
      { en: "Straight ahead", vi: "Thẳng về phía trước" },
      { en: "It doesn't matter", vi: "Không quan trọng" },
    ],
    ans: 1,
    exp: {
      en: "When parking uphill with a curb: turn wheels AWAY from curb (so if brakes fail, car rolls into curb). When parking downhill: turn wheels TOWARD curb.",
      vi: "Đỗ đầu dốc lên có vỉa hè: quay bánh RA XA vỉa hè (nếu phanh hỏng, xe lăn vào vỉa hè). Đỗ đầu dốc xuống: quay bánh VÀO vỉa hè.",
    },
  },
  {
    en: "Texting while driving in Indiana is:",
    vi: "Nhắn tin trong khi lái xe ở Indiana là:",
    opts: [
      { en: "Legal if stopped at a red light", vi: "Hợp pháp nếu đang dừng đèn đỏ" },
      { en: "Legal only on highways", vi: "Chỉ hợp pháp trên đường cao tốc" },
      { en: "Illegal and subject to a $500+ fine", vi: "Bất hợp pháp và bị phạt $500+" },
      { en: "Only illegal for drivers under 18", vi: "Chỉ bất hợp pháp với người dưới 18 tuổi" },
    ],
    ans: 2,
    exp: {
      en: "Indiana bans texting while driving for all drivers, with fines starting at $500. This includes reading texts at red lights.",
      vi: "Indiana cấm nhắn tin khi lái xe cho tất cả tài xế, với mức phạt từ $500. Bao gồm cả đọc tin nhắn khi đèn đỏ.",
    },
  },
  {
    en: "Following distance should be increased to at least 4 seconds in:",
    vi: "Khoảng cách theo sau nên tăng lên ít nhất 4 giây trong:",
    opts: [
      { en: "Light traffic", vi: "Giao thông nhẹ" },
      { en: "Sunny weather on dry roads", vi: "Thời tiết nắng trên đường khô" },
      { en: "Construction zones and bad weather", vi: "Khu công trường và thời tiết xấu" },
      { en: "School zones only", vi: "Chỉ trong khu vực trường học" },
    ],
    ans: 2,
    exp: {
      en: "The 4-second following distance rule applies in construction zones and adverse weather conditions (rain, snow, ice, fog).",
      vi: "Quy tắc 4 giây áp dụng trong khu công trường và điều kiện thời tiết xấu (mưa, tuyết, băng, sương mù).",
    },
  },
  {
    en: "Pedestrians in a crosswalk:",
    vi: "Người đi bộ tại vạch sang đường:",
    opts: [
      { en: "Must wait for all traffic to clear", vi: "Phải chờ tất cả xe qua hết" },
      { en: "Always have the right of way", vi: "Luôn có quyền ưu tiên" },
      { en: "Only have the right of way when the walk signal is on", vi: "Chỉ được ưu tiên khi có tín hiệu đi bộ" },
      { en: "Must yield to turning vehicles", vi: "Phải nhường xe đang rẽ" },
    ],
    ans: 1,
    exp: {
      en: "Pedestrians in a marked crosswalk always have the right of way. You must stop and wait for them to completely cross before proceeding.",
      vi: "Người đi bộ tại vạch sang đường luôn có quyền ưu tiên. Bạn phải dừng và chờ họ sang đường hoàn toàn trước khi đi tiếp.",
    },
  },
  {
    en: "If you are involved in an accident resulting in injury, you must report it to the police:",
    vi: "Nếu bạn bị tai nạn có người bị thương, bạn phải báo cảnh sát:",
    opts: [
      { en: "Within 72 hours", vi: "Trong vòng 72 giờ" },
      { en: "Within 1 week", vi: "Trong vòng 1 tuần" },
      { en: "Immediately", vi: "Ngay lập tức" },
      { en: "Only if damage exceeds $5,000", vi: "Chỉ khi thiệt hại vượt $5,000" },
    ],
    ans: 2,
    exp: {
      en: "Any accident involving injury, death, or significant property damage must be reported to police immediately. Never leave the scene.",
      vi: "Mọi tai nạn có người bị thương, tử vong, hoặc thiệt hại tài sản đáng kể phải được báo cảnh sát ngay. Không được bỏ hiện trường.",
    },
  },
  // ── SIGNS (10) ─────────────────────────────────────────────────────────────
  {
    en: "What shape is ONLY used for STOP signs?",
    vi: "Hình dạng nào CHỈ dùng cho biển STOP?",
    opts: [
      { en: "Triangle", vi: "Tam giác" },
      { en: "Diamond", vi: "Hình thoi" },
      { en: "Octagon (8 sides)", vi: "Hình bát giác (8 cạnh)" },
      { en: "Pentagon", vi: "Ngũ giác" },
    ],
    ans: 2,
    exp: {
      en: "The octagon (8-sided shape) is exclusively used for STOP signs in the United States. No other sign uses this shape.",
      vi: "Hình bát giác (8 cạnh) chỉ được dùng độc quyền cho biển STOP ở Mỹ. Không có biển báo nào khác dùng hình này.",
    },
  },
  {
    en: "What shape is used ONLY for school zone warning signs?",
    vi: "Hình dạng nào CHỈ dùng cho biển cảnh báo khu vực trường học?",
    opts: [
      { en: "Diamond", vi: "Hình thoi" },
      { en: "Pentagon (5 sides, point up)", vi: "Ngũ giác (5 cạnh, đỉnh hướng lên)" },
      { en: "Octagon", vi: "Hình bát giác" },
      { en: "Circle", vi: "Hình tròn" },
    ],
    ans: 1,
    exp: {
      en: "The pentagon shape (5 sides with the point at the top) is used exclusively for school zone warning signs.",
      vi: "Hình ngũ giác (5 cạnh, đỉnh hướng lên) chỉ dùng độc quyền cho biển cảnh báo khu vực trường học.",
    },
  },
  {
    en: "An orange sign on the road most likely indicates:",
    vi: "Biển báo màu cam trên đường thường báo hiệu:",
    opts: [
      { en: "A hospital nearby", vi: "Bệnh viện gần đây" },
      { en: "A construction or work zone", vi: "Khu công trường hoặc thi công" },
      { en: "A school zone", vi: "Khu vực trường học" },
      { en: "A recreational area", vi: "Khu vực giải trí" },
    ],
    ans: 1,
    exp: {
      en: "Orange signs are used exclusively for construction zones and work areas. They warn of temporary hazards and changed road conditions.",
      vi: "Biển cam được dùng độc quyền cho khu công trường và khu vực thi công. Báo hiệu nguy hiểm tạm thời và điều kiện đường thay đổi.",
    },
  },
  {
    en: "A yellow diamond-shaped sign with a curved arrow indicates:",
    vi: "Biển báo hình thoi vàng có mũi tên cong báo hiệu:",
    opts: [
      { en: "A school zone ahead", vi: "Phía trước có khu vực trường học" },
      { en: "A curve or turn in the road ahead", vi: "Phía trước có khúc cua hoặc ngã rẽ" },
      { en: "A railroad crossing ahead", vi: "Phía trước có đường sắt" },
      { en: "A merge zone ahead", vi: "Phía trước có khu vực nhập làn" },
    ],
    ans: 1,
    exp: {
      en: "A yellow diamond with a curved arrow is a warning sign indicating a curve or sharp turn ahead. Slow down before reaching the curve.",
      vi: "Hình thoi vàng có mũi tên cong là biển cảnh báo có khúc cua hoặc rẽ sắc phía trước. Giảm tốc trước khi vào khúc cua.",
    },
  },
  {
    en: "What does a red circular sign with a white horizontal bar mean?",
    vi: "Biển báo hình tròn đỏ có thanh ngang trắng có nghĩa là gì?",
    opts: [
      { en: "Yield to oncoming traffic", vi: "Nhường đường xe ngược chiều" },
      { en: "Speed limit zone", vi: "Khu vực giới hạn tốc độ" },
      { en: "Do Not Enter — wrong way", vi: "Cấm vào — đường ngược chiều" },
      { en: "No parking", vi: "Cấm đỗ xe" },
    ],
    ans: 2,
    exp: {
      en: "A red circle with a white horizontal bar is the 'Do Not Enter' sign. It means you would be going the wrong way on a one-way road.",
      vi: "Hình tròn đỏ có thanh ngang trắng là biển 'Cấm vào'. Có nghĩa là bạn đang đi vào đường một chiều theo chiều sai.",
    },
  },
  {
    en: "Blue signs on the highway generally indicate:",
    vi: "Biển báo màu xanh dương trên đường cao tốc thường chỉ:",
    opts: [
      { en: "Construction zones", vi: "Khu công trường" },
      { en: "Distance and direction information", vi: "Thông tin khoảng cách và hướng đi" },
      { en: "Services such as gas, food, or lodging", vi: "Các dịch vụ như xăng, ăn uống, hoặc nhà trọ" },
      { en: "Speed limit zones", vi: "Khu vực giới hạn tốc độ" },
    ],
    ans: 2,
    exp: {
      en: "Blue signs provide motorist services information, such as the locations of gas stations, restaurants, hotels, hospitals, and rest areas.",
      vi: "Biển xanh dương cung cấp thông tin dịch vụ cho người lái xe, như vị trí trạm xăng, nhà hàng, khách sạn, bệnh viện và trạm nghỉ.",
    },
  },
  {
    en: "A triangular sign with the point facing downward is a:",
    vi: "Biển báo hình tam giác có đỉnh hướng xuống dưới là:",
    opts: [
      { en: "Warning sign", vi: "Biển cảnh báo" },
      { en: "Stop sign", vi: "Biển dừng" },
      { en: "Yield sign", vi: "Biển nhường đường" },
      { en: "Construction sign", vi: "Biển công trường" },
    ],
    ans: 2,
    exp: {
      en: "An inverted triangle (point down) is used exclusively for Yield signs in the United States. Slow down and give way to others.",
      vi: "Hình tam giác đảo ngược (đỉnh xuống) chỉ dùng cho biển Yield ở Mỹ. Giảm tốc và nhường đường cho người khác.",
    },
  },
  {
    en: "A sign with the words 'WRONG WAY' in white on a red background means:",
    vi: "Biển có chữ 'WRONG WAY' màu trắng trên nền đỏ có nghĩa là:",
    opts: [
      { en: "There is construction ahead", vi: "Phía trước có công trường" },
      { en: "You are traveling in the wrong direction", vi: "Bạn đang đi sai chiều" },
      { en: "The speed limit changes ahead", vi: "Giới hạn tốc độ thay đổi phía trước" },
      { en: "No passing zone", vi: "Khu vực cấm vượt" },
    ],
    ans: 1,
    exp: {
      en: "The WRONG WAY sign means you are traveling against the flow of traffic on a one-way road. Stop immediately, safely return to the correct direction.",
      vi: "Biển WRONG WAY có nghĩa là bạn đang đi ngược chiều trên đường một chiều. Dừng ngay, quay đầu về chiều đúng an toàn.",
    },
  },
  {
    en: "An X-shaped sign painted on the pavement near railroad tracks means:",
    vi: "Biển hình chữ X sơn trên mặt đường gần đường sắt có nghĩa là:",
    opts: [
      { en: "Railroad crossing ahead — slow down", vi: "Phía trước có đường sắt — giảm tốc" },
      { en: "No entry zone", vi: "Khu vực cấm vào" },
      { en: "Intersection ahead", vi: "Phía trước có ngã tư" },
      { en: "Merge zone", vi: "Khu vực nhập làn" },
    ],
    ans: 0,
    exp: {
      en: "The X-shaped pavement marking near railroad tracks is an advance warning of a railroad crossing ahead. Slow down, look, and be prepared to stop if a train is approaching.",
      vi: "Dấu X sơn trên mặt đường gần đường sắt là cảnh báo trước về đường sắt phía trước. Giảm tốc, nhìn hai phía, sẵn sàng dừng nếu có tàu đến.",
    },
  },
  {
    en: "Brown road signs indicate:",
    vi: "Biển báo màu nâu chỉ:",
    opts: [
      { en: "Upcoming highway exits", vi: "Lối ra cao tốc sắp tới" },
      { en: "Recreational, cultural, or scenic areas", vi: "Khu vực giải trí, văn hóa hoặc phong cảnh đẹp" },
      { en: "Road construction zones", vi: "Khu vực công trường" },
      { en: "Emergency services", vi: "Dịch vụ khẩn cấp" },
    ],
    ans: 1,
    exp: {
      en: "Brown signs indicate recreational, cultural, scenic, and historic areas such as national parks, historical sites, and state parks.",
      vi: "Biển nâu chỉ các khu vực giải trí, văn hóa, phong cảnh và lịch sử như vườn quốc gia, địa điểm lịch sử và công viên tiểu bang.",
    },
  },
];

/** Pass score: 24/30 for the mock test (80%) */
export const BMV_PASS_COUNT = 24;
