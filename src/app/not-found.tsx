import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="text-center">
        <p className="font-display text-[clamp(5rem,20vw,11rem)] leading-none text-foreground">
          4<span className="accent-gradient">0</span>4
        </p>
        <h1 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">
          This page wandered off.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home className="size-4" /> Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="size-4" /> Read the blog
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
