#!/usr/bin/env python3
"""
One-off mechanical edit (Phase 1, navigation cleanup): insert the new
"Hướng Dẫn Bổ Sung" sb-group into the sidebar of every page that has the
existing grp-greencard ("Sau Khi Có Thẻ Xanh") group.

Anchor: the 3-line sequence that follows the family-petition.html link
(closing </div></div> of grp-greencard, then a sb-divider) is identical
across all target pages (verified via grep before running this script).
The new group is inserted right after that divider.

Idempotent: skips files that already contain id="grp-extra".
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

NEW_GROUP = '''    <div class="sb-group" id="grp-extra">
      <div class="sb-group-label" onclick="toggleGroup('grp-extra')">Hướng Dẫn Bổ Sung<span class="arrow">&#9662;</span></div>
      <div class="sb-group-items">
        <a class="sb-item sub{active_vanhoa}" href="Van_Hoa_My_Danh_Cho_Huy.html"><span class="sb-icon">🎎</span>Văn Hóa Mỹ</a>
        <a class="sb-item sub" href="scam-warning.html"><span class="sb-icon">🚩</span>Cảnh Báo Lừa Đảo</a>
        <!-- PHASE-2-SLOT: documents.html link goes here -->
        <!-- PHASE-3-SLOT: finance-roadmap.html link goes here -->
        <!-- PHASE-4-SLOT: aca-medicaid-guide.html, school-enrollment-guide.html, aos-interview-guide.html links go here -->
      </div>
    </div>'''

# Anchor: family-petition link line, then closing </div></div>, then a divider.
ANCHOR_PATTERN = re.compile(
    r'(<a class="sb-item sub(?: active)?" href="family-petition\.html">.*?</a>\n'
    r'      </div>\n'
    r'    </div>\n'
    r'    <div class="sb-divider"></div>\n)'
)


def process_file(path: Path) -> str:
    """Insert the new sb-group after the anchor. Returns status string."""
    text = path.read_text(encoding="utf-8")

    if 'id="grp-extra"' in text:
        return "skip (already has grp-extra)"

    if 'id="grp-greencard"' not in text:
        return "skip (no grp-greencard)"

    match = ANCHOR_PATTERN.search(text)
    if not match:
        return "ERROR: anchor pattern not found"

    active_vanhoa = " active" if path.name == "Van_Hoa_My_Danh_Cho_Huy.html" else ""
    group = NEW_GROUP.format(active_vanhoa=active_vanhoa)

    insertion_point = match.end()
    new_text = text[:insertion_point] + group + "\n" + text[insertion_point:]
    path.write_text(new_text, encoding="utf-8")
    return "OK"


def main():
    target_files = sorted(
        f for f in REPO_ROOT.glob("*.html")
        if 'id="grp-greencard"' in f.read_text(encoding="utf-8")
    )

    results = {"OK": 0, "skip": 0, "error": 0}
    for f in target_files:
        status = process_file(f)
        if status == "OK":
            results["OK"] += 1
        elif status.startswith("skip"):
            results["skip"] += 1
            print(f"{f.name}: {status}")
        else:
            results["error"] += 1
            print(f"{f.name}: {status}", file=sys.stderr)

    print(f"\nProcessed {len(target_files)} files: {results['OK']} edited, "
          f"{results['skip']} skipped, {results['error']} errors")

    if results["error"] > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
