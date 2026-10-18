import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog/queries";
import { BlogList } from "@/components/blog/blog-list";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Articles on React, Next.js, TypeScript, Node.js, software architecture and performance — lessons from real-world full-stack engineering.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="pt-32 sm:pt-40">
      <div className="container-px">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-3xl">
            <span className="label-mono">The Journal</span>
            <h1
              className="mt-4 text-balance font-display text-foreground"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Notes on building for the web.
            </h1>
            <p className="mt-5 text-pretty text-muted-foreground" style={{ fontSize: "var(--text-lead)" }}>
              Practical writing on React, Next.js, TypeScript, Node.js, software
              architecture and performance — drawn from shipping real products.
            </p>
          </header>

          <div className="mt-14 pb-24">
            {posts.length > 0 ? (
              <BlogList posts={posts} />
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
                <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
                  <PenLine className="size-5" />
                </span>
                <h2 className="font-display text-2xl text-foreground">
                  No articles published yet
                </h2>
                <p className="max-w-md text-sm text-muted-foreground">
                  The blog is live and ready. New writing on full-stack
                  engineering will appear here soon — check back shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
