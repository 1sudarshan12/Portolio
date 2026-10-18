"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    try {
      const auth = getFirebaseAuth();
      if (auth) await auth.signOut();
    } catch {
      /* ignore */
    }
    await fetch("/api/auth/session", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="outline" size="sm" onClick={logout}>
      <LogOut className="size-4" /> Sign out
    </Button>
  );
}
