// Tab 2: "Medicaid" — ported from healthcare.html #medicaid.

import { MEDICAID_LIMITS } from "./healthcare-data";
import { Alert, InfoCard, SectionHeading, StateBadge, StepItem, Steps, SubLabel } from "./healthcare-ui";

const STATES_YES = [
  "California", "New York", "Illinois", "Washington", "Massachusetts",
  "Minnesota", "Vermont", "Connecticut", "Hawaii", "Oregon", "Maine", "New Jersey",
];
const STATES_PARTIAL = ["Maryland (một số)", "Pennsylvania (một số)"];
const STATES_NO = ["Texas", "Florida", "Georgia", "Indiana", "Alabama", "Mississippi"];

export function HealthcareTabMedicaid() {
  return (
    <div>
      <SectionHeading>
        🏛️ Medicaid &amp; CHIP — Bảo Hiểm Cho Người Thu Nhập Thấp
      </SectionHeading>

      <Alert tone="red" icon="⚠️">
        <strong>Quy tắc 5 năm (5-Year Bar):</strong> Theo luật liên bang,
        phần lớn người có thẻ xanh (permanent resident) phải đợi{" "}
        <strong>5 năm sau khi có thẻ xanh</strong> mới đủ điều kiện nhận
        Medicaid liên bang. Đây là quy định cố định — không thương lượng
        được.
      </Alert>

      <Alert tone="blue" icon="🔗">
        Trong khi chờ đủ 5 năm, bạn có thể mua bảo hiểm{" "}
        <strong>ACA Marketplace</strong> ngay (không có quy tắc chờ) — và
        phúc lợi Medicaid/CHIP/SNAP/WIC <strong>KHÔNG ảnh hưởng</strong> đến
        hồ sơ thẻ xanh (&quot;public charge&quot;). Xem chi tiết tại{" "}
        <a href="/aca-medicaid-guide" className="font-bold text-primary">
          ACA &amp; Medicaid Cho Người Mới Có Thẻ Xanh
        </a>
        .
      </Alert>

      <SubLabel>🗺️ Các Tiểu Bang Có Ngoại Lệ — Cho Medicaid Sớm Hơn</SubLabel>
      <p className="mb-2.5 text-sm text-text-muted">
        Nhiều tiểu bang dùng ngân sách riêng để cung cấp Medicaid cho người
        mới có thẻ xanh, không áp dụng 5-year bar:
      </p>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {STATES_YES.map((state) => (
          <StateBadge key={state} tone="yes">
            ✅ {state}
          </StateBadge>
        ))}
        {STATES_PARTIAL.map((state) => (
          <StateBadge key={state} tone="partial">
            ⚠️ {state}
          </StateBadge>
        ))}
        {STATES_NO.map((state) => (
          <StateBadge key={state} tone="no">
            ❌ {state}
          </StateBadge>
        ))}
      </div>
      <Alert tone="yellow" icon="💡">
        Danh sách này thay đổi theo từng năm tùy ngân sách tiểu bang. Kiểm
        tra tại <strong>benefits.gov</strong> hoặc liên hệ trực tiếp
        Medicaid office của tiểu bang bạn đang ở.
      </Alert>

      <SubLabel>👶 CHIP — Bảo Hiểm Cho Trẻ Em</SubLabel>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard
          title="🧒 CHIP Là Gì?"
          titleColor="text-teal-600"
          items={[
            <strong key="1" className="text-text">
              Children&apos;s Health Insurance Program
            </strong>,
            <>
              Bảo hiểm y tế giá thấp hoặc miễn phí cho{" "}
              <em className="text-purple-500">trẻ em dưới 19 tuổi</em>
            </>,
            <>
              Không áp dụng 5-year bar cho trẻ em ở{" "}
              <em className="text-purple-500">hầu hết tiểu bang</em>
            </>,
            "Thu nhập gia đình phải dưới mức quy định (thường 200–300% FPL)",
            "Bao gồm: khám bệnh, nha khoa, mắt, thuốc",
          ]}
        />
        <InfoCard
          title="✅ Đủ Điều Kiện Nếu"
          titleColor="text-accent"
          items={[
            <>
              Con bạn là công dân Mỹ (sinh tại Mỹ){" "}
              <em className="text-purple-500">→ đủ điều kiện ngay</em>
            </>,
            "Con có thẻ xanh (ở nhiều tiểu bang không bị 5-year bar)",
            "Thu nhập gia đình thấp đến trung bình",
            "Không có hoặc không đủ khả năng mua bảo hiểm tư nhân",
            <>
              Apply qua: <em className="text-purple-500">healthcare.gov</em>{" "}
              hoặc Medicaid office tiểu bang
            </>,
          ]}
        />
      </div>

      <SubLabel>📊 Giới Hạn Thu Nhập Medicaid / CHIP (2026)</SubLabel>
      <div className="mb-1 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Chương trình</th>
              <th className="px-3 py-2 font-medium">Đối tượng</th>
              <th className="px-3 py-2 font-medium">Thu nhập tối đa (% FPL)</th>
              <th className="px-3 py-2 font-medium">Thu nhập tối đa ($)</th>
            </tr>
          </thead>
          <tbody>
            {MEDICAID_LIMITS.map((row) => (
              <tr key={row.program} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-semibold text-text">{row.program}</td>
                <td className="px-3 py-2 text-text">{row.target}</td>
                <td className={`px-3 py-2 ${row.fplLimitColor}`}>{row.fplLimit}</td>
                <td className={`px-3 py-2 ${row.dollarLimitColor}`}>{row.dollarLimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-xs text-text-muted/70">
        FPL = Federal Poverty Level. Năm 2026: $15,060/năm cho 1 người,
        $20,440 cho 2 người.
      </p>

      <SubLabel>🏥 Nếu Không Đủ Điều Kiện Medicaid — Giải Pháp Thay Thế</SubLabel>
      <Steps>
        <StepItem num={1}>
          <strong className="text-text">
            FQHC — Federally Qualified Health Centers
          </strong>
          <br />
          Phòng khám cộng đồng nhận mọi bệnh nhân dù có hay không có bảo
          hiểm. Phí tính theo thu nhập (sliding scale) — từ $0 đến
          $150/lần. Tìm tại: <em>findahealthcenter.hrsa.gov</em>
        </StepItem>
        <StepItem num={2}>
          <strong className="text-text">Free Clinics</strong>
          <br />
          Phòng khám từ thiện hoàn toàn miễn phí. Tìm tại:{" "}
          <em>freeclinics.us</em> hoặc Google &quot;free clinic [thành
          phố]&quot;.
        </StepItem>
        <StepItem num={3}>
          <strong className="text-text">Urgent Care thay vì ER</strong>
          <br />
          Urgent care copay ~$50–150. ER minimum charge $500–1,500 chỉ để
          vào cửa. Dùng urgent care cho mọi bệnh không nguy hiểm tính mạng.
        </StepItem>
        <StepItem num={4}>
          <strong className="text-text">Telehealth</strong>
          <br />
          Khám online qua video call. Nhiều dịch vụ: MDLive ($75/lần),
          Teladoc, Doctor on Demand. Tốt cho cảm cúm, dị ứng, đơn thuốc cơ
          bản.
        </StepItem>
      </Steps>
    </div>
  );
}
