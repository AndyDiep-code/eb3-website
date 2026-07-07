// Tab 5: "Nha Khoa & Mắt" — ported from healthcare.html #dental.

import { DENTAL_OPTIONS, YEAR_CALENDAR } from "./healthcare-data";
import { Alert, CostBox, InfoCard, SectionHeading, SubLabel } from "./healthcare-ui";

export function HealthcareTabDental() {
  return (
    <div>
      <SectionHeading>🦷 Nha Khoa &amp; Mắt</SectionHeading>

      <Alert tone="red" icon="🚨">
        <strong>Cảnh báo:</strong> Nha khoa và mắt thường{" "}
        <strong>KHÔNG được bao gồm</strong> trong gói health insurance của
        employer. Đây là 2 khoản mà nhiều người Việt mới sang bị bất ngờ.
        Tìm hiểu và chuẩn bị trước.
      </Alert>

      <SubLabel>🦷 Lựa Chọn Nha Khoa Khi Không Có Bảo Hiểm</SubLabel>
      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Lựa chọn</th>
              <th className="px-3 py-2 font-medium">Chi phí</th>
              <th className="px-3 py-2 font-medium">Chất lượng</th>
              <th className="px-3 py-2 font-medium">Phù hợp với</th>
            </tr>
          </thead>
          <tbody>
            {DENTAL_OPTIONS.map((row) => (
              <tr key={row.option} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-semibold text-text">{row.option}</td>
                <td className={`px-3 py-2 ${row.costColor}`}>{row.cost}</td>
                <td className="px-3 py-2 text-text">{row.quality}</td>
                <td className="px-3 py-2 text-text-muted">{row.fitFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubLabel>🦷 Chi Phí Nha Khoa Không Có Bảo Hiểm — Tham Khảo</SubLabel>
      <CostBox
        title="Bảng giá tham khảo (không có bảo hiểm, trung bình toàn quốc 2026)"
        rows={[
          { label: "Khám định kỳ + X-ray + làm sạch (cleaning)", price: "$150–300", priceClass: "text-secondary" },
          { label: "Trám răng (filling) — 1 mặt răng", price: "$100–200", priceClass: "text-secondary" },
          { label: "Trám răng (filling) — nhiều mặt", price: "$150–300", priceClass: "text-secondary" },
          { label: "Nhổ răng đơn giản", price: "$75–200", priceClass: "text-secondary" },
          { label: "Nhổ răng khôn (wisdom tooth, phẫu thuật)", price: "$225–600/răng", priceClass: "text-red-500" },
          { label: "Root canal (chữa tủy)", price: "$700–1,500", priceClass: "text-red-500" },
          { label: "Crown (mão răng)", price: "$1,000–1,800", priceClass: "text-red-500" },
        ]}
      />

      <Alert tone="green" icon="💡">
        <strong>Mẹo tiết kiệm:</strong> Khám và làm sạch 6 tháng/lần giúp
        phát hiện sớm vấn đề nhỏ trước khi thành root canal tốn $1,000+.
        Dental school gần bạn là lựa chọn tốt nhất nếu không có bảo hiểm.
      </Alert>

      <SubLabel>👓 Bảo Hiểm Mắt &amp; Kính</SubLabel>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard
          title="👁️ Bảo Hiểm Mắt Là Gì?"
          titleColor="text-teal-600"
          items={[
            <>
              Vision insurance thường bán{" "}
              <em className="text-purple-500">riêng</em> hoặc là add-on của
              employer
            </>,
            <>
              Phí: <em className="text-purple-500">$5–15/tháng</em> — rất
              rẻ so với chi phí thực
            </>,
            "Cover: khám mắt hàng năm + giảm giá kính hoặc contact lens",
            <>
              Thương hiệu phổ biến:{" "}
              <em className="text-purple-500">
                VSP, EyeMed, Davis Vision, Superior Vision
              </em>
            </>,
            "Nếu employer không có, mua standalone tại eyemed.com hoặc vsp.com",
          ]}
        />
        <InfoCard
          title="💡 Không Có Bảo Hiểm Mắt?"
          titleColor="text-accent"
          items={[
            <>
              <strong className="text-text">Warby Parker:</strong>{" "}
              <em className="text-purple-500">Kính từ $95 (có lắp tròng)</em>
            </>,
            <>
              <strong className="text-text">Zenni Optical:</strong>{" "}
              <em className="text-purple-500">Kính online từ $6–50</em>
            </>,
            <>
              <strong className="text-text">EyeBuyDirect:</strong>{" "}
              <em className="text-purple-500">
                Kính online rẻ, chất lượng ổn
              </em>
            </>,
            <>
              <strong className="text-text">Costco Optical:</strong>{" "}
              <em className="text-purple-500">
                Khám mắt $65, kính giá tốt nhất tại cửa hàng
              </em>
            </>,
            "Cần đơn kính (prescription) từ bác sĩ mắt trước khi mua online",
          ]}
        />
      </div>

      <SubLabel>📅 Lịch Chăm Sóc Sức Khỏe Cả Năm</SubLabel>
      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Tháng</th>
              <th className="px-3 py-2 font-medium">Việc cần làm</th>
              <th className="px-3 py-2 font-medium">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {YEAR_CALENDAR.map((row) => (
              <tr key={row.month} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-semibold text-text">{row.month}</td>
                <td className="px-3 py-2 text-text">{row.task}</td>
                <td className="px-3 py-2 text-text-muted">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-card border border-border bg-bg p-4">
        <h3 className="mb-1.5 text-sm font-bold text-primary">
          📚 Nguồn tham khảo chính thức
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          <a
            href="https://www.healthcare.gov/immigrants/immigration-status/"
            target="_blank"
            rel="noopener"
            className="text-primary"
          >
            HealthCare.gov — Bảo hiểm cho người có thẻ xanh / di trú
          </a>{" "}
          — thông tin về điều kiện tham gia ACA Marketplace theo tình trạng
          di trú.
          <br />
          <a
            href="https://www.medicaid.gov/"
            target="_blank"
            rel="noopener"
            className="text-primary"
          >
            Medicaid.gov
          </a>{" "}
          — trang chính thức về Medicaid và CHIP, điều kiện và cách đăng ký
          theo từng tiểu bang.
        </p>
      </div>
    </div>
  );
}
