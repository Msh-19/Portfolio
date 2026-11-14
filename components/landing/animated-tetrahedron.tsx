"use client";

import { useAsciiCanvas } from "./use-ascii-canvas";

const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";

// Tetrahedron vertices
const vertices = [
  { x: 0, y: 1, z: 0 }, // Top
  { x: -0.943, y: -0.333, z: -0.5 }, // Bottom left back
  { x: 0.943, y: -0.333, z: -0.5 }, // Bottom right back
  { x: 0, y: -0.333, z: 1 }, // Bottom front
];

// Edges connecting vertices
const edges = [
  [0, 1], [0, 2], [0, 3], // Top to bottom vertices
  [1, 2], [2, 3], [3, 1], // Bottom triangle
];

// Faces for filling with points
const faces = [
  [0, 1, 2], // Back face
  [0, 2, 3], // Right face
  [0, 3, 1], // Left face
  [1, 3, 2], // Bottom face
];

type Point3 = { x: number; y: number; z: number };

const rotateY = (point: Point3, angle: number): Point3 => ({
  x: point.x * Math.cos(angle) - point.z * Math.sin(angle),
  y: point.y,
  z: point.x * Math.sin(angle) + point.z * Math.cos(angle),
});

const rotateX = (point: Point3, angle: number): Point3 => ({
  x: point.x,
  y: point.y * Math.cos(angle) - point.z * Math.sin(angle),
  z: point.y * Math.sin(angle) + point.z * Math.cos(angle),
});

const rotateZ = (point: Point3, angle: number): Point3 => ({
  x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
  y: point.x * Math.sin(angle) + point.y * Math.cos(angle),
  z: point.z,
});

function drawTetrahedron(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  // Farthest vertex sits ~1.12 units from the center; keep it (plus half
  // a glyph) inside the canvas at every rotation
  const scale = (Math.min(width, height) / 2 - 12) / 1.12;
  if (scale <= 0) return;

  ctx.font = "18px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const points: { x: number; y: number; z: number; char: string }[] = [];

  const pushPoint = (raw: Point3) => {
    let point = rotateY(raw, time * 0.4);
    point = rotateX(point, time * 0.3);
    point = rotateZ(point, time * 0.2);

    const depth = (point.z + 1.5) / 3;
    const charIndex = Math.floor(depth * (chars.length - 1));

    points.push({
      x: centerX + point.x * scale,
      y: centerY - point.y * scale,
      z: point.z,
      char: chars[Math.min(Math.max(charIndex, 0), chars.length - 1)],
    });
  };

  // Generate points along edges
  edges.forEach(([i, j]) => {
    const v1 = vertices[i];
    const v2 = vertices[j];

    for (let t = 0; t <= 1; t += 0.05) {
      pushPoint({
        x: v1.x + (v2.x - v1.x) * t,
        y: v1.y + (v2.y - v1.y) * t,
        z: v1.z + (v2.z - v1.z) * t,
      });
    }
  });

  // Generate points on faces for a filled look
  faces.forEach(([i, j, k]) => {
    const v1 = vertices[i];
    const v2 = vertices[j];
    const v3 = vertices[k];

    for (let u = 0; u <= 1; u += 0.12) {
      for (let v = 0; v <= 1 - u; v += 0.12) {
        const w = 1 - u - v;
        pushPoint({
          x: v1.x * u + v2.x * v + v3.x * w,
          y: v1.y * u + v2.y * v + v3.y * w,
          z: v1.z * u + v2.z * v + v3.z * w,
        });
      }
    }
  });

  // Sort by z for depth
  points.sort((a, b) => a.z - b.z);

  // Draw points
  points.forEach((point) => {
    const alpha = 0.15 + (point.z + 1.5) * 0.25;
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(alpha, 0.9)})`;
    ctx.fillText(point.char, point.x, point.y);
  });
}

export function AnimatedTetrahedron() {
  const canvasRef = useAsciiCanvas(drawTetrahedron, 0.015);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
