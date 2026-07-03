// Shared presentational primitives for the housing-rights tab content
// (heading, sub-label, card, alert, do/don't box, lease-term, red-flag,
// step-row) — extracted so each tab file (housing-tab-*.tsx) only contains
// content, not repeated markup. Ported from housing-rights.html's
// .card/.alert/.lease-term/.redflag/.do-box/.dont-box CSS classes.

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

export function Card({
  children,
  borderColor,
}: {
  children: React.ReactNode;
  borderColor?: string;
}) {
  return (
    <div
      className={`mb-3 rounded-card border bg-bg p-4 ${borderColor ?? "border-border"}`}
    >
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
    <div
      className={`mb-3 flex gap-3 rounded-card border p-3 text-sm leading-relaxed ${ALERT_TONE_CLASSES[tone]}`}
    >
      <span className="flex-shrink-0 text-base">{icon}</span>
      <div>{children}</div>
    </div>
  );
}

export function DoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm leading-loose text-text">
      {children}
    </div>
  );
}

export function DontBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 rounded-card border border-red-700/40 bg-red-700/10 p-3 text-sm leading-loose text-text">
      {children}
    </div>
  );
}

export function RedFlag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-start gap-2.5 rounded-card border border-red-900/40 bg-red-900/10 p-2.5 text-sm text-text">
      <span className="flex-shrink-0">🚩</span>
      <span>{children}</span>
    </div>
  );
}

export function LeaseTerm({
  term,
  def,
  tip,
}: {
  term: string;
  def: string;
  tip: React.ReactNode;
}) {
  return (
    <div className="mb-2 rounded-r-card border-l-3 border-primary bg-primary/5 p-3">
      <div className="text-sm font-bold text-primary">{term}</div>
      <div className="mt-0.5 text-xs text-text-muted">{def}</div>
      <div className="mt-1 text-xs text-text-muted">{tip}</div>
    </div>
  );
}

export function Badge({
  tone,
  children,
}: {
  tone: "green" | "red" | "blue" | "yellow";
  children: React.ReactNode;
}) {
  const toneClasses: Record<typeof tone, string> = {
    green: "bg-accent/10 text-accent",
    red: "bg-red-700/10 text-red-600",
    blue: "bg-primary/10 text-primary",
    yellow: "bg-secondary/10 text-secondary",
  };
  return (
    <span
      className={`mb-2 inline-block rounded-btn px-2 py-0.5 text-xs font-bold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function StepRow({
  num,
  children,
}: {
  num: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2.5 flex items-start gap-2.5">
      <div className="mt-0.5 flex h-6.5 w-6.5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
        {num}
      </div>
      <div className="text-sm leading-relaxed text-text-muted">{children}</div>
    </div>
  );
}
