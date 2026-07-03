import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const LA_PASS_COUNT = 32; // co>=32 from res() function

export const LA_QUESTIONS: QuizQuestion[] = [
  {
    en: "Louisiana term for drunk driving?",
    vi: "Louisiana dùng gì cho lái xe say rượu?",
    opts: [
      { en: "DUI", vi: "DUI" },
      { en: "DWI — Driving While Intoxicated", vi: "DWI — Driving While Intoxicated" },
      { en: "OVI", vi: "OVI" },
      { en: "BWI", vi: "BWI" },
    ],
    ans: 1,
    exp: {
      en: "Louisiana uses DWI. BAC 0.08%+ for adults is illegal.",
      vi: "Louisiana dùng DWI. BAC >=0.08% với người lớn là phạm pháp.",
    },
  },
  {
    en: "Default speed in LA residential areas?",
    vi: "Tốc độ mặc định khu dân cư LA?",
    opts: [
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
    ],
    ans: 1,
    exp: {
      en: "Louisiana residential areas default to 25 mph.",
      vi: "Khu dân cư Louisiana mặc định 25 mph.",
    },
  },
  {
    en: "LA motorcycle helmets required for:",
    vi: "Mũ xe máy LA bắt buộc cho:",
    opts: [
      { en: "Only under 18", vi: "Only under 18" },
      { en: "Only under 21", vi: "Only under 21" },
      { en: "All riders and passengers", vi: "All riders and passengers" },
      { en: "Only highways", vi: "Only highways" },
    ],
    ans: 2,
    exp: {
      en: "Louisiana requires helmets for ALL riders and passengers regardless of age.",
      vi: "Louisiana bắt buộc mũ cho TẤT CẢ người lái và hành khách, bất kể tuổi.",
    },
  },
  {
    en: "School zone speed in LA?",
    vi: "Tốc độ khu trường học LA?",
    opts: [
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
    ],
    ans: 1,
    exp: {
      en: "Louisiana school zones: 20 mph when lights flash or children present.",
      vi: "Khu trường học LA: 20 mph khi đèn nhấp nháy hoặc có trẻ em.",
    },
  },
  {
    en: "BAC limit for under 21 in LA?",
    vi: "Giới hạn BAC dưới 21t ở LA?",
    opts: [
      { en: "0.08%", vi: "0.08%" },
      { en: "0.04%", vi: "0.04%" },
      { en: "0.02%", vi: "0.02%" },
      { en: "Any detectable amount", vi: "Any detectable amount" },
    ],
    ans: 2,
    exp: {
      en: "Louisiana: 0.02% BAC limit for drivers under 21.",
      vi: "Louisiana: BAC >=0.02% cho dưới 21t là DWI.",
    },
  },
  {
    en: "Right on red in Louisiana?",
    vi: "Rẽ phải khi đèn đỏ ở LA?",
    opts: [
      { en: "Never", vi: "Never" },
      { en: "Yes, after stop and yield unless prohibited", vi: "Yes, after stop and yield unless prohibited" },
      { en: "Only green arrow", vi: "Only green arrow" },
      { en: "Always", vi: "Always" },
    ],
    ans: 1,
    exp: {
      en: "Right on red after complete stop and yielding, unless sign prohibits.",
      vi: "Được rẽ phải sau khi dừng và nhường, trừ khi có biển cấm.",
    },
  },
  {
    en: "LA texting while driving:",
    vi: "Nhắn tin khi lái ở LA:",
    opts: [
      { en: "Legal for adults", vi: "Legal for adults" },
      { en: "Illegal for all drivers", vi: "Illegal for all drivers" },
      { en: "Only illegal under 18", vi: "Only illegal under 18" },
      { en: "Legal at stops", vi: "Legal at stops" },
    ],
    ans: 1,
    exp: {
      en: "Louisiana bans texting while driving for ALL drivers.",
      vi: "Louisiana cấm nhắn tin khi lái cho TẤT CẢ tài xế.",
    },
  },
  {
    en: "LA minimum liability insurance?",
    vi: "Bảo hiểm tối thiểu LA là?",
    opts: [
      { en: "$10,000/$20,000/$10,000", vi: "$10,000/$20,000/$10,000" },
      { en: "$15,000/$30,000/$25,000", vi: "$15,000/$30,000/$25,000" },
      { en: "$25,000/$50,000/$25,000", vi: "$25,000/$50,000/$25,000" },
      { en: "No requirement", vi: "No requirement" },
    ],
    ans: 1,
    exp: {
      en: "LA minimum: $15,000 per person / $30,000 per accident / $25,000 property damage.",
      vi: "LA tối thiểu: $15K/người · $30K/tai nạn · $25K hư hại tài sản.",
    },
  },
  {
    en: "Flashing red light in LA?",
    vi: "Đèn đỏ nhấp nháy ở LA?",
    opts: [
      { en: "Yield", vi: "Yield" },
      { en: "Treat as STOP sign", vi: "Treat as STOP sign" },
      { en: "Proceed with caution", vi: "Proceed with caution" },
      { en: "Emergency vehicle", vi: "Emergency vehicle" },
    ],
    ans: 1,
    exp: {
      en: "Flashing red means treat it like a STOP sign.",
      vi: "Đèn đỏ nhấp nháy = biển STOP.",
    },
  },
  {
    en: "School bus red lights flashing in LA:",
    vi: "Xe buýt trường học đèn đỏ nhấp nháy ở LA:",
    opts: [
      { en: "Slow to 20 mph", vi: "Slow to 20 mph" },
      { en: "Stop both directions unless median", vi: "Stop both directions unless median" },
      { en: "Honk and pass", vi: "Honk and pass" },
      { en: "Only behind it", vi: "Only behind it" },
    ],
    ans: 1,
    exp: {
      en: "Stop in both directions when school bus red lights flash.",
      vi: "Dừng cả 2 chiều khi xe buýt đèn đỏ nhấp nháy.",
    },
  },
  {
    en: "4-way stop in LA, simultaneous arrival:",
    vi: "Ngã tư STOP LA, 2 xe đến cùng lúc:",
    opts: [
      { en: "Larger vehicle", vi: "Larger vehicle" },
      { en: "Yield to vehicle on the right", vi: "Yield to vehicle on the right" },
      { en: "Going straight first", vi: "Going straight first" },
      { en: "Honk to claim", vi: "Honk to claim" },
    ],
    ans: 1,
    exp: {
      en: "Yield to the vehicle on your right when arriving simultaneously.",
      vi: "2 xe đến cùng lúc: nhường xe ở bên phải bạn.",
    },
  },
  {
    en: "When must headlights be on in LA?",
    vi: "Khi nào phải bật đèn pha ở LA?",
    opts: [
      { en: "Only at night", vi: "Only at night" },
      { en: "30 min after sunset to 30 min before sunrise, in rain/fog", vi: "30 min after sunset to 30 min before sunrise, in rain/fog" },
      { en: "Only in fog", vi: "Only in fog" },
      { en: "Highways only", vi: "Highways only" },
    ],
    ans: 1,
    exp: {
      en: "LA headlights: 30 min after sunset to 30 min before sunrise, and in rain/fog.",
      vi: "LA: đèn pha từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương.",
    },
  },
  {
    en: "Solid yellow on your side means:",
    vi: "Vạch vàng liền ở phía bạn có nghĩa gì?",
    opts: [
      { en: "Passing allowed", vi: "Passing allowed" },
      { en: "No passing from your side", vi: "No passing from your side" },
      { en: "Construction", vi: "Construction" },
      { en: "Speed zone", vi: "Speed zone" },
    ],
    ans: 1,
    exp: {
      en: "Solid yellow on YOUR side = you cannot pass.",
      vi: "Vạch vàng liền ở phía bạn = không được vượt.",
    },
  },
  {
    en: "Emergency vehicle approaching in LA:",
    vi: "Xe cứu thương tiến lại ở LA:",
    opts: [
      { en: "Speed up", vi: "Speed up" },
      { en: "Pull right and stop", vi: "Pull right and stop" },
      { en: "Move to center", vi: "Move to center" },
      { en: "Keep going", vi: "Keep going" },
    ],
    ans: 1,
    exp: {
      en: "Pull to the right and stop until emergency vehicles pass.",
      vi: "Kéo vào lề phải và dừng cho đến khi xe cứu thương qua.",
    },
  },
  {
    en: "Seat belts in LA:",
    vi: "Dây an toàn ở LA:",
    opts: [
      { en: "Only front seats", vi: "Only front seats" },
      { en: "All occupants", vi: "All occupants" },
      { en: "Only under 18", vi: "Only under 18" },
      { en: "Only driver", vi: "Only driver" },
    ],
    ans: 1,
    exp: {
      en: "Louisiana requires all vehicle occupants to wear seat belts.",
      vi: "Louisiana bắt buộc tất cả người trong xe thắt dây an toàn.",
    },
  },
  {
    en: "Green light means:",
    vi: "Đèn xanh có nghĩa gì?",
    opts: [
      { en: "Go without yielding", vi: "Go without yielding" },
      { en: "Go but yield to pedestrians and vehicles in intersection", vi: "Go but yield to pedestrians and vehicles in intersection" },
      { en: "Speed up", vi: "Speed up" },
      { en: "Stop first", vi: "Stop first" },
    ],
    ans: 1,
    exp: {
      en: "Green means go, but yield to pedestrians and vehicles already in intersection.",
      vi: "Xanh = đi, nhưng nhường người đi bộ và xe đã trong giao lộ.",
    },
  },
  {
    en: "Signal before turn in LA?",
    vi: "Bật xi-nhan trước khi rẽ ở LA bao xa?",
    opts: [
      { en: "50 feet", vi: "50 feet" },
      { en: "100 feet", vi: "100 feet" },
      { en: "200 feet", vi: "200 feet" },
      { en: "At the turn", vi: "At the turn" },
    ],
    ans: 1,
    exp: {
      en: "Louisiana requires signaling at least 100 feet before turning.",
      vi: "LA yêu cầu xi-nhan ít nhất 100 feet trước khi rẽ.",
    },
  },
  {
    en: "Recommended following distance in LA?",
    vi: "Khoảng cách theo sau LA?",
    opts: [
      { en: "1 second", vi: "1 second" },
      { en: "2 seconds", vi: "2 seconds" },
      { en: "3 seconds", vi: "3 seconds" },
      { en: "4 seconds", vi: "4 seconds" },
    ],
    ans: 2,
    exp: {
      en: "Louisiana recommends minimum 3-second following distance.",
      vi: "LA khuyến nghị tối thiểu 3 giây.",
    },
  },
  {
    en: "Pentagon sign means:",
    vi: "Biển ngũ giác chỉ điều gì?",
    opts: [
      { en: "Railroad crossing", vi: "Railroad crossing" },
      { en: "School zone/crossing", vi: "School zone/crossing" },
      { en: "Construction", vi: "Construction" },
      { en: "Highway", vi: "Highway" },
    ],
    ans: 1,
    exp: {
      en: "Pentagon shape is exclusively for school zone and crossing warning signs.",
      vi: "Biển ngũ giác CHỈ dùng cho biển khu trường học.",
    },
  },
  {
    en: "LA Move Over Law:",
    vi: "Luật Move Over LA:",
    opts: [
      { en: "Stop for all vehicles", vi: "Stop for all vehicles" },
      { en: "Move over or slow significantly when passing stopped emergency/service vehicles", vi: "Move over or slow significantly when passing stopped emergency/service vehicles" },
      { en: "Flash lights", vi: "Flash lights" },
      { en: "Highways only", vi: "Highways only" },
    ],
    ans: 1,
    exp: {
      en: "Move over a lane or significantly slow when passing stopped emergency, tow, or service vehicles.",
      vi: "Chuyển làn hoặc giảm tốc đáng kể khi qua xe cứu thương/kéo/dịch vụ dừng ven đường.",
    },
  },
];
