import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "@/lib/firebase/session";
import { getPostById } from "@/lib/blog/queries";
import { PostEditor } from "@/components/admin/post-editor";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return <PostEditor post={post} />;
}
