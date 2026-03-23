"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "motion/react"

const techStack = [
  {
    category: "Frameworks/Libraries",
    technologies: [
      { name: "Express", icon: "⚡" },
      { name: "Gin", icon: "🍸" },
      { name: "Next.js", icon: "▲" },
      { name: "React", icon: "⚛" },
    ],
  },
  {
    category: "Programming Languages",
    technologies: [
      { name: "C/C++", icon: "🔷" },
      { name: "GO", icon: "🐹" },
      { name: "Java", icon: "☕" },
      { name: "JavaScript/TypeScript", icon: "📜" },
      { name: "PHP", icon: "🐘" },
      { name: "Python", icon: "🐍" },
    ],
  },
  {
    category: "Tools",
    technologies: [
      { name: "Azure", icon: "☁" },
      { name: "AWS", icon: "🔶" },
      { name: "Apache Kafka", icon: "📨" },
      { name: "Git/GitHub", icon: "🔀" },
    ],
  },
  {
    category: "Testing",
    technologies: [
      { name: "Cypress", icon: "🌲" },
      { name: "Jest", icon: "🃏" },
    ],
  },
  {
    category: "Database",
    technologies: [
      { name: "MySQL", icon: "🐬" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Neo4j", icon: "🔗" },
    ],
  },
]

export function TechStack() {
  return (
    <section id="tech-stack" className="relative overflow-hidden py-32">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Tech Stack
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-8"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((stack, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="mb-6 font-normal">
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/15">
                    <h3 className="text-lg text-primary font-light">{stack.category}</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors group"
                    >
                      <span className="text-2xl" role="img" aria-label={tech.name}>{tech.icon}</span>
                      <span className="text-white/80 group-hover:text-white transition-colors font-medium">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background gradient decoration */}
      <div className="absolute top-1/2 left-1/2 h-[70vw] max-h-[600px] w-[70vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    </section>
  )
}
