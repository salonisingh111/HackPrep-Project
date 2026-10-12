export function initInfoModal(modalId) {
  const modalEl = document.getElementById(modalId);
  if (!modalEl) return null;

  const closeBtn = modalEl.querySelector(".modal-close-btn");
  const titleEl = modalEl.querySelector("#infoModalTitle");
  const msgEl = modalEl.querySelector("#infoModalMessage");
  const dismissBtn = modalEl.querySelector("#infoModalDismissBtn");

  function open(title, message) {
    if (titleEl) titleEl.textContent = title || "Feature Update";
    if (msgEl) msgEl.textContent = message || "This module is currently in development.";
    modalEl.classList.add("is-open");
  }

  function close() {
    modalEl.classList.remove("is-open");
  }

  if (closeBtn) closeBtn.addEventListener("click", close);
  if (dismissBtn) dismissBtn.addEventListener("click", close);

  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("is-open")) close();
  });

  return { open, close };
}
