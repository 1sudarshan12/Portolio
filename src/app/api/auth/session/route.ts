import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, isAdminEmail } from "@/lib/firebase/admin";
import { SESSION_COOKIE } from "@/lib/firebase/session";

const FIVE_DAYS_MS = 60 * 60 * 24 * 5 * 1000;

export async function POST(request: Request) {
  const auth = adminAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication is not configured." },
      { status: 503 },
    );
  }

  let idToken: string | undefined;
  try {
    const body = await request.json();
    idToken = body?.idToken;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!idToken) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken);
    if (!isAdminEmail(decoded.email)) {
      return NextResponse.json(
        { error: "This account is not authorized." },
        { status: 403 },
      );
    }

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: FIVE_DAYS_MS,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: FIVE_DAYS_MS / 1000,
    });

    return NextResponse.json({ ok: true, email: decoded.email });
  } catch (err) {
    console.error("[auth] session creation failed:", err);
    return NextResponse.json(
      { error: "Could not verify credentials." },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
