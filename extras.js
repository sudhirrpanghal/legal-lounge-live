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
