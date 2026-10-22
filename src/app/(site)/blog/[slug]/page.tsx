import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import {
  getPublishedPostBySlug,
  getAllPublishedSlugs,
  getRelatedPosts,
} from "@/lib/blog/queries";
import { Markdown } from "@/components/blog/markdown";
import { ShareButtons } from "@/components/blog/share";
import { PostCard } from "@/components/blog/post-card";
import { formatDate, absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/content/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  const ogImage = post.coverImage ?? `/blog/${post.slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.publishedAt ?? undefined,
      tags: post.tags,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName ?? siteConfig.name,
    },
    keywords: post.tags.join(", "),
    url,
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };

  return (
    <article className="pt-28 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-px">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to blogs
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent-soft px-3 py-1 text-xs text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="mt-6 text-balance font-display text-foreground"
            style={{ fontSize: "var(--text-h1)" }}
          >
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 font-mono text-xs text-muted-foreground">
            {post.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" /> {formatDate(post.publishedAt)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" /> {post.readingMinutes} min read
            </span>
            <ShareButtons url={url} title={post.title} className="ml-auto" />
          </div>
        </div>
      </div>

      {post.coverImage && (
        <div className="container-px mt-10">
          <div className="relative mx-auto aspect-[16/8] w-full max-w-4xl overflow-hidden rounded-3xl border border-border">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56rem"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="container-px mt-12 pb-24">
        <div className="mx-auto max-w-3xl">
          <Markdown content={post.content} />

          <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                SA
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {post.authorName ?? siteConfig.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Full-Stack Software Engineer
                </p>
              </div>
            </div>
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-5xl">
            <h2 className="font-display text-2xl text-foreground">
              Keep reading
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
