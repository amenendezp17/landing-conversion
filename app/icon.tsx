import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 3,
          padding: "0 5px 5px 5px",
          borderRadius: 8,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        }}
      >
        <div style={{ width: 5, height: 8, borderRadius: 2, background: "#ffffff" }} />
        <div style={{ width: 5, height: 14, borderRadius: 2, background: "#ffffff" }} />
        <div style={{ width: 5, height: 20, borderRadius: 2, background: "#ffffff" }} />
      </div>
    ),
    { ...size }
  );
}
