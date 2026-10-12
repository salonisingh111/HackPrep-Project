import { state } from "../state.js";

const ICONS = {
  environment: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  education: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
  health: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  fintech: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`
};

const CATEGORIES = [
  "All", "AI/ML", "Web Development", "Mobile",
  "Social Impact", "FinTech", "HealthTech", "Education", "Environment"
];

export function initProjectDirectory(gridId, filterContainerId, onInspect) {
  const container = document.getElementById(gridId);
  const filterContainer = document.getElementById(filterContainerId);
  if (!container) return;

  let activeCategory = "All";

  function renderFilters() {
    if (!filterContainer) return;
    filterContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="filter-pill ${cat === activeCategory ? 'is-active' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `).join("");

    filterContainer.querySelectorAll(".filter-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category || "All";
        renderFilters();
        renderProjects();
      });
    });
  }

  function renderProjects() {
    const list = state.blueprints;
    const filtered = activeCategory === "All"
      ? list
      : list.filter(item => {
          if (item.domain === activeCategory) return true;
          if (Array.isArray(item.tags) && item.tags.includes(activeCategory)) return true;
          return false;
        });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="state-box" style="grid-column: 1 / -1; width: 100%;">
          <p>No project ideas found in category "${activeCategory}".</p>
          <button class="btn-secondary" id="resetCategoryBtn" style="margin-top: 8px;">View All Ideas</button>
        </div>
      `;
      const resetBtn = container.querySelector("#resetCategoryBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          activeCategory = "All";
          renderFilters();
          renderProjects();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(item => {
      const iconKey = item.iconType || "environment";
      const iconSvg = ICONS[iconKey] || ICONS.environment;
      const domainSlug = (item.domain || "general").toLowerCase().replace(/[^a-z]/g, "");

      return `
        <article class="popular-card" data-id="${item.id}" tabindex="0" role="button" aria-label="Inspect ${item.title}">
          <div>
            <div class="popular-card-header">
              <div class="card-icon-box ${iconKey}">
                ${iconSvg}
              </div>
              <div class="popular-badge-group">
                <span class="popular-badge badge-${iconKey}">${item.domain}</span>
                <span class="popular-badge badge-subtle">${item.difficulty}</span>
              </div>
            </div>

            <div class="popular-card-body" style="margin-top: 14px;">
              <h3 class="popular-card-title">${item.title}</h3>
              <p class="popular-card-desc">${item.summary}</p>
            </div>
          </div>

          <div class="popular-card-footer">
            <div class="popular-card-meta">
              <span class="meta-item" title="Recommended team size">👥 ${item.teamSize || "3–4"}</span>
              <span class="meta-item" title="Estimated sprint timeline">⏱ ${item.timeline || "3–4 weeks"}</span>
              <span class="meta-item" title="Primary technology">⚡ ${item.techPrimary || item.stack[0] || "Code"}</span>
            </div>
            <span class="meta-arrow-btn" aria-hidden="true">→</span>
          </div>
        </article>
      `;
    }).join("");

    container.querySelectorAll(".popular-card").forEach(card => {
      const handleOpen = () => {
        const id = card.dataset.id;
        const found = list.find(x => x.id === id);
        if (found && typeof onInspect === "function") {
          onInspect(found);
        }
      };

      card.addEventListener("click", handleOpen);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      });
    });
  }

  renderFilters();
  renderProjects();
  state.subscribe(renderProjects);
}
