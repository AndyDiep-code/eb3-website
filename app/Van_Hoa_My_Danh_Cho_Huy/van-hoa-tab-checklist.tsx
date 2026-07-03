"use client";

// Tab "Checklist" — ported from Van_Hoa_My_Danh_Cho_Huy.html #checklist.
// Legacy page persisted checkbox state to localStorage keyed by each
// input's `id` (c1..c8, d1..d6, e1..e12); this React port reads/writes the
// same keys so existing users' saved progress is preserved across the
// HTML→Next.js migration.

import { useEffect, useState } from "react";
import { CHECKLIST_GROUPS, type ChecklistItem } from "./van-hoa-checklist-data";
import { SectionTitle } from "./van-hoa-ui";

const BADGE_TONE_CLASSES: Record<string, string> = {
  red: "bg-red-100 text-red-700",
  amber: "bg-secondary/20 text-secondary",
  blue: "bg-primary/10 text-primary",
  green: "bg-accent/10 text-accent",
};

export function VanHoaTabChecklist() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  // Hydrate from localStorage on mount (client-only — matches legacy
  // page's behavior of reading saved checkbox state on load).
  useEffect(() => {
    const restored: Record<string, boolean> = {};
    for (const group of CHECKLIST_GROUPS) {
      for (const item of group.items) {
        try {
          restored[item.id] = window.localStorage.getItem(item.id) === "true";
        } catch {
          // localStorage unavailable (private browsing, quota) — item
          // just won't persist across reloads, checklist still works.
        }
      }
    }
    setCheckedState(restored);
  }, []);

  function handleToggle(id: string) {
    setCheckedState((current) => {
      const next = { ...current, [id]: !current[id] };
      try {
        window.localStorage.setItem(id, String(next[id]));
      } catch {
        // Same fail-safe as above — in-session toggle still works.
      }
      return next;
    });
  }

  return (
    <div>
      <SectionTitle>✅ Checklist Học Văn Hóa Mỹ — Tự Theo Dõi</SectionTitle>

      <div className="flex flex-col gap-3.5">
        {CHECKLIST_GROUPS.map((group) => (
          <div key={group.title} className="rounded-card border border-border bg-bg p-3.5">
            <h3 className="mb-2.5 text-sm font-semibold text-text">{group.title}</h3>
            <div className="flex flex-col">
              {group.items.map((item) => (
                <ChecklistRow
                  key={item.id}
                  item={item}
                  checked={Boolean(checkedState[item.id])}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChecklistRow({
  item,
  checked,
  onToggle,
}: {
  item: ChecklistItem;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      htmlFor={item.id}
      className="flex items-start gap-2.5 border-b border-bg-alt py-1.5 last:border-0"
    >
      <input
        type="checkbox"
        id={item.id}
        checked={checked}
        onChange={onToggle}
        className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer"
      />
      <span
        className={`text-sm leading-relaxed ${checked ? "text-text-muted line-through" : "text-text"}`}
      >
        {item.label}
        {item.badge && (
          <span
            className={`ml-1.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${BADGE_TONE_CLASSES[item.badge.tone]}`}
          >
            {item.badge.text}
          </span>
        )}
      </span>
    </label>
  );
}
