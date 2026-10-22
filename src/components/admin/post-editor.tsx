"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Eye, Pencil, Save, Send } from "lucide-react";
import { savePost, type PostFormState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/blog/types";

const initial: PostFormState = { status: "idle", message: "" };

function fieldClass(error?: string) {
  return cn(
    "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent",
    error ? "border-red-500/60" : "border-input",
  );
}

function SaveButtons() {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center gap-2">
      <Button
        type="submit"
        name="status"
        value="draft"
        variant="outline"
        disabled={pending}
      >
        <Save className="size-4" /> Save draft
      </Button>
      <Button type="submit" name="status" value="published" disabled={pending}>
        <Send className="size-4" /> {pending ? "Saving…" : "Publish"}
      </Button>
    </div>
  );
}

export function PostEditor({ post }: { post?: Post }) {
  const [state, formAction] = useActionState(savePost, initial);
  const [title, setTitle] = React.useState(post?.title ?? "");
  const [slugOverride, setSlugOverride] = React.useState<string | null>(
    post?.slug ?? null,
  );
  const [content, setContent] = React.useState(post?.content ?? "");
  const [tab, setTab] = React.useState<"write" | "preview">("write");

  // Slug auto-derives from the title until the user edits it directly.
  const slug = slugOverride ?? slugify(title);

  return (
    <form action={formAction}>
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back
          </Link>
          <h1 className="mt-2 font-display text-3xl text-foreground">
            {post ? "Edit article" : "New article"}
          </h1>
        </div>
        <SaveButtons />
      </div>

      {state.status === "error" && state.message && (
        <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-500">
          {state.message}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.8fr_1fr]">
        {/* Main column */}
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm text-muted-foreground">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A great engineering article"
              className={fieldClass(state.errors?.title)}
            />
            {state.errors?.title && (
              <p className="mt-1.5 text-xs text-red-500">{state.errors.title}</p>
            )}
          </div>

          {/* Editor tabs */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Content (Markdown)</label>
              <div className="flex gap-1 rounded-lg border border-border p-0.5">
                <button
                  type="button"
                  onClick={() => setTab("write")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition-colors",
                    tab === "write" ? "bg-muted text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Pencil className="size-3.5" /> Write
                </button>
                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition-colors",
                    tab === "preview" ? "bg-muted text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Eye className="size-3.5" /> Preview
                </button>
              </div>
            </div>

            {tab === "write" ? (
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={22}
                placeholder={"## Heading\n\nWrite your article in **Markdown**.\n\n```ts\nconst x = 1;\n```"}
                className={cn(fieldClass(state.errors?.content), "resize-y font-mono text-[0.85rem] leading-relaxed")}
              />
            ) : (
              <div className="min-h-[30rem] rounded-xl border border-border bg-card p-6">
                {content.trim() ? (
                  <div className="prose-blog">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nothing to preview yet.
                  </p>
                )}
              </div>
            )}
            {/* Keep content in form even while previewing */}
            {tab === "preview" && (
              <input type="hidden" name="content" value={content} />
            )}
            {state.errors?.content && (
              <p className="mt-1.5 text-xs text-red-500">{state.errors.content}</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="label-mono mb-4">Metadata</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="slug" className="mb-2 block text-sm text-muted-foreground">
                  Slug
                </label>
                <div className="flex items-center rounded-xl border border-input bg-background px-3 focus-within:border-accent">
                  <span className="font-mono text-xs text-muted-foreground">/blog/</span>
                  <input
                    id="slug"
                    name="slug"
                    value={slug}
                    readOnly={Boolean(post)}
                    onChange={(e) => setSlugOverride(e.target.value)}
                    className="w-full bg-transparent py-3 pl-1 font-mono text-xs text-foreground outline-none read-only:cursor-not-allowed read-only:opacity-70"
                  />
                </div>
                {state.errors?.slug && (
                  <p className="mt-1.5 text-xs text-red-500">{state.errors.slug}</p>
                )}
              </div>

              <div>
                <label htmlFor="excerpt" className="mb-2 block text-sm text-muted-foreground">
                  Description
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={post?.excerpt}
                  rows={3}
                  placeholder="A one-sentence summary for cards and SEO."
                  className={cn(fieldClass(state.errors?.excerpt), "resize-y")}
                />
                {state.errors?.excerpt && (
                  <p className="mt-1.5 text-xs text-red-500">{state.errors.excerpt}</p>
                )}
              </div>

              <div>
                <label htmlFor="tags" className="mb-2 block text-sm text-muted-foreground">
                  Tags <span className="text-xs">(comma separated)</span>
                </label>
                <input
                  id="tags"
                  name="tags"
                  defaultValue={post?.tags.join(", ")}
                  placeholder="React, Next.js, Performance"
                  className={fieldClass(state.errors?.tags)}
                />
              </div>

              <div>
                <label htmlFor="coverImage" className="mb-2 block text-sm text-muted-foreground">
                  Cover image URL <span className="text-xs">(optional)</span>
                </label>
                <input
                  id="coverImage"
                  name="coverImage"
                  type="url"
                  defaultValue={post?.coverImage ?? ""}
                  placeholder="https://…"
                  className={fieldClass(state.errors?.coverImage)}
                />
                {state.errors?.coverImage && (
                  <p className="mt-1.5 text-xs text-red-500">{state.errors.coverImage}</p>
                )}
              </div>
            </div>
          </div>

          <p className="px-1 text-xs leading-relaxed text-muted-foreground">
            “Save draft” keeps it private. “Publish” makes it live at{" "}
            <span className="font-mono">/blog/{slug || "your-slug"}</span>.
          </p>
        </aside>
      </div>
    </form>
  );
}
