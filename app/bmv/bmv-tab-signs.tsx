// Tab 4: Biển Báo — Signs reference. Ported from bmv.html #signs.

export function BmvTabSigns() {
  return (
    <div>
      <div className="mb-3 text-base font-bold text-text border-b border-border pb-2">
        🚦 Biển Báo Giao Thông — 16 Câu Thi
      </div>

      <div className="mb-4 flex gap-3 rounded-card border border-primary/20 bg-primary/5 p-3 text-sm text-text">
        <span className="text-lg flex-shrink-0">💡</span>
        <div>
          Biển báo Mỹ được phân biệt theo <strong>màu sắc và hình dạng</strong>{" "}
          — học màu trước, học hình sau, rồi học nội dung. Chỉ cần sai 3 câu là
          rớt phần này.
        </div>
      </div>

      {/* Colors */}
      <SignSection title="Màu Sắc Biển Báo">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-3 py-2 text-left font-semibold text-primary">Màu</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Ý nghĩa</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            {[
              { color: "text-red-500", label: "🔴 Đỏ (Red)", meaning: "Dừng, cấm, nguy hiểm", example: "Stop sign, Do Not Enter, Wrong Way, Yield" },
              { color: "text-yellow-500", label: "🟡 Vàng (Yellow)", meaning: "Cảnh báo (Warning)", example: "Curve ahead, Slippery road, School zone, Railroad crossing" },
              { color: "text-orange-500", label: "🟠 Cam (Orange)", meaning: "Công trường / Thi công", example: "Construction zone, Detour, Road work ahead" },
              { color: "text-green-600", label: "🟢 Xanh lá (Green)", meaning: "Hướng dẫn, cho phép", example: "Exit signs, Distance markers, Direction signs" },
              { color: "text-blue-500", label: "🔵 Xanh dương (Blue)", meaning: "Dịch vụ (Services)", example: "Rest area, Hospital, Gas station, Hotel" },
              { color: "text-text", label: "⬜ Trắng (White)", meaning: "Quy định bắt buộc (Regulatory)", example: "Speed limit, One Way, Do Not Pass, Turn restrictions" },
              { color: "text-purple-500", label: "🟣 Nâu (Brown)", meaning: "Địa điểm giải trí/văn hóa", example: "National park, Historical site, Recreation area" },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                <td className={`px-3 py-2 font-bold ${row.color}`}>{row.label}</td>
                <td className="px-3 py-2 text-text leading-relaxed">{row.meaning}</td>
                <td className="px-3 py-2 text-text-muted leading-relaxed">{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SignSection>

      {/* Shapes */}
      <SignSection title="Hình Dạng Biển Báo">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-3 py-2 text-left font-semibold text-primary">Hình dạng</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Ý nghĩa</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Biển báo</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Octagon (8 cạnh)", "STOP — dừng hoàn toàn", "Chỉ có Stop sign mới hình 8 cạnh ⚡"],
              ["Triangle (tam giác, đỉnh xuống)", "YIELD — nhường đường", "Chỉ có Yield sign mới hình tam giác đảo ngược ⚡"],
              ["Diamond (hình thoi)", "Warning — cảnh báo", "Curve, slippery road, animal crossing..."],
              ["Circle (hình tròn)", "Railroad crossing hoặc NO signs", "Railroad advance warning (yellow circle with X)"],
              ["Pentagon (5 cạnh, đỉnh lên)", "School zone", "Chỉ school zone mới hình ngũ giác ⚡"],
              ["Rectangle (ngang)", "Regulatory — quy định", "Speed limit, No U-Turn..."],
              ["Rectangle (dọc)", "Guide/Information", "Street names, directions"],
            ].map(([shape, meaning, example], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                <td className="px-3 py-2 font-medium text-text leading-relaxed">{shape}</td>
                <td className="px-3 py-2 text-text-muted leading-relaxed">{meaning}</td>
                <td className="px-3 py-2 text-text-muted leading-relaxed">{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SignSection>

      {/* Key signs */}
      <SignSection title="Biển Báo Quan Trọng Nhất — Hay Thi">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-3 py-2 text-left font-semibold text-primary">Tên biển (Anh)</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Tên biển (Việt)</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Hành động khi gặp</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["STOP", "Dừng lại", "Dừng HOÀN TOÀN. Dừng đủ 3 giây. Nhìn 2 phía. Mới đi. ⚡"],
              ["YIELD", "Nhường đường", "Giảm tốc. Nhường xe và người đi bộ. Dừng nếu cần. ⚡"],
              ["DO NOT ENTER", "Cấm vào", "Dừng lại. Không được vào đường này (ngược chiều). ⚡"],
              ["WRONG WAY", "Đi sai chiều", "Dừng ngay. Bạn đang đi ngược chiều. Quay đầu."],
              ["RAILROAD CROSSING", "Giao cắt đường sắt", "Giảm tốc. Nhìn 2 phía. Nếu đèn đỏ + chuông: DỪNG HẲN."],
              ["SCHOOL CROSSING", "Lối đi bộ gần trường", "20 mph khi có học sinh. Nhường học sinh luôn luôn."],
              ["MERGE", "Sắp nhập làn", "Chuẩn bị nhường đường cho xe ở làn chính."],
              ["SLIPPERY WHEN WET", "Trơn khi ướt", "Giảm tốc. Không phanh gấp. Không đánh lái đột ngột."],
              ["NO PASSING ZONE", "Khu vực cấm vượt", "Không được vượt xe khác tại khu vực này."],
              ["ONE WAY →", "Đường một chiều", "Chỉ đi theo chiều mũi tên. Không đi ngược lại."],
            ].map(([en, vi, action], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                <td className="px-3 py-2 font-bold text-text">{en}</td>
                <td className="px-3 py-2 text-text-muted italic">{vi}</td>
                <td className="px-3 py-2 text-text-muted leading-relaxed">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SignSection>

      {/* Visual library link */}
      <div className="mt-4 rounded-card border border-border bg-bg p-4">
        <div className="text-sm font-bold text-text mb-1">🖼️ Thư Viện Biển Báo Hình Ảnh</div>
        <div className="text-xs text-text-muted mb-3">
          26 biển báo quan trọng có hình ảnh trực quan, flashcard, bảng tra và thi thử.
        </div>
        <a
          href="/Indiana_BMV_Signs_Visual"
          className="inline-block rounded-btn bg-primary px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
        >
          → Xem Biển Báo Hình Ảnh
        </a>
      </div>
    </div>
  );
}

function SignSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 text-sm font-semibold text-primary border-b border-border pb-1">
        {title}
      </div>
      <div className="overflow-x-auto rounded-card border border-border">
        {children}
      </div>
    </div>
  );
}
