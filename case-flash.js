(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  if (!$('#cfCard') || !window.CASE_DATA) return;
  var all = window.CASE_DATA, deck = [], back = false, total = 0, filter = 'All';
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function shuffle(a) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; }
  function reset() { deck = shuffle(all.filter(function (c) { return filter === 'All' || c.s === filter; })); total = deck.length; back = false; render(); }
  function render() {
    var card = $('#cfCard');
    if (!deck.length) { $('#cfSide').textContent = 'DECK COMPLETE'; $('#cfText').textContent = 'You went through all ' + total + ' cases.'; $('#cfHint').textContent = 'Select “Restart deck” to go again'; $('#cfProgress').textContent = '0 left'; $('#cfKnow').disabled = true; $('#cfAgain').disabled = true; card.disabled = true; return; }
    $('#cfKnow').disabled = false; $('#cfAgain').disabled = false; card.disabled = false;
    var c = deck[0]; $('#cfProgress').textContent = deck.length + ' of ' + total + ' left';
    $('#cfOpen').href = 'case-law.html#case-' + slug(c.n);
    if (!back) { $('#cfSide').textContent = c.s.toUpperCase() + ' · ' + c.r; $('#cfText').textContent = c.n; $('#cfHint').textContent = 'Try to recall the facts, issue, reasoning and takeaway, then select the card'; }
    else { $('#cfSide').textContent = 'ANSWER · ' + c.n; $('#cfText').textContent = 'Facts: ' + c.f + ' Issue: ' + c.i + ' Reasoning: ' + c.e + ' Takeaway: ' + c.t; $('#cfHint').textContent = 'Did you remember it?'; }
  }
  $('#cfCard').addEventListener('click', function () { back = !back; render(); });
  $('#cfKnow').addEventListener('click', function () { deck.shift(); back = false; render(); });
  $('#cfAgain').addEventListener('click', function () { deck.push(deck.shift()); back = false; render(); });
  $('#cfReset').addEventListener('click', reset);
  Array.prototype.slice.call(document.querySelectorAll('#cfFilters .filter')).forEach(function (b) { b.addEventListener('click', function () { filter = b.getAttribute('data-filter'); reset(); }); });
  reset();
})();
