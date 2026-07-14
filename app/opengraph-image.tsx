import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "TechMission Rio - Connecting Brazilian Youth Tech Talent"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(to bottom right, #020617, #0f172a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow Effects */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(234, 179, 8, 0.08)",
            filter: "blur(100px)",
            top: "5%",
            left: "5%",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.08)",
            filter: "blur(100px)",
            bottom: "5%",
            right: "5%",
          }}
        />

        {/* Brand Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              background: "#eab308",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 48,
              color: "#000000",
              marginRight: 20,
            }}
          >
            T
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 72,
              letterSpacing: "-0.04em",
              display: "flex",
            }}
          >
            TechMission <span style={{ color: "#eab308", marginLeft: 12 }}>Rio</span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 4,
            background: "#eab308",
            borderRadius: 2,
            marginBottom: 32,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          Connecting Brazilian youth tech talent with global US stakeholders, churches, and angel investors.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
