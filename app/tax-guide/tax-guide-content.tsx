"use client";

import { useState } from "react";
import { TabNav } from "../components/tab-nav";

type Tab = "basics" | "docs" | "filing" | "deductions";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "basics", label: "📚 Thuế Cơ Bản" },
  { key: "docs", label: "📄 W-2 & Giấy Tờ" },
  { key: "filing", label: "📝 Cách Khai Thuế" },
  { key: "deductions", label: "💸 Khấu Trừ & Hoàn Thuế" },
];

export function TaxGuideContent() {
  const [tab, setTab] = useState<Tab>("basics");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-text">🧾 Khai Thuế Lần Đầu — Hướng Dẫn Từng Bước</h1>
      <p className="mt-1 text-text-muted">Dành cho người lao động EB-3 mới sang Mỹ · Song ngữ Việt–Anh</p>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {tab === "basics" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-card border border-primary/30 bg-primary/5 p-3 text-xs text-text-muted leading-relaxed">
            ⚠️ <b className="text-text">Tại sao phải khai thuế?</b> Ngay cả khi employer đã trừ thuế từ lương, bạn VẪN phải nộp tờ khai thuế (tax return) hàng năm. Không khai thuế có thể bị phạt và gây khó khăn cho hồ sơ nhập cư.
          </div>

          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">🗓️ Lịch Quan Trọng</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-border">
                  <th className="pb-2 text-left text-text-muted">Thời Điểm</th>
                  <th className="pb-2 text-left text-text-muted">Sự Kiện</th>
                </tr></thead>
                <tbody className="text-text-muted">
                  {[
                    ["31/01 hàng năm", "Employer gửi W-2 cho bạn (qua mail hoặc online)"],
                    ["15/04 hàng năm", "Deadline nộp tờ khai thuế (tax return)"],
                    ["Tháng 10 (gia hạn)", "Deadline sau khi xin extension (Form 4868) — gia hạn nộp hồ sơ, không gia hạn nộp tiền thuế"],
                    ["1–3 tuần sau e-file", "Nhận tiền hoàn thuế qua direct deposit (nhanh nhất)"],
                    ["6–8 tuần", "Nhận hoàn thuế nếu nộp paper (hồ sơ giấy)"],
                  ].map(([time, event]) => (
                    <tr key={time} className="border-b border-border last:border-0">
                      <td className="py-2 pr-4 font-semibold text-text whitespace-nowrap">{time}</td>
                      <td className="py-2">{event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">🗺️ Thuế Thu Nhập Tiểu Bang (State Income Tax)</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Phụ thuộc vào bang bạn sống và làm việc. Các bang <b className="text-green-400">không có thuế thu nhập tiểu bang</b>: Texas, Florida, Nevada, South Dakota, Wyoming, Washington, Alaska. Nếu ở các bang này, chỉ cần khai thuế liên bang.
            </p>
            <p className="mt-2 text-xs text-text-muted leading-relaxed">
              <b className="text-text">Thuế Bán Hàng (Sales Tax):</b> Tự động tính vào giá hàng ở cửa hàng. Bạn không cần khai báo gì — đây là trách nhiệm của người bán.
            </p>
          </div>
        </div>
      )}

      {tab === "docs" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">📋 Mẫu W-2 — Wage and Tax Statement</h3>
            <p className="text-xs text-text-muted mb-3 leading-relaxed">
              W-2 là mẫu báo cáo thu nhập hàng năm do employer phát hành. Họ phải gửi trước ngày <b className="text-text">31/01</b> mỗi năm. Nếu làm nhiều công ty, mỗi công ty gửi một W-2 riêng.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-border">
                  <th className="pb-2 text-left text-text-muted">Ô (Box)</th>
                  <th className="pb-2 text-left text-text-muted">Tên</th>
                  <th className="pb-2 text-left text-text-muted">Ý Nghĩa</th>
                </tr></thead>
                <tbody className="text-text-muted">
                  {[
                    ["Box 1", "Wages, tips", "Tổng thu nhập chịu thuế liên bang trong năm"],
                    ["Box 2", "Federal tax withheld", "Số thuế liên bang employer đã trừ từ lương"],
                    ["Box 4", "SS tax withheld", "Social Security đã trừ — đúng bằng 6.2% Box 3"],
                    ["Box 6", "Medicare withheld", "Medicare đã trừ — đúng bằng 1.45% Box 5"],
                    ["Box 12", "Various codes", "D = 401k, DD = health insurance premium, v.v."],
                    ["Box 17", "State income tax", "Thuế tiểu bang employer đã trừ từ lương"],
                  ].map(([box, name, meaning]) => (
                    <tr key={box} className="border-b border-border last:border-0">
                      <td className="py-2 pr-2 font-semibold text-text">{box}</td>
                      <td className="py-2 pr-2 whitespace-nowrap">{name}</td>
                      <td className="py-2">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">📁 Giấy Tờ Cần Giữ</h3>
            <ul className="space-y-1.5 text-xs text-text-muted">
              {[
                "W-2 từ mỗi employer (nếu làm nhiều chỗ, có nhiều W-2)",
                "Social Security Card — để ghi SSN chính xác",
                "Tờ khai thuế năm trước (cần AGI để e-file năm sau)",
                "Thông tin tài khoản ngân hàng (routing + account number) để nhận refund nhanh",
                "Giấy tờ chi phí khấu trừ nếu có (học phí, chi phí y tế lớn)",
              ].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-green-400 shrink-0">✅</span>{item}</li>
              ))}
            </ul>
            <div className="mt-3 rounded border border-amber-700/30 bg-amber-950/20 p-2 text-xs text-text-muted">
              ⚠️ <b className="text-text">Nếu mất W-2:</b> Liên hệ HR/Payroll của công ty trước. Nếu công ty đóng cửa, vào IRS.gov → Get Transcript → tải Wage and Income Transcript.
            </div>
          </div>
        </div>
      )}

      {tab === "filing" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">🤝 Cách Khai Miễn Phí</h3>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "VITA — Volunteer Income Tax Assistance (MIỄN PHÍ)",
                  desc: "Dành cho người có thu nhập dưới $67,000/năm. Tình nguyện viên được IRS đào tạo khai thuế cho bạn. Nhiều điểm VITA có người nói tiếng Việt. Tìm điểm gần nhất: irs.gov/vita hoặc gọi 211.",
                  badge: "🏆",
                },
                {
                  title: "IRS Free File (MIỄN PHÍ)",
                  desc: "Thu nhập dưới $84,000/năm thì đủ điều kiện dùng phần mềm miễn phí trên irs.gov/freefile. Nhiều lựa chọn như TaxAct, FreeTaxUSA. Khai online, không cần đến đâu.",
                  badge: "💻",
                },
                {
                  title: "FreeTaxUSA.com (Federal MIỄN PHÍ, State $14.99)",
                  desc: "Không giới hạn thu nhập. Khai federal hoàn toàn miễn phí. State tốn $14.99. Phổ biến với cộng đồng EB-3.",
                  badge: "🖥️",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-card border border-border bg-bg-alt p-3">
                  <div className="text-xs font-bold text-text mb-1">{item.badge} {item.title}</div>
                  <div className="text-xs text-text-muted leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">📝 Các Bước Khai Thuế</h3>
            <ol className="space-y-2 text-xs text-text-muted">
              {[
                "Thu thập giấy tờ: W-2 từ tất cả employer, SSN, địa chỉ hiện tại, thông tin ngân hàng",
                "Chọn Filing Status phù hợp (xem tab Khấu Trừ)",
                "Nhập thông tin W-2 vào phần mềm — từng ô một theo đúng số trên W-2",
                "Chọn Standard Deduction (mặc định) — không cần itemized nếu không có hóa đơn lớn",
                "Kiểm tra refund (tiền hoàn lại) hoặc amount owed (tiền còn phải nộp thêm)",
                "E-file (nộp điện tử) — nhanh hơn paper filing và nhận refund sớm hơn",
                "Nhập routing number và account number ngân hàng để nhận refund qua direct deposit",
              ].map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 rounded-full bg-primary/20 text-primary px-1.5 py-0.5 text-xs font-bold">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {tab === "deductions" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">👤 Filing Status Phổ Biến Cho EB-3</h3>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Single",
                  desc: "Chưa kết hôn, hoặc vợ/chồng vẫn còn ở Việt Nam. Đây là status phổ biến nhất cho người mới đến. Nếu có con đang sống cùng ở Mỹ và là người nuôi dưỡng chính, có thể dùng Head of Household.",
                },
                {
                  title: "Married Filing Jointly",
                  desc: "Cả hai vợ chồng đều đã có mặt ở Mỹ trong năm thuế. Thường có lợi hơn filing separately — standard deduction cao hơn gấp đôi.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-card border border-border bg-bg-alt p-3">
                  <div className="text-xs font-bold text-text mb-1">{item.title}</div>
                  <div className="text-xs text-text-muted leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">💰 Standard Deduction 2024</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-border">
                  <th className="pb-2 text-left text-text-muted">Filing Status</th>
                  <th className="pb-2 text-right text-text-muted">Standard Deduction</th>
                </tr></thead>
                <tbody className="text-text-muted">
                  {[
                    ["Single", "$14,600"],
                    ["Married Filing Jointly", "$29,200"],
                    ["Head of Household", "$21,900"],
                  ].map(([status, amount]) => (
                    <tr key={status} className="border-b border-border last:border-0">
                      <td className="py-2">{status}</td>
                      <td className="py-2 text-right font-bold text-green-400">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-text-muted leading-relaxed">
              <b className="text-text">Standard Deduction</b> là khoản thu nhập được trừ trước khi tính thuế. Ví dụ: thu nhập $30,000 − $14,600 deduction = chỉ đóng thuế trên $15,400. Hầu hết người EB-3 nên chọn Standard Deduction thay vì Itemized.
            </div>
          </div>

          <div className="rounded-card border border-border bg-bg p-4">
            <h3 className="text-xs font-bold text-primary mb-3">💵 Tax Brackets Liên Bang 2024 (Single)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-border">
                  <th className="pb-2 text-left text-text-muted">Thu Nhập Chịu Thuế</th>
                  <th className="pb-2 text-right text-text-muted">Thuế Suất</th>
                </tr></thead>
                <tbody className="text-text-muted">
                  {[
                    ["$0 – $11,600", "10%"],
                    ["$11,601 – $47,150", "12%"],
                    ["$47,151 – $100,525", "22%"],
                    ["$100,526 – $191,950", "24%"],
                    ["> $191,950", "32–37%"],
                  ].map(([range, rate]) => (
                    <tr key={range} className="border-b border-border last:border-0">
                      <td className="py-2">{range}</td>
                      <td className="py-2 text-right font-bold text-secondary">{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
