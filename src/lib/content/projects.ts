export type Project = {
  slug: string;
  name: string;
  org: string;
  period: string;
  category: string;
  tagline: string;
  summary: string;
  /** Accent duo used to render the branded placeholder cover. Replace with real screenshots later. */
  cover: { from: string; to: string };
  featured?: boolean;
  confidential?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  responsibilities: string[];
  challenges?: string[];
  results?: string[];
  /** Optional real screenshots: drop files in /public/projects and list paths here. */
  screenshots?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "taxmd",
    name: "TaxMD",
    org: "TaxMD",
    period: "Jul 2025 — Present",
    category: "Tax SaaS Platform",
    tagline: "The public face and personal workspace of a modern US tax platform.",
    summary:
      "I own the public-facing TaxMD.com frontend and contribute core features to TaxMD Personal — a SaaS workspace for tax planning, collaboration and taxpayer workflows.",
    cover: { from: "#e8b65a", to: "#b45309" },
    featured: true,
    stack: ["Next.js", "TypeScript", "React", "AWS Cognito", "GTM", "HubSpot"],
    responsibilities: [
      "End-to-end ownership of TaxMD.com: architecture, product content, B2B/B2C pricing and contact workflows.",
      "Built TaxMD Personal's interactive tax-planning workspace, taxpayer profiles and US tax-form views.",
      "Implemented AWS Cognito authentication and role-based access control across the product.",
      "Integrated Google Tag Manager → HubSpot to pass marketing and conversion data.",
    ],
    challenges: [
      "Meeting SOC 2 readiness while keeping the product fast and the DX clean.",
      "Designing a reusable component system that scales across marketing and app surfaces.",
    ],
    results: [
      "Lighthouse performance on TaxMD.com improved from 70 to 92 (+22).",
      "OCR integration (with the AI team) pre-populates forms and streamlines user workflows.",
    ],
  },
  {
    slug: "zegal",
    name: "Zegal",
    org: "Zegal",
    period: "Apr 2024 — Jul 2025",
    category: "Legal Document SaaS",
    tagline: "Legal-document automation with payments and real-time AI.",
    summary:
      "Developed legal-document creation and management workflows, Stripe subscriptions and AI-powered conversational interfaces while modernizing a large legacy codebase.",
    cover: { from: "#60a5fa", to: "#1e3a8a" },
    featured: true,
    stack: ["React", "TypeScript", "Stripe", "WebSockets", "Docker", "CI/CD"],
    responsibilities: [
      "Built platform modules for legal-document creation and management workflows.",
      "Integrated Stripe subscriptions for digital payments and recurring billing.",
      "Built conversational AI interfaces with WebSockets and streaming REST responses.",
      "Implemented RBAC and Content Security Policy supporting ISO/IEC 27001 practices.",
    ],
    challenges: [
      "Modernizing legacy code without disrupting a live product.",
      "Keeping heavy document UIs responsive under large data loads.",
    ],
    results: [
      "Render time reduced 550ms → 300ms (45%) via memoization and virtualization.",
      "CI build 10→7 min and Docker image 960MB→240MB (75%) with multi-stage builds.",
    ],
  },
  {
    slug: "citypay",
    name: "CityPay",
    org: "CityPay",
    period: "Aug 2023 — Apr 2024",
    category: "Digital Payments",
    tagline: "A Nepali digital-payment platform for everyday services.",
    summary:
      "Contributed to a Nepali digital-payment platform supporting payments across multiple services, with a focus on reliable, secure transaction flows.",
    cover: { from: "#34d399", to: "#065f46" },
    stack: ["React", "Next.js", "REST APIs", "Payment Gateways"],
    responsibilities: [
      "Built and refined payment and service flows for a multi-service wallet platform.",
      "Worked on secure, resilient transaction experiences for Nepali users.",
    ],
  },
  {
    slug: "rsp",
    name: "Rastriya Swatantra Party",
    org: "RSP",
    period: "May 2023 — Oct 2023",
    category: "Public Website",
    tagline: "A public website presenting a national political party.",
    summary:
      "Worked on the RSP public website, delivering frontend interfaces that present party information clearly and accessibly to a national audience.",
    cover: { from: "#f87171", to: "#991b1b" },
    stack: ["React", "Next.js", "TypeScript"],
    responsibilities: [
      "Delivered public-facing frontend interfaces presenting party information to visitors.",
      "Focused on accessible, high-traffic-ready pages.",
    ],
  },
  {
    slug: "avalon",
    name: "Avalon",
    org: "Avalon",
    period: "Oct 2021 — Mar 2022",
    category: "Web3 / NFT",
    tagline: "A blockchain platform for crypto-based NFT bidding.",
    summary:
      "Contributed to a blockchain platform supporting cryptocurrency-based bidding for NFTs, including wallet connectivity and on-chain interactions.",
    cover: { from: "#a78bfa", to: "#5b21b6" },
    stack: ["React", "Ethereum", "MetaMask", "Web3"],
    responsibilities: [
      "Built NFT bidding interfaces backed by Ethereum and MetaMask integrations.",
      "Implemented wallet connectivity and cryptocurrency-based experiences.",
    ],
  },
  {
    slug: "hei",
    name: "Himalayan Everest Insurance",
    org: "HEI",
    period: "Apr 2022 — Mar 2023",
    category: "Insurance Web App",
    tagline: "Online self-service for insurance customers.",
    summary:
      "Developed web interfaces enabling customers to access insurance-related services online, improving usability and frontend loading performance.",
    cover: { from: "#38bdf8", to: "#0c4a6e" },
    stack: ["React", "Next.js", "REST APIs"],
    responsibilities: [
      "Built customer-facing web interfaces for accessing insurance services online.",
      "Improved usability and frontend loading performance.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
