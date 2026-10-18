export type SkillGroup = {
  title: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    caption: "Interfaces that stay fast and maintainable as they scale.",
    skills: ["React", "Next.js", "TypeScript", "Redux", "Zustand", "MobX", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    caption: "API-driven services and server-side application logic.",
    skills: ["Node.js", "Django", "REST APIs", "WebSockets", "Server Actions"],
  },
  {
    title: "Languages & Frameworks",
    caption: "The core toolkit I reach for across the stack.",
    skills: ["TypeScript", "JavaScript", "Python", "Go", "Next.js", "React"],
  },
  {
    title: "Databases",
    caption: "Relational and document stores, modeled for real workloads.",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firestore"],
  },
  {
    title: "Architecture",
    caption: "Component systems, monorepos and service boundaries.",
    skills: ["Component Architecture", "Monorepos (Lerna)", "Microservices", "Design Systems"],
  },
  {
    title: "DevOps & Cloud",
    caption: "Shipping reliably with lean, observable pipelines.",
    skills: ["Docker", "CI/CD", "AWS", "Vercel", "Git"],
  },
  {
    title: "Testing & QA",
    caption: "Confidence through tests and static analysis.",
    skills: ["Jest", "Unit & Integration Testing", "SonarQube", "Sentry"],
  },
  {
    title: "Security & Integrations",
    caption: "Auth, payments, analytics and secure third-party APIs.",
    skills: ["AWS Cognito", "RBAC", "CSP", "Stripe", "Mixpanel", "GTM / HubSpot"],
  },
];
