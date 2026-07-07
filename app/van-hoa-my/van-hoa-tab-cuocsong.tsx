// Tab "Cuộc Sống" — ported from Van_Hoa_My_Danh_Cho_Huy.html #cuocsong.

import { Alert, Card, DataTable, SectionTitle, SubTitle } from "./van-hoa-ui";

export function VanHoaTabCuocSong() {
  return (
    <div>
      <SectionTitle>🏠 Cuộc Sống Hàng Ngày Tại Indiana</SectionTitle>

      <SubTitle>Thời Tiết Indiana — Chuẩn Bị Từ VN</SubTitle>
      <DataTable
        headers={["Mùa", "Nhiệt độ", "Chuẩn bị gì"]}
        rows={[
          ["❄️ Đông (Dec-Feb)", "-15°C đến 0°C", "Áo phao dày, găng tay, mũ len, ủng chống tuyết. Xe cần làm ấm 5-10 phút trước khi đi"],
          ["🌸 Xuân (Mar-May)", "5°C đến 20°C", "Áo khoác nhẹ. Tornado season — tải app Indiana Weather cảnh báo"],
          ["☀️ Hè (Jun-Aug)", "25°C đến 35°C", "Kem chống nắng. Nhà máy thường lạnh (điều hòa mạnh) — mang áo khoác vào ca"],
          ["🍂 Thu (Sep-Nov)", "5°C đến 20°C", "Layering (mặc nhiều lớp). Đẹp nhất trong năm — lá đỏ vàng khắp nơi"],
        ]}
      />

      <SubTitle>Ăn Uống &amp; Siêu Thị</SubTitle>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card
          title="🛒 Siêu Thị Gần LGS Indianapolis"
          titleColor="text-primary"
          items={[
            "Walmart — rẻ nhất, đủ mọi thứ, mở 24/7 nhiều nơi",
            "Kroger — quality tốt hơn, có rewards card tiết kiệm",
            "Aldi — rất rẻ, store brand ngon, không có túi miễn phí",
            "Asian grocery stores — tìm trên Google \"Asian market Indianapolis\" — có gạo, mì, nước mắm, rau VN",
            "H Mart — siêu thị Á Đông lớn, có đồ VN",
          ]}
        />
        <Card
          title="🍜 Ăn Uống Tiết Kiệm"
          titleColor="text-accent"
          items={[
            "Nấu ăn mang đi làm: tiết kiệm $8-12/ngày so với mua ngoài",
            "Meal prep cuối tuần — nấu 1 lần ăn cả tuần",
            "Cơm hộp, mì gói từ Asian store: $1-2/bữa",
            "Fast food: $8-12/bữa (McDonald's, Taco Bell)",
            "Nhà hàng ngồi: $15-30/người (chưa tip)",
            "Tìm quán phở/bún bò Huế người Việt Indianapolis cho đỡ nhớ nhà",
          ]}
        />
      </div>

      <SubTitle>Giao Thông &amp; Xe Hơi — Không Có Xe = Không Đi Được</SubTitle>
      <Alert tone="red" title="⚠️ Indianapolis không có public transit đủ dùng">
        Hệ thống xe buýt có nhưng rất hạn chế và chậm. Gần như 100% người
        dân Indiana đi xe hơi. Mua xe là việc đầu tiên và quan trọng nhất
        sau khi có bằng lái.
      </Alert>
      <DataTable
        headers={["Việc", "Thực tế cần biết"]}
        rows={[
          ["Mua xe lần đầu", "Honda Civic / Toyota Corolla / Hyundai Elantra 2016-2019, ~$12,000-18,000. Mua từ người Việt trên Facebook Marketplace dễ hỏi thăm nhất"],
          ["Đổ xăng", "Tự phục vụ hoàn toàn — không có người đổ. Biết cách mở nắp bình xăng, chọn loại xăng (Regular = 87 octane là đủ)"],
          ["Bảo hiểm xe", "Bắt buộc ở Indiana: minimum 25/50/25. State Farm, Progressive, Geico. So sánh giá tại comparison sites"],
          ["Đăng kiểm (Registration)", "Hàng năm, qua BMV hoặc online. Khi hết hạn sẽ có sticker mới dán lên biển số"],
          ["Tuyết/băng", "Mua ice scraper và snow brush (~$10 ở Walmart). Làm ấm xe 5-10 phút. Lái chậm hơn 50% trên đường tuyết"],
        ]}
      />
    </div>
  );
}
