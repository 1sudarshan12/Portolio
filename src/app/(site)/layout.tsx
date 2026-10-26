import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HashScrollHandler } from "@/components/hash-scroll-handler";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <HashScrollHandler />
      <Navbar />
      <main id="main" className="flex-1 overflow-x-hidden max-w-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
