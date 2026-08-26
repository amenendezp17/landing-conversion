import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 17,
          padding: "0 28px 28px 28px",
          borderRadius: 45,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        }}
      >
        <div style={{ width: 28, height: 45, borderRadius: 11, background: "#ffffff" }} />
        <div style={{ width: 28, height: 79, borderRadius: 11, background: "#ffffff" }} />
        <div style={{ width: 28, height: 113, borderRadius: 11, background: "#ffffff" }} />
      </div>
    ),
    { ...size }
  );
}
