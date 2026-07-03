// Checklist items for the "Văn Hóa Mỹ" page's checklist tab, ported
// verbatim from Van_Hoa_My_Danh_Cho_Huy.html's #checklist <input> ids and
// <label> text. The `id` values are reused as localStorage keys, matching
// the legacy page's persistence scheme exactly (same keys, same site
// origin → existing user progress carries over after migration).

export interface ChecklistItem {
  id: string;
  label: string;
  badge?: { text: string; tone: "red" | "amber" | "blue" | "green" };
}

export interface ChecklistGroup {
  title: string;
  items: ChecklistItem[];
}

export const CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    title: "📚 Giai đoạn 1: Học tại Việt Nam (2025-2026)",
    items: [
      { id: "c1", label: "Đọc xong toàn bộ sách luật giao thông Indiana (tiếng Việt — đã có trong hồ sơ)" },
      { id: "c2", label: "Làm bài test bằng lái Indiana online: in.gov/bmv — đạt 42/50 trở lên" },
      { id: "c3", label: "Xem ít nhất 10 tập phim Mỹ có phụ đề tiếng Anh (gợi ý: The Office, Modern Family — văn phòng/gia đình)" },
      { id: "c4", label: "Học xong 50 câu giao tiếp cơ bản nói được không nhìn giấy" },
      { id: "c5", label: "Tìm và join Facebook group \"Người Việt tại Indianapolis / Indiana\"" },
      { id: "c6", label: "Xem YouTube \"Living in Indianapolis Indiana\" — ít nhất 5 video" },
      { id: "c7", label: "Tìm hiểu khu vực nơi làm việc trên Google Maps" },
      { id: "c8", label: "Hiểu rõ tipping culture — biết mức tip cho từng tình huống" },
    ],
  },
  {
    title: "🏭 Giai đoạn 2: Chuẩn bị công việc LGS (2026-2027)",
    items: [
      { id: "d1", label: "Học thuộc 20 từ safety vocabulary (PPE, forklift zone, emergency exit...)" },
      { id: "d2", label: "Luyện thuộc 12 câu giao tiếp hàng ngày tại nhà máy" },
      { id: "d3", label: "Xem YouTube \"production line manufacturing worker USA\" — xem thực tế công việc trông như thế nào" },
      { id: "d4", label: "Tìm hiểu Ivy Tech Community College Indianapolis: ivytech.edu" },
      { id: "d5", label: "Tìm hiểu lương tối thiểu Indiana và quyền lao động cơ bản" },
      { id: "d6", label: "Hiểu credit score là gì và cách xây từ đầu" },
    ],
  },
  {
    title: "🇺🇸 Giai đoạn 3: Tuần đầu tại Mỹ",
    items: [
      { id: "e1", label: "Xin SSN tại văn phòng SSA", badge: { text: "Ưu tiên cao", tone: "red" } },
      { id: "e2", label: "Mở tài khoản ngân hàng Chase hoặc Bank of America", badge: { text: "Ưu tiên cao", tone: "red" } },
      { id: "e3", label: "Thi Written Test bằng lái tại BMV Indiana", badge: { text: "Ưu tiên cao", tone: "red" } },
      { id: "e4", label: "Đăng ký Medicaid/CHIP cho các con (trong 60 ngày)" },
      { id: "e5", label: "Mua sim điện thoại T-Mobile hoặc AT&T prepaid" },
      { id: "e6", label: "Báo cáo công ty bảo trợ, xác nhận ngày bắt đầu làm việc" },
      { id: "e7", label: "Tìm nhà thuê chính thức trên Zillow hoặc qua người Việt" },
      { id: "e8", label: "Mở secured credit card để bắt đầu xây credit" },
      { id: "e9", label: "Thi Road Test và lấy bằng lái đầy đủ", badge: { text: "Trong tháng 3", tone: "amber" } },
      { id: "e10", label: "Mua xe cũ + bảo hiểm xe", badge: { text: "Trong tháng 3", tone: "amber" } },
      { id: "e11", label: "Tham gia lớp ESL miễn phí tại thư viện Indianapolis", badge: { text: "Tháng 2-3", tone: "blue" } },
      { id: "e12", label: "Khai thuế (tax return) lần đầu tháng 4 — dùng TurboTax free", badge: { text: "Tháng 4", tone: "green" } },
    ],
  },
];
