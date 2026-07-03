"use client";

import { useState, useEffect, useCallback } from "react";

export interface QuizQuestion {
  en: string;
  vi: string;
  opts: Array<{ en: string; vi: string }>;
  ans: number; // 0-indexed
  exp: { en: string; vi: string };
}

interface BmvQuizEngineProps {
  questions: QuizQuestion[];
  /** Number of correct answers required to pass */
  passCount: number;
}

interface AnswerRecord {
  question: QuizQuestion;
  chosen: number;
  correct: number;
  isCorrect: boolean;
}

const LETTERS = ["A", "B", "C", "D"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Reusable BMV quiz engine used by all state BMV pages.
 * Shows one question at a time, tracks score, displays results screen.
 * SSR-safe: shuffle only runs inside useEffect.
 */
export function BmvQuizEngine({ questions, passCount }: BmvQuizEngineProps) {
  const [shuffled, setShuffled] = useState<QuizQuestion[]>([]);
  const [cur, setCur] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [done, setDone] = useState(false);

  const initQuiz = useCallback(() => {
    setShuffled(shuffle(questions));
    setCur(0);
    setCorrect(0);
    setWrong(0);
    setAnswered(false);
    setChosen(null);
    setRecords([]);
    setDone(false);
  }, [questions]);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  const total = shuffled.length;
  const q = shuffled[cur];

  function selectAnswer(idx: number) {
    if (answered || !q) return;
    setAnswered(true);
    setChosen(idx);
    const isCorrect = idx === q.ans;
    if (isCorrect) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
    setRecords((prev) => [
      ...prev,
      { question: q, chosen: idx, correct: q.ans, isCorrect },
    ]);
  }

  function nextQuestion() {
    const next = cur + 1;
    if (next >= total) {
      setDone(true);
    } else {
      setCur(next);
      setAnswered(false);
      setChosen(null);
    }
  }

  if (!q && !done) {
    return (
      <div className="py-8 text-center text-text-muted text-sm">
        Đang tải câu hỏi...
      </div>
    );
  }

  if (done) {
    const pct = Math.round((correct / total) * 100);
    const passed = correct >= passCount;
    const wrongRecords = records.filter((r) => !r.isCorrect);

    return (
      <div>
        <div className="mb-4 rounded-card border border-border bg-bg p-6 text-center">
          <div className="text-5xl mb-2">{passed ? "🎉" : "📚"}</div>
          <div
            className={`text-lg font-bold mb-1 ${passed ? "text-accent" : "text-secondary"}`}
          >
            {passed ? "ĐẠT! Sẵn sàng thi thật!" : "Cần ôn thêm — cố lên!"}
          </div>
          <div
            className={`text-4xl font-black my-2 ${passed ? "text-accent" : "text-red-500"}`}
          >
            {correct}/{total}
          </div>
          <div className="text-text-muted text-sm mb-4">
            {passed
              ? `Điểm thi thật cần ${passCount}/${total} (${Math.round((passCount / total) * 100)}%). Mục tiêu: đạt cao hơn trước khi đến DMV!`
              : `Cần ${passCount} câu đúng để đậu. Bạn cần ôn thêm!`}
          </div>
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{correct}</div>
              <div className="text-xs text-text-muted">Câu đúng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{wrong}</div>
              <div className="text-xs text-text-muted">Câu sai</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{pct}%</div>
              <div className="text-xs text-text-muted">Tỉ lệ</div>
            </div>
          </div>
          <button
            type="button"
            onClick={initQuiz}
            className="rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            🔄 Làm lại bài mới
          </button>
        </div>

        {wrongRecords.length > 0 && (
          <div>
            <div className="mb-3 text-sm font-bold text-text border-b border-border pb-2">
              📋 Câu Sai — Cần Ôn Lại ({wrongRecords.length} câu)
            </div>
            {wrongRecords.map((r, i) => (
              <div
                key={i}
                className="mb-3 rounded-card border border-border bg-bg p-4"
              >
                <div className="text-xs font-semibold text-primary mb-2">
                  Câu sai #{i + 1}
                </div>
                <div className="font-semibold text-text text-sm mb-1">
                  {r.question.en}
                </div>
                <div className="text-xs text-text-muted italic mb-2">
                  {r.question.vi}
                </div>
                <div className="text-xs space-y-1">
                  <div className="text-red-500">
                    ❌ Bạn chọn: {LETTERS[r.chosen]}. {r.question.opts[r.chosen].en}
                  </div>
                  <div className="text-accent">
                    ✅ Đúng: {LETTERS[r.correct]}. {r.question.opts[r.correct].en}
                  </div>
                </div>
                <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 p-2 text-xs">
                  <div className="text-text">{r.question.exp.en}</div>
                  <div className="text-text-muted italic mt-0.5">
                    {r.question.exp.vi}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const progress = total > 0 ? ((cur + 1) / total) * 100 : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-4 rounded-card border border-border bg-bg p-4">
        <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
          <span className="text-sm font-bold text-text">
            Câu {cur + 1}/{total}
          </span>
          <button
            type="button"
            onClick={initQuiz}
            className="text-xs px-3 py-1 rounded-btn border border-border text-text-muted hover:text-text"
          >
            🔄 Làm lại
          </button>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-4 mt-2 text-xs text-text-muted">
          <span>
            Đúng:{" "}
            <strong className="text-accent">{correct}</strong>
          </span>
          <span>
            Sai:{" "}
            <strong className="text-red-500">{wrong}</strong>
          </span>
          <span>
            Còn lại:{" "}
            <strong className="text-text">{total - cur - (answered ? 1 : 0)}</strong>
          </span>
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-card border border-border bg-bg p-4 mb-4">
        <div className="font-semibold text-text text-sm leading-relaxed mb-2">
          {q.en}
        </div>
        <div className="text-xs text-text-muted italic leading-relaxed mb-4 pl-3 border-l-2 border-border">
          {q.vi}
        </div>

        <div className="grid gap-2">
          {q.opts.map((opt, i) => {
            let cls =
              "flex gap-3 items-start rounded-lg border p-3 cursor-pointer transition-colors";
            if (!answered) {
              cls += " border-border bg-bg-alt hover:border-primary/50";
            } else if (i === q.ans) {
              cls += " border-accent bg-accent/10 cursor-default";
            } else if (i === chosen && !answered) {
              cls += " border-red-500 bg-red-500/10 cursor-default";
            } else if (i === chosen && answered && i !== q.ans) {
              cls += " border-red-500 bg-red-500/10 cursor-default";
            } else {
              cls += " border-border bg-bg-alt cursor-default opacity-60";
            }

            const letterCls =
              answered && i === q.ans
                ? "bg-accent text-white"
                : answered && i === chosen && i !== q.ans
                  ? "bg-red-500 text-white"
                  : "bg-border text-text";

            return (
              <button
                key={i}
                type="button"
                onClick={() => selectAnswer(i)}
                disabled={answered}
                className={cls}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${letterCls}`}
                >
                  {LETTERS[i]}
                </span>
                <span className="text-xs text-left">
                  <span className="block text-text">{opt.en}</span>
                  <span className="block text-text-muted italic">{opt.vi}</span>
                </span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
            <div className="text-text leading-relaxed">
              ✅ <strong>Giải thích:</strong> {q.exp.en}
            </div>
            <div className="text-text-muted italic mt-1 leading-relaxed">
              📝 {q.exp.vi}
            </div>
          </div>
        )}
      </div>

      {answered && cur < total - 1 && (
        <button
          type="button"
          onClick={nextQuestion}
          className="rounded-btn bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Câu tiếp theo →
        </button>
      )}
      {answered && cur === total - 1 && (
        <button
          type="button"
          onClick={() => setDone(true)}
          className="rounded-btn bg-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Xem kết quả →
        </button>
      )}
    </div>
  );
}
