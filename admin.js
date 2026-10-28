/* Legal Lounge Live admin dashboard.
 * Public client IDs are identifiers, not secrets. Never add client secrets here.
 */
(() => {
  "use strict";

  const TENANT_ID = "8f0783ae-37a2-46da-928c-549ddf1b4c76";
  const FRONTEND_CLIENT_ID = "f3f6263a-1b0f-49b6-add0-9a318016bec6";
  const API_SCOPE = "api://ab13b5af-b69c-4942-9511-7a1d465b397b/access_as_user";
  const API_BASE = "https://legal-lounge-live-api-dbe8fzducefeg8a3.centralindia-01.azurewebsites.net";
  const REDIRECT_URI = window.location.origin + window.location.pathname;

  const msalInstance = new msal.PublicClientApplication({
    auth: {
      clientId: FRONTEND_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${TENANT_ID}`,
      redirectUri: REDIRECT_URI,
      postLogoutRedirectUri: window.location.origin + "/"
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false
    }
  });

  const loginPanel = document.getElementById("loginPanel");
  const dashboardPanel = document.getElementById("dashboardPanel");
  const notice = document.getElementById("notice");
  const list = document.getElementById("submissionsList");
  const signedInAs = document.getElementById("signedInAs");

  const composePanel = document.getElementById("composePanel");
  const composeHeading = document.getElementById("composeHeading");
  const composeNotice = document.getElementById("composeNotice");
  const cf = id => document.getElementById("cf" + id);

  let account = null;
  let accessToken = null;
  let currentFilter = "Pending";
  let currentCategory = "all";
  let allSubmissions = [];
  let editingItem = null;

  function showNotice(message, type = "") {
    notice.textContent = message;
    notice.className = "admin-status" + (type ? " " + type : "");
  }

  function setSignedIn(acct) {
    account = acct;
    loginPanel.classList.add("admin-hidden");
    dashboardPanel.classList.remove("admin-hidden");
    signedInAs.textContent = acct.name || acct.username || "Administrator";
  }

  async function getToken() {
    if (!account) {
      throw new Error("Please sign in first.");
    }

    try {
      const result = await msalInstance.acquireTokenSilent({
        account,
        scopes: [API_SCOPE]
      });

      accessToken = result.accessToken;
      return accessToken;
    } catch (error) {
      const result = await msalInstance.acquireTokenPopup({
        account,
        scopes: [API_SCOPE]
      });

      accessToken = result.accessToken;
      return accessToken;
    }
  }

  async function apiFetch(path, options = {}) {
    const token = await getToken();

    const response = await fetch(API_BASE + path, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {})
      }
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(body.error || `Request failed (${response.status}).`);
    }

    return body;
  }

  function safeDate(value) {
    if (!value) return "Date not provided";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? String(value)
      : date.toLocaleString();
  }

  function typeOf(item) {
    return String(item.type || item.partitionKey || "submission").toLowerCase();
  }

  function categoryOf(item) {
    return ["job", "internship"].includes(typeOf(item))
      ? "careers"
      : "editorial";
  }

  const TYPE_LABELS = {
    "article": "Article",
    "research-paper": "Research paper",
    "job": "Job",
    "internship": "Internship"
  };

  // Which form fields belong to which content type.
  const FIELDS_BY_TYPE = {
    "article": ["title", "description", "authorName", "contentUrl"],
    "research-paper": ["title", "description", "authorName", "pdfUrl", "contentUrl"],
    "job": ["title", "description", "organisation", "location", "duration", "deadline", "eligibility", "applicationUrl"],
    "internship": ["title", "description", "organisation", "location", "duration", "deadline", "eligibility", "applicationUrl"]
  };

  const FIELD_IDS = {
    title: "Title",
    description: "Description",
    authorName: "AuthorName",
    organisation: "Organisation",
    location: "Location",
    duration: "Duration",
    deadline: "Deadline",
    eligibility: "Eligibility",
    applicationUrl: "ApplicationUrl",
    pdfUrl: "PdfUrl",
    contentUrl: "ContentUrl"
  };

  const DESCRIPTION_LABELS = {
    "article": "Article text",
    "research-paper": "Abstract or summary",
    "job": "Job details",
    "internship": "Internship details"
  };

  function showComposeNotice(message, type = "", linkHref = "") {
    composeNotice.className = "admin-status" + (type ? " " + type : "");
    composeNotice.textContent = message;

    if (linkHref) {
      const link = document.createElement("a");
      link.className = "admin-link";
      link.href = linkHref;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = " View it on the website →";
      composeNotice.append(link);
    }
  }

  function updateFormForType() {
    const type = cf("Type").value;

    document.querySelectorAll("#contentForm [data-for]").forEach(group => {
      group.classList.toggle(
        "admin-hidden",
        !group.dataset.for.split(" ").includes(type)
      );
    });

    cf("DescriptionLabel").textContent = DESCRIPTION_LABELS[type];
  }

  function collectFields() {
    const type = cf("Type").value;
    const values = {};

    FIELDS_BY_TYPE[type].forEach(field => {
      values[field] = cf(FIELD_IDS[field]).value.trim();
    });

    return values;
  }

  function checkFields(values) {
    if (!values.title) return "Please add a title.";
    if (!values.description) return "Please add the main text or details.";

    for (const field of ["applicationUrl", "pdfUrl", "contentUrl"]) {
      if (values[field] && !/^https:\/\//i.test(values[field])) {
        return "Links must start with https://";
      }
    }

    return "";
  }

  function updateComposeButtons() {
    const saveDraft = cf("SaveDraft");
    const publish = cf("Publish");
    const cancel = cf("Cancel");

    if (!editingItem) {
      saveDraft.textContent = "Save as draft";
      publish.textContent = "Publish now";
      publish.classList.remove("admin-hidden");
      cancel.classList.add("admin-hidden");
      composeHeading.textContent = "Add new content";
      cf("Type").disabled = false;
      return;
    }

    const status = editingItem.status || "Pending";

    saveDraft.textContent = "Save changes";
    publish.textContent = "Save & publish";
    publish.classList.toggle("admin-hidden", !["Pending", "Draft"].includes(status));
    cancel.classList.remove("admin-hidden");
    composeHeading.textContent = "Editing: " + (editingItem.title || "Untitled");
    cf("Type").disabled = true;
  }

  function resetForm() {
    editingItem = null;
    cf("Type").value = "article";

    Object.values(FIELD_IDS).forEach(suffix => {
      cf(suffix).value = "";
    });

    updateFormForType();
    updateComposeButtons();
  }

  function startEditing(item) {
    editingItem = item;
    cf("Type").value = typeOf(item);
    updateFormForType();

    Object.entries(FIELD_IDS).forEach(([field, suffix]) => {
      cf(suffix).value = item[field] || "";
    });

    updateComposeButtons();
    composeNotice.className = "admin-status admin-hidden";
    composePanel.open = true;
    composePanel.scrollIntoView({ behavior: "smooth", block: "start" });
    cf("Title").focus({ preventScroll: true });
  }

  async function saveContent(publish) {
    const values = collectFields();
    const problem = checkFields(values);

    if (problem) {
      showComposeNotice(problem, "error");
      return;
    }

    if (publish && !window.confirm("Publish this on the website now?")) {
      return;
    }

    const buttons = [cf("SaveDraft"), cf("Publish")];
    buttons.forEach(button => { button.disabled = true; });

    try {
      if (editingItem) {
        const id = editingItem.rowKey || editingItem.id;

        await apiFetch(`/api/owner/content/${encodeURIComponent(id)}`, {
          method: "PATCH",
          body: JSON.stringify(values)
        });

        if (publish) {
          await apiFetch(`/api/owner/submissions/${encodeURIComponent(id)}`, {
            method: "PATCH",
            body: JSON.stringify({ status: "Approved" })
          });
        }

        const wasLive = publish || editingItem.status === "Approved";

        showComposeNotice(
          publish ? "Saved and published." : "Changes saved.",
          "success",
          wasLive ? "read.html?id=" + encodeURIComponent(id) : ""
        );
        resetForm();
      } else {
        const result = await apiFetch("/api/owner/content", {
          method: "POST",
          body: JSON.stringify({
            type: cf("Type").value,
            publishNow: publish,
            ...values
          })
        });

        showComposeNotice(
          publish ? "Published." : "Saved as a draft. Publish it from the Drafts list when ready.",
          "success",
          publish ? "read.html?id=" + encodeURIComponent(result.id) : ""
        );
        resetForm();
      }

      await loadSubmissions();
    } catch (error) {
      showComposeNotice(error.message, "error");
    } finally {
      buttons.forEach(button => { button.disabled = false; });
    }
  }

  function actionButton(label, className, handler) {
    const button = document.createElement("button");
    button.className = "admin-btn " + className;
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => handler(button));
    return button;
  }

  function makeDescription(text) {
    const wrap = document.createElement("div");
    const desc = document.createElement("p");
    desc.className = "submission-description";
    const full = text || "";
    const short = full.length > 320 ? full.slice(0, 320).trimEnd() + "…" : full;
    desc.textContent = short;
    wrap.append(desc);

    if (full.length > 320) {
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "admin-more";
      toggle.textContent = "Show full text";
      let open = false;
      toggle.addEventListener("click", () => {
        open = !open;
        desc.textContent = open ? full : short;
        toggle.textContent = open ? "Show less" : "Show full text";
      });
      wrap.append(toggle);
    }

    return wrap;
  }

  function detailLines(item) {
    const lines = [];

    if (item.submitterName || item.submitterEmail) {
      lines.push(
        `From: ${item.submitterName || "Name not provided"} · ` +
        `${item.submitterEmail || "Email not provided"}`
      );
    } else {
      lines.push("Created in this dashboard");
    }

    if (categoryOf(item) === "careers") {
      const bits = [item.organisation, item.location, item.duration].filter(Boolean);
      if (bits.length) lines.push(bits.join(" · "));
      if (item.deadline) lines.push(`Apply by: ${item.deadline}`);
    } else if (item.authorName) {
      lines.push(`Author: ${item.authorName}`);
    }

    lines.push(`Created: ${safeDate(item.submittedAt)}`);
    if (item.status === "Approved" && item.publishedAt) {
      lines.push(`Published: ${safeDate(item.publishedAt)}`);
    }
    lines.push(`Reference: ${item.rowKey || item.id || "Unavailable"}`);

    return lines.join("\n");
  }

  function makeCard(item) {
    const card = document.createElement("article");
    card.className = "submission-card";

    const type = document.createElement("p");
    type.className = "eyebrow";
    type.textContent = (TYPE_LABELS[typeOf(item)] || typeOf(item)).toUpperCase();

    const title = document.createElement("h3");
    title.textContent = item.title || "(Untitled submission)";

    const status = document.createElement("span");
    status.className =
      "status-pill " + String(item.status || "Pending").toLowerCase();
    status.textContent = item.status === "Approved" ? "Published" : (item.status || "Pending");

    const meta = document.createElement("div");
    meta.className = "submission-meta";
    meta.style.whiteSpace = "pre-line";
    meta.textContent = detailLines(item);

    card.append(type, title, status, meta, makeDescription(item.description));

    const current = item.status || "Pending";
    const actions = document.createElement("div");
    actions.className = "admin-card-actions";

    if (current === "Pending") {
      actions.append(
        actionButton("Approve", "", b => moderate(item, "Approved", b)),
        actionButton("Reject", "danger", b => moderate(item, "Rejected", b))
      );
    }

    if (current === "Draft") {
      actions.append(actionButton("Publish", "", b => moderate(item, "Approved", b)));
    }

    if (current === "Approved") {
      actions.append(actionButton("Unpublish", "secondary", b => moderate(item, "Draft", b)));
    }

    if (current === "Rejected") {
      actions.append(actionButton("Move to drafts", "secondary", b => moderate(item, "Draft", b)));
    }

    actions.append(actionButton("Edit", "secondary", () => startEditing(item)));

    if (current === "Draft" || current === "Rejected") {
      actions.append(actionButton("Delete", "danger", b => remove(item, b)));
    }

    if (current === "Approved") {
      const view = document.createElement("a");
      view.className = "admin-link";
      view.href = "read.html?id=" + encodeURIComponent(item.rowKey || item.id);
      view.target = "_blank";
      view.rel = "noopener";
      view.textContent = "View live →";
      actions.append(view);
    }

    card.append(actions);

    return card;
  }

  function render() {
    list.replaceChildren();

    const filtered = allSubmissions.filter(item => {
      const statusMatch =
        currentFilter === "All" ||
        (item.status || "Pending") === currentFilter;

      const categoryMatch =
        currentCategory === "all" ||
        categoryOf(item) === currentCategory;

      return statusMatch && categoryMatch;
    });

    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "admin-empty";
      empty.textContent = "Nothing here yet for this filter.";
      list.append(empty);
      return;
    }

    filtered.forEach(item => list.append(makeCard(item)));
  }

  async function loadSubmissions() {
    showNotice("Loading…");
    list.replaceChildren();

    try {
      const result = await apiFetch("/api/owner/submissions");

      allSubmissions = Array.isArray(result.submissions)
        ? result.submissions
        : [];

      render();

      const count = status =>
        allSubmissions.filter(item => (item.status || "Pending") === status).length;

      showNotice(
        `${allSubmissions.length} item(s): ${count("Pending")} pending, ` +
        `${count("Draft")} draft, ${count("Approved")} published, ` +
        `${count("Rejected")} rejected.`,
        "success"
      );
    } catch (error) {
      showNotice(
        error.message +
        " If this is a permissions error, confirm the signed-in account " +
        "has the LegalLounge.Owner app role and the API exposes access_as_user.",
        "error"
      );
    }
  }

  const CONFIRMATIONS = {
    Approved: "Publish this on the website?",
    Rejected: "Reject this submission?",
    Draft: "Take this off the website and keep it as a draft?"
  };

  const DONE_MESSAGES = {
    Approved: "Published.",
    Rejected: "Rejected.",
    Draft: "Moved to drafts."
  };

  async function moderate(item, status, button) {
    if (!window.confirm(CONFIRMATIONS[status])) {
      return;
    }

    button.disabled = true;

    try {
      const id = item.rowKey || item.id;

      await apiFetch(
        `/api/owner/submissions/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status })
        }
      );

      await loadSubmissions();
      showNotice(DONE_MESSAGES[status], "success");
    } catch (error) {
      button.disabled = false;
      showNotice(error.message, "error");
    }
  }

  async function remove(item, button) {
    if (!window.confirm("Delete this permanently? This cannot be undone.")) {
      return;
    }

    button.disabled = true;

    try {
      const id = item.rowKey || item.id;

      await apiFetch(`/api/owner/content/${encodeURIComponent(id)}`, {
        method: "DELETE"
      });

      if (editingItem && (editingItem.rowKey || editingItem.id) === id) {
        resetForm();
      }

      await loadSubmissions();
      showNotice("Deleted.", "success");
    } catch (error) {
      button.disabled = false;
      showNotice(error.message, "error");
    }
  }

  cf("Type").addEventListener("change", updateFormForType);
  cf("SaveDraft").addEventListener("click", () => saveContent(false));
  cf("Publish").addEventListener("click", () => saveContent(true));
  cf("Cancel").addEventListener("click", () => {
    resetForm();
    composeNotice.className = "admin-status admin-hidden";
  });
  updateFormForType();

  document.getElementById("loginButton").addEventListener(
    "click",
    async () => {
      try {
        const result = await msalInstance.loginPopup({
          scopes: ["openid", "profile", "email", API_SCOPE],
          authority: `https://login.microsoftonline.com/${TENANT_ID}`,
          prompt: "select_account"
        });

        account = result.account;
        msalInstance.setActiveAccount(account);

        setSignedIn(account);
        await loadSubmissions();
      } catch (error) {
        showNotice(
          "Sign-in failed: " +
          (error.message ||
            "Please check the Entra app registration and redirect URI."),
          "error"
        );
      }
    }
  );

  document.getElementById("refreshButton").addEventListener(
    "click",
    loadSubmissions
  );

  document.getElementById("logoutButton").addEventListener(
    "click",
    async () => {
      try {
        await msalInstance.logoutPopup({
          account,
          postLogoutRedirectUri: window.location.origin + "/"
        });

        account = null;
        accessToken = null;
        allSubmissions = [];
        resetForm();

        dashboardPanel.classList.add("admin-hidden");
        loginPanel.classList.remove("admin-hidden");
        list.replaceChildren();

        showNotice("Signed out.");
      } catch (error) {
        showNotice("Sign-out failed: " + error.message, "error");
      }
    }
  );

  document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-category]").forEach(element => {
        element.classList.toggle("active", element === button);
      });

      currentCategory = button.dataset.category;
      render();
    });
  });

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(element => {
        element.classList.toggle("active", element === button);
      });

      currentFilter = button.dataset.filter;
      render();
    });
  });

  msalInstance.initialize()
    .then(() => {
      const existing = msalInstance.getAllAccounts()[0];

      if (existing) {
        account = existing;
        msalInstance.setActiveAccount(account);
        setSignedIn(account);
        loadSubmissions();
      }
    })
    .catch(error => {
      showNotice(
        "Authentication initialization failed: " + error.message,
        "error"
      );
    });
})();
