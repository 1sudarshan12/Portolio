import "server-only";
import { cookies } from "next/headers";
import { adminAuth, isAdminEmail } from "@/lib/firebase/admin";

export const SESSION_COOKIE = "__session";

export type AdminSession = {
  uid: string;
  email: string;
};

/** Returns the verified admin session, or null if not signed in / not an admin. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const auth = adminAuth();
  if (!auth) return null;

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  if (!session) return null;

  try {
    const decoded = await auth.verifySessionCookie(session, true);
    if (!isAdminEmail(decoded.email)) return null;
    return { uid: decoded.uid, email: decoded.email ?? "" };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
