"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { AnimatedTetrahedron } from "./animated-tetrahedron";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 px-6 lg:px-16 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: heading + form */}
              <div>
                <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                  <span className="w-8 h-px bg-foreground/30" />
                  Contact
                </span>
                <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6 leading-[0.95]">
                  Ready to build
                  <br />
                  something great?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md">
                  Have a project in mind? Tell me about it — your message comes
                  straight to me. Or reach out on Telegram to talk it through.
                </p>

                <ContactForm />
              </div>

              {/* Right: animation */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="aspect-square w-full max-w-[480px]">
                  <AnimatedTetrahedron />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
