import { state } from "../state.js";

export function initAuthModal(modalId) {
  const modalEl = document.getElementById(modalId);
  if (!modalEl) return null;

  const closeBtn = modalEl.querySelector(".modal-close-btn");
  const form = modalEl.querySelector("form");
  const usernameInput = modalEl.querySelector("#authUsername");
  const feedbackEl = modalEl.querySelector("#authFeedback");
  const submitBtn = modalEl.querySelector("button[type='submit']");

  function open() {
    modalEl.classList.add("is-open");
    if (feedbackEl) feedbackEl.textContent = "";
    if (usernameInput) {
      usernameInput.value = "";
      usernameInput.focus();
    }
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

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = usernameInput ? usernameInput.value.trim() : "";
      if (!val) {
        if (feedbackEl) feedbackEl.textContent = "Please provide your developer handle.";
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (feedbackEl) feedbackEl.textContent = "Authenticating developer session...";

      setTimeout(() => {
        const { error } = state.login(val);
        if (submitBtn) submitBtn.disabled = false;
        if (error) {
          if (feedbackEl) feedbackEl.textContent = error;
        } else {
          close();
        }
      }, 350);
    });
  }

  return { open, close };
}
