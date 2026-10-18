import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/content/experience";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        index="02"
        eyebrow="Experience"
        title="Career progression, built on measurable impact."
        description="From fintech and blockchain at EKbana to legal-document SaaS at Zegal and a US tax platform at TaxMD — a decade's worth of shipping in five years."
      />

      <div className="mt-16">
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.05}>
            <article className="group grid gap-6 border-t border-border py-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
              <div>
                <div className="flex items-baseline justify-between gap-4 lg:flex-col lg:items-start lg:gap-3">
                  <h3 className="font-display text-2xl text-foreground sm:text-3xl">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-2 text-sm text-accent">{exp.role}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-pretty text-muted-foreground" style={{ fontSize: "1.05rem" }}>
                  {exp.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
