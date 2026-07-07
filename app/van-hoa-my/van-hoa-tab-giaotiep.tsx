// Tab "Giao Tiếp" — ported from Van_Hoa_My_Danh_Cho_Huy.html #giaotiep.

import { Alert, CompareCard, DataTable, SectionTitle, SubTitle } from "./van-hoa-ui";

export function VanHoaTabGiaoTiep() {
  return (
    <div>
      <SectionTitle>💬 Văn Hóa Giao Tiếp Của Người Mỹ</SectionTitle>

      <Alert tone="blue" title="🔑 Nguyên tắc vàng">
        Người Mỹ coi trọng <strong>sự thẳng thắn, tôn trọng cá nhân và đúng
        giờ</strong>. Không phải bất lịch sự — chỉ là văn hóa khác. Càng
        hiểu sớm, càng dễ hòa nhập.
      </Alert>

      <SubTitle>Việt Nam vs Mỹ — So sánh trực tiếp</SubTitle>
      <div className="mb-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <CompareCard
          variant="vn"
          title="🇻🇳 Ở Việt Nam"
          items={[
            "Gọi ông/bà/anh/chị theo tuổi tác",
            "Khiêm tốn khi được khen: \"không có gì\"",
            "Im lặng khi không đồng ý (để giữ hòa khí)",
            "Hỏi tuổi, lương, tình trạng hôn nhân là bình thường",
            "Đến trễ 10-15 phút vẫn chấp nhận được",
            "Hay dùng \"chờ tí\", \"xong ngay\" dù còn lâu",
            "Nói chuyện to, sôi nổi nơi công cộng",
          ]}
        />
        <CompareCard
          variant="us"
          title="🇺🇸 Ở Mỹ"
          items={[
            "Gọi tên thẳng (kể cả sếp) hoặc Mr./Ms. + họ",
            "Được khen thì nói \"Thank you!\" tự nhiên",
            "Nói thẳng khi không đồng ý (lịch sự nhưng rõ ràng)",
            "KHÔNG hỏi tuổi, lương, cân nặng — rất thô lỗ",
            "Đúng giờ là tôn trọng. Trễ 5 phút cần xin lỗi",
            "\"I'll be there at 3pm\" nghĩa là đúng 3pm",
            "Giữ giọng nhỏ, không dùng loa ngoài nơi công cộng",
          ]}
        />
      </div>

      <SubTitle>Cách xưng hô — Dễ nhầm nhất</SubTitle>
      <DataTable
        headers={["Tình huống", "Nên nói", "Không nên nói", "Ghi chú"]}
        rows={[
          ["Gặp sếp lần đầu", "\"Hi John\" hoặc \"Hi Mr. Smith\"", "Gọi \"Sir\" liên tục", "Hỏi luôn: \"What should I call you?\""],
          ["Gặp đồng nghiệp mới", "\"Hi, I'm [tên bạn]. Nice to meet you!\"", "Im lặng, cúi đầu", "Bắt tay chắc, nhìn vào mắt"],
          ["Khi bị khen", "\"Thank you, I appreciate it!\"", "\"Không có gì đâu\"", "Nhận lời khen tự nhiên là lịch sự"],
          ["Không nghe rõ", "\"Sorry, could you repeat that?\"", "Gật đầu như hiểu", "Người Mỹ không ngại nhắc lại"],
          ["Không đồng ý", "\"I see your point, but I think...\"", "Im lặng hoặc \"Vâng vâng\"", "Phản biện lịch sự được tôn trọng"],
          ["Muốn hỏi favor", "\"Could you do me a favor?\"", "Nhờ không hỏi trước", "Luôn hỏi trước khi nhờ"],
        ]}
      />

      <SubTitle>Small Talk — Chuyện phiếm hàng ngày</SubTitle>
      <Alert tone="green" title="💡 Small talk là kỹ năng quan trọng nhất">
        Người Mỹ nói chuyện phiếm với tất cả mọi người — hàng xóm, đồng
        nghiệp, người lạ xếp hàng. Đây không phải giả tạo — đây là cách họ
        xây dựng quan hệ. Học 5 chủ đề an toàn dưới đây.
      </Alert>
      <div className="mb-3.5 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-primary px-2.5 py-2 text-left text-xs font-medium text-white">Chủ đề an toàn</th>
              <th className="bg-primary px-2.5 py-2 text-left text-xs font-medium text-white">Câu mở đầu</th>
              <th className="bg-primary px-2.5 py-2 text-left text-xs font-medium text-white">Chủ đề TRÁNH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-bg-alt px-2.5 py-1.5 align-top text-text">☀️ Thời tiết</td>
              <td className="border-b border-bg-alt px-2.5 py-1.5 align-top text-text">&quot;Can you believe this weather?&quot;</td>
              <td rowSpan={5} className="border-b border-bg-alt px-2.5 py-1.5 align-middle text-xs leading-relaxed text-red-600">
                ❌ Chính trị<br />❌ Tôn giáo<br />❌ Thu nhập<br />❌ Cân nặng/ngoại hình<br />❌ Tình trạng hôn nhân
                <br /><br />
                <span className="text-text-muted">→ Nếu ai hỏi: lịch sự từ chối: &quot;I&apos;d rather not talk about that&quot;</span>
              </td>
            </tr>
            <tr className="bg-bg-alt">
              <td className="border-b border-bg-alt px-2.5 py-1.5 align-top text-text">🏈 Thể thao</td>
              <td className="border-b border-bg-alt px-2.5 py-1.5 align-top text-text">&quot;Did you watch the game last night?&quot;</td>
            </tr>
            <tr>
              <td className="border-b border-bg-alt px-2.5 py-1.5 align-top text-text">🍕 Ăn uống</td>
              <td className="border-b border-bg-alt px-2.5 py-1.5 align-top text-text">&quot;Have you tried that new place on Main St?&quot;</td>
            </tr>
            <tr className="bg-bg-alt">
              <td className="border-b border-bg-alt px-2.5 py-1.5 align-top text-text">🎬 Phim/TV</td>
              <td className="border-b border-bg-alt px-2.5 py-1.5 align-top text-text">&quot;Have you seen anything good lately?&quot;</td>
            </tr>
            <tr>
              <td className="px-2.5 py-1.5 align-top text-text">💼 Công việc (nhẹ)</td>
              <td className="px-2.5 py-1.5 align-top text-text">&quot;How&apos;s work been treating you?&quot;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
