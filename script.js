(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Footer year
  var year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var menuToggle = $('#menuToggle'), mainNav = $('#mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? '×' : '☰';
    });
    $$('a', mainNav).forEach(function (a) {
      a.addEventListener('click', function () {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });
  }

  // Current page in navigation
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  // Some pages belong under another menu item.
  var BELONGS_TO = {
    'blogs.html': ['write-blog.html', 'articles.html'],
    'journal.html': ['research-papers.html', 'legal-articles.html', 'case-notes.html', 'case-law.html', 'sample-paper-legal-compliance.html', 'sample-article-state-exemptions.html'],
    'bare-acts.html': ['bns-guide.html', 'bnss-guide.html', 'bsa-guide.html', 'criminal-codes.html']
  };
  if (file.indexOf('article-') === 0) file = 'blogs.html';
  Object.keys(BELONGS_TO).forEach(function (item) {
    if (BELONGS_TO[item].indexOf(file) > -1) file = item;
  });
  $$('.main-nav a').forEach(function (a) {
    if ((a.getAttribute('href') || '').toLowerCase() === file) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // Article search and filters
  var search = $('#articleSearch'), cards = $$('.article-card'), empty = $('#emptyState'), active = 'All';
  var filters = $$('.filter');
  function filterArticles() {
    var q = (search && search.value || '').trim().toLowerCase(), visible = 0;
    cards.forEach(function (card) {
      var cat = card.dataset.category || '';
      var text = ((card.dataset.search || '') + ' ' + card.textContent).toLowerCase();
      var show = (active === 'All' || cat === active) && (!q || text.indexOf(q) !== -1);
      card.hidden = !show; if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }
  filters.forEach(function (btn) {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', function () {
      active = btn.dataset.filter;
      filters.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      filterArticles();
    });
  });
  if (search) search.addEventListener('input', filterArticles);

  // Glossary search
  var gSearch = $('#glossarySearch');
  if (gSearch) {
    gSearch.addEventListener('input', function () {
      var q = gSearch.value.trim().toLowerCase(), n = 0;
      $$('#glossaryList details').forEach(function (d) {
        var show = !q || d.textContent.toLowerCase().indexOf(q) !== -1;
        d.hidden = !show; if (show) n++;
      });
      var ge = $('#glossaryEmpty'); if (ge) ge.hidden = n !== 0;
    });
  }

  
  // Quiz (Judiciary Exam Question Bank)
  var allQuizQuestions = window.JUDICIARY_QUIZ || [
    { q: 'Which Article of the Constitution of India guarantees equality before the law and equal protection of the laws?', o: ['Article 19', 'Article 14', 'Article 21', 'Article 32'], a: 1, e: 'Article 14 guarantees equality before the law and equal protection of the laws.' }
  ];

  function getShuffledQuiz(num) {
    var copy = allQuizQuestions.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i]; copy[i] = copy[j]; copy[j] = temp;
    }
    return copy.slice(0, Math.min(num || 10, copy.length));
  }

  var quiz = getShuffledQuiz(10);
  var quizPanel = $('#quizPanel'), qi = 0, score = 0;
  function renderQuestion() {
    var item = quiz[qi], opts = $('#quizOptions');
    $('#quizCount').textContent = 'QUESTION ' + (qi + 1) + ' OF ' + quiz.length + ' (From ' + allQuizQuestions.length + '+ Judiciary Questions)';
    $('#quizQuestion').textContent = item.q;
    $('#quizFeedback').textContent = ''; $('#quizFeedback').className = 'quiz-feedback';
    $('#nextQuiz').hidden = true;
    opts.innerHTML = '';
    item.o.forEach(function (text, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = text;
      b.addEventListener('click', function () { answer(i); });
      opts.appendChild(b);
    });
  }
  function answer(i) {
    var item = quiz[qi], btns = $('#quizOptions button');
    btns.forEach(function (b, idx) {
      b.disabled = true;
      if (idx === item.a) b.classList.add('correct');
      else if (idx === i) b.classList.add('incorrect');
    });
    if (i === item.a) score++;
    var fb = $('#quizFeedback'); fb.textContent = (i === item.a ? '✓ Correct! ' : '✗ Not quite. ') + item.e; fb.className = 'quiz-feedback ' + (i === item.a ? 'is-correct' : 'is-incorrect');
    var next = $('#nextQuiz');
    next.textContent = qi === quiz.length - 1 ? 'See your score →' : 'Next question →';
    next.hidden = false;
  }
  function finishQuiz() {
    $('#quizCount').textContent = 'QUIZ COMPLETE';
    $('#quizQuestion').textContent = 'You scored ' + score + ' out of ' + quiz.length + '.';
    $('#quizOptions').innerHTML = '';
    $('#quizFeedback').textContent = score >= 8 ? 'Outstanding score! Your judicial exam concepts are sharp.' : 'Good effort. Review landmark judgments, then try another fresh practice set.';
    var next = $('#nextQuiz'); next.textContent = 'Take another 10 questions ↺'; next.hidden = false; next.dataset.restart = '1';
  }
  if (quizPanel) {
    var start = $('#startQuiz');
    if (start) start.addEventListener('click', function () {
      quiz = getShuffledQuiz(10);
      qi = 0; score = 0; $('#nextQuiz').dataset.restart = '';
      renderQuestion(); quizPanel.hidden = false;
      quizPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    $('#closeQuiz').addEventListener('click', function () { quizPanel.hidden = true; });
    $('#nextQuiz').addEventListener('click', function () {
      if (this.dataset.restart) {
        quiz = getShuffledQuiz(10);
        qi = 0; score = 0; this.dataset.restart = ''; renderQuestion(); return;
      }
      if (qi === quiz.length - 1) { finishQuiz(); return; }
      qi++; renderQuestion();
    });
  }

  
  // Decision Room scenarios
  var scenarios = window.DECISION_SCENARIOS || [
    { type: 'EMPLOYMENT', title: 'An employee is terminated without notice.', text: 'Review contract and law.', q: 'What to examine?', o: [{ t: 'Review contract', ok: true, f: 'Good.' }] }
  ];
  var optsBox = $('#scenarioOptions');
  if (optsBox) {
    var si = 0, letters = ['A', 'B', 'C', 'D'];
    var resBox = $('#scenarioResult'), resetBtn = $('#resetScenario');
    var renderScenario = function () {
      var s = scenarios[si];
      var displayNum = (si + 1) < 10 ? '0' + (si + 1) : (si + 1);
      $('#scenarioNum').textContent = 'SCENARIO ' + displayNum + ' OF ' + scenarios.length;
      $('#scenarioType').textContent = s.type;
      $('#scenarioTitle').textContent = s.title;
      $('#scenarioText').textContent = s.text;
      $('#scenarioQuestion').textContent = s.q;
      resBox.innerHTML = ''; resBox.className = 'scenario-result'; resetBtn.hidden = true;
      optsBox.innerHTML = '';
      s.o.forEach(function (opt, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = letters[i] + ' <span></span><b>→</b>';
        b.querySelector('span').textContent = opt.t;
        b.addEventListener('click', function () {
          // Disable all option buttons
          $('button', optsBox).forEach(function (x) {
            x.disabled = true;
            x.classList.remove('selected');
          });
          // Mark correct option green
          s.o.forEach(function (op2, j) {
            if (op2.ok) $('button', optsBox)[j].classList.add('correct');
          });
          // If wrong, mark clicked button red
          if (!opt.ok) b.classList.add('incorrect');
          b.classList.add('selected');
          // Show rich result badge + explanation
          resBox.innerHTML = '<div class="scenario-result-badge ' + (opt.ok ? 'is-correct' : 'is-incorrect') + '">' + (opt.ok ? '✓ CORRECT LEGAL DECISION' : '✗ INCORRECT / RISKY LEGAL CHOICE') + '</div><p class="scenario-result-text">' + (opt.f || '') + '</p>';
          resBox.className = 'scenario-result ' + (opt.ok ? 'is-correct-result' : 'is-incorrect-result');
          resetBtn.hidden = false;
        });
        optsBox.appendChild(b);
      });
    };
    resetBtn.addEventListener('click', renderScenario);
    var nextBtn = $('#nextScenario');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () { si = (si + 1) % scenarios.length; renderScenario(); });
    }
    renderScenario();
  }

  // Reading progress on articles
  var bar = $('#readProgress'), body = $('.article-body');
  if (bar && body) {
    var update = function () {
      var r = body.getBoundingClientRect(), total = r.height - window.innerHeight * 0.5;
      var pct = total > 0 ? Math.min(100, Math.max(0, (-r.top / total) * 100)) : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true }); update();
  }
})();
