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

  var LABELS = {
    'blog': 'Blog',
    'article': 'Blog',
    'research-paper': 'Research paper',
    'legal-article': 'Legal article',
    'case-note': 'Case note',
    'job': 'Job',
    'internship': 'Internship',
    'lounge-opening': 'Opening'
  };
  var READ_LABELS = {
    'blog': 'Read the blog',
    'article': 'Read the blog',
    'research-paper': 'Read the paper',
    'legal-article': 'Read the article',
    'case-note': 'Read the case note'
  };
  var BACK = {
    'blog': ['blogs.html', 'Back to blogs'],
    'article': ['blogs.html', 'Back to blogs'],
    'research-paper': ['research-papers.html', 'Back to research papers'],
    'legal-article': ['legal-blogs.html', 'Back to legal articles'],
    'case-note': ['case-notes.html', 'Back to case notes'],
    'job': ['careers.html#latest-opportunities', 'Back to careers & internships'],
    'internship': ['careers.html#latest-opportunities', 'Back to careers & internships'],
    'lounge-opening': ['community.html', 'Back to Join the Lounge']
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

  // Apply links may be a web link or an email link.
  function linkUrl(value) {
    var v = String(value || '').trim();
    return /^(https:\/\/|mailto:)/i.test(v) ? v : '';
  }

  function newTab(url) {
    return /^mailto:/i.test(url) ? '' : ' target="_blank" rel="noopener"';
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

  function stripMarks(line) {
    return String(line)
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*\s][^*]*)\*/g, '$1')
      .replace(/\[([^\]]+)\]\(https:\/\/[^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Short summary for cards: the first normal paragraph; if there is none, the first bullets.
  function excerpt(text, max) {
    var blocks = String(text || '').replace(/\r\n?/g, '\n').split(/\n{2,}/);
    var plain = '';
    for (var i = 0; i < blocks.length && !plain; i++) {
      var lines = blocks[i].split('\n').filter(function (l) { return l.trim(); });
      if (lines.length && !/^#{1,3}\s/.test(lines[0]) && !/^[-*]\s/.test(lines[0])) plain = stripMarks(lines.join(' '));
    }
    if (!plain) {
      var bullets = String(text || '').split('\n').filter(function (l) { return /^[-*]\s+/.test(l); });
      plain = bullets.map(function (l) { return stripMarks(l.replace(/^[-*]\s+/, '')); }).join(' · ');
    }
    if (!plain) plain = stripMarks(String(text || '').replace(/^#{1,3}\s+/gm, ''));
    return plain.length > max ? plain.slice(0, max - 1).replace(/\s+\S*$/, '') + '…' : plain;
  }

  function readHref(item) {
    return 'read.html?id=' + encodeURIComponent(item.id);
  }

  function isCareer(item) {
    return ['job', 'internship', 'lounge-opening'].indexOf(item.type) > -1;
  }

  function organisationOf(item) {
    return item.organisation || (item.type === 'lounge-opening' ? 'Legal Lounge Live' : '');
  }

  /* ---------- cards ---------- */

  function card(item) {
    var career = isCareer(item);
    var meta = [LABELS[item.type] || 'Published'];
    if (career && organisationOf(item)) meta.push(organisationOf(item));
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
      var apply = linkUrl(item.applicationUrl);
      if (apply) {
        actions += '<a class="button button-gold" href="' + esc(apply) + '"' + newTab(apply) + '>Apply <span aria-hidden="true">↗</span></a>';
      }
      actions += '<a class="read-link" href="' + esc(readHref(item)) + '">Full details <span>→</span></a>';
    } else {
      actions += '<a class="read-link" href="' + esc(readHref(item)) + '">' + (READ_LABELS[item.type] || 'Read more') + ' <span>→</span></a>';
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
    out = out.replace(/\*([^*\s][^*]*)\*/g, '<em>$1</em>');
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

  var SKELETON =
    '<p class="eyebrow" data-r="type"></p><h1 data-r="title"></h1>' +
    '<div class="read-meta" data-r="meta"></div><dl class="read-facts" data-r="facts" hidden></dl>' +
    '<div class="read-actions" data-r="actions"></div><div class="read-body" data-r="body"></div>';

  // Fills a reader skeleton (see SKELETON / read.html) with one item. Also used by the dashboard preview.
  function fillReader(root, item) {
    var part = function (name) { return root.querySelector('[data-r="' + name + '"]'); };
    var career = isCareer(item);

    part('type').textContent = (LABELS[item.type] || 'Published').toUpperCase() + (career && organisationOf(item) ? ' · ' + organisationOf(item).toUpperCase() : '');
    part('title').textContent = item.title;

    var bits = [];
    if (!career && item.authorName) bits.push('By ' + item.authorName);
    if (item.publishedAt) bits.push('Published ' + formatDate(item.publishedAt));
    part('meta').textContent = bits.join(' · ');

    var facts = part('facts');
    if (career) {
      var closed = deadlineClosed(item.deadline);
      facts.innerHTML =
        fact('Organisation', organisationOf(item)) + fact('Location', item.location) +
        fact('Duration', item.duration) + fact('Eligibility', item.eligibility) +
        fact('Apply by', item.deadline ? formatDate(item.deadline) + (closed ? ' (closed)' : '') : '');
      facts.hidden = !facts.innerHTML;
    } else {
      facts.hidden = true;
    }

    part('body').innerHTML = renderBody(item.description);

    var html = '';
    var apply = linkUrl(item.applicationUrl), pdf = httpsUrl(item.pdfUrl), orig = httpsUrl(item.contentUrl);
    if (apply && !(career && deadlineClosed(item.deadline))) html += '<a class="button button-gold" href="' + esc(apply) + '"' + newTab(apply) + '>Apply now <span aria-hidden="true">↗</span></a>';
    if (pdf) html += '<a class="button button-gold" href="' + esc(pdf) + '" target="_blank" rel="noopener">Download PDF <span aria-hidden="true">↓</span></a>';
    if (orig) html += '<a class="button button-outline" href="' + esc(orig) + '" target="_blank" rel="noopener">View original source <span aria-hidden="true">↗</span></a>';
    part('actions').innerHTML = html;
  }

  function loadReader(root) {
    var id = new URLSearchParams(window.location.search).get('id') || '';
    var status = root.querySelector('#readStatus'), back = root.querySelector('#readBack');
    var title = root.querySelector('[data-r="title"]');

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
        document.title = item.title + ' | Legal Lounge Live';
        fillReader(root, item);
        var b = BACK[item.type] || BACK.blog;
        back.href = b[0];
        back.textContent = '← ' + b[1];
        status.textContent = '';
      })
      .catch(function (err) { fail(err.message || 'This item could not be loaded.'); });
  }

  window.LLLive = { card: card, fillReader: fillReader, skeleton: SKELETON, renderBody: renderBody };

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-live-feed]'), loadFeed);
    var reader = document.querySelector('[data-live-reader]');
    if (reader) loadReader(reader);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
