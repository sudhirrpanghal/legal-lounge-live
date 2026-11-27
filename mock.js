// Enhanced Mock Test Engine with Negative Marking, Question Palette & Diagnostics
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  if (!$('#mkStart')) return;

  var getBank = function () {
    return (window.JUDICIARY_QUIZ && window.JUDICIARY_QUIZ.length) ? window.JUDICIARY_QUIZ : (window.LL_BANK || []);
  };

  var N = 20, SECS = 20 * 60, qs = [], ans = [], flags = [], i = 0, left = SECS, timer = null;
  var useNegative = true;

  function shuffle(a) {
    a = a.slice();
    for (var k = a.length - 1; k > 0; k--) {
      var j = Math.floor(Math.random() * (k + 1));
      var t = a[k]; a[k] = a[j]; a[j] = t;
    }
    return a;
  }

  function fmt(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
  }

  function start() {
    var bank = getBank();
    if (!bank.length) {
      alert('Quiz questions are loading. Please try again in a moment.');
      return;
    }

    // Read negative marking setting
    var negRadio = document.querySelector('input[name="mkNegative"]:checked');
    useNegative = negRadio ? negRadio.value === 'yes' : true;

    // Read question count
    var countRadio = document.querySelector('input[name="mkCount"]:checked');
    N = countRadio ? parseInt(countRadio.value, 10) : 20;
    SECS = N * 60; // 1 min per question

    qs = shuffle(bank).slice(0, N).map(function (b) {
      return {
        s: b.s,
        q: b.q,
        e: b.e,
        o: shuffle(b.o.map(function (t, k) { return { t: t, ok: k === b.a }; }))
      };
    });

    ans = qs.map(function () { return -1; });
    flags = qs.map(function () { return false; });
    i = 0;
    left = SECS;

    $('#mkSetup').hidden = true;
    $('#mkResult').hidden = true;
    $('#mkPanel').hidden = false;
    $('#mkTimer').textContent = fmt(left);

    clearInterval(timer);
    timer = setInterval(function () {
      left--;
      $('#mkTimer').textContent = fmt(Math.max(left, 0));
      if (left <= 0) {
        clearInterval(timer);
        alert('Time is up! Submitting your test automatically.');
        submit();
      }
    }, 1000);

    render();
  }

  function renderPalette() {
    var pal = $('#mkPalette');
    if (!pal) return;
    pal.innerHTML = '';
    qs.forEach(function (_, k) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette-btn' + (k === i ? ' current' : '') + (ans[k] >= 0 ? ' answered' : '') + (flags[k] ? ' flagged' : '');
      btn.textContent = k + 1;
      btn.addEventListener('click', function () {
        i = k;
        render();
      });
      pal.appendChild(btn);
    });
  }

  function render() {
    var q = qs[i];
    $('#mkCount').textContent = 'QUESTION ' + (i + 1) + ' OF ' + qs.length + ' (' + q.s + ')';
    $('#mkQuestion').textContent = q.q;

    var box = $('#mkOptions');
    box.innerHTML = '';
    q.o.forEach(function (o, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = o.t;
      if (ans[i] === k) b.classList.add('selected-ans');
      b.addEventListener('click', function () {
        ans[i] = k;
        render();
      });
      box.appendChild(b);
    });

    var flagBtn = $('#mkFlag');
    if (flagBtn) {
      flagBtn.textContent = flags[i] ? '★ Flagged for Review' : '☆ Flag for Review';
      flagBtn.classList.toggle('active', flags[i]);
    }

    $('#mkPrev').disabled = (i === 0);
    $('#mkNext').disabled = (i === qs.length - 1);

    renderPalette();
  }

  function submit() {
    clearInterval(timer);
    var correct = 0, wrongCount = 0, unattempted = 0;
    var bySubject = {}, wrongList = [];

    qs.forEach(function (q, k) {
      bySubject[q.s] = bySubject[q.s] || { c: 0, w: 0, u: 0, t: 0 };
      bySubject[q.s].t++;

      if (ans[k] === -1) {
        unattempted++;
        bySubject[q.s].u++;
      } else if (q.o[ans[k]].ok) {
        correct++;
        bySubject[q.s].c++;
      } else {
        wrongCount++;
        bySubject[q.s].w++;
        wrongList.push({ q: q, a: ans[k] });
      }
    });

    var penalty = useNegative ? (wrongCount * 0.25) : 0;
    var netScore = Math.max(0, correct - penalty);
    var used = SECS - Math.max(left, 0);

    $('#mkPanel').hidden = true;
    $('#mkResult').hidden = false;

    $('#mkScore').innerHTML = 'Net Score: <strong>' + netScore.toFixed(2) + ' / ' + qs.length + '</strong>' +
      (useNegative ? ' <small style="font-size:14px;color:#64748b;">(+1 for correct, -0.25 for incorrect)</small>' : '');

    $('#mkMessage').innerHTML = '<strong>Time:</strong> ' + fmt(used) + ' &bull; ' +
      '<strong>Correct:</strong> ' + correct + ' &bull; ' +
      '<strong>Incorrect:</strong> ' + wrongCount + ' &bull; ' +
      '<strong>Unattempted:</strong> ' + unattempted + ' &bull; ' +
      '<strong>Accuracy:</strong> ' + (correct + wrongCount > 0 ? Math.round((correct / (correct + wrongCount)) * 100) : 0) + '%';

    // Diagnostic subject breakdown
    var br = $('#mkBreak');
    br.innerHTML = '<h4 class="mock-h" style="margin-top:20px;">Subject-wise Diagnostic Breakdown</h4>';
    var table = document.createElement('table');
    table.className = 'finder-table';
    table.style.marginTop = '10px';
    table.innerHTML = '<thead><tr><th>Subject</th><th>Attempted</th><th>Correct</th><th>Accuracy</th></tr></thead><tbody></tbody>';
    var tbody = table.querySelector('tbody');

    Object.keys(bySubject).forEach(function (s) {
      var sub = bySubject[s];
      var att = sub.c + sub.w;
      var pct = att > 0 ? Math.round((sub.c / att) * 100) : 0;
      var tr = document.createElement('tr');
      tr.innerHTML = '<td><strong>' + s + '</strong></td>' +
        '<td>' + att + ' / ' + sub.t + '</td>' +
        '<td style="color:' + (sub.c > 0 ? '#1b5e20' : '#64748b') + ';font-weight:700;">' + sub.c + '</td>' +
        '<td><span class="spotlight-badge ' + (pct >= 70 ? 'badge-section' : pct >= 40 ? 'badge-constitution' : 'badge-maxim') + '">' + pct + '%</span></td>';
      tbody.appendChild(tr);
    });
    br.appendChild(table);

    // Review list
    var rv = $('#mkReview');
    rv.innerHTML = '';
    if (!wrongList.length) {
      rv.innerHTML = '<p style="color:#1b5e20;font-weight:700;">Outstanding! You did not miss any questions.</p>';
    } else {
      wrongList.forEach(function (w) {
        var d = document.createElement('div');
        d.className = 'review-item';
        var h = document.createElement('b');
        h.textContent = w.q.q;
        var good = w.q.o.filter(function (o) { return o.ok; })[0].t;
        var p = document.createElement('p');
        p.innerHTML = '<span style="color:#b71c1c;font-weight:700;">Your answer:</span> ' + w.q.o[w.a].t + '<br>' +
          '<span style="color:#1b5e20;font-weight:700;">Correct answer:</span> ' + good + '<br>' +
          '<span style="color:#475569;">Explanation:</span> ' + w.q.e;
        d.appendChild(h);
        d.appendChild(p);
        rv.appendChild(d);
      });
    }

    try {
      var list = JSON.parse(localStorage.getItem('ll_mock') || '[]');
      list.unshift({
        date: new Date().toISOString().slice(0, 10),
        score: netScore.toFixed(2),
        total: qs.length,
        time: fmt(used)
      });
      localStorage.setItem('ll_mock', JSON.stringify(list.slice(0, 20)));
    } catch (e) {}
  }

  $('#mkStart').addEventListener('click', start);
  $('#mkAgain').addEventListener('click', start);
  $('#mkPrev').addEventListener('click', function () { if (i > 0) { i--; render(); } });
  $('#mkNext').addEventListener('click', function () { if (i < qs.length - 1) { i++; render(); } });

  var flagBtn = $('#mkFlag');
  if (flagBtn) {
    flagBtn.addEventListener('click', function () {
      flags[i] = !flags[i];
      render();
    });
  }

  $('#mkSubmit').addEventListener('click', function () {
    var unans = ans.filter(function (a) { return a === -1; }).length;
    var msg = unans > 0
      ? 'You have ' + unans + ' unattempted question(s). Are you sure you want to submit now?'
      : 'Submit your test now and calculate your score?';
    if (confirm(msg)) submit();
  });
})();
