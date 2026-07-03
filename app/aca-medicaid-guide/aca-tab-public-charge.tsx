// Tab 3: "Public Charge" — ported from aca-medicaid-guide.html
// #tab-publiccharge.

import { Alert, Card, SectionHeading, SubLabel } from "./aca-medicaid-ui";

export function AcaTabPublicCharge() {
  return (
    <div>
      <SectionHeading>
        ⚖️ &quot;Public Charge&quot; — Sự Thật vs Lầm Tưởng
      </SectionHeading>

      <Alert tone="red" icon="🚨">
        <strong>Lầm tưởng phổ biến:</strong> &quot;Dùng phúc lợi xã hội
        (Medicaid, SNAP, CHIP) sẽ ảnh hưởng xấu đến hồ sơ thẻ xanh hoặc
        nhập tịch sau này.&quot; →{" "}
        <strong>Đây là thông tin SAI theo quy định hiện tại.</strong>
      </Alert>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Quy Định &quot;Public Charge&quot; Hiện Tại (Theo USCIS)
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Quy định &quot;public charge&quot; năm 2019–2021 (mở rộng danh
          sách phúc lợi bị tính) đã bị{" "}
          <strong className="text-accent">hủy bỏ</strong>. Quy định hiện
          tại quay lại tiêu chuẩn trước 2019: chỉ xem xét việc nhận{" "}
          <strong className="text-secondary">
            trợ cấp tiền mặt cho sinh hoạt phí (cash assistance)
          </strong>{" "}
          hoặc{" "}
          <strong className="text-secondary">
            chăm sóc dài hạn do chính phủ trả (long-term institutional
            care)
          </strong>{" "}
          — không bao gồm các phúc lợi y tế/thực phẩm thông thường.
        </p>
      </Card>

      <SubLabel>Phúc Lợi KHÔNG Tính Vào Public Charge</SubLabel>
      <div className="mb-3.5 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Phúc Lợi</th>
              <th className="px-3 py-2 font-medium">
                Tính Vào Public Charge?
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                Medicaid (trừ chăm sóc dài hạn trong viện)
              </td>
              <td className="px-3 py-2 text-accent">❌ KHÔNG tính</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                CHIP (bảo hiểm y tế cho trẻ em)
              </td>
              <td className="px-3 py-2 text-accent">❌ KHÔNG tính</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                SNAP (food stamps)
              </td>
              <td className="px-3 py-2 text-accent">❌ KHÔNG tính</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                WIC (phụ nữ mang thai &amp; trẻ nhỏ)
              </td>
              <td className="px-3 py-2 text-accent">❌ KHÔNG tính</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                ACA Marketplace subsidy
              </td>
              <td className="px-3 py-2 text-accent">❌ KHÔNG tính</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                Trợ cấp tiền mặt sinh hoạt phí (TANF, SSI)
              </td>
              <td className="px-3 py-2 text-red-600">⚠️ CÓ thể tính</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold text-text">
                Chăm sóc dài hạn do chính phủ trả (nursing home)
              </td>
              <td className="px-3 py-2 text-red-600">⚠️ CÓ thể tính</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Alert tone="green" icon="✅">
        <strong>Kết luận:</strong> Gia đình bạn có thể dùng Medicaid, CHIP,
        SNAP, WIC, và trợ cấp ACA Marketplace cho con cái hoặc bản thân
        (sau 5 năm với Medicaid) mà KHÔNG ảnh hưởng đến hồ sơ thẻ xanh
        hoặc nhập tịch sau này.
      </Alert>

      <Alert tone="blue" icon="📚">
        Nguồn tham khảo: National Immigration Law Center (
        <a
          href="https://www.nilc.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          nilc.org
        </a>
        ), Protecting Immigrant Families (
        <a
          href="https://protectingimmigrantfamilies.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          protectingimmigrantfamilies.org
        </a>
        ), KFF (
        <a
          href="https://www.kff.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          kff.org
        </a>
        ).
      </Alert>
    </div>
  );
}
