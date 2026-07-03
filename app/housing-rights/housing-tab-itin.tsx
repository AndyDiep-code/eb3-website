// Tab 1: "Thuê Nhà Với ITIN" — ported from housing-rights.html #tab-itin.

import { Alert, Card, DoBox, DontBox, RedFlag, SectionHeading, SubLabel } from "./housing-ui";

export function HousingTabItin() {
  return (
    <div>
      <SectionHeading>📋 Thuê Nhà Khi Mới Đến Mỹ</SectionHeading>

      <SubLabel>Chủ Nhà Được Phép &amp; Không Được Phép Làm Gì</SubLabel>
      <div className="mb-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <DoBox>
          <strong>✅ Được phép:</strong>
          <br />
          Yêu cầu kiểm tra tín dụng (credit check)
          <br />
          Yêu cầu xác minh thu nhập
          <br />
          Yêu cầu đặt cọc cao hơn (nếu không có lịch sử tín dụng)
          <br />
          Yêu cầu người bảo lãnh (co-signer)
        </DoBox>
        <DontBox>
          <strong>❌ KHÔNG được phép:</strong>
          <br />
          Từ chối thuê vì quốc tịch hoặc sắc tộc
          <br />
          Tính giá thuê cao hơn vì bạn là người Việt
          <br />
          Hỏi tình trạng visa hoặc di trú
          <br />
          Yêu cầu SSN thay vì chấp nhận ITIN
        </DontBox>
      </div>

      <Alert tone="blue" icon="⚖️">
        <strong>Fair Housing Act:</strong> Nghiêm cấm phân biệt đối xử trong
        cho thuê nhà dựa trên nguồn gốc quốc gia (national origin). Nếu chủ
        nhà từ chối vì bạn là người Việt Nam hoặc là dân nhập cư, đó là vi
        phạm luật liên bang.
      </Alert>

      <SubLabel>Giấy Tờ Thường Cần Khi Nộp Đơn Thuê</SubLabel>
      <Card>
        <p className="space-y-0 text-sm leading-loose text-text-muted">
          <strong className="text-accent">✅ Thường đủ để thuê nhà:</strong>
          <br />
          • ITIN (Form W-7 từ IRS) — thay thế cho SSN
          <br />
          • 2-3 tháng pay stub gần nhất (chứng minh thu nhập 2.5-3x tiền
          thuê)
          <br />
          • Tên và số điện thoại của supervisor tại nơi làm việc
          <br />
          • Bản sao hợp đồng lao động hoặc offer letter
          <br />
          • Số điện thoại của người bảo lãnh (nếu cần)
          <br />
          <br />
          <strong className="text-secondary">
            ⚠️ Có thể được yêu cầu thêm:
          </strong>
          <br />
          • Đặt cọc thêm 1 tháng (total 2 tháng tiền thuê)
          <br />
          • Co-signer — người bảo lãnh có credit tốt tại Mỹ
          <br />
          • Bank statement 2-3 tháng gần nhất
        </p>
      </Card>

      <SubLabel>Chiến Lược Thuê Nhà Khi Không Có Lịch Sử Tín Dụng</SubLabel>
      <Card>
        <p className="space-y-0 text-sm leading-relaxed text-text-muted">
          <strong className="text-primary">1. Chứng minh thu nhập mạnh:</strong>{" "}
          Nhiều chủ nhà chấp nhận nếu thu nhập &gt; 3x tiền thuê
          <br />
          <strong className="text-primary">
            2. Đề xuất trả trước 2-3 tháng:
          </strong>{" "}
          Giúp chủ nhà cảm thấy an tâm hơn
          <br />
          <strong className="text-primary">
            3. Tìm chủ nhà cá nhân (private landlord):
          </strong>{" "}
          Linh hoạt hơn công ty quản lý nhà
          <br />
          <strong className="text-primary">
            4. Facebook Marketplace / Craigslist:
          </strong>{" "}
          Nhiều chủ nhà cá nhân đăng tại đây
          <br />
          <strong className="text-primary">5. Đồng nghiệp EB-3:</strong> Hỏi
          đồng nghiệp đã thuê nhà — landlord quen thuộc với công nhân nhập
          cư
          <br />
          <strong className="text-primary">
            6. Nhà ở gần nhà máy:
          </strong>{" "}
          Chủ nhà gần khu công nghiệp thường quen với công nhân không có
          credit Mỹ
        </p>
      </Card>

      <SubLabel>Red Flags — Dấu Hiệu Lừa Đảo Nhà Cho Thuê</SubLabel>
      <RedFlag>
        Yêu cầu trả tiền mặt đặt cọc mà không có receipt (biên nhận) — luôn
        yêu cầu receipt bằng văn bản.
      </RedFlag>
      <RedFlag>
        Chủ nhà nói &quot;không cần hợp đồng, miệng với nhau thôi&quot; — hợp
        đồng viết tay là bắt buộc, không phải tuỳ chọn.
      </RedFlag>
      <RedFlag>
        Giá thuê thấp bất thường so với khu vực — có thể là scam, chụp ảnh
        nhà rồi đăng lại để lấy cọc.
      </RedFlag>
      <RedFlag>
        Chủ nhà ở nước ngoài và yêu cầu chuyển tiền trước khi gặp mặt hoặc
        xem nhà — đây là scam phổ biến trên Facebook.
      </RedFlag>
      <RedFlag>
        Nhà có vấn đề rõ ràng (nấm mốc, cửa không đóng được, không có nước
        nóng) nhưng chủ nhà hứa &quot;sẽ sửa sau khi ký hợp đồng&quot;.
      </RedFlag>
      <RedFlag>
        Chủ nhà nói bạn phải quyết định ngay hôm nay — áp lực gấp thường che
        giấu vấn đề với căn nhà hoặc hợp đồng.
      </RedFlag>
    </div>
  );
}
