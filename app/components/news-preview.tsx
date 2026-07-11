/**
 * News preview list — ported from index.html:355-380's `.news-preview`
 * block. Phase 4: wired to the same curated dataset (SORTED_NEWS) the
 * "Chính Sách EB-3" tab on /news renders, instead of a hand-duplicated copy.
 */
import { SORTED_NEWS, getTagClass } from "../news/news-data";

const PREVIEW_COUNT = 5;

export function NewsPreview() {
  const items = SORTED_NEWS.slice(0, PREVIEW_COUNT);

  return (
    <div className="rounded-card border border-border bg-bg p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-text">📰 Tin Tức Mới Nhất</p>
        <a
          href="/news"
          className="text-sm font-medium text-primary hover:underline"
        >
          Xem tất cả →
        </a>
      </div>
      <ul className="mt-3 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-2">
            <span
              className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${getTagClass(item.tags[0])}`}
            >
              {item.tags[0]}
            </span>
            <div>
              <p className="text-sm text-text">{item.title}</p>
              <p className="text-xs text-text-muted">
                {item.date} · {item.source}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
