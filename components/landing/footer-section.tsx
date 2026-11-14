"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Sitemap: [
    { name: "Expertise", href: "#features" },
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],
  Socials: [
    { name: "GitHub", href: "https://github.com/Msh-19" },
    { name: "LinkedIn", href: "https://linkedin.com/in/mohammed-shemim/" },
    { name: "Twitter", href: "https://x.com/MSHbuilds" },
    { name: "LeetCode", href: "https://leetcode.com/u/moshem3884/" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      {/* Spans the whole footer and fades out at the edges instead of
          stopping abruptly at a fixed 256px height */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 60%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 60%, transparent)",
        }}
      >
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="col-span-2">
              <a href="#hero" className="inline-flex items-center mb-6">
                <span className="text-2xl font-display">Mohammed Shemim</span>
                <span className="text-foreground">.</span>
              </a>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Full-stack developer building practical web platforms and internal
                tools that solve real operational problems.
              </p>

              <div className="space-y-2">
                <a
                  href="mailto:hammoudi.yousuf@gmail.com"
                  className="block text-lg font-medium hover:text-muted-foreground transition-colors"
                >
                  hammoudi.yousuf@gmail.com
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6 font-mono text-muted-foreground">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                        >
                          {link.name}
                          {external && (
                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mohammed Shemim. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Available for new projects
          </div>
        </div>
      </div>
    </footer>
  );
}
