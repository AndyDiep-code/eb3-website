"use client";

import { useEffect, useState } from "react";

const LS_KEY = "vb-seen-update";

interface BannerState {
  show: boolean;
  monthLabel: string;
}

export function VbUpdateBanner() {
  const [banner, setBanner] = useState<BannerState | null>(null);

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const res = await fetch("/api/visa-bulletin");
        if (!res.ok) return;
        const data = await res.json() as {
          updated: string;
          months: { label: string; table_a: string | null; table_b: string | null }[];
        };

        if (!mounted) return;

        const lastSeen = localStorage.getItem(LS_KEY);
        const latestUpdate = data.updated;
        // Skip future placeholder months (table_a and table_b both null)
        const publishedMonths = data.months.filter(
          (m) => m.table_a !== null || m.table_b !== null,
        );
        const latestMonth =
          publishedMonths[publishedMonths.length - 1]?.label ?? "";

        if (!lastSeen || lastSeen < latestUpdate) {
          setBanner({ show: true, monthLabel: latestMonth });
        }
      } catch {
        // silently ignore — banner is non-critical
      }
    }

    check();
    return () => { mounted = false; };
  }, []);

  function dismiss() {
    setBanner(null);
    // Store the seen timestamp so we don't show again until next update
    fetch("/api/visa-bulletin")
      .then((r) => r.json())
      .then((d: unknown) => {
        const updated = (d as { updated?: string }).updated;
        if (updated) localStorage.setItem(LS_KEY, updated);
      })
      .catch(() => {});
  }

  if (!banner?.show) return null;

  return (
    <div className="flex items-center justify-between gap-3 border-b border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-800 dark:bg-blue-950/40">
      <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
        <span>📅</span>
        <span>
          Visa Bulletin <strong>{banner.monthLabel}</strong> vừa được cập nhật
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <a
          href="/visa-bulletin"
          className="text-sm font-semibold text-blue-700 underline-offset-2 hover:underline dark:text-blue-300"
        >
          Xem ngay →
        </a>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Đóng thông báo"
          className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
