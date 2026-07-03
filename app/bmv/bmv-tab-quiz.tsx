// Tab 5: Thi Thử — Quiz tab using BmvQuizEngine. Ported from bmv.html #mock.

import { BmvQuizEngine } from "../components/bmv-quiz-engine";
import { BMV_QUESTIONS, BMV_PASS_COUNT } from "./bmv-data";

export function BmvTabQuiz() {
  return (
    <div>
      <div className="mb-3 text-base font-bold text-text border-b border-border pb-2">
        🎯 Thi Thử — Mô Phỏng Bài Thi BMV Thật
      </div>

      <div className="mb-4 flex gap-3 rounded-card border border-primary/20 bg-primary/5 p-3 text-sm text-text">
        <span className="text-lg flex-shrink-0">ℹ️</span>
        <div>
          Bài thi thử gồm <strong>30 câu</strong> (20 luật + 10 biển báo) —
          song ngữ Anh–Việt. Mục tiêu: đạt ≥ 24/30 trước khi đến BMV. Bấm vào
          đáp án để xem giải thích.
        </div>
      </div>

      <BmvQuizEngine questions={BMV_QUESTIONS} passCount={BMV_PASS_COUNT} />
    </div>
  );
}
