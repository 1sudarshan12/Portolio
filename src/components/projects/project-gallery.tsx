"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type GalleryShot = { src: string; alt: string };

export function ProjectGallery({ shots }: { shots: GalleryShot[] }) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const active = shots[index];
  const hasMultiple = shots.length > 1;

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  function go(delta: number) {
    setIndex((i) => (i + delta + shots.length) % shots.length);
  }

  React.useEffect(() => {
    if (!open || !hasMultiple) return;
    const len = shots.length;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + len) % len);
      }
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % len);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, hasMultiple, shots.length]);

  if (shots.length === 0) return null;

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => openAt(i)}
            className={cn(
              "group relative block aspect-[16/10] overflow-hidden rounded-xl border border-border text-left",
              "transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            )}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="sr-only">View full size: {shot.alt}</span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <DialogHeader className="flex flex-row items-start justify-between gap-4 pr-12">
            <div className="min-w-0 flex-1">
              <DialogTitle className="truncate">{active?.alt}</DialogTitle>
              {hasMultiple && (
                <DialogDescription>
                  {index + 1} of {shots.length}
                </DialogDescription>
              )}
            </div>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 z-10 rounded-full border border-border bg-background/80 backdrop-blur-sm"
              aria-label="Close gallery"
            >
              <X className="size-4" />
            </Button>
          </DialogClose>

          <div className="relative bg-muted/30 px-2 pb-2 sm:px-4 sm:pb-4">
            <div className="relative mx-auto flex max-h-[min(75vh,900px)] min-h-[12rem] w-full items-center justify-center">
              {active && (
                <Image
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  width={1600}
                  height={1000}
                  className="h-auto max-h-[min(75vh,900px)] w-full object-contain"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              )}
            </div>

            {hasMultiple && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  aria-label="Previous image"
                  onClick={() => go(-1)}
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  aria-label="Next image"
                  onClick={() => go(1)}
                >
                  <ChevronRight className="size-5" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
