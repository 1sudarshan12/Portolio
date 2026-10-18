import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/blog/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-border-strong hover:shadow-[0_30px_80px_-50px_var(--accent-glow)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 0% 0%, var(--accent-glow), transparent 55%), var(--card)",
            }}
          >
            <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:none]" />
            <span className="absolute bottom-4 left-5 font-display text-2xl text-foreground/80">
              {post.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] text-muted-foreground">
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> {post.readingMinutes} min read
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl leading-tight text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-accent" />
        </div>
      </div>
    </Link>
  );
}
