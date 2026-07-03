// Tab "Lễ Nghi" — ported from Van_Hoa_My_Danh_Cho_Huy.html #lenhgi.

import { Alert, Card, DataTable, SectionTitle, SubTitle } from "./van-hoa-ui";

export function VanHoaTabLeNghi() {
  return (
    <div>
      <SectionTitle>🎭 Lễ Nghi &amp; Văn Hóa Ứng Xử</SectionTitle>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card
          title="🚫 Tuyệt Đối KHÔNG Làm"
          titleColor="text-red-600"
          items={[
            "Không chen hàng — bất kể ở đâu, dù chỉ 1 người",
            "Không hỏi lương, tuổi, cân nặng người khác",
            "Không đánh/phạt trẻ em nơi công cộng (gọi 911 ngay)",
            "Không nói to hay dùng loa ngoài chỗ công cộng",
            "Không vứt rác ngoài đường — phạt tiền nặng",
            "Không uống rượu nơi công cộng (ngoài bar/nhà hàng có phép)",
            "Không lái xe sau khi uống rượu — DUI = tù + mất bằng",
            "Không chụp ảnh trẻ em người khác mà không xin phép",
            "Không hút thuốc trong nhà, xe, chỗ làm khi chưa hỏi",
          ]}
        />
        <Card
          title="✅ Nên Làm Để Được Yêu Quý"
          titleColor="text-accent"
          items={[
            "Giữ cửa cho người đi sau — đây là lịch sự cơ bản",
            "Smile và nói \"Hi\" khi gặp hàng xóm",
            "Nói \"Excuse me\" khi muốn đi qua",
            "Nói \"Please\" và \"Thank you\" rất thường xuyên",
            "Tip 15-20% tại nhà hàng, 10-15% taxi/Uber",
            "RSVP đúng hạn khi được mời sự kiện",
            "Đúng giờ mọi cuộc hẹn — đây là tôn trọng thời gian người khác",
            "Giữ sạch không gian chung (nhà bếp công ty, nhà vệ sinh chung...)",
          ]}
        />
      </div>

      <SubTitle>Các Ngày Lễ Mỹ — Bạn Cần Biết</SubTitle>
      <DataTable
        headers={["Ngày lễ", "Khi nào", "Ý nghĩa", "Tại nơi làm việc"]}
        rows={[
          ["Independence Day", "4 tháng 7", "Quốc khánh Mỹ — pháo hoa khắp nơi", "Thường nghỉ 1 ngày. Hãng có thể cho OT x1.5"],
          ["Labor Day", "Thứ 2 đầu tháng 9", "Ngày của người lao động — BBQ và nghỉ", "Thường nghỉ. Nhiều hãng trả OT nếu làm"],
          ["Thanksgiving", "Thứ 5 cuối tháng 11", "Lễ tạ ơn — ăn gà tây, sum họp gia đình", "Nghỉ 1-4 ngày. Quan trọng nhất sau Christmas"],
          ["Christmas", "25 tháng 12", "Lễ Giáng sinh — nghỉ dài nhất trong năm", "Nghỉ thường 2-5 ngày. Hãng hay tặng bonus"],
          ["New Year's Day", "1 tháng 1", "Năm mới — pháo hoa đêm 31/12", "Nghỉ 1 ngày. Ít ồn ào hơn Thanksgiving"],
          ["Memorial Day", "Thứ 2 cuối tháng 5", "Tưởng niệm liệt sĩ — BBQ, mở bể bơi", "Nghỉ 1 ngày — \"Unofficial start of summer\""],
        ]}
      />

      <SubTitle>Tipping Culture — Khác Hoàn Toàn VN</SubTitle>
      <Alert tone="amber" title="💵 Tip là một phần lương của nhân viên dịch vụ — không tip là thiếu tôn trọng" />
      <DataTable
        headers={["Dịch vụ", "Mức tip chuẩn", "Ghi chú"]}
        rows={[
          ["Nhà hàng (sit-down)", "15-20% tổng bill", "18-20% cho dịch vụ tốt. 15% cho dịch vụ bình thường"],
          ["Giao đồ ăn (DoorDash, Uber Eats)", "$3-5 hoặc 10-15%", "Tip khi đặt, không phải khi nhận"],
          ["Taxi / Uber / Lyft", "10-15%", "App tự tính sẵn, chọn trước khi ra xe"],
          ["Tiệm nail", "15-20%", "Khách Mỹ tip gần như 100%. Đây là thu nhập chính của nail tech"],
          ["Cắt tóc", "$3-5 hoặc 15%", "Thường để tiền mặt trực tiếp cho thợ"],
          ["Fast food / Coffee (counter)", "Không bắt buộc", "App hay hỏi tip — không chọn cũng ổn"],
        ]}
      />
    </div>
  );
}
