import { PenLine } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/components/blog/post-card";
import { BlogList } from "@/components/blog/blog-list";
import { getPublishedPosts } from "@/lib/blog/queries";

export async function BlogPreview() {
  const posts = await getPublishedPosts();

  return (
    <Section id="blogs">
      <SectionHeader
        index="07"
        eyebrow="Blogs"
        title="Notes on building for the web."
        description="Articles on React, Next.js, TypeScript, architecture and performance — lessons from real-world engineering."
        className="max-w-3xl"
      />

      {posts.length > 0 ? (
        <div className="mt-14">
          {posts.length > 3 ? (
            <BlogList posts={posts} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 0.06}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
              <PenLine className="size-5" />
            </span>
            <h3 className="font-display text-xl text-foreground">
              Articles are on the way
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              The blog is wired up and ready. New writing on full-stack
              engineering will appear here soon.
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
