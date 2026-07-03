// "Common scam types" section ported from scam-warning.html — the 4
// .section-hd blocks covering agency/lawyer fees, remittance scams, fake
// jobs, and notario fraud.

import { Card, DoBox, DontBox, SectionHeading } from "./scam-warning-ui";

export function ScamWarningTypes() {
  return (
    <>
      <SectionHeading>💰 Lừa Đảo Phí Agency / &quot;Luật Sư&quot;</SectionHeading>
      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Dấu hiệu thường gặp
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Một số bên tự nhận là &quot;agency&quot; hoặc &quot;luật sư di
          trú&quot; yêu cầu thu phí cho các mẫu đơn USCIS{" "}
          <strong>miễn phí</strong> (ví dụ I-485, I-765), hoặc đòi &quot;phí
          giữ chỗ&quot; để được ưu tiên xử lý hồ sơ nhanh hơn — điều mà
          USCIS không cho phép bất kỳ ai mua được.
        </p>
      </Card>
      <DontBox>
        ❌ Đóng tiền để &quot;đảm bảo&quot; được nhận hồ sơ, &quot;đảm
        bảo&quot; đậu phỏng vấn, hoặc &quot;tăng tốc&quot; lịch visa
        bulletin — không ai có thể đảm bảo những điều này.
        <br />
        ❌ Ký giấy ủy quyền (Power of Attorney) cho người bạn chưa xác minh
        được tư cách pháp lý.
      </DontBox>
      <DoBox>
        ✅ Mọi mẫu đơn chính thức từ USCIS đều có sẵn miễn phí tại{" "}
        <strong>uscis.gov</strong>.
        <br />
        ✅ Yêu cầu hợp đồng dịch vụ rõ ràng, ghi cụ thể công việc và phí —
        trước khi đưa tiền.
      </DoBox>

      <SectionHeading>💸 Lừa Đảo Chuyển Tiền Về Việt Nam</SectionHeading>
      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Dấu hiệu thường gặp
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Dịch vụ &quot;chuyển tiền hộ&quot; qua mạng xã hội với tỷ giá cao
          hơn hẳn thị trường, hoặc yêu cầu chuyển khoản trước cho một người
          lạ rồi &quot;họ sẽ gửi lại tiền VN sau&quot; — sau đó mất liên
          lạc.
        </p>
      </Card>
      <DontBox>
        ❌ Chuyển tiền trước cho người/dịch vụ không rõ danh tính, không có
        đánh giá (review) thật.
        <br />
        ❌ Tỷ giá &quot;quá tốt để là sự thật&quot; so với Wise, Remitly,
        Western Union (xem{" "}
        <a href="/remittance-guide" className="text-primary hover:underline">
          Gửi Tiền Về VN
        </a>
        ).
      </DontBox>
      <DoBox>
        ✅ Chỉ dùng dịch vụ chuyển tiền có tên công ty, giấy phép, và lịch
        sử hoạt động kiểm tra được.
        <br />
        ✅ So sánh tỷ giá với ít nhất 2 dịch vụ uy tín trước khi chuyển số
        tiền lớn.
      </DoBox>

      <SectionHeading>🏭 Lừa Đảo Việc Làm Giả</SectionHeading>
      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Dấu hiệu thường gặp
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          &quot;Việc làm&quot; yêu cầu đóng phí trước để &quot;giữ
          chỗ&quot;, &quot;mua đồng phục&quot;, hoặc &quot;đào tạo&quot; —
          sau đó công việc không tồn tại hoặc điều kiện hoàn toàn khác với
          mô tả ban đầu.
        </p>
      </Card>
      <DontBox>
        ❌ Đóng bất kỳ khoản phí nào để &quot;được nhận việc&quot; trước
        khi ký hợp đồng lao động chính thức.
        <br />
        ❌ Gửi tiền qua ứng dụng chuyển tiền cá nhân (Zelle, Cash App,
        Venmo) cho &quot;nhà tuyển dụng&quot;.
      </DontBox>
      <DoBox>
        ✅ Hãng bảo trợ EB-3 hợp pháp{" "}
        <strong>không thu phí tuyển dụng từ người lao động</strong> theo
        luật lao động Mỹ.
        <br />
        ✅ Kiểm tra tên hãng trong danh sách{" "}
        <a href="/jobs" className="text-primary hover:underline">
          Ngành Nghề &amp; Hãng
        </a>{" "}
        và tra cứu trên BBB (Better Business Bureau).
      </DoBox>

      <SectionHeading>
        📋 Notario Fraud — Giả Danh Tư Vấn Di Trú
      </SectionHeading>
      <Card>
        <h3 className="mb-1.5 text-sm font-bold text-text">
          Dấu hiệu thường gặp
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          &quot;Notario público&quot; hoặc &quot;tư vấn di trú&quot; không
          có giấy phép luật sư nhưng nhận làm hồ sơ, điền đơn, hoặc đưa ra
          lời khuyên pháp lý. Ở Mỹ, chỉ luật sư (attorney) hoặc đại diện
          được công nhận (accredited representative) mới được phép tư vấn
          pháp lý di trú.
        </p>
      </Card>
      <DontBox>
        ❌ Tin lời khuyên pháp lý từ người không phải luật sư, dù họ nói
        tiếng Việt và &quot;có kinh nghiệm&quot;.
        <br />
        ❌ Để người khác tự điền và nộp hồ sơ thay mà không cho bạn xem
        trước.
      </DontBox>
      <DoBox>
        ✅ Luôn đọc và hiểu nội dung trước khi ký bất kỳ giấy tờ nào.
        <br />
        ✅ Nếu cần tư vấn pháp lý, chỉ làm việc với luật sư có giấy phép
        (xem mục kiểm tra dưới đây).
      </DoBox>
    </>
  );
}
