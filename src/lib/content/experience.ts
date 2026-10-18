export type Experience = {
  company: string;
  role: string;
  period: string;
  start: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "TaxMD",
    role: "Software Engineer",
    period: "Jul 2025 — Present",
    start: "2025",
    summary:
      "Own the public TaxMD.com frontend and build core TaxMD Personal experiences — from a scalable component architecture to secure, SOC 2-ready tax-planning workflows.",
    highlights: [
      "Own end-to-end frontend of TaxMD.com (Next.js) — product content, B2B/B2C pricing and contact workflows.",
      "Lifted the public site's Lighthouse performance score from 70 to 92 through targeted, measurement-driven optimization.",
      "Hardened security & SOC 2 readiness with AWS Cognito auth, RBAC, input validation and dependency management to protect taxpayer data.",
      "Built TaxMD Personal's interactive tax-planning workspace, shared-workspace collaboration and US tax-form views.",
      "Partnered with the AI team to integrate OCR that auto-captures data and pre-populates forms.",
      "Mentor junior engineers through code reviews and documented reusable components and internal libraries.",
    ],
    stack: ["Next.js", "TypeScript", "React", "Python","WebSockets", "AWS Cognito", "OCR", "HubSpot"],
  },
  {
    company: "Zegal",
    role: "Software Engineer",
    period: "Apr 2024 — Jul 2025",
    start: "2024",
    summary:
      "Delivered legal-document SaaS modules, modernized legacy code and shipped AI-powered, real-time interfaces while raising the security and performance bar.",
    highlights: [
      "Built platform modules for legal-document workflows and modernized legacy code for stability and maintainability.",
      "Integrated Stripe subscriptions powering digital payments and customer subscription workflows.",
      "Cut component render time from 550ms to 300ms (45%) via memoization and virtualization, improving FCP and LCP.",
      "Reduced CI/CD build time 10→7 min and Docker image size 960MB→240MB (75%) with multi-stage builds.",
      "Implemented RBAC, Content Security Policy and dependency management supporting ISO/IEC 27001 practices.",
      "Built conversational AI interfaces with WebSockets and streaming REST responses.",
    ],
    stack: ["React", "TypeScript", "Node JS", "Stripe", "WebSockets", "Docker", "CI/CD"],
  },
  {
    company: "EKbana Solutions",
    role: "Software Engineer",
    period: "Jun 2020 — Apr 2024",
    start: "2020",
    summary:
      "Built fintech, insurance and blockchain products — payment-gateway integrations, Web3 wallets and a monorepo migration toward independently deployable services.",
    highlights: [
      "Designed and optimized React/Next.js interfaces for fintech, insurance and blockchain products.",
      "Integrated eSewa, Khalti and Fonepay gateways into Nepali wallet and payment workflows.",
      "Implemented Ethereum & MetaMask integrations enabling wallet connectivity and crypto experiences.",
      "Set up a Lerna + Yarn Workspaces monorepo and helped split a monolith into microservices.",
      "Integrated Mixpanel analytics and reported a 30% improvement in feature adoption.",
      "Ran SonarQube in CI/CD and maintained Sentry monitoring plus Jest unit & integration tests.",
    ],
    stack: ["React", "Next.js", "Ethereum", "Lerna", "Mixpanel", "Sentry"],
  },
];
