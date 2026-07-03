// Tab 3: "Hỗ Trợ ESL/ELL" — ported from school-enrollment-guide.html #tab-esl.

import { Alert, Card, CardTitle, SubLabel } from "./school-enrollment-ui";

export function SchoolTabEsl() {
  return (
    <div>
      <h2 className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
        🗣️ Hỗ Trợ Học Tiếng Anh — ESL/ELL
      </h2>

      <Card>
        <CardTitle>ESL/ELL Là Gì?</CardTitle>
        <p className="text-sm leading-relaxed text-text-muted">
          ESL (English as a Second Language) hoặc ELL (English Language
          Learner) là chương trình hỗ trợ học sinh chưa thành thạo tiếng
          Anh — học song song với các môn học chính khóa. Đây là dịch vụ{" "}
          <strong className="text-accent">MIỄN PHÍ</strong>, bắt buộc theo
          luật liên bang (Title III, Đạo Luật Every Student Succeeds).
        </p>
      </Card>

      <SubLabel>Quy Trình Xác Định &amp; Hỗ Trợ</SubLabel>
      <ol className="mb-3.5 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-muted">
        <li>
          Khi đăng ký, trường thường có bảng khảo sát ngôn ngữ ở nhà (Home
          Language Survey) — trả lời trung thực để trường xác định con cần
          hỗ trợ ESL hay không.
        </li>
        <li>
          Nếu cần, con sẽ làm bài kiểm tra trình độ tiếng Anh (thường gọi
          là <strong className="text-text">WIDA/ACCESS</strong>) để xếp
          mức độ hỗ trợ phù hợp.
        </li>
        <li>
          Trường phải cung cấp giáo viên ESL, tài liệu song ngữ, và thông
          dịch viên cho cuộc họp phụ huynh — theo yêu cầu của{" "}
          <strong className="text-text">Title VI</strong>.
        </li>
      </ol>

      <Alert tone="blue" icon="💡">
        Nếu trường không chủ động cung cấp thông dịch viên trong họp phụ
        huynh-giáo viên, phụ huynh có quyền yêu cầu — đây là quyền lợi hợp
        pháp, không phải &quot;xin ưu tiên&quot;.
      </Alert>
    </div>
  );
}
