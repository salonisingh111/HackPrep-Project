const PREVIEW_DATA = {
  healthcare: {
    title: "MediConnect Telemedicine Dispatch",
    domain: "Healthcare",
    timeline: "36h Hackathon Sprint",
    architecture: "WebRTC P2P <-> FastAPI Signaling Server <-> Postgres Event Log",
    stack: ["WebRTC", "FastAPI", "Tailwind", "PostgreSQL"],
    steps: [
      "Hour 0-8: Signaling server & schema setup",
      "Hour 8-20: Peer video audio channels",
      "Hour 20-30: Patient triage dashboard",
      "Hour 30-36: Demo deployment & pitch prep"
    ]
  },
  climate: {
    title: "GreenBuddy Carbon Auditor",
    domain: "Climate",
    timeline: "48h Hackathon Sprint",
    architecture: "GitHub Action Runner <-> Python Metrics Engine <-> Redis Cache",
    stack: ["Python", "Docker", "Next.js", "Redis"],
    steps: [
      "Hour 0-12: Carbon estimation formulas",
      "Hour 12-24: GitHub Action runner hook",
      "Hour 24-38: Comparison leaderboard UI",
      "Hour 38-48: Smoke testing & docs"
    ]
  },
  fintech: {
    title: "FinMate Anomaly Watchdog",
    domain: "FinTech",
    timeline: "48h Hackathon Sprint",
    architecture: "Kafka Event Stream <-> Go Analytics Worker <-> Realtime Dashboard",
    stack: ["TypeScript", "Go", "Kafka", "PostgreSQL"],
    steps: [
      "Hour 0-10: Synthetic transaction generator",
      "Hour 10-24: Anomaly scoring pipeline",
      "Hour 24-36: Real-time SSE alert dashboard",
      "Hour 36-48: Pitch deck & submission"
    ]
  }
};

export function initHeroPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const tabButtons = container.querySelectorAll(".preview-tab");
  const titleEl = container.querySelector("#heroPreviewTitle");
  const metaEl = container.querySelector("#heroPreviewMeta");
  const archEl = container.querySelector("#heroPreviewArch");
  const stackEl = container.querySelector("#heroPreviewStack");
  const timelineEl = container.querySelector("#heroPreviewTimeline");

  function render(domainKey) {
    const item = PREVIEW_DATA[domainKey] || PREVIEW_DATA.healthcare;

    if (titleEl) titleEl.textContent = item.title;
    if (metaEl) metaEl.textContent = `${item.domain} • ${item.timeline}`;
    if (archEl) archEl.textContent = item.architecture;

    if (stackEl) {
      stackEl.innerHTML = item.stack.map(s => `<span class="badge badge-outline">${s}</span>`).join("");
    }

    if (timelineEl) {
      timelineEl.innerHTML = item.steps.map(step => `
        <div class="preview-step">
          <span class="step-marker"></span>
          <span>${step}</span>
        </div>
      `).join("");
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const domain = btn.dataset.domain;
      render(domain);
    });
  });

  render("healthcare");
}
