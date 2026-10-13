import { state } from "../state.js";

/**
 * Polished navbar controller managing scroll opacity, responsive drawer, and auth states.
 */
export function initNavbar(onOpenAuth, onOpenNotice) {
  const navElement = document.querySelector(".navbar");
  const container = document.getElementById("navbarAuthAction");
  const navList = document.getElementById("navbarList");
  const toggleBtn = document.getElementById("navbarToggleBtn");
  const searchBtn = document.getElementById("navbarSearchBtn");

  // Sticky scroll opacity enhancement
  function handleScroll() {
    if (!navElement) return;
    if (window.scrollY > 24) {
      navElement.classList.add("is-scrolled");
    } else {
      navElement.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile drawer toggle
  if (toggleBtn && navList) {
    toggleBtn.addEventListener("click", () => {
      const isExpanded = navList.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(isExpanded));
    });

    navList.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navList.classList.remove("is-open");
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        navList.querySelectorAll(".nav-link").forEach(l => l.classList.remove("is-active"));
        link.classList.add("is-active");
      });
    });
  }

  // Search button action
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
  // Mobile login action
  const mobileLogin = document.getElementById("navMobileLogin");
  if (mobileLogin) {
    mobileLogin.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof onOpenAuth === "function") onOpenAuth();
    });
  }

  // Placeholder hooks for standalone pages
  const placeholderRoutes = [
    { id: "navResources", name: "Curated Resources", message: "Resource directory is scheduled for the upcoming sprint. Discover hackathon project blueprints below!" },
    { id: "navTeams", name: "Team Matchmaking", message: "Team collaboration roster is scheduled for the upcoming sprint. Stay tuned!" }
  ];

  placeholderRoutes.forEach(({ id, name, message }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", (e) => {
        if (typeof onOpenNotice === "function") {
          e.preventDefault();
          onOpenNotice(name, message);
        }
      });
    }
  });

  function renderAuth() {
    if (!container) return;

    if (state.isAuthenticated && state.currentUser) {
      container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 13px; font-weight: 500; color: var(--text-primary);">@${state.currentUser.username}</span>
          <button id="navLogoutBtn" class="btn-secondary" style="min-height: 40px; padding: 0 14px; font-size: 13px;">Sign Out</button>
        </div>
      `;
      const logoutBtn = document.getElementById("navLogoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => state.logout());
      }
    } else {
      container.innerHTML = `
        <button id="navLoginBtn" class="btn-nav-login">Log In</button>
        <button id="navGetStartedBtn" class="btn-primary" style="min-height: 40px; padding: 0 18px;">
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

  state.subscribe(renderAuth);
  renderAuth();
}
