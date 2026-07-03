// Tab 2: "Việc Tương Tự" (same-or-similar SOC) — ported from
// ac21-portability.html #tab-similar.

import { SIMILAR_JOB_EXAMPLES, SOC_GROUPS } from "./ac21-data";
import { Alert, Card, SectionHeading, SubLabel } from "./ac21-ui";

export function Ac21TabSimilar() {
  return (
    <div>
      <SectionHeading>🔍 Thế Nào Là Việc &quot;Same or Similar&quot;</SectionHeading>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          USCIS Xác Định Như Thế Nào?
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          USCIS dùng mã nghề nghiệp{" "}
          <strong className="text-primary">
            SOC (Standard Occupational Classification)
          </strong>{" "}
          để so sánh. &quot;Same or similar&quot; nghĩa là công việc mới
          thuộc cùng nhóm SOC chính, hoặc có kỹ năng, điều kiện, và mức
          lương tương đương. Không nhất thiết phải cùng tên công việc.
        </p>
      </Card>

      <SubLabel>Ví Dụ Thực Tế Cho Công Nhân EB-3</SubLabel>
      <div className="mb-3 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Việc cũ (trên I-140)</th>
              <th className="px-3 py-2 font-medium">Việc muốn đổi sang</th>
              <th className="px-3 py-2 font-medium">Kết quả</th>
              <th className="px-3 py-2 font-medium">Lý do</th>
            </tr>
          </thead>
          <tbody>
            {SIMILAR_JOB_EXAMPLES.map((row) => (
              <tr key={row.oldJob} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-semibold text-text">{row.oldJob}</td>
                <td className="px-3 py-2 text-text">{row.newJob}</td>
                <td className={`px-3 py-2 font-semibold ${row.resultColor}`}>{row.result}</td>
                <td className="px-3 py-2 text-text-muted">{row.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubLabel>Cách Kiểm Tra Mã SOC Của Bạn</SubLabel>
      <Card>
        <ol className="space-y-2 text-sm leading-relaxed text-text-muted">
          <li>
            <strong className="text-primary">Bước 1:</strong> Xem mã SOC trên
            I-140 approval notice hoặc PERM application của bạn (employer có
            bản sao)
          </li>
          <li>
            <strong className="text-primary">Bước 2:</strong> Tìm mã SOC của
            việc mới tại <strong className="text-text">bls.gov/soc</strong>{" "}
            (Bureau of Labor Statistics)
          </li>
          <li>
            <strong className="text-primary">Bước 3:</strong> So sánh 2 mã —
            nếu 2 chữ số đầu giống nhau, khả năng cao là &quot;similar&quot;
          </li>
          <li>
            <strong className="text-primary">Bước 4:</strong> Nếu không
            chắc, hỏi luật sư immigration hoặc Legal Aid miễn phí
          </li>
        </ol>
      </Card>

      <Alert tone="blue" icon="💡">
        <strong>Mức lương không cần phải bằng nhau.</strong> Việc mới có thể
        trả cao hơn hoặc thấp hơn việc cũ — USCIS không yêu cầu mức lương
        phải tương đương. Điều quan trọng là loại công việc, không phải mức
        lương.
      </Alert>

      <SubLabel>Nhóm SOC Phổ Biến Trong EB-3</SubLabel>
      <div className="mb-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Mã SOC</th>
              <th className="px-3 py-2 font-medium">Nhóm nghề</th>
              <th className="px-3 py-2 font-medium">Ví dụ việc làm</th>
            </tr>
          </thead>
          <tbody>
            {SOC_GROUPS.map((row) => (
              <tr key={row.code} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-semibold text-text">{row.code}</td>
                <td className="px-3 py-2 text-text">{row.group}</td>
                <td className="px-3 py-2 text-text-muted">{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
