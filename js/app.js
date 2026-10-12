import { initNavbar } from "./components/navbar.js";
import { initTerminalAnimation } from "./components/terminal-anim.js";
import { initAuthModal } from "./components/auth-modal.js";
import { initBlueprintBuilder } from "./components/blueprint-builder.js";
import { initResourceExplorer } from "./components/resource-explorer.js";
import { initProjectDirectory } from "./components/project-directory.js";
import { initBlueprintDetailModal } from "./components/blueprint-detail-modal.js";

function bootstrap() {
  // Initialize modals
  const authModal = initAuthModal("authModal");
  const detailModal = initBlueprintDetailModal("detailModal");

  // Auth trigger handler
  const handleOpenAuth = () => {
    if (authModal) authModal.open();
  };

  // Blueprint inspect handler
  const handleInspect = (blueprint) => {
    if (detailModal) detailModal.open(blueprint);
  };

  // Initialize navbar
  initNavbar(handleOpenAuth);

  // Initialize terminal animation
  initTerminalAnimation("heroTerminalBody");

  // Initialize interactive blueprint generator
  initBlueprintBuilder("builderForm", "builderResultBox", handleOpenAuth);

  // Initialize public project directory
  initProjectDirectory("blueprintsGrid", handleInspect);

  // Initialize resource explorer
  initResourceExplorer("resourceSearchInput", "resourceCategories", "resourcesGrid");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}

