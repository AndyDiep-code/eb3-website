"use client";

import { useState } from "react";

export interface SidebarLink {
  label: string;
  href: string;
}

export interface SidebarGroup {
  label: string;
  links: SidebarLink[];
}

interface SidebarProps {
  /**
   * Nav groups to render. Phase 1 ships a placeholder stub (see
   * PLACEHOLDER_GROUPS below); Phase 2 supplies the real 7-group/38-link
   * IA data via this prop once its sidebar-data.ts module exists.
   */
  groups?: SidebarGroup[];
  /** Controls mobile topbar open/close state from the parent <Layout>. */
  isOpen?: boolean;
  onClose?: () => void;
}

// Placeholder stub for this phase's local testing only. Phase 2 owns the
// real 38-link/7-group IA data (app/components/sidebar-data.ts) and passes
// it in via the `groups` prop.
const PLACEHOLDER_GROUPS: SidebarGroup[] = [
  {
    label: "Bắt Đầu",
    links: [{ label: "Trang chủ", href: "/" }],
  },
];

/**
 * Renders the journey-stage grouped nav. Ported from the old js/sidebar.js
 * design intent (toggleGroup / toggleSidebar / active-group auto-collapse)
 * as React state instead of DOM classList manipulation.
 */
export function Sidebar({
  groups = PLACEHOLDER_GROUPS,
  isOpen = false,
  onClose,
}: SidebarProps) {
  // Tracks which group labels are expanded. Starts with the first group
  // open so returning users immediately see at least one section.
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(groups[0] ? [groups[0].label] : []),
  );

  function toggleGroup(label: string) {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Đóng menu"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}
      <nav
        aria-label="Điều hướng chính"
        className={`fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto border-r border-border bg-bg transition-transform md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {groups.map((group) => {
            const isGroupOpen = openGroups.has(group.label);
            return (
              <li key={group.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  aria-expanded={isGroupOpen}
                  className="flex w-full items-center justify-between rounded-btn px-3 py-2 text-left text-sm font-medium text-text hover:bg-bg-alt"
                >
                  <span>{group.label}</span>
                  <span aria-hidden="true">{isGroupOpen ? "−" : "+"}</span>
                </button>
                {isGroupOpen && (
                  <ul className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="block rounded-btn px-3 py-1.5 text-sm text-text-muted hover:bg-bg-alt hover:text-text"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
