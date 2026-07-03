import type { QuizQuestion } from "../components/bmv-quiz-engine";

export const MN_PASS_COUNT = 32; // co>=32 from res() function

export const MN_QUESTIONS: QuizQuestion[] = [
  {
    en: "What does MN use instead of DUI?",
    vi: "Minnesota dùng gì thay vì DUI?",
    opts: [
      { en: "DUI", vi: "DUI" },
      { en: "DWI — Driving While Impaired", vi: "DWI — Driving While Impaired" },
      { en: "OVI", vi: "OVI" },
      { en: "BWI", vi: "BWI" },
    ],
    ans: 1,
    exp: {
      en: "Minnesota uses DWI. BAC 0.08%+ for adults.",
      vi: "Minnesota dùng DWI. BAC >=0.08% với người lớn là phạm pháp.",
    },
  },
  {
    en: "Default speed in MN residential areas?",
    vi: "Tốc độ mặc định khu dân cư MN?",
    opts: [
      { en: "25 mph", vi: "25 mph" },
      { en: "30 mph", vi: "30 mph" },
      { en: "35 mph", vi: "35 mph" },
      { en: "45 mph", vi: "45 mph" },
    ],
    ans: 1,
    exp: {
      en: "Minnesota residential areas default to 30 mph.",
      vi: "Khu dân cư MN mặc định 30 mph.",
    },
  },
  {
    en: "MN Hands-Free Law prohibits:",
    vi: "Luật Hands-Free MN cấm:",
    opts: [
      { en: "Talking on phone ever", vi: "Talking on phone ever" },
      { en: "Holding phone while driving", vi: "Holding phone while driving" },
      { en: "Only texting", vi: "Only texting" },
      { en: "Only for under 18", vi: "Only for under 18" },
    ],
    ans: 1,
    exp: {
      en: "You cannot hold a phone while driving — must use hands-free device.",
      vi: "Không được cầm điện thoại khi lái — phải dùng hands-free.",
    },
  },
  {
    en: "BAC limit for under 21 in Minnesota?",
    vi: "Giới hạn BAC dưới 21t ở MN?",
    opts: [
      { en: "0.08%", vi: "0.08%" },
      { en: "0.04%", vi: "0.04%" },
      { en: "0.02%", vi: "0.02%" },
      { en: "Any amount", vi: "Any amount" },
    ],
    ans: 3,
    exp: {
      en: "Any detectable BAC is illegal for under 21 in Minnesota.",
      vi: "Bất kỳ BAC nào phát hiện được là bất hợp pháp với dưới 21t ở MN.",
    },
  },
  {
    en: "Are helmets required for adult riders in MN?",
    vi: "Có bắt buộc mũ xe máy cho người lớn ở MN không?",
    opts: [
      { en: "Yes for all", vi: "Yes for all" },
      { en: "No, not for 18 and older", vi: "No, not for 18 and older" },
      { en: "Only highways", vi: "Only highways" },
      { en: "Only passengers", vi: "Only passengers" },
    ],
    ans: 1,
    exp: {
      en: "Minnesota does NOT require helmets for riders 18 and older.",
      vi: "MN KHÔNG bắt buộc mũ cho người từ 18t trở lên.",
    },
  },
  {
    en: "School zone speed in MN?",
    vi: "Tốc độ khu trường học MN?",
    opts: [
      { en: "10 mph", vi: "10 mph" },
      { en: "15 mph", vi: "15 mph" },
      { en: "20 mph", vi: "20 mph" },
      { en: "25 mph", vi: "25 mph" },
    ],
    ans: 2,
    exp: {
      en: "Minnesota school zones: 20 mph when in effect.",
      vi: "Khu trường học MN: 20 mph khi biển báo có hiệu lực.",
    },
  },
  {
    en: "Right on red in Minnesota?",
    vi: "Rẽ phải khi đèn đỏ ở MN?",
    opts: [
      { en: "Never", vi: "Never" },
      { en: "Yes, after stop and yield, unless sign prohibits", vi: "Yes, after stop and yield, unless sign prohibits" },
      { en: "Only green arrow", vi: "Only green arrow" },
      { en: "Always", vi: "Always" },
    ],
    ans: 1,
    exp: {
      en: "Right on red after complete stop and yielding, unless prohibited.",
      vi: "Được rẽ phải sau khi dừng và nhường, trừ khi có biển cấm.",
    },
  },
  {
    en: "When a school bus has red lights flashing in MN:",
    vi: "Xe buýt trường học đèn đỏ nhấp nháy ở MN:",
    opts: [
      { en: "Slow to 20 mph", vi: "Slow to 20 mph" },
      { en: "Stop both directions unless median", vi: "Stop both directions unless median" },
      { en: "Proceed carefully", vi: "Proceed carefully" },
      { en: "Only stop if behind", vi: "Only stop if behind" },
    ],
    ans: 1,
    exp: {
      en: "Stop in both directions when school bus has red lights flashing.",
      vi: "Dừng cả 2 chiều khi xe buýt đèn đỏ nhấp nháy.",
    },
  },
  {
    en: "MN minimum liability insurance?",
    vi: "Bảo hiểm tối thiểu MN là?",
    opts: [
      { en: "$25,000/$50,000/$10,000", vi: "$25,000/$50,000/$10,000" },
      { en: "$30,000/$60,000/$10,000", vi: "$30,000/$60,000/$10,000" },
      { en: "$15,000/$30,000/$5,000", vi: "$15,000/$30,000/$5,000" },
      { en: "No requirement", vi: "No requirement" },
    ],
    ans: 1,
    exp: {
      en: "MN minimum: $30,000 per person / $60,000 per accident / $10,000 property damage.",
      vi: "MN tối thiểu: $30K/người · $60K/tai nạn · $10K hư hại tài sản.",
    },
  },
  {
    en: "MN Move Over Law applies to:",
    vi: "Luật Move Over MN áp dụng cho:",
    opts: [
      { en: "Police only", vi: "Police only" },
      { en: "Emergency, tow, utility, construction vehicles on shoulder", vi: "Emergency, tow, utility, construction vehicles on shoulder" },
      { en: "Highways only", vi: "Highways only" },
      { en: "Bad weather only", vi: "Bad weather only" },
    ],
    ans: 1,
    exp: {
      en: "Move Over applies to emergency, tow, utility, and road construction vehicles on shoulder.",
      vi: "Move Over áp dụng cho xe cứu thương, xe kéo, xe tiện ích và xe xây dựng ven đường.",
    },
  },
  {
    en: "Recommended following distance in MN?",
    vi: "Khoảng cách theo sau MN?",
    opts: [
      { en: "1 second", vi: "1 second" },
      { en: "2 seconds", vi: "2 seconds" },
      { en: "3 seconds", vi: "3 seconds" },
      { en: "5 seconds", vi: "5 seconds" },
    ],
    ans: 2,
    exp: {
      en: "Minnesota recommends minimum 3-second following distance.",
      vi: "MN khuyến nghị tối thiểu 3 giây.",
    },
  },
  {
    en: "When must headlights be on in MN?",
    vi: "Khi nào phải bật đèn pha ở MN?",
    opts: [
      { en: "Only at night", vi: "Only at night" },
      { en: "30 min after sunset to 30 min before sunrise, in rain/fog", vi: "30 min after sunset to 30 min before sunrise, in rain/fog" },
      { en: "Only in fog", vi: "Only in fog" },
      { en: "Highways only", vi: "Highways only" },
    ],
    ans: 1,
    exp: {
      en: "MN headlights: 30 min after sunset to 30 min before sunrise, and in rain/fog.",
      vi: "MN: đèn pha từ 30 phút sau hoàng hôn đến 30 phút trước bình minh, và khi mưa/sương mù.",
    },
  },
];
