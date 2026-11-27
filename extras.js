(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var params = new URLSearchParams(location.search);

  function listFilter(o) {
    var input = $(o.input), group = $(o.group), items = $$(o.items), empty = $(o.empty), count = $(o.count);
    if (!input || !group || !items.length) return;
    var active = 'All';
    function apply() {
      var q = input.value.trim().toLowerCase(), n = 0;
      items.forEach(function (el) {
        var okF = active === 'All' || el.getAttribute(o.attr) === active;
        var okT = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
        el.hidden = !(okF && okT); if (okF && okT) n++;
      });
      if (empty) empty.hidden = n !== 0;
      if (count) count.textContent = n + ' of ' + items.length + ' shown';
    }
    $$('.filter', group).forEach(function (b) { b.addEventListener('click', function () { active = b.getAttribute('data-filter'); apply(); }); });
    input.addEventListener('input', apply); apply();
  }
  listFilter({ input: '#conInput', group: '#conFilters', items: '#conBody tr', empty: '#conEmpty', count: '#conCount', attr: 'data-group' });

  // Prefill from ?q=
  var q = params.get('q');
  if (q) ['#finderSearch', '#conInput', '#caseSearch', '#glossarySearch', '#siteQuery'].forEach(function (sel) {
    var el = $(sel); if (el) { el.value = q; el.dispatchEvent(new Event('input')); }
  });
  var sub = params.get('subject');
  if (sub) { var b = $('#caseFilters .filter[data-filter="' + sub.replace(/"/g, '') + '"]'); if (b) b.click(); }
  var quiz = params.get('quiz');
  if (quiz) { var card = $('.subject-card[data-subject="' + quiz.replace(/"/g, '') + '"]'); if (card) card.click(); }

  // Open a <details> element named in the URL hash
  function openHash() {
    var id = decodeURIComponent(location.hash.slice(1)); if (!id) return;
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') {
      el.hidden = false; el.open = true;
      setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    }
  }
  openHash(); window.addEventListener('hashchange', openHash);

  // Citation generator
  function v(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }
  function out(id, lines) {
    var box = document.getElementById(id); box.innerHTML = '';
    lines.forEach(function (l) {
      var row = document.createElement('div'); row.className = 'cite-line';
      var lab = document.createElement('b'); lab.textContent = l[0];
      var txt = document.createElement('p'); txt.textContent = l[1];
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'text-link'; btn.textContent = 'Copy';
      btn.addEventListener('click', function () {
        var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(l[1]).then(done, done);
        else { var t = document.createElement('textarea'); t.value = l[1]; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t); done(); }
      });
      row.appendChild(lab); row.appendChild(txt); row.appendChild(btn); box.appendChild(row);
    });
  }
  var go = $('#citeGo');
  if (go) go.addEventListener('click', function () {
    var name = v('cName'), year = v('cYear'), rep = $('#cReporter').value, vol = v('cVol'), page = v('cPage'), court = v('cCourt'), pin = v('cPin');
    if (!name || !year || !page || ((rep === 'SCC' || rep === 'SCR') && !vol) || ((rep === 'AIR' || rep === 'SCCOL') && !court)) {
      out('citeOut', [['Missing details', 'Please fill in the case name, year, reporter details and, for AIR or SCC OnLine, the court code.']]); return;
    }
    var ref, bb;
    if (rep === 'SCC') { ref = '(' + year + ') ' + vol + ' SCC ' + page; bb = '(' + year + ') ' + vol + ' S.C.C. ' + page; }
    else if (rep === 'SCR') { ref = '(' + year + ') ' + vol + ' SCR ' + page; bb = '(' + year + ') ' + vol + ' S.C.R. ' + page; }
    else if (rep === 'AIR') { ref = 'AIR ' + year + ' ' + court + ' ' + page; bb = 'A.I.R. ' + year + ' ' + (court.toUpperCase() === 'SC' ? 'S.C.' : court + '.') + ' ' + page; }
    else if (rep === 'INSC') { ref = year + ' INSC ' + page; bb = ref; }
    else { ref = year + ' SCC OnLine ' + court + ' ' + page; bb = ref; }
    var p = pin ? ', ' + pin : '';
    var plain = name.replace(/\s+v\.?\s+/i, ' v. '), os = name.replace(/\s+v\.?\s+/i, ' v ');
    out('citeOut', [['Common Indian style (also the Indian Bluebook format)', plain + ', ' + ref + p + '.'], ['OSCOLA style', os + ' ' + ref + p], ['Bluebook style', plain + ', ' + bb + p + ' (India)']]);
  });
  var sgo = $('#statuteGo');
  if (sgo) sgo.addEventListener('click', function () {
    var n = v('sName'), y = v('sYear'), s = v('sSec'), no = v('sNo');
    if (!n || !y || !s) { out('statuteOut', [['Missing details', 'Please fill in the Act name, year and section.']]); return; }
    out('statuteOut', [['Common Indian style', 'Section ' + s + ', ' + n + ', ' + y + (no ? ' (Act ' + no + ' of ' + y + ')' : '') + '.'], ['OSCOLA style', n + ' ' + y + ', s ' + s], ['Bluebook style', n + ', ' + y + ', § ' + s + ' (India)'], ['Bluebook (Indian law school format)', n + ', ' + y + ', § ' + s + (no ? ', No. ' + no + ', Acts of Parliament, ' + y : '') + ' (India).']]);
  });

  // Site search
  var box = $('#searchResults');
  if (box && window.SEARCH_INDEX) {
    var input = $('#siteQuery'), count = $('#searchCount'), empty = $('#searchEmpty');
    var run = function () {
      var raw = input.value.trim().toLowerCase(); box.innerHTML = ''; empty.hidden = true;
      if (!raw) { count.textContent = 'Type a word, section number or case name.'; return; }
      var terms = raw.split(/\s+/).filter(Boolean);
      var res = [];
      window.SEARCH_INDEX.forEach(function (it) {
        var t = it.t.toLowerCase(), d = (it.d || '').toLowerCase(), score = 0, all = true;
        terms.forEach(function (w) {
          var inT = t.indexOf(w) !== -1, inD = d.indexOf(w) !== -1;
          if (inT) score += (t.indexOf(raw) === 0 ? 6 : 3); else if (inD) score += 1; else all = false;
        });
        if (all) res.push({ it: it, s: score });
      });
      res.sort(function (a, b) { return b.s - a.s; });
      count.textContent = res.length + ' result' + (res.length === 1 ? '' : 's');
      if (!res.length) { empty.hidden = false; return; }
      res.slice(0, 40).forEach(function (r) {
        var a = document.createElement('a'); a.className = 'result'; a.href = r.it.u;
        var k = document.createElement('span'); k.textContent = r.it.k.toUpperCase();
        var h = document.createElement('b'); h.textContent = r.it.t;
        var p = document.createElement('p'); p.textContent = (r.it.d || '').slice(0, 170);
        a.appendChild(k); a.appendChild(h); a.appendChild(p); box.appendChild(a);
      });
    };
    input.addEventListener('input', run); run();
  }
})();


// Spotlight Global Search Module (Cmd+K / Ctrl+K)
(function () {
  'use strict';

  // Inject Spotlight HTML into body
  var modalHtml = `
    <div id="llSpotlightModal" class="spotlight-overlay" hidden aria-modal="true" role="dialog" aria-label="Quick Search">
      <div class="spotlight-dialog">
        <div class="spotlight-input-wrap">
          <span class="spotlight-icon">⌕</span>
          <input type="search" id="spotlightInput" class="spotlight-input" placeholder="Search 1,300+ Articles, Sections, Judgments & Maxims (e.g. 21, 420, bail, Kesavananda)…" autocomplete="off" spellcheck="false">
          <kbd class="spotlight-esc">ESC</kbd>
        </div>
        <div class="spotlight-results" id="spotlightResults">
          <div class="spotlight-hint">Type a keyword, section number, or landmark case name…</div>
        </div>
        <div class="spotlight-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to dismiss</span>
        </div>
      </div>
    </div>
  `;

  var div = document.createElement('div');
  div.innerHTML = modalHtml;
  document.body.appendChild(div.firstElementChild);

  var overlay = document.getElementById('llSpotlightModal');
  var input = document.getElementById('spotlightInput');
  var resultsBox = document.getElementById('spotlightResults');
  var activeIdx = -1;
  var cachedIndex = null;

  function loadIndex(cb) {
    if (cachedIndex) { cb(cachedIndex); return; }
    if (window.SEARCH_INDEX && window.SEARCH_INDEX.length) {
      cachedIndex = window.SEARCH_INDEX;
      cb(cachedIndex);
      return;
    }
    // Dynamically fetch search-index.js
    var s = document.createElement('script');
    s.src = 'search-index.js?v=20261127';
    s.onload = function () {
      cachedIndex = window.SEARCH_INDEX || [];
      cb(cachedIndex);
    };
    s.onerror = function () { cb([]); };
    document.head.appendChild(s);
  }

  function openSpotlight() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    input.value = '';
    activeIdx = -1;
    input.focus();
    loadIndex(function () {});
  }

  function closeSpotlight() {
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  function renderResults(hits) {
    if (!hits.length) {
      resultsBox.innerHTML = '<div class="spotlight-hint">No matching laws, cases or articles found. Try a section number or topic.</div>';
      activeIdx = -1;
      return;
    }
    var html = '';
    hits.slice(0, 10).forEach(function (h, i) {
      var kClass = 'badge-' + (h.k || 'other').toLowerCase().replace(/\s+/g, '-');
      html += '<a href="' + h.u + '" class="spotlight-item ' + (i === 0 ? 'selected' : '') + '" data-idx="' + i + '">' +
        '<div class="spotlight-item-head">' +
        '<span class="spotlight-badge ' + kClass + '">' + (h.k || 'LAW') + '</span>' +
        '<span class="spotlight-item-title">' + (h.t || '') + '</span>' +
        '</div>' +
        (h.d ? '<p class="spotlight-item-desc">' + h.d + '</p>' : '') +
        '</a>';
    });
    resultsBox.innerHTML = html;
    activeIdx = 0;
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) {
      resultsBox.innerHTML = '<div class="spotlight-hint">Type a keyword, section number, or landmark case name…</div>';
      activeIdx = -1;
      return;
    }
    loadIndex(function (idx) {
      var words = q.split(/\s+/).filter(Boolean);
      var hits = idx.filter(function (item) {
        var hay = ((item.t || '') + ' ' + (item.d || '') + ' ' + (item.k || '')).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) !== -1; });
      });
      renderResults(hits);
    });
  }

  input.addEventListener('input', function () {
    search(input.value);
  });

  input.addEventListener('keydown', function (e) {
    var items = resultsBox.querySelectorAll('.spotlight-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!items.length) return;
      activeIdx = (activeIdx + 1) % items.length;
      items.forEach(function (el, i) { el.classList.toggle('selected', i === activeIdx); });
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!items.length) return;
      activeIdx = (activeIdx - 1 + items.length) % items.length;
      items.forEach(function (el, i) { el.classList.toggle('selected', i === activeIdx); });
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      if (items.length && activeIdx > -1 && items[activeIdx]) {
        e.preventDefault();
        window.location.href = items[activeIdx].href;
      }
    } else if (e.key === 'Escape') {
      closeSpotlight();
    }
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSpotlight();
  });

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.hidden) openSpotlight();
      else closeSpotlight();
    }
  });

  // Expose global open method
  window.LLSpotlight = { open: openSpotlight, close: closeSpotlight };
})();
