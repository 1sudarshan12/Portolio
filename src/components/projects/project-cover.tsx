import Image from "next/image";
import * as React from "react";
import { ViewTransition } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content/projects";

/**
 * Renders a real screenshot if provided, otherwise a branded abstract cover.
 * Replace by adding `screenshots` to a project in src/lib/content/projects.ts.
 */
export function ProjectCover({
  project,
  className,
  priority,
  transitionName,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  /** Shared-element name so the cover morphs between card and detail page. */
  transitionName?: string;
}) {
  const shot = project.screenshots?.[0];
  const wrap = (node: React.ReactElement) =>
    transitionName ? <ViewTransition name={transitionName}>{node}</ViewTransition> : node;

  if (shot) {
    return wrap(
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          data-parallax=""
        />
      </div>,
    );
  }

  return wrap(
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `radial-gradient(120% 120% at 0% 0%, ${project.cover.from}, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${project.cover.to}, transparent 55%), var(--card)`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:none]" />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <span className="font-display text-5xl text-white/90 drop-shadow-sm sm:text-6xl">
          {project.name}
        </span>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>,
  );
}
