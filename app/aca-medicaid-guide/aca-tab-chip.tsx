// Tab 4: "CHIP Cho Con" — ported from aca-medicaid-guide.html #tab-chip.

import { Alert, Card, SectionHeading } from "./aca-medicaid-ui";

export function AcaTabChip() {
  return (
    <div>
      <SectionHeading>👶 Đăng Ký Bảo Hiểm Cho Con — CHIP</SectionHeading>
      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          CHIP — Children&apos;s Health Insurance Program
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Bảo hiểm y tế giá thấp hoặc miễn phí cho trẻ em dưới 19 tuổi. Ở{" "}
          <strong className="text-accent">
            hầu hết tiểu bang, CHIP cho trẻ em CÓ THẺ XANH không bị quy
            tắc chờ 5 năm
          </strong>{" "}
          — khác với Medicaid cho người lớn. Nếu con sinh tại Mỹ, con là
          công dân Mỹ và đủ điều kiện ngay.
        </p>
      </Card>

      <Alert tone="blue" icon="🔗">
        Xem bảng giới hạn thu nhập CHIP theo % FPL và điều kiện đủ tiêu
        chuẩn đầy đủ tại{" "}
        <a href="/healthcare#medicaid" className="text-primary hover:underline">
          <strong>Y Tế &amp; Bảo Hiểm → Medicaid &amp; CHIP</strong>
        </a>
        . Đăng ký qua <em>healthcare.gov</em> hoặc Medicaid office của
        tiểu bang.
      </Alert>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Liên Quan: Sau Khi Đến Mỹ
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Checklist công việc cần làm trong tháng đầu tiên (bao gồm đăng
          ký bảo hiểm cho con) có tại{" "}
          <a href="/after-arrival" className="text-primary hover:underline">
            Sau Khi Đến Mỹ
          </a>
          .
        </p>
      </Card>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          📚 Nguồn tham khảo chính thức
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          <a
            href="https://www.healthcare.gov/immigrants/immigration-status/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            HealthCare.gov — Tình trạng nhập cư &amp; bảo hiểm
          </a>
          : hướng dẫn chính thức về điều kiện tham gia ACA Marketplace
          theo từng loại tình trạng nhập cư (thẻ xanh, hồ sơ pending...).
          <br />
          <a
            href="https://www.medicaid.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Medicaid.gov
          </a>
          : thông tin về Medicaid &amp; CHIP, quy tắc chờ 5 năm cho người
          mới có thẻ xanh, và điều kiện theo từng tiểu bang.
        </p>
      </Card>
    </div>
  );
}
