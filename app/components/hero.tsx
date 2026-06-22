/**
 * Homepage hero — ported from index.html:238-251's `.hero` block, re-skinned
 * to Tailwind tokens. Stage-select widget (`.stage-select`, index.html:255-
 * 264) is intentionally NOT ported here; replaced by a single CTA card to
 * /start (see app/page.tsx) so routing logic lives in one place (DRY).
 */
export function Hero() {
  return (
    <div className="rounded-card bg-primary p-6 text-white sm:p-8">
      <h1 className="text-2xl font-bold sm:text-3xl">
        🇺🇸 EB3 Vietnam Information Hub
      </h1>
      <p className="mt-2 text-white/90">
        Tổng hợp thông tin Visa Bulletin · Quy trình EB-3 · Tin tức chính
        sách dành cho người Việt Nam theo diện lao động EB-3 Other Workers
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-btn bg-white/15 px-3 py-1">
          📅 Visa Bulletin cập nhật hàng tháng
        </span>
        <span className="rounded-btn bg-white/15 px-3 py-1">
          📰 25+ tin tức chính sách
        </span>
        <span className="rounded-btn bg-white/15 px-3 py-1">
          ❓ 47 câu hỏi thường gặp
        </span>
        <span className="rounded-btn bg-white/15 px-3 py-1">
          🌐 Song ngữ Việt–Anh
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href="/visa-bulletin"
          className="rounded-btn bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-white/90"
        >
          📅 Xem Visa Bulletin
        </a>
        <a
          href="/guides"
          className="rounded-btn border border-white/60 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          📖 Hướng dẫn EB-3
        </a>
      </div>
    </div>
  );
}
