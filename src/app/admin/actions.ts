"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { getAdminSession } from "@/lib/firebase/session";
import { postInputSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import { siteConfig } from "@/lib/content/site";
import {
  BLOGS_COLLECTION,
  isBlogPublished,
  toFirestoreBlogFields,
} from "@/lib/blog/firestore-map";

export type PostFormState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Record<string, string>;
};

function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function savePost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await getAdminSession();
  if (!session) return { status: "error", message: "Not authorized." };

  const db = adminDb();
  if (!db) return { status: "error", message: "Database not configured." };

  const id = (formData.get("id") as string) || "";
  const rawTags = (formData.get("tags") as string) || "";
  const tags = rawTags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const titleValue = ((formData.get("title") as string) || "").trim();
  const slugValue =
    ((formData.get("slug") as string) || "").trim() || slugify(titleValue);

  const parsed = postInputSchema.safeParse({
    title: titleValue,
    slug: slugValue,
    excerpt: (formData.get("excerpt") as string) || "",
    content: (formData.get("content") as string) || "",
    coverImage: (formData.get("coverImage") as string) || "",
    tags,
    status: (formData.get("status") as string) || "draft",
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    return { status: "error", message: "Please fix the errors below.", errors };
  }

  const data = parsed.data;
  const docId = id || data.slug;
  const published = data.status === "published";

  if (id && data.slug !== id) {
    return {
      status: "error",
      message: "Document URL can't be changed after creation.",
      errors: { slug: "Slug is fixed for existing articles." },
    };
  }

  const existingRef = db.collection(BLOGS_COLLECTION).doc(docId);
  const existingSnap = await existingRef.get();
  if (!id && existingSnap.exists) {
    return {
      status: "error",
      message: "That slug is already in use.",
      errors: { slug: "Choose a different slug." },
    };
  }

  const wasPublished = existingSnap.exists
    ? isBlogPublished(existingSnap.data()!)
    : false;

  const fields = toFirestoreBlogFields({
    title: data.title,
    description: data.excerpt,
    content: data.content,
    coverImage: data.coverImage || null,
    tags: data.tags,
    published,
    authorName: siteConfig.name,
  });

  try {
    if (id) {
      await existingRef.update({
        ...fields,
        updatedAt: FieldValue.serverTimestamp(),
        ...(published && !wasPublished
          ? { publishedAt: FieldValue.serverTimestamp() }
          : {}),
      });
    } else {
      await existingRef.set({
        ...fields,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        publishedAt: published ? FieldValue.serverTimestamp() : null,
      });
    }
  } catch (err) {
    console.error("[admin] savePost failed:", err);
    return { status: "error", message: "Failed to save. Please try again." };
  }

  revalidateBlog(docId);
  redirect("/admin?saved=1");
}

export async function deletePost(formData: FormData): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  const db = adminDb();
  if (!db) throw new Error("NO_DB");

  const id = formData.get("id") as string;
  if (!id) return;

  await db.collection(BLOGS_COLLECTION).doc(id).delete();
  revalidateBlog(id);
  revalidatePath("/admin");
}

export async function togglePublish(formData: FormData): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  const db = adminDb();
  if (!db) throw new Error("NO_DB");

  const id = formData.get("id") as string;
  if (!id) return;

  const ref = db.collection(BLOGS_COLLECTION).doc(id);
  const doc = await ref.get();
  const current = doc.data();
  if (!current) return;

  const currentlyPublished = isBlogPublished(current);
  const nextPublished = !currentlyPublished;

  await ref.update({
    published: nextPublished,
    updatedAt: FieldValue.serverTimestamp(),
    ...(nextPublished && !current.publishedAt
      ? { publishedAt: FieldValue.serverTimestamp() }
      : {}),
  });

  revalidateBlog(id);
  revalidatePath("/admin");
}
