#!/usr/bin/env python3
"""
Fix the 10 state pages that use class="pane" and class="tabs".
After the upgrade script inserted vocab/signs with class="tab-pane",
we need to:
  1. Add vocab + signs buttons to the <div class="tabs"> nav
  2. Replace class="tab-pane" → class="pane" for newly inserted content
  3. Patch st() to also toggle .tab-pane elements
Run from project root: python scripts/fix-bmv-pane-pages.py
"""

import re, os

# Pages that use class="pane" / class="tabs" / class="tab"
PANE_PAGES = ["bmv-ar", "bmv-az", "bmv-la", "bmv-mn", "bmv-ms",
              "bmv-mt", "bmv-nv", "bmv-oh", "bmv-pa", "bmv-sd"]

ABBR_MAP = {
    "bmv-ar": "AR", "bmv-az": "AZ", "bmv-la": "LA", "bmv-mn": "MN",
    "bmv-ms": "MS", "bmv-mt": "MT", "bmv-nv": "NV", "bmv-oh": "OH",
    "bmv-pa": "PA", "bmv-sd": "SD",
}

def fix_page(fname, abbr_upper):
    fpath = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), fname + ".html")
    with open(fpath, encoding="utf-8") as f:
        content = f.read()

    # 1. Replace entire <div class="tabs"> with correct 5-button version
    # Order: Thông Tin | Từ Vựng | Luật XX | Biển Báo | Thi Thử
    # First, extract the existing rules button label (e.g., "Luật AR")
    rules_label_m = re.search(r'onclick="st\(\'r\'[^>]*>([^<]+)</button>', content)
    rules_label = rules_label_m.group(1).strip() if rules_label_m else f"📜 Luật {abbr_upper}"

    new_tabs = f"""<div class="tabs">
    <button class="tab active" onclick="st('i',this)">📋 Thông Tin</button>
    <button class="tab" onclick="st('v',this)">📖 Từ Vựng</button>
    <button class="tab" onclick="st('r',this)">{rules_label}</button>
    <button class="tab" onclick="st('s',this)">🚦 Biển Báo</button>
    <button class="tab" onclick="st('q',this)">🎯 Thi Thử</button>
  </div>"""

    content = re.sub(r'<div class="tabs">.*?</div>', new_tabs, content, count=1, flags=re.DOTALL)

    # 2. Replace class="tab-pane" → class="pane" for newly inserted vocab/signs divs
    # Only replace in the specific new divs we added
    content = re.sub(r'<div id="v" class="tab-pane">', '<div id="v" class="pane">', content)
    content = re.sub(r'<div id="s" class="tab-pane">', '<div id="s" class="pane">', content)
    content = re.sub(r'<div id="r" class="tab-pane">', '<div id="r" class="pane">', content)

    # 3. Update "start quiz" button index in info tab (was [2] → [4])
    # Only if it references class="tab" buttons
    content = content.replace(
        "document.querySelectorAll('.tab')[2]",
        "document.querySelectorAll('.tab')[4]"
    )

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)

    # Count tabs and panes to verify
    tabs = content.count('class="tab "') + content.count('class="tab active"') + content.count('class="tab"')
    panes = len(re.findall(r'class="pane"', content))
    print(f"  OK: {fname}.html — {tabs} tab buttons, {panes} pane divs")


def main():
    for fname in PANE_PAGES:
        fix_page(fname, ABBR_MAP[fname])


if __name__ == "__main__":
    main()
