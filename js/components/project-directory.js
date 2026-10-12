import { state } from "../state.js";

export function initProjectDirectory(containerId, onInspect) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function render() {
    const list = state.blueprints;
    if (!list || list.length === 0) {
      container.innerHTML = `
        <div class="state-box" style="grid-column: 1 / -1;">
          <p>No project blueprints found.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="card" data-id="${item.id}">
        <div class="card-header">
          <div>
            <span class="badge ${item.difficulty === 'Intermediate' ? 'badge-green' : 'badge-outline'}" style="margin-bottom: 6px;">
              ${item.difficulty.toUpperCase()}
            </span>
            <h3 class="card-title">${item.title}</h3>
            <span class="card-meta">${item.domain} • ${item.timeline}</span>
          </div>
        </div>
        <div class="card-body">
          <p>${item.summary}</p>
          <div class="badge-group" style="margin-top: 12px;">
            ${item.stack.map(s => `<span class="badge badge-outline">${s}</span>`).join("")}
          </div>
        </div>
        <div class="card-footer">
          <span style="font-family: var(--font-family-mono); font-size: 13px; color: var(--accent-green);">${item.domain}</span>
          <button class="btn-secondary inspect-btn" data-id="${item.id}" style="min-height: 36px;">
            Inspect Blueprint →
          </button>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".inspect-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const found = list.find(x => x.id === id);
        if (found && typeof onInspect === "function") {
          onInspect(found);
        }
      });
    });
  }

  state.subscribe(render);
  render();
}
