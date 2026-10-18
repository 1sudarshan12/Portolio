"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { getAdminSession } from "@/lib/firebase/session";
import { postInputSchema } from "@/lib/validation";
import { readingTime, slugify } from "@/lib/utils";

const COLLECTION = "posts";

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

  // Enforce unique slug (excluding the current doc)
  const slugClash = await db
    .collection(COLLECTION)
    .where("slug", "==", data.slug)
    .get();
  const clash = slugClash.docs.find((d) => d.id !== id);
  if (clash) {
    return {
      status: "error",
      message: "That slug is already in use.",
      errors: { slug: "Slug must be unique." },
    };
  }

  const base = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.coverImage || null,
    tags: data.tags,
    status: data.status,
    readingMinutes: readingTime(data.content),
    updatedAt: FieldValue.serverTimestamp(),
    authorEmail: session.email,
  };

  try {
    if (id) {
      const ref = db.collection(COLLECTION).doc(id);
      const existing = await ref.get();
      const wasPublished = existing.data()?.status === "published";
      await ref.update({
        ...base,
        ...(data.status === "published" && !wasPublished
          ? { publishedAt: FieldValue.serverTimestamp() }
          : {}),
      });
    } else {
      await db.collection(COLLECTION).add({
        ...base,
        createdAt: FieldValue.serverTimestamp(),
        publishedAt:
          data.status === "published" ? FieldValue.serverTimestamp() : null,
      });
    }
  } catch (err) {
    console.error("[admin] savePost failed:", err);
    return { status: "error", message: "Failed to save. Please try again." };
  }

  revalidateBlog(data.slug);
  redirect("/admin?saved=1");
}

export async function deletePost(formData: FormData): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  const db = adminDb();
  if (!db) throw new Error("NO_DB");

  const id = formData.get("id") as string;
  if (!id) return;

  const doc = await db.collection(COLLECTION).doc(id).get();
  const slug = doc.data()?.slug as string | undefined;
  await db.collection(COLLECTION).doc(id).delete();
  revalidateBlog(slug);
  revalidatePath("/admin");
}

export async function togglePublish(formData: FormData): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  const db = adminDb();
  if (!db) throw new Error("NO_DB");

  const id = formData.get("id") as string;
  if (!id) return;

  const ref = db.collection(COLLECTION).doc(id);
  const doc = await ref.get();
  const current = doc.data();
  if (!current) return;

  const nextStatus = current.status === "published" ? "draft" : "published";
  await ref.update({
    status: nextStatus,
    updatedAt: FieldValue.serverTimestamp(),
    ...(nextStatus === "published" && !current.publishedAt
      ? { publishedAt: FieldValue.serverTimestamp() }
      : {}),
  });

  revalidateBlog(current.slug as string);
  revalidatePath("/admin");
}
