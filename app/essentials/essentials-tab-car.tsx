// Tab 2: "Xe & Đi Lại" — ported from essentials.html #car.

import { AppChip, Alert, InfoCard, InfoCardItem, SectionHeading, SubLabel } from "./essentials-ui";
import { EssentialsTable } from "./essentials-table";
import { EssentialsSteps } from "./essentials-steps";

export function EssentialsTabCar() {
  return (
    <div>
      <SectionHeading>🚗 Xe &amp; Đi Lại — Giải Pháp Năm Đầu</SectionHeading>

      <Alert tone="yellow" icon="⚠️">
        <b>Thực tế:</b> Ở Mỹ không có xe = không thể làm việc ở hầu hết khu
        vực hãng. <b>Ưu tiên #1 sau khi đến</b> là có phương tiện đi lại.
        Nhưng đừng vội mua xe đắt — năm đầu chọn xe cũ, tin cậy, giá thấp.
      </Alert>

      <SubLabel>🛒 Mua Xe Năm Đầu — Thứ Tự Ưu Tiên</SubLabel>
      <EssentialsTable
        columns={["Cách mua", "Chi phí", "Ưu điểm", "Nhược điểm", "Phù hợp khi"]}
        rows={[
          {
            cells: [
              <b key="n">Mua cash xe cũ $3–5K</b>,
              <span key="c" className="font-semibold text-accent">$3,000–$5,000 một lần</span>,
              "Không cần credit, không nợ monthly",
              "Rủi ro hỏng hóc, cần tiết kiệm trước",
              "Có người quen ở Mỹ giúp kiểm tra xe",
            ],
          },
          {
            cells: [
              <b key="n">Vay qua Credit Union</b>,
              <span key="c" className="font-medium text-secondary">~$200–300/tháng</span>,
              "Lãi suất thấp hơn bank thường, xét duyệt dễ hơn",
              "Cần SSN, lịch sử tín dụng tối thiểu",
              "Đã có tài khoản credit union ≥3 tháng",
            ],
          },
          {
            cells: [
              <b key="n">Buy Here Pay Here dealer</b>,
              <span key="c" className="text-[11.5px] text-red-500">$150–250/tháng</span>,
              "Không cần credit score",
              "Lãi suất rất cao (20–30%), xe kém chất lượng",
              "Không còn lựa chọn nào khác",
            ],
          },
          {
            cells: [
              <b key="n">Mượn của đồng nghiệp</b>,
              <span key="c" className="font-semibold text-accent">Miễn phí / trả xăng</span>,
              "Giải quyết tạm thời",
              "Phụ thuộc người khác, rủi ro quan hệ",
              "Tạm thời tuần đầu, tìm xe ngay",
            ],
          },
        ]}
      />

      <SubLabel>🔍 Tìm Xe Cũ Đáng Tin Cậy</SubLabel>
      <EssentialsSteps
        steps={[
          {
            title: "Facebook Marketplace",
            body: 'Tìm "xe cũ [thành phố]" hoặc "Vietnamese car for sale". Cộng đồng Việt hay bán xe cho nhau, dễ thỏa thuận.',
          },
          {
            title: "Xe tốt nhất cho năm đầu:",
            body: "Toyota Camry/Corolla, Honda Accord/Civic, Honda CRV đời 2010–2016. Bền, phụ tùng rẻ, thợ Mỹ biết sửa.",
          },
          {
            title: "Kiểm tra trước khi mua:",
            body: "Lịch sử xe qua CarFax/AutoCheck (trả phí ~$40). Yêu cầu thợ cơ khí kiểm tra trước. Tránh xe tai nạn nặng.",
          },
          {
            title: "Sang tên xe (Title transfer):",
            body: "Đến DMV/BMV tiểu bang với người bán. Cần bằng lái, title gốc, tiền phí sang tên ~$50–100.",
          },
        ]}
      />

      <SubLabel>🛡️ Bảo Hiểm Xe — Bắt Buộc 100%</SubLabel>
      <Alert tone="red" icon="🚨">
        Lái xe không có bảo hiểm ở Mỹ = vi phạm hình sự. Bị phạt nặng, mất
        bằng lái, có thể bị trục xuất nếu đang diện visa/green card.{" "}
        <b>Phải có bảo hiểm trước khi lái xe.</b>
      </Alert>

      <EssentialsTable
        columns={["Loại bảo hiểm", "Chi phí ước tính", "Bảo vệ gì", "Khi nào cần"]}
        rows={[
          {
            cells: [
              <b key="n">Liability only</b>,
              <span key="c" className="font-medium text-secondary">$50–100/tháng</span>,
              "Bồi thường xe & người khác nếu bạn gây tai nạn",
              "Xe cũ giá thấp (dưới $5K)",
            ],
          },
          {
            cells: [
              <b key="n">Full coverage</b>,
              <span key="c" className="text-[11.5px] text-red-500">$150–250/tháng</span>,
              "Cả xe của bạn lẫn xe người khác, trộm, thiên tai",
              "Xe mới hoặc vay tiền mua xe",
            ],
          },
        ]}
      />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard title="💡 Mẹo Giảm Phí Bảo Hiểm" titleClassName="text-accent">
          <InfoCardItem>So sánh giá qua <em className="text-accent">Progressive, State Farm, Geico</em></InfoCardItem>
          <InfoCardItem>Hỏi về discount: good driver, multi-car, pay-in-full</InfoCardItem>
          <InfoCardItem>Credit score cao → phí bảo hiểm thấp hơn đáng kể</InfoCardItem>
          <InfoCardItem>Defensive driving course → giảm 5–10%</InfoCardItem>
          <InfoCardItem>Tăng deductible ($500→$1000) → giảm phí monthly</InfoCardItem>
        </InfoCard>
        <InfoCard title="⚠️ Cần Biết Khi Bị Tai Nạn" titleClassName="text-secondary">
          <InfoCardItem>Không bỏ đi — hit and run = tội hình sự</InfoCardItem>
          <InfoCardItem>Gọi 911 nếu có người bị thương</InfoCardItem>
          <InfoCardItem>Chụp ảnh hiện trường, xe 2 bên, biển số</InfoCardItem>
          <InfoCardItem>Trao đổi thông tin bảo hiểm với người kia</InfoCardItem>
          <InfoCardItem>Báo công ty bảo hiểm trong 24 giờ</InfoCardItem>
        </InfoCard>
      </div>

      <SubLabel>🗺️ Apps Đi Lại Cần Thiết</SubLabel>
      <div className="flex flex-wrap gap-2">
        <AppChip icon="🗺️" name="Google Maps" description="Bản đồ, chỉ đường, tìm địa điểm — tải offline!" />
        <AppChip icon="🚦" name="Waze" description="Traffic real-time, cảnh báo cảnh sát, tai nạn" />
        <AppChip icon="⛽" name="GasBuddy" description="Tìm trạm xăng rẻ nhất gần bạn" />
        <AppChip icon="🚗" name="Uber / Lyft" description="Tuần đầu chưa có xe — gọi xe qua app" />
        <AppChip icon="🔧" name="YardBook / CARFAX" description="Kiểm tra lịch sử xe trước khi mua" />
      </div>
    </div>
  );
}
