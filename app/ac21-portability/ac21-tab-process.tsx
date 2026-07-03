// Tab 3: "Quy Trình Đổi Việc" — ported from ac21-portability.html #tab-process.

import { Alert, Card, SectionHeading, SubLabel } from "./ac21-ui";

export function Ac21TabProcess() {
  return (
    <div>
      <SectionHeading>📝 Quy Trình Đổi Việc Từng Bước</SectionHeading>

      <Alert tone="yellow" icon="⏰">
        <strong>Thời điểm tốt nhất để đổi việc:</strong> Sau ngày 180+ I-485
        pending VÀ sau khi đã nhận EAD (Employment Authorization Document) —
        để bạn có thể làm việc hợp pháp cho employer mới ngay lập tức mà
        không cần đợi H-2B hay visa khác.
      </Alert>

      <Alert tone="blue" icon="🔗">
        Người thân đang chờ I-485 (vợ/chồng, con) muốn biết timeline xin
        EAD/Advance Parole? Xem{" "}
        <a href="/aos-interview-guide" className="font-bold text-primary">
          Phỏng Vấn AOS &amp; I-693 → Timeline EAD/Advance Parole
        </a>
        .
      </Alert>

      <SubLabel>Bước 1 — Chuẩn Bị Trước Khi Đổi Việc</SubLabel>
      <Card>
        <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
          <li>
            <span className="font-bold text-accent">✅</span> Xác nhận I-485
            đã pending đủ 180+ ngày (xem ngày trên I-797 Receipt Notice)
          </li>
          <li>
            <span className="font-bold text-accent">✅</span> Xác nhận I-140
            đã approved (xem I-797 approval notice)
          </li>
          <li>
            <span className="font-bold text-accent">✅</span> Nhận EAD hoặc
            AP (Advance Parole) nếu có thể — dễ làm việc cho employer mới
            hơn
          </li>
          <li>
            <span className="font-bold text-accent">✅</span> Xác nhận việc
            mới là &quot;same or similar&quot; (so sánh mã SOC)
          </li>
          <li>
            <span className="font-bold text-accent">✅</span> Có offer
            letter từ employer mới ghi rõ chức danh, mô tả công việc, và mức
            lương
          </li>
        </ul>
      </Card>

      <SubLabel>Bước 2 — Nộp I-485 Supplement J</SubLabel>
      <Card>
        <span className="mb-2 inline-block rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
          USCIS FORM
        </span>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          I-485 Supplement J là gì?
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Đây là form thông báo cho USCIS rằng bạn đang đổi việc theo AC21.
          Không bắt buộc phải nộp ngay khi đổi việc, nhưng{" "}
          <strong className="text-primary">nên nộp càng sớm càng tốt</strong>{" "}
          để tránh USCIS từ chối khi kiểm tra.
        </p>
      </Card>

      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Thông Tin Cần Điền Trong Supplement J
        </h3>
        <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
          <li>
            • <strong className="text-text">Part 1:</strong> Thông tin về
            employer cũ (tên, địa chỉ, chức danh cũ)
          </li>
          <li>
            • <strong className="text-text">Part 2:</strong> Thông tin về
            employer mới (tên, địa chỉ, chức danh mới, mức lương)
          </li>
          <li>
            • <strong className="text-text">Part 3:</strong> Mô tả công việc
            mới — giải thích tại sao &quot;same or similar&quot;
          </li>
          <li>
            • <strong className="text-text">Chữ ký:</strong> Của bạn và đại
            diện employer mới (nếu có)
          </li>
        </ul>
      </Card>

      <SubLabel>Bước 3 — Tài Liệu Đính Kèm</SubLabel>
      <Card>
        <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
          <li>
            • <strong className="text-text">Offer letter</strong> từ
            employer mới (ghi chức danh, lương, ngày bắt đầu)
          </li>
          <li>
            • <strong className="text-text">Job description</strong> — mô tả
            nhiệm vụ công việc mới
          </li>
          <li>
            • <strong className="text-text">Pay stub</strong> 2-3 kỳ gần
            nhất từ employer mới (nếu đã bắt đầu làm)
          </li>
          <li>
            • Bản sao <strong className="text-text">I-797 Receipt Notice</strong>{" "}
            của I-485
          </li>
          <li>
            • Bản sao <strong className="text-text">I-797 Approval Notice</strong>{" "}
            của I-140
          </li>
        </ul>
      </Card>

      <SubLabel>Bước 4 — Gửi Đến USCIS</SubLabel>
      <Card>
        <p className="text-sm leading-relaxed text-text-muted">
          Gửi Supplement J đến{" "}
          <strong className="text-primary">cùng Service Center</strong>{" "}
          đang xử lý I-485 của bạn. Địa chỉ Service Center có trên I-797.
          Gửi bằng certified mail để có bằng chứng gửi. Giữ lại bản sao tất
          cả giấy tờ.
        </p>
      </Card>

      <Alert tone="green" icon="✅">
        <strong>Không cần employer cũ ký gì.</strong> Bạn không cần xin phép
        hoặc thông báo cho employer cũ khi nộp Supplement J. Đây là quyền
        của bạn theo luật.
      </Alert>

      <SubLabel>Checklist Hoàn Chỉnh</SubLabel>
      <Card>
        <ul className="space-y-1.5 text-sm leading-relaxed text-text-muted">
          <li>☐ Xác nhận 180+ ngày I-485 pending</li>
          <li>☐ Kiểm tra I-140 approved</li>
          <li>☐ Xác nhận việc mới &quot;same or similar&quot; (so mã SOC)</li>
          <li>☐ Nhận offer letter từ employer mới</li>
          <li>☐ Download form I-485 Supplement J tại uscis.gov</li>
          <li>☐ Điền đầy đủ Parts 1-3</li>
          <li>☐ Tập hợp tài liệu đính kèm</li>
          <li>☐ Gửi certified mail đến đúng Service Center</li>
          <li>☐ Lưu bản sao và tracking number</li>
        </ul>
      </Card>
    </div>
  );
}
