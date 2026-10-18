"use server";

import { headers } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";
import { inquirySchema } from "@/lib/validation";
import { adminDb } from "@/lib/firebase/admin";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/content/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

async function sendEmailNotification(data: {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL ?? siteConfig.email;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: `New inquiry from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nProject: ${
          data.projectType ?? "—"
        }\nBudget: ${data.budget ?? "—"}\n\n${data.message}`,
      }),
    });
  } catch (err) {
    console.error("[contact] email notification failed:", err);
  }
}

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    hdrs.get("x-real-ip") ??
    "unknown";

  const { success } = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!success) {
    return {
      status: "error",
      message: "You're sending messages too quickly. Please try again in a minute.",
    };
  }

  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
    budget: formData.get("budget"),
    message: formData.get("message"),
    company: formData.get("company"), // honeypot
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    // Honeypot tripped → pretend success to the bot
    if (errors.company) {
      return { status: "success", message: "Thanks! I'll be in touch soon." };
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
    };
  }

  const data = parsed.data;

  try {
    const db = adminDb();
    if (db) {
      await db.collection("inquiries").add({
        name: data.name,
        email: data.email,
        projectType: data.projectType || null,
        budget: data.budget || null,
        message: data.message,
        ip,
        userAgent: hdrs.get("user-agent") ?? null,
        createdAt: FieldValue.serverTimestamp(),
        handled: false,
      });
    } else {
      console.warn(
        "[contact] Firebase admin not configured — inquiry not stored:",
        data.email,
      );
    }

    await sendEmailNotification(data);

    return {
      status: "success",
      message: "Thanks for reaching out — I'll get back to you within a day.",
    };
  } catch (err) {
    console.error("[contact] submission failed:", err);
    return {
      status: "error",
      message: "Something went wrong on my end. Please email me directly.",
    };
  }
}
