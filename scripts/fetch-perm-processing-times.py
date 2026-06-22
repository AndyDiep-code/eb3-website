#!/usr/bin/env python3
"""
Fetch DOL's PERM aggregate processing-status snapshot from
flag.dol.gov/processingtimes. Runs via GitHub Actions (~monthly, matching
DOL's own update cadence: "Updated COB at end of first work week of each
month"). Writes data/perm-processing-times.json idempotently.

Aggregate-only: current queue month per review type (Analyst Review, Audit
Review, Reconsideration Request to the CO) + average days to process for
the most recent completed month. No case-level data, no prediction.
"""

import json, re, sys
from datetime import datetime, timezone
from urllib.request import urlopen, Request

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; EB3VIET-bot/1.0; +https://eb3viet.com)"}
SOURCE_URL = "https://flag.dol.gov/processingtimes"
JSON_PATH = "data/perm-processing-times.json"

# Row labels as they literally appear in the "PERM Processing Times" table.
QUEUE_ROW_LABELS = ["Analyst Review", "Audit Review", "Reconsideration Request to the CO"]
# Row labels as they appear in the "Average Number of Days to Process" table
# (only these two determinations are reported there).
AVG_DAYS_ROW_LABELS = ["Analyst Review", "Audit Review"]


def fetch(url, timeout=20):
    try:
        req = Request(url, headers=HEADERS)
        with urlopen(req, timeout=timeout) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  WARN fetch failed {url}: {e}", file=sys.stderr)
        return ""


def strip_tags(text):
    return re.sub(r"<[^>]+>", "", text).strip()


def parse_perm_queue_table(html):
    """
    Parse the "PERM Processing Times" table: Processing Queue -> Priority Date
    (the month/year currently being adjudicated, per review type).
    Returns {review_type: "Month Year"} or {} if not found.
    """
    caption_match = re.search(r"<caption><strong>PERM Processing Times</strong>", html)
    if not caption_match:
        print("  WARN 'PERM Processing Times' caption not found.", file=sys.stderr)
        return {}

    table_match = re.search(
        r"<thead>.*?</thead>\s*<tbody>(.*?)</tbody>", html[caption_match.end():], re.DOTALL
    )
    if not table_match:
        print("  WARN no PERM queue table body found after caption.", file=sys.stderr)
        return {}

    body_html = table_match.group(1)
    result = {}
    for row_match in re.finditer(r"<tr>(.*?)</tr>", body_html, re.DOTALL):
        cells = re.findall(r"<td[^>]*>(.*?)</td>", row_match.group(1), re.DOTALL)
        if len(cells) < 2:
            continue
        label = strip_tags(cells[0])
        value = strip_tags(cells[1])
        if label in QUEUE_ROW_LABELS:
            result[label] = value or None

    missing = set(QUEUE_ROW_LABELS) - set(result.keys())
    if missing:
        print(f"  WARN PERM queue rows not found: {missing}", file=sys.stderr)
    return result


def parse_perm_avg_days_table(html):
    """
    Parse the "Average Number of Days to Process PERM Applications" table:
    Determinations -> (Month, Calendar Days) for the most recent completed
    month. Returns {review_type: {"month": ..., "days": int}} or {}.
    """
    caption_match = re.search(
        r"<caption><strong>Average Number of Days to Process PERM Applications</strong>", html
    )
    if not caption_match:
        print("  WARN 'Average Number of Days...' caption not found.", file=sys.stderr)
        return {}

    table_match = re.search(
        r"<thead>.*?</thead>\s*<tbody>(.*?)</tbody>", html[caption_match.end():], re.DOTALL
    )
    if not table_match:
        print("  WARN no PERM avg-days table body found after caption.", file=sys.stderr)
        return {}

    body_html = table_match.group(1)
    result = {}
    for row_match in re.finditer(r"<tr>(.*?)</tr>", body_html, re.DOTALL):
        cells = re.findall(r"<td[^>]*>(.*?)</td>", row_match.group(1), re.DOTALL)
        if len(cells) < 3:
            continue
        label = strip_tags(cells[0])
        month = strip_tags(cells[1])
        days_text = strip_tags(cells[2])
        if label in AVG_DAYS_ROW_LABELS:
            try:
                days = int(days_text)
            except ValueError:
                print(f"  WARN non-numeric Calendar Days for {label!r}: {days_text!r}", file=sys.stderr)
                days = None
            result[label] = {"month": month or None, "days": days}

    missing = set(AVG_DAYS_ROW_LABELS) - set(result.keys())
    if missing:
        print(f"  WARN PERM avg-days rows not found: {missing}", file=sys.stderr)
    return result


def parse_as_of_date(html):
    """Extract the 'as of M/D/YYYY' date shown in the PERM queue table caption."""
    match = re.search(
        r"<caption><strong>PERM Processing Times</strong>.*?\(as of ([\d/]+)\)", html, re.DOTALL
    )
    return match.group(1) if match else None


def build_snapshot(html):
    queue = parse_perm_queue_table(html)
    avg_days = parse_perm_avg_days_table(html)
    as_of = parse_as_of_date(html)

    if not queue and not avg_days:
        return None

    return {
        "source_as_of": as_of,
        "queue": {
            "analyst_review": queue.get("Analyst Review"),
            "audit_review": queue.get("Audit Review"),
            "reconsideration_review": queue.get("Reconsideration Request to the CO"),
        },
        "average_days": {
            "analyst_review": avg_days.get("Analyst Review"),
            "audit_review": avg_days.get("Audit Review"),
        },
    }


def load_existing(path):
    try:
        with open(path) as f:
            return json.load(f)
    except FileNotFoundError:
        return None


def save(snapshot, path):
    snapshot["updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    with open(path, "w") as f:
        json.dump(snapshot, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"  Saved -> {path}")


def main():
    print(f"Fetching PERM processing times: {SOURCE_URL}")
    html = fetch(SOURCE_URL)
    if not html:
        print("ERROR could not fetch source page; leaving existing data unchanged.", file=sys.stderr)
        sys.exit(1)

    snapshot = build_snapshot(html)
    if snapshot is None:
        print(
            "ERROR could not parse any PERM data from source page "
            "(markup may have changed); leaving existing data unchanged.",
            file=sys.stderr,
        )
        sys.exit(1)

    existing = load_existing(JSON_PATH)
    if existing == {k: v for k, v in snapshot.items() if k != "updated"}:
        print("  No change in PERM processing data; still refreshing 'updated' timestamp.")

    save(snapshot, JSON_PATH)
    print("Done.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"FATAL unexpected error: {e}", file=sys.stderr)
        sys.exit(1)
