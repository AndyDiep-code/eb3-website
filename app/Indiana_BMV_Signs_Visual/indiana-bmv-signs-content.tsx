"use client";

import { useState, useCallback } from "react";
import { SIGNS, QUIZ_Q, QUIZ_PASS_COUNT, QUIZ_TOTAL, type Sign, type QuizQuestion } from "./indiana-bmv-signs-data";

type MainTab = "gallery" | "flashcard" | "table" | "quiz";
type GalleryCat = "All" | "Regulatory" | "Warning" | "Work Zone" | "Guide";

const CAT_BADGE: Record<string, string> = {
  Regulatory: "bg-blue-900/60 text-blue-300",
  Warning: "bg-yellow-900/60 text-yellow-300",
  "Work Zone": "bg-orange-900/60 text-orange-300",
  Guide: "bg-green-900/60 text-green-300",
};

// ── Gallery ──────────────────────────────────────────────────────────────────

function SignCard({ sign, onClick }: { sign: Sign; onClick: (s: Sign) => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick(sign)}
      className="rounded-card border border-border bg-bg p-3 text-center transition hover:-translate-y-0.5 hover:border-primary hover:bg-bg-alt relative cursor-pointer"
    >
      <span className={`absolute top-1.5 right-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${CAT_BADGE[sign.cat] ?? "bg-border text-text-muted"}`}>
        {sign.cat}
      </span>
      <img src={sign.uri} alt={sign.en} width={72} height={72} className="mx-auto mb-2 block object-contain" loading="lazy" />
      <div className="text-[11.5px] font-bold text-text">{sign.en}{sign.hot ? " ⚡" : ""}</div>
      <div className="text-[11px] italic text-text-muted">{sign.vi}</div>
    </button>
  );
}

function Modal({ sign, onClose }: { sign: Sign; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-card border border-border bg-bg p-5 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={sign.uri} alt={sign.en} width={100} height={100} className="mx-auto mb-3 block object-contain" />
        <div className="mb-1 text-base font-bold text-primary">{sign.en}</div>
        <div className="mb-3 text-sm italic text-text-muted">{sign.vi}</div>
        <div className="mb-4 rounded-card border border-primary/20 bg-primary/5 p-3">
          <div className="mb-1 text-[11px] text-text-muted">Hành động khi gặp biển này:</div>
          <div className="text-[13px] font-medium text-secondary leading-relaxed">{sign.act_en}</div>
          <div className="mt-1 text-[11.5px] italic text-text-muted leading-relaxed">{sign.act_vi}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-btn border border-border bg-bg px-4 py-2 text-sm text-text-muted hover:text-text w-full"
        >
          ✕ Đóng
        </button>
      </div>
    </div>
  );
}

function GalleryTab() {
  const [cat, setCat] = useState<GalleryCat>("All");
  const [modal, setModal] = useState<Sign | null>(null);

  const CATS: GalleryCat[] = ["All", "Regulatory", "Warning", "Work Zone", "Guide"];
  const filtered = cat === "All" ? SIGNS : SIGNS.filter((s) => s.cat === cat);

  return (
    <div>
      <div className="mb-3 rounded-card border border-yellow-800/40 bg-yellow-900/10 p-3 text-xs text-yellow-200 flex gap-2">
        <span className="text-lg flex-shrink-0">⭐</span>
        <span>Tập trung vào biển có dấu <b>⚡ HAY THI</b>. Nhấn mỗi biển để xem hành động cần làm.</span>
      </div>

      {/* Category filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              cat === c
                ? "border-primary bg-primary text-white"
                : "border-border bg-bg text-text-muted hover:border-text-muted"
            }`}
          >
            {c === "All" ? "All / Tất cả" : c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((s) => (
          <SignCard key={s.key} sign={s} onClick={setModal} />
        ))}
      </div>

      {modal && <Modal sign={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

// ── Flashcard ──────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FlashcardTab() {
  const [deck, setDeck] = useState<Sign[]>([...SIGNS]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = deck[idx];

  const go = useCallback((delta: number) => {
    setFlipped(false);
    setIdx((i) => (i + delta + deck.length) % deck.length);
  }, [deck.length]);

  const handleShuffle = () => {
    setDeck(shuffleArray(SIGNS));
    setIdx(0);
    setFlipped(false);
  };

  return (
    <div>
      <div className="mb-3 rounded-card border border-blue-800/40 bg-blue-900/10 p-3 text-xs text-blue-200 flex gap-2">
        <span className="text-lg flex-shrink-0">💡</span>
        <span>Nhìn hình biển báo → đoán nghĩa → nhấn lật → kiểm tra. Luyện đến khi đoán đúng ngay mà không cần nghĩ.</span>
      </div>

      <div className="mb-2 text-center text-xs text-text-muted">
        Thẻ {idx + 1} / {deck.length}
      </div>

      {/* Flip card */}
      <div
        className="mx-auto mb-4 w-full max-w-sm cursor-pointer"
        style={{ perspective: "800px", height: "220px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transition: "transform 0.5s",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            position: "relative",
          }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: "hidden", position: "absolute", inset: 0 }}
            className="flex flex-col items-center justify-center rounded-card border-2 border-border bg-bg p-4"
          >
            <img src={current.uri} alt={current.en} width={90} height={90} className="mb-3 object-contain" />
            <span className="text-xs text-text-muted">👆 Nhấn để xem nghĩa</span>
          </div>
          {/* Back */}
          <div
            style={{ backfaceVisibility: "hidden", position: "absolute", inset: 0, transform: "rotateY(180deg)" }}
            className="flex flex-col items-center justify-center rounded-card border-2 border-primary/50 bg-bg p-4"
          >
            <div className="mb-1 text-sm font-bold text-primary text-center">{current.en}</div>
            <div className="mb-2 text-xs italic text-text-muted text-center">{current.vi}</div>
            <div className="text-xs text-secondary text-center leading-relaxed">{current.act_en}</div>
            <div className="mt-1 text-[11px] italic text-text-muted text-center leading-relaxed">{current.act_vi}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => go(-1)} className="rounded-btn border border-border bg-bg px-4 py-2 text-sm text-text-muted hover:text-text">← Trước</button>
        <button type="button" onClick={() => setFlipped((f) => !f)} className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">🔄 Lật</button>
        <button type="button" onClick={() => go(1)} className="rounded-btn border border-border bg-bg px-4 py-2 text-sm text-text-muted hover:text-text">Tiếp →</button>
        <button type="button" onClick={handleShuffle} className="rounded-btn border border-green-700 bg-green-900/20 px-4 py-2 text-sm text-green-300 hover:bg-green-900/40">🔀 Xáo</button>
      </div>
    </div>
  );
}

// ── Table ──────────────────────────────────────────────────────────────────

const TABLE_SECTIONS: { cat: string; label: string }[] = [
  { cat: "Regulatory", label: "🚫 Biển Quy Định (Regulatory)" },
  { cat: "Warning", label: "⚠️ Biển Cảnh Báo (Warning)" },
  { cat: "Work Zone", label: "🟠 Khu Công Trường (Work Zone)" },
  { cat: "Guide", label: "🗺️ Biển Hướng Dẫn (Guide)" },
];

function TableTab() {
  return (
    <div>
      {TABLE_SECTIONS.map(({ cat, label }) => {
        const group = SIGNS.filter((s) => s.cat === cat);
        if (!group.length) return null;
        return (
          <div key={cat} className="mb-6">
            <h3 className="mb-2 text-sm font-bold text-primary border-b border-border pb-1">{label}</h3>
            <div className="overflow-x-auto rounded-card border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-bg">
                    <th className="w-16 py-2 px-2 text-left text-[11px] font-semibold text-text-muted">Hình</th>
                    <th className="py-2 px-2 text-left text-[11px] font-semibold text-text-muted">Tên (Anh)</th>
                    <th className="py-2 px-2 text-left text-[11px] font-semibold text-text-muted">Tên (Việt)</th>
                    <th className="py-2 px-2 text-left text-[11px] font-semibold text-text-muted">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((s, i) => (
                    <tr key={s.key} className={i % 2 === 1 ? "bg-bg-alt" : ""}>
                      <td className="py-2 px-2">
                        <img src={s.uri} alt={s.en} width={44} height={44} className="object-contain" loading="lazy" />
                      </td>
                      <td className="py-2 px-2 font-semibold text-text">
                        {s.en}{s.hot ? " ⚡" : ""}
                      </td>
                      <td className="py-2 px-2 italic text-text-muted">{s.vi}</td>
                      <td className="py-2 px-2 text-primary leading-relaxed">{s.act_en}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Quiz ──────────────────────────────────────────────────────────────────

type QuizState = "playing" | "done";

function QuizTab() {
  const [state, setState] = useState<QuizState>("playing");
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    shuffleArray(QUIZ_Q).slice(0, QUIZ_TOTAL)
  );
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [showExp, setShowExp] = useState(false);

  const q = questions[qIdx];
  const answered = selected !== null;

  const handleOpt = (i: number) => {
    if (answered) return;
    setSelected(i);
    setShowExp(true);
    if (i === q.ans) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= QUIZ_TOTAL) {
      setState("done");
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
      setShowExp(false);
    }
  };

  const handleReset = () => {
    setQuestions(shuffleArray(QUIZ_Q).slice(0, QUIZ_TOTAL));
    setQIdx(0);
    setSelected(null);
    setCorrect(0);
    setWrong(0);
    setShowExp(false);
    setState("playing");
  };

  if (state === "done") {
    const total = correct + wrong;
    const pct = Math.round((correct / total) * 100);
    const pass = correct >= QUIZ_PASS_COUNT;
    return (
      <div>
        <div className="rounded-card border border-border bg-bg p-6 text-center mb-4">
          <div className="text-4xl mb-2">{pass ? "🎉" : "📚"}</div>
          <div className="text-base font-bold mb-1">{pass ? "ĐẬU — Xuất sắc!" : "CHƯA ĐẬU — Cần ôn thêm"}</div>
          <div className={`text-5xl font-black my-3 ${pass ? "text-green-400" : "text-red-400"}`}>{pct}%</div>
          <div className="text-sm text-text-muted mb-2">{correct}/{QUIZ_TOTAL} câu đúng</div>
          <div className="flex justify-center gap-6 mt-3 text-sm">
            <div><span className="font-bold text-green-400">{correct}</span> <span className="text-text-muted">Đúng</span></div>
            <div><span className="font-bold text-red-400">{wrong}</span> <span className="text-text-muted">Sai</span></div>
            <div><span className="font-bold text-secondary">{pct}%</span> <span className="text-text-muted">Tỉ lệ</span></div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={handleReset} className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">🔄 Làm lại</button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((qIdx) / QUIZ_TOTAL) * 100;

  return (
    <div>
      <div className="mb-3 rounded-card border border-blue-800/40 bg-blue-900/10 p-3 text-xs text-blue-200 flex gap-2">
        <span className="text-lg flex-shrink-0">ℹ️</span>
        <span>Thi thử {QUIZ_TOTAL} câu biển báo với hình ảnh thực tế. Cần đúng ít nhất {QUIZ_PASS_COUNT}/{QUIZ_TOTAL} (87.5%) để đạt.</span>
      </div>

      {/* Header */}
      <div className="rounded-card border border-border bg-bg p-3 mb-3">
        <div className="flex justify-between items-center gap-2 flex-wrap mb-2">
          <span className="text-sm font-bold text-text">Câu {qIdx + 1}/{QUIZ_TOTAL}</span>
          <button type="button" onClick={handleReset} className="rounded-btn border border-border bg-bg px-3 py-1 text-xs text-text-muted hover:text-text">🔄 Làm lại</button>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex gap-4 text-xs text-text-muted">
          <span>Đúng: <b className="text-green-400">{correct}</b></span>
          <span>Sai: <b className="text-red-400">{wrong}</b></span>
          <span>Còn lại: <b className="text-secondary">{QUIZ_TOTAL - qIdx}</b></span>
        </div>
      </div>

      {/* Question */}
      <div className="rounded-card border border-border bg-bg p-4 mb-3">
        <div className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-3">Câu {qIdx + 1}</div>
        <img src={q.uri} alt="sign" width={100} height={100} className="mx-auto mb-3 block object-contain" />
        <div className="text-sm font-semibold text-text leading-relaxed mb-1">{q.en}</div>
        <div className="text-xs italic text-text-muted leading-relaxed mb-4 pl-2 border-l-2 border-border">{q.vi}</div>

        <div className="flex flex-col gap-2">
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.ans;
            const isSelected = i === selected;
            let cls = "rounded-card border p-3 text-left transition cursor-pointer flex gap-2 items-start ";
            if (!answered) {
              cls += "border-border bg-bg-alt hover:border-primary";
            } else if (isCorrect) {
              cls += "border-green-600 bg-green-900/20";
            } else if (isSelected) {
              cls += "border-red-600 bg-red-900/20";
            } else {
              cls += "border-border bg-bg opacity-60";
            }

            return (
              <button key={i} type="button" className={cls} onClick={() => handleOpt(i)} disabled={answered}>
                <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  answered && isCorrect ? "bg-green-500 text-white" :
                  answered && isSelected && !isCorrect ? "bg-red-500 text-white" :
                  "bg-border text-text-muted"
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">
                  <div className="text-xs font-medium text-text">{opt.en}</div>
                  <div className="text-[11px] italic text-text-muted">{opt.vi}</div>
                </span>
              </button>
            );
          })}
        </div>

        {showExp && (
          <div className="mt-3 rounded-card border border-primary/30 bg-primary/5 p-3">
            <div className="text-xs text-blue-300 leading-relaxed">{q.exp_en}</div>
            <div className="text-[11px] italic text-text-muted mt-1 leading-relaxed">{q.exp_vi}</div>
          </div>
        )}
      </div>

      {answered && (
        <button type="button" onClick={handleNext} className="rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
          {qIdx + 1 >= QUIZ_TOTAL ? "Xem kết quả →" : "Câu tiếp →"}
        </button>
      )}
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────

type TabDef = { key: MainTab; label: string };
const TABS: TabDef[] = [
  { key: "gallery", label: "🖼️ Thư Viện" },
  { key: "flashcard", label: "🃏 Flashcard" },
  { key: "table", label: "📋 Bảng Tra" },
  { key: "quiz", label: "🎯 Thi Biển Báo" },
];

export function IndianaBmvSignsContent() {
  const [tab, setTab] = useState<MainTab>("gallery");

  return (
    <div className="w-full">
      {/* Hero */}
      <h1 className="text-2xl font-bold text-text">🚦 Biển Báo Giao Thông Mỹ — Song Ngữ Việt-Anh</h1>
      <p className="mt-1 text-text-muted">Hình ảnh trực quan · Tiếng Anh + Tiếng Việt · Flashcard + Thi thử</p>

      {/* Stats */}
      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { n: "24", label: "Biển báo" },
          { n: "4", label: "Nhóm biển báo" },
          { n: `${QUIZ_TOTAL}`, label: "Câu thi (biển báo)" },
          { n: "Tiếng Việt", label: "Có thể thi bằng TV!" },
        ].map((s) => (
          <div key={s.label} className="rounded-card border border-border bg-bg px-4 py-2 text-center">
            <div className="text-lg font-bold text-secondary">{s.n}</div>
            <div className="text-xs text-text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="mt-6 mb-4 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1 border-b border-border min-w-max sm:min-w-0 sm:flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={`whitespace-nowrap px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                tab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "gallery" && <GalleryTab />}
      {tab === "flashcard" && <FlashcardTab />}
      {tab === "table" && <TableTab />}
      {tab === "quiz" && <QuizTab />}
    </div>
  );
}
