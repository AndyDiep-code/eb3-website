// Shared presentational primitives for essentials.html's tab content
// (alert, sub-heading, info card, app chip, plan card, timeline row) —
// extracted so each tab file (essentials-tab-*.tsx) only contains content.

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
      {children}
    </h2>
  );
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 mt-4 text-sm font-bold text-accent">{children}</p>
  );
}

type AlertTone = "green" | "yellow" | "blue" | "red" | "teal";

const ALERT_TONE_CLASSES: Record<AlertTone, string> = {
  green: "border-accent/40 bg-accent/10 text-text",
  yellow: "border-secondary/40 bg-secondary/10 text-text",
  blue: "border-primary/40 bg-primary/10 text-text",
  red: "border-red-700/40 bg-red-700/10 text-text",
  teal: "border-accent/40 bg-accent/10 text-text",
};

export function Alert({
  tone,
  icon,
  children,
}: {
  tone: AlertTone;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mb-3.5 flex gap-2.5 rounded-card border p-3 text-[12.5px] leading-relaxed ${ALERT_TONE_CLASSES[tone]}`}>
      <span className="flex-shrink-0 text-lg">{icon}</span>
      <div>{children}</div>
    </div>
  );
}

export function InfoCard({
  title,
  titleClassName,
  children,
}: {
  title: string;
  titleClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <div className={`mb-2.5 flex items-center gap-1.5 text-sm font-bold ${titleClassName ?? "text-text"}`}>
        {title}
      </div>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

export function InfoCardItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-1.5 border-b border-border py-1 text-[12.5px] leading-relaxed text-text-muted last:border-b-0">
      <span className="flex-shrink-0 text-accent">›</span>
      <span>{children}</span>
    </li>
  );
}

export function AppChip({
  icon,
  name,
  description,
}: {
  icon: string;
  name: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-btn border border-border bg-bg px-3 py-2 text-sm text-text">
      <span className="text-lg">{icon}</span>
      <div>
        <div className="text-[12.5px] font-bold text-text">{name}</div>
        <div className="text-[11px] text-text-muted">{description}</div>
      </div>
    </div>
  );
}

export function PlanCard({
  top,
  badge,
  name,
  network,
  price,
  features,
}: {
  top?: boolean;
  badge?: string;
  name: string;
  network: string;
  price: string;
  features: string[];
}) {
  return (
    <div className={`rounded-card border p-4 ${top ? "border-accent" : "border-border"} bg-bg`}>
      {badge && <div className="mb-1.5 text-[10px] font-bold text-accent">{badge}</div>}
      <div className="text-sm font-extrabold text-text">{name}</div>
      <div className="mb-2 text-[11px] text-text-muted">{network}</div>
      <div className="mb-1 text-2xl font-extrabold text-accent">{price}</div>
      <ul className="text-xs text-text-muted">
        {features.map((feature) => (
          <li key={feature} className="border-b border-border py-0.5 leading-relaxed last:border-b-0">
            <span className="font-bold text-accent">✓ </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TimelineRow({ day, children }: { day: string; children: React.ReactNode }) {
  return (
    <div className="mb-2 flex gap-3.5">
      <div className="w-[70px] flex-shrink-0 pt-0.5 text-[11px] font-bold text-accent">{day}</div>
      <div className="flex-1 rounded-btn border border-border bg-bg px-3.5 py-2.5 text-[12.5px] leading-relaxed text-text-muted">
        {children}
      </div>
    </div>
  );
}

/** Cell text-color tiers, ported from legacy .hi/.lo/.mid classes. */
export const CELL_TIER_CLASSNAME = {
  hi: "text-accent font-semibold",
  lo: "text-red-500 text-[11.5px]",
  mid: "text-secondary font-medium",
} as const;
