// Tab 2: "Medicaid/CHIP" — ported from aca-medicaid-guide.html
// #tab-medicaid.

import { Alert, Card, SectionHeading } from "./aca-medicaid-ui";

export function AcaTabMedicaid() {
  return (
    <div>
      <SectionHeading>
        🏛️ Medicaid &amp; CHIP — Tóm Tắt Quy Tắc 5 Năm
      </SectionHeading>

      <Alert tone="yellow" icon="⚠️">
        <strong>Quy tắc 5 năm (5-Year Bar):</strong> Đa số người có thẻ
        xanh phải đợi <strong>5 năm sau khi có thẻ xanh</strong> mới đủ
        điều kiện nhận Medicaid liên bang. Một số tiểu bang (California,
        New York, Washington...) dùng ngân sách riêng để cấp Medicaid sớm
        hơn, không áp dụng quy tắc này.
      </Alert>

      <Alert tone="blue" icon="🔗">
        Bảng đầy đủ các tiểu bang có ngoại lệ 5-year bar, giới hạn thu
        nhập Medicaid/CHIP theo % FPL, và giải pháp y tế thay thế (FQHC,
        free clinic, urgent care) đã có tại{" "}
        <a href="/healthcare#medicaid" className="text-primary hover:underline">
          <strong>Y Tế &amp; Bảo Hiểm → Medicaid &amp; CHIP</strong>
        </a>{" "}
        — không lặp lại ở đây để tránh trùng lặp và lỗi thời.
      </Alert>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Điểm Quan Trọng Cần Nhớ
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Trong khi chờ đủ 5 năm cho Medicaid, ACA Marketplace (tab &quot;ACA
          Marketplace&quot;) là lựa chọn bảo hiểm khả dụng ngay — đừng để
          khoảng trống bảo hiểm trong 5 năm đó.
        </p>
      </Card>
    </div>
  );
}
