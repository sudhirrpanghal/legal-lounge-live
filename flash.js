(function () {
  'use strict';
  var list = document.getElementById('glossaryList'), wrap = document.getElementById('flashWrap');
  if (!list || !wrap) return;
  var $ = function (id) { return document.getElementById(id); };
  var cards = Array.prototype.slice.call(list.querySelectorAll('details')).map(function (d) {
    return { term: d.querySelector('summary span').textContent, area: d.querySelector('summary small').textContent, def: d.querySelector('p').textContent };
  });
  var deck = [], showingBack = false, total = 0;
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function render() {
    var card = $('flashCard');
    if (!deck.length) {
      $('flashSide').textContent = 'DECK COMPLETE';
      $('flashText').textContent = 'You went through all ' + total + ' terms.';
      $('flashHint').textContent = 'Select “Restart deck” to go again';
      $('flashProgress').textContent = '0 left';
      $('flashKnow').disabled = true; $('flashAgain').disabled = true; card.disabled = true; return;
    }
    $('flashKnow').disabled = false; $('flashAgain').disabled = false; card.disabled = false;
    var c = deck[0];
    $('flashProgress').textContent = deck.length + ' of ' + total + ' left';
    if (showingBack) {
      $('flashSide').textContent = 'MEANING · ' + c.area.toUpperCase();
      $('flashText').textContent = c.def;
      $('flashHint').textContent = 'Did you know it?';
    } else {
      $('flashSide').textContent = 'TERM · ' + c.area.toUpperCase();
      $('flashText').textContent = c.term;
      $('flashHint').textContent = 'Select the card to see the meaning';
    }
  }
  function reset() { deck = shuffle(cards); total = deck.length; showingBack = false; render(); }
  $('flashCard').addEventListener('click', function () { showingBack = !showingBack; render(); });
  $('flashKnow').addEventListener('click', function () { deck.shift(); showingBack = false; render(); });
  $('flashAgain').addEventListener('click', function () { deck.push(deck.shift()); showingBack = false; render(); });
  $('flashReset').addEventListener('click', reset);
  var search = $('glossarySearch'), emptyMsg = $('glossaryEmpty');
  Array.prototype.slice.call(document.querySelectorAll('#glossaryMode button')).forEach(function (b) {
    b.addEventListener('click', function () {
      var cardsMode = b.getAttribute('data-mode') === 'cards';
      wrap.hidden = !cardsMode; list.hidden = cardsMode;
      if (search) search.parentNode.hidden = cardsMode;
      if (emptyMsg) emptyMsg.hidden = true;
      if (cardsMode) reset();
    });
  });
})();
