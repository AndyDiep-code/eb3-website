"use client";

import { useState } from "react";
import Script from "next/script";
import { Sidebar, type SidebarGroup } from "./sidebar";

const ADSENSE_CLIENT_ID = "ca-pub-7593939544196063";

interface LayoutProps {
  children: React.ReactNode;
  /** Forwarded to <Sidebar>; Phase 2 supplies real IA data here. */
  sidebarGroups?: SidebarGroup[];
}

/**
 * Shared page wrapper: mobile topbar + <Sidebar> + AdSense script loader
 * (lazyOnload, so it never competes with hydration) + main content slot.
 */
export function Layout({ children, sidebarGroups }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <header className="flex items-center justify-between border-b border-border bg-bg p-4 md:hidden">
        <span className="font-semibold text-text">EB3 Vietnam</span>
        <button
          type="button"
          aria-label="Mở menu"
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-btn border border-border px-3 py-1.5 text-sm text-text"
        >
          Menu
        </button>
      </header>

      <Sidebar
        groups={sidebarGroups}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 bg-bg-alt p-4 md:p-8">{children}</main>

      <Script
        async
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
    </div>
  );
}
