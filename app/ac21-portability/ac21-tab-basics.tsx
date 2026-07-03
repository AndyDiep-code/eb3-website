// Tab 1: "AC21 Là Gì" — ported from ac21-portability.html #tab-basics.

import { Alert, Card, SectionHeading, SubLabel, TimelineStep } from "./ac21-ui";

export function Ac21TabBasics() {
  return (
    <div>
      <SectionHeading>📋 AC21 Là Gì &amp; Ai Được Áp Dụng</SectionHeading>

      <Card>
        <span className="mb-2 inline-block rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
          AMERICAN COMPETITIVENESS IN THE 21ST CENTURY ACT
        </span>
        <h3 className="mb-1.5 text-sm font-bold text-text">Luật AC21 Nói Gì?</h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Đạo luật năm 2000 bảo vệ người lao động nhập cư đang chờ thẻ xanh.
          Trước AC21, nếu bạn rời employer bảo lãnh, bạn mất toàn bộ hồ sơ.
          AC21 thay đổi điều đó: sau khi{" "}
          <strong className="text-primary">I-485 chờ đủ 180 ngày</strong>,
          bạn có thể chuyển sang việc tương tự{" "}
          <strong className="text-accent">mà không mất hồ sơ</strong>.
        </p>
      </Card>

      <SubLabel>Điều Kiện Áp Dụng AC21</SubLabel>
      <Card>
        <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
          <li>
            <span className="font-bold text-accent">✅</span>{" "}
            <strong className="text-text">
              I-485 đã nộp và đang chờ ít nhất 180 ngày
            </strong>{" "}
            (tính từ ngày USCIS nhận đơn, không phải ngày bạn nộp)
          </li>
          <li>
            <span className="font-bold text-accent">✅</span>{" "}
            <strong className="text-text">I-140 của bạn đã được approve</strong>{" "}
            trước khi đổi việc
          </li>
          <li>
            <span className="font-bold text-accent">✅</span>{" "}
            <strong className="text-text">
              Việc mới phải &quot;same or similar&quot;
            </strong>{" "}
            theo phân loại nghề nghiệp SOC
          </li>
          <li>
            <span className="font-bold text-accent">✅</span>{" "}
            <strong className="text-text">Việc mới phải là full-time</strong>{" "}
            (hoặc ít nhất tương đương part-time nếu I-140 dựa trên part-time)
          </li>
          <li>
            <span className="font-bold text-secondary">⚠️</span>{" "}
            <strong className="text-text">
              I-140 bị rút sau khi I-485 chờ 180 ngày+
            </strong>{" "}
            vẫn OK — I-140 vẫn còn hiệu lực cho AC21
          </li>
        </ul>
      </Card>

      <SubLabel>Mốc Thời Gian Quan Trọng</SubLabel>
      <div className="mb-3 space-y-3">
        <TimelineStep dot="0" dotColor="bg-primary" title="Ngày nộp I-485">
          USCIS gửi Receipt Notice (I-797). Ngày trên I-797 là ngày bắt đầu
          đếm 180 ngày.
        </TimelineStep>
        <TimelineStep dot="90" dotColor="bg-secondary" title="Ngày 90-120: Biometrics">
          USCIS gửi giấy hẹn lấy dấu vân tay. Đây không phải mốc AC21.
        </TimelineStep>
        <TimelineStep dot="180" dotColor="bg-accent" title="Ngày 180+: AC21 kích hoạt" emphasis>
          Bạn có thể đổi sang việc tương tự. Nên nộp I-485 Supplement J để
          thông báo cho USCIS.
        </TimelineStep>
        <TimelineStep dot="?" dotColor="bg-primary" title="Interview / Approval">
          USCIS sẽ hỏi về việc làm hiện tại. Supplement J giúp xác nhận bạn
          đang làm việc tương tự hợp lệ.
        </TimelineStep>
      </div>

      <div className="mb-3 rounded-card border border-accent/40 bg-bg p-4">
        <span className="mb-2 inline-block rounded-lg bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
          QUAN TRỌNG
        </span>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          I-140 Không Bị Hủy Kể Cả Khi Employer Rút
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Nếu employer rút I-140 <strong className="text-accent">sau khi</strong>{" "}
          I-485 đã chờ 180+ ngày, I-140 vẫn giữ nguyên hiệu lực cho mục đích
          Priority Date và AC21. Employer không thể dùng việc rút I-140 để
          trừng phạt bạn sau mốc 180 ngày.
        </p>
      </div>

      <Alert tone="red" icon="❌">
        <strong>KHÔNG áp dụng AC21 nếu:</strong> I-485 chưa đủ 180 ngày, hoặc
        I-140 bị rút trước mốc 180 ngày, hoặc I-140 bị thu hồi do gian
        lận/sai sự thật. Đổi việc trước 180 ngày có thể làm USCIS từ chối
        I-485.
      </Alert>
    </div>
  );
}
