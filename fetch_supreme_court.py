"""Fetch publicly listed Supreme Court of India judgment/order links.

This is a best-effort parser for public HTML pages, designed to index public
case titles and official view-pdf links for educational reference.

Exit code behavior:
  * records found            -> data file updated, exit 0
  * court site unreachable    -> data file kept untouched, logs warning, exit 0
    (Prevents spurious daily workflow failures when court WAF or server is down)
"""
import json
import os
import re
import sys
from datetime import datetime, timezone
from urllib.parse import parse_qs, urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

HOME = "https://www.sci.gov.in/"
SOURCES = [
    ("home", HOME),
    ("orders", "https://www.sci.gov.in/latest-orders/"),
    ("judgments", "https://www.sci.gov.in/latest-judgements/"),
]
OUT = "data/supreme-court-latest.json"
MAX_ITEMS = 100

# Realistic modern browser headers to avoid automated 403 blocks from court WAF
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
    "Sec-Ch-Ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
}

EMPTY_MARKERS = ("no records found", "no documents found")
BLOCK_WORDS = ("access denied", "request rejected", "captcha", "forbidden", "verify you are human", "just a moment")


def clean(value):
    return re.sub(r"\s+", " ", value or "").strip()


def valid_official_url(url):
    parsed = urlparse(url)
    return parsed.scheme == "https" and parsed.hostname in ("www.sci.gov.in", "sci.gov.in")


def records_from_view_pdf_links(soup, base):
    """Any link to the court's /view-pdf/ viewer is a judgment (type=j) or an order (type=o)."""
    records = []
    for a in soup.find_all("a", href=True):
        href = urljoin(base, a["href"])
        parsed = urlparse(href)
        if not valid_official_url(href) or "/view-pdf" not in parsed.path:
            continue
        query = parse_qs(parsed.query)
        kind = (query.get("type") or [""])[0].lower()
        if kind not in ("j", "o") or "diary_no" not in query:
            continue
        title = clean(a.get_text(" ", strip=True))
        if title:
            records.append({"type": "judgment" if kind == "j" else "order", "title": title, "url": href, "source": base})
    return records


def records_from_homepage_sections(soup):
    """Older or alternative homepage sections followed by lists of links."""
    records = []
    for heading in soup.find_all(["h3", "h4", "h5"]):
        label = clean(heading.get_text(" ", strip=True)).lower()
        if label not in ("judgments", "orders"):
            continue
        typ = "judgment" if label == "judgments" else "order"
        node = heading
        for _ in range(600):
            node = node.find_next()
            if node is None:
                break
            if getattr(node, "name", None) in ("h3", "h4", "h5"):
                next_label = clean(node.get_text(" ", strip=True)).lower()
                if next_label in ("updates", "judgments", "orders", "listing notices") and next_label != label:
                    break
            if getattr(node, "name", None) == "a" and node.get("href"):
                title = clean(node.get_text(" ", strip=True))
                href = urljoin(HOME, node["href"])
                if not title or title.lower() in {"view all", "read more"} or not valid_official_url(href):
                    continue
                if not (re.search(r"\b(vs?\.?|versus)\b", title, re.I) or re.search(r"\b(?:C\.A\.|SLP|W\.P\.|Crl\.|R\.P\.|Diary Number)\b", title, re.I)):
                    continue
                records.append({"type": typ, "title": title, "url": href, "source": HOME})
    return records


def records_from_order_rows(soup, url):
    """Dedicated orders/judgments page: case titles in list or table rows."""
    records = []
    for row in soup.find_all(["tr", "li", "article"]):
        text = clean(row.get_text(" ", strip=True))
        if not text or not re.search(r"\b(vs?\.?|versus)\b", text, re.I):
            continue
        for a in row.find_all("a", href=True):
            title = clean(a.get_text(" ", strip=True)) or text
            href = urljoin(url, a["href"])
            if valid_official_url(href):
                typ = "judgment" if "judgment" in url.lower() else "order"
                records.append({"type": typ, "title": title, "url": href, "source": url})
                break
    return records


def make_session():
    session = requests.Session()
    session.headers.update(HEADERS)
    retry = Retry(total=3, backoff_factor=2, status_forcelist=(429, 500, 502, 503, 504), allowed_methods=("GET",))
    session.mount("https://", HTTPAdapter(max_retries=retry))
    return session


def collect(session):
    """Read every source page. Returns (records, report)."""
    records, report = [], {"fetched": 0, "empty_pages": [], "problems": []}
    for name, url in SOURCES:
        try:
            response = session.get(url, timeout=30)
            response.raise_for_status()
        except requests.RequestException as exc:
            report["problems"].append("%s: %s" % (url, exc))
            print("  %-9s FAILED  %s" % (name, exc))
            continue
        report["fetched"] += 1
        soup = BeautifulSoup(response.text, "html.parser")
        text = clean(soup.get_text(" ", strip=True)).lower()

        found = records_from_view_pdf_links(soup, url)
        if name == "home":
            found += records_from_homepage_sections(soup)
        if name in ("orders", "judgments"):
            found += records_from_order_rows(soup, url)

        is_empty = any(marker in text for marker in EMPTY_MARKERS)
        title = clean(soup.title.get_text()) if soup.title else "(no title)"
        print("  %-9s HTTP %s, %d bytes, title=%r, records=%d, says-empty=%s" % (
            name, response.status_code, len(response.content), title[:60], len(found), is_empty))
        if is_empty:
            report["empty_pages"].append(url)
        records.extend(found)
    return records, report


def merge(new_items, old_items):
    """New items first, then earlier items we already had, without duplicates."""
    merged, seen = [], set()
    for item in list(new_items) + list(old_items):
        if not isinstance(item, dict):
            continue
        key = (item.get("type"), item.get("url"))
        if item.get("title") and item.get("url") and key not in seen:
            seen.add(key)
            merged.append(item)
    return merged[:MAX_ITEMS]


def main():
    print("Reading Supreme Court of India public pages...")
    records, report = collect(make_session())

    deduped, seen = [], set()
    for item in records:
        key = (item["type"], item["url"])
        if key not in seen:
            seen.add(key)
            deduped.append(item)

    if not deduped:
        if report["fetched"] == 0:
            print("::warning title=Supreme Court feed::Court pages could not be reached right now (%s). Existing feed retained." % "; ".join(report["problems"]))
            return 0
        print("::warning title=Supreme Court feed::No new records found on court listing pages. Existing feed retained.")
        return 0

    old_items = []
    try:
        with open(OUT, encoding="utf-8") as f:
            old_items = json.load(f).get("items", [])
    except (OSError, ValueError):
        pass

    items = merge(deduped, old_items)
    payload = {
        "source_name": "Supreme Court of India",
        "source_url": HOME,
        "fetched_at_utc": datetime.now(timezone.utc).isoformat(),
        "count": len(items),
        "notice": "Unofficial index of links collected from publicly visible pages. Verify the original court record. This is not an official Supreme Court publication.",
        "items": items,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    temp = OUT + ".tmp"
    with open(temp, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    os.replace(temp, OUT)
    print("Successfully updated %s with %d total records (%d extracted from current run)." % (OUT, len(items), len(deduped)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
