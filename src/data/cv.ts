export const cv = {
  name: "Sahil Dhabu",
  title: "BSc Data Science Student | AI & Data Systems Builder | Fintech",
  location: "Johannesburg, South Africa",
  coordinates: "26.2041° S, 28.0473° E",
  phone: "083 332 4673",
  email: "sahildhabu246@gmail.com",
  linkedin: "https://linkedin.com/in/sahil-dhabu",
  linkedinDisplay: "linkedin.com/in/sahil-dhabu",
  cvPath: "/Sahil_Dhabu_CV.pdf",
  status: "Open to Data & AI roles",
  timezone: "Africa/Johannesburg",

  personalStatement:
    "Second-year BSc Data Science student at Eduvos with a completed Higher Certificate in Information Systems (Data Analytics). Actively building real-world AI and data systems as Co-Founder & AI Systems Lead behind Vylos Finance, a South African fintech platform currently in beta. Combines technical data and AI engineering ability with four-plus years of commercial sales performance at Shahina Enterprise.",

  hero: {
    eyebrow: "Johannesburg, South Africa · BSc Data Science & AI Systems",
    headline: "Building practical AI and data systems that ship.",
    stats: [
      {
        label: "2026 – Present",
        value: "Vylos Finance Beta",
      },
      {
        label: "4+ Years",
        value: "Commercial Sales Track Record",
      },
      {
        label: "BSc + HC",
        value: "Eduvos Data Science",
      },
    ],
  },

  experience: [
    {
      id: "vylos",
      role: "Co-Founder & AI Systems Lead",
      company: "Vylos Finance",
      period: "2026 – Present",
      track: "technical" as const,
      bullets: [
        "Leading backend infrastructure and AI systems for Vylos Finance, a South African fintech platform live in beta.",
        "Architected and deployed an AI-powered chatbot using the Gemini API with RAG (Retrieval-Augmented Generation) to provide contextual financial insights while minimizing hallucination.",
        "Built custom email automation infrastructure using HTML templates and transactional email systems to deliver weekly financial health reports to users.",
        "Optimized infrastructure costs by self-hosting LLM capabilities via Ollama on local hardware, reducing reliance on expensive third-party API calls.",
        "Contributed to the data analytics pipeline and user feedback integration for product iteration and feature prioritization.",
      ],
    },
    {
      id: "shahina",
      role: "Salesperson (Part-time)",
      company: "Shahina Enterprise",
      period: "Feb 2021 – Present",
      track: "commercial" as const,
      bullets: [
        "Consistently exceeded monthly sales targets over four-plus years specialising in handbags and travel accessories.",
        "Built and maintained a loyal customer base through strong communication, product knowledge, and relationship management.",
        "Developed resilience, adaptability, and people skills that translate directly into professional engineering and product teams.",
      ],
    },
  ],

  project: {
    id: "vylos-finance",
    name: "Vylos Finance",
    tagline: "Fintech Platform",
    status: "Beta",
    period: "2026 – Present",
    description:
      "South African financial intelligence platform combining AI-powered insights, budgeting tools, and analytics. Personally responsible for AI chatbot development (Gemini API + RAG), weekly automated email infrastructure, self-hosted LLM deployment via Ollama, and analytics pipelines.",
    techStack: [
      "Python",
      "Gemini API",
      "RAG",
      "Ollama",
      "Supabase",
      "SQL",
      "Custom Email Systems",
      "Data Analytics",
    ],
    userView: {
      headline: "Live beta fintech intelligence for South African users",
      points: [
        "End-to-end ownership of the financial AI chatbot that delivers contextual insights with RAG grounding to minimize hallucination.",
        "Weekly automated financial health reports via custom HTML templates and transactional email systems.",
        "Cost-saving local LLM setup with Ollama on local hardware — cutting expensive third-party API dependency while keeping the Gemini + RAG path for high-stakes queries.",
        "Backend infrastructure and analytics pipelines feeding product iteration from real user feedback.",
      ],
    },
    architecture: [
      {
        id: "client",
        code: "01",
        title: "Client Interface",
        subtitle: "User financial queries & dashboard telemetry",
        detail:
          "Entry point for user financial queries and live dashboard telemetry. Surfaces budgeting tools, analytics views, and chat interactions that feed into the hybrid AI router.",
      },
      {
        id: "router",
        code: "02",
        title: "Hybrid AI Router",
        subtitle: "Gemini API + RAG grounding & local Ollama inference",
        detail:
          "Routes queries through Gemini API with RAG grounding for contextual financial insights while minimizing hallucination. Cost-sensitive or high-volume inference runs on self-hosted Ollama, eliminating expensive third-party API overhead.",
      },
      {
        id: "data",
        code: "03",
        title: "Data & Analytics Core",
        subtitle: "Supabase & SQL structured financial records",
        detail:
          "Supabase and SQL store structured financial records that ground RAG retrieval and power analytics pipelines. User feedback loops back into feature prioritization and product iteration.",
      },
      {
        id: "comms",
        code: "04",
        title: "Automated Comms Engine",
        subtitle: "HTML templates & transactional weekly health reports",
        detail:
          "Custom email automation using HTML templates and transactional systems delivers weekly financial health reports — keeping users informed without manual ops overhead.",
      },
    ],
  },

  education: [
    {
      id: "bsc",
      degree: "BSc in Data Science",
      institution: "Eduvos",
      period: "Feb 2025 – May 2027 Expected",
      status: "Currently in Second Year",
      track: "technical" as const,
      details:
        "Modules: Python Programming, Statistical Methods, Data Analysis, Machine Learning Fundamentals, Database Systems, Mathematics for Data Science. Applied focus: data wrangling, exploratory data analysis, predictive modelling.",
    },
    {
      id: "hc",
      degree: "Higher Certificate in Information Systems (Data Analytics)",
      institution: "Eduvos",
      period: "Feb 2024 – Apr 2025",
      status: "Completed",
      track: "technical" as const,
      details:
        "Focus: data analytics, programming, database management, information systems, data collection, processing, and reporting.",
    },
  ],

  skills: {
    "AI & Systems": [
      "LLM Integration",
      "Gemini API",
      "Ollama",
      "RAG",
      "AI Chatbot Development",
      "Custom Email Systems",
      "Supabase",
    ],
    "Data & Engineering": [
      "Python",
      "SQL",
      "Data Analytics",
      "Machine Learning",
      "Statistical Analysis",
      "Database Development",
      "Data Visualisation",
    ],
    "Business & Commercial": [
      "Financial Analysis",
      "Sales & Customer Engagement",
      "Data-Driven Decision Making",
    ],
    "Core Strengths": [
      "Problem Solving",
      "Communication",
      "Team Collaboration",
      "Resilience",
      "Self-Directed Learning",
    ],
  } as const,

  skillEvidence: {
    "LLM Integration":
      "Vylos Finance — hybrid Gemini + Ollama inference stack for financial AI (2026 – Present).",
    "Gemini API":
      "Vylos Finance — AI chatbot with Gemini API for contextual financial insights (2026 – Present).",
    Ollama:
      "Vylos Finance — self-hosted LLM on local hardware to cut third-party API costs (2026 – Present).",
    RAG: "Vylos Finance — Retrieval-Augmented Generation grounds chatbot answers and reduces financial hallucination (2026 – Present).",
    "AI Chatbot Development":
      "Vylos Finance — end-to-end ownership of the financial AI chatbot (Gemini API + RAG) (2026 – Present).",
    "Custom Email Systems":
      "Vylos Finance — HTML templates + transactional email for weekly financial health reports (2026 – Present).",
    Supabase:
      "Vylos Finance — structured financial records and analytics via Supabase & SQL (2026 – Present).",
    Python:
      "Eduvos BSc Data Science modules + Vylos Finance AI/backend systems (2025 – Present).",
    SQL: "Vylos Finance data core + Eduvos Database Systems / Higher Certificate database management.",
    "Data Analytics":
      "Vylos Finance analytics pipeline + Eduvos Data Analytics HC (Completed Apr 2025) & BSc modules.",
    "Machine Learning":
      "Eduvos BSc — Machine Learning Fundamentals; applied predictive modelling focus.",
    "Statistical Analysis":
      "Eduvos BSc — Statistical Methods & Mathematics for Data Science.",
    "Database Development":
      "Eduvos Database Systems + Higher Certificate database management; Supabase/SQL at Vylos.",
    "Data Visualisation":
      "Vylos Finance dashboard telemetry & analytics; Eduvos data analysis coursework.",
    "Financial Analysis":
      "Vylos Finance — AI-powered financial insights, budgeting tools, and weekly health reports.",
    "Sales & Customer Engagement":
      "Shahina Enterprise — 4+ years exceeding monthly sales targets (Feb 2021 – Present).",
    "Data-Driven Decision Making":
      "Vylos Finance — user feedback integration for product iteration and feature prioritization.",
    "Problem Solving":
      "Shipping production AI/backend systems at Vylos while balancing cost, accuracy, and latency.",
    Communication:
      "Customer relationships at Shahina Enterprise + cross-functional product work at Vylos Finance.",
    "Team Collaboration":
      "Co-Founder collaboration at Vylos Finance; sales floor teamwork at Shahina Enterprise.",
    Resilience:
      "Four-plus years consistently beating sales targets while building AI systems in parallel.",
    "Self-Directed Learning":
      "Self-hosting Ollama, RAG architecture, and shipping beta fintech systems alongside BSc studies.",
  } as Record<string, string>,

  terminalPrompts: [
    "How did you reduce AI infrastructure costs at Vylos Finance?",
    "Explain your Gemini + RAG chatbot architecture",
    "What makes your Data Science + Sales background unique?",
    "Summarize your education and core tech stack",
  ],
} as const;

export type CV = typeof cv;
export type SkillCategory = keyof typeof cv.skills;
export type ArchitectureNode = (typeof cv.project.architecture)[number];
