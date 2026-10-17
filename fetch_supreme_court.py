"""Fetch publicly listed Supreme Court of India judgment/order links.

This is a best-effort parser for public HTML pages, not an official API client.
It intentionally does not submit forms, bypass CAPTCHA, or fetch restricted case status.
"""
import json
import os
import re
from datetime import datetime, timezone
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

HOME = "https://www.sci.gov.in/"
PAGES = {
    "judgment": "https://www.sci.gov.in/",
    "order": "https://www.sci.gov.in/latest-orders/",
}
OUT = "data/supreme-court-latest.json"
HEADERS = {
    "User-Agent": "LegalLoungeLive/1.0 (public legal education; link index)",
    "Accept": "text/html,application/xhtml+xml",
}

def clean(value):
    return re.sub(r"\s+", " ", value or "").strip()

def valid_official_url(url):
    parsed = urlparse(url)
    return parsed.scheme == "https" and (parsed.hostname == "www.sci.gov.in" or parsed.hostname == "sci.gov.in")

def records_from_homepage(html):
    soup = BeautifulSoup(html, "html.parser")
    records = []
    headings = soup.find_all(["h3", "h4", "h5"])
    for heading in headings:
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
                # Keep only case-like records, not generic navigation links.
                if not (re.search(r"\b(vs?\.?|versus)\b", title, re.I) or re.search(r"\b(?:C\.A\.|SLP|W\.P\.|Crl\.|R\.P\.|Diary Number)\b", title, re.I)):
                    continue
                records.append({"type": typ, "title": title, "url": href, "source": HOME})
    return records

def records_from_orders(html, url):
    soup = BeautifulSoup(html, "html.parser")
    records = []
    # Dedicated latest-orders page has case titles in list/table rows.
    for row in soup.find_all(["tr", "li", "article"]):
        text = clean(row.get_text(" ", strip=True))
        if not text or not re.search(r"\b(vs?\.?|versus)\b", text, re.I):
            continue
        anchors = row.find_all("a", href=True)
        for a in anchors:
            title = clean(a.get_text(" ", strip=True)) or text
            href = urljoin(url, a["href"])
            if valid_official_url(href):
                records.append({"type": "order", "title": title, "url": href, "source": url})
                break
    return records

def main():
    session = requests.Session()
    session.headers.update(HEADERS)
    records = []
    # The homepage exposes both Judgments and Orders sections; use it as the primary source.
    response = session.get(HOME, timeout=30)
    response.raise_for_status()
    records.extend(records_from_homepage(response.text))
    # Add order entries from the dedicated page if accessible.
    try:
        r = session.get(PAGES["order"], timeout=30)
        r.raise_for_status()
        records.extend(records_from_orders(r.text, PAGES["order"]))
    except requests.RequestException as exc:
        print(f"Note: dedicated orders page unavailable; using homepage records only ({exc})")

    deduped=[]; seen=set()
    for item in records:
        key=(item["type"], item["title"], item["url"])
        if key not in seen:
            seen.add(key); deduped.append(item)
    if not deduped:
        raise RuntimeError("No case records extracted. Source markup may have changed; existing JSON was left untouched.")
    payload={
        "source_name":"Supreme Court of India",
        "source_url":HOME,
        "fetched_at_utc":datetime.now(timezone.utc).isoformat(),
        "count":len(deduped[:100]),
        "notice":"Unofficial index of links collected from publicly visible pages. Verify the original court record. This is not an official Supreme Court publication.",
        "items":deduped[:100],
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    temp=OUT+".tmp"
    with open(temp,"w",encoding="utf-8") as f: json.dump(payload,f,ensure_ascii=False,indent=2)
    os.replace(temp,OUT)
    print(f"Saved {payload['count']} records to {OUT}")

if __name__ == "__main__":
    main()
