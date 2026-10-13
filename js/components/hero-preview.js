export function initHeroPreview(mockupId, onGenerateClick) {
  const mockup = document.getElementById(mockupId);
  if (!mockup) return;

  // Difficulty pill selection in hero mockup
  const pillButtons = mockup.querySelectorAll(".mockup-pill-btn");
  pillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      pillButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  // Sidebar item selection in hero mockup
  const navItems = mockup.querySelectorAll(".mockup-nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(n => n.classList.remove("is-active"));
      item.classList.add("is-active");
    });
  });

  // Generate Blueprint action button
  const genBtn = mockup.querySelector("#heroMockupGenBtn");
  if (genBtn) {
    genBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof onGenerateClick === "function") {
        onGenerateClick();
      } else {
        const builderEl = document.getElementById("builder");
        if (builderEl) {
          builderEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Textarea counter
  const textarea = mockup.querySelector("#heroMockupTextarea");
  const counter = mockup.querySelector("#heroMockupCounter");
  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      const len = textarea.value.length;
      counter.textContent = `${len}/500`;
    });
  }
}
