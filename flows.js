(function () {
  'use strict';
  var root = document.getElementById('flowRoot'); if (!root || !window.LL_FLOWS) return;
  var flows = window.LL_FLOWS, cur = null, node = null, trail = [];
  var tabs = document.getElementById('flowTabs');
  Object.keys(flows).forEach(function (k, n) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'filter' + (n === 0 ? ' active' : ''); b.textContent = flows[k].title; b.setAttribute('data-flow', k);
    b.addEventListener('click', function () { Array.prototype.slice.call(tabs.children).forEach(function (x) { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); select(k); });
    b.setAttribute('aria-pressed', n === 0 ? 'true' : 'false'); tabs.appendChild(b);
  });
  function select(k) { cur = flows[k]; node = cur.start; trail = []; draw(); }
  function draw() {
    var n = cur.nodes[node]; root.innerHTML = '';
    var card = document.createElement('div'); card.className = 'flow-card';
    if (n.q) {
      var step = document.createElement('span'); step.className = 'flow-step'; step.textContent = 'QUESTION ' + (trail.length + 1);
      var h = document.createElement('h3'); h.textContent = n.q;
      var act = document.createElement('div'); act.className = 'flow-actions';
      [['Yes', n.yes], ['No', n.no]].forEach(function (o) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'button button-gold'; b.textContent = o[0];
        b.addEventListener('click', function () { trail.push(node); node = o[1]; draw(); }); act.appendChild(b);
      });
      card.appendChild(step); card.appendChild(h); card.appendChild(act);
    } else {
      var s2 = document.createElement('span'); s2.className = 'flow-step'; s2.textContent = 'RESULT';
      var h2 = document.createElement('h3'); h2.textContent = n.r; var p = document.createElement('p'); p.textContent = n.t;
      card.appendChild(s2); card.appendChild(h2); card.appendChild(p);
    }
    var nav = document.createElement('div'); nav.className = 'flow-nav';
    if (trail.length) { var back = document.createElement('button'); back.type = 'button'; back.className = 'text-link'; back.textContent = '← Back'; back.addEventListener('click', function () { node = trail.pop(); draw(); }); nav.appendChild(back); }
    var rs = document.createElement('button'); rs.type = 'button'; rs.className = 'text-link'; rs.textContent = 'Start again ↺'; rs.addEventListener('click', function () { node = cur.start; trail = []; draw(); }); nav.appendChild(rs);
    card.appendChild(nav); root.appendChild(card);
  }
  select(Object.keys(flows)[0]);
})();
