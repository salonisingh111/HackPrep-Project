import { generateCustomBlueprint } from "../data/blueprints.js";
import { state } from "../state.js";

export function initBlueprintBuilder(builderFormId, resultContainerId, onRequireAuth) {
  const form = document.getElementById(builderFormId);
  const resultBox = document.getElementById(resultContainerId);
  if (!form || !resultBox) return;

  const ideaInput = form.querySelector("#builderIdea");
  const domainSelect = form.querySelector("#builderDomain");
  const durationSelect = form.querySelector("#builderDuration");
  const submitBtn = form.querySelector("button[type='submit']");

  let currentGenerated = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const idea = ideaInput ? ideaInput.value.trim() : "";

    if (!idea) {
      renderError("Project idea cannot be blank. Enter your hackathon concept above.");
      return;
    }

    renderLoading();
    if (submitBtn) submitBtn.disabled = true;

    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      const res = generateCustomBlueprint({
        idea: idea,
        domain: domainSelect ? domainSelect.value : "AI & Web",
        duration: durationSelect ? durationSelect.value : "36 Hours"
      });

      if (res.error) {
        renderError(res.error);
      } else {
        currentGenerated = res.data;
        renderSuccess(res.data);
      }
    }, 400);
  });

  function renderLoading() {
    resultBox.innerHTML = `
      <div class="state-box is-loading">
        <div class="spinner"></div>
        <p>Analyzing architecture patterns and compiling milestones...</p>
      </div>
    `;
  }

  function renderError(msg) {
    resultBox.innerHTML = `
      <div class="state-box">
        <p style="color: #FF5555; font-family: var(--font-family-mono);">${msg}</p>
      </div>
    `;
  }

  function renderSuccess(item) {
    resultBox.innerHTML = `
      <div class="card" style="border-color: var(--accent-green);">
        <div class="card-header">
          <div>
            <span class="badge badge-green" style="margin-bottom: 8px;">GENERATED BLUEPRINT</span>
            <h3 class="card-title">${item.title}</h3>
            <span class="card-meta">${item.domain} • ${item.timeline}</span>
          </div>
          <button id="saveBlueprintBtn" class="btn-primary" style="min-height: 38px;">Save Blueprint</button>
        </div>
        <div class="card-body">
          <p style="margin-bottom: 12px; color: var(--text-primary);">${item.summary}</p>
          <div style="margin-bottom: 12px;">
            <span style="font-family: var(--font-family-mono); color: var(--accent-green); display: block; margin-bottom: 4px;">Architecture:</span>
            <code style="background: var(--bg-surface-elevated); padding: 4px 8px; border-radius: 4px; display: block;">${item.architecture}</code>
          </div>
          <div class="badge-group" style="margin-bottom: 16px;">
            ${item.stack.map(s => `<span class="badge badge-outline">${s}</span>`).join("")}
          </div>
          <div>
            <span style="font-family: var(--font-family-mono); color: var(--text-primary); display: block; margin-bottom: 6px;">Execution Milestones:</span>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px;">
              ${item.milestones.map(m => `<li style="font-family: var(--font-family-mono); font-size: 13px; color: var(--text-muted); padding-left: 12px; border-left: 2px solid var(--accent-green);">${m}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;

    const saveBtn = document.getElementById("saveBlueprintBtn");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        if (!state.isAuthenticated) {
          if (typeof onRequireAuth === "function") onRequireAuth();
          return;
        }
        state.addBlueprint(currentGenerated);
        saveBtn.disabled = true;
        saveBtn.textContent = "Saved to Workspace ✓";
      });
    }
  }
}
