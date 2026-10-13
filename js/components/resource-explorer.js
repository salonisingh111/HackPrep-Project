import { RESOURCES_CATALOG, filterResources } from "../data/resources.js";

export function initResourceExplorer(searchInputId, categoriesContainerId, gridContainerId) {
  const searchInput = document.getElementById(searchInputId);
  const categoriesContainer = document.getElementById(categoriesContainerId);
  const gridContainer = document.getElementById(gridContainerId);
  if (!gridContainer) return;

  let activeCategory = "All";
  let activeQuery = "";

  const categories = ["All", "AI & ML", "Backend & DB", "APIs", "DevOps", "UI & Design", "Starter Kits"];

  if (categoriesContainer) {
    categoriesContainer.innerHTML = categories.map(cat => `
      <button class="btn-secondary filter-btn ${cat === activeCategory ? 'is-active' : ''}" data-category="${cat}" style="min-height: 36px; padding: 0 14px;">
        ${cat}
      </button>
    `).join("");

    categoriesContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      activeCategory = btn.dataset.category || "All";
      categoriesContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      render();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeQuery = e.target.value;
      render();
    });
  }

  function render() {
    const { data: list } = filterResources(RESOURCES_CATALOG, activeQuery, activeCategory);

    if (!list || list.length === 0) {
      gridContainer.innerHTML = `
        <div class="state-box" style="grid-column: 1 / -1;">
          <p>No resources found matching "${activeQuery}". Try another keyword or filter.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = list.map(item => `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-green" style="margin-bottom: 6px;">${item.badge}</span>
            <h3 class="card-title">${item.name}</h3>
          </div>
        </div>
        <div class="card-body">
          <p>${item.description}</p>
          <div class="badge-group" style="margin-top: 12px;">
            ${item.tags.map(t => `<span class="badge badge-outline">${t}</span>`).join("")}
          </div>
        </div>
        <div class="card-footer">
          <span class="card-meta">${item.category}</span>
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="min-height: 36px; text-decoration: none;">
            Visit Resource ↗
          </a>
        </div>
      </div>
    `).join("");
  }

  render();
}
