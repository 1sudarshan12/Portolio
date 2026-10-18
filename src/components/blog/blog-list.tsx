"use client";

import * as React from "react";
import { PostCard } from "@/components/blog/post-card";
import type { Post } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

export function BlogList({ posts }: { posts: Post[] }) {
  const [active, setActive] = React.useState<string>("All");

  const tags = React.useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [posts]);

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.tags.includes(active));

  return (
    <div>
      {tags.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                active === tag
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
