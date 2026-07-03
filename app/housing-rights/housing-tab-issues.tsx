// Tab 4: "Khi Có Vấn Đề" — ported from housing-rights.html #tab-issues.

import { SUPPORT_CONTACTS } from "./housing-data";
import { Alert, Badge, Card, SectionHeading, StepRow, SubLabel } from "./housing-ui";

export function HousingTabIssues() {
  return (
    <div>
      <SectionHeading>🔧 Xử Lý Khi Có Vấn Đề Với Chủ Nhà</SectionHeading>

      <SubLabel>Vấn Đề 1: Chủ Nhà Không Chịu Sửa Chữa</SubLabel>
      <Card>
        <StepRow num={1}>
          <strong className="text-text">Yêu cầu bằng văn bản</strong> — gửi
          SMS hoặc email mô tả vấn đề, ngày yêu cầu, và thời hạn sửa. Lưu
          lại.
        </StepRow>
        <StepRow num={2}>
          <strong className="text-text">Chờ &quot;reasonable time&quot;</strong>{" "}
          — thường 14-30 ngày tùy theo mức độ khẩn cấp (máy lạnh hỏng giữa hè
          = khẩn cấp hơn tường bị nứt nhỏ).
        </StepRow>
        <StepRow num={3}>
          <strong className="text-text">
            Báo cáo lên Housing Code Enforcement
          </strong>{" "}
          — mỗi thành phố/quận có cơ quan này. Tìm &quot;housing code
          enforcement + [tên thành phố]&quot; trên Google.
        </StepRow>
        <StepRow num={4}>
          <strong className="text-text">Rent escrow</strong> — một số bang
          (PA, MD) cho phép bạn giữ tiền thuê trong tài khoản escrow cho đến
          khi chủ nhà sửa. Cần tư vấn Legal Aid trước khi làm.
        </StepRow>
      </Card>

      <SubLabel>Vấn Đề 2: Nhận Eviction Notice (Thông Báo Đuổi)</SubLabel>
      <Card borderColor="border-secondary/40">
        <Badge tone="yellow">ĐỪNG HOẢNG LOẠN — BẠN CÓ THỜI GIAN</Badge>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          <strong className="text-secondary">
            Các loại eviction notice phổ biến:
          </strong>
          <br />
          • <strong>Pay or Quit</strong> — trả tiền thuê còn nợ trong X ngày
          hoặc phải ra
          <br />
          • <strong>Cure or Quit</strong> — sửa vi phạm hợp đồng trong X
          ngày hoặc phải ra
          <br />
          • <strong>Unconditional Quit</strong> — phải ra không có điều
          kiện (hiếm, thường vi phạm nghiêm trọng)
          <br />
          <br />
          <strong className="text-secondary">
            Quy trình eviction HỢP PHÁP bắt buộc phải qua tòa án.
          </strong>{" "}
          Chủ nhà không thể tự đuổi bạn — họ phải nộp đơn, bạn được thông
          báo, và có phiên điều trần. Trung bình 30-90 ngày từ notice đến khi
          phải ra.
        </p>
      </Card>
      <Alert tone="red" icon="⚠️">
        <strong>Nếu nhận eviction notice:</strong> Liên hệ Legal Aid ngay
        lập tức. Đừng bỏ nhà không đấu tranh. Có nhiều trường hợp eviction
        không hợp lệ về mặt thủ tục — Legal Aid có thể giúp bạn ở lại thêm
        vài tháng hoặc thương lượng.
      </Alert>

      <SubLabel>Vấn Đề 3: Chủ Nhà Không Trả Lại Tiền Cọc</SubLabel>
      <Card>
        <StepRow num={1}>
          Gửi demand letter bằng certified mail: yêu cầu trả lại cọc trong
          14 ngày, nêu điều khoản bang nếu biết.
        </StepRow>
        <StepRow num={2}>
          Nếu không phản hồi, nộp đơn tại{" "}
          <strong className="text-primary">Small Claims Court</strong> —
          không cần luật sư, phí nộp $30-100.
        </StepRow>
        <StepRow num={3}>
          Mang theo: ảnh chụp trước khi dọn vào, receipts, hợp đồng, bằng
          chứng giao tiếp với chủ nhà.
        </StepRow>
      </Card>

      <SubLabel>Liên Hệ Hỗ Trợ</SubLabel>
      <table className="mb-3 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
            <th className="px-3 py-2 font-medium">Tổ Chức</th>
            <th className="px-3 py-2 font-medium">Cách Liên Hệ</th>
            <th className="px-3 py-2 font-medium">Hỗ Trợ Gì</th>
          </tr>
        </thead>
        <tbody>
          {SUPPORT_CONTACTS.map((row) => (
            <tr key={row.organization} className="border-b border-border last:border-0">
              <td className="px-3 py-2 font-semibold text-text">{row.organization}</td>
              <td className={`px-3 py-2 ${row.contactColor}`}>{row.contact}</td>
              <td className="px-3 py-2 text-text-muted">{row.help}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Alert tone="green" icon="📋">
        <strong>Nguyên tắc quan trọng nhất:</strong> Luôn giao tiếp bằng văn
        bản (SMS, email). Không bao giờ thỏa thuận miệng về sửa chữa, gia
        hạn hợp đồng, hay tiền cọc. Bằng chứng văn bản là thứ duy nhất có
        giá trị trước tòa.
      </Alert>

      <div className="mt-3 rounded-card border border-border bg-bg p-4">
        <h3 className="mb-1.5 text-sm font-bold text-text">
          📚 Nguồn tham khảo chính thức
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          <a
            href="https://www.hud.gov/program_offices/fair_housing_equal_opp"
            target="_blank"
            rel="noopener"
            className="text-primary"
          >
            HUD — Fair Housing (Nhà ở Công bằng)
          </a>{" "}
          — cơ quan liên bang xử lý khiếu nại về phân biệt đối xử trong nhà
          ở.
          <br />
          <a
            href="https://www.consumerfinance.gov/consumer-tools/renting-a-home/"
            target="_blank"
            rel="noopener"
            className="text-primary"
          >
            CFPB — Hướng dẫn thuê nhà
          </a>{" "}
          — thông tin về quyền của người thuê, tiền cọc, và hợp đồng thuê.
        </p>
      </div>
    </div>
  );
}
