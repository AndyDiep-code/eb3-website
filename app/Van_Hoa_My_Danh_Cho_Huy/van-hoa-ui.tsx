// Shared presentational primitives for the "Văn Hóa Mỹ" page's 7 tab
// sections — extracted so each section file only contains content.

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3.5 flex items-center gap-2 text-base font-bold text-text">
      {children}
    </h2>
  );
}

export function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-3.5 border-b-2 border-primary/20 pb-1 text-sm font-semibold text-primary">
      {children}
    </p>
  );
}

type AlertTone = "red" | "blue" | "green" | "amber";

const ALERT_TONE_CLASSES: Record<AlertTone, string> = {
  red: "border-l-red-500 bg-red-50 text-red-900",
  blue: "border-l-primary bg-primary/5 text-text",
  green: "border-l-accent bg-accent/5 text-text",
  amber: "border-l-secondary bg-secondary/10 text-text",
};

export function Alert({
  tone,
  title,
  children,
}: {
  tone: AlertTone;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`mb-3 rounded-btn border-l-3 p-3 text-sm leading-relaxed ${ALERT_TONE_CLASSES[tone]}`}>
      <b className="mb-0.5 block text-sm">{title}</b>
      {children}
    </div>
  );
}

export function Card({
  title,
  titleColor,
  items,
}: {
  title: string;
  titleColor: string;
  items: string[];
}) {
  return (
    <div className="rounded-card border border-border bg-bg p-3.5">
      <div className={`mb-2 flex items-center gap-1.5 text-sm font-semibold ${titleColor}`}>
        {title}
      </div>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-1.5 border-b border-bg-alt py-1.5 text-sm leading-relaxed text-text last:border-0"
          >
            <span className="flex-shrink-0 text-text-muted">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CompareCard({
  variant,
  title,
  items,
}: {
  variant: "vn" | "us";
  title: string;
  items: string[];
}) {
  const titleClasses =
    variant === "vn" ? "bg-secondary/20 text-secondary" : "bg-primary/10 text-primary";
  return (
    <div className="rounded-btn border border-border bg-bg p-3">
      <h4 className={`mb-2 inline-block rounded px-2 py-1 text-sm font-semibold ${titleClasses}`}>
        {title}
      </h4>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item} className="flex gap-1.5 py-0.75 text-xs leading-relaxed text-text">
            <span className="flex-shrink-0 text-text-muted">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mb-3.5 overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="bg-primary px-2.5 py-2 text-left text-xs font-medium text-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 1 ? "bg-bg-alt" : undefined}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-b border-bg-alt px-2.5 py-1.5 align-top leading-relaxed text-text"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
