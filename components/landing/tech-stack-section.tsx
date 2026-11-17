"use client";

import { useEffect, useState, useRef } from "react";

// Category → technologies. Kept in line with the hero strip and Experience.
const techGroups = [
  {
    category: "Frameworks",
    items: ["Next.js", "React", "NestJS", "Node.js", "Express", "Gin"],
  },
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Go", "Python", "Java", "C/C++", "PHP"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Neo4j"],
  },
  { category: "Cloud", items: ["AWS", "Azure"] },
  { category: "Tooling", items: ["Docker", "Apache Kafka", "Git / GitHub"] },
  { category: "Testing", items: ["Jest", "Cypress"] },
];

export function TechStackSection() {
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
    <section id="tech-stack" ref={sectionRef} className="relative py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Compact centred heading */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 lg:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
            <span className="w-8 h-px bg-foreground/30" />
            Tech stack
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-4">
            The tools I reach for every day.
          </h2>
          <p className="text-lg text-muted-foreground">
            Languages, frameworks, and infrastructure across the full stack.
          </p>
        </div>

        {/* Category columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {techGroups.map((group, index) => (
            <div
              key={group.category}
              className={`border-t border-foreground/15 pt-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
