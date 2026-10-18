import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container-px">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                SA
              </span>
              <span className="font-display text-lg">Studio</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View site <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>
      <div className="container-px py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
