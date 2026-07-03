// "How to verify" + "report fraud" tables and closing references, ported
// from scam-warning.html's .ref-table sections.

import { Alert, Card, SectionHeading } from "./scam-warning-ui";

export function ScamWarningChecks() {
  return (
    <>
      <SectionHeading>✅ Cách Kiểm Tra Trước Khi Tin</SectionHeading>
      <div className="mb-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Việc cần làm</th>
              <th className="px-3 py-2 font-medium">Cách thực hiện</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                Tra cứu luật sư di trú
              </td>
              <td className="px-3 py-2 text-text-muted">
                Dùng công cụ tìm luật sư của <strong>AILA</strong> (American
                Immigration Lawyers Association) — aila.org — để xác minh
                luật sư có hành nghề hợp pháp.
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                Kiểm tra agency/công ty
              </td>
              <td className="px-3 py-2 text-text-muted">
                Tra tên công ty trên <strong>BBB</strong> (Better Business
                Bureau — bbb.org) để xem đánh giá, khiếu nại, và lịch sử
                hoạt động.
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                Không chuyển tiền cho người lạ
              </td>
              <td className="px-3 py-2 text-text-muted">
                Không bao giờ wire tiền, gửi gift card, hoặc chuyển khoản
                cho người/tổ chức bạn chưa từng gặp hoặc không kiểm tra
                được danh tính.
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                Xác minh form USCIS
              </td>
              <td className="px-3 py-2 text-text-muted">
                Mọi mẫu đơn chính thức đều miễn phí tại{" "}
                <strong>uscis.gov/forms</strong> — không cần mua từ bên thứ
                ba.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold text-text">
                Lưu giữ chứng từ
              </td>
              <td className="px-3 py-2 text-text-muted">
                Luôn giữ lại email, hợp đồng, biên nhận — để có bằng chứng
                nếu cần báo cáo sau này.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading>📞 Báo Cáo Lừa Đảo</SectionHeading>
      <div className="mb-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Cơ quan</th>
              <th className="px-3 py-2 font-medium">Khi nào liên hệ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                FTC (Federal Trade Commission)
              </td>
              <td className="px-3 py-2 text-text-muted">
                reportfraud.ftc.gov — báo cáo lừa đảo tiêu dùng, việc làm
                giả, lừa đảo tài chính nói chung.
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">USCIS</td>
              <td className="px-3 py-2 text-text-muted">
                uscis.gov/report-fraud — báo cáo lừa đảo liên quan hồ sơ di
                trú, giả danh USCIS.
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-3 py-2 font-semibold text-text">
                State Attorney General
              </td>
              <td className="px-3 py-2 text-text-muted">
                Văn phòng Tổng Chưởng Lý (Attorney General) của tiểu bang
                bạn sinh sống — tìm &quot;[tên bang] Attorney General
                consumer protection&quot;.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold text-text">FBI IC3</td>
              <td className="px-3 py-2 text-text-muted">
                ic3.gov — báo cáo lừa đảo qua mạng (internet crime), bao
                gồm lừa đảo chuyển tiền online.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Alert tone="blue" icon="🔗">
        Xem thêm:{" "}
        <a href="/agency-guide" className="text-primary hover:underline">
          Hướng Dẫn Chọn Agency
        </a>{" "}
        ·{" "}
        <a href="/remittance-guide" className="text-primary hover:underline">
          Gửi Tiền Về VN
        </a>{" "}
        ·{" "}
        <a href="/jobs" className="text-primary hover:underline">
          Ngành Nghề &amp; Hãng
        </a>
      </Alert>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          📚 Nguồn tham khảo chính thức
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          <a
            href="https://consumer.ftc.gov/articles/how-avoid-scam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            FTC — Cách nhận biết và tránh lừa đảo
          </a>{" "}
          — hướng dẫn chính thức của Ủy ban Thương mại Liên bang về các dấu
          hiệu lừa đảo phổ biến.
          <br />
          <a
            href="https://www.uscis.gov/avoid-scams"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            USCIS — Tránh lừa đảo nhập cư (Avoid Scams)
          </a>{" "}
          — cảnh báo về các hình thức lừa đảo liên quan đến hồ sơ di trú.
        </p>
      </Card>
    </>
  );
}
