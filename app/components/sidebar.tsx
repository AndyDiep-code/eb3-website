"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export interface SidebarLink {
  label: string;
  href: string;
}

export interface SidebarGroup {
  label: string;
  links: SidebarLink[];
}

interface SidebarProps {
  groups?: SidebarGroup[];
  isOpen?: boolean;
  onClose?: () => void;
  onSearchOpen?: () => void;
}

const PLACEHOLDER_GROUPS: SidebarGroup[] = [
  {
    label: "Bắt Đầu",
    links: [{ label: "Trang chủ", href: "/" }],
  },
];

export function Sidebar({
  groups = PLACEHOLDER_GROUPS,
  isOpen = false,
  onClose,
  onSearchOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (groups[0]) initial.add(groups[0].label);
    for (const group of groups) {
      if (group.links.some((l) => l.href === pathname)) {
        initial.add(group.label);
        break;
      }
    }
    return initial;
  });

  function toggleGroup(label: string) {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Đóng menu"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
      <nav
        aria-label="Điều hướng chính"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gradient-to-b from-[#162e51] via-[#1a4480] to-blue-700 transition-transform md:static md:translate-x-0 md:pointer-events-auto ${
          isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
      >
        {/* Logo */}
        <div className="shrink-0 px-4 py-5">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-sm font-bold text-white backdrop-blur">
              E3
            </span>
            <div>
              <div className="text-sm font-bold text-white">EB3VIET</div>
              <div className="text-[10px] text-white/60">eb3viet.com</div>
            </div>
          </a>
        </div>

        {/* Search button */}
        <div className="mx-3 mt-1 mb-1">
          <button
            type="button"
            onClick={onSearchOpen}
            className="flex w-full items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <span>🔍</span>
            <span className="flex-1 text-left text-xs">Tìm kiếm...</span>
            <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/40 md:block">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/10" />

        {/* Nav groups — scrollable */}
        <ul className="flex flex-col gap-0.5 overflow-y-auto px-2 py-3">
          {groups.map((group) => {
            const isGroupOpen = openGroups.has(group.label);
            const hasActivePage = group.links.some((l) => l.href === pathname);
            return (
              <li key={group.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  aria-expanded={isGroupOpen}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-[11px] font-semibold uppercase tracking-widest transition-colors ${
                    hasActivePage
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  } hover:bg-white/10`}
                >
                  <span>{group.label}</span>
                  <span aria-hidden="true" className="text-[9px]">
                    {isGroupOpen ? "▲" : "▼"}
                  </span>
                </button>
                {isGroupOpen && (
                  <ul className="ml-1 mt-0.5 mb-1 flex flex-col gap-0.5 border-l border-white/20 pl-2">
                    {group.links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                              isActive
                                ? "bg-white/20 font-semibold text-white shadow-sm"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Donate — pinned to bottom of sidebar */}
        <div className="shrink-0 border-t border-white/10 px-4 py-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Ủng hộ dự án
          </p>
          <a
            href="https://www.paypal.com/ncp/payment/745UHBNRA4MHC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            <span>💙</span>
            <span>Donate qua PayPal</span>
          </a>
          <p className="mt-2 text-center text-[10px] text-white/30">
            Giúp duy trì website miễn phí
          </p>
        </div>
      </nav>
    </>
  );
}
