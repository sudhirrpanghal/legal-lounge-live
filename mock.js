(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  if (!$('#mkStart') || !window.LL_BANK) return;
  var N = 20, SECS = 20 * 60, qs = [], ans = [], i = 0, left = SECS, timer = null;
  function shuffle(a) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; }
  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; }
  function start() {
    qs = shuffle(window.LL_BANK).slice(0, N).map(function (b) {
      return { s: b.s, q: b.q, e: b.e, o: shuffle(b.o.map(function (t, k) { return { t: t, ok: k === b.a }; })) };
    });
    ans = qs.map(function () { return -1; }); i = 0; left = SECS;
    $('#mkSetup').hidden = true; $('#mkResult').hidden = true; $('#mkPanel').hidden = false;
    $('#mkTimer').textContent = fmt(left);
    clearInterval(timer); timer = setInterval(function () { left--; $('#mkTimer').textContent = fmt(Math.max(left, 0)); if (left <= 0) submit(); }, 1000);
    render();
  }
  function render() {
    var q = qs[i];
    $('#mkCount').textContent = 'QUESTION ' + (i + 1) + ' OF ' + qs.length;
    $('#mkQuestion').textContent = q.q;
    var box = $('#mkOptions'); box.innerHTML = '';
    q.o.forEach(function (o, k) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = o.t;
      if (ans[i] === k) b.classList.add('selected-ans');
      b.addEventListener('click', function () { ans[i] = k; render(); });
      box.appendChild(b);
    });
    $('#mkPrev').disabled = i === 0; $('#mkNext').disabled = i === qs.length - 1;
  }
  function submit() {
    clearInterval(timer);
    var score = 0, by = {}, wrong = [];
    qs.forEach(function (q, k) {
      by[q.s] = by[q.s] || { c: 0, t: 0 }; by[q.s].t++;
      var ok = ans[k] >= 0 && q.o[ans[k]].ok;
      if (ok) { score++; by[q.s].c++; } else wrong.push({ q: q, a: ans[k] });
    });
    var used = SECS - Math.max(left, 0);
    $('#mkPanel').hidden = true; $('#mkResult').hidden = false;
    $('#mkScore').textContent = 'You scored ' + score + ' out of ' + qs.length + '.';
    $('#mkMessage').textContent = 'Time used: ' + fmt(used) + '.';
    var br = $('#mkBreak'); br.innerHTML = '';
    Object.keys(by).forEach(function (s) { var p = document.createElement('p'); p.textContent = s + ': ' + by[s].c + ' of ' + by[s].t; br.appendChild(p); });
    var rv = $('#mkReview'); rv.innerHTML = '';
    wrong.forEach(function (w) {
      var d = document.createElement('div'); d.className = 'review-item';
      var h = document.createElement('b'); h.textContent = w.q.q;
      var good = w.q.o.filter(function (o) { return o.ok; })[0].t;
      var p = document.createElement('p'); p.textContent = (w.a < 0 ? 'Not answered. ' : 'Your answer: ' + w.q.o[w.a].t + '. ') + 'Correct: ' + good + '. ' + w.q.e;
      d.appendChild(h); d.appendChild(p); rv.appendChild(d);
    });
    try { var list = JSON.parse(localStorage.getItem('ll_mock') || '[]'); list.unshift({ date: new Date().toISOString().slice(0, 10), score: score, total: qs.length, time: fmt(used) }); localStorage.setItem('ll_mock', JSON.stringify(list.slice(0, 20))); } catch (e) {}
  }
  $('#mkStart').addEventListener('click', start); $('#mkAgain').addEventListener('click', start);
  $('#mkPrev').addEventListener('click', function () { if (i > 0) { i--; render(); } });
  $('#mkNext').addEventListener('click', function () { if (i < qs.length - 1) { i++; render(); } });
  $('#mkSubmit').addEventListener('click', function () { if (confirm('Submit the test now?')) submit(); });
})();
