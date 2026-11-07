"use client";

import { usePathname } from "next/navigation";
import { Cursor } from "@/components/motion/cursor";
import { EASE, MEDIA } from "@/lib/gsap/motion";
import { gsap, registerGsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap/register";

registerGsap();

const num = (v: string | undefined, fallback: number) => {
  const n = parseFloat(v ?? "");
  return Number.isFinite(n) ? n : fallback;
};

/**
 * The only animation entry point. Scans the page for data-attributes
 * (data-reveal, data-reveal-group, data-split, data-rule, data-count,
 * data-parallax) and animates them. Everything is created inside
 * gsap.matchMedia(), so it is reverted on route change/unmount and skipped
 * entirely under prefers-reduced-motion.
 */
export function GsapProvider() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add(
        { motion: MEDIA.motion, desktop: MEDIA.desktop },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
          if (!motion) {
            root.classList.remove("js-reveal");
            return;
          }

          const cleanups: Array<() => void> = [];
          const dy = desktop ? 28 : 16;
          const dur = desktop ? 0.9 : 0.7;
          const q = gsap.utils.toArray;

          // Single elements
          q<HTMLElement>("[data-reveal]").forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: num(el.dataset.y, dy) },
              {
                autoAlpha: 1,
                y: 0,
                duration: dur,
                delay: num(el.dataset.delay, 0),
                ease: EASE.out,
                clearProps: "opacity,visibility,transform",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              },
            );
          });

          // Staggered groups
          q<HTMLElement>("[data-reveal-group]").forEach((group) => {
            const items = q<HTMLElement>("[data-reveal-item]", group);
            if (!items.length) return;
            gsap.fromTo(
              items,
              { autoAlpha: 0, y: dy },
              {
                autoAlpha: 1,
                y: 0,
                duration: dur,
                ease: EASE.out,
                stagger: num(group.dataset.stagger, 0.08),
                clearProps: "opacity,visibility,transform",
                scrollTrigger: { trigger: group, start: "top 88%", once: true },
              },
            );
          });

          // Section rules draw in
          q<HTMLElement>("[data-rule]").forEach((el) => {
            gsap.fromTo(
              el,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1,
                duration: 1.2,
                ease: EASE.expo,
                clearProps: "transform",
                scrollTrigger: { trigger: el, start: "top 95%", once: true },
              },
            );
          });

          // Count-ups ("6+" -> counts to 6, keeps suffix)
          q<HTMLElement>("[data-count]").forEach((el) => {
            const match = /^(\d+)(.*)$/.exec(el.textContent ?? "");
            if (!match) return;
            const target = Number(match[1]);
            const suffix = match[2];
            const state = { v: 0 };
            el.textContent = `0${suffix}`;
            gsap.to(state, {
              v: target,
              duration: 1.4,
              ease: EASE.out,
              onUpdate: () => {
                el.textContent = `${Math.round(state.v)}${suffix}`;
              },
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            });
          });

          // Parallax (desktop only, transform-only, scrubbed to scroll)
          if (desktop) {
            q<HTMLElement>("[data-parallax]").forEach((el) => {
              gsap.fromTo(
                el,
                { yPercent: -6 },
                {
                  yPercent: 6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el.parentElement ?? el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            });
          }

          // Scroll progress hairline
          const bar = document.querySelector<HTMLElement>("[data-progress]");
          if (bar) {
            gsap.to(bar, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2,
              },
            });
          }

          // Cinematic type: SplitText. Needs final fonts, so wait for them;
          // targets stay hidden (inline) until split.
          const splitEls = q<HTMLElement>("[data-split]");
          const scrubEls = q<HTMLElement>("[data-scrub-words]");
          splitEls.forEach((el) => gsap.set(el, { visibility: "hidden" }));

          // Hero spotlight follows the pointer (desktop only)
          if (desktop) {
            const hero = document.querySelector<HTMLElement>("[data-hero]");
            const glow = document.querySelector<HTMLElement>("[data-pointer-glow]");
            if (hero && glow) {
              const gx = gsap.quickTo(glow, "x", { duration: 1.2, ease: "power3.out" });
              const gy = gsap.quickTo(glow, "y", { duration: 1.2, ease: "power3.out" });
              const onMove = (e: PointerEvent) => {
                const r = hero.getBoundingClientRect();
                gx(e.clientX - r.left - glow.offsetWidth / 2);
                gy(e.clientY - r.top - glow.offsetHeight / 2);
              };
              gsap.to(glow, { autoAlpha: 1, duration: 1.5, delay: 0.6 });
              hero.addEventListener("pointermove", onMove);
              cleanups.push(() => hero.removeEventListener("pointermove", onMove));
            }

            // Hero content drifts and fades as you scroll past (scrubbed, no pinning)
            const heroContent = document.querySelector<HTMLElement>("[data-hero-content]");
            if (heroContent) {
              gsap.to(heroContent, {
                yPercent: -8,
                opacity: 0.25,
                ease: "none",
                scrollTrigger: { trigger: heroContent, start: "top 15%", end: "bottom top", scrub: true },
              });
            }

            // Card tilt + spotlight
            q<HTMLElement>("[data-tilt]").forEach((card) => {
              const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
              const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
              gsap.set(card, { transformPerspective: 1000 });
              const move = (e: PointerEvent) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                ry((px - 0.5) * 5);
                rx((0.5 - py) * 5);
                card.style.setProperty("--mx", `${px * 100}%`);
                card.style.setProperty("--my", `${py * 100}%`);
              };
              const leave = () => {
                rx(0);
                ry(0);
              };
              card.addEventListener("pointermove", move);
              card.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                card.removeEventListener("pointermove", move);
                card.removeEventListener("pointerleave", leave);
              });
            });
          }

          // Ambient glow drifts across the page as you scroll (transform only)
          const ambient = document.querySelector<HTMLElement>("[data-ambient]");
          if (ambient) {
            gsap.fromTo(
              ambient,
              { xPercent: -35, yPercent: -10 },
              {
                xPercent: 35,
                yPercent: 10,
                ease: "none",
                scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 1.5 },
              },
            );
          }

          // Navbar tucks away on scroll down, returns on scroll up
          const nav = document.querySelector<HTMLElement>("[data-nav]");
          if (nav) {
            const showNav = gsap.quickTo(nav, "yPercent", { duration: 0.45, ease: "power3.out" });
            ScrollTrigger.create({
              start: 0,
              end: "max",
              onUpdate: (self) => {
                showNav(self.direction === 1 && self.scroll() > 480 ? -130 : 0);
              },
            });
            cleanups.push(() => gsap.set(nav, { clearProps: "transform" }));
          }

          // Tech marquee: scroll velocity speeds it up and flips direction
          q<HTMLElement>("[data-marquee]").forEach((track) => {
            track.style.animation = "none";
            const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
            let boost: gsap.core.Tween | undefined;
            ScrollTrigger.create({
              start: 0,
              end: "max",
              onUpdate: (self) => {
                const dir = self.direction;
                const speed = Math.min(Math.abs(self.getVelocity()) / 250, 8);
                boost?.kill();
                boost = gsap.fromTo(
                  loop,
                  { timeScale: dir * (1 + speed) },
                  { timeScale: 1, duration: 1.4, ease: "power2.out", overwrite: true },
                );
              },
            });
            cleanups.push(() => {
              boost?.kill();
              track.style.animation = "";
            });
          });

          // Inline styles now own the hidden state; drop the pre-hide CSS.
          root.classList.remove("js-reveal");

          let cancelled = false;
          const splitCtx = gsap.context(() => {});
          document.fonts.ready.then(() => {
            if (cancelled) return;
            splitCtx.add(() => {
              splitEls.forEach((el) => {
                const delay = num(el.dataset.delay, 0);
                const chars = el.dataset.split === "chars";
                SplitText.create(el, {
                  type: chars ? "lines,chars" : "lines",
                  mask: "lines",
                  linesClass: "split-line",
                  autoSplit: true,
                  onSplit: (self) => {
                    gsap.set(el, { visibility: "visible" });
                    return gsap.from(chars ? self.chars : self.lines, {
                      yPercent: chars ? 120 : 110,
                      rotate: chars ? 8 : 3,
                      duration: desktop ? 1.1 : 0.9,
                      delay,
                      ease: EASE.expo,
                      stagger: chars ? 0.025 : 0.1,
                      scrollTrigger: { trigger: el, start: "top 90%", once: true },
                    });
                  },
                });
              });

              // Scroll-scrubbed word illumination
              scrubEls.forEach((el) => {
                SplitText.create(el, {
                  type: "words",
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.fromTo(
                      self.words,
                      { opacity: 0.16 },
                      {
                        opacity: 1,
                        ease: "none",
                        stagger: 0.12,
                        scrollTrigger: {
                          trigger: el,
                          start: "top 82%",
                          end: "bottom 50%",
                          scrub: true,
                        },
                      },
                    ),
                });
              });
            });
            ScrollTrigger.refresh();
          });

          return () => {
            cancelled = true;
            cleanups.forEach((fn) => fn());
            splitCtx.revert();
          };
        },
      );

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <>
    <Cursor />
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        data-ambient=""
        className="absolute left-1/2 top-1/3 size-[60rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_62%)] opacity-50"
      />
    </div>
    <div
      aria-hidden
      data-progress=""
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ transform: "scaleX(0)" }}
    />
    </>
  );
}
