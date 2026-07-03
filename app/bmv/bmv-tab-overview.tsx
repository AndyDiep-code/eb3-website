// Tab 1: Tổng Quan — Indiana BMV exam overview. Ported from bmv.html #overview.

export function BmvTabOverview() {
  return (
    <div>
      {/* Alert: Vietnamese test available */}
      <div className="mb-4 flex gap-3 rounded-card border border-secondary/40 bg-secondary/10 p-3 text-sm leading-relaxed text-text">
        <span className="flex-shrink-0 text-lg">⭐</span>
        <div>
          <strong>Tin tốt:</strong> Indiana cho phép thi bằng{" "}
          <strong>tiếng Việt!</strong> Bạn có thể chọn tiếng Việt khi vào phòng
          thi tại BMV. Tuy nhiên, vẫn nên học song ngữ để hiểu biển báo và tình
          huống thực tế khi lái xe.
        </div>
      </div>

      <div className="mb-4 flex gap-3 rounded-card border border-primary/20 bg-primary/5 p-3 text-sm text-text">
        <span className="flex-shrink-0 text-lg">🖼️</span>
        <div>
          Xem thêm{" "}
          <a href="/Indiana_BMV_Signs_Visual" className="text-primary underline">
            Biển Báo Giao Thông Song Ngữ Indiana
          </a>{" "}
          — hình ảnh minh họa các biển báo thường gặp trong bài thi.
        </div>
      </div>

      {/* Info grid */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard title="📝 Cấu Trúc Bài Thi" titleColor="text-primary">
          <InfoItem label="Tổng câu" value="50 câu trắc nghiệm" />
          <InfoItem label="Phần 1 — Luật giao thông" value="34 câu (cần đúng ≥28)" />
          <InfoItem label="Phần 2 — Biển báo" value="16 câu (cần đúng ≥14)" />
          <InfoItem label="Điểm đậu" value="40/50 (80%) — phải đạt đủ cả 2 phần" />
          <InfoItem label="Giới hạn thời gian" value="Không có — thoải mái" />
          <InfoItem label="Thi lại nếu rớt" value="Ngày làm việc hôm sau" />
          <InfoItem label="Lệ phí" value="$9 mỗi lần thi" />
        </InfoCard>

        <InfoCard title="🏢 Chuẩn Bị Khi Đến BMV" titleColor="text-accent">
          <InfoItem label="Hộ chiếu" value="(passport) hoặc birth certificate" />
          <InfoItem label="Thẻ xanh" value="Green Card / Permanent Resident Card" />
          <InfoItem label="2 bằng chứng địa chỉ" value="tại Indiana (hóa đơn điện, ngân hàng...)" />
          <InfoItem label="SSN card" value="hoặc bằng chứng SSN" />
          <InfoItem label="Đến trước" value="ít nhất 30 phút trước giờ đóng cửa" />
          <InfoItem label="Đặt lịch" value="Không cần đặt lịch cho knowledge test" />
          <InfoItem label="BMV gần Indianapolis" value="in.gov/bmv → Find a Branch" />
        </InfoCard>

        <InfoCard title="⚠️ Chủ Đề Khó — Hay Rớt Nhất" titleColor="text-secondary">
          <InfoItem label="Vạch kẻ đường (Pavement markings)" value="33% người thi sai" />
          <InfoItem label="Đèn tín hiệu nhấp nháy" value="Đỏ = stop hẳn, Vàng = chậm lại" />
          <InfoItem label="Tốc độ khu công trường" value="Phạt tiền x2 khi có công nhân" />
          <InfoItem label="Khoảng cách an toàn khu CT" value="≥4 giây" />
          <InfoItem label="Luật nhường đường" value="29.5% người thi sai" />
          <InfoItem label="Tốc độ cao tốc nông thôn" value="70 mph max" />
          <InfoItem label="Tốc độ cao tốc thành phố" value="55 mph mặc định" />
        </InfoCard>

        <InfoCard title="🚗 Sau Khi Có Learner's Permit" titleColor="text-primary">
          <InfoItem label="Lái cùng" value="người có bằng lái ≥25 tuổi hoặc vợ/chồng ≥21 tuổi" />
          <InfoItem label="Tổng giờ lái" value="50 giờ (10 giờ ban đêm)" />
          <InfoItem label="Permit có giá trị" value="2 năm" />
          <InfoItem label="Sau 180 ngày" value="thi Road Test (lái xe thực hành)" />
          <InfoItem label="Road test bao gồm" value="parallel parking, turning, lane changes, stopping" />
          <InfoItem label="Phí Road Test" value="~$18" />
          <InfoItem label="Bằng lái đầy đủ" value="sau khi qua Road Test" />
        </InfoCard>
      </div>

      {/* Study schedule */}
      <div className="flex gap-3 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm leading-relaxed text-text">
        <span className="flex-shrink-0 text-lg">💡</span>
        <div>
          <strong>Lịch học khuyến nghị:</strong> Tuần 1–2: Học từ vựng + luật
          giao thông cơ bản. Tuần 3: Học biển báo. Tuần 4: Làm bài thi thử 3
          lần/ngày.{" "}
          <strong>Mục tiêu đạt 45/50 khi thi thử trước khi đến BMV.</strong>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  titleColor,
  children,
}: {
  title: string;
  titleColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <div className={`mb-3 flex items-center gap-2 text-sm font-bold ${titleColor}`}>
        {title}
      </div>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex gap-2 border-b border-border py-1.5 text-xs text-text-muted last:border-b-0">
      <span className="text-primary flex-shrink-0">›</span>
      <span>
        <strong className="text-text">{label}:</strong>{" "}
        <em className="not-italic text-secondary font-medium">{value}</em>
      </span>
    </li>
  );
}
