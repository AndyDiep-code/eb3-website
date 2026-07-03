// Tab 1: "Giấy Tờ Cần Chuẩn Bị" — ported from school-enrollment-guide.html #tab-docs.

import { Alert, Card, CardTitle } from "./school-enrollment-ui";

export function SchoolTabDocs() {
  return (
    <div>
      <h2 className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
        📄 Giấy Tờ Cần Chuẩn Bị Khi Đăng Ký
      </h2>

      <Card>
        <CardTitle>1. Giấy Tờ Chứng Minh Nơi Cư Trú (Proof of Residency)</CardTitle>
        <p className="text-sm leading-relaxed text-text-muted">
          Hợp đồng thuê nhà (lease), hóa đơn điện/nước/internet, hoặc thư
          ngân hàng có địa chỉ nhà bạn — dùng để xác định trường thuộc khu
          vực (school district) nào.
        </p>
      </Card>

      <Card>
        <CardTitle>2. Hồ Sơ Tiêm Chủng (Immunization Records)</CardTitle>
        <p className="text-sm leading-relaxed text-text-muted">
          Mỗi tiểu bang có danh sách vắc-xin bắt buộc riêng cho học sinh.
          Mang sổ tiêm chủng từ Việt Nam đến bác sĩ nhi (pediatrician) để
          đối chiếu — có thể cần tiêm bổ sung hoặc xét nghiệm máu để xác
          nhận miễn dịch (titer test) thay vì tiêm lại.
        </p>
      </Card>

      <Card>
        <CardTitle>3. Giấy Khai Sinh + Bản Dịch Công Chứng</CardTitle>
        <p className="text-sm leading-relaxed text-text-muted">
          Bản gốc giấy khai sinh (birth certificate) và bản dịch tiếng Anh
          có công chứng (certified translation) — dùng để xác minh tuổi và
          tên hợp pháp của con.
        </p>
      </Card>

      <Card>
        <CardTitle>4. Học Bạ / Bảng Điểm Từ Trường Cũ</CardTitle>
        <p className="text-sm leading-relaxed text-text-muted">
          Học bạ, bảng điểm, hoặc thư xác nhận lớp học gần nhất từ trường ở
          Việt Nam — xem chi tiết về dịch thuật và xếp lớp ở tab &quot;Hồ Sơ
          Từ Việt Nam&quot;.
        </p>
      </Card>

      <Alert tone="blue" icon="💡">
        Không có đủ giấy tờ vẫn có thể đăng ký — luật liên bang
        (McKinney-Vento Act) yêu cầu trường phải nhận học sinh ngay cả khi
        thiếu hồ sơ, và hỗ trợ gia đình bổ sung sau.
      </Alert>
    </div>
  );
}
