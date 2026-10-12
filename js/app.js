import { initNavbar } from "./components/navbar.js";
import { initHeroPreview } from "./components/hero-preview.js";
import { initAuthModal } from "./components/auth-modal.js";
import { initBlueprintBuilder } from "./components/blueprint-builder.js";
import { initResourceExplorer } from "./components/resource-explorer.js";
import { initProjectDirectory } from "./components/project-directory.js";
import { initBlueprintDetailModal } from "./components/blueprint-detail-modal.js";
import { initInfoModal } from "./components/info-modal.js";
import { initScrollAnimations } from "./components/scroll-animations.js";

function bootstrap() {
  const authModal = initAuthModal("authModal");
  const detailModal = initBlueprintDetailModal("detailModal");
  const infoModal = initInfoModal("infoModal");

  const handleOpenAuth = () => {
    if (authModal) authModal.open();
  };

  const handleOpenNotice = (title, message) => {
    if (infoModal) infoModal.open(title, message);
  };

  const handleInspect = (blueprint) => {
    if (detailModal) detailModal.open(blueprint);
  };

  initNavbar(handleOpenAuth, handleOpenNotice);
  initHeroPreview("heroMockupCard");
  initProjectDirectory("popularCardsGrid", "projectFilters", handleInspect);
  initBlueprintBuilder("builderForm", "builderResultBox", handleOpenAuth);
  initResourceExplorer("resourceSearchInput", "resourceCategories", "resourcesGrid");
  initScrollAnimations();

  // "Watch Demo" CTA button
  const watchDemoBtn = document.getElementById("heroWatchDemoBtn");
  if (watchDemoBtn) {
    watchDemoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleOpenNotice(
        "HackPrep Platform Demo",
        "Welcome to HackPrep! Here is how it works: (1) Discover curated real-world problem statements, (2) Generate a custom architectural blueprint with recommended tech stacks, (3) Access verified free APIs and starter kits, and (4) Form balanced hackathon teams. Try the interactive Project Builder below to get started!"
      );
    });
  }

  // Feature notice triggers for uncompleted sprint features
  document.querySelectorAll("[data-notice-feature]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const featName = btn.dataset.noticeFeature || "Feature";
      handleOpenNotice(
        featName,
        `${featName} is scheduled for development in the upcoming sprint. Reserve early access today!`
      );
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
