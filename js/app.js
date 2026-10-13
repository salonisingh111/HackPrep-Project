import { initWaveBackground } from "./components/wave-background.js";
import { initNavbar } from "./components/navbar.js";
import { initHeroPreview } from "./components/hero-preview.js";
import { initProjectDirectory } from "./components/project-directory.js";
import { initHowItWorks } from "./components/how-it-works.js";
import { initScrollAnimations } from "./components/scroll-animations.js";
import { initAuthModal } from "./components/auth-modal.js";
import { initBlueprintDetailModal } from "./components/blueprint-detail-modal.js";
import { initInfoModal } from "./components/info-modal.js";

/**
 * Bootstrap the HackPrep homepage application.
 */
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

  // 1. Animated Wave Background
  initWaveBackground("waveCanvas");

  // 2. Navigation Bar
  initNavbar(handleOpenAuth, handleOpenNotice);

  // 3. Hero Project Builder Preview
  initHeroPreview("heroMockupCard", () => {
    handleOpenNotice(
      "Project Builder Studio",
      "This interactive widget previews the HackPrep Project Builder. Select a curated project below or log in to create custom blueprints!"
    );
  });

  // 4. Featured Project Ideas Directory
  initProjectDirectory("popularCardsGrid", "projectFilters", handleInspect);

  // 5. How It Works Workflow Animation
  initHowItWorks("how-it-works");

  // 6. Section Scroll Reveals
  initScrollAnimations();

  // "View All Projects" link
  const viewAllProjectsLink = document.getElementById("viewAllProjectsLink");
  if (viewAllProjectsLink) {
    viewAllProjectsLink.addEventListener("click", (e) => {
      e.preventDefault();
      const filterAllBtn = document.querySelector("#projectFilters .filter-pill");
      if (filterAllBtn) filterAllBtn.click();
      const projSec = document.getElementById("projects");
      if (projSec) projSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Footer explore placeholders
  const footerResources = document.getElementById("footerResourcesLink");
  if (footerResources) {
    footerResources.addEventListener("click", (e) => {
      e.preventDefault();
      handleOpenNotice("Curated Resources", "The Resource directory is scheduled for the next release. Explore the project blueprints above!");
    });
  }

  const footerTeams = document.getElementById("footerTeamsLink");
  if (footerTeams) {
    footerTeams.addEventListener("click", (e) => {
      e.preventDefault();
      handleOpenNotice("Team Matchmaking", "Team collaboration tools are scheduled for the next release. Stay tuned!");
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
