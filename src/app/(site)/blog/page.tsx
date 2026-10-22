import type { Metadata } from "next";
import { BlogIndexRedirect } from "@/components/blog/blog-index-redirect";

export const metadata: Metadata = {
  title: "Blogs",
  robots: { index: false, follow: true },
  alternates: { canonical: "/#blogs" },
};

export default function BlogPage() {
  return <BlogIndexRedirect />;
}
