# Sudarshan Adhikari — Portfolio

A premium, fully responsive personal portfolio and freelance‑services site for
**Sudarshan Adhikari**, Full‑Stack Software Engineer. Built with Next.js (App
Router), TypeScript, Tailwind CSS v4 and a lightweight Firebase‑powered blog +
admin — no separate backend server.

## ✨ Features

- **Static‑first marketing site** — Hero, About, Experience, Projects (with
  case‑study pages), Skills, Services, How‑I‑Work, Contact.
- **Firebase blog** — Firestore content rendered **server‑side** (SEO‑friendly,
  no client auth needed to read), Markdown with syntax highlighting, reading
  time, tags, social sharing, dynamic OG images, `/blog/slug` URLs.
- **Private admin studio** — Firebase Auth login (admin allowlist), create /
  edit / draft / publish / unpublish / delete posts, live Markdown preview.
- **Secure contact form** — server action with Zod validation, honeypot +
  rate‑limiting, Firestore storage, optional email via Resend.
- **Design system** — dark‑first with light/dark toggle, amber signal accent,
  fluid typography, tasteful motion with full reduced‑motion support.
- **SEO** — metadata, Open Graph, JSON‑LD, sitemap, robots, manifest.

## 🧱 Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Radix UI · Motion ·
Lucide · Firebase (Firestore + Auth) · `firebase-admin` · Vercel.

## 🚀 Local development

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
```

The site runs **without any Firebase config** — the blog shows an empty state
and the admin shows a "not configured" notice. Add Firebase to unlock the blog,
admin and persisted contact submissions.

Scripts: `npm run dev` · `npm run build` · `npm run start` · `npm run lint`.

## 🔥 Firebase setup

1. **Create a project** at the [Firebase console](https://console.firebase.google.com/).
2. **Firestore** → create a database (production mode).
3. **Authentication** → enable **Email/Password**, then add your admin user
   (Users → Add user). Use the same email you put in `ADMIN_EMAILS`.
4. **Web app config** (client, public): Project settings → *Your apps* → Web →
   copy the config into the `NEXT_PUBLIC_FIREBASE_*` vars.
5. **Service account** (admin, secret): Project settings → *Service accounts* →
   *Generate new private key*. From the JSON, set:
   - `FIREBASE_PROJECT_ID` → `project_id`
   - `FIREBASE_CLIENT_EMAIL` → `client_email`
   - `FIREBASE_PRIVATE_KEY` → `private_key` (keep the `\n` escapes, wrap in quotes)
6. **Admin allowlist**: `ADMIN_EMAILS=you@example.com` (comma‑separated).
7. **Security rules**: deploy `firestore.rules` (below).

### Security model

All Firestore access happens **server‑side via the Admin SDK**, which bypasses
security rules. The client never reads or writes Firestore directly, so the
rules **deny everything** — the safest possible posture. Public blog pages are
server‑rendered, so Google indexes real content with no client Firebase auth.

Deploy the rules (requires the Firebase CLI):

```bash
npx firebase-tools deploy --only firestore:rules
```

### Blog images

Cover images use a **pasted URL** field (host anywhere — Unsplash, your CDN,
etc.). This avoids Firebase Storage cost/complexity. Remote images are allowed
via `next.config.ts` → `images.remotePatterns`. Swap to Firebase Storage later
only if you need managed uploads.

## 📝 Using the blog

1. Go to `/admin/login` and sign in with your allowlisted admin account.
2. Create an article (Markdown), add tags, an excerpt and an optional cover URL.
3. **Save draft** (private) or **Publish** (live at `/blog/your-slug`).
4. Published posts appear on `/blog`, the homepage preview and the sitemap.

## 📬 Contact form (optional email)

Submissions are validated, rate‑limited and saved to the `inquiries` collection.
To also receive emails, add a [Resend](https://resend.com) key:

```
RESEND_API_KEY=...
RESEND_FROM_EMAIL=you@yourdomain.com   # must be a verified Resend sender
CONTACT_NOTIFY_EMAIL=where@to-send.com # defaults to your profile email
```

## ▲ Deploy to Vercel

1. Push this repo to GitHub/GitLab and **Import** it in Vercel.
2. Add every variable from `.env.example` in **Project → Settings → Environment
   Variables**. Paste `FIREBASE_PRIVATE_KEY` exactly (with `\n`), quotes optional
   in the Vercel UI.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g.
   `https://sudarshanadhikari.com`).
4. Deploy. Vercel auto‑detects Next.js — no extra config needed.
5. Add your custom domain under **Project → Domains**.

## 🗂️ Project structure

```
src/
  app/
    (site)/        # public site: home, blog, projects (public nav + footer)
    admin/         # private studio: login, dashboard, editor, server actions
    api/auth/      # session cookie login/logout
    actions/       # contact server action
    sitemap.ts · robots.ts · manifest.ts · error.tsx · not-found.tsx
  components/      # ui, layout, sections, projects, blog, admin, motion, icons
  lib/
    content/       # typed content modules (resume-driven)
    firebase/      # admin + client SDK, session helpers
    blog/          # types + Firestore queries
    validation.ts · rate-limit.ts · utils.ts
firestore.rules · firebase.json · firestore.indexes.json
```

## ✅ Customisation checklist

- Replace `public/sudarshan-adhikari-resume.pdf` with your latest résumé.
- Add real project screenshots to `public/projects/` and reference them via the
  `screenshots` field in `src/lib/content/projects.ts` (branded placeholders are
  used until then).
- Add live/repo URLs per project in the same file.
- Update social links and contact details in `src/lib/content/site.ts`.
