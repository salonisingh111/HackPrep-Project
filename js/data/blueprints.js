export const INITIAL_BLUEPRINTS = [
  {
    id: "greentrack",
    title: "GreenTrack",
    domain: "Environment",
    tags: ["Environment", "Social Impact", "All"],
    difficulty: "Beginner",
    summary: "Track and reduce campus carbon footprint with smart habit logging and waste auditing.",
    timeline: "24–36 Hours",
    stack: ["Python", "Flask", "SQLite", "Chart.js"],
    iconType: "environment",
    architecture: "Web Client <-> Flask REST Engine <-> SQLite Impact Model",
    milestones: [
      "Phase 1: Carbon telemetry schema & habit model setup",
      "Phase 2: Activity logging endpoints & leaderboard",
      "Phase 3: Real-time reduction analytics dashboard",
      "Phase 4: Smoke test & demo presentation"
    ]
  },
  {
    id: "edutrack",
    title: "EduTrack",
    domain: "Web Development",
    tags: ["Web Development", "Social Impact", "All"],
    difficulty: "Intermediate",
    summary: "Adaptive study sprint planner with spaced repetition and collaborative study sessions.",
    timeline: "36–48 Hours",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    iconType: "education",
    architecture: "React SPA <-> Express API <-> PostgreSQL Data Layer",
    milestones: [
      "Phase 1: Syllabus parser & calendar schema",
      "Phase 2: Study sprint tracking & streak logic",
      "Phase 3: Real-time group session interface",
      "Phase 4: Responsive polish & QA run"
    ]
  },
  {
    id: "mediconnect",
    title: "MediConnect",
    domain: "HealthTech",
    tags: ["HealthTech", "AI / ML", "All"],
    difficulty: "Intermediate",
    summary: "Emergency telemedicine triage platform with encrypted peer vitals streaming.",
    timeline: "36–48 Hours",
    stack: ["FastAPI", "WebRTC", "Python", "PostgreSQL"],
    iconType: "health",
    architecture: "WebRTC P2P <-> FastAPI Signaling Server <-> Postgres Store",
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
    tags: ["FinTech", "AI / ML", "All"],
    difficulty: "Advanced",
    summary: "Real-time micro-budgeting platform with automated recurring expense anomaly alerts.",
    timeline: "48 Hours",
    stack: ["Go", "TypeScript", "Kafka", "PostgreSQL"],
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
