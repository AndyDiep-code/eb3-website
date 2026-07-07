"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";

type TabKey = "eligibility" | "process" | "test" | "after";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "eligibility", label: "⏳ Điều Kiện & Thời Gian" },
  { key: "process", label: "📋 Quy Trình N-400" },
  { key: "test", label: "📝 Civics Test & Tiếng Anh" },
  { key: "after", label: "🌏 Quốc Tịch Kép & Sau Đó" },
];


/**
 * Client component holding the 4-tab UI ported from citizenship-path.html's
 * inline showTab() DOM-toggle script (lines 188-400 of the legacy file).
 * Kept separate from page.tsx so the route's Metadata export (server-only)
 * stays in a server component.
 */
export function CitizenshipPathContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("eligibility");

  return (
    <>
      <div className="mt-4 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm text-text">
        <p>
          🎓 <b>Naturalization (nhập tịch)</b> là bước cuối cùng trong hành
          trình định cư — biến bạn từ permanent resident thành công dân Mỹ
          chính thức: được bầu cử, có hộ chiếu Mỹ, bảo lãnh người thân rộng
          hơn, và không bao giờ lo bị trục xuất. Trang này giải thích lộ
          trình từ A-Z.
        </p>
      </div>

      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "eligibility" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            ⏳ Bạn Đủ Điều Kiện Nộp Đơn Khi Nào?
          </h2>

          <div className="mt-3 flex overflow-hidden rounded-card">
            <div className="flex-1 bg-secondary/15 p-3 text-center text-xs text-secondary">
              <span className="block text-base font-extrabold">5 năm</span>
              <span className="mt-1 block text-[10px] opacity-85">
                PR thông thường
              </span>
            </div>
            <div className="flex-1 bg-primary/15 p-3 text-center text-xs text-primary">
              <span className="block text-base font-extrabold">3 năm</span>
              <span className="mt-1 block text-[10px] opacity-85">
                Vợ/chồng của công dân Mỹ
              </span>
            </div>
            <div className="flex-1 bg-accent/15 p-3 text-center text-xs text-accent">
              <span className="block text-base font-extrabold">90 ngày</span>
              <span className="mt-1 block text-[10px] opacity-85">
                Có thể nộp N-400 sớm trước mốc
              </span>
            </div>
            <div className="flex-1 bg-bg-alt p-3 text-center text-xs text-text">
              <span className="block text-base font-extrabold">18+</span>
              <span className="mt-1 block text-[10px] opacity-85">
                Tuổi tối thiểu khi nộp đơn
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text">
              1. Permanent Resident Đủ 5 Năm (Diện Phổ Biến Cho EB-3)
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Hầu hết người đi diện EB-3 sẽ nộp theo diện này: đã có thẻ
              xanh đủ <b className="text-primary">5 năm liên tục</b>. Có thể
              nộp đơn N-400 sớm <b className="text-primary">90 ngày</b>{" "}
              trước khi đủ mốc 5 năm (USCIS tính ngày nộp dựa trên ngày nhận
              đơn).
            </p>
          </div>
          <div className="mt-3 rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text">
              2. Vợ/Chồng Của Công Dân Mỹ — Chỉ Cần 3 Năm
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Nếu bạn kết hôn và sống chung với một công dân Mỹ trong suốt 3
              năm làm permanent resident, bạn đủ điều kiện nộp sớm hơn — chỉ
              cần 3 năm thay vì 5 năm. Yêu cầu: vẫn đang sống chung tại thời
              điểm phỏng vấn.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            3 Yêu Cầu Cốt Lõi Cần Đáp Ứng
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Yêu Cầu</th>
                  <th className="py-2 pr-3 font-medium">Định Nghĩa</th>
                  <th className="py-2 font-medium">Ngưỡng Tối Thiểu</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Continuous Residence
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Sống liên tục tại Mỹ, không có khoảng vắng mặt dài làm
                    &quot;ngắt quãng&quot;
                  </td>
                  <td className="py-2 text-text-muted">
                    Suốt 5 năm (hoặc 3 năm)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Physical Presence
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Tổng số ngày thực tế có mặt tại Mỹ (cộng dồn, không cần
                    liên tục)
                  </td>
                  <td className="py-2 text-text-muted">
                    Tối thiểu 30 tháng / 5 năm (hoặc 18 tháng / 3 năm)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    State Residence
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Sống tại bang/USCIS district nơi nộp đơn
                  </td>
                  <td className="py-2 text-text-muted">
                    Tối thiểu 3 tháng trước khi nộp
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold">
                    Good Moral Character
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Không phạm tội nghiêm trọng trong giai đoạn xét duyệt
                  </td>
                  <td className="py-2 text-text-muted">
                    5 năm trước khi nộp (hoặc 3 năm)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm text-text">
            <p>
              ⚠️ <b>Cảnh báo &quot;ngắt quãng continuous residence&quot;:</b>{" "}
              Vắng mặt khỏi Mỹ <b>6-12 tháng liên tục</b> được coi là{" "}
              <i>có thể</i> ngắt quãng (bạn phải chứng minh ngược lại). Vắng
              mặt <b>trên 12 tháng</b> tự động ngắt quãng — đồng hồ 5 năm
              phải bắt đầu lại từ đầu sau khi quay lại Mỹ. Nếu bạn hay về
              Việt Nam dài ngày, hãy tính toán kỹ trước khi nộp N-400.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Trường Hợp Đặc Biệt
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-loose text-text-muted">
            <p>
              <b className="text-primary">🪖 Phục vụ quân đội Mỹ:</b> Có thể
              nộp đơn ngay, không cần chờ 5 năm, theo Section 328/329 INA
              <br />
              <b className="text-primary">👶 Trẻ em dưới 18:</b> Tự động có
              quốc tịch khi cha/mẹ nhập tịch (Child Citizenship Act) — không
              cần thi N-400 riêng
              <br />
              <b className="text-primary">
                👴 Trên 50 tuổi + 20 năm PR (hoặc 55 tuổi + 15 năm PR):
              </b>{" "}
              Được miễn thi tiếng Anh, chỉ thi civics bằng tiếng Việt với
              phiên dịch
            </p>
          </div>
        </section>
      )}

      {activeTab === "process" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            📋 Quy Trình Nộp Đơn N-400 Từng Bước
          </h2>

          <ol className="mt-3 flex flex-col divide-y divide-border">
            {[
              <>
                <b>Chuẩn bị hồ sơ &amp; nộp Form N-400</b> — Nộp online tại
                myaccount.uscis.gov hoặc gửi giấy. Phí:{" "}
                <b className="text-primary">$760</b> (bao gồm $85
                biometrics, 2024). Có thể xin miễn giảm phí (fee waiver) nếu
                thu nhập thấp.
              </>,
              <>
                <b>Nhận Receipt Notice (I-797C)</b> — USCIS xác nhận đã nhận
                đơn, có mã số theo dõi hồ sơ trong vòng 2-4 tuần.
              </>,
              <>
                <b>Biometrics Appointment</b> — Lấy dấu vân tay, chụp ảnh
                tại Application Support Center (ASC) gần nhà. Thường trong
                vòng 4-8 tuần sau khi nộp.
              </>,
              <>
                <b>Chờ lịch phỏng vấn</b> — Thời gian chờ trung bình{" "}
                <b className="text-secondary">8-14 tháng</b> tùy địa phương
                (kiểm tra processing times tại uscis.gov/processing-times).
              </>,
              <>
                <b>Phỏng vấn tại USCIS Field Office</b> — Officer kiểm tra
                hồ sơ, hỏi câu hỏi từ N-400, kiểm tra tiếng Anh (đọc/viết/
                nói), và civics test (lịch sử &amp; chính phủ Mỹ).
              </>,
              <>
                <b>Nhận quyết định</b> — Có thể: (a) Approved ngay tại buổi
                phỏng vấn, (b) Continued (cần bổ sung giấy tờ hoặc thi lại),
                hoặc (c) Denied (có quyền kháng cáo trong 30 ngày).
              </>,
              <>
                <b>Lễ tuyên thệ (Oath Ceremony)</b> — Buổi lễ chính thức trở
                thành công dân Mỹ, nhận Certificate of Naturalization. Có
                thể diễn ra cùng ngày phỏng vấn hoặc vài tuần sau.
              </>,
            ].map((content, index) => (
              <li
                key={index}
                className="flex gap-3 py-3 text-xs text-text-muted first:pt-0 last:pb-0"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{content}</span>
              </li>
            ))}
          </ol>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Giấy Tờ Cần Chuẩn Bị
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-loose text-text-muted">
            <p>
              📄 Bản sao thẻ xanh (mặt trước &amp; sau)
              <br />
              📄 Hộ chiếu Việt Nam (các trang có visa, xuất nhập cảnh)
              <br />
              📄 Danh sách các chuyến đi ra khỏi Mỹ trong 5 năm qua (ngày đi,
              ngày về, lý do)
              <br />
              📄 Giấy tờ thuế 5 năm gần nhất (tax transcripts từ IRS)
              <br />
              📄 Giấy đăng ký kết hôn / ly hôn (nếu có)
              <br />
              📄 Selective Service registration (nam giới)
              <br />
              📄 Biên lai phí nộp đơn ($760 hoặc đơn xin miễn giảm I-912)
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Câu Hỏi Thường Gặp Trong Phỏng Vấn N-400
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <div className="rounded-card border border-border bg-bg-alt p-3 text-xs">
              <div className="font-bold text-primary">
                Q: Bạn có bao giờ bị bắt, bị buộc tội, hoặc kết án vì bất kỳ
                tội gì chưa?
              </div>
              <div className="mt-1 text-text-muted">
                A: Trả lời trung thực — kể cả vi phạm giao thông nhỏ. Khai
                sai = lý do từ chối vĩnh viễn.
              </div>
            </div>
            <div className="rounded-card border border-border bg-bg-alt p-3 text-xs">
              <div className="font-bold text-primary">
                Q: Bạn có phải đóng thuế thu nhập liên bang mỗi năm không,
                và đã đóng đầy đủ chưa?
              </div>
              <div className="mt-1 text-text-muted">
                A: Cần có bằng chứng đã khai thuế đều đặn — nợ thuế chưa trả
                ảnh hưởng đến &quot;good moral character&quot;.
              </div>
            </div>
            <div className="rounded-card border border-border bg-bg-alt p-3 text-xs">
              <div className="font-bold text-primary">
                Q: Bạn có ủng hộ Hiến Pháp Mỹ và sẵn sàng tuyên thệ trung
                thành không?
              </div>
              <div className="mt-1 text-text-muted">
                A: Đây là câu hỏi bắt buộc trong Oath of Allegiance — trả
                lời &quot;Yes&quot;.
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "test" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            📝 Civics Test &amp; Yêu Cầu Tiếng Anh
          </h2>

          <div className="mt-3 rounded-card border border-secondary/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-secondary/15 px-2 py-0.5 text-xs font-bold text-secondary">
              CIVICS TEST
            </span>
            <h3 className="mt-2 text-sm font-bold text-text">
              100 Câu Hỏi Lịch Sử &amp; Chính Phủ Mỹ
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              USCIS hỏi <b className="text-primary">10 câu</b> ngẫu nhiên từ
              bộ 100 câu công khai (có sẵn tại uscis.gov/citizenship). Bạn
              cần trả lời đúng <b className="text-primary">6/10 câu</b> để
              đậu. Officer dừng hỏi ngay khi bạn đạt 6 câu đúng.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Ví Dụ Câu Hỏi Thường Gặp
          </p>
          <div className="mt-2 flex flex-col gap-2">
            {[
              {
                q: "What is the supreme law of the land?",
                a: "The Constitution (Hiến Pháp)",
              },
              {
                q: "How many amendments does the Constitution have?",
                a: "27 (twenty-seven)",
              },
              {
                q: "Who is the Commander in Chief of the military?",
                a: "The President",
              },
              {
                q: "What ocean is on the West Coast of the United States?",
                a: "Pacific Ocean (Thái Bình Dương)",
              },
              {
                q: "Name one branch or part of the government.",
                a: "Congress / President (executive) / the courts (judicial)",
              },
            ].map((qa) => (
              <div
                key={qa.q}
                className="rounded-card border border-border bg-bg-alt p-3 text-xs"
              >
                <div className="font-bold text-primary">Q: {qa.q}</div>
                <div className="mt-1 text-text-muted">A: {qa.a}</div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            3 Phần Thi Tiếng Anh
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Phần</th>
                  <th className="py-2 pr-3 font-medium">Hình Thức</th>
                  <th className="py-2 font-medium">Ví Dụ</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Đọc (Reading)</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Đọc to 1 trong 3 câu officer đưa ra
                  </td>
                  <td className="py-2 text-text-muted">
                    &quot;Washington was the first President.&quot;
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Viết (Writing)</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Viết lại 1 trong 3 câu officer đọc
                  </td>
                  <td className="py-2 text-text-muted">
                    &quot;Citizens can vote.&quot;
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold">Nói (Speaking)</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Đánh giá qua phần trả lời câu hỏi N-400 trong buổi phỏng
                    vấn
                  </td>
                  <td className="py-2 text-text-muted">
                    Trả lời tự nhiên, không cần hoàn hảo ngữ pháp
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Ai Được Miễn Thi Tiếng Anh?
          </p>
          <div className="mt-2 rounded-card border border-accent/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
              MIỄN THI TIẾNG ANH (vẫn thi Civics)
            </span>
            <p className="mt-2 text-sm leading-loose text-text-muted">
              ✅ <b className="text-text">Diện 50/20:</b> Trên 50 tuổi + đã
              có thẻ xanh ít nhất 20 năm — thi civics bằng ngôn ngữ mẹ đẻ (có
              phiên dịch)
              <br />
              ✅ <b className="text-text">Diện 55/15:</b> Trên 55 tuổi + đã
              có thẻ xanh ít nhất 15 năm — tương tự, thi civics bằng tiếng
              Việt
              <br />
              ✅ <b className="text-text">Diện 65/20:</b> Trên 65 tuổi + đã
              có thẻ xanh ít nhất 20 năm — chỉ học 20 câu civics đơn giản
              hóa (thay vì 100 câu)
              <br />
              ✅ <b className="text-text">Khuyết tật/bệnh lý:</b> Có giấy
              chứng nhận N-648 từ bác sĩ xác nhận không thể học/thi do tình
              trạng sức khỏe
            </p>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-sm text-text">
            <p>
              💡 <b>Mẹo ôn thi:</b> Tải app &quot;USCIS Civics Test&quot;
              miễn phí, hoặc dùng video/audio 100 câu hỏi có sẵn trên
              YouTube kênh chính thức USCIS. Luyện đọc — viết câu tiếng Anh
              cơ bản mỗi ngày 15 phút trong 2-3 tháng trước phỏng vấn là đủ
              cho đa số người.
            </p>
          </div>
        </section>
      )}

      {activeTab === "after" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            🌏 Quốc Tịch Kép Việt Nam - Hoa Kỳ &amp; Sau Khi Nhập Tịch
          </h2>

          <div className="mt-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm text-text">
            <p>
              ⚖️ <b>Sự thật quan trọng:</b> Mỹ <i>cho phép</i> quốc tịch kép
              (không bắt bạn từ bỏ quốc tịch Việt Nam khi tuyên thệ). Nhưng{" "}
              <b>luật Việt Nam KHÔNG chính thức công nhận quốc tịch kép</b>{" "}
              đối với công dân nhập tịch nước ngoài — về lý thuyết bạn
              &quot;tự động mất quốc tịch Việt Nam&quot; khi nhập tịch Mỹ
              theo Luật Quốc tịch VN 2008.
            </p>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text">
              🇺🇸 Phía Mỹ: Không Yêu Cầu Từ Bỏ Quốc Tịch Việt Nam
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Khi tuyên thệ Oath of Allegiance, bạn cam kết trung thành với
              Mỹ — nhưng Mỹ không kiểm tra hay bắt bạn nộp giấy từ bỏ quốc
              tịch Việt Nam. Trên thực tế hầu hết người Việt nhập tịch Mỹ
              vẫn giữ và sử dụng hộ chiếu Việt Nam song song.
            </p>
          </div>

          <div className="mt-3 rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text">
              🇻🇳 Phía Việt Nam: Quy Định Phức Tạp Hơn
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Theo luật, người Việt nhập quốc tịch nước ngoài &quot;đương
              nhiên mất quốc tịch Việt Nam&quot;. Tuy nhiên, trên thực tế:
            </p>
            <p className="mt-2 text-sm leading-loose text-text-muted">
              • Nhiều Việt kiều vẫn xin được{" "}
              <b className="text-primary">visa miễn thị thực 5 năm</b> (Visa
              Exemption Certificate) để về VN dễ dàng
              <br />
              • Một số trường hợp được{" "}
              <b className="text-primary">
                &quot;xin giữ quốc tịch Việt Nam&quot;
              </b>{" "}
              theo Nghị định 16/2020 nếu làm thủ tục đăng ký với cơ quan đại
              diện VN tại Mỹ
              <br />
              • Hộ chiếu Việt Nam cũ vẫn dùng được đến khi hết hạn trong
              nhiều trường hợp thực tế (dù về lý thuyết đã &quot;mất quốc
              tịch&quot;)
            </p>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-sm text-text">
            <p>
              📞 <b>Lời khuyên:</b> Trước khi nhập tịch Mỹ, nếu bạn còn tài
              sản, đất đai, hoặc kế hoạch định cư lại Việt Nam dài hạn — hãy
              liên hệ <b>Đại sứ quán/Lãnh sự quán Việt Nam</b> tại Mỹ để
              được tư vấn cụ thể về tình trạng quốc tịch và visa miễn thị
              thực trước khi tuyên thệ.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Những Gì Thay Đổi Sau Khi Trở Thành Công Dân Mỹ
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Quyền Lợi</th>
                  <th className="py-2 pr-3 font-medium">Permanent Resident</th>
                  <th className="py-2 font-medium">Công Dân Mỹ</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Bầu cử</td>
                  <td className="py-2 pr-3">❌ Không</td>
                  <td className="py-2">✅ Có</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Hộ chiếu Mỹ</td>
                  <td className="py-2 pr-3">❌ Không</td>
                  <td className="py-2">✅ Có — đi 180+ nước miễn visa</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Bảo lãnh người thân
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Vợ/chồng, con chưa kết hôn
                  </td>
                  <td className="py-2 text-text-muted">
                    + Cha mẹ, anh chị em, con đã kết hôn
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Nguy cơ trục xuất
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Có thể bị trục xuất nếu phạm tội nặng
                  </td>
                  <td className="py-2 text-text-muted">
                    Không thể bị trục xuất (trừ gian lận khi nhập tịch)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Việc làm liên bang
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Hạn chế một số vị trí nhạy cảm
                  </td>
                  <td className="py-2 text-text-muted">
                    Đủ điều kiện toàn bộ vị trí
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Thời gian ở nước ngoài
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Giới hạn — rủi ro mất thẻ xanh
                  </td>
                  <td className="py-2 text-text-muted">Không giới hạn</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold">
                    Quyền công dân cho con
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Con sinh ở VN không tự động có quốc tịch Mỹ
                  </td>
                  <td className="py-2 text-text-muted">
                    Con sinh ở bất kỳ đâu có thể có quốc tịch Mỹ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Việc Cần Làm Ngay Sau Khi Nhập Tịch
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-loose text-text-muted">
            <p>
              ☐ Nộp đơn xin <b className="text-primary">hộ chiếu Mỹ</b>{" "}
              (Form DS-11) — nên làm ngay để đi lại thuận tiện
              <br />
              ☐ Đăng ký <b className="text-primary">đi bầu cử</b> tại địa
              phương (voter registration)
              <br />
              ☐ Cập nhật <b className="text-primary">
                Social Security record
              </b>{" "}
              với tình trạng công dân mới
              <br />
              ☐ Cân nhắc nộp đơn bảo lãnh người thân (cha mẹ, anh chị em)
              nếu có kế hoạch
              <br />
              ☐ Liên hệ lãnh sự quán Việt Nam nếu cần làm rõ tình trạng quốc
              tịch / visa về thăm quê
            </p>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text">
              📚 Nguồn tham khảo chính thức
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              <a
                href="https://www.uscis.gov/citizenship"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                USCIS — Citizenship &amp; Naturalization
              </a>
              : điều kiện, quy trình, và tài liệu ôn thi quốc tịch chính
              thức.
              <br />
              <a
                href="https://www.uscis.gov/n-400"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                USCIS — Form N-400
              </a>
              : đơn xin nhập tịch, hướng dẫn điền form và lệ phí hiện hành.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
