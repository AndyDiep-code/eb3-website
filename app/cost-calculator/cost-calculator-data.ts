/**
 * Per-state cost-of-living data ported from cost-calculator.html's inline
 * `STATES` object (legacy lines 218-237).
 */
export interface StateCostData {
  name: string;
  flag: string;
  tax: number;
  rent1: [number, number];
  rent2: [number, number];
  rent3: [number, number];
  rent4: [number, number];
  food1: number;
  food2: number;
  food3: number;
  food4: number;
  car: number;
  ins: number;
  util: number;
  viet: string;
  wage: number;
  notes: string;
}

export const STATE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "GA", label: "Georgia (GA)" },
  { value: "IN", label: "Indiana (IN)" },
  { value: "TX", label: "Texas (TX)" },
  { value: "FL", label: "Florida (FL)" },
  { value: "WI", label: "Wisconsin (WI)" },
  { value: "NC", label: "North Carolina (NC)" },
  { value: "AL", label: "Alabama (AL)" },
  { value: "SC", label: "South Carolina (SC)" },
  { value: "MS", label: "Mississippi (MS)" },
  { value: "AR", label: "Arkansas (AR)" },
  { value: "LA", label: "Louisiana (LA)" },
  { value: "OH", label: "Ohio (OH)" },
  { value: "PA", label: "Pennsylvania (PA)" },
  { value: "MN", label: "Minnesota (MN)" },
  { value: "SD", label: "South Dakota (SD)" },
  { value: "NV", label: "Nevada (NV)" },
  { value: "MT", label: "Montana (MT)" },
  { value: "AZ", label: "Arizona (AZ)" },
];

export const FAMILY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "1", label: "1 người (chỉ mình tôi)" },
  { value: "2", label: "2 người (vợ/chồng)" },
  { value: "3", label: "3 người (+ 1 con)" },
  { value: "4", label: "4 người (+ 2 con)" },
  { value: "5", label: "5+ người" },
];

export const STATES: Record<string, StateCostData> = {
  GA: { name: "Georgia", flag: "🍑", tax: 5.39, rent1: [750, 950], rent2: [900, 1200], rent3: [1050, 1400], rent4: [1200, 1600], food1: 400, food2: 650, food3: 850, food4: 1050, car: 450, ins: 180, util: 180, viet: "Đáng kể (Atlanta/Doraville ~30K)", wage: 15.5, notes: "Nhiều hãng EB3 nhất · Khí hậu nóng · Gần Atlanta" },
  IN: { name: "Indiana", flag: "🏎️", tax: 3.05, rent1: [750, 950], rent2: [900, 1100], rent3: [1000, 1300], rent4: [1150, 1450], food1: 380, food2: 580, food3: 780, food4: 980, car: 400, ins: 160, util: 160, viet: "Vừa (Indianapolis ~8K)", wage: 15, notes: "Có Labor Guys · Chi phí vừa · 4 mùa rõ rệt" },
  TX: { name: "Texas", flag: "⭐", tax: 0, rent1: [1000, 1300], rent2: [1200, 1600], rent3: [1400, 1800], rent4: [1600, 2000], food1: 400, food2: 650, food3: 850, food4: 1050, car: 450, ins: 200, util: 190, viet: "Lớn (Houston 100K+, Dallas 40K+)", wage: 15.5, notes: "KHÔNG có thuế thu nhập · Cộng đồng Việt lớn · Nóng" },
  FL: { name: "Florida", flag: "🌴", tax: 0, rent1: [1100, 1500], rent2: [1300, 1800], rent3: [1500, 2000], rent4: [1700, 2200], food1: 430, food2: 680, food3: 880, food4: 1080, car: 450, ins: 250, util: 200, viet: "Lớn (Orlando, Jacksonville, Miami)", wage: 15, notes: "KHÔNG có thuế thu nhập · Resort nhiều · Bảo hiểm nhà đắt" },
  WI: { name: "Wisconsin", flag: "🧀", tax: 5.3, rent1: [800, 1050], rent2: [950, 1200], rent3: [1100, 1400], rent4: [1250, 1600], food1: 400, food2: 620, food3: 820, food4: 1020, car: 400, ins: 170, util: 190, viet: "Vừa (Milwaukee ~10K)", wage: 15, notes: "Mùa đông rất lạnh · Nhiều resort/nhà máy" },
  NC: { name: "North Carolina", flag: "🌲", tax: 4.5, rent1: [850, 1100], rent2: [1000, 1300], rent3: [1150, 1500], rent4: [1300, 1700], food1: 390, food2: 620, food3: 820, food4: 1020, car: 420, ins: 170, util: 170, viet: "Vừa (Raleigh, Charlotte)", wage: 15, notes: "4 mùa đẹp · Nhiều hãng gia cầm · Kinh tế phát triển" },
  AL: { name: "Alabama", flag: "🌶️", tax: 5, rent1: [650, 850], rent2: [800, 1000], rent3: [950, 1200], rent4: [1100, 1400], food1: 340, food2: 540, food3: 740, food4: 940, car: 380, ins: 150, util: 160, viet: "Nhỏ (Birmingham)", wage: 14.5, notes: "Chi phí thấp nhất · Nhịp sống chậm · Koch Foods/Wayne" },
  SC: { name: "South Carolina", flag: "🌴", tax: 5, rent1: [800, 1050], rent2: [950, 1250], rent3: [1100, 1450], rent4: [1250, 1650], food1: 370, food2: 580, food3: 780, food4: 980, car: 400, ins: 165, util: 170, viet: "Nhỏ (Greenville, Columbia)", wage: 14.5, notes: "Khí hậu dễ chịu · BMW/Michelin có nhà máy · Chi phí vừa" },
  MS: { name: "Mississippi", flag: "🐟", tax: 4.7, rent1: [600, 800], rent2: [750, 950], rent3: [900, 1150], rent4: [1050, 1350], food1: 320, food2: 500, food3: 700, food4: 900, car: 360, ins: 145, util: 150, viet: "Rất nhỏ", wage: 14, notes: "Chi phí thấp nhất cả nước · Ít tiện ích đô thị · Hãng cá catfish" },
  AR: { name: "Arkansas", flag: "🐔", tax: 4.4, rent1: [650, 850], rent2: [800, 1000], rent3: [950, 1200], rent4: [1100, 1400], food1: 330, food2: 530, food3: 730, food4: 930, car: 370, ins: 150, util: 155, viet: "Rất nhỏ", wage: 14, notes: "Chi phí rất thấp · Peco Foods · Thiên nhiên đẹp" },
  LA: { name: "Louisiana", flag: "🎷", tax: 4.25, rent1: [750, 1000], rent2: [900, 1200], rent3: [1050, 1400], rent4: [1200, 1600], food1: 370, food2: 580, food3: 780, food4: 980, car: 400, ins: 180, util: 170, viet: "Trung bình (New Orleans ~25K)", wage: 14.5, notes: "Cộng đồng Việt lâu đời · Rủi ro bão · Văn hóa ẩm thực phong phú" },
  OH: { name: "Ohio", flag: "🎡", tax: 3.5, rent1: [750, 1000], rent2: [900, 1150], rent3: [1050, 1350], rent4: [1200, 1550], food1: 370, food2: 570, food3: 770, food4: 970, car: 400, ins: 155, util: 165, viet: "Vừa (Columbus ~15K)", wage: 15, notes: "Chi phí vừa · Case Farms · Columbus có cộng đồng Việt phát triển" },
  PA: { name: "Pennsylvania", flag: "🔔", tax: 3.07, rent1: [950, 1250], rent2: [1100, 1450], rent3: [1300, 1700], rent4: [1500, 1900], food1: 390, food2: 610, food3: 810, food4: 1010, car: 420, ins: 175, util: 175, viet: "Vừa (Philadelphia 1 tiếng từ Allentown)", wage: 15, notes: "Gần NYC/Philly · Allentown công nghiệp · 4 mùa" },
  MN: { name: "Minnesota", flag: "🌨️", tax: 7, rent1: [950, 1250], rent2: [1150, 1500], rent3: [1350, 1750], rent4: [1550, 2000], food1: 390, food2: 610, food3: 810, food4: 1010, car: 400, ins: 165, util: 180, viet: "Đáng kể (Minneapolis ~20K)", wage: 15, notes: "Mùa đông rất lạnh · TPI Hospitality · Thuế khá cao" },
  SD: { name: "South Dakota", flag: "🦬", tax: 0, rent1: [700, 900], rent2: [850, 1100], rent3: [1000, 1300], rent4: [1150, 1500], food1: 350, food2: 540, food3: 740, food4: 940, car: 380, ins: 150, util: 160, viet: "Rất nhỏ", wage: 14.5, notes: "KHÔNG có thuế thu nhập · Mùa đông khắc nghiệt · Dakota Provision" },
  NV: { name: "Nevada (Reno)", flag: "🎰", tax: 0, rent1: [1050, 1400], rent2: [1250, 1650], rent3: [1450, 1900], rent4: [1650, 2100], food1: 400, food2: 630, food3: 830, food4: 1030, car: 420, ins: 180, util: 175, viet: "Nhỏ (Las Vegas/Reno)", wage: 15, notes: "KHÔNG có thuế · Khí hậu sa mạc khô · Labor Guys/Reno" },
  MT: { name: "Montana", flag: "🏔️", tax: 5.9, rent1: [850, 1150], rent2: [1000, 1350], rent3: [1200, 1600], rent4: [1400, 1800], food1: 370, food2: 580, food3: 780, food4: 980, car: 390, ins: 160, util: 165, viet: "Rất nhỏ", wage: 14, notes: "Thiên nhiên đẹp · Karst Stage · Mùa đông khắc nghiệt · Xa dịch vụ Việt" },
  AZ: { name: "Arizona", flag: "🌵", tax: 2.5, rent1: [1050, 1400], rent2: [1250, 1650], rent3: [1450, 1900], rent4: [1650, 2100], food1: 400, food2: 630, food3: 830, food4: 1030, car: 420, ins: 175, util: 185, viet: "Nhỏ (Phoenix ~15K)", wage: 15, notes: "Thuế thấp nhất · Nóng cực đoan · Labor Guys/AZ" },
};
