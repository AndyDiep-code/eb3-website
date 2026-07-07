// Tab 4: "Thuốc" — ported from healthcare.html #medicine.

import { PHARMACY_COMPARISON } from "./healthcare-data";
import { Alert, DrugCard, InfoCard, SectionHeading, StepItem, Steps, SubLabel } from "./healthcare-ui";

export function HealthcareTabMedicine() {
  return (
    <div>
      <SectionHeading>💊 Thuốc &amp; Chi Phí</SectionHeading>

      <Alert tone="green" icon="💡">
        <strong>GoodRx</strong> — ứng dụng miễn phí giúp giảm giá thuốc tới
        80% tại nhà thuốc Mỹ. Không cần bảo hiểm. Nhiều trường hợp GoodRx rẻ
        hơn dùng bảo hiểm. Tải tại goodrx.com hoặc App Store.
      </Alert>

      <SubLabel>💊 Generic vs Brand Name — Tiết Kiệm Lớn</SubLabel>
      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <DrugCard
          type="Brand Name"
          typeColor="text-red-500"
          name="Lipitor® (Atorvastatin)"
          price="$250–400"
          priceColor="text-red-500"
          note="30 viên. Cùng hoạt chất, cùng hiệu quả."
        />
        <DrugCard
          type="Generic ✅ CHỌN CÁI NÀY"
          typeColor="text-accent"
          name="Atorvastatin (generic)"
          price="$10–25"
          priceColor="text-accent"
          note="Với GoodRx tại Costco/Walmart: ~$10/tháng."
          highlight
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <DrugCard
          type="Brand Name"
          typeColor="text-red-500"
          name="Advil® / Motrin®"
          price="$12–18"
          priceColor="text-red-500"
          note="100 viên Ibuprofen 200mg."
        />
        <DrugCard
          type="Generic ✅ CHỌN CÁI NÀY"
          typeColor="text-accent"
          name="Ibuprofen (Walmart brand)"
          price="$4–6"
          priceColor="text-accent"
          note="100 viên. Cùng hàm lượng, an toàn như nhau."
          highlight
        />
      </div>

      <SubLabel>🏪 So Sánh Nhà Thuốc</SubLabel>
      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Nhà thuốc</th>
              <th className="px-3 py-2 font-medium">Generic rẻ nhất</th>
              <th className="px-3 py-2 font-medium">$4 Generic List</th>
              <th className="px-3 py-2 font-medium">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {PHARMACY_COMPARISON.map((row) => (
              <tr key={row.name} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-semibold text-text">{row.name}</td>
                <td className={`px-3 py-2 ${row.cheapestColor}`}>{row.cheapest}</td>
                <td className={`px-3 py-2 ${row.fourDollarColor}`}>{row.fourDollarList}</td>
                <td className="px-3 py-2 text-text-muted">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubLabel>💊 Các Loại Thuốc Không Cần Đơn (OTC) Nên Có Sẵn</SubLabel>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard
          title="🏠 Tủ Thuốc Gia Đình Cơ Bản"
          titleColor="text-teal-600"
          items={[
            <>
              <strong className="text-text">Ibuprofen (Advil generic):</strong>{" "}
              <em className="text-purple-500">Đau, sốt, viêm</em>
            </>,
            <>
              <strong className="text-text">
                Acetaminophen (Tylenol generic):
              </strong>{" "}
              <em className="text-purple-500">
                Đau, sốt — an toàn hơn với dạ dày
              </em>
            </>,
            <>
              <strong className="text-text">
                Diphenhydramine (Benadryl generic):
              </strong>{" "}
              <em className="text-purple-500">Dị ứng, ngủ</em>
            </>,
            <>
              <strong className="text-text">
                Loratadine (Claritin generic):
              </strong>{" "}
              <em className="text-purple-500">Dị ứng không buồn ngủ</em>
            </>,
            <>
              <strong className="text-text">Antacid (Tums/Rolaids):</strong>{" "}
              <em className="text-purple-500">Đau dạ dày, ợ chua</em>
            </>,
            <>
              <strong className="text-text">Hydrocortisone cream 1%:</strong>{" "}
              <em className="text-purple-500">Ngứa, dị ứng da</em>
            </>,
            <>
              <strong className="text-text">
                Băng cứu thương (First aid kit):
              </strong>{" "}
              <em className="text-purple-500">$15 tại Walmart</em>
            </>,
          ]}
        />
        <InfoCard
          title="⚠️ Quan Trọng Về Thuốc"
          titleColor="text-secondary"
          items={[
            <>
              Thuốc kháng sinh (antibiotics){" "}
              <em className="text-purple-500">BẮT BUỘC</em> cần đơn bác sĩ
            </>,
            "Không mua thuốc kháng sinh qua mạng — nguy hiểm và bất hợp pháp",
            "Thuốc từ VN mang sang: kiểm tra CBP rules, nhiều loại không được nhập",
            "Khai báo với bác sĩ tất cả thuốc đang uống kể cả thảo dược VN",
            "Thuốc hết hạn → bỏ đúng cách tại nhà thuốc (take-back program)",
          ]}
        />
      </div>

      <SubLabel>📱 Cách Dùng GoodRx</SubLabel>
      <Steps>
        <StepItem num={1}>
          <strong className="text-text">Tải app GoodRx</strong> (miễn phí)
          hoặc vào goodrx.com. Không cần đăng ký — dùng ngay.
        </StepItem>
        <StepItem num={2}>
          <strong className="text-text">Nhập tên thuốc</strong> bác sĩ kê,
          liều lượng, số ngày dùng. GoodRx hiển thị giá tại mỗi nhà thuốc
          gần bạn.
        </StepItem>
        <StepItem num={3}>
          <strong className="text-text">Chọn nhà thuốc rẻ nhất</strong> rồi
          bấm &quot;Get Coupon&quot;. GoodRx tạo coupon (mã QR hoặc số
          BIN/PCN).
        </StepItem>
        <StepItem num={4}>
          <strong className="text-text">Đưa coupon cho dược sĩ</strong> khi
          mua thuốc. Họ nhập mã vào hệ thống → bạn trả giá GoodRx thay vì
          giá niêm yết.
        </StepItem>
        <StepItem num={5}>
          <strong className="text-text">
            So sánh GoodRx với copay bảo hiểm
          </strong>{" "}
          — đôi khi GoodRx rẻ hơn dùng bảo hiểm. Dùng cái nào rẻ hơn.
        </StepItem>
      </Steps>
    </div>
  );
}
