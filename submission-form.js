(function () {
  'use strict';
  var form = document.getElementById('llSubmissionForm');
  if (!form) return;
  var endpoint = 'https://legal-lounge-live-api-dbe8fzducefeg8a3.centralindia-01.azurewebsites.net/api/submissions';
  var status = document.getElementById('submissionFormStatus');
  var button = document.getElementById('submissionSubmitButton');
  function show(message, kind) { status.textContent = message; status.className = 'submission-status' + (kind ? ' is-' + kind : ''); }
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var payload = {
      type: String(data.get('type') || '').trim(),
      title: String(data.get('title') || '').trim(),
      description: String(data.get('description') || '').trim(),
      submitterName: String(data.get('submitterName') || '').trim(),
      submitterEmail: String(data.get('submitterEmail') || '').trim()
    };
    if (payload.title.length < 5 || payload.description.length < 20 || !payload.submitterName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.submitterEmail)) {
      show('Please check the title, description, name and email fields.', 'error'); return;
    }
    button.disabled = true; button.textContent = 'Sending…'; show('Sending your submission securely to Legal Lounge Live…', '');
    try {
      var response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      var result;
      try { result = await response.json(); } catch (_) { result = {}; }
      if (!response.ok) throw new Error(result.error || 'We could not submit your work right now. Please try again later.');
      var reference = result.referenceId ? ' Reference ID: ' + result.referenceId + '.' : '';
      show((result.message || 'Your submission has been received for review.') + reference + ' Your submission is pending review and is not published automatically.', 'success');
      form.reset();
    } catch (error) {
      var msg = error && error.message ? error.message : '';
      if (msg === 'Failed to fetch' || /networkerror|load failed/i.test(msg)) {
        show('We could not connect to the submission service. Please try again shortly or use the backup Google Form below. If this continues, the site administrator needs to check Azure CORS settings.', 'error');
      } else { show(msg || 'Submission failed. Please try again later.', 'error'); }
    } finally { button.disabled = false; button.innerHTML = 'Send for review <span>→</span>'; }
  });
})();
