"use client";

import { useAsciiCanvas } from "./use-ascii-canvas";

const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";

function drawSphere(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  // Keep the sphere (plus half a glyph) fully inside the canvas
  const radius = Math.min(width, height) / 2 - 10;
  if (radius <= 0) return;

  ctx.font = "12px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const points: { x: number; y: number; z: number; char: string }[] = [];

  // Generate sphere points
  for (let phi = 0; phi < Math.PI * 2; phi += 0.15) {
    for (let theta = 0; theta < Math.PI; theta += 0.15) {
      const x = Math.sin(theta) * Math.cos(phi + time * 0.5);
      const y = Math.sin(theta) * Math.sin(phi + time * 0.5);
      const z = Math.cos(theta);

      // Rotate around Y axis
      const rotY = time * 0.3;
      const newX = x * Math.cos(rotY) - z * Math.sin(rotY);
      const newZ = x * Math.sin(rotY) + z * Math.cos(rotY);

      // Rotate around X axis
      const rotX = time * 0.2;
      const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX);
      const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX);

      const depth = (finalZ + 1) / 2;
      const charIndex = Math.floor(depth * (chars.length - 1));

      points.push({
        x: centerX + newX * radius,
        y: centerY + newY * radius,
        z: finalZ,
        char: chars[charIndex],
      });
    }
  }

  // Sort by z for depth
  points.sort((a, b) => a.z - b.z);

  // Draw points
  points.forEach((point) => {
    const alpha = 0.2 + (point.z + 1) * 0.4;
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillText(point.char, point.x, point.y);
  });
}

export function AnimatedSphere() {
  const canvasRef = useAsciiCanvas(drawSphere, 0.02);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
