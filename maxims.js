(function () {
  'use strict';
  var input = document.getElementById('maximFind'); if (!input) return;
  var details = Array.prototype.slice.call(document.querySelectorAll('#maximList details'));
  var areaHeads = Array.prototype.slice.call(document.querySelectorAll('#maximList .area-h'));
  var letters = Array.prototype.slice.call(document.querySelectorAll('.az-letter'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.az-letter li'));
  var count = document.getElementById('maximCount'), empty = document.getElementById('maximEmpty');
  function apply() {
    var q = input.value.trim().toLowerCase(), shown = 0;
    details.forEach(function (d) { var ok = !q || d.textContent.toLowerCase().indexOf(q) !== -1; d.hidden = !ok; if (ok) shown++; });
    areaHeads.forEach(function (h) { var n = h.nextElementSibling, any = false; while (n && n.tagName === 'DETAILS') { if (!n.hidden) any = true; n = n.nextElementSibling; } h.hidden = !any; });
    var az = 0;
    items.forEach(function (li) { var ok = !q || li.textContent.toLowerCase().indexOf(q) !== -1; li.hidden = !ok; if (ok) az++; });
    letters.forEach(function (s) { var any = Array.prototype.some.call(s.querySelectorAll('li'), function (li) { return !li.hidden; }); s.hidden = !any; });
    if (empty) empty.hidden = (shown + az) !== 0;
    count.textContent = q ? (az + ' of ' + items.length + ' in A to Z, ' + shown + ' of ' + details.length + ' in the Top 100') : (items.length + ' maxims, ' + details.length + ' in the Top 100');
  }
  input.addEventListener('input', apply);
  var q0 = new URLSearchParams(location.search).get('q'); if (q0) input.value = q0;
  apply();
  function flash() {
    var id = decodeURIComponent(location.hash.slice(1)); if (!id) return;
    var el = document.getElementById(id); if (!el) return;
    if (el.tagName === 'LI') { el.hidden = false; setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('g-flash'); setTimeout(function () { el.classList.remove('g-flash'); }, 2200); }, 80); }
  }
  flash(); window.addEventListener('hashchange', flash);
})();
