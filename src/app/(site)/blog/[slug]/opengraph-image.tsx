import { ImageResponse } from "next/og";
import { getPublishedPostBySlug } from "@/lib/blog/queries";

export const runtime = "nodejs";
export const revalidate = 60;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Article cover";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  const title = post?.title ?? "Sudarshan Adhikari — Blogs";
  const tags = post?.tags?.slice(0, 3).join("  ·  ") ?? "Full-Stack Engineering";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0c",
          padding: "72px",
          backgroundImage:
            "radial-gradient(60% 60% at 10% 0%, rgba(232,182,90,0.25), transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#e8b65a",
              color: "#15120a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            SA
          </div>
          <div style={{ color: "#9a9aa2", fontSize: 26 }}>
            Sudarshan Adhikari
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              color: "#ededf0",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ color: "#e8b65a", fontSize: 28 }}>{tags}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
