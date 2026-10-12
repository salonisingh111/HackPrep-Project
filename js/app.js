import { initNavbar } from "./components/navbar.js";
import { initHeroPreview } from "./components/hero-preview.js";
import { initAuthModal } from "./components/auth-modal.js";
import { initBlueprintBuilder } from "./components/blueprint-builder.js";
import { initResourceExplorer } from "./components/resource-explorer.js";
import { initProjectDirectory } from "./components/project-directory.js";
import { initBlueprintDetailModal } from "./components/blueprint-detail-modal.js";
import { initInfoModal } from "./components/info-modal.js";

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
  initHeroPreview("heroBlueprintPreview");
  initBlueprintBuilder("builderForm", "builderResultBox", handleOpenAuth);
  initProjectDirectory("blueprintsGrid", handleInspect);
  initResourceExplorer("resourceSearchInput", "resourceCategories", "resourcesGrid");

  // Wire Teams / Workspace in-progress buttons if present
  document.querySelectorAll("[data-notice-feature]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const featName = btn.dataset.noticeFeature || "Feature";
      handleOpenNotice(featName, `${featName} is scheduled for development in the upcoming sprint. Reserve early access today!`);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
