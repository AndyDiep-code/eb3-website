// Tab "Công Việc" — ported from Van_Hoa_My_Danh_Cho_Huy.html #congviec.

import { Alert, Card, DataTable, SectionTitle, SubTitle } from "./van-hoa-ui";

export function VanHoaTabCongViec() {
  return (
    <div>
      <SectionTitle>🏭 Văn Hóa Công Việc Tại Mỹ</SectionTitle>

      <Alert tone="amber" title="⚡ Khác biệt lớn nhất với VN">
        Ở Mỹ, <strong>kết quả và trách nhiệm cá nhân</strong> được đánh giá
        cao hơn thâm niên hay quan hệ. Làm tốt → nói ra. Sai → nhận lỗi
        ngay. Cả hai đều được tôn trọng.
      </Alert>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card
          title="⏰ Đúng giờ & Kỷ luật"
          titleColor="text-primary"
          items={[
            "Đến làm trước 5 phút là tốt. Trễ 1 phút cần nhắn tin báo",
            "Clock in/out đúng giờ — hệ thống ghi nhận tự động",
            "Xin phép nghỉ trước ít nhất 1-2 ngày (không phải sáng hôm đó)",
            "Gọi báo ốm trước ít nhất 1 giờ trước ca, càng sớm càng tốt",
            "Không dùng điện thoại cá nhân trong giờ làm — nhiều nơi phạt ngay",
          ]}
        />
        <Card
          title="🤝 Quan hệ với Sếp & Đồng nghiệp"
          titleColor="text-accent"
          items={[
            "Gọi sếp bằng tên (John, Mike) — không dùng \"Sir/Ma'am\" liên tục",
            "Hỏi khi không hiểu — KHÔNG giả vờ hiểu rồi làm sai",
            "Nói \"I'm not sure, let me check\" thay vì đoán mò",
            "Cảm ơn đồng nghiệp khi được giúp — \"Thanks, I appreciate it!\"",
            "Không nói xấu đồng nghiệp với người khác trong công ty",
          ]}
        />
        <Card
          title="🦺 Safety Culture — Quan trọng nhất"
          titleColor="text-secondary"
          items={[
            "Safety không phải chọn — là bắt buộc pháp lý. Vi phạm bị đuổi ngay",
            "Thấy nguy hiểm → báo ngay, không im lặng",
            "Không tự ý sửa máy khi chưa được training — gọi maintenance",
            "Mặc đủ PPE dù chỉ đi qua khu vực sản xuất",
            "Tai nạn dù nhỏ → báo supervisor + điền incident report ngay",
          ]}
        />
        <Card
          title="📈 Để Được Đánh Giá Cao"
          titleColor="text-primary"
          items={[
            "Chủ động hỏi: \"Is there anything else I can help with?\"",
            "Làm xong việc trước deadline → báo sếp ngay",
            "Đề xuất cải tiến nhỏ (kaizen) — sếp Mỹ rất thích",
            "Học thêm kỹ năng → tự report với sếp: \"I just got certified in...\"",
            "Tự lập hơn theo thời gian — không hỏi từng việc nhỏ mãi",
          ]}
        />
      </div>

      <SubTitle>Quyền Lợi Lao Động — Bạn cần biết</SubTitle>
      <Alert tone="green" title="📋 Indiana Labor Law cơ bản">
        Lương tối thiểu Indiana: $7.25/giờ (nhưng LGS trả cao hơn
        ~$15-18/giờ). Overtime (&gt;40h/tuần) = x1.5 lương. Mọi giờ làm
        phải được trả — nếu bị gian lận có thể khiếu nại lên Department of
        Labor.
      </Alert>
      <DataTable
        headers={["Quyền lợi", "Thực tế tại nhà máy", "Nếu vi phạm → làm gì"]}
        rows={[
          ["Lương đúng hạn", "Thường 2 tuần/lần (bi-weekly), qua direct deposit", "Hỏi HR, nếu không giải quyết → gọi Indiana DOL: 1-800-457-8283"],
          ["Môi trường an toàn", "Có quyền từ chối việc nguy hiểm mà không bị đuổi", "Báo OSHA: 1-800-321-6742 (ẩn danh được)"],
          ["Không phân biệt đối xử", "Không được đối xử tệ hơn vì là người nhập cư/người Việt", "Báo EEOC: eeoc.gov"],
          ["Nghỉ ngơi", "Indiana không bắt buộc break — nhưng hầu hết hãng cho 2x15' + 30' lunch", "Xem employee handbook khi vào làm"],
        ]}
      />
    </div>
  );
}
