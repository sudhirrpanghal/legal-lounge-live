# Legal Lounge Live (Version 7)

Static website for GitHub Pages. No build step is needed.

## Before you publish: do this once
1. **LinkedIn:** the site links to https://www.linkedin.com/company/legal-lounge-live/ Change it only if your page address changes. It appears in `index.html`, `community.html`, `contact.html` and every footer.
2. **Check the site address.** Meta tags, `sitemap.xml` and `robots.txt` use `https://sudhirrpanghal.github.io/legal-lounge-live/`. If you change the repository name or add a custom domain, replace that address everywhere.
3. **Review the legal pages** (`privacy.html`, `disclaimer.html`) and adjust them to your needs. If you later add analytics or a signup form, update the privacy policy.
4. **Verify every case name, citation and statute** against official sources before sharing. The articles and case notes are educational summaries.

## Upload
Upload the contents of this folder to the root of your repository (do not upload the enclosing folder). Keep your existing `.github/workflows/pages.yml`. The file `.nojekyll` must keep its leading dot. Delete the old v1.2 files (`PROJECT-STATUS.md`, `DEPLOY-GITHUB-PAGES.md`, `styles_1.css`, `script_1.js`, `index_1.html`, `README_1.md`) if they are in the repository.

## After publishing
Paste a page link into LinkedIn's Post Inspector (linkedin.com/post-inspector) to refresh the preview card.

## Files
`index.html`, `articles.html`, three `article-*.html` pages, `case-law.html`, `learning.html`, `decision-room.html`, `glossary.html`, `section-finder.html`, `quiz.html`, `moot.html`, `drafting.html`, `careers.html`, `about.html`, `contact.html`, `community.html`, `disclaimer.html`, `privacy.html`, `404.html`, `styles.css`, `script.js`, `tools.js`, `flash.js`, `favicon.svg`, `apple-touch-icon.png`, `og-image.png`, `sitemap.xml`, `robots.txt`, `.nojekyll`.

## New in Version 5 (study tools)
- `section-finder.html`: searchable IPC to BNS, CrPC to BNSS and Evidence Act to BSA table. The mappings were cross-checked against several published concordances, but confirm each one on India Code before you rely on it, and add rows only after checking.
- `case-law.html`: a filterable library of 19 case notes. Check every citation and detail against the law reports.
- `quiz.html`: 41 questions in five subjects, with shuffled options and a review of missed questions. Edit or add questions in the `BANK` list in `tools.js`.

## New in Version 6
- `glossary.html`: a Flashcards mode (shuffle, "I knew it", "Show again later") built from the glossary entries. Add terms to the list and they appear in the deck automatically.
- `moot.html`, `drafting.html`, `careers.html`: guidance pages. They are general learning material. Check them against your own competition rules, court formats and the official exam notices before relying on them.

## New in Version 7
- `search.html` with `search-index.js`: site-wide search. **The index is generated when the site is built.** If you add articles, cases, terms or sections by hand, add a matching entry to `search-index.js` (same format as the existing entries).
- `constitution.html`: 56 key Articles in plain language. Check against India Code before relying.
- `cite-it.html`: citation generator for cases and statutes (common Indian, OSCOLA and Bluebook-style). Confirm against your institution's style guide.
- `know-your-rights.html`: guides to arrest, FIRs, consumer complaints and legal aid. General information only. Re-check the BNSS and consumer rules periodically.
- `exam-hub.html`: CLAT, AIBE, judicial services and UGC-NET overview with official links. Check each link and the current notices before promoting.
- `topics.html`: all content grouped by area of law.
- Case notes now show **related cases** and **related law** links, and the home page has a search box.
- `extras.js`: shared script for search, the citation tool, and links that open a specific case, term or filter.
