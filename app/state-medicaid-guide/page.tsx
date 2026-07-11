import type { Metadata } from "next";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

export const metadata: Metadata = {
  title: "Medicaid & CHIP Theo Tiểu Bang — Người Mới Có Thẻ Xanh | EB3VIET",
  description:
    "Bảng tra cứu Medicaid/CHIP theo tiểu bang cho LPR mới: quy tắc 5 năm liên bang, tiểu bang có thêm hỗ trợ, CHIP cho trẻ em, và public charge.",
  alternates: { canonical: "https://eb3viet.com/state-medicaid-guide" },
  openGraph: {
    title: "Medicaid & CHIP Theo Tiểu Bang — Người Mới Có Thẻ Xanh | EB3VIET",
    description:
      "Bảng tra cứu Medicaid/CHIP theo tiểu bang cho LPR mới: quy tắc 5 năm liên bang, tiểu bang có thêm hỗ trợ, CHIP cho trẻ em, và public charge.",
    url: "https://eb3viet.com/state-medicaid-guide",
    siteName: "EB3VIET",
    images: ["https://eb3viet.com/og-image.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicaid & CHIP Theo Tiểu Bang — Người Mới Có Thẻ Xanh | EB3VIET",
    description:
      "Bảng tra cứu Medicaid/CHIP theo tiểu bang cho LPR mới: quy tắc 5 năm liên bang, tiểu bang có thêm hỗ trợ, CHIP cho trẻ em, và public charge.",
    images: ["https://eb3viet.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function StateMedicaidGuidePage() {
  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">
          🏥 Medicaid &amp; CHIP Theo Tiểu Bang — Người Mới Có Thẻ Xanh
        </h1>
        <p className="mt-2 text-text-muted">
          Quy tắc liên bang · Tiểu bang nào có thêm hỗ trợ · Bảng tra cứu
          nhanh
        </p>

        {/* Alert: ACA good news */}
        <div className="mt-3 flex gap-3 rounded-card border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm leading-relaxed text-text">
          <span className="flex-shrink-0 text-lg">✅</span>
          <div>
            <strong>LPR mới ĐỦ ĐIỀU KIỆN mua ACA Marketplace NGAY</strong> —
            không cần chờ 5 năm. Xem chi tiết tại{" "}
            <a
              href="/aca-medicaid-guide"
              className="text-primary underline underline-offset-2"
            >
              trang ACA &amp; Medicaid
            </a>
            .
          </div>
        </div>

        {/* Section 1: Federal rules */}
        <h2 className="mt-6 text-lg font-semibold text-text">
          1. Tóm Tắt Quy Tắc Liên Bang
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {/* Card A */}
          <div className="rounded-card border border-border bg-bg-alt">
            <div className="rounded-t-card bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-600 dark:text-red-400">
              ⚠️ Medicaid Cho Người Lớn
            </div>
            <ul className="space-y-1 p-3 text-sm text-text">
              <li>• LPR phải chờ <strong>5 năm</strong> kể từ ngày được cấp thường trú</li>
              <li className="text-text-muted text-xs pt-1">Ngoại lệ (không cần chờ): Người tị nạn, asylee, nạn nhân buôn người, cựu chiến binh Mỹ</li>
            </ul>
          </div>
          {/* Card B */}
          <div className="rounded-card border border-border bg-bg-alt">
            <div className="rounded-t-card bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              ✅ CHIP &amp; Medicaid Trẻ Em
            </div>
            <ul className="space-y-1 p-3 text-sm text-text">
              <li>• Theo CHIPRA 2009, tiểu bang <strong>có thể</strong> bỏ qua 5 năm cho trẻ em và phụ nữ mang thai LPR</li>
              <li>• 30+ tiểu bang đã chọn option này — bao gồm GA, TX, NC, FL, IN, MN, WI</li>
              <li>• Trẻ em LPR tại các tiểu bang này đủ điều kiện CHIP/Medicaid <strong>ngay</strong></li>
            </ul>
          </div>
          {/* Card C */}
          <div className="rounded-card border border-border bg-bg-alt">
            <div className="rounded-t-card bg-blue-500/15 px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
              🚑 Medicaid Khẩn Cấp
            </div>
            <ul className="space-y-1 p-3 text-sm text-text">
              <li>• <strong>Tất cả tiểu bang</strong>: Emergency Medicaid cho mọi người bất kể tình trạng di trú</li>
              <li>• Chi trả điều trị khẩn cấp — không phải chăm sóc thường xuyên</li>
            </ul>
          </div>
        </div>

        {/* Section 2: States with extra adult LPR support */}
        <h2 className="mt-6 text-lg font-semibold text-text">
          2. Tiểu Bang Có Thêm Hỗ Trợ Cho Người Lớn LPR
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Một số tiểu bang dùng ngân sách tiểu bang để hỗ trợ LPR trưởng thành trong thời gian chờ 5 năm liên bang.
        </p>
        <div className="mt-3 overflow-x-auto rounded-card border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
                <th className="px-3 py-2 font-medium">Tiểu Bang</th>
                <th className="px-3 py-2 font-medium">Chương Trình</th>
                <th className="px-3 py-2 font-medium">Đối Tượng</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["California", "Medi-Cal (state-funded)", "LPR mọi lứa tuổi, thu nhập ≤138% FPL"],
                ["New York", "NY Medicaid", "LPR trong thời gian chờ (income-based)"],
                ["Illinois", "Illinois Medicaid", "Phụ nữ mang thai + trẻ em LPR ngay; người lớn có giới hạn"],
                ["Massachusetts", "MassHealth", "LPR với thu nhập thấp"],
                ["Minnesota", "Medical Assistance", "LPR trong thời gian chờ"],
                ["Washington", "Apple Health", "LPR trong thời gian chờ, thu nhập thấp"],
                ["New Jersey", "NJ FamilyCare", "Phụ nữ mang thai + trẻ em LPR"],
                ["Connecticut", "HUSKY", "Phụ nữ mang thai + trẻ em"],
                ["Hawaii, Maine, Vermont, DC", "Chương trình tiểu bang", "LPR thu nhập thấp"],
              ].map(([state, program, target], i) => (
                <tr key={state} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                  <td className="px-3 py-2 font-medium text-text">{state}</td>
                  <td className="px-3 py-2 text-text">{program}</td>
                  <td className="px-3 py-2 text-text-muted">{target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-text-muted">
          Điều kiện thu nhập và quy định cụ thể thay đổi theo năm — kiểm tra với cơ quan Medicaid tiểu bang của bạn.
        </p>

        {/* Section 3: Quick table for EB-3 states */}
        <h2 className="mt-6 text-lg font-semibold text-text">
          3. Bảng Nhanh Các Tiểu Bang Có Đông EB-3
        </h2>
        <div className="mt-3 overflow-x-auto rounded-card border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
                <th className="px-3 py-2 font-medium">Tiểu Bang</th>
                <th className="px-3 py-2 font-medium">CHIP cho trẻ LPR (không chờ 5 năm)</th>
                <th className="px-3 py-2 font-medium">Medicaid thêm cho người lớn LPR</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Indiana (IN)", true, "Không có thêm"],
                ["Georgia (GA)", true, "Không có thêm"],
                ["Texas (TX)", true, "Không có thêm"],
                ["Florida (FL)", true, "Không có thêm"],
                ["North Carolina (NC)", true, "Không có thêm"],
                ["Ohio (OH)", true, "Không có thêm"],
                ["South Carolina (SC)", true, "Không có thêm"],
                ["Minnesota (MN)", true, "✓ Medical Assistance"],
                ["Wisconsin (WI)", true, "Không có thêm"],
                ["Alabama (AL)", true, "Không có thêm"],
                ["Mississippi (MS)", true, "Không có thêm"],
                ["Arkansas (AR)", true, "Không có thêm"],
                ["Pennsylvania (PA)", true, "Không có thêm"],
                ["California (CA)", true, "✓ Medi-Cal đầy đủ"],
                ["New York (NY)", true, "✓ NY Medicaid"],
                ["Illinois (IL)", true, "✓ (giới hạn)"],
                ["Washington (WA)", true, "✓ Apple Health"],
              ].map(([state, chip, adult], i) => (
                <tr key={state as string} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                  <td className="px-3 py-2 font-medium text-text">{state}</td>
                  <td className="px-3 py-2">
                    {chip ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>
                    ) : (
                      <span className="text-text-muted">✗</span>
                    )}
                  </td>
                  <td className={`px-3 py-2 ${(adult as string).startsWith("✓") ? "font-medium text-emerald-600 dark:text-emerald-400" : "text-text-muted"}`}>
                    {adult}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-text-muted">
          <strong className="text-text">CHIP ✓</strong> = Tiểu bang đã chọn bỏ qua 5-year bar cho trẻ em LPR theo CHIPRA 2009. Luôn kiểm tra lại với cơ quan Medicaid tiểu bang vì quy định có thể thay đổi.
        </p>

        {/* Section 4: Public charge */}
        <h2 className="mt-6 text-lg font-semibold text-text">
          4. Public Charge — Không Nên Lo
        </h2>
        <div className="mt-2 rounded-card border border-border bg-bg-alt p-3 text-sm leading-relaxed text-text">
          Sử dụng Medicaid, CHIP, SNAP, WIC <strong>KHÔNG</strong> tính là "public charge" khi gia hạn thẻ xanh hoặc xin nhập quốc tịch. Quy tắc public charge 2019 đã bị bãi bỏ. Sử dụng các phúc lợi mà bạn và con bạn đủ điều kiện là quyền của bạn — đừng để nỗi sợ cản trở con bạn được chăm sóc y tế.{" "}
          <a
            href="https://www.uscis.gov/green-card/green-card-processes-and-procedures/public-charge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2"
          >
            Xem USCIS Public Charge →
          </a>
        </div>

        {/* Section 5: How to apply */}
        <h2 className="mt-6 text-lg font-semibold text-text">5. Cách Đăng Ký</h2>
        <ul className="mt-2 space-y-1 text-sm text-text">
          <li>• Truy cập{" "}
            <a href="https://www.healthcare.gov" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">healthcare.gov</a>
            {" "}để tìm chương trình phù hợp theo tiểu bang, hoặc gọi Medicaid tiểu bang trực tiếp
          </li>
          <li>• <strong>Mang theo:</strong> Green card / EAD, SSN (nếu có), bằng chứng thu nhập, chứng minh địa chỉ cư trú, giấy khai sinh con (nếu đăng ký cho trẻ)</li>
          <li>• Xem thêm:{" "}
            <a href="/healthcare" className="text-primary underline underline-offset-2">Y Tế &amp; Bảo Hiểm</a>
            {" "}·{" "}
            <a href="/aca-medicaid-guide" className="text-primary underline underline-offset-2">ACA &amp; Medicaid Guide</a>
          </li>
        </ul>

        {/* Helpful links */}
        <h2 className="mt-6 text-lg font-semibold text-text">Nguồn Tham Khảo</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>
            <a href="https://www.kff.org/medicaid/issue-brief/medicaid-and-chip-eligibility-enrollment-and-cost-sharing-policies-as-of-january-2024/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
              KFF: Medicaid &amp; CHIP Eligibility by State (2024)
            </a>
          </li>
          <li>
            <a href="https://www.healthcare.gov/immigrants/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
              HealthCare.gov: Coverage for Immigrants
            </a>
          </li>
          <li>
            <a href="https://www.nilc.org/resources/overview-immeligfedprograms/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
              NILC: Immigrant Eligibility for Federal Programs
            </a>
          </li>
          <li>
            <a href="/aca-medicaid-guide" className="text-primary underline underline-offset-2">
              EB3VIET: ACA &amp; Medicaid Guide (trang chị em)
            </a>
          </li>
        </ul>

        {/* Disclaimer */}
        <div className="mt-6 rounded-card border border-border bg-bg p-3 text-xs leading-relaxed text-text-muted">
          <b className="text-text">Lưu ý:</b> Thông tin mang tính tham khảo tổng quát (cập nhật 7/2026). Quy định tiểu bang và mức thu nhập có thể thay đổi hàng năm. Luôn xác nhận với cơ quan Medicaid tiểu bang, luật sư di trú, hoặc healthcare.gov. Nguồn: KFF, NILC, HealthCare.gov, USCIS.
        </div>
      </div>
    </Layout>
  );
}
