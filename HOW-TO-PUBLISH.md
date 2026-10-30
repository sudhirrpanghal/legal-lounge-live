# Publishing content (no HTML editing)

Sign in at `https://legallounge.live/admin.html` with Microsoft, open **Add new content**, choose a type, fill the form, then **Preview**, **Save as draft** or **Publish now**.

| Type | Where it appears |
|---|---|
| Blog | Blogs page (`blogs.html`). Visitors can also send blogs from `write-blog.html`. |
| Research paper | Journal › Research Papers |
| Legal article | Journal › Legal Articles |
| Case note | Journal › Case Notes |
| Job / Internship | Careers & Internships page (hidden automatically after the "Apply by" date) |
| Legal Lounge opening | Top of the Join the Lounge page (`community.html`) |

Every published item also gets its own page (`read.html?id=…`) with the full text and Apply / PDF buttons.

**Visitor submissions** (blogs, legal articles, case notes, research papers, jobs, internships) arrive as **Pending**. Use **Edit** to fix them, then **Approve** or **Reject**.
Use the *Blogs / Journal / Jobs & Internships / Lounge openings* filters and the *Pending / Drafts / Published / Rejected* filters to find items.

**Other actions:** Unpublish (back to a draft), Move to drafts (from Rejected), Delete (drafts and rejected items only).

**Legal Lounge openings:** until you publish one, the Join the Lounge page shows the built-in Campus Ambassador card. Once you publish any opening, only your published openings are shown, so add Campus Ambassador again from the dashboard if you want to keep it. Application links can be `https://…` or `mailto:…`.

**Writing tips:** a blank line starts a new paragraph. Use `## Heading`, `- bullet`, `**bold**`, `*italic*` and `[text](https://link)`.

**Menu and footer:** edit the `MENU` list in `tools/sync-nav.py` and run `python3 tools/sync-nav.py`.

**Visitor counter:** shown at the bottom of the homepage. It counts one visit per browser per day. If the service is unreachable the counter hides itself.

**If a page looks unstyled after an upload:** your browser is showing an old saved copy of the stylesheet. Press Ctrl+F5 (Cmd+Shift+R on Mac). To avoid this, run `python3 tools/sync-nav.py` before uploading: it refreshes the version tags (`styles.css?v=…`) on every page so browsers fetch the newest files.

**Glossary:** the glossary page was folded into Legal Maxims. `glossary.html` now redirects to `maxims.html`.
