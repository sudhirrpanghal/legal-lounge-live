/* Bare Acts Library - reader. No dependencies.
   Pure functions (esc, classifyPara, renderSection, renderAct, searchAll, ...) are exported for tests;
   everything that touches the DOM lives in boot() and below. */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) { module.exports = api; }
  else { root.BA = api; if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", api.boot); }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ------------------------------------------------------------ pure helpers */
  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    return m ? (+m[3]) + " " + MONTHS[+m[2] - 1] + " " + m[1] : (iso || "");
  }

  function classifyPara(t) {
    if (/^\(\d+[A-Za-z]{0,2}\)/.test(t)) return "p p-sub";
    if (/^\((?:i{1,3}|iv|vi{0,3}|ix|x{1,3})\)/.test(t)) return "p p-roman";
    if (/^\([a-z]{1,2}\)/.test(t) || /^\([A-Z]{1,2}\)/.test(t)) return "p p-clause";
    if (/^Provided\b/.test(t)) return "p p-proviso";
    if (/^(Explanation|Illustration|Exception|Note)\b/.test(t)) return "p p-expl";
    return "p";
  }

  function renderSection(sec) {
    var num = esc(sec.number);
    var badge = sec.status && sec.status !== "in-force"
      ? ' <span class="badge badge-muted">' + (sec.status === "omitted" ? "Omitted" : "Repealed") + "</span>" : "";
    var title = sec.title ? " " + esc(sec.title) : "";
    var paras = (sec.paragraphs || []).map(function (p) { return '<p class="' + classifyPara(p) + '">' + esc(p) + "</p>"; }).join("");
    if (!paras && sec.status && sec.status !== "in-force") paras = '<p class="p muted">This provision has been omitted or repealed.</p>';
    var notes = "";
    if (sec.footnotes && sec.footnotes.length) {
      notes = '<details class="notes"><summary>Amendment notes (' + sec.footnotes.length + ")</summary><ol>" +
        sec.footnotes.map(function (f) { return "<li><b>" + esc(f.marker) + ".</b> " + esc(f.text) + "</li>"; }).join("") +
        "</ol></details>";
    }
    return '<article class="sec" id="' + esc(sec.id) + '"><header class="sec-head"><h3><span class="sec-num">' + num + ".</span>" +
      title + badge + '</h3><button class="copy" type="button" data-id="' + esc(sec.id) + '" aria-label="Copy link to section ' + num +
      '">Copy link</button></header>' + paras + notes + "</article>";
  }

  function chapterHeading(c) {
    var kind = c.kind === "part" ? "Part" : "Chapter";
    return '<div class="chap" id="' + esc(c.id) + '"><small>' + kind + " " + esc(c.number) + "</small>" +
      (c.title ? "<h2>" + esc(c.title) + "</h2>" : "") + "</div>";
  }

  function renderBody(act) {
    var chapters = {};
    (act.chapters || []).forEach(function (c) { chapters[c.id] = c; });
    var out = [], cur = null;
    (act.sections || []).forEach(function (s) {
      if (s.chapterId && s.chapterId !== cur && chapters[s.chapterId]) { out.push(chapterHeading(chapters[s.chapterId])); cur = s.chapterId; }
      out.push(renderSection(s));
    });
    var sched = "";
    if (act.schedules && act.schedules.length) {
      sched = '<section class="schedules"><h2>Schedules</h2>' + act.schedules.map(function (sc) {
        return "<details><summary>" + esc(sc.title) + "</summary>" +
          sc.paragraphs.map(function (p) { return '<p class="p">' + esc(p) + "</p>"; }).join("") + "</details>";
      }).join("") + "</section>";
    }
    return out.join("") + sched;
  }

  function renderToc(act) {
    function li(s) {
      return '<li data-t="' + esc((s.number + " " + (s.title || "")).toLowerCase()) + '"><a href="#/' + esc(act.id) + "/" + esc(s.id) +
        '" data-sec="' + esc(s.id) + '"><b>' + esc(s.number) + "</b>" + esc(s.title || "") + "</a></li>";
    }
    var secs = act.sections || [], chaps = act.chapters || [];
    if (!chaps.length) return "<ul>" + secs.map(li).join("") + "</ul>";
    var byChap = {}, loose = [];
    secs.forEach(function (s) { if (s.chapterId) (byChap[s.chapterId] = byChap[s.chapterId] || []).push(s); else loose.push(s); });
    var html = loose.length ? "<ul>" + loose.map(li).join("") + "</ul>" : "";
    chaps.forEach(function (c) {
      var label = (c.kind === "part" ? "Part " : "Ch. ") + esc(c.number) + (c.title ? " &middot; " + esc(c.title) : "");
      html += "<details><summary>" + label + "</summary><ul>" + (byChap[c.id] || []).map(li).join("") + "</ul></details>";
    });
    return html;
  }

  function renderAct(act, cat, cfg, catalogue) {
    cat = cat || {}; var v = act.verification || {}, src = act.source || {};
    var chips = [];
    if (act.actNumber) chips.push("<span><b>Act No.</b> " + esc(act.actNumber) + "</span>");
    if (act.enactmentDate) chips.push("<span><b>Enacted</b> " + esc(fmtDate(act.enactmentDate)) + "</span>");
    if (act.enforcementDate) chips.push("<span><b>In force from</b> " + esc(fmtDate(act.enforcementDate)) + "</span>");
    if (act.ministry) chips.push("<span><b>Ministry</b> " + esc(act.ministry) + "</span>");
    chips.push("<span><b>Sections</b> " + (act.sections || []).length + "</span>");

    var banners = "";
    if (act.status === "replaced" || act.status === "repealed") {
      var by = "";
      if (act.replacedBy) {
        var target = (catalogue && catalogue.acts || []).filter(function (a) { return a.id === act.replacedBy; })[0];
        by = target ? ' by <a href="#/' + esc(target.id) + '">' + esc(target.name) + "</a>"
          : (cat.replacedByName ? " by " + esc(cat.replacedByName) : "");
      }
      banners += '<div class="banner"><b>This Act has been ' + (act.status === "repealed" ? "repealed" : "replaced") + by +
        ".</b> Check the repeal and savings provisions of the new law for earlier and pending matters.</div>";
    }
    if (v.level === "reviewed") banners += '<div class="banner ok">Text checked against the official source' + (v.lastVerified ? " on " + esc(fmtDate(v.lastVerified)) : "") + ".</div>";
    else if (v.level === "spot-checked") banners += '<div class="banner ok">Text spot-checked against the official source' + (v.lastVerified ? " on " + esc(fmtDate(v.lastVerified)) : "") + ". Not every section has been compared.</div>";
    else banners += '<div class="banner">Text extracted automatically from an official PDF and not yet proof-read. Please check the Gazette or India Code before relying on it.</div>';

    var srcLine = "Source: " + (src.url ? '<a href="' + esc(src.url) + '" rel="noopener">' + esc(src.name || "Official source") + "</a>" : esc(src.name || "Official source")) +
      (src.retrievedAt ? " &middot; retrieved " + esc(fmtDate(src.retrievedAt)) : "") +
      (v.amendedUpTo ? " &middot; source updated " + esc(fmtDate(v.amendedUpTo)) : "");

    var pre = (act.preamble || []).length ? '<div class="preamble">' + act.preamble.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" : "";

    return '<div class="reader"><aside class="toc" id="toc" aria-label="Contents"><input id="toc-q" type="search" placeholder="Jump to section&hellip;" aria-label="Filter contents">' +
      renderToc(act) + "</aside><article id=\"act\"><p class=\"crumbs\"><a href=\"#/\">All Acts</a>" + (act.category ? " &rsaquo; " + esc(act.category) : "") + "</p>" +
      '<h1 class="act-title">' + esc(act.name) + "</h1>" +
      (act.longTitle ? '<p class="long-title">' + esc(act.longTitle) + "</p>" : "") +
      '<div class="chips">' + chips.join("") + "</div>" + banners + '<p class="src">' + srcLine + "</p>" +
      '<div class="toolbar"><button type="button" class="toc-toggle" id="toc-toggle">Contents</button><button type="button" data-act="smaller" aria-label="Smaller text">A&minus;</button>' +
      '<button type="button" data-act="larger" aria-label="Larger text">A+</button><button type="button" data-act="print">Print</button></div>' +
      pre + renderBody(act) + "</article></div>";
  }

  function cardHtml(a) {
    var badges = "";
    if (a.shortName) badges += '<span class="badge">' + esc(a.shortName) + "</span>";
    if (a.status === "replaced" || a.status === "repealed") badges += '<span class="badge badge-warn">' + (a.status === "repealed" ? "Repealed" : "Replaced") + "</span>";
    return '<a class="card" href="#/' + esc(a.id) + '"><div class="row">' + badges + "</div><h3>" + esc(a.name) + '</h3><div class="meta">' + esc(a.category) +
      (a.sectionCount ? " &middot; " + a.sectionCount + " sections" : "") + "</div>" + (a.description ? '<p class="desc">' + esc(a.description) + "</p>" : "") + "</a>";
  }

  /* ---------------------------------------------------------------- routing */
  function parseHash(h) {
    var p = String(h || "").replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    return p.length ? { view: "act", id: p[0], anchor: p[1] || null } : { view: "home" };
  }

  /* ---------------------------------------------------------- grade gate */
  // Acts whose quality grade is in cfg.hideGrades (default: "C") are never shown, searched or loaded.
  function applyGradeGate(catalogue, cfg) {
    var hide = ((cfg && cfg.hideGrades) || ["C"]).map(function (g) { return String(g).toUpperCase(); });
    var hidden = {}, kept = [];
    (catalogue.acts || []).forEach(function (a) {
      if (hide.indexOf(String(a.grade || "").toUpperCase()) > -1) hidden[a.id] = 1; else kept.push(a);
    });
    var used = {}; kept.forEach(function (a) { used[a.category] = 1; });
    return Object.assign({}, catalogue, {
      acts: kept,
      categories: (catalogue.categories || []).filter(function (c) { return used[c]; }),
      hiddenIds: hidden
    });
  }

  /* ----------------------------------------------------------------- search */
  var STOP = { section: 1, sec: 1, s: 1, article: 1, art: 1, of: 1, the: 1, act: 1, under: 1, in: 1 };
  function parseQuery(q) {
    var nums = [], words = [], article = /(^|\s)(article|art)\.?(\s|$)/i.test(String(q || ""));
    String(q || "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter(Boolean).forEach(function (t) {
      if (/^\d{1,3}[a-z]{0,3}$/.test(t)) nums.push(t); else if (!STOP[t]) words.push(t);
    });
    return { nums: nums, words: words, article: article };
  }

  function searchAll(q, idx, catalogue) {
    var pq = parseQuery(q), nums = pq.nums, words = pq.words;
    if (!nums.length && !words.length) return { acts: [], sections: [] };
    var hay = function (a) { return (a.name + " " + (a.shortName || "") + " " + a.year).toLowerCase(); };
    var actHits = words.length ? catalogue.acts.filter(function (a) { return words.every(function (w) { return hay(a).indexOf(w) > -1; }); }) : [];
    var ids = {}; actHits.forEach(function (a) { ids[a.id] = 1; });
    var hiddenIds = catalogue.hiddenIds || {};
    var constitution = {};            // "article 21" means the Constitution, not section 21 of some Act
    if (pq.article) catalogue.acts.forEach(function (a) { if (/constitution/i.test(a.name)) constitution[a.id] = 1; });
    var sections = [];
    for (var i = 0; i < idx.rows.length && sections.length < 40; i++) {
      var r = idx.rows[i], id = idx.acts[r[0]][0], num = String(r[1]).toLowerCase(), t = String(r[2] || "").toLowerCase();
      if (hiddenIds[id]) continue;
      if (pq.article && !constitution[id]) continue;
      if (nums.length) {
        if (nums.indexOf(num) < 0) continue;
        if (words.length && !ids[id] && !words.every(function (w) { return t.indexOf(w) > -1; })) continue;
      } else if (!words.every(function (w) { return t.indexOf(w) > -1; })) continue;
      sections.push({ actId: id, short: idx.acts[r[0]][1], number: r[1], title: r[2] });
    }
    return { acts: actHits.slice(0, 6), sections: sections };
  }

  function resultsHtml(res, catalogue) {
    if (!res.acts.length && !res.sections.length) return '<div class="none">No matches. Try an Act name, or a section number such as "BNS 103".</div>';
    var names = {}; catalogue.acts.forEach(function (a) { names[a.id] = a; });
    var html = "";
    if (res.acts.length) html += "<h4>Acts</h4>" + res.acts.map(function (a) {
      return '<a href="#/' + esc(a.id) + '" role="option"><span class="tag">' + esc(a.shortName || a.year) + "</span><span>" + esc(a.name) + "</span></a>"; }).join("");
    if (res.sections.length) html += "<h4>Sections</h4>" + res.sections.map(function (s) {
      var a = names[s.actId] || {};
      return '<a href="#/' + esc(s.actId) + "/s-" + esc(String(s.number).toLowerCase()) + '" role="option"><span class="tag">' + esc(s.short || a.year || "") + " " + esc(s.number) +
        "</span><span>" + esc(s.title || a.name || "") + "</span></a>"; }).join("");
    return html;
  }

  /* -------------------------------------------------------------------- DOM */
  var S = { cfg: {}, manifest: { files: {} }, catalogue: { acts: [], categories: [] }, idx: null, acts: {}, current: null, cat: "All", sort: "az", obs: null };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  function getJSON(path) {
    var v = S.manifest.files && S.manifest.files[path];
    return fetch(path + (v ? "?v=" + v : "")).then(function (r) { if (!r.ok) throw new Error(path + " " + r.status); return r.json(); });
  }

  function mountSearch(input, box) {
    if (!input || !box) return;
    var timer, items = [], pos = -1;
    function close() { box.hidden = true; pos = -1; }
    function run() {
      var q = input.value.trim();
      if (!q) return close();
      var go = function () { box.innerHTML = resultsHtml(searchAll(q, S.idx, S.catalogue), S.catalogue); box.hidden = false; items = $$("a", box); pos = -1; };
      if (S.idx) go(); else getJSON("data/search-index.json").then(function (d) { S.idx = d; go(); });
    }
    input.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(run, 90); });
    input.addEventListener("focus", run);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); input.blur(); }
      else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); if (!items.length) return;
        pos = (pos + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
        items.forEach(function (a, i) { a.classList.toggle("on", i === pos); }); items[pos].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") { var t = items[pos] || items[0]; if (t) { location.hash = t.getAttribute("href"); close(); input.blur(); } }
    });
    box.addEventListener("click", function () { setTimeout(close, 0); });
    document.addEventListener("click", function (e) { if (!box.contains(e.target) && e.target !== input) close(); });
  }

  function heroTitle(name) {            // "Bare Acts Library" -> "Bare Acts <em>Library.</em>"
    var parts = String(name || "").trim().split(/\s+/);
    if (parts.length < 2) return esc(name);
    var last = parts.pop();
    return esc(parts.join(" ")) + " <em>" + esc(last) + ".</em>";
  }

  function renderHome() {
    document.title = S.cfg.siteName + " | Legal Lounge Live";
    $("#head-search").hidden = true;
    var total = S.catalogue.acts.reduce(function (n, a) { return n + (a.sectionCount || 0); }, 0);
    var cats = ["All"].concat(S.catalogue.categories);
    $("#app").innerHTML = '<section class="hero"><p class="eyebrow">Legal Lounge Live / Bare Acts</p><h1>' + heroTitle(S.cfg.siteName) + "</h1><p>" + esc(S.cfg.tagline) +
      '</p><div class="searchbox"><input id="q-hero" type="search" placeholder="Search Acts or sections: BNS 103, Article 21, contract" autocomplete="off" aria-label="Search Acts and sections"><div class="results" id="r-hero" role="listbox" hidden></div></div>' +
      '<p class="stat">' + S.catalogue.acts.length + " Acts &middot; " + total.toLocaleString("en-IN") + " sections</p></section>" +
      '<div class="wrap"><div class="filters" role="group" aria-label="Filter by category">' +
      cats.map(function (c) { return '<button type="button" class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (c === S.cat) + '">' + esc(c) + "</button>"; }).join("") +
      '<select id="sort" aria-label="Sort Acts"><option value="az">A to Z</option><option value="new">Newest first</option><option value="old">Oldest first</option><option value="size">Most sections</option></select></div>' +
      '<div class="grid" id="grid"></div></div>';
    $("#sort").value = S.sort;
    fillGrid();
    $$(".chip").forEach(function (b) { b.addEventListener("click", function () { S.cat = b.getAttribute("data-cat"); $$(".chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); fillGrid(); }); });
    $("#sort").addEventListener("change", function (e) { S.sort = e.target.value; fillGrid(); });
    mountSearch($("#q-hero"), $("#r-hero"));
    window.scrollTo(0, 0);
  }

  function fillGrid() {
    var list = S.catalogue.acts.filter(function (a) { return S.cat === "All" || a.category === S.cat; });
    var sorters = { az: null, new: function (a, b) { return b.year - a.year; }, old: function (a, b) { return a.year - b.year; }, size: function (a, b) { return (b.sectionCount || 0) - (a.sectionCount || 0); } };
    if (sorters[S.sort]) list = list.slice().sort(sorters[S.sort]);
    $("#grid").innerHTML = list.length ? list.map(cardHtml).join("") : '<p class="empty">No Acts in this category yet.</p>';
  }

  function showAct(route) {
    var cat = S.catalogue.acts.filter(function (a) { return a.id === route.id; })[0];
    if (!cat) { $("#app").innerHTML = '<p class="notice">This Act is not available on the site yet. <a href="#/">Browse all Acts</a>.</p>'; document.title = S.cfg.siteName + " | Legal Lounge Live"; return; }
    var same = S.current === route.id && $("#act");
    if (same) return scrollToAnchor(route.anchor);
    $("#app").innerHTML = '<p class="loading">Loading ' + esc(cat.name) + "&hellip;</p>";
    var p = S.acts[route.id] ? Promise.resolve(S.acts[route.id]) : getJSON("data/acts/" + route.id + ".json").then(function (a) { S.acts[route.id] = a; return a; });
    p.then(function (act) {
      if (location.hash.indexOf("#/" + route.id) !== 0) return;       // user navigated away while loading
      S.current = route.id;
      document.title = act.name + " | " + S.cfg.siteName + " | Legal Lounge Live";
      var md = $('meta[name="description"]'); if (md) md.setAttribute("content", (act.longTitle || act.name) + " - bare Act text.");
      $("#head-search").hidden = false;
      $("#app").innerHTML = renderAct(act, cat, S.cfg, S.catalogue);
      wireReader();
      scrollToAnchor(route.anchor, true);
    }).catch(function (e) {
      $("#app").innerHTML = '<p class="error">Could not load this Act (' + esc(e.message) + '). <a href="#/">Back to all Acts</a>.</p>';
    });
  }

  function scrollToAnchor(id, instant) {
    if (!id) { if (instant) window.scrollTo({ top: 0, behavior: "instant" }); return; }
    var el = document.getElementById(id);
    if (!el) return;
    document.body.classList.remove("toc-open");
    el.scrollIntoView({ behavior: instant ? "instant" : "smooth", block: "start" });
    // Long Acts change height while they lay out, so re-aim after the scroll settles:
    // the section must end up just below the sticky bars, not under them.
    (instant ? [300, 900] : [1000, 1900]).forEach(function (delay) {
      setTimeout(function () {
        if (!document.body.contains(el)) return;
        var want = parseFloat(getComputedStyle(el).scrollMarginTop) || 72;
        if (Math.abs(el.getBoundingClientRect().top - want) > 8) el.scrollIntoView({ behavior: "instant", block: "start" });
      }, delay);
    });
    if (el.classList.contains("sec")) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 2600); }
  }

  function wireReader() {
    var font = parseInt(store("ba-font"), 10) || 18;
    document.documentElement.style.setProperty("--read", font + "px");
    $("#act").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.classList.contains("copy")) {
        var url = location.href.split("#")[0] + "#/" + S.current + "/" + b.getAttribute("data-id");
        var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy link"; }, 1500); };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, done); else done();
      } else if (b.getAttribute("data-act") === "print") window.print();
      else if (b.getAttribute("data-act")) {
        font = Math.min(26, Math.max(14, font + (b.getAttribute("data-act") === "larger" ? 1 : -1)));
        document.documentElement.style.setProperty("--read", font + "px"); store("ba-font", String(font));
      }
    });
    var tg = $("#toc-toggle"); if (tg) tg.addEventListener("click", function () {
      // the contents panel starts exactly under the site header, wherever the page is scrolled
      var h = document.querySelector(".site-header");
      document.documentElement.style.setProperty("--toc-top", (h ? Math.max(0, Math.round(h.getBoundingClientRect().bottom)) : 0) + "px");
      document.body.classList.toggle("toc-open");
    });
    $("#toc").addEventListener("click", function (e) { if (e.target.closest("a")) document.body.classList.remove("toc-open"); });
    $("#toc-q").addEventListener("input", function (e) {
      var q = e.target.value.trim().toLowerCase();
      $$("#toc li").forEach(function (li) { li.hidden = !!q && li.getAttribute("data-t").indexOf(q) < 0; });
      $$("#toc details").forEach(function (d) { var any = $$("li", d).some(function (li) { return !li.hidden; }); d.hidden = !!q && !any; if (q && any) d.open = true; });
    });
    mountSearch($("#q-head"), $("#r-head"));
    if (S.obs) S.obs.disconnect();
    if ("IntersectionObserver" in window) {
      S.obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          $$("#toc a.active").forEach(function (a) { a.classList.remove("active"); });
          var link = $('#toc a[data-sec="' + en.target.id + '"]');
          if (link) { link.classList.add("active"); var d = link.closest("details"); if (d && !d.open) d.open = true; }
        });
      }, { rootMargin: "-15% 0px -75% 0px" });
      $$(".sec").forEach(function (s) { S.obs.observe(s); });
    }
  }

  function onRoute() {
    var r = parseHash(location.hash);
    if (r.view === "home") { S.current = null; renderHome(); } else showAct(r);
  }

  function boot() {
    var th = store("ba-theme") || "light";
    document.documentElement.setAttribute("data-theme", th);
    var tb = $("#theme");
    var paint = function (t) { tb.textContent = t === "dark" ? "\u2600" : "\u263E"; };
    paint(th);
    tb.addEventListener("click", function () {
      var n = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", n); store("ba-theme", n); paint(n);
    });
    fetch("config.json").then(function (r) { return r.json(); }).catch(function () { return {}; }).then(function (cfg) {
      S.cfg = Object.assign({ siteName: "Bare Acts Library", tagline: "", disclaimer: "" }, cfg);
      $("#brand-name").textContent = S.cfg.siteName; $("#disclaimer").textContent = S.cfg.disclaimer;
      return fetch("data/manifest.json").then(function (r) { if (!r.ok) throw new Error("manifest " + r.status); return r.json(); });
    }).then(function (m) {
      S.manifest = m;
      $("#foot-meta").textContent = "Data generated " + fmtDate(m.generatedAt) + ".";
      return getJSON("data/catalogue.json");
    }).then(function (c) {
      S.catalogue = applyGradeGate(c, S.cfg);
      window.addEventListener("hashchange", onRoute);
      onRoute();
    }).catch(function (e) {
      $("#app").innerHTML = '<p class="error">Could not load the library data (' + esc(e.message) + "). If you opened index.html directly from a folder, run it through a web server instead (see README).</p>";
    });
  }

  return { esc: esc, fmtDate: fmtDate, classifyPara: classifyPara, renderSection: renderSection, renderToc: renderToc, renderBody: renderBody,
    renderAct: renderAct, cardHtml: cardHtml, applyGradeGate: applyGradeGate, parseHash: parseHash, parseQuery: parseQuery, searchAll: searchAll, resultsHtml: resultsHtml, boot: boot };
});
