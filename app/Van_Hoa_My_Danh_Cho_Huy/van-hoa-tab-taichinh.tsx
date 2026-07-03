// Tab "Tài Chính" — ported from Van_Hoa_My_Danh_Cho_Huy.html #taichinh.

import { Alert, Card, DataTable, SectionTitle, SubTitle } from "./van-hoa-ui";

export function VanHoaTabTaiChinh() {
  return (
    <div>
      <SectionTitle>💰 Tài Chính Cá Nhân Tại Mỹ</SectionTitle>

      <Alert tone="blue" title="💡 Credit Score — Quan trọng nhất khi mới sang">
        Credit score là &quot;điểm uy tín tài chính&quot; từ 300-850. Mới
        sang = 0 điểm. Cần xây từ đầu. Ảnh hưởng đến: thuê nhà, mua xe trả
        góp, lãi suất vay, thậm chí xin việc một số nơi.
      </Alert>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card
          title="📈 Xây Credit Từ Con Số 0"
          titleColor="text-primary"
          items={[
            "Bước 1: Mở Secured Credit Card (đặt cọc $300-500 làm hạn mức)",
            "Bước 2: Dùng thẻ cho chi tiêu nhỏ (xăng, đồ ăn) mỗi tháng",
            "Bước 3: Trả TOÀN BỘ số dư trước due date mỗi tháng — không thiếu 1 đồng",
            "Bước 4: Sau 6 tháng: credit score ~600-650",
            "Bước 5: Sau 12 tháng: ~700+ — đủ để thuê nhà, mua xe trả góp",
            "Secured card tốt: Discover it Secured, Capital One Secured",
          ]}
        />
        <Card
          title="🚨 Sai Lầm Tài Chính Phổ Biến Nhất"
          titleColor="text-red-600"
          items={[
            "Trả minimum payment credit card → lãi chồng lãi, nợ mãi không hết",
            "Mua xe mới khi chưa có credit → lãi suất 15-25%/năm",
            "Không mua bảo hiểm y tế → 1 lần cấp cứu = $5,000-50,000",
            "Gửi tiền về VN quá nhiều trước khi có quỹ khẩn cấp 3 tháng",
            "Chi tiêu theo kiểu VN — ở Mỹ mọi thứ đều đắt hơn nhiều",
            "Không khai thuế (tax return) — bỏ lỡ tiền hoàn thuế mỗi năm",
          ]}
        />
      </div>

      <SubTitle>Thuế Thu Nhập — Cần Hiểu Cơ Bản</SubTitle>
      <DataTable
        headers={["Loại thuế", "Mức (%)", "Ai thu", "Ghi chú"]}
        rows={[
          ["Federal Income Tax", "10-22%", "Liên bang", "Tự động khấu trừ từ lương (withholding). Nộp tax return tháng 4 hàng năm"],
          ["Indiana State Tax", "3.05%", "Tiểu bang Indiana", "Flat rate — giống nhau cho tất cả mức thu nhập"],
          ["Social Security Tax", "6.2%", "Liên bang", "Đóng để sau này hưởng lương hưu và disability"],
          ["Medicare Tax", "1.45%", "Liên bang", "Bảo hiểm y tế khi về già (65+)"],
          ["Tổng khấu trừ ~", "~22-25%", "—", "Lương gross $3,200 → take-home ~$2,400-2,500"],
        ]}
      />
      <Alert tone="green" title="💸 Tax Refund — Tiền được hoàn lại">
        Nhiều người nộp nhiều hơn thực tế phải đóng → được hoàn lại tiền
        vào tháng 4. Trung bình $1,000-2,000/năm. Dùng TurboTax (free cho
        thu nhập thấp) hoặc nhờ người Việt có kinh nghiệm khai hộ năm đầu.
      </Alert>
    </div>
  );
}
