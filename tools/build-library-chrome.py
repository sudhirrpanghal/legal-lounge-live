"""Keep the Bare Acts Library header and footer identical to the site.

Copies only the header, announcement-bar and footer rules out of styles.css into bare-acts/site-chrome.css.
Run after changing the site header or footer styles:   pip install tinycss2   then   python3 tools/build-library-chrome.py
"""
import re, sys, tinycss2
SRC = sys.argv[1] if len(sys.argv) > 1 else "styles.css"
OUT = sys.argv[2] if len(sys.argv) > 2 else "bare-acts/site-chrome.css"
KEEP = re.compile(r'\.(announcement|site-header|brand(?:-mark|-word)?|menu-toggle|main-nav|nav-cta|nav-home|site-footer|footer-[a-z]+|copyright|skip-link|container)\b')
rules = tinycss2.parse_stylesheet(open(SRC, encoding='utf8').read(), skip_comments=True, skip_whitespace=True)
def sel_text(rule): return tinycss2.serialize(rule.prelude).strip()
def keep_selectors(sel):
    parts = [p.strip() for p in sel.split(',')]
    kept = [p for p in parts if KEEP.search(p) and not re.search(r'\.(button|case-|decision-|newsletter-|article-|hero|section|page-)', p)]
    return ', '.join(kept)
out = []; root_vars = None; n = 0
for r in rules:
    if r.type == 'qualified-rule':
        s = sel_text(r)
        if s == ':root': root_vars = tinycss2.serialize(r.content).strip(); continue
        k = keep_selectors(s)
        if k: out.append('%s{%s}' % (k, tinycss2.serialize(r.content).strip())); n += 1
    elif r.type == 'at-rule' and r.lower_at_keyword == 'media' and r.content:
        inner = []
        for ir in tinycss2.parse_rule_list(r.content, skip_comments=True, skip_whitespace=True):
            if ir.type == 'qualified-rule':
                k = keep_selectors(sel_text(ir))
                if k: inner.append('%s{%s}' % (k, tinycss2.serialize(ir.content).strip())); n += 1
        if inner: out.append('@media%s{%s}' % (tinycss2.serialize(r.prelude), ''.join(inner)))
header = '/* Legal Lounge Live site header, announcement bar and footer styles.\n   Generated from the site stylesheet (styles.css) so the Bare Acts Library matches the rest of the site. */\n'
scope = '.announcement,.site-header,.site-footer,.skip-link{--navy:#101f35;--navy2:#172a45;--gold:#c6a56a;--gold-dark:#9b7840;--ink:#172337;--muted:#647184;--paper:#fffdfa;--cream:#f5f1e8;--line:#e4e1da;--sans:"DM Sans",Arial,sans-serif;--serif:"Playfair Display",Georgia,serif;font-family:var(--sans)}\n'
glue = '.announcement,.site-header,.site-footer{box-sizing:border-box}.announcement *,.site-header *,.site-footer *{box-sizing:border-box}:where(.site-header a,.site-footer a,.announcement a){color:inherit;text-decoration:none}.site-header button{font:inherit}\n'
open(OUT, 'w', encoding='utf8').write(header + scope + glue + '\n'.join(out) + '\n')
print('rules kept:', n, '| root vars found:', bool(root_vars))
