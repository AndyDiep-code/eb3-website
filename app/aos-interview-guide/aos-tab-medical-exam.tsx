// Tab 2: "Khám I-693" — ported from aos-interview-guide.html #tab-i693.

import { Alert, Card, SectionHeading, SubLabel } from "./aos-ui";

export function AosTabMedicalExam() {
  return (
    <div>
      <SectionHeading>🩺 Khám Sức Khỏe I-693 (Civil Surgeon)</SectionHeading>

      <Alert tone="yellow" icon="💰">
        Chi phí khám I-693 thường <strong>$200–$500/người</strong>, tùy bác
        sĩ và tiểu bang — không bao gồm trong phí nộp đơn USCIS, thanh toán
        trực tiếp cho civil surgeon.
      </Alert>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Civil Surgeon Là Ai? Tìm Ở Đâu?
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Civil Surgeon là bác sĩ được USCIS công nhận để thực hiện khám sức
          khỏe di trú (KHÔNG phải bác sĩ gia đình thông thường). Tìm danh
          sách civil surgeon gần bạn bằng công cụ &quot;Find a Civil
          Surgeon&quot; trên{" "}
          <a
            href="https://www.uscis.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            uscis.gov
          </a>
          .
        </p>
      </Card>

      <SubLabel>Quy Trình Khám</SubLabel>
      <ol className="mb-3.5 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-text-muted">
        <li>
          Mang theo hộ chiếu, hồ sơ tiêm chủng (nếu có), và kính/giấy tờ
          thuốc đang dùng.
        </li>
        <li>
          Civil surgeon kiểm tra thể chất tổng quát, xét nghiệm lao (TB
          test), và xem lại lịch sử tiêm chủng theo yêu cầu CDC.
        </li>
        <li>
          Thiếu vắc-xin nào sẽ được tiêm bổ sung ngay tại buổi khám (có thể
          tính phí riêng).
        </li>
        <li>
          Kết quả được đóng trong{" "}
          <strong className="text-text">phong bì kín (sealed envelope)</strong>{" "}
          — KHÔNG tự mở — nộp kèm I-485 hoặc mang đến buổi phỏng vấn theo
          hướng dẫn của USCIS.
        </li>
      </ol>
    </div>
  );
}
