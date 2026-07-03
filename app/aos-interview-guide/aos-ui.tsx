// Shared presentational primitives for the AOS interview guide tab content
// (heading, sub-label, card, alert) — extracted so each tab file
// (aos-tab-*.tsx) only contains content, not repeated markup. Mirrors the
// pattern established in app/ac21-portability/ac21-ui.tsx.

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-border pb-2 text-base font-bold text-text">
      {children}
    </h2>
  );
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide text-primary">
      {children}
    </p>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 rounded-card border border-border bg-bg p-4">
      {children}
    </div>
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
    <div className={`mb-3 flex gap-3 rounded-card border p-3 text-sm leading-relaxed ${ALERT_TONE_CLASSES[tone]}`}>
      <span className="flex-shrink-0 text-base">{icon}</span>
      <div>{children}</div>
    </div>
  );
}
