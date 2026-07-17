import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function createOpenGraphImage(title: string, tagline: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, #0a0e14 0%, #121821 48%, #0d9488 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.75,
            marginBottom: 28,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 24,
            maxWidth: 1000,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.45,
            maxWidth: 920,
            opacity: 0.9,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
