// Document checklist data — 4 stages aligned with guides.html stage-pane IDs (s2-s5: PERM, I-140, NVC, Interview)
const DOC_STAGES = [
  {
    id:'perm', cls:'w1', icon:'📝', title:'PERM / Labor Certification',
    sub:'Giai đoạn mở hồ sơ — chuẩn bị giấy tờ cá nhân cơ bản',
    items:[
      {id:'perm_passport', name:'Hộ chiếu (Passport)', validity:'Còn hạn — kiểm tra trước khi ký hợp đồng agency', format:null, prep:['Nếu sắp hết hạn hoặc chưa có, làm mới ngay tại Cục Quản lý XNC']},
      {id:'perm_cccd', name:'CCCD / CMND', validity:'Còn hiệu lực', format:null, prep:[]},
      {id:'perm_birth', name:'Giấy khai sinh (đương đơn + vợ/chồng + con)', validity:'Không yêu cầu thời hạn', format:null, prep:['Giữ bản gốc — sẽ cần dịch công chứng ở bước NVC']},
      {id:'perm_marriage', name:'Giấy đăng ký kết hôn (nếu có)', validity:'Không yêu cầu thời hạn', format:null, prep:['Giữ bản gốc cho bước NVC sau này']},
      {id:'perm_diploma', name:'Bằng cấp / chứng chỉ nghề liên quan công việc', validity:null, format:null, prep:['Photo công chứng nếu agency yêu cầu nộp']},
      {id:'perm_drugtest', name:'Kết quả xét nghiệm chất gây nghiện', validity:'Theo yêu cầu của agency/sponsor', format:null, prep:['Thực hiện tại cơ sở y tế được agency chỉ định']},
      {id:'perm_photo', name:'Ảnh 5x5cm nền trắng', validity:'Chụp mới trong vòng 6 tháng', format:'In màu, nền trắng, không đeo kính', prep:[]},
    ]
  },
  {
    id:'i140', cls:'m1', icon:'✅', title:'I-140 Petition',
    sub:'Sponsor/luật sư xử lý chính — đương đơn chuẩn bị trước cho bước NVC',
    items:[
      {id:'i140_passport', name:'Hộ chiếu (Passport)', validity:'Kiểm tra còn hạn ≥2 năm — sẽ cần dùng tiếp ở bước NVC', format:null, prep:['Làm mới ngay nếu sắp hết hạn để tránh trễ ở bước phỏng vấn']},
      {id:'i140_receipt', name:'I-797C Receipt Notice (lưu giữ)', validity:null, format:null, prep:['Lưu số Receipt Number, dùng tra cứu tại egov.uscis.gov']},
      {id:'i140_workexp', name:'Thư xác nhận kinh nghiệm làm việc (nếu có)', validity:null, format:null, prep:['Chuẩn bị bản dịch tiếng Anh nếu cần']},
      {id:'i140_photo', name:'Ảnh thẻ chuẩn visa Mỹ', validity:'Chụp mới trong vòng 6 tháng tính đến ngày phỏng vấn', format:'2x2 inch / 5x5cm, nền trắng', prep:[]},
      {id:'i140_finance', name:'Tích lũy tài chính cho chi phí NVC + sang Mỹ', validity:null, format:null, prep:['Phí DS-261 ($325/người) + chi phí khám IOM, vaccine sắp tới']},
    ]
  },
  {
    id:'nvc', cls:'m3', icon:'📋', title:'NVC / DS-260',
    sub:'Yêu cầu nghiêm ngặt về định dạng & dịch thuật — chuẩn bị kỹ trước khi nộp',
    items:[
      {id:'nvc_passport', name:'Hộ chiếu (trang thông tin)', validity:'Còn hạn ít nhất 6 tháng sau ngày phỏng vấn dự kiến', format:'Scan màu, PDF, tối đa 5MB/file', prep:['Làm mới sớm nếu sắp hết hạn — tránh trễ Document Qualified (DQ)']},
      {id:'nvc_birth', name:'Giấy khai sinh (đương đơn + vợ/chồng + từng con)', validity:'Không yêu cầu thời hạn', format:'Scan màu cả 2 mặt, PDF, tối đa 5MB/file', prep:['Dịch công chứng sang tiếng Anh (certified translation)','Hợp pháp hóa lãnh sự nếu bản dịch không do Sở Tư Pháp cấp']},
      {id:'nvc_marriage', name:'Giấy đăng ký kết hôn (nếu có)', validity:'Không yêu cầu thời hạn', format:'Scan màu, PDF, tối đa 5MB/file', prep:['Dịch công chứng sang tiếng Anh']},
      {id:'nvc_police', name:'Lý lịch tư pháp số 2', validity:'Không quá 1 năm tính đến ngày phỏng vấn — nên làm gần ngày DQ', format:'Scan màu, PDF, tối đa 5MB/file', prep:['Xin tại Sở Tư Pháp, phí ~200k, có thể làm online','Dịch công chứng sang tiếng Anh']},
      {id:'nvc_household', name:'Hộ khẩu / Giấy xác nhận thông tin cư trú', validity:'Còn hiệu lực', format:'Scan màu, PDF, tối đa 5MB/file', prep:['Dịch công chứng nếu yêu cầu']},
      {id:'nvc_ds261', name:'Biên lai đóng phí NVC (DS-261)', validity:null, format:'PDF', prep:['Phí $325/người — đóng online tại CEAC']},
      {id:'nvc_ds260', name:'Trang xác nhận DS-260 (Confirmation Page)', validity:null, format:'In/lưu PDF sau khi điền xong tại ceac.state.gov', prep:['Hỏi agency trước khi điền — sai sót khó sửa sau khi nộp']},
      {id:'nvc_travel', name:'Lịch sử nhập cảnh các quốc gia (nếu ở nước ngoài >6 tháng)', validity:null, format:'Scan màu, PDF', prep:['Chuẩn bị nếu có sống/làm việc ở nước ngoài trên 6 tháng']},
    ]
  },
  {
    id:'interview', cls:'mlong', icon:'🎤', title:'Phỏng Vấn Lãnh Sự Quán',
    sub:'Mang theo bản gốc — chuẩn bị từ khi nhận thư hẹn phỏng vấn',
    items:[
      {id:'int_letter', name:'Thư hẹn phỏng vấn (Interview Appointment Letter)', validity:null, format:'In từ CEAC', prep:['In và mang theo bản gốc']},
      {id:'int_passport', name:'Hộ chiếu gốc (+ các hộ chiếu cũ nếu có)', validity:'Còn hạn ít nhất 6 tháng', format:null, prep:[]},
      {id:'int_medical', name:'Kết quả khám sức khỏe IOM', validity:'Theo lịch hẹn IOM — đặt sớm vì chờ lâu', format:'Đựng trong bì kín do IOM cung cấp', prep:['Không tự mở bì niêm phong','Đặt lịch ngay khi nhận thư hẹn phỏng vấn']},
      {id:'int_vaccine', name:'Sổ / chứng nhận tiêm vaccine bắt buộc', validity:null, format:null, prep:['MMR, Tdap, Varicella, Hepatitis A&B, COVID-19, cúm mùa theo yêu cầu IOM']},
      {id:'int_police', name:'Lý lịch tư pháp số 2 (bản mới)', validity:'Không quá 6 tháng tính đến ngày phỏng vấn', format:null, prep:['Làm lại nếu bản nộp NVC đã gần hết hạn']},
      {id:'int_civil_originals', name:'Bản gốc giấy khai sinh / kết hôn / hộ khẩu', validity:null, format:null, prep:['Mang theo bản gốc dù đã nộp scan cho NVC']},
      {id:'int_photo', name:'Ảnh thẻ visa bổ sung', validity:'Chụp mới trong vòng 6 tháng', format:'2x2 inch / 5x5cm, nền trắng', prep:['Chuẩn bị thêm vài tấm dự phòng']},
      {id:'int_i797', name:'I-797 Approval Notice (I-140 Approved)', validity:null, format:null, prep:['Mang bản photo — nên có dù không bắt buộc']},
    ]
  },
];
