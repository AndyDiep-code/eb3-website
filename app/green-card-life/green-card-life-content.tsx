"use client";

import { useState } from "react";

type TabKey = "rights" | "benefits" | "travel" | "duties";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "rights", label: "✅ Quyền & Tự Do" },
  { key: "benefits", label: "🏛️ Phúc Lợi Liên Bang" },
  { key: "travel", label: "✈️ Quy Tắc Du Lịch" },
  { key: "duties", label: "📋 Nghĩa Vụ Cần Biết" },
];

function TabButton({
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
      className={`rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-bg text-text-muted hover:border-primary hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Client component holding the 4-tab UI ported from green-card-life.html's
 * inline showTab() DOM-toggle script (lines 187-472 of the legacy file).
 * Kept separate from page.tsx so the route's Metadata export (server-only)
 * stays in a server component.
 */
export function GreenCardLifeContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("rights");

  return (
    <>
      <div className="mt-4 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm text-text">
        <p>
          🎉 <b>Thẻ xanh thay đổi cuộc sống của bạn.</b> Bạn không còn bị
          ràng buộc với employer bảo lãnh, có thể làm bất kỳ công việc hợp
          pháp nào, mua nhà, và xây dựng cuộc sống lâu dài tại Mỹ. Trang này
          giải thích cụ thể những gì bạn có thể làm ngay.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.label}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>

      {activeTab === "rights" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            ✅ Bạn Được Làm Gì Với Thẻ Xanh
          </h2>

          <div className="mt-3 rounded-card border border-accent/40 bg-bg p-4">
            <div className="flex flex-col divide-y divide-border">
              {[
                {
                  icon: "💼",
                  title: "Làm Việc Cho Bất Kỳ Employer Nào",
                  desc: "Không còn bị giới hạn với employer bảo lãnh. Có thể đổi việc tự do, xin việc ở bất kỳ công ty nào, làm part-time hoặc full-time. Không cần EAD hay bất kỳ giấy phép làm việc nào khác.",
                },
                {
                  icon: "🏢",
                  title: "Tự Kinh Doanh (Self-Employment)",
                  desc: "Có thể mở doanh nghiệp, làm freelance, lái xe cho Uber/Lyft, hoặc làm bất kỳ hình thức tự kinh doanh hợp pháp nào mà không cần visa kinh doanh đặc biệt.",
                },
                {
                  icon: "🏡",
                  title: "Mua Nhà & Tài Sản",
                  desc: "Đủ điều kiện xin mortgage (vay mua nhà) tại ngân hàng Mỹ. Có thể sở hữu bất động sản, xe, và tài sản khác dưới tên mình. FHA loans (vay với trả trước 3.5%) có sẵn cho permanent residents.",
                },
                {
                  icon: "🎓",
                  title: "Học Tập & Học Bổng",
                  desc: "Đủ điều kiện nộp FAFSA (hỗ trợ tài chính liên bang cho đại học), vay student loan liên bang, và hầu hết học bổng tiểu bang. Nhiều bang tính học phí in-state (rẻ hơn) cho permanent residents.",
                },
                {
                  icon: "👮",
                  title: "Làm Việc Cho Chính Phủ",
                  desc: "Phần lớn việc làm liên bang và tiểu bang chấp nhận permanent residents. Một số vị trí yêu cầu công dân Mỹ (CIA, FBI, một số vị trí quốc phòng) nhưng đại đa số thì không.",
                },
                {
                  icon: "👴",
                  title: "Hưu Trí & Social Security",
                  desc: "Sau khi đóng đủ 40 quarters (10 năm làm việc với SSN), bạn đủ điều kiện nhận Social Security retirement benefits. Medicare bắt đầu từ 65 tuổi (sau 10 năm làm việc tại Mỹ).",
                },
                {
                  icon: "🔫",
                  title: "Mua Súng Hợp Pháp",
                  desc: "Permanent residents được phép mua súng hợp pháp theo luật liên bang tại hầu hết các bang, miễn là đáp ứng các yêu cầu kiểm tra lý lịch. Luật từng bang có thể khác nhau.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="w-7 flex-shrink-0 text-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text">
                      {item.title}
                    </div>
                    <div className="mt-1 text-xs text-text-muted">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Những Gì Permanent Residents KHÔNG Được Làm
          </p>
          <div className="mt-2 rounded-card border border-primary/40 bg-bg p-4">
            <ul className="flex flex-col divide-y divide-border text-sm text-text-muted">
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">❌</span>
                <span>
                  <b className="text-text">
                    Bỏ phiếu bầu cử liên bang và tiểu bang
                  </b>{" "}
                  — chỉ dành cho công dân Mỹ. Vi phạm này có thể dẫn đến mất
                  thẻ xanh và bị trục xuất.
                </span>
              </li>
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">❌</span>
                <span>
                  <b className="text-text">
                    Đăng ký tham gia jury duty bắt buộc
                  </b>{" "}
                  — một số bang mời PR làm juror; bạn có thể từ chối nếu chưa
                  là công dân.
                </span>
              </li>
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">❌</span>
                <span>
                  <b className="text-text">Xin hộ chiếu Mỹ</b> — chỉ dành
                  cho công dân. Bạn vẫn dùng hộ chiếu Việt Nam kết hợp với
                  thẻ xanh khi đi lại.
                </span>
              </li>
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">❌</span>
                <span>
                  <b className="text-text">
                    Bảo lãnh anh/chị/em hoặc cha/mẹ sang Mỹ
                  </b>{" "}
                  — chỉ công dân mới bảo lãnh được diện này. PR chỉ bảo lãnh
                  được vợ/chồng và con chưa kết hôn.
                </span>
              </li>
            </ul>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            So Sánh: Visa H-2B vs. EAD vs. Thẻ Xanh
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Quyền</th>
                  <th className="py-2 pr-3 font-medium">H-2B Visa</th>
                  <th className="py-2 pr-3 font-medium">
                    EAD (I-485 pending)
                  </th>
                  <th className="py-2 font-medium">Thẻ Xanh</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Đổi employer tự do
                  </td>
                  <td className="py-2 pr-3">❌</td>
                  <td className="py-2 pr-3">⚠️ AC21</td>
                  <td className="py-2">✅ Tự do</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">Tự kinh doanh</td>
                  <td className="py-2 pr-3">❌</td>
                  <td className="py-2 pr-3">✅</td>
                  <td className="py-2">✅</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Xin mortgage mua nhà
                  </td>
                  <td className="py-2 pr-3">Rất khó</td>
                  <td className="py-2 pr-3">Khó</td>
                  <td className="py-2">✅ Dễ hơn</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    FAFSA cho đại học
                  </td>
                  <td className="py-2 pr-3">❌</td>
                  <td className="py-2 pr-3">Tùy bang</td>
                  <td className="py-2">✅</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold">
                    Thời hạn hiệu lực
                  </td>
                  <td className="py-2 pr-3">Theo visa</td>
                  <td className="py-2 pr-3">Đến khi có GC</td>
                  <td className="py-2">10 năm (gia hạn)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "benefits" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            🏛️ Phúc Lợi Liên Bang & Tiểu Bang
          </h2>

          <div className="mt-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm text-text">
            <p>
              ⏳ <b>Quan trọng: &quot;5-Year Bar&quot;</b> — Hầu hết phúc lợi
              liên bang yêu cầu bạn đã là permanent resident trong ít nhất{" "}
              <b>5 năm</b> trước khi đủ điều kiện. Có một số ngoại lệ quan
              trọng bên dưới.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Phúc Lợi Có Sẵn Ngay (Không Cần Chờ 5 Năm)
          </p>
          <div className="mt-2 rounded-card border border-accent/40 bg-bg p-4">
            <ul className="flex flex-col divide-y divide-border text-sm text-text-muted">
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">✅</span>
                <span>
                  <b className="text-accent">Emergency Medicaid:</b> Cấp cứu
                  y tế được bao chi trả bất kể thời gian cư trú
                </span>
              </li>
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">✅</span>
                <span>
                  <b className="text-accent">CHIP (trẻ em):</b> Nhiều bang
                  không áp 5-year bar cho trẻ em và phụ nữ mang thai
                </span>
              </li>
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">✅</span>
                <span>
                  <b className="text-accent">WIC:</b> Chương trình dinh dưỡng
                  cho phụ nữ mang thai và trẻ em dưới 5 tuổi
                </span>
              </li>
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">✅</span>
                <span>
                  <b className="text-accent">School meals:</b> Bữa ăn miễn
                  phí/giảm giá tại trường học cho con cái
                </span>
              </li>
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">✅</span>
                <span>
                  <b className="text-accent">Head Start:</b> Chương trình
                  giáo dục mầm non miễn phí
                </span>
              </li>
              <li className="flex gap-2 py-2 first:pt-0 last:pb-0">
                <span className="flex-shrink-0">✅</span>
                <span>
                  <b className="text-accent">ACA Health Insurance:</b> Mua
                  bảo hiểm qua marketplace với trợ cấp (không phải phúc lợi
                  nhà nước)
                </span>
              </li>
            </ul>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Sau 5 Năm Có Thẻ Xanh
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Chương Trình</th>
                  <th className="py-2 pr-3 font-medium">Điều Kiện</th>
                  <th className="py-2 font-medium">Mức Hỗ Trợ</th>
                </tr>
              </thead>
              <tbody className="text-text">
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Medicaid (đầy đủ)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    5 năm PR + thu nhập thấp
                  </td>
                  <td className="py-2 text-text-muted">
                    Bảo hiểm y tế miễn phí/rất rẻ
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    SNAP (food stamps)
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    5 năm PR + thu nhập thấp
                  </td>
                  <td className="py-2 text-text-muted">
                    $200-400/tháng cho thực phẩm
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">TANF</td>
                  <td className="py-2 pr-3 text-text-muted">
                    5 năm PR + gia đình có con
                  </td>
                  <td className="py-2 text-text-muted">
                    Hỗ trợ tiền mặt tạm thời
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">SSI</td>
                  <td className="py-2 pr-3 text-text-muted">
                    5 năm PR + người già/khuyết tật
                  </td>
                  <td className="py-2 text-text-muted">$914/tháng (2024)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3 font-semibold">
                    Social Security
                  </td>
                  <td className="py-2 pr-3 text-text-muted">
                    40 quarters đóng thuế
                  </td>
                  <td className="py-2 text-text-muted">
                    Hưu trí từ 62-67 tuổi
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold">Medicare</td>
                  <td className="py-2 pr-3 text-text-muted">
                    65 tuổi + 10 năm làm việc có SSN
                  </td>
                  <td className="py-2 text-text-muted">
                    Bảo hiểm y tế người cao tuổi
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Phúc Lợi Theo Bang — Các Bang EB-3 Phổ Biến
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="py-2 pr-3 font-medium">Bang</th>
                  <th className="py-2 pr-3 font-medium">
                    Medicaid (sau 5 năm)
                  </th>
                  <th className="py-2 pr-3 font-medium">CHIP Trẻ Em</th>
                  <th className="py-2 font-medium">Ghi Chú</th>
                </tr>
              </thead>
              <tbody className="text-text">
                {[
                  {
                    state: "Texas",
                    medicaid: "Đủ điều kiện",
                    chip: "Không có 5-year bar",
                    note: "Tiêu chuẩn Medicaid hạn chế hơn",
                  },
                  {
                    state: "North Carolina",
                    medicaid: "Đủ điều kiện",
                    chip: "Không có 5-year bar",
                    note: "Medicaid mở rộng từ 2023",
                  },
                  {
                    state: "Georgia",
                    medicaid: "Hạn chế",
                    chip: "Không có 5-year bar",
                    note: "GA chưa mở rộng Medicaid đầy đủ",
                  },
                  {
                    state: "Pennsylvania",
                    medicaid: "Đủ điều kiện",
                    chip: "Không có 5-year bar",
                    note: "Pennsylvania rộng rãi hơn về immigrant benefits",
                  },
                  {
                    state: "Florida",
                    medicaid: "Đủ điều kiện",
                    chip: "Không có 5-year bar",
                    note: "Florida Medicaid ít categories hơn",
                  },
                  {
                    state: "Wisconsin",
                    medicaid: "Đủ điều kiện",
                    chip: "Không có 5-year bar",
                    note: "BadgerCare+ cho PR sau 5 năm",
                  },
                  {
                    state: "Indiana",
                    medicaid: "Đủ điều kiện",
                    chip: "Không có 5-year bar",
                    note: "HIP 2.0 program",
                  },
                ].map((row) => (
                  <tr
                    key={row.state}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-2 pr-3 font-semibold">{row.state}</td>
                    <td className="py-2 pr-3 text-text-muted">
                      {row.medicaid}
                    </td>
                    <td className="py-2 pr-3 text-text-muted">{row.chip}</td>
                    <td className="py-2 text-text-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-card border border-primary/40 bg-primary/10 p-3 text-sm text-text">
            <p>
              ⚠️ <b>Public Charge Rule:</b> Sử dụng Medicaid, SNAP, Section 8
              housing có thể ảnh hưởng đến hồ sơ bảo lãnh gia đình sau này
              (công dân bảo lãnh người thân). Cần tư vấn luật sư immigration
              trước khi đăng ký nếu bạn có kế hoạch bảo lãnh ai. Lưu ý: WIC,
              CHIP, trường học miễn phí <b>không tính</b> vào public charge.
            </p>
          </div>
        </section>
      )}

      {activeTab === "travel" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            ✈️ Quy Tắc Du Lịch Cho Người Có Thẻ Xanh
          </h2>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Ngưỡng Thời Gian Vắng Mặt
          </p>
          <div className="mt-2 flex overflow-hidden rounded-card">
            <div className="flex-1 bg-accent/15 p-3 text-center text-xs text-accent">
              <span className="block text-lg font-extrabold">0–6</span>
              <span className="text-[10px]">tháng</span>
              <span className="mt-1 block text-[10px] opacity-85">
                An toàn, không vấn đề gì
              </span>
            </div>
            <div className="flex-1 bg-secondary/15 p-3 text-center text-xs text-secondary">
              <span className="block text-lg font-extrabold">6–12</span>
              <span className="text-[10px]">tháng</span>
              <span className="mt-1 block text-[10px] opacity-85">
                CBP có thể hỏi về ý định định cư
              </span>
            </div>
            <div className="flex-1 bg-primary/15 p-3 text-center text-xs text-primary">
              <span className="block text-lg font-extrabold">&gt;12</span>
              <span className="text-[10px]">tháng</span>
              <span className="mt-1 block text-[10px] opacity-85">
                Cần Reentry Permit — không có = nguy cơ mất GC
              </span>
            </div>
            <div className="flex-1 bg-bg-alt p-3 text-center text-xs text-text">
              <span className="block text-lg font-extrabold">I-131</span>
              <span className="text-[10px]">Reentry Permit</span>
              <span className="mt-1 block text-[10px] opacity-85">
                Cho phép vắng mặt đến 2 năm
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-card border border-accent/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
              AN TOÀN
            </span>
            <h3 className="mt-2 text-sm font-bold text-text">
              Dưới 6 Tháng — Không Cần Làm Gì Thêm
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Bạn có thể đi Việt Nam và quay lại bình thường dùng thẻ xanh.
              CBP (hải quan) sẽ kiểm tra thẻ xanh và cho qua. Không cần giấy
              tờ bổ sung. Điều này cho phép thăm gia đình 4-5 tháng mỗi năm
              mà không gặp vấn đề.
            </p>
          </div>

          <div className="mt-3 rounded-card border border-secondary/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-secondary/15 px-2 py-0.5 text-xs font-bold text-secondary">
              CẨN THẬN
            </span>
            <h3 className="mt-2 text-sm font-bold text-text">
              6-12 Tháng — CBP Có Thể Hỏi
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              CBP có thể hỏi: &quot;Tại sao bạn ở ngoài Mỹ lâu vậy?&quot; và
              &quot;Bạn vẫn định sống tại Mỹ không?&quot; Chuẩn bị bằng
              chứng duy trì US ties: lease agreement, hóa đơn, thư từ ngân
              hàng Mỹ, bằng chứng việc làm đang chờ bạn quay lại.
            </p>
          </div>

          <div className="mt-3 rounded-card border border-primary/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary">
              NGUY HIỂM
            </span>
            <h3 className="mt-2 text-sm font-bold text-text">
              Trên 12 Tháng Không Có Reentry Permit
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              CBP có thể cho rằng bạn đã từ bỏ (abandoned) thẻ xanh và không
              cho nhập cảnh. Bạn phải xin visa DS-117 tại lãnh sự quán Mỹ ở
              Việt Nam để xin phép quay về — quy trình này tốn nhiều thời
              gian và tiền bạc.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Reentry Permit (Form I-131) — Giải Pháp Cho Vắng Mặt Dài
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-loose text-text-muted">
            <p>
              <b className="text-primary">Nộp trước khi rời Mỹ</b> — không
              thể nộp từ nước ngoài
              <br />
              <b className="text-primary">Thời hạn:</b> 2 năm (sau đó gia
              hạn nếu cần)
              <br />
              <b className="text-primary">Phí nộp đơn:</b> $590 (2024)
              <br />
              <b className="text-primary">Xử lý:</b> 3-6 tháng, có thể có
              biometrics
              <br />
              <b className="text-primary">Lưu ý quan trọng:</b> Reentry
              permit cho phép vắng mặt đến 2 năm, nhưng{" "}
              <b className="text-secondary">không bảo đảm hoàn toàn</b> — CBP
              vẫn có thể hỏi về ý định định cư nếu bạn đã vắng mặt nhiều năm
              liên tiếp.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Duy Trì &quot;US Ties&quot; Khi Ở Việt Nam
          </p>
          <div className="mt-2 rounded-card border border-accent/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
              BẰNG CHỨNG BẠN VẪN ĐỊNH CƯ TẠI MỸ
            </span>
            <p className="mt-2 text-sm leading-loose text-text-muted">
              ✅ Giữ tài khoản ngân hàng Mỹ hoạt động
              <br />
              ✅ Giữ địa chỉ nhà tại Mỹ (gia đình, bạn bè đứng tên)
              <br />
              ✅ File thuế Mỹ mỗi năm (Form 1040 — bắt buộc kể cả ở Việt Nam)
              <br />
              ✅ Giữ bằng lái xe Mỹ còn hiệu lực
              <br />
              ✅ Có việc làm hoặc lý do cụ thể để quay lại (hợp đồng, gia
              đình, nhà)
              <br />
              ✅ Thư từ xác nhận tình trạng tạm thời ở Việt Nam (chăm sóc cha
              mẹ bệnh, v.v.)
            </p>
          </div>

          <div className="mt-4 rounded-card border border-border bg-bg-alt p-3 text-sm text-text">
            <p>
              📅 <b>Ảnh hưởng đến naturalization:</b> Vắng mặt &gt;6 tháng
              liên tục có thể ngắt quãng &quot;continuous residence&quot;
              cần thiết cho naturalization. Để nộp N-400 sau 5 năm, bạn phải
              duy trì continuous residence tại Mỹ.
            </p>
          </div>
        </section>
      )}

      {activeTab === "duties" && (
        <section className="mt-4">
          <h2 className="border-b border-border pb-2 text-base font-bold text-text">
            📋 Nghĩa Vụ Của Người Có Thẻ Xanh
          </h2>

          <div className="mt-3 rounded-card border border-border bg-bg-alt p-3 text-sm text-text">
            <p>
              ℹ️ Thẻ xanh không phải là bất biến. Bỏ qua một số nghĩa vụ
              dưới đây có thể dẫn đến mất thẻ xanh hoặc bị từ chối
              naturalization.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            1. Khai Thuế Mỗi Năm — Bắt Buộc
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-relaxed text-text-muted">
            <p>
              Permanent residents phải khai thuế Mỹ (Form 1040){" "}
              <b className="text-primary">mỗi năm</b>, kể cả khi đang ở Việt
              Nam và thu nhập từ Việt Nam. Mỹ đánh thuế dựa trên{" "}
              <b className="text-text">quốc tịch thuế</b> (tax residency),
              không phải vị trí địa lý.
              <br />
              <br />
              Nếu bạn có thu nhập tại Việt Nam và đã đóng thuế VN, có thể
              dùng{" "}
              <b className="text-primary">Foreign Tax Credit (Form 1116)</b>{" "}
              để tránh đóng thuế hai lần. Deadline: 15 tháng 4 mỗi năm (gia
              hạn đến 15 tháng 10 nếu ở nước ngoài).
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            2. Thông Báo Thay Đổi Địa Chỉ
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-relaxed text-text-muted">
            <p>
              Phải thông báo cho USCIS trong vòng{" "}
              <b className="text-primary">10 ngày</b> khi thay đổi địa chỉ,
              qua <b>Form AR-11</b> tại uscis.gov/ar-11. Miễn phí và chỉ mất
              5 phút. Không thông báo là vi phạm luật, có thể ảnh hưởng đến
              mail từ USCIS (notice phỏng vấn, thư gia hạn thẻ).
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            3. Gia Hạn Thẻ Xanh
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-relaxed text-text-muted">
            <p>
              Thẻ xanh 10 năm phải gia hạn trước khi hết hạn — nộp{" "}
              <b>Form I-90</b> ít nhất 6 tháng trước ngày hết hạn. Phí: $540.
              Thẻ hết hạn không có nghĩa là mất thường trú nhân — nhưng
              không có thẻ hiệu lực gây khó khăn khi đi làm, mở tài khoản, và
              du lịch.
              <br />
              <br />
              <b className="text-secondary">
                Conditional green card (2 năm):
              </b>{" "}
              Nếu thẻ có chữ &quot;CR1&quot; hoặc &quot;LPR
              Conditional&quot;, phải nộp <b>Form I-751</b> để remove
              conditions trong vòng 90 ngày trước ngày hết hạn. Bỏ qua điều
              này = mất thẻ xanh.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            4. Selective Service — Nam Giới 18-25 Tuổi
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-relaxed text-text-muted">
            <p>
              Nam permanent residents từ 18-25 tuổi phải đăng ký Selective
              Service (nghĩa vụ quân sự tiềm năng) tại <b>sss.gov</b>. Miễn
              phí và chỉ mất 2 phút. Không đăng ký có thể ảnh hưởng đến việc
              xin naturalization, student loans liên bang, và một số công
              việc chính phủ.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            5. Không Phạm Tội — Điều Quan Trọng Nhất
          </p>
          <div className="mt-2 rounded-card border border-primary/40 bg-bg p-4">
            <span className="inline-block rounded-btn bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary">
              NGUY HIỂM
            </span>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Một số tội hình sự có thể dẫn đến{" "}
              <b className="text-primary">
                trục xuất kể cả khi đã có thẻ xanh
              </b>
              :
              <br />
              ❌ Aggravated felonies (bất kỳ tội felony nghiêm trọng nào)
              <br />
              ❌ Drug offenses (kể cả tội liên quan đến marijuana — vẫn bất
              hợp pháp ở cấp liên bang)
              <br />
              ❌ Domestic violence, elder abuse, child abuse
              <br />
              ❌ Firearms offenses
              <br />
              ❌ Crimes involving moral turpitude (gian lận, ăn cắp, v.v.)
              <br />
              <br />
              Nếu bị bắt vì bất kỳ lý do nào,{" "}
              <b className="text-primary">hỏi luật sư immigration ngay</b> —
              không chỉ hỏi criminal lawyer.
            </p>
          </div>

          <p className="mt-4 text-xs font-bold tracking-wide text-primary uppercase">
            Checklist Tổng Hợp
          </p>
          <div className="mt-2 rounded-card border border-border bg-bg p-4 text-sm leading-loose text-text-muted">
            <p>
              ☐ Khai thuế Form 1040 mỗi năm (deadline 15/4)
              <br />
              ☐ Cập nhật địa chỉ qua AR-11 mỗi khi dọn nhà
              <br />
              ☐ Gia hạn thẻ xanh 6 tháng trước ngày hết hạn (Form I-90)
              <br />
              ☐ Nam 18-25 tuổi: đăng ký Selective Service tại sss.gov
              <br />
              ☐ Không vắng mặt khỏi Mỹ &gt;6 tháng liên tục (ảnh hưởng
              continuous residence)
              <br />
              ☐ Xin Reentry Permit (I-131) nếu cần ở Việt Nam &gt;1 năm
              <br />
              ☐ Giữ hồ sơ thuế và USCIS correspondence đầy đủ
              <br />
              ☐ Hỏi luật sư immigration <i>trước</i> khi đăng ký bất kỳ phúc
              lợi chính phủ nào
            </p>
          </div>
        </section>
      )}
    </>
  );
}
