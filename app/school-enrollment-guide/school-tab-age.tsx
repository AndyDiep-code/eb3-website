// Tab 2: "Tuổi & Lớp Học" — ported from school-enrollment-guide.html #tab-age.

import { Alert, Card, CardTitle } from "./school-enrollment-ui";

const AGE_GRADE_ROWS: Array<{ level: string; grade: string; ages: string }> = [
  { level: "Mầm non (Pre-K)", grade: "Pre-K", ages: "3–4 tuổi (một số khu vực, không bắt buộc)" },
  { level: "Mẫu giáo (Kindergarten)", grade: "K", ages: "~5 tuổi" },
  { level: "Tiểu học (Elementary)", grade: "1–5", ages: "6–10 tuổi" },
  { level: "Trung học cơ sở (Middle School)", grade: "6–8", ages: "11–13 tuổi" },
  { level: "Trung học phổ thông (High School)", grade: "9–12", ages: "14–18 tuổi" },
];

export function SchoolTabAge() {
  return (
    <div>
      <h2 className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
        🎂 Tuổi Nhập Học Theo Lớp (K-12)
      </h2>

      <p className="mb-2.5 text-sm leading-relaxed text-text-muted">
        Độ tuổi dưới đây là mốc tham khảo chung —{" "}
        <strong className="text-secondary">ngày cắt tuổi (age cutoff)</strong>{" "}
        và tên gọi cấp lớp khác nhau theo từng tiểu bang/học khu (school
        district).
      </p>

      <div className="mb-3 overflow-x-auto rounded-card border border-border">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-3 py-2.5 text-left text-[11.5px] font-bold text-primary">Cấp Học</th>
              <th className="px-3 py-2.5 text-left text-[11.5px] font-bold text-primary">Lớp</th>
              <th className="px-3 py-2.5 text-left text-[11.5px] font-bold text-primary">Độ Tuổi Tham Khảo</th>
            </tr>
          </thead>
          <tbody>
            {AGE_GRADE_ROWS.map((row) => (
              <tr key={row.level} className="border-b border-border last:border-b-0">
                <td className="px-3 py-2.5 font-semibold text-text">{row.level}</td>
                <td className="px-3 py-2.5 align-top text-text-muted">{row.grade}</td>
                <td className="px-3 py-2.5 align-top text-text-muted">{row.ages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Card>
        <CardTitle>Tìm Trường &amp; Học Khu Theo Địa Chỉ Nhà</CardTitle>
        <p className="text-sm leading-relaxed text-text-muted">
          Mỗi học khu (school district) có ranh giới riêng — con bạn học
          trường nào phụ thuộc vào địa chỉ nhà. Tìm &quot;school
          district&quot; + tên thành phố trên Google, hoặc dùng website của
          Sở Giáo Dục tiểu bang (Department of Education) để tra trường
          gần nhà.
        </p>
      </Card>

      <Alert tone="yellow" icon="⚠️">
        Nếu con lớn hơn tuổi thông thường của lớp (ví dụ 15 tuổi nhưng học
        bạ VN tương đương lớp 8), trường có thể xếp theo <strong>tuổi</strong>{" "}
        hoặc theo <strong>kết quả kiểm tra xếp lớp (placement test)</strong> —
        tùy chính sách học khu. Hỏi trực tiếp văn phòng tuyển sinh
        (enrollment office) để biết quy trình cụ thể.
      </Alert>
    </div>
  );
}
