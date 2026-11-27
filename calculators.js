(function () {
  'use strict';

  // Helper
  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  // Tab switching
  var tabs = $$('.calc-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.getAttribute('data-tab');
      ['limitation', 'bail', 'cheque'].forEach(function (id) {
        var el = $('tab-' + id);
        if (el) el.hidden = (id !== target);
      });
    });
  });

  // Set default dates to today
  var today = new Date();
  var todayIso = today.toISOString().split('T')[0];
  if ($('limStartDate')) $('limStartDate').value = todayIso;
  if ($('bailCustodyStart')) $('bailCustodyStart').value = todayIso;
  if ($('chqReturnDate')) $('chqReturnDate').value = todayIso;

  // 1. LIMITATION CALCULATOR
  var LIM_RULES = {
    money: { years: 3, art: 'Article 55, Limitation Act 1963', label: '3 Years' },
    movable: { years: 3, art: 'Article 68, Limitation Act 1963', label: '3 Years' },
    immovable: { years: 12, art: 'Article 65, Limitation Act 1963', label: '12 Years' },
    specific: { years: 3, art: 'Article 54, Limitation Act 1963', label: '3 Years' },
    tort: { years: 1, art: 'Article 72, Limitation Act 1963', label: '1 Year' },
    app_hc_decree: { days: 90, art: 'Article 116(a), Limitation Act 1963', label: '90 Days' },
    app_dist_decree: { days: 30, art: 'Article 116(b), Limitation Act 1963', label: '30 Days' },
    app_crim_death: { days: 30, art: 'Article 115(a), Limitation Act 1963', label: '30 Days' },
    app_crim_hc: { days: 60, art: 'Article 115(b), Limitation Act 1963', label: '60 Days' },
    app_crim_sess: { days: 30, art: 'Article 115(c), Limitation Act 1963', label: '30 Days' },
    crim_rev: { days: 90, art: 'Article 131, Limitation Act 1963', label: '90 Days' },
    execution: { years: 12, art: 'Article 136, Limitation Act 1963', label: '12 Years' }
  };

  function calcLimitation() {
    var cat = $('limCategory').value;
    var startVal = $('limStartDate').value;
    if (!startVal) return;

    var start = new Date(startVal + 'T00:00:00');
    var rule = LIM_RULES[cat];
    var expiry = new Date(start.getTime());

    if (rule.years) {
      expiry.setFullYear(expiry.getFullYear() + rule.years);
    } else if (rule.days) {
      expiry.setDate(expiry.getDate() + rule.days);
    }

    var now = new Date();
    now.setHours(0, 0, 0, 0);

    var diffDays = Math.round((expiry - now) / (1000 * 60 * 60 * 24));
    var optBadge = $('limResult').querySelector('.calc-result-badge');

    var dateStr = expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    $('limDateDisplay').textContent = dateStr;
    $('limArtCode').textContent = rule.art;
    $('limPeriodText').textContent = rule.label;

    if (diffDays > 0) {
      optBadge.className = 'calc-result-badge badge-ok';
      optBadge.textContent = 'WITHIN LIMITATION';
      $('limStatusDays').textContent = diffDays + ' days remaining to file';
      $('limStatusText').textContent = 'Your claim is within the statutory period. Ensure all court fees and affidavits are finalized before ' + dateStr + '.';
    } else if (diffDays === 0) {
      optBadge.className = 'calc-result-badge badge-alert';
      optBadge.textContent = 'EXPIRES TODAY';
      $('limStatusDays').textContent = 'Last day of limitation!';
      $('limStatusText').textContent = 'Today is the final day. If the court registry is closed today, Section 4 applies — you can file on the next working day.';
    } else {
      optBadge.className = 'calc-result-badge badge-alert';
      optBadge.textContent = 'LIMITATION EXPIRED';
      $('limStatusDays').textContent = Math.abs(diffDays) + ' days past limitation';
      $('limStatusText').textContent = 'The prescribed limitation expired on ' + dateStr + '. If filing an appeal or revision, an application for condonation of delay under Section 5 with sufficient cause must accompany the pleading.';
    }
  }

  if ($('btnCalcLimitation')) $('btnCalcLimitation').addEventListener('click', calcLimitation);
  if ($('limCategory')) $('limCategory').addEventListener('change', calcLimitation);
  if ($('limStartDate')) $('limStartDate').addEventListener('change', calcLimitation);

  // 2. BAIL CALCULATOR (BNSS Sec 479)
  function calcBail() {
    var maxYears = $('bailMaxSentence').value;
    var startVal = $('bailCustodyStart').value;
    if (!startVal) return;

    var start = new Date(startVal + 'T00:00:00');
    var now = new Date();
    now.setHours(0, 0, 0, 0);

    var custodyDays = Math.max(0, Math.round((now - start) / (1000 * 60 * 60 * 24)));
    var isFirst = document.querySelector('input[name="bailFirstTime"]:checked').value === 'yes';
    var badge = $('bailResult').querySelector('.calc-result-badge');

    $('bailDaysServed').textContent = custodyDays + ' Days (' + (custodyDays / 30.4).toFixed(1) + ' Months)';
    $('bailActualText').textContent = custodyDays + ' days in detention';

    if (maxYears === 'life') {
      badge.className = 'calc-result-badge badge-alert';
      badge.textContent = 'STATUTORY BAIL BARRED';
      $('bailThresholdText').textContent = 'Not applicable (Offence punishable with death / life)';
      $('bailEligibleBadge').textContent = 'Barred under Section 479 Proviso';
      $('bailSummaryText').textContent = 'Section 479 BNSS does not apply to offences carrying life imprisonment or death penalty. Regular bail must be sought on merits under Section 480 or 483 BNSS.';
      return;
    }

    var totalMaxDays = parseInt(maxYears, 10) * 365.25;
    var fraction = isFirst ? (1 / 3) : (1 / 2);
    var thresholdDays = Math.round(totalMaxDays * fraction);

    $('bailThresholdText').textContent = (isFirst ? '1/3rd of ' : '1/2 of ') + maxYears + ' Years (' + thresholdDays + ' Days)';

    if (custodyDays >= thresholdDays) {
      badge.className = 'calc-result-badge badge-ok';
      badge.textContent = 'MANDATORY BAIL APPLICABLE';
      $('bailEligibleBadge').textContent = 'ELIGIBLE UNDER SEC 479 BNSS';
      $('bailSummaryText').textContent = 'The accused has undergone ' + custodyDays + ' days, exceeding the statutory threshold of ' + thresholdDays + ' days. Under Sec 479(1), the accused SHALL be released on bail by the Court on personal bond with or without sureties.';
    } else {
      var remaining = thresholdDays - custodyDays;
      badge.className = 'calc-result-badge badge-info';
      badge.textContent = 'CUSTODY PERIOD PENDING';
      $('bailEligibleBadge').textContent = remaining + ' days remaining for eligibility';
      $('bailSummaryText').textContent = 'The accused requires ' + remaining + ' more days in custody before statutory bail under Section 479 can be claimed as a matter of right. Regular bail on merits remains open under Section 483 BNSS.';
    }
  }

  if ($('btnCalcBail')) $('btnCalcBail').addEventListener('click', calcBail);
  if ($('bailMaxSentence')) $('bailMaxSentence').addEventListener('change', calcBail);
  if ($('bailCustodyStart')) $('bailCustodyStart').addEventListener('change', calcBail);
  $$('input[name="bailFirstTime"]').forEach(function (r) { r.addEventListener('change', calcBail); });

  // 3. CHEQUE BOUNCE CALCULATOR (Sec 138 NI Act)
  function calcCheque() {
    var memoVal = $('chqReturnDate').value;
    if (!memoVal) return;

    var memoDate = new Date(memoVal + 'T00:00:00');

    // Step 2: 30 days to issue notice
    var noticeDeadline = new Date(memoDate.getTime());
    noticeDeadline.setDate(noticeDeadline.getDate() + 30);

    // Step 3: Notice served + 15 days cure
    var cureDeadline = new Date(noticeDeadline.getTime());
    cureDeadline.setDate(cureDeadline.getDate() + 15);

    // Step 4: Complaint filing deadline (1 month from cause of action)
    var complaintDeadline = new Date(cureDeadline.getTime());
    complaintDeadline.setDate(complaintDeadline.getDate() + 30);

    function fmt(d) {
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    $('step2Date').innerHTML = 'Must dispatch statutory legal notice on or before <strong>' + fmt(noticeDeadline) + '</strong> (within 30 days of receiving return memo).';
    $('step3Date').innerHTML = 'From date of receipt of notice, drawer has 15 statutory days to pay. If received on notice deadline, payment window closes on <strong>' + fmt(cureDeadline) + '</strong>.';
    $('step4Date').innerHTML = 'If unpaid, cause of action arises immediately. Complaint under Sec 138/142 NI Act must be filed before Magistrate on or before <strong>' + fmt(complaintDeadline) + '</strong>.';
  }

  if ($('btnCalcCheque')) $('btnCalcCheque').addEventListener('click', calcCheque);
  if ($('chqReturnDate')) $('chqReturnDate').addEventListener('change', calcCheque);

  // Run initial calculations
  calcLimitation();
  calcBail();
  calcCheque();
})();
