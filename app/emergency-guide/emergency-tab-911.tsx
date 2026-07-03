// Tab 3: "Gọi 911" — ported from emergency-guide.html #tab-911.

import { CALL_911_VS_311, EMERGENCY_CONTACTS } from "./emergency-data";
import { Alert, Badge, Card, DoBox, DontBox, PhraseBlock, SectionHeading, SubLabel } from "./emergency-ui";

export function EmergencyTab911() {
  return (
    <div>
      <SectionHeading>📞 Gọi 911 &amp; Số Khẩn Cấp</SectionHeading>

      <SubLabel>911 vs 311 — Gọi Số Nào?</SubLabel>
      <table className="mb-3 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
            <th className="px-3 py-2 font-medium">Tình huống</th>
            <th className="px-3 py-2 font-medium">Gọi số nào</th>
          </tr>
        </thead>
        <tbody>
          {CALL_911_VS_311.map((row) => (
            <tr key={row.situation} className="border-b border-border last:border-0">
              <td className="px-3 py-2 text-text">{row.situation}</td>
              <td
                className={`px-3 py-2 ${
                  row.number === "911"
                    ? "font-semibold text-red-500"
                    : "text-secondary"
                }`}
              >
                {row.number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SubLabel>Script Gọi 911 — Người Vận Hành Hỏi Gì</SubLabel>

      <Card>
        <Badge tone="red">
          NGAY KHI NGHE &quot;911, what&apos;s your emergency?&quot;
        </Badge>
        <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
          Trả lời theo thứ tự:{" "}
          <strong className="text-text">Chuyện gì — Ở đâu — Cần gì</strong>
        </p>
      </Card>

      <PhraseBlock
        en="&quot;There is a [fire / accident / medical emergency] at [your address].&quot;"
        vi="(Có [hỏa hoạn / tai nạn / cấp cứu y tế] tại [địa chỉ của bạn].)"
        note={
          <>
            <strong className="text-secondary">
              Biết địa chỉ nhà là rất quan trọng.
            </strong>{" "}
            Lưu địa chỉ vào điện thoại. Nếu không nhớ, mô tả: giao lộ gần
            nhất, tên đường, số nhà.
          </>
        }
      />

      <PhraseBlock
        en="&quot;I don&apos;t speak English well. Do you have a Vietnamese interpreter?&quot;"
        vi="(Tôi không nói tiếng Anh tốt. Bạn có phiên dịch tiếng Việt không?)"
        note="Hầu hết trung tâm 911 có dịch vụ phiên dịch qua điện thoại trong vòng 30-60 giây."
      />

      <PhraseBlock
        en="&quot;Someone is [not breathing / unconscious / choking / having a heart attack].&quot;"
        vi="(Ai đó đang [không thở / bất tỉnh / nghẹn thức ăn / bị đau tim].)"
      />

      <PhraseBlock
        en="&quot;Please send [police / fire / ambulance].&quot;"
        vi="(Xin gửi [cảnh sát / xe cứu hỏa / xe cứu thương].)"
      />

      <SubLabel>Điều Quan Trọng Khi Gọi 911</SubLabel>
      <DoBox>
        ✅ <strong>Không cúp máy</strong> cho đến khi người vận hành nói bạn
        có thể
        <br />
        ✅ Giữ bình tĩnh — nói chậm và rõ ràng
        <br />
        ✅ Trả lời tất cả câu hỏi của người vận hành
        <br />
        ✅ Nếu mất kết nối, gọi lại ngay
        <br />
        ✅ Gọi 911 từ điện thoại di động — vị trí GPS tự động gửi cho họ
      </DoBox>
      <DontBox>
        ❌ Không gọi 911 cho chuyện không khẩn cấp (phí và lãng phí tài
        nguyên)
        <br />
        ❌ Không sợ gọi 911 vì tình trạng di trú — 911 không kiểm tra hoặc báo
        cáo ICE
        <br />
        ❌ Không để ngôn ngữ ngăn bạn gọi — phiên dịch có sẵn
      </DontBox>

      <SubLabel>Số Khẩn Cấp Quan Trọng Khác</SubLabel>
      <table className="mb-3 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
            <th className="px-3 py-2 font-medium">Cơ Quan</th>
            <th className="px-3 py-2 font-medium">Số Điện Thoại</th>
            <th className="px-3 py-2 font-medium">Dùng Khi</th>
          </tr>
        </thead>
        <tbody>
          {EMERGENCY_CONTACTS.map((row) => (
            <tr key={row.agency} className="border-b border-border last:border-0">
              <td className="px-3 py-2 font-semibold text-text">{row.agency}</td>
              <td className="px-3 py-2 text-accent">{row.phone}</td>
              <td className="px-3 py-2 text-text-muted">{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Alert tone="green" icon="🛡️">
        <strong>Quyền không bị phân biệt trong tình huống khẩn cấp:</strong>{" "}
        Cảnh sát, lính cứu hỏa, và nhân viên y tế buộc phải hỗ trợ bạn bất kể
        tình trạng di trú. Gọi 911 không tạo ra hồ sơ ICE.
      </Alert>
    </div>
  );
}
