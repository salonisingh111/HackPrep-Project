import { state } from "../state.js";

export function initNavbar(onOpenAuth, onOpenNotice) {
  const container = document.getElementById("navbarAuthAction");
  const navList = document.getElementById("navbarList");
  const toggleBtn = document.getElementById("navbarToggleBtn");

  // Mobile menu toggle
  if (toggleBtn && navList) {
    toggleBtn.addEventListener("click", () => {
      navList.classList.toggle("is-open");
    });

    navList.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navList.classList.remove("is-open");
      });
    });
  }

  // Handle "Teams" in-progress notice
  const teamsLink = document.getElementById("navTeams");
  if (teamsLink) {
    teamsLink.addEventListener("click", (e) => {
      if (typeof onOpenNotice === "function") {
        e.preventDefault();
        onOpenNotice("Team Hub", "Team matchmaking and hacker roster formation is scheduled for the upcoming sprint. Stay tuned for early access!");
      }
    });
  }

  function render() {
    if (!container) return;

    if (state.isAuthenticated && state.currentUser) {
      container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 13px; font-weight: 500; color: var(--text-primary);">@${state.currentUser.username}</span>
          <button id="navLogoutBtn" class="btn-secondary" style="min-height: 36px; padding: 0 12px; font-size: 13px;">Sign Out</button>
        </div>
      `;
      const logoutBtn = document.getElementById("navLogoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => state.logout());
      }
    } else {
      container.innerHTML = `
        <button id="navLoginBtn" class="btn-nav-login" style="cursor: pointer;">Log In</button>
        <button id="navGetStartedBtn" class="btn-primary" style="min-height: 38px; padding: 0 16px;">
          Get Started
        </button>
      `;
      const loginBtn = document.getElementById("navLoginBtn");
      const getStartedBtn = document.getElementById("navGetStartedBtn");

      if (loginBtn) {
        loginBtn.addEventListener("click", () => {
          if (typeof onOpenAuth === "function") onOpenAuth();
        });
      }
      if (getStartedBtn) {
        getStartedBtn.addEventListener("click", () => {
          if (typeof onOpenAuth === "function") onOpenAuth();
        });
      }
    }
  }

  state.subscribe(render);
  render();
}
