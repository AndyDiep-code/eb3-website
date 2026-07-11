"use client";

import { useEffect } from "react";

export default function NewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[/news error]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-lg font-semibold text-text">Đã xảy ra lỗi khi tải trang tin tức.</p>
      <pre className="max-w-full overflow-auto rounded-card border border-border bg-bg-alt px-4 py-3 text-left text-xs text-red-500">
        {error.message}
        {"\n"}
        {error.stack}
      </pre>
      <button
        type="button"
        onClick={reset}
        className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white"
      >
        Thử lại
      </button>
    </div>
  );
}
