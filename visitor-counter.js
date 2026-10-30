/* Legal Lounge Live: homepage visitor counter.
 * Counts one visit per browser per day, then shows the running total.
 * If the service cannot be reached the counter simply stays hidden. */
(function () {
  'use strict';
  var section = document.getElementById('visitorCounter');
  var box = document.getElementById('visitorDigits');
  if (!section || !box) return;

  var cfg = window.LL_CONFIG || {};
  var API = String(cfg.apiBase || 'https://legal-lounge-live-api-dbe8fzducefeg8a3.centralindia-01.azurewebsites.net').replace(/\/+$/, '');
  var KEY = 'll_visit_day';
  var today = new Date().toISOString().slice(0, 10);
  var alreadyCounted = false;
  try { alreadyCounted = window.localStorage.getItem(KEY) === today; } catch (e) { /* storage blocked */ }

  function draw(n) {
    var digits = String(n);
    while (digits.length < 6) digits = '0' + digits;
    var firstReal = digits.search(/[1-9]/);
    if (firstReal < 0) firstReal = digits.length - 1;
    box.innerHTML = digits.split('').map(function (d, i) {
      return '<span class="visitor-digit' + (i < firstReal ? ' dim' : '') + '">' + d + '</span>';
    }).join('');
  }

  function show(total) {
    box.setAttribute('aria-label', Number(total).toLocaleString('en-IN') + ' total visitors');
    section.hidden = false;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || total < 2) { draw(total); return; }
    var start = null, duration = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      draw(Math.round(total * (1 - Math.pow(1 - p, 3))));
      if (p < 1) window.requestAnimationFrame(step); else draw(total);
    }
    window.requestAnimationFrame(step);
  }

  fetch(API + (alreadyCounted ? '/api/visits' : '/api/visit'), { method: alreadyCounted ? 'GET' : 'POST' })
    .then(function (r) { if (!r.ok) throw new Error('status ' + r.status); return r.json(); })
    .then(function (data) {
      if (typeof data.count !== 'number') throw new Error('bad response');
      if (!alreadyCounted && data.counted !== false) {
        try { window.localStorage.setItem(KEY, today); } catch (e) { /* ignore */ }
      }
      show(data.count);
    })
    .catch(function (err) { if (window.console) console.warn('Visitor counter unavailable:', err); });
})();
