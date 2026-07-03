// Tab 2: "Đọc Hợp Đồng" — ported from housing-rights.html #tab-lease.

import { Alert, Badge, Card, LeaseTerm, SectionHeading, SubLabel } from "./housing-ui";

export function HousingTabLease() {
  return (
    <div>
      <SectionHeading>📄 Đọc &amp; Hiểu Hợp Đồng Thuê Nhà</SectionHeading>

      <Alert tone="yellow" icon="⚠️">
        <strong>Đọc kỹ trước khi ký.</strong> Hợp đồng thuê nhà là văn bản
        pháp lý — khi đã ký, bạn bị ràng buộc bởi tất cả các điều khoản, kể
        cả điều khoản bất lợi. Nếu không hiểu, nhờ người dịch hoặc hỏi Legal
        Aid.
      </Alert>

      <SubLabel>Các Điều Khoản Quan Trọng Cần Kiểm Tra</SubLabel>

      <LeaseTerm
        term="Security Deposit (Tiền Đặt Cọc)"
        def="Số tiền chủ nhà giữ để bảo vệ trước hư hỏng. Thường 1-2 tháng tiền thuê."
        tip="✅ Kiểm tra: Điều kiện trả lại, thời hạn trả lại (theo bang), và chủ nhà phải trả lãi suất không (một số bang yêu cầu)."
      />
      <LeaseTerm
        term="Rent Amount & Due Date (Số Tiền & Ngày Đáo Hạn)"
        def="Tiền thuê mỗi tháng và ngày phải trả (thường ngày 1). Late fee nếu trả sau ngày X."
        tip="✅ Kiểm tra: Grace period (thường 5 ngày), mức phí trễ hạn ($25-100 hoặc % tiền thuê)."
      />
      <LeaseTerm
        term="Lease Term (Thời Hạn Hợp Đồng)"
        def="Thường 12 tháng. Sau hết hạn chuyển sang month-to-month (30 ngày báo trước)."
        tip="✅ Kiểm tra: Early termination clause — phí phá vỡ hợp đồng trước hạn thường bằng 1-2 tháng tiền thuê."
      />
      <LeaseTerm
        term="Utilities (Điện, Nước, Gas)"
        def="Xác định rõ ai trả điện, nước, gas, rác, internet."
        tip='✅ Kiểm tra: "Utilities included" hay không? Nếu không có trong hợp đồng, bạn phải tự trả toàn bộ.'
      />
      <LeaseTerm
        term="Landlord Entry (Chủ Nhà Vào Nhà)"
        def="Chủ nhà phải báo trước bao nhiêu giờ trước khi vào nhà bạn (trừ khẩn cấp)."
        tip="✅ Thông thường: 24-48 giờ báo trước. Nếu không ghi, áp dụng luật của bang."
      />
      <LeaseTerm
        term="Pet Policy (Thú Cưng)"
        def="Có được phép nuôi thú cưng không, và pet deposit / pet fee là bao nhiêu."
        tip="⚠️ Pet deposit thường không được hoàn lại (non-refundable) — đọc kỹ."
      />
      <LeaseTerm
        term="Maintenance & Repairs (Sửa Chữa)"
        def="Ai chịu trách nhiệm sửa các thiết bị hỏng (máy lạnh, lò sưởi, máy giặt)?"
        tip="✅ Theo luật, chủ nhà phải duy trì nhà ở habitable (an toàn, có điện nước, nhiệt độ). Thiệt hại do bạn gây ra thì bạn phải trả."
      />
      <LeaseTerm
        term="Guests & Subletting (Khách & Cho Thuê Lại)"
        def="Hạn chế về số người ở, thời gian khách lưu trú, và có được cho thuê lại (sublease) không."
        tip="⚠️ Cho thuê lại mà không có sự đồng ý của chủ nhà có thể dẫn đến bị đuổi."
      />

      <SubLabel>
        Các Điều Khoản Bất Hợp Pháp — Không Có Hiệu Lực Kể Cả Khi Đã Ký
      </SubLabel>
      <Card borderColor="border-red-700/40">
        <Badge tone="red">VOID — VÔ HIỆU LỰC</Badge>
        <p className="mt-2 text-sm leading-loose text-text-muted">
          ❌ &quot;Landlord không chịu trách nhiệm về bất kỳ thương tích nào
          tại căn hộ&quot; — landlord vẫn chịu trách nhiệm về điều kiện nguy
          hiểm
          <br />
          ❌ &quot;Tenant từ bỏ quyền được thông báo trước khi eviction&quot;
          — bất hợp pháp ở tất cả các bang
          <br />
          ❌ &quot;Tenant phải trả mọi chi phí sửa chữa&quot; — landlord bắt
          buộc phải duy trì habitability
          <br />
          ❌ &quot;Landlord có thể vào nhà bất cứ lúc nào&quot; — vi phạm
          quyền privacy của tenant
        </p>
      </Card>

      <SubLabel>Trước Khi Dọn Vào — Move-In Checklist</SubLabel>
      <Card>
        <p className="text-sm leading-loose text-text-muted">
          Chụp ảnh/video toàn bộ căn nhà trước khi dọn đồ vào:
          <br />
          ☐ Tường (vết trầy, nứt, vết bẩn)
          <br />
          ☐ Sàn nhà (vết xước, ố vàng)
          <br />
          ☐ Nhà bếp (lò nướng, tủ lạnh, bồn rửa)
          <br />
          ☐ Phòng tắm (toilet, vòi sen, gương)
          <br />
          ☐ Cửa và khóa (hoạt động bình thường chưa)
          <br />
          ☐ Máy lạnh/sưởi (chạy được không)
          <br />
          ☐ Đèn và ổ cắm điện
          <br />
          <br />
          <strong className="text-primary">
            Gửi ảnh cho chủ nhà qua email/SMS và lưu lại.
          </strong>{" "}
          Đây là bằng chứng bảo vệ bạn khi dọn ra khỏi nhà.
        </p>
      </Card>
    </div>
  );
}
