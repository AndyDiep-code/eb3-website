"use client";

import { useEffect, useState } from "react";

const LS_KEY = "uscis_receipt_number";
const VALID_RE = /^[A-Z]{3}\d{7,13}$/;

// USCIS's own form action — we POST directly from the browser so the request
// comes from a real browser (bypasses Cloudflare bot protection on egov.uscis.gov).
const USCIS_ACTION = "https://egov.uscis.gov/casestatus/mycasestatus.do";

export function TrackerCaseStatus() {
  const [receipt, setReceipt] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setReceipt(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const cleaned = receipt.trim().toUpperCase().replace(/[\s\-]/g, "");
    if (!VALID_RE.test(cleaned)) {
      e.preventDefault();
      setValidationError("Số hồ sơ không hợp lệ. Ví dụ đúng: IOE1234567890");
      return;
    }
    setValidationError("");
    try {
      localStorage.setItem(LS_KEY, cleaned);
    } catch {
      /* ignore */
    }
    // Let the form submit normally — USCIS opens in a new tab
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border bg-sky-50 px-4 py-3 dark:bg-sky-950/30">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-700 text-xs text-white">
          🔍
        </span>
        <span className="text-sm font-bold text-text">Tra Cứu Trạng Thái Hồ Sơ USCIS</span>
      </div>

      <div className="p-4">
        {/*
         * Direct HTML form POST to USCIS — opens in a new tab.
         * The browser makes the request (real IP + headers), so Cloudflare
         * bot protection on egov.uscis.gov accepts it.
         */}
        <form
          method="POST"
          action={USCIS_ACTION}
          target="_blank"
          rel="noopener noreferrer"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="uscis-receipt"
            className="mb-1.5 block text-[11px] font-semibold text-text-muted"
          >
            Số hồ sơ USCIS (Receipt Number)
          </label>
          <div className="flex gap-2">
            <input
              id="uscis-receipt"
              type="text"
              name="appReceiptNum"
              value={receipt}
              onChange={(e) => {
                setReceipt(e.target.value.toUpperCase());
                setValidationError("");
              }}
              placeholder="VD: IOE1234567890"
              maxLength={16}
              className="flex-1 rounded-btn border border-border bg-bg px-3 py-2 font-mono text-sm text-text placeholder:font-sans placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              name="caseStatusSearchBtn"
              value="CHECK STATUS"
              className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              Tra Cứu
            </button>
          </div>

          {validationError && (
            <p className="mt-1.5 text-[11px] text-red-500">{validationError}</p>
          )}

          <p className="mt-1 text-[10px] text-text-muted">
            In trên Notice of Action (I-797). Bắt đầu bằng IOE, MSC, EAC, SRC, LIN, WAC...
          </p>
        </form>

        <div className="mt-3 flex items-start gap-2 rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 dark:border-sky-900/40 dark:bg-sky-950/20">
          <span className="mt-0.5 shrink-0 text-sky-500">ℹ️</span>
          <p className="text-[11px] leading-relaxed text-text-muted">
            Kết quả mở trên trang USCIS chính thức (tab mới, tiếng Anh).{" "}
            <a
              href="https://egov.uscis.gov/casestatus/landing.do"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Vào thẳng trang USCIS →
            </a>
          </p>
        </div>

        <p className="mt-2 text-[10px] text-text-muted">
          Số hồ sơ chỉ lưu trên trình duyệt của bạn · Dữ liệu gửi trực tiếp đến USCIS
        </p>
      </div>
    </div>
  );
}
