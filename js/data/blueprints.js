export const INITIAL_BLUEPRINTS = [
  {
    id: "greentrack",
    title: "GreenTrack",
    domain: "Environment",
    tags: ["Environment", "Python", "All"],
    difficulty: "Beginner",
    summary: "Track and reduce campus carbon footprint with smart habit tracking.",
    teamSize: "3–4",
    timeline: "3–4 weeks",
    techPrimary: "Python",
    stack: ["Python", "Flask", "SQLite", "Chart.js"],
    iconType: "environment",
    architecture: "Client Web App <-> Python Flask API <-> Impact Engine & SQLite",
    milestones: [
      "Phase 1: Carbon telemetry models & habit schema",
      "Phase 2: Activity logging endpoints & campus leaderboards",
      "Phase 3: Real-time reduction analytics dashboard",
      "Phase 4: Smoke testing & demo showcase"
    ]
  },
  {
    id: "edutrack",
    title: "EduTrack",
    domain: "Education",
    tags: ["Education", "Web Development", "All"],
    difficulty: "Intermediate",
    summary: "Gamified learning platform for automated study planning.",
    teamSize: "3–5",
    timeline: "4–6 weeks",
    techPrimary: "Web App",
    stack: ["JavaScript", "React", "Node.js", "PostgreSQL"],
    iconType: "education",
    architecture: "Modern Web UI <-> Node API <-> Gamified Planning Engine",
    milestones: [
      "Phase 1: Syllabus parser & adaptive scheduling schema",
      "Phase 2: Streak endpoints & reward badge microservices",
      "Phase 3: Interactive study session planner UI",
      "Phase 4: QA testing & live demo recording"
    ]
  },
  {
    id: "mediconnect",
    title: "MediConnect",
    domain: "HealthTech",
    tags: ["HealthTech", "AI/ML", "All"],
    difficulty: "Intermediate",
    summary: "Decentralized emergency telemedicine dispatch and patient record exchange.",
    teamSize: "4–5",
    timeline: "4–6 weeks",
    techPrimary: "WebRTC",
    stack: ["WebRTC", "FastAPI", "Tailwind", "PostgreSQL"],
    iconType: "health",
    architecture: "WebRTC P2P <-> FastAPI Signaling Server <-> Postgres Event Log",
    milestones: [
      "Phase 1: Signaling server & dispatch schema setup",
      "Phase 2: Encrypted peer audio/video triage channels",
      "Phase 3: Patient vitals record exchange module",
      "Phase 4: Live dispatch stress tests & presentation"
    ]
  },
  {
    id: "finmate",
    title: "FinMate",
    domain: "FinTech",
    tags: ["FinTech", "Social Impact", "All"],
    difficulty: "Advanced",
    summary: "Real-time micro-budgeting platform with fraud anomaly detection.",
    teamSize: "3–5",
    timeline: "6–8 weeks",
    techPrimary: "Go",
    stack: ["TypeScript", "Go", "Kafka", "PostgreSQL"],
    iconType: "fintech",
    architecture: "Kafka Stream <-> Go Analytics Worker <-> TypeScript Dashboard",
    milestones: [
      "Phase 1: Synthetic transaction feed generator",
      "Phase 2: Anomaly scoring pipeline in Go",
      "Phase 3: Real-time SSE alert dashboard",
      "Phase 4: Resilience checks & live pitch deck"
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
    tags: [domain, "All"],
    difficulty: "Custom",
    summary: input.idea,
    teamSize: "3–4",
    timeline: duration,
    techPrimary: domain.split(" ")[0] || "JavaScript",
    stack: [domain.split(" ")[0] || "JavaScript", "Python", "REST API", "LocalStorage"],
    iconType: "environment",
    architecture: "Client Interface <-> Lightweight API Handler <-> Persistent Store",
    milestones: [
      "Phase 1: Project setup, schema definition & Git baseline",
      "Phase 2: Core functional engine implementation & state logic",
      "Phase 3: Real-time UI integration & interactive polish",
      "Phase 4: Smoke testing, responsive check & submission demo"
    ]
  };

  return { data: generated, error: null };
}
