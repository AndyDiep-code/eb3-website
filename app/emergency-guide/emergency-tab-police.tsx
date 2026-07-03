// Tab 1: "Cảnh Sát / Traffic Stop" — ported from emergency-guide.html
// #tab-police.

import {
  Alert,
  Badge,
  Card,
  DoBox,
  DontBox,
  PhraseBlock,
  SectionHeading,
  SubLabel,
} from "./emergency-ui";

export function EmergencyTabPolice() {
  return (
    <div>
      <SectionHeading>🚔 Khi Bị Cảnh Sát Dừng Xe (Traffic Stop)</SectionHeading>

      <Alert tone="blue" icon="💡">
        <strong>Traffic stop thường chỉ là vi phạm giao thông.</strong> Hầu
        hết cảnh sát chỉ kiểm tra giấy tờ và có thể phạt tiền. Bình tĩnh và
        lịch sự là cách tốt nhất để kết thúc nhanh chóng.
      </Alert>

      <SubLabel>Ngay Khi Thấy Đèn/Còi Cảnh Sát Phía Sau</SubLabel>
      <DoBox>
        ✅ Bật đèn hazard (đèn nháy 4 chiều)
        <br />
        ✅ Từ từ di chuyển vào lề đường an toàn, dừng hẳn
        <br />
        ✅ Tắt máy
        <br />
        ✅ Đặt cả 2 tay lên vô lăng — để cảnh sát thấy tay bạn
        <br />
        ✅ Ở trong xe cho đến khi cảnh sát yêu cầu ra khỏi xe
        <br />
        ✅ Bật đèn nội thất nếu trời tối
      </DoBox>
      <DontBox>
        ❌ Không chạy hoặc không dừng
        <br />
        ❌ Không cầm điện thoại hoặc đồ vật khi cảnh sát đến
        <br />
        ❌ Không mở cốp hoặc ngăn kéo trước khi cảnh sát hỏi
        <br />
        ❌ Không tranh cãi, không la hét
        <br />
        ❌ Không ra khỏi xe đột ngột khi chưa được yêu cầu
      </DontBox>

      <SubLabel>Câu Script Tiếng Anh — Cảnh Sát Hỏi Gì, Bạn Trả Lời Sao</SubLabel>

      <PhraseBlock
        en="&quot;Do you know why I stopped you?&quot;"
        vi="(Bạn có biết tại sao tôi dừng bạn không?)"
        note={
          <>
            Trả lời:{" "}
            <strong className="text-primary">
              &quot;No, officer.&quot; / &quot;No, I don&apos;t,
              officer.&quot;
            </strong>
          </>
        }
      />

      <PhraseBlock
        en="&quot;License and registration, please.&quot;"
        vi="(Bằng lái và giấy đăng ký xe)"
        note={
          <>
            Nói trước:{" "}
            <strong className="text-primary">
              &quot;My license is in my wallet. Is it okay if I reach for
              it?&quot;
            </strong>
            <br />
            (Bằng lái của tôi ở ví. Tôi có thể lấy không?)
          </>
        }
      />

      <PhraseBlock
        en="&quot;Where are you coming from?&quot;"
        vi="(Bạn đến từ đâu?)"
        note={
          <>
            Trả lời ngắn:{" "}
            <strong className="text-primary">
              &quot;From work / from home, officer.&quot;
            </strong>
          </>
        }
      />

      <PhraseBlock
        en="&quot;Have you been drinking?&quot;"
        vi="(Bạn có uống rượu không?)"
        note={
          <>
            Nếu không:{" "}
            <strong className="text-primary">&quot;No, officer.&quot;</strong>
            <br />
            Nếu không muốn trả lời:{" "}
            <strong className="text-primary">
              &quot;I prefer not to answer questions without a
              lawyer.&quot;
            </strong>
          </>
        }
      />

      <PhraseBlock
        en="&quot;Can I search your car?&quot;"
        vi="(Tôi có thể khám xe của bạn không?)"
        note={
          <>
            Bạn CÓ QUYỀN từ chối:{" "}
            <strong className="text-primary">
              &quot;I do not consent to a search.&quot;
            </strong>
            <br />
            (Tôi không đồng ý cho khám xét)
          </>
        }
      />

      <SubLabel>Khi Không Hiểu Tiếng Anh</SubLabel>
      <PhraseBlock
        en="&quot;I don&apos;t speak English well. I need an interpreter.&quot;"
        vi="(Tôi không nói tiếng Anh tốt. Tôi cần phiên dịch.)"
        note={
          <em className="text-text-muted">
            Phát âm: Ai đon&apos;t speak Ing-lish well. Ai nít an
            In-tơ-pri-tơ.
          </em>
        }
      />

      <SubLabel>Quyền Của Bạn — Được Bảo Hiến Pháp Đảm Bảo</SubLabel>
      <Card>
        <p className="space-y-0 text-sm leading-loose text-text-muted">
          <strong className="text-accent">✅ Quyền im lặng:</strong> Bạn
          không phải trả lời câu hỏi ngoài tên và địa chỉ
          <br />
          <strong className="text-accent">✅ Quyền từ chối khám xe:</strong>{" "}
          &quot;I do not consent to a search&quot; là đủ
          <br />
          <strong className="text-accent">
            ✅ Quyền được biết bạn bị giam giữ:
          </strong>{" "}
          Hỏi &quot;Am I free to go?&quot; để biết bạn có bị giữ không
          <br />
          <strong className="text-accent">✅ Quyền yêu cầu luật sư:</strong>{" "}
          Nếu bị bắt: &quot;I want a lawyer&quot; — nói câu này và im lặng
          <br />
          <strong className="text-red-500">
            ⚠️ Tình trạng di trú không ảnh hưởng quyền Hiến Pháp
          </strong>{" "}
          — bạn có quyền này dù là PR, visa hay undocumented
        </p>
      </Card>

      <SubLabel>Nếu Bị Bắt (Arrested)</SubLabel>
      <Card borderColor="border-red-700/40">
        <Badge tone="red">QUAN TRỌNG</Badge>
        <p className="mt-2 text-sm leading-loose text-text-muted">
          <strong className="text-text">Nói ngay 3 câu này:</strong>
          <br />
          <strong className="text-primary">
            1. &quot;I am invoking my right to remain silent.&quot;
          </strong>{" "}
          (Tôi muốn dùng quyền im lặng)
          <br />
          <strong className="text-primary">
            2. &quot;I want a lawyer.&quot;
          </strong>{" "}
          (Tôi muốn luật sư)
          <br />
          <strong className="text-primary">
            3. &quot;I do not consent to any searches.&quot;
          </strong>{" "}
          (Tôi không đồng ý khám xét)
          <br />
          <br />
          Sau 3 câu này:{" "}
          <strong className="text-red-500">IM LẶNG hoàn toàn</strong> cho đến
          khi có luật sư. Đây là quyền của bạn và là bước an toàn nhất.
        </p>
      </Card>

      <Alert tone="green" icon="📋">
        <strong>Sau khi traffic stop kết thúc:</strong> Ghi lại tên badge
        number của cảnh sát, số xe cảnh sát, giờ và địa điểm. Nếu bạn cho
        rằng quyền bị vi phạm, liên hệ ACLU tiểu bang của bạn hoặc legal aid.
      </Alert>
    </div>
  );
}
