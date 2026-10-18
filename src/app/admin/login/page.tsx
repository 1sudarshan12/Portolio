import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/firebase/session";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <div className="mx-auto max-w-md pt-10">
      <div className="rounded-2xl border border-border bg-card p-8">
        <span className="label-mono">Private area</span>
        <h1 className="mt-3 font-display text-3xl text-foreground">
          Sign in to the studio
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Administrator access only. Manage your articles and drafts.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
