import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Plus,
  Pencil,
  Eye,
  EyeOff,
  Trash2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { getAdminSession } from "@/lib/firebase/session";
import { getAllPostsAdmin } from "@/lib/blog/queries";
import { isAdminConfigured } from "@/lib/firebase/admin";
import { deletePost, togglePublish } from "@/app/admin/actions";
import { LogoutButton } from "@/components/admin/logout-button";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
        <div className="flex items-center gap-2.5 text-amber-500">
          <AlertCircle className="size-5" />
          <h1 className="font-display text-2xl">Firebase not configured</h1>
        </div>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Set the <code className="font-mono text-xs">FIREBASE_*</code> and{" "}
          <code className="font-mono text-xs">ADMIN_EMAILS</code> environment
          variables (see <code className="font-mono text-xs">.env.example</code>)
          to enable the admin dashboard and blog.
        </p>
      </div>
    );
  }

  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const posts = await getAllPostsAdmin();
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="label-mono">Signed in as {session.email}</span>
          <h1 className="mt-2 font-display text-4xl text-foreground">Articles</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {posts.length} total · {published} published · {drafts} drafts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/admin/new">
              <Plus className="size-4" /> New article
            </Link>
          </Button>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-10">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
              <FileText className="size-5" />
            </span>
            <h2 className="font-display text-2xl text-foreground">
              No articles yet
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Write your first article to get the blog going.
            </p>
            <Button asChild className="mt-2">
              <Link href="/admin/new">
                <Plus className="size-4" /> Create article
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-col gap-4 bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={
                        post.status === "published"
                          ? "inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs text-green-500"
                          : "inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                      }
                    >
                      <span
                        className={
                          post.status === "published"
                            ? "size-1.5 rounded-full bg-green-500"
                            : "size-1.5 rounded-full bg-muted-foreground"
                        }
                      />
                      {post.status}
                    </span>
                    <h3 className="truncate font-medium text-foreground">
                      {post.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 truncate font-mono text-xs text-muted-foreground">
                    /blog/{post.slug}
                    {post.publishedAt && ` · ${formatDate(post.publishedAt)}`}
                    {` · ${post.readingMinutes} min`}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/edit/${post.id}`}>
                      <Pencil className="size-4" /> Edit
                    </Link>
                  </Button>

                  <form action={togglePublish}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button type="submit" variant="ghost" size="sm">
                      {post.status === "published" ? (
                        <>
                          <EyeOff className="size-4" /> Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="size-4" /> Publish
                        </>
                      )}
                    </Button>
                  </form>

                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <ConfirmSubmit
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-red-500"
                      aria-label="Delete article"
                      confirmText={`Delete "${post.title}"? This can't be undone.`}
                    >
                      <Trash2 className="size-4" />
                    </ConfirmSubmit>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
