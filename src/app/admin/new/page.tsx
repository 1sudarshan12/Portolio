import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/firebase/session";
import { PostEditor } from "@/components/admin/post-editor";

export default async function NewPostPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <PostEditor />;
}
