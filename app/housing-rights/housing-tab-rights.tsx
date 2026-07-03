// Tab 3: "Quyền Theo Bang" — ported from housing-rights.html #tab-rights.

import { DEPOSIT_RULES, ENTRY_NOTICE_RULES } from "./housing-data";
import { Alert, Badge, Card, DontBox, SectionHeading, SubLabel } from "./housing-ui";

export function HousingTabRights() {
  return (
    <div>
      <SectionHeading>⚖️ Quyền Người Thuê Theo Bang</SectionHeading>

      <SubLabel>Thời Hạn Trả Lại Security Deposit</SubLabel>
      <div className="mb-3 overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Bang</th>
              <th className="px-3 py-2 font-medium">Thời hạn trả lại</th>
              <th className="px-3 py-2 font-medium">Mức cọc tối đa</th>
              <th className="px-3 py-2 font-medium">Phải có lãi suất?</th>
            </tr>
          </thead>
          <tbody>
            {DEPOSIT_RULES.map((row) => (
              <tr key={row.state} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-semibold text-text">{row.state}</td>
                <td className="px-3 py-2 text-text">{row.returnDeadline}</td>
                <td className="px-3 py-2 text-text-muted">{row.maxDeposit}</td>
                <td className="px-3 py-2 text-text-muted">{row.interestRequired}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Alert tone="blue" icon="💡">
        Nếu chủ nhà không trả lại cọc đúng hạn{" "}
        <strong>mà không có lý do bằng văn bản</strong>, bạn có thể kiện tại
        Small Claims Court. Nhiều bang cho phép đòi gấp đôi hoặc gấp ba số
        tiền cọc + attorney fees.
      </Alert>

      <SubLabel>Quyền Về Habitability — Nhà Phải Đủ Điều Kiện Sống</SubLabel>
      <Card borderColor="border-accent/40">
        <Badge tone="green">LUẬT BẢO VỆ BẠN</Badge>
        <p className="mt-2 text-sm leading-loose text-text-muted">
          Tất cả các bang đều yêu cầu nhà cho thuê phải:
          <br />
          <strong className="text-accent">✅</strong> Có hệ thống điện,
          nước, gas hoạt động
          <br />
          <strong className="text-accent">✅</strong> Có hệ thống sưởi khi
          nhiệt độ ngoài trời xuống thấp
          <br />
          <strong className="text-accent">✅</strong> Không có nấm mốc độc
          hại (toxic mold) ảnh hưởng sức khỏe
          <br />
          <strong className="text-accent">✅</strong> Cửa và khóa hoạt động
          — đảm bảo an toàn
          <br />
          <strong className="text-accent">✅</strong> Không có pest
          infestation (chuột, gián, rệp) nghiêm trọng
          <br />
          <strong className="text-accent">✅</strong> Mái nhà và tường không
          bị dột hoặc ẩm mốc
        </p>
      </Card>

      <SubLabel>Thông Báo Vào Nhà (Notice to Enter) Theo Bang</SubLabel>
      <table className="mb-3 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
            <th className="px-3 py-2 font-medium">Bang</th>
            <th className="px-3 py-2 font-medium">Thông báo trước</th>
            <th className="px-3 py-2 font-medium">Ngoại lệ khẩn cấp</th>
          </tr>
        </thead>
        <tbody>
          {ENTRY_NOTICE_RULES.map((row) => (
            <tr key={row.state} className="border-b border-border last:border-0">
              <td className="px-3 py-2 font-semibold text-text">{row.state}</td>
              <td className="px-3 py-2 text-text-muted">{row.noticeRequired}</td>
              <td className="px-3 py-2 text-text-muted">{row.emergencyException}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SubLabel>Chủ Nhà Không Được Làm (Bất Kể Bang Nào)</SubLabel>
      <DontBox>
        ❌ Tự ý thay khóa để đuổi bạn mà không có lệnh tòa (illegal lockout)
        <br />
        ❌ Tắt điện, nước, gas để buộc bạn dọn ra (utility shutoff)
        <br />
        ❌ Vứt đồ đạc của bạn ra đường mà không có lệnh eviction từ tòa
        <br />
        ❌ Trả thù vì bạn phàn nàn về điều kiện nhà ở (retaliation)
        <br />
        ❌ Phân biệt đối xử dựa trên quốc tịch, sắc tộc, giới tính, tôn giáo,
        tình trạng gia đình
      </DontBox>
    </div>
  );
}
