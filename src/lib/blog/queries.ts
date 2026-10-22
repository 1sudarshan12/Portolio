import "server-only";
import { adminDb, isAdminConfigured } from "@/lib/firebase/admin";
import type { Post } from "@/lib/blog/types";
import {
  BLOGS_COLLECTION,
  isBlogPublished,
  mapFirestoreBlogDoc,
} from "@/lib/blog/firestore-map";

/** Public: all published posts, newest first. Returns [] if Firebase isn't configured. */
export async function getPublishedPosts(): Promise<Post[]> {
  const db = adminDb();
  if (!db) return [];
  try {
    const snap = await db
      .collection(BLOGS_COLLECTION)
      .where("published", "==", true)
      .get();
    return snap.docs
      .map((d) => mapFirestoreBlogDoc(d.id, d.data()))
      .sort((a, b) =>
        (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
      );
  } catch (err) {
    console.error("[blog] getPublishedPosts failed:", err);
    return [];
  }
}

/** Public: one published post by slug (document id). */
export async function getPublishedPostBySlug(
  slug: string,
): Promise<Post | null> {
  const db = adminDb();
  if (!db) return null;
  try {
    const doc = await db.collection(BLOGS_COLLECTION).doc(slug).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    if (!isBlogPublished(data)) return null;
    return mapFirestoreBlogDoc(doc.id, data);
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
  const snap = await db.collection(BLOGS_COLLECTION).get();
  return snap.docs
    .map((d) => mapFirestoreBlogDoc(d.id, d.data()))
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
}

/** Admin: single post by document id. */
export async function getPostById(id: string): Promise<Post | null> {
  const db = adminDb();
  if (!db) return null;
  const doc = await db.collection(BLOGS_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return mapFirestoreBlogDoc(doc.id, doc.data()!);
}

export { isAdminConfigured };
