// Tab 4: "Internet & Apps" — ported from essentials.html #internet.

import { AppChip, Alert, InfoCard, InfoCardItem, SectionHeading, SubLabel, TimelineRow } from "./essentials-ui";
import { EssentialsTable } from "./essentials-table";

export function EssentialsTabInternet() {
  return (
    <div>
      <SectionHeading>🌐 Internet &amp; Kết Nối Số</SectionHeading>

      <Alert tone="blue" icon="📡">
        Internet nhà không cần thiết ngay tuần đầu nếu nhà share wifi. Ưu
        tiên SIM điện thoại trước (hotspot dùng được tạm thời), sau đó setup
        internet nhà khi đã ổn định chỗ ở.
      </Alert>

      <SubLabel>📡 So Sánh Nhà Mạng Internet Nhà</SubLabel>
      <EssentialsTable
        columns={["Nhà mạng", "Tốc độ", "Giá (tháng 1)", "Giá sau khuyến mãi", "Phủ sóng"]}
        rows={[
          {
            cells: [
              <b key="n">Xfinity (Comcast)</b>,
              "75–1200 Mbps",
              <span key="p" className="font-semibold text-accent">$20–30/tháng (6 tháng)</span>,
              <span key="a" className="text-[11.5px] text-red-500">$50–80/tháng</span>,
              "Rộng nhất toàn quốc — suburban & urban",
            ],
          },
          {
            cells: [
              <b key="n">AT&amp;T Fiber</b>,
              "300–5000 Mbps",
              <span key="p" className="font-semibold text-accent">$35–55/tháng</span>,
              <span key="a" className="font-medium text-secondary">$35–55/tháng (không đổi)</span>,
              "Tốt ở South, Midwest — cần kiểm tra địa chỉ",
            ],
          },
          {
            cells: [
              <b key="n">T-Mobile Home Internet</b>,
              "33–300 Mbps",
              <span key="p" className="font-semibold text-accent">$50/tháng cố định</span>,
              <span key="a" className="font-medium text-secondary">$50/tháng</span>,
              "Không cần cable, dùng 5G — tốt cho rural",
            ],
          },
          {
            cells: [
              <b key="n">Spectrum</b>,
              "300–1000 Mbps",
              <span key="p" className="font-medium text-secondary">$50/tháng</span>,
              <span key="a" className="font-medium text-secondary">$50–80/tháng</span>,
              "Tốt vùng suburban, không cam kết tốc độ",
            ],
          },
          {
            cells: [
              <b key="n">Cox</b>,
              "100–1000 Mbps",
              <span key="p" className="font-medium text-secondary">$35–60/tháng</span>,
              <span key="a" className="text-[11.5px] text-red-500">$60–90/tháng</span>,
              "Tốt ở AZ, OK, LA, NE",
            ],
          },
        ]}
      />

      <Alert tone="yellow" icon="⚠️">
        <b>Cẩn thận với giá khuyến mãi:</b> Xfinity, Cox hay hút khách bằng
        giá 12 tháng đầu. Tháng 13 tự động tăng gấp đôi. Đặt nhắc trong lịch
        để cancel hoặc đổi nhà mạng khi hết khuyến mãi.
      </Alert>

      <SubLabel>📺 Xem TV &amp; Giải Trí — Không Cần Cable Đắt Tiền</SubLabel>
      <EssentialsTable
        columns={["Dịch vụ", "Giá", "Nội dung", "Có tiếng Việt?"]}
        rows={[
          { cells: [<b key="n">YouTube</b>, <span key="p" className="font-semibold text-accent">$0</span>, "Video đủ thể loại, tin tức, phim lẻ", "✅ Nhiều kênh VN"] },
          { cells: [<b key="n">Tubi</b>, <span key="p" className="font-semibold text-accent">$0 (có ads)</span>, "10,000+ phim & series", "❌"] },
          { cells: [<b key="n">Pluto TV</b>, <span key="p" className="font-semibold text-accent">$0 (có ads)</span>, "Live TV + phim. Nhiều kênh", "❌"] },
          { cells: [<b key="n">Netflix</b>, <span key="p" className="font-medium text-secondary">$7–23/tháng</span>, "Phim, series chất lượng cao", "⚠️ Một số phim có phụ đề VN"] },
          { cells: [<b key="n">YouTube TV</b>, <span key="p" className="text-[11.5px] text-red-500">$72.99/tháng</span>, "100+ kênh live TV, thể thao, tin tức", "❌ (nhưng có kênh Mỹ đầy đủ)"] },
        ]}
      />

      <SubLabel>📱 Apps Thiết Yếu — Cài Ngay Khi Đến</SubLabel>
      <div className="mb-4 flex flex-wrap gap-2">
        <AppChip icon="💬" name="WhatsApp" description="Gọi video về VN miễn phí — quan trọng nhất" />
        <AppChip icon="🌾" name="Zalo" description="Liên lạc gia đình VN quen dùng Zalo" />
        <AppChip icon="🌐" name="Google Translate" description="Tải offline Tiếng Anh — dùng camera dịch biển" />
        <AppChip icon="🏦" name="App ngân hàng của bạn" description="Chase, Wells Fargo — mobile deposit check" />
        <AppChip icon="💊" name="GoodRx" description="Giảm giá thuốc tại nhà thuốc — cực hữu ích" />
        <AppChip icon="🌤️" name="Weather Channel / AccuWeather" description="Thời tiết Mỹ khắc nghiệt — cần theo dõi" />
        <AppChip icon="🚨" name="Wireless Emergency Alerts" description="Bật trong Settings — cảnh báo lốc xoáy, bão" />
        <AppChip icon="📊" name="Credit Karma" description="Xem credit score miễn phí — theo dõi hàng tuần" />
      </div>

      <SubLabel>🔐 Bảo Mật &amp; An Toàn Trực Tuyến</SubLabel>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard title="✅ Nên Làm" titleClassName="text-accent">
          <InfoCardItem><b>Mật khẩu mạnh:</b> <em className="text-accent">Dùng LastPass hoặc Google Password Manager</em></InfoCardItem>
          <InfoCardItem><b>2FA (xác thực 2 bước):</b> <em className="text-accent">Bật cho email, bank, mọi app quan trọng</em></InfoCardItem>
          <InfoCardItem><b>Backup email:</b> <em className="text-accent">Tạo email Mỹ (Gmail/Outlook) dùng riêng cho hồ sơ</em></InfoCardItem>
          <InfoCardItem><b>Cẩn thận WiFi công cộng:</b> <em className="text-accent">Không login bank qua WiFi lạ</em></InfoCardItem>
        </InfoCard>
        <InfoCard title="❌ Không Nên" titleClassName="text-red-500">
          <InfoCardItem><b>Chia sẻ SSN qua điện thoại/email:</b> <em className="text-red-500">Không bao giờ</em></InfoCardItem>
          <InfoCardItem><b>Click link lạ trong SMS:</b> <em className="text-red-500">Scam phổ biến với người mới</em></InfoCardItem>
          <InfoCardItem><b>Tải phần mềm lậu:</b> <em className="text-red-500">Malware + vi phạm copyright</em></InfoCardItem>
          <InfoCardItem><b>Đăng thông tin cá nhân Facebook công khai:</b> <em className="text-red-500">Dễ bị nhắm mục tiêu scam</em></InfoCardItem>
        </InfoCard>
      </div>

      <SubLabel>📅 Timeline Tuần Đầu — Thứ Tự Ưu Tiên</SubLabel>
      <div>
        <TimelineRow day="Ngày 1–2">
          <b>Ưu tiên tuyệt đối:</b> Kích hoạt SIM Mint Mobile/Cricket. Cài
          WhatsApp báo về nhà. Cài Google Maps tải offline bản đồ tiểu bang.
        </TimelineRow>
        <TimelineRow day="Ngày 3–7">
          <b>Mua sắm cơ bản:</b> Walmart — nồi cơm, đồ vệ sinh, quần áo.
          Dollar Tree — đồ lặt vặt. Facebook Marketplace — xem có ai cho đồ
          không.
        </TimelineRow>
        <TimelineRow day="Tuần 2">
          <b>Tìm xe:</b> Nói chuyện đồng nghiệp, Facebook Marketplace xe cũ,
          hỏi về bảo hiểm. Mở tài khoản ngân hàng (Chase/Wells Fargo).
        </TimelineRow>
        <TimelineRow day="Tuần 3–4">
          <b>Ổn định:</b> Mua xe, đăng ký bảo hiểm xe. Setup internet nhà
          nếu cần. Cài Credit Karma để bắt đầu theo dõi credit score.
        </TimelineRow>
        <TimelineRow day="Tháng 2+">
          <b>Nâng cấp:</b> Nâng gói điện thoại nếu cần. Đăng ký Walmart+
          hoặc Amazon Prime khi đã ổn định chi tiêu.
        </TimelineRow>
      </div>
    </div>
  );
}
