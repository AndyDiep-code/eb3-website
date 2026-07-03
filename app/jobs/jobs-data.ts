/**
 * Sponsor-company directory + packing-guide dataset ported verbatim from
 * jobs.html's inline STATES / CAT_BADGE / CAT_ICON / KIT_GUIDE / JOBS
 * constants (legacy lines 335-751). Kept as a standalone data module so
 * jobs-content.tsx stays focused on rendering/filtering logic.
 */

export type JobCategory =
  | "poultry"
  | "fish"
  | "mfg"
  | "food"
  | "hotel"
  | "transport"
  | "care"
  | "other";

/** State code as used by JOBS[].state — includes "MULTI" for multi-state employers. */
export type StateCode =
  | "AL"
  | "AR"
  | "AZ"
  | "FL"
  | "GA"
  | "IN"
  | "LA"
  | "MN"
  | "MS"
  | "MT"
  | "NC"
  | "NV"
  | "OH"
  | "PA"
  | "SC"
  | "SD"
  | "TX"
  | "WI"
  | "MULTI";

export interface StateInfo {
  name: string;
  weather: string;
  rent: string;
  food: string;
  tax: string;
  viet: string;
  notes: string;
}

export interface JobEntry {
  n: string;
  co: string;
  city: string;
  state: StateCode;
  cat: JobCategory;
  desc: string;
  bullets: string[];
}

export interface KitItem {
  i: string;
  text: string;
}

export interface KitGuideEntry {
  label: string;
  buy: KitItem[];
  vn: KitItem[];
  personal: KitItem[];
  note: string;
}

/** "Bang chính" states with a dedicated filter button — rest fall under "other". */
export const PRIMARY_STATE_FILTERS: StateCode[] = [
  "GA",
  "WI",
  "AL",
  "NC",
  "FL",
  "TX",
  "SC",
];

export const STATES: Record<StateCode, StateInfo> = {
  AL: {
    name: "Alabama",
    weather: "Nóng ẩm (90°F+ mùa hè), mùa đông ấm (30-55°F). Bão thỉnh thoảng.",
    rent: "$700–950/tháng (1BR khu vực nhà máy)",
    food: "~$350–480/người/tháng",
    tax: "Thu nhập: 2–5%. Không thu thuế tiểu bang với một số đối tượng.",
    viet: "Ít. Cộng đồng chủ yếu ở Birmingham.",
    notes: "Chi phí thấp nhất cả nước. Nhịp sống chậm, cộng đồng nhỏ. Cần xe hơi di chuyển.",
  },
  AR: {
    name: "Arkansas",
    weather: "Mùa hè nóng ẩm (90°F+), mùa đông lạnh vừa (25-45°F). Bão lốc xoáy vùng.",
    rent: "$700–950/tháng (1BR)",
    food: "~$350–480/người/tháng",
    tax: "Thu nhập: 4.4%. Chi phí tổng thể thấp.",
    viet: "Rất ít.",
    notes: "Chi phí sinh hoạt rất thấp. Thiên nhiên đẹp. Ít tiện ích đô thị.",
  },
  AZ: {
    name: "Arizona",
    weather: "Rất nóng và khô mùa hè (110°F+ Phoenix), mùa đông ấm (45-65°F). Không có tuyết (ngoại trừ vùng cao).",
    rent: "$1,100–1,600/tháng (1BR, Phoenix area)",
    food: "~$420–600/người/tháng",
    tax: "Thu nhập: 2.5% (flat). Không có thuế thực phẩm tiểu bang.",
    viet: "Trung bình – Phoenix có cộng đồng Việt khoảng 15.000 người.",
    notes: "Nóng cực đoan mùa hè. Không cần mặc đồ ấm nhiều. Cộng đồng đang phát triển.",
  },
  FL: {
    name: "Florida",
    weather: "Nóng ẩm quanh năm (phía nam). Phía bắc (như Jacksonville) mát hơn, mùa đông 40-65°F. Mùa bão tháng 6–11.",
    rent: "$1,200–2,000/tháng (1BR, tùy khu vực)",
    food: "~$450–650/người/tháng",
    tax: "Không có thuế thu nhập tiểu bang. Một lợi thế lớn.",
    viet: "Lớn – Orlando, Jacksonville, Miami, Tampa. Nhiều tiệm Việt, chùa Việt.",
    notes: "Không thuế thu nhập = tiết kiệm đáng kể. Bảo hiểm nhà đắt do bão. Lái xe bắt buộc.",
  },
  GA: {
    name: "Georgia",
    weather: "Mùa hè nóng ẩm (90-95°F), mùa đông nhẹ (30-50°F). Ít tuyết. Một số khu vực có bão.",
    rent: "$900–1,300/tháng (1BR, ngoại ô Atlanta) | $700–950 vùng nông thôn",
    food: "~$400–580/người/tháng",
    tax: "Thu nhập: 5.39%. Thuế thực phẩm: tùy county.",
    viet: "Trung bình – Atlanta/Doraville/Chamblee có cộng đồng đáng kể (~30.000 người).",
    notes: "Kinh tế phát triển mạnh. Nhiều hãng EB-3 tập trung tại đây. Giao thông Atlanta tắc.",
  },
  IN: {
    name: "Indiana",
    weather: "Mùa đông lạnh (0-30°F, có tuyết), mùa hè nóng ẩm (80-90°F).",
    rent: "$800–1,100/tháng (1BR Indianapolis)",
    food: "~$380–550/người/tháng",
    tax: "Thu nhập: 3.05% (flat). Tương đối thấp.",
    viet: "Vừa – Indianapolis có cộng đồng ~8.000 người Việt. Có phố Việt nhỏ.",
    notes: "Chi phí sống vừa phải. Labor Guys có trụ sở tại đây. Có 4 mùa rõ rệt.",
  },
  LA: {
    name: "Louisiana",
    weather: "Nóng ẩm (90°F+), mùa đông ấm (40-65°F). Nguy cơ bão/lũ lụt cao (New Orleans).",
    rent: "$800–1,200/tháng (1BR)",
    food: "~$400–550/người/tháng",
    tax: "Thu nhập: 1.85–4.25%. Có miễn trừ.",
    viet: "Trung bình – New Orleans, Metairie có cộng đồng lâu đời (~25.000 người).",
    notes: "Văn hóa ẩm thực phong phú. Rủi ro thời tiết cao. Cộng đồng Việt lâu đời.",
  },
  MN: {
    name: "Minnesota",
    weather: "Mùa đông rất lạnh (-20°F có thể xảy ra), mùa hè ôn hòa (70-85°F). Nhiều tuyết.",
    rent: "$1,000–1,400/tháng (1BR Twin Cities)",
    food: "~$400–600/người/tháng",
    tax: "Thu nhập: 5.35–9.85%. Khá cao.",
    viet: "Đáng kể – Minneapolis/St. Paul có cộng đồng Việt ~20.000 người.",
    notes: "Mùa đông khắc nghiệt cần chuẩn bị kỹ. Tiện ích đô thị tốt. Thuế cao.",
  },
  MS: {
    name: "Mississippi",
    weather: "Nóng ẩm (90°F+), mùa đông ấm (30-55°F). Bão theo mùa.",
    rent: "$650–900/tháng (1BR – rẻ nhất cả nước)",
    food: "~$330–470/người/tháng",
    tax: "Thu nhập: 4.7%. Đang giảm dần.",
    viet: "Rất ít.",
    notes: "Chi phí sinh hoạt thấp nhất Mỹ. Cơ sở hạ tầng hạn chế. Thiếu cộng đồng người Việt.",
  },
  MT: {
    name: "Montana",
    weather: "Mùa đông rất lạnh (-20°F), mùa hè mát mẻ đẹp (70-85°F). Núi non hùng vĩ.",
    rent: "$900–1,300/tháng (1BR)",
    food: "~$400–580/người/tháng",
    tax: "Thu nhập: 5.9%. Không có thuế bán hàng tiểu bang.",
    viet: "Rất ít – Montana dân thưa.",
    notes: "Thiên nhiên tuyệt đẹp. Không gian rộng. Rất ít dịch vụ người Việt. Mùa đông khắc nghiệt.",
  },
  NC: {
    name: "North Carolina",
    weather: "Bốn mùa rõ rệt. Mùa hè nóng ẩm (85-90°F), mùa đông lạnh vừa (25-45°F). Ít tuyết trừ vùng núi.",
    rent: "$900–1,300/tháng (1BR)",
    food: "~$400–580/người/tháng",
    tax: "Thu nhập: 4.5% (đang giảm về 3.99%).",
    viet: "Vừa – Raleigh, Charlotte, Durham có cộng đồng phát triển.",
    notes: "Kinh tế tăng trưởng nhanh. Nhiều hãng chế biến thịt gia cầm. 4 mùa đẹp.",
  },
  NV: {
    name: "Nevada (Reno)",
    weather: "Sa mạc cao nguyên. Mùa hè nóng khô (95-105°F), mùa đông lạnh có tuyết (20-40°F).",
    rent: "$1,100–1,500/tháng (1BR Reno)",
    food: "~$430–600/người/tháng",
    tax: "Không có thuế thu nhập tiểu bang.",
    viet: "Nhỏ – Las Vegas có cộng đồng Việt nhỏ; Reno ít hơn.",
    notes: "Không thuế thu nhập là lợi thế. Khí hậu khô – dễ chịu hơn Florida dù nóng. Cần xe hơi.",
  },
  OH: {
    name: "Ohio",
    weather: "Mùa đông lạnh (10-30°F, nhiều tuyết – nhất là vùng hồ Erie), mùa hè nóng ẩm (80-88°F).",
    rent: "$800–1,100/tháng (1BR)",
    food: "~$380–550/người/tháng",
    tax: "Thu nhập: 2.75–3.5%.",
    viet: "Vừa – Columbus, Cleveland có cộng đồng khoảng 15.000 người.",
    notes: "Chi phí vừa. 4 mùa. Cộng đồng Việt đang phát triển ở Columbus.",
  },
  PA: {
    name: "Pennsylvania (Allentown)",
    weather: "Bốn mùa rõ rệt. Mùa đông lạnh (15-35°F), mùa hè nóng ẩm (80-88°F). Tuyết vừa.",
    rent: "$1,000–1,400/tháng (1BR Allentown)",
    food: "~$400–580/người/tháng",
    tax: "Thu nhập: 3.07% (flat). Không đánh thuế Social Security.",
    viet: "Vừa – Philadelphia (cách Allentown 1 tiếng) có cộng đồng lớn.",
    notes: "Gần NYC và Philadelphia. Thành phố Allentown có nhiều người Mỹ Latin, cộng đồng đa dạng.",
  },
  SC: {
    name: "South Carolina",
    weather: "Mùa hè nóng ẩm (88-95°F), mùa đông ấm (30-55°F). Bão theo mùa ven biển.",
    rent: "$850–1,200/tháng (1BR)",
    food: "~$380–550/người/tháng",
    tax: "Thu nhập: 3–6.3%. Khấu trừ tốt.",
    viet: "Nhỏ – Greenville, Columbia có ít cộng đồng.",
    notes: "Chi phí vừa. Thời tiết dễ chịu. Kinh tế phát triển (BMW, Michelin có nhà máy tại SC).",
  },
  SD: {
    name: "South Dakota",
    weather: "Mùa đông rất lạnh (-15°F, nhiều tuyết), mùa hè nóng khô (85-95°F). Gió mạnh.",
    rent: "$700–950/tháng (1BR Sioux Falls)",
    food: "~$370–520/người/tháng",
    tax: "Không có thuế thu nhập tiểu bang. Một trong 9 bang không đánh thuế thu nhập.",
    viet: "Rất ít.",
    notes: "Không thuế thu nhập là lợi thế lớn. Mùa đông khắc nghiệt. Ít dịch vụ đô thị. Cần chuẩn bị quần áo ấm kỹ.",
  },
  TX: {
    name: "Texas",
    weather: "Nóng (Dallas: 100°F+ mùa hè), mùa đông ôn hòa (30-55°F Dallas). Bão ở vùng bờ biển.",
    rent: "$1,100–1,500/tháng (1BR Dallas)",
    food: "~$420–600/người/tháng",
    tax: "Không có thuế thu nhập tiểu bang.",
    viet: "Lớn – Houston có cộng đồng Việt 100.000+ người. Dallas ~40.000 người.",
    notes: "Không thuế thu nhập. Kinh tế mạnh. Cộng đồng Việt lớn nhất ở Houston. Nóng cực đoan mùa hè.",
  },
  WI: {
    name: "Wisconsin",
    weather: "Mùa đông rất lạnh (-10°F, nhiều tuyết), mùa hè mát ôn hòa (70-82°F). Đẹp 4 mùa.",
    rent: "$800–1,100/tháng (1BR – thấp hơn vùng nông thôn)",
    food: "~$400–580/người/tháng",
    tax: "Thu nhập: 3.5–7.65%. Tương đối cao.",
    viet: "Vừa – Milwaukee có cộng đồng ~10.000 người Việt.",
    notes: "Cần chuẩn bị quần áo mùa đông kỹ. Nhiều resort du lịch (Wisconsin Dells). Thuế khá cao.",
  },
  MULTI: {
    name: "Nhiều tiểu bang",
    weather: "Tùy vị trí cụ thể",
    rent: "Tùy bang",
    food: "Tùy bang",
    tax: "Tùy bang",
    viet: "Tùy bang",
    notes: "Hỏi agency về bang cụ thể và địa điểm nhà máy trước khi ký hợp đồng.",
  },
};

export const CAT_BADGE: Record<JobCategory, { label: string; cls: string }> = {
  poultry: { label: "🐓 Gia Cầm", cls: "b-poultry" },
  fish: { label: "🐟 Hải Sản", cls: "b-fish" },
  mfg: { label: "🏭 Sản Xuất", cls: "b-mfg" },
  food: { label: "🍔 Ăn Uống", cls: "b-food" },
  hotel: { label: "🏨 Khách Sạn", cls: "b-hotel" },
  transport: { label: "🚌 Vận Tải", cls: "b-transport" },
  care: { label: "🏥 Chăm Sóc", cls: "b-care" },
  other: { label: "📦 Khác", cls: "b-other" },
};

export const CAT_ICON: Record<JobCategory, string> = {
  poultry: "🐓",
  fish: "🐟",
  mfg: "🏭",
  food: "🍔",
  hotel: "🏨",
  transport: "🚌",
  care: "🏥",
  other: "📦",
};

export const JOB_CATEGORY_FILTERS: Array<{ key: JobCategory; label: string }> = [
  { key: "poultry", label: "🐓 Gia Cầm" },
  { key: "fish", label: "🐟 Hải Sản" },
  { key: "mfg", label: "🏭 Sản Xuất" },
  { key: "food", label: "🍔 Ăn Uống" },
  { key: "hotel", label: "🏨 Khách Sạn" },
  { key: "transport", label: "🚌 Vận Tải" },
  { key: "care", label: "🏥 Chăm Sóc" },
  { key: "other", label: "📦 Khác" },
];

export const KIT_GUIDE: Record<JobCategory, KitGuideEntry> = {
  poultry: {
    label: "🐓 Gia Cầm — Chế Biến Gà",
    buy: [
      { i: "🥾", text: "<b>Steel-toed boots (ủng mũi thép)</b> — bắt buộc. Mua ở Walmart/Amazon ~$40–70. Chọn loại chống nước." },
      { i: "🧤", text: "<b>Găng tay chống cắt (cut-resistant gloves)</b> — nhiều hãng phát nhưng nên có cái riêng, size vừa tay." },
      { i: "👂", text: "<b>Nút tai (earplugs)</b> — hãng thường phát nhưng cần dùng hàng ngày." },
      { i: "🧥", text: "<b>Áo hoodie dày hoặc áo lót nhiệt</b> — nhà máy 35–42°F. Mua ở Walmart, khoảng $15–25." },
    ],
    vn: [
      { i: "🧦", text: "<b>Tất len dày</b> (woolly socks) — hàng VN rẻ hơn 3–4 lần, mang 5–10 đôi." },
      { i: "🧣", text: "<b>Khẩu trang vải + khẩu trang lọc mùi</b> — môi trường có mùi gia cầm. Hàng VN tốt, rẻ." },
      { i: "🩲", text: "<b>Đồ lót giữ nhiệt (thermal underwear)</b> — hàng TQ/VN mua sẵn rẻ hơn ở Mỹ gấp đôi." },
      { i: "💊", text: "<b>Dầu gió xanh, dầu cù là, cao sao vàng</b> — khó tìm ở Mỹ, rất cần khi mỏi cơ." },
      { i: "🧴", text: "<b>Kem dưỡng tay</b> — tay khô nứt do lạnh và rửa tay liên tục. Hàng VN rẻ hơn." },
    ],
    personal: [
      { i: "🍱", text: "<b>Hộp cơm giữ nhiệt</b> (thermos food jar) — mang cơm nhà ăn trưa tiết kiệm $200+/tháng." },
      { i: "💧", text: "<b>Bình nước inox giữ lạnh/nóng</b> — ít plastic, dùng bền." },
      { i: "🩹", text: "<b>Thuốc giảm đau (Ibuprofen/Tylenol)</b> — mỏi cơ, đau khớp thường gặp tuần đầu." },
      { i: "🪤", text: "<b>Wrist support (băng cổ tay)</b> — nếu công việc lặp đi lặp lại nhiều. Tránh hội chứng ống cổ tay." },
    ],
    note: "Hãng thường phát: tạp dề (apron), mũ lưới, ủng cao su dùng chung. Nên kiểm tra trước ngày đầu đi làm.",
  },
  fish: {
    label: "🐟 Hải Sản & Cá — Chế Biến Thủy Sản",
    buy: [
      { i: "🥾", text: "<b>Rubber boots cao cổ (ủng cao su)</b> — sàn luôn ướt và có tanh. Mua ở Farm & Fleet hoặc Walmart ~$25–40." },
      { i: "🧤", text: "<b>Găng tay cao su dày + găng tay chống cắt</b> — cần 2 lớp: chống cắt bên trong, cao su bên ngoài." },
      { i: "🥽", text: "<b>Kính bảo hộ (safety goggles)</b> — chống nước văng vào mắt khi phi lê cá." },
      { i: "🧥", text: "<b>Áo jacket giữ ấm waterproof</b> — môi trường 35–42°F và ẩm ướt. Ưu tiên loại chống thấm." },
    ],
    vn: [
      { i: "🩲", text: "<b>Đồ lót giữ nhiệt 2–3 bộ</b> — mặc suốt ca 8–10 tiếng trong kho lạnh." },
      { i: "🧦", text: "<b>Tất len cao cổ dày</b> — 7–10 đôi. Rẻ hơn ở VN gấp 3–4 lần." },
      { i: "💊", text: "<b>Dầu gió, thuốc bổ khớp</b> — làm việc lạnh lâu dài ảnh hưởng khớp." },
      { i: "🧴", text: "<b>Kem chống nứt tay, dưỡng môi</b> — môi trường khô lạnh khiến tay môi nứt nẻ." },
      { i: "🧄", text: "<b>Gia vị VN, nước mắm</b> — sau ca mệt, cần bữa ăn quen thuộc. Mang theo loại nhỏ." },
    ],
    personal: [
      { i: "🍱", text: "<b>Hộp cơm giữ nhiệt tốt</b> — ăn trưa trong môi trường lạnh cần hộp giữ ấm lâu." },
      { i: "🩺", text: "<b>Thuốc đau khớp, dầu xoa bóp</b> — Tiger Balm, Salonpas patch là lựa chọn tốt." },
      { i: "🎧", text: "<b>Earbud chống nước</b> — nếu được phép nghe nhạc, giúp tập trung và giảm mệt mỏi." },
      { i: "📱", text: "<b>Ốp điện thoại chống nước</b> — môi trường ẩm, điện thoại dễ hỏng." },
    ],
    note: "Đặc thù: mùi cá rất dai. Mang quần áo đi làm riêng biệt, không mặc về nhà. Nên có túi đựng đồ bảo hộ riêng.",
  },
  mfg: {
    label: "🏭 Sản Xuất — Nhà Máy & Kho Hàng",
    buy: [
      { i: "🥾", text: "<b>Steel-toed boots</b> — bắt buộc tại tất cả nhà máy. Có thể mua sau khi đến Mỹ ở Walmart, Academy Sports ~$45–80." },
      { i: "🥽", text: "<b>Safety glasses (kính bảo hộ)</b> — hãng thường phát nhưng nên có cái riêng vừa mặt." },
      { i: "🧤", text: "<b>Work gloves (găng tay làm việc)</b> — tùy loại: vải, da, hay cao su. Hãng thường có, nên có dự phòng." },
      { i: "🦺", text: "<b>Hi-vis vest (áo phản quang)</b> — cần ở kho/warehouse. Hãng thường cấp phát." },
    ],
    vn: [
      { i: "👟", text: "<b>Giày thể thao đế dày</b> — dùng trong thời gian chờ mua boots. Chọn loại đế cứng, chống trơn." },
      { i: "🧦", text: "<b>Tất dày đi boots</b> — 5–7 đôi. Mang từ VN rẻ hơn." },
      { i: "💊", text: "<b>Vitamin C, vitamin tổng hợp</b> — cơ thể cần thích nghi với lịch làm việc mới." },
      { i: "💊", text: "<b>Dầu gió, Salonpas (miếng dán đau)</b> — mỏi lưng, đau cơ thường gặp tuần đầu." },
      { i: "🍜", text: "<b>Mì gói, phở ăn liền</b> — bữa ăn nhanh sau ca đêm, trước khi quen với chợ Mỹ." },
    ],
    personal: [
      { i: "🍱", text: "<b>Hộp cơm + bình nước lớn (1L+)</b> — ca 8–12h, uống đủ nước rất quan trọng." },
      { i: "⌚", text: "<b>Đồng hồ bền (G-Shock hoặc tương tự)</b> — nhà máy thường không cho dùng điện thoại trong giờ làm." },
      { i: "🩹", text: "<b>Miếng lót giày (insole)</b> — đứng 8–10h cần lót giày êm. Mua ở Walmart ~$5–10." },
      { i: "🧴", text: "<b>Kem chống hăm, powder</b> — đứng lâu trong thời tiết nóng dễ bị hăm. Mang từ VN." },
    ],
    note: "Kho hàng (warehouse) khác nhà máy: kho thường không lạnh nhưng bụi nhiều. Nhà máy kim loại: bảo vệ tai và mắt là ưu tiên số 1.",
  },
  hotel: {
    label: "🏨 Khách Sạn — Housekeeping & Resort",
    buy: [
      { i: "👟", text: "<b>Giày non-slip, đế mềm</b> — đứng và đi bộ 8–10h mỗi ngày. Mua ở Walmart, Skechers ~$30–50." },
      { i: "🧤", text: "<b>Găng tay cao su dùng một lần (latex gloves)</b> — dọn phòng, vệ sinh. Hộp 100 cái ~$8." },
      { i: "🧴", text: "<b>Kem dưỡng tay chuyên nghiệp</b> — tiếp xúc hóa chất tẩy rửa liên tục. Mua ở CVS/Walgreens." },
    ],
    vn: [
      { i: "👙", text: "<b>Đồ lót cotton thoáng khí</b> — vận động nhiều, mồ hôi nhiều. Hàng VN tốt hơn hàng Mỹ cùng giá." },
      { i: "👟", text: "<b>Đế lót giày êm chân (insole)</b> — mang từ VN vì loại tốt ở VN khá rẻ." },
      { i: "💊", text: "<b>Thuốc đau lưng, đau gối</b> — housekeeping gập người nhiều, hay bị đau lưng. Salonpas rất hữu ích." },
      { i: "🧴", text: "<b>Kem dưỡng da, son dưỡng môi</b> — phòng khách sạn máy lạnh/sưởi làm khô da." },
      { i: "💐", text: "<b>Nước hoa xịt nhẹ</b> — làm việc với chăn gối, mùi người khác suốt ngày. Mang loại nhẹ từ VN." },
    ],
    personal: [
      { i: "🎧", text: "<b>Tai nghe bluetooth nhỏ</b> — nhiều resort cho phép nghe nhạc khi dọn phòng, giúp tập trung." },
      { i: "🍱", text: "<b>Hộp cơm</b> — resort thường có căng tin nhân viên, nhưng tự mang cơm tiết kiệm hơn." },
      { i: "🩹", text: "<b>Band-aid, Neosporin</b> — vết xước khi dọn dẹp rất thường gặp." },
      { i: "👔", text: "<b>Quần áo mặc đi làm phụ (plain dark colors)</b> — mang 2–3 bộ từ VN để mặc trước khi mua đồng phục." },
    ],
    note: "Resort lớn như Wilderness Hotel phát đồng phục. Tìm hiểu trước về dress code. Tip (tiền boa) từ khách là thu nhập thêm đáng kể tại resort.",
  },
  transport: {
    label: "🚌 Vận Tải — Lái Xe & Hỗ Trợ",
    buy: [
      { i: "🥾", text: "<b>Giày/boots chống trơn</b> — leo lên xuống xe liên tục, cần đế bám chắc." },
      { i: "🦺", text: "<b>Áo phản quang hi-vis</b> — bắt buộc khi làm việc gần đường. Hãng thường phát." },
      { i: "🧤", text: "<b>Găng tay vải mỏng</b> — cầm nắm hành lý, dụng cụ." },
    ],
    vn: [
      { i: "🕶️", text: "<b>Kính râm chất lượng</b> — lái xe ban ngày, ánh sáng Mỹ mạnh hơn VN. Mang kính tốt từ VN." },
      { i: "🧴", text: "<b>Kem chống nắng SPF50+</b> — Việt Nam có loại tốt rẻ hơn ở Mỹ." },
      { i: "💊", text: "<b>Thuốc đau lưng, đệm lưng xe</b> — ngồi lái lâu dễ đau thắt lưng. Mang đệm tựa lưng từ VN." },
      { i: "☕", text: "<b>Cà phê hòa tan VN (G7, Highlands)</b> — lái xe ca đêm cần tỉnh táo, cà phê VN dễ uống hơn cà phê Mỹ." },
    ],
    personal: [
      { i: "📱", text: "<b>Giá đỡ điện thoại trên xe</b> — dùng Google Maps, cần giá đỡ tốt ngay từ đầu." },
      { i: "🔋", text: "<b>Power bank lớn (20,000mAh)</b> — ca dài, điện thoại cần sạc liên tục. Mang từ VN rẻ hơn." },
      { i: "🍱", text: "<b>Hộp giữ nhiệt + bình nước</b> — ca lái xe khó ghé cửa hàng, cần mang đồ ăn theo." },
      { i: "😴", text: "<b>Gối cổ du lịch (neck pillow)</b> — nghỉ giữa ca trong xe." },
    ],
    note: "Bằng lái Mỹ (CDL nếu cần) sẽ được hỗ trợ sau khi đến nơi. Trước mắt tập trung vào bằng lái xe thường (regular license) tại tiểu bang làm việc.",
  },
  food: {
    label: "🍔 Dịch Vụ Ăn Uống — Nhà Hàng & Fastfood",
    buy: [
      { i: "👟", text: "<b>Giày non-slip chuyên dụng</b> — bếp luôn trơn, ngã rất nguy hiểm. Mua Skechers Work hoặc Shoes For Crews ~$40–60." },
      { i: "🧤", text: "<b>Găng tay thực phẩm</b> — hãng thường cấp nhưng cần biết size và loại." },
      { i: "🔖", text: "<b>Tạp dề chống nước (waterproof apron)</b> — hãng phát nhưng nên có cái riêng gọn hơn." },
    ],
    vn: [
      { i: "💊", text: "<b>Thuốc đau chân, kem dưỡng gót</b> — đứng trên sàn cứng 8h liên tục gây đau gót chân." },
      { i: "🧴", text: "<b>Kem dưỡng tay không mùi</b> — rửa tay liên tục làm khô tay, dùng kem không mùi để không ảnh hưởng thực phẩm." },
      { i: "🍜", text: "<b>Gia vị VN nhỏ gọn</b> — bữa ăn nhân viên thường có, nhưng không hợp khẩu vị." },
    ],
    personal: [
      { i: "🎧", text: "<b>Tai nghe nhỏ (1 bên)</b> — một số nhà hàng cho phép nghe nhạc khi chuẩn bị đồ." },
      { i: "🩹", text: "<b>Băng ngón tay, band-aid</b> — vết cắt tay khi làm bếp rất thường gặp." },
      { i: "💆", text: "<b>Lăn khử mùi/deodorant</b> — làm việc bếp nóng, quan trọng với nghề này." },
    ],
    note: "Fastfood như Subway: tiếng Anh giao tiếp là lợi thế lớn. Luyện 30–50 câu giao tiếp cơ bản trước khi sang.",
  },
  care: {
    label: "🏥 Chăm Sóc — Healthcare & Senior Care",
    buy: [
      { i: "👟", text: "<b>Giày nursing non-slip trắng hoặc đen</b> — bắt buộc tại các cơ sở chăm sóc. Dansko, Crocs Pro ~$50–80." },
      { i: "🧤", text: "<b>Latex/nitrile gloves hộp lớn</b> — dùng rất nhiều, mua ở Costco tiết kiệm hơn." },
      { i: "🩺", text: "<b>Đồng hồ có kim giây (watch with second hand)</b> — đo nhịp tim, nhịp thở bệnh nhân." },
    ],
    vn: [
      { i: "🧴", text: "<b>Kem dưỡng tay intensive</b> — rửa tay và dùng sanitizer liên tục làm khô tay rất nhanh." },
      { i: "💊", text: "<b>Vitamin D, B12</b> — làm việc trong nhà suốt ngày, dễ thiếu vitamin D." },
      { i: "😷", text: "<b>Khẩu trang N95 dự phòng</b> — hàng VN/TQ giá rẻ hơn Mỹ. Mang 1–2 hộp." },
      { i: "💊", text: "<b>Dầu gió xanh Trường Sơn hoặc dầu cù là</b> — khi đau đầu, mệt mỏi giữa ca dài. Khó tìm ở Mỹ." },
    ],
    personal: [
      { i: "🍱", text: "<b>Hộp cơm giữ nhiệt tốt</b> — ca 8–12h trong môi trường y tế, nghỉ giải lao ngắn." },
      { i: "📖", text: "<b>Sách/app học tiếng Anh y tế</b> — mang theo để học trong giờ nghỉ. Từ vựng y tế rất chuyên biệt." },
      { i: "🪥", text: "<b>Bộ vệ sinh cá nhân nhỏ gọn</b> — brush teeth, mouthwash sau giờ ăn, quan trọng khi làm gần bệnh nhân." },
      { i: "🧘", text: "<b>Kỹ năng self-care</b> — chăm sóc người khác mệt mỏi về tâm lý. Chuẩn bị tinh thần và có thói quen xả stress." },
    ],
    note: "Nhiều cơ sở yêu cầu chứng chỉ CNA (Certified Nursing Assistant). Hỏi rõ employer về yêu cầu chứng chỉ trước khi sang.",
  },
  other: {
    label: "📦 Ngành Khác — Công Việc Phổ Thông",
    buy: [
      { i: "🥾", text: "<b>Steel-toed boots hoặc giày non-slip</b> — tùy ngành cụ thể. Hỏi employer trước." },
      { i: "🧤", text: "<b>Work gloves đa dụng</b> — găng tay vải/da mỏng đa năng, luôn cần có." },
    ],
    vn: [
      { i: "💊", text: "<b>Dầu gió, thuốc cảm, thuốc đau dạ dày</b> — những thuốc thông thường này rẻ và dễ mua ở VN hơn." },
      { i: "🍜", text: "<b>Đồ ăn khô: mì gói, cháo ăn liền, bánh tráng</b> — tiết kiệm chi phí ăn uống tháng đầu." },
      { i: "🧦", text: "<b>Tất, đồ lót, quần áo thường ngày</b> — hàng VN chất lượng tương đương, giá rẻ hơn 2–3 lần." },
      { i: "🧴", text: "<b>Kem đánh răng, dầu gội, sữa tắm yêu thích</b> — loại quen dùng, mang theo đủ dùng 1–2 tháng." },
    ],
    personal: [
      { i: "📱", text: "<b>Power bank lớn</b> — những ngày đầu di chuyển nhiều, cần sạc điện thoại thường xuyên." },
      { i: "🔦", text: "<b>Đèn pin nhỏ/headlamp</b> — nếu làm ca đêm hoặc sáng sớm." },
      { i: "🍱", text: "<b>Hộp cơm + bình nước</b> — mang cơm nhà đi làm tiết kiệm ~$200–300/tháng so với ăn ngoài." },
    ],
    note: "Hỏi agency và đồng nghiệp người Việt đã làm trước về những vật dụng cụ thể nhất cho công việc của bạn.",
  },
};

export const JOBS: JobEntry[] = [
  { n: "Hãng Cá (Alabama)", co: "Công ty chế biến cá", city: "Eutaw", state: "AL", cat: "fish",
    desc: "Chế biến cá nước ngọt: làm sạch, phi lê, đóng gói trong môi trường làm lạnh. Làm việc theo dây chuyền.",
    bullets: ["Ca 8–10 giờ, làm việc trong kho lạnh ~40°F", "Mặc đồ bảo hộ, ủng cao su, tạp dề", "Không yêu cầu kinh nghiệm, được đào tạo tại chỗ"] },
  { n: "Hãng Bò (Georgia)", co: "Công ty chế biến thịt bò", city: "Thomasville", state: "GA", cat: "mfg",
    desc: "Giết mổ và chế biến thịt bò theo dây chuyền sản xuất công nghiệp.",
    bullets: ["Công việc nặng nhọc, đứng suốt ca", "Kho lạnh, yêu cầu sức khỏe tốt", "Thường có overtime, lương theo giờ ~$14–17"] },
  { n: "Hãng Nhà Kho", co: "Warehouse/Distribution Center", city: "Nhiều tiểu bang", state: "MULTI", cat: "mfg",
    desc: "Bốc xếp, sắp xếp, đóng gói hàng hóa trong kho phân phối. Có thể dùng xe nâng (forklift).",
    bullets: ["Nhiều vị trí: kho hàng, đóng gói, kiểm hàng", "Lương $14–18/giờ, nhiều OT", "Hỏi agency về bang cụ thể trước khi ký"] },
  { n: "Hãng Nhôm (Tifton)", co: "Aluminum manufacturing", city: "Tifton", state: "GA", cat: "mfg",
    desc: "Sản xuất và chế biến nhôm, lắp ráp các bộ phận nhôm cho công nghiệp xây dựng.",
    bullets: ["Môi trường ồn ào, cần bảo hộ tai và mắt", "Lương $14–18/giờ", "Tifton – thành phố nhỏ miền Nam Georgia"] },
  { n: "Hãng Xi Mạ (Covington)", co: "Metal plating company", city: "Covington", state: "GA", cat: "mfg",
    desc: "Mạ điện (electroplating) kim loại: nhúng, làm sạch, hoàn thiện bề mặt kim loại. Tiếp xúc hóa chất.",
    bullets: ["Cần thiết bị bảo hộ chống hóa chất", "Đào tạo an toàn trước khi làm", "Covington cách Atlanta ~45 phút lái xe"] },
  { n: "Phụ Tùng Nông Nghiệp (Covington)", co: "Agricultural parts manufacturing", city: "Covington", state: "GA", cat: "mfg",
    desc: "Sản xuất và lắp ráp phụ tùng, linh kiện máy móc nông nghiệp theo dây chuyền.",
    bullets: ["Lắp ráp, kiểm tra chất lượng linh kiện", "Môi trường nhà xưởng, máy móc", "Lương $14–17/giờ"] },
  { n: "Stoughton Trailer (Wisconsin)", co: "Stoughton Trailer", city: "Stoughton", state: "WI", cat: "mfg",
    desc: "Sản xuất thân xe sơmi rơmoóc (semi-trailers) cho vận tải đường bộ. Công ty lớn, lâu đời tại Wisconsin.",
    bullets: ["Hàn, lắp ráp, sơn – nhiều vị trí khác nhau", "Lương $16–20/giờ, có benefits", "Stoughton cách Madison WI ~20 phút"] },
  { n: "Wayne Farms (Pendergrass, GA)", co: "Wayne-Sanderson Farms", city: "Pendergrass", state: "GA", cat: "poultry",
    desc: "Một trong những công ty gia cầm lớn nhất Mỹ. Chế biến thịt gà: mổ, cắt, đóng gói theo dây chuyền tốc độ cao.",
    bullets: ["Môi trường lạnh (~35-40°F), ướt, ồn ào", "Dây chuyền tốc độ cao, đứng nhiều giờ", "Pendergrass cách Atlanta ~60 phút"] },
  { n: "Hãng Hạt Óc Chó Pecan (Valdosta)", co: "Pecan processing facility", city: "Valdosta", state: "GA", cat: "mfg",
    desc: "Phân loại, làm sạch, đóng gói hạt pecan (óc chó Mỹ). Công việc theo mùa thu hoạch.",
    bullets: ["Nhẹ nhàng hơn so với chế biến thịt", "Môi trường khô, ít nguy hiểm", "Valdosta gần biên giới Florida, khí hậu ấm"] },
  { n: "Koch Foods (Pine Mountain Valley, GA)", co: "Koch Foods", city: "Pine Mountain Valley", state: "GA", cat: "poultry",
    desc: "Nhà máy chế biến gà lớn của Koch Foods tại Georgia. Cắt, phi lê, đóng gói gia cầm.",
    bullets: ["Môi trường lạnh, ẩm ướt", "Tốc độ dây chuyền nhanh, cần sức bền", "Pine Mountain Valley – vùng nông thôn yên tĩnh, GA"] },
  { n: "Defender Service (North Carolina)", co: "Defender Service / Packaging", city: "North Carolina", state: "NC", cat: "other",
    desc: "Công ty đóng gói hàng hóa, vận hành theo hợp đồng với các nhà sản xuất.",
    bullets: ["Đóng gói, dán nhãn, kiểm hàng", "Lương $13–16/giờ", "NC có nhiều nhà máy chế biến thực phẩm"] },
  { n: "Rassy Logistics (Florida)", co: "Rassy Logistics", city: "Florida", state: "FL", cat: "other",
    desc: "Công ty logistics, vận chuyển và phân phối hàng hóa. Nhiều vị trí: kho, lái xe phụ, đóng gói.",
    bullets: ["Công việc kho hoặc hỗ trợ vận chuyển", "Lương $14–18/giờ", "Florida không có thuế thu nhập tiểu bang"] },
  { n: "Wilderness Hotel & Resort (Wisconsin)", co: "Wilderness Hotel & Resort", city: "Wisconsin Dells", state: "WI", cat: "hotel",
    desc: "Resort/khách sạn nước lớn nhất Mỹ tại Wisconsin Dells. Công việc dọn phòng, hỗ trợ resort.",
    bullets: ["Housekeeping, laundry, food service", "Sống gần resort, có thể đi bộ đi làm", "Wisconsin Dells là thủ phủ resort nước Mỹ"] },
  { n: "Subway (Wisconsin)", co: "Subway Franchise", city: "Wisconsin", state: "WI", cat: "food",
    desc: "Làm bánh mì sandwich tại chuỗi Subway. Chuẩn bị nguyên liệu, phục vụ khách, vệ sinh.",
    bullets: ["Tiếp xúc khách hàng nhiều, cần tiếng Anh cơ bản", "Lương $13–16/giờ + tips", "Môi trường sạch sẽ, bước đầu học giao tiếp tốt"] },
  { n: "Koch Foods (Gadsden, Alabama)", co: "Koch Foods", city: "Gadsden", state: "AL", cat: "poultry",
    desc: "Nhà máy chế biến gà của Koch Foods tại Alabama. Dây chuyền công nghiệp quy mô lớn.",
    bullets: ["Môi trường lạnh ẩm, đứng ca dài", "Gadsden cách Birmingham 1 tiếng", "Chi phí sinh hoạt Alabama thấp nhất cả nước"] },
  { n: "Wayne Farms (Dobson, NC)", co: "Wayne-Sanderson Farms", city: "Dobson", state: "NC", cat: "poultry",
    desc: "Nhà máy chế biến gà tại vùng Piedmont, North Carolina. Cắt, đóng gói gia cầm.",
    bullets: ["Dây chuyền sản xuất 24/7, nhiều ca", "Dobson – thị trấn nhỏ, cuộc sống bình yên", "NC có 4 mùa rõ rệt, mùa đông vừa phải"] },
  { n: "Hãng Cá (Mississippi)", co: "Catfish processing facility", city: "Mississippi", state: "MS", cat: "fish",
    desc: "Chế biến cá da trơn (catfish) nổi tiếng của Mississippi. Phi lê, làm sạch, đóng gói.",
    bullets: ["Mississippi là thủ phủ catfish Mỹ", "Chi phí sinh hoạt thấp nhất cả nước", "Ít cộng đồng người Việt"] },
  { n: "Hãng Xe Bus (Nhiều tiểu bang)", co: "Bus company / Transportation", city: "Nhiều tiểu bang", state: "MULTI", cat: "transport",
    desc: "Lái xe bus nội đô, xe bus trường học, hoặc xe bus liên tỉnh. Cần bằng lái CDL tại Mỹ.",
    bullets: ["Cần học và thi bằng CDL sau khi sang Mỹ", "Lương $16–22/giờ – khá tốt", "Hỏi agency về bang cụ thể và loại xe bus"] },
  { n: "CASE FARMS PROCESSING (North Carolina)", co: "Case Farms Processing Inc.", city: "North Carolina", state: "NC", cat: "poultry",
    desc: "Công ty chế biến gà lớn, nhiều nhà máy tại NC và OH. Nổi tiếng tuyển lao động nhập cư.",
    bullets: ["Nhà máy chạy 24/7, nhiều ca", "Lương $14–17/giờ, có OT", "Cần sức bền – công việc liên tục đứng và cắt"] },
  { n: "Subway (Indiana)", co: "Subway Franchise", city: "Indiana", state: "IN", cat: "food",
    desc: "Chuỗi sandwich Subway tại Indiana. Chuẩn bị thức ăn, phục vụ khách, vệ sinh.",
    bullets: ["Tiếng Anh cơ bản cần thiết", "Lương $13–15/giờ", "Indiana có Labor Guys – cộng đồng EB3 Việt đáng kể"] },
  { n: "Labor Guys – Indianapolis, IN", co: "Labor Guys LLC", city: "Indianapolis", state: "IN", cat: "mfg",
    desc: "Công ty nhân lực (staffing) cung cấp lao động cho nhiều nhà máy sản xuất tại Indianapolis và vùng lân cận.",
    bullets: ["Vị trí: Helper – Production Worker", "Lắp ráp, đóng gói, hỗ trợ sản xuất", "Indianapolis là nơi nhiều gia đình Việt EB3 đã định cư thành công"] },
  { n: "Badger Bus Lines (Wisconsin)", co: "Badger Bus Lines", city: "Wisconsin", state: "WI", cat: "transport",
    desc: "Công ty xe bus liên tỉnh tại Wisconsin. Tài xế, phụ xe, hoặc vệ sinh xe bus.",
    bullets: ["Cần CDL cho vị trí lái xe", "Vệ sinh và bảo trì xe không cần CDL", "Wisconsin dells – khu du lịch quanh năm"] },
  { n: "Peco Foods (Arkansas)", co: "Peco Foods", city: "Arkansas", state: "AR", cat: "poultry",
    desc: "Tập đoàn chế biến gà Peco Foods có nhiều nhà máy tại Arkansas và Alabama.",
    bullets: ["Dây chuyền chế biến gà công nghiệp", "Lương $14–17/giờ", "Arkansas – chi phí sinh hoạt rất thấp"] },
  { n: "Labor Guys – Allentown, PA", co: "Labor Guys LLC", city: "Allentown", state: "PA", cat: "mfg",
    desc: "Vị trí Helper – Production Worker tại Allentown, Pennsylvania. Làm việc tại các nhà máy sản xuất địa phương.",
    bullets: ["Đóng gói, lắp ráp, hỗ trợ sản xuất", "Allentown – thành phố công nghiệp, cách NYC ~90 phút", "Cộng đồng Hispanic lớn tại Allentown"] },
  { n: "Farbest Foods (Huntingburg, IN)", co: "Farbest Foods", city: "Huntingburg", state: "IN", cat: "poultry",
    desc: "Công ty chế biến gà tây (turkey) và gà hàng đầu của Indiana. Huntingburg là thị trấn nhỏ yên tĩnh.",
    bullets: ["Chế biến gà tây – khác với gà thường", "Huntingburg cách Evansville IN ~30 phút", "Cộng đồng Việt nhỏ tại Indiana, gần Indianapolis"] },
  { n: "Harrison Poultry (Bethlehem, GA)", co: "Harrison Poultry", city: "Bethlehem", state: "GA", cat: "poultry",
    desc: "Công ty chế biến gia cầm gia đình (family-owned) tại Georgia. Nhà máy quy mô vừa, chuyên trứng gà và gà con.",
    bullets: ["Quy mô nhỏ hơn Koch/Wayne – ít ồn ào hơn", "Bethlehem gần Atlanta (~60 phút)", "Georgia có nhiều ưu đãi thuế cho doanh nghiệp"] },
  { n: "Ocean Air (Florida)", co: "Ocean Air LLC", city: "Florida", state: "FL", cat: "other",
    desc: "Công ty dịch vụ không khí/môi trường hoặc logistics tại Florida. Vị trí hỗ trợ sản xuất và kho bãi.",
    bullets: ["Florida không có thuế thu nhập tiểu bang", "Cộng đồng Việt lớn tại Orlando, Jacksonville", "Khí hậu nóng ẩm – khác với miền Bắc và Trung"] },
  { n: "Labor Guys – Arizona", co: "Labor Guys LLC", city: "Arizona", state: "AZ", cat: "mfg",
    desc: "Vị trí Helper – Production Worker tại Arizona. Làm việc trong các nhà máy sản xuất thuộc vùng Phoenix.",
    bullets: ["Nóng cực đoan mùa hè (100-110°F)", "Arizona không có thuế thực phẩm tiểu bang", "Cộng đồng Việt nhỏ tại Phoenix (~15.000 người)"] },
  { n: "Case Farms (Ohio)", co: "Case Farms Processing Inc.", city: "Ohio", state: "OH", cat: "poultry",
    desc: "Nhà máy chế biến gà Case Farms tại Ohio. Tương tự nhà máy NC – dây chuyền gà công nghiệp quy mô lớn.",
    bullets: ["Ohio có 4 mùa rõ rệt, mùa đông lạnh", "Columbus – có cộng đồng Việt phát triển", "Lương $14–17/giờ"] },
  { n: "Hãng Cá Catfish (Louisiana)", co: "Catfish processing, Louisiana", city: "Louisiana", state: "LA", cat: "fish",
    desc: "Chế biến cá da trơn (catfish) tại vùng đầm lầy Louisiana. Louisiana và Mississippi là hai tiểu bang catfish lớn nhất.",
    bullets: ["Phi lê, làm sạch, đóng gói catfish", "Môi trường ướt, lạnh", "Louisiana có cộng đồng Việt lâu đời (New Orleans)"] },
  { n: "Chula Vista Resort (Wisconsin)", co: "Chula Vista Resort", city: "Wisconsin Dells", state: "WI", cat: "hotel",
    desc: "Resort giải trí lớn tại Wisconsin Dells. Nhiều vị trí: housekeeping, bếp, dọn dẹp, hỗ trợ.",
    bullets: ["Mùa cao điểm: hè, đông – resort đông khách", "Cần tiếng Anh giao tiếp cơ bản", "Sống cùng khu với Wilderness Resort"] },
  { n: "Dakota Provision (South Dakota)", co: "Dakota Provision", city: "Huron", state: "SD", cat: "mfg",
    desc: "Nhà máy chế biến thịt bò, lợn và gà tây tại South Dakota. Cộng đồng đa sắc tộc làm việc tại đây.",
    bullets: ["Mùa đông khắc nghiệt – cần quần áo ấm kỹ", "Không có thuế thu nhập tại SD", "Chi phí sinh hoạt thấp"] },
  { n: "RGA Enterprise (North Carolina)", co: "RGA Enterprise", city: "North Carolina", state: "NC", cat: "mfg",
    desc: "Nhà máy đóng nắp chai, hộp đựng thực phẩm. Công việc dây chuyền: đóng gói, kiểm tra chất lượng.",
    bullets: ["Môi trường sạch, ít nguy hiểm hơn chế biến thịt", "Lương $13–16/giờ", "NC – 4 mùa, chi phí sinh hoạt vừa phải"] },
  { n: "Carl's Jr (Nhiều tiểu bang)", co: "Carl's Jr / Hardee's", city: "Nhiều tiểu bang", state: "MULTI", cat: "food",
    desc: "Chuỗi thức ăn nhanh lớn. Công việc: chuẩn bị thức ăn, thu ngân, dọn dẹp.",
    bullets: ["Tiếp xúc khách hàng – cần tiếng Anh cơ bản", "Lương $13–16/giờ + tips", "Hỏi agency về tiểu bang cụ thể"] },
  { n: "Abbyland Foods (Wisconsin)", co: "Abbyland Foods", city: "Abbotsford", state: "WI", cat: "mfg",
    desc: "Nhà máy chế biến thịt heo, xúc xích tại Abbotsford, Wisconsin. Công ty lớn, đã hoạt động hàng chục năm.",
    bullets: ["Chế biến thịt heo, xúc xích, đóng gói", "Lương $15–19/giờ, có benefits", "Abbotsford – thị trấn nhỏ, yên tĩnh, cộng đồng chặt chẽ"] },
  { n: "Labor Guys – Reno, NV", co: "Labor Guys / Sentech Services", city: "Reno", state: "NV", cat: "mfg",
    desc: "Vị trí Helper – Production Worker tại Reno, Nevada. Nhà máy sản xuất vùng Great Basin.",
    bullets: ["Nevada không có thuế thu nhập tiểu bang", "Reno – mùa đông có tuyết, mùa hè nóng khô", "Cộng đồng Việt nhỏ"] },
  { n: "Runnells Center (Savannah & Georgia)", co: "Runnells Center for Rehabilitation", city: "Savannah", state: "GA", cat: "care",
    desc: "Trung tâm phục hồi chức năng. Vị trí hỗ trợ chăm sóc người bệnh: hộ lý, dọn phòng bệnh nhân, phụ bếp.",
    bullets: ["Môi trường y tế – cần vệ sinh và cẩn thận", "Lương $13–17/giờ", "Savannah – thành phố lịch sử đẹp, ven biển"] },
  { n: "Nhà Hàng (Greenville, SC)", co: "Restaurant (Greenville area)", city: "Greenville", state: "SC", cat: "food",
    desc: "Công việc nhà hàng: phụ bếp, dọn bàn, rửa bát tại các nhà hàng khu vực Greenville.",
    bullets: ["Greenville – thành phố phát triển nhanh của SC", "Nhà hàng Á châu hoặc Mỹ", "Cần tiếng Anh giao tiếp cơ bản"] },
  { n: "McDonald's (Nhiều tiểu bang)", co: "McDonald's Franchise", city: "Nhiều tiểu bang", state: "MULTI", cat: "food",
    desc: "Chuỗi thức ăn nhanh lớn nhất thế giới. Công việc: nấu nướng, thu ngân, dọn dẹp, hỗ trợ bếp.",
    bullets: ["Môi trường sạch, an toàn, đào tạo tốt", "Lương $13–17/giờ tùy bang", "Cần tiếng Anh giao tiếp"] },
  { n: "Baldwin Filters (South Dakota)", co: "Baldwin Filters / Parker Hannifin", city: "South Dakota", state: "SD", cat: "mfg",
    desc: "Sản xuất bộ lọc (filters) công nghiệp cho xe hơi, máy móc. Nhà máy sản xuất chính xác cao.",
    bullets: ["Môi trường sạch, ít nguy hiểm hơn chế biến thịt", "Không thuế thu nhập SD", "Mùa đông SD rất lạnh – chuẩn bị quần áo kỹ"] },
  { n: "Fast Food Hardee's (Nhiều tiểu bang)", co: "Hardee's / CKE Restaurants", city: "Nhiều tiểu bang", state: "MULTI", cat: "food",
    desc: "Chuỗi thức ăn nhanh Hardee's (phía Đông Mỹ) / Carl's Jr (phía Tây). Chuẩn bị thức ăn và phục vụ khách.",
    bullets: ["Phổ biến ở miền Nam và Trung Mỹ", "Lương $13–16/giờ", "Cần tiếng Anh cơ bản"] },
  { n: "Karst Stage (Montana)", co: "Karst Stage", city: "Montana", state: "MT", cat: "transport",
    desc: "Công ty vận chuyển du lịch tại Montana. Vệ sinh xe, hỗ trợ tài xế, phục vụ khách du lịch thăm Yellowstone.",
    bullets: ["Montana – thiên nhiên đẹp, không khí trong lành", "Ít cộng đồng Việt", "Mùa đông rất lạnh – cần chuẩn bị kỹ"] },
  { n: "SnD Manufacturing (Texas)", co: "SnD Manufacturing Ltd.", city: "Texas", state: "TX", cat: "mfg",
    desc: "Công ty sản xuất công nghiệp tại Texas. Vị trí hỗ trợ sản xuất, đóng gói và kiểm tra chất lượng.",
    bullets: ["Texas không có thuế thu nhập tiểu bang", "Cộng đồng Việt lớn (Houston, Dallas)", "Nóng cực đoan mùa hè tại Texas"] },
  { n: "Hyundai/Eblabell (Georgia)", co: "Eblabell Hyundai", city: "Georgia", state: "GA", cat: "mfg",
    desc: "Nhà máy liên quan đến sản xuất xe Hyundai tại Georgia. Vị trí hỗ trợ sản xuất, lắp ráp.",
    bullets: ["Hyundai đã mở nhà máy lớn tại Bryan County, GA", "Công nghiệp ô tô đang bùng nổ tại GA", "Lương $15–19/giờ, có benefits tốt"] },
  { n: "FAENA Hotel (Miami, Florida)", co: "FAENA Miami Beach", city: "Miami Beach", state: "FL", cat: "hotel",
    desc: "Khách sạn luxury 5 sao tại Miami Beach. Vị trí housekeeping, laundry, hỗ trợ bộ phận phòng.",
    bullets: ["Miami Beach – đắt đỏ, nhưng không thuế thu nhập FL", "Môi trường sang trọng, đồng phục đẹp", "Cộng đồng Việt Florida khá lớn"] },
  { n: "1st Senior Cares LLC (Personal Care Aide)", co: "1st Senior Cares LLC", city: "Nhiều tiểu bang", state: "MULTI", cat: "care",
    desc: "Chăm sóc người cao tuổi tại nhà hoặc cơ sở. Hỗ trợ sinh hoạt hàng ngày: ăn uống, vệ sinh, đi lại.",
    bullets: ["Cần kiên nhẫn, chăm chỉ, tâm lý tốt", "Lương $14–18/giờ", "Nhu cầu rất cao – dân số Mỹ già hóa nhanh"] },
  { n: "La Cosecha Food Services (Georgia)", co: "La Cosecha Food Services", city: "Georgia", state: "GA", cat: "food",
    desc: "Công ty dịch vụ thực phẩm (food service). Nấu ăn, phục vụ suất ăn cho trường học, bệnh viện hoặc nhà máy.",
    bullets: ["Môi trường bếp công nghiệp", "Lương $13–16/giờ", "Georgia – nhiều cơ hội EB3 nhất cả nước"] },
  { n: "TPI Hospitality (Minnesota)", co: "TPI Hospitality", city: "Minnesota", state: "MN", cat: "hotel",
    desc: "Chuỗi khách sạn TPI Hospitality có nhiều property tại Minnesota và vùng Trung Tây. Housekeeping, laundry.",
    bullets: ["Minnesota – mùa đông rất lạnh (-20°F)", "Minneapolis có cộng đồng Việt ~20.000 người", "Lương $14–17/giờ"] },
  { n: "Rock N Roll Sushi (Georgia)", co: "Rock N Roll Sushi", city: "Georgia", state: "GA", cat: "food",
    desc: "Chuỗi nhà hàng sushi fusion Mỹ hóa. Vị trí bếp, phục vụ, dọn dẹp.",
    bullets: ["Môi trường nhà hàng thức ăn nhanh", "Cần tiếng Anh giao tiếp cơ bản", "Georgia có nhiều chi nhánh chuỗi này"] },
  { n: "Zaxby's (Spartanburg, SC)", co: "Zaxby's LLC", city: "Spartanburg", state: "SC", cat: "food",
    desc: "Chuỗi nhà hàng gà rán nổi tiếng miền Nam Mỹ. Rán gà, chuẩn bị salad, phục vụ khách.",
    bullets: ["Spartanburg – thành phố công nghiệp SC", "SC có nhiều hãng EB3", "Lương $13–16/giờ"] },
  { n: "Janitor – SEJ Service (South Carolina)", co: "SEJ Services", city: "South Carolina", state: "SC", cat: "other",
    desc: "Dịch vụ vệ sinh tòa nhà, văn phòng, nhà máy tại South Carolina. Vị trí janitor/cleaner.",
    bullets: ["Ca đêm hoặc sáng sớm", "Không cần tiếng Anh nhiều", "Lương $12–15/giờ"] },
  { n: "Hãng Gỗ Battle Lumber (Georgia)", co: "Battle Lumber Company", city: "Georgia", state: "GA", cat: "mfg",
    desc: "Nhà máy cưa và chế biến gỗ tại Georgia. Vận hành máy cưa, phân loại gỗ, đóng gói.",
    bullets: ["Môi trường ồn ào, bụi gỗ – cần khẩu trang", "Lương $14–17/giờ", "Ngành gỗ Georgia – cung cấp cho xây dựng toàn Mỹ"] },
  { n: "Sentech Services (Dallas, Texas)", co: "Sentech Services", city: "Dallas", state: "TX", cat: "mfg",
    desc: "Công ty nhân lực sản xuất, cung cấp lao động cho các nhà máy tại Dallas và vùng lân cận.",
    bullets: ["Helper – Production Worker: đóng gói, lắp ráp", "Texas không có thuế thu nhập", "Cộng đồng Việt Dallas ~40.000 người"] },
  { n: "Nhân Viên Vệ Sinh — Austin, TX", co: "Janitorial / Cleaning Services", city: "Austin", state: "TX", cat: "other",
    desc: "Vệ sinh tòa nhà văn phòng, trung tâm thương mại, trường học và cơ sở công nghiệp tại Austin. Thường làm ca đêm hoặc sáng sớm trước giờ làm việc.",
    bullets: ["Ca đêm hoặc sáng sớm (thường 10pm–6am hoặc 5am–1pm)", "Không cần tiếng Anh nhiều – làm việc độc lập hoặc theo nhóm nhỏ", "Austin – thành phố công nghệ phát triển nhanh, lương $14–18/giờ"] },
  { n: "Nature's Way Farm (Miami, FL)", co: "Nature's Way Farm", city: "Miami", state: "FL", cat: "other",
    desc: "Nông trại và công ty thực phẩm tại Miami. Vị trí hỗ trợ nông trại, đóng gói nông sản, vận chuyển.",
    bullets: ["Miami – đắt đỏ nhưng không thuế thu nhập FL", "Cộng đồng Việt Miami đáng kể", "Công việc ngoài trời – nóng"] },
  { n: "Claxton Poultry (Claxton, Georgia)", co: "Claxton Poultry Farms", city: "Claxton", state: "GA", cat: "poultry",
    desc: "Một trong những nhà máy chế biến gà lớn và lâu đời nhất Georgia, hoạt động từ 1947. Claxton nổi tiếng với gà và bánh mì nướng (fruitcake).",
    bullets: ["Dây chuyền chế biến gà quy mô lớn", "Claxton – Evans County, miền Nam Georgia", "Cộng đồng Việt tại Savannah ~45 phút"] },
];
