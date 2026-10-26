import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SmoothLink } from "@/components/smooth-link";
import { services } from "@/lib/content/services";

export function Services() {
  return (
    <Section id="services" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_65%)] opacity-50 blur-3xl sm:h-[30rem] sm:w-[30rem]"
      />
      <SectionHeader
        index="05"
        eyebrow="Work With Me"
        title="Freelance engineering, from first idea to live product."
        description="Available for freelance, contract and remote work. Here's how I can help — described by the outcome you get, not just the tech I use."
      />

      <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <RevealItem key={service.id} className="flex">
            <article className="group flex w-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_30px_80px_-50px_var(--accent-glow)]">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <service.icon className="size-5" />
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-accent">
                {service.outcome}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* CTA band */}
      <Reveal delay={0.1}>
        <div className="relative mt-10 flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.15]"
          />
          <h3
            className="max-w-2xl text-balance font-display"
            style={{ fontSize: "var(--text-h3)" }}
          >
            Have a project in mind? Let&apos;s build something that lasts.
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <SmoothLink href="#contact">
                Hire me <ArrowUpRight />
              </SmoothLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <SmoothLink href="#contact">Discuss your project</SmoothLink>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <SmoothLink href="#contact">Request a quote</SmoothLink>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
