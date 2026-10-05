/*
 * PORTFOLIO CONTENT
 * Edit this file to change anything on the site. No build step needed.
 *
 * Any field set to null is hidden automatically, so the site never shows a broken
 * link or an empty section. Search this file for "TODO" to find what still needs
 * your input.
 */
window.PORTFOLIO = {
  site: {
    name: "David Meltonyan",
    title: "Software Engineer",
    specialty: "Machine Learning & Backend Systems",
    intro:
      "Computer Science graduate from Sacramento State, finishing in December 2026. I build machine learning and backend systems, and I like taking a project from a rough prototype to something people use in production.",
    email: "dmeltonyan@icloud.com",
    url: "https://dmeltonyan.github.io/",
    links: {
      github: "https://github.com/dmeltonyan",
      linkedin: "https://www.linkedin.com/in/davidmeltonyan",
      resume: "resume.pdf"
    },
    status: [
      { text: "Graduating December 2026" },
      { text: "Available January 2027", live: true },
      { text: "Sacramento, CA" },
      { text: "Open to relocation" }
    ],
    lastUpdated: "October 2026"
  },

  focusAreas: [
    { name: "ML / AI", detail: "NLP classification in production at BTIS; LLM routing and semantic caching in CostMelt." },
    { name: "Backend Engineering", detail: "FastAPI services, PostgreSQL schemas, Redis caching, and REST APIs." },
    { name: "Full-Stack Development", detail: "React frontends on Django and FastAPI backends, including a capstone built for a real business." },
    { name: "Data Engineering", detail: "ETL into PostgreSQL at BTIS; automated pipelines and BI dashboards at Retail Labs." }
  ],

  highlights: [
    "Three technical internships: BTIS, Retail Labs, and PCCI",
    "About 40% less manual review across workflows tied to roughly $400M in premium",
    "About 50% less analysis time at Retail Labs"
  ],

  technologies: [
    "Python", "Java", "C/C++", "SQL", "JavaScript / TypeScript", "React", "FastAPI", "Django",
    "PostgreSQL", "Redis", "Supabase", "AWS", "Git", "REST APIs", "Machine Learning / NLP"
  ],

  experience: [
    {
      id: "btis",
      role: "ML Intern",
      company: "Builders and Tradesmen's Insurance Services (BTIS)",
      dates: "May 2025 – Sep 2025",
      featured: true,
      problem: "Underwriters were mapping plain-English business descriptions to WCIRB workers' compensation class codes by hand.",
      built: [
        "Machine learning and NLP models using BERT, TF-IDF, and Word2Vec to map business descriptions to WCIRB class codes",
        "Confidence thresholds that decide when a prediction is accepted automatically and when it goes to a human reviewer",
        "ETL and data workflows connected to PostgreSQL, using Supabase pgvector and Redis caching"
      ],
      tech: ["Python", "BERT", "TF-IDF", "Word2Vec", "PostgreSQL", "Supabase pgvector", "Redis"],
      impact: "Reduced manual review by about 40% across workflows associated with roughly $400M in premium."
    },
    {
      id: "retail-labs",
      role: "ML / GTM Intern",
      company: "Retail Labs",
      dates: "Jan 2025 – Sep 2025",
      featured: true,
      problem: "Recurring analysis and reporting depended on slow, manual data work.",
      built: [
        "Automated data pipelines and analytics workflows",
        "BI dashboards for the team",
        "SQL queries and REST APIs behind the reporting"
      ],
      tech: ["Python", "SQL", "REST APIs", "BI dashboards"],
      impact: "Reduced analysis time by about 50%."
    },
    {
      id: "pcci",
      role: "HCM IT / Automation Intern",
      company: "Pacific Coast Companies (PCCI)",
      dates: "Dec 2024 – Mar 2025",
      featured: true,
      problem: "An SAP SuccessFactors Onboarding 2.0 rollout needed thorough testing without exposing real employee data.",
      built: [
        "Python-generated synthetic test data for SIT and UAT testing",
        "Automation and testing workflows using SAP PI/PO and Power Automate",
        "Internal dashboards for tracking test progress"
      ],
      tech: ["Python", "SAP SuccessFactors", "SAP PI/PO", "Power Automate"],
      impact: null // TODO (optional): add a measurable result if you have one
    },
    {
      id: "code-ninjas",
      role: "Coding Instructor",
      company: "Code Ninjas",
      dates: "Feb 2022 – Dec 2024",
      featured: false,
      summary: "Taught programming to 250+ students and helped them learn software development and problem solving. About 85% of trial students went on to enroll."
    }
  ],

  projects: [
    {
      id: "costmelt",
      name: "CostMelt",
      tagline: "An LLM cost-optimization proxy",
      featured: true,
      summary:
        "A drop-in proxy that sits between an application and LLM providers and answers each request as cheaply as it safely can: from a semantic cache if a similar prompt was answered recently, from a smaller model if the prompt is simple, and from a premium model only when it needs one.",
      bullets: [
        "Semantic cache built on embeddings in pgvector, with Redis handling TTL expiry",
        "Complexity classifier that scores each prompt and routes it to the cheapest capable model",
        "Per-request cost logging against a GPT-4o baseline, shown in a Next.js dashboard"
      ],
      challenge:
        "Setting the cache similarity threshold. Too low and the cache returns the answer to a different question; too high and it rarely saves anything.",
      tech: ["FastAPI", "OpenAI APIs", "Embeddings", "pgvector", "Redis", "Next.js", "PostgreSQL"],
      links: {
        code: "https://github.com/dmeltonyan/costmelt",
        demo: null // TODO: add a live demo URL if you deploy one
      },
      caseStudy: {
        problem:
          "Teams calling LLM APIs often send every request to a premium model, including simple prompts and near-duplicates of questions they've already paid to answer.",
        architecture: [
          { label: "Client app", note: "Points at CostMelt instead of the provider" },
          { label: "Semantic cache", note: "Embedding similarity in pgvector; a hit returns immediately" },
          { label: "Prompt compression", note: "Reduces input tokens" },
          { label: "Complexity classifier", note: "Scores the prompt simple, medium, or complex" },
          { label: "Router", note: "Picks the cheapest capable model" },
          { label: "Batch queue", note: "Groups compatible requests" },
          { label: "LLM providers", note: "OpenAI, Anthropic, Groq, DeepSeek" },
          { label: "Cost logging", note: "PostgreSQL, feeding the dashboard" }
        ],
        built: [
          "A FastAPI gateway with a single route endpoint that orchestrates every stage",
          "A semantic cache that embeds prompts, searches pgvector for similar ones, and uses Redis for TTL and eviction",
          "A complexity classifier using signals like token count, code patterns, and reasoning cues",
          "A routing engine across multiple providers, plus prompt compression and micro-batching",
          "Cost tracking that records actual cost, baseline cost, and savings for every request",
          "A Next.js dashboard for savings, routing decisions, and cache performance"
        ],
        decisions: [
          { title: "Check the cache first", text: "A cache hit skips compression, classification, routing, and the provider call entirely, so it goes at the front of the pipeline." },
          { title: "Similarity threshold of 0.92", text: "Lower values catch more repeats but risk serving the answer to a different question. Higher values are safer but save less." },
          { title: "Seven-day cache TTL", text: "A longer TTL saves more money but increases the chance of serving a stale answer." },
          { title: "10 ms batch window, 16 requests max", text: "Longer windows form bigger, cheaper batches but add latency to every request in them." }
        ],
        challenges: [
          "False cache hits: prompts that look alike but need different answers, such as \"capital of Australia\" and \"capital of Austria.\"",
          "Misrouting at the boundary between medium and complex prompts, where a hard prompt can land on a model that can't handle it.",
          "Balancing batching throughput against the latency each request pays to wait for a batch."
        ],
        results:
          "Every response reports its actual cost, the cost of the same request on a GPT-4o baseline, and the percentage saved, and the dashboard aggregates savings over time. Answer quality under routing hasn't been measured yet; that evaluation is the next piece of work.",
        improve: [
          "An evaluation harness that compares accuracy, cost, and latency across routing policies",
          "Confidence-based escalation, where a cheap model answers first and the request moves up when its answer fails validation",
          "A locally hosted open-weight model as the cheapest tier, for environments where data can't leave the network"
        ]
      }
    },
    {
      // NEW PROJECT: hidden until it's built. Set hidden: false to publish it.
      id: "fraud-triage",
      hidden: true,
      name: "Fraud Triage", // TODO: final name
      tagline: "Fraud detection with a human review queue",
      featured: true,
      summary: null, // TODO
      bullets: null, // TODO
      challenge: null, // TODO
      tech: ["Python", "LightGBM", "PostgreSQL", "FastAPI", "Next.js"], // TODO: confirm when built
      links: { code: null, demo: null }, // TODO
      caseStudy: null // TODO: fill in when the project is done
    },
    {
      id: "project-echo",
      name: "Project Echo",
      tagline: "Team project: income prediction from census data",
      featured: false,
      summary:
        "Predicts annual income from U.S. Census American Community Survey data. The model trains XGBoost, LightGBM, and CatBoost regressors on log-transformed income, averages their predictions, and ships as a standalone Windows desktop app.",
      // TODO: add one sentence on the part you personally built, e.g. "I built the ensemble and the evaluation."
      tech: ["Python", "scikit-learn", "XGBoost", "LightGBM", "CatBoost", "pandas", "tkinter"],
      links: {
        code: "https://github.com/Zon-Vorelle/Project_Echo", // TODO: switch to your fork once you create it
        demo: null
      }
    },
    {
      id: "royal-auto",
      name: "Royal Auto & Body Repair",
      tagline: "Senior capstone",
      featured: false,
      summary:
        "Administrative and customer-facing portals built for a real auto and body repair business.",
      tech: ["React", "Django", "MySQL"],
      links: {
        code: null, // TODO: add the GitHub URL
        demo: null // TODO: add a live demo URL if one exists
      }
    }
  ],

  education: [
    {
      school: "Sacramento State",
      degree: "B.S. Computer Science",
      dates: "Graduating December 2026",
      upcoming: false
    },
    {
      school: "Georgia Tech",
      degree: "Online Master of Science in Computer Science (OMSCS), Machine Learning specialization",
      dates: "Beginning Spring 2027",
      upcoming: true
    }
  ],

  about: [
    "I like the part of engineering where a model meets an actual business process. At BTIS that meant classifying workers' comp submissions, and the work I found most interesting wasn't training the model. It was deciding how confident the model had to be before its answer went straight through, and when a person should look instead.",
    "I'm happiest taking something from a rough prototype to a system other people depend on, including the data pipelines, the API, the caching, and the unglamorous parts that keep it running.",
    "Outside of programming, I lift, play poker, and read a lot, mostly about how people make decisions. Poker and model thresholds turn out to be the same question asked twice: how sure are you, and what does it cost to be wrong?"
  ],

  contact: {
    heading: "Let's build something useful.",
    text: "I'm looking for new-grad roles in software, machine learning, AI, and forward deployed engineering starting January 2027. Email is the fastest way to reach me."
  }
};
