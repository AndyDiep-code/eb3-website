// Tab 4: "Khi Employer Có Vấn Đề" — ported from ac21-portability.html
// #tab-problems.

import { LAWYER_SITUATIONS } from "./ac21-data";
import { Alert, Card, SectionHeading, SubLabel } from "./ac21-ui";

export function Ac21TabProblems() {
  return (
    <div>
      <SectionHeading>⚠️ Khi Employer Có Vấn Đề</SectionHeading>

      <SubLabel>Tình Huống 1: Employer Đóng Cửa / Phá Sản</SubLabel>
      <div className="mb-3 rounded-card border border-accent/40 bg-bg p-4">
        <span className="mb-2 inline-block rounded-lg bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
          TIN TỐT
        </span>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          I-485 của bạn vẫn an toàn nếu đủ 180 ngày
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Nếu employer đóng cửa sau khi I-485 đã pending 180+ ngày, bạn có
          thể dùng AC21 để chuyển sang employer khác có việc tương tự. I-140
          vẫn giữ nguyên giá trị. Gửi Supplement J với employer mới càng
          sớm càng tốt.
        </p>
      </div>

      <div className="mb-3 rounded-card border border-red-700/40 bg-bg p-4">
        <span className="mb-2 inline-block rounded-lg bg-red-700/10 px-2 py-0.5 text-xs font-bold text-red-600">
          NGUY HIỂM
        </span>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Nếu Employer Đóng Cửa Trước 180 Ngày
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Đây là tình huống khó. I-140 có thể bị rút và hồ sơ có nguy cơ
          mất. Cần tư vấn luật sư immigration{" "}
          <strong className="text-red-600">ngay lập tức</strong> để xem có
          phương án nào khác không (ví dụ: employer khác nhận lại hồ sơ,
          hoặc tự file I-140 mới nếu đủ điều kiện).
        </p>
      </div>

      <SubLabel>Tình Huống 2: Employer Rút I-140 Để Trả Thù</SubLabel>
      <Card>
        <span className="mb-2 inline-block rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
          LUẬT BẢO VỆ BẠN
        </span>
        <p className="text-sm leading-relaxed text-text-muted">
          Sau khi I-485 pending 180+ ngày, employer{" "}
          <strong className="text-primary">KHÔNG THỂ</strong> hủy quyền AC21
          của bạn bằng cách rút I-140. USCIS có hướng dẫn rõ ràng: I-140 rút
          sau 180 ngày vẫn còn giá trị cho mục đích AC21 và Priority Date.
          Đây là hành động bảo vệ người lao động khỏi sự trả thù của
          employer.
        </p>
      </Card>

      <SubLabel>Tình Huống 3: Employer Đe Dọa Nếu Bạn Muốn Nghỉ</SubLabel>
      <div className="mb-3 rounded-card border border-red-700/40 bg-bg p-4">
        <span className="mb-2 inline-block rounded-lg bg-red-700/10 px-2 py-0.5 text-xs font-bold text-red-600">
          ĐÂY LÀ BẤT HỢP PHÁP
        </span>
        <p className="text-sm leading-relaxed text-text-muted">
          Employer KHÔNG được làm các điều sau khi bạn muốn đổi việc sau 180
          ngày:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-text-muted">
          <li><span className="font-bold text-red-600">❌</span> Đe dọa báo ICE hoặc USCIS về bạn</li>
          <li><span className="font-bold text-red-600">❌</span> Nói rằng bạn sẽ bị trục xuất nếu nghỉ việc</li>
          <li><span className="font-bold text-red-600">❌</span> Giữ lương cuối cùng để buộc bạn ở lại</li>
          <li><span className="font-bold text-red-600">❌</span> Không trả OT hoặc cắt giờ để trừng phạt</li>
        </ul>
        <p className="mt-3 text-sm font-bold text-red-600">
          Những hành động này vi phạm nhiều luật liên bang và tiểu bang, và
          có thể là labor trafficking.
        </p>
      </div>

      <SubLabel>Khi Nào Cần Luật Sư</SubLabel>
      <div className="mb-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-left text-text-muted">
              <th className="px-3 py-2 font-medium">Tình huống</th>
              <th className="px-3 py-2 font-medium">Cần làm ngay</th>
            </tr>
          </thead>
          <tbody>
            {LAWYER_SITUATIONS.map((row) => (
              <tr key={row.situation} className="border-b border-border last:border-0">
                <td className="px-3 py-2 text-text">{row.situation}</td>
                <td className={`px-3 py-2 font-semibold ${row.actionColor}`}>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubLabel>Liên Hệ Hỗ Trợ</SubLabel>
      <Card>
        <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
          <li>
            <strong className="text-primary">Legal Aid gần nhất (miễn phí):</strong>{" "}
            lawhelp.org
          </li>
          <li>
            <strong className="text-primary">DOL Wage &amp; Hour (vi phạm lao động):</strong>{" "}
            1-866-487-9243
          </li>
          <li>
            <strong className="text-primary">National Human Trafficking Hotline:</strong>{" "}
            1-888-373-7888
          </li>
          <li>
            <strong className="text-primary">USCIS Contact Center:</strong>{" "}
            1-800-375-5283
          </li>
          <li>
            <strong className="text-primary">USCIS Supplement J info:</strong>{" "}
            uscis.gov/i-485supj
          </li>
        </ul>
      </Card>

      <Alert tone="blue" icon="🔒">
        <strong>Nhắc lại quan trọng:</strong> Sau 180 ngày I-485 pending,
        bạn có quyền đổi việc. Employer biết điều này. Nếu họ đe dọa bạn vì
        muốn nghỉ việc, đó là sự bất lực — họ không thể thực sự hủy quyền
        AC21 của bạn.
      </Alert>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          📚 Nguồn tham khảo chính thức
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          <a
            href="https://www.uscis.gov/working-in-united-states/temporary-workers/ac21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            USCIS — AC21 &amp; Job Portability
          </a>
          : quy định chính thức về quyền đổi việc khi I-485 pending quá 180
          ngày, tiêu chí &quot;same or similar&quot; occupation.
          <br />
          <a
            href="https://www.uscis.gov/policy-manual"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            USCIS Policy Manual
          </a>
          : hướng dẫn chi tiết cách USCIS áp dụng AC21 và các điều khoản
          liên quan đến I-485 Supplement J.
        </p>
      </Card>
    </div>
  );
}
