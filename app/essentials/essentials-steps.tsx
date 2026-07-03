// Numbered step list, ported from essentials.html's .steps/.step-num —
// used in Phone tab (SIM activation) and Car tab (finding a used car).

export interface EssentialsStep {
  title: string;
  body: React.ReactNode;
}

export function EssentialsSteps({ steps }: { steps: EssentialsStep[] }) {
  return (
    <ol className="mb-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-3 border-b border-border py-2.5 last:border-b-0">
          <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-white">
            {index + 1}
          </div>
          <div className="text-[12.5px] leading-relaxed text-text-muted">
            <b className="mb-0.5 block text-text">{step.title}</b>
            {step.body}
          </div>
        </li>
      ))}
    </ol>
  );
}
