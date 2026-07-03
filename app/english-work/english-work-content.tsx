"use client";

import { useState } from "react";
import { JOB_TABS } from "./english-work-data";

/**
 * Client component porting english-work.html's inline showJob()/speak()/
 * renderPhrases() script (legacy lines 199-227) to React state + the Web
 * Speech API. Kept separate from page.tsx so the route's Metadata export
 * (server-only) stays in a server component.
 */
export function EnglishWorkContent() {
  const [activeTabId, setActiveTabId] = useState(JOB_TABS[0].id);

  function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  const activeTab = JOB_TABS.find((tab) => tab.id === activeTabId) ?? JOB_TABS[0];

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {JOB_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTabId(tab.id)}
            aria-pressed={activeTabId === tab.id}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTabId === tab.id
                ? "border-accent bg-accent text-white"
                : "border-border bg-bg text-text-muted hover:border-accent hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab.sections.map((section) => (
          <div key={section.label}>
            <div className="mt-4 mb-2 border-b border-border pb-1 text-xs font-bold uppercase tracking-wide text-accent">
              {section.label}
            </div>
            <div className="grid gap-2">
              {section.phrases.map((phrase) => (
                <div
                  key={phrase.en}
                  className="flex items-center justify-between gap-2.5 rounded-card border border-border bg-bg p-3.5 hover:border-accent"
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold leading-snug text-text">
                      {phrase.en}
                    </div>
                    <div className="mt-0.5 text-xs italic text-text-muted">
                      {phrase.vi}
                    </div>
                    {phrase.ctx && (
                      <div className="mt-0.5 text-[11px] text-text-muted/80">
                        📌 {phrase.ctx}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => speak(phrase.en)}
                    title="Nghe phát âm"
                    aria-label={`Nghe phát âm: ${phrase.en}`}
                    className="flex-shrink-0 rounded-btn bg-accent/90 px-2.5 py-1.5 text-sm text-white transition-colors hover:bg-accent"
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 rounded-card border border-border bg-bg p-3.5 text-xs text-text-muted">
        🔊 Chức năng phát âm dùng Web Speech API (miễn phí, không cần internet
        riêng). Hoạt động tốt trên Chrome/Edge. Safari/Firefox có thể khác.
      </div>
    </>
  );
}
