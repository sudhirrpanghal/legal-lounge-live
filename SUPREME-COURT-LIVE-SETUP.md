# Supreme Court Live integration — Legal Lounge Live

This folder is based on the supplied latest project ZIP. Existing site pages, assets, styles, and the existing `.github/workflows/static.yml` were retained. New functionality is additive.

## Added
- `supreme-court-live.html`: dedicated Supreme Court Live page in the site's existing visual theme.
- `sc-live.js`: search/filter/display for the JSON feed.
- `fetch_supreme_court.py`: best-effort parser for public Supreme Court homepage judgment links and latest-orders page links.
- `data/supreme-court-latest.json`: safe empty initial feed; it will be populated by the first successful workflow run.
- `.github/workflows/update-supreme-court.yml`: daily and manual workflow. It fetches records, commits the JSON when changed, and deploys the site because a `GITHUB_TOKEN` push alone does not normally trigger other workflows.
- A navigation link on the homepage and resources page, CSS additions, and a sitemap entry.

## Before deployment
1. Review the official Supreme Court website policies: https://www.sci.gov.in/website-policies/ . The site says its material is for reference and that third-party copyright may require permission. This integration stores a limited index of public titles and links, not copies of judgments.
2. Upload these files to a branch first, or test on a fork/staging copy. Do not replace your existing project with the starter ZIP.
3. In GitHub, confirm Actions are enabled and workflow permissions permit the workflow to write repository contents and deploy Pages. If GitHub requires an environment approval, approve the `github-pages` deployment.
4. Run **Update Supreme Court feed and deploy** manually once. Inspect the logs and `data/supreme-court-latest.json` before treating the feed as operational.
5. Test `/supreme-court-live.html`, the filters, search, official links, and existing website pages after deployment.

## Known limitations
- This is not an official API integration. It parses publicly visible HTML and may need maintenance if the source markup changes.
- It does not bypass CAPTCHA, access restricted case-status services, or guarantee instant updates.
- The collector intentionally fails without overwriting the last good JSON when no records are extracted.
- Feed entries are an unofficial convenience index. Verify every detail against the official court record.
- The workflow's automatic schedule is once daily at 07:50 India Standard Time. It can also be run manually.
