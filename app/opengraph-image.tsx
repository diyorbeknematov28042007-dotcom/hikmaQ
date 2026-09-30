import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 90, color: "white", background: "radial-gradient(circle at 78% 48%, #075b43, #051711 48%, #020b09 80%)" }}>
      <div style={{ fontSize: 34, color: "#8aebc0", letterSpacing: 10 }}>HIKMA</div>
      <div style={{ fontSize: 73, lineHeight: 1.08, fontWeight: 700, marginTop: 30, maxWidth: 900 }}>G‘oyani kuchli raqamli mahsulotga aylantiramiz</div>
      <div style={{ fontSize: 23, color: "#a6cbbd", marginTop: 30 }}>Digital product studio</div>
    </div>, size
  );
}
