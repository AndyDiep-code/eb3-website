// Tab 2: "Bệnh Viện / ER" — ported from emergency-guide.html
// #tab-hospital.

import { CARE_OPTIONS } from "./emergency-data";
import { Alert, Badge, Card, PhraseBlock, SectionHeading, SubLabel } from "./emergency-ui";

export function EmergencyTabHospital() {
  return (
    <div>
      <SectionHeading>🏥 Bệnh Viện &amp; Cấp Cứu (Emergency Room)</SectionHeading>

      <SubLabel>ER vs Urgent Care vs Bác Sĩ Thường — Đi Đâu?</SubLabel>
      <div className="mb-3 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Tình huống</th>
              <th className="px-3 py-2 font-medium">Đi đâu</th>
              <th className="px-3 py-2 font-medium">Chi phí</th>
            </tr>
          </thead>
          <tbody>
            {CARE_OPTIONS.map((row) => (
              <tr key={row.situation} className="border-b border-border last:border-0">
                <td className="px-3 py-2 text-text">{row.situation}</td>
                <td className={`px-3 py-2 font-semibold ${row.whereColor}`}>{row.whereToGo}</td>
                <td className={`px-3 py-2 font-semibold ${row.costColor}`}>{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubLabel>Khi Vào Emergency Room — Script Tiếng Anh</SubLabel>

      <Card>
        <Badge tone="red">TRIAGE DESK — Nói Với Nhân Viên Đầu Tiên</Badge>
        <p className="mt-2 text-sm text-text-muted">
          Đây là nơi đầu tiên bạn gặp khi vào ER. Nói ngắn gọn về triệu
          chứng.
        </p>
      </Card>

      <PhraseBlock
        en="&quot;I need help. I have [chest pain / severe pain / trouble breathing].&quot;"
        vi="(Tôi cần giúp đỡ. Tôi bị [đau ngực / đau dữ dội / khó thở].)"
      />

      <PhraseBlock
        en="&quot;I need a Vietnamese interpreter, please.&quot;"
        vi="(Tôi cần phiên dịch tiếng Việt.)"
        note={
          <>
            Đây là{" "}
            <strong className="text-accent">
              QUYỀN CỦA BẠN theo luật liên bang (Title VI)
            </strong>
            . Bệnh viện nhận Medicare/Medicaid phải cung cấp phiên dịch miễn
            phí.
          </>
        }
      />

      <PhraseBlock
        en="&quot;The pain is [1-10 scale]. It started [today / yesterday / 3 days ago].&quot;"
        vi="(Mức đau từ 1-10 là [số]. Bắt đầu từ [hôm nay / hôm qua / 3 ngày trước].)"
      />

      <PhraseBlock
        en="&quot;I am allergic to [penicillin / aspirin / shellfish].&quot;"
        vi="(Tôi dị ứng với [penicillin / aspirin / hải sản].)"
        note={
          <>
            Nếu không có dị ứng:{" "}
            <strong className="text-primary">
              &quot;I have no known allergies.&quot;
            </strong>
          </>
        }
      />

      <PhraseBlock
        en="&quot;I take [medication name] every day.&quot;"
        vi="(Tôi uống [tên thuốc] mỗi ngày.)"
        note="Mang theo tất cả thuốc đang dùng hoặc chụp ảnh nhãn thuốc."
      />

      <SubLabel>Giấy Tờ Cần Mang Theo</SubLabel>
      <Card>
        <p className="space-y-0 text-sm leading-loose text-text-muted">
          <strong className="text-accent">✅ Nên có:</strong> Thẻ bảo hiểm y
          tế (insurance card), ITIN hoặc SSN, ID (bằng lái, passport, hay
          thẻ xanh)
          <br />
          <strong className="text-secondary">
            ⚠️ Không có bảo hiểm:
          </strong>{" "}
          Bệnh viện vẫn phải điều trị khẩn cấp theo EMTALA. Sau đó bạn nhận
          hóa đơn và có thể xin giảm/hoãn.
          <br />
          <strong className="text-primary">💡 Charity Care:</strong> Hầu hết
          bệnh viện có chương trình hỗ trợ tài chính cho người thu nhập thấp
          — hỏi &quot;Do you have a financial assistance program?&quot;
        </p>
      </Card>

      <SubLabel>Quyền Yêu Cầu Phiên Dịch</SubLabel>
      <Card borderColor="border-accent/40">
        <Badge tone="green">QUYỀN PHÁP LÝ — MIỄN PHÍ</Badge>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Theo Title VI của Civil Rights Act, bất kỳ bệnh viện nào nhận tiền
          liên bang (Medicare, Medicaid){" "}
          <strong className="text-accent">
            PHẢI cung cấp phiên dịch miễn phí
          </strong>
          . Bạn không phải trả tiền phiên dịch. Nếu nhân viên từ chối hoặc
          tính tiền phiên dịch, yêu cầu gặp Patient Advocate hoặc supervisor
          ngay.
        </p>
      </Card>

      <SubLabel>Sau Khi Điều Trị — Hóa Đơn &amp; Thanh Toán</SubLabel>
      <Card>
        <p className="space-y-0 text-sm leading-loose text-text-muted">
          <strong className="text-text">Đừng bỏ hóa đơn</strong> — nhiều
          bệnh viện giảm hóa đơn 40-80% nếu bạn xin Charity Care
          <br />
          Hỏi:{" "}
          <strong className="text-primary">
            &quot;Can I set up a payment plan?&quot;
          </strong>{" "}
          (Tôi có thể trả góp không?)
          <br />
          Hỏi:{" "}
          <strong className="text-primary">
            &quot;Do you have financial assistance?&quot;
          </strong>{" "}
          (Có chương trình hỗ trợ tài chính không?)
          <br />
          Gọi số trên hóa đơn để negotiate — bệnh viện thường chấp nhận trả
          ít hơn số ghi
        </p>
      </Card>

      <Alert tone="blue" icon="💡">
        <strong>GoodRx &amp; Mark Cuban Cost Plus Drugs:</strong> Cho thuốc
        theo toa, dùng GoodRx (goodrx.com) để so sánh giá dược phẩm. Có thể
        tiết kiệm 50-90% so với giá niêm yết.
      </Alert>
    </div>
  );
}
