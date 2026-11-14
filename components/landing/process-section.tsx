"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Understand the problem",
    description:
      "I start with the real operational pain, not the feature list. Scope the workflow, the users, and what success actually looks like.",
    code: `// map the real workflow
const problem = {
  users: 'ops team',
  pain: 'manual, slow, error-prone',
  success: 'minutes, not hours'
}`,
  },
  {
    number: "II",
    title: "Build it right",
    description:
      "Clean, typed, scalable code across the stack. Responsive UIs, solid APIs, and the integrations that make it real.",
    code: `const app = build({
  stack: ['Next.js', 'TypeScript', 'Go'],
  ui: 'responsive',
  api: 'integrated',
  tests: true
})`,
  },
  {
    number: "III",
    title: "Ship and iterate",
    description:
      "Deploy, measure, improve. Faster load times, tighter feedback loops, and a product that keeps getting better.",
    code: `app.deploy({ target: 'production' })

// 30% faster load times
// 50% faster delivery`,
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-x-clip"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/70 mb-6">
            <span className="w-8 h-px bg-background/30" />
            Process
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Three steps.
            <br />
            <span className="text-background/50">From problem to production.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-background/10 transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-60 hover:opacity-80"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-background/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-background/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-background/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-background/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                </div>
                <span className="text-xs font-mono text-background/70">process.ts</span>
              </div>

              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm min-h-[280px] overflow-x-auto">
                <pre className="text-background/70">
                  {steps[activeStep].code.split("\n").map((line, lineIndex) => (
                    <div
                      key={`${activeStep}-${lineIndex}`}
                      className="leading-loose code-line-reveal"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="text-background/20 select-none w-8 inline-block">{lineIndex + 1}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </pre>
              </div>

              <div className="px-6 py-4 border-t border-background/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs font-mono text-background/70">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes lineReveal {
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .code-line-reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
