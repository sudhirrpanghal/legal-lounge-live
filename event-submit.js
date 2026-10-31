/* Legal Lounge Live: "Submit an event" form on the Events page. */
(function () {
  'use strict';
  var form = document.getElementById('eventForm');
  if (!form) return;
  var cfg = window.LL_CONFIG || {};
  var API = String(cfg.apiBase || 'https://legal-lounge-live-api-dbe8fzducefeg8a3.centralindia-01.azurewebsites.net').replace(/\/+$/, '');
  var el = form.elements, status = document.getElementById('eventStatus'), button = document.getElementById('eventSubmit');
  try { el.deadline.min = new Date().toISOString().slice(0, 10); } catch (e) { /* ignore */ }

  function say(message, kind) { status.textContent = message; status.className = 'submission-status' + (kind ? ' is-' + kind : ''); }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (el.website.value) { say('Thank you. Your event was received.', 'success'); return; }   // spam trap
    var data = {
      type: 'worldwide-event',
      title: el.title.value.trim(), category: el.category.value.trim().replace(/\s+/g, ' '),
      deadline: el.deadline.value, applicationUrl: el.applicationUrl.value.trim(),
      description: el.description.value.trim(), submitterName: el.submitterName.value.trim(), submitterEmail: el.submitterEmail.value.trim()
    };
    if (data.title.length < 5) { say('Please add the event title.', 'error'); return; }
    if (!data.category) { say('Please add a category, for example "Moot court competition" or "Essay writing".', 'error'); return; }
    if (!/^https:\/\//i.test(data.applicationUrl)) { say('The event link must start with https://', 'error'); return; }
    if (data.description.length < 20) { say('Please describe the event in a few sentences.', 'error'); return; }
    if (!data.submitterName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.submitterEmail)) { say('Please enter your name and a valid email address.', 'error'); return; }
    button.disabled = true; button.textContent = 'Sending…'; say('Sending your event to the editors…', '');
    fetch(API + '/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.d.error || 'We could not submit your event right now. Please try again later.');
        say('Thank you. Your event was received' + (res.d.referenceId ? ' (Reference ID: ' + res.d.referenceId + ')' : '') + ' and is pending review. It is not listed automatically.', 'success');
        form.reset();
      })
      .catch(function (err) {
        var m = err && err.message ? err.message : '';
        say(/failed to fetch|networkerror|load failed/i.test(m) ? 'We could not connect to the submission service. Please try again shortly.' : (m || 'Submission failed. Please try again later.'), 'error');
      })
      .then(function () { button.disabled = false; button.textContent = 'Submit event for review'; });
  });
})();
