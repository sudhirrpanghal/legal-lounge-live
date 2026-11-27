(function () {
  'use strict';

  var FLOW_DATA = {
    bnss: {
      title: "Criminal Trial Procedure under BNSS, 2023",
      desc: "From occurrence of cognizable offence to delivery of judgment under the Bharatiya Nagarik Suraksha Sanhita.",
      steps: [
        {
          num: "Step 01",
          name: "FIR / e-FIR Registration",
          statute: "Section 173 BNSS",
          desc: "Mandatory registration of cognizable offences. Formal recognition of e-FIR and Zero FIR.",
          body: "When information discloses a cognizable offence, registration of FIR is mandatory. For offences punishable between 3 and 7 years, police may conduct a preliminary enquiry within 14 days with prior permission of DSP. Informant is entitled to a free copy immediately.",
          time: "Immediate / Max 14 days for preliminary enquiry",
          precedent: "Lalita Kumari v. Govt of U.P. (2014) 2 SCC 1"
        },
        {
          num: "Step 02",
          name: "Forensic Investigation & Arrest",
          statute: "Sec 35 & 176 BNSS",
          desc: "Mandatory forensic visit for 7+ year offences; statutory notice of appearance under Sec 35(3).",
          body: "For offences punishable with 7 years or more, visits by forensic experts to crime scenes and videography of collection are mandatory. For offences under 7 years, arrest is not automatic; Notice of Appearance under Section 35(3) must be issued unless specific grounds recorded.",
          time: "Production before Magistrate within 24 hours of arrest",
          precedent: "Arnesh Kumar v. State of Bihar (2014) 8 SCC 273"
        },
        {
          num: "Step 03",
          name: "Remand & Custody Dynamics",
          statute: "Section 187 BNSS",
          desc: "Police custody of 15 days can be taken in whole or parts during first 40 or 60 days.",
          body: "Groundbreaking shift from CrPC 167: the 15-day police custody can now be staggered in parts across the initial 40 days (for 60-day investigation cases) or 60 days (for 90-day investigation cases). Default bail applies if chargesheet is not filed within 60/90 days.",
          time: "15 days police custody / Max 60 or 90 days total custody",
          precedent: "CBI v. Anupam J. Kulkarni overruled by BNSS Sec 187"
        },
        {
          num: "Step 04",
          name: "Police Report / Chargesheet",
          statute: "Section 193 BNSS",
          desc: "Submission of Final Report. Electronic filing and progress intimation to informant within 90 days.",
          body: "Upon completing investigation, the police officer forwards the Police Report to the Magistrate. BNSS mandates that the police must inform the informant or victim of the investigation progress within 90 days. Electronic copies of chargesheet and relied documents are supplied to accused under Sec 230 within 14 days.",
          time: "Progress intimation within 90 days; documents within 14 days",
          precedent: "Satender Kumar Antil v. CBI (2022) 10 SCC 51"
        },
        {
          num: "Step 05",
          name: "Framing of Charge & Discharge",
          statute: "Sections 234–241 BNSS",
          desc: "Magistrate or Sessions Judge evaluates prima facie case. Discharge or formal framing of charge.",
          body: "The Court considers the police report and documents. If the allegations are groundless, the accused is discharged. If prima facie grounds exist, formal charges are framed within a statutory target of 60 days from first hearing. The charge is read and explained to the accused.",
          time: "Target 60 days from first hearing",
          precedent: "Sanjay Kumar Rai v. State of U.P. (2021) 5 SCC 75"
        },
        {
          num: "Step 06",
          name: "Trial, Witness Protection & Judgment",
          statute: "Sec 356, 392 & 398 BNSS",
          desc: "Trial in absentia of absconders, audio-video witness examination, and judgment within 45 days.",
          body: "Prosecution examines witnesses with cross-examination. Under Section 356, trial in absentia can proceed if a proclaimed offender absconds. Section 398 mandates Witness Protection Schemes. Upon conclusion of arguments, judgment must be pronounced within 45 days and uploaded online within 7 days.",
          time: "Judgment within 45 days of concluding arguments",
          precedent: "State of Maharashtra v. Bandu (2018) 11 SCC 163"
        }
      ]
    },

    cpc: {
      title: "Commercial & Civil Suit Procedure under CPC, 1908",
      desc: "From cause of action and pre-institution mediation to decree and execution.",
      steps: [
        {
          num: "Step 01",
          name: "Pre-Institution Mediation",
          statute: "Sec 12A Commercial Courts Act",
          desc: "Mandatory pre-suit mediation unless urgent interim relief is contemplated.",
          body: "For commercial disputes of Specified Value (Rs 3 Lakhs+), exhausting pre-institution mediation before the Legal Services Authority is mandatory. If the opposite party fails to appear, a Non-Starter Report is issued, enabling suit institution.",
          time: "Completed within 3 months (extendable by 2 months)",
          precedent: "Patil Automation Pvt Ltd v. Rakheja Engineers (2022) 10 SCC 1"
        },
        {
          num: "Step 02",
          name: "Plaint Institution & Summons",
          statute: "Orders IV, V & VII CPC",
          desc: "Presentation of Plaint with Statement of Truth, documents, and issuance of court summons.",
          body: "Suit is instituted by presenting a verified Plaint under Order VII with court fee stamps. For commercial suits, Statement of Truth under Order VI Rule 15A is strictly required. Summons is issued to defendant under Order V to appear and answer claim within 30 days.",
          time: "Summons issued within 30 days of institution",
          precedent: "Salem Advocate Bar Association v. UOI (2005) 6 SCC 344"
        },
        {
          num: "Step 03",
          name: "Written Statement & Counterclaim",
          statute: "Order VIII CPC",
          desc: "Defendant must file defence within 30 days (max 120 days hard ceiling for commercial suits).",
          body: "Defendant must file Written Statement admitting or denying each allegation specifically. General denial is deemed admission. In commercial disputes, the 120-day outer limit from service of summons is mandatory and un-extendable; the right to file WS is forfeited thereafter.",
          time: "30 days (Forfeited after 120 days in commercial disputes)",
          precedent: "SCG Contracts India Pvt Ltd v. K.S. Chamankar (2019) 12 SCC 210"
        },
        {
          num: "Step 04",
          name: "Framing of Issues & Case Management",
          statute: "Orders XIV & XV-A CPC",
          desc: "Court crystallizes propositions of law and fact in dispute; fixes trial schedule.",
          body: "At the first hearing, the Court examines pleadings and documents to frame Issues of Fact and Issues of Law under Order XIV. In commercial suits, the Court holds a Case Management Hearing under Order XV-A fixing an unalterable trial calendar for witness examination and arguments.",
          time: "First hearing after pleadings completion",
          precedent: "Makhan Lal Bangal v. Manas Bhunia (2001) 2 SCC 652"
        },
        {
          num: "Step 05",
          name: "Evidence & Final Arguments",
          statute: "Orders XVIII & XIX CPC",
          desc: "Affidavits in evidence, cross-examination, and oral arguments.",
          body: "Parties lead evidence by filing affidavits of examination-in-chief under Order XVIII Rule 4. Cross-examination is conducted in open court or before a Court Commissioner. Oral arguments are advanced and written submissions filed under Order XVIII Rule 2.",
          time: "Expedited day-to-day hearing",
          precedent: "Ameer Trading Corp v. Shapoorji Data (2004) 1 SCC 702"
        },
        {
          num: "Step 06",
          name: "Judgment, Decree & Execution",
          statute: "Orders XX & XXI CPC",
          desc: "Pronouncement of judgment within 30–60 days; execution of decree under Order XXI.",
          body: "Under Order XX Rule 1, judgment must be pronounced within 30 days (exceptional cases 60 days). A formal Decree is drawn. The decree-holder enforces the decree through Order XXI via attachment of bank accounts, sale of property, or civil detention within 12 years (Art 136).",
          time: "Judgment within 30/60 days; Execution within 12 years",
          precedent: "Rahul S. Shah v. Jinendra Kumar Gandhi (2021) 6 SCC 418"
        }
      ]
    },

    ni138: {
      title: "Cheque Dishonour Pathway under Section 138 NI Act, 1881",
      desc: "Strict statutory calendar: from bank return memo to criminal conviction and interim compensation.",
      steps: [
        {
          num: "Step 01",
          name: "Cheque Dishonour & Return Memo",
          statute: "Sec 138 NI Act Proviso (a)",
          desc: "Cheque presented within validity (3 months) and returned unpaid by bank.",
          body: "Cheque must be presented within validity (3 months from issuance). Bank returns cheque unpaid with a Return Memo indicating reason ('Funds Insufficient', 'Account Closed', 'Signature Mismatch', 'Payment Stopped by Drawer').",
          time: "Within 3 months of cheque date",
          precedent: "Dashrath Rupsingh Rathod v. State of Maharashtra (2014) 9 SCC 129"
        },
        {
          num: "Step 02",
          name: "Statutory Legal Demand Notice",
          statute: "Sec 138 NI Act Proviso (b)",
          desc: "Demand notice dispatched within 30 days of receiving bank return memo.",
          body: "Payee must send a formal demand notice demanding payment of the exact cheque amount within 30 days of receiving the return memo from bank. Sent via Registered AD / Speed Post to the drawer's correct address.",
          time: "Strict 30 days from receipt of return memo",
          precedent: "K. Bhaskaran v. Sankaran Vaidhyan Balan (1999) 7 SCC 510"
        },
        {
          num: "Step 03",
          name: "15-Day Cure Window",
          statute: "Sec 138 NI Act Proviso (c)",
          desc: "Drawer has 15 statutory days from date of receipt to clear the cheque amount.",
          body: "The offence under Section 138 is not complete when the cheque bounces; it is completed ONLY when the drawer fails to make payment within 15 days of receiving the statutory notice. No complaint can be filed during this 15-day window.",
          time: "15 days from notice delivery date",
          precedent: "Kamlesh Kumar v. State of Bihar (2014) 2 SCC 473"
        },
        {
          num: "Step 04",
          name: "Filing Criminal Complaint",
          statute: "Sec 142(1)(b) NI Act",
          desc: "Complaint filed before Metropolitan Magistrate / JMFC within 1 month.",
          body: "Cause of action arises on Day 16 (the day after the 15-day window expires). The criminal complaint must be filed in court within 30 days from the date cause of action arose. Territory is governed by Section 142(2): where the payee maintains account.",
          time: "Within 1 month (30 days) of cause of action",
          precedent: "Bridgestone India Pvt Ltd v. Inderpal Singh (2016) 2 SCC 341"
        },
        {
          num: "Step 05",
          name: "Interim Compensation (20%)",
          statute: "Section 143A NI Act",
          desc: "Court may order drawer to pay up to 20% interim compensation.",
          body: "In a summary or summons trial, upon framing notice or pleading not guilty, the Court may direct drawer to deposit interim compensation not exceeding 20% of the cheque amount. Must be paid within 60 days (extendable by 30 days).",
          time: "60 days + 30 days extension",
          precedent: "Rakesh Ranjan Shrivastava v. State of Jharkhand (2024)"
        },
        {
          num: "Step 06",
          name: "Summary Trial & Judgment",
          statute: "Sec 138, 143 & 148 NI Act",
          desc: "Imprisonment up to 2 years and/or fine up to twice the cheque amount.",
          body: "Section 139 creates statutory presumption that cheque was issued for legally enforceable debt. Burden is on accused to rebut on preponderance of probability. Conviction carries up to 2 years imprisonment or fine up to twice cheque amount. Appellate court can mandate 20% deposit under Sec 148.",
          time: "Target disposal within 6 months (Sec 143(3))",
          precedent: "Rangappa v. Sri Mohan (2010) 11 SCC 441"
        }
      ]
    },

    writs: {
      title: "Constitutional Writ Jurisdiction (Article 32 vs Article 226)",
      desc: "Choosing between Supreme Court and High Courts for constitutional enforcement and judicial review.",
      steps: [
        {
          num: "Step 01",
          name: "Choice of Forum (Art 32 vs 226)",
          statute: "Articles 32 & 226 of Constitution",
          desc: "Article 32 (SC) only for Fundamental Rights; Article 226 (HC) for Fundamental Rights & 'any other purpose'.",
          body: "Article 32 is itself a Fundamental Right to move the Supreme Court, but only for enforcement of Part III rights. Article 226 is a constitutional power of High Courts with wider scope: applies to Fundamental Rights AND legal rights ('any other purpose'). HC jurisdiction cannot be bypassed without valid reasons.",
          time: "No strict limitation; doctrine of laches applies",
          precedent: "L. Chandra Kumar v. Union of India (1997) 3 SCC 261"
        },
        {
          num: "Step 02",
          name: "Locus Standi & PIL Doctrine",
          statute: "Public Interest Litigation",
          desc: "Direct victim or public-spirited citizen (PIL) for disadvantaged persons.",
          body: "Traditional rule: only aggrieved person whose rights are infringed can sue. Exception: In Public Interest Litigation (PIL), any public-spirited citizen or organisation can approach court under Article 32/226 on behalf of disadvantaged or marginalized classes unable to access court.",
          time: "Prompt filing without unexplained delay",
          precedent: "S.P. Gupta v. Union of India (1981) Supp SCC 87"
        },
        {
          num: "Step 03",
          name: "Writ of Habeas Corpus",
          statute: "Prerogative Writ 1",
          desc: "'Produce the body' — challenges illegal or unauthorized detention.",
          body: "Directs detaining authority to produce detained person and justify legal grounds for detention. If detention is without jurisdiction or violates Article 21/22, court orders immediate release. Res judicata does not bar fresh habeas corpus on fresh grounds.",
          time: "Extremely urgent; listed within 24–48 hours",
          precedent: "Sunil Batra v. Delhi Administration (1980) 3 SCC 488"
        },
        {
          num: "Step 04",
          name: "Writ of Mandamus",
          statute: "Prerogative Writ 2",
          desc: "'We command' — compels performance of public statutory duty.",
          body: "Issued against public official, statutory body, or government authority failing to perform an obligatory public duty. Prior demand for justice and refusal is required. Does not lie against private individuals or discretionary duties.",
          time: "Reasonable time post demand and refusal",
          precedent: "Comptroller & Auditor General v. K.S. Jagannathan (1986) 2 SCC 679"
        },
        {
          num: "Step 05",
          name: "Writs of Certiorari & Prohibition",
          statute: "Prerogative Writs 3 & 4",
          desc: "Certiorari quashes illegal orders; Prohibition halts pending proceedings.",
          body: "Issued against judicial/quasi-judicial bodies acting without jurisdiction, in excess of jurisdiction, or in violation of natural justice (Audi alteram partem / Nemo judex in causa sua). Prohibition stops proceedings before order; Certiorari quashes completed order.",
          time: "Challenged upon order or during excess of power",
          precedent: "Syed Yakoob v. K.S. Radhakrishnan (1964) 5 SCR 64"
        },
        {
          num: "Step 06",
          name: "Writ of Quo Warranto",
          statute: "Prerogative Writ 5",
          desc: "'By what authority' — challenges usurpation of public office.",
          body: "Inquires into legality of claim of person holding an independent substantive public office. If appointment violates statutory eligibility criteria or constitutional mandates, office is declared vacant. Any member of public has standing.",
          time: "Lies as long as illegal holding continues",
          precedent: "University of Mysore v. C.D. Govinda Rao (1964) 4 SCR 575"
        }
      ]
    }
  };

  var currentFlow = 'bnss';
  var currentStepIdx = 0;

  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  function renderFlow(flowKey) {
    currentFlow = flowKey;
    currentStepIdx = 0;
    var data = FLOW_DATA[flowKey];
    if (!data) return;

    $('flowTitle').textContent = data.title;
    $('flowDesc').textContent = data.desc;

    // Render pipeline cards
    var container = $('pipelineSteps');
    container.innerHTML = '';
    data.steps.forEach(function (step, idx) {
      var card = document.createElement('div');
      card.className = 'pipeline-card' + (idx === 0 ? ' active' : '');
      card.innerHTML = '<div class="pipeline-step-num">' + step.num + '</div>' +
        '<h3>' + step.name + '</h3>' +
        '<p>' + step.desc + '</p>';
      card.addEventListener('click', function () {
        selectStep(idx);
      });
      container.appendChild(card);
    });

    selectStep(0);
  }

  function selectStep(idx) {
    currentStepIdx = idx;
    var data = FLOW_DATA[currentFlow];
    var step = data.steps[idx];

    $$('.pipeline-card').forEach(function (el, i) {
      el.classList.toggle('active', i === idx);
    });

    $('stageTitle').textContent = step.num + ': ' + step.name;
    $('stageStatute').textContent = step.statute;
    $('stageBody').innerHTML = step.body;
    $('stageTimeLimit').textContent = step.time;
    $('stagePrecedent').innerHTML = '<em>' + step.precedent + '</em>';
  }

  // Tab switching
  $$('.flow-nav-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      $$('.flow-nav-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderFlow(tab.getAttribute('data-flow'));
    });
  });

  // Initial render
  renderFlow('bnss');
})();
