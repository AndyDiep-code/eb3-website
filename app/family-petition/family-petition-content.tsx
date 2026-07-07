"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";

type TabKey = "derivative" | "i130" | "process" | "special";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "derivative", label: "👪 Đi Cùng (Derivative)" },
  { key: "i130", label: "📝 Bảo Lãnh Sau (I-130)" },
  { key: "process", label: "💵 Quy Trình & Chi Phí" },
  { key: "special", label: "⚠️ Tình Huống Đặc Biệt" },
];


/**
 * Client component holding the 4-tab UI ported from family-petition.html's
 * inline showTab() DOM-toggle script (lines 188-362 of the legacy file).
 * Kept separate from page.tsx so the route's Metadata export (server-only)
 * stays in a server component.
 */
export function FamilyPetitionContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("derivative");

  return (
    <>
      <div className="mt-4 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm text-text">
        <p>
          👨‍👩‍👧‍👦 <b>Hai con đường mang gia đình sang Mỹ:</b> (1) Đi{" "}
          <b>cùng lúc</b> với bạn trong hồ sơ EB-3 — gọi là &quot;derivative
          beneficiary&quot;, hoặc (2) <b>bảo lãnh sau</b> khi bạn đã có thẻ
          xanh/quốc tịch — qua Form I-130. Trang này giải thích rõ cả hai
          con đường và những lưu ý quan trọng.
        </p>
      </div>

      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "derivative" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            👪 Đi Cùng Trong Hồ Sơ EB-3 (Derivative Beneficiary)
          </h2>

          <div className="mt-3 rounded-card border border-accent/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
              TIN VUI
            </span>
            <h3 className="mt-2 text-sm font-bold text-text">
              Vợ/Chồng Và Con Độc Thân Dưới 21 Tuổi Đi CÙNG, KHÔNG Cần Hồ Sơ
              Riêng
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Khi bạn (principal applicant) được duyệt I-140 và đến lượt
              visa theo Visa Bulletin, <b className="text-primary">
                vợ/chồng
              </b>{" "}
              và <b className="text-primary">con độc thân dưới 21 tuổi</b>{" "}
              tự động được xếp là &quot;derivative beneficiaries&quot; — đi{" "}
              <b>cùng một lúc</b> với bạn, dùng <b>cùng priority date</b>,
              không cần employer bảo lãnh riêng.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Ai Được Tính Là Derivative?
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Quan Hệ</th>
                  <th className="py-2 pr-3 font-medium">Điều Kiện</th>
                  <th className="py-2 font-medium">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Vợ/Chồng</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Đã đăng ký kết hôn hợp pháp <b>trước khi</b> I-485/visa
                    phỏng vấn được duyệt
                  </td>
                  <td className="py-2">✅ Derivative</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Con ruột/nuôi</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Độc thân, dưới 21 tuổi tại thời điểm nộp đơn (có CSPA
                    bảo vệ)
                  </td>
                  <td className="py-2">✅ Derivative</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Con riêng (stepchild)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Cha/mẹ kết hôn với người có con riêng <b>trước khi</b>{" "}
                    con đủ 18 tuổi
                  </td>
                  <td className="py-2">✅ Derivative (có điều kiện)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Con đã kết hôn
                  </td>
                  <td className="py-2 pr-3 text-text-muted">Bất kể tuổi</td>
                  <td className="py-2">
                    ❌ Không — phải bảo lãnh riêng sau này
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Con trên 21 tuổi (không CSPA)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    &quot;Aged out&quot; — quá tuổi trong lúc chờ
                  </td>
                  <td className="py-2">
                    ⚠️ Có thể mất tư cách — xem CSPA
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold">
                    Cha/mẹ, anh/chị/em
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Không thuộc diện derivative trong EB-3
                  </td>
                  <td className="py-2">
                    ❌ Phải bảo lãnh riêng (chỉ công dân mới bảo lãnh được)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Quy Trình Đi Cùng — Tóm Tắt
          </p>
          <ol className="mt-2 flex flex-col divide-y divide-border">
            {[
              <>
                <b>Bạn (principal) nộp I-140</b> — kèm theo thông tin
                vợ/chồng và con trong hồ sơ ngay từ đầu.
              </>,
              <>
                <b>Đến lượt Visa Bulletin</b> — gia đình cùng nộp đơn xin
                visa di dân (consular processing) hoặc I-485 (nếu đang ở
                Mỹ).
              </>,
              <>
                <b>Phỏng vấn cùng nhau</b> — tại lãnh sự quán Mỹ ở Việt Nam
                (nếu đi từ VN) hoặc USCIS (nếu đang ở Mỹ).
              </>,
              <>
                <b>Nhận thẻ xanh cùng lúc</b> — cả gia đình trở thành
                permanent residents gần như đồng thời.
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

          <div className="mt-4 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm text-text">
            <p>
              ⏰ <b>Lưu ý về thời điểm kết hôn:</b> Nếu bạn kết hôn{" "}
              <i>sau khi</i> I-140 đã được duyệt nhưng <i>trước khi</i> nhận
              visa/thẻ xanh, vợ/chồng vẫn có thể được thêm vào làm
              derivative — miễn là việc kết hôn diễn ra trước bước cuối
              cùng (visa interview hoặc I-485 approval). Hãy thông báo cho
              luật sư/agency ngay khi có thay đổi tình trạng hôn nhân.
            </p>
          </div>
        </section>
      )}

      {activeTab === "i130" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            📝 Bảo Lãnh Sau Khi Đã Định Cư — Form I-130
          </h2>

          <div className="mt-3 rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text">
              Khi Nào Cần Form I-130?
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Nếu người thân <b className="text-text">không</b> đi cùng được
              lúc đầu (ví dụ: con đã kết hôn, cha mẹ, anh chị em, hoặc
              vợ/chồng kết hôn sau khi bạn đã định cư), bạn phải nộp đơn bảo
              lãnh riêng — Petition for Alien Relative (Form I-130) — sau
              khi đã có thẻ xanh hoặc quốc tịch.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Ai Bảo Lãnh Được Ai? — Khác Biệt Lớn Giữa PR Và Công Dân
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Người Bảo Lãnh</th>
                  <th className="py-2 pr-3 font-medium">Bảo Lãnh Được</th>
                  <th className="py-2 pr-3 font-medium">Diện (Category)</th>
                  <th className="py-2 font-medium">Thời Gian Chờ</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Permanent Resident (Thẻ Xanh)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">Vợ/chồng</td>
                  <td className="py-2 pr-3 text-text-muted">F2A</td>
                  <td className="py-2">~2 năm</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3"></td>
                  <td className="py-2 pr-3 text-text-muted">
                    Con độc thân dưới 21
                  </td>
                  <td className="py-2 pr-3 text-text-muted">F2A</td>
                  <td className="py-2">~2 năm</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Công Dân Mỹ</td>
                  <td className="py-2 pr-3 text-text-muted">
                    Vợ/chồng, con dưới 21, cha/mẹ
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Immediate Relative
                  </td>
                  <td className="py-2">
                    ~1 năm — KHÔNG giới hạn số lượng/năm
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3"></td>
                  <td className="py-2 pr-3 text-text-muted">
                    Con độc thân trên 21
                  </td>
                  <td className="py-2 pr-3 text-text-muted">F1</td>
                  <td className="py-2">~7 năm</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3"></td>
                  <td className="py-2 pr-3 text-text-muted">
                    Con đã kết hôn (mọi tuổi)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">F3</td>
                  <td className="py-2">~12 năm</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3"></td>
                  <td className="py-2 pr-3 text-text-muted">
                    Anh/chị/em ruột
                  </td>
                  <td className="py-2 pr-3 text-text-muted">F4</td>
                  <td className="py-2">~14-23 năm (lâu nhất)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-sm text-text">
            <p>
              💡 <b>Đây là lý do nhiều người chọn nhập tịch sớm:</b> Diện
              &quot;Immediate Relative&quot; của công dân Mỹ (vợ/chồng, con
              dưới 21, cha/mẹ) <b>không bị giới hạn số lượng visa hàng
              năm</b> và xử lý nhanh hơn nhiều — khoảng 1 năm so với 2+ năm
              của diện F2A (PR bảo lãnh vợ/chồng). Nhập tịch sau 5 năm
              không chỉ cho bạn quyền công dân mà còn mở khóa khả năng bảo
              lãnh cha/mẹ và anh chị em — điều PR không làm được.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Quy Trình I-130 Cơ Bản
          </p>
          <ol className="mt-2 flex flex-col divide-y divide-border">
            {[
              <>
                <b>Nộp Form I-130</b> kèm bằng chứng quan hệ (giấy kết hôn,
                khai sinh, ảnh chung, thư từ...) — phí $675 (2024).
              </>,
              <>
                <b>USCIS duyệt I-130</b> — xác nhận quan hệ hợp lệ, cấp
                Priority Date.
              </>,
              <>
                <b>Chờ đến lượt theo Visa Bulletin</b> (nếu thuộc diện
                preference category — F1, F2A, F3, F4). Diện Immediate
                Relative không cần chờ.
              </>,
              <>
                <b>
                  Nộp I-485 (nếu ở Mỹ) hoặc xin visa di dân tại lãnh sự quán
                  (nếu ở Việt Nam)
                </b>
                .
              </>,
              <>
                <b>Phỏng vấn &amp; nhận thẻ xanh.</b>
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
        </section>
      )}

      {activeTab === "process" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            💵 Quy Trình, Chi Phí &amp; Timeline Tổng Quan
          </h2>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Bảng Chi Phí Tham Khảo (2024-2025)
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Khoản Phí</th>
                  <th className="py-2 pr-3 font-medium">Số Tiền</th>
                  <th className="py-2 font-medium">Áp Dụng Cho</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Form I-130</td>
                  <td className="py-2 pr-3 text-text-muted">$675</td>
                  <td className="py-2 text-text-muted">
                    Bảo lãnh người thân (mỗi đơn riêng)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Form I-485 (Adjustment)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">$1,440</td>
                  <td className="py-2 text-text-muted">
                    Mỗi người (nếu đang ở Mỹ)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Visa di dân (Consular Processing)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">~$445/người</td>
                  <td className="py-2 text-text-muted">
                    Phỏng vấn tại lãnh sự quán VN
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Affidavit of Support (I-864)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    Miễn phí (chỉ cần đủ thu nhập)
                  </td>
                  <td className="py-2 text-text-muted">
                    Người bảo lãnh ký cam kết tài chính
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Khám sức khỏe (Medical Exam)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    $200-500/người
                  </td>
                  <td className="py-2 text-text-muted">
                    Bác sĩ được USCIS chỉ định (civil surgeon)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold">
                    Dịch thuật &amp; công chứng giấy tờ
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    $50-150/giấy tờ
                  </td>
                  <td className="py-2 text-text-muted">
                    Khai sinh, kết hôn từ Việt Nam
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-sm text-text">
            <p>
              🔗 Người thân đang ở Mỹ nộp I-485 (Adjustment of Status)? Xem
              chi tiết quy trình khám sức khỏe I-693 với civil surgeon và
              phỏng vấn tại USCIS địa phương ở{" "}
              <a
                href="/aos-interview-guide"
                className="text-primary hover:underline"
              >
                <b>Phỏng Vấn AOS &amp; I-693</b>
              </a>
              .
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Timeline Tổng Quát Theo Diện
          </p>
          <div className="mt-2 flex overflow-hidden rounded-card">
            <div className="flex-1 bg-accent/15 p-3 text-center text-xs text-accent">
              <span className="block text-sm font-extrabold">~1 năm</span>
              <span className="mt-1 block text-[10px] opacity-85">
                Immediate Relative (công dân bảo lãnh vợ/chồng, con &lt;21,
                cha mẹ)
              </span>
            </div>
            <div className="flex-1 bg-secondary/15 p-3 text-center text-xs text-secondary">
              <span className="block text-sm font-extrabold">~2 năm</span>
              <span className="mt-1 block text-[10px] opacity-85">
                F2A — PR bảo lãnh vợ/chồng &amp; con &lt;21
              </span>
            </div>
            <div className="flex-1 bg-primary/15 p-3 text-center text-xs text-primary">
              <span className="block text-sm font-extrabold">~7 năm</span>
              <span className="mt-1 block text-[10px] opacity-85">
                F1 — Công dân bảo lãnh con độc thân &gt;21
              </span>
            </div>
            <div className="flex-1 bg-bg-alt p-3 text-center text-xs text-text">
              <span className="block text-sm font-extrabold">
                12-23 năm
              </span>
              <span className="mt-1 block text-[10px] opacity-85">
                F3/F4 — Con đã kết hôn, anh chị em
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Affidavit of Support (I-864) — Cam Kết Tài Chính
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-relaxed text-text-muted">
            <p>
              Người bảo lãnh phải chứng minh thu nhập đạt tối thiểu{" "}
              <b className="text-primary">
                125% federal poverty line
              </b>{" "}
              (mức nghèo liên bang) dựa trên quy mô hộ gia đình. Nếu không
              đủ, có thể nhờ <b className="text-primary">
                joint sponsor
              </b>{" "}
              (người đồng bảo lãnh đủ điều kiện tài chính) ký thêm I-864.
            </p>
            <p className="mt-2">
              Ví dụ 2024: hộ gia đình 4 người cần thu nhập tối thiểu khoảng{" "}
              <b className="text-text">$39,000/năm</b> (48 tiểu bang, không
              tính Alaska/Hawaii — số liệu thay đổi theo năm, kiểm tra tại
              uscis.gov/i-864).
            </p>
          </div>

          <div className="mt-4 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm text-text">
            <p>
              📋 <b>Giấy tờ Việt Nam cần dịch thuật công chứng:</b> Giấy
              khai sinh, giấy đăng ký kết hôn, giấy ly hôn (nếu có), hộ
              khẩu/CCCD. Nên dùng dịch vụ dịch thuật được USCIS chấp nhận —
              bản dịch phải có lời chứng nhận &quot;certified
              translation&quot; kèm theo.
            </p>
          </div>
        </section>
      )}

      {activeTab === "special" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            ⚠️ Các Tình Huống Đặc Biệt Cần Lưu Ý
          </h2>

          <div className="mt-3 rounded-card border border-primary/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary">
              QUAN TRỌNG NHẤT
            </span>
            <h3 className="mt-2 text-sm font-bold text-text">
              CSPA — Bảo Vệ Con Khỏi &quot;Aging Out&quot; (Quá 21 Tuổi)
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Quy trình EB-3 thường kéo dài nhiều năm. Nếu con bạn gần 21
              tuổi khi nộp đơn, có nguy cơ &quot;aged out&quot; — quá tuổi
              trước khi visa available, mất tư cách derivative.{" "}
              <b className="text-primary">
                Child Status Protection Act (CSPA)
              </b>{" "}
              giúp &quot;đóng băng&quot; tuổi của con theo công thức:
            </p>
            <p className="mt-2 rounded-btn bg-bg-alt p-3 text-xs leading-relaxed text-text">
              <b>
                Tuổi CSPA = Tuổi thực tế tại thời điểm visa available − Thời
                gian I-140 được xét duyệt (pending time)
              </b>
              <br />
              Nếu kết quả dưới 21 → con vẫn giữ được tư cách derivative.
            </p>
            <p className="mt-2 text-xs text-text-muted">
              ⚠️ Điều kiện bắt buộc: con phải{" "}
              <b className="text-text">
                &quot;seek to acquire&quot; status trong vòng 1 năm
              </b>{" "}
              kể từ khi visa available (nộp I-485 hoặc DS-260). Đây là tính
              toán phức tạp — luôn tham khảo luật sư immigration khi con gần
              21 tuổi.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Các Tình Huống Khác Cần Chú Ý
          </p>
          <ul className="mt-2 flex flex-col divide-y divide-border text-sm text-text-muted">
            <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
              <span className="flex-shrink-0">💍</span>
              <span>
                <b className="text-text">Ly hôn trong lúc chờ:</b> Nếu ly
                hôn trước khi nhận thẻ xanh, vợ/chồng cũ mất tư cách
                derivative ngay lập tức. Nếu ly hôn sau khi đã có thẻ xanh,
                mỗi người giữ thẻ xanh riêng (không ảnh hưởng tư cách đã
                có).
              </span>
            </li>
            <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
              <span className="flex-shrink-0">👶</span>
              <span>
                <b className="text-text">Sinh con tại Mỹ trong lúc chờ:</b>{" "}
                Trẻ sinh ra tại Mỹ tự động có quốc tịch Mỹ (theo Tu chính án
                14) — không cần làm thủ tục bảo lãnh.
              </span>
            </li>
            <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
              <span className="flex-shrink-0">📑</span>
              <span>
                <b className="text-text">Con riêng (stepchild):</b> Chỉ
                được tính là derivative nếu cuộc hôn nhân giữa cha/mẹ ruột
                và cha/mẹ kế diễn ra{" "}
                <b className="text-secondary">trước khi con đủ 18 tuổi</b>.
                Sau 18 tuổi, mối quan hệ &quot;stepchild&quot; không còn
                được công nhận cho mục đích di trú.
              </span>
            </li>
            <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
              <span className="flex-shrink-0">⚖️</span>
              <span>
                <b className="text-text">Con nuôi (adopted child):</b> Phải
                hoàn tất thủ tục nhận con nuôi hợp pháp{" "}
                <b className="text-secondary">trước khi con đủ 16 tuổi</b>{" "}
                (một số trường hợp đặc biệt cho phép đến 18) và phải chứng
                minh đã sống chung tối thiểu 2 năm.
              </span>
            </li>
            <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
              <span className="flex-shrink-0">🌐</span>
              <span>
                <b className="text-text">
                  Người thân đang ở Mỹ bất hợp pháp (visa overstay):
                </b>{" "}
                Việc bảo lãnh trở nên phức tạp hơn nhiều — cần tư vấn luật
                sư về khả năng &quot;adjustment of status&quot; tại chỗ hay
                phải về Việt Nam phỏng vấn (có thể bị 3/10-year bar).
              </span>
            </li>
          </ul>

          <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-sm text-text">
            <p>
              👩‍⚖️ <b>Khi nào nên thuê luật sư immigration:</b> Các trường
              hợp CSPA, ly hôn, con riêng/con nuôi, hoặc người thân có lịch
              sử visa phức tạp (overstay, từng bị từ chối visa) đều nên có
              luật sư chuyên trách — đây không phải lúc tự làm hồ sơ để
              tiết kiệm vài trăm đô.
            </p>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg p-4">
            <h3 className="text-sm font-bold text-text">
              📚 Nguồn tham khảo chính thức
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              <a
                href="https://www.uscis.gov/i-130"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                USCIS — Form I-130
              </a>
              : đơn bảo lãnh thân nhân (Petition for Alien Relative), hướng
              dẫn điền form, giấy tờ kèm theo, và lệ phí hiện hành.
              <br />
              <a
                href="https://www.uscis.gov/policy-manual"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                USCIS Policy Manual — Child Status Protection Act (CSPA)
              </a>
              : quy định chính thức về cách tính tuổi CSPA cho con cái đi
              theo (derivative beneficiary).
            </p>
          </div>
        </section>
      )}
    </>
  );
}
