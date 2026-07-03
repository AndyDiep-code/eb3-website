// Tab 3: "Mua Sắm" — ported from essentials.html #shopping.

import { AppChip, Alert, InfoCard, InfoCardItem, SectionHeading, SubLabel } from "./essentials-ui";
import { EssentialsTable } from "./essentials-table";

export function EssentialsTabShopping() {
  return (
    <div>
      <SectionHeading>🛒 Mua Sắm Thông Minh — Tiết Kiệm Tối Đa</SectionHeading>

      <Alert tone="teal" icon="💡">
        Người Việt mới sang Mỹ thường tốn nhiều hơn cần thiết vì không biết
        các kênh mua sắm rẻ. Năm đầu, target tiết kiệm{" "}
        <b>30–40% chi tiêu mua sắm</b> so với người mới không biết.
      </Alert>

      <SubLabel>🏪 Siêu Thị — Chọn Đúng Nơi</SubLabel>
      <EssentialsTable
        columns={["Siêu thị", "Giá", "Tốt nhất để mua", "Ghi chú"]}
        rows={[
          {
            cells: [
              <b key="n">Walmart</b>,
              <span key="c" className="font-semibold text-accent">Rẻ nhất</span>,
              "Đồ khô, đóng hộp, đồ gia dụng, quần áo cơ bản",
              "Walmart+ ($13/tháng) → giao hàng miễn phí",
            ],
          },
          {
            cells: [
              <b key="n">Aldi</b>,
              <span key="c" className="font-semibold text-accent">Rất rẻ</span>,
              "Thực phẩm tươi, dairy, bánh mì, snack",
              "Không cần thẻ, chỉ cần ví. Hàng tuần thay đổi",
            ],
          },
          {
            cells: [
              <b key="n">Dollar Tree / Dollar General</b>,
              <span key="c" className="font-semibold text-accent">$1.25–$5/món</span>,
              "Đồ vệ sinh, giấy, đồ bếp, snack",
              "Kiểm tra hạn sử dụng. Không phải mọi thứ đều rẻ",
            ],
          },
          {
            cells: [
              <b key="n">Kroger / Publix</b>,
              <span key="c" className="font-medium text-secondary">Trung bình</span>,
              "Thịt tươi, rau, có thẻ khách hàng giảm giá",
              "Đăng ký thẻ loyalty miễn phí → giá rẻ hơn 20%",
            ],
          },
          {
            cells: [
              <b key="n">H-Mart / 99 Ranch</b>,
              <span key="c" className="font-medium text-secondary">Trung bình</span>,
              "Thực phẩm châu Á, rau muống, mắm, bún phở",
              "Ở thành phố lớn. Tìm Asian grocery gần hãng",
            ],
          },
          {
            cells: [
              <b key="n">Costco / Sam&apos;s Club</b>,
              <span key="c" className="font-medium text-secondary">Cần phí thành viên $65/năm</span>,
              "Mua số lượng lớn: gạo 50lb, dầu ăn, thịt",
              "Chia nhau với đồng nghiệp — tiết kiệm hơn",
            ],
          },
        ]}
      />

      <SubLabel>♻️ Đồ Cũ &amp; Thrift Store — Bộ Sưu Tập Đầu Tiên</SubLabel>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard title="🛍️ Nơi Mua Đồ Cũ Rẻ" titleClassName="text-accent">
          <InfoCardItem><b>Goodwill:</b> <em className="text-accent">Quần áo $1–5, đồ gia dụng rất rẻ</em></InfoCardItem>
          <InfoCardItem><b>Salvation Army:</b> <em className="text-accent">Giường, tủ, bàn ghế cũ giá thấp</em></InfoCardItem>
          <InfoCardItem><b>Facebook Marketplace:</b> <em className="text-accent">Nội thất, TV, dụng cụ bếp. Nhiều thứ FREE</em></InfoCardItem>
          <InfoCardItem><b>Craigslist &quot;Free&quot; section:</b> <em className="text-accent">Hàng xóm cho đồ miễn phí</em></InfoCardItem>
          <InfoCardItem><b>OfferUp / Letgo:</b> <em className="text-accent">App mua bán đồ cũ địa phương</em></InfoCardItem>
        </InfoCard>
        <InfoCard title="📦 Đồ Cần Mua Ngay Tuần Đầu" titleClassName="text-primary">
          <InfoCardItem><b>Nồi cơm điện:</b> <em className="text-primary">$20–30 tại Walmart</em></InfoCardItem>
          <InfoCardItem><b>Chăn gối:</b> <em className="text-primary">Goodwill hoặc Walmart ~$15–20</em></InfoCardItem>
          <InfoCardItem><b>Nồi, chảo cơ bản:</b> <em className="text-primary">Dollar Tree hoặc thrift store</em></InfoCardItem>
          <InfoCardItem><b>Xà phòng, dầu gội:</b> <em className="text-primary">Dollar Tree — rẻ nhất</em></InfoCardItem>
          <InfoCardItem><b>Quần áo mùa đông:</b> <em className="text-primary">Goodwill mùa hè rẻ hơn nhiều</em></InfoCardItem>
        </InfoCard>
      </div>

      <SubLabel>💰 Apps &amp; Công Cụ Tiết Kiệm</SubLabel>
      <div className="mb-4 flex flex-wrap gap-2">
        <AppChip icon="💵" name="Ibotta" description="Cashback khi mua thực phẩm, đồ gia dụng" />
        <AppChip icon="🛒" name="Flipp" description="Xem circular sale tất cả siêu thị gần bạn" />
        <AppChip icon="🏷️" name="Honey (Chrome extension)" description="Tự động tìm coupon code khi mua online" />
        <AppChip icon="📦" name="Amazon" description="Prime $14.99/tháng → giao hàng 2 ngày miễn phí" />
        <AppChip icon="🧾" name="Rakuten" description="Cashback khi mua online — liên kết tài khoản PayPal" />
        <AppChip icon="📱" name="Walmart App" description="Pickup order → không xếp hàng, giá tương đương" />
      </div>

      <SubLabel>🏷️ Các Ngày Sale Quan Trọng Nhất</SubLabel>
      <EssentialsTable
        columns={["Dịp sale", "Thời điểm", "Nên mua gì"]}
        rows={[
          { cells: [<b key="n">Black Friday</b>, "Thứ 6 sau lễ Thanksgiving (cuối tháng 11)", "TV, điện tử, quần áo — giảm 30–60%"] },
          { cells: [<b key="n">Cyber Monday</b>, "Thứ 2 sau Black Friday", "Amazon, đồ điện tử, online deals"] },
          { cells: [<b key="n">Labor Day</b>, "Thứ 2 đầu tháng 9", "Đồ gia dụng, nệm, xe hơi"] },
          { cells: [<b key="n">Memorial Day</b>, "Thứ 2 cuối tháng 5", "Nệm, xe, đồ ngoại thất"] },
          { cells: [<b key="n">Clearance sau mùa</b>, "Ngay sau Christmas, hè, đông", "Quần áo mùa vừa qua — giảm 50–70%"] },
          { cells: [<b key="n">Prime Day (Amazon)</b>, "Tháng 7", "Đồ điện tử, gia dụng Amazon"] },
        ]}
      />
    </div>
  );
}
