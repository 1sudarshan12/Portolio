import { techMarquee } from "@/lib/content/about";

export function TechMarquee() {
  const items = [...techMarquee, ...techMarquee];
  return (
    <div className="relative overflow-hidden border-y border-border py-6">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      />
      <div className="flex w-max animate-marquee items-center gap-10 pl-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-display text-2xl text-muted-foreground/70 sm:text-3xl"
          >
            {item}
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
