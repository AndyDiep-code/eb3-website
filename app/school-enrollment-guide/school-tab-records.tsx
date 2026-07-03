// Tab 4: "Hồ Sơ Từ Việt Nam" — ported from school-enrollment-guide.html #tab-records.

import { Alert, Card, CardTitle } from "./school-enrollment-ui";

export function SchoolTabRecords() {
  return (
    <div>
      <h2 className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
        📜 Chuyển Hồ Sơ Học Tập Từ Việt Nam
      </h2>

      <Card>
        <CardTitle>Dịch Thuật &amp; Công Chứng Học Bạ</CardTitle>
        <p className="text-sm leading-relaxed text-text-muted">
          Học bạ, bảng điểm, và giấy chứng nhận tốt nghiệp cần được dịch
          sang tiếng Anh bởi dịch vụ dịch thuật có chứng nhận (certified
          translation). Một số học khu chấp nhận bản dịch tự làm kèm bản
          gốc, nhưng nhiều nơi yêu cầu dịch thuật viên có chứng chỉ.
        </p>
      </Card>

      <Card>
        <CardTitle>
          Đánh Giá Văn Bằng (Credential Evaluation) — Cho Học Sinh Cấp 3
        </CardTitle>
        <p className="text-sm leading-relaxed text-text-muted">
          Học sinh chuyển vào lớp 9–12 đôi khi cần dịch vụ đánh giá văn
          bằng nước ngoài (ví dụ: WES — World Education Services, ECE —
          Educational Credential Evaluators) để quy đổi số năm học và tín
          chỉ tương đương — đặc biệt quan trọng nếu con sắp tốt nghiệp và
          nộp đơn vào đại học.
        </p>
      </Card>

      <Alert tone="blue" icon="🔗">
        Thông tin về bảo lãnh con cái theo diện gia đình (đi cùng hoặc theo
        sau người bảo lãnh chính EB-3) có tại{" "}
        <a href="/family-petition" className="font-bold text-primary">
          Bảo Lãnh Gia Đình
        </a>
        .
      </Alert>

      <Alert tone="green" icon="✅">
        Không có học bạ đầy đủ KHÔNG phải lý do để bị từ chối nhập học.
        Trường sẽ dùng bài kiểm tra xếp lớp và tuổi của con để xếp lớp tạm
        thời, sau đó điều chỉnh khi có thêm thông tin.
      </Alert>
    </div>
  );
}
