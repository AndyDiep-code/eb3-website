#!/usr/bin/env python3
"""
Fetch and filter news from justice.gov (via Google News) and DOL/USCIS.
Runs via GitHub Actions daily. Outputs data/news-legal.json and data/news-uscis.json.
"""

import json, re, sys, time, hashlib, html as html_mod
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.error import URLError

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; EB3VIET-bot/1.0; +https://eb3viet.com)"}

def fetch(url, timeout=15):
    try:
        req = Request(url, headers=HEADERS)
        with urlopen(req, timeout=timeout) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  WARN fetch failed {url}: {e}", file=sys.stderr)
        return ""

def clean_text(s):
    """Unescape HTML entities then strip any remaining tags."""
    s = html_mod.unescape(s)
    s = re.sub(r"<[^>]+>", "", s)
    return s.strip()

def parse_rss(xml):
    items = re.findall(r"<item>(.*?)</item>", xml, re.DOTALL)
    results = []
    for item in items:
        def g(tag):
            m = re.search(rf"<{tag}[^>]*>(.*?)</{tag}>", item, re.DOTALL)
            return clean_text(m.group(1)) if m else ""
        title = g("title")
        link  = g("link")
        pub   = g("pubDate")
        desc_raw = g("description").replace("\xa0", " ").strip()
        # Google News desc is either a URL or just the title repeated — discard both
        is_url = desc_raw.startswith("http")
        is_title_repeat = title and desc_raw.lower().startswith(title[:30].lower())
        desc = "" if (is_url or is_title_repeat or len(desc_raw) < 20) else desc_raw[:300]
        results.append({"title": title, "link": link, "desc": desc, "pub": pub})
    return results

def parse_date(s):
    """Return ISO date string, fallback to today."""
    for fmt in ("%a, %d %b %Y %H:%M:%S %Z", "%a, %d %b %y %H:%M:%S %z",
                "%a, %d %b %Y %H:%M:%S %z", "%Y-%m-%dT%H:%M:%SZ"):
        try:
            return datetime.strptime(s.strip(), fmt).strftime("%Y-%m-%d")
        except:
            pass
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")

def uid(title, link):
    return hashlib.md5((title + link).encode()).hexdigest()[:12]


# ─── SOURCE 1: justice.gov Vietnamese community news ─────────────────────────

LEGAL_QUERIES = [
    "site:justice.gov vietnamese",
    "site:justice.gov vietnamese community fraud",
    "site:justice.gov labor trafficking immigrant",
    "site:justice.gov employer wage theft workers",
    "site:justice.gov immigration fraud scheme",
]

LEGAL_KEYWORDS = [
    "vietnamese", "viet", "labor trafficking", "human trafficking",
    "wage theft", "wage and hour", "immigration fraud", "immigration scheme",
    "worker exploitation", "forced labor", "employer convicted",
    "immigration scam", "immigrant workers", "undocumented",
    "asylum fraud", "visa fraud", "work visa", "employment visa",
]

def fetch_legal_news():
    seen = set()
    results = []
    for q in LEGAL_QUERIES:
        url = f"https://news.google.com/rss/search?q={q.replace(' ','+')}&hl=en-US&gl=US&ceid=US:en"
        xml = fetch(url)
        if not xml:
            continue
        items = parse_rss(xml)
        for item in items:
            text = (item["title"] + " " + item["desc"]).lower()
            relevant = any(kw in text for kw in LEGAL_KEYWORDS)
            if not relevant:
                continue
            key = uid(item["title"], item["link"])
            if key in seen:
                continue
            seen.add(key)
            results.append({
                "id": key,
                "title": item["title"],
                "link": item["link"],
                "desc": item["desc"][:280],
                "date": parse_date(item["pub"]),
                "source": "justice.gov",
                "category": "legal"
            })
        time.sleep(1)

    results.sort(key=lambda x: x["date"], reverse=True)
    return results[:40]


# ─── SOURCE 2: DOL & USCIS ───────────────────────────────────────────────────

DOL_URL = "https://www.dol.gov/rss/releases.xml"

DOL_KEYWORDS = [
    "wage", "worker", "employer", "overtime", "minimum wage", "h-2a", "h-2b",
    "poultry", "meatpack", "farm", "labor", "immigration", "foreign worker",
    "staffing", "eb-", "employment-based", "visa", "perm", "whd", "osha",
    "hour division", "misclassif", "retaliat", "backpay", "back wages",
]

USCIS_QUERIES = [
    "site:uscis.gov employment based visa",
    "site:uscis.gov EB-3 priority date",
    "site:uscis.gov filing fee change",
    "site:uscis.gov I-140 processing",
    "site:uscis.gov form update",
]

def fetch_gov_news():
    seen = set()
    results = []

    # DOL RSS
    xml = fetch(DOL_URL)
    if xml:
        for item in parse_rss(xml):
            text = (item["title"] + " " + item["desc"]).lower()
            if any(kw in text for kw in DOL_KEYWORDS):
                key = uid(item["title"], item["link"])
                if key not in seen:
                    seen.add(key)
                    results.append({
                        "id": key,
                        "title": item["title"],
                        "link": item["link"],
                        "desc": item["desc"][:280],
                        "date": parse_date(item["pub"]),
                        "source": "DOL",
                        "category": "dol"
                    })

    # USCIS via Google News
    for q in USCIS_QUERIES:
        url = f"https://news.google.com/rss/search?q={q.replace(' ','+')}&hl=en-US&gl=US&ceid=US:en"
        xml = fetch(url)
        if xml:
            for item in parse_rss(xml):
                key = uid(item["title"], item["link"])
                if key not in seen:
                    seen.add(key)
                    results.append({
                        "id": key,
                        "title": item["title"],
                        "link": item["link"],
                        "desc": item["desc"][:280],
                        "date": parse_date(item["pub"]),
                        "source": "USCIS",
                        "category": "uscis"
                    })
        time.sleep(1)

    results.sort(key=lambda x: x["date"], reverse=True)
    return results[:50]


# ─── MAIN ────────────────────────────────────────────────────────────────────

def load_existing(path):
    try:
        with open(path) as f:
            return {x["id"]: x for x in json.load(f).get("items", [])}
    except:
        return {}

def merge(existing, fresh):
    merged = dict(existing)
    for item in fresh:
        merged[item["id"]] = item
    out = sorted(merged.values(), key=lambda x: x["date"], reverse=True)
    return out[:60]

def save(path, items, updated):
    with open(path, "w") as f:
        json.dump({"updated": updated, "items": items}, f, ensure_ascii=False, indent=2)
    print(f"  Saved {len(items)} items → {path}")

now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

print("Fetching legal news (justice.gov)...")
legal_fresh = fetch_legal_news()
legal_existing = load_existing("data/news-legal.json")
legal_merged = merge(legal_existing, legal_fresh)
save("data/news-legal.json", legal_merged, now)

print("Fetching gov news (DOL + USCIS)...")
gov_fresh = fetch_gov_news()
gov_existing = load_existing("data/news-uscis.json")
gov_merged = merge(gov_existing, gov_fresh)
save("data/news-uscis.json", gov_merged, now)

print("Done.")
