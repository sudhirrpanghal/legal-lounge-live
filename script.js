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
  if (file.indexOf('article-') === 0) file = 'articles.html';
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

  // Quiz
  var quiz = [
    { q: 'Which Article of the Constitution of India guarantees equality before the law and equal protection of the laws?', o: ['Article 19', 'Article 14', 'Article 21', 'Article 32'], a: 1, e: 'Article 14 guarantees equality before the law and equal protection of the laws.' },
    { q: 'The writ of habeas corpus is used to examine the legality of what?', o: ['A government notification', 'A person’s detention', 'An appointment to public office', 'A lower court’s order'], a: 1, e: 'Habeas corpus requires a detained person to be brought before the court so the legality of the detention can be examined.' },
    { q: 'Which Article gives the right to move the Supreme Court for enforcement of Fundamental Rights?', o: ['Article 14', 'Article 226', 'Article 32', 'Article 368'], a: 2, e: 'Article 32 is the right to constitutional remedies in the Supreme Court. Article 226 gives High Courts a similar power, and a wider one.' },
    { q: 'In criminal law, “mens rea” refers to which of the following?', o: ['The physical act', 'The mental element of an offence', 'The punishment', 'The place of the offence'], a: 1, e: 'Mens rea is generally the mental element of an offence. What is required depends on the particular offence and statute.' },
    { q: 'What does the principle of res judicata generally prevent?', o: ['Appeals to a higher court', 'Re-litigating a matter already finally decided between the same parties', 'Arrests without a warrant', 'Contracts made orally'], a: 1, e: 'Subject to its requirements and exceptions, res judicata stops the same matter between the same parties from being tried again.' },
    { q: 'Which provision protects the right to assemble peaceably and without arms?', o: ['Article 19(1)(a)', 'Article 19(1)(b)', 'Article 19(1)(c)', 'Article 19(1)(d)'], a: 1, e: 'Article 19(1)(b) protects peaceful assembly, subject to reasonable restrictions under Article 19(3).' }
  ];
  var quizPanel = $('#quizPanel'), qi = 0, score = 0;
  function renderQuestion() {
    var item = quiz[qi], opts = $('#quizOptions');
    $('#quizCount').textContent = 'QUESTION ' + (qi + 1) + ' OF ' + quiz.length;
    $('#quizQuestion').textContent = item.q;
    $('#quizFeedback').textContent = '';
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
    var item = quiz[qi], btns = $$('#quizOptions button');
    btns.forEach(function (b, idx) {
      b.disabled = true;
      if (idx === item.a) b.classList.add('correct');
      else if (idx === i) b.classList.add('incorrect');
    });
    if (i === item.a) score++;
    $('#quizFeedback').textContent = (i === item.a ? 'Correct. ' : 'Not quite. ') + item.e;
    var next = $('#nextQuiz');
    next.textContent = qi === quiz.length - 1 ? 'See your score →' : 'Next question →';
    next.hidden = false;
  }
  function finishQuiz() {
    $('#quizCount').textContent = 'QUIZ COMPLETE';
    $('#quizQuestion').textContent = 'You scored ' + score + ' out of ' + quiz.length + '.';
    $('#quizOptions').innerHTML = '';
    $('#quizFeedback').textContent = score === quiz.length ? 'Excellent. Try a case note or a Decision Room scenario next.' : 'Good effort. Review the glossary or read an explainer, then try again.';
    var next = $('#nextQuiz'); next.textContent = 'Take the quiz again ↺'; next.hidden = false; next.dataset.restart = '1';
  }
  if (quizPanel) {
    var start = $('#startQuiz');
    if (start) start.addEventListener('click', function () {
      qi = 0; score = 0; $('#nextQuiz').dataset.restart = '';
      renderQuestion(); quizPanel.hidden = false;
      quizPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    $('#closeQuiz').addEventListener('click', function () { quizPanel.hidden = true; });
    $('#nextQuiz').addEventListener('click', function () {
      if (this.dataset.restart) { qi = 0; score = 0; this.dataset.restart = ''; renderQuestion(); return; }
      if (qi === quiz.length - 1) { finishQuiz(); return; }
      qi++; renderQuestion();
    });
  }

  // Decision Room scenarios
  var scenarios = [
    { type: 'EMPLOYMENT', title: 'An employee is terminated without notice.', text: 'A worker says their employment ended suddenly. The contract, reason for termination, and applicable law have not yet been reviewed.', q: 'What should be examined first?', o: [
      { t: 'Review the contract, facts, and applicable law.', ok: true, f: 'A careful first step. The contract, the reason for termination, the facts and the applicable law help identify rights and possible remedies. The answer may vary with the worker’s status and the jurisdiction.' },
      { t: 'Assume every termination without notice is unlawful.', f: 'That conclusion is too broad. Notice requirements and lawful grounds depend on the contract, the type of employment, the applicable legislation and the facts. Avoid deciding the outcome before reviewing them.' },
      { t: 'Ignore the contract and go straight to a conclusion.', f: 'Skipping the documents risks missing important legal conditions. A sound analysis identifies the contract, the timeline, the employment status and the governing law before reaching a view.' } ] },
    { type: 'BUSINESS', title: 'A client refuses to pay after a project is delivered.', text: 'A freelancer completed a design project. The client now says the work was “not what we wanted” and has stopped replying. There is a short written agreement and an email thread.', q: 'What is a sensible first step?', o: [
      { t: 'Threaten criminal action immediately to force payment.', f: 'A payment dispute is usually a contractual matter first. Threatening criminal action without a legal basis can create risks of its own. Start from the agreement and the facts.' },
      { t: 'Gather the agreement, invoices, deliverables and messages, then check the payment and acceptance terms.', ok: true, f: 'A good start. The scope, acceptance process, payment terms and dispute clause usually shape the options, such as a reminder, a notice or a formal process. Keep records organised.' },
      { t: 'Delete the email thread and restart negotiations.', f: 'Deleting records removes useful evidence. Keep the full communication history, then decide how to approach the client.' } ] },
    { type: 'CRIMINAL / DIGITAL', title: 'You receive threatening messages from an unknown account.', text: 'A user sends you threatening messages on social media. You want to keep proof of what was sent.', q: 'What should you do with the messages?', o: [
      { t: 'Crop and edit the screenshots so they look cleaner.', f: 'Editing can raise doubts about authenticity. Keep the original files and capture the full context, including the account name, link, date and time.' },
      { t: 'Post the messages publicly to expose the sender.', f: 'Public posting can create privacy and defamation concerns and may complicate a later complaint. Report the account to the platform and consider approaching the appropriate authorities.' },
      { t: 'Preserve the originals, note the account, link and date, and seek advice on the proper steps.', ok: true, f: 'A sound approach. Keep the original content, record where and when it appeared, avoid altering it, and get qualified advice on reporting and proving it. Requirements depend on the applicable law.' } ] }
  ];
  var optsBox = $('#scenarioOptions');
  if (optsBox) {
    var si = 0, letters = ['A', 'B', 'C', 'D'];
    var resBox = $('#scenarioResult'), resetBtn = $('#resetScenario');
    var renderScenario = function () {
      var s = scenarios[si];
      $('#scenarioNum').textContent = 'SCENARIO 0' + (si + 1);
      $('#scenarioType').textContent = s.type;
      $('#scenarioTitle').textContent = s.title;
      $('#scenarioText').textContent = s.text;
      $('#scenarioQuestion').textContent = s.q;
      resBox.textContent = ''; resBox.classList.remove('caution'); resetBtn.hidden = true;
      optsBox.innerHTML = '';
      s.o.forEach(function (opt, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = letters[i] + ' <span></span><b>→</b>';
        b.querySelector('span').textContent = opt.t;
        b.addEventListener('click', function () {
          $$('button', optsBox).forEach(function (x) { x.classList.remove('selected'); });
          b.classList.add('selected');
          resBox.textContent = opt.f;
          resBox.classList.toggle('caution', !opt.ok);
          resetBtn.hidden = false;
        });
        optsBox.appendChild(b);
      });
    };
    resetBtn.addEventListener('click', renderScenario);
    $('#nextScenario').addEventListener('click', function () { si = (si + 1) % scenarios.length; renderScenario(); });
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
