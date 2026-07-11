"use client";

interface Tab<T extends string> {
  key: T;
  label: string;
}

interface TabNavProps<T extends string> {
  tabs: Array<Tab<T>>;
  active: T;
  onChange: (key: T) => void;
}

export function TabNav<T extends string>({ tabs, active, onChange }: TabNavProps<T>) {
  return (
    <div className="mb-4 overflow-x-auto">
      <div className="flex min-w-max border-b border-border sm:min-w-0 sm:flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            aria-pressed={active === t.key}
            // touch-manipulation removes iOS 300ms click delay and prevents
            // scroll-container from consuming the tap before the click fires
            className={`touch-manipulation whitespace-nowrap border-b-2 -mb-px px-4 py-3 text-xs font-semibold transition-colors ${
              active === t.key
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
