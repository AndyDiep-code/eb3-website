// Tab 1: "ACA Marketplace" — ported from aca-medicaid-guide.html
// #tab-marketplace.

import { Alert, Card, SectionHeading, SubLabel } from "./aca-medicaid-ui";

export function AcaTabMarketplace() {
  return (
    <div>
      <SectionHeading>📋 Marketplace (ACA) — Đủ Điều Kiện Ngay</SectionHeading>
      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Tại Sao LPR Mới Nên Quan Tâm ACA Marketplace?
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Permanent Resident (thẻ xanh) đủ điều kiện mua bảo hiểm qua ACA
          Marketplace ngay từ ngày đầu tiên — không cần đợi 5 năm như
          Medicaid, không cần đợi bảo hiểm từ công ty. Đây là cách lấp
          khoảng trống bảo hiểm trong giai đoạn đầu mới đến Mỹ.
        </p>
      </Card>

      <SubLabel>Cách Đăng Ký</SubLabel>
      <ol className="mb-3.5 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-muted">
        <li>
          Vào{" "}
          <a
            href="https://www.healthcare.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            healthcare.gov
          </a>{" "}
          (hoặc website Marketplace của tiểu bang nếu có) và tạo tài
          khoản.
        </li>
        <li>
          <strong className="text-text">Open Enrollment</strong> thường từ{" "}
          <strong className="text-text">1/11 đến 15/1</strong> hàng năm —
          đăng ký trong khoảng này cho bảo hiểm năm sau.
        </li>
        <li>
          Nếu mới có thẻ xanh hoặc mới chuyển việc/mất bảo hiểm, bạn có{" "}
          <strong className="text-text">
            Special Enrollment Period (SEP)
          </strong>{" "}
          — 60 ngày để đăng ký ngoài Open Enrollment.
        </li>
        <li>
          Điền thu nhập gia đình ước tính cho năm tới — hệ thống tự tính
          trợ cấp (subsidy) bạn đủ điều kiện.
        </li>
      </ol>

      <SubLabel>Trợ Cấp Premium Tax Credit (Subsidy)</SubLabel>
      <p className="mb-2.5 text-sm leading-relaxed text-text-muted">
        Trợ cấp giảm trực tiếp phí bảo hiểm hàng tháng (premium), dựa trên
        thu nhập gia đình so với Federal Poverty Level (FPL):
      </p>
      <div className="mb-3.5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Thu Nhập (% FPL)</th>
              <th className="px-3 py-2 font-medium">Mức Trợ Cấp</th>
              <th className="px-3 py-2 font-medium">Ví Dụ Thực Tế</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                100–150% FPL
              </td>
              <td className="px-3 py-2 text-accent">
                Trợ cấp cao nhất — premium gần như $0
              </td>
              <td className="px-3 py-2 text-text-muted">
                Gia đình thu nhập thấp, mới đi làm
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                150–250% FPL
              </td>
              <td className="px-3 py-2 text-accent">
                Trợ cấp đáng kể, giảm 50–80% premium
              </td>
              <td className="px-3 py-2 text-text-muted">
                Đa số công nhân EB-3 mới sang
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                250–400% FPL
              </td>
              <td className="px-3 py-2 text-secondary">
                Trợ cấp một phần, giảm premium
              </td>
              <td className="px-3 py-2 text-text-muted">
                Gia đình có 2 người đi làm
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold text-text">
                Trên 400% FPL
              </td>
              <td className="px-3 py-2 text-primary">
                Vẫn có thể đủ điều kiện trợ cấp một phần (tùy năm)
              </td>
              <td className="px-3 py-2 text-text-muted">
                Thu nhập cao hơn trung bình
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Alert tone="blue" icon="💡">
        Khi đã đi làm và có bảo hiểm từ employer, bạn có thể chuyển từ ACA
        Marketplace sang bảo hiểm công ty (thường rẻ hơn vì employer trả
        một phần). Xem chi tiết đọc hiểu bảo hiểm employer tại{" "}
        <a href="/healthcare" className="text-primary hover:underline">
          Y Tế &amp; Bảo Hiểm
        </a>
        .
      </Alert>
    </div>
  );
}
