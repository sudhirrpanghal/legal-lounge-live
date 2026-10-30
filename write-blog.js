/* Legal Lounge Live: blog writing page (editor, live preview, draft saving, submit for review). */
(function () {
  'use strict';
  var form = document.getElementById('blogForm');
  if (!form) return;

  var cfg = window.LL_CONFIG || {};
  var API = String(cfg.apiBase || 'https://legal-lounge-live-api-dbe8fzducefeg8a3.centralindia-01.azurewebsites.net').replace(/\/+$/, '');
  var el = form.elements;
  var body = el.description, title = el.title;
  var preview = document.getElementById('blogPreview'), previewTitle = document.getElementById('blogPreviewTitle');
  var count = document.getElementById('blogCount'), status = document.getElementById('blogStatus');
  var saved = document.getElementById('blogSaved'), button = document.getElementById('blogSubmit');
  var KEY = 'll_blog_draft', MIN_WORDS = 150, timer = null;

  function words(text) { var m = text.trim().match(/\S+/g); return m ? m.length : 0; }
  function say(message, kind) { status.textContent = message; status.className = 'submission-status' + (kind ? ' is-' + kind : ''); }

  function refresh() {
    var n = words(body.value);
    count.textContent = n + (n === 1 ? ' word' : ' words') + (n < MIN_WORDS ? '. Please write at least ' + MIN_WORDS + '.' : '.');
    previewTitle.textContent = title.value.trim() || 'Your title';
    preview.innerHTML = window.LLLive && body.value.trim() ? window.LLLive.renderBody(body.value) : '<p class="editor-empty">Your text will appear here as you write.</p>';
  }

  function store() {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      try {
        window.localStorage.setItem(KEY, JSON.stringify({ name: el.submitterName.value, title: title.value, body: body.value }));
        saved.textContent = 'Draft saved on this device';
      } catch (e) { /* storage blocked */ }
    }, 500);
  }

  try {
    var draft = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (draft && (draft.title || draft.body)) {
      el.submitterName.value = draft.name || ''; title.value = draft.title || ''; body.value = draft.body || '';
      saved.textContent = 'Your saved draft was restored';
    }
  } catch (e) { /* ignore */ }

  [body, title, el.submitterName].forEach(function (f) { f.addEventListener('input', function () { refresh(); store(); }); });

  // Formatting buttons
  function edit(kind) {
    var s = body.selectionStart, e = body.selectionEnd, v = body.value, sel = v.slice(s, e), out, a, b;
    if (kind === 'bold') { out = '**' + (sel || 'bold text') + '**'; a = s + 2; b = a + (sel || 'bold text').length; }
    else if (kind === 'h2') { var ls = v.lastIndexOf('\n', s - 1) + 1; body.value = v.slice(0, ls) + '## ' + v.slice(ls); body.focus(); body.setSelectionRange(s + 3, e + 3); refresh(); store(); return; }
    else if (kind === 'bullet') { out = (sel || 'List item').split('\n').map(function (l) { return '- ' + l; }).join('\n'); a = s; b = s + out.length; }
    else if (kind === 'link') {
      var url = window.prompt('Web address (must start with https://)', 'https://');
      if (!url) return;
      if (!/^https:\/\//i.test(url.trim())) { say('Links must start with https://', 'error'); return; }
      out = '[' + (sel || 'link text') + '](' + url.trim() + ')'; a = s + 1; b = a + (sel || 'link text').length;
    } else return;
    body.value = v.slice(0, s) + out + v.slice(e); body.focus(); body.setSelectionRange(a, b); refresh(); store();
  }
  Array.prototype.forEach.call(form.querySelectorAll('[data-md]'), function (btn) {
    btn.addEventListener('click', function () { edit(btn.getAttribute('data-md')); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (el.website.value) { say('Thank you. Your blog was received.', 'success'); return; }   // spam trap
    var name = el.submitterName.value.trim(), email = el.submitterEmail.value.trim(), t = title.value.trim(), text = body.value.trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('Please enter your name and a valid email address.', 'error'); return; }
    if (t.length < 5) { say('Please add a clear title (at least 5 characters).', 'error'); return; }
    if (words(text) < MIN_WORDS) { say('Your blog has ' + words(text) + ' words. Please write at least ' + MIN_WORDS + ' so editors have enough to review.', 'error'); return; }
    if (!el.consent.checked) { say('Please confirm that this is your original work.', 'error'); return; }
    button.disabled = true; button.textContent = 'Sending…'; say('Sending your blog to the editors…', '');
    fetch(API + '/api/submissions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'blog', title: t, description: text, submitterName: name, submitterEmail: email })
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (data) { return { ok: r.ok, data: data }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.data.error || 'We could not submit your blog right now. Please try again later.');
        say('Thank you. Your blog was received' + (res.data.referenceId ? ' (Reference ID: ' + res.data.referenceId + ')' : '') + ' and is now pending editorial review. It is not published automatically.', 'success');
        try { window.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
        form.reset(); saved.textContent = ''; refresh();
      })
      .catch(function (err) {
        var m = err && err.message ? err.message : '';
        say(/failed to fetch|networkerror|load failed/i.test(m) ? 'We could not connect to the submission service. Your draft is saved on this device. Please try again shortly.' : (m || 'Submission failed. Please try again later.'), 'error');
      })
      .then(function () { button.disabled = false; button.textContent = 'Submit for review'; });
  });
  refresh();
})();
