# Legal Lounge Live — Enhancement package

This package builds on the supplied version 1.2 repository and preserves its navy-and-gold design, existing pages, assets, and GitHub Pages workflow.

## Changes in this package
- Case Law Library: added court and decision-year filters alongside the existing text search and subject filters.
- Case notes: added primary-source search links for Supreme Court of India cases and case-law search links for UK/Privy Council examples.
- Case library wording now labels the entries as learning summaries and clarifies that source links are search portals, not proof that every citation or subsequent treatment has been independently verified.
- Existing article pages, Learning Hub, tools, images, and deployment workflow are preserved.

## Important content status
The existing summaries have not all been independently re-researched in this update. Before relying on or publishing a case note as authoritative, verify the case name, citation, judgment text, current statutory position, and subsequent treatment. This is a static educational site, not a live court database.

## Deploy
1. Download and unzip the package.
2. Copy the contents of `legal-lounge-live-main` to the root of the GitHub repository, preserving `.github/workflows/static.yml`.
3. Commit and push to `main`; GitHub Actions should deploy according to the repository settings.
4. After deployment, test `case-law.html` on desktop and mobile and verify every outbound source link.
