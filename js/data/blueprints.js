export const INITIAL_BLUEPRINTS = [
  {
    id: "mediconnect",
    title: "MediConnect",
    domain: "Healthcare",
    difficulty: "Intermediate",
    summary: "Decentralized emergency telemedicine dispatch and patient record exchange.",
    stack: ["WebRTC", "FastAPI", "Tailwind", "PostgreSQL"],
    timeline: "36 Hours",
    architecture: "Client WebRTC <-> Signaling Server <-> PostgreSQL Event Store",
    milestones: [
      "Hour 0-8: Signaling server & schema",
      "Hour 8-20: Peer video audio channels",
      "Hour 20-30: Patient triage dashboard",
      "Hour 30-36: Demo deployment & pitch"
    ]
  },
  {
    id: "edutrack",
    title: "EduTrack",
    domain: "Education",
    difficulty: "Beginner",
    summary: "Gamified hackathon peer learning tracker with automated repo verification.",
    stack: ["JavaScript", "HTML5", "Node.js", "SQLite"],
    timeline: "24 Hours",
    architecture: "Static UI <-> Node API <-> SQLite DB & GitHub Webhooks",
    milestones: [
      "Hour 0-6: UI mockup & schema design",
      "Hour 6-14: Progress logging endpoints",
      "Hour 14-20: Streak visualization widget",
      "Hour 20-24: QA testing & live demo"
    ]
  },
  {
    id: "greenbuddy",
    title: "GreenBuddy",
    domain: "Climate",
    difficulty: "Intermediate",
    summary: "Carbon footprint calculator for software engineers with CI/CD action plug-in.",
    stack: ["Python", "Docker", "Next.js", "Redis"],
    timeline: "48 Hours",
    architecture: "GitHub Action <-> Python Metrics Engine <-> Redis Cache <-> Next UI",
    milestones: [
      "Hour 0-12: Carbon estimation formulas",
      "Hour 12-24: GitHub Action runner",
      "Hour 24-38: Comparison leaderboard UI",
      "Hour 38-48: Final stress tests & docs"
    ]
  },
  {
    id: "finmate",
    title: "FinMate",
    domain: "FinTech",
    difficulty: "Advanced",
    summary: "Real-time algorithmic micro-budgeting platform with fraud anomaly detection.",
    stack: ["TypeScript", "Go", "Kafka", "PostgreSQL"],
    timeline: "48 Hours",
    architecture: "Event Bus (Kafka) <-> Go Analytics Worker <-> TypeScript Dashboard",
    milestones: [
      "Hour 0-10: Synthetic transaction generator",
      "Hour 10-24: Anomaly scoring pipeline",
      "Hour 24-36: Real-time SSE alert dashboard",
      "Hour 36-48: Resilience checks & pitch prep"
    ]
  }
];

export function generateCustomBlueprint(input) {
  if (!input || typeof input.idea !== "string" || input.idea.trim().length === 0) {
    return { data: null, error: "Please provide a valid project idea to generate a blueprint." };
  }

  const domain = input.domain || "AI & Web";
  const duration = input.duration || "36 Hours";

  const generated = {
    id: "custom-" + Date.now(),
    title: input.idea.slice(0, 28) + (input.idea.length > 28 ? "..." : ""),
    domain: domain,
    difficulty: "Custom",
    summary: input.idea,
    stack: [domain.split(" ")[0] || "JavaScript", "Python", "REST API", "LocalStorage"],
    timeline: duration,
    architecture: `Client Interface <-> Lightweight API Handler <-> Persistent Store`,
    milestones: [
      "Phase 1: Project setup, schema definition & Git branch baseline",
      "Phase 2: Core functional engine implementation & state management",
      "Phase 3: Real-time UI integration & interactive polish",
      "Phase 4: Smoke testing, responsive check & submission demo video"
    ]
  };

  return { data: generated, error: null };
}
