// Reader Customization (Dark Mode & Font Sizing) + Citation Generator Modal + Clean A4 Print
(function () {
  'use strict';

  // 1. Dark Mode / Theme Engine
  var savedTheme = localStorage.getItem('ll_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }

  // Inject Floating Reader Controls Toolbar on desktop & mobile
  var bar = document.createElement('div');
  bar.className = 'reader-toolbar';
  bar.innerHTML = 
    '<button type="button" class="reader-tool-btn" id="btnToggleDark" title="Toggle Dark/Light Mode">' + (savedTheme === 'dark' ? '☀️' : '🌙') + '</button>' +
    '<button type="button" class="reader-tool-btn" id="btnFontDec" title="Decrease font size">A-</button>' +
    '<button type="button" class="reader-tool-btn" id="btnFontInc" title="Increase font size">A+</button>' +
    '<button type="button" class="reader-tool-btn" id="btnPrintA4" title="Print Clean A4 Legal Brief">🖨️</button>';
  document.body.appendChild(bar);

  var btnDark = document.getElementById('btnToggleDark');
  if (btnDark) {
    btnDark.addEventListener('click', function () {
      var isDark = document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem('ll_theme', isDark ? 'dark' : 'light');
      btnDark.textContent = isDark ? '☀️' : '🌙';
    });
  }

  var currentScale = parseFloat(localStorage.getItem('ll_font_scale') || '1');
  function applyScale(s) {
    currentScale = Math.min(1.3, Math.max(0.85, s));
    document.documentElement.style.setProperty('--font-scale', currentScale);
    localStorage.setItem('ll_font_scale', currentScale);
  }
  if (currentScale !== 1) applyScale(currentScale);

  var btnInc = document.getElementById('btnFontInc');
  if (btnInc) btnInc.addEventListener('click', function () { applyScale(currentScale + 0.05); });
  var btnDec = document.getElementById('btnFontDec');
  if (btnDec) btnDec.addEventListener('click', function () { applyScale(currentScale - 0.05); });

  var btnPrint = document.getElementById('btnPrintA4');
  if (btnPrint) btnPrint.addEventListener('click', function () { window.print(); });

  // 2. Citation Generator Modal
  var citeModal = document.createElement('div');
  citeModal.className = 'cite-modal-overlay';
  citeModal.hidden = true;
  citeModal.innerHTML = 
    '<div class="cite-modal-dialog">' +
      '<div class="cite-modal-header">' +
        '<h3>Cite this Legal Reference</h3>' +
        '<button type="button" class="cite-close-btn" id="closeCiteModal">×</button>' +
      '</div>' +
      '<div class="cite-modal-body">' +
        '<label>Standard Indian Bluebook Citation:</label>' +
        '<div class="cite-box"><span id="citeBluebook"></span><button type="button" class="btn-copy-cite" data-target="citeBluebook">Copy</button></div>' +
        '<label>OSCOLA (4th Edition) Academic Citation:</label>' +
        '<div class="cite-box"><span id="citeOscola"></span><button type="button" class="btn-copy-cite" data-target="citeOscola">Copy</button></div>' +
        '<label>Digital Web Permadash Citation:</label>' +
        '<div class="cite-box"><span id="citeWeb"></span><button type="button" class="btn-copy-cite" data-target="citeWeb">Copy</button></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(citeModal);

  var closeBtn = document.getElementById('closeCiteModal');
  if (closeBtn) closeBtn.addEventListener('click', function () { citeModal.hidden = true; });
  citeModal.addEventListener('click', function (e) { if (e.target === citeModal) citeModal.hidden = true; });

  document.querySelectorAll('.btn-copy-cite').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var text = document.getElementById(targetId).textContent;
      navigator.clipboard.writeText(text).then(function () {
        var old = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(function () { btn.textContent = old; }, 2000);
      });
    });
  });

  window.LLCite = function (title, reporter, year) {
    var t = title || document.title.split('|')[0].trim();
    var y = year || new Date().getFullYear();
    var rep = reporter || (y + ' SCC OnLine LL 101');
    var url = window.location.href.split('#')[0];

    document.getElementById('citeBluebook').textContent = t + ', ' + rep + '.';
    document.getElementById('citeOscola').textContent = t + ' [' + y + '] ' + rep + '.';
    document.getElementById('citeWeb').textContent = "'" + t + "', Legal Lounge Live Archive (" + y + "), available at: <" + url + ">.";
    citeModal.hidden = false;
  };

  // 3. Register Service Worker (PWA offline caching)
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
