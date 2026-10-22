import type { DocumentData, Timestamp } from "firebase-admin/firestore";
import { readingTime } from "@/lib/utils";
import type { Post } from "@/lib/blog/types";

/** Firestore collection used for blog documents. */
export const BLOGS_COLLECTION = "blogs";

function toIso(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  const ts = value as Timestamp;
  if (typeof ts?.toDate === "function") return ts.toDate().toISOString();
  return null;
}

/** Supports Firebase `published: boolean` and legacy `status: "published"`. */
export function isBlogPublished(data: DocumentData): boolean {
  if (typeof data.published === "boolean") return data.published;
  return data.status === "published";
}

/** Map a Firestore `blogs/{id}` document to the app's Post model. */
export function mapFirestoreBlogDoc(id: string, data: DocumentData): Post {
  const content = (data.content as string) ?? "";
  const published = isBlogPublished(data);

  return {
    id,
    title: (data.title as string) ?? "Untitled",
    slug: (data.slug as string) ?? id,
    excerpt:
      (data.description as string) ??
      (data.excerpt as string) ??
      "",
    content,
    coverImage: (data.coverImage as string) ?? null,
    coverImageAlt: (data.coverImageAlt as string) ?? null,
    authorName: (data.authorName as string) ?? null,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    status: published ? "published" : "draft",
    readingMinutes:
      typeof data.readingMinutes === "number"
        ? data.readingMinutes
        : readingTime(content),
    publishedAt: toIso(data.publishedAt),
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

/** Fields written to Firestore from the admin editor. */
export function toFirestoreBlogFields(input: {
  title: string;
  description: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  authorName: string;
  commentsEnabled?: boolean;
}) {
  return {
    title: input.title,
    description: input.description,
    content: input.content,
    tags: input.tags,
    published: input.published,
    authorName: input.authorName,
    commentsEnabled: input.commentsEnabled ?? true,
    ...(input.coverImage ? { coverImage: input.coverImage } : {}),
  };
}
