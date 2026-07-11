// ─── Timeline Steps sub-component ────────────────────────────────────────────
// Renders a vertical step-by-step timeline for the interview projection.

export interface TimelineStepsProps {
  projectedCurrent: Date;
  nvcStart: Date;
  nvcEnd: Date;
  interviewStart: Date;
  interviewEnd: Date;
  arriveBy: Date;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });
}

interface Step {
  icon: string;
  title: string;
  date: string;
  note: string;
}

export function TimelineSteps({
  projectedCurrent,
  nvcStart,
  nvcEnd,
  interviewStart,
  interviewEnd,
  arriveBy,
}: TimelineStepsProps) {
  const steps: Step[] = [
    {
      icon: "✅",
      title: "PD Đạt Ngưỡng (Projected)",
      date: fmtDate(projectedCurrent),
      note: "Visa Bulletin mở cửa sổ cho Priority Date của bạn",
    },
    {
      icon: "📁",
      title: "NVC Xử Lý Hồ Sơ",
      date: `${fmtDate(nvcStart)} – ${fmtDate(nvcEnd)}`,
      note: "National Visa Center nhận hồ sơ, yêu cầu tài liệu (+2–4 tháng)",
    },
    {
      icon: "🏛️",
      title: "Phỏng Vấn Lãnh Sự Quán",
      date: `${fmtDate(interviewStart)} – ${fmtDate(interviewEnd)}`,
      note: "Đặt lịch và tham dự phỏng vấn tại lãnh sự quán (+1–3 tháng sau NVC)",
    },
    {
      icon: "📄",
      title: "Cấp Thị Thực",
      date: "2–4 tuần sau phỏng vấn",
      note: "Hộ chiếu được trả về kèm visa nhập cảnh",
    },
    {
      icon: "✈️",
      title: "Đến Mỹ",
      date: `trước ${fmtDate(arriveBy)}`,
      note: "Phải nhập cảnh trong vòng 6 tháng kể từ ngày cấp visa",
    },
  ];

  return (
    <div className="mt-2">
      <div className="relative">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-3">
            {/* Left column: dot + connecting line */}
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-bg text-base">
                {step.icon}
              </div>
              {idx < steps.length - 1 && (
                <div className="mt-0.5 w-0.5 flex-1 bg-border" style={{ minHeight: "2rem" }} />
              )}
            </div>

            {/* Right column: content */}
            <div className="pb-5">
              <div className="text-sm font-bold text-text">{step.title}</div>
              <div className="text-sm font-semibold text-primary">{step.date}</div>
              <div className="mt-0.5 text-[11px] text-text-muted">{step.note}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
        ⚠️ Ước tính dựa trên tốc độ tiến gần đây. VB có thể retrogress bất kỳ lúc nào. Tham khảo
        thêm tại{" "}
        <a href="/visa-bulletin" className="underline">
          /visa-bulletin
        </a>
        .
      </p>
    </div>
  );
}
