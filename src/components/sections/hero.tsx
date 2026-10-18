"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { siteConfig } from "@/lib/content/site";
import { stats } from "@/lib/content/about";

const line = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44 lg:pt-52">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_62%)] blur-2xl" />
      </div>

      <div className="container-px">
        <div className="mx-auto max-w-7xl">
          {/* Availability */}
          <motion.div
            variants={fade}
            custom={0}
            initial="hidden"
            animate="visible"
            className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {siteConfig.availability}
            </span>
            <span className="label-mono hidden sm:inline">{siteConfig.location}</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-foreground" style={{ fontSize: "var(--text-display)" }}>
            <span className="sr-only">
              {siteConfig.name} — {siteConfig.role}
            </span>
            {["Full-Stack", "Software Engineer"].map((text, i) => (
              <span key={text} className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block leading-[0.95]"
                  variants={line}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                >
                  {i === 1 ? (
                    <span className="accent-gradient">{text}</span>
                  ) : (
                    text
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Intro + CTAs */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.p
              variants={fade}
              custom={0.5}
              initial="hidden"
              animate="visible"
              className="max-w-xl text-pretty text-muted-foreground"
              style={{ fontSize: "var(--text-lead)" }}
            >
              I&apos;m <span className="text-foreground">Sudarshan Adhikari</span>. I
              build SaaS products and API-driven web applications with React,
              Next.js, TypeScript, Node.js, Python and Go — fast, secure and built
              to last.
            </motion.p>

            <motion.div
              variants={fade}
              custom={0.65}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={reduce ? 0 : 0.25}>
                <Button asChild size="lg">
                  <Link href="#work">
                    View my projects <ArrowDownRight />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild size="lg" variant="outline">
                <Link href="#contact">
                  Hire me <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href={siteConfig.resumePath} download>
                  <Download /> Résumé
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.dl
            variants={fade}
            custom={0.85}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-5 sm:p-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
                <p className="mt-2 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
