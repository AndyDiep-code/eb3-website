// Tab 3: Luật GT — Traffic rules reference. Ported from bmv.html #rules.

export function BmvTabRules() {
  return (
    <div>
      <div className="mb-3 text-base font-bold text-text border-b border-border pb-2">
        📜 Luật Giao Thông Indiana — Trọng Tâm Ôn Thi
      </div>

      <div className="mb-4 flex gap-3 rounded-card border border-red-200 bg-red-50 p-3 text-sm text-text">
        <span className="text-lg flex-shrink-0">🔥</span>
        <div>
          <strong>34 câu luật giao thông</strong> — cần đúng ít nhất 28 câu.
          Đây là phần khó nhất và người thi hay rớt nhất. Học kỹ các chủ đề
          dưới đây.
        </div>
      </div>

      {/* 1. Speed Limits */}
      <RuleSection title="1. Giới Hạn Tốc Độ (Speed Limits)">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-3 py-2 text-left font-semibold text-primary">Khu vực</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Tốc độ tối đa</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-bg">
              <td className="px-3 py-2 text-text">Đường cao tốc nông thôn (Rural interstate)</td>
              <td className="px-3 py-2 font-medium text-text">70 mph (~113 km/h)</td>
              <td className="px-3 py-2 text-text-muted">Hay thi nhất</td>
            </tr>
            <tr className="bg-bg-alt">
              <td className="px-3 py-2 text-text">Đường cao tốc thành phố (Urban interstate)</td>
              <td className="px-3 py-2 font-medium text-text">55 mph (~88 km/h)</td>
              <td className="px-3 py-2 text-text-muted">Trừ khi có biển báo khác</td>
            </tr>
            <tr className="bg-bg">
              <td className="px-3 py-2 text-text">Khu dân cư (Residential area)</td>
              <td className="px-3 py-2 font-medium text-text">30 mph (~48 km/h)</td>
              <td className="px-3 py-2 text-text-muted">Trừ khi có biển báo khác</td>
            </tr>
            <tr className="bg-bg-alt">
              <td className="px-3 py-2 text-text">Khu vực trường học (School zone)</td>
              <td className="px-3 py-2 font-medium text-text">20 mph khi có trẻ em</td>
              <td className="px-3 py-2 text-secondary font-medium">⚡ Hay thi — khi có đèn vàng nhấp nháy</td>
            </tr>
            <tr className="bg-bg">
              <td className="px-3 py-2 text-text">Khu công trình có công nhân</td>
              <td className="px-3 py-2 font-medium text-text">Theo biển — nhưng phạt tiền x2</td>
              <td className="px-3 py-2 text-secondary font-medium">⚡ Hay thi — doubled fines when workers present</td>
            </tr>
          </tbody>
        </table>
      </RuleSection>

      {/* 2. Right-of-Way */}
      <RuleSection title="2. Quy Tắc Nhường Đường (Right-of-Way)">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-3 py-2 text-left font-semibold text-primary">Tình huống</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Ai được ưu tiên</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Ngã tư 4 chiều (4-way stop)", "Xe đến trước → đi trước. Nếu cùng lúc → nhường xe bên phải. ⚡"],
              ["Người đi bộ tại vạch sang đường", "Người đi bộ luôn được ưu tiên. Phải dừng. ⚡"],
              ["Xe cứu thương, cảnh sát, cứu hỏa (đèn/còi)", "Phải vào lề phải và dừng lại cho đến khi qua. ⚡"],
              ["Xe bus trường học (School bus) đèn đỏ", "Phải dừng lại — cả 2 chiều đường (trừ đường phân cách). ⚡"],
              ["Rẽ trái tại ngã tư", "Nhường xe ngược chiều và người đi bộ trước khi rẽ."],
              ["Nhập vào đường cao tốc (On-ramp)", "Xe trên cao tốc được ưu tiên — xe nhập phải nhường."],
              ["Gặp xe tang (Funeral procession)", "Không được cắt ngang đoàn xe tang. ⚡"],
            ].map(([situation, rule], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                <td className="px-3 py-2 text-text leading-relaxed">{situation}</td>
                <td className="px-3 py-2 text-text-muted leading-relaxed">{rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RuleSection>

      {/* 3. Pavement markings */}
      <RuleSection title="3. Vạch Kẻ Đường — Dễ Nhầm Nhất (33% người thi sai)">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-3 py-2 text-left font-semibold text-primary">Loại vạch</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Ý nghĩa</th>
              <th className="px-3 py-2 text-left font-semibold text-primary">Được/Không được</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Vạch vàng liền đơn", "Không được vượt từ phía bạn", "❌ Không vượt khi vạch ở bên trái bạn"],
              ["Vạch vàng liền kép (Double solid yellow)", "Cả 2 chiều không được vượt", "❌ Tuyệt đối không vượt ⚡"],
              ["Vạch vàng đứt đoạn (Broken yellow)", "Được vượt khi an toàn", "✅ Vượt được khi đường trống"],
              ["Vạch trắng liền (Solid white)", "Phân làn cùng chiều — không khuyến khích đổi làn", "⚠️ Hạn chế đổi làn ⚡"],
              ["Vạch trắng đứt đoạn (Broken white)", "Phân làn cùng chiều — được đổi làn", "✅ Đổi làn được khi an toàn"],
              ["Vạch vàng bên phải — vạch trắng bên trái", "Trường hợp đặc biệt làn giữa 2 chiều", "Vạch nào ở bên bạn → áp dụng quy tắc của vạch đó"],
            ].map(([type, meaning, rule], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-bg-alt"}>
                <td className="px-3 py-2 text-text leading-relaxed">{type}</td>
                <td className="px-3 py-2 text-text-muted leading-relaxed">{meaning}</td>
                <td className="px-3 py-2 text-text-muted leading-relaxed">{rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RuleSection>

      {/* 4. DUI */}
      <RuleSection title="4. Rượu & Lái Xe (DUI — Hay Thi)">
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-text">
          <span className="text-lg flex-shrink-0">🚨</span>
          <div className="leading-relaxed">
            BAC ≥ 0.08% = DUI với người ≥21 tuổi
            <br />
            BAC ≥ 0.02% = DUI với người &lt;21 tuổi
            <br />
            <strong>Từ chối test cồn = tự động mất bằng (Implied Consent Law)</strong>
            <br />
            Hậu quả: bắt giữ, phạt tiền lớn, mất bằng, có thể đi tù.
          </div>
        </div>
      </RuleSection>

      {/* 5. Move Over Law */}
      <RuleSection title="5. Move Over Law (Luật Nhường Đường Khẩn Cấp) ⚡">
        <div className="flex gap-3 rounded-lg border border-secondary/30 bg-secondary/10 p-3 text-sm text-text">
          <span className="text-lg flex-shrink-0">🚔</span>
          <div className="leading-relaxed">
            Khi thấy xe cảnh sát, cứu thương, cứu hỏa, hoặc xe hỗ trợ đường
            bộ đang dừng bên đường với đèn bật:
            <br />
            → Nếu an toàn:{" "}
            <strong>chuyển sang làn xa hơn</strong>
            <br />
            → Nếu không thể đổi làn:{" "}
            <strong>giảm tốc độ đáng kể và đi qua cẩn thận</strong>
            <br />
            Vi phạm = phạt nặng tại Indiana.
          </div>
        </div>
      </RuleSection>
    </div>
  );
}

function RuleSection({
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
