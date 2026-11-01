/* Legal Lounge Live: tidy, labelled ad spots (Google AdSense).
 * A spot looks like:  <aside class="ad-slot" data-ad="article" aria-label="Advertisement"></aside>
 * It stays hidden until its ad-unit number is set in site-config.js (LL_CONFIG.adSlots),
 * and it hides itself again if no ad is served (ad blocker, no fill), so there are never empty boxes. */
(function () {
  'use strict';
  var cfg = window.LL_CONFIG || {};
  var client = String(cfg.adClient || ''), slots = cfg.adSlots || {};
  var nodes = document.querySelectorAll('.ad-slot[data-ad]');
  if (!nodes.length) return;

  var css = '.ad-slot{display:none;clear:both;max-width:860px;margin:44px auto;padding:14px 0 18px;text-align:center;border-top:1px solid #e8e0d2;border-bottom:1px solid #e8e0d2}' +
    '.ad-slot.is-ready{display:block}' +
    '.ad-slot-label{margin:0 0 10px;font:600 10px/1 "DM Sans",Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#8a96a8}' +
    '.ad-slot ins.adsbygoogle{display:block;min-height:100px}';
  var st = document.createElement('style'); st.appendChild(document.createTextNode(css)); document.head.appendChild(st);

  Array.prototype.forEach.call(nodes, function (node) {
    var id = String(slots[node.getAttribute('data-ad')] || '');
    if (!client || !/^\d{6,}$/.test(id)) return;                     // not configured: stay hidden
    node.innerHTML = '<p class="ad-slot-label">Advertisement</p>' +
      '<ins class="adsbygoogle" style="display:block" data-ad-client="' + client + '" data-ad-slot="' + id + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    node.classList.add('is-ready');
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { node.classList.remove('is-ready'); return; }
    var check = function () {
      var ins = node.querySelector('ins');
      var ok = ins && ins.getAttribute('data-ad-status') === 'filled';
      if (!ok) node.classList.remove('is-ready');                    // no ad served: hide the whole box
    };
    window.setTimeout(check, 4000); window.setTimeout(check, 9000);
  });
})();
