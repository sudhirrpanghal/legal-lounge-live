#!/usr/bin/env python3
"""Keep the main menu and the footer links identical on every page.

Edit the MENU list below, then run:   python3 tools/sync-nav.py
from the repository root. Every .html page gets the same menu, the current
page is marked, and the footers get the same content links and the LinkedIn
newsletter link. Safe to run repeatedly.
"""
import glob, os, re

NEWSLETTER = "https://www.linkedin.com/newsletters/the-legal-lounge-weekly-7520867793827880961"

# (file, label, optional css class)
MENU = [
    ("index.html", "Home", "nav-home"),
    ("blogs.html", "Blogs", ""),
    ("journal.html", "Journal", ""),
    ("bare-acts.html", "Bare Acts", ""),
    ("supreme-court-live.html", "Supreme Court Live", ""),
    ("learning.html", "Learning Hub", ""),
    ("careers.html", "Careers &amp; Internships", ""),
    ("decision-room.html", "Decision Room", ""),
]
CTA = ("community.html", "Join the Lounge")

# Pages that belong under another menu item (so that item is highlighted).
BELONGS_TO = {
    "blogs.html": ["write-blog.html", "articles.html"],
    "journal.html": ["research-papers.html", "legal-articles.html", "case-notes.html",
                     "case-law.html", "sample-paper-legal-compliance.html",
                     "sample-article-state-exemptions.html"],
    "bare-acts.html": ["bns-guide.html", "bnss-guide.html", "bsa-guide.html",
                       "criminal-codes.html"],
}

NAV_RE = re.compile(r'<nav\b[^>]*\bid="mainNav"[^>]*>.*?</nav>', re.S)
FOOTER_RE = re.compile(r'<footer\b.*?</footer>', re.S)
# Social links that live only on the Join the Lounge page.
SOCIAL_RE = re.compile(
    r'<a href="https://(?:www\.instagram\.com/legal\.lounge\.live/|whatsapp\.com/channel/[^"]+|chat\.whatsapp\.com/[^"]+)"[^>]*>[^<]*</a>')
LINKEDIN_RE = re.compile(r'(<a href="https://www\.linkedin\.com/company/legal-lounge-live/"[^>]*>[^<]*</a>)')


def current_item(filename):
    name = filename.lower()
    if name.startswith("article-"):
        return "blogs.html"
    for item, pages in BELONGS_TO.items():
        if name in pages:
            return item
    return name


def build_nav(filename):
    current = current_item(filename)
    parts = ['<nav aria-label="Main" class="main-nav" id="mainNav">']
    for href, label, cls in MENU:
        attrs = ""
        if cls:
            attrs += ' class="%s"' % cls
        attrs += ' href="%s"' % href
        if href == current:
            attrs += ' aria-current="page"'
        parts.append("<a%s>%s</a>" % (attrs, label))
    parts.append('<a class="nav-cta" href="%s">%s <span>↗</span></a></nav>' % CTA)
    return "".join(parts)


def fix_footer(footer):
    footer = SOCIAL_RE.sub("", footer)
    if "linkedin.com/newsletters" not in footer:
        footer = LINKEDIN_RE.sub(
            lambda m: m.group(1) + '<a href="%s" rel="noopener" target="_blank">LinkedIn Newsletter ↗</a>' % NEWSLETTER,
            footer, count=1)
    if "blogs.html" not in footer:
        footer = footer.replace(
            '<a href="research-papers.html">Research Papers</a>',
            '<a href="blogs.html">Blogs</a><a href="journal.html">Journal</a><a href="bare-acts.html">Bare Acts</a>', 1)
    return footer


def main():
    changed, no_nav = 0, []
    for path in sorted(glob.glob("*.html")):
        text = open(path, encoding="utf-8").read()
        new = text
        if NAV_RE.search(new):
            new = NAV_RE.sub(lambda m: build_nav(path), new, count=1)
        else:
            no_nav.append(path)
        new = FOOTER_RE.sub(lambda m: fix_footer(m.group(0)), new, count=1)
        if new != text:
            open(path, "w", encoding="utf-8").write(new)
            changed += 1
    print("Updated %d page(s)." % changed)
    if no_nav:
        print("No main menu found in:", ", ".join(no_nav))


if __name__ == "__main__":
    main()
