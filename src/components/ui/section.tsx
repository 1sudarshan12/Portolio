import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn("section-py container-px scroll-mt-20", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {(index || eyebrow) && (
        <div className="mb-5 flex items-center gap-3">
          {index && (
            <span className="font-mono text-sm text-accent">{index}</span>
          )}
          {eyebrow && <span className="label-mono">{eyebrow}</span>}
          <span className="h-px flex-1 bg-border" aria-hidden />
        </div>
      )}
      <h2 className="text-balance text-[color:var(--foreground)]" style={{ fontSize: "var(--text-h2)" }}>
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-pretty text-muted-foreground" style={{ fontSize: "var(--text-lead)" }}>
          {description}
        </p>
      )}
    </div>
  );
}
