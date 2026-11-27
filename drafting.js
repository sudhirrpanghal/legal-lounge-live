(function () {
  'use strict';

  var templates = window.DRAFTING_TEMPLATES || {};
  var currentId = 'bail_483';

  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  function renderTemplate(id) {
    currentId = id;
    var data = templates[id];
    if (!data) return;

    $('draftCategory').textContent = data.category || 'PLEADING';
    $('draftTitle').textContent = data.title;
    $('draftSubtitle').textContent = data.subtitle;
    $('draftPaperText').textContent = data.text;
    $('draftNotesText').textContent = data.notes;

    $$('.draft-nav-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-id') === id);
    });
  }

  // Nav clicks
  $$('.draft-nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      renderTemplate(btn.getAttribute('data-id'));
    });
  });

  // Copy template
  var copyBtn = $('btnCopyDraft');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var data = templates[currentId];
      if (!data) return;
      navigator.clipboard.writeText(data.text).then(function () {
        var copyText = $('copyDraftText');
        copyText.textContent = '✓ Copied!';
        setTimeout(function () { copyText.textContent = 'Copy Template'; }, 2000);
      }).catch(function () {
        alert('Could not copy automatically. Please select text manually.');
      });
    });
  }

  // Download .doc file
  var downloadBtn = $('btnDownloadDraft');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      var data = templates[currentId];
      if (!data) return;

      var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>" + data.title + "</title>" +
        "<style>body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; white-space: pre-wrap; }</style></head><body>";
      var footer = "</body></html>";
      var sourceHTML = header + data.text + footer;

      var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
      var fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = currentId.replace(/_/g, '-') + '-template.doc';
      fileDownload.click();
      document.body.removeChild(fileDownload);
    });
  }

  // Initial render
  renderTemplate(currentId);
})();
