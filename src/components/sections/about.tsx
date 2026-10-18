import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { aboutParagraphs, focusAreas } from "@/lib/content/about";
import { Check } from "lucide-react";

export function About() {
  return (
    <Section id="about" className="relative">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-sm text-accent">01</span>
            <span className="label-mono">About</span>
          </div>
          <Reveal>
            <h2
              className="text-balance"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Engineering that
              <br />
              <span className="accent-gradient">outlasts the launch.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="size-3" />
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="space-y-6">
          {aboutParagraphs.map((text, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p
                className={
                  i === 0
                    ? "text-pretty text-foreground"
                    : "text-pretty text-muted-foreground"
                }
                style={{ fontSize: i === 0 ? "var(--text-lead)" : "1.075rem" }}
              >
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
