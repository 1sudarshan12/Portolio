import * as React from "react";

/**
 * Server-rendered animation hooks. These emit data attributes that the single
 * client-side <GsapProvider /> picks up, so section components stay on the
 * server and ship no per-element JS.
 */

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section" | "article";
};

export function Reveal({ children, delay = 0, y, className, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      className={className}
      data-reveal=""
      data-delay={delay || undefined}
      data-y={y}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={className} data-reveal-group="" data-stagger={stagger}>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <div className={className} data-reveal-item="">
      {children}
    </div>
  );
}
