import { ImageResponse } from "next/og";
import { profile } from "@/content/portfolio";

export const alt = `${profile.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#131313",
          color: "#e5e2e1",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#b8c8da",
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#b8c8da",
            }}
          />
          {profile.brand}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, maxWidth: 980 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#c2c8c2",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {profile.headline.before}
          <span style={{ color: "#b2cdbb" }}>{profile.headline.highlight}</span>
          {profile.headline.after}
        </div>
      </div>
    ),
    { ...size }
  );
}
