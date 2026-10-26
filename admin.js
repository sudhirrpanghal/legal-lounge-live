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
    cache: { cacheLocation: "sessionStorage", storeAuthStateInCookie: false }
  });

  const loginPanel = document.getElementById("loginPanel");
  const dashboardPanel = document.getElementById("dashboardPanel");
  const notice = document.getElementById("notice");
  const list = document.getElementById("submissionsList");
  const signedInAs = document.getElementById("signedInAs");
  let account = null;
  let accessToken = null;
  let currentFilter = "Pending";
  let currentCategory = "all";
  let allSubmissions = [];

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
    if (!account) throw new Error("Please sign in first.");
    try {
      const result = await msalInstance.acquireTokenSilent({ account, scopes: [API_SCOPE] });
      accessToken = result.accessToken;
      return accessToken;
    } catch (err) {
      const result = await msalInstance.acquireTokenPopup({ account, scopes: [API_SCOPE] });
      accessToken = result.accessToken;
      return accessToken;
    }
  }
  async function apiFetch(path, options = {}) {
    const token = await getToken();
    const response = await fetch(API_BASE + path, {
      ...options,
      headers: {
        "Authorization": `Bearer ${token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {})
      }
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || `Request failed (${response.status}).`);
    return body;
  }
  function safeDate(value) {
    if (!value) return "Date not provided";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
  }
  function typeOf(item) {
    return String(item.type || item.partitionKey || "submission").toLowerCase();
  }
  function categoryOf(item) {
    return ["job", "internship"].includes(typeOf(item)) ? "careers" : "editorial";
  }
  function makeCard(item) {
    const card = document.createElement("article");
    card.className = "submission-card";
    const type = document.createElement("p");
    type.className = "eyebrow";
    type.textContent = typeOf(item).replace(/-/g, " ");
    const title = document.createElement("h3");
    title.textContent = item.title || "(Untitled submission)";
    const status = document.createElement("span");
    status.className = "status-pill " + String(item.status || "Pending").toLowerCase();
    status.textContent = item.status || "Pending";
    const meta = document.createElement("div");
    meta.className = "submission-meta";
    meta.textContent = `From: ${item.submitterName || "Name not provided"} · ${item.submitterEmail || "Email not provided"}\nSubmitted: ${safeDate(item.submittedAt)}\nReference: ${item.rowKey || item.id || "Unavailable"}`;
    const desc = document.createElement("p");
    desc.className = "submission-description";
    desc.textContent = item.description || "";
    card.append(type, title, status, meta, desc);
    const actions = document.createElement("div");
    actions.className = "admin-actions";
    if (item.status === "Pending") {
      const approve = document.createElement("button");
      approve.className = "admin-btn";
      approve.type = "button";
      approve.textContent = "Approve";
      approve.addEventListener("click", () => moderate(item, "Approved", approve));
      const reject = document.createElement("button");
      reject.className = "admin-btn danger";
      reject.type = "button";
      reject.textContent = "Reject";
      reject.addEventListener("click", () => moderate(item, "Rejected", reject));
      actions.append(approve, reject);
    }
    if (actions.childElementCount) card.append(actions);
    return card;
  }
  function render() {
    list.replaceChildren();
    const filtered = allSubmissions.filter(item => {
      const statusMatch = currentFilter === "All" || (item.status || "Pending") === currentFilter;
      const categoryMatch = currentCategory === "all" || categoryOf(item) === currentCategory;
      return statusMatch && categoryMatch;
    });
    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "admin-empty";
      empty.textContent = `No matching ${currentCategory === "careers" ? "job or internship" : currentCategory === "editorial" ? "article or research paper" : ""} submissions found for this status filter.`;
      list.append(empty);
      return;
    }
    filtered.forEach(item => list.append(makeCard(item)));
  }
  async function loadSubmissions() {
    showNotice("Loading submissions…");
    list.replaceChildren();
    try {
      const result = await apiFetch("/api/admin/submissions");
      allSubmissions = Array.isArray(result.submissions) ? result.submissions : [];
      render();
      const careersCount = allSubmissions.filter(x => categoryOf(x) === "careers").length;
      const editorialCount = allSubmissions.length - careersCount;
      showNotice(`Loaded ${allSubmissions.length} submission(s): ${editorialCount} articles/research papers and ${careersCount} jobs/internships.`, "success");
    } catch (err) {
      showNotice(err.message + " If this is a permissions error, confirm the signed-in account has the LegalLounge.Owner app role and the API exposes access_as_user.", "error");
    }
  }
  async function moderate(item, status, button) {
    if (!window.confirm(`${status} this submission?`)) return;
    button.disabled = true;
    try {
      await apiFetch(`/api/admin/submissions/${encodeURIComponent(item.rowKey || item.id)}`, {
        method: "PATCH", body: JSON.stringify({ status })
      });
      showNotice(`Submission marked ${status.toLowerCase()}.`, "success");
      await loadSubmissions();
    } catch (err) {
      button.disabled = false;
      showNotice(err.message, "error");
    }
  }

  document.getElementById("loginButton").addEventListener("click", async () => {
    try {
      const result = await msalInstance.loginPopup({ scopes: ["openid", "profile", "email", API_SCOPE] });
      account = result.account;
      msalInstance.setActiveAccount(account);
      setSignedIn(account);
      await loadSubmissions();
    } catch (err) {
      showNotice("Sign-in failed: " + (err.message || "Please check the Entra app registration and redirect URI."), "error");
    }
  });
  document.getElementById("refreshButton").addEventListener("click", loadSubmissions);
  document.getElementById("logoutButton").addEventListener("click", async () => {
    await msalInstance.logoutPopup({ account, postLogoutRedirectUri: window.location.origin + "/" });
    account = null; accessToken = null; allSubmissions = [];
    dashboardPanel.classList.add("admin-hidden");
    loginPanel.classList.remove("admin-hidden");
    list.replaceChildren();
    showNotice("Signed out.");
  });
  document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-category]").forEach(x => x.classList.toggle("active", x === button));
    currentCategory = button.dataset.category;
    render();
  }));

  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(x => x.classList.toggle("active", x === button));
    currentFilter = button.dataset.filter;
    render();
  }));

  msalInstance.initialize().then(() => {
    const existing = msalInstance.getAllAccounts()[0];
    if (existing) {
      account = existing;
      msalInstance.setActiveAccount(account);
      setSignedIn(account);
      loadSubmissions();
    }
  }).catch(err => showNotice("Authentication initialization failed: " + err.message, "error"));
})();
