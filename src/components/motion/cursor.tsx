"use client";

import * as React from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap/register";
import { MEDIA } from "@/lib/gsap/motion";

registerGsap();

/**
 * Trailing cursor ring for mouse users on large screens. The native cursor is
 * left in place; the ring grows over interactive elements and shows a label
 * when the element sets data-cursor="Label".
 */
export function Cursor() {
  const ring = React.useRef<HTMLDivElement>(null);
  const label = React.useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ring.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${MEDIA.motion} and ${MEDIA.desktop}`, () => {
      const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      let shown = false;

      const move = (e: PointerEvent) => {
        if (!shown) {
          shown = true;
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        }
        x(e.clientX);
        y(e.clientY);
      };
      const over = (e: PointerEvent) => {
        const t = (e.target as Element | null)?.closest<HTMLElement>(
          "[data-cursor],a,button,[role=button]",
        );
        const text = t?.dataset.cursor ?? "";
        if (label.current) label.current.textContent = text;
        gsap.to(el, {
          scale: text ? 1 : t ? 0.6 : 0.25,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
        el.dataset.active = t ? "1" : "";
      };
      const leave = () => {
        shown = false;
        gsap.to(el, { autoAlpha: 0, duration: 0.2 });
      };

      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerover", over, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      gsap.set(el, { scale: 0.25 });
      return () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", over);
        document.documentElement.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/70 bg-accent/10 backdrop-blur-[2px] lg:flex"
      style={{ visibility: "hidden" }}
    >
      <span ref={label} className="font-mono text-[0.65rem] uppercase tracking-widest text-accent" />
    </div>
  );
}
