"use client";

import { useMemo, useState } from "react";
import {
  CAT_BADGE,
  CAT_ICON,
  JOB_CATEGORY_FILTERS,
  JOBS,
  KIT_GUIDE,
  PRIMARY_STATE_FILTERS,
  STATES,
  type JobCategory,
  type JobEntry,
  type StateCode,
} from "./jobs-data";

/**
 * Client component porting jobs.html's inline render()/filter()/setJob()/
 * setState()/toggleState()/toggleKit()/renderKit() script (legacy lines
 * 547-841). Kept separate from page.tsx so the route's Metadata export
 * (server-only) stays in a server component.
 */
export function JobsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<JobCategory | "all">("all");
  const [activeState, setActiveState] = useState<StateCode | "all" | "other">("all");
  const [kitOpen, setKitOpen] = useState(true);
  const [expandedJobIndex, setExpandedJobIndex] = useState<number | null>(null);

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return JOBS.map((job, index) => ({ job, index })).filter(({ job }) => {
      const matchesCategory = activeCategory === "all" || job.cat === activeCategory;
      const matchesState =
        activeState === "all" ||
        (activeState === "other" && !PRIMARY_STATE_FILTERS.includes(job.state as StateCode)) ||
        job.state === activeState;
      const matchesQuery =
        !query ||
        job.n.toLowerCase().includes(query) ||
        job.city.toLowerCase().includes(query) ||
        job.state.toLowerCase().includes(query) ||
        job.desc.toLowerCase().includes(query) ||
        (STATES[job.state]?.name ?? "").toLowerCase().includes(query);
      return matchesCategory && matchesState && matchesQuery;
    });
  }, [searchQuery, activeCategory, activeState]);

  function handleCategoryChange(category: JobCategory | "all") {
    setActiveCategory(category);
    setKitOpen(true);
  }

  return (
    <>
      <div className="mt-4 flex flex-col gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="🔍 Tìm theo tên hãng, tiểu bang, nghề..."
          className="w-full rounded-btn border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
        />

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-text-muted">Ngành:</span>
          <CategoryFilterButton
            isActive={activeCategory === "all"}
            onClick={() => handleCategoryChange("all")}
          >
            Tất cả
          </CategoryFilterButton>
          {JOB_CATEGORY_FILTERS.map((category) => (
            <CategoryFilterButton
              key={category.key}
              isActive={activeCategory === category.key}
              onClick={() => handleCategoryChange(category.key)}
            >
              {category.label}
            </CategoryFilterButton>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-text-muted">Bang:</span>
          <CategoryFilterButton isActive={activeState === "all"} onClick={() => setActiveState("all")}>
            Tất cả
          </CategoryFilterButton>
          {PRIMARY_STATE_FILTERS.map((stateCode) => (
            <CategoryFilterButton
              key={stateCode}
              isActive={activeState === stateCode}
              onClick={() => setActiveState(stateCode)}
            >
              {STATES[stateCode].name}
            </CategoryFilterButton>
          ))}
          <CategoryFilterButton isActive={activeState === "other"} onClick={() => setActiveState("other")}>
            Các bang khác
          </CategoryFilterButton>
        </div>
      </div>

      <p className="mt-3 text-xs text-text-muted">
        Hiển thị <b className="text-text">{filteredJobs.length}</b> / {JOBS.length} hãng
      </p>

      {activeCategory !== "all" && (
        <KitGuidePanel category={activeCategory} isOpen={kitOpen} onToggle={() => setKitOpen((open) => !open)} />
      )}

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filteredJobs.map(({ job, index }) => (
          <JobCard
            key={index}
            job={job}
            isExpanded={expandedJobIndex === index}
            onToggleExpand={() => setExpandedJobIndex((current) => (current === index ? null : index))}
          />
        ))}
        {filteredJobs.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-text-muted">
            Không tìm thấy hãng bảo trợ phù hợp.
          </p>
        )}
      </div>
    </>
  );
}

function CategoryFilterButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        isActive
          ? "border-primary bg-primary text-white"
          : "border-border bg-bg text-text-muted hover:border-primary hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

function JobCard({
  job,
  isExpanded,
  onToggleExpand,
}: {
  job: JobEntry;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const badge = CAT_BADGE[job.cat];
  const stateInfo = STATES[job.state] ?? STATES.MULTI;
  const stateLabel = job.state === "MULTI" ? "🗺️ Nhiều tiểu bang" : `📍 ${stateInfo.name}`;

  return (
    <div className="overflow-hidden rounded-card border border-border bg-bg transition-colors hover:border-primary/40">
      <div className="p-4">
        <div className="flex items-start gap-2.5">
          <span className="text-2xl">{CAT_ICON[job.cat]}</span>
          <div>
            <div className="text-sm font-bold text-text leading-snug">{job.n}</div>
            <div className="mt-0.5 text-xs text-text-muted">{stateLabel}</div>
          </div>
        </div>

        <span
          className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${BADGE_TONE_CLASSES[badge.cls] ?? "bg-bg-alt text-text-muted"}`}
        >
          {badge.label}
        </span>

        <p className="mt-2 text-xs leading-relaxed text-text-muted">{job.desc}</p>

        <ul className="mt-2 flex flex-col gap-0.5">
          {job.bullets.map((bullet, bulletIndex) => (
            <li key={bulletIndex} className="flex gap-1.5 text-[11.5px] leading-relaxed text-text-muted">
              <span className="flex-shrink-0 text-primary">›</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between border-t border-border px-4 py-2 text-left text-[11.5px] font-semibold text-text-muted transition-colors hover:bg-bg-alt"
      >
        ℹ️ Thông tin tiểu bang
        <span className={`text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
      </button>

      {isExpanded && (
        <div className="border-t border-border bg-bg-alt px-4 py-3">
          <StateInfoRow label="🌡️ Khí hậu" value={stateInfo.weather} />
          <StateInfoRow label="🏠 Thuê nhà" value={stateInfo.rent} />
          <StateInfoRow label="🛒 Ăn uống" value={stateInfo.food} />
          <StateInfoRow label="💰 Thuế" value={stateInfo.tax} />
          <StateInfoRow label="🇻🇳 Cộng đồng VN" value={stateInfo.viet} />
          <p className="mt-1.5 text-[11px] italic leading-relaxed text-text-muted">💡 {stateInfo.notes}</p>
        </div>
      )}
    </div>
  );
}

function StateInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1.5 border-b border-border py-1 text-[11.5px] leading-relaxed text-text-muted last:border-b-0">
      <span className="w-20 flex-shrink-0 font-semibold text-primary">{label}</span>
      <span>{value}</span>
    </div>
  );
}

/** Maps legacy badge CSS classes (b-poultry, b-fish, ...) to Tailwind utility classes. */
const BADGE_TONE_CLASSES: Record<string, string> = {
  "b-poultry": "bg-secondary/15 text-secondary",
  "b-fish": "bg-primary/10 text-primary",
  "b-mfg": "bg-accent/15 text-accent",
  "b-food": "bg-secondary/20 text-secondary",
  "b-hotel": "bg-accent/10 text-accent",
  "b-transport": "bg-text-muted/15 text-text-muted",
  "b-care": "bg-primary/15 text-primary",
  "b-other": "bg-bg-alt text-text-muted",
};

function KitGuidePanel({
  category,
  isOpen,
  onToggle,
}: {
  category: JobCategory;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const guide = KIT_GUIDE[category];

  const columns = [
    { key: "buy", icon: "🛒", title: "Cần Mua ở Mỹ", items: guide.buy },
    { key: "vn", icon: "🇻🇳", title: "Nên Mang từ Việt Nam", items: guide.vn },
    { key: "personal", icon: "💼", title: "Đồ Cá Nhân & Sức Khỏe", items: guide.personal },
  ] as const;

  return (
    <div className="mt-3 overflow-hidden rounded-card border-2 border-primary/30 bg-bg-alt">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{CAT_ICON[category]}</span>
          <div>
            <div className="text-sm font-bold text-text">{guide.label}</div>
            <div className="text-[11px] text-text-muted">
              Vật dụng cần thiết · Nên mang từ Việt Nam · Đồ cá nhân
            </div>
          </div>
        </div>
        <span className="flex-shrink-0 rounded-btn px-2 py-1 text-xs text-text-muted hover:bg-bg">
          {isOpen ? "▲ Thu gọn" : "▼ Xem thêm"}
        </span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 gap-3 px-4 pb-4 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.key} className="rounded-card bg-bg p-3">
              <div
                className={`mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide ${
                  column.key === "buy"
                    ? "text-primary"
                    : column.key === "vn"
                      ? "text-accent"
                      : "text-secondary"
                }`}
              >
                {column.icon} {column.title}
              </div>
              {column.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-1.5 flex gap-1.5 text-xs leading-relaxed text-text-muted">
                  <span className="flex-shrink-0">{item.i}</span>
                  {/* Source: hand-authored jobs-data.ts (no user input), simple <b> markup ported from legacy KIT_GUIDE object. */}
                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              ))}
              {column.key === "personal" && guide.note && (
                <p className="mt-2 border-t border-border pt-2 text-[11px] italic leading-relaxed text-text-muted">
                  📌 {guide.note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
