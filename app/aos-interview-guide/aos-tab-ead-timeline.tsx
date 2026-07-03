// Tab 4: "EAD/AP Timeline" — ported from aos-interview-guide.html #tab-ead.

import { Alert, Card, SectionHeading } from "./aos-ui";

export function AosTabEadTimeline() {
  return (
    <div>
      <SectionHeading>⏱️ Timeline EAD/Advance Parole</SectionHeading>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Combo Card — Vừa Làm Việc Vừa Đi Lại Khi Hồ Sơ Đang Chờ
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Sau khi nộp I-485, bạn có thể nộp kèm{" "}
          <strong className="text-text">
            I-765 (EAD — giấy phép làm việc)
          </strong>{" "}
          và{" "}
          <strong className="text-text">
            I-131 (Advance Parole — giấy phép tái nhập cảnh)
          </strong>
          . Hai giấy này thường được cấp chung dưới dạng &quot;combo
          card&quot;, cho phép vừa đi làm vừa ra/vào Mỹ trong khi chờ thẻ
          xanh.
        </p>
      </Card>

      <Alert tone="yellow" icon="⏳">
        Thời gian xử lý combo card hiện khoảng <strong>~6 tháng</strong> từ
        ngày nộp I-485 — thời gian thực tế thay đổi theo trung tâm xử lý
        (service center) và năm nộp đơn. Theo dõi tình trạng hồ sơ tại{" "}
        <a
          href="https://egov.uscis.gov/casestatus/landing.do"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-secondary"
        >
          USCIS Case Status
        </a>
        .
      </Alert>

      <Alert tone="red" icon="🚨">
        <strong>Lưu ý quan trọng:</strong> KHÔNG xuất cảnh khỏi Mỹ khi I-485
        đang chờ xử lý nếu chưa có Advance Parole được cấp — rời Mỹ không
        có AP có thể bị coi là tự bỏ đơn (abandonment).
      </Alert>

      <Alert tone="blue" icon="🔗">
        Nếu đang chờ I-485 và muốn đổi việc, xem điều kiện &quot;same or
        similar&quot; job theo luật AC21 tại{" "}
        <a href="/ac21-portability" className="font-bold text-primary">
          Đổi Việc AC21
        </a>
        .
      </Alert>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          📚 Nguồn tham khảo chính thức
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          <a
            href="https://www.uscis.gov/green-card/green-card-processes-and-procedures/adjustment-of-status"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            USCIS — Adjustment of Status
          </a>
          : quy trình I-485 chính thức, các bước xử lý, và yêu cầu phỏng
          vấn.
          <br />
          <a
            href="https://www.uscis.gov/i-693"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            USCIS — Form I-693
          </a>
          : thông tin về khám sức khỏe (medical exam) bắt buộc, danh sách
          bác sĩ được chỉ định (civil surgeon).
        </p>
      </Card>
    </div>
  );
}
