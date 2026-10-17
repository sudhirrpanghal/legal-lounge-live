# Legal Lounge Live (Version 9)

Static website for GitHub Pages. No build step is needed.

## Before you publish: do this once
1. **LinkedIn:** the site links to https://www.linkedin.com/company/legal-lounge-live/ Change it only if your page address changes. It appears in `index.html`, `community.html`, `contact.html` and every footer.
2. **Check the site address.** Meta tags, `sitemap.xml` and `robots.txt` use `https://legallounge.live/`. If you change the repository name or add a custom domain, replace that address everywhere.
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

## New in Version 8
**Settings file: `site-config.js`.** Open it in any text editor and fill in what you want. Nothing is shown until you do:
- `authorName`, `authorRole`, `authorBio`, `authorPhoto`: shows your name in article bylines and an author card on the About page.
- `newsletterAction`: the sign-up form address from your email service (Buttondown, Mailchimp and similar). Until it is set, the Newsletter page shows a LinkedIn follow button.
- `goatCounterCode`: turns on GoatCounter visitor counts (create a free GoatCounter account first). If you turn this on, update `privacy.html` to mention it.
- `events`: one line per event for the Events page.

**New study tools:** `my-study.html` (saved items and scores, stored in the visitor's own browser), `mock-test.html` (20 questions in 20 minutes), `case-flashcards.html`, `decision-flows.html` (which writ, valid contract), `maxims.html`, `bare-acts.html`, `amendments.html`, `cheatsheets.html` (print or save as PDF), and `resources.html` (everything in one list).

**New content:** 4 articles (bail, cheque bounce, writs, how to read a bare Act), 32 case notes, 40 glossary terms, 69 quiz questions in six subjects, and a Hindi version of Know Your Rights (`know-your-rights-hi.html`). Have the Hindi page read by a Hindi-speaking lawyer or teacher before promoting it.

**Community pages:** Newsletter, Events, Write for us, and a public Corrections log. Add entries to the corrections table in `corrections.html` as you fix mistakes.

**Other:** `feed.xml` (RSS) and print styles. New articles, cases and terms are not added to search by themselves. Add a matching entry to `search-index.js` when you add content by hand. Case flashcards read from `case-data.js`, so add new cases there too.

**Domain:** the site runs on https://legallounge.live/. The `CNAME` file keeps the domain attached to GitHub Pages, so upload it with the other files. In GitHub, Settings, then Pages, keep **Enforce HTTPS** ticked.
## New in Version 9
- Every web address now uses https://legallounge.live/.
- Links added: WhatsApp Channel, WhatsApp Community, Instagram, LinkedIn and the Google Form for article submissions. They are in the footer of every page, on the Community, Contact, Contribute and Newsletter pages, and on the new Join page (`join.html`), which is built to use as your link in bios.
- WhatsApp share buttons on every article.
- The privacy policy and disclaimer now mention Google Forms, Instagram and WhatsApp. Please read them again and adjust as needed.
- Social links are written directly into the pages. To change one, search the files for its address and replace it.
