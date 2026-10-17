(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var cfg = window.LL_CONFIG || {};
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var file = (location.pathname.split('/').pop() || 'index.html');

  /* ---- Analytics (optional, privacy-friendly) ---- */
  if (cfg.goatCounterCode) {
    var s = document.createElement('script'); s.async = true;
    s.setAttribute('data-goatcounter', 'https://' + cfg.goatCounterCode + '.goatcounter.com/count');
    s.src = 'https://gc.zgo.at/count.js'; document.head.appendChild(s);
  }

  /* ---- Author ---- */
  if (cfg.authorName) {
    $$('.article-byline span:first-child').forEach(function (el) { el.textContent = 'BY ' + cfg.authorName.toUpperCase(); });
    var card = $('#authorCard');
    if (card) {
      card.hidden = false; card.innerHTML = '';
      if (cfg.authorPhoto) { var im = document.createElement('img'); im.src = cfg.authorPhoto; im.alt = cfg.authorName; im.width = 96; im.height = 96; card.appendChild(im); }
      var box = document.createElement('div');
      var h = document.createElement('h3'); h.textContent = cfg.authorName; box.appendChild(h);
      if (cfg.authorRole) { var r = document.createElement('b'); r.textContent = cfg.authorRole; box.appendChild(r); }
      if (cfg.authorBio) { var p = document.createElement('p'); p.textContent = cfg.authorBio; box.appendChild(p); }
      card.appendChild(box);
    }
  }

  /* ---- Bookmarks ---- */
  function saved() { return load('ll_saved', []); }
  function isSaved(id) { return saved().some(function (x) { return x.id === id; }); }
  function toggle(item) {
    var list = saved(), i = list.findIndex(function (x) { return x.id === item.id; });
    if (i >= 0) list.splice(i, 1); else list.unshift(item);
    save('ll_saved', list); return i < 0;
  }
  function saveBtn(item) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'save-btn';
    function paint() { var on = isSaved(item.id); b.textContent = on ? '★ Saved' : '☆ Save'; b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    b.addEventListener('click', function (e) { e.preventDefault(); toggle(item); paint(); });
    paint(); return b;
  }
  $$('#caseList details').forEach(function (d) {
    var name = $('summary span', d).textContent, box = $('.case-detail', d);
    if (box) box.insertBefore(saveBtn({ id: d.id, t: name, u: 'case-law.html#' + d.id, k: 'Case note' }), box.firstChild);
  });
  $$('#glossaryList details').forEach(function (d) {
    var name = $('summary span', d).textContent, p = $('p', d);
    if (p) p.parentNode.insertBefore(saveBtn({ id: d.id, t: name, u: 'glossary.html#' + d.id, k: 'Glossary' }), p);
  });
  $$('#maximList details').forEach(function (d) {
    var name = $('summary span', d).textContent, p = $('p', d);
    if (p) p.parentNode.insertBefore(saveBtn({ id: d.id, t: name, u: 'maxims.html#' + d.id, k: 'Maxim' }), p);
  });
  var byline = $('.article-byline');
  if (byline && $('.article-detail h1')) {
    var wrap = document.createElement('div'); wrap.className = 'save-row';
    wrap.appendChild(saveBtn({ id: file, t: $('.article-detail h1').textContent, u: file, k: 'Article' }));
    byline.parentNode.insertBefore(wrap, byline.nextSibling);
  }

  /* ---- My Study page ---- */
  var savedBox = $('#savedList');
  if (savedBox) {
    var renderSaved = function () {
      var list = saved(); savedBox.innerHTML = '';
      $('#savedEmpty').hidden = list.length > 0;
      list.forEach(function (it) {
        var row = document.createElement('div'); row.className = 'saved-item';
        var a = document.createElement('a'); a.href = it.u;
        var k = document.createElement('span'); k.textContent = (it.k || '').toUpperCase();
        var b = document.createElement('b'); b.textContent = it.t; a.appendChild(k); a.appendChild(b);
        var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'text-link'; rm.textContent = 'Remove';
        rm.addEventListener('click', function () { save('ll_saved', saved().filter(function (x) { return x.id !== it.id; })); renderSaved(); });
        row.appendChild(a); row.appendChild(rm); savedBox.appendChild(row);
      });
    };
    renderSaved();
    var prog = load('ll_progress', {}), tb = $('#progressBody'), keys = Object.keys(prog);
    $('#progressEmpty').hidden = keys.length > 0;
    keys.forEach(function (k) {
      var tr = document.createElement('tr');
      [k, prog[k].best + ' / ' + prog[k].total, String(prog[k].attempts), prog[k].last || ''].forEach(function (v) { var td = document.createElement('td'); td.textContent = v; tr.appendChild(td); });
      tb.appendChild(tr);
    });
    var mocks = load('ll_mock', []), mb = $('#mockBody');
    $('#mockEmpty').hidden = mocks.length > 0;
    mocks.slice(0, 8).forEach(function (m) {
      var tr = document.createElement('tr');
      [m.date, m.score + ' / ' + m.total, m.time].forEach(function (v) { var td = document.createElement('td'); td.textContent = v; tr.appendChild(td); });
      mb.appendChild(tr);
    });
    $('#clearData').addEventListener('click', function () {
      if (confirm('Remove all saved items and scores from this browser?')) { ['ll_saved', 'll_progress', 'll_mock'].forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} }); location.reload(); }
    });
  }

  /* ---- Generic filters for bare acts, amendments, maxims ---- */
  function filt(o) {
    var input = $(o.input), items = $$(o.items), group = o.group && $(o.group), empty = $(o.empty), count = o.count && $(o.count);
    if (!input || !items.length) return;
    var active = 'All';
    function apply() {
      var q = input.value.trim().toLowerCase(), n = 0;
      items.forEach(function (el) {
        var okF = !o.attr || active === 'All' || el.getAttribute(o.attr) === active;
        var okT = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
        el.hidden = !(okF && okT); if (okF && okT) n++;
      });
      if (empty) empty.hidden = n !== 0;
      if (count) count.textContent = n + ' of ' + items.length + ' shown';
    }
    if (group) $$('.filter', group).forEach(function (b) { b.addEventListener('click', function () { active = b.getAttribute('data-filter'); apply(); }); });
    input.addEventListener('input', apply); apply();
  }
  filt({ input: '#actInput', items: '#actBody tr', group: '#actFilters', empty: '#actEmpty', count: '#actCount', attr: 'data-act' });
  filt({ input: '#amInput', items: '#amBody tr', empty: '#amEmpty', count: '#amCount' });
  filt({ input: '#maximSearch', items: '#maximList details', empty: '#maximEmpty' });
  var q = new URLSearchParams(location.search).get('q');
  if (q) ['#actInput', '#amInput', '#maximSearch'].forEach(function (s) { var el = $(s); if (el) { el.value = q; el.dispatchEvent(new Event('input')); } });

  /* ---- Print a single cheat sheet ---- */
  $$('.print-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = document.getElementById(b.getAttribute('data-sheet'));
      $$('.sheet').forEach(function (s) { s.classList.remove('printing'); });
      el.classList.add('printing'); document.body.setAttribute('data-printing', '1');
      window.print();
      setTimeout(function () { document.body.removeAttribute('data-printing'); el.classList.remove('printing'); }, 500);
    });
  });

  /* ---- Newsletter ---- */
  var nl = $('#nlForm');
  if (nl) {
    if (cfg.newsletterAction) { nl.action = cfg.newsletterAction; nl.method = 'post'; nl.hidden = false; nl.target = '_blank'; var s1 = $('#nlSetup'); if (s1) s1.hidden = true; }
  }

  /* ---- Events ---- */
  var up = $('#eventsUpcoming');
  if (up) {
    var today = new Date().toISOString().slice(0, 10), ev = (cfg.events || []).slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    function draw(box, list, emptyEl) {
      box.innerHTML = ''; emptyEl.hidden = list.length > 0;
      list.forEach(function (e) {
        var d = document.createElement('div'); d.className = 'event';
        var dt = document.createElement('span'); dt.textContent = (e.date || '') + (e.time ? ' · ' + e.time : '') + (e.mode ? ' · ' + e.mode : '');
        var h = document.createElement('b'); h.textContent = e.title;
        var p = document.createElement('p'); p.textContent = e.desc || '';
        d.appendChild(dt); d.appendChild(h); d.appendChild(p);
        if (e.link) { var a = document.createElement('a'); a.className = 'text-link'; a.href = e.link; a.rel = 'noopener'; a.target = '_blank'; a.textContent = 'Details'; d.appendChild(a); }
        box.appendChild(d);
      });
    }
    draw(up, ev.filter(function (e) { return e.date >= today; }), $('#eventsUpcomingEmpty'));
    draw($('#eventsPast'), ev.filter(function (e) { return e.date < today; }).reverse(), $('#eventsPastEmpty'));
  }
})();
