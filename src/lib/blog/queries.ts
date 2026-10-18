import "server-only";
import type { DocumentData, Timestamp } from "firebase-admin/firestore";
import { adminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { readingTime } from "@/lib/utils";
import type { Post } from "@/lib/blog/types";

const COLLECTION = "posts";

function toIso(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  const ts = value as Timestamp;
  if (typeof ts?.toDate === "function") return ts.toDate().toISOString();
  return null;
}

function mapPost(id: string, data: DocumentData): Post {
  const content = (data.content as string) ?? "";
  return {
    id,
    title: (data.title as string) ?? "Untitled",
    slug: (data.slug as string) ?? id,
    excerpt: (data.excerpt as string) ?? "",
    content,
    coverImage: (data.coverImage as string) ?? null,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    status: (data.status as Post["status"]) ?? "draft",
    readingMinutes:
      typeof data.readingMinutes === "number"
        ? data.readingMinutes
        : readingTime(content),
    publishedAt: toIso(data.publishedAt),
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

/** Public: all published posts, newest first. Returns [] if Firebase isn't configured. */
export async function getPublishedPosts(): Promise<Post[]> {
  const db = adminDb();
  if (!db) return [];
  try {
    const snap = await db
      .collection(COLLECTION)
      .where("status", "==", "published")
      .get();
    return snap.docs
      .map((d) => mapPost(d.id, d.data()))
      .sort((a, b) =>
        (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
      );
  } catch (err) {
    console.error("[blog] getPublishedPosts failed:", err);
    return [];
  }
}

/** Public: one published post by slug. */
export async function getPublishedPostBySlug(
  slug: string,
): Promise<Post | null> {
  const db = adminDb();
  if (!db) return null;
  try {
    const snap = await db
      .collection(COLLECTION)
      .where("slug", "==", slug)
      .where("status", "==", "published")
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc = snap.docs[0]!;
    return mapPost(doc.id, doc.data());
  } catch (err) {
    console.error("[blog] getPublishedPostBySlug failed:", err);
    return null;
  }
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.slug);
}

export async function getRelatedPosts(
  current: Post,
  limit = 2,
): Promise<Post[]> {
  const all = await getPublishedPosts();
  return all
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

/** Admin: every post regardless of status. */
export async function getAllPostsAdmin(): Promise<Post[]> {
  const db = adminDb();
  if (!db) return [];
  const snap = await db.collection(COLLECTION).get();
  return snap.docs
    .map((d) => mapPost(d.id, d.data()))
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
}

/** Admin: single post by document id. */
export async function getPostById(id: string): Promise<Post | null> {
  const db = adminDb();
  if (!db) return null;
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return mapPost(doc.id, doc.data()!);
}

export { isAdminConfigured };
