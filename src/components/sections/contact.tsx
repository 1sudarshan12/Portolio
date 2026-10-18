"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { ArrowUpRight, Mail, Phone, Send, MapPin } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  MediumIcon,
} from "@/components/icons/brand";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { submitInquiry, type ContactState } from "@/app/actions/contact";
import { siteConfig } from "@/lib/content/site";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", message: "" };

const contactMethods = [
  { label: "Email", value: siteConfig.email, href: siteConfig.socials.email, icon: Mail },
  { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phoneHref}`, icon: Phone },
  { label: "LinkedIn", value: "in/sudarshan-adhikari", href: siteConfig.socials.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: "sudarshanadhikari908", href: siteConfig.socials.github, icon: GithubIcon },
  { label: "Medium", value: "@amstersudhan633", href: siteConfig.socials.medium, icon: MediumIcon },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Sending…" : "Send message"}
      {!pending && <Send className="size-4" />}
    </Button>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent",
          error ? "border-red-500/60" : "border-input",
        )}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Contact() {
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);
  const prevStatus = React.useRef(state.status);

  React.useEffect(() => {
    if (state.status === prevStatus.current) return;
    prevStatus.current = state.status;
    if (state.status === "success") {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state.status === "error" && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Section id="contact" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-grid opacity-40"
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Left: pitch + methods */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-sm text-accent">08</span>
            <span className="label-mono">Contact</span>
          </div>
          <Reveal>
            <h2 className="text-balance" style={{ fontSize: "var(--text-h2)" }}>
              Let&apos;s build
              <br />
              <span className="accent-gradient">something great.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-md text-pretty text-muted-foreground" style={{ fontSize: "var(--text-lead)" }}>
              Have a project, a role, or just an idea? Tell me what you&apos;re
              trying to achieve — I reply within a day.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" /> {siteConfig.location}
              <span className="mx-1 text-border-strong">·</span>
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {siteConfig.availability}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-2.5">
            {contactMethods.map((m, i) => (
              <Reveal key={m.label} delay={0.14 + i * 0.05}>
                <a
                  href={m.href}
                  target={m.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-border-strong"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <m.icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted-foreground">
                      {m.label}
                    </span>
                    <span className="block truncate text-sm text-foreground">
                      {m.value}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-accent" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <form
            ref={formRef}
            action={formAction}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            {/* Honeypot */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                placeholder="Jane Doe"
                required
                autoComplete="name"
                error={state.errors?.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
                autoComplete="email"
                error={state.errors?.email}
              />
              <Field
                label="Project type"
                name="projectType"
                placeholder="SaaS, website, API…"
                error={state.errors?.projectType}
              />
              <Field
                label="Budget (optional)"
                name="budget"
                placeholder="e.g. $3k–$8k"
                error={state.errors?.budget}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm text-muted-foreground">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me what you're building or what you need help with…"
                aria-invalid={Boolean(state.errors?.message)}
                className={cn(
                  "w-full resize-y rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent",
                  state.errors?.message ? "border-red-500/60" : "border-input",
                )}
              />
              {state.errors?.message && (
                <p className="mt-1.5 text-xs text-red-500">{state.errors.message}</p>
              )}
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SubmitButton />
              <p className="text-xs text-muted-foreground">
                Protected against spam. No data shared with third parties.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
