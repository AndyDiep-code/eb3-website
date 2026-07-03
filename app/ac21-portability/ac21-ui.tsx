// Shared presentational primitives for the AC21 portability tab content
// (heading, sub-label, card, alert, timeline step) — extracted so each
// tab file (ac21-tab-*.tsx) only contains content, not repeated markup.

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

export function TimelineStep({
  dot,
  dotColor,
  title,
  children,
  emphasis,
}: {
  dot: string;
  dotColor: string;
  title: string;
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${dotColor}`}
      >
        {dot}
      </div>
      <div className="text-sm">
        <strong className="text-text">{title}</strong>
        <br />
        <span className={emphasis ? "text-accent" : "text-text-muted"}>
          {children}
        </span>
      </div>
    </div>
  );
}
