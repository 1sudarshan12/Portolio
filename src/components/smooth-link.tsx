"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SmoothLinkProps = React.ComponentProps<typeof Link> & {
  /** Called after a click (e.g. to close a mobile menu). */
  onNavigate?: () => void;
};

/**
 * Drop-in replacement for next/link that smooth-scrolls to in-page anchors.
 * Next's router jumps instantly for hash targets, bypassing CSS smooth scroll —
 * so when the target exists on the current page we handle it ourselves.
 */
export function SmoothLink({
  href,
  onClick,
  onNavigate,
  children,
  ...props
}: SmoothLinkProps) {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);

    const hrefStr = typeof href === "string" ? href : "";
    const hashIndex = hrefStr.indexOf("#");

    if (hashIndex !== -1 && !e.defaultPrevented) {
      const targetPath = hrefStr.slice(0, hashIndex) || "/";
      const id = hrefStr.slice(hashIndex + 1);
      const samePage = targetPath === pathname || (targetPath === "/" && pathname === "/");

      if (samePage && id) {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
          window.history.replaceState(null, "", `#${id}`);
        }
      }
    }

    onNavigate?.();
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
