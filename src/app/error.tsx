"use client";

import * as React from "react";
import { RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="max-w-md text-center">
        <span className="label-mono">Error</span>
        <h1 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
          Something broke on our end.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          An unexpected error occurred. Try again, or head back home.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">
            Ref: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset}>
            <RotateCcw className="size-4" /> Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="size-4" /> Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
