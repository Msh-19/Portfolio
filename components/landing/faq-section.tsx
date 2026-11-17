"use client";

import { useEffect, useRef, useState } from "react";
import { faqItems } from "@/lib/portfolio-data";

export function FaqSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
          {/* Heading, pinned while the questions scroll on desktop */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              FAQ
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
              Quick answers.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
              A short summary of the work I do, the technologies I use, and the
              kinds of projects I help build.
            </p>
          </div>

          {/* Questions */}
          <div className="border-t border-foreground/10">
            {faqItems.map((item, index) => (
              <article
                key={item.question}
                className={`py-8 lg:py-10 border-b border-foreground/10 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-sm text-muted-foreground shrink-0 mt-1.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-display mb-3">{item.question}</h3>
                    <p className="leading-relaxed text-muted-foreground max-w-2xl">{item.answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
