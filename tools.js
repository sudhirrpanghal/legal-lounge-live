(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- Generic list filter (case library and section finder) ---- */
  function listFilter(opts) {
    var input = $(opts.input), group = $(opts.group), items = $$(opts.items), empty = $(opts.empty), count = $(opts.count);
    if (!input || !group || !items.length) return;
    var active = 'All';
    function apply() {
      var q = input.value.trim().toLowerCase(), n = 0;
      items.forEach(function (el) {
        var okFilter = active === 'All' || el.getAttribute(opts.attr) === active;
        var okText = !q || (el.getAttribute('data-search') || el.textContent).toLowerCase().indexOf(q) !== -1 || el.textContent.toLowerCase().indexOf(q) !== -1;
        var show = okFilter && okText; el.hidden = !show; if (show) n++;
      });
      if (empty) empty.hidden = n !== 0;
      if (count) count.textContent = n + ' of ' + items.length + ' shown';
    }
    $$('.filter', group).forEach(function (b) {
      b.addEventListener('click', function () { active = b.getAttribute('data-filter'); apply(); });
    });
    input.addEventListener('input', apply);
    apply();
  }
  listFilter({ input: '#caseSearch', group: '#caseFilters', items: '#caseList details', empty: '#caseEmpty', count: '#caseCount', attr: 'data-subject' });
  listFilter({ input: '#finderSearch', group: '#finderFilters', items: '#finderBody tr', empty: '#finderEmpty', count: '#finderCount', attr: 'data-law' });

  /* ---- Quiz bank ---- */
  var C = 'Constitutional Law', K = 'Criminal Law and Procedure', T = 'Contract Law', M = 'Legal Maxims', N = 'New Criminal Codes';
  var BANK = [
    { s: C, q: 'Which Article of the Constitution of India protects life and personal liberty?', o: ['Article 14', 'Article 19', 'Article 21', 'Article 25'], a: 2, e: 'Article 21 protects life and personal liberty. Its meaning has been widened by many judgments, such as Maneka Gandhi.' },
    { s: C, q: 'Fundamental Duties are found in which Part of the Constitution?', o: ['Part III', 'Part IV', 'Part IVA', 'Part V'], a: 2, e: 'Fundamental Duties are in Part IVA (Article 51A), added by the 42nd Amendment.' },
    { s: C, q: 'Which Article abolishes untouchability?', o: ['Article 15', 'Article 16', 'Article 17', 'Article 18'], a: 2, e: 'Article 17 abolishes untouchability and forbids its practice in any form.' },
    { s: C, q: 'Which case is best known for the basic structure doctrine?', o: ['Golaknath v. State of Punjab', 'Kesavananda Bharati v. State of Kerala', 'Maneka Gandhi v. Union of India', 'Shankari Prasad v. Union of India'], a: 1, e: 'Kesavananda Bharati (1973) held that Parliament cannot alter the basic structure of the Constitution.' },
    { s: C, q: 'Which Article makes free and compulsory education a fundamental right for children aged 6 to 14?', o: ['Article 21A', 'Article 29', 'Article 45', 'Article 51A'], a: 0, e: 'Article 21A, inserted by the 86th Amendment, provides this right.' },
    { s: C, q: 'Which Article gives the right to move the Supreme Court for enforcement of Fundamental Rights?', o: ['Article 32', 'Article 124', 'Article 136', 'Article 226'], a: 0, e: 'Article 32 is the right to constitutional remedies. Dr B.R. Ambedkar called it the heart and soul of the Constitution.' },
    { s: C, q: 'A High Court’s writ power under Article 226 can be used for:', o: ['Only Fundamental Rights', 'Fundamental Rights and also any other purpose', 'Only service matters', 'Only criminal matters'], a: 1, e: 'Article 226 is wider than Article 32. It covers Fundamental Rights and “any other purpose”.' },
    { s: C, q: 'Which Article gives protection against arrest and detention in certain cases?', o: ['Article 20', 'Article 22', 'Article 23', 'Article 24'], a: 1, e: 'Article 22 gives safeguards on arrest and detention, including being informed of the grounds and being produced before a magistrate.' },
    { s: C, q: 'Which clause of Article 19(1) protects the right to assemble peaceably and without arms?', o: ['19(1)(a)', '19(1)(b)', '19(1)(c)', '19(1)(d)'], a: 1, e: 'Article 19(1)(b) protects peaceful assembly, subject to reasonable restrictions under Article 19(3).' },

    { s: K, q: 'In criminal law, “mens rea” refers to:', o: ['The physical act', 'The mental element of an offence', 'The punishment', 'The court with jurisdiction'], a: 1, e: 'Mens rea is generally the mental element. What is required depends on the offence and statute.' },
    { s: K, q: '“Actus reus” refers to:', o: ['The guilty mind', 'The guilty act or conduct element', 'A defence', 'A type of evidence'], a: 1, e: 'Actus reus is the conduct or physical element of an offence.' },
    { s: K, q: 'Which writ is used to challenge illegal detention?', o: ['Mandamus', 'Certiorari', 'Habeas corpus', 'Quo warranto'], a: 2, e: 'Habeas corpus requires the detained person to be brought before the court so the legality of detention can be examined.' },
    { s: K, q: 'What is a “Zero FIR”?', o: ['An FIR with no accused named', 'An FIR registered at any police station regardless of jurisdiction, then transferred', 'An FIR closed without action', 'An FIR for a minor offence'], a: 1, e: 'A Zero FIR can be registered at any police station and is then transferred to the station with jurisdiction. The BNSS provides for it in Section 173.' },
    { s: K, q: 'What does the right to “default bail” generally mean?', o: ['Bail granted automatically for every offence', 'Bail as of right if the investigation is not completed within the prescribed time', 'Bail given only by the Supreme Court', 'Bail for first-time offenders only'], a: 1, e: 'If the police do not complete the investigation within the time limit (60 or 90 days, depending on the offence), the accused can claim default bail. This is in Section 187 of the BNSS.' },
    { s: K, q: 'A confession made to a police officer is generally:', o: ['Admissible against the accused', 'Not admissible against the accused', 'Admissible only in civil cases', 'Admissible only if signed by a witness'], a: 1, e: 'A confession to a police officer cannot be used against the accused, subject to the discovery provision. See Section 23 of the Bharatiya Sakshya Adhiniyam, 2023.' },
    { s: K, q: 'In a criminal trial, who generally carries the burden of proving guilt?', o: ['The accused', 'The prosecution', 'The judge', 'The complainant’s lawyer only'], a: 1, e: 'The accused is presumed innocent, and the prosecution must prove guilt beyond reasonable doubt, subject to certain statutory exceptions.' },
    { s: K, q: 'In the Arnesh Kumar case, the Supreme Court said that arrest in offences punishable up to seven years should:', o: ['Always follow an FIR', 'Not be routine and must be justified in recorded reasons', 'Be made by a magistrate only', 'Not be made at all'], a: 1, e: 'The Court held that arrest is not a matter of course and directed police to record reasons based on the statutory conditions.' },

    { s: T, q: 'Which of these is NOT a general requirement under Section 10 of the Indian Contract Act, 1872?', o: ['Free consent', 'Lawful consideration', 'Competent parties', 'Registration of every contract in court'], a: 3, e: 'Section 10 requires free consent, competent parties, lawful consideration and object, and that the agreement is not expressly declared void. Registration is required only for some contracts under other laws.' },
    { s: T, q: 'Under Indian law, a minor’s agreement is:', o: ['Valid', 'Voidable', 'Void', 'Enforceable if beneficial'], a: 2, e: 'In Mohori Bibee v. Dharmodas Ghose, the Privy Council held that a minor’s agreement is void from the start.' },
    { s: T, q: 'Under Section 27 of the Indian Contract Act, an agreement in restraint of trade is generally:', o: ['Valid', 'Void', 'Voidable', 'Valid if written'], a: 1, e: 'Section 27 says agreements in restraint of trade are void, subject to limited exceptions.' },
    { s: T, q: 'Under Indian law, consideration may move from:', o: ['Only the promisee', 'The promisee or any other person', 'Only the promisor', 'Only a third party'], a: 1, e: 'Section 2(d) of the Indian Contract Act says consideration can move from the promisee or any other person.' },
    { s: T, q: 'The rule in Hadley v. Baxendale deals with:', o: ['Capacity to contract', 'Remoteness of damages', 'Misrepresentation', 'Acceptance by post'], a: 1, e: 'Hadley v. Baxendale limits damages to losses arising naturally or reasonably in the contemplation of both parties. Section 73 of the Indian Contract Act reflects this approach.' },
    { s: T, q: 'What does “quantum meruit” mean?', o: ['As much as is earned', 'By force of law', 'A fair price', 'Unforeseen event'], a: 0, e: 'Quantum meruit means “as much as is earned”, a claim for reasonable payment for work done.' },
    { s: T, q: 'Which section of the Indian Contract Act defines “coercion”?', o: ['Section 13', 'Section 15', 'Section 17', 'Section 19'], a: 1, e: 'Section 15 defines coercion. Section 16 deals with undue influence, Section 17 with fraud and Section 18 with misrepresentation.' },
    { s: T, q: 'Carlill v. Carbolic Smoke Ball Co. is a leading case on:', o: ['Offer to the world accepted by performance', 'Undue influence', 'Minor’s contracts', 'Frustration of contract'], a: 0, e: 'The Court of Appeal held that the advertisement was an offer to the world, which anyone could accept by performing its conditions.' },

    { s: M, q: '“Ignorantia juris non excusat” means:', o: ['Ignorance of the law is no excuse', 'Justice delayed is justice denied', 'The burden of proof lies on the accuser', 'No one is above the law'], a: 0, e: 'It means ignorance of the law does not excuse a person from complying with it.' },
    { s: M, q: '“Audi alteram partem” is a principle of natural justice that means:', o: ['Let the buyer beware', 'Hear the other side', 'No one should be judge in their own cause', 'The thing speaks for itself'], a: 1, e: 'Audi alteram partem means “hear the other side”: a person must get a fair chance to be heard.' },
    { s: M, q: '“Nemo judex in causa sua” means:', o: ['No one should be a judge in their own cause', 'Nobody is above the law', 'Where there is a right, there is a remedy', 'Let the decision stand'], a: 0, e: 'It is the rule against bias in natural justice.' },
    { s: M, q: '“Ubi jus ibi remedium” means:', o: ['Where there is a right, there is a remedy', 'Ignorance is no excuse', 'The law is silent in war', 'By his own act'], a: 0, e: 'It means wherever there is a legal right, there should be a legal remedy.' },
    { s: M, q: '“Volenti non fit injuria” is a defence in tort based on:', o: ['Necessity', 'Consent to the risk', 'Statutory authority', 'Inevitable accident'], a: 1, e: 'It means no wrong is done to a person who consents to the risk, subject to limits.' },
    { s: M, q: '“Res ipsa loquitur” is most often used in cases of:', o: ['Defamation', 'Negligence', 'Contract', 'Trespass'], a: 1, e: 'Res ipsa loquitur means “the thing speaks for itself” and helps infer negligence in certain situations where the accident would not normally happen without it.' },
    { s: M, q: '“Stare decisis” refers to:', o: ['Following earlier decisions', 'Staying a proceeding', 'Standing in court', 'Statutory interpretation only'], a: 0, e: 'Stare decisis is the doctrine of precedent. Under Article 141, law declared by the Supreme Court binds all courts in India.' },
    { s: M, q: 'What is the “ratio decidendi” of a judgment?', o: ['Passing remarks by the judge', 'The legal principle on which the decision rests', 'The order on costs', 'The facts of the case'], a: 1, e: 'The ratio decidendi is the reasoning or principle essential to the decision. It is the part that carries precedent value.' },

    { s: N, q: 'Which section of the Bharatiya Nyaya Sanhita, 2023 deals with murder (formerly Section 302 IPC)?', o: ['Section 101', 'Section 103', 'Section 105', 'Section 302'], a: 1, e: 'Murder is punished under Section 103 of the BNS. BNS 302 is a different provision.' },
    { s: N, q: 'The Bharatiya Nagarik Suraksha Sanhita, 2023 replaced which law?', o: ['The Indian Penal Code, 1860', 'The Code of Criminal Procedure, 1973', 'The Indian Evidence Act, 1872', 'The Information Technology Act, 2000'], a: 1, e: 'The BNSS replaced the CrPC.' },
    { s: N, q: 'The Bharatiya Sakshya Adhiniyam, 2023 replaced which law?', o: ['The Indian Penal Code, 1860', 'The Code of Criminal Procedure, 1973', 'The Indian Evidence Act, 1872', 'The Indian Contract Act, 1872'], a: 2, e: 'The BSA replaced the Indian Evidence Act, 1872.' },
    { s: N, q: 'On what date did the BNS, BNSS and BSA come into force?', o: ['26 January 2024', '1 April 2024', '1 July 2024', '15 August 2024'], a: 2, e: 'The three new laws came into force on 1 July 2024.' },
    { s: N, q: 'Which provision of the BSA corresponds to Section 65B of the Evidence Act on electronic records?', o: ['Section 57', 'Section 61', 'Section 63', 'Section 65'], a: 2, e: 'Section 63 of the BSA deals with the admissibility of electronic records, and it includes a prescribed certificate format.' },
    { s: N, q: 'Cheating (formerly Section 420 IPC) is dealt with in which BNS section?', o: ['Section 316', 'Section 318', 'Section 420', 'Section 420A'], a: 1, e: 'Cheating is grouped under Section 318 of the BNS, with the old Section 420 offence in 318(4).' },
    { s: N, q: 'Which BNSS section deals with anticipatory bail (formerly Section 438 CrPC)?', o: ['Section 438', 'Section 480', 'Section 482', 'Section 528'], a: 2, e: 'Anticipatory bail is now Section 482 of the BNSS.' },
    { s: N, q: 'Which BNSS section now preserves the inherent powers of the High Court (formerly Section 482 CrPC)?', o: ['Section 482', 'Section 483', 'Section 528', 'Section 530'], a: 2, e: 'The High Court’s inherent powers are now in Section 528 of the BNSS.' },
    {"s": "Constitutional Law", "q": "Which writ means “by what authority”?", "o": ["Mandamus", "Quo warranto", "Prohibition", "Certiorari"], "a": 1, "e": "Quo warranto challenges a person’s right to hold a public office."},
    {"s": "Constitutional Law", "q": "Under which Article can the President seek the Supreme Court’s advisory opinion?", "o": ["Article 131", "Article 136", "Article 143", "Article 226"], "a": 2, "e": "Article 143 gives the President the power to consult the Supreme Court on questions of law or fact."},
    {"s": "Constitutional Law", "q": "Which Article makes the law declared by the Supreme Court binding on all courts in India?", "o": ["Article 136", "Article 141", "Article 142", "Article 144"], "a": 1, "e": "Article 141 makes the law declared by the Supreme Court binding on all courts in India."},
    {"s": "Constitutional Law", "q": "Which Constitutional Amendment inserted Article 21A, the right to education?", "o": ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"], "a": 3, "e": "Article 21A was inserted by the 86th Amendment, 2002."},
    {"s": "Criminal Law and Procedure", "q": "The “rarest of rare” test for the death penalty comes from which case?", "o": ["Maneka Gandhi v. Union of India", "Bachan Singh v. State of Punjab", "Arnesh Kumar v. State of Bihar", "Lalita Kumari v. Government of U.P."], "a": 1, "e": "Bachan Singh (1980) upheld the death penalty but said it should be imposed only in the rarest of rare cases."},
    {"s": "Criminal Law and Procedure", "q": "Which Article protects against double jeopardy and self-incrimination?", "o": ["Article 19", "Article 20", "Article 21", "Article 22"], "a": 1, "e": "Article 20 protects against retrospective penal laws, double jeopardy and compulsion to be a witness against oneself."},
    {"s": "Criminal Law and Procedure", "q": "The saying “bail, not jail” generally means:", "o": ["Release before trial is the usual rule, and detention the exception", "Bail is available for every offence automatically", "Bail can only be given by the Supreme Court", "Bail is for first-time offenders only"], "a": 0, "e": "Courts have often said so, but they still weigh factors such as the seriousness of the offence and the risk of the accused absconding."},
    {"s": "Criminal Law and Procedure", "q": "What can the police generally do in a cognizable offence?", "o": ["Only record a complaint", "Arrest without a warrant and start an investigation", "Try the case themselves", "Do nothing until a trial starts"], "a": 1, "e": "In a cognizable offence the police can generally arrest without a warrant and investigate without a magistrate’s order."},
    {"s": "Contract Law", "q": "Under Section 56 of the Indian Contract Act, an agreement to do an act impossible in itself is:", "o": ["Void", "Voidable", "Valid", "Enforceable in part"], "a": 0, "e": "Section 56 says such an agreement is void. It also covers contracts that become impossible after they are made."},
    {"s": "Contract Law", "q": "Which section of the Indian Contract Act deals with compensation where a sum is named as payable on breach?", "o": ["Section 73", "Section 74", "Section 75", "Section 76"], "a": 1, "e": "Section 74 deals with named sums and penalties on breach. Section 73 deals with general compensation for breach."},
    {"s": "Contract Law", "q": "Balfour v. Balfour is a leading case on:", "o": ["Intention to create legal relations", "Minor’s agreements", "Frustration of contract", "Misrepresentation"], "a": 0, "e": "The Court held that domestic arrangements between spouses are presumed not to create legal relations."},
    {"s": "Contract Law", "q": "A contract caused by undue influence is:", "o": ["Void", "Voidable at the option of the party whose consent was so caused", "Always valid", "Illegal"], "a": 1, "e": "Section 19A of the Indian Contract Act makes it voidable at the option of the affected party."},
    {"s": "Legal Maxims", "q": "“Ejusdem generis” is a rule of interpretation meaning:", "o": ["Of the same kind", "By the same author", "From the same source", "Of the same time"], "a": 0, "e": "General words that follow specific words are read as limited to things of the same kind."},
    {"s": "Legal Maxims", "q": "“Pacta sunt servanda” means:", "o": ["Agreements must be kept", "The people’s welfare is paramount", "Let the buyer beware", "Silence means consent"], "a": 0, "e": "It is a basic principle of contract law and international law that agreements must be honoured."},
    {"s": "Legal Maxims", "q": "“Damnum sine injuria” refers to:", "o": ["Damage without a legal wrong", "A legal wrong without damage", "Damage caused on purpose", "Compensation for loss"], "a": 0, "e": "Loss that does not result from a violation of a legal right gives no claim."},
    {"s": "Legal Maxims", "q": "“Nemo dat quod non habet” means:", "o": ["No one gives what they do not have", "No one is above the law", "No one may be tried twice", "No one may be punished without a hearing"], "a": 0, "e": "A person cannot transfer a better title than they themselves have, subject to exceptions."},
    {"s": "New Criminal Codes", "q": "Which BNSS section deals with the FIR (formerly Section 154 CrPC)?", "o": ["Section 154", "Section 173", "Section 180", "Section 193"], "a": 1, "e": "The FIR provision is Section 173 of the BNSS."},
    {"s": "New Criminal Codes", "q": "Which BNSS section deals with the police report on completing an investigation (formerly Section 173 CrPC)?", "o": ["Section 173", "Section 187", "Section 193", "Section 210"], "a": 2, "e": "The police report (chargesheet) is dealt with in Section 193 of the BNSS."},
    {"s": "New Criminal Codes", "q": "Which BNS section punishes rape (formerly Section 376 IPC)?", "o": ["Section 62", "Section 63", "Section 64", "Section 65"], "a": 2, "e": "Rape is defined in Section 63 and punished in Section 64 of the BNS."},
    {"s": "New Criminal Codes", "q": "Criminal conspiracy (formerly Section 120B IPC) is dealt with in which BNS section?", "o": ["Section 45", "Section 61", "Section 62", "Section 109"], "a": 1, "e": "Criminal conspiracy is in Section 61 of the BNS."},
    {"s": "Torts and Civil Law", "q": "A tort is best described as:", "o": ["A criminal offence", "A civil wrong other than a breach of contract, for which damages can be claimed", "A breach of contract", "A type of tax"], "a": 1, "e": "Torts are civil wrongs such as negligence or nuisance, remedied mainly by damages."},
    {"s": "Torts and Civil Law", "q": "Which case laid down the “neighbour principle” in negligence?", "o": ["Rylands v. Fletcher", "Donoghue v. Stevenson", "Hadley v. Baxendale", "Carlill v. Carbolic Smoke Ball Co."], "a": 1, "e": "Donoghue v. Stevenson (1932) is the foundation of the modern law of negligence."},
    {"s": "Torts and Civil Law", "q": "The rule of absolute liability in India comes from which case?", "o": ["M.C. Mehta v. Union of India (Oleum Gas Leak)", "Olga Tellis v. Bombay Municipal Corporation", "Vishaka v. State of Rajasthan", "Bachan Singh v. State of Punjab"], "a": 0, "e": "The Supreme Court laid down absolute liability for hazardous industries in the Oleum Gas Leak case."},
    {"s": "Torts and Civil Law", "q": "Vicarious liability means:", "o": ["Liability for one’s own intentional acts only", "Liability of one person for the wrongful act of another, such as an employer for an employee", "Liability without any fault ever", "Liability only under a contract"], "a": 1, "e": "An employer can be liable for an employee’s wrongful act committed in the course of employment."},
    {"s": "Torts and Civil Law", "q": "Which of these is NOT an essential element of the tort of negligence?", "o": ["Duty of care", "Breach of that duty", "Damage caused by the breach", "Intention to cause harm"], "a": 3, "e": "Negligence needs duty, breach and resulting damage. Intention to harm is not required."},
    {"s": "Torts and Civil Law", "q": "In civil procedure, a “decree” is:", "o": ["Any order of a court", "The formal expression of a court’s decision that conclusively decides the rights of the parties in a suit", "A summons to a witness", "A police report"], "a": 1, "e": "Section 2(2) of the Code of Civil Procedure, 1908 defines a decree."},
    {"s": "Torts and Civil Law", "q": "The main purpose of a limitation law, such as the Limitation Act, 1963, is to:", "o": ["Set time limits within which legal proceedings must be started", "Limit the amount of damages", "Limit who can become a lawyer", "Limit the number of appeals to one"], "a": 0, "e": "Limitation laws bar the remedy after a prescribed time to give certainty and prevent stale claims."},
    {"s": "Torts and Civil Law", "q": "In the Code of Civil Procedure, res judicata is found in which section?", "o": ["Section 9", "Section 10", "Section 11", "Section 12"], "a": 2, "e": "Section 11 of the CPC deals with res judicata. Section 10 deals with stay of a suit where the matter is already pending."}
  ];
  window.LL_BANK = BANK;
  var quizSetup = $('#qzSetup');
  if (quizSetup) {
    var panel = $('#qzPanel'), cur = [], idx = 0, score = 0, missed = [], subject = '';
    var counts = {};
    BANK.forEach(function (b) { counts[b.s] = (counts[b.s] || 0) + 1; });
    $$('.subject-count').forEach(function (el) {
      var k = el.getAttribute('data-count');
      el.textContent = k === 'Mixed' ? '10 questions' : (counts[k] || 0) + ' questions';
    });
    var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    var start = function (name) {
      subject = name;
      var pool = name === 'Mixed' ? shuffle(BANK).slice(0, 10) : shuffle(BANK.filter(function (b) { return b.s === name; }));
      cur = pool.map(function (b) {
        var opts = b.o.map(function (t, i) { return { t: t, ok: i === b.a }; });
        return { q: b.q, e: b.e, o: shuffle(opts) };
      });
      idx = 0; score = 0; missed = [];
      quizSetup.hidden = true; panel.hidden = false; $('#qzResult').hidden = true;
      render();
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    var render = function () {
      var item = cur[idx];
      $('#qzCount').textContent = (subject === 'Mixed' ? 'MIXED' : subject.toUpperCase()) + ' · QUESTION ' + (idx + 1) + ' OF ' + cur.length;
      $('#qzQuestion').hidden = false; $('#qzOptions').hidden = false;
      $('#qzQuestion').textContent = item.q;
      $('#qzFeedback').textContent = ''; $('#qzNext').hidden = true;
      var box = $('#qzOptions'); box.innerHTML = '';
      item.o.forEach(function (opt) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = opt.t;
        b.addEventListener('click', function () { choose(b, opt); });
        box.appendChild(b);
      });
    };
    var choose = function (btn, opt) {
      var item = cur[idx], btns = $$('#qzOptions button');
      btns.forEach(function (b, i) {
        b.disabled = true;
        if (item.o[i].ok) b.classList.add('correct');
      });
      if (opt.ok) score++; else { btn.classList.add('incorrect'); missed.push(item); }
      $('#qzFeedback').textContent = (opt.ok ? 'Correct. ' : 'Not quite. ') + item.e;
      var n = $('#qzNext'); n.textContent = idx === cur.length - 1 ? 'See your score →' : 'Next question →'; n.hidden = false;
    };
    var finish = function () {
      $('#qzQuestion').hidden = true; $('#qzOptions').hidden = true; $('#qzFeedback').textContent = ''; $('#qzNext').hidden = true;
      $('#qzCount').textContent = 'QUIZ COMPLETE';
      $('#qzScore').textContent = 'You scored ' + score + ' out of ' + cur.length + '.';
      try { var P = JSON.parse(localStorage.getItem('ll_progress') || '{}'); var k = subject; P[k] = P[k] || { attempts: 0, best: 0 }; P[k].attempts++; P[k].best = Math.max(P[k].best, score); P[k].total = cur.length; P[k].last = new Date().toISOString().slice(0, 10); localStorage.setItem('ll_progress', JSON.stringify(P)); } catch (e) {}
      $('#qzMessage').textContent = score === cur.length ? 'Excellent. A perfect score.' : 'Review the questions you missed below, then try again.';
      var rev = $('#qzReview'); rev.innerHTML = '';
      missed.forEach(function (m) {
        var d = document.createElement('div'); d.className = 'review-item';
        var h = document.createElement('b'); h.textContent = m.q;
        var correct = m.o.filter(function (o) { return o.ok; })[0].t;
        var p = document.createElement('p'); p.textContent = 'Answer: ' + correct + '. ' + m.e;
        d.appendChild(h); d.appendChild(p); rev.appendChild(d);
      });
      $('#qzResult').hidden = false;
    };
    $$('.subject-card').forEach(function (b) { b.addEventListener('click', function () { start(b.getAttribute('data-subject')); }); });
    $('#qzNext').addEventListener('click', function () { if (idx === cur.length - 1) finish(); else { idx++; render(); } });
    $('#qzAgain').addEventListener('click', function () { start(subject); });
    var back = function () { panel.hidden = true; quizSetup.hidden = false; };
    $('#qzBack').addEventListener('click', back); $('#qzClose').addEventListener('click', back);
  }
})();
