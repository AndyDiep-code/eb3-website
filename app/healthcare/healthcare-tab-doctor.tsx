// Tab 3: "Tìm Bác Sĩ" — ported from healthcare.html #doctor.

import { CARE_VENUES } from "./healthcare-data";
import { Alert, InfoCard, SectionHeading, StepItem, Steps, SubLabel } from "./healthcare-ui";

export function HealthcareTabDoctor() {
  return (
    <div>
      <SectionHeading>👨‍⚕️ Tìm Bác Sĩ &amp; Khám Bệnh Đúng Cách</SectionHeading>

      <Alert tone="purple" icon="🎯">
        <strong>Nguyên tắc quan trọng nhất:</strong> Luôn kiểm tra bác sĩ có{" "}
        <strong>in-network</strong> với bảo hiểm của bạn trước khi đặt
        lịch. Cùng một bác sĩ, in-network trả $30 copay, out-of-network có
        thể trả $300+.
      </Alert>

      <SubLabel>🔍 Tìm Bác Sĩ Nói Tiếng Việt</SubLabel>
      <Steps>
        <StepItem num={1}>
          <strong className="text-text">Google Maps:</strong> Tìm
          &quot;Vietnamese doctor [thành phố]&quot; hoặc &quot;bác sĩ người
          Việt [city]&quot;. Xem review và địa chỉ.
        </StepItem>
        <StepItem num={2}>
          <strong className="text-text">Zocdoc (zocdoc.com):</strong> Filter
          theo ngôn ngữ &quot;Vietnamese&quot;, chuyên khoa, bảo hiểm. Đặt
          lịch online ngay. Phổ biến ở thành phố lớn.
        </StepItem>
        <StepItem num={3}>
          <strong className="text-text">Website bảo hiểm của bạn:</strong>{" "}
          Vào mục &quot;Find a Doctor&quot; → filter &quot;Languages:
          Vietnamese&quot;. Đảm bảo in-network.
        </StepItem>
        <StepItem num={4}>
          <strong className="text-text">Cộng đồng Việt địa phương:</strong>{" "}
          Facebook group người Việt ở tiểu bang bạn → hỏi &quot;ai biết bác
          sĩ người Việt vùng này không?&quot;
        </StepItem>
        <StepItem num={5}>
          <strong className="text-text">FQHC có interpreter:</strong> Phòng
          khám cộng đồng thường có dịch vụ phiên dịch miễn phí cho bệnh
          nhân không nói tiếng Anh — bao gồm tiếng Việt.
        </StepItem>
      </Steps>

      <SubLabel>🏥 ER vs Urgent Care vs PCP — Chọn Đúng Nơi</SubLabel>
      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Loại</th>
              <th className="px-3 py-2 font-medium">Chi phí ước tính</th>
              <th className="px-3 py-2 font-medium">Thời gian chờ</th>
              <th className="px-3 py-2 font-medium">Khi nào dùng</th>
            </tr>
          </thead>
          <tbody>
            {CARE_VENUES.map((row) => (
              <tr key={row.name} className="border-b border-border last:border-0">
                <td className="px-3 py-2">
                  <div className="font-semibold text-text">{row.name}</div>
                  <div className="text-xs text-text-muted/70">{row.subtitle}</div>
                </td>
                <td className={`px-3 py-2 ${row.costColor}`}>{row.cost}</td>
                <td className="px-3 py-2 text-text">{row.wait}</td>
                <td className="px-3 py-2 text-text-muted">{row.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubLabel>📋 Chuẩn Bị Trước Khi Đi Khám</SubLabel>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard
          title="📦 Mang Theo"
          titleColor="text-purple-600"
          items={[
            <>
              <strong className="text-text">Thẻ bảo hiểm</strong> (insurance
              card) — <em className="text-purple-500">bắt buộc</em>
            </>,
            <strong key="2" className="text-text">
              ID hoặc Driver&apos;s license
            </strong>,
            <>
              <strong className="text-text">Danh sách thuốc đang uống</strong>{" "}
              (tên thuốc, liều lượng)
            </>,
            <>
              <strong className="text-text">Lịch sử bệnh quan trọng</strong>{" "}
              (dị ứng, bệnh mãn tính)
            </>,
            <strong key="5" className="text-text">
              Thẻ debit/credit
            </strong>,
          ]}
        />
        <InfoCard
          title="💬 Cụm Từ Tiếng Anh Cần Thiết"
          titleColor="text-accent"
          items={[
            <>
              &quot;I need an interpreter&quot; —{" "}
              <em className="text-purple-500">Tôi cần phiên dịch viên</em>
            </>,
            <>
              &quot;Is this in-network?&quot; —{" "}
              <em className="text-purple-500">Có trong mạng bảo hiểm không?</em>
            </>,
            <>
              &quot;What is my copay?&quot; —{" "}
              <em className="text-purple-500">Phí đồng trả của tôi là bao nhiêu?</em>
            </>,
            <>
              &quot;I have a referral&quot; —{" "}
              <em className="text-purple-500">Tôi có giấy giới thiệu</em>
            </>,
            <>
              &quot;Can I get a generic?&quot; —{" "}
              <em className="text-purple-500">Có thuốc generic không?</em>
            </>,
          ]}
        />
      </div>

      <SubLabel>🧠 Sức Khỏe Tâm Thần (Mental Health)</SubLabel>
      <Alert tone="blue" icon="💙">
        Căng thẳng xa nhà, áp lực công việc, cô đơn là những vấn đề{" "}
        <strong>rất phổ biến</strong> với người Việt mới sang. Đây không
        phải điểm yếu — đây là phản ứng bình thường khi thay đổi cuộc sống
        lớn. Nhiều gói bảo hiểm cover mental health theo giá copay thông
        thường. Tìm therapist người Việt qua{" "}
        <strong>Psychology Today → filter &quot;Vietnamese&quot;</strong>.
      </Alert>
    </div>
  );
}
