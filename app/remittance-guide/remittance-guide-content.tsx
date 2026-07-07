"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";

type Tab = "compare" | "howto" | "tax" | "tips";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "compare", label: "⚖️ So Sánh Dịch Vụ" },
  { key: "howto", label: "📤 Cách Gửi An Toàn" },
  { key: "tax", label: "🧾 Quy Định Thuế" },
  { key: "tips", label: "💡 Mẹo & Lừa Đảo" },
];

const TH = "px-3 py-2 text-left text-xs font-bold text-primary bg-bg-alt border-b border-border";
const TD = "px-3 py-2 text-xs text-text-muted border-b border-border last:border-0 align-top";

export function RemittanceGuideContent() {
  const [tab, setTab] = useState<Tab>("compare");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">💸 Gửi Tiền Về Việt Nam</h1>
      <p className="mt-1 text-text-muted">So sánh phí Wise · Remitly · Western Union · Cách gửi an toàn · Quy định thuế quà tặng</p>

      <div className="mt-3 rounded-card border border-red-700/40 bg-red-950/10 p-3 text-xs text-red-300 leading-relaxed">
        🚩 Cảnh giác dịch vụ chuyển tiền "phí thấp bất thường" hoặc yêu cầu chuyển khoản trước cho người lạ. Xem <a href="/scam-warning" className="text-primary underline">Cảnh Báo Lừa Đảo</a> để biết các dấu hiệu phổ biến.
      </div>
      <div className="mt-3 rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
        💱 <strong className="text-text">Lưu ý:</strong> Phí và tỷ giá thay đổi theo ngày — số liệu trên trang này mang tính <strong className="text-text">tham khảo về cấu trúc phí và mức độ cạnh tranh tương đối</strong>. Luôn kiểm tra số tiền nhận thực tế ngay trước khi xác nhận giao dịch.
      </div>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* ─── COMPARE ─── */}
      {tab === "compare" && (
        <div>
          <div className="rounded-card border border-border bg-bg p-4 mb-4">
            <h3 className="text-xs font-bold text-text mb-2">2 Loại Phí Cần Hiểu Trước Khi So Sánh</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              <strong className="text-primary">1. Phí giao dịch (transfer fee):</strong> Số tiền cố định hoặc % hiển thị rõ ràng khi gửi.
              <br /><strong className="text-primary">2. Chênh lệch tỷ giá (exchange rate margin):</strong> Khoản "phí ẩn" — dịch vụ áp tỷ giá kém hơn tỷ giá thị trường thực và giữ phần chênh lệch. Đây thường là khoản phí lớn nhất nhưng khó nhận ra nhất.
            </p>
            <p className="text-xs text-text-muted mt-2"><strong className="text-yellow-400">Cách kiểm tra nhanh:</strong> So sánh số tiền VNĐ người nhận thực sự nhận được, không phải chỉ nhìn "phí $0" — vì chênh lệch tỷ giá có thể "ăn" 3–5% giá trị giao dịch.</p>
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Dịch Vụ</th><th className={TH}>Phí Giao Dịch</th><th className={TH}>Tỷ Giá</th><th className={TH}>Tốc Độ</th><th className={TH}>Cách Nhận Tại VN</th></tr></thead>
              <tbody>
                {[
                  ["Wise", "Thấp, hiển thị rõ trước khi gửi (thường ~0.5–2%)", "Tỷ giá thị trường thực (mid-market), gần như không chênh lệch", "Vài giờ - 1 ngày", "Chuyển khoản ngân hàng VN"],
                  ["Remitly", "Thấp hoặc $0 cho chuyển khoản chậm; phí cao hơn cho express", "Chênh lệch vừa phải, cần kiểm tra tỷ giá hiển thị trước khi xác nhận", "Vài phút (express) - 3–5 ngày (kinh tế)", "Chuyển khoản, nhận tiền mặt, ví điện tử"],
                  ["Western Union", "Thay đổi nhiều theo số tiền & phương thức, thường cao hơn Wise/Remitly", "Thường chênh lệch tỷ giá lớn hơn — kiểm tra kỹ trước khi gửi", "Vài phút (tiền mặt) - vài ngày", "Mạng lưới đại lý rộng khắp VN, nhận tiền mặt tại quầy"],
                  ["MoneyGram", "Tương tự Western Union — thay đổi theo điểm nhận & tốc độ", "Cần so sánh tỷ giá hiển thị trực tiếp lúc gửi", "Vài phút - vài ngày", "Đại lý, ngân hàng đối tác, ví điện tử"],
                  ["Wire (ngân hàng)", "Phí cố định $25–50/giao dịch, áp dụng cả 2 đầu", "Ngân hàng thường áp tỷ giá kém cạnh tranh hơn", "1–5 ngày làm việc", "Tài khoản ngân hàng VN"],
                ].map(([name, fee, rate, speed, receive]) => (
                  <tr key={name as string}>
                    <td className={`${TD} font-semibold text-text`}>{name as string}</td>
                    <td className={TD}>{fee as string}</td>
                    <td className={TD}>{rate as string}</td>
                    <td className={TD}>{speed as string}</td>
                    <td className={TD}>{receive as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Nên Chọn Dịch Vụ Nào?</h3>
          <div className="space-y-2">
            {[
              ["💚", "Số tiền lớn, không gấp:", "Wise thường có chi phí tổng thấp nhất nhờ tỷ giá gần với thị trường thực — phù hợp gửi định kỳ về cho gia đình."],
              ["⚡", "Cần tiền gấp, người nhận không có tài khoản ngân hàng:", "Western Union/MoneyGram mạnh về mạng lưới nhận tiền mặt rộng khắp các tỉnh thành VN."],
              ["📱", "Người nhận quen dùng ví điện tử/app ngân hàng:", "Remitly thường có lựa chọn chuyển thẳng vào ví điện tử hoặc app ngân hàng VN với tốc độ nhanh."],
              ["🏦", "Số tiền rất lớn (mua nhà, đầu tư):", "Cân nhắc wire chuyển khoản qua ngân hàng — chậm hơn nhưng phù hợp với giao dịch giá trị cao cần chứng từ ngân hàng chính thức."],
            ].map(([icon, title, body]) => (
              <div key={title as string} className="flex gap-3 text-xs text-text-muted rounded-card border border-border bg-bg p-3">
                <span className="text-lg shrink-0">{icon as string}</span>
                <span><strong className="text-text">{title as string}</strong> {body as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── HOW TO ─── */}
      {tab === "howto" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-3">📤 Quy Trình Gửi Tiền An Toàn, Hiệu Quả</h3>
          <ol className="space-y-2 mb-4">
            {[
              ["Xác minh thông tin người nhận chính xác 100%", "Tên đầy đủ khớp với giấy tờ tùy thân, số tài khoản ngân hàng, tên ngân hàng và chi nhánh. Sai một ký tự có thể khiến giao dịch bị treo hoặc mất tiền."],
              ["So sánh tỷ giá thực tế ở 2–3 dịch vụ trước khi gửi", "Nhập cùng một số tiền vào Wise, Remitly, và Western Union, xem số VNĐ người nhận thực nhận — đây là cách so sánh chính xác nhất."],
              ["Chọn phương thức nhận phù hợp với người nhận", "Hỏi gia đình: họ có tài khoản ngân hàng không, có dùng ví điện tử (MoMo, ZaloPay) không, hay cần nhận tiền mặt tại đại lý gần nhà."],
              ["Theo dõi mã giao dịch (tracking number)", "Mọi dịch vụ uy tín đều cấp mã theo dõi; gửi mã này cho người nhận để họ kiểm tra trạng thái hoặc đến đại lý nhận tiền mặt."],
              ["Lưu lại biên nhận và lịch sử giao dịch", "Cần thiết khi khai thuế cuối năm và để đối chiếu nếu có tranh chấp."],
              ["Gửi định kỳ thay vì gửi một lần số tiền lớn", "Vừa dễ quản lý ngân sách cá nhân, vừa tránh các ngưỡng yêu cầu khai báo bổ sung."],
            ].map(([title, body], i) => (
              <li key={i} className="flex gap-3 text-xs text-text-muted">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span><strong className="text-text block">{title}</strong>{body}</span>
              </li>
            ))}
          </ol>
          <div className="rounded-card border border-border bg-bg p-3">
            <h4 className="text-xs font-semibold text-text mb-2">Giấy Tờ Thường Cần Khi Gửi Số Tiền Lớn</h4>
            <ul className="space-y-1 text-xs text-text-muted">
              <li>📄 Giấy tờ tùy thân còn hiệu lực (bằng lái, Green Card, hộ chiếu)</li>
              <li>📄 Thông tin nguồn gốc số tiền (một số dịch vụ/ngân hàng yêu cầu giải trình theo quy định chống rửa tiền)</li>
              <li>📄 Thông tin đầy đủ người nhận (tên theo giấy tờ, số điện thoại, địa chỉ, số tài khoản)</li>
            </ul>
          </div>
        </div>
      )}

      {/* ─── TAX ─── */}
      {tab === "tax" && (
        <div>
          <div className="mb-3 rounded-card border border-green-700/40 bg-green-950/20 p-3 text-xs text-green-300 leading-relaxed">
            ✅ <strong>Tin tốt cho đa số người gửi:</strong> Gửi tiền cho gia đình ở Việt Nam (mang tính chất quà tặng) <strong>thường KHÔNG bị đánh thuế ngay</strong> với số tiền vừa phải. Quy định dưới đây chủ yếu liên quan đến <strong>nghĩa vụ khai báo</strong>, không có nghĩa là bạn phải trả thêm thuế.
          </div>
          <div className="rounded-card border border-border bg-bg p-4 mb-3">
            <h3 className="text-xs font-bold text-text mb-2">Mức miễn trừ hàng năm mỗi người nhận (Annual Gift Tax Exclusion)</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              IRS quy định mỗi người được tặng tối đa một khoản miễn trừ nhất định <strong className="text-primary">cho mỗi người nhận, mỗi năm</strong> mà <strong className="text-text">không cần khai báo gì cả</strong>. Mức này được điều chỉnh theo từng năm (khoảng $17,000–19,000/người nhận/năm — kiểm tra số liệu chính thức năm hiện tại trên <strong className="text-primary">irs.gov</strong>).
              <br /><br />
              <strong className="text-text">Vượt ngưỡng trong 1 năm cho cùng 1 người nhận:</strong> Người <strong>gửi</strong> cần khai vào <strong className="text-primary">Form 709</strong> — nhưng phần lớn <strong>vẫn KHÔNG phải trả thuế ngay</strong>, vì khoản vượt sẽ được trừ dần vào lifetime exemption.
            </p>
          </div>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Tình Huống</th><th className={TH}>Có Cần Khai Báo?</th><th className={TH}>Có Phải Trả Thuế Ngay?</th></tr></thead>
              <tbody>
                {[
                  ["Gửi $5,000/năm cho mẹ ở VN", "Không", "Không"],
                  ["Gửi $25,000 trong 1 năm cho cùng 1 người", "Có — người gửi khai Form 709", "Thường không (trừ vào lifetime exemption)"],
                  ["Nhận thừa kế/quà tặng từ người ở nước ngoài >$100,000/năm", "Có — người nhận khai Form 3520", "Không (chỉ là khai báo thông tin)"],
                  ["Tài khoản ngân hàng ở VN tổng số dư >$10,000 bất kỳ lúc nào trong năm", "Có — khai FBAR (FinCEN Form 114)", "Không trực tiếp, nhưng phải khai đúng hạn để tránh phạt nặng"],
                ].map(([sit, dec, tax]) => (
                  <tr key={sit as string}>
                    <td className={`${TD} text-text`}>{sit as string}</td>
                    <td className={TD}>{dec as string}</td>
                    <td className={TD}>{tax as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-card border border-yellow-700/40 bg-yellow-950/20 p-3 text-xs text-yellow-300 leading-relaxed mb-3">
            ⚠️ <strong>Phân biệt rõ:</strong> "Phải khai báo" khác hoàn toàn với "phải trả thuế". Đa số trường hợp gửi tiền về gia đình chỉ rơi vào diện cần lưu hồ sơ — không phát sinh thêm thuế. Tuy nhiên <strong>không khai báo khi bắt buộc</strong> có thể bị phạt nặng hơn nhiều so với số thuế.
          </div>
          <div className="rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
            👨‍💼 Nếu bạn thường xuyên gửi số tiền lớn, hoặc có tài khoản/tài sản ở Việt Nam, hãy tham khảo <strong className="text-text">CPA hoặc chuyên gia thuế quốc tế</strong>. Trang này chỉ mang tính giáo dục, không thay thế tư vấn thuế chuyên nghiệp.
          </div>
        </div>
      )}

      {/* ─── TIPS ─── */}
      {tab === "tips" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-2">Mẹo Tiết Kiệm Chi Phí</h3>
          <div className="space-y-2 mb-4">
            {[
              ["📅", "Gộp giao dịch nhỏ thành 1 lần gửi lớn hơn:", "Phí cố định (như wire $25–50) chiếm tỷ lệ % nhỏ hơn khi số tiền gửi lớn — gửi 1 lần $1,000 thường tiết kiệm hơn gửi 4 lần $250."],
              ["⏰", "Chọn tốc độ kinh tế thay vì tức thì khi không gấp:", "Phương thức chuyển chậm hơn (1–3 ngày) thường có phí thấp hơn đáng kể so với chuyển ngay lập tức."],
              ["🔔", "Đăng ký nhận thông báo tỷ giá tốt:", "Một số ứng dụng (như Wise) cho phép đặt cảnh báo khi tỷ giá đạt mức mong muốn — gửi tiền vào đúng thời điểm tỷ giá thuận lợi."],
              ["🎁", "Tận dụng ưu đãi cho người dùng mới:", "Wise, Remitly thường miễn phí giao dịch đầu tiên hoặc giảm phí cho người mới đăng ký — kiểm tra trước khi gửi lần đầu."],
            ].map(([icon, title, body]) => (
              <div key={title as string} className="flex gap-3 text-xs text-text-muted rounded-card border border-border bg-bg p-3">
                <span className="text-lg shrink-0">{icon as string}</span>
                <span><strong className="text-text">{title as string}</strong> {body as string}</span>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Dấu Hiệu Lừa Đảo Cần Cảnh Giác</h3>
          <div className="space-y-2 mb-4">
            {[
              ["Người thân nhắn tin khẩn cấp đổi số tài khoản nhận:", "Luôn gọi điện trực tiếp xác nhận bằng giọng nói thật trước khi gửi — kẻ gian thường giả mạo tin nhắn để đổi thông tin nhận tiền vào phút chót."],
              ["Yêu cầu gửi tiền qua dịch vụ lạ để hưởng tỷ giá siêu tốt:", "Tỷ giá cao bất thường so với thị trường gần như luôn là chiêu lừa — chỉ dùng các dịch vụ uy tín, có giấy phép hoạt động rõ ràng."],
              ["Đầu tư hộ hoặc đổi tiền chợ đen:", "Đây là hình thức lừa đảo phổ biến nhắm vào cộng đồng người Việt — tiền gửi đi thường mất trắng, không có cách nào truy hồi."],
              ["Email/SMS giả mạo dịch vụ chuyển tiền yêu cầu xác minh tài khoản:", "Không bấm vào link lạ — luôn truy cập trực tiếp website/app chính thức để kiểm tra trạng thái giao dịch."],
            ].map(([title, body]) => (
              <div key={title as string} className="flex gap-2 text-xs text-text-muted rounded-card border border-red-800/30 bg-red-950/10 p-3">
                <span className="shrink-0 text-red-400">🚩</span>
                <span><strong className="text-text">{title as string}</strong> {body as string}</span>
              </div>
            ))}
          </div>
          <div className="rounded-card border border-green-700/40 bg-green-950/20 p-3 text-xs text-green-300 leading-relaxed">
            ✅ <strong>Quy tắc an toàn cốt lõi:</strong> Chỉ dùng dịch vụ chuyển tiền có giấy phép hoạt động hợp pháp tại Mỹ, luôn xác minh thông tin người nhận qua kênh liên lạc đã biết từ trước (gọi điện thoại trực tiếp), và không bao giờ vội vàng gửi tiền vì áp lực "khẩn cấp".
          </div>
        </div>
      )}
    </div>
  );
}
