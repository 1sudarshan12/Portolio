import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/lib/content/services";

export function Process() {
  return (
    <Section id="process">
      <SectionHeader
        index="06"
        eyebrow="How I Work"
        title="A clear process, with room for good ideas."
        description="Six steps from first conversation to a live, documented product. You see progress the whole way through."
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, i) => (
          <Reveal key={step.index} delay={(i % 3) * 0.06}>
            <div className="group h-full bg-background p-7 transition-colors hover:bg-card">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-border-strong transition-colors group-hover:text-accent">
                  {step.index}
                </span>
                <span className="label-mono">Step</span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                <span className="text-accent">You get → </span>
                {step.deliverable}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
