import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  LayoutDashboard,
  MonitorSmartphone,
  Server,
  Globe,
  Gauge,
  Compass,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
  outcome: string;
  description: string;
  deliverables: string[];
  stack: string[];
};

export const services: Service[] = [
  {
    id: "full-stack",
    title: "Full-Stack Development",
    icon: Boxes,
    outcome: "One engineer who owns the whole product, end to end.",
    description:
      "End-to-end web applications built with React, Next.js, Node.js, Python and Go — choosing the right tools for your product, not the trendiest ones.",
    deliverables: ["Product architecture", "Frontend + backend", "Database design", "Deployment"],
    stack: ["Next.js", "Node.js", "Python", "Go", "PostgreSQL"],
  },
  {
    id: "saas",
    title: "SaaS Application Development",
    icon: LayoutDashboard,
    outcome: "Launch a SaaS that's ready for real customers and real scale.",
    description:
      "Custom SaaS platforms with admin dashboards, subscription billing, authentication and collaborative workspaces — designed to grow with your business.",
    deliverables: ["Admin dashboards", "Subscriptions & billing", "Auth & RBAC", "Collaboration features"],
    stack: ["Next.js", "Stripe", "AWS Cognito", "Firestore"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: MonitorSmartphone,
    outcome: "Interfaces your users enjoy and your team can maintain.",
    description:
      "Responsive, interactive applications in React, Next.js and TypeScript — accessible, pixel-accurate and built on a clean component system.",
    deliverables: ["Responsive UI", "Design systems", "Accessibility", "State management"],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend & API Development",
    icon: Server,
    outcome: "Reliable APIs and integrations that quietly do their job.",
    description:
      "REST APIs, database integrations, authentication and third-party services using the right Node.js, Python or Go stack for your workload.",
    deliverables: ["REST APIs", "Auth & security", "Third-party integrations", "Data modeling"],
    stack: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
  },
  {
    id: "websites",
    title: "Website Design & Development",
    icon: Globe,
    outcome: "A website that loads fast and converts visitors into customers.",
    description:
      "Business websites, landing pages, product sites and modern redesigns — fast, SEO-friendly and built mobile-first.",
    deliverables: ["Landing pages", "Business websites", "Redesigns", "SEO foundations"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: "performance",
    title: "Performance Optimization",
    icon: Gauge,
    outcome: "Measurably faster pages — and the Lighthouse scores to prove it.",
    description:
      "Core Web Vitals and Lighthouse optimization, image and asset tuning, rendering improvements and JavaScript performance work.",
    deliverables: ["Core Web Vitals", "Bundle optimization", "Image/asset tuning", "Render profiling"],
    stack: ["Lighthouse", "Next.js", "React Profiler"],
  },
  {
    id: "consulting",
    title: "Architecture & Technical Consulting",
    icon: Compass,
    outcome: "A second set of senior eyes on your codebase and decisions.",
    description:
      "Component architecture, maintainability, security reviews, code reviews and application modernization — practical guidance you can act on.",
    deliverables: ["Architecture review", "Code reviews", "Security audit", "Modernization plan"],
    stack: ["Architecture", "Security", "Code Quality"],
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  deliverable: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery",
    description:
      "We start with your problem, your users and your constraints — not a feature list. I ask a lot of questions, especially about the messy parts.",
    deliverable: "A clear written summary of the problem and what success looks like.",
  },
  {
    index: "02",
    title: "Planning",
    description:
      "I scope a focused first version, propose the approach and agree timelines before any code is written.",
    deliverable: "Scope, milestones and an estimate you sign off on.",
  },
  {
    index: "03",
    title: "Architecture",
    description:
      "I design the data models, component system and service boundaries so the product stays maintainable as it grows.",
    deliverable: "A documented architecture and a working project skeleton.",
  },
  {
    index: "04",
    title: "Development",
    description:
      "I build in small, reviewable increments — connecting databases, payments, auth and the tools you already use.",
    deliverable: "Regular updates and a preview link you can click through.",
  },
  {
    index: "05",
    title: "Testing",
    description:
      "Unit and integration tests, accessibility checks, performance passes and real-data QA across devices.",
    deliverable: "A tested build with measured performance and accessibility.",
  },
  {
    index: "06",
    title: "Delivery",
    description:
      "I deploy, verify in production, hand over documentation and make sure you know how everything works.",
    deliverable: "A live, documented product — plus a clean handover.",
  },
];
