/* Legal Lounge Live: shows published content from the live API.
 *
 * Feed:    <div data-live-feed="article|research-paper|opportunities"
 *               data-live-section="#sectionId"   (optional: section shown only when items exist)
 *               data-live-status="statusId"      (optional: element for a short status line)>
 *            <template data-empty>…</template>  (optional: shown when there are no items)
 *            <template data-error>…</template>  (optional: shown when the API cannot be reached)
 *          </div>
 * Reader:  <article data-live-reader> on read.html (reads ?id=…)
 */
(function () {
  'use strict';

  var cfg = window.LL_CONFIG || {};
  var API = String(cfg.apiBase || 'https://legal-lounge-live-api-dbe8fzducefeg8a3.centralindia-01.azurewebsites.net').replace(/\/+$/, '');

  var LABELS = { 'article': 'Article', 'research-paper': 'Research paper', 'job': 'Job', 'internship': 'Internship' };
  var BACK = {
    'article': ['articles.html', 'Back to articles'],
    'research-paper': ['research-papers.html', 'Back to research papers'],
    'job': ['careers.html#latest-opportunities', 'Back to careers & internships'],
    'internship': ['careers.html#latest-opportunities', 'Back to careers & internships']
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function httpsUrl(value) {
    var v = String(value || '').trim();
    return /^https:\/\//i.test(v) ? v : '';
  }

  function formatDate(value) {
    if (!value) return '';
    var plain = /^\d{4}-\d{2}-\d{2}$/.test(String(value));
    var d = new Date(plain ? value + 'T12:00:00' : value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function deadlineClosed(value) {
    if (!value) return false;
    var text = String(value).trim();
    var t = /^\d{4}-\d{2}-\d{2}$/.test(text) ? Date.parse(text + 'T23:59:59+05:30') : Date.parse(text);
    return !isNaN(t) && t < Date.now();
  }

  function excerpt(text, max) {
    var plain = String(text || '')
      .replace(/^#{1,3}\s+/gm, '')
      .replace(/^[-*]\s+/gm, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\(https:\/\/[^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    return plain.length > max ? plain.slice(0, max - 1).replace(/\s+\S*$/, '') + '…' : plain;
  }

  function readHref(item) {
    return 'read.html?id=' + encodeURIComponent(item.id);
  }

  function isCareer(item) {
    return item.type === 'job' || item.type === 'internship';
  }

  /* ---------- cards ---------- */

  function card(item) {
    var career = isCareer(item);
    var meta = [LABELS[item.type] || 'Published'];
    if (career && item.organisation) meta.push(item.organisation);
    if (!career && item.authorName) meta.push(item.authorName);
    if (!career && item.publishedAt) meta.push(formatDate(item.publishedAt));

    var chips = '';
    if (career) {
      var list = [];
      if (item.location) list.push(item.location);
      if (item.duration) list.push(item.duration);
      if (item.deadline) list.push('Apply by ' + formatDate(item.deadline));
      chips = list.length
        ? '<ul class="live-chips">' + list.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>'
        : '';
    }

    var actions = '';
    if (career) {
      var apply = httpsUrl(item.applicationUrl);
      if (apply) {
        actions += '<a class="button button-gold" href="' + esc(apply) + '" target="_blank" rel="noopener">Apply <span aria-hidden="true">↗</span></a>';
      }
      actions += '<a class="read-link" href="' + esc(readHref(item)) + '">Full details <span>→</span></a>';
    } else {
      actions += '<a class="read-link" href="' + esc(readHref(item)) + '">' + (item.type === 'research-paper' ? 'Read the paper' : 'Read the article') + ' <span>→</span></a>';
      var pdf = httpsUrl(item.pdfUrl);
      if (pdf) actions += '<a class="read-link" href="' + esc(pdf) + '" target="_blank" rel="noopener">Download PDF <span>↓</span></a>';
    }

    return '<article class="article-card live-card">' +
      '<div class="article-content">' +
      '<div class="meta">' + meta.map(esc).join(' <span>•</span> ').toUpperCase() + '</div>' +
      '<h3>' + esc(item.title) + '</h3>' + chips +
      '<p>' + esc(excerpt(item.description, career ? 200 : 230)) + '</p>' +
      '<div class="live-actions">' + actions + '</div>' +
      '</div></article>';
  }

  /* ---------- feeds ---------- */

  function templateHtml(root, name) {
    var tpl = root.querySelector('template[data-' + name + ']');
    return tpl ? tpl.innerHTML : '';
  }

  function setStatus(root, text) {
    var id = root.getAttribute('data-live-status');
    var el = id ? document.getElementById(id) : null;
    if (el) el.textContent = text || '';
  }

  function loadFeed(root) {
    var kind = root.getAttribute('data-live-feed');
    var url = kind === 'opportunities'
      ? API + '/api/opportunities'
      : API + '/api/content?type=' + encodeURIComponent(kind);
    var emptyHtml = templateHtml(root, 'empty');
    var errorHtml = templateHtml(root, 'error');
    var sectionSel = root.getAttribute('data-live-section');
    var section = sectionSel ? document.querySelector(sectionSel) : null;

    fetch(url, { headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('API returned ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var items = (data && (data.opportunities || data.items)) || [];
        if (!items.length) {
          if (emptyHtml) root.innerHTML = emptyHtml;
          setStatus(root, root.getAttribute('data-status-empty') || '');
          return;
        }
        root.innerHTML = items.map(card).join('');
        if (section) section.hidden = false;
        setStatus(root, items.length + ' published item' + (items.length === 1 ? '' : 's') + '.');
      })
      .catch(function (err) {
        if (window.console) console.warn('Live content unavailable:', err);
        if (errorHtml) root.innerHTML = errorHtml;
        setStatus(root, root.getAttribute('data-status-error') || '');
      });
  }

  /* ---------- reader (read.html) ---------- */

  function inline(text) {
    var out = esc(text);
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return out;
  }

  // Plain text with light formatting: blank line = paragraph, ## heading, - bullets.
  function renderBody(text) {
    return String(text || '').replace(/\r\n?/g, '\n').split(/\n{2,}/).map(function (block) {
      var lines = block.split('\n').filter(function (l) { return l.trim(); });
      if (!lines.length) return '';
      if (/^###\s+/.test(lines[0])) return '<h3>' + inline(lines[0].replace(/^###\s+/, '')) + '</h3>' + (lines.length > 1 ? '<p>' + lines.slice(1).map(inline).join('<br>') + '</p>' : '');
      if (/^##\s+/.test(lines[0])) return '<h2>' + inline(lines[0].replace(/^##\s+/, '')) + '</h2>' + (lines.length > 1 ? '<p>' + lines.slice(1).map(inline).join('<br>') + '</p>' : '');
      if (lines.every(function (l) { return /^[-*]\s+/.test(l); })) {
        return '<ul>' + lines.map(function (l) { return '<li>' + inline(l.replace(/^[-*]\s+/, '')) + '</li>'; }).join('') + '</ul>';
      }
      return '<p>' + lines.map(inline).join('<br>') + '</p>';
    }).join('');
  }

  function fact(label, value) {
    return value ? '<div><dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd></div>' : '';
  }

  function loadReader(root) {
    var id = new URLSearchParams(window.location.search).get('id') || '';
    var $ = function (sel) { return root.querySelector(sel); };
    var title = $('#readTitle'), kicker = $('#readType'), meta = $('#readMeta'), facts = $('#readFacts');
    var actions = $('#readActions'), body = $('#readBody'), status = $('#readStatus'), back = $('#readBack');

    function fail(message) {
      title.textContent = 'This page is not available';
      status.textContent = message;
    }

    if (!/^[0-9a-f-]{36}$/i.test(id)) { fail('The link is incomplete. Please go back and open the item again.'); return; }

    fetch(API + '/api/content/' + encodeURIComponent(id), { headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (r.status === 404) throw new Error('This item has been removed or is not published.');
        if (!r.ok) throw new Error('This item could not be loaded right now. Please try again shortly.');
        return r.json();
      })
      .then(function (data) {
        var item = data.item;
        var career = isCareer(item);
        document.title = item.title + ' | Legal Lounge Live';
        kicker.textContent = (LABELS[item.type] || 'Published').toUpperCase() + (career && item.organisation ? ' · ' + item.organisation.toUpperCase() : '');
        title.textContent = item.title;

        var bits = [];
        if (!career && item.authorName) bits.push('By ' + item.authorName);
        if (item.publishedAt) bits.push('Published ' + formatDate(item.publishedAt));
        meta.textContent = bits.join(' · ');

        if (career) {
          var closed = deadlineClosed(item.deadline);
          facts.innerHTML =
            fact('Organisation', item.organisation) + fact('Location', item.location) +
            fact('Duration', item.duration) + fact('Eligibility', item.eligibility) +
            fact('Apply by', item.deadline ? formatDate(item.deadline) + (closed ? ' (closed)' : '') : '');
          facts.hidden = !facts.innerHTML;
        }

        body.innerHTML = renderBody(item.description);

        var html = '';
        var apply = httpsUrl(item.applicationUrl), pdf = httpsUrl(item.pdfUrl), orig = httpsUrl(item.contentUrl);
        if (apply && !(career && deadlineClosed(item.deadline))) html += '<a class="button button-gold" href="' + esc(apply) + '" target="_blank" rel="noopener">Apply now <span aria-hidden="true">↗</span></a>';
        if (pdf) html += '<a class="button button-gold" href="' + esc(pdf) + '" target="_blank" rel="noopener">Download PDF <span aria-hidden="true">↓</span></a>';
        if (orig) html += '<a class="button button-outline" href="' + esc(orig) + '" target="_blank" rel="noopener">View original source <span aria-hidden="true">↗</span></a>';
        actions.innerHTML = html;

        var b = BACK[item.type] || BACK.article;
        back.href = b[0];
        back.textContent = '← ' + b[1];
        status.textContent = '';
      })
      .catch(function (err) { fail(err.message || 'This item could not be loaded.'); });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-live-feed]'), loadFeed);
    var reader = document.querySelector('[data-live-reader]');
    if (reader) loadReader(reader);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
