/* Legal Lounge Live: welcome pop-up.
 * Invites new visitors to Join the Lounge and shows our social accounts.
 *  - Appears a few seconds after the page opens (never the instant it loads).
 *  - After it is closed, it stays away for REPEAT_DAYS days on this browser.
 *  - Preview it any time by adding ?welcome=1 to a page address.
 *  - It brings its own styles, so it never appears unstyled. */
(function () {
  'use strict';

  var KEY = 'll_welcome_seen';
  var REPEAT_DAYS = 14;       // how long it stays away after being closed
  var DELAY_MS = 6000;        // wait before showing
  var forced = /(?:\?|&)welcome=1(?:&|$)/.test(window.location.search);

  /* ---- remember that it was shown (localStorage, with a session fallback) ---- */
  function readSeen() {
    var v = null;
    try { v = window.localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
    if (!v) { try { v = window.sessionStorage.getItem(KEY); } catch (e2) { /* ignore */ } }
    return v ? parseInt(v, 10) : 0;
  }
  function markSeen() {
    var now = String(Date.now());
    try { window.localStorage.setItem(KEY, now); } catch (e) { /* ignore */ }
    try { window.sessionStorage.setItem(KEY, now); } catch (e2) { /* ignore */ }
  }
  var seenAt = readSeen();
  if (!forced && seenAt && Date.now() - seenAt < REPEAT_DAYS * 86400000) return;

  var URLS = {
    join: 'community.html',
    linkedin: 'https://www.linkedin.com/company/legal-lounge-live/',
    newsletter: 'https://www.linkedin.com/newsletters/the-legal-lounge-weekly-7520867793827880961',
    instagram: 'https://www.instagram.com/legal.lounge.live/',
    channel: 'https://whatsapp.com/channel/0029VbDYBSvHFxOxUT1BV73i',
    community: 'https://chat.whatsapp.com/JJPKbWYQItLJloVaXqENaJ'
  };
  var ICONS = {
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.85h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4z"/>',
    newsletter: '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2v.5l8 5.5 8-5.5V7zm16 3l-8 5.5L4 10v7h16z"/>',
    instagram: '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.3 5.8a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z"/>',
    whatsapp: '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4zm-3 3.4c-.3 0-.6.1-.8.4-.5.6-.9 1.3-.5 2.4.5 1.5 1.7 3.2 3.4 4.4 1.2.8 2.4 1.2 3.2 1.2.9 0 1.7-.6 2-1.3.1-.3 0-.5-.2-.6l-1.8-.9c-.2-.1-.5 0-.6.2l-.6.7c-.1.1-.3.2-.5.1-1-.4-2.3-1.6-2.8-2.6-.1-.2-.1-.4 0-.5l.5-.6c.1-.2.2-.4.1-.6l-.8-1.8c-.1-.2-.3-.3-.5-.3z"/>'
  };
  var SOCIAL = [
    ['linkedin', 'LinkedIn', 'Follow our page', URLS.linkedin, 'linkedin'],
    ['newsletter', 'Newsletter', 'The Legal Lounge Weekly', URLS.newsletter, 'newsletter'],
    ['instagram', 'Instagram', '@legal.lounge.live', URLS.instagram, 'instagram'],
    ['whatsapp', 'WhatsApp Channel', 'Updates and news', URLS.channel, 'whatsapp_channel'],
    ['whatsapp', 'WhatsApp Community', 'Join the discussion', URLS.community, 'whatsapp_community']
  ];

  var CSS = '' +
    '.llw-backdrop{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(13,27,47,.58);opacity:0;transition:opacity .25s ease}' +
    '.llw-backdrop.llw-in{opacity:1}' +
    '.llw-card{position:relative;box-sizing:border-box;width:min(100%,560px);max-height:calc(100vh - 40px);overflow:auto;padding:34px 34px 28px;background:#fffdfa;border-top:4px solid #c6a56a;box-shadow:0 24px 70px rgba(8,16,30,.4);color:#172337;font-family:"DM Sans",Arial,sans-serif;transform:translateY(14px);transition:transform .25s ease;outline:none}' +
    '.llw-in .llw-card{transform:none}' +
    '.llw-card *{box-sizing:border-box}' +
    '.llw-close{position:absolute;top:10px;right:12px;width:38px;height:38px;border:0;background:transparent;color:#101f35;font-size:28px;line-height:1;cursor:pointer;border-radius:50%}' +
    '.llw-close:hover,.llw-close:focus-visible{background:#f0eadb}' +
    '.llw-eyebrow{margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#9b7840}' +
    '.llw-title{margin:0 0 10px;font:700 clamp(30px,5vw,40px)/1.12 "Playfair Display",Georgia,serif;color:#101f35;letter-spacing:-.4px}' +
    '.llw-title em{color:#9b7840}' +
    '.llw-text{margin:0 0 20px;font-size:15px;line-height:1.65;color:#4d5b6e}' +
    '.llw-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;margin-bottom:24px}' +
    '.llw-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 22px;background:#c6a56a;color:#101f35;font-size:14px;font-weight:700;text-decoration:none;border:0;cursor:pointer}' +
    '.llw-btn:hover,.llw-btn:focus-visible{background:#b8975c}' +
    '.llw-later{padding:6px 2px;border:0;background:none;color:#101f35;font:inherit;font-size:14px;font-weight:700;cursor:pointer;border-bottom:1px solid #c6a56a}' +
    '.llw-follow{margin:0 0 10px;padding-top:18px;border-top:1px solid #e8e0d2;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#647184}' +
    '.llw-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
    '.llw-grid a:last-child:nth-child(odd){grid-column:1/-1}' +
    '.llw-soc{display:flex;align-items:center;gap:11px;min-width:0;padding:10px 12px;border:1px solid #e3dac6;background:#fff;color:#101f35;text-decoration:none;transition:border-color .15s,transform .15s}' +
    '.llw-soc:hover,.llw-soc:focus-visible{border-color:#9b7840;transform:translateY(-1px)}' +
    '.llw-ic{display:grid;place-items:center;flex:none;width:36px;height:36px;border-radius:8px;background:#101f35;color:#e3c88f}' +
    '.llw-ic svg{width:19px;height:19px;fill:currentColor}' +
    '.llw-soc b{display:block;font-size:13.5px;line-height:1.25}' +
    '.llw-soc small{display:block;margin-top:1px;color:#647184;font-size:12px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.llw-soc span:last-child{min-width:0}' +
    'html.llw-lock{overflow:hidden}' +
    '@media(max-width:640px){.llw-backdrop{align-items:flex-end;padding:0}.llw-card{width:100%;max-height:88vh;padding:26px 20px 22px;border-radius:16px 16px 0 0;transform:translateY(40px)}.llw-grid{gap:8px}.llw-soc{padding:9px 10px}.llw-soc small{display:none}html.llw-lock{overflow:visible}}' +
    '@media(prefers-reduced-motion:reduce){.llw-backdrop,.llw-card{transition:none}}';

  var root = null, lastFocus = null;

  function track(action) {
    try { if (typeof window.gtag === 'function') window.gtag('event', 'welcome_popup', { event_label: action }); } catch (e) { /* ignore */ }
  }

  function close(reason) {
    if (!root) return;
    markSeen();
    track(reason || 'closed');
    var node = root; root = null;
    node.classList.remove('llw-in');
    document.documentElement.classList.remove('llw-lock');
    document.removeEventListener('keydown', onKey, true);
    window.setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 260);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) { /* ignore */ } }
  }

  function onKey(e) {
    if (!root) return;
    if (e.key === 'Escape') { e.preventDefault(); close('escape'); return; }
    if (e.key !== 'Tab') return;
    var items = root.querySelectorAll('a[href],button:not([disabled])');
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === root.firstChild)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function open() {
    if (root || document.getElementById('llWelcome')) return;
    if (!document.getElementById('llw-style')) {
      var st = document.createElement('style'); st.id = 'llw-style'; st.appendChild(document.createTextNode(CSS)); document.head.appendChild(st);
    }
    var grid = SOCIAL.map(function (s) {
      return '<a class="llw-soc" href="' + s[3] + '" target="_blank" rel="noopener" data-llw="' + s[4] + '"><span class="llw-ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[s[0]] + '</svg></span>' +
        '<span><b>' + s[1] + '</b><small>' + s[2] + '</small></span></a>';
    }).join('');
    root = document.createElement('div');
    root.id = 'llWelcome'; root.className = 'llw-backdrop';
    root.innerHTML =
      '<div class="llw-card" role="dialog" aria-modal="true" aria-labelledby="llwTitle" aria-describedby="llwText" tabindex="-1">' +
      '<button class="llw-close" type="button" aria-label="Close welcome message">&times;</button>' +
      '<p class="llw-eyebrow">Welcome to Legal Lounge Live</p>' +
      '<h2 class="llw-title" id="llwTitle">Join the <em>Lounge.</em></h2>' +
      '<p class="llw-text" id="llwText">Clear legal explainers, case notes and learning challenges for students, lawyers and curious minds. Join our community and follow us to stay in the loop.</p>' +
      '<div class="llw-actions"><a class="llw-btn" href="' + URLS.join + '" data-llw="join">Join the Lounge <span aria-hidden="true">&#8599;</span></a>' +
      '<button class="llw-later" type="button">Maybe later</button></div>' +
      '<p class="llw-follow">Follow us</p><div class="llw-grid">' + grid + '</div></div>';
    document.body.appendChild(root);
    lastFocus = document.activeElement;
    document.documentElement.classList.add('llw-lock');
    document.addEventListener('keydown', onKey, true);
    root.addEventListener('click', function (e) {
      if (e.target === root) { close('backdrop'); return; }
      var t = e.target.closest ? e.target.closest('a[data-llw],button') : null;
      if (!t) return;
      if (t.classList.contains('llw-close')) close('x');
      else if (t.classList.contains('llw-later')) close('maybe_later');
      else if (t.getAttribute('data-llw')) { markSeen(); track('click_' + t.getAttribute('data-llw')); }
    });
    window.requestAnimationFrame(function () { if (root) { root.classList.add('llw-in'); root.firstChild.focus({ preventScroll: true }); } });
    track('shown');
  }

  function schedule() {
    window.setTimeout(function () {
      if (document.hidden) {   // visitor is on another tab: wait until they are back
        var back = function () { if (!document.hidden) { document.removeEventListener('visibilitychange', back); window.setTimeout(open, 1200); } };
        document.addEventListener('visibilitychange', back);
      } else { open(); }
    }, forced ? 300 : DELAY_MS);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule); else schedule();
})();
