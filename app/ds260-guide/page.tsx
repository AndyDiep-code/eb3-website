import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Hướng Dẫn Điền Đơn DS-260 — Từng Phần, Lỗi Thường Gặp | EB3VIET",
  description:
    "DS-260 là đơn visa online cho immigrant visa. Hướng dẫn từng phần: thông tin cá nhân, lịch sử địa chỉ, công việc, gia đình — và những lỗi hay bị 221(g) vì điền sai.",
  alternates: { canonical: "https://eb3viet.com/ds260-guide" },
  openGraph: {
    title: "Hướng Dẫn Điền DS-260 — EB-3 Visa Application | EB3VIET",
    description:
      "Điền DS-260 đúng từ đầu: tên, địa chỉ, công việc, 5 năm lịch sử, lỗi thường gặp và cách tránh 221(g).",
    url: "https://eb3viet.com/ds260-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function DS260GuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">📝 Hướng Dẫn Điền DS-260</h1>
        <p className="mt-2 text-text-muted">
          Đơn visa online cho immigrant visa · Từng phần · Lỗi thường gặp · Cách tránh 221(g)
        </p>

        <div className="mt-3 rounded-card border border-border bg-bg p-4 text-sm leading-relaxed text-text-muted">
          <strong className="text-text">DS-260 là gì?</strong> Là đơn xin visa nhập cư (immigrant visa) nộp online thông qua hệ thống{" "}
          <a href="https://ceac.state.gov" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">CEAC (ceac.state.gov)</a>.
          Sau khi NVC chấp nhận I-140 của bạn, họ gửi hướng dẫn đăng nhập CEAC để điền DS-260. Đây là bước <strong>bắt buộc trước khi được xếp lịch phỏng vấn</strong>.
        </div>

        <h2 className="mt-5 text-lg font-semibold text-text">1. Cách Đăng Nhập CEAC</h2>
        <ol className="mt-2 space-y-1.5 text-sm text-text-muted">
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-primary">1.</span>
            <span>Vào <a href="https://ceac.state.gov/IV" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">ceac.state.gov/IV</a> (dành cho immigrant visa)</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-primary">2.</span>
            <span>Nhập <strong className="text-text">Case Number</strong> (từ thư của NVC, dạng: HCM2024xxxxxxx) và <strong className="text-text">Invoice ID</strong></span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-primary">3.</span>
            <span>Chọn applicant → Click "Start Application" để bắt đầu DS-260</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-primary">4.</span>
            <span>Ghi lại <strong className="text-text">barcode number</strong> (Application ID) sau khi submit — cần mang đến phỏng vấn</span>
          </li>
        </ol>
        <div className="mt-2 rounded border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-text-muted">
          ⚠️ CEAC hay timeout — lưu thường xuyên bằng nút "Save" ở cuối mỗi trang. Nếu bị logout, login lại và tiếp tục — dữ liệu không mất.
        </div>

        <h2 className="mt-5 text-lg font-semibold text-text">2. Các Phần Trong DS-260</h2>
        <div className="mt-2 space-y-3">
          {[
            {
              section: "Personal Information 1 & 2",
              fields: [
                "Surname (họ) — dùng đúng như trong hộ chiếu",
                "Given Name (tên + đệm) — KHÔNG viết họ vào đây",
                "Other Names Used — tên viết tắt, tên cũ, tên lấy chồng/vợ",
                "DOB, POB (Place of Birth) — dùng tên tiếng Anh của tỉnh/thành",
                "Marital Status — phải khớp với hồ sơ đã nộp",
              ],
              warning: "Lỗi thường gặp: viết họ vào ô Given Name (VN hay viết NGUYEN TRAN VAN thay vì Surname: NGUYEN, Given: TRAN VAN).",
            },
            {
              section: "Address & Phone",
              fields: [
                "Current address — địa chỉ nhà hiện tại ở VN",
                "5 năm lịch sử địa chỉ — kê khai ĐẦY ĐỦ, không bỏ trống khoảng thời gian nào",
                "Phone number — thêm mã quốc gia (+84)",
                "Email — dùng email bạn hay kiểm tra",
              ],
              warning: "Bỏ trống khoảng thời gian địa chỉ hay bị 221(g) yêu cầu bổ sung.",
            },
            {
              section: "Travel Information",
              fields: [
                "Có visa Mỹ cũ không? Kê khai nếu có (kể cả visa đã hết hạn)",
                "Đã từng bị từ chối visa Mỹ chưa? Kê khai thật — nếu có, ghi lý do",
                "Đã từng nhập cảnh Mỹ chưa? Nếu có, ghi ngày và loại visa",
              ],
              warning: "Không khai visa bị từ chối trước đây là lý do hàng đầu gây từ chối visa (misrepresentation).",
            },
            {
              section: "U.S. Contact Information",
              fields: [
                "Tên và địa chỉ người liên hệ ở Mỹ (employer/sponsor hoặc người thân)",
                "Mối quan hệ: employer, friend, relative",
                "Tên công ty (nếu là employer) — điền đầy đủ tên hãng",
              ],
              warning: null,
            },
            {
              section: "Family Information",
              fields: [
                "Cha/mẹ: họ tên, ngày sinh, quốc tịch (kể cả đã mất)",
                "Anh/chị/em: liệt kê TẤT CẢ (kể cả đã mất hoặc ở nước khác)",
                "Vợ/chồng và con: điền đủ ngể cả không đi cùng",
                "Người bảo lãnh (petitioner): tên hãng và địa chỉ",
              ],
              warning: "Bỏ sót anh chị em hay gây 221(g) vì không khớp hồ sơ.",
            },
            {
              section: "Work / Education / Training (5 năm)",
              fields: [
                "5 năm lịch sử công việc — kê khai ĐẦY ĐỦ, không bỏ khoảng trống",
                "Trường học: tên trường, địa chỉ, năm học",
                "Nếu thất nghiệp hoặc nội trợ — ghi rõ 'Unemployed' với thời gian",
              ],
              warning: "Khoảng trống công việc không giải thích là lý do thường gặp nhất gây 221(g) cho EB-3.",
            },
            {
              section: "Security & Background Questions",
              fields: [
                "Trả lời thật 100% — mọi câu hỏi về tiền án, bệnh tâm thần, khủng bố, v.v.",
                "Nếu có tiền án nhỏ (phạt vi phạm giao thông) — không cần khai trừ khi hỏi rõ",
                "Nếu không chắc — hỏi luật sư trước khi submit",
              ],
              warning: "Khai gian trả lời security questions là misrepresentation — có thể bị cấm nhập cảnh vĩnh viễn.",
            },
          ].map(({ section, fields, warning }) => (
            <div key={section} className="rounded-card border border-border bg-bg p-4">
              <div className="text-sm font-bold text-primary mb-2">{section}</div>
              <ul className="space-y-1 text-sm text-text-muted">
                {fields.map((f, i) => <li key={i}>• {f}</li>)}
              </ul>
              {warning && (
                <div className="mt-2 rounded border border-amber-500/30 bg-amber-500/5 px-3 py-1.5 text-xs text-amber-700 dark:text-amber-400">
                  ⚠️ {warning}
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className="mt-5 text-lg font-semibold text-text">3. Sau Khi Submit DS-260</h2>
        <ol className="mt-2 space-y-1.5 text-sm text-text-muted">
          {[
            "In barcode confirmation page và lưu lại",
            "NVC sẽ review DS-260 — thường mất 4–8 tuần",
            "Nếu thiếu tài liệu, NVC sẽ email yêu cầu bổ sung (checker.state.gov)",
            "Khi NVC approve, họ chuyển hồ sơ sang lãnh sự quán (HCM) để đặt lịch khám y tế và phỏng vấn",
            "Khám y tế trước phỏng vấn ~2–4 tuần (tại HCMC hoặc Hà Nội)",
          ].map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-card border border-border bg-bg p-3 text-xs text-text-muted">
          <b className="text-text">Nguồn:</b> U.S. Department of State — DS-260 Instructions (travel.state.gov) · CEAC (ceac.state.gov) · Cập nhật 7/2026. Quy trình có thể thay đổi — kiểm tra thư hướng dẫn từ NVC.
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <a href="/guides" className="text-primary hover:underline">📖 Quy Trình EB-3</a>
          <a href="/documents" className="text-primary hover:underline">📋 Checklist Hồ Sơ</a>
          <a href="/interview" className="text-primary hover:underline">🎤 Ôn Phỏng Vấn</a>
          <a href="/pre-departure-guide" className="text-primary hover:underline">✈️ Chuẩn Bị Trước Khi Bay</a>
        </div>
      </div>
    </Layout>
  );
}
