export function initBlueprintDetailModal(modalId) {
  const modalEl = document.getElementById(modalId);
  if (!modalEl) return null;

  const closeBtn = modalEl.querySelector(".modal-close-btn");
  const titleEl = modalEl.querySelector("#modalDetailTitle");
  const domainEl = modalEl.querySelector("#modalDetailDomain");
  const summaryEl = modalEl.querySelector("#modalDetailSummary");
  const archEl = modalEl.querySelector("#modalDetailArchitecture");
  const milestonesList = modalEl.querySelector("#modalDetailMilestones");
  const stackGroup = modalEl.querySelector("#modalDetailStack");

  function open(blueprint) {
    if (!blueprint) return;
    if (titleEl) titleEl.textContent = blueprint.title;
    if (domainEl) domainEl.textContent = `${blueprint.domain} • ${blueprint.timeline} • ${blueprint.difficulty}`;
    if (summaryEl) summaryEl.textContent = blueprint.summary;
    if (archEl) archEl.textContent = blueprint.architecture;

    if (stackGroup) {
      stackGroup.innerHTML = blueprint.stack.map(s => `<span class="badge badge-outline">${s}</span>`).join("");
    }

    if (milestonesList) {
      milestonesList.innerHTML = blueprint.milestones.map(m => `
        <li style="font-family: var(--font-family-mono); font-size: 13px; color: var(--text-muted); padding-left: 10px; border-left: 2px solid var(--accent-green); margin-bottom: 6px;">
          ${m}
        </li>
      `).join("");
    }

    modalEl.classList.add("is-open");
  }

  function close() {
    modalEl.classList.remove("is-open");
  }

  if (closeBtn) closeBtn.addEventListener("click", close);

  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("is-open")) close();
  });

  return { open, close };
}
