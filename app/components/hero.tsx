export function Hero() {
  return (
    <div className="overflow-hidden rounded-card border border-border">
      {/* Main gradient banner */}
      <div className="relative bg-gradient-to-r from-[#162e51] via-[#1a4480] to-blue-600 p-6 text-white sm:p-8">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-white/5" />

        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
              🇺🇸 EB-3 Other Workers
            </span>
            <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-semibold text-amber-200">
              🇻🇳 Dành cho người Việt Nam
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-snug sm:text-3xl">
            EB3VIET — Cổng thông tin
            <br />
            <span className="text-blue-200">định cư lao động Mỹ</span>
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-blue-100">
            Tổng hợp Visa Bulletin, quy trình EB-3, tin tức chính sách
            và hướng dẫn thực tế dành cho người Việt Nam
            theo diện lao động EB-3 Other Workers.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href="/visa-bulletin"
              className="rounded-btn bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow hover:bg-blue-50"
            >
              📅 Visa Bulletin
            </a>
            <a
              href="/guides"
              className="rounded-btn border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              📖 Hướng dẫn EB-3
            </a>
            <a
              href="/start"
              className="rounded-btn border border-amber-300/50 bg-amber-400/20 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-400/30"
            >
              ✨ Bắt đầu từ đây
            </a>
          </div>
        </div>
      </div>

      {/* Nav tiles — explicit per-tile borders avoids divide-* grid bug on mobile */}
      <div className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
        {[
          {
            href: "/guides",
            icon: "📋",
            label: "Quy Trình EB-3",
            sub: "Hướng dẫn từng bước",
            iconBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
            hover: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
            // mobile: right + bottom; desktop: right only
            border: "border-r border-b border-border sm:border-b-0",
          },
          {
            href: "/visa-bulletin",
            icon: "📡",
            label: "Theo Dõi & Tin Tức",
            sub: "Visa Bulletin · PERM · Tin tức",
            iconBg: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
            hover: "hover:bg-sky-50 dark:hover:bg-sky-950/30",
            // mobile: bottom only (right edge); desktop: right border added
            border: "border-b border-border sm:border-b-0 sm:border-r",
          },
          {
            href: "/after-arrival",
            icon: "🇺🇸",
            label: "Mới Đến Mỹ",
            sub: "Cuộc sống đầu tiên tại Mỹ",
            iconBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
            hover: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
            // mobile: right only (bottom row left col); desktop: right only
            border: "border-r border-border",
          },
          {
            href: "/bmv",
            icon: "🛠️",
            label: "Các Tiện Ích Khác",
            sub: "Bằng lái · Tài chính · Thẻ xanh",
            iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
            hover: "hover:bg-amber-50 dark:hover:bg-amber-950/30",
            // last tile: no border
            border: "",
          },
        ].map((tile) => (
          <a
            key={tile.href}
            href={tile.href}
            className={`group flex flex-col items-center gap-2 bg-bg px-3 py-5 text-center transition-colors ${tile.border} ${tile.hover}`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${tile.iconBg}`}>
              {tile.icon}
            </span>
            <div>
              <div className="text-sm font-bold text-text group-hover:text-primary">
                {tile.label}
              </div>
              <div className="mt-0.5 text-[11px] leading-tight text-text-muted">
                {tile.sub}
              </div>
            </div>
            <span className="text-xs text-border group-hover:text-primary">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
