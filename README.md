# Legal Lounge Live (Version 4)

Static website for GitHub Pages. No build step is needed.

## Before you publish: do this once
1. **Set your LinkedIn URL.** The files currently use the generic `https://www.linkedin.com/`. In every file, find `https://www.linkedin.com/` and replace it with your Legal Lounge Live LinkedIn page URL. (It appears in `index.html`, `community.html`, `contact.html` and the footer of every page.)
2. **Check the site address.** Meta tags, `sitemap.xml` and `robots.txt` use `https://sudhirrpanghal.github.io/legal-lounge-live/`. If you change the repository name or add a custom domain, replace that address everywhere.
3. **Review the legal pages** (`privacy.html`, `disclaimer.html`) and adjust them to your needs. If you later add analytics or a signup form, update the privacy policy.
4. **Verify every case name, citation and statute** against official sources before sharing. The articles and case notes are educational summaries.

## Upload
Upload the contents of this folder to the root of your repository (do not upload the enclosing folder). Keep your existing `.github/workflows/pages.yml`. The file `.nojekyll` must keep its leading dot. Delete the old v1.2 files (`PROJECT-STATUS.md`, `DEPLOY-GITHUB-PAGES.md`, `styles_1.css`, `script_1.js`, `index_1.html`, `README_1.md`) if they are in the repository.

## After publishing
Paste a page link into LinkedIn's Post Inspector (linkedin.com/post-inspector) to refresh the preview card.

## Files
`index.html`, `articles.html`, three `article-*.html` pages, `case-law.html`, `learning.html`, `decision-room.html`, `glossary.html`, `about.html`, `contact.html`, `community.html`, `disclaimer.html`, `privacy.html`, `404.html`, `styles.css`, `script.js`, `favicon.svg`, `apple-touch-icon.png`, `og-image.png`, `sitemap.xml`, `robots.txt`, `.nojekyll`.
