"use client";

import { useState } from "react";

export function VbEmailSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setErrorMsg(data.error ?? "Lỗi. Vui lòng thử lại.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Lỗi kết nối. Vui lòng thử lại.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-emerald-200 bg-emerald-50 p-4 text-center dark:border-emerald-800/40 dark:bg-emerald-950/30">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          ✅ Đã đăng ký! Bạn sẽ nhận email khi Visa Bulletin cập nhật.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs text-white">
          📧
        </span>
        <span className="text-sm font-bold text-text">Nhận Thông Báo Visa Bulletin</span>
      </div>
      <p className="mb-3 text-xs text-text-muted">
        Email miễn phí mỗi tháng khi Priority Date EB-3 EW (ROW) thay đổi.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="min-w-0 flex-1 rounded-btn border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Đăng Ký"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{errorMsg}</p>
      )}
    </div>
  );
}
