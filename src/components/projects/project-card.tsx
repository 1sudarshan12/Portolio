import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectCover } from "@/components/projects/project-cover";
import type { Project } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  featured,
  priority,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-border-strong hover:shadow-[0_30px_80px_-40px_var(--accent-glow)]",
        featured && "lg:col-span-2 lg:flex-row",
      )}
    >
      <ProjectCover
        project={project}
        priority={priority}
        className={cn(
          "aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.02]",
          featured && "lg:aspect-auto lg:w-1/2",
        )}
      />

      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "lg:justify-center lg:p-10")}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">{project.category}</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-[0.68rem] text-muted-foreground">
            {project.period}
          </span>
        </div>

        <h3 className="mt-4 flex items-center gap-2 font-display text-2xl text-foreground sm:text-3xl">
          {project.name}
          {project.confidential && (
            <Lock className="size-4 text-muted-foreground" />
          )}
          <ArrowUpRight className="size-5 translate-y-0.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0 group-hover:text-accent" />
        </h3>

        <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, featured ? 6 : 4).map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
