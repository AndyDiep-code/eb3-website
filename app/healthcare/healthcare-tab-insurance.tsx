// Tab 1: "Bảo Hiểm" — ported from healthcare.html #insurance.

import { HMO_VS_PPO } from "./healthcare-data";
import { Alert, SectionHeading, StepItem, Steps, SubLabel, TermCard } from "./healthcare-ui";

const TERMS = [
  {
    name: "Premium",
    vi: "Phí bảo hiểm hàng tháng",
    desc: "Số tiền trừ lương hàng tháng để có bảo hiểm, dù bạn đi khám hay không.",
    example: "Ví dụ: $85/tháng bị trừ khỏi paycheck.",
  },
  {
    name: "Deductible",
    vi: "Khoản khấu trừ ban đầu",
    desc: "Số tiền bạn phải tự trả trước khi bảo hiểm bắt đầu chi trả. Reset về $0 mỗi năm (ngày 1/1).",
    example: "Ví dụ: Deductible $1,500 → bạn tự trả $1,500 đầu tiên trong năm.",
  },
  {
    name: "Copay",
    vi: "Phí đồng trả cố định",
    desc: "Khoản cố định bạn trả mỗi lần đi khám, dù chi phí thực tế là bao nhiêu.",
    example: "Ví dụ: Copay $30 mỗi lần gặp bác sĩ gia đình (PCP).",
  },
  {
    name: "Coinsurance",
    vi: "Phần trăm tự trả sau deductible",
    desc: "Sau khi đã hết deductible, bạn và bảo hiểm chia nhau chi phí theo tỉ lệ.",
    example: "Ví dụ: 80/20 → bảo hiểm trả 80%, bạn trả 20% cho mỗi dịch vụ.",
  },
  {
    name: "Out-of-Pocket Maximum",
    vi: "Mức chi tối đa trong năm",
    desc: "Sau khi bạn tự trả tổng cộng đủ mức này trong năm, bảo hiểm trả 100% phần còn lại.",
    example: "Ví dụ: OOP Max $6,000 → sau khi bạn đã trả $6,000 trong năm, không trả thêm nữa.",
  },
  {
    name: "In-Network / Out-of-Network",
    vi: "Trong / Ngoài mạng lưới",
    desc: "Bác sĩ/bệnh viện có hợp đồng với bảo hiểm của bạn = in-network (rẻ hơn nhiều).",
    example: "Cùng dịch vụ: in-network $200, out-of-network $800+.",
  },
  {
    name: "PCP — Primary Care Physician",
    vi: "Bác sĩ gia đình / Chăm sóc ban đầu",
    desc: "Bác sĩ chính của bạn. Gặp PCP trước khi đi chuyên khoa. Copay thấp hơn specialist.",
    example: "PCP copay thường $20–40. Specialist copay $50–100.",
  },
  {
    name: "Referral",
    vi: "Giấy giới thiệu chuyên khoa",
    desc: "Với gói HMO, cần PCP viết referral mới được gặp bác sĩ chuyên khoa (specialist). PPO không cần.",
    example: "Đau lưng → PCP referral → gặp orthopedic specialist.",
  },
];

export function HealthcareTabInsurance() {
  return (
    <div>
      <SectionHeading>📋 Đọc Hiểu Bảo Hiểm Sức Khỏe Employer</SectionHeading>

      <Alert tone="red" icon="🚨">
        <strong>Sai lầm phổ biến nhất:</strong> Đi khám bác sĩ mà không hiểu
        bảo hiểm của mình → nhận hóa đơn $500–$3,000 không lường trước. Đọc
        kỹ phần này trước khi đặt lịch khám bất kỳ đâu.
      </Alert>

      <SubLabel>📖 Thuật Ngữ Quan Trọng — Phải Thuộc Lòng</SubLabel>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {TERMS.map((term) => (
          <TermCard key={term.name} {...term} />
        ))}
      </div>

      <SubLabel>🏗️ HMO vs PPO — Chọn Gói Nào?</SubLabel>
      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Tiêu chí</th>
              <th className="px-3 py-2 font-medium">HMO (Health Maintenance Org.)</th>
              <th className="px-3 py-2 font-medium">PPO (Preferred Provider Org.)</th>
            </tr>
          </thead>
          <tbody>
            {HMO_VS_PPO.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-semibold text-text">{row.label}</td>
                {row.values.map((value, index) => (
                  <td key={index} className={`px-3 py-2 ${value.colorClass || "text-text"}`}>
                    {value.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubLabel>📅 Open Enrollment — Không Được Bỏ Lỡ</SubLabel>
      <Alert tone="yellow" icon="⏰">
        <strong>Open Enrollment</strong> là thời gian duy nhất trong năm
        được đăng ký hoặc thay đổi bảo hiểm. Thường là{" "}
        <strong>tháng 10–11</strong> hàng năm (hiệu lực từ 1/1 năm sau). Nếu
        bỏ lỡ mà không có &quot;qualifying life event&quot; (kết hôn, sinh
        con, mất bảo hiểm cũ) thì phải đợi đến năm sau.
      </Alert>

      <SubLabel>💡 Ví Dụ Tính Toán Thực Tế</SubLabel>
      <div className="mb-3.5 rounded-card border border-border bg-bg p-4">
        <div className="mb-3 text-sm font-bold text-text">
          Tình huống: Đi phòng cấp cứu ER vì gãy tay — Chi phí $8,000
        </div>
        <div className="flex items-center justify-between border-b border-border py-1.5 text-sm">
          <span className="text-text-muted">
            Premium đã trả cả năm (giả sử $100/tháng × 12)
          </span>
          <span className="font-bold text-secondary">-$1,200</span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-1.5 text-sm">
          <span className="text-text-muted">Deductible bạn phải tự trả trước</span>
          <span className="font-bold text-red-500">-$1,500</span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-1.5 text-sm">
          <span className="text-text-muted">
            Coinsurance 20% trên phần còn lại ($8,000 - $1,500 = $6,500)
          </span>
          <span className="font-bold text-red-500">-$1,300</span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-1.5 text-sm">
          <span className="text-text-muted">
            Tổng bạn phải trả (deductible + coinsurance)
          </span>
          <span className="font-bold text-red-500">$2,800</span>
        </div>
        <div className="flex items-center justify-between py-1.5 text-sm">
          <span className="text-text-muted">Bảo hiểm trả phần còn lại</span>
          <span className="font-bold text-accent">$5,200 ✅</span>
        </div>
      </div>
      <Alert tone="purple" icon="💡">
        Cùng tình huống đó <strong>không có bảo hiểm</strong> = bạn trả toàn
        bộ <strong>$8,000</strong>. Với bảo hiểm, chỉ trả $2,800. Đó là lý
        do bảo hiểm quan trọng dù phí hàng tháng có vẻ đắt.
      </Alert>

      <SubLabel>📝 Checklist Khi Nhận Bảo Hiểm Mới</SubLabel>
      <Steps>
        <StepItem num={1}>
          <strong className="text-text">
            Đăng ký trong vòng 30 ngày đầu đi làm
          </strong>{" "}
          — hầu hết employer cho cửa sổ 30 ngày. Sau đó phải đợi open
          enrollment.
        </StepItem>
        <StepItem num={2}>
          <strong className="text-text">Lấy thẻ bảo hiểm (insurance card)</strong>{" "}
          — thẻ vật lý hoặc digital qua app. Luôn mang theo. Cần khi đi
          khám.
        </StepItem>
        <StepItem num={3}>
          <strong className="text-text">Chọn PCP (bác sĩ gia đình)</strong> —
          vào website bảo hiểm, tìm &quot;Find a Doctor&quot;, chọn PCP
          in-network gần nhà/chỗ làm.
        </StepItem>
        <StepItem num={4}>
          <strong className="text-text">Ghi nhớ số điện thoại 24/7</strong>{" "}
          trên thẻ bảo hiểm — gọi khi không biết dịch vụ nào được cover hay
          cần tìm bác sĩ.
        </StepItem>
        <StepItem num={5}>
          <strong className="text-text">
            Kiểm tra EOB (Explanation of Benefits)
          </strong>{" "}
          — sau mỗi lần khám, bảo hiểm gửi EOB giải thích ai trả gì. Không
          phải hóa đơn — đừng trả ngay, đợi hóa đơn thật từ bác sĩ.
        </StepItem>
      </Steps>
    </div>
  );
}
