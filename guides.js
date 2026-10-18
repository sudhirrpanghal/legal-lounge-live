(function () {
  'use strict';
  var list = document.getElementById('guideList'); if (!list) return;
  var input = document.getElementById('guideSearch'), count = document.getElementById('guideCount'), empty = document.getElementById('guideEmpty');
  var chapters = Array.prototype.slice.call(list.querySelectorAll(':scope > details'));
  function apply() {
    var q = input.value.trim().toLowerCase(), shown = 0, total = 0;
    chapters.forEach(function (d) {
      var items = Array.prototype.slice.call(d.querySelectorAll('li')), hit = 0;
      items.forEach(function (li) { var ok = !q || li.textContent.toLowerCase().indexOf(q) !== -1; li.hidden = !ok; if (ok) hit++; total++; });
      var chMatch = !q || (d.getAttribute('data-search') || '').indexOf(q) !== -1 || d.querySelector('summary').textContent.toLowerCase().indexOf(q) !== -1;
      if (chMatch && q) items.forEach(function (li) { li.hidden = false; });
      d.hidden = !(hit > 0 || chMatch); if (!d.hidden) shown++;
      if (q) d.open = !d.hidden;
    });
    if (empty) empty.hidden = shown !== 0;
    if (count) count.textContent = q ? shown + ' of ' + chapters.length + ' chapters match' : chapters.length + ' chapters';
  }
  input.addEventListener('input', apply); apply();
  function openHash() {
    var id = decodeURIComponent(location.hash.slice(1)); if (!id) return;
    var el = document.getElementById(id); if (!el) return;
    var d = el.tagName === 'DETAILS' ? el : el.closest('details');
    if (d) { d.hidden = false; d.open = true; }
    el.hidden = false;
    setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('g-flash'); setTimeout(function () { el.classList.remove('g-flash'); }, 2200); }, 80);
  }
  openHash(); window.addEventListener('hashchange', openHash);
  var q = new URLSearchParams(location.search).get('q'); if (q) { input.value = q; input.dispatchEvent(new Event('input')); }
})();
