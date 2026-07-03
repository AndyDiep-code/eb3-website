// Tab 1: "I-485 vs Lãnh Sự" — ported from aos-interview-guide.html #tab-aos.

import { Alert, Card } from "./aos-ui";

export function AosTabComparison() {
  return (
    <div>
      <h2 className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
        🔀 I-485 (Điều Chỉnh Tình Trạng) vs Phỏng Vấn Lãnh Sự
      </h2>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Hai Con Đường Khác Nhau Để Nhận Thẻ Xanh
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Người lao động EB-3 chính thường hoàn tất hồ sơ qua{" "}
          <strong className="text-text">
            Phỏng Vấn Lãnh Sự (Consular Processing)
          </strong>{" "}
          tại Lãnh Sự Quán/Đại Sứ Quán Mỹ ở Việt Nam. Ngược lại, người thân
          đã ở Mỹ hợp pháp (ví dụ đang giữ visa khác) có thể nộp{" "}
          <strong className="text-text">Mẫu I-485</strong> để điều chỉnh tình
          trạng (Adjustment of Status — AOS) ngay trong nước Mỹ, không cần
          ra nước ngoài.
        </p>
      </Card>

      <div className="mb-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text-muted">
              <th className="py-2 pr-3 font-medium">Tiêu Chí</th>
              <th className="py-2 pr-3 font-medium">I-485 (AOS — tại Mỹ)</th>
              <th className="py-2 pr-3 font-medium">
                Phỏng Vấn Lãnh Sự (ngoài Mỹ)
              </th>
            </tr>
          </thead>
          <tbody className="text-text">
            <tr className="border-b border-border">
              <td className="py-2 pr-3 font-semibold">Nơi nộp đơn</td>
              <td className="py-2 pr-3 text-text-muted">
                USCIS (trong nước Mỹ)
              </td>
              <td className="py-2 pr-3 text-text-muted">
                NVC → Lãnh Sự Quán/Đại Sứ Quán
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3 font-semibold">Nơi phỏng vấn</td>
              <td className="py-2 pr-3 text-text-muted">
                Văn phòng USCIS địa phương
              </td>
              <td className="py-2 pr-3 text-text-muted">
                Đại Sứ Quán Mỹ tại Hà Nội/TP.HCM
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3 font-semibold">Điều kiện</td>
              <td className="py-2 pr-3 text-text-muted">
                Đang hiện diện hợp pháp tại Mỹ
              </td>
              <td className="py-2 pr-3 text-text-muted">
                Đang ở Việt Nam (hoặc ngoài Mỹ)
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-3 font-semibold">Khám sức khỏe</td>
              <td className="py-2 pr-3 text-text-muted">
                I-693 với Civil Surgeon (tại Mỹ)
              </td>
              <td className="py-2 pr-3 text-text-muted">
                Khám với bác sĩ chỉ định (Panel Physician)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Alert tone="blue" icon="🔗">
        Bảng phí đầy đủ cho I-130, I-485, Affidavit of Support, và khám sức
        khỏe có tại{" "}
        <a href="/family-petition" className="font-bold text-primary">
          Bảo Lãnh Gia Đình
        </a>
        .
      </Alert>
    </div>
  );
}
