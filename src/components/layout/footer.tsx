import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/icons/brand";
import { siteConfig, navItems } from "@/lib/content/site";

const socialLinks = [
  { label: "GitHub", href: siteConfig.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedinIcon },
  { label: "Medium", href: siteConfig.socials.medium, icon: MediumIcon },
  { label: "Email", href: siteConfig.socials.email, icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border">
      <div className="container-px">
        <div className="mx-auto max-w-7xl py-16 sm:py-20">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div className="max-w-sm">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  SA
                </span>
                <span className="font-display text-xl">Sudarshan Adhikari</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {siteConfig.tagline}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {siteConfig.availability}
              </p>
            </div>

            <div>
              <p className="label-mono mb-4">Navigate</p>
              <ul className="space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-mono mb-4">Elsewhere</p>
              <ul className="space-y-2.5">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <item.icon className="size-4" />
                      {item.label}
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Sudarshan Adhikari. Built with Next.js
              &amp; Tailwind CSS.
            </p>
            <p className="font-mono text-xs">{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
