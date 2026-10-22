"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Scroll to `#section` after client navigations to the homepage (e.g. from `/blog/[slug]`). */
export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    function scrollToHash() {
      if (pathname !== "/") return;
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;

      const el = document.getElementById(hash);
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      });
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  return null;
}
