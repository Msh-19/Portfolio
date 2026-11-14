"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, type FeaturedProject } from "@/lib/portfolio-data";

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: FeaturedProject;
  index: number;
  isVisible: boolean;
}) {
  const className = `group flex flex-col h-full border border-foreground/10 hover:border-foreground/30 transition-all duration-700 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`;
  const style = { transitionDelay: isVisible ? `${index * 100}ms` : "0ms" };

  const content = (
    <>
      {/* Screenshots vary from 1.27:1 to 2.19:1 — a fixed frame keeps the grid
          even. Anchoring top-left keeps each page's logo and headline in view
          (wide shots otherwise lose both edges) */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-foreground/10 bg-muted">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-left-top origin-top-left transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="text-2xl lg:text-3xl font-display transition-transform duration-500 group-hover:translate-x-1">
            {project.title}
          </h3>
          {project.link && (
            <ArrowUpRight
              aria-hidden="true"
              className="w-5 h-5 shrink-0 mt-1.5 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          )}
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-5">
          {project.category}
        </p>

        {project.outcome && (
          <p className="font-medium mb-2">{project.outcome}</p>
        )}
        <p className="text-muted-foreground leading-relaxed mb-6">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="px-2.5 py-1 border border-foreground/10 font-mono text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <article className={className} style={style}>
      {content}
    </article>
  );
}

export function WorkSection() {
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
    <section id="work" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Full-width heading row */}
        <div
          className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12 lg:mb-16 pb-8 border-b border-foreground/10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Selected work
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
              Things I&apos;ve shipped.
            </h2>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            {String(featuredProjects.length).padStart(2, "0")} projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
