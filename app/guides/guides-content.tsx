"use client";

import { useState } from "react";

type StageKey = "s1" | "s2" | "s3" | "s4" | "s5";

const STAGES: Array<{ key: StageKey; label: string }> = [
  { key: "s1", label: "① Tuyển dụng" },
  { key: "s2", label: "② PERM/LC" },
  { key: "s3", label: "③ I-140" },
  { key: "s4", label: "④ NVC & DS-260" },
  { key: "s5", label: "⑤ Phỏng vấn" },
];

function StageHeader({
  num,
  title,
  time,
  who,
}: {
  num: number;
  title: string;
  time: string;
  who: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-card border border-border bg-bg p-4">
      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-base font-extrabold text-white">
        {num}
      </div>
      <div>
        <h2 className="text-base font-bold text-text">{title}</h2>
        <div className="mt-1 text-xs font-semibold text-secondary">⏱ {time}</div>
        <div className="mt-0.5 text-xs text-primary">👤 {who}</div>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 border-b border-border pb-2 text-sm font-bold text-text">
      {children}
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <div className="mt-3.5 mb-2 text-xs font-semibold text-primary">{children}</div>;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 rounded-card border border-border bg-bg p-4">
      <ul className="flex flex-col divide-y divide-border text-sm text-text-muted">
        {children}
      </ul>
    </div>
  );
}

function CardItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 py-1.5 leading-relaxed first:pt-0 last:pb-0">
      <span className="flex-shrink-0 text-primary">›</span>
      <span>{children}</span>
    </li>
  );
}

type AlertTone = "yellow" | "blue" | "red" | "green";

const ALERT_TONE_CLASSES: Record<AlertTone, string> = {
  yellow: "border-secondary/40 bg-secondary/10 text-text",
  blue: "border-primary/30 bg-primary/5 text-text",
  red: "border-primary/40 bg-primary/10 text-text",
  green: "border-accent/40 bg-accent/10 text-text",
};

function Alert({ tone, icon, children }: { tone: AlertTone; icon: string; children: React.ReactNode }) {
  return (
    <div
      className={`mt-3 flex gap-2.5 rounded-card border p-3 text-sm leading-relaxed ${ALERT_TONE_CLASSES[tone]}`}
    >
      <div className="flex-shrink-0 text-lg">{icon}</div>
      <div>{children}</div>
    </div>
  );
}

interface TableRow {
  cells: string[];
  outcomes?: Array<"ok" | "bad" | null>;
}

function ResultTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-text-muted">
            {headers.map((header) => (
              <th key={header} className="py-2 pr-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-text">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-0">
              {row.cells.map((cell, cellIndex) => {
                const outcome = row.outcomes?.[cellIndex];
                const outcomeClass =
                  outcome === "ok"
                    ? "font-semibold text-accent"
                    : outcome === "bad"
                      ? "font-semibold text-primary"
                      : "";
                return (
                  <td key={cellIndex} className={`py-2 pr-3 ${outcomeClass}`}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StageButton({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`flex-1 border-r border-border px-1 py-2.5 text-center text-[11px] font-semibold transition-colors last:border-r-0 ${
        isActive ? "bg-primary text-white" : "text-text-muted hover:bg-bg-alt hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Client component holding the 5-stage tab UI ported from guides.html's
 * inline showStage() DOM-toggle script (guides.html lines 229-414). Kept
 * separate from page.tsx so the route's Metadata export (server-only) stays
 * in a server component.
 */
export function GuidesContent() {
  const [activeStage, setActiveStage] = useState<StageKey>("s1");

  return (
    <>
      <Alert tone="blue" icon="💡">
        Tổng thời gian hiện tại (2025): <b>7–9 năm</b> từ lúc mở hồ sơ đến khi có thẻ xanh
        (truyền thống). Mỗi giai đoạn đều quan trọng như nhau — chỉ cần sai một bước là ảnh
        hưởng toàn bộ hồ sơ.
      </Alert>

      <Alert tone="green" icon="📑">
        <b>Mới:</b> Dùng{" "}
        <a href="/documents" className="font-bold text-accent hover:underline">
          Checklist Hồ Sơ
        </a>{" "}
        để theo dõi giấy tờ cần chuẩn bị cho từng giai đoạn — hạn sử dụng, định dạng file, bước
        chuẩn bị (apostille, dịch công chứng...), lưu tiến độ tự động.
      </Alert>

      <div className="mt-5 flex overflow-hidden rounded-card border border-border bg-bg">
        {STAGES.map((stage) => (
          <StageButton
            key={stage.key}
            label={stage.label}
            isActive={activeStage === stage.key}
            onClick={() => setActiveStage(stage.key)}
          />
        ))}
      </div>

      {activeStage === "s1" && (
        <section className="mt-4">
          <StageHeader
            num={1}
            title="Tuyển Dụng & Ký Hợp Đồng Dịch Vụ"
            time="Thời gian: 3–10 ngày sau khi nộp hồ sơ cho agency"
            who="Ai làm: Agency + Đương đơn"
          />
          <SectionHeading>Quy trình</SectionHeading>
          <Card>
            <CardItem>
              <b className="text-text">Chọn agency</b> phù hợp — kiểm tra giấy phép, hợp đồng,
              sponsor, luật sư di trú
            </CardItem>
            <CardItem>
              Agency cung cấp <b className="text-text">Job Offer</b> từ công ty Mỹ (Sponsor): tên
              công ty, vị trí, lương, phúc lợi
            </CardItem>
            <CardItem>
              Đương đơn điền <b className="text-text">questionnaire</b>, cung cấp giấy tờ cá
              nhân: passport, CCCD, khai sinh, kết hôn
            </CardItem>
            <CardItem>
              Kiểm tra sức khỏe cơ bản, <b className="text-text">xét nghiệm chất gây nghiện</b>,
              chụp hình 5×5
            </CardItem>
            <CardItem>
              Ký hợp đồng dịch vụ với agency — đọc kỹ{" "}
              <b className="text-text">điều khoản hoàn tiền</b> (refund policy)
            </CardItem>
            <CardItem>Nộp phí đợt 1 cho agency, nhận biên lai/hóa đơn</CardItem>
          </Card>
          <Alert tone="yellow" icon="⚡">
            <b>Hỏi kỹ trước khi ký:</b> Bao lâu sponsor có đợt nộp hồ sơ lên DOL? Ai là luật sư
            đứng I-140? Chi phí từng giai đoạn? Chính sách hoàn tiền nếu agency không giao case
            number đúng hạn?
          </Alert>
          <SectionHeading>Tiêu chí chọn Agency tốt</SectionHeading>
          <ResultTable
            headers={["Tiêu chí", "Agency tốt", "Dấu hiệu bất ổn"]}
            rows={[
              {
                cells: [
                  "Pháp lý",
                  "Giấy phép kinh doanh, luật sư Mỹ đứng tên I-140",
                  "Không có hợp đồng / hoá đơn",
                ],
                outcomes: [null, null, "bad"],
              },
              {
                cells: [
                  "Sponsor",
                  "Công khai tên cty Mỹ, địa chỉ, EIN, job description",
                  "Giấu thông tin hãng bảo trợ",
                ],
                outcomes: [null, null, "bad"],
              },
              {
                cells: [
                  "Thanh toán",
                  "Chia nhiều đợt theo giai đoạn hồ sơ",
                  "Thu gần hết tiền ngay từ đầu",
                ],
                outcomes: [null, null, "bad"],
              },
              {
                cells: [
                  "Case number",
                  "Cam kết thời hạn có case number bằng văn bản",
                  "Hứa đi trong 2.5–3 năm (không thực tế)",
                ],
                outcomes: [null, null, "bad"],
              },
              {
                cells: [
                  "Liên lạc",
                  "Có email chính thức, cập nhật từng bước",
                  "Chỉ nhắn tin Zalo/Messenger",
                ],
                outcomes: [null, null, "bad"],
              },
            ]}
          />
        </section>
      )}

      {activeStage === "s2" && (
        <section className="mt-4">
          <StageHeader
            num={2}
            title="PERM / Labor Certification (LC)"
            time="Thời gian: 12–18 tháng | Cơ quan: Bộ Lao Động Mỹ (DOL)"
            who="Ai làm: Sponsor + Luật sư di trú"
          />
          <SectionHeading>PERM là gì?</SectionHeading>
          <Card>
            <CardItem>
              <b className="text-text">PERM (Program Electronic Review Management)</b>: quy
              trình chứng minh không có người Mỹ đủ điều kiện cho vị trí này
            </CardItem>
            <CardItem>
              Sponsor phải <b className="text-text">đăng quảng cáo tuyển dụng</b> (hiring ads) và
              chứng minh không tuyển được lao động Mỹ
            </CardItem>
            <CardItem>
              Nộp mẫu <b className="text-text">ETA-9089</b> lên hệ thống FLAG của DOL
            </CardItem>
            <CardItem>
              <b className="text-text">Priority Date (PD)</b>: ngày DOL nhận đơn — rất quan
              trọng, dùng để xét lịch Visa Bulletin sau này
            </CardItem>
            <CardItem>
              Đương đơn có <b className="text-text">Case Number</b> ngay sau khi DOL nhận đơn
              (tra cứu tại flag.dol.gov)
            </CardItem>
          </Card>
          <SubHeading>Kết quả có thể xảy ra</SubHeading>
          <ResultTable
            headers={["Kết quả", "Ý nghĩa", "Hành động"]}
            rows={[
              {
                cells: ["Certified ✓", "LC được duyệt — chuyển sang bước I-140 trong 180 ngày", "Nộp I-140 ngay"],
                outcomes: ["ok", null, null],
              },
              {
                cells: ["Audit", "DOL yêu cầu bổ sung hồ sơ — chờ thêm 6–9 tháng", "Phối hợp với luật sư cung cấp evidence"],
              },
              {
                cells: ["Denied ✗", "Bị từ chối — PD cũ mất hiệu lực", "Mở hồ sơ mới (PD mới)"],
                outcomes: ["bad", null, null],
              },
              {
                cells: ["Withdrawn", "Hãng rút đơn — PD cũ mất hiệu lực", "Mở hồ sơ mới"],
              },
            ]}
          />
          <Alert tone="red" icon="⚠️">
            <b>Quan trọng:</b> LC có thời hạn 180 ngày. Phải nộp I-140 trong 180 ngày kể từ ngày
            LC được certified, không thì LC mất hiệu lực.
          </Alert>
          <Alert tone="yellow" icon="💡">
            Tra cứu tình trạng LC: <b>flag.dol.gov/case-status-search</b> (dùng case number). Lưu
            ý: tên đương đơn không hiển thị tại đây — chỉ thấy sau khi LC certified qua form
            ETA-9089.
          </Alert>
        </section>
      )}

      {activeStage === "s3" && (
        <section className="mt-4">
          <StageHeader
            num={3}
            title="Nộp Đơn I-140"
            time="Thời gian: 6–12 tháng (gói thường) / 15–45 ngày (gói Premium) | Cơ quan: USCIS"
            who="Ai làm: Sponsor / Luật sư di trú"
          />
          <SectionHeading>I-140 là gì?</SectionHeading>
          <Card>
            <CardItem>
              <b className="text-text">I-140</b>: Đơn Bảo Lãnh Người Nước Ngoài Theo Diện Việc
              Làm (Immigrant Petition for Alien Workers)
            </CardItem>
            <CardItem>
              Sponsor nộp lên USCIS — chứng minh khả năng tài chính trả lương và mối quan hệ lao
              động thật
            </CardItem>
            <CardItem>
              Phí (từ 01/04/2024): <b className="text-text">$1,315</b> (gói thường) hoặc{" "}
              <b className="text-text">$4,120</b> (I-140 + I-907 Premium)
            </CardItem>
            <CardItem>
              Sau khi nộp, nhận <b className="text-text">receipt number</b> — theo dõi tại
              egov.uscis.gov
            </CardItem>
          </Card>
          <SubHeading>Gói thường vs. Gói Premium</SubHeading>
          <ResultTable
            headers={["Tiêu chí", "Gói Thường", "Gói Premium (I-907)"]}
            rows={[
              { cells: ["Phí I-140", "$1,315", "$1,315 + $2,805 = $4,120"] },
              { cells: ["Thời gian duyệt", "6–12 tháng", "15–45 ngày làm việc"] },
              { cells: ["Lợi ích", "Tiết kiệm chi phí", "Yên tâm hơn, biết sớm kết quả"] },
              {
                cells: [
                  "Bất lợi",
                  "Chờ lâu không biết kết quả",
                  "Tốn thêm $2,805; ảnh hưởng CSPA với con gần 21t",
                ],
              },
              { cells: ["Nên dùng?", "VB chậm → ít cần thiết", "Nếu muốn bảo đảm khi VB sắp đến hạn"] },
            ]}
          />
          <SubHeading>Kết quả I-140</SubHeading>
          <ResultTable
            headers={["Kết quả", "Ý nghĩa", "Hành động"]}
            rows={[
              {
                cells: ["Approved ✓", "I-140 được duyệt — Priority Date được giữ vĩnh viễn", "Chuyển sang NVC (bước 4)"],
                outcomes: ["ok", null, null],
              },
              {
                cells: ["RFE", "Yêu cầu bổ sung bằng chứng (tài chính, vị trí công việc...)", "Luật sư chuẩn bị response (~$1,000)"],
              },
              {
                cells: ["Denied ✗", "Bị từ chối — PD vẫn được giữ nếu nộp I-140 mới", "Kháng cáo hoặc mở I-140 mới ($2,500 phí LS)"],
                outcomes: ["bad", null, null],
              },
            ]}
          />
          <Alert tone="green" icon="✅">
            <b>Sau khi I-140 Approved:</b> Dù hãng bảo trợ phá sản sau đó, bạn vẫn giữ được
            Priority Date và có thể nộp I-140 mới với hãng khác cùng mã ngành nghề.
          </Alert>
        </section>
      )}

      {activeStage === "s4" && (
        <section className="mt-4">
          <StageHeader
            num={4}
            title="NVC & DS-260 — Chờ Phỏng Vấn"
            time="Thời gian: Tùy Visa Bulletin (hiện tại ~4 năm từ PD) | Cơ quan: NVC + Lãnh Sự Quán"
            who="Ai làm: Đương đơn + Agency hướng dẫn"
          />
          <SectionHeading>6 Bước NVC (National Visa Center)</SectionHeading>
          <ResultTable
            headers={["#", "Bước", "Ai làm", "Lưu ý"]}
            rows={[
              {
                cells: ["1", "I-140 Approved → USCIS chuyển hồ sơ sang NVC", "USCIS tự động", "Mất vài tuần đến vài tháng"],
              },
              {
                cells: ["2", "NVC tạo case, gửi Welcome Letter (có NVC case number)", "NVC", "Cần NVC case number để đăng nhập CEAC"],
              },
              {
                cells: [
                  "3",
                  "Đóng phí DS-261 ($325/người) + Điền DS-260 (đơn xin visa định cư)",
                  "Đương đơn",
                  "Điền tại ceac.state.gov — hỏi agency trước khi điền",
                ],
              },
              {
                cells: [
                  "4",
                  "Nộp hồ sơ dân sự: passport, khai sinh, kết hôn, lý lịch tư pháp số 2...",
                  "Đương đơn + Agency",
                  "Chờ PD đáo hạn Visa Bulletin mới làm",
                ],
              },
              {
                cells: ["5", "NVC review hồ sơ → Document Qualified (DQ)", "NVC", "Khi DQ, hồ sơ sẵn sàng chờ lịch phỏng vấn"],
              },
              {
                cells: [
                  "6",
                  "Lãnh sự quán gửi thư hẹn phỏng vấn (60 ngày trước)",
                  "LSQ Mỹ tại VN",
                  "Đặt lịch tiêm vaccine + khám sức khỏe IOM ngay",
                ],
              },
            ]}
          />
          <Alert tone="yellow" icon="⭐">
            <b>Visa Bulletin là chìa khóa:</b> Chỉ khi Priority Date của bạn sớm hơn ngày trong{" "}
            <b>Bảng A (Final Action Dates)</b>, bạn mới được xét cấp visa. Theo dõi hàng tháng
            tại{" "}
            <a href="/visa-bulletin" className="font-semibold text-secondary hover:underline">
              trang Visa Bulletin
            </a>
            .
          </Alert>
          <SubHeading>Giấy tờ cần chuẩn bị cho DS-260</SubHeading>
          <Card>
            <CardItem>
              <b className="text-text">Hộ chiếu</b> còn hạn ít nhất 6 tháng
            </CardItem>
            <CardItem>
              <b className="text-text">CCCD</b> (bản scan màu)
            </CardItem>
            <CardItem>
              <b className="text-text">Giấy khai sinh</b> (đương đơn + vợ/chồng + con)
            </CardItem>
            <CardItem>
              <b className="text-text">Giấy đăng ký kết hôn</b>
            </CardItem>
            <CardItem>
              <b className="text-text">Lý lịch tư pháp số 2</b> (xin tại Sở Tư Pháp — phí 200k,
              làm online được)
            </CardItem>
            <CardItem>
              <b className="text-text">Hộ khẩu / Giấy xác nhận cư trú</b>
            </CardItem>
            <CardItem>
              <b className="text-text">Lịch sử nhập cảnh</b> các quốc gia (nếu từng ở nước ngoài
              trên 6 tháng)
            </CardItem>
          </Card>
        </section>
      )}

      {activeStage === "s5" && (
        <section className="mt-4">
          <StageHeader
            num={5}
            title="Phỏng Vấn & Nhận Thẻ Xanh"
            time="Nhận thẻ xanh: 1–4 tháng sau khi nhập cảnh Mỹ | Cơ quan: Lãnh Sự Quán Mỹ tại Hà Nội/TP.HCM"
            who="Ai làm: Đương đơn — agency hướng dẫn chuẩn bị"
          />
          <SectionHeading>Chuẩn bị trước phỏng vấn</SectionHeading>
          <Card>
            <CardItem>
              <b className="text-text">Đặt lịch khám sức khỏe IOM</b> (ưu tiên 1 — chờ khá lâu):
              người lớn ~$240, trẻ em ~$220
            </CardItem>
            <CardItem>
              <b className="text-text">Tiêm vaccine bắt buộc</b>: MMR, Tdap, Varicella, Hepatitis
              A&amp;B, COVID-19, cúm mùa...
            </CardItem>
            <CardItem>
              <b className="text-text">Lý lịch tư pháp số 2</b> mới (không quá 6 tháng tính từ
              ngày phỏng vấn)
            </CardItem>
            <CardItem>
              Ôn kỹ: <b className="text-text">tên công ty Mỹ, địa chỉ, vị trí công việc, mức
              lương</b>
            </CardItem>
            <CardItem>
              Chuẩn bị câu hỏi về gia đình, lý do tham gia EB-3, kế hoạch công việc
            </CardItem>
            <CardItem>
              Hỏi agency: phỏng vấn ở đâu (Hà Nội hay TP.HCM), mang giấy tờ gì
            </CardItem>
          </Card>
          <SubHeading>Kết quả phỏng vấn</SubHeading>
          <ResultTable
            headers={["Kết quả", "Ý nghĩa", "Hành động tiếp theo"]}
            rows={[
              {
                cells: [
                  "PASS ✓",
                  "Đậu phỏng vấn → nhận visa EW3 gửi về nhà qua bưu điện trong ~10 tuần",
                  "Đặt vé máy bay, nhập cảnh Mỹ",
                ],
                outcomes: ["ok", null, null],
              },
              {
                cells: ["221(g)", "Từ chối tạm thời — cần bổ sung giấy tờ", "Nộp giấy tờ theo yêu cầu, chờ xét lại"],
              },
              {
                cells: ["FAIL ✗", "Từ chối vĩnh viễn — thường do hồ sơ có vấn đề", "Cần mở hồ sơ mới hoặc nhờ luật sư kháng cáo"],
                outcomes: ["bad", null, null],
              },
            ]}
          />
          <SubHeading>Sau khi nhập cảnh Mỹ</SubHeading>
          <Card>
            <CardItem>
              Nhận <b className="text-text">thẻ xanh 10 năm</b> qua bưu điện trong 1–4 tháng sau
              nhập cảnh
            </CardItem>
            <CardItem>
              Xin <b className="text-text">SSN</b> (Social Security Number) tại văn phòng SSA gần
              nhất
            </CardItem>
            <CardItem>
              Mở <b className="text-text">tài khoản ngân hàng</b> (Chase, Bank of America...)
            </CardItem>
            <CardItem>
              Thi <b className="text-text">bằng lái xe</b> — xem{" "}
              <a href="/bmv" className="font-medium text-primary hover:underline">
                công cụ ôn thi BMV
              </a>
            </CardItem>
            <CardItem>
              <b className="text-text">Bắt đầu đi làm</b> cho hãng bảo trợ — tối thiểu 1 năm theo
              cam kết hợp đồng
            </CardItem>
            <CardItem>
              Khai <b className="text-text">thuế</b> hàng năm (Form 1040, deadline 15/4)
            </CardItem>
            <CardItem>
              Sau 5 năm tổng ở Mỹ: có thể thi <b className="text-text">quốc tịch Mỹ</b>
            </CardItem>
          </Card>
          <Alert tone="green" icon="🎉">
            <b>Chúc mừng!</b> Thẻ xanh 10 năm cho cả gia đình: vợ/chồng (EW4), con dưới 21t (EW5).
            Con cái học miễn phí K-12, được hoàn thuế Child Tax Credit nếu đủ điều kiện.
          </Alert>
        </section>
      )}
    </>
  );
}
