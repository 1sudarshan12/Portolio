export const siteConfig = {
  name: "Sudarshan Adhikari",
  role: "Full-Stack Software Engineer",
  tagline:
    "I build SaaS products and API-driven web applications that stay fast, secure and maintainable as they grow.",
  location: "Kathmandu, Nepal",
  email: "amstersudhan633@gmail.com",
  phone: "+977 9866995153",
  phoneHref: "+9779866995153",
  availability: "Available for freelance, contract & remote work",
  url: "https://sudarshanadhikari.com",
  resumePath: "/sudarshan-adhikari-resume.pdf",
  socials: {
    github: "https://github.com/sudarshanadhikari908",
    linkedin: "https://linkedin.com/in/sudarshan-adhikari-7a6903195",
    medium: "https://medium.com/@amstersudhan633",
    email: "mailto:amstersudhan633@gmail.com",
  },
  description:
    "Sudarshan Adhikari is a full-stack software engineer specializing in React, Next.js, TypeScript, Node.js, Python and Go. He builds scalable SaaS products, performant frontends and secure API-driven platforms, and is available for freelance and contract work.",
  keywords: [
    "Sudarshan Adhikari",
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "SaaS Engineer",
    "Freelance Software Engineer",
    "Kathmandu",
    "Nepal",
  ],
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];
