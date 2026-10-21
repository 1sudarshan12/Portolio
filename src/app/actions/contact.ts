"use server";

import { headers } from "next/headers";
import { inquirySchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/content/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

type InquiryData = {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends the inquiry to the site owner's inbox via Resend.
 * Returns "sent" on success, "skipped" when no API key is configured
 * (local/preview), or "failed" when a configured send errors out.
 */
async function sendEmailNotification(
  data: InquiryData,
): Promise<"sent" | "skipped" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "skipped";

  const to = process.env.CONTACT_NOTIFY_EMAIL ?? siteConfig.email;
  // Resend's shared sender works with no custom domain; it delivers to the
  // email you signed up to Resend with. Override with a verified domain later.
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const projectType = data.projectType?.trim() || "—";
  const budget = data.budget?.trim() || "—";

  const text = `New inquiry from ${data.name}

Name: ${data.name}
Email: ${data.email}
Project: ${projectType}
Budget: ${budget}

${data.message}`;

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a17">
      <h2 style="margin:0 0 4px">New inquiry from ${escapeHtml(data.name)}</h2>
      <p style="margin:0 0 20px;color:#6a685f">via sudarshanadhikari.com contact form</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <tr><td style="padding:6px 0;color:#6a685f;width:120px">Name</td><td style="padding:6px 0">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#6a685f">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6a685f">Project</td><td style="padding:6px 0">${escapeHtml(projectType)}</td></tr>
        <tr><td style="padding:6px 0;color:#6a685f">Budget</td><td style="padding:6px 0">${escapeHtml(budget)}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f3f1ea;border-radius:12px;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(data.message)}</div>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
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
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend responded", res.status, detail);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[contact] email notification failed:", err);
    return "failed";
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

  const result = await sendEmailNotification({
    name: data.name,
    email: data.email,
    message: data.message,
    projectType: data.projectType,
    budget: data.budget,
  });

  if (result === "skipped") {
    console.warn(
      "[contact] RESEND_API_KEY not set — inquiry not emailed:",
      data.email,
    );
  }

  if (result === "failed") {
    return {
      status: "error",
      message: `Couldn't send right now — please email me directly at ${siteConfig.email}.`,
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out — I'll get back to you within a day.",
  };
}
