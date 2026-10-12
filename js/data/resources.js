export const RESOURCES_CATALOG = [
  {
    id: "res-1",
    name: "OpenAI & Groq Free Tier API",
    category: "AI & ML",
    badge: "Free API",
    description: "Fast LLM inference endpoints for hackathon chatbots, summarizers, and agents.",
    link: "https://groq.com",
    tags: ["LLM", "Inference", "REST"]
  },
  {
    id: "res-2",
    name: "Supabase Backend-as-a-Service",
    category: "Backend & DB",
    badge: "Database",
    description: "Instant PostgreSQL database, authentication, storage, and real-time websockets.",
    link: "https://supabase.com",
    tags: ["PostgreSQL", "Auth", "Realtime"]
  },
  {
    id: "res-3",
    name: "Public APIs Collection",
    category: "APIs",
    badge: "Directory",
    description: "Comprehensive list of free developer APIs for weather, finance, books, and geo data.",
    link: "https://github.com/public-apis/public-apis",
    tags: ["REST", "Open Source", "Public"]
  },
  {
    id: "res-4",
    name: "Vercel & Railway Deployment",
    category: "DevOps",
    badge: "Hosting",
    description: "Zero-config deployment for fullstack hackathon repos with live preview URLs.",
    link: "https://vercel.com",
    tags: ["Cloud", "Deployment", "CI/CD"]
  },
  {
    id: "res-5",
    name: "Lucide & Heroicons SVGs",
    category: "UI & Design",
    badge: "Icons",
    description: "Clean, consistent icon sets tailored for developer dashboards and landing pages.",
    link: "https://lucide.dev",
    tags: ["Icons", "SVG", "Frontend"]
  },
  {
    id: "res-6",
    name: "FastAPI Boilerplate with JWT",
    category: "Starter Kits",
    badge: "Template",
    description: "Production-ready Python FastAPI starter with CORS, schemas, and async sqlite.",
    link: "https://fastapi.tiangolo.com",
    tags: ["Python", "Async", "Starter"]
  }
];

export function filterResources(catalog, query, category) {
  if (!Array.isArray(catalog)) {
    return { data: [], error: "Invalid resource catalog array." };
  }

  const cleanQuery = typeof query === "string" ? query.trim().toLowerCase() : "";
  const cleanCat = typeof category === "string" ? category.trim() : "All";

  const results = catalog.filter(item => {
    const matchesCategory = cleanCat === "All" || item.category === cleanCat;
    const matchesQuery = !cleanQuery ||
      item.name.toLowerCase().includes(cleanQuery) ||
      item.description.toLowerCase().includes(cleanQuery) ||
      item.tags.some(t => t.toLowerCase().includes(cleanQuery));

    return matchesCategory && matchesQuery;
  });

  return { data: results, error: null };
}
