// Shared presentational primitives for the healthcare tab content (alert,
// term card, info card, step list, cost box, drug card, state badge) —
// extracted so each tab file (healthcare-tab-*.tsx) only contains content,
// not repeated markup. Ported from healthcare.html's .alert/.term-card/
// .icard/.steps/.cost-box/.drug-card/.state-badge CSS classes.

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
      {children}
    </h2>
  );
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-4 text-sm font-bold text-primary">{children}</p>
  );
}

type AlertTone = "purple" | "green" | "yellow" | "blue" | "red";

const ALERT_TONE_CLASSES: Record<AlertTone, string> = {
  purple: "border-purple-700/40 bg-purple-700/10 text-text",
  green: "border-accent/40 bg-accent/10 text-text",
  yellow: "border-secondary/40 bg-secondary/10 text-text",
  blue: "border-primary/40 bg-primary/10 text-text",
  red: "border-red-700/40 bg-red-700/10 text-text",
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
    <div
      className={`mb-3 flex gap-2.5 rounded-card border p-3 text-sm leading-relaxed ${ALERT_TONE_CLASSES[tone]}`}
    >
      <span className="mt-0.5 flex-shrink-0 text-lg">{icon}</span>
      <div>{children}</div>
    </div>
  );
}

export function TermCard({
  name,
  vi,
  desc,
  example,
}: {
  name: string;
  vi: string;
  desc: string;
  example: string;
}) {
  return (
    <div className="rounded-card border border-border bg-bg p-3.5">
      <div className="mb-1 text-xs font-bold text-purple-600">{name}</div>
      <div className="mb-1 text-sm font-bold text-text">{vi}</div>
      <div className="text-xs leading-relaxed text-text-muted">{desc}</div>
      <div className="mt-1 text-xs italic text-text-muted/70">{example}</div>
    </div>
  );
}

export function InfoCard({
  title,
  titleColor,
  items,
}: {
  title: string;
  titleColor: string;
  items: React.ReactNode[];
}) {
  return (
    <div className="rounded-card border border-border bg-bg p-3.5">
      <div className={`mb-2.5 flex items-center gap-1.5 text-sm font-bold ${titleColor}`}>
        {title}
      </div>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="border-b border-border py-1.5 text-xs leading-relaxed text-text-muted last:border-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <ul className="mb-4">{children}</ul>;
}

export function StepItem({
  num,
  children,
}: {
  num: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 border-b border-border py-2.5 last:border-0">
      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-extrabold text-white">
        {num}
      </div>
      <div className="text-sm leading-relaxed text-text-muted">{children}</div>
    </li>
  );
}

export function CostBox({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; price: string; priceClass: string }>;
}) {
  return (
    <div className="mb-3.5 rounded-card border border-border bg-bg p-4">
      <div className="mb-3 text-sm font-bold text-text">{title}</div>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between border-b border-border py-1.5 text-sm last:border-0"
        >
          <span className="text-text-muted">{row.label}</span>
          <span className={`font-bold ${row.priceClass}`}>{row.price}</span>
        </div>
      ))}
    </div>
  );
}

export function DrugCard({
  type,
  typeColor,
  name,
  price,
  priceColor,
  note,
  highlight,
}: {
  type: string;
  typeColor: string;
  name: string;
  price: string;
  priceColor: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-card border bg-bg p-3.5 text-center ${
        highlight ? "border-accent" : "border-border"
      }`}
    >
      <div className={`mb-1.5 text-xs font-bold uppercase tracking-wide ${typeColor}`}>
        {type}
      </div>
      <div className="mb-2 text-base font-extrabold text-text">{name}</div>
      <div className={`mb-1 text-xl font-extrabold ${priceColor}`}>{price}</div>
      <div className="text-xs text-text-muted/70">{note}</div>
    </div>
  );
}

export function StateBadge({
  tone,
  children,
}: {
  tone: "yes" | "partial" | "no";
  children: React.ReactNode;
}) {
  const toneClasses: Record<typeof tone, string> = {
    yes: "bg-accent/15 text-accent",
    partial: "bg-secondary/15 text-secondary",
    no: "bg-border text-text-muted",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
