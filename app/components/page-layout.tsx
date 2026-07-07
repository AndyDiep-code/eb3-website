"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Sidebar, type SidebarGroup } from "./sidebar";
import { VbUpdateBanner } from "./vb-update-banner";
import { GlobalSearch } from "./global-search";

const ADSENSE_CLIENT_ID = "ca-pub-7593939544196063";

interface LayoutProps {
  children: React.ReactNode;
  sidebarGroups?: SidebarGroup[];
}

export function Layout({ children, sidebarGroups }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cmd/Ctrl+K global shortcut — opens search from anywhere
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile top bar — matches sidebar gradient */}
      <header className="flex items-center justify-between bg-gradient-to-r from-[#162e51] to-blue-700 px-4 py-3 md:hidden">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-xs font-bold text-white">
            E3
          </span>
          <span className="text-sm font-bold text-white">EB3VIET</span>
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Tìm kiếm"
            onClick={() => setIsSearchOpen(true)}
            className="rounded-md border border-white/30 bg-white/10 px-2.5 py-1.5 text-sm text-white hover:bg-white/20"
          >
            🔍
          </button>
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md border border-white/30 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
          >
            ☰ Menu
          </button>
        </div>
      </header>

      <GlobalSearch open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <Sidebar
        groups={sidebarGroups}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 bg-bg-alt">
        <VbUpdateBanner />
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">{children}</div>

        {/* Page footer */}
        <div className="mx-auto mt-8 w-full max-w-7xl border-t border-border px-4 pt-5 pb-2 md:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-text-muted">
              © EB3VIET — Thông tin miễn phí cho cộng đồng người Việt EB-3
            </p>
            <a
              href="https://www.paypal.com/ncp/payment/745UHBNRA4MHC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              <span>💙</span>
              <span>Ủng hộ tác giả qua PayPal</span>
            </a>
          </div>
        </div>
      </main>

      <Script
        async
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
    </div>
  );
}
