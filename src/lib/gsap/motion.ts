/** Shared motion tokens so every animation feels like one system. */
export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  soft: "power2.out",
} as const;

export const MEDIA = {
  /** User has not asked for reduced motion. */
  motion: "(prefers-reduced-motion: no-preference)",
  /** Mouse/trackpad on a large screen: enables parallax and magnetic effects. */
  desktop: "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
} as const;

/** Inline script (runs before first paint) that arms the pre-hide CSS. */
export const PREHIDE_SCRIPT = `(function(){try{if(window.matchMedia("${MEDIA.motion}").matches){var d=document.documentElement;d.classList.add("js-reveal");setTimeout(function(){d.classList.remove("js-reveal")},4000)}}catch(e){}})();`;
