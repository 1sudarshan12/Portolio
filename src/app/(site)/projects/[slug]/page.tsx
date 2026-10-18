import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Target,
  TriangleAlert,
  Trophy,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/brand";
import { projects, getProject } from "@/lib/content/projects";
import { ProjectCover } from "@/components/projects/project-cover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — ${project.category}`,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

function DetailBlock({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Target;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2.5 font-display text-xl text-foreground">
        <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon className="size-4" />
        </span>
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-28 sm:pt-32">
      <div className="container-px">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-accent">{project.category}</span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs text-muted-foreground">
              {project.period}
            </span>
          </div>

          <h1
            className="mt-6 text-balance font-display text-foreground"
            style={{ fontSize: "var(--text-h1)" }}
          >
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-muted-foreground" style={{ fontSize: "var(--text-lead)" }}>
            {project.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <Button asChild size="sm">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" /> Visit live site
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild size="sm" variant="outline">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="size-4" /> Source
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Cover */}
      <div className="container-px mt-12">
        <Reveal>
          <ProjectCover
            project={project}
            priority
            className="mx-auto aspect-[16/9] w-full max-w-6xl rounded-3xl border border-border"
          />
        </Reveal>
      </div>

      {/* Body */}
      <div className="container-px mt-16 pb-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div>
              <p className="label-mono mb-3">Tech stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="label-mono mb-3">Role</p>
              <p className="text-sm text-foreground">Software Engineer · {project.org}</p>
            </div>
          </aside>

          <div className="space-y-12">
            <div>
              <h2 className="font-display text-xl text-foreground">Overview</h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground" style={{ fontSize: "1.075rem" }}>
                {project.summary}
              </p>
            </div>

            <DetailBlock
              icon={Target}
              title="What I did"
              items={project.responsibilities}
            />

            {project.challenges && (
              <DetailBlock
                icon={TriangleAlert}
                title="Challenges"
                items={project.challenges}
              />
            )}

            {project.results && (
              <DetailBlock icon={Trophy} title="Results" items={project.results} />
            )}

            {!project.liveUrl && (
              <p className="rounded-xl border border-dashed border-border bg-card/50 px-5 py-4 text-sm text-muted-foreground">
                Live link and screenshots available on request — some work is
                under NDA or internal to the company.
              </p>
            )}
          </div>
        </div>

        {/* Next project */}
        <div className="mx-auto mt-20 max-w-5xl">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-strong sm:p-8"
          >
            <div>
              <span className="label-mono">Next project</span>
              <p className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                {next.name}
              </p>
            </div>
            <ArrowUpRight className="size-6 text-muted-foreground transition-colors group-hover:text-accent" />
          </Link>
        </div>
      </div>
    </article>
  );
}
