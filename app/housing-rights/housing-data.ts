// Static reference data for housing-rights tabs — ported from
// housing-rights.html's .ref-table rows (#tab-rights).

export interface DepositRow {
  state: string;
  returnDeadline: string;
  maxDeposit: string;
  interestRequired: string;
}

export const DEPOSIT_RULES: DepositRow[] = [
  { state: "Texas", returnDeadline: "30 ngày", maxDeposit: "Không giới hạn", interestRequired: "Không bắt buộc" },
  { state: "North Carolina", returnDeadline: "30 ngày (cọc <2 tháng) / 60 ngày", maxDeposit: "2 tháng tiền thuê", interestRequired: "Không bắt buộc" },
  { state: "Georgia", returnDeadline: "30 ngày", maxDeposit: "Không giới hạn", interestRequired: "Không bắt buộc" },
  { state: "Pennsylvania", returnDeadline: "30 ngày", maxDeposit: "2 tháng (năm 1) / 1 tháng (sau đó)", interestRequired: "Có (nếu cọc >100$)" },
  { state: "Florida", returnDeadline: "15 ngày (không trừ) / 30 ngày (có trừ)", maxDeposit: "Không giới hạn", interestRequired: "Không bắt buộc" },
  { state: "Wisconsin", returnDeadline: "21 ngày", maxDeposit: "Không giới hạn", interestRequired: "Không bắt buộc" },
  { state: "Indiana", returnDeadline: "45 ngày", maxDeposit: "Không giới hạn", interestRequired: "Không bắt buộc" },
  { state: "Ohio", returnDeadline: "30 ngày", maxDeposit: "Không giới hạn", interestRequired: "Có (nếu cọc >50$)" },
  { state: "Alabama", returnDeadline: "35 ngày", maxDeposit: "1 tháng tiền thuê", interestRequired: "Không bắt buộc" },
  { state: "South Carolina", returnDeadline: "30 ngày", maxDeposit: "Không giới hạn", interestRequired: "Không bắt buộc" },
  { state: "Minnesota", returnDeadline: "21 ngày", maxDeposit: "Không giới hạn", interestRequired: "Có" },
];

export interface EntryNoticeRow {
  state: string;
  noticeRequired: string;
  emergencyException: string;
}

export const ENTRY_NOTICE_RULES: EntryNoticeRow[] = [
  { state: "Texas", noticeRequired: "Không có luật cụ thể (\"reasonable notice\")", emergencyException: "Có — vào ngay khi cần" },
  { state: "Florida", noticeRequired: "12 giờ", emergencyException: "Có" },
  { state: "North Carolina", noticeRequired: "\"Reasonable notice\" — thực tế 24h", emergencyException: "Có" },
  { state: "Pennsylvania", noticeRequired: "Không có luật cụ thể", emergencyException: "Có" },
  { state: "Wisconsin", noticeRequired: "12 giờ", emergencyException: "Có" },
  { state: "Indiana", noticeRequired: "Không có luật cụ thể", emergencyException: "Có" },
  { state: "Georgia", noticeRequired: "Không có luật cụ thể", emergencyException: "Có" },
  { state: "Ohio", noticeRequired: "24 giờ", emergencyException: "Có" },
  { state: "Minnesota", noticeRequired: "24 giờ", emergencyException: "Có" },
];

export interface SupportContactRow {
  organization: string;
  contact: string;
  contactColor: string;
  help: string;
}

export const SUPPORT_CONTACTS: SupportContactRow[] = [
  { organization: "Legal Aid (theo bang)", contact: "lawhelp.org", contactColor: "text-accent", help: "Tư vấn pháp lý miễn phí cho tenant" },
  { organization: "HUD Fair Housing", contact: "1-800-669-9777", contactColor: "text-accent", help: "Báo cáo phân biệt đối xử trong thuê nhà" },
  { organization: "HUD Housing Complaints", contact: "hud.gov/complaints", contactColor: "text-primary", help: "Nộp khiếu nại vi phạm Fair Housing" },
  { organization: "211 Helpline", contact: "Gọi 211", contactColor: "text-accent", help: "Kết nối với housing resources địa phương" },
  { organization: "Small Claims Court", contact: "Tòa án quận (county courthouse)", contactColor: "text-primary", help: "Kiện đòi lại security deposit" },
];
