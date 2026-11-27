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
