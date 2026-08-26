import { ImageResponse } from "next/og";

export const alt = "Flowlytics — Analítica de producto en tiempo real";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #1e1b4b 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 6,
              width: 64,
              height: 64,
              padding: "0 10px 10px 10px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            }}
          >
            <div style={{ width: 10, height: 16, borderRadius: 3, background: "#ffffff" }} />
            <div style={{ width: 10, height: 28, borderRadius: 3, background: "#ffffff" }} />
            <div style={{ width: 10, height: 40, borderRadius: 3, background: "#ffffff" }} />
          </div>
          <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>Flowlytics</div>
        </div>
        <div style={{ fontSize: 30, color: "#94a3b8", maxWidth: 820, textAlign: "center" }}>
          Deja de adivinar qué funciona en tu producto.
        </div>
      </div>
    ),
    { ...size }
  );
}
