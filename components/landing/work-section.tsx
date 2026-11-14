"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/lib/portfolio-data";

export function WorkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % featuredProjects.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Selected work
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Things I&apos;ve
              <br />
              shipped.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Real-time communication, AI document summarization, sentiment
              analysis, and product dashboards — built and delivered end to end.
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display mb-2">{featuredProjects.length}+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Featured projects</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display mb-2">4</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Companies</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display mb-2">AI</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Native workflows</div>
              </div>
            </div>
          </div>

          {/* Right: Project list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Projects</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>

              <div>
                {featuredProjects.map((project, index) => {
                  const Wrapper = project.link ? "a" : "div";
                  return (
                    <Wrapper
                      key={project.title}
                      {...(project.link
                        ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onMouseEnter={() => setActiveProject(index)}
                      className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 group ${
                        activeProject === index ? "bg-foreground/[0.02]" : ""
                      } ${project.link ? "cursor-pointer" : ""}`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                            activeProject === index ? "bg-foreground" : "bg-foreground/20"
                          }`}
                        />
                        <div className="min-w-0">
                          <div className="font-medium flex items-center gap-1.5">
                            {project.title}
                            {project.link && (
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">{project.category}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground shrink-0 hidden sm:block">
                        {project.tags[0]}
                      </span>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
