"use client";

import { useEffect, useRef } from "react";

type DrawFn = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) => void;

/**
 * Shared lifecycle for the ASCII canvas animations.
 *
 * - Caches the element size (no layout reads inside the frame loop)
 * - Resizes via ResizeObserver (handles breakpoint class changes, not just window resize)
 * - Pauses the loop while the canvas is off-screen
 * - Renders a single static frame when the user prefers reduced motion
 * - Caps devicePixelRatio at 2 and guards zero-size buffers
 * - `static: true` always renders a single still frame (redrawn on resize)
 */
export function useAsciiCanvas(
  draw: DrawFn,
  timeStep: number,
  options: { static?: boolean } = {}
) {
  const isStatic = options.static ?? false;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let frame = 0;
    let running = false;

    const reduceMotion =
      isStatic ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const renderFrame = () => {
      if (width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);
        drawRef.current(ctx, width, height, time);
      }
      time += timeStep;
    };

    const loop = () => {
      renderFrame();
      if (running) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // First static frame (and the only frame under reduced motion).
    resize();
    renderFrame();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) renderFrame();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [timeStep, isStatic]);

  return canvasRef;
}
