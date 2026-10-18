export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  status: PostStatus;
  readingMinutes: number;
  publishedAt: string | null; // ISO string
  createdAt: string | null;
  updatedAt: string | null;
};

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  status: PostStatus;
};
