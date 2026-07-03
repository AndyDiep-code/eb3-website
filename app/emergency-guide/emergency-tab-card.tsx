// Tab 4: "Thẻ Khẩn Cấp" — ported from emergency-guide.html #tab-card.

import { Alert, Card, PhraseBlock, SectionHeading, SubLabel } from "./emergency-ui";

const WALLET_FIELDS: Array<{ label: string }> = [
  { label: "Họ tên / Full name" },
  { label: "Ngày sinh / Date of birth" },
  { label: "Địa chỉ nhà / Home address" },
  { label: "Thành phố, Bang / City, State" },
  { label: "SĐT khẩn cấp / Emergency contact" },
  { label: "Dị ứng / Allergies" },
  { label: "Thuốc đang dùng / Medications" },
  { label: "Bảo hiểm / Insurance" },
];

export function EmergencyTabCard() {
  return (
    <div>
      <SectionHeading>🪪 Thẻ Thông Tin Khẩn Cấp</SectionHeading>

      <Alert tone="blue" icon="📲">
        Chụp màn hình trang này và lưu vào điện thoại. Hoặc điền thông tin và
        in ra, cắt bỏ thẻ, để trong ví. Chia sẻ với người thân trong gia
        đình.
      </Alert>

      <div className="mt-5 rounded-card border-2 border-primary bg-bg-alt p-4">
        <h3 className="mb-3 text-center text-sm font-extrabold text-primary">
          🆘 THẺ KHẨN CẤP — EMERGENCY CARD
        </h3>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {WALLET_FIELDS.map((field) => (
            <div key={field.label} className="rounded-btn bg-bg p-2.5">
              <div className="mb-0.5 text-[10px] text-text-muted">
                {field.label}
              </div>
              <div className="text-sm font-bold text-text">
                _______________________
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3.5 border-t border-border pt-3 text-xs leading-loose text-text-muted">
          <strong className="text-primary">Câu cần dùng:</strong>
          <br />
          &quot;I need a Vietnamese interpreter.&quot; (Tôi cần phiên dịch
          tiếng Việt)
          <br />
          &quot;I want a lawyer.&quot; (Tôi muốn luật sư — nếu bị bắt)
          <br />
          &quot;I do not consent to a search.&quot; (Tôi không đồng ý khám
          xét)
          <br />
          <strong className="text-red-500">
            Số khẩn cấp: 911 | Poison: 1-800-222-1222 | Trafficking:
            1-888-373-7888
          </strong>
        </div>
      </div>

      <SubLabel>Giao Lộ &amp; Địa Chỉ Gần Nhất — Điền Sẵn</SubLabel>
      <Card>
        <p className="text-sm leading-loose text-text-muted">
          <strong className="text-text">Tại sao cần biết địa chỉ?</strong>{" "}
          Khi gọi 911 trong tình huống hoảng loạn, nhiều người quên địa chỉ.
          GPS điện thoại giúp nhưng không phải lúc nào cũng chính xác. Điền
          sẵn các thông tin dưới đây:
          <br />
          <br />
          • Địa chỉ nhà chính xác:{" "}
          <strong>________________________</strong>
          <br />
          • Giao lộ gần nhất: <strong>________________________</strong>
          <br />
          • Địa chỉ nơi làm việc: <strong>________________________</strong>
          <br />
          • Bệnh viện gần nhất: <strong>________________________</strong>
          <br />
          • Urgent Care gần nhất: <strong>________________________</strong>
        </p>
      </Card>

      <SubLabel>Câu Tiếng Anh Cần Nhớ — In Ra Để Trong Ví</SubLabel>
      <PhraseBlock en="&quot;I need help. Call 911.&quot;" vi="(Tôi cần giúp đỡ. Gọi 911.)" />
      <PhraseBlock
        en="&quot;I need a Vietnamese interpreter.&quot;"
        vi="(Tôi cần phiên dịch tiếng Việt.)"
      />
      <PhraseBlock
        en="&quot;I am having chest pain / trouble breathing.&quot;"
        vi="(Tôi đang bị đau ngực / khó thở.)"
      />
      <PhraseBlock
        en="&quot;My address is ___. My name is ___.&quot;"
        vi="(Địa chỉ của tôi là ___. Tên tôi là ___.)"
      />
      <PhraseBlock
        en="&quot;I want a lawyer. I do not consent to a search.&quot;"
        vi="(Tôi muốn luật sư. Tôi không đồng ý khám xét.)"
      />
    </div>
  );
}
