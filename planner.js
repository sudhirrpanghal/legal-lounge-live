(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  if (!$('plGo')) return;
  var PLANS = {
    article: [
      ['Title', 0, 'Name the issue and the angle in about fifteen words or fewer.'],
      ['Introduction', 10, 'Hook, short background, your thesis, and a one-line roadmap.'],
      ['Legal and conceptual framework', 15, 'Only the statutes, rules and principles that your argument needs. Define key terms.'],
      ['Judicial developments', 20, 'For each key case: court and year, facts, question, holding, and why it matters here.'],
      ['Analysis of the issue', 30, 'Your own reasoning, in sub-headings. Interpretation, conflicts, gaps and practical problems.'],
      ['Critical evaluation', 10, 'Is the law adequate? Enforcement problems and unclear areas.'],
      ['Recommendations / way forward', 8, 'Practical reforms, linked to the problems you found.'],
      ['Conclusion', 7, 'Restate the concern, summarise findings, state your position. No new arguments.']
    ],
    paper: [
      ['Title', 0, 'Specific and informative. Signals topic and framework.'],
      ['Abstract (extra, 150 to 200 words)', -1, 'Objective, method, findings and conclusion. Write it last.'],
      ['Keywords (4 to 6)', -2, 'Central themes that help readers find the paper.'],
      ['Introduction', 12, 'Context, research problem, research question, objectives, scope and structure.'],
      ['Literature review', 17, 'Organise by theme or debate. Show the gap your paper addresses.'],
      ['Methodology', 9, 'Doctrinal, comparative, empirical or socio-legal, and why it fits. State limits.'],
      ['Main analysis', 42, 'Sub-headings that follow the research question. Argue, do not merely describe.'],
      ['Discussion', 12, 'Implications, strengths and weaknesses of the law, and possible reforms.'],
      ['Conclusion', 8, 'Answer the research question and restate why it matters.']
    ]
  };
  function round10(n) { return Math.max(10, Math.round(n / 10) * 10); }
  $('plGo').addEventListener('click', function () {
    var type = $('plType').value, total = parseInt(($('plWords').value || '').replace(/[^0-9]/g, ''), 10);
    var out = $('plOut'); out.innerHTML = '';
    if (!total || total < 300) { out.textContent = 'Please enter a word count of at least 300.'; return; }
    var topic = $('plTopic').value.trim(), thesis = $('plThesis').value.trim();
    var lines = [];
    var head = document.createElement('h2'); head.textContent = 'Your outline'; out.appendChild(head);
    var meta = document.createElement('p'); meta.textContent = (type === 'article' ? 'Legal article' : 'Legal research paper') + ', about ' + total + ' words.' + (topic ? ' Topic: ' + topic + '.' : '') + (thesis ? ' ' + (type === 'article' ? 'Thesis' : 'Research question') + ': ' + thesis : ''); out.appendChild(meta);
    lines.push((topic ? topic : 'Title to be decided') + (thesis ? '\n' + (type === 'article' ? 'Thesis: ' : 'Research question: ') + thesis : ''), '');
    var wrap = document.createElement('div'); wrap.className = 'finder-wrap';
    var tb = document.createElement('table'); tb.className = 'finder-table';
    tb.innerHTML = '<thead><tr><th>Section</th><th>Words</th><th>What to include</th></tr></thead>';
    var body = document.createElement('tbody');
    PLANS[type].forEach(function (p, i) {
      var tr = document.createElement('tr'), words = '';
      if (p[1] > 0) { var w = total * p[1] / 100; words = 'about ' + round10(w * 0.9) + ' to ' + round10(w * 1.1); }
      else if (p[1] === 0) words = 'under 15 words';
      else words = p[1] === -1 ? '150 to 200' : '4 to 6 terms';
      [p[0], words, p[2]].forEach(function (v, k) { var td = document.createElement('td'); if (k === 0) { var b = document.createElement('b'); b.textContent = v; td.appendChild(b); } else td.textContent = v; tr.appendChild(td); });
      body.appendChild(tr);
      lines.push((i + 1) + '. ' + p[0] + ' (' + words + ')', '   ' + p[2], '');
    });
    tb.appendChild(body); wrap.appendChild(tb); out.appendChild(wrap);
    var note = document.createElement('p'); note.textContent = 'These shares are a common starting point. Follow the word limits of the place you are submitting to.'; out.appendChild(note);
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'button button-outline-dark'; btn.textContent = 'Copy outline';
    btn.addEventListener('click', function () {
      var text = lines.join('\n');
      var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy outline'; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
      else { var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t); done(); }
    });
    out.appendChild(btn);
  });
})();
