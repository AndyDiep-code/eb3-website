/**
 * Per-state comparison data ported from compare.html's inline `STATES`
 * object (legacy lines 214-231). The legacy `GA2` placeholder entry was
 * excluded from `KEYS` via a filter and never rendered — omitted here.
 */
export interface CompareStateScores {
  tax: number;
  cost: number;
  wage: number;
  viet: number;
  climate: number;
  eb3: number;
}

export interface CompareStateData {
  name: string;
  flag: string;
  tax: number;
  rent1: string;
  rent2: string;
  food1: number;
  food2: number;
  wage: number;
  climate: string;
  viet: string;
  eb3: string;
  scores: CompareStateScores;
}

export const COMPARE_STATES: Record<string, CompareStateData> = {
  GA: { name: "Georgia", flag: "🍑", tax: 5.39, rent1: "$750–950", rent2: "$900–1,200", food1: 400, food2: 650, wage: 15.5, climate: "Nóng ẩm (90°F+ hè), mùa đông nhẹ", viet: "Đáng kể (Atlanta ~30K)", eb3: "Nhiều nhất: Wayne Farms, Koch Foods, Claxton Poultry, Labor Guys", scores: { tax: 60, cost: 70, wage: 70, viet: 80, climate: 55, eb3: 100 } },
  IN: { name: "Indiana", flag: "🏎️", tax: 3.05, rent1: "$750–950", rent2: "$900–1,100", food1: 380, food2: 580, wage: 15, climate: "4 mùa rõ rệt, mùa đông lạnh (-0°F)", viet: "Vừa (Indianapolis ~8K)", eb3: "Labor Guys LLC, Farbest Foods, Subway", scores: { tax: 80, cost: 75, wage: 65, viet: 50, climate: 50, eb3: 70 } },
  TX: { name: "Texas", flag: "⭐", tax: 0, rent1: "$1,000–1,300", rent2: "$1,200–1,600", food1: 400, food2: 650, wage: 15.5, climate: "Nóng khô (100°F+ Dallas), mùa đông ôn hòa", viet: "Lớn (Houston 100K+, Dallas 40K)", eb3: "SnD Manufacturing, Sentech Services, Labor Guys AZ", scores: { tax: 100, cost: 50, wage: 70, viet: 100, climate: 60, eb3: 65 } },
  FL: { name: "Florida", flag: "🌴", tax: 0, rent1: "$1,100–1,500", rent2: "$1,300–1,800", food1: 430, food2: 680, wage: 15, climate: "Nóng ẩm quanh năm, bão theo mùa", viet: "Lớn (Orlando, Jacksonville, Miami)", eb3: "FAENA, Rassy Logistics, Ocean Air", scores: { tax: 100, cost: 45, wage: 65, viet: 85, climate: 55, eb3: 55 } },
  WI: { name: "Wisconsin", flag: "🧀", tax: 3.5, rent1: "$800–1,050", rent2: "$950–1,200", food1: 400, food2: 620, wage: 15, climate: "Mùa đông rất lạnh (-10°F), hè mát", viet: "Vừa (Milwaukee ~10K)", eb3: "Wilderness Hotel, Stoughton Trailer, Abbyland Foods", scores: { tax: 75, cost: 70, wage: 65, viet: 50, climate: 40, eb3: 70 } },
  NC: { name: "N. Carolina", flag: "🌲", tax: 4.5, rent1: "$850–1,100", rent2: "$1,000–1,300", food1: 390, food2: 620, wage: 15, climate: "4 mùa, hè nóng ẩm, đông lạnh vừa", viet: "Vừa (Raleigh, Charlotte)", eb3: "Wayne Farms (Dobson), Case Farms, Defender Service", scores: { tax: 65, cost: 65, wage: 65, viet: 50, climate: 65, eb3: 80 } },
  SC: { name: "S. Carolina", flag: "🌊", tax: 5, rent1: "$800–1,050", rent2: "$950–1,250", food1: 370, food2: 580, wage: 14.5, climate: "Hè nóng ẩm, đông nhẹ, ít tuyết", viet: "Nhỏ (Greenville, Columbia)", eb3: "Zaxby's, SEJ Services, Battle Lumber", scores: { tax: 60, cost: 68, wage: 60, viet: 30, climate: 65, eb3: 55 } },
  AL: { name: "Alabama", flag: "🌶️", tax: 5, rent1: "$650–850", rent2: "$800–1,000", food1: 340, food2: 540, wage: 14.5, climate: "Nóng ẩm, mùa đông ấm (30-55°F)", viet: "Nhỏ (Birmingham)", eb3: "Koch Foods (Gadsden), Hãng Cá Eutaw", scores: { tax: 60, cost: 85, wage: 58, viet: 20, climate: 60, eb3: 60 } },
  OH: { name: "Ohio", flag: "🎡", tax: 3.75, rent1: "$750–1,000", rent2: "$900–1,150", food1: 370, food2: 570, wage: 15, climate: "4 mùa, đông lạnh (tuyết nhiều ở Cleveland)", viet: "Vừa (Columbus ~15K)", eb3: "Case Farms Processing, nhà máy công nghiệp", scores: { tax: 73, cost: 70, wage: 65, viet: 55, climate: 50, eb3: 65 } },
  MN: { name: "Minnesota", flag: "🌨️", tax: 7, rent1: "$950–1,250", rent2: "$1,150–1,500", food1: 390, food2: 610, wage: 15, climate: "Mùa đông RẤT lạnh (-20°F), hè ngắn đẹp", viet: "Đáng kể (Minneapolis ~20K)", eb3: "TPI Hospitality, khách sạn Minneapolis", scores: { tax: 45, cost: 55, wage: 65, viet: 70, climate: 30, eb3: 50 } },
  PA: { name: "Pennsylvania", flag: "🔔", tax: 3.07, rent1: "$950–1,250", rent2: "$1,100–1,450", food1: 390, food2: 610, wage: 15, climate: "4 mùa, đông vừa phải (tuyết), hè nóng", viet: "Vừa (Philadelphia 1h từ Allentown)", eb3: "Labor Guys (Allentown), nhà máy vùng Lehigh Valley", scores: { tax: 80, cost: 58, wage: 65, viet: 50, climate: 55, eb3: 60 } },
  LA: { name: "Louisiana", flag: "🎷", tax: 4.25, rent1: "$750–1,000", rent2: "$900–1,200", food1: 370, food2: 580, wage: 14.5, climate: "Nóng ẩm, bão theo mùa (Jun-Nov)", viet: "Đáng kể (New Orleans ~25K)", eb3: "Hãng Cá Catfish, chế biến thủy sản", scores: { tax: 68, cost: 68, wage: 58, viet: 70, climate: 50, eb3: 55 } },
  NV: { name: "Nevada (Reno)", flag: "🎰", tax: 0, rent1: "$1,050–1,400", rent2: "$1,250–1,650", food1: 400, food2: 630, wage: 15, climate: "Sa mạc cao nguyên, hè nóng khô, đông lạnh có tuyết", viet: "Nhỏ (Las Vegas nhiều hơn Reno)", eb3: "Labor Guys (Reno), logistics", scores: { tax: 100, cost: 52, wage: 65, viet: 30, climate: 58, eb3: 45 } },
  SD: { name: "S. Dakota", flag: "🦬", tax: 0, rent1: "$700–900", rent2: "$850–1,100", food1: 350, food2: 540, wage: 14.5, climate: "Đông RẤT lạnh (-20°F), hè nóng khô", viet: "Rất nhỏ", eb3: "Dakota Provision, Baldwin Filters", scores: { tax: 100, cost: 80, wage: 58, viet: 10, climate: 35, eb3: 50 } },
  MS: { name: "Mississippi", flag: "🐟", tax: 4.7, rent1: "$600–800", rent2: "$750–950", food1: 320, food2: 500, wage: 14, climate: "Nóng ẩm, mùa đông ấm", viet: "Rất nhỏ", eb3: "Hãng Cá Catfish, chế biến thủy sản", scores: { tax: 63, cost: 90, wage: 55, viet: 10, climate: 58, eb3: 50 } },
};

/** Default selections for selects 1 and 2, matching legacy buildOptions() calls. */
export const COMPARE_DEFAULT_STATE_1 = "GA";
export const COMPARE_DEFAULT_STATE_2 = "TX";

/** Score category labels, ported from legacy `SCORE_LABELS`. */
export const COMPARE_SCORE_LABELS: Record<keyof CompareStateScores, string> = {
  tax: "💰 Thuế TN",
  cost: "🏠 Chi phí sống",
  wage: "💵 Lương EB3",
  viet: "🇻🇳 Cộng đồng Việt",
  climate: "🌤️ Khí hậu",
  eb3: "🏭 Hãng EB3",
};

/** Weighted score formula, ported from legacy `weights` in compare(). */
export const COMPARE_SCORE_WEIGHTS: Record<keyof CompareStateScores, number> = {
  tax: 20,
  cost: 20,
  wage: 15,
  viet: 20,
  climate: 10,
  eb3: 15,
};

/** Iteration order for score categories, shared across content/score/table components. */
export const SCORE_KEYS = Object.keys(COMPARE_SCORE_LABELS) as Array<keyof CompareStateScores>;
