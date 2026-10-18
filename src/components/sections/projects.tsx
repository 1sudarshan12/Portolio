import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/lib/content/projects";

export function Projects() {
  return (
    <Section id="work">
      <SectionHeader
        index="03"
        eyebrow="Selected Work"
        title="Products I've shipped, explained properly."
        description="SaaS platforms, fintech, insurance and Web3 — client work and production software. Open any project for the full story."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 2) * 0.06}
            className={project.featured ? "lg:col-span-2" : undefined}
          >
            <ProjectCard
              project={project}
              featured={project.featured}
              priority={i < 2}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
