"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";

type Tab = "basic" | "pay" | "safety" | "report" | "fraud";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "basic", label: "⚖️ Quyền Cơ Bản" },
  { key: "pay", label: "💵 Tiền Lương & Giờ Làm" },
  { key: "safety", label: "🦺 An Toàn Lao Động" },
  { key: "report", label: "📋 Cách Tố Cáo" },
  { key: "fraud", label: "🚨 Lừa Đảo Tuyển Dụng" },
];

const TH = "px-3 py-2 text-left text-xs font-bold text-primary bg-bg-alt border-b border-border";
const TD = "px-3 py-2 text-xs text-text-muted border-b border-border last:border-0 align-top";

export function WorkerRightsContent() {
  const [tab, setTab] = useState<Tab>("basic");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">⚖️ Quyền Lợi Người Lao Động EB-3</h1>
      <p className="mt-1 text-text-muted">Quyền cơ bản · Lương & giờ làm · An toàn · Cách tố cáo · Cảnh báo lừa đảo</p>

      <div className="mt-3 rounded-card border border-green-700/40 bg-green-950/20 p-3 text-xs text-green-300 leading-relaxed">
        ✅ <strong>Quan trọng:</strong> Với tư cách người lao động hợp pháp tại Mỹ, bạn được bảo vệ bởi luật lao động liên bang và tiểu bang <strong>bất kể tình trạng di trú</strong>. Chủ sử dụng lao động KHÔNG được phép trả lương thấp hơn mức tối thiểu hoặc không trả lương làm thêm giờ vì bạn là người nhập cư.
      </div>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* ─── BASIC RIGHTS ─── */}
      {tab === "basic" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-3">Mức Lương Tối Thiểu Liên Bang & Tiểu Bang</h3>
          <div className="rounded-card border border-primary/20 bg-primary/5 p-3 mb-3 text-xs text-text-muted leading-relaxed">
            <strong className="text-text">Luật FLSA (Fair Labor Standards Act):</strong> Đặt mức lương tối thiểu liên bang. Khi tiểu bang có mức cao hơn, áp dụng mức tiểu bang. Chủ thuê lao động PHẢI trả mức cao hơn giữa hai mức này — không có ngoại lệ.
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Tiểu Bang</th><th className={TH}>Mức Lương Tối Thiểu</th><th className={TH}>Ghi Chú</th></tr></thead>
              <tbody>
                {[
                  ["Georgia (GA)", "$7.25/giờ", "Bằng mức liên bang"],
                  ["Texas (TX)", "$7.25/giờ", "Bằng mức liên bang"],
                  ["Florida (FL)", "$13.00/giờ", "Tăng dần theo lộ trình đến $15"],
                  ["Indiana (IN)", "$7.25/giờ", "Bằng mức liên bang"],
                  ["Wisconsin (WI)", "$7.25/giờ", "Bằng mức liên bang"],
                  ["North Carolina (NC)", "$7.25/giờ", "Bằng mức liên bang"],
                  ["Pennsylvania (PA)", "$7.25/giờ", "Bằng mức liên bang"],
                  ["Ohio (OH)", "$10.45/giờ", "Cao hơn mức liên bang"],
                  ["Alabama (AL)", "$7.25/giờ", "Bằng mức liên bang"],
                ].map(([state, wage, note]) => (
                  <tr key={state as string}>
                    <td className={`${TD} font-semibold text-text`}>{state as string}</td>
                    <td className={`${TD} font-semibold text-green-400`}>{wage as string}</td>
                    <td className={TD}>{note as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Các Quyền Lao Động Cốt Lõi</h3>
          <div className="space-y-2">
            {[
              ["💰", "Làm thêm giờ (Overtime):", "FLSA yêu cầu trả 1.5x lương khi làm quá 40 giờ/tuần. Chủ thuê không được thỏa thuận \"bỏ overtime\" — đây là quyền không thể từ bỏ."],
              ["🦺", "An toàn nơi làm việc (OSHA):", "Quyền làm việc trong môi trường an toàn, quyền được đào tạo về an toàn, quyền từ chối công việc nguy hiểm nghiêm trọng mà không bị sa thải."],
              ["🚫", "Chống phân biệt đối xử (Title VII):", "Bảo vệ khỏi phân biệt đối xử dựa trên chủng tộc, màu da, quốc tịch, tôn giáo, giới tính. Áp dụng cho tuyển dụng, thăng tiến, và điều kiện làm việc."],
              ["🌍", "Bảo vệ bất kể tình trạng di trú:", "Luật lao động liên bang bảo vệ TẤT CẢ người lao động — kể cả người không có giấy tờ. Chủ thuê không thể đe dọa báo ICE để tránh trả lương hay che giấu vi phạm."],
              ["👨‍👩‍👧", "Nghỉ phép gia đình (FMLA):", "Nếu công ty ≥50 nhân viên và bạn đã làm ≥12 tháng, được 12 tuần nghỉ không lương/năm cho sinh con, chăm sóc người thân ốm nặng, hoặc bản thân ốm nặng — không bị sa thải."],
            ].map(([icon, title, body]) => (
              <div key={title as string} className="flex gap-3 text-xs text-text-muted rounded-card border border-border bg-bg p-3">
                <span className="text-lg shrink-0">{icon as string}</span>
                <span><strong className="text-text">{title as string}</strong> {body as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── PAY ─── */}
      {tab === "pay" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-3">Đọc Hiểu Pay Stub (Phiếu Lương)</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Dòng Trên Pay Stub</th><th className={TH}>Ý Nghĩa</th><th className={TH}>Bình Thường / Cờ Đỏ</th></tr></thead>
              <tbody>
                {[
                  ["Gross Pay", "Lương tổng trước khi trừ thuế và các khoản khác", "Phải khớp với số giờ làm × tỷ lệ lương"],
                  ["Federal Income Tax", "Thuế thu nhập liên bang khấu trừ", "Tỷ lệ khác nhau tùy W-4 và mức lương"],
                  ["Social Security (6.2%)", "Đóng góp an sinh xã hội", "Luôn là 6.2% gross, không bao giờ khác"],
                  ["Medicare (1.45%)", "Bảo hiểm y tế liên bang", "Luôn là 1.45% gross, không bao giờ khác"],
                  ["State Income Tax", "Thuế thu nhập tiểu bang (nếu có)", "Một số tiểu bang như TX, FL không có thuế thu nhập"],
                  ["Net Pay", "Tiền thực nhận vào tài khoản", "Gross - tất cả các khoản khấu trừ"],
                ].map(([line, meaning, check]) => (
                  <tr key={line as string}>
                    <td className={`${TD} font-semibold text-text`}>{line as string}</td>
                    <td className={TD}>{meaning as string}</td>
                    <td className={TD}>{check as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Tính Lương Làm Thêm Giờ</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Giờ Làm Trong Tuần</th><th className={TH}>Tỷ Lệ Trả</th><th className={TH}>Ví Dụ ($15/giờ)</th></tr></thead>
              <tbody>
                {[
                  ["1–40 giờ", "1.0x (lương bình thường)", "$15.00/giờ"],
                  ["Từ giờ 41 trở đi", "1.5x (overtime)", "$22.50/giờ"],
                ].map(([hrs, rate, ex]) => (
                  <tr key={hrs as string}><td className={TD}>{hrs as string}</td><td className={`${TD} font-semibold text-green-400`}>{rate as string}</td><td className={TD}>{ex as string}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Khấu Trừ Hợp Lệ vs. Không Hợp Lệ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="rounded-card border border-green-700/30 bg-green-950/10 p-3">
              <p className="text-xs font-semibold text-green-400 mb-2">✅ Khấu Trừ Hợp Lệ</p>
              {["Thuế thu nhập liên bang & tiểu bang", "Social Security (6.2%) và Medicare (1.45%)", "Phí bảo hiểm sức khỏe (nếu có gói công ty)", "Đóng góp 401(k) tự nguyện", "Các khoản bạn đã đồng ý bằng văn bản"].map((item) => (
                <p key={item} className="text-xs text-text-muted">• {item}</p>
              ))}
            </div>
            <div className="rounded-card border border-red-700/30 bg-red-950/10 p-3">
              <p className="text-xs font-semibold text-red-400 mb-2">🚩 Khấu Trừ Không Hợp Lệ</p>
              {["Phí tuyển dụng hoặc visa (chủ thuê phải tự trả)", "\"Phí đồng phục\" làm lương xuống dưới mức tối thiểu", "Khấu trừ vì sai lầm của nhân viên (thường không hợp lệ)", "Tiền \"đặt cọc\" với chủ thuê", "Bất kỳ khoản nào bạn không ký đồng ý"].map((item) => (
                <p key={item} className="text-xs text-text-muted">• {item}</p>
              ))}
            </div>
          </div>
          <div className="rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted">
            📞 Nếu chủ thuê trả thiếu lương hoặc khấu trừ bất hợp pháp, liên hệ <strong className="text-primary">DOL Wage & Hour Division: 1-866-487-9243</strong> (miễn phí, bảo mật thông tin).
          </div>
        </div>
      )}

      {/* ─── SAFETY ─── */}
      {tab === "safety" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-2">Quyền An Toàn Lao Động (OSHA)</h3>
          <div className="space-y-2 mb-4">
            {[
              ["Được làm việc trong môi trường không có nguy hiểm đe dọa tính mạng hoặc sức khỏe nghiêm trọng."],
              ["Được đào tạo về an toàn bằng ngôn ngữ bạn hiểu — chủ thuê không thể chỉ hướng dẫn bằng tiếng Anh nếu bạn không hiểu."],
              ["Được xem hồ sơ tai nạn/bệnh nghề nghiệp của công ty theo yêu cầu."],
              ["Quyền từ chối công việc nguy hiểm nghiêm trọng mà không bị sa thải — nếu mối nguy hiểm rõ ràng và ngay lập tức."],
              ["Quyền tố cáo vi phạm an toàn với OSHA mà không bị trả thù."],
            ].map((right, i) => (
              <div key={i} className="flex gap-3 text-xs text-text-muted rounded-card border border-border bg-bg p-2.5">
                <span className="text-green-400 shrink-0">✅</span>
                <span>{right}</span>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Nguy Hiểm Phổ Biến Theo Ngành</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Ngành Làm Việc</th><th className={TH}>Nguy Hiểm Phổ Biến</th><th className={TH}>Thiết Bị Bảo Hộ Thường Cần</th></tr></thead>
              <tbody>
                {[
                  ["Nhà máy chế biến thực phẩm", "Dao, máy móc cắt, sàn trơn, nhiệt độ thấp", "Găng tay chống cắt, giày chống trơn, áo giữ ấm"],
                  ["Resort / khách sạn", "Hóa chất vệ sinh, nâng vật nặng, nhiệt (bếp)", "Găng tay cao su, đai lưng, thiết bị bảo hộ nhiệt"],
                  ["Kho hàng / logistics", "Xe nâng, kệ hàng cao, vật nặng, không khí bụi", "Mũ bảo hiểm, giày mũi thép, áo phản quang"],
                ].map(([industry, hazards, ppe]) => (
                  <tr key={industry as string}>
                    <td className={`${TD} font-semibold text-text`}>{industry as string}</td>
                    <td className={TD}>{hazards as string}</td>
                    <td className={TD}>{ppe as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Quy Trình Khi Bị Tai Nạn Lao Động</h3>
          <ol className="space-y-2 mb-4">
            {[
              ["Báo cáo ngay cho supervisor", "Dù chấn thương nhỏ — nhiều tiểu bang yêu cầu báo cáo trong 24–72 giờ để được hưởng Workers' Compensation."],
              ["Đến cơ sở y tế hoặc ER", "Ưu tiên sức khỏe trước. Công ty thường có danh sách cơ sở y tế được phê duyệt cho Workers' Comp."],
              ["Lưu lại mọi giấy tờ y tế", "Hóa đơn, chẩn đoán, đơn thuốc — cần thiết khi yêu cầu bồi thường."],
              ["Nộp đơn Workers' Compensation", "Bảo hiểm bắt buộc của chủ thuê — bao gồm chi phí y tế và một phần thu nhập khi nghỉ dưỡng bệnh do tai nạn lao động."],
            ].map(([title, body], i) => (
              <li key={i} className="flex gap-3 text-xs text-text-muted">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span><strong className="text-text block">{title}</strong>{body}</span>
              </li>
            ))}
          </ol>
          <div className="rounded-card border border-red-700/40 bg-red-950/10 p-3 text-xs text-red-300 leading-relaxed">
            🚩 <strong>Trả thù là bất hợp pháp:</strong> Chủ thuê không được sa thải, giảm giờ, hoặc đối xử tệ hơn với bạn vì báo cáo tai nạn hoặc tố cáo vi phạm an toàn với OSHA. Đây là hành vi vi phạm nghiêm trọng luật liên bang.
          </div>
        </div>
      )}

      {/* ─── REPORT ─── */}
      {tab === "report" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-3">Cơ Quan Tiếp Nhận Tố Cáo Vi Phạm Lao Động</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse rounded-card overflow-hidden border border-border">
              <thead><tr><th className={TH}>Cơ Quan</th><th className={TH}>Phụ Trách</th><th className={TH}>Liên Hệ</th></tr></thead>
              <tbody>
                {[
                  ["DOL Wage & Hour Division", "Tiền lương, giờ làm, overtime, FMLA", "1-866-487-9243"],
                  ["OSHA", "An toàn lao động, chấn thương nghề nghiệp", "1-800-321-6742"],
                  ["EEOC", "Phân biệt đối xử (chủng tộc, quốc tịch, giới tính)", "1-800-669-4000"],
                  ["NLRB", "Quyền tổ chức công đoàn, quyền đình công tập thể", "1-844-762-6572"],
                  ["Legal Aid / Trợ giúp pháp lý", "Hỗ trợ pháp lý miễn phí nếu thu nhập thấp", "lawhelp.org → chọn tiểu bang"],
                ].map(([agency, handles, contact]) => (
                  <tr key={agency as string}>
                    <td className={`${TD} font-semibold text-text`}>{agency as string}</td>
                    <td className={TD}>{handles as string}</td>
                    <td className={`${TD} text-primary font-semibold`}>{contact as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Quy Trình Tố Cáo Với DOL</h3>
          <ol className="space-y-2 mb-4">
            {[
              ["Ghi lại chi tiết vi phạm", "Ngày, giờ, số tiền bị trả thiếu, tên supervisor — càng cụ thể càng tốt. Ảnh chụp pay stub và lịch làm việc nếu có."],
              ["Liên hệ DOL Wage & Hour Division", "Gọi 1-866-487-9243 hoặc nộp đơn trực tuyến tại dol.gov/agencies/whd. Có phiên dịch miễn phí."],
              ["DOL tiến hành điều tra", "Thường bảo mật danh tính người tố cáo trong quá trình điều tra. Chủ thuê không được biết ai đã báo cáo."],
              ["DOL ra quyết định & yêu cầu bồi thường", "Nếu xác nhận vi phạm, DOL yêu cầu chủ thuê trả tiền lương còn thiếu cộng tiền phạt."],
              ["Khiếu nại lên tòa án nếu cần", "Bạn cũng có quyền tự kiện riêng — tham khảo luật sư lao động nếu số tiền lớn hoặc tình huống phức tạp."],
            ].map(([title, body], i) => (
              <li key={i} className="flex gap-3 text-xs text-text-muted">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span><strong className="text-text block">{title}</strong>{body}</span>
              </li>
            ))}
          </ol>
          <div className="rounded-card border border-green-700/40 bg-green-950/20 p-3 text-xs text-green-300 leading-relaxed">
            🔒 <strong>Bảo mật danh tính:</strong> Các cơ quan liên bang như DOL và OSHA thường bảo vệ danh tính người tố cáo. Luật chống trả thù liên bang bảo vệ bạn khỏi bị sa thải hoặc bị đối xử tệ hơn vì tố cáo. Nếu bị trả thù, bản thân đó là vi phạm bổ sung cần báo cáo.
          </div>
        </div>
      )}

      {/* ─── FRAUD ─── */}
      {tab === "fraud" && (
        <div>
          <h3 className="text-xs font-bold text-primary mb-3">Dấu Hiệu Lừa Đảo Tuyển Dụng / Buôn Người Lao Động</h3>
          <div className="space-y-2 mb-4">
            {[
              ["Yêu cầu trả phí tuyển dụng hoặc phí visa:", "Chủ thuê hợp pháp EB-3 PHẢI trả phí tuyển dụng và visa — bất kỳ ai yêu cầu bạn trả là vi phạm pháp luật và dấu hiệu lừa đảo/buôn người."],
              ["Giữ passport hoặc giấy tờ tùy thân:", "Không ai có quyền giữ hộ chiếu hoặc giấy tờ của bạn. Đây là dấu hiệu nghiêm trọng của buôn bán người lao động."],
              ["Cam kết công việc vượt quá thực tế:", "Lương $30+/giờ cho công việc không cần kỹ năng, cam kết nhà ở miễn phí cao cấp, cơ hội \"đặc biệt\" chỉ dành cho bạn — hầu hết là mồi nhử."],
              ["Điều kiện làm việc khác hoàn toàn với hợp đồng:", "Nếu công việc, địa điểm, lương, hoặc điều kiện sống khác với những gì cam kết trước khi bạn rời Việt Nam, đây là dấu hiệu của lừa đảo."],
              ["Bị cô lập khỏi cộng đồng và gia đình:", "Chủ thuê/môi giới hạn chế tiếp xúc với người ngoài, kiểm soát điện thoại, hoặc không cho bạn tự do đi lại — đây là dấu hiệu buôn người lao động."],
              ["Đe dọa trục xuất hoặc hủy visa:", "Chủ thuê không có quyền trực tiếp hủy visa hoặc báo ICE vì lý do lao động — đây là chiêu kiểm soát không có cơ sở pháp lý."],
              ["Yêu cầu làm thêm giờ không được trả công:", "Làm 60–70 giờ/tuần nhưng chỉ được trả lương 40 giờ là vi phạm nghiêm trọng luật lao động, đặc biệt nếu kết hợp với các dấu hiệu kiểm soát khác."],
            ].map(([title, body]) => (
              <div key={title as string} className="flex gap-2 text-xs text-text-muted rounded-card border border-red-800/30 bg-red-950/10 p-3">
                <span className="shrink-0 text-red-400">🚩</span>
                <span><strong className="text-text">{title as string}</strong> {body as string}</span>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-primary mb-2">Xác Minh Chủ Thuê & Nhà Tuyển Dụng</h3>
          <div className="space-y-2 mb-4">
            {[
              ["Kiểm tra đăng ký kinh doanh của công ty tuyển dụng tại tiểu bang họ hoạt động."],
              ["Yêu cầu xem bản sao công việc (job order) đã được nộp lên DOL — đây là tài liệu công khai cho visa EB-3."],
              ["Tìm kiếm tên công ty + \"lawsuit\" hoặc \"DOL violation\" trên Google để xem lịch sử vi phạm."],
              ["Liên hệ cộng đồng người Việt tại tiểu bang bạn sẽ đến — họ thường biết về chủ thuê uy tín và không uy tín."],
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 text-xs text-text-muted rounded-card border border-border bg-bg p-2.5">
                <span className="text-primary shrink-0">✓</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
          <div className="rounded-card border border-red-700/40 bg-red-950/20 p-3 text-xs text-red-300 leading-relaxed mb-3">
            🆘 <strong>Nếu bạn hoặc người quen đang trong tình huống nguy hiểm:</strong>
            <br /><strong className="text-white">National Human Trafficking Hotline: 1-888-373-7888</strong> (24/7, có tiếng Việt, hoàn toàn bảo mật)
            <br />DOL OFLC: 1-202-693-3010 | Trợ giúp pháp lý: <strong className="text-white">lawhelp.org</strong>
          </div>
          <div className="rounded-card border border-yellow-700/40 bg-yellow-950/20 p-3 text-xs text-yellow-300 leading-relaxed">
            ⚠️ Nếu bạn đang ở trong tình huống bị kiểm soát và không an toàn để gọi điện, có thể nhắn tin <strong>BeFree</strong> đến số <strong>233733</strong> để liên hệ đường dây hỗ trợ buôn người.
          </div>
        </div>
      )}
    </div>
  );
}
