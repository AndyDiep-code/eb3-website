"use client";

import { usePathname } from "next/navigation";

// Paths covered by each tab — first match wins, order matters.
// "/" uses exact match; others use startsWith on any listed prefix.
const BOTTOM_NAV_ITEMS = [
  {
    label: "Trang Chủ",
    href: "/",
    icon: "🏠",
    // exact match only so sub-pages don't all look like home
    paths: ["/"] as string[],
    exact: true,
  },
  {
    label: "Visa Bulletin",
    href: "/visa-bulletin",
    icon: "📅",
    paths: ["/visa-bulletin"],
    exact: false,
  },
  {
    label: "Hướng Dẫn",
    href: "/guides",
    icon: "📋",
    // all "Quy Trình EB-3" sidebar group paths
    paths: [
      "/guides",
      "/jobs",
      "/agency-guide",
      "/english-work",
      "/documents",
      "/interview",
      "/aos-interview-guide",
      "/ac21-portability",
      "/case-studies",
    ],
    exact: false,
  },
  {
    label: "Tin Tức",
    href: "/news",
    icon: "📰",
    // "Theo Dõi & Tin Tức" sidebar group paths
    paths: ["/news", "/perm-tracker", "/tracker", "/faq", "/glossary"],
    exact: false,
  },
] as const;

function isTabActive(
  pathname: string,
  paths: readonly string[],
  exact: boolean,
): boolean {
  if (exact) return paths.includes(pathname);
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

interface MobileBottomNavProps {
  onMenuOpen: () => void;
}

export function MobileBottomNav({ onMenuOpen }: MobileBottomNavProps) {
  const pathname = usePathname();
  const anyTabActive = BOTTOM_NAV_ITEMS.some((item) =>
    isTabActive(pathname, item.paths, item.exact),
  );

  return (
    <nav
      aria-label="Điều hướng nhanh"
      className="touch-manipulation fixed bottom-0 left-0 right-0 z-[45] flex border-t border-border bg-bg md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {BOTTOM_NAV_ITEMS.map(({ label, href, icon, paths, exact }) => {
        const isActive = isTabActive(pathname, paths, exact);
        return (
          <a
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] transition-colors ${
              isActive
                ? "font-semibold text-primary"
                : "text-text-muted hover:text-text"
            }`}
          >
            <span className="text-base leading-none">{icon}</span>
            <span>{label}</span>
          </a>
        );
      })}
      {/* Menu button highlights when on a page not covered by any tab */}
      <button
        type="button"
        onClick={onMenuOpen}
        onTouchEnd={(e) => {
          e.preventDefault();
          onMenuOpen();
        }}
        aria-label="Mở menu"
        className={`touch-manipulation flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] transition-colors ${
          !anyTabActive ? "font-semibold text-primary" : "text-text-muted hover:text-text"
        }`}
      >
        <span className="text-base leading-none">☰</span>
        <span>Menu</span>
      </button>
    </nav>
  );
}
