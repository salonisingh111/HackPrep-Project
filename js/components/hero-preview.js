/**
 * Realistic Interactive Project Builder Preview Controller.
 */
export function initHeroPreview(mockupId = "heroMockupCard", onGenerateClick) {
  const mockup = document.getElementById(mockupId);
  if (!mockup) return;

  // Domain to recommended stack mapping for interactive preview
  const domainStacks = {
    "AI / ML": ["Python", "FastAPI", "PyTorch", "Pinecone"],
    "Web Development": ["TypeScript", "Next.js", "PostgreSQL", "Tailwind"],
    "FinTech": ["Go", "Kafka", "PostgreSQL", "Next.js"],
    "HealthTech": ["Python", "WebRTC", "PostgreSQL", "React"],
    "Environment": ["Python", "Flask", "SQLite", "Chart.js"],
    "Social Impact": ["React Native", "Node.js", "MongoDB", "Express"]
  };

  const domainSelect = mockup.querySelector("#heroMockupDomain");
  const stackContainer = mockup.querySelector("#heroMockupStackTags");

  if (domainSelect && stackContainer) {
    domainSelect.addEventListener("change", () => {
      const selected = domainSelect.value;
      const stack = domainStacks[selected] || domainStacks["AI / ML"];
      stackContainer.innerHTML = stack.map(tag => `
        <span class="mockup-stack-tag">${tag}</span>
      `).join("");
    });
  }

  // Difficulty pill toggle
  const pillButtons = mockup.querySelectorAll(".mockup-pill-btn");
  pillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      pillButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  // Textarea counter
  const textarea = mockup.querySelector("#heroMockupTextarea");
  const counter = mockup.querySelector("#heroMockupCounter");
  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      const len = textarea.value.length;
      counter.textContent = `${len}/300`;
    });
  }

  // Generate Blueprint button
  const genBtn = mockup.querySelector("#heroMockupGenBtn");
  if (genBtn) {
    genBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof onGenerateClick === "function") {
        onGenerateClick();
      } else {
        const projectsEl = document.getElementById("projects");
        if (projectsEl) {
          projectsEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }
}
