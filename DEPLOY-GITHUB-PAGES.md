# Publish Legal Lounge Live with GitHub Pages

This is a static site. You do not need Node.js, a database, or a paid hosting plan to publish this prototype.

## 1. Create a GitHub repository

1. Sign in to GitHub.
2. Create a new repository named `legal-lounge-live`.
3. For the simplest setup, make it **Public** (GitHub Pages availability depends on your plan and repository settings).
4. Do not add a README, license, or `.gitignore` if you are uploading this folder as-is.

## 2. Upload the project

1. Extract the ZIP on your computer.
2. Open the extracted `legal-lounge-live` folder.
3. Upload all files and folders in that folder to the repository's root. Make sure `.github/workflows/pages.yml` is included.
4. Commit the files to the `main` branch.

## 3. Enable GitHub Pages deployment

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open the **Actions** tab. The workflow named **Deploy Legal Lounge Live to GitHub Pages** should run after a push.
4. When it succeeds, the Pages URL will be shown in the workflow's deployment environment and in **Settings → Pages**. A project site usually follows `https://YOUR-USERNAME.github.io/legal-lounge-live/`.

## 4. Before sharing publicly

- Replace the generic LinkedIn URL in `index.html` with the exact Legal Lounge Live page URL.
- Replace sample articles with reviewed, accurate content and link each card to a real article page.
- Verify case names, citations, dates, and legal propositions against primary sources.
- Add your own logo/favicon and a contact or feedback form destination.
- Add a custom domain later if you have one. Then configure DNS and HTTPS in GitHub Pages settings.

## Important limitations

This version is a static frontend. The quiz and Decision Room run in the visitor's browser. There are no user accounts, saved scores, server-side submissions, newsletter storage, or live legal database. Do not collect confidential client facts through a public form. The educational disclaimer is not a substitute for reviewing the site's legal and privacy requirements.
