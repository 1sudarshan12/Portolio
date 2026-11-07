import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmoothLink } from "@/components/smooth-link";
import { Magnetic } from "@/components/motion/magnetic";
import { siteConfig } from "@/lib/content/site";
import { stats } from "@/lib/content/about";

export function Hero() {
  return (
    <section data-hero="" className="relative overflow-hidden pt-36 sm:pt-44 lg:pt-52">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div
          data-pointer-glow=""
          className="absolute left-0 top-0 hidden size-[34rem] rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_65%)] opacity-0 lg:block"
          style={{ visibility: "hidden" }}
        />
        <div className="absolute left-1/2 top-0 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_62%)] blur-2xl sm:h-[42rem] sm:w-[42rem]" />
      </div>

      <div data-hero-content="" className="container-px">
        <div className="mx-auto max-w-7xl">
          {/* Availability */}
          <div
            data-reveal=""
            className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-pretty text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {siteConfig.availability}
            </span>
            <span className="label-mono hidden sm:inline">{siteConfig.location}</span>
          </div>

          {/* Headline */}
          <h1
            className="max-w-full break-words font-display text-foreground"
            style={{ fontSize: "var(--text-display)" }}
          >
            <span className="sr-only">
              {siteConfig.name} — {siteConfig.role}
            </span>
            <span aria-hidden data-split="chars" className="block text-balance leading-[0.98]">
              Full-Stack <span className="accent-gradient">Software Engineer</span>
            </span>
          </h1>

          {/* Intro + CTAs */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <p
              data-reveal=""
              data-delay="0.5"
              className="max-w-xl text-pretty text-muted-foreground"
              style={{ fontSize: "var(--text-lead)" }}
            >
              I&apos;m <span className="text-foreground">Sudarshan Adhikari</span>. I
              build SaaS products and API-driven web applications with React,
              Next.js, TypeScript, Node.js, Python and Go — fast, secure and built
              to last.
            </p>

            <div
              data-reveal=""
              data-delay="0.65"
              className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Magnetic strength={0.25}>
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <SmoothLink href="#work">
                    View my projects <ArrowDownRight />
                  </SmoothLink>
                </Button>
              </Magnetic>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <SmoothLink href="#contact">
                  Hire me <ArrowUpRight />
                </SmoothLink>
              </Button>
              <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                <a href={siteConfig.resumePath} download>
                  <Download /> Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <dl
            data-reveal=""
            data-delay="0.85"
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-5 sm:p-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd data-count="" className="font-display tabular-nums text-3xl text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
                <p className="mt-2 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
