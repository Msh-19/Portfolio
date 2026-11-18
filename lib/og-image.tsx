import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site"

// Shared renderer for app/opengraph-image.tsx and app/twitter-image.tsx.
// Mirrors the landing hero: cream background, serif headline, faint grid,
// and a static frame of the ASCII sphere.

export const ogSize = { width: 1200, height: 630 }
export const ogAlt = `${siteConfig.personName} — Software Engineer and Full-Stack Developer`

const BG = "#faf9f6"
const FG = "#15120f"
const MUTED = "#6b6259"

const SPHERE_CHARS = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯"

// One frame of components/landing/animated-sphere.tsx, frozen at a fixed time.
function spherePoints(cx: number, cy: number, radius: number, time = 1.4) {
  const points: { x: number; y: number; z: number; char: string }[] = []
  for (let phi = 0; phi < Math.PI * 2; phi += 0.17) {
    for (let theta = 0; theta < Math.PI; theta += 0.17) {
      const x = Math.sin(theta) * Math.cos(phi + time * 0.5)
      const y = Math.sin(theta) * Math.sin(phi + time * 0.5)
      const z = Math.cos(theta)

      const rotY = time * 0.3
      const newX = x * Math.cos(rotY) - z * Math.sin(rotY)
      const newZ = x * Math.sin(rotY) + z * Math.cos(rotY)

      const rotX = time * 0.2
      const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX)
      const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX)

      const depth = (finalZ + 1) / 2
      points.push({
        x: cx + newX * radius,
        y: cy + newY * radius,
        z: finalZ,
        char: SPHERE_CHARS[Math.floor(depth * (SPHERE_CHARS.length - 1))],
      })
    }
  }
  return points.sort((a, b) => a.z - b.z)
}

export async function renderOgImage() {
  const [serif, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-Regular.ttf")),
  ])

  const host = siteConfig.url.replace(/^https?:\/\//, "")
  const sphere = spherePoints(935, 315, 245)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: BG,
          color: FG,
          fontFamily: "Instrument Serif",
        }}
      >
        {/* Faint grid, like the hero */}
        {[...Array(7)].map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${12.5 * (i + 1)}%`,
              height: 1,
              backgroundColor: "rgba(21,18,15,0.05)",
            }}
          />
        ))}
        {[...Array(11)].map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${8.33 * (i + 1)}%`,
              width: 1,
              backgroundColor: "rgba(21,18,15,0.05)",
            }}
          />
        ))}

        {/* ASCII sphere */}
        {sphere.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x - 6,
              top: p.y - 8,
              fontFamily: "JetBrains Mono",
              fontSize: 13,
              color: `rgba(21,18,15,${((0.2 + (p.z + 1) * 0.4) * 0.45).toFixed(3)})`,
            }}
          >
            {p.char}
          </div>
        ))}

        {/* Content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogSize.width,
            height: ogSize.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              color: MUTED,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: FG }} />
            Available for new projects
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize: 168, lineHeight: 0.9, letterSpacing: -4 }}>
            <div style={{ display: "flex" }}>I build</div>
            <div style={{ display: "flex", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 4,
                  height: 22,
                  backgroundColor: "rgba(21,18,15,0.10)",
                }}
              />
              software
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(21,18,15,0.15)",
              paddingTop: 28,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", fontSize: 44 }}>{siteConfig.personName}.</div>
              <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 20, color: MUTED }}>
                Software Engineer · Full-Stack Developer
              </div>
            </div>
            <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 20, color: MUTED, backgroundColor: BG, padding: "4px 0 4px 12px" }}>{host}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  )
}
