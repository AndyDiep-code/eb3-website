/**
 * Pure data/constants ported verbatim from tracker.html's inline <script>
 * (legacy lines 340-368). No JSX, no localStorage access — keeps the data
 * importable from both server and client modules.
 */

// Current VB Table A (Jul 2026) = 2022-03-01
// Average advance FY2026: ~1 month per VB month
export const CURRENT_VB_A = new Date("2022-03-01");
export const CURRENT_VB_MONTH = "Jul-2026";
export const AVG_ADVANCE_DAYS = 30; // ~1 month per VB cycle

export interface TrackerStep {
  id: number;
  label: string;
  icon: string;
}

export const STEPS: TrackerStep[] = [
  { id: 0, label: "Mở hồ sơ", icon: "📝" },
  { id: 1, label: "Có Case Number", icon: "🔢" },
  { id: 2, label: "LC Certified", icon: "📄" },
  { id: 3, label: "I-140 Approved", icon: "✅" },
  { id: 4, label: "NVC / DS-260", icon: "📋" },
  { id: 5, label: "Document Qualified (DQ)", icon: "🟢" },
  { id: 6, label: "Phỏng vấn Lãnh Sự Quán", icon: "🎤" },
  { id: 7, label: "Có Visa & Nhập Cảnh Mỹ", icon: "🇺🇸" },
];

export const STEP_TIMES = [
  "—",
  "3–6 tháng",
  "12–15 tháng",
  "6–12 tháng",
  "Tùy VB + NVC",
  "Tùy VB",
  "Theo lịch LSQ",
  "2–4 tuần sau nhập cảnh",
];

export type ChecklistUrgency = "hot" | "med" | "ok";

export interface ChecklistItem {
  t: string;
  u: ChecklistUrgency;
}

export const CHECKLISTS: Record<number, ChecklistItem[]> = {
  0: [
    { t: "Chọn agency uy tín — kiểm tra giấy phép, luật sư di trú", u: "hot" },
    { t: "Hỏi kỹ: bao giờ sponsor có đợt nộp hồ sơ lên DOL?", u: "hot" },
    { t: "Ký hợp đồng dịch vụ — đọc kỹ điều khoản hoàn tiền", u: "hot" },
    {
      t: "Chuẩn bị giấy tờ cá nhân: passport, CCCD, khai sinh, kết hôn",
      u: "med",
    },
    { t: "Xét nghiệm chất gây nghiện — cơ sở được chỉ định", u: "med" },
    { t: "Kiểm tra sức khỏe cơ bản", u: "med" },
    { t: "Chụp hình 5×5 nền trắng", u: "ok" },
    { t: "Bắt đầu học tiếng Anh cơ bản — giao tiếp hàng ngày", u: "ok" },
  ],
  1: [
    { t: "Nhận Case Number từ agency — lưu kỹ", u: "hot" },
    {
      t: "Tra cứu Case Number tại flag.dol.gov/case-status-search",
      u: "hot",
    },
    { t: "Hỏi agency: luật sư nào đứng I-140?", u: "med" },
    { t: "Chuẩn bị tài chính cho phí I-140 (sẽ đến)", u: "med" },
    { t: "Theo dõi Visa Bulletin hàng tháng", u: "ok" },
  ],
  2: [
    {
      t: "Nhận form ETA-9089 có tên bạn — xác nhận hồ sơ đúng của mình",
      u: "hot",
    },
    { t: "Hỏi agency về lịch nộp I-140 — phải nộp trong 180 ngày", u: "hot" },
    {
      t: "Chuẩn bị phí I-140: $1,315 (gói thường) hoặc $4,120 (premium)",
      u: "hot",
    },
    {
      t: "Quyết định gói thường hay premium sau khi tham vấn agency",
      u: "med",
    },
    {
      t: "Tiếp tục ôn tiếng Anh và tìm hiểu khu vực sẽ làm việc",
      u: "ok",
    },
  ],
  3: [
    {
      t: "Nhận Receipt Number từ agency — tra cứu tại egov.uscis.gov",
      u: "hot",
    },
    {
      t: "Theo dõi Visa Bulletin Bảng A hàng tháng — kiểm tra PD",
      u: "hot",
    },
    { t: "Hỏi agency về bước NVC sẽ bắt đầu khi nào", u: "med" },
    {
      t: "Bắt đầu chuẩn bị giấy tờ cho DS-260: hộ chiếu, khai sinh...",
      u: "med",
    },
    { t: "Làm lý lịch tư pháp số 2 (khi gần đến bước NVC)", u: "med" },
    { t: "Ôn thi bằng lái xe bang sẽ sinh sống", u: "ok" },
  ],
  4: [
    {
      t: "Điền form DS-260 tại ceac.state.gov — hỏi agency kỹ trước khi điền",
      u: "hot",
    },
    {
      t: "Chuẩn bị giấy tờ dân sự: hộ chiếu, khai sinh, kết hôn, hộ khẩu",
      u: "hot",
    },
    {
      t: "Làm lý lịch tư pháp số 2 — Sở Tư Pháp (phí 200k, làm được online)",
      u: "hot",
    },
    { t: "Đóng phí NVC: $345/người", u: "med" },
    { t: "Nộp đầy đủ cho NVC — chờ Document Qualified (DQ)", u: "med" },
  ],
  5: [
    {
      t: "Chuẩn bị tài chính cho chi phí khi sang Mỹ: xe, nhà, sinh hoạt",
      u: "hot",
    },
    {
      t: "Theo dõi VB hàng tháng — khi PD lọt Bảng A sẽ được gọi phỏng vấn",
      u: "hot",
    },
    {
      t: "Ôn phỏng vấn: tên công ty, địa chỉ, công việc, mức lương",
      u: "hot",
    },
    { t: "Ôn thi bằng lái xe bang sẽ làm việc", u: "med" },
    { t: "Học tiếng Anh: giao tiếp tại nơi làm việc", u: "med" },
    {
      t: "Tìm hiểu khu vực sinh sống: trường học, siêu thị, cộng đồng Việt",
      u: "ok",
    },
  ],
  6: [
    {
      t: "Đặt lịch khám sức khỏe IOM ngay (ưu tiên 1 — chờ lâu)",
      u: "hot",
    },
    { t: "Đặt lịch tiêm vaccine bắt buộc (ưu tiên 2)", u: "hot" },
    {
      t: "Chuẩn bị lý lịch tư pháp số 2 mới (không quá 6 tháng)",
      u: "hot",
    },
    {
      t: "Ôn kỹ: tên cty, địa chỉ, công việc, lương — không được sai",
      u: "hot",
    },
    { t: "Mang đầy đủ giấy tờ theo hướng dẫn của LSQ", u: "med" },
  ],
  7: [
    { t: "Đặt vé máy bay sang Mỹ", u: "hot" },
    { t: "Chuẩn bị $3,000-5,000 USD mặt cho tháng đầu", u: "hot" },
    { t: "Xin SSN tại văn phòng SSA ngay sau khi đến", u: "hot" },
    { t: "Mở tài khoản ngân hàng (Chase/Bank of America)", u: "hot" },
    { t: "Thi bằng lái xe tại DMV bang làm việc", u: "med" },
    { t: "Mua xe cũ ($7,000-12,000) + bảo hiểm", u: "med" },
    { t: "Đăng ký bảo hiểm y tế", u: "med" },
    {
      t: "Bắt đầu đi làm cho hãng bảo trợ — giữ đúng cam kết 1 năm",
      u: "ok",
    },
  ],
};

// PERM (DOL): ~12-15 tháng từ lúc mở hồ sơ đến LC Certified (giống STEP_TIMES[2])
// I-140 (USCIS): ~3-8 tháng xử lý thường (regular processing, EB-3)
// NVC + lịch phỏng vấn: ~6-12 tháng (giống STEP_TIMES[3]/[4])
export const PERM_MONTHS: [number, number] = [12, 15];
export const I140_MONTHS: [number, number] = [3, 8];
export const NVC_INTERVIEW_MONTHS: [number, number] = [6, 12];

export const STATE_OPTIONS = [
  { value: "", label: "-- Chọn bang --" },
  { value: "GA", label: "Georgia (GA)" },
  { value: "IN", label: "Indiana (IN)" },
  { value: "TX", label: "Texas (TX)" },
  { value: "WI", label: "Wisconsin (WI)" },
  { value: "NC", label: "North Carolina (NC)" },
  { value: "FL", label: "Florida (FL)" },
  { value: "AL", label: "Alabama (AL)" },
  { value: "SC", label: "South Carolina (SC)" },
  { value: "other", label: "Khác" },
];

export const STEP_OPTIONS = [
  { value: 0, label: "Chưa có Case Number" },
  { value: 1, label: "Có Case Number — Chờ LC" },
  { value: 2, label: "LC Certified — Chờ I-140" },
  { value: 3, label: "I-140 Approved — Chờ VB/NVC" },
  { value: 4, label: "Đang làm NVC / DS-260" },
  { value: 5, label: "Document Qualified (DQ) — Chờ phỏng vấn" },
  { value: 6, label: "Đã phỏng vấn — Chờ visa" },
  { value: 7, label: "Đã có visa — Chuẩn bị sang Mỹ" },
];

export const FAMILY_OPTIONS = [
  { value: 0, label: "Chỉ mình tôi" },
  { value: 1, label: "1 người đi kèm" },
  { value: 2, label: "2 người đi kèm" },
  { value: 3, label: "3 người đi kèm" },
  { value: 4, label: "4+ người đi kèm" },
];

/** addMonths ported verbatim from legacy line 519-523. */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/** vbWaitMonths ported verbatim from legacy line 484-487 (used inside calculateFromScratch). */
export function vbWaitMonths(pd: Date): number {
  const daysUntilCurrent = Math.floor(
    (pd.getTime() - CURRENT_VB_A.getTime()) / 86400000,
  );
  return daysUntilCurrent > 0 ? Math.ceil(daysUntilCurrent / AVG_ADVANCE_DAYS) : 0;
}
