// Shared presentational primitives for scam-warning content — extracted so
// each section file only contains content, not repeated markup.

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-6 border-b border-border pb-2 text-base font-bold text-text">
      {children}
    </h2>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 rounded-card border border-border bg-bg p-4">
      {children}
    </div>
  );
}

export function DontBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 rounded-card border border-red-700/40 bg-red-700/10 p-3 text-sm leading-relaxed text-text">
      {children}
    </div>
  );
}

export function DoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 rounded-card border border-accent/40 bg-accent/10 p-3 text-sm leading-relaxed text-text">
      {children}
    </div>
  );
}

type AlertTone = "orange" | "blue";

const ALERT_TONE_CLASSES: Record<AlertTone, string> = {
  orange: "border-secondary/40 bg-secondary/10",
  blue: "border-primary/40 bg-primary/10",
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
      className={`mb-3 flex gap-3 rounded-card border p-3 text-sm leading-relaxed text-text ${ALERT_TONE_CLASSES[tone]}`}
    >
      <span className="flex-shrink-0 text-base">{icon}</span>
      <div>{children}</div>
    </div>
  );
}
