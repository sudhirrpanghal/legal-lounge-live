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
| Legal Lounge event | Events page › "Legal Lounge events" |
| Worldwide event | Events page › "Other worldwide events" |

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

**Events:** choose *Legal Lounge event* (our own) or *Worldwide event* (others). Fill in the title, description, **Category** (free text such as "Moot court competition", "Essay writing" or "Drafting": it appears in gold at the top of the card), **Last date** and **Event link**. Events are listed soonest last date first and disappear automatically after their last date (leave it empty to keep an event listed). Visitors can send events from the form at the bottom of the Events page; those arrive as *Worldwide event* / Pending, and you can edit and approve them under the *Worldwide events* filter.

**Google Analytics:** the tag (ID `G-FNQ5QP15F7`) is added to every public page by `tools/sync-nav.py`. It is not on the admin dashboard. New pages get it automatically the next time you run the tool. The privacy page explains the cookies and data involved.

**Welcome pop-up:** new visitors see a "Join the Lounge" pop-up with our social accounts about 6 seconds after a page opens. Once closed, it stays away for 14 days on that browser. It is not shown on the Join the Lounge, Join Us, Newsletter, 404 and admin pages. To preview it, add `?welcome=1` to any page address (for example `https://legallounge.live/?welcome=1`). To change the wording, links, delay (`DELAY_MS`) or number of days (`REPEAT_DAYS`), edit `welcome-popup.js`. Clicks and closes are recorded as `welcome_popup` events in Google Analytics.
