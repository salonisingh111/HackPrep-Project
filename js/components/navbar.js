import { state } from "../state.js";

export function initNavbar(onOpenAuth) {
  const container = document.getElementById("navbarAuthAction");
  if (!container) return;

  function render() {
    if (state.isAuthenticated && state.currentUser) {
      container.innerHTML = `
        <div class="nav-user-status">
          <span class="nav-status-indicator"></span>
          <span>${state.currentUser.username}</span>
          <button id="navLogoutBtn" class="btn-secondary" style="margin-left: 8px; min-height: 36px; padding: 0 12px;">Sign Out</button>
        </div>
      `;
      const logoutBtn = document.getElementById("navLogoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          state.logout();
        });
      }
    } else {
      container.innerHTML = `
        <button id="navLoginBtn" class="btn-primary" style="min-height: 36px; padding: 0 16px;">
          <span>Sign In</span>
        </button>
      `;
      const loginBtn = document.getElementById("navLoginBtn");
      if (loginBtn) {
        loginBtn.addEventListener("click", () => {
          if (typeof onOpenAuth === "function") {
            onOpenAuth();
          }
        });
      }
    }
  }

  state.subscribe(render);
  render();
}
