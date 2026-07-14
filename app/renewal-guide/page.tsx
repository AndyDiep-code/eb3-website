"use client";

import { useState } from "react";
import { Layout } from "../components/page-layout";
import { SIDEBAR_GROUPS } from "../components/sidebar-data";

function computeRenewal(expiryInput: string): {
  daysLeft: number;
  renewByDate: string;
  renewByDaysLeft: number;
  urgent: boolean;
  expired: boolean;
} | null {
  if (!expiryInput) return null;
  const [y, m, d] = expiryInput.split("-").map(Number);
  const expiryMs = Date.UTC(y, m - 1, d);
  const todayMs = Date.now();
  const daysLeft = Math.round((expiryMs - todayMs) / 86_400_000);
  // USCIS recommends filing 6 months before expiry
  const renewByMs = expiryMs - 6 * 30 * 86_400_000;
  const renewByDaysLeft = Math.round((renewByMs - todayMs) / 86_400_000);
  const renewDate = new Date(renewByMs);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const renewByDate = `${renewDate.getUTCDate()}-${months[renewDate.getUTCMonth()]}-${renewDate.getUTCFullYear()}`;
  return { daysLeft, renewByDate, renewByDaysLeft, urgent: daysLeft < 180, expired: daysLeft < 0 };
}

type DocType = "ead" | "gc";

export default function RenewalGuidePage() {
  const [docType, setDocType] = useState<DocType>("ead");
  const [expiryDate, setExpiryDate] = useState("");

  const result = computeRenewal(expiryDate);

  const isEAD = docType === "ead";
  const formCode = isEAD ? "I-765" : "I-90";
  const formName = isEAD ? "Form I-765 (EAD Renewal)" : "Form I-90 (Green Card Renewal)";
  const fee = isEAD ? "$520" : "$540 (biometric $85 có thể miễn nếu ≥79 tuổi)";
  const processingTime = isEAD ? "3–7 tháng" : "8–24 tháng (nên dùng biometric appointment khi có)";
  const urgentForm = isEAD ? "I-765 với expedite request" : "I-90 + ghi chú urgent; Liên hệ Infopass nếu GC hết hạn";

  return (
    <Layout sidebarGroups={SIDEBAR_GROUPS}>
      <div className="w-full">
        <h1 className="text-2xl font-bold text-text">🔄 Gia Hạn EAD & Thẻ Xanh — Hướng Dẫn & Nhắc Nhở</h1>
        <p className="mt-2 text-text-muted">
          Tính ngày cần nộp gia hạn · I-765 (EAD) · I-90 (Green Card) · Checklist giấy tờ
        </p>

        <div className="mt-3 flex gap-3 rounded-card border border-red-500/40 bg-red-500/10 p-3 text-sm leading-relaxed text-text">
          <span className="shrink-0 text-lg">⚠️</span>
          <div>
            EAD hết hạn = mất quyền làm việc hợp pháp ngay lập tức. Green Card hết hạn không mất status nhưng gây khó khăn khi travel và làm I-9. <strong>Nộp gia hạn ít nhất 6 tháng trước khi hết hạn.</strong>
          </div>
        </div>

        {/* Calculator */}
        <div className="mt-4 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-3 text-base font-bold text-text">📅 Tính Ngày Cần Nộp Gia Hạn</h2>

          <div className="flex flex-wrap gap-3 mb-4">
            {(["ead", "gc"] as DocType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setDocType(t); setExpiryDate(""); }}
                className={`rounded-btn border px-4 py-2 text-sm font-semibold transition-colors ${
                  docType === t
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-bg text-text-muted hover:text-text"
                }`}
              >
                {t === "ead" ? "💳 EAD (I-766)" : "💚 Thẻ Xanh (Green Card)"}
              </button>
            ))}
          </div>

          <label className="mb-1.5 block text-xs font-semibold text-text-muted">
            Ngày hết hạn trên thẻ (CARD EXPIRES)
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="rounded-btn border border-border bg-bg px-3 py-2 text-sm font-semibold text-text outline-none"
          />

          {result && (
            <div className="mt-4 space-y-3">
              {result.expired ? (
                <div className="rounded-card border-2 border-red-500 bg-red-500/10 p-4 text-center">
                  <div className="text-2xl">🚨</div>
                  <div className="mt-1 text-base font-bold text-red-500">Thẻ đã hết hạn {Math.abs(result.daysLeft)} ngày trước!</div>
                  <div className="mt-1 text-sm text-text-muted">Nộp <strong>{formCode}</strong> ngay lập tức. Nếu là EAD, liên hệ employer để biết quyền tiếp tục làm việc trong thời gian chờ.</div>
                </div>
              ) : result.urgent ? (
                <div className="rounded-card border-2 border-amber-500 bg-amber-500/10 p-4">
                  <div className="text-lg font-bold text-amber-500">⚡ Cần nộp gia hạn sớm!</div>
                  <div className="mt-1 text-sm text-text-muted">Còn <strong className="text-text">{result.daysLeft} ngày</strong> đến khi hết hạn. Nên đã nộp {formCode} rồi — nếu chưa, nộp ngay.</div>
                </div>
              ) : (
                <div className="rounded-card border border-green-500/40 bg-green-500/10 p-4">
                  <div className="text-base font-bold text-green-500">✅ Còn đủ thời gian</div>
                  <div className="mt-1 text-sm text-text-muted">Thẻ còn hạn <strong className="text-text">{result.daysLeft} ngày</strong>.</div>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-card border border-border bg-bg p-3 text-center">
                  <div className="text-xs text-text-muted mb-1">Ngày hết hạn</div>
                  <div className="text-sm font-bold text-text">{expiryDate.split("-").reverse().join("-")}</div>
                  <div className="text-xs text-text-muted mt-0.5">còn {result.expired ? "0" : result.daysLeft} ngày</div>
                </div>
                <div className={`rounded-card border p-3 text-center ${result.renewByDaysLeft < 0 ? "border-red-500/40 bg-red-500/10" : "border-primary/40 bg-primary/10"}`}>
                  <div className="text-xs text-text-muted mb-1">Nên nộp {formCode} trước</div>
                  <div className="text-sm font-bold text-primary">{result.renewByDate}</div>
                  <div className="text-xs text-text-muted mt-0.5">
                    {result.renewByDaysLeft < 0 ? `Đã qua ${Math.abs(result.renewByDaysLeft)} ngày` : `còn ${result.renewByDaysLeft} ngày`}
                  </div>
                </div>
                <div className="rounded-card border border-border bg-bg p-3 text-center">
                  <div className="text-xs text-text-muted mb-1">Form cần nộp</div>
                  <div className="text-sm font-bold text-text">{formCode}</div>
                  <div className="text-xs text-text-muted mt-0.5">Phí {fee.split(" ")[0]}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info cards */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-card border border-border bg-bg p-4">
            <h2 className="mb-2 text-base font-bold text-text">📋 Thông Tin {isEAD ? "EAD (I-765)" : "Green Card (I-90)"}</h2>
            <div className="divide-y divide-border text-sm text-text-muted">
              <div className="flex gap-2 py-2"><span className="w-32 shrink-0 font-medium text-text">Form</span><span>{formName}</span></div>
              <div className="flex gap-2 py-2"><span className="w-32 shrink-0 font-medium text-text">Lệ phí</span><span>{fee}</span></div>
              <div className="flex gap-2 py-2"><span className="w-32 shrink-0 font-medium text-text">Thời gian xử lý</span><span>{processingTime}</span></div>
              <div className="flex gap-2 py-2"><span className="w-32 shrink-0 font-medium text-text">Nộp trước</span><span>6 tháng — USCIS chính thức khuyến nghị</span></div>
              <div className="flex gap-2 py-2"><span className="w-32 shrink-0 font-medium text-text">Nếu khẩn cấp</span><span>{urgentForm}</span></div>
            </div>
          </div>

          <div className="rounded-card border border-border bg-bg p-4">
            <h2 className="mb-2 text-base font-bold text-text">📄 Giấy Tờ Cần Chuẩn Bị</h2>
            <ul className="space-y-1.5 text-sm text-text-muted">
              {isEAD ? (
                <>
                  <li><span className="font-medium text-text">Form I-765</span> + instructions (uscis.gov)</li>
                  <li><span className="font-medium text-text">Bản sao EAD hiện tại</span> (mặt trước và sau)</li>
                  <li><span className="font-medium text-text">Bản sao I-485 receipt</span> hoặc thẻ xanh (nếu có)</li>
                  <li><span className="font-medium text-text">2 ảnh thẻ</span> passport size 2x2 inch, nền trắng</li>
                  <li><span className="font-medium text-text">Séc $520</span> ghi "U.S. Department of Homeland Security"</li>
                  <li className="text-xs">💡 Nộp online qua myUSCIS — nhanh hơn và có tracking</li>
                </>
              ) : (
                <>
                  <li><span className="font-medium text-text">Form I-90</span> + instructions (uscis.gov)</li>
                  <li><span className="font-medium text-text">Bản sao thẻ xanh hiện tại</span> (mặt trước và sau)</li>
                  <li><span className="font-medium text-text">2 ảnh thẻ</span> passport size 2x2 inch, nền trắng</li>
                  <li><span className="font-medium text-text">Séc $540</span> + $85 biometric = $625 tổng (xem hướng dẫn)</li>
                  <li><span className="font-medium text-text">Bằng chứng địa chỉ hiện tại</span> nếu khác trên thẻ</li>
                  <li className="text-xs">💡 Nộp online qua myUSCIS — không cần biometric appointment online</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h2 className="mb-2 text-base font-bold text-text">❓ Câu Hỏi Thường Gặp</h2>
          <div className="space-y-3 text-sm text-text-muted">
            {isEAD ? (
              <>
                <div><span className="font-medium text-text">Tôi có thể tiếp tục làm việc khi EAD hết hạn?</span><br />Nếu đã nộp I-765 gia hạn trước khi EAD hết hạn, được phép làm việc thêm tối đa 180 ngày (auto-extension). Mang theo biên lai I-797 + EAD cũ để chứng minh với employer.</div>
                <div><span className="font-medium text-text">Nộp cùng lúc I-765 và I-131 AP được không?</span><br />Được. Nộp combo I-765 + I-131 sẽ nhận Combo Card (AP + EAD trên 1 thẻ).</div>
                <div><span className="font-medium text-text">Tôi đang chờ thẻ xanh (I-485 pending) — có phải gia hạn EAD không?</span><br />Có. EAD trong khi pending I-485 phải gia hạn. Hệ thống auto-extension 180 ngày áp dụng nếu nộp đúng hạn.</div>
              </>
            ) : (
              <>
                <div><span className="font-medium text-text">Thẻ xanh hết hạn có bị mất status không?</span><br />Không — permanent resident status không hết hạn. Nhưng thẻ hết hạn gây khó khăn khi travel và làm I-9 với employer mới.</div>
                <div><span className="font-medium text-text">Tôi cần thẻ xanh còn hạn để đi nước ngoài không?</span><span className="block mt-0.5">Có. Sân bay và hãng bay yêu cầu thẻ còn hạn. Nộp I-90 sớm trước khi đi.</span></div>
                <div><span className="font-medium text-text">Mất thẻ xanh thì làm gì?</span><br />Cũng nộp I-90, chọn lý do "lost/stolen/destroyed". Phí như gia hạn thông thường.</div>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 rounded-card border border-border bg-bg p-4">
          <h3 className="mb-2 text-sm font-bold text-text">🔗 Liên Kết Chính Thức</h3>
          <ul className="space-y-1 text-sm text-text-muted">
            <li><a href="https://www.uscis.gov/i-765" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Form I-765 (EAD Renewal)</a> — uscis.gov</li>
            <li><a href="https://www.uscis.gov/i-90" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Form I-90 (Green Card Renewal)</a> — uscis.gov</li>
            <li><a href="https://egov.uscis.gov/processing-times/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">USCIS Processing Times</a> — kiểm tra thời gian xử lý hiện tại</li>
            <li><a href="https://my.uscis.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">myUSCIS</a> — nộp online và theo dõi case</li>
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href="/green-card-life" className="text-primary hover:underline">💚 Cuộc Sống Thẻ Xanh</a>
          <a href="/advance-parole" className="text-primary hover:underline">✈️ Du Lịch — I-131 AP</a>
          <a href="/tracker" className="text-primary hover:underline">📋 Theo Dõi I-485</a>
        </div>
      </div>
    </Layout>
  );
}
