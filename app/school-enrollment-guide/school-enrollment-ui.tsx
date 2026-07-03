// Shared presentational primitives for school-enrollment-guide.html's tab
// content (alert, card, sub-label) — extracted so each tab file
// (school-tab-*.tsx) only contains content, not repeated markup.

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 rounded-card border border-border bg-bg p-4">
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-1.5 text-sm font-bold text-text">{children}</h3>;
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-3.5 text-xs font-bold uppercase tracking-wide text-primary">
      {children}
    </p>
  );
}

type AlertTone = "green" | "red" | "blue" | "yellow";

const ALERT_TONE_CLASSES: Record<AlertTone, string> = {
  green: "border-accent/40 bg-accent/10 text-text",
  red: "border-red-700/40 bg-red-700/10 text-text",
  blue: "border-primary/40 bg-primary/10 text-text",
  yellow: "border-secondary/40 bg-secondary/10 text-text",
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
