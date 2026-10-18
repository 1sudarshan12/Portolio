import { Section, SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { skillGroups } from "@/lib/content/skills";

export function Skills() {
  return (
    <Section id="skills" className="relative">
      <SectionHeader
        index="04"
        eyebrow="Capabilities"
        title="A full-stack toolkit, organized."
        description="Eight areas of depth — from frontend architecture and performance to security, integrations and the databases underneath."
      />

      <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <RevealItem key={group.title} className="flex">
            <div className="group flex w-full flex-col bg-background p-6 transition-colors hover:bg-card">
              <h3 className="font-display text-xl text-foreground">
                {group.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {group.caption}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-border-strong"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
