// Tab "Học Đường" — ported from Van_Hoa_My_Danh_Cho_Huy.html #hocduong.

import { Alert, Card, DataTable, SectionTitle, SubTitle } from "./van-hoa-ui";

export function VanHoaTabHocDuong() {
  return (
    <div>
      <SectionTitle>📚 Hệ Thống Giáo Dục Mỹ — Cho Cả Nhà</SectionTitle>

      <SubTitle>Sơ đồ hệ thống trường Mỹ</SubTitle>
      <DataTable
        headers={["Cấp học", "Lớp", "Tuổi", "Ghi chú quan trọng"]}
        rows={[
          ["Kindergarten", "K", "5-6", "Bé An sẽ vào đây — miễn phí, công lập. Học tiếng Anh cực nhanh ở độ tuổi này"],
          ["Elementary School", "1-5", "6-11", "Tập trung đọc, viết, toán. Không có thi chuyển cấp. GPA chưa quan trọng"],
          ["Middle School", "6-8", "11-14", "Bắt đầu chọn môn tự chọn. Quan trọng xây nền tảng"],
          ["High School", "9-12", "14-18", "GPA từ đây ảnh hưởng đại học. Tham gia ngoại khóa!"],
          ["Community College", "18+", "", "2 năm, học phí thấp. Bạn có thể học nghề buổi tối tại Ivy Tech Community College"],
          ["University", "18+", "", "4 năm, bằng cử nhân. Chi phí cao nhưng có scholarship cho GPA tốt"],
        ]}
      />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card
          title="📝 Trường Mỹ Khác VN Như Thế Nào"
          titleColor="text-primary"
          items={[
            "Không có đồng phục — ăn mặc thoải mái",
            "Học sinh được phát biểu, tranh luận với thầy cô",
            "Không có sổ liên lạc — thầy cô email trực tiếp phụ huynh",
            "GPA thang điểm A-F (A=xuất sắc, F=rớt)",
            "Homework ít hơn VN nhưng project nhiều hơn",
            "Không có học thêm — thay bằng tutoring hoặc Khan Academy",
            "Bắt nạt (bullying) bị xử lý rất nghiêm — báo ngay",
          ]}
        />
        <Card
          title="🌟 Con Em — Lợi Thế Khi Sang Mỹ"
          titleColor="text-accent"
          items={[
            "Toán Việt Nam học nặng hơn → sẽ giỏi hơn bạn cùng lớp ngay",
            "Khoa học tự nhiên: nền tảng tốt từ VN",
            "ESL class: được hỗ trợ miễn phí, không phải xấu hổ",
            "Nên tham gia 1 sport team → kết bạn nhanh nhất",
            "GPA từ lớp 9 quan trọng cho college — giữ từ đầu",
            "Extracurricular activities = ngoại khóa rất quan trọng cho hồ sơ đại học",
          ]}
        />
      </div>

      <Alert tone="blue" title="🎓 Ivy Tech Community College Indianapolis">
        Trường nghề lớn nhất Indiana. Có khóa học buổi tối 2-3 đêm/tuần.
        Electrician Apprenticeship, HVAC, Welding, Manufacturing
        Technology. Học phí ~$150-200/credit. Sau 12-18 tháng có chứng chỉ
        → lương tăng lên $25-35/giờ ngay lập tức.
        <br />
        <br />
        Website: <strong>ivytech.edu</strong> · Campus gần nhất: 50 W. Fall
        Creek Pkwy, Indianapolis
      </Alert>
    </div>
  );
}
