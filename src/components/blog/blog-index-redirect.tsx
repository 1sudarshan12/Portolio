"use client";

import { useEffect } from "react";

/** `/blog` is not a standalone page — send visitors to the homepage blogs section. */
export function BlogIndexRedirect() {
  useEffect(() => {
    window.location.replace("/#blogs");
  }, []);

  return (
    <div className="grid min-h-[40vh] place-items-center px-6">
      <p className="text-sm text-muted-foreground">Taking you to blogs…</p>
    </div>
  );
}
