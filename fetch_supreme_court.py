"""Fetch publicly listed Supreme Court of India judgment/order links.

This is a best-effort parser for public HTML pages, not an official API client.
It intentionally does not submit forms, bypass CAPTCHA, or fetch restricted case status.

What the exit code means (so the GitHub Actions run is easy to read):
  * records found          -> data file updated, exit 0
  * court site lists none  -> data file kept as it is, WARNING, exit 0
  * pages changed / blocked -> data file kept as it is, ERROR with diagnostics, exit 1
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
HEADERS = {
    "User-Agent": "LegalLoungeLive/1.0 (+https://legallounge.live; public legal education link index)",
    "Accept": "text/html,application/xhtml+xml",
}
# What the court's own pages say when a list is empty.
EMPTY_MARKERS = ("no records found", "no documents found")
# Words that suggest we were shown an access/verification page instead of the real page.
BLOCK_WORDS = ("access denied", "request rejected", "captcha", "forbidden", "blocked", "verify you are human", "just a moment")


def clean(value):
    return re.sub(r"\s+", " ", value or "").strip()


def valid_official_url(url):
    parsed = urlparse(url)
    return parsed.scheme == "https" and parsed.hostname in ("www.sci.gov.in", "sci.gov.in")


def records_from_view_pdf_links(soup, base):
    """Any link to the court's /view-pdf/ viewer is a judgment (type=j) or an order (type=o).
    This works wherever the links sit on the page, so it survives layout changes."""
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
    """Older layout: 'Judgments' / 'Orders' headings followed by lists of links."""
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
    """Dedicated orders page: case titles in list or table rows."""
    records = []
    for row in soup.find_all(["tr", "li", "article"]):
        text = clean(row.get_text(" ", strip=True))
        if not text or not re.search(r"\b(vs?\.?|versus)\b", text, re.I):
            continue
        for a in row.find_all("a", href=True):
            title = clean(a.get_text(" ", strip=True)) or text
            href = urljoin(url, a["href"])
            if valid_official_url(href):
                records.append({"type": "order", "title": title, "url": href, "source": url})
                break
    return records


def has_judgment_or_order_headings(soup):
    for heading in soup.find_all(["h1", "h2", "h3", "h4", "h5"]):
        if clean(heading.get_text(" ", strip=True)).lower() in ("judgments", "orders", "latest judgements", "latest orders"):
            return True
    return False


def make_session():
    session = requests.Session()
    session.headers.update(HEADERS)
    retry = Retry(total=3, backoff_factor=2, status_forcelist=(429, 500, 502, 503, 504), allowed_methods=("GET",))
    session.mount("https://", HTTPAdapter(max_retries=retry))
    return session


def collect(session):
    """Read every source page. Returns (records, report) where report explains what was seen."""
    records, report = [], {"fetched": 0, "empty_pages": [], "heading_pages": [], "block_pages": [], "problems": []}
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
        if name == "orders":
            found += records_from_order_rows(soup, url)
        is_empty = any(marker in text for marker in EMPTY_MARKERS)
        headings = has_judgment_or_order_headings(soup)
        blocked = [w for w in BLOCK_WORDS if w in text]
        title = clean(soup.title.get_text()) if soup.title else "(no title)"
        print("  %-9s HTTP %s, %d bytes, title=%r, records=%d, says-empty=%s, judgment/order-headings=%s%s" % (
            name, response.status_code, len(response.content), title[:60], len(found), is_empty, headings,
            (", looks-like-access-page=%s" % blocked) if blocked and not found else ""))
        if is_empty:
            report["empty_pages"].append(url)
        if headings:
            report["heading_pages"].append(url)
        if blocked and not found:
            report["block_pages"].append(url)
        if name == "home" and not found:
            print("  homepage text starts: %s" % text[:240])
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
    print("Reading the Supreme Court of India public pages...")
    records, report = collect(make_session())

    deduped, seen = [], set()
    for item in records:
        key = (item["type"], item["url"])
        if key not in seen:
            seen.add(key)
            deduped.append(item)

    if not deduped:
        if report["fetched"] == 0:
            print("::error title=Supreme Court feed::None of the court pages could be fetched. Details: %s" % "; ".join(report["problems"]))
            return 1
        if report["empty_pages"] or report["heading_pages"]:
            print("::warning title=Supreme Court feed::The court's website currently lists no judgments or orders "
                  "(its own pages say 'No records found'). Your saved data was kept and will update automatically when the court lists new items.")
            return 0
        reason = "the pages look like an access or verification page" if report["block_pages"] else "the Judgments/Orders sections were not found, so the page layout has probably changed"
        print("::error title=Supreme Court feed::No records extracted and %s. Existing JSON was left untouched. See the lines above for what was received." % reason)
        return 1

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
    print("Saved %d records to %s (%d new from the court's pages)." % (len(items), OUT, len(deduped)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
