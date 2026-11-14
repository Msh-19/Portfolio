"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

const words = ["software", "platforms", "tools", "products"];
const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a));

// Category (large) → technologies (small) — keeps a clear hierarchy
const marqueeItems = [
  { category: "Frontend", tech: ["TypeScript", "React", "Next.js"] },
  { category: "Backend", tech: ["Node", "NestJS", "Go", "Python"] },
  { category: "AI", tech: ["LLM integration", "Workflows"] },
  { category: "Data", tech: ["PostgreSQL", "MongoDB", "Redis"] },
  { category: "Cloud", tech: ["AWS", "Azure", "Docker"] },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 aspect-square w-[340px] sm:w-[min(560px,80dvh)] lg:w-[min(720px,85dvh)] opacity-20 sm:opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-28 lg:py-32">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
            </span>
            Available for new projects
          </span>
        </div>

        {/* Main headline */}
        <div className="mb-12">
          <h1
            className={`text-[clamp(3rem,12vw,10rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">I build</span>
            <span className="block">
              <span className="relative inline-block">
                {/* Invisible longest word reserves a constant width so the
                    layout doesn't jump when the word changes */}
                <span className="invisible" aria-hidden="true">
                  {longestWord}
                </span>
                <span
                  key={wordIndex}
                  className="absolute inset-y-0 left-0 inline-flex"
                >
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* Description + CTAs */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p
            className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Full-stack developer based in Ethiopia, building practical web
            platforms and internal tools that solve real operational problems.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group transition-colors"
            >
              View my work
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://t.me/MohammedShemim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-8 text-base rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              Contact me
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Skills marquee */}
      <div
        className={`relative z-10 w-full pb-10 lg:pb-16 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {marqueeItems.map((item) => (
                <div key={`${item.category}-${i}`} className="flex items-baseline gap-4">
                  <span className="text-4xl lg:text-5xl font-display">{item.category}</span>
                  <span className="flex items-baseline gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {item.tech.map((t, j) => (
                      <span key={t} className="flex items-baseline gap-2">
                        {j > 0 && <span className="text-foreground/25" aria-hidden="true">/</span>}
                        {t}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
