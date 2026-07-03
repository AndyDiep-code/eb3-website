// Tab 1: "Điện Thoại" — ported from essentials.html #phone.

import { Alert, InfoCard, InfoCardItem, PlanCard, SectionHeading, SubLabel } from "./essentials-ui";
import { EssentialsTable } from "./essentials-table";
import { EssentialsSteps } from "./essentials-steps";

export function EssentialsTabPhone() {
  return (
    <div>
      <SectionHeading>📱 Chọn SIM Điện Thoại Khi Mới Sang</SectionHeading>

      <Alert tone="green" icon="✅">
        <b>Khuyến nghị:</b> Chọn gói <b>prepaid (trả trước)</b> khi mới sang —
        không cần credit score, không cần hợp đồng, không bị phạt nếu đổi nhà
        mạng. Tránh hợp đồng 2 năm (postpaid) trong năm đầu.
      </Alert>

      <SubLabel>🏆 So Sánh Các Gói Prepaid Tốt Nhất 2026</SubLabel>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <PlanCard
          top
          badge="⭐ KHUYẾN NGHỊ #1"
          name="Mint Mobile"
          network="Mạng T-Mobile (tốt nhất nông thôn)"
          price="$15/tháng"
          features={[
            "5GB data tốc độ cao",
            "Unlimited calls & texts",
            "Mua 3 tháng trước → rẻ hơn",
            "Miễn phí eSIM",
            "Không credit check",
          ]}
        />
        <PlanCard
          name="Cricket Wireless"
          network="Mạng AT&T"
          price="$25/tháng"
          features={[
            "Unlimited data (giới hạn 8Mbps)",
            "Unlimited calls & texts",
            "Có cửa hàng vật lý — dễ hỗ trợ",
            "Tốt hơn ở vùng AT&T phủ sóng",
            "Không credit check",
          ]}
        />
        <PlanCard
          name="Metro by T-Mobile"
          network="Mạng T-Mobile"
          price="$25/tháng"
          features={[
            "Unlimited data (giới hạn tốc độ)",
            "Unlimited calls & texts",
            "Nhiều cửa hàng — phổ biến",
            "Amazon Prime 6 tháng (gói $40+)",
            "Không credit check",
          ]}
        />
        <PlanCard
          name="Visible"
          network="Mạng Verizon"
          price="$25/tháng"
          features={[
            "Unlimited data (ưu tiên thấp hơn)",
            "Unlimited calls & texts",
            "Verizon — tốt ở vùng ngoại ô",
            "Chỉ online — không cửa hàng",
            "Không credit check",
          ]}
        />
      </div>

      <SubLabel>📊 Chọn Mạng Theo Khu Vực</SubLabel>
      <EssentialsTable
        columns={["Mạng gốc", "Phủ sóng tốt nhất", "Thành phố lớn", "Nông thôn / Khu hãng", "Hãng prepaid dùng mạng này"]}
        rows={[
          {
            cells: [
              <b key="n">T-Mobile</b>,
              <span key="c" className="font-semibold text-accent">Tốt nhất toàn quốc 2024-2026</span>,
              <span key="u" className="font-semibold text-accent">Rất tốt</span>,
              <span key="r" className="font-semibold text-accent">Tốt (5G rộng nhất)</span>,
              "Mint Mobile, Metro, T-Mobile Prepaid",
            ],
          },
          {
            cells: [
              <b key="n">AT&T</b>,
              <span key="c" className="font-medium text-secondary">Rất tốt ở miền Nam, Đông Nam</span>,
              <span key="u" className="font-semibold text-accent">Rất tốt</span>,
              <span key="r" className="font-medium text-secondary">Khá tốt</span>,
              "Cricket Wireless, Consumer Cellular",
            ],
          },
          {
            cells: [
              <b key="n">Verizon</b>,
              <span key="c" className="font-medium text-secondary">Tốt nhất vùng ngoại ô đông</span>,
              <span key="u" className="font-semibold text-accent">Rất tốt</span>,
              <span key="r" className="font-medium text-secondary">Trung bình</span>,
              "Visible, Total Wireless, TracFone",
            ],
          },
        ]}
      />

      <Alert tone="yellow" icon="💡">
        <b>Mẹo:</b> Hỏi đồng nghiệp người Việt ở hãng bạn đang làm về mạng nào
        có sóng tốt trong khu vực. Khu nông thôn có hãng gia cầm, T-Mobile
        thường mạnh nhất.
      </Alert>

      <SubLabel>🔑 Kích Hoạt SIM — Bước Cụ Thể</SubLabel>
      <EssentialsSteps
        steps={[
          {
            title: "Mua SIM kit hoặc eSIM online",
            body: "Mint Mobile, Cricket có thể order trước khi sang hoặc mua tại Walmart/Best Buy ngày đầu đến. Giá SIM kit: $0–$10.",
          },
          {
            title: "Cần để kích hoạt:",
            body: "Địa chỉ Mỹ (nhà sponsor hoặc hãng), số thẻ debit/credit hoặc Walmart gift card để trả phí tháng đầu.",
          },
          {
            title: "Unlock điện thoại từ Việt Nam:",
            body: "Nếu mang smartphone từ VN, cần unlock. Liên hệ nhà mạng VN yêu cầu unlock trước khi đi, hoặc mua điện thoại unlocked tại Mỹ (~$150-$200 Android cũ).",
          },
          {
            title: "Số Google Voice (tùy chọn):",
            body: "Tạo số điện thoại Mỹ miễn phí tại voice.google.com — dùng để điền form, gọi nội địa miễn phí qua WiFi khi chưa có SIM.",
          },
          {
            title: "Cài apps ngay:",
            body: "WhatsApp (gọi VN), Zalo, Google Maps, Google Translate (offline Vietnamese-English pack).",
          },
        ]}
      />

      <SubLabel>📞 Gọi Về Việt Nam Miễn Phí</SubLabel>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard title="✅ Cách Rẻ Nhất" titleClassName="text-accent">
          <InfoCardItem>
            <b>WhatsApp:</b> <em className="text-accent">Miễn phí</em> — video call, voice call qua WiFi/data
          </InfoCardItem>
          <InfoCardItem>
            <b>Zalo:</b> <em className="text-accent">Miễn phí</em> — phổ biến với gia đình VN hơn
          </InfoCardItem>
          <InfoCardItem>
            <b>Facebook Messenger:</b> <em className="text-accent">Miễn phí</em> — video call tốt
          </InfoCardItem>
          <InfoCardItem>
            <b>Google Meet/Duo:</b> <em className="text-accent">Miễn phí</em> — chất lượng video cao
          </InfoCardItem>
        </InfoCard>
        <InfoCard title="⚠️ Cần Tránh" titleClassName="text-secondary">
          <InfoCardItem>
            <b>Gọi quốc tế qua mạng:</b> Tốn ~$0.02–$0.10/phút
          </InfoCardItem>
          <InfoCardItem>
            <b>Gọi từ số Mỹ sang số VN:</b> Rất đắt nếu không có gói international
          </InfoCardItem>
          <InfoCardItem>
            <b>Gọi qua SIM VN roaming:</b> Cực kỳ đắt — tắt roaming ngay khi đến Mỹ
          </InfoCardItem>
          <InfoCardItem>
            <b>Premium calling apps (Skype credit):</b> Không cần thiết khi có WhatsApp
          </InfoCardItem>
        </InfoCard>
      </div>
    </div>
  );
}
