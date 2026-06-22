#!/usr/bin/env python3
"""
Fetch Visa Bulletin EB-3 "Other Workers" (EW) dates and Vietnam EW issuance
counts from travel.state.gov. Runs via GitHub Actions (~daily).
Updates data/visa-bulletin.json idempotently.
"""

import json, os, re, subprocess, sys, tempfile
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.error import URLError

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; EB3VIET-bot/1.0; +https://eb3viet.com)"}
JSON_PATH = "data/visa-bulletin.json"

MONTH_NAMES = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
]
MONTH_ABBR = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]


def fetch(url, timeout=20):
    try:
        req = Request(url, headers=HEADERS)
        with urlopen(req, timeout=timeout) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  WARN fetch failed {url}: {e}", file=sys.stderr)
        return ""


def fetch_binary(url, timeout=30):
    try:
        req = Request(url, headers=HEADERS)
        with urlopen(req, timeout=timeout) as r:
            return r.read()
    except Exception as e:
        print(f"  WARN fetch (binary) failed {url}: {e}", file=sys.stderr)
        return b""


def add_months(year, month, offset):
    """Return (year, month) shifted by offset months (1-12 month range)."""
    total = (month - 1) + offset
    return year + total // 12, total % 12 + 1


def month_key(year, month):
    return f"{year}-{month:02d}"


def month_label(year, month):
    return f"{MONTH_ABBR[month - 1]}-{str(year)[2:]}"


# ─── Visa Bulletin: Table A / Table B EW dates ────────────────────────────

def convert_date_token(token):
    """Convert raw VB date token to ISO date, 'Current', or None."""
    token = token.strip()
    if token.upper() == "C":
        return "Current"
    if token.upper() == "U":
        return None
    try:
        return datetime.strptime(token, "%d%b%y").strftime("%Y-%m-%d")
    except ValueError:
        return None


def parse_vb_table(html, heading_regex):
    """
    Find the Employment-Based table following `heading_regex` (Table A or
    Table B heading), then extract the "Other Workers" row's value in the
    "All Chargeability Areas Except Those Listed" column (1st data column).
    Returns the converted value, or None if heading/row not found.
    """
    heading_match = re.search(heading_regex, html, re.IGNORECASE)
    if not heading_match:
        print(f"  WARN heading not found: {heading_regex}", file=sys.stderr)
        return None

    # Scope to the next <table>...</table> after the heading.
    table_match = re.search(
        r"<table[^>]*>(.*?)</table>", html[heading_match.end():], re.DOTALL | re.IGNORECASE
    )
    if not table_match:
        print(f"  WARN no <table> found after heading: {heading_regex}", file=sys.stderr)
        return None

    table_html = table_match.group(1)

    # Row format: <tr><td>Other Workers</td>\n<td>VALUE</td>...
    row_match = re.search(
        r"<tr><td>Other Workers</td>\s*<td>([^<]+)</td>", table_html, re.IGNORECASE
    )
    if not row_match:
        print(f"  WARN 'Other Workers' row not found in table for: {heading_regex}", file=sys.stderr)
        return None

    return convert_date_token(row_match.group(1))


def fetch_vb_dates():
    """
    Try VB pages for current calendar month, then next month.
    Returns ((year, month), {"table_a": ..., "table_b": ...}) or (None, None).
    """
    now = datetime.now(timezone.utc)
    for offset in (0, 1):
        year, month = add_months(now.year, now.month, offset)
        month_name = MONTH_NAMES[month - 1]
        url = (
            f"https://travel.state.gov/content/travel/en/legal/visa-law0/"
            f"visa-bulletin/{year}/visa-bulletin-for-{month_name}-{year}.html"
        )
        print(f"  Trying VB for {month_name} {year}: {url}")
        html = fetch(url)
        if not html or "FINAL ACTION DATES FOR" not in html.upper():
            print(f"    Not found / not yet published.")
            continue

        table_a = parse_vb_table(
            html, r"FINAL ACTION DATES FOR&nbsp;EMPLOYMENT-BASED"
        )
        table_b = parse_vb_table(
            html, r"DATES FOR FILING OF EMPLOYMENT-BASED"
        )
        print(f"    Found VB for {month_name} {year}: table_a={table_a!r}, table_b={table_b!r}")
        return (year, month), {"table_a": table_a, "table_b": table_b}

    return None, None


# ─── IV Issuance: Vietnam EW count ────────────────────────────────────────

IV_INDEX_URL = (
    "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-statistics/"
    "immigrant-visa-statistics/monthly-immigrant-visa-issuances.html"
)


def find_issuance_pdf_url(index_html, year, month):
    """
    Search the IV issuance index page for a link whose text matches
    "{Month} {Year}" and contains "FSC" (covers both "by FSC and Visa Class"
    and "by FSC or Place of Birth and Visa Class" filename variants).
    Returns absolute PDF URL, or None.
    """
    month_name = MONTH_NAMES[month - 1].capitalize()
    target = f"{month_name} {year}"
    pattern = (
        r'<a[^>]+href="([^"]+\.pdf)"[^>]*>\s*'
        + re.escape(target)
        + r"[^<]*FSC[^<]*</a>"
    )
    match = re.search(pattern, index_html, re.IGNORECASE)
    if not match:
        return None
    href = match.group(1)
    if href.startswith("http"):
        return href
    return "https://travel.state.gov" + href


def fetch_ew_issuance():
    """
    Look for the Vietnam EW issuance count in the monthly IV issuance PDF,
    trying lag=1..12 months behind the current calendar month (issuance
    reports lag actual VB month by several months in practice — verified
    2026-06: the most recent DOS report available was September 2025, a
    9-month lag — so a short 1-2 month window misses every real report).
    Stops at the first (most recent) month found, since find_or_create_month_entry
    is idempotent and update_field() never overwrites a non-null value, so
    re-running this with a wider lag window on subsequent days is safe.
    Returns ((year, month), count) or (None, None).
    """
    print(f"  Fetching IV issuance index: {IV_INDEX_URL}")
    index_html = fetch(IV_INDEX_URL)
    if not index_html:
        print("    Could not fetch IV issuance index page.")
        return None, None

    now = datetime.now(timezone.utc)
    for lag in range(1, 13):
        year, month = add_months(now.year, now.month, -lag)
        month_name = MONTH_NAMES[month - 1].capitalize()
        pdf_url = find_issuance_pdf_url(index_html, year, month)
        if not pdf_url:
            print(f"  No IV issuance PDF found for {month_name} {year} (lag={lag}).")
            continue

        print(f"  Found IV issuance PDF for {month_name} {year}: {pdf_url}")
        pdf_bytes = fetch_binary(pdf_url)
        if not pdf_bytes:
            print(f"    Failed to download PDF.")
            continue

        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(pdf_bytes)
            tmp_path = tmp.name

        try:
            result = subprocess.run(
                ["pdftotext", "-layout", tmp_path, "-"],
                capture_output=True, text=True, timeout=60,
            )
        except Exception as e:
            print(f"    WARN pdftotext failed: {e}", file=sys.stderr)
            os.unlink(tmp_path)
            continue
        os.unlink(tmp_path)

        if result.returncode != 0:
            print(f"    WARN pdftotext exited {result.returncode}: {result.stderr.strip()}", file=sys.stderr)
            continue

        count_match = re.search(r"^Vietnam\s+EW\s+(\d+)\s*$", result.stdout, re.MULTILINE)
        if not count_match:
            print(f"    WARN 'Vietnam EW' line not found in PDF text.")
            continue

        count = int(count_match.group(1))
        print(f"    Vietnam EW issuances for {month_name} {year}: {count}")
        return (year, month), count

    return None, None


# ─── Merge into data/visa-bulletin.json ───────────────────────────────────

def load_existing(path):
    with open(path) as f:
        return json.load(f)


def next_fy_start_key(data):
    """Month key one fiscal year after data['fy_start_month'] (e.g. '2025-10' -> '2026-10')."""
    year, month = map(int, data["fy_start_month"].split("-"))
    return month_key(*add_months(year, month, 12))


def find_or_create_month_entry(data, year, month):
    """Find months[] entry for year-month, appending a new one if absent
    (only allowed for the next fiscal year onward, i.e. month >= next_fy_start_key)."""
    key = month_key(year, month)
    for entry in data["months"]:
        if entry["month"] == key:
            return entry

    if key < next_fy_start_key(data):
        return None

    new_entry = {
        "month": key,
        "label": month_label(year, month),
        "table_a": None,
        "table_b": None,
        "ew_vietnam": None,
    }
    data["months"].append(new_entry)
    print(f"  Appended new months[] entry for {key} ({new_entry['label']}).")
    return new_entry


def update_field(entry, field, new_value, month_key_str):
    """Update entry[field] with new_value, never overwriting non-null with
    null. Logs a warning if both non-null and differing (DOS correction)."""
    if new_value is None:
        return
    old_value = entry.get(field)
    if old_value is None:
        entry[field] = new_value
        print(f"  Updated {month_key_str}.{field}: null -> {new_value!r}")
    elif old_value != new_value:
        print(
            f"  WARN {month_key_str}.{field} changed: {old_value!r} -> {new_value!r} "
            f"(possible DOS correction, overwriting)"
        )
        entry[field] = new_value
    # else: identical, no-op (idempotent)


def merge_into_json(data, vb_month, vb_dates, iss_month, iss_count):
    if vb_month and vb_dates:
        entry = find_or_create_month_entry(data, *vb_month)
        if entry is None:
            print(f"  Skipping VB merge: {month_key(*vb_month)} not in months[] and not FY2027+.")
        else:
            key_str = month_key(*vb_month)
            update_field(entry, "table_a", vb_dates.get("table_a"), key_str)
            update_field(entry, "table_b", vb_dates.get("table_b"), key_str)

    if iss_month and iss_count is not None:
        entry = find_or_create_month_entry(data, *iss_month)
        if entry is None:
            print(f"  Skipping issuance merge: {month_key(*iss_month)} not in months[] and not FY2027+.")
        else:
            update_field(entry, "ew_vietnam", iss_count, month_key(*iss_month))


def save(data, path):
    data["updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    with open(path, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"  Saved -> {path}")


# ─── MAIN ──────────────────────────────────────────────────────────────────

def main():
    print("Fetching Visa Bulletin EB-3 Other Workers dates...")
    vb_month, vb_dates = fetch_vb_dates()
    if vb_month is None:
        print("  No Visa Bulletin found for current/next month.")

    print("Fetching Vietnam EW issuance count...")
    iss_month, iss_count = fetch_ew_issuance()
    if iss_month is None:
        print("  No IV issuance data found for recent months.")

    try:
        data = load_existing(JSON_PATH)
    except Exception as e:
        print(f"ERROR could not load {JSON_PATH}: {e}", file=sys.stderr)
        sys.exit(1)

    merge_into_json(data, vb_month, vb_dates, iss_month, iss_count)

    try:
        save(data, JSON_PATH)
    except Exception as e:
        print(f"ERROR could not save {JSON_PATH}: {e}", file=sys.stderr)
        sys.exit(1)

    print("Done.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"FATAL unexpected error: {e}", file=sys.stderr)
        sys.exit(1)
