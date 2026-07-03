// Tab 3: "Phỏng Vấn USCIS" — ported from aos-interview-guide.html #tab-interview.

import { Alert, Card, SectionHeading, SubLabel } from "./aos-ui";

export function AosTabUscisInterview() {
  return (
    <div>
      <SectionHeading>🏢 Phỏng Vấn Tại USCIS Địa Phương</SectionHeading>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Khác Gì So Với Phỏng Vấn Lãnh Sự?
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Phỏng vấn I-485 diễn ra tại văn phòng USCIS gần nơi bạn sống
          (không phải Lãnh Sự Quán). Viên chức USCIS xác minh quan hệ gia
          đình, tính xác thực hồ sơ, và điều kiện đủ tiêu chuẩn nhận thẻ
          xanh.{" "}
          <strong className="text-secondary">
            Một số trường hợp được miễn phỏng vấn (interview waiver)
          </strong>{" "}
          nếu hồ sơ rõ ràng, đầy đủ.
        </p>
      </Card>

      <SubLabel>Cần Mang Theo</SubLabel>
      <ul className="mb-3.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text-muted">
        <li>Giấy báo phỏng vấn (interview notice) gốc</li>
        <li>Hộ chiếu và các giấy tờ tùy thân hợp lệ</li>
        <li>
          Bản gốc giấy khai sinh, giấy kết hôn (và bản dịch công chứng nếu
          cần)
        </li>
        <li>Phong bì kín I-693 (nếu chưa nộp trước qua đơn)</li>
        <li>
          Bằng chứng cập nhật về quan hệ gia đình (ảnh chung, sao kê chung,
          v.v. cho hồ sơ vợ/chồng)
        </li>
      </ul>

      <Alert tone="blue" icon="💡">
        Luyện tập trả lời câu hỏi phỏng vấn bằng tiếng Anh cơ bản — xem các
        mẫu câu thường gặp tại{" "}
        <a href="/english-work" className="font-bold text-primary">
          Tiếng Anh CV
        </a>
        .
      </Alert>
    </div>
  );
}
